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
    ];
  },
};

export default nextConfig;
