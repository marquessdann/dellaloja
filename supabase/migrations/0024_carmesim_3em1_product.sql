-- Della — novo produto: Pomada Estilizadora Carmesim 3 em 1 80g (categoria
-- Mirras), com links de Mercado Livre, Shopee e TikTok Shop específicos do
-- produto.
-- Safe to run more than once.

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('pomada-estilizadora-carmesim-3-em-1-80g', 'Pomada Estilizadora Carmesim 3 em 1 80g', 'Carmesim', 'mirras',
   'Pomada estilizadora 3 em 1 com ação anti-frizz, não resseca e não deixa resíduos.',
   'A Pomada Estilizadora Carmesim ajuda a modelar e finalizar os cabelos no dia a dia. A fórmula 3 em 1 é indicada na embalagem para estilização, com ação anti-frizz. Segundo o rótulo, não resseca os fios e não deixa resíduos, além de ser dermatologicamente testada e aprovada. Modo de usar: aplique uma pequena quantidade nas mãos e distribua pelos cabelos, modelando conforme o penteado desejado — se precisar, acrescente mais produto aos poucos. Consulte as instruções da embalagem antes de usar.',
   '/images/products/42-pomada-estilizadora-carmesim-3em1-80g.webp', '/produto/pomada-estilizadora-carmesim-3-em-1-80g')
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
  ('pomada-estilizadora-carmesim-3-em-1-80g', 'mercado-livre', 'https://www.mercadolivre.com.br/pomada-estilizadora-carmesim-3-em-1-cabelo-80g-modeladora/up/MLBU5730839836?pdp_filters=item_id:MLB5477518475'),
  ('pomada-estilizadora-carmesim-3-em-1-80g', 'shopee', 'https://shopee.com.br/product/1931210934/58271027155'),
  ('pomada-estilizadora-carmesim-3-em-1-80g', 'tiktok-shop', 'https://www.tiktok.com/shop/br/pdp/1738143360334070878')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
