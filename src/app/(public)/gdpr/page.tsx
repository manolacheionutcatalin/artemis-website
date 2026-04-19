export default function PoliticaConfidentialitate() {
  return (
    <main style={{ maxWidth: "800px", margin: "100px auto 60px", padding: "0 1.5rem", minHeight: "60vh" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 5vw, 2.5rem)", marginBottom: "2rem", color: "var(--color-text-primary)" }}>
        Politica de Confidențialitate (GDPR)
      </h1>
      
      <div style={{ color: "var(--color-text-secondary)", lineHeight: "1.8", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <p>
          Această politică explică modul în care protejăm datele dumneavoastră cu caracter personal, în conformitate cu prevederile Regulamentului (UE) 2016/679 (GDPR).
        </p>

        <section>
          <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>1. Datele pe care le colectăm</h2>
          <p>
            În vederea furnizării serviciilor psihologice și a realizării programărilor, prelucrăm următoarele date: nume, prenume, adresa de e-mail, număr de telefon (prin intermediul platformei Calendly). 
            Pe parcursul ședințelor, se pot colecta date sensibile privind sănătatea mintală, acestea beneficiind de confidențialitate absolută conform legifereării COPSI.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>2. Scopul colectării</h2>
          <p>
            Colectăm aceste date strict pentru:
          </p>
          <ul style={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
            <li>A facilita programarea și comunicarea legată de ședințele dumneavoastră.</li>
            <li>A elabora dosare de profil clinic (notite personale ale psihologului).</li>
            <li>Eliberarea rapoartelor psihologice/facturare.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>3. Durata stocării</h2>
          <p>
            Datele minime necesare pentru programare se vor menține pe durata intervenției terapeutice. Rapoartele și dosarele psihologice sunt arhivate conform dispozițiilor imperative ale Colegiului Psihologilor din România.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>4. Drepturile dumneavoastră</h2>
          <p>
            Aveți dreptul de a solicita accesul la datele dumneavoastră, rectificarea acestora, ștergerea lor (în limitele legii privind actul medical/psihologic), de a retrage consimțământul și de a depune o plângere la autoritatea de supraveghere competentă (ANSPDCP).
          </p>
        </section>
      </div>
    </main>
  );
}
