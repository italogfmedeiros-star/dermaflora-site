// Atualiza e-mail/senha do usuário admin do painel (/admin/login) no Supabase
// Auth. Assume que existe exatamente um usuário cadastrado (o admin atual) e
// o atualiza — não cria um novo. Genérico e sem segredo hardcoded: as novas
// credenciais vêm de env vars, então não ficam salvas em texto no repositório.
//
// Uso:
//   NEW_ADMIN_EMAIL="novo@dominio.com" NEW_ADMIN_PASSWORD="..." \
//     node --env-file=.env.local scripts/update-admin-user.mjs

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const NEW_EMAIL = process.env.NEW_ADMIN_EMAIL;
const NEW_PASSWORD = process.env.NEW_ADMIN_PASSWORD;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Faltam NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY no ambiente."
  );
  process.exit(1);
}

if (!NEW_EMAIL || !NEW_PASSWORD) {
  console.error("Faltam NEW_ADMIN_EMAIL / NEW_ADMIN_PASSWORD no ambiente.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) throw error;

  if (data.users.length === 0) {
    console.error("Nenhum usuário encontrado no Supabase Auth.");
    process.exit(1);
  }

  if (data.users.length > 1) {
    console.error(
      `Encontrei ${data.users.length} usuários — este script só atualiza quando há exatamente um. Usuários encontrados: ${data.users
        .map((u) => u.email)
        .join(", ")}`
    );
    process.exit(1);
  }

  const [user] = data.users;
  console.log(`Atualizando usuário atual (${user.email})...`);

  const { error: updateError } = await supabase.auth.admin.updateUserById(
    user.id,
    { email: NEW_EMAIL, password: NEW_PASSWORD, email_confirm: true }
  );

  if (updateError) throw updateError;

  console.log(`Credenciais atualizadas com sucesso para ${NEW_EMAIL}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
