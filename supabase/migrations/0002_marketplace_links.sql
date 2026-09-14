-- Della AI assistant — showcase-site update
-- Run AFTER 0001_init_schema.sql. Safe to run whether or not you've
-- already run seed.sql before — it only adds columns/tables and backfills
-- existing rows by name, it never duplicates anything.
-- If you're setting up a brand-new project, the correct order is:
--   0001_init_schema.sql  →  0002_marketplace_links.sql  →  seed.sql
-- If you already ran 0001 + the old seed.sql once (this migration existed
-- after that), just run this file now; re-running seed.sql afterwards is
-- optional and harmless (it will only update the 3 marketplace rows by
-- slug, not duplicate them).

-- ============================================================
-- marketplaces: add slug/icon/display_order so the deterministic
-- "Onde comprar" menu can list them without touching code
-- ============================================================
alter table marketplaces add column if not exists slug text;
alter table marketplaces add column if not exists icon text;
alter table marketplaces add column if not exists display_order integer not null default 0;
alter table marketplaces add column if not exists created_at timestamptz not null default now();
alter table marketplaces add column if not exists updated_at timestamptz not null default now();

-- Backfill slug/icon/order for rows inserted by the original seed.sql
-- (which only had name/url/active). Safe to re-run: only touches rows
-- that still have a NULL slug.
update marketplaces set slug = 'mercado-livre', icon = 'shopping-bag', display_order = 1
  where slug is null and name = 'Mercado Livre';
update marketplaces set slug = 'shopee', icon = 'shopping-bag', display_order = 2
  where slug is null and name = 'Shopee';
update marketplaces set slug = 'tiktok-shop', icon = 'shopping-bag', display_order = 3
  where slug is null and name = 'TikTok Shop';

-- Any other pre-existing row without a slug gets a safe generated one so
-- the unique constraint below never fails on old data.
update marketplaces
  set slug = lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))
  where slug is null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'marketplaces_slug_key'
  ) then
    alter table marketplaces add constraint marketplaces_slug_key unique (slug);
  end if;
end $$;

alter table marketplaces alter column slug set not null;

create index if not exists marketplaces_active_order_idx on marketplaces (active, display_order);

drop trigger if exists set_updated_at on marketplaces;
create trigger set_updated_at before update on marketplaces
  for each row execute function set_updated_at();

-- Relax the public read policy: the deterministic "Onde comprar" menu
-- needs to list every active channel, including ones that don't have a
-- URL yet, so it can show "ainda sendo configurado" instead of hiding the
-- button entirely. (The service role used by the app's own backend
-- already bypasses RLS — this only matters for a future anon-key use.)
drop policy if exists "public read active marketplaces" on marketplaces;
create policy "public read active marketplaces" on marketplaces
  for select to anon, authenticated using (active = true);

-- ============================================================
-- product_marketplace_links — per-product override links.
-- When a product has a row here for a marketplace, the agent uses that
-- specific URL instead of the marketplace's generic storefront link.
-- ============================================================
create table if not exists product_marketplace_links (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  marketplace_id uuid not null references marketplaces(id) on delete cascade,
  url text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, marketplace_id)
);

create index if not exists product_marketplace_links_product_idx on product_marketplace_links (product_id);

drop trigger if exists set_updated_at on product_marketplace_links;
create trigger set_updated_at before update on product_marketplace_links
  for each row execute function set_updated_at();

alter table product_marketplace_links enable row level security;

drop policy if exists "public read active product marketplace links" on product_marketplace_links;
create policy "public read active product marketplace links" on product_marketplace_links
  for select to anon, authenticated using (active = true);
