-- Della — troca a foto principal do "Kit 3 Pinças Ponta Fina Edel Solingen
-- Aço Inox" para a nova foto das 3 pontas lado a lado.
-- Safe to run more than once.

update products set
  image_url = '/images/products/25-kit-pinca-ponta-fina-edel-solingen-inox-trio.webp'
where slug = 'kit-pinca-ponta-fina-edel-solingen-inox';
