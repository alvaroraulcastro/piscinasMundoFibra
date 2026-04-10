import type { NextAuthConfig } from "next-auth";

/**
 * Solo opciones compatibles con Edge (sin Prisma ni bcrypt).
 * El middleware importa esto para no superar el límite de 1 MB en Vercel.
 */
export default {
  providers: [],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
        return !!auth?.user;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
