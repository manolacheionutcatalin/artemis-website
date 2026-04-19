"use server";

import { prisma } from "@/lib/prisma";

export async function trackPageView(data: { url: string; referrer: string; device: string }) {
  try {
    // 1. Înregistrează vizita unică în tabelul detaliat `PageView`
    await prisma.pageView.create({
      data: {
        url: data.url,
        referrer: data.referrer || null,
        device: data.device,
      },
    });

    // 2. Calculează miezul nopții din ziua curentă (pe fus orar UTC)
    // Astfel, toate vizitele dintr-o zi cad în același "bucket" de AnalyticsSummary.
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const isDesktop = data.device === "desktop";
    const isMobile = data.device === "mobile";

    // 3. Dacă summary-ul de azi există -> dăm update și incrementăm numerele
    // Dacă nu există încă (prima vizită a zilei) -> îl creăm pe loc (`upsert`)
    await prisma.analyticsSummary.upsert({
      where: { date: today },
      update: {
        totalViews: { increment: 1 },
        desktopViews: { increment: isDesktop ? 1 : 0 },
        mobileViews: { increment: isMobile ? 1 : 0 },
      },
      create: {
        date: today,
        totalViews: 1,
        desktopViews: isDesktop ? 1 : 0,
        mobileViews: isMobile ? 1 : 0,
      },
    });

    return { success: true };
  } catch (error) {
    // Logăm eroarea silențios pe server ca să nu prăbușim experiența clientului pe site
    console.error("Eroare la scrierea logurilor Analytics:", error);
    return { success: false };
  }
}
