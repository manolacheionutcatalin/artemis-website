// ============================================
// NextAuth.js — Route Handler (App Router)
// ============================================
// Acest fișier expune endpoint-urile /api/auth/*
// (login, logout, session, csrf, etc.)

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
