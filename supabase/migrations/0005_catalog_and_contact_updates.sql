-- Della — remove descontinued product, fix neighborhood name (Guaíra, not
-- Parolin) and set the real Mercado Livre/Shopee storefront links.
-- Safe to run more than once (DELETE by slug, UPDATE by id/text, UPSERT by
-- slug).

-- "Protetor Para Pálpebras Eyepatch Master Flor" foi removido do catálogo
-- (não será mais vendido). A FK em product_marketplace_links já é
-- "on delete cascade", então isso não deixa links órfãos.
delete from products where slug = 'protetor-palpebras-eyepatch-master-flor';

update store_information set
  address = 'Rua Assis Figueiredo, 59 - Guaíra, Curitiba - PR, CEP 80.630-280'
where id = 1;

update faq set
  answer = 'Sim. A Della fica na Rua Assis Figueiredo, 59 - Guaíra, Curitiba - PR, CEP 80.630-280.'
where question = 'Vocês têm loja física?';

-- Links reais da loja (storefront geral, não de um produto específico).
update marketplaces set
  url = 'https://lista.mercadolivre.com.br/_CustId_3692836444?item_id=MLB5292305735&category_id=MLB257279&seller_id=3692836444&client=recoview-selleritems&recos_listing=true#origin=upp&component=sellerData&typeSeller=classic'
where slug = 'mercado-livre';

update marketplaces set
  url = 'https://shopee.com.br/dellanewstore#product_list'
where slug = 'shopee';
