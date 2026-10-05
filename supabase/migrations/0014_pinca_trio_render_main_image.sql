-- Della — troca a foto principal do "Kit 3 Pinças Ponta Fina Edel Solingen
-- Aço Inox" de novo, para o render das 3 pontas fechado (substitui a foto
-- da migration 0013), e define a mesma foto das 3 pontas (straight photo)
-- como principal no Kit 3 Pinças Ponta Fina ... Sobrancelha.
-- Safe to run more than once.

update products set
  image_url = '/images/products/25-kit-pinca-ponta-fina-edel-solingen-inox-trio-render.webp'
where slug = 'kit-pinca-ponta-fina-edel-solingen-inox';

update products set
  image_url = '/images/products/28-kit-pinca-ponta-fina-edel-solingen-inox-sobrancelha-trio.webp'
where slug = 'kit-pinca-ponta-fina-edel-solingen-inox-sobrancelha';
