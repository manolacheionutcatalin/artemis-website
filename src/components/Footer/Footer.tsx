import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandInfo}>
            <Link href="/#hero" className={styles.logo}>
              Psih. Cătălin Manolache
            </Link>
            <p className={styles.tagline}>
              Consiliere psihologică și terapie cognitiv-comportamentală. 
              <br />Un spațiu sigur pentru a reconstrui echilibrul.
            </p>
          </div>

          <div className={styles.linksBlock}>
            <h3 className={styles.linksTitle}>Navigare</h3>
            <ul className={styles.linksList}>
              <li>
                <Link href="/#despre" className={styles.link}>Despre Mine</Link>
              </li>
              <li>
                <Link href="/#servicii" className={styles.link}>Servicii</Link>
              </li>
              <li>
                <Link href="/#faq" className={styles.link}>Întrebări Frecvente</Link>
              </li>
              <li>
                <Link href="/#programare" className={styles.link}>Programare</Link>
              </li>
            </ul>
          </div>

          <div className={styles.linksBlock}>
            <h3 className={styles.linksTitle}>Contact</h3>
            <div className={styles.contactInfo}>
              <p>
                <strong>Sesiuni:</strong> Exclusiv Online
              </p>
              <p>
                <strong>Sediu social:</strong> Aleea Ucea, Bl. P4, Sc. A, Ap. 50, Et. 3, București, Sector 4
              </p>
              <p>
                <a href="mailto:manolache.ionut.catalin@gmail.com" className={styles.link}>
                  manolache.ionut.catalin@gmail.com
                </a>
              </p>
              <p>
                Telefon: <a href="tel:0735857598" className={styles.link}>0735857598</a>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {currentYear} Psih. Cătălin Manolache. Toate drepturile rezervate.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/termeni" className={styles.link}>Termeni și condiții</Link>
            <span className={styles.separator}>|</span>
            <Link href="/gdpr" className={styles.link}>Politica de confidențialitate</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
