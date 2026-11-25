-- Della — remove toda a linha Enaldinho (categoria "Coleção Enaldinho" /
-- slug body-splash) a pedido do cliente: os 4 body splashes, o gel de
-- cabelo e os 3 hidratantes labiais, com seus links de marketplace, e a
-- própria categoria.
-- Safe to run more than once.

delete from product_marketplace_links
where product_id in (
  select id from products where slug in (
    'body-splash-treta-citrica',
    'body-splash-gelo-sinistro',
    'body-splash-explosao-cosmica',
    'body-splash-chiclete-irado',
    'gel-controle-mental-gelatinoso',
    'hidratante-labial-chiclete-congelante',
    'hidratante-labial-chocomenta-subzero',
    'hidratante-labial-milkshake-morango'
  )
);

delete from products where slug in (
  'body-splash-treta-citrica',
  'body-splash-gelo-sinistro',
  'body-splash-explosao-cosmica',
  'body-splash-chiclete-irado',
  'gel-controle-mental-gelatinoso',
  'hidratante-labial-chiclete-congelante',
  'hidratante-labial-chocomenta-subzero',
  'hidratante-labial-milkshake-morango'
);

delete from categories where slug = 'body-splash';
