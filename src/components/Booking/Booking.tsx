"use client";

import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";
import styles from "./Booking.module.css";

export default function Booking() {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Ne asigurăm că setăm elementul rădăcină doar pe client
    // Astfel evităm erori de tipul "document is not defined" în timpul Server Side Rendering-ului.
    if (typeof document !== "undefined") {
      setRootElement(document.body);
    }
  }, []);

  return (
    <section
      id="programare"
      className={styles.booking}
      aria-label="Programare"
    >
      <div className={styles.bookingContent}>
        <span className={styles.bookingLabel}>Programare</span>

        <h2 className={styles.bookingHeading}>
          Primul pas este cel mai important
        </h2>

        <p className={styles.bookingText}>
          Nu ai nevoie de un motiv perfect pentru a cere ajutor. Alege o dată
          și o oră direct din calendar care se aliniază cu programul tău. Conversația
          noastră rămâne în deplină confidențialitate.
        </p>

        {rootElement ? (
          <PopupButton
            url="https://calendly.com/manolache-ionut-catalin"
            rootElement={rootElement}
            text="Programează o ședință"
            className={styles.bookingButton}
          />
        ) : (
          <button className={styles.bookingButton} disabled style={{ opacity: 0.7, cursor: "wait" }}>
            Se încarcă...
          </button>
        )}
      </div>
    </section>
  );
}
