export default function TermeniSiConditii() {
  return (
    <main style={{ maxWidth: "800px", margin: "100px auto 60px", padding: "0 1.5rem", minHeight: "60vh" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 5vw, 2.5rem)", marginBottom: "2rem", color: "var(--color-text-primary)" }}>
        Termeni și Condiții
      </h1>
      
      <div style={{ color: "var(--color-text-secondary)", lineHeight: "1.8", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <p>
          Bine ați venit pe site-ul <strong>Cabinetului Individual de Psihologie Cătălin Manolache</strong>. Utilizarea acestui site este supusă următoarelor Termeni și Condiții. Prin accesarea și navigarea pe acest website, sunteți de acord cu acești termeni.
        </p>

        <section>
          <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>1. Informații Generale</h2>
          <p>
            Acest site web este operat de Cabinet Individual de Psihologie Manolache Ionuț-Cătălin. Informațiile prezentate au ca scop furnizarea de detalii despre serviciile de evaluare și consiliere psihologică oferite.
            Sediu social: Aleea Ucea, Bloc P4, Scara A, Apartament 50, Etajul 3, București, Sector 4.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>2. Servicii și Programări</h2>
          <p>
            Serviciile oferite includ evaluare clinică, consiliere psihologică și intervenții psihologice, realizate exclusiv online de un psiholog clinician cu atestat COPSI. 
            Programările se fac prin intermediul platformei Calendly, integrată pe acest site.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>3. Politica de Anulare și Neprezentare</h2>
          <p>
            Respectul reciproc pentru timp este o valoare terapeutică esențială. Dacă nu puteți participa la o ședință programată, vă rugăm să anunțați cu minimum 24 de ore înainte.
            Anulările făcute cu mai puțin de 24 de ore înainte de ora stabilită vor atrage achitarea a 50% din taxa ședinței respective.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>4. Confidențialitatea</h2>
          <p>
            Toate programările și ședințele se desfășoară sub stricta confidențialitate stipulată de normele și reglementările Colegiului Psihologilor din România. Datele dvs. sunt protejate și nu vor fi divulgate, cu excepția cazurilor prevăzute de lege (pericol grav și iminent).
          </p>
        </section>
      </div>
    </main>
  );
}
