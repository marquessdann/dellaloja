-- Della — novo produto: Kit 3 Pinças Laqueadas Ponta Fina Preta Edel Solingen
-- (categoria Pinça/Depilação), com links de Mercado Livre, Shopee e TikTok
-- Shop específicos deste produto.
-- Safe to run more than once.

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('kit-3-pincas-laqueadas-preta-ponta-fina', 'Kit 3 Pinças Laqueadas Ponta Fina Preta Edel Solingen', 'Edel Solingen', 'pinca-depilacao',
   'Kit com 3 pinças laqueadas pretas, ponta fina de precisão, idênticas.',
   'Kit com 3 pinças laqueadas idênticas Edel Solingen, em acabamento preto fosco e ponta fina de precisão, ideais para design de sobrancelhas e remoção de pelos curtos e finos. As pontas são perfeitamente alinhadas, garantindo ótima aderência mesmo nos pelos mais curtos, com qualidade e precisão Solingen legítimas em cada peça. Ter 3 pinças traz mais praticidade e economia: profissionais podem alternar entre clientes enquanto uma é higienizada, sempre com uma reserva pronta para uso — deixe uma em casa, uma no trabalho e uma na bolsa. Esterilizável com álcool 70%, perfeito para designers de sobrancelhas, profissionais da beleza e uso pessoal.',
   '/images/products/39-kit-pinca-laqueada-preta-ponta-fina.webp', '/produto/kit-3-pincas-laqueadas-preta-ponta-fina')
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
  ('kit-3-pincas-laqueadas-preta-ponta-fina', 'mercado-livre', 'https://www.mercadolivre.com.br/kit-3-pincas-pontas-finas-laqueadas/up/MLBU5645818538?pdp_filters=item_id:MLB7861994330'),
  ('kit-3-pincas-laqueadas-preta-ponta-fina', 'shopee', 'https://shopee.com.br/product/1931210934/58221032048'),
  ('kit-3-pincas-laqueadas-preta-ponta-fina', 'tiktok-shop', 'https://www.tiktok.com/shop/br/pdp/1738143389286696030')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;
