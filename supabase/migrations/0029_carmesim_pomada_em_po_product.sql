-- Della — novo produto: Pomada Em Pó Carmesim 10g (categoria Carmesim),
-- com links de Mercado Livre, Shopee e TikTok Shop específicos do produto.
-- Safe to run more than once.

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('pomada-em-po-carmesim-10g', 'Pomada Em Pó Carmesim 10g', 'Carmesim', 'carmesim',
   'Pomada em pó fixadora, modeladora e com efeito volume instantâneo, livre de glúten e vegana.',
   'A Pomada Em Pó 10g Carmesim é o produto ideal para quem busca modelar, fixar e dar volume instantâneo aos cabelos. Com consistência em pó, essa pomada fixadora é livre de glúten, sendo perfeita para quem busca um produto vegano. Sua fórmula exclusiva proporciona resultados incríveis, garantindo um visual impecável o dia todo.',
   '/images/products/45-pomada-em-po-carmesim-10g.webp', '/produto/pomada-em-po-carmesim-10g')
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
  ('pomada-em-po-carmesim-10g', 'mercado-livre', 'https://www.mercadolivre.com.br/pomada-em-po-fixadora-pomada-seca-cera-cabelo-carmesim-10g/up/MLBU5681670823?pdp_filters=item_id:MLB7901973182'),
  ('pomada-em-po-carmesim-10g', 'shopee', 'https://shopee.com.br/product/1931210934/58271034921'),
  ('pomada-em-po-carmesim-10g', 'tiktok-shop', 'https://www.tiktok.com/shop/br/pdp/1738143320735188062')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
