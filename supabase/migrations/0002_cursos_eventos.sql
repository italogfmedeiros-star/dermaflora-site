-- Cursos e Eventos: tabela + RLS + bucket de imagens.
-- Rodar no SQL editor do projeto Supabase (ou via scripts/run-migration.mjs).

create table if not exists public.cursos_eventos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null default '',
  cover_image_url text,
  event_date date,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cursos_eventos_status_event_date_idx
  on public.cursos_eventos (status, event_date desc);

-- reaproveita a função public.set_updated_at() criada em 0001_posts.sql
drop trigger if exists cursos_eventos_set_updated_at on public.cursos_eventos;
create trigger cursos_eventos_set_updated_at
  before update on public.cursos_eventos
  for each row
  execute function public.set_updated_at();

alter table public.cursos_eventos enable row level security;

drop policy if exists "cursos_eventos_public_select" on public.cursos_eventos;
create policy "cursos_eventos_public_select"
  on public.cursos_eventos for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "cursos_eventos_authenticated_select_all" on public.cursos_eventos;
create policy "cursos_eventos_authenticated_select_all"
  on public.cursos_eventos for select
  to authenticated
  using (true);

drop policy if exists "cursos_eventos_authenticated_insert" on public.cursos_eventos;
create policy "cursos_eventos_authenticated_insert"
  on public.cursos_eventos for insert
  to authenticated
  with check (true);

drop policy if exists "cursos_eventos_authenticated_update" on public.cursos_eventos;
create policy "cursos_eventos_authenticated_update"
  on public.cursos_eventos for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "cursos_eventos_authenticated_delete" on public.cursos_eventos;
create policy "cursos_eventos_authenticated_delete"
  on public.cursos_eventos for delete
  to authenticated
  using (true);

-- Bucket público para imagens de cursos/eventos
insert into storage.buckets (id, name, public)
values ('cursos-images', 'cursos-images', true)
on conflict (id) do nothing;

drop policy if exists "cursos_images_public_read" on storage.objects;
create policy "cursos_images_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'cursos-images');

drop policy if exists "cursos_images_authenticated_write" on storage.objects;
create policy "cursos_images_authenticated_write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'cursos-images');

drop policy if exists "cursos_images_authenticated_update" on storage.objects;
create policy "cursos_images_authenticated_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'cursos-images');

drop policy if exists "cursos_images_authenticated_delete" on storage.objects;
create policy "cursos_images_authenticated_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'cursos-images');
