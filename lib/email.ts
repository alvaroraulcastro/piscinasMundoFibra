import nodemailer from "nodemailer";
import prisma from "./prisma";

async function getSmtpConfig() {
  const keys = ["smtp_host", "smtp_port", "smtp_user", "smtp_pass", "smtp_from"];
  const configs = await prisma.siteConfig.findMany({
    where: { key: { in: keys } },
  });
  const map: Record<string, string> = {};
  configs.forEach((c) => (map[c.key] = c.value));
  return map;
}

function interpolate(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, val] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), val);
  }
  // Remove conditional blocks for missing variables
  result = result.replace(/\{\{#\w+\}\}[\s\S]*?\{\{\/\w+\}\}/g, "");
  return result;
}

export async function sendTemplateEmail(
  templateSlug: string,
  to: string,
  variables: Record<string, string>
) {
  const smtp = await getSmtpConfig();

  if (!smtp.smtp_host || !smtp.smtp_user) {
    console.warn(`[email] SMTP no configurado. Template: ${templateSlug}, To: ${to}`);
    return null;
  }

  const template = await prisma.emailTemplate.findUnique({
    where: { slug: templateSlug },
  });

  if (!template || !template.active) {
    console.warn(`[email] Template "${templateSlug}" no encontrada o desactivada`);
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: smtp.smtp_host,
    port: parseInt(smtp.smtp_port || "587"),
    secure: parseInt(smtp.smtp_port || "587") === 465,
    auth: {
      user: smtp.smtp_user,
      pass: smtp.smtp_pass,
    },
  });

  const subject = interpolate(template.subject, variables);
  const text = interpolate(template.body, variables);

  try {
    const info = await transporter.sendMail({
      from: smtp.smtp_from || smtp.smtp_user,
      to,
      subject,
      text,
    });
    console.log(`[email] Enviado: ${templateSlug} → ${to} (${info.messageId})`);
    return info;
  } catch (err) {
    console.error(`[email] Error enviando ${templateSlug}:`, err);
    return null;
  }
}

export async function getConfigValue(key: string): Promise<string | null> {
  const entry = await prisma.siteConfig.findUnique({ where: { key } });
  return entry?.value ?? null;
}
