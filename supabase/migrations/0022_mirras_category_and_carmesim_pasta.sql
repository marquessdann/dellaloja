-- Della — nova categoria "Mirras" (produtos de finalização capilar) e
-- primeiro produto dela: Pasta Modeladora Efeito Cola Carmesim 80g, com
-- links de Mercado Livre, Shopee e TikTok Shop específicos do produto.
-- Safe to run more than once.

insert into categories (slug, name, description) values
  ('mirras', 'Mirras', 'Pastas e produtos de finalização capilar para modelar e fixar o penteado com estilo.')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description;

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('pasta-modeladora-efeito-cola-carmesim-80g', 'Pasta Modeladora Efeito Cola Carmesim 80g', 'Carmesim', 'mirras',
   'Pasta modeladora efeito cola, vegana e dermatologicamente testada, para fixação e estilo duradouros.',
   'Pasta modeladora efeito cola Carmesim, dermatologicamente testada — a fórmula vegana e livre de glúten garante segurança e conforto para o uso diário. Os ingredientes de alta qualidade promovem não apenas a modelagem, mas também a saúde dos fios, evitando danos e ressecamento. O pote de 80g é prático e fácil de transportar, tornando-se um aliado indispensável na sua rotina de cuidados capilares. Aplique uma pequena quantidade nos cabelos secos ou úmidos e modele conforme desejado — com Carmesim, você tem a liberdade de expressar sua personalidade através do seu cabelo.',
   '/images/products/40-pasta-modeladora-carmesim-80g.webp', '/produto/pasta-modeladora-efeito-cola-carmesim-80g')
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
  ('pasta-modeladora-efeito-cola-carmesim-80g', 'mercado-livre', 'https://produto.mercadolivre.com.br/MLB-5477542731-pasta-modeladora-efeito-cola-carmesim-80g-_JM'),
  ('pasta-modeladora-efeito-cola-carmesim-80g', 'shopee', 'https://shopee.com.br/product/1931210934/58271027322'),
  ('pasta-modeladora-efeito-cola-carmesim-80g', 'tiktok-shop', 'https://www.tiktok.com/shop/br/pdp/1738143320849876062')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
