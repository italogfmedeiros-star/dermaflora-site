import { Header } from "@/components/Header";
import { PerksBar } from "@/components/PerksBar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Purpose } from "@/components/Purpose";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { News } from "@/components/News";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <PerksBar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Purpose />
        <HowItWorks />
        <Testimonials />
        <News />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
