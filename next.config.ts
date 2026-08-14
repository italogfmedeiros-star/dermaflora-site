import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // O WordPress antigo arquivava posts por tag (/tag/<slug>) e por autor
  // (/author/<usuario>), URLs que o Google chegou a indexar (confirmado via
  // Wayback Machine: ~195 tags e 5 autores diferentes). O site novo não tem
  // conceito de tag nem de página de autor — em vez de deixar tudo isso
  // 404ando, manda pro hub do blog, que é o destino mais próximo que existe.
  async redirects() {
    return [
      { source: "/tag/:path*", destination: "/blog", permanent: true },
      { source: "/author/:path*", destination: "/blog", permanent: true },

      // Páginas institucionais que o WordPress antigo servia como rotas
      // próprias e que o Google ainda tem indexadas como sitelinks
      // (confirmado via Wayback Machine). No site novo esse conteúdo virou
      // seção da home — manda pro anchor correspondente em vez de 404ar.
      { source: "/contato", destination: "/#contato", permanent: true },
      { source: "/quem-somos", destination: "/#sobre", permanent: true },

      // Arquivos de categoria do blog antigo (dermaflora.com.br/category/<slug>),
      // indexados pelo Google. O site novo organiza o blog por categoria em
      // /blog/categoria/<slug> (ver BLOG_CATEGORIES em src/lib/categories.ts).
      { source: "/category/:path*", destination: "/blog/categoria/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
