-- One house project per member.
-- Apply on Supabase project cshlyxsmzxmvorpjsvpy when this pull request
-- merges. Do not run it before that.
-- Members may read and write only their own rows.

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  city text not null,
  state text not null,
  plot_size_sqft integer,
  floors text not null,
  construction_type text not null,
  current_stage_slug text,
  budget_preference text not null,
  budget_inr bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_floors_check check (floors in ('G', 'G+1', 'G+2', 'G+3', 'G+4')),
  constraint projects_type_check check (construction_type in ('new_house', 'renovation')),
  constraint projects_budget_pref_check check (budget_preference in ('economy', 'standard', 'premium')),
  constraint projects_one_per_user unique (user_id)
);

create index projects_user_id_idx on public.projects (user_id);

alter table public.projects enable row level security;

create policy "projects_select_own"
  on public.projects
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "projects_insert_own"
  on public.projects
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "projects_update_own"
  on public.projects
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "projects_delete_own"
  on public.projects
  for delete
  to authenticated
  using (auth.uid() = user_id);

revoke all on public.projects from anon;
grant select, insert, update, delete on public.projects to authenticated;
