-- Optional steps a member has chosen to skip.
-- Apply on Supabase project cshlyxsmzxmvorpjsvpy when this pull request
-- merges. Do not run it before that.
-- Members may read and write only their own rows.

create table public.user_step_skips (
  user_id uuid not null references auth.users (id) on delete cascade,
  stage_slug text not null,
  sub_stage_slug text not null,
  skipped boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (user_id, stage_slug, sub_stage_slug)
);

alter table public.user_step_skips enable row level security;

create policy "user_step_skips_select_own"
  on public.user_step_skips
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "user_step_skips_insert_own"
  on public.user_step_skips
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "user_step_skips_update_own"
  on public.user_step_skips
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_step_skips_delete_own"
  on public.user_step_skips
  for delete
  to authenticated
  using (auth.uid() = user_id);

revoke all on public.user_step_skips from anon;
grant select, insert, update, delete on public.user_step_skips to authenticated;
