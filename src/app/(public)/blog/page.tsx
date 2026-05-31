import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Blog & Resurse CBT — Psih. Cătălin Manolache",
  description: "Articole, tehnici și ghiduri de psihoterapie cognitiv-comportamentală (CBT) pentru gestionarea anxietății, depresiei și reconstruirea echilibrului emoțional.",
};

export default async function PublicBlogPage() {
  // Preia doar articolele publicate, sortate după data creării
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div style={{ backgroundColor: "var(--color-bg-deep)", minHeight: "100vh", paddingBottom: "var(--space-2xl)" }}>
      {/* ── Navigatie Superioara ── */}
      <nav style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "1.5rem var(--space-sm)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Link href="/" style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-accent-warm)",
          fontSize: "1.4rem",
          fontWeight: "bold",
          textDecoration: "none",
          letterSpacing: "0.5px"
        }}>
          Cătălin Manolache
        </Link>
        <Link href="/" style={{
          color: "var(--color-text-secondary)",
          textDecoration: "none",
          fontSize: "0.95rem",
          fontWeight: "500",
          border: "1px solid var(--color-border-subtle)",
          padding: "0.5rem 1.2rem",
          borderRadius: "var(--radius-full)",
          transition: "all var(--duration-fast)",
        }}>
          &larr; Înapoi la Site
        </Link>
      </nav>

      {/* ── Antet Blog ── */}
      <header style={{
        maxWidth: "800px",
        margin: "var(--space-xl) auto var(--space-2xl) auto",
        textAlign: "center",
        padding: "0 var(--space-sm)"
      }}>
        <span style={{
          color: "var(--color-accent-warm)",
          textTransform: "uppercase",
          fontSize: "0.85rem",
          fontWeight: "600",
          letterSpacing: "2px",
          display: "block",
          marginBottom: "0.75rem"
        }}>
          Ghiduri, Tehnici & Resurse CBT
        </span>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
          color: "var(--color-text-primary)",
          lineHeight: "1.2",
          marginBottom: "1.2rem"
        }}>
          Articole & Resurse Clinice
        </h1>
        <p style={{
          color: "var(--color-text-secondary)",
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          lineHeight: "1.6"
        }}>
          Gânduri, ghiduri practice și articole informative bazate pe Terapia Cognitiv-Comportamentală pentru a te ajuta să înțelegi anxietatea și să îți regăsești echilibrul.
        </p>
      </header>

      {/* ── Grid Articole ── */}
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 var(--space-sm)" }}>
        {posts.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2.5rem",
          }}>
            {posts.map((post) => {
              // Calculează timpul estimat de citire (aprox 200 cuvinte/min)
              const wordCount = post.content.split(/\s+/).length;
              const readingTime = Math.max(1, Math.ceil(wordCount / 200));

              return (
                <article 
                  key={post.id} 
                  style={{
                    backgroundColor: "var(--color-bg-surface)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border-subtle)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s var(--ease-gentle)"
                  }}
                >
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}>
                    
                    {/* Imagine de copertă */}
                    <div style={{ width: "100%", height: "200px", overflow: "hidden", position: "relative", backgroundColor: "var(--color-bg-elevated)" }}>
                      {post.coverImage ? (
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s var(--ease-gentle)",
                          }}
                        />
                      ) : (
                        <div style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--color-text-muted)",
                          fontSize: "0.9rem",
                          fontFamily: "var(--font-display)",
                          fontStyle: "italic"
                        }}>
                          Resursă CBT Artemis
                        </div>
                      )}
                    </div>

                    {/* Conținut Card */}
                    <div style={{ padding: "1.8rem", display: "flex", flexDirection: "column", flexGrow: 1, gap: "1rem" }}>
                      
                      {/* Meta info */}
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--color-text-muted)", fontWeight: "500" }}>
                        <span>{new Date(post.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" })}</span>
                        <span>Lectură: {readingTime} min</span>
                      </div>

                      {/* Titlu */}
                      <h2 style={{
                        fontSize: "1.35rem",
                        fontFamily: "var(--font-display)",
                        color: "var(--color-text-primary)",
                        lineHeight: "1.3",
                        margin: 0,
                      }}>
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p style={{
                        fontSize: "0.95rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: "1.5",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {post.excerpt}
                      </p>

                      {/* Link citește */}
                      <div style={{ 
                        marginTop: "auto", 
                        paddingTop: "1rem", 
                        color: "var(--color-accent-warm)", 
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem"
                      }}>
                        Citește Articolul &rarr;
                      </div>

                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "5rem 2rem",
            backgroundColor: "var(--color-bg-surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border-subtle)"
          }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", marginBottom: "1rem" }}>Blogul se pregătește!</h2>
            <p style={{ color: "var(--color-text-secondary)" }}>Urmează să publicăm primele noastre ghiduri și resurse clinice în curând. Te rugăm să revii!</p>
          </div>
        )}
      </main>
    </div>
  );
}
