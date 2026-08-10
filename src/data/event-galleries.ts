/**
 * Galerias de fotos por evento, migradas manualmente do site antigo em
 * WordPress (cada evento lá tinha um carrossel de fotos que o schema atual
 * do Supabase — só `cover_image_url` — não comporta).
 *
 * Para adicionar uma galeria: salve as fotos em
 * `public/images/eventos/<slug-do-evento>/` e adicione uma entrada aqui com
 * o mesmo `slug` do registro em `cursos_eventos`.
 */
export type EventGalleryPhoto = {
  src: string;
  alt: string;
};

export type EventGallery = {
  /** Mesmo slug do curso/evento em `cursos_eventos`. */
  slug: string;
  photos: EventGalleryPhoto[];
};

export const EVENT_GALLERIES: EventGallery[] = [
  {
    slug: "modulacao-intestinal-marco-2022",
    photos: [
      {
        src: "/images/eventos/modulacao-marco-2022/foto-01.png",
        alt: "Murilo Pereira apresentando o curso Modulação Intestinal para a plateia",
      },
      {
        src: "/images/eventos/modulacao-marco-2022/foto-02.jpeg",
        alt: "Auditório preparado para o curso, com kits de material sobre as cadeiras",
      },
      {
        src: "/images/eventos/modulacao-marco-2022/foto-03.jpeg",
        alt: "Plateia acompanhando a apresentação no telão",
      },
      {
        src: "/images/eventos/modulacao-marco-2022/foto-04.jpeg",
        alt: "Detalhe do telão com o tema Modulação Intestinal",
      },
      {
        src: "/images/eventos/modulacao-marco-2022/foto-05.jpeg",
        alt: "Participantes acompanhando o conteúdo do curso",
      },
      {
        src: "/images/eventos/modulacao-marco-2022/foto-06.jpeg",
        alt: "Murilo Pereira conduzindo a apresentação no palco",
      },
      {
        src: "/images/eventos/modulacao-marco-2022/foto-07.jpeg",
        alt: "Kits de boas-vindas com pelúcias e material do curso sobre as cadeiras",
      },
      {
        src: "/images/eventos/modulacao-marco-2022/foto-08.jpeg",
        alt: "Vista geral do auditório durante o evento",
      },
      {
        src: "/images/eventos/modulacao-marco-2022/foto-09.jpeg",
        alt: "Momento da apresentação do curso Modulação Intestinal",
      },
      {
        src: "/images/eventos/modulacao-marco-2022/foto-10.jpeg",
        alt: "Participantes do curso Modulação Intestinal reunidos no auditório",
      },
      {
        src: "/images/eventos/modulacao-marco-2022/foto-11.jpeg",
        alt: "Participantes do curso Modulação Intestinal reunidos no auditório",
      },
      {
        src: "/images/eventos/modulacao-marco-2022/foto-12.jpeg",
        alt: "Registro do evento Modulação Intestinal, Março de 2022",
      },
    ],
  },
  {
    slug: "modulacao-intestinal-em-sao-paulo-dez-2021",
    photos: [
      { src: "/images/eventos/dez-2021/foto-01.png", alt: "Momento do evento Modulação Intestinal, Dezembro de 2021" },
      { src: "/images/eventos/dez-2021/foto-02.png", alt: "Registro do evento Modulação Intestinal, Dezembro de 2021" },
    ],
  },
  {
    slug: "hairsceuticals",
    photos: [
      { src: "/images/eventos/hairsceuticals/foto-01.jpeg", alt: "Palestrante da Pharma Special apresentando o evento Hairsceuticals" },
      { src: "/images/eventos/hairsceuticals/foto-02.jpeg", alt: "Participantes acompanhando a apresentação sobre tricologia" },
      { src: "/images/eventos/hairsceuticals/foto-03.jpeg", alt: "Material de apoio do evento Hairsceuticals sobre a mesa" },
      { src: "/images/eventos/hairsceuticals/foto-04.jpeg", alt: "Momento do evento Hairsceuticals – Ciência e Tecnologia da raiz às pontas" },
      { src: "/images/eventos/hairsceuticals/foto-05.jpeg", alt: "Palestrante da Pharma Special apresentando o evento Hairsceuticals" },
      { src: "/images/eventos/hairsceuticals/foto-06.jpeg", alt: "Participantes acompanhando a apresentação sobre tricologia" },
      { src: "/images/eventos/hairsceuticals/foto-07.jpeg", alt: "Material de apoio do evento Hairsceuticals sobre a mesa" },
      { src: "/images/eventos/hairsceuticals/foto-08.jpeg", alt: "Momento do evento Hairsceuticals – Ciência e Tecnologia da raiz às pontas" },
      { src: "/images/eventos/hairsceuticals/foto-09.jpeg", alt: "Palestrante da Pharma Special apresentando o evento Hairsceuticals" },
      { src: "/images/eventos/hairsceuticals/foto-10.jpeg", alt: "Participantes acompanhando a apresentação sobre tricologia" },
      { src: "/images/eventos/hairsceuticals/foto-11.jpeg", alt: "Material de apoio do evento Hairsceuticals sobre a mesa" },
      { src: "/images/eventos/hairsceuticals/foto-12.jpeg", alt: "Momento do evento Hairsceuticals – Ciência e Tecnologia da raiz às pontas" },
      { src: "/images/eventos/hairsceuticals/foto-13.jpeg", alt: "Palestrante da Pharma Special apresentando o evento Hairsceuticals" },
    ],
  },
  {
    slug: "modulacao-intestinal-mar-19",
    photos: [
      { src: "/images/eventos/mar-2019/foto-01.jpeg", alt: "Plateia acompanhando o curso Modulação Intestinal, Março de 2019" },
      { src: "/images/eventos/mar-2019/foto-02.jpeg", alt: "Murilo Pereira conduzindo o curso Modulação Intestinal" },
      { src: "/images/eventos/mar-2019/foto-03.jpeg", alt: "Auditório lotado durante o curso Modulação Intestinal, Março de 2019" },
      { src: "/images/eventos/mar-2019/foto-04.jpeg", alt: "Plateia acompanhando o curso Modulação Intestinal, Março de 2019" },
      { src: "/images/eventos/mar-2019/foto-05.jpeg", alt: "Murilo Pereira conduzindo o curso Modulação Intestinal" },
      { src: "/images/eventos/mar-2019/foto-06.jpeg", alt: "Auditório lotado durante o curso Modulação Intestinal, Março de 2019" },
      { src: "/images/eventos/mar-2019/foto-07.jpeg", alt: "Plateia acompanhando o curso Modulação Intestinal, Março de 2019" },
      { src: "/images/eventos/mar-2019/foto-08.jpeg", alt: "Murilo Pereira conduzindo o curso Modulação Intestinal" },
      { src: "/images/eventos/mar-2019/foto-09.jpeg", alt: "Auditório lotado durante o curso Modulação Intestinal, Março de 2019" },
    ],
  },
  {
    slug: "evento-atualizacao-em-dermatologia-aad",
    photos: [
      { src: "/images/eventos/aad-2019/foto-01.jpeg", alt: "Participantes no evento Ecos do AAD 2019" },
      { src: "/images/eventos/aad-2019/foto-02.jpeg", alt: "Momento de confraternização no evento Ecos do AAD 2019" },
      { src: "/images/eventos/aad-2019/foto-03.jpeg", alt: "Registro do evento Ecos do Meeting AAD 2019" },
      { src: "/images/eventos/aad-2019/foto-04.jpeg", alt: "Participantes no evento Ecos do AAD 2019" },
      { src: "/images/eventos/aad-2019/foto-05.jpeg", alt: "Momento de confraternização no evento Ecos do AAD 2019" },
      { src: "/images/eventos/aad-2019/foto-06.jpeg", alt: "Registro do evento Ecos do Meeting AAD 2019" },
      { src: "/images/eventos/aad-2019/foto-07.jpeg", alt: "Participantes no evento Ecos do AAD 2019" },
      { src: "/images/eventos/aad-2019/foto-08.jpeg", alt: "Momento de confraternização no evento Ecos do AAD 2019" },
    ],
  },
  {
    slug: "evento-modulacao-intestinal",
    photos: [
      { src: "/images/eventos/set-2018/foto-01.jpg", alt: "Plateia acompanhando o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-02.jpg", alt: "Apresentação do curso Modulação Intestinal no telão" },
      { src: "/images/eventos/set-2018/foto-03.jpg", alt: "Auditório durante o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-04.jpg", alt: "Momento do curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-05.jpg", alt: "Plateia acompanhando o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-06.jpg", alt: "Apresentação do curso Modulação Intestinal no telão" },
      { src: "/images/eventos/set-2018/foto-07.jpg", alt: "Auditório durante o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-08.jpg", alt: "Momento do curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-09.jpg", alt: "Plateia acompanhando o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-10.jpg", alt: "Apresentação do curso Modulação Intestinal no telão" },
      { src: "/images/eventos/set-2018/foto-11.jpg", alt: "Auditório durante o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-12.jpg", alt: "Momento do curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-13.jpg", alt: "Plateia acompanhando o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-14.jpg", alt: "Apresentação do curso Modulação Intestinal no telão" },
      { src: "/images/eventos/set-2018/foto-15.jpg", alt: "Auditório durante o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-16.jpg", alt: "Momento do curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-17.jpg", alt: "Plateia acompanhando o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-18.jpg", alt: "Apresentação do curso Modulação Intestinal no telão" },
      { src: "/images/eventos/set-2018/foto-19.jpg", alt: "Auditório durante o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-20.jpg", alt: "Momento do curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-21.jpg", alt: "Plateia acompanhando o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-22.jpg", alt: "Apresentação do curso Modulação Intestinal no telão" },
      { src: "/images/eventos/set-2018/foto-23.jpg", alt: "Auditório durante o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-24.jpg", alt: "Momento do curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-25.jpg", alt: "Plateia acompanhando o curso Modulação Intestinal, Setembro de 2018" },
      { src: "/images/eventos/set-2018/foto-26.jpg", alt: "Apresentação do curso Modulação Intestinal no telão" },
    ],
  },
  {
    slug: "evento-para-nutricionistas-no-grand-cru",
    photos: [
      { src: "/images/eventos/grand-cru/foto-01.jpg", alt: "Confraternização do evento para nutricionistas no Grand Cru" },
      { src: "/images/eventos/grand-cru/foto-02.jpg", alt: "Participantes reunidos no evento para nutricionistas, no Grand Cru" },
      { src: "/images/eventos/grand-cru/foto-03.jpg", alt: "Confraternização do evento para nutricionistas no Grand Cru" },
    ],
  },
  {
    slug: "lancamento-epifactor",
    photos: [
      { src: "/images/eventos/epifactor/foto-01.jpg", alt: "Convidados no jantar de lançamento do Epifactor para médicos" },
      { src: "/images/eventos/epifactor/foto-02.jpg", alt: "Momento de confraternização no lançamento do Epifactor" },
      { src: "/images/eventos/epifactor/foto-03.jpg", alt: "Convidados no jantar de lançamento do Epifactor para médicos" },
      { src: "/images/eventos/epifactor/foto-04.jpg", alt: "Momento de confraternização no lançamento do Epifactor" },
    ],
  },
];

export function getEventGallery(slug: string): EventGallery | undefined {
  return EVENT_GALLERIES.find((gallery) => gallery.slug === slug);
}
