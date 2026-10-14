-- Della — define o link real do TikTok Shop (antes "Em breve"/NULL) para o
-- menu "Onde comprar" da Della IA e o rodapé do site.
-- Safe to run more than once.

update marketplaces set
  url = 'https://www.tiktok.com/@della.comrcio.e.di?_r=1&_t=ZS-9AY8LZxE7Sm'
where slug = 'tiktok-shop';
