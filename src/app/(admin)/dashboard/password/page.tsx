"use client";

import { useState } from "react";
import { changeAdminPassword } from "@/app/actions/auth";
import Link from "next/link";

export default function PasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", message: "Noua parolă și confirmarea ei nu se potrivesc." });
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setStatus({ type: "error", message: "Noua parolă trebuie să aibă cel puțin 8 caractere." });
      setIsLoading(false);
      return;
    }

    const result = await changeAdminPassword({ currentPassword, newPassword });

    if (result.success) {
      setStatus({ type: "success", message: "Parola a fost modificată cu succes!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setStatus({ type: "error", message: result.message || "A apărut o eroare la schimbarea parolei." });
    }

    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px" }}>
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
              Schimbă Parola
            </h1>
          </div>
          <p style={{ margin: "0.5rem 0 0 0", color: "#94a3b8" }}>
            Securizează-ți contul de administrare modificând parola curentă.
          </p>
        </div>
      </header>

      <section style={{
        backgroundColor: "rgba(255,255,255,0.03)", 
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "2rem"
      }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {status && (
            <div style={{
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: status.type === "success" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
              color: status.type === "success" ? "#4ade80" : "#ef4444",
              border: `1px solid ${status.type === "success" ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)"}`
            }}>
              {status.message}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="currentPassword" style={{ color: "#94a3b8", fontSize: "0.95rem" }}>Parola Curentă</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f8fafc",
                fontFamily: "inherit"
              }}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="newPassword" style={{ color: "#94a3b8", fontSize: "0.95rem" }}>Noua Parolă</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f8fafc",
                fontFamily: "inherit"
              }}
              required
            />
            <small style={{ color: "#64748b" }}>Trebuie să aibă minimum 8 caractere.</small>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="confirmPassword" style={{ color: "#94a3b8", fontSize: "0.95rem" }}>Confirmă Noua Parolă</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f8fafc",
                fontFamily: "inherit"
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#d4a373",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              alignSelf: "flex-start",
              marginTop: "1rem"
            }}
          >
            {isLoading ? "Se salvează..." : "Schimbă Parola"}
          </button>
        </form>
      </section>
    </div>
  );
}
