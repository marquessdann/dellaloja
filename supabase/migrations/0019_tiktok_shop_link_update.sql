-- Della — atualiza o link do TikTok Shop para o link curto da loja
-- (substitui o link de perfil usado na migration 0018).
-- Safe to run more than once.

update marketplaces set
  url = 'https://vt.tiktok.com/ZSg8vV8ot/?page=TikTokShop'
where slug = 'tiktok-shop';
