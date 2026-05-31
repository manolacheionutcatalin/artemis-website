"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost } from "@/app/actions/blog";
import Link from "next/link";

interface BlogPostData {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  published: boolean;
}

interface BlogFormProps {
  initialData?: BlogPostData;
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const isEditing = !!initialData?.id;

  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [published, setPublished] = useState(initialData?.published || false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!title || !excerpt || !content) {
      setError("Titlul, rezumatul și conținutul sunt câmpuri obligatorii.");
      setIsLoading(false);
      return;
    }

    const payload = {
      title,
      excerpt,
      content,
      coverImage: coverImage || undefined,
      published,
    };

    let result;
    if (isEditing && initialData?.id) {
      result = await updateBlogPost(initialData.id, payload);
    } else {
      result = await createBlogPost(payload);
    }

    if (result.success) {
      router.push("/dashboard/blog");
      router.refresh();
    } else {
      setError(result.message || "A apărut o eroare la salvarea articolului.");
      setIsLoading(false);
    }
  };

  // Randare text formatat simplu în tab-ul de previzualizare
  const renderContentPreview = (text: string) => {
    if (!text) return <p style={{ color: "#64748b" }}>Scrie ceva în editor pentru a previzualiza...</p>;
    return text.split("\n\n").map((paragraph, index) => {
      // Suport de bază pentru titluri începând cu #
      if (paragraph.startsWith("### ")) {
        return <h4 key={index} style={{ color: "#f8fafc", marginTop: "1.5rem", marginBottom: "0.5rem" }}>{paragraph.replace("### ", "")}</h4>;
      }
      if (paragraph.startsWith("## ")) {
        return <h3 key={index} style={{ color: "#f8fafc", marginTop: "1.8rem", marginBottom: "0.75rem", fontSize: "1.4rem" }}>{paragraph.replace("## ", "")}</h3>;
      }
      if (paragraph.startsWith("# ")) {
        return <h2 key={index} style={{ color: "#f8fafc", marginTop: "2rem", marginBottom: "1rem", fontSize: "1.8rem" }}>{paragraph.replace("# ", "")}</h2>;
      }
      return (
        <p key={index} style={{ 
          color: "#cbd5e1", 
          lineHeight: "1.7", 
          marginBottom: "1.2rem",
          fontSize: "1.05rem",
          whiteSpace: "pre-line"
        }}>
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {error && (
        <div style={{
          padding: "1rem",
          borderRadius: "8px",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          color: "#f87171",
          border: "1px solid rgba(239, 68, 68, 0.2)"
        }}>
          {error}
        </div>
      )}

      {/* Selector Tab-uri (Editare vs Previzualizare) */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem", gap: "1rem" }}>
        <button
          type="button"
          onClick={() => setActiveTab("edit")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: activeTab === "edit" ? "rgba(255,255,255,0.05)" : "transparent",
            color: activeTab === "edit" ? "#38bdf8" : "#94a3b8",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.9rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Scriere Articol
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: activeTab === "preview" ? "rgba(255,255,255,0.05)" : "transparent",
            color: activeTab === "preview" ? "#38bdf8" : "#94a3b8",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.9rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Previzualizare Live
        </button>
      </div>

      {activeTab === "edit" ? (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="title" style={{ color: "#94a3b8", fontSize: "0.95rem", fontWeight: "500" }}>Titlu Articol</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex: Cum să depășim anxietatea cotidiană în 5 pași"
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f8fafc",
                fontFamily: "inherit",
                fontSize: "1rem"
              }}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="coverImage" style={{ color: "#94a3b8", fontSize: "0.95rem", fontWeight: "500" }}>URL Imagine Copertă (Opțional)</label>
            <input
              type="url"
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="ex: https://images.unsplash.com/photo-1506126613408-eca07ce68773"
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f8fafc",
                fontFamily: "inherit",
                fontSize: "0.95rem"
              }}
            />
            {coverImage && (
              <div style={{ marginTop: "0.5rem" }}>
                <small style={{ color: "#64748b", display: "block", marginBottom: "0.25rem" }}>Previzualizare copertă:</small>
                <img 
                  src={coverImage} 
                  alt="Cover preview" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  style={{ maxHeight: "150px", borderRadius: "6px", objectFit: "cover" }}
                />
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="excerpt" style={{ color: "#94a3b8", fontSize: "0.95rem", fontWeight: "500" }}>Scurt Rezumat (Excerpt)</label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              maxLength={200}
              placeholder="Un rezumat de 1-2 propoziții care va fi afișat în lista de articole pe site. (Max 200 caractere)"
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f8fafc",
                fontFamily: "inherit",
                fontSize: "0.95rem",
                resize: "vertical"
              }}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label htmlFor="content" style={{ color: "#94a3b8", fontSize: "0.95rem", fontWeight: "500" }}>Conținutul Articolului</label>
              <small style={{ color: "#64748b" }}>Folosește dublu Enter pentru un paragraf nou. Adaugă „## ” pentru subtitluri.</small>
            </div>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              placeholder="Scrie textul integral aici...&#10;&#10;## Depășirea anxietății&#10;Primul pas constă în conștientizare..."
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f8fafc",
                fontFamily: "inherit",
                fontSize: "1rem",
                lineHeight: "1.6",
                resize: "vertical"
              }}
              required
            />
          </div>

          {/* Toggle pentru Publicare */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "0.5rem 0" }}>
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              style={{
                width: "1.2rem",
                height: "1.2rem",
                cursor: "pointer",
                accentColor: "#38bdf8"
              }}
            />
            <label htmlFor="published" style={{ color: "#f8fafc", fontSize: "0.95rem", fontWeight: "500", cursor: "pointer" }}>
              Publică articolul direct pe site (dacă nu e bifat, va fi salvat ca Ciornă privată)
            </label>
          </div>

          {/* Butoane acțiune */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#38bdf8",
                color: "#0f172a",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
                transition: "all 0.2s"
              }}
            >
              {isLoading ? "Se salvează..." : isEditing ? "Salvează Articolul" : "Publică Articolul"}
            </button>
            <Link
              href="/dashboard/blog"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "#f8fafc",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.2s"
              }}
            >
              Renunță
            </Link>
          </div>

        </form>
      ) : (
        /* Zona de Previzualizare */
        <div style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "12px",
          padding: "2rem",
          minHeight: "400px"
        }}>
          {coverImage && (
            <img 
              src={coverImage} 
              alt="Cover representative" 
              style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "8px", marginBottom: "2rem", border: "1px solid rgba(255,255,255,0.1)" }}
            />
          )}
          <h1 style={{ color: "#f8fafc", fontSize: "2.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
            {title || "Titlu Articol Probă"}
          </h1>
          <div style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "2rem", display: "flex", gap: "1rem" }}>
            <span>Autor: {initialData?.title ? "Editat" : "Cătălin Manolache"}</span>
            <span>•</span>
            <span>Dată: {new Date().toLocaleDateString("ro-RO")}</span>
          </div>
          
          {/* Rezumat */}
          {excerpt && (
            <div style={{
              padding: "1rem",
              borderLeft: "4px solid #d4a373",
              backgroundColor: "rgba(212, 163, 115, 0.05)",
              color: "#cbd5e1",
              fontStyle: "italic",
              marginBottom: "2rem",
              borderRadius: "0 8px 8px 0",
              fontSize: "1.1rem"
            }}>
              {excerpt}
            </div>
          )}

          {/* Conținutul propriu-zis */}
          <div>
            {renderContentPreview(content)}
          </div>
        </div>
      )}
    </div>
  );
}
