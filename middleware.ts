import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/admin") && !req.auth) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl.origin));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
