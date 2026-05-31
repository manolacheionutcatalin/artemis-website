import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BlogForm from "../../BlogForm";
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h1>Acces Interzis</h1>
        <p>Nu ești autentificat.</p>
      </div>
    );
  }

  const { id } = await params;

  // Preia articolul din baza de date
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h1>Articolul nu a fost găsit</h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Acest articol nu există sau a fost deja șters.</p>
        <Link 
          href="/dashboard/blog" 
          style={{ 
            padding: "0.6rem 1.2rem", 
            backgroundColor: "#38bdf8", 
            color: "#0f172a", 
            borderRadius: "8px", 
            fontWeight: "600",
            textDecoration: "none" 
          }}
        >
          &larr; Înapoi la Blog
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px" }}>
      <header style={{ 
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        paddingBottom: "1.5rem",
        marginBottom: "2rem"
      }}>
        <h1 style={{ margin: 0, fontSize: "1.8rem" }}>
          Editează Articolul
        </h1>
        <p style={{ margin: "0.5rem 0 0 0", color: "#94a3b8" }}>
          Modifică conținutul sau setările de publicare pentru articolul selectat.
        </p>
      </header>

      <section style={{
        backgroundColor: "rgba(255,255,255,0.03)", 
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "2rem"
      }}>
        <BlogForm initialData={post} />
      </section>
    </div>
  );
}
