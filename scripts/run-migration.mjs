// Roda um arquivo .sql de supabase/migrations/ direto no Postgres do projeto.
//
//   DATABASE_URL="postgresql://..." node scripts/run-migration.mjs supabase/migrations/0001_posts.sql
//
// DATABASE_URL é a connection string de Project Settings -> Database no
// dashboard do Supabase. Nunca commitar esse valor.

import { readFile } from "node:fs/promises";
import { Client } from "pg";

const [, , sqlPath] = process.argv;
const connectionString = process.env.DATABASE_URL;

if (!sqlPath) {
  console.error("Uso: node scripts/run-migration.mjs <caminho-do-arquivo.sql>");
  process.exit(1);
}

if (!connectionString) {
  console.error("Faltou DATABASE_URL no ambiente.");
  process.exit(1);
}

const sql = await readFile(sqlPath, "utf-8");
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

await client.connect();
try {
  await client.query(sql);
  console.log(`Migration aplicada com sucesso: ${sqlPath}`);
} finally {
  await client.end();
}
