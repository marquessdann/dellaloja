-- Della — renomeia "Trio Master Henna" para "Kit Master Henna" (mesmo
-- produto, só ajuste de nome). Cobre os dois slugs possíveis dependendo de
-- você já ter rodado a 0006 ou não — safe to run more than once.

update products set
  slug = 'kit-henna-sobrancelhas-master',
  name = 'Kit Master Henna - Castanho Claro, Médio e Escuro',
  short_description = 'Kit com as 3 tonalidades de henna profissional para sobrancelhas Master: castanho claro, médio e escuro.',
  description = 'Kit Master Henna: kit profissional com as 3 tonalidades de henna para sobrancelhas — castanho claro, castanho médio e castanho escuro, 3g cada. Fórmula com extratos de Jaborandi e Bamboo, ideal para corrigir falhas com naturalidade e cobrir toda a variedade de tons de sobrancelha.',
  image_url = '/images/products/20-kit-henna-sobrancelhas-master.webp',
  product_url = '/produto/kit-henna-sobrancelhas-master'
where slug in ('trio-henna-sobrancelhas-master', 'henna-sobrancelhas-master-loiro-escuro');

insert into product_marketplace_links (product_id, marketplace_id, url, active)
select p.id, m.id, v.url, true
from (values
  ('kit-henna-sobrancelhas-master', 'mercado-livre', 'https://www.mercadolivre.com.br/kit-henna-sobrancelhas-master-castanho-claro-medio-e-escuro/up/MLBU3459364955?pdp_filters=item_id%3AMLB5765210048&quantity=1'),
  ('kit-henna-sobrancelhas-master', 'shopee', 'https://shopee.com.br/product/1931210934/58269795372')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
