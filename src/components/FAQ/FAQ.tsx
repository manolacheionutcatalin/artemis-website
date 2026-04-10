"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

const faqData = [
  {
    question: "Cum funcționează terapia cognitiv-comportamentală (CBT)?",
    answer:
      "CBT se concentrează pe identificarea și transformarea tiparelor de gândire negativă care influențează emoțiile și comportamentele. Este o terapie practică, centrată pe soluții și orientată spre prezent, unde colaborăm pentru a-ți dezvolta abilități concrete pe care să le folosești toată viața.",
  },
  {
    question: "Cât durează o ședință și de câte ședințe voi avea nevoie?",
    answer:
      "O ședință individuală durează 50 de minute. Numărul de ședințe variază în funcție de complexitatea problemelor și de obiectivele tale. De obicei, CBT este o terapie pe termen scurt spre mediu (între 12 și 20 de ședințe), dar progresul tău va dicta ritmul.",
  },
  {
    question: "Cum știu dacă am nevoie de terapie?",
    answer:
      "Dacă simți că stresul, anxietatea, tristețea sau gândurile negative te împiedică să funcționezi normal în viața de zi cu zi, să te bucuri de relații sau să te odihnești, terapia te poate ajuta. Nu trebuie să fii într-o criză majoră pentru a cere sprijin — prevenția este la fel de importantă.",
  },
  {
    question: "Sunt sesiunile confidențiale?",
    answer:
      "Absolut. Tot ce discutăm în ședințele noastre intră sub incidența codului deontologic. Informațiile rămân strict confidențiale, cu excepția situațiilor reglementate de lege în care siguranța ta sau a altora este pusă în pericol grav.",
  },
  {
    question: "Ședințele se desfășoară online?",
    answer:
      "Da, în prezent toate ședințele se desfășoară exclusiv online. Terapia video s-a dovedit a fi la fel de eficientă, aducând avantajul confortului din propriul mediu și salvând timpul petrecut pe drum.",
  },
  {
    question: "Ce se întâmplă dacă trebuie să anulez o programare?",
    answer:
      "Știu că pot apărea situații neprevăzute. Te rog doar să mă anunți cu cel puțin 24 de ore înainte de ora stabilită. Dacă anularea se face cu mai puțin de 24 de ore înainte, se va percepe o taxă reprezentând jumătate din costul ședinței (50%).",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faqSection} aria-label="Întrebări frecvente">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Claritate pentru liniștea ta</h2>
          <p className={styles.subtitle}>
            E natural să ai întrebări înainte de a face un pas spre terapie. 
            Iată câteva dintre cele mai frecvente nedumeriri, explicate pe scurt.
          </p>
        </div>

        <div className={styles.accordionContainer}>
          {faqData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index} 
                className={`${styles.accordionItem} ${isActive ? styles.active : ""}`}
              >
                <button
                  className={styles.accordionToggle}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isActive}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">
                    {isActive ? "−" : "+"}
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={styles.accordionContent}
                  role="region"
                >
                  <p className={styles.answerText}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
