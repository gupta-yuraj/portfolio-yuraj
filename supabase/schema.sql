-- ============================================================
-- Yuraj Gupta Portfolio — Supabase schema (backend for the admin CMS)
-- Run this once in the Supabase SQL Editor: Project > SQL Editor > New query
-- ============================================================

-- ---------- helper: keep RLS terse ----------
create or replace function public.is_admin()
returns boolean as $$
  select auth.role() = 'authenticated';
$$ language sql stable;

-- ============================================================
-- 1. SINGLETON TABLES (profile + certification — always exactly one row)
-- ============================================================

create table if not exists public.profile (
  id smallint primary key default 1,
  name text not null default 'Yuraj Gupta',
  title_line1 text not null default 'Business Administration Graduate',
  title_line2 text not null default 'Operations & Business Development Enthusiast',
  location text not null default 'HSR Layout, 5th Sector, Bangalore, India',
  phone text not null default '+91 6362570156',
  email text not null default 'guptayuraj10@gmail.com',
  maps_query text not null default 'HSR Layout 5th Sector Bangalore India',
  objective text not null default '',
  hero_subtitle text not null default '',
  typing_speed text not null default '30+ WPM',
  resume_url text default '',
  constraint profile_singleton check (id = 1)
);

insert into public.profile (id) values (1) on conflict (id) do nothing;

create table if not exists public.certification (
  id smallint primary key default 1,
  title text not null default 'Logistics & Supply Chain Management',
  subtitle text not null default 'Certification Course',
  constraint certification_singleton check (id = 1)
);

insert into public.certification (id) values (1) on conflict (id) do nothing;

-- ============================================================
-- 2. LIST TABLES (order_index controls display order on the public site)
-- ============================================================

create table if not exists public.dashboard_metrics (
  id bigint generated always as identity primary key,
  label text not null,
  value integer not null default 0,
  icon text not null default 'star',
  order_index integer not null default 0
);

create table if not exists public.about_counters (
  id bigint generated always as identity primary key,
  label text not null,
  value integer not null default 0,
  suffix text not null default '',
  order_index integer not null default 0
);

create table if not exists public.education (
  id bigint generated always as identity primary key,
  degree text not null,
  school text not null,
  place text not null,
  period text not null,
  order_index integer not null default 0
);

create table if not exists public.business_skills (
  id bigint generated always as identity primary key,
  title text not null,
  icon text not null default 'star',
  items text[] not null default '{}',
  order_index integer not null default 0
);

create table if not exists public.software_skills (
  id bigint generated always as identity primary key,
  title text not null,
  items text[] not null default '{}',
  order_index integer not null default 0
);

create table if not exists public.projects (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null default '',
  tools text[] not null default '{}',
  icon text not null default 'briefcase',
  order_index integer not null default 0
);

create table if not exists public.languages (
  id bigint generated always as identity primary key,
  name text not null,
  level text not null default '',
  percent integer not null default 0,
  order_index integer not null default 0
);

create table if not exists public.personal_attributes (
  id bigint generated always as identity primary key,
  text text not null,
  order_index integer not null default 0
);

create table if not exists public.why_hire_me (
  id bigint generated always as identity primary key,
  title text not null,
  icon text not null default 'star',
  order_index integer not null default 0
);

create table if not exists public.achievements (
  id bigint generated always as identity primary key,
  label text not null,
  value text not null default '',
  order_index integer not null default 0
);

-- ============================================================
-- 3. CONTACT MESSAGES (submitted from the public contact form)
-- ============================================================

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 4. ROW LEVEL SECURITY
--    Public (anon) can always READ content tables and INSERT messages.
--    Only a signed-in admin (any authenticated user) can write content
--    or read/manage messages.
-- ============================================================

alter table public.profile enable row level security;
alter table public.certification enable row level security;
alter table public.dashboard_metrics enable row level security;
alter table public.about_counters enable row level security;
alter table public.education enable row level security;
alter table public.business_skills enable row level security;
alter table public.software_skills enable row level security;
alter table public.projects enable row level security;
alter table public.languages enable row level security;
alter table public.personal_attributes enable row level security;
alter table public.why_hire_me enable row level security;
alter table public.achievements enable row level security;
alter table public.messages enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array[
    'profile', 'certification', 'dashboard_metrics', 'about_counters',
    'education', 'business_skills', 'software_skills', 'projects',
    'languages', 'personal_attributes', 'why_hire_me', 'achievements'
  ]
  loop
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (true)', t);

    execute format('drop policy if exists "admin insert" on public.%I', t);
    execute format('create policy "admin insert" on public.%I for insert to authenticated with check (is_admin())', t);

    execute format('drop policy if exists "admin update" on public.%I', t);
    execute format('create policy "admin update" on public.%I for update to authenticated using (is_admin()) with check (is_admin())', t);

    execute format('drop policy if exists "admin delete" on public.%I', t);
    execute format('create policy "admin delete" on public.%I for delete to authenticated using (is_admin())', t);
  end loop;
end $$;

-- messages: public can only INSERT; only admin can SELECT/UPDATE/DELETE
drop policy if exists "public submit message" on public.messages;
create policy "public submit message"
  on public.messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists "admin read messages" on public.messages;
create policy "admin read messages"
  on public.messages for select
  to authenticated
  using (is_admin());

drop policy if exists "admin update messages" on public.messages;
create policy "admin update messages"
  on public.messages for update
  to authenticated
  using (is_admin())
  with check (is_admin());

drop policy if exists "admin delete messages" on public.messages;
create policy "admin delete messages"
  on public.messages for delete
  to authenticated
  using (is_admin());

-- ============================================================
-- 5. STORAGE — public "resume" bucket for the downloadable PDF
-- ============================================================

insert into storage.buckets (id, name, public)
values ('resume', 'resume', true)
on conflict (id) do nothing;

drop policy if exists "public read resume" on storage.objects;
create policy "public read resume"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'resume');

drop policy if exists "admin write resume" on storage.objects;
create policy "admin write resume"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'resume');

drop policy if exists "admin update resume" on storage.objects;
create policy "admin update resume"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'resume')
  with check (bucket_id = 'resume');

drop policy if exists "admin delete resume" on storage.objects;
create policy "admin delete resume"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'resume');

-- ============================================================
-- 6. SEED DATA — mirrors the site's default copy so the admin panel
--    (and the live site, once Supabase is connected) starts populated
--    instead of empty. Safe to re-run; it only inserts if a table is empty.
-- ============================================================

update public.profile set
  objective = 'Motivated BBA graduate seeking an entry-level position in business management where I can apply my knowledge of business operations, customer handling, and organizational skills to contribute to company growth. Open to flexible and rotational shifts.',
  hero_subtitle = 'I transform business challenges into strategic opportunities through strategic thinking, operational excellence, customer-focused solutions, and data-driven decision making.'
where id = 1 and objective = '';

insert into public.dashboard_metrics (label, value, icon, order_index)
select * from (values
  ('Business Analytics', 92, 'analytics', 0),
  ('Operations', 88, 'inventory', 1),
  ('Market Analysis', 85, 'graphUp', 2),
  ('Customer Satisfaction', 95, 'support', 3),
  ('Business Growth', 90, 'trending', 4)
) as v(label, value, icon, order_index)
where not exists (select 1 from public.dashboard_metrics);

insert into public.about_counters (label, value, suffix, order_index)
select * from (values
  ('Education', 1, '', 0),
  ('Projects', 2, '', 1),
  ('Skills', 20, '+', 2),
  ('Certification', 1, '', 3),
  ('Languages', 3, '', 4)
) as v(label, value, suffix, order_index)
where not exists (select 1 from public.about_counters);

insert into public.education (degree, school, place, period, order_index)
select * from (values
  ('Bachelor of Business Administration', 'Bangalore University', 'Bangalore, India', '2022 – 2025', 0),
  ('Pre-University, Management (Commerce)', 'City School of Birgunj', 'Birgunj, Nepal', '2019 – 2021', 1)
) as v(degree, school, place, period, order_index)
where not exists (select 1 from public.education);

insert into public.business_skills (title, icon, items, order_index)
select * from (values
  ('Business Strategy', 'target', array['Market Analysis','Competitor Research','SWOT Analysis','Pricing Study'], 0),
  ('Operations Management', 'inventory', array['Stock Tracking','MIS Reporting','Supply Coordination'], 1),
  ('Customer Satisfaction', 'support', array['Customer Engagement','Communication','Vendor Coordination','Retail Coordination'], 2),
  ('Business Development', 'handshake', array['Lead Generation','B2B Sales','Client Relationship Management','Stakeholder Management'], 3)
) as v(title, icon, items, order_index)
where not exists (select 1 from public.business_skills);

insert into public.software_skills (title, items, order_index)
select * from (values
  ('TallyPrime', array['Accounting Entries','Ledger Management','GST-Compliant Invoicing'], 0),
  ('GST Concepts', array['GSTR-1','GSTR-3B','Input Tax Credit (ITC)','HSN/SAC Codes','Reverse Charge Mechanism (RCM)'], 1),
  ('Microsoft Office', array['Microsoft Excel','Microsoft Word','Microsoft PowerPoint'], 2)
) as v(title, items, order_index)
where not exists (select 1 from public.software_skills);

insert into public.projects (title, description, tools, icon, order_index)
select * from (values
  ('Business Strategy & Market Analysis', 'Analyzed competitor strategies and pricing models. Prepared SWOT-based business reports with operational recommendations.', array['Business Research','Excel','Presentation','SWOT Analysis'], 'briefcase', 0),
  ('Inventory & Customer Operations Study', 'Studied inventory management practices and their impact on customer satisfaction. Created Excel-based summary reports and operational improvement recommendations.', array['Inventory Management','Excel','Customer Operations'], 'excel', 1)
) as v(title, description, tools, icon, order_index)
where not exists (select 1 from public.projects);

update public.certification set
  title = 'Logistics & Supply Chain Management',
  subtitle = 'Certification Course'
where id = 1;

insert into public.languages (name, level, percent, order_index)
select * from (values
  ('English', 'Proficient', 90, 0),
  ('Hindi', 'Proficient', 90, 1),
  ('Nepali', 'Native', 100, 2)
) as v(name, level, percent, order_index)
where not exists (select 1 from public.languages);

insert into public.personal_attributes (text, order_index)
select * from (values
  ('Energetic & Self-Motivated', 0),
  ('Target-Oriented', 1),
  ('Fast Learner', 2),
  ('Quick Adaptation to New Tools & Technologies', 3),
  ('Field Work Ready', 4),
  ('Market Visit Experience', 5),
  ('Adaptable to Q-Commerce', 6),
  ('Adaptable to FMCG Environment', 7)
) as v(text, order_index)
where not exists (select 1 from public.personal_attributes);

insert into public.why_hire_me (title, icon, order_index)
select * from (values
  ('Strategic Thinking', 'target', 0),
  ('Operations Management', 'inventory', 1),
  ('Business Development', 'handshake', 2),
  ('Customer Handling', 'support', 3),
  ('Excellent Communication', 'users', 4),
  ('Quick Learner', 'trending', 5),
  ('Problem Solving', 'analytics', 6)
) as v(title, icon, order_index)
where not exists (select 1 from public.why_hire_me);

insert into public.achievements (label, value, order_index)
select * from (values
  ('Business Skills', '20+', 0),
  ('Academic Projects', '2', 1),
  ('Certification', '1', 2),
  ('Languages', '3', 3),
  ('Typing Speed', '30+ WPM', 4),
  ('Degree', 'BBA Graduate', 5)
) as v(label, value, order_index)
where not exists (select 1 from public.achievements);

-- ============================================================
-- After running this file, create your single admin user under
-- Authentication > Users > Add user (email + password) in the
-- Supabase dashboard. That email must match VITE_ADMIN_EMAIL in
-- your .env file — the admin login screen only asks for the
-- password and signs in with this fixed email. See README.md.
-- ============================================================
