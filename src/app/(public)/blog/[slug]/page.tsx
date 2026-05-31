import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

interface PublicPostPageProps {
  params: Promise<{ slug: string }>;
}

// ── SEO Dinamic ──
export async function generateMetadata({ params }: PublicPostPageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    return {
      title: "Articol Inexistent — Psih. Cătălin Manolache",
    };
  }

  return {
    title: `${post.title} — Psiholog Cătălin Manolache`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    }
  };
}

export default async function PublicPostPage({ params }: PublicPostPageProps) {
  const { slug } = await params;

  // Preia articolul din baza de date
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });

  // Dacă articolul nu există sau nu este publicat, returnează 404
  if (!post || !post.published) {
    notFound();
  }

  // Calculează timpul estimat de citire
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Renderare text formatat simplu în paragrafe și subtitluri
  const renderBlogPostContent = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => {
      // Suport de bază pentru subtitluri începând cu ## sau ###
      if (paragraph.startsWith("### ")) {
        return (
          <h4 key={index} style={{ 
            color: "var(--color-text-primary)", 
            fontFamily: "var(--font-display)",
            marginTop: "2rem", 
            marginBottom: "0.75rem",
            fontSize: "1.25rem",
            fontWeight: "600",
            lineHeight: "1.3"
          }}>
            {paragraph.replace("### ", "")}
          </h4>
        );
      }
      if (paragraph.startsWith("## ")) {
        return (
          <h3 key={index} style={{ 
            color: "var(--color-text-primary)", 
            fontFamily: "var(--font-display)",
            marginTop: "2.5rem", 
            marginBottom: "1rem",
            fontSize: "1.6rem",
            fontWeight: "600",
            lineHeight: "1.3",
            borderBottom: "1px solid var(--color-border-subtle)",
            paddingBottom: "0.5rem"
          }}>
            {paragraph.replace("## ", "")}
          </h3>
        );
      }
      if (paragraph.startsWith("# ")) {
        return (
          <h2 key={index} style={{ 
            color: "var(--color-text-primary)", 
            fontFamily: "var(--font-display)",
            marginTop: "3rem", 
            marginBottom: "1.2rem",
            fontSize: "2rem",
            fontWeight: "700",
            lineHeight: "1.2"
          }}>
            {paragraph.replace("# ", "")}
          </h2>
        );
      }
      return (
        <p key={index} style={{ 
          color: "var(--color-text-secondary)", 
          lineHeight: "1.8", 
          marginBottom: "1.5rem",
          fontSize: "1.1rem",
          whiteSpace: "pre-line"
        }}>
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div style={{ backgroundColor: "var(--color-bg-deep)", minHeight: "100vh", paddingBottom: "var(--space-3xl)" }}>
      {/* ── Navigatie Superioara ── */}
      <nav style={{
        maxWidth: "850px",
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
        }}>
          Cătălin Manolache
        </Link>
        <Link href="/blog" style={{
          color: "var(--color-text-secondary)",
          textDecoration: "none",
          fontSize: "0.95rem",
          fontWeight: "500",
          border: "1px solid var(--color-border-subtle)",
          padding: "0.5rem 1.2rem",
          borderRadius: "var(--radius-full)",
          transition: "all var(--duration-fast)",
        }}>
          &larr; Înapoi la Blog
        </Link>
      </nav>

      {/* ── Corp Articol ── */}
      <main style={{ maxWidth: "850px", margin: "var(--space-lg) auto 0 auto", padding: "0 var(--space-sm)" }}>
        
        {/* Imagine de Copertă Principală */}
        {post.coverImage && (
          <div style={{
            width: "100%",
            maxHeight: "450px",
            height: "50vw",
            minHeight: "220px",
            overflow: "hidden",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border-subtle)",
            marginBottom: "var(--space-lg)",
            backgroundColor: "var(--color-bg-surface)"
          }}>
            <img 
              src={post.coverImage} 
              alt={post.title} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Informații metadata */}
        <div style={{
          display: "flex",
          gap: "1.5rem",
          fontSize: "0.9rem",
          color: "var(--color-text-muted)",
          fontWeight: "500",
          marginBottom: "1rem"
        }}>
          <span>Autor: {post.author.name}</span>
          <span>•</span>
          <span>Publicat: {new Date(post.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" })}</span>
          <span>•</span>
          <span>Lectură: {readingTime} min</span>
        </div>

        {/* Titlu Principal */}
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 5vw, 2.8rem)",
          color: "var(--color-text-primary)",
          lineHeight: "1.25",
          fontWeight: "bold",
          marginBottom: "1.5rem"
        }}>
          {post.title}
        </h1>

        {/* Rezumatul Articolului */}
        {post.excerpt && (
          <div style={{
            padding: "1.5rem",
            borderLeft: "4px solid var(--color-accent-warm)",
            backgroundColor: "rgba(255, 126, 103, 0.03)",
            color: "var(--color-text-secondary)",
            fontStyle: "italic",
            marginBottom: "2.5rem",
            borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
            fontSize: "1.15rem",
            lineHeight: "1.6"
          }}>
            {post.excerpt}
          </div>
        )}

        {/* Conținut Formatat */}
        <div style={{ textRendering: "optimizeLegibility" }}>
          {renderBlogPostContent(post.content)}
        </div>

        {/* Separator sub articol */}
        <hr style={{ border: "none", borderTop: "1px solid var(--color-border-subtle)", margin: "var(--space-2xl) 0 var(--space-lg) 0" }} />

        {/* Secțiune jos: Programare rapidă */}
        <div style={{
          backgroundColor: "var(--color-bg-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-md)",
          padding: "2.5rem",
          textAlign: "center",
          boxShadow: "inset 0 0 20px rgba(255, 126, 103, 0.02)"
        }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-text-primary)", marginBottom: "0.75rem" }}>
            Simți că anxietatea sau stresul îți blochează echilibrul?
          </h3>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.5rem", fontSize: "1rem" }}>
            Putem discuta într-o primă ședință de evaluare. Tehnici CBT practice adaptate stilului tău de viață.
          </p>
          <Link
            href="/#booking"
            style={{
              display: "inline-block",
              padding: "0.85rem 1.8rem",
              backgroundColor: "var(--color-accent-warm)",
              color: "#000",
              borderRadius: "var(--radius-sm)",
              fontWeight: "bold",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
          >
            Programează o Ședință
          </Link>
        </div>

      </main>
    </div>
  );
}
