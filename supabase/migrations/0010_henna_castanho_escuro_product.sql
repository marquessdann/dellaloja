-- Della — novo produto: Henna Para Sobrancelhas Master - Castanho Escuro
-- (venda avulsa de uma única tonalidade, separado do Kit Master Henna).
-- Safe to run more than once.

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('henna-sobrancelhas-master-castanho-escuro-3g', 'Henna Para Sobrancelhas Master - Castanho Escuro', 'Master', 'sobrancelhas',
   'Henna profissional para sobrancelhas na cor castanho escuro, com alta cobertura e acabamento natural.',
   'Henna profissional para sobrancelhas na cor castanho escuro, com alta cobertura e boa fixação. Fórmula com extratos de Jaborandi e Bamboo, ideal para corrigir falhas e preencher visualmente sobrancelhas de tom escuro.',
   '/images/products/36-henna-sobrancelhas-master-castanho-escuro-3g.webp', '/produto/henna-sobrancelhas-master-castanho-escuro-3g')
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
  ('henna-sobrancelhas-master-castanho-escuro-3g', 'mercado-livre', 'https://www.mercadolivre.com.br/henna-master-castanho-escuro-sobrancelha-profissional-3g/up/MLBU5364957177?pdp_filters=item_id:MLB5337828391'),
  ('henna-sobrancelhas-master-castanho-escuro-3g', 'shopee', 'https://shopee.com.br/product/1931210934/58269802900')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
