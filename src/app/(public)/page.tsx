import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import FAQ from "@/components/FAQ/FAQ";
import Booking from "@/components/Booking/Booking";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <FAQ />
      <Booking />
    </main>
  );
}
