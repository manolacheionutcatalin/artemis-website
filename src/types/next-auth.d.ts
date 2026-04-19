// ============================================
// NextAuth.js — Type Augmentation
// ============================================
// Extinde tipurile implicite ale NextAuth pentru a include
// `role` și `id` pe obiectele User și Session.

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role?: string;
    id?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
  }
}
