"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={{
        padding: "0.5rem 1.5rem",
        backgroundColor: "transparent",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "500",
        transition: "all 0.2s"
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      Ieși din cont (Logout)
    </button>
  );
}
