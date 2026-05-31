"use client";

import { useState } from "react";
import { updateSiteSettings } from "@/app/actions/settings";

interface InitSettings {
  heroMessage: string;
  sessionPrice: string;
}

export default function SettingsForm({ initialSettings }: { initialSettings: InitSettings }) {
  const [heroMessage, setHeroMessage] = useState(initialSettings.heroMessage);
  const [sessionPrice, setSessionPrice] = useState(initialSettings.sessionPrice);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const payload = [
      { key: "hero_message", value: heroMessage },
      { key: "session_price", value: sessionPrice }
    ];

    const result = await updateSiteSettings(payload);
    
    if (result.success) {
      setStatus({ type: "success", message: "Setările au fost salvate cu succes!" });
    } else {
      setStatus({ type: "error", message: result.message || "Eroare la salvare." });
    }
    
    setIsLoading(false);
  };

  return (
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
        <label htmlFor="heroMessage" style={{ color: "#94a3b8", fontSize: "0.95rem" }}>Mesaj Subtitlu Hero (Homepage)</label>
        <textarea
          id="heroMessage"
          value={heroMessage}
          onChange={(e) => setHeroMessage(e.target.value)}
          rows={3}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            backgroundColor: "rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#f8fafc",
            fontFamily: "inherit",
            resize: "vertical"
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label htmlFor="sessionPrice" style={{ color: "#94a3b8", fontSize: "0.95rem" }}>Preț Ședință Consiliere (ex: 120 lei)</label>
        <input
          type="text"
          id="sessionPrice"
          value={sessionPrice}
          onChange={(e) => setSessionPrice(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            backgroundColor: "rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#f8fafc",
            fontFamily: "inherit"
          }}
        />
      </div>

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
          alignSelf: "flex-start",
          marginTop: "1rem"
        }}
      >
        {isLoading ? "Se salvează..." : "Salvează Setările"}
      </button>
    </form>
  );
}
