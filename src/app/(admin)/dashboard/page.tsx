import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./LogoutButton";
import TrafficChart from "./TrafficChart";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h1>Acces Interzis</h1>
        <p>Nu ești autentificat.</p>
      </div>
    );
  }

  // Preia ultimele 10 log-uri din baza de date
  const logs = await prisma.auditLog.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { admin: { select: { email: true } } },
  });

  // Preia Analytics-ul de astăzi
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  
  const todayStats = await prisma.analyticsSummary.findUnique({
    where: { date: today }
  });

  // --- TRAFIC SI GRAFICE ---
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setUTCHours(0, 0, 0, 0);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const recentSummaries = await prisma.analyticsSummary.findMany({
    where: { date: { gte: sevenDaysAgo } },
    orderBy: { date: "asc" }
  });

  const chartData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setUTCHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    
    const summary = recentSummaries.find(s => s.date.getTime() === d.getTime());
    
    chartData.push({
      date: d.toLocaleDateString("ro-RO", { day: "2-digit", month: "short" }),
      views: summary?.totalViews || 0
    });
  }

  const topPagesGroups = await prisma.pageView.groupBy({
    by: ['url'],
    _count: { url: true },
    where: { createdAt: { gte: sevenDaysAgo } },
    orderBy: { _count: { url: 'desc' } },
    take: 5
  });

  const topPages = topPagesGroups.map(group => ({
    url: group.url,
    views: group._count.url
  }));

  return (
    <div style={{ maxWidth: "1000px" }}>
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        paddingBottom: "1.5rem",
        marginBottom: "2rem"
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.8rem" }}>
            Panou de Control
          </h1>
          <p style={{ margin: "0.5rem 0 0 0", color: "#94a3b8" }}>
            Conectat ca <strong style={{ color: "#f8fafc" }}>{session.user?.email}</strong>
          </p>
        </div>
      </header>
      
      {/* ── Secțiunea de Statistici (Analytics) ── */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2.5rem"
      }}>
        <div style={{ padding: "1.5rem", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#94a3b8", fontSize: "0.9rem" }}>Total Vizite (Azi)</h3>
          <p style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", color: "#f8fafc" }}>{todayStats?.totalViews || 0}</p>
        </div>
        
        <div style={{ padding: "1.5rem", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#94a3b8", fontSize: "0.9rem" }}>Vizitatori Desktop</h3>
          <p style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", color: "#38bdf8" }}>{todayStats?.desktopViews || 0}</p>
        </div>
        
        <div style={{ padding: "1.5rem", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#94a3b8", fontSize: "0.9rem" }}>Vizitatori Mobil</h3>
          <p style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", color: "#a78bfa" }}>{todayStats?.mobileViews || 0}</p>
        </div>
      </section>

      {/* ── Grafic de Trafic ── */}
      <TrafficChart chartData={chartData} topPages={topPages} />

      {/* ── Secțiunea de Jurnalizare (Audit Logs) ── */}
      <section style={{ 
        backgroundColor: "rgba(255,255,255,0.03)", 
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
        overflow: "hidden"
      }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(0,0,0,0.2)" }}>
          <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "600" }}>Ultimele Acțiuni (Audit Logs)</h2>
          <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.85rem", color: "#94a3b8" }}>
            Istoricul activităților recente, cu limită de 10 înregistrări.
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ backgroundColor: "rgba(255,255,255,0.02)", textAlign: "left", color: "#94a3b8" }}>
                <th style={{ padding: "1rem" }}>Dată / Oră</th>
                <th style={{ padding: "1rem" }}>Acțiune</th>
                <th style={{ padding: "1rem" }}>Utilizator (Email)</th>
                <th style={{ padding: "1rem" }}>Adresă IP</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "1rem", color: "#cbd5e1" }}>
                      {new Date(log.createdAt).toLocaleString("ro-RO")}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        backgroundColor: log.action.includes("LOGIN") ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 255, 255, 0.1)",
                        color: log.action.includes("LOGIN") ? "#4ade80" : "#f8fafc",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                      }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", color: "#cbd5e1" }}>
                      {log.admin.email}
                    </td>
                    <td style={{ padding: "1rem", color: "#94a3b8", fontFamily: "monospace" }}>
                      {log.ipAddress || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>
                    Nicio acțiune înregistrată încă.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
