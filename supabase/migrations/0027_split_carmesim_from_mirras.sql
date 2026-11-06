-- Della — separa a marca Carmesim da categoria "Mirras" (que na verdade é
-- a marca Mirra's — categorias por marca, não por tipo de produto). Cria a
-- categoria "Carmesim" e move os 3 produtos Carmesim (pasta, matte effect,
-- pomada 3 em 1) para ela; os produtos Mirra's permanecem em "mirras".
-- Safe to run more than once.

insert into categories (slug, name, description) values
  ('carmesim', 'Carmesim', 'Pastas e pomadas Carmesim de finalização capilar, para fixação e estilo duradouros.')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description;

update categories set
  description = 'Pomadas e ceras Mirra''s para modelar e fixar o penteado com estilo.'
where slug = 'mirras';

update products set category_id = (select id from categories where slug = 'carmesim')
where slug in (
  'pasta-modeladora-efeito-cola-carmesim-80g',
  'pomada-matte-effect-carmesim-50g',
  'pomada-estilizadora-carmesim-3-em-1-80g'
);
