import NextAuth from "next-auth";
import authConfig from "./auth.config";

/**
 * Importa solo `auth.config` (sin Prisma/bcrypt) para mantener el bundle Edge < 1 MB en Vercel.
 */
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*"],
};
