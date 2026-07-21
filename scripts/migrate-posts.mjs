// Migra os 5 posts mais recentes do WordPress (dermaflora.com.br/blog) para
// o Supabase: baixa a imagem de capa original, sobe pro bucket post-images
// e insere o post como `published`.
//
// Rodar com as env vars do Supabase carregadas, por exemplo:
//   node --env-file=.env.local scripts/migrate-posts.mjs
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

async function uploadCoverImage(slug, sourceUrl) {
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Falha ao baixar imagem ${sourceUrl}: ${response.status}`);
  }
  const contentType = response.headers.get("content-type") ?? "image/jpeg";
  const ext = sourceUrl.split(".").pop()?.split("?")[0] ?? "jpg";
  const buffer = Buffer.from(await response.arrayBuffer());
  const storagePath = `migrated/${slug}.${ext}`;

  const { error } = await supabase.storage
    .from("post-images")
    .upload(storagePath, buffer, { contentType, upsert: true });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("post-images").getPublicUrl(storagePath);

  return publicUrl;
}

async function main() {
  const raw = await readFile(path.join(__dirname, "seed-posts.json"), "utf-8");
  const posts = JSON.parse(raw);

  for (const post of posts) {
    process.stdout.write(`Migrando "${post.title}"... `);

    const coverImageUrl = await uploadCoverImage(post.slug, post.sourceImage);

    const { error } = await supabase.from("posts").upsert(
      {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        categories: post.categories,
        cover_image_url: coverImageUrl,
        status: "published",
        published_at: post.publishedAt,
        author_name: "Dermaflora",
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.log("ERRO");
      throw error;
    }

    console.log("ok");
  }

  console.log(`\n${posts.length} posts migrados com sucesso.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
