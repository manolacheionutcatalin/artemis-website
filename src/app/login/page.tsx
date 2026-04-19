"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Dacă a fost redirecționat de middleware, preia URL-ul de întoarcere
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Apelează NextAuth pentru autentificare folosind configurarea "credentials"
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Email sau parolă incorectă.");
      setLoading(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Admin Login</h1>
        
        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Parolă</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Se autentifică..." : "Autentificare"}
        </button>
      </form>
    </div>
  );
}

// Stiluri inline de bază pentru simplitate, potrivite cromaticii site-ului
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--color-bg-deep, #0a0f18)",
    fontFamily: "var(--font-body, sans-serif)",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  title: {
    color: "#fff",
    textAlign: "center" as const,
    marginBottom: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  label: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "0.9rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "6px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    fontSize: "1rem",
  },
  button: {
    marginTop: "1rem",
    padding: "0.85rem",
    backgroundColor: "var(--color-accent-warm, #d4a373)",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  },
  error: {
    color: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: "0.5rem",
    borderRadius: "4px",
    textAlign: "center" as const,
    fontSize: "0.9rem",
  },
};
