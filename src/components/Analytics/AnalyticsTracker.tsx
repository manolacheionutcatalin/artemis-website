"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/app/actions/analytics";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Dacă funcționează într-un mediu fără fereastră de browser (ex. Server render static), nu facem nimic
    if (typeof window === "undefined") return;

    // Întârziem intenționat logarea cu 1.5 secunde pentru:
    // a) a lăsa site-ul să se randeze și să arate fluid pentru om.
    // b) a evita botii rapizi/crawlerele invizibile care ies imediat (bounce foarte mic).
    const timer = setTimeout(() => {
      // Capturăm datele exacte din mediul sigur al browserului clientului
      const url = window.location.href; // Include /dashboard?bla=bla din browser
      const referrer = document.referrer; 
      
      // Dacă lățimea ecranului e mai mică de 768px, cel mai probabil este ecran mobil/tabletă
      const isMobile = window.innerWidth <= 768;
      const device = isMobile ? "mobile" : "desktop";

      // Salvăm metricele pe ascuns apelând Server Action-ul creat în fișierul anterior
      trackPageView({ url, referrer, device });
    }, 1500);

    // Când componentul se demontează rapid, curățăm timeout-ul pentru a nu rula inutil
    return () => clearTimeout(timer);
    
    // Matricea de dependințe: vrem ca hook-ul să se repete la *orice schimbare* de path sau parametru de tip ?id=xxx
  }, [pathname, searchParams]);

  // Această componentă este tehnic invizibilă pe site: "Zero DOM"
  return null;
}
