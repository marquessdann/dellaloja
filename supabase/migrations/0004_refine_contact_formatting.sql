-- Della — ajuste fino de formatação nos dados de contato/localização.
-- Segue a 0003_update_contact_info.sql: corrige o separador antes de
-- "Parolin" no endereço (agora " - " em vez de ",") e remove o parêntese
-- do DDD no telefone/WhatsApp (agora "41 99679-0904"), para bater
-- exatamente com o texto usado no site e nas respostas da IA.
-- Seguro rodar mais de uma vez (só UPDATE).

update store_information set
  address = 'Rua Assis Figueiredo, 59 - Parolin, Curitiba - PR, CEP 80.630-280',
  phone = '41 99679-0904',
  whatsapp = '41 99679-0904'
where id = 1;

update faq set
  answer = 'Sim. A Della fica na Rua Assis Figueiredo, 59 - Parolin, Curitiba - PR, CEP 80.630-280.'
where question = 'Vocês têm loja física?';
