// ============================================
// NextAuth.js — Configurație Centrală
// ============================================
// Exportă authOptions pentru a fi folosit atât în route handler
// cât și în middleware / getServerSession.

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  // ── Providers ──
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@artemis.ro" },
        password: { label: "Parolă", type: "password" },
      },

      async authorize(credentials, req) {
        // Obține IP-ul curent (funcționează și în spatele proxylor locale)
        const forwarded = req.headers?.["x-forwarded-for"];
        const realIp = req.headers?.["x-real-ip"];
        const currentIp = forwarded ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0]) : realIp || "127.0.0.1";

        // Validare input
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email-ul și parola sunt obligatorii.");
        }

        // Caută admin-ul în baza de date
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) {
          throw new Error("Credențiale invalide.");
        }

        // Verifică parola cu Bcrypt
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.passwordHash
        );

        if (!isPasswordValid) {
          throw new Error("Credențiale invalide.");
        }

        // Actualizează lastLoginAt
        await prisma.admin.update({
          where: { id: admin.id },
          data: { lastLoginAt: new Date() },
        });

        // Jurnalizează login-ul
        await prisma.auditLog.create({
          data: {
            action: "ADMIN_LOGIN",
            target: `admin:${admin.id}`,
            adminId: admin.id,
            ipAddress: currentIp,
          },
        });

        // Returnează obiectul user pentru sesiune
        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        };
      },
    }),
  ],

  // ── Callbacks ──
  callbacks: {
    // Adaugă `role` și `id` în JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    // Adaugă `role` și `id` în sesiune (accesibil pe client)
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // ── Pagini personalizate ──
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // ── Configurare sesiune ──
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 ore — sesiunea expiră automat
  },

  // ── Secret ──
  secret: process.env.NEXTAUTH_SECRET,
};
