-- Della — troca do anúncio de henna avulsa (loiro escuro) pelo Trio Master
-- Henna (kit com as 3 tonalidades: castanho claro, médio e escuro).
-- Atualiza a linha existente por slug (preserva o id e os relacionamentos
-- em product_marketplace_links) em vez de apagar e recriar.
-- Safe to run more than once.

update products set
  slug = 'trio-henna-sobrancelhas-master',
  name = 'Trio Master Henna - Castanho Claro, Médio e Escuro',
  short_description = 'Kit com as 3 tonalidades de henna profissional para sobrancelhas Master: castanho claro, médio e escuro.',
  description = 'Trio Master Henna: kit profissional com as 3 tonalidades de henna para sobrancelhas — castanho claro, castanho médio e castanho escuro, 3g cada. Fórmula com extratos de Jaborandi e Bamboo, ideal para corrigir falhas com naturalidade e cobrir toda a variedade de tons de sobrancelha.',
  image_url = '/images/products/20-trio-henna-sobrancelhas-master.webp',
  product_url = '/produto/trio-henna-sobrancelhas-master'
where slug = 'henna-sobrancelhas-master-loiro-escuro';

-- Links reais de Mercado Livre e Shopee para o novo anúncio.
insert into product_marketplace_links (product_id, marketplace_id, url, active)
select p.id, m.id, v.url, true
from (values
  ('trio-henna-sobrancelhas-master', 'mercado-livre', 'https://www.mercadolivre.com.br/kit-henna-sobrancelhas-master-castanho-claro-medio-e-escuro/up/MLBU3459364955?pdp_filters=item_id%3AMLB5765210048&quantity=1'),
  ('trio-henna-sobrancelhas-master', 'shopee', 'https://shopee.com.br/product/1931210934/58269795372')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
