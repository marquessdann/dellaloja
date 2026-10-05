-- Della — atualiza os links genéricos de loja (usados pelo menu "Onde
-- comprar" da Della IA quando perguntam de forma genérica, sem produto
-- específico) para os links mais atuais enviados.
-- Safe to run more than once.

update marketplaces set
  url = 'https://lista.mercadolivre.com.br/_CustId_3692836444?item_id=MLB5305023545&category_id=MLB199175&seller_id=3692836444&client=recoview-selleritems&recos_listing=true#origin=pdp&component=sellerData&typeSeller=classic'
where slug = 'mercado-livre';

update marketplaces set
  url = 'https://shopee.com.br/dellanewstore?categoryId=100630&entryPoint=ShopByPDP&itemId=58219618143'
where slug = 'shopee';
