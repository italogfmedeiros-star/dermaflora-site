// Taxonomia herdada do blog antigo (dermaflora.com.br/category/*), mantida
// para os posts migrados continuarem fazendo sentido e para dar um ponto de
// partida à equipe ao publicar posts novos.
export const BLOG_CATEGORIES = [
  "Pele",
  "Rosto",
  "Cabelo",
  "Fotoproteção",
  "Proteção solar",
  "Suplementos e Fitness",
  "Beleza",
  "Nutraceuticos",
  "Anti-aging",
  "Hidratação",
  "Saúde",
] as const;

export { slugify as slugifyCategory } from "./slugify";
