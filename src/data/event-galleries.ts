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
];

export function getEventGallery(slug: string): EventGallery | undefined {
  return EVENT_GALLERIES.find((gallery) => gallery.slug === slug);
}
