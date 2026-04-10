import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ── Admin por defecto ──
  const adminPassword = await bcrypt.hash("admin1234", 12);
  await prisma.user.upsert({
    where: { email: "admin@piscinasmundofibra.cl" },
    update: {},
    create: {
      email: "admin@piscinasmundofibra.cl",
      name: "Administrador",
      phone: "+56954088120",
      passwordHash: adminPassword,
      role: Role.ADMIN,
    },
  });

  // ── Nuevo Admin (Usuario) ──
  const userAdminPassword = await bcrypt.hash("osorno2026", 12);
  await prisma.user.upsert({
    where: { email: "alvaroraulcastrosm@gmail.com" },
    update: {
      passwordHash: userAdminPassword,
      role: Role.ADMIN,
      active: true,
    },
    create: {
      email: "alvaroraulcastrosm@gmail.com",
      name: "Alvaro Castro",
      passwordHash: userAdminPassword,
      role: Role.ADMIN,
      active: true,
    },
  });

  // ── Colores iniciales ──
  const colores = [
    { name: "Celeste", hex: "#87CEEB", sortOrder: 1 },
    { name: "Azul Tahití", hex: "#0072B5", sortOrder: 2 },
    { name: "Verde Turquesa", hex: "#00CED1", sortOrder: 3 },
    { name: "Blanco", hex: "#F8F9FA", sortOrder: 4 },
    { name: "Gris Oscuro", hex: "#555555", sortOrder: 5 },
    { name: "Gris Claro", hex: "#AAAAAA", sortOrder: 6 },
  ];
  for (const c of colores) {
    await prisma.color.upsert({
      where: { name: c.name },
      update: {},
      create: c,
    });
  }

  // ── Accesorios iniciales ──
  const accesorios = [
    { name: "Bomba de calefacción Aquark", slug: "bomba-calor", description: "Calienta el agua todo el año" },
    { name: "Sistema de filtración", slug: "filtro", description: "Arena o cartucho de alta eficiencia" },
    { name: "Escalera inox", slug: "escalera", description: "Escalera de acero inoxidable" },
    { name: "Cobertor de seguridad", slug: "cobertor", description: "Cobertor isotérmico y de seguridad" },
    { name: "Iluminación LED", slug: "iluminacion", description: "Luz sumergible multicolor" },
    { name: "Robot limpiador", slug: "robot-limpiador", description: "Limpieza automática del fondo" },
  ];
  for (const a of accesorios) {
    await prisma.accesorio.upsert({
      where: { slug: a.slug },
      update: {},
      create: a,
    });
  }

  // ── Configuración del sitio ──
  const config = [
    { key: "site_name", value: "Piscinas Mundo Fibra", label: "Nombre del sitio" },
    { key: "whatsapp_number", value: "56954088120", label: "Número WhatsApp (sin +)" },
    { key: "phone", value: "+56 9 5408 8120", label: "Teléfono de contacto" },
    { key: "instagram", value: "piscinasmundofibra", label: "Usuario de Instagram" },
    { key: "email_contact", value: "contacto@piscinasmundofibra.cl", label: "Email de contacto" },
    { key: "smtp_host", value: "", label: "Servidor SMTP" },
    { key: "smtp_port", value: "587", label: "Puerto SMTP" },
    { key: "smtp_user", value: "", label: "Usuario SMTP" },
    { key: "smtp_pass", value: "", label: "Contraseña SMTP" },
    { key: "smtp_from", value: "noreply@piscinasmundofibra.cl", label: "Email remitente" },
    { key: "hero_title", value: "Piscinas de Fibra de Vidrio", label: "Título del Hero" },
    { key: "hero_subtitle", value: "Alta durabilidad, diseños exclusivos y la mejor tecnología multicapa.", label: "Subtítulo del Hero" },
    { key: "section_ventajas", value: "true", label: "Mostrar sección Ventajas" },
    { key: "section_tecnologia", value: "true", label: "Mostrar sección Tecnología" },
    { key: "section_colores", value: "true", label: "Mostrar sección Colores" },
    { key: "section_cotizador", value: "true", label: "Mostrar sección Cotizador" },
    { key: "section_contacto", value: "true", label: "Mostrar sección Contacto" },
  ];
  for (const c of config) {
    await prisma.siteConfig.upsert({
      where: { key: c.key },
      update: {},
      create: c,
    });
  }

  // ── SEO por defecto ──
  await prisma.seoEntry.upsert({
    where: { pageSlug: "home" },
    update: {},
    create: {
      pageSlug: "home",
      title: "Piscinas Mundo Fibra | Piscinas de Fibra de Vidrio en Chile",
      description: "Piscinas de fibra de vidrio de alta calidad en Chile. Alta durabilidad, fácil mantenimiento, tecnología multicapa y 6 colores disponibles.",
      keywords: "piscinas fibra de vidrio, piscinas Chile, piscina fibra, mundo fibra, cotizar piscina",
      ogTitle: "Piscinas Mundo Fibra",
      ogDescription: "Las mejores piscinas de fibra de vidrio en Chile. Cotiza ahora.",
    },
  });

  // ── Plantillas de email ──
  const templates = [
    {
      slug: "nueva-orden",
      name: "Nueva orden recibida (admin)",
      subject: "Nueva cotización #{{orderNumber}}",
      body: "Hola {{adminName}},\n\nSe ha recibido una nueva cotización:\n\n• Orden: #{{orderNumber}}\n• Cliente: {{clientName}}\n• Email: {{clientEmail}}\n• Dimensiones: {{largo}}m × {{ancho}}m × {{profundidad}}m\n• Color: {{color}}\n\nIngresa al panel para revisarla.\n\nSaludos,\nPiscinas Mundo Fibra",
      variables: "adminName,orderNumber,clientName,clientEmail,largo,ancho,profundidad,color",
    },
    {
      slug: "confirmacion-cliente",
      name: "Confirmación de cotización (cliente)",
      subject: "Tu cotización #{{orderNumber}} fue recibida",
      body: "Hola {{clientName}},\n\nHemos recibido tu solicitud de cotización:\n\n• Orden: #{{orderNumber}}\n• Dimensiones: {{largo}}m × {{ancho}}m × {{profundidad}}m\n• Color: {{color}}\n\nNuestro equipo revisará tu solicitud y te contactaremos pronto.\n\nGracias por confiar en Piscinas Mundo Fibra.",
      variables: "clientName,orderNumber,largo,ancho,profundidad,color",
    },
    {
      slug: "cambio-estado",
      name: "Cambio de estado de orden (cliente)",
      subject: "Tu orden #{{orderNumber}} cambió a {{newStatus}}",
      body: "Hola {{clientName}},\n\nTu orden #{{orderNumber}} ha cambiado de estado:\n\n• Estado anterior: {{oldStatus}}\n• Nuevo estado: {{newStatus}}\n{{#comment}}• Comentario: {{comment}}{{/comment}}\n\nSi tienes preguntas, contáctanos por WhatsApp al +56 9 5408 8120.\n\nSaludos,\nPiscinas Mundo Fibra",
      variables: "clientName,orderNumber,oldStatus,newStatus,comment",
    },
    {
      slug: "bienvenida",
      name: "Bienvenida nuevo usuario",
      subject: "Bienvenido a Piscinas Mundo Fibra",
      body: "Hola {{name}},\n\nTu cuenta ha sido creada exitosamente.\n\n• Email: {{email}}\n• Rol: {{role}}\n\nYa puedes ingresar al panel en {{siteUrl}}/admin\n\nSaludos,\nPiscinas Mundo Fibra",
      variables: "name,email,role,siteUrl",
    },
  ];
  for (const t of templates) {
    await prisma.emailTemplate.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });
  }

  console.log("Seed ejecutado correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
