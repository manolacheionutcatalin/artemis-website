// ============================================
// Seed Script — Creare Primul Cont de Admin
// ============================================
// Rulează O SINGURĂ DATĂ cu: npx ts-node prisma/seed.ts
// Creează contul principal de administrare cu parola hash-uită via Bcrypt.

import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

// ── Configurare Admin Inițial ──
const ADMIN_EMAIL = "admin@artemis.ro";
const ADMIN_NAME = "Cătălin Manolache";
const ADMIN_PASSWORD = "SchimbaMaImediat!2026"; // ⚠️ SCHIMBĂ PAROLA DUPĂ PRIMUL LOGIN!

const BCRYPT_SALT_ROUNDS = 12; // Cost factor pentru Bcrypt (12 = ~250ms pe un CPU modern)

async function main() {
  console.log("🌱 Seed: Se creează contul de admin...\n");

  // Verifică dacă există deja un admin cu acest email
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existingAdmin) {
    console.log(`⚠️  Adminul cu email-ul "${ADMIN_EMAIL}" există deja. Seed-ul nu a fost rulat din nou.`);
    return;
  }

  // Hash-uiește parola cu Bcrypt
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, BCRYPT_SALT_ROUNDS);

  // Creează admin-ul
  const admin = await prisma.admin.create({
    data: {
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      passwordHash,
      role: "admin",
    },
  });

  console.log("✅ Cont de admin creat cu succes!");
  console.log(`   📧 Email: ${admin.email}`);
  console.log(`   👤 Nume:  ${admin.name}`);
  console.log(`   🔑 Rol:   ${admin.role}`);
  console.log(`   🆔 ID:    ${admin.id}`);
  console.log("\n⚠️  IMPORTANT: Schimbă parola imediată după primul login!");

  // Înregistrează acțiunea în AuditLog
  await prisma.auditLog.create({
    data: {
      action: "SEED_ADMIN_CREATED",
      target: `admin:${admin.id}`,
      metadata: JSON.stringify({ email: admin.email, method: "seed_script" }),
      adminId: admin.id,
    },
  });

  console.log("📝 AuditLog: Acțiunea de creare a fost jurnalizată.");
}

main()
  .catch((error) => {
    console.error("❌ Eroare la seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
