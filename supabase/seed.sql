-- Della AI shopping assistant — seed data
-- Run AFTER 0001_init_schema.sql (Database > SQL Editor > New query).
--
-- This only inserts facts that already exist in the live site's source code
-- (src/data/products.ts, src/data/categories.ts, src/data/site-config.ts).
-- It deliberately leaves price, stock_quantity, real marketplace URLs and
-- most policy/FAQ content EMPTY, because that information does not exist
-- anywhere in the project yet — inventing it here would just move the
-- hallucination from the LLM into the database. Fill those in from the
-- Supabase Table Editor (or an UPDATE statement) once you have the real
-- numbers; the agent will start using them immediately, no code change or
-- redeploy needed.

-- ============================================================
-- categories
-- ============================================================
insert into categories (slug, name, description) values
  ('extensao-cilios', 'Extensão de Cílios', 'Fios, tufos e materiais para extensão profissional de cílios.'),
  ('adesivos', 'Adesivos', 'Colas profissionais de alta fixação para extensão de cílios.'),
  ('pincas', 'Pinças', 'Precisão e firmeza para profissionais exigentes.'),
  ('equipamentos', 'Equipamentos', 'Tecnologia profissional para elevar cada procedimento.'),
  ('lifting-coloracao', 'Lifting & Coloração', 'Lash lifting, brow lamination, henna e tintura profissional.'),
  ('cuidados-preparacao', 'Cuidados & Preparação', 'Removedores e preparadores para resultados duradouros.'),
  ('home-care', 'Home Care', 'Cuidado diário para prolongar o efeito dos procedimentos.')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description;

-- ============================================================
-- products
-- ============================================================
insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('adesivo-master-elite-diamond', 'Master Elite Diamond', 'Master', 'adesivos',
   'Adesivo transparente de secagem rápida para extensão de cílios.',
   'Adesivo profissional para extensão de cílios, com acabamento transparente e secagem entre 0,5 e 1 segundo. Desenvolvido para lash designers que buscam alta retenção e conforto para a cliente durante todo o procedimento.',
   '/images/products/01-adesivo-master-elite-diamond.webp', '/produto/adesivo-master-elite-diamond'),
  ('removedor-excellent-olive-balm', 'Excellent Olive Remover Balm', 'Excellent', 'cuidados-preparacao',
   'Removedor em balm com óleo de oliva para remoção segura.',
   'Removedor de extensão de cílios em formato balm, enriquecido com óleo de oliva para nutrir os fios naturais durante a remoção completa do adesivo. Textura em bisnaga facilita a aplicação e o controle do produto.',
   '/images/products/02-removedor-excellent-olive-balm.webp', '/produto/removedor-excellent-olive-balm'),
  ('preparador-acqua-primer', 'Acqua Primer', 'Master', 'cuidados-preparacao',
   'Primer aquoso que prepara os fios naturais para a extensão.',
   'Primer profissional para extensão de cílios, formulado sem álcool e enriquecido com niacinamida e D-pantenol. Remove a oleosidade dos fios naturais e potencializa a aderência do adesivo, indicado também para lash lifting e brow lamination.',
   '/images/products/03-preparador-acqua-primer.webp', '/produto/preparador-acqua-primer'),
  ('fios-master-premium-lash', 'Master Premium Lash', 'Master', 'extensao-cilios',
   'Fios versáteis para extensão de cílios em diferentes técnicas.',
   'Fios para extensão de cílios com versatilidade, elegância e naturalidade. Projetados para realçar o olhar de forma sofisticada e personalizada, com conforto e durabilidade em diferentes técnicas de aplicação.',
   '/images/products/04-fios-master-premium-lash.webp', '/produto/fios-master-premium-lash'),
  ('fios-technology-lash-w5d', 'Master Technology Lash W5D', 'Master', 'extensao-cilios',
   'Fios em formato W para volume e definição imediata.',
   'Fios com tecnologia W que criam um efeito volumoso e dramático com uma única aplicação. O formato exclusivo permite mais preenchimento com menos peso sobre os cílios naturais, indicado para quem busca praticidade sem abrir mão da leveza.',
   '/images/products/05-fios-technology-lash-w5d.webp', '/produto/fios-technology-lash-w5d'),
  ('tufos-cilios', 'Tufos para Cílios', 'Master', 'extensao-cilios',
   'Tufos em tamanhos únicos e mix para efeitos naturais.',
   'Tufos de cílios em tamanhos P, M e G, disponíveis também em mix, com e sem caixa. Uma opção prática para procedimentos rápidos e para compor looks naturais com efeito volumoso pontual.',
   '/images/products/06-tufos-cilios.webp', '/produto/tufos-cilios'),
  ('pinca-4md-pro-diamantada', 'Pinça 4MD-PRO Diamantada', 'Master', 'pincas',
   'Pinça diamantada para montagem de fan e acoplagem.',
   'Pinça profissional com tecnologia diamantada, desenvolvida para a montagem de fans e acoplagem dos fios com máxima precisão. Produzida em aço, é leve, resistente à autoclave e pensada para uso intenso em estúdio.',
   '/images/products/07-pinca-4md-pro-diamantada.webp', '/produto/pinca-4md-pro-diamantada'),
  ('pinca-curvada-vermonth', 'Pinça Ponta Curvada', 'Vermonth', 'pincas',
   'Pinça curvada para montagem de fans e acoplagem dos fios.',
   'Pinça de ponta curvada com 11,5 cm, indicada para procedimentos de extensão de cílios. Ideal para a montagem de fans e a acoplagem dos fios, proporcionando alta precisão, firmeza e controle durante o manuseio.',
   '/images/products/08-pinca-curvada-vermonth.webp', '/produto/pinca-curvada-vermonth'),
  ('pinca-pro-luminus-led', 'Pinça Pro Luminus LED', 'Master', 'equipamentos',
   'Pinça de isolamento com luz de LED integrada.',
   'Pinça de isolamento com fonte de luz LED integrada e carregamento USB-C, desenvolvida para dar mais clareza e precisão durante o isolamento dos fios. Design leve e ergonômico para uso contínuo, com autonomia de bateria de até 16 horas.',
   '/images/products/09-pinca-pro-luminus-led.webp', '/produto/pinca-pro-luminus-led'),
  ('kit-lash-lifting-brow-lamination', 'Kit Lash Lifting e Brow Lamination', 'Master', 'lifting-coloracao',
   'Kit completo para lash lifting e brow lamination.',
   'Kit com três produtos para realizar lash lifting e brow lamination em um único procedimento. Fórmula enriquecida com colágeno, queratina, D-pantenol, óleo de argan e rícino, rendendo até 60 aplicações de lash lifting e 40 de brow lamination.',
   '/images/products/10-kit-lash-lifting-brow-lamination.webp', '/produto/kit-lash-lifting-brow-lamination'),
  ('henna-master-sobrancelhas', 'Henna Master para Sobrancelhas', 'Master', 'lifting-coloracao',
   'Henna profissional com extrato de jaborandi e bamboo.',
   'Henna profissional para sobrancelhas, formulada com extrato de jaborandi e bamboo para realçar e fortalecer os fios. Acompanha fixador, recipiente para mistura, espátula e par de luvas, disponível em diferentes tons.',
   '/images/products/11-henna-master-sobrancelhas.webp', '/produto/henna-master-sobrancelhas'),
  ('master-lash-brow-serum', 'Master Lash & Brow Serum', 'Master', 'home-care',
   'Sérum 4 em 1 para cílios e sobrancelhas mais fortes.',
   'Sérum de uso diário que reúne ácido hialurônico, vitamina E, queratina e prohairin em uma única fórmula, pensado para cílios e sobrancelhas mais longos, volumosos e saudáveis. Prolonga os resultados dos procedimentos profissionais no conforto de casa.',
   '/images/products/12-master-lash-brow-serum.webp', '/produto/master-lash-brow-serum')
) as v(slug, name, brand, category_slug, short_description, description, image_url, product_url)
join categories c on c.slug = v.category_slug
on conflict (slug) do update set
  name = excluded.name,
  brand = excluded.brand,
  category_id = excluded.category_id,
  short_description = excluded.short_description,
  description = excluded.description,
  image_url = excluded.image_url,
  product_url = excluded.product_url;

-- ============================================================
-- marketplaces
-- ============================================================
-- The live site currently links all three to "#" (placeholder, not real
-- URLs yet), so url is left NULL here on purpose — the deterministic
-- "Onde comprar" menu still lists the channel, just shows "ainda sendo
-- configurado" until you paste in the real storefront link (Table Editor,
-- column `url` on the matching row here).
insert into marketplaces (name, slug, url, active, display_order) values
  ('Mercado Livre', 'mercado-livre', null, true, 1),
  ('Shopee', 'shopee', null, true, 2),
  ('TikTok Shop', 'tiktok-shop', null, true, 3)
on conflict (slug) do update set
  name = excluded.name,
  display_order = excluded.display_order;

-- ============================================================
-- store_information
-- ============================================================
-- phone e whatsapp são o mesmo número na Della — preenchendo os dois, uma
-- pergunta sobre "telefone" responde igual a uma sobre "WhatsApp".
insert into store_information (id, name, address, phone, whatsapp, whatsapp_link, email, business_hours, instagram, instagram_link)
values (
  1,
  'Della Distribuidora de Produtos',
  'Rua Assis Figueiredo, 59, Parolin, Curitiba - PR, CEP 80.630-280',
  '(41) 99679-0904',
  '(41) 99679-0904',
  'https://wa.me/5541996790904?text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%20da%20Della%20Distribuidora%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida!%20Pode%20me%20ajudar%3F!',
  'contato@dellastore.com.br',
  'Segunda a sexta-feira, das 09h às 17h.',
  '@marquessdann',
  'https://instagram.com/marquessdann'
)
on conflict (id) do update set
  name = excluded.name,
  address = excluded.address,
  phone = excluded.phone,
  whatsapp = excluded.whatsapp,
  whatsapp_link = excluded.whatsapp_link,
  email = excluded.email,
  business_hours = excluded.business_hours,
  instagram = excluded.instagram,
  instagram_link = excluded.instagram_link;

-- ============================================================
-- faq — only genuinely known facts; everything else is left for you to add
-- ============================================================
insert into faq (question, answer, category, active) values
  ('Como faço para comprar?',
   'Você pode navegar pelos produtos no site e, para fechar a compra, falar direto com a Della pelo WhatsApp — é por lá que confirmamos disponibilidade, preço e forma de envio.',
   'compra', true),
  ('Vocês têm loja física?',
   'Sim. A Della fica na Rua Assis Figueiredo, 59, Parolin, Curitiba - PR, CEP 80.630-280.',
   'loja', true),
  ('Como falo com a Della?',
   'O jeito mais rápido é pelo WhatsApp, disponível no botão de contato do site.',
   'atendimento', true),
  ('Qual é o horário de atendimento?',
   'Nosso atendimento funciona de segunda a sexta-feira, das 09h às 17h.',
   'atendimento', true)
on conflict do nothing;

-- No rows are inserted into `policies` (delivery, returns, exchanges,
-- payments, privacy, warranty): none of that is defined yet anywhere in the
-- project. Add a row per type here (or via the Table Editor) as soon as the
-- real policy exists — until then the agent will correctly say it hasn't
-- been registered instead of guessing.
