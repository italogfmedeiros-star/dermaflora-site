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
  /**
   * Como a arte preenche o palco:
   * - "cover" (padrão): recorta e ocupa o palco todo;
   * - "contain": mostra inteira sobre um fundo desfocado (artes em retrato);
   * - "card": no desktop vira um cartão 16:9 à direita, sobre fundo desfocado, pra
   *   não ficar atrás das pílulas (use em artes com texto no lado esquerdo).
   */
  fit?: "cover" | "contain" | "card";
  /** Ponto focal do recorte (CSS object-position), só vale com fit "cover" */
  objectPosition?: string;
  /**
   * Só desktop, só com fit "cover": amplia a arte ancorada à esquerda pra empurrar o
   * texto que ela tem no lado esquerdo pra fora da área das pílulas, e tira o véu
   * claro que desbotaria esse texto. Alternativa ao "card" quando a arte deve
   * preencher o palco inteiro.
   */
  shiftRight?: boolean;
  /** Matéria do blog sobre o produto: vira o botão "Ler no blog" da legenda */
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
    moreHref: "/blog/caps-active-cream-creme-em-capsulas-para-pele-radiante",
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
    image: "/images/destaques/gutfiber-digestao.jpg",
    alt: "Arte do Gutfiber®: mulher com a mão na barriga, \"Seu aliado na digestão e na perda de peso!\"",
    shiftRight: true,
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
    moreHref: "/blog/peptpure-proaging-peptideos-de-colageno-longevidade-da-pele",
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
    moreHref: "/blog/glowboost-efeito-botox-floral-sem-agulhas",
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
  {
    id: "estrog-100",
    image: "/images/destaques/estrog-100-mulher.webp",
    alt: "Frasco do EstroG-100 sobre uma bandeja de pedra, ao lado de uma mulher que segura uma cápsula",
    objectPosition: "70% 50%",
    moreHref: "/blog/estrog-100-equilibrio-em-cada-fase-menopausa",
    pt: {
      name: "EstroG-100",
      description:
        "Equilíbrio em cada fase. Auxilia no alívio dos sintomas da menopausa e contribui para o equilíbrio do humor e do sono, com ação antioxidante e anti-inflamatória. Extrato fitoterápico patenteado, sem hormônios e sem fitoestrógenos.",
    },
    en: {
      name: "EstroG-100",
      description:
        "Balance at every stage. Helps relieve menopause symptoms and supports mood and sleep balance, with antioxidant and anti-inflammatory action. A patented herbal extract, free of hormones and phytoestrogens.",
    },
  },
];
