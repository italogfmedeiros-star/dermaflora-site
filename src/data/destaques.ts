/**
 * Curadoria manual dos produtos da seção "Destaques" da home.
 *
 * Para atualizar: edite, troque ou reordene as entradas abaixo. Salve a arte do
 * produto em `public/images/destaques/` e aponte `image` pra ela. O recorte é
 * `object-cover`; ajuste `objectPosition` pra manter o ponto focal da arte
 * visível nos formatos retrato (mobile) e paisagem (desktop).
 */
export type DestaqueCopy = {
  /** Nome do produto exibido na pílula do menu */
  name: string;
  /** Texto do cartão que abre ao clicar na pílula */
  description: string;
};

export type Destaque = {
  id: string;
  /** Caminho da imagem local em /public */
  image: string;
  /** Texto alternativo da imagem */
  alt: string;
  /** Como a arte preenche o palco: "cover" recorta, "contain" mostra inteira sobre um fundo desfocado (use em artes em retrato) */
  fit?: "cover" | "contain";
  /** Ponto focal do recorte (CSS object-position), só vale com fit "cover" */
  objectPosition?: string;
  /** Link secundário (ex.: matéria no blog) mostrado ao lado do botão de WhatsApp */
  moreHref?: string;
  pt: DestaqueCopy;
  en: DestaqueCopy;
};

export const DESTAQUES: Destaque[] = [
  {
    id: "caps-active-cream",
    image: "/images/destaques/caps-active-cream.png",
    alt: "Cinco potes de Caps Active Cream Regeneradora empilhados, com cápsulas coloridas",
    objectPosition: "50% 55%",
    pt: {
      name: "Caps Active Cream",
      description:
        "Creme em cápsulas, clareador e regenerador, com vitamina C e efeito lifting. Reúne peptídeos, niacinamida e astaxantina.",
    },
    en: {
      name: "Caps Active Cream",
      description:
        "A brightening, regenerating cream in capsules, with vitamin C and a lifting effect. Combines peptides, niacinamide and astaxanthin.",
    },
  },
  {
    id: "gutfiber",
    image: "/images/destaques/gutfiber.jpg",
    alt: "Arte do Gutfiber®: \"Você muito mais leve e com a flora intestinal equilibrada\"",
    objectPosition: "60% 50%",
    moreHref: "/blog/gutfiber-fibras-naturais-para-o-intestino",
    pt: {
      name: "Gutfiber®",
      description:
        "Fibras 100% naturais, produto próprio da Dermaflora, para aliviar o desconforto intestinal e equilibrar a flora.",
    },
    en: {
      name: "Gutfiber®",
      description:
        "100% natural fibers, a Dermaflora signature product, to ease gut discomfort and balance the intestinal flora.",
    },
  },
  {
    id: "peptpure-proaging",
    image: "/images/destaques/peptpure-orbita.png",
    alt: "Embalagem do PeptPure Proaging em órbita luminosa, com moléculas ao redor",
    objectPosition: "50% 50%",
    pt: {
      name: "PeptPure Proaging",
      description:
        "Peptídeos bioativos de colágeno orgânico: o cuidado com a pele começando de dentro para fora, pensado para a longevidade da pele.",
    },
    en: {
      name: "PeptPure Proaging",
      description:
        "Bioactive organic collagen peptides: skincare that starts from the inside out, designed for long-term skin health.",
    },
  },
  {
    id: "glow-boost",
    image: "/images/destaques/glowboost-brilho.png",
    alt: "Mulher aplicando o creme Glow Boost no rosto, segurando o pote",
    objectPosition: "70% 50%",
    pt: {
      name: "Glow Boost",
      description:
        "Efeito botox floral, sem agulhas. Ativo de origem vegetal que relaxa, preenche e hidrata, suavizando a aparência das rugas dinâmicas.",
    },
    en: {
      name: "Glow Boost",
      description:
        "A floral botox effect, no needles. A plant-based active that relaxes, fills and hydrates, softening the look of dynamic wrinkles.",
    },
  },
];
