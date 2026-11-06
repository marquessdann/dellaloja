-- Della — nova categoria "Letrinhas" e primeiro produto dela: Gel Brilho
-- Molhado Letrinhas Extra Forte 235g.
--
-- O produto tem 4 variações de cor no site (Amarelo, Azul, Incolor, Verde),
-- cada uma com seus próprios links de Mercado Livre/Shopee/TikTok Shop — o
-- schema atual não modela variantes por produto, então aqui ele entra com
-- os dados/links da variação Amarelo (a exibida por padrão antes de
-- escolher uma cor); a Della IA pode mencionar as outras cores pelo texto
-- da descrição, mas o link de compra que ela sugerir será sempre o do
-- Amarelo até o schema ganhar suporte a variantes.
-- Safe to run more than once.

insert into categories (slug, name, description) values
  ('letrinhas', 'Letrinhas', 'Géis infantis Letrinhas para modelar e fixar o penteado das crianças, com brilho e sem resíduos.')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description;

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('gel-brilho-molhado-letrinhas-extra-forte-235g', 'Gel Brilho Molhado Letrinhas Extra Forte 235g', 'Letrinhas', 'letrinhas',
   'Gel infantil fixador com efeito brilho molhado, fator extra forte, 0% álcool e sem resíduos.',
   'Gel fixador com efeito brilho molhado e fixação extra forte, ideal para modelar e finalizar o penteado das crianças. Fórmula 0% álcool e anti flakes, que não deixa resíduos brancos no cabelo, com pH neutro. Disponível nas cores Amarelo, Azul, Incolor e Verde — escolha a variação no site. Recomendado a partir dos 3 anos, com uso sempre supervisionado por um adulto.',
   '/images/products/46-gel-brilho-molhado-letrinhas-235g-amarelo.webp', '/produto/gel-brilho-molhado-letrinhas-extra-forte-235g')
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
  ('gel-brilho-molhado-letrinhas-extra-forte-235g', 'mercado-livre', 'https://produto.mercadolivre.com.br/MLB-7901926564-gel-para-cabelo-infantil-letrinhas-brilho-molhado-_JM'),
  ('gel-brilho-molhado-letrinhas-extra-forte-235g', 'shopee', 'https://shopee.com.br/product/1931210934/58271554591'),
  ('gel-brilho-molhado-letrinhas-extra-forte-235g', 'tiktok-shop', 'https://www.tiktok.com/shop/br/pdp/1738231955941721182')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
