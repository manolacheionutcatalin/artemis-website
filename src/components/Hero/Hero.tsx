import styles from "./Hero.module.css";

interface HeroProps {
  heroMessage?: string;
}

export default function Hero({ heroMessage }: HeroProps) {
  return (
    <section id="hero" className={styles.hero} aria-label="Bun venit">
      <div className={styles.heroContent}>
        {/* Breathing indicator — a subtle pulsing dot */}
        <div className={styles.breatheIndicator} aria-hidden="true" />

        {/* Main message */}
        <h1 className={styles.heroHeading}>
          Respiră, împământează-te.
          <span className={styles.heroHeadingAccent}>
            Sunt aici cu tine.
          </span>
        </h1>

        {/* Supporting text */}
        <p className={styles.heroSubtext}>
          {heroMessage || "Nu trebuie să înfrunți totul singur. Primul pas este doar să te oprești o clipă — restul construim împreună, în ritmul tău."}
        </p>

        {/* CTA */}
        <a
          id="hero-cta"
          href="#programare"
          className={styles.heroCta}
          aria-label="Navighează spre secțiunea de programare"
        >
          Ai nevoie de ajutor acum?
          <span className={styles.ctaArrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollHintLine} />
      </div>
    </section>
  );
}
