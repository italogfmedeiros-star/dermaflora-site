/**
 * Curadoria manual dos posts do Instagram @dermaflora.
 *
 * Para atualizar: substitua as entradas abaixo (mais recente primeiro) e salve
 * a imagem do post em `public/instagram/<shortcode>.jpg` (640×640).
 * A data pode ser obtida no próprio post; o shortcode é o código da URL
 * (instagram.com/dermaflora/p/<shortcode>/).
 */
export type InstagramPost = {
  /** Código do post na URL do Instagram */
  shortcode: string;
  /** Link completo do post */
  permalink: string;
  /** Caminho da imagem local em /public */
  image: string;
  /** Data de publicação (ISO) */
  date: string;
  /** Rótulo curto exibido no chip do card */
  category: string;
  /** Trecho da legenda exibido no card */
  excerpt: string;
};

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    shortcode: "Dd2Hc1TJ3x9",
    permalink: "https://www.instagram.com/dermaflora/reel/Dd2Hc1TJ3x9/",
    image: "/instagram/Dd2Hc1TJ3x9.jpg",
    date: "2026-09-29",
    category: "Eventos",
    excerpt: "Tivemos a honra de estar presentes em mais uma edição do curso de Modulação Intestinal, fortalecendo uma parceria que cresce a cada ano.",
  },
  {
    shortcode: "DdTveA3R4q_",
    permalink: "https://www.instagram.com/dermaflora/reel/DdTveA3R4q_/",
    image: "/instagram/DdTveA3R4q_.jpg",
    date: "2026-09-15",
    category: "Produtos",
    excerpt: "O tempo passa, a forma como cuidamos da pele evolui. PeptPure ProAging nasce desse conceito: ciência e inovação conectadas a uma nova visão sobre a longevidade da pele.",
  },
  {
    shortcode: "DdRGSZLxk3z",
    permalink: "https://www.instagram.com/dermaflora/p/DdRGSZLxk3z/",
    image: "/instagram/DdRGSZLxk3z.jpg",
    date: "2026-09-14",
    category: "Institucional",
    excerpt: "A confiança de quem escolhe a Dermaflora também faz parte da nossa história. Cada avaliação representa uma experiência e o compromisso em cada detalhe do atendimento.",
  },
  {
    shortcode: "DdJiqUSRb7I",
    permalink: "https://www.instagram.com/dermaflora/p/DdJiqUSRb7I/",
    image: "/instagram/DdJiqUSRb7I.jpg",
    date: "2026-09-11",
    category: "Produtos",
    excerpt: "Praticidade e cuidado em um só passo. Os Pads combinam tecnologia e ativos para limpar, renovar, hidratar e tratar a pele todos os dias.",
  },
  {
    shortcode: "DdG35dBROOv",
    permalink: "https://www.instagram.com/rwellnessclub/reel/DdG35dBROOv/",
    image: "/instagram/DdG35dBROOv.jpg",
    date: "2026-09-10",
    category: "Produtos",
    excerpt: "PeptiPump: um peptídeo voltado à melhora da performance, e uma creatina fosfatada desenvolvida para maior absorção e biodisponibilidade.",
  },
  {
    shortcode: "DdCCRizRFuW",
    permalink: "https://www.instagram.com/dermaflora/reel/DdCCRizRFuW/",
    image: "/instagram/DdCCRizRFuW.jpg",
    date: "2026-09-08",
    category: "Produtos",
    excerpt: "E se o cuidado com a pele também pudesse começar de dentro para fora? Conheça o PeptPure Proaging, peptídeos bioativos de colágeno orgânico.",
  },
  {
    shortcode: "Dcv23f9EeeI",
    permalink: "https://www.instagram.com/dermaflora/p/Dcv23f9EeeI/",
    image: "/instagram/Dcv23f9EeeI.jpg",
    date: "2026-09-01",
    category: "Você sabia?",
    excerpt: "A pele muda com o tempo, isso é natural. O que não deveria ser normal é perder vitalidade, firmeza e luminosidade cedo demais.",
  },
  {
    shortcode: "DcuB_wRpwMK",
    permalink: "https://www.instagram.com/dermaflora/p/DcuB_wRpwMK/",
    image: "/instagram/DcuB_wRpwMK.jpg",
    date: "2026-08-31",
    category: "Institucional",
    excerpt: "Neste Dia do Nutricionista, celebramos quem transforma conhecimento em cuidado, escolhas em saúde e ciência em bem-estar.",
  },
  {
    shortcode: "Dcg9xTDJ2-m",
    permalink: "https://www.instagram.com/dermaflora/reel/Dcg9xTDJ2-m/",
    image: "/instagram/Dcg9xTDJ2-m.jpg",
    date: "2026-08-26",
    category: "Institucional",
    excerpt: "Hoje foi dia de abrir as portas de nossos laboratórios para uma experiência incrível!",
  },
  {
    shortcode: "DcO5xiIJ-_B",
    permalink: "https://www.instagram.com/dermaflora/p/DcO5xiIJ-_B/",
    image: "/instagram/DcO5xiIJ-_B.jpg",
    date: "2026-08-19",
    category: "Produtos",
    excerpt: "Efeito Botox Floral: cuidado inteligente, sem agulhas. Conheça o GlowBoost®, ativo vegetal que relaxa, preenche e hidrata a pele.",
  },
  {
    shortcode: "DcMMFvCxBkH",
    permalink: "https://www.instagram.com/dermaflora/reel/DcMMFvCxBkH/",
    image: "/instagram/DcMMFvCxBkH.jpg",
    date: "2026-08-18",
    category: "Produtos",
    excerpt: "Tem novidade brilhando por aqui! Fórmulas clareadoras com regeneradora, vitamina C, needle e efeito lifting.",
  },
  {
    shortcode: "Db9JOtQp2Wu",
    permalink: "https://www.instagram.com/dermaflora/p/Db9JOtQp2Wu/",
    image: "/instagram/Db9JOtQp2Wu.jpg",
    date: "2026-08-12",
    category: "Produtos",
    excerpt: "O segredo da pele radiante! Caps Active Cream: clareadora, regeneradora, com vitamina C, needle e efeito lifting.",
  },
  {
    shortcode: "Db5pCL_RWlN",
    permalink: "https://www.instagram.com/dermaflora/reel/Db5pCL_RWlN/",
    image: "/instagram/Db5pCL_RWlN.jpg",
    date: "2026-08-11",
    category: "Produtos",
    excerpt: "Uma nova experiência em skincare chegou à Dermaflora! Fórmulas clareadoras, regeneradoras, com vitamina C e efeito lifting.",
  },
  {
    shortcode: "Db0d1TPxszN",
    permalink: "https://www.instagram.com/dermaflora/p/Db0d1TPxszN/",
    image: "/instagram/Db0d1TPxszN.jpg",
    date: "2026-08-09",
    category: "Institucional",
    excerpt: "Hoje celebramos a essência da proteção, da dedicação e do cuidado. Feliz Dia dos Pais!",
  },
  {
    shortcode: "DbauwEhxYqN",
    permalink: "https://www.instagram.com/dermaflora/reel/DbauwEhxYqN/",
    image: "/instagram/DbauwEhxYqN.jpg",
    date: "2026-07-30",
    category: "Produtos",
    excerpt:
      "Pept Exo reúne peptídeos com exossomas nanoestruturados, uma tecnologia que estimula o rejuvenescimento celular e potencializa os mecanismos naturais de reparo da pele.",
  },
  {
    shortcode: "Dad6qsNJiS6",
    permalink: "https://www.instagram.com/dermaflora/reel/Dad6qsNJiS6/",
    image: "/instagram/Dad6qsNJiS6.jpg",
    date: "2026-07-06",
    category: "Eventos",
    excerpt:
      "Voltamos da Consulfarma com a mala cheia de conhecimento e o olhar voltado para o futuro da saúde.",
  },
  {
    shortcode: "DaQNWcCEQP6",
    permalink: "https://www.instagram.com/dermaflora/p/DaQNWcCEQP6/",
    image: "/instagram/DaQNWcCEQP6.jpg",
    date: "2026-07-01",
    category: "Produtos",
    excerpt:
      "Muito mais do que modelar o cabelo, a Hair Style MEN entrega controle, definição e acabamento natural para acompanhar você em qualquer ocasião.",
  },
  {
    shortcode: "DZ-DgJ3Ed1C",
    permalink: "https://www.instagram.com/dermaflora/p/DZ-DgJ3Ed1C/",
    image: "/instagram/DZ-DgJ3Ed1C.jpg",
    date: "2026-06-24",
    category: "Institucional",
    excerpt:
      "O São João celebra histórias, encontros e memórias. Assim como essa tradição atravessa gerações, a Dermaflora constrói sua história com cuidado.",
  },
  {
    shortcode: "DZ5dEOaiQAH",
    permalink: "https://www.instagram.com/dermaflora/p/DZ5dEOaiQAH/",
    image: "/instagram/DZ5dEOaiQAH.jpg",
    date: "2026-06-22",
    category: "Saúde",
    excerpt:
      "Você culpa a comida, mas será que o problema está apenas nela? Nas festas juninas, os sabores tradicionais podem pesar na digestão.",
  },
  {
    shortcode: "DZa5xrsJfmv",
    permalink: "https://www.instagram.com/dermaflora/reel/DZa5xrsJfmv/",
    image: "/instagram/DZa5xrsJfmv.jpg",
    date: "2026-06-10",
    category: "Você sabia?",
    excerpt:
      "Você sabia que a cor das cápsulas pode influenciar mais do que apenas a aparência?",
  },
  {
    shortcode: "DZVvZ5JidzN",
    permalink: "https://www.instagram.com/dermaflora/p/DZVvZ5JidzN/",
    image: "/instagram/DZVvZ5JidzN.jpg",
    date: "2026-06-08",
    category: "Institucional",
    excerpt:
      "No jogo do amor, escolha quem cuida de você todos os dias. Neste Dia dos Namorados, celebre os pequenos gestos que transformam a rotina.",
  },
  {
    shortcode: "DZNMWpLkWB_",
    permalink: "https://www.instagram.com/dermaflora/p/DZNMWpLkWB_/",
    image: "/instagram/DZNMWpLkWB_.jpg",
    date: "2026-06-05",
    category: "Produtos",
    excerpt:
      "Você sente inchaço, desconforto intestinal ou sensação constante de peso? Esses sinais podem indicar que seu intestino precisa de mais atenção.",
  },
  {
    shortcode: "DZDvYq2CVTy",
    permalink: "https://www.instagram.com/dermaflora/p/DZDvYq2CVTy/",
    image: "/instagram/DZDvYq2CVTy.jpg",
    date: "2026-06-01",
    category: "Institucional",
    excerpt:
      "Sua essência merece algo único. Na Dermaflora, acreditamos que personalizar é transformar cuidado em experiências.",
  },
];
