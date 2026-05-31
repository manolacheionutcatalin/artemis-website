import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SettingsForm from "./SettingsForm";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h1>Acces Interzis</h1>
        <p>Nu ești autentificat.</p>
      </div>
    );
  }

  const settings = await prisma.siteSettings.findMany();

  const initialSettings = {
    heroMessage: settings.find(s => s.key === "hero_message")?.value || "",
    sessionPrice: settings.find(s => s.key === "session_price")?.value || "120 lei"
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        paddingBottom: "1.5rem",
        marginBottom: "2rem"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link href="/dashboard" style={{ color: "#38bdf8", textDecoration: "none" }}>&larr; Înapoi</Link>
            <h1 style={{ margin: 0, fontSize: "1.8rem" }}>
              Setări Conținut
            </h1>
          </div>
          <p style={{ margin: "0.5rem 0 0 0", color: "#94a3b8" }}>
            Modifică textele și prețurile afișate public pe site.
          </p>
        </div>
      </header>

      <section style={{
        backgroundColor: "rgba(255,255,255,0.03)", 
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "2rem"
      }}>
        <SettingsForm initialSettings={initialSettings} />
      </section>
    </div>
  );
}
