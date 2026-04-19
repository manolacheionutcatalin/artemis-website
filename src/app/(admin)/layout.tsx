import Link from "next/link";
import LogoutButton from "./dashboard/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc" }}>
      {/* ── Sidebar Simplu ── */}
      <aside style={{ 
        width: "250px", 
        borderRight: "1px solid rgba(255,255,255,0.1)", 
        backgroundColor: "#0f172a",
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
      }}>
        <div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#d4a373", margin: "0 0 0.5rem 0" }}>
            Artemis Admin
          </h2>
          <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Dashboard Securizat</div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", flexGrow: 1 }}>
          <Link href="/dashboard" style={{ color: "#f8fafc", textDecoration: "none", fontWeight: "500", opacity: 0.9 }}>
            Pagina Principală
          </Link>
          <Link href="/" target="_blank" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.95rem" }}>
            Vizitează Site-ul ↗
          </Link>
        </nav>

        <div>
          <LogoutButton />
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ flexGrow: 1, padding: "3rem" }}>
        {children}
      </main>
    </div>
  );
}
