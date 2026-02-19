create table if not exists public.survey_responses (
  id bigint generated always as identity primary key,
  submitted_at timestamptz not null default now(),
  zip_code text not null,
  phone text not null,
  child_ages text not null,
  current_school text not null,
  priority_level text not null,
  interests text[] not null default '{}',
  barrier text not null,
  notes text not null default ''
);

alter table public.survey_responses enable row level security;

-- Public insert/read policy for this anonymous survey app.
-- For production, restrict to your domain via edge functions or CAPTCHA.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'survey_responses'
      and policyname = 'Allow anon insert'
  ) then
    create policy "Allow anon insert"
    on public.survey_responses
    for insert
    to anon
    with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'survey_responses'
      and policyname = 'Allow anon select'
  ) then
    create policy "Allow anon select"
    on public.survey_responses
    for select
    to anon
    using (true);
  end if;
end $$;
