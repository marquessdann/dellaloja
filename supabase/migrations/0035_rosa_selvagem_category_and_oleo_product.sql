-- Della — nova categoria "Rosa Selvagem" e primeiro produto dela: Óleo de
-- Rosa Mosqueta Clareador 100ml.
--
-- Sem links de Mercado Livre/Shopee/TikTok Shop ainda (não foram
-- informados) — adicione-os depois com um update em
-- product_marketplace_links quando estiverem disponíveis.
-- Safe to run more than once.

insert into categories (slug, name, description) values
  ('rosa-selvagem', 'Rosa Selvagem', 'Óleos corporais Rosa Selvagem com rosa mosqueta para uma pele mais uniforme, hidratada e iluminada.')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description;

insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('oleo-rosa-mosqueta-clareador-rosa-selvagem-100ml', 'Óleo de Rosa Mosqueta Clareador 100ml - Rosa Selvagem', 'Rosa Selvagem', 'rosa-selvagem',
   'Óleo clareador com rosa mosqueta, girassol e amêndoas, para uma pele mais uniforme, hidratada e iluminada.',
   'Óleo de Rosa Mosqueta Clareador Rosa Selvagem, ideal para quem busca uma pele mais uniforme, hidratada e iluminada. Com óleo de girassol, óleo de amêndoas e óleo de rosa mosqueta, que ajuda a combater estrias, queloides e cicatrizes. Tecnologia biomimética que ajuda na manutenção e recuperação da coloração original da pele manchada. 100% natural, não testado em animais.',
   '/images/products/50-oleo-rosa-mosqueta-clareador-rosa-selvagem.webp', '/produto/oleo-rosa-mosqueta-clareador-rosa-selvagem-100ml')
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
