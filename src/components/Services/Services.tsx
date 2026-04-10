"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Services.module.css";

const services = [
  {
    icon: "◈",
    title: "Evaluare Clinică și Psihodiagnostic",
    description:
      "Dacă ai nevoie de claritate, realizăm evaluări psihologice și screening detaliat, utilizând instrumente validate științific. Acest pas ne ajută să înțelegem exact cu ce te confrunți și să găsim cel mai bun plan de abordare.",
    prices: [
      { label: "Analiză factori de protecție/stres", value: "100 lei" },
      { label: "Evaluare SCID (min. 4h aplicare + 2h raport)", value: "90 lei / oră" },
      { label: "Evaluare PDSQ (aprox. 2h aplicare + 1h raport)", value: "100 lei / oră" }
    ],
    tags: ["Screening PDSQ", "Screening SCID", "Evaluare BDI", "Raport psihologic"],
  },
  {
    icon: "◇",
    title: "Consiliere Psihologică pentru Adulți",
    description:
      "Lucrăm împreună prin consiliere psihologică cu tehnici cognitiv-comportamentale integrate, pe intervenții de scurtă și medie durată pentru gestionarea anxietății, depresiei, stresului sau a stărilor de criză emoțională. Focusul nostru va fi pe prezent și pe modificarea tiparelor de gândire care îți mențin suferința.",
    prices: [
      { label: "Ședință consiliere (50 min)", value: "120 lei" }
    ],
    tags: ["Anxietate", "Depresie", "Managementul stresului"],
  },
  {
    icon: "○",
    title: "Intervenție pentru Copii și Adolescenți",
    description:
      "Fie că vorbim despre provocări de adaptare școlară, probleme comportamentale sau tulburări de neurodezvoltare, sprijin copiii și adolescenții să își atingă potențialul, colaborând îndeaproape cu părinții.",
    prices: [
      { label: "Intervenții în mediul școlar", value: "Preț negociabil" }
    ],
    tags: ["ADHD", "Spectrul autist", "Adaptare școlară"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="servicii"
      ref={sectionRef}
      className={`${styles.services} ${isVisible ? styles.visible : ""}`}
      aria-label="Servicii"
    >
      <div className={styles.inner}>
        {/* Section label */}
        <span className={styles.sectionLabel}>Cu ce te pot ajuta</span>

        {/* Main heading */}
        <h2 className={styles.heading}>
          Fiecare drum începe cu un prim pas curajos
        </h2>

        <p className={styles.subtext}>
          Indiferent de provocarea cu care te confrunți, există un cadru sigur în
          care poți lucra la ea. Iată câteva dintre zonele în care te pot
          însoți.
        </p>

        {/* Cards grid */}
        <div className={styles.grid}>
          {services.map((service, index) => (
            <article
              key={index}
              className={styles.card}
              style={{ "--card-index": index } as React.CSSProperties}
            >
              {/* Card glow on hover */}
              <div className={styles.cardGlow} aria-hidden="true" />

              <span className={styles.cardIcon} aria-hidden="true">
                {service.icon}
              </span>

              <h3 className={styles.cardTitle}>{service.title}</h3>

              <p className={styles.cardDescription}>{service.description}</p>

              {/* Pricing */}
              {service.prices && (
                <div className={styles.pricingBlock}>
                  {service.prices.map((price, pIndex) => (
                    <div key={pIndex} className={styles.priceRow}>
                      <span className={styles.priceLabel}>{price.label}</span>
                      <span className={styles.priceValue}>{price.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className={styles.tags}>
                {service.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
