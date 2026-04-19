// ============================================
// Middleware — Protecție Rute Dashboard
// ============================================
// Redirecționează vizitatorii neautentificați de la
// /dashboard/* înapoi la /login.
// Plasament: rădăcina proiectului (nu în src/).

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Protejează rutele /dashboard/* ──
  if (pathname.startsWith("/dashboard")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Dacă nu există token (neautentificat), redirecționează la /login
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      // Păstrează URL-ul original ca parametru pentru redirect după login
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verifică dacă utilizatorul are rol de admin
    if (token.role !== "admin") {
      // Utilizator autentificat dar fără privilegii de admin
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// ── Matcher ──
// Middleware-ul se aplică DOAR pe rutele specificate.
// Rutele API, fișierele statice și imaginile sunt excluse automat.
export const config = {
  matcher: ["/dashboard/:path*"],
};
