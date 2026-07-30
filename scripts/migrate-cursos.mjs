// Migra os 9 cursos/eventos do WordPress antigo (dermaflora.com.br/cursos-e-eventos)
// para o Supabase: lê a imagem de capa já baixada localmente em
// public/images/cursos-eventos/, sobe pro bucket cursos-images e insere o
// evento como `published`.
//
// Rodar com as env vars do Supabase carregadas, por exemplo:
//   node --env-file=.env.local scripts/migrate-cursos.mjs
//
// Precisa de NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY (a service
// role key ignora RLS, então esse script não pode rodar no browser/cliente).

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Faltam NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY no ambiente."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const CONTENT_TYPES = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
};

async function uploadCoverImage(slug, sourceImageFilename) {
  const localPath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "cursos-eventos",
    sourceImageFilename
  );
  const buffer = await readFile(localPath);
  const ext = sourceImageFilename.split(".").pop()?.toLowerCase() ?? "jpg";
  const contentType = CONTENT_TYPES[ext] ?? "image/jpeg";
  const storagePath = `migrated/${slug}.${ext}`;

  const { error } = await supabase.storage
    .from("cursos-images")
    .upload(storagePath, buffer, { contentType, upsert: true });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("cursos-images").getPublicUrl(storagePath);

  return publicUrl;
}

async function main() {
  const raw = await readFile(
    path.join(__dirname, "seed-cursos.json"),
    "utf-8"
  );
  const cursos = JSON.parse(raw);

  for (const curso of cursos) {
    process.stdout.write(`Migrando "${curso.title}"... `);

    const coverImageUrl = await uploadCoverImage(
      curso.slug,
      curso.sourceImage
    );

    const { error } = await supabase.from("cursos_eventos").upsert(
      {
        slug: curso.slug,
        title: curso.title,
        excerpt: curso.excerpt,
        content: curso.content,
        cover_image_url: coverImageUrl,
        event_date: curso.eventDate,
        status: "published",
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.log("ERRO");
      throw error;
    }

    console.log("ok");
  }

  console.log(`\n${cursos.length} cursos/eventos migrados com sucesso.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
