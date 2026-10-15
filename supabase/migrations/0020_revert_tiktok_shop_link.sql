-- Della — reverte o TikTok Shop para o link de perfil anterior (o link
-- curto da loja aplicado na migration 0019 foi desfeito a pedido).
-- Safe to run more than once.

update marketplaces set
  url = 'https://www.tiktok.com/@della.comrcio.e.di?_r=1&_t=ZS-9AY8LZxE7Sm'
where slug = 'tiktok-shop';
