import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PerksBar } from "@/components/PerksBar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Destaques } from "@/components/Destaques";
import { Purpose } from "@/components/Purpose";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { News } from "@/components/News";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

const HOME_TITLE = "Farmácia de Manipulação em São Paulo | Dermaflora";
const HOME_DESCRIPTION =
  "Farmácia de manipulação na zona sul de São Paulo (Chácara Santo Antônio). Fórmulas magistrais, dermocosméticos e nutrição sob medida há 45 anos. Peça pelo WhatsApp.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Dermaflora Farmácia de Manipulação",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: "/images/hero-banner.png",
        width: 2172,
        height: 724,
        alt: "Dermaflora Farmácia de Manipulação",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/hero-banner.png"],
  },
};

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
        <Destaques />
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
