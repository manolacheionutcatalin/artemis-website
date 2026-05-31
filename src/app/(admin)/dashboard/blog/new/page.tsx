import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import BlogForm from "../BlogForm";

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h1>Acces Interzis</h1>
        <p>Nu ești autentificat.</p>
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
          Adaugă Articol Nou
        </h1>
        <p style={{ margin: "0.5rem 0 0 0", color: "#94a3b8" }}>
          Scrie un articol nou de blog. Salvează-l ca ciornă sau publică-l pe site.
        </p>
      </header>

      <section style={{
        backgroundColor: "rgba(255,255,255,0.03)", 
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "2rem"
      }}>
        <BlogForm />
      </section>
    </div>
  );
}
