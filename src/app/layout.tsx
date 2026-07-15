import type { Metadata } from "next";
import { Manrope, Work_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Dermaflora Farmácia de Manipulação | Fórmulas sob medida há 45 anos",
  description:
    "Fórmulas magistrais, dermocosmética e nutrição personalizadas para você. Há 45 anos cuidando de saúde, beleza e bem-estar com ciência e atenção em cada detalhe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-df-bg text-df-ink-900">
        {children}
      </body>
    </html>
  );
}
