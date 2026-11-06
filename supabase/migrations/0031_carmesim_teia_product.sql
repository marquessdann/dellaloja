-- Della — novo produto: Pomada Finalizadora Efeito Teia Carmesim 80g
-- (categoria Carmesim, pote roxo), com apenas o link de Mercado Livre
-- (único pedido pelo cliente para este produto).
-- Safe to run more than once.

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('pomada-finalizadora-efeito-teia-carmesim-80g', 'Pomada Finalizadora Efeito Teia Carmesim 80g', 'Carmesim', 'carmesim',
   'Pomada finalizadora efeito teia, fixação flexível e acabamento natural sem pesar os fios.',
   'A Pomada Finalizadora Efeito Teia Carmesim possui ativos inovadores que proporcionam maior flexibilidade para modelar, definir e fixar o penteado no estilo que desejar. Com efeito teia, garante fixação e modelagem para looks modernos e duradouros, com acabamento natural que define os fios sem pesar. Fácil de usar e remover, sem deixar resíduos no cabelo.',
   '/images/products/47-pomada-finalizadora-teia-carmesim-80g.webp', '/produto/pomada-finalizadora-efeito-teia-carmesim-80g')
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
  ('pomada-finalizadora-efeito-teia-carmesim-80g', 'mercado-livre', 'https://produto.mercadolivre.com.br/MLB-7902073960-pomada-modeladora-carmesim-efeito-teia-elastica-80g-cera-_JM')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
