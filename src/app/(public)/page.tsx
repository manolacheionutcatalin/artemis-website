import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import FAQ from "@/components/FAQ/FAQ";
import Booking from "@/components/Booking/Booking";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const settings = await prisma.siteSettings.findMany();
  
  const heroMessage = settings.find(s => s.key === "hero_message")?.value;
  const sessionPrice = settings.find(s => s.key === "session_price")?.value;

  return (
    <main>
      <Hero heroMessage={heroMessage} />
      <About />
      <Services sessionPrice={sessionPrice} />
      <FAQ />
      <Booking />
    </main>
  );
}
