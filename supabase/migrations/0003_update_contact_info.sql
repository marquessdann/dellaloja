-- Della — atualização dos dados oficiais de contato/localização/horário.
-- Roda direto sobre os dados já existentes no projeto (não recria nada) —
-- seguro rodar mais de uma vez: só UPDATE por id/texto e INSERT com
-- checagem de existência antes.
--
-- Se você ainda não rodou supabase/seed.sql, rode-o primeiro (ele já foi
-- atualizado com os mesmos dados novos) — esta migration é para quem já
-- tinha os dados antigos em produção e só precisa corrigi-los.

-- phone e whatsapp são o mesmo número na Della (não existe uma linha fixa
-- separada) — preenchendo os dois, uma pergunta sobre "telefone" e uma
-- sobre "WhatsApp" respondem igualmente, em vez da IA dizer que não tem
-- acesso ao telefone só porque essa coluna nunca foi preenchida.
update store_information set
  address = 'Rua Assis Figueiredo, 59, Parolin, Curitiba - PR, CEP 80.630-280',
  phone = '(41) 99679-0904',
  whatsapp = '(41) 99679-0904',
  whatsapp_link = 'https://wa.me/5541996790904?text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%20da%20Della%20Distribuidora%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida!%20Pode%20me%20ajudar%3F!',
  email = 'contato@dellastore.com.br',
  business_hours = 'Segunda a sexta-feira, das 09h às 17h.'
where id = 1;

update faq set
  answer = 'Sim. A Della fica na Rua Assis Figueiredo, 59, Parolin, Curitiba - PR, CEP 80.630-280.'
where question = 'Vocês têm loja física?';

insert into faq (question, answer, category, active)
select
  'Qual é o horário de atendimento?',
  'Nosso atendimento funciona de segunda a sexta-feira, das 09h às 17h.',
  'atendimento',
  true
where not exists (
  select 1 from faq where question = 'Qual é o horário de atendimento?'
);
