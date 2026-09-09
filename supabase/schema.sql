create table if not exists public.articles (id uuid primary key default gen_random_uuid(), title text not null, category text not null default 'Insight', summary text not null, content text not null default '', published boolean not null default false, created_at timestamptz not null default now());
create table if not exists public.photos (id uuid primary key default gen_random_uuid(), title text not null, detail text not null default '', image_url text not null, created_at timestamptz not null default now());
create table if not exists public.contact_requests (id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text, subject text not null, message text not null, created_at timestamptz not null default now());
alter table public.articles enable row level security;
alter table public.photos enable row level security;
alter table public.contact_requests enable row level security;
create policy "public can read published articles" on public.articles for select using (published = true);
create policy "public can create contact requests" on public.contact_requests for insert with check (true);
