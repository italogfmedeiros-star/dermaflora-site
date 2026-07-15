import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { FeaturedProduct } from "@/components/FeaturedProduct";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <FeaturedProduct />
        <HowItWorks />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
