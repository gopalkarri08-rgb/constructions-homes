-- Membership data for Constructions.homes.
-- Authenticated users may read only their own rows.
-- Application writes to memberships and payments use the service role.
-- A profile row is created by the security-definer trigger below, from
-- signup metadata (name, location). That is not a user-granted write.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  location text,
  created_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  plan text not null check (plan in ('full_pass', 'monthly', 'stage')),
  stage_slug text,
  status text not null check (status in ('active', 'cancelled', 'expired', 'pending')),
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_subscription_id text,
  created_at timestamptz not null default now(),
  constraint memberships_stage_slug_check check (
    (plan = 'stage' and stage_slug is not null)
    or (plan <> 'stage' and stage_slug is null)
  )
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_subscription_id text,
  razorpay_event_id text,
  event text not null,
  amount integer,
  currency text not null default 'INR',
  plan text,
  stage_slug text,
  status text,
  created_at timestamptz not null default now()
);

create index memberships_user_id_idx on public.memberships (user_id);
create index memberships_subscription_idx on public.memberships (razorpay_subscription_id);

create unique index payments_event_payment_unique
  on public.payments (event, razorpay_payment_id)
  where razorpay_payment_id is not null;

create unique index payments_event_id_unique
  on public.payments (razorpay_event_id)
  where razorpay_event_id is not null;

alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.payments enable row level security;

create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "memberships_select_own"
  on public.memberships
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "payments_select_own"
  on public.payments
  for select
  to authenticated
  using (auth.uid() = user_id);

revoke all on public.profiles from anon, authenticated;
revoke all on public.memberships from anon, authenticated;
revoke all on public.payments from anon, authenticated;

grant select on public.profiles to authenticated;
grant select on public.memberships to authenticated;
grant select on public.payments to authenticated;
grant all on public.profiles to service_role;
grant all on public.memberships to service_role;
grant all on public.payments to service_role;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, location)
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'name', ''),
    nullif(new.raw_user_meta_data ->> 'location', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
