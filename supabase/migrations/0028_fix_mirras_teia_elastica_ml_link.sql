-- Della — corrige um erro da migration 0026: o link de Mercado Livre
-- MLB7902073960 ("...carmesim-efeito-teia-elastica-80g...") atribuído à
-- Pomada Finalizadora Efeito Teia Elástica Mirra's 150g na verdade é de
-- outro produto (Carmesim, 80g, pote roxo — não o Mirra's 150g de pote
-- preto). Remove esse link incorreto; o produto Mirra's fica só com
-- Shopee e TikTok Shop até ter um link de ML próprio.
-- Safe to run more than once.

delete from product_marketplace_links
where product_id = (select id from products where slug = 'pomada-finalizadora-teia-elastica-mirras-150g')
  and marketplace_id = (select id from marketplaces where slug = 'mercado-livre');
