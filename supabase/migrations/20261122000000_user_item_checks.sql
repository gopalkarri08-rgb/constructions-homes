-- Per-user ticks on guide items.
-- Apply on Supabase project cshlyxsmzxmvorpjsvpy when the stage-hierarchy
-- pull request merges. Do not run this ahead of that merge.
-- Members may read and write only their own rows.

create table public.user_item_checks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  stage_slug text not null,
  sub_stage_slug text not null,
  item_slug text not null,
  checked boolean not null default true,
  updated_at timestamptz not null default now(),
  unique (user_id, stage_slug, sub_stage_slug, item_slug)
);

create index user_item_checks_user_stage_idx
  on public.user_item_checks (user_id, stage_slug);

alter table public.user_item_checks enable row level security;

create policy "user_item_checks_select_own"
  on public.user_item_checks
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "user_item_checks_insert_own"
  on public.user_item_checks
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "user_item_checks_update_own"
  on public.user_item_checks
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_item_checks_delete_own"
  on public.user_item_checks
  for delete
  to authenticated
  using (auth.uid() = user_id);

revoke all on public.user_item_checks from anon;
grant select, insert, update, delete on public.user_item_checks to authenticated;
