-- Della — novo produto: Pomada de Fixação Matte Effect Efeito Seco Carmesim
-- 50g (categoria Mirras), com links de Mercado Livre, Shopee e TikTok Shop
-- específicos do produto.
-- Safe to run more than once.

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('pomada-matte-effect-carmesim-50g', 'Pomada de Fixação Matte Effect Efeito Seco Carmesim 50g', 'Carmesim', 'mirras',
   'Pomada de fixação matte effect, toque seco e textura leve, para fixação forte sem brilho.',
   'A Pomada de Fixação Matte Effect Efeito Seco Carmesim possui ativos inovadores que proporcionam maior flexibilidade para modelar, definir e fixar o penteado no estilo que desejar, deixando os cabelos com toque natural. Com textura leve e não oleosa, é ideal para finalizar cabelos curtos e médios com acabamento sem brilho, além disso, garante a fixação do penteado durante o dia todo. Modo de usar: espalhe uma pequena quantidade do produto nas mãos e aplique nos cabelos secos ou úmidos, modelando conforme desejar — evite a raiz do cabelo. A Pomada Matte não permite remodelação ao longo do dia: use com os fios molhados para um efeito mais natural e com os cabelos secos para finalização matte sem brilho.',
   '/images/products/41-pomada-matte-effect-carmesim-50g.webp', '/produto/pomada-matte-effect-carmesim-50g')
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
  ('pomada-matte-effect-carmesim-50g', 'mercado-livre', 'https://produto.mercadolivre.com.br/MLB-5477544623-pomada-matte-50g-carmesim-capilar-modeladora-toque-seco-poma-_JM'),
  ('pomada-matte-effect-carmesim-50g', 'shopee', 'https://shopee.com.br/product/1931210934/58271017905'),
  ('pomada-matte-effect-carmesim-50g', 'tiktok-shop', 'https://www.tiktok.com/shop/br/pdp/1738143264751322206')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
