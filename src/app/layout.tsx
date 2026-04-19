import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Psih. Cătălin Manolache — Consiliere Psihologică CBT",
  description:
    "Respiră, împământează-te. Te ghidez prin consiliere psihologică cu tehnici cognitiv-comportamentale integrate pentru a gestiona anxietatea și a reconstrui echilibrul emoțional.",
  keywords: [
    "consiliere psihologică",
    "tehnici cognitiv-comportamentale",
    "CBT",
    "anxietate",
    "sănătate mintală",
    "psiholog clinician",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>
        {children}
      </body>
    </html>
  );
}
