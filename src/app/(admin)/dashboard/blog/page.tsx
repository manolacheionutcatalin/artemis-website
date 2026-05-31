import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeletePostButton from "./DeletePostButton";

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h1>Acces Interzis</h1>
        <p>Nu ești autentificat.</p>
      </div>
    );
  }

  // Preia toate articolele sortate după data creării
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true } } },
  });

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
            Gestionare Blog
          </h1>
          <p style={{ margin: "0.5rem 0 0 0", color: "#94a3b8" }}>
            Creează, editează și publică articole pe blogul Artemis.
          </p>
        </div>

        <Link
          href="/dashboard/blog/new"
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#38bdf8",
            color: "#0f172a",
            borderRadius: "8px",
            fontSize: "0.9rem",
            fontWeight: "600",
            textDecoration: "none",
            transition: "all 0.2s"
          }}
        >
          + Adaugă Articol
        </Link>
      </header>

      <section style={{ 
        backgroundColor: "rgba(255,255,255,0.03)", 
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
        overflow: "hidden"
      }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ backgroundColor: "rgba(255,255,255,0.02)", textAlign: "left", color: "#94a3b8", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <th style={{ padding: "1.2rem 1rem" }}>Copertă</th>
                <th style={{ padding: "1.2rem 1rem" }}>Titlu Articol</th>
                <th style={{ padding: "1.2rem 1rem" }}>Status</th>
                <th style={{ padding: "1.2rem 1rem" }}>Autor</th>
                <th style={{ padding: "1.2rem 1rem" }}>Dată Creare</th>
                <th style={{ padding: "1.2rem 1rem", textAlign: "right" }}>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background-color 0.2s" }}>
                    <td style={{ padding: "1rem" }}>
                      {post.coverImage ? (
                        <img 
                          src={post.coverImage} 
                          alt="Cover" 
                          style={{ width: "50px", height: "35px", objectFit: "cover", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)" }}
                        />
                      ) : (
                        <div style={{ width: "50px", height: "35px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "#64748b" }}>
                          Fără
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "1rem", fontWeight: "600", color: "#f8fafc", maxWidth: "250px" }}>
                      <div style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        {post.title}
                      </div>
                      <small style={{ color: "#64748b", display: "block", fontWeight: "normal", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        {post.excerpt}
                      </small>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{
                        padding: "0.25rem 0.6rem",
                        borderRadius: "9999px",
                        backgroundColor: post.published ? "rgba(34, 197, 94, 0.15)" : "rgba(148, 163, 184, 0.15)",
                        color: post.published ? "#4ade80" : "#cbd5e1",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                      }}>
                        {post.published ? "Publicat" : "Ciornă"}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", color: "#cbd5e1" }}>
                      {post.author.name}
                    </td>
                    <td style={{ padding: "1rem", color: "#94a3b8" }}>
                      {new Date(post.createdAt).toLocaleDateString("ro-RO")}
                    </td>
                    <td style={{ padding: "1rem", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                        <Link
                          href={`/dashboard/blog/edit/${post.id}`}
                          style={{
                            padding: "0.4rem 0.8rem",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            color: "#38bdf8",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            fontWeight: "500",
                            textDecoration: "none",
                            transition: "all 0.2s"
                          }}
                        >
                          Editează
                        </Link>
                        <DeletePostButton id={post.id} title={post.title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>
                    Niciun articol adăugat încă. Apasă pe „+ Adaugă Articol” pentru a crea primul articol de blog!
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
