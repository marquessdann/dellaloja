-- Della — novo produto: Pomada Estilizadora 3 em 1 Mirra's 150g (categoria
-- Mirras), com links de Mercado Livre, Shopee e TikTok Shop específicos do
-- produto.
-- Safe to run more than once.

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('pomada-estilizadora-3-em-1-mirras-150g', 'Pomada Estilizadora 3 em 1 Mirra''s 150g', 'Mirra''s', 'mirras',
   'A primeira pomada registrada no Brasil — fórmula 3 em 1 com excelente fixação e que não resseca os fios.',
   'Lançada em 2012, a Pomada Estilizadora 3 em 1 Mirra''s é referência em qualidade, estilo e performance — a primeira pomada registrada no Brasil. Sua fórmula proporciona fixação, modelagem e acabamento em um único produto, garantindo praticidade e um visual impecável por mais tempo. Excelente fixação, modela diversos estilos, fácil de aplicar e remover, e não resseca os fios.',
   '/images/products/43-pomada-estilizadora-3em1-mirras-150g.webp', '/produto/pomada-estilizadora-3-em-1-mirras-150g')
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
  ('pomada-estilizadora-3-em-1-mirras-150g', 'mercado-livre', 'https://produto.mercadolivre.com.br/MLB-5433100331-kit-3-pomadas-estlizadora-3-em-1-mirras-_JM'),
  ('pomada-estilizadora-3-em-1-mirras-150g', 'shopee', 'https://shopee.com.br/product/1931210934/58270975416'),
  ('pomada-estilizadora-3-em-1-mirras-150g', 'tiktok-shop', 'https://www.tiktok.com/shop/br/pdp/1738105409726022750')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
