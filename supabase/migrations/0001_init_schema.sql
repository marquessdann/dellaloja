-- Della AI shopping assistant — initial schema
-- Safe to run once on a fresh Supabase project (Database > SQL Editor > New query).

create extension if not exists "pgcrypto";
create extension if not exists "vector";

-- ============================================================
-- categories
-- ============================================================
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- products
-- ============================================================
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  short_description text,
  category_id uuid references categories(id) on delete set null,
  -- Nullable on purpose: price/stock are only ever reported by the agent
  -- when set here. A NULL means "not published yet" — the agent must say
  -- so instead of guessing, never treat NULL as zero or as "in stock".
  price numeric(10, 2) check (price is null or price >= 0),
  promotional_price numeric(10, 2) check (promotional_price is null or promotional_price >= 0),
  stock_quantity integer check (stock_quantity is null or stock_quantity >= 0),
  available boolean not null default true,
  brand text,
  image_url text,
  product_url text,
  marketplace_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on products (category_id);
create index if not exists products_available_idx on products (available);

alter table products add column if not exists search_vector tsvector
  generated always as (
    to_tsvector(
      'portuguese',
      coalesce(name, '') || ' ' || coalesce(short_description, '') || ' ' || coalesce(brand, '')
    )
  ) stored;

create index if not exists products_search_vector_idx on products using gin (search_vector);

-- ============================================================
-- faq
-- ============================================================
create table if not exists faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  active boolean not null default true,
  -- Scaffolding for a future semantic-search upgrade (see docs/ai-agent.md).
  -- Not populated yet: retrieval currently uses Postgres full-text search below.
  embedding vector(384),
  updated_at timestamptz not null default now()
);

create index if not exists faq_active_idx on faq (active);

alter table faq add column if not exists search_vector tsvector
  generated always as (to_tsvector('portuguese', coalesce(question, '') || ' ' || coalesce(answer, ''))) stored;

create index if not exists faq_search_vector_idx on faq using gin (search_vector);

-- ============================================================
-- policies
-- ============================================================
create table if not exists policies (
  id uuid primary key default gen_random_uuid(),
  type text not null unique check (type in ('delivery', 'returns', 'exchanges', 'payments', 'privacy', 'warranty')),
  title text not null,
  content text not null,
  embedding vector(384),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- marketplaces
-- ============================================================
create table if not exists marketplaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text,
  active boolean not null default true
);

-- ============================================================
-- store_information (single row)
-- ============================================================
create table if not exists store_information (
  id integer primary key default 1 check (id = 1),
  name text,
  address text,
  phone text,
  whatsapp text,
  whatsapp_link text,
  email text,
  business_hours text,
  instagram text,
  instagram_link text,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- ai_conversations / ai_messages
-- ============================================================
create table if not exists ai_conversations (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references ai_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'tool', 'system')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists ai_messages_conversation_id_idx on ai_messages (conversation_id, created_at);

-- ============================================================
-- updated_at triggers
-- ============================================================
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on products;
create trigger set_updated_at before update on products
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on categories;
create trigger set_updated_at before update on categories
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on faq;
create trigger set_updated_at before update on faq
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on policies;
create trigger set_updated_at before update on policies
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on store_information;
create trigger set_updated_at before update on store_information
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on ai_conversations;
create trigger set_updated_at before update on ai_conversations
  for each row execute function set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
-- The chat backend (Vercel serverless function) talks to Supabase using the
-- SERVICE_ROLE key, which bypasses RLS entirely. Everything below is
-- defense-in-depth for the day someone exposes an anon/public key for a
-- different feature (e.g. a future storefront using Supabase directly) —
-- it must never grant more than public, read-only access to non-sensitive
-- catalog data.

alter table categories enable row level security;
alter table products enable row level security;
alter table faq enable row level security;
alter table policies enable row level security;
alter table marketplaces enable row level security;
alter table store_information enable row level security;
alter table ai_conversations enable row level security;
alter table ai_messages enable row level security;

drop policy if exists "public read categories" on categories;
create policy "public read categories" on categories
  for select to anon, authenticated using (true);

drop policy if exists "public read available products" on products;
create policy "public read available products" on products
  for select to anon, authenticated using (available = true);

drop policy if exists "public read active faq" on faq;
create policy "public read active faq" on faq
  for select to anon, authenticated using (active = true);

drop policy if exists "public read policies" on policies;
create policy "public read policies" on policies
  for select to anon, authenticated using (true);

drop policy if exists "public read active marketplaces" on marketplaces;
create policy "public read active marketplaces" on marketplaces
  for select to anon, authenticated using (active = true and url is not null);

drop policy if exists "public read store information" on store_information;
create policy "public read store information" on store_information
  for select to anon, authenticated using (true);

-- No policies are created for ai_conversations / ai_messages: they stay
-- fully locked to the service role. Conversation logs are never meant to be
-- readable via a public/anon key.
