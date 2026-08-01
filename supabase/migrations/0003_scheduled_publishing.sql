-- Publicação agendada: um post só é público quando está marcado como publicado
-- E a data de publicação já chegou.
--
-- A aplicação já aplica esse filtro nas consultas (src/lib/posts-data.ts). Esta
-- policy fecha o cerco no banco: sem ela, um post agendado ainda seria legível
-- por quem consultasse a API do Supabase diretamente com a chave anônima.
--
-- `published_at is null` continua público para não esconder posts criados antes
-- do agendamento existir — a coluna era opcional até aqui.

drop policy if exists "posts_public_select" on public.posts;
create policy "posts_public_select"
  on public.posts for select
  to anon, authenticated
  using (
    status = 'published'
    and (published_at is null or published_at <= now())
  );

-- A leitura ampla de usuários autenticados (equipe da farmácia) permanece
-- intacta: é ela que sustenta o preview de rascunho e de post agendado.
