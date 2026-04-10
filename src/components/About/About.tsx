"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="despre"
      ref={sectionRef}
      className={`${styles.about} ${isVisible ? styles.visible : ""}`}
      aria-label="Despre mine"
    >
      {/* Decorative separator */}
      <div className={styles.separator} aria-hidden="true">
        <span className={styles.separatorDot} />
      </div>

      {/* Section label */}
      <span className={styles.sectionLabel}>Despre mine</span>

      {/* Main heading */}
      <h2 className={styles.heading}>
        Cine te însoțește în acest proces?
      </h2>

      {/* Two-column layout */}
      <div className={styles.grid}>
        {/* Portrait column */}
        <div className={styles.portraitCol}>
          <div className={styles.portraitWrapper}>
            <Image
              src="/images/portrait.jpg"
              alt="Ionuț-Cătălin Manolache — Psiholog Clinician"
              width={480}
              height={600}
              className={styles.portrait}
              priority={false}
            />
            {/* Ambient glow behind portrait */}
            <div className={styles.portraitGlow} aria-hidden="true" />
          </div>
        </div>

        {/* Text column */}
        <div className={styles.textCol}>
          <p className={styles.intro}>
            Numele meu este <strong>Ionuț-Cătălin Manolache</strong>. Dincolo de
            tehnici și diplome, abordarea mea este, înainte de toate, umană.
          </p>

          <p className={styles.paragraph}>
            Înțeleg că decizia de a cere ajutor vine adesea cu un bagaj de emoții
            contradictorii: speranță, dar și foarte multă reținere. Spațiul pe
            care ți-l ofer este sigur, confidențial și complet lipsit de judecată.
            Ești binevenit exact așa cum ești acum.
          </p>

          <p className={styles.paragraph}>
            Abordarea mea se bazează pe{" "}
            <strong>consiliere psihologică cu tehnici cognitiv-comportamentale
            (CBT) integrate</strong>, orientată pe soluții și ancorată în prezent.
            Aici nu vei găsi promisiuni de „vindecare magică" peste noapte. În
            schimb, îți propun un parteneriat: vom lucra ca o echipă — eu vin cu
            expertiza psihologică și unelte validate științific, iar tu vii cu
            expertiza asupra propriei tale vieți.
          </p>

          {/* Credential badges */}
          <div className={styles.badges}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon} aria-hidden="true">
                ✦
              </span>
              <div>
                <span className={styles.badgeTitle}>Atestat COPSI</span>
                <span className={styles.badgeDetail}>
                  Psiholog Clinic Autonom
                </span>
              </div>
            </div>

            <div className={styles.badge}>
              <span className={styles.badgeIcon} aria-hidden="true">
                ✦
              </span>
              <div>
                <span className={styles.badgeTitle}>Formare</span>
                <span className={styles.badgeDetail}>
                  Master CBT — Universitatea din București
                </span>
              </div>
            </div>

            <div className={styles.badge}>
              <span className={styles.badgeIcon} aria-hidden="true">
                ✦
              </span>
              <div>
                <span className={styles.badgeTitle}>Experiență clinică</span>
                <span className={styles.badgeDetail}>
                  Evaluare, screening și intervenție — adulți și copii
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
