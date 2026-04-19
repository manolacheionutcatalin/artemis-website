"use client";

import styles from "./Booking.module.css";

const CALENDLY_URL = "https://calendly.com/manolache-ionut-catalin/sedinta-de-consiliere";

export default function Booking() {
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

        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bookingButton}
        >
          Programează o ședință
        </a>
      </div>
    </section>
  );
}
