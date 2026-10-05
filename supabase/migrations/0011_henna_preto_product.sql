-- Della — novo produto: Henna Para Sobrancelhas Master - Preto
-- (venda avulsa de uma única tonalidade, separado do Kit Master Henna).
-- Safe to run more than once.

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('henna-sobrancelhas-master-preto-3g', 'Henna Para Sobrancelhas Master - Preto', 'Master', 'sobrancelhas',
   'Henna profissional para sobrancelhas na cor preto, com alta cobertura e fixação intensa.',
   'Henna profissional para sobrancelhas na cor preto, com alta cobertura e fixação intensa. Fórmula com extratos de Jaborandi e Bamboo, ideal para corrigir falhas e definir sobrancelhas de tom bem escuro ou preto.',
   '/images/products/37-henna-sobrancelhas-master-preto-3g.webp', '/produto/henna-sobrancelhas-master-preto-3g')
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
  ('henna-sobrancelhas-master-preto-3g', 'mercado-livre', 'http://produto.mercadolivre.com.br/MLB-5337956293-henna-master-preto-sobrancelha-profissional-3g-_JM'),
  ('henna-sobrancelhas-master-preto-3g', 'shopee', 'https://shopee.com.br/product/1931210934/58219790333')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
