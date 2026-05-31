"use client";

import { useState } from "react";
import { deleteBlogPost } from "@/app/actions/blog";

interface DeletePostButtonProps {
  id: string;
  title: string;
}

export default function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Sigur dorești să ștergi articolul „${title}”? Această acțiune este ireversibilă.`)) {
      return;
    }

    setIsLoading(true);
    const result = await deleteBlogPost(id);
    if (!result.success) {
      alert(result.message || "A apărut o eroare la ștergerea articolului.");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      style={{
        padding: "0.4rem 0.8rem",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        color: "#f87171",
        border: "1px solid rgba(239, 68, 68, 0.2)",
        borderRadius: "6px",
        fontSize: "0.85rem",
        fontWeight: "500",
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? 0.6 : 1,
        transition: "all 0.2s"
      }}
    >
      {isLoading ? "Se șterge..." : "Șterge"}
    </button>
  );
}
