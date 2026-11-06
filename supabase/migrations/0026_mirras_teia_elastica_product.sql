-- Della — novo produto: Pomada Finalizadora Efeito Teia Elástica Mirra's
-- 150g (categoria Mirras), com links de Mercado Livre, Shopee e TikTok Shop
-- específicos do produto.
-- Safe to run more than once.

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('pomada-finalizadora-teia-elastica-mirras-150g', 'Pomada Finalizadora Efeito Teia Elástica Mirra''s 150g', 'Mirra''s', 'mirras',
   'Pomada finalizadora efeito teia elástica, fixação e modelagem com resultado duradouro e natural.',
   'A Pomada Finalizadora Efeito Teia Elástica Mirra''s é o produto ideal para quem busca fixação e modelagem dos cabelos. Sua consistência em pomada permite pentear os fios com facilidade, garantindo um visual impecável. Com teste oftalmológico e dermatologicamente testado, é segura para uso diário. A textura elástica tipo teia proporciona um resultado duradouro e natural.',
   '/images/products/44-pomada-finalizadora-teia-elastica-mirras-150g.webp', '/produto/pomada-finalizadora-teia-elastica-mirras-150g')
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
  ('pomada-finalizadora-teia-elastica-mirras-150g', 'mercado-livre', 'https://www.mercadolivre.com.br/pomada-modeladora-carmesim-efeito-teia-elastica-80g-cera/up/MLBU5730971108?pdp_filters=item_id:MLB7902073960'),
  ('pomada-finalizadora-teia-elastica-mirras-150g', 'shopee', 'https://shopee.com.br/product/1931210934/58220995844'),
  ('pomada-finalizadora-teia-elastica-mirras-150g', 'tiktok-shop', 'https://www.tiktok.com/shop/br/pdp/1738143364279993438')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
