"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Acasă", href: "/#hero" },
    { name: "Despre Mine", href: "/#despre" },
    { name: "Servicii", href: "/#servicii" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        <Link href="/#hero" className={styles.logo}>
          Artemis.
        </Link>
        
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ""}`}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className={styles.navLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#programare"
            className={styles.ctaButton}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Programează o ședință
          </Link>
        </nav>

        <button 
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Deschide meniul de navigare"
        >
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ""}`}></span>
        </button>
      </div>
    </header>
  );
}
