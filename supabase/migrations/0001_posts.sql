-- Blog: tabela de posts + RLS + bucket de imagens.
-- Rodar no SQL editor do projeto Supabase (ou `supabase db push` se o CLI estiver linkado).

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null default '',
  cover_image_url text,
  categories text[] not null default '{}',
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  author_name text not null default 'Dermaflora',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_published_at_idx
  on public.posts (status, published_at desc);

create index if not exists posts_categories_idx
  on public.posts using gin (categories);

-- updated_at automático
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row
  execute function public.set_updated_at();

alter table public.posts enable row level security;

-- Leitura pública só de posts publicados
drop policy if exists "posts_public_select" on public.posts;
create policy "posts_public_select"
  on public.posts for select
  to anon, authenticated
  using (status = 'published');

-- Usuários autenticados (equipe da farmácia) veem tudo, inclusive rascunhos
drop policy if exists "posts_authenticated_select_all" on public.posts;
create policy "posts_authenticated_select_all"
  on public.posts for select
  to authenticated
  using (true);

drop policy if exists "posts_authenticated_insert" on public.posts;
create policy "posts_authenticated_insert"
  on public.posts for insert
  to authenticated
  with check (true);

drop policy if exists "posts_authenticated_update" on public.posts;
create policy "posts_authenticated_update"
  on public.posts for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "posts_authenticated_delete" on public.posts;
create policy "posts_authenticated_delete"
  on public.posts for delete
  to authenticated
  using (true);

-- Bucket público para capas/imagens dos posts
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

drop policy if exists "post_images_public_read" on storage.objects;
create policy "post_images_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'post-images');

drop policy if exists "post_images_authenticated_write" on storage.objects;
create policy "post_images_authenticated_write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'post-images');

drop policy if exists "post_images_authenticated_update" on storage.objects;
create policy "post_images_authenticated_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'post-images');

drop policy if exists "post_images_authenticated_delete" on storage.objects;
create policy "post_images_authenticated_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'post-images');
