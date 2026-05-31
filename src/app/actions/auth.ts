"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function changeAdminPassword(data: { currentPassword: string; newPassword: string }) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    return { success: false, message: "Neautorizat. Te rog să te conectezi din nou." };
  }

  if (!data.currentPassword || !data.newPassword) {
    return { success: false, message: "Toate câmpurile sunt obligatorii." };
  }

  if (data.newPassword.length < 8) {
    return { success: false, message: "Noua parolă trebuie să aibă cel puțin 8 caractere." };
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email: session.user.email },
    });

    if (!admin) {
      return { success: false, message: "Utilizatorul administrator nu a fost găsit." };
    }

    // Verifică dacă parola curentă este corectă
    const isCurrentPasswordCorrect = await bcrypt.compare(
      data.currentPassword,
      admin.passwordHash
    );

    if (!isCurrentPasswordCorrect) {
      return { success: false, message: "Parola curentă este incorectă." };
    }

    // Hash-uiește noua parolă
    const hashedNewPassword = await bcrypt.hash(data.newPassword, 12);

    // Salvează în baza de date
    await prisma.admin.update({
      where: { id: admin.id },
      data: { passwordHash: hashedNewPassword },
    });

    // Jurnalizează acțiunea
    await prisma.auditLog.create({
      data: {
        action: "PASSWORD_CHANGED",
        target: `admin:${admin.id}`,
        ipAddress: "server",
        adminId: admin.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Eroare la schimbarea parolei:", error);
    return { success: false, message: "A apărut o eroare neașteptată la schimbarea parolei." };
  }
}
