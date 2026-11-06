-- Della — nova categoria "Barbearia" e primeiro produto dela: Navalha Aço
-- Inox Edel Solingen 3011.548, com links de Mercado Livre, Shopee e
-- TikTok Shop específicos do produto.
-- Safe to run more than once.

insert into categories (slug, name, description) values
  ('barbearia', 'Barbearia', 'Navalhas e acessórios Edel Solingen para um barbear preciso de qualidade profissional.')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description;

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('navalha-aco-inox-edel-solingen-3011548', 'Navalha Aço Inox Edel Solingen 3011.548', 'Edel Solingen', 'barbearia',
   'Navalha em aço inoxidável para um barbear preciso e rente, com cabo de plástico e lâminas inclusas.',
   'A Navalha Aço Inox 3011.548 Edel Solingen é a ferramenta perfeita para um barbear preciso e rente. Feita de aço inoxidável, garante um corte limpo e suave. O cabo de plástico proporciona um manuseio confortável e seguro, permitindo um controle total durante o uso. Vem com lâminas incluídas, ideal para uso pessoal, seja em casa ou em viagens.',
   '/images/products/48-navalha-aco-inox-edel-solingen-3011548.webp', '/produto/navalha-aco-inox-edel-solingen-3011548')
) as v(slug, name, brand, category_slug, short_description, description, image_url, product_url)
join categories c on c.slug = v.category_slug
on conflict (slug) do update set
  name = excluded.name,
  brand = excluded.brand,
  category_id = excluded.category_id,
  short_description = excluded.short_description,
  description = excluded.description,
  image_url = excluded.image_url,
  product_url = excluded.product_url;

insert into product_marketplace_links (product_id, marketplace_id, url, active)
select p.id, m.id, v.url, true
from (values
  ('navalha-aco-inox-edel-solingen-3011548', 'mercado-livre', 'https://www.mercadolivre.com.br/navalha-aco-inox-9cm-edel-solingen-3011548-lamina-68-concava/p/MLB27526489?pdp_filters=item_id:MLB5305023545'),
  ('navalha-aco-inox-edel-solingen-3011548', 'shopee', 'https://shopee.com.br/product/1931210934/58270846620'),
  ('navalha-aco-inox-edel-solingen-3011548', 'tiktok-shop', 'https://vt.tiktok.com/ZS9fdvXDAj2Nc-gx2lx/')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
