"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateSiteSettings(settings: { key: string, value: string }[]) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return { success: false, message: "Neautorizat." };
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { email: session.user.email } });
    
    if (!admin) {
      return { success: false, message: "Admin negăsit." };
    }

    for (const setting of settings) {
      await prisma.siteSettings.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: { key: setting.key, value: setting.value }
      });
    }

    revalidatePath("/");
    revalidatePath("/dashboard/settings");

    // Add audit log
    await prisma.auditLog.create({
      data: {
        action: "UPDATE_SETTINGS",
        target: "site_settings",
        ipAddress: "server",
        adminId: admin.id,
      }
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "A apărut o eroare la salvare." };
  }
}
