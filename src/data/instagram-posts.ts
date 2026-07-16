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
