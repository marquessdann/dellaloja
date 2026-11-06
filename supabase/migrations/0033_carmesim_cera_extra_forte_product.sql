-- Della — novo produto: Cera Modeladora Extra Forte Carmesim (categoria
-- Carmesim), com links de Mercado Livre, Shopee e TikTok Shop específicos
-- do produto.
-- Safe to run more than once.

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('cera-modeladora-extra-forte-carmesim', 'Cera Modeladora Extra Forte Carmesim', 'Carmesim', 'carmesim',
   'Cera modeladora extra forte, com brilho suave e cera de abelha para maciez e hidratação.',
   'A Cera Modeladora Extra Forte Carmesim ajuda a definir o cabelo sem marcar tanto o penteado como um gel fixador. Proporciona fios mais firmes e agrupados, com consistência adequada. A cera confere um brilho suave sem deixar sensação pegajosa, sendo composta por elementos naturais como a cera de abelha, que contribui para a maciez e hidratação dos cabelos, além de possuir uma fragrância inspiradora.',
   '/images/products/49-cera-modeladora-extra-forte-carmesim.webp', '/produto/cera-modeladora-extra-forte-carmesim')
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
  ('cera-modeladora-extra-forte-carmesim', 'mercado-livre', 'https://www.mercadolivre.com.br/kit-com-3-pomadas-cera-modeladoras-extra-forte-pomada-cabelo/up/MLBU5681659743?pdp_filters=item_id:MLB7901946794'),
  ('cera-modeladora-extra-forte-carmesim', 'shopee', 'https://shopee.com.br/product/1931210934/58271039008'),
  ('cera-modeladora-extra-forte-carmesim', 'tiktok-shop', 'https://www.tiktok.com/shop/br/pdp/1738143325002105950')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
