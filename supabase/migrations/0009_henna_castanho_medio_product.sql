-- Della — novo produto: Henna Para Sobrancelhas Master - Castanho Médio
-- (venda avulsa de uma única tonalidade, separado do Kit Master Henna).
-- Safe to run more than once.

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('henna-sobrancelhas-master-castanho-medio-3g', 'Henna Para Sobrancelhas Master - Castanho Médio', 'Master', 'sobrancelhas',
   'Henna profissional para sobrancelhas na cor castanho médio, com pigmentação uniforme.',
   'Henna profissional para sobrancelhas na cor castanho médio, com pigmentação uniforme e boa fixação. Fórmula com extratos de Jaborandi e Bamboo, ideal para corrigir falhas com naturalidade em sobrancelhas de tom médio.',
   '/images/products/35-henna-sobrancelhas-master-castanho-medio-3g.webp', '/produto/henna-sobrancelhas-master-castanho-medio-3g')
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
  ('henna-sobrancelhas-master-castanho-medio-3g', 'mercado-livre', 'http://produto.mercadolivre.com.br/MLB-5337784715-henna-master-profissional-castanho-medio-para-sobrancelhas-_JM'),
  ('henna-sobrancelhas-master-castanho-medio-3g', 'shopee', 'https://shopee.com.br/product/1931210934/58269793667')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
