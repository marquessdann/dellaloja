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
  ('body-splash', 'Coleção Enaldinho', 'Sprays corporais perfumados, refrescantes e cheios de personalidade.'),
  ('sobrancelhas', 'Sobrancelhas', 'Henna e produtos profissionais para design e coloração de sobrancelhas.'),
  ('cilios', 'Cílios', 'Produtos profissionais para aplicação, proteção e cuidado de cílios.'),
  ('pinca-depilacao', 'Pinças & Depilação', 'Pinças profissionais Edel Solingen para design de sobrancelhas e depilação de precisão.')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description;

-- ============================================================
-- products
-- ============================================================
insert into products (slug, name, brand, category_id, short_description, description, image_url, product_url, available)
select v.slug, v.name, v.brand, c.id, v.short_description, v.description, v.image_url, v.product_url, true
from (values
  ('body-splash-treta-citrica', 'Treta Cítrica - Body Splash Corporal 120ml (Unissex)', 'Enaldinho', 'body-splash',
   'Body splash cítrico com brilho perolado e efeito refrescante imediato.',
   'Um body splash com fragrância Limão e Algodão, direção cítrica combinada a um conceito olfativo limpo e confortável, que deixa o corpo perfumado o dia todo com sensação refrescante logo na primeira borrifada. Vegana, hipoalergênica, dermatologicamente testada e não testada em animais.',
   '/images/products/01-treta-citrica-body-splash-enaldinho.webp', '/produto/body-splash-treta-citrica'),
  ('body-splash-gelo-sinistro', 'Gelo Sinistro - Body Splash Corporal 120ml (Masculino)', 'Enaldinho', 'body-splash',
   'Body splash gelado com fragrância Ice Water e brilho perolado azul/verde.',
   'Um body splash com fragrância Ice Water, de perfil fresco, que deixa o corpo perfumado o dia todo com sensação refrescante e gelada logo na primeira borrifada. Vegana, hipoalergênica, dermatologicamente testada e não testada em animais.',
   '/images/products/13-gelo-sinistro-body-splash-enaldinho.webp', '/produto/body-splash-gelo-sinistro'),
  ('body-splash-explosao-cosmica', 'Explosão Cósmica - Body Splash Corporal 120ml (unissex)', 'Enaldinho', 'body-splash',
   'Body splash frutado com tom lilás e partículas brancas brilhantes.',
   'Um body splash com fragrância Mix de Frutas, de perfil frutado e envolvente, que deixa o corpo perfumado o dia todo com uma sensação refrescante logo na primeira borrifada. Vegana, hipoalergênica, dermatologicamente testada e não testada em animais.',
   '/images/products/14-explosao-cosmica-body-splash-enaldinho.webp', '/produto/body-splash-explosao-cosmica'),
  ('body-splash-chiclete-irado', 'Chiclete Irado - Body Splash Corporal 120ml (Feminino)', 'Enaldinho', 'body-splash',
   'Body splash doce de chiclete com cor rosa arroxeada e partículas azuis brilhantes.',
   'Um body splash com fragrância Chiclete, doce e divertida, inspirada no cheiro característico de chiclete, que deixa o corpo perfumado o dia todo com sensação refrescante logo na primeira borrifada. Vegana, hipoalergênica, dermatologicamente testada e não testada em animais.',
   '/images/products/15-chiclete-irado-body-splash-enaldinho.webp', '/produto/body-splash-chiclete-irado'),
  ('gel-controle-mental-gelatinoso', 'Controle Mental Gelatinoso - Gel para Cabelo 170g (unissex)', 'Enaldinho', 'body-splash',
   'Gel modelador com efeito gelado, fixação leve e fragrância Ice Water.',
   'Um gel modelador que define o penteado com fixação leve e efeito natural. Não gruda nas mãos nem nos fios. Vegana, dermatologicamente e oftalmologicamente testada, não testada em animais.',
   '/images/products/16-controle-mental-gel-cabelo-enaldinho.webp', '/produto/gel-controle-mental-gelatinoso'),
  ('hidratante-labial-chiclete-congelante', 'Chiclete Congelante - Hidratante Labial Incolor 18g (unissex)', 'Enaldinho', 'body-splash',
   'Hidratante labial de chiclete com efeito congelante e toque incolor.',
   'Um hidratante labial com aroma de chiclete e tutti-frutti, que surpreende com um efeito congelante na primeira aplicação. Deixa os lábios macios e protegidos contra o ressecamento. Vegana, hipoalergênica, dermatologicamente testada e não testada em animais.',
   '/images/products/17-chiclete-congelante-hidratante-labial-enaldinho.webp', '/produto/hidratante-labial-chiclete-congelante'),
  ('hidratante-labial-chocomenta-subzero', 'Chocomenta Subzero - Hidratante Labial Incolor 10g (unissex)', 'Enaldinho', 'body-splash',
   'Hidratante labial de chocolate com menta e efeito gelado intenso.',
   'Um hidratante labial com aroma e sabor de chocolate com menta, que traz um efeito gelado intenso na primeira aplicação. Deixa os lábios macios e protegidos contra o ressecamento. Vegana, hipoalergênica, dermatologicamente testada e não testada em animais.',
   '/images/products/18-chocomenta-subzero-hidratante-labial-enaldinho.webp', '/produto/hidratante-labial-chocomenta-subzero'),
  ('hidratante-labial-milkshake-morango', 'Milk Shake de Morango - Hidratante Labial Incolor 10g (unissex)', 'Enaldinho', 'body-splash',
   'Hidratante labial de milk shake de morango com efeito gelado surpreendente.',
   'Um hidratante labial com aroma de frutas vermelhas e milk shake de morango, que traz um efeito gelado surpreendente na primeira aplicação. Deixa os lábios macios e protegidos contra o ressecamento. Vegana, hipoalergênica, dermatologicamente testada e não testada em animais.',
   '/images/products/19-milkshake-morango-hidratante-labial-enaldinho.webp', '/produto/hidratante-labial-milkshake-morango'),
  ('henna-sobrancelhas-master-loiro-escuro', 'Henna Para Sobrancelhas Master - Loiro Escuro', 'Master', 'sobrancelhas',
   'Henna profissional para sobrancelhas na cor loiro escuro, com pigmentação uniforme.',
   'Henna profissional para sobrancelhas na cor loiro escuro, com pigmentação uniforme e boa fixação. Fórmula com extratos de Jaborandi e Bamboo, ideal para corrigir falhas com naturalidade em sobrancelhas claras e loiras.',
   '/images/products/20-henna-sobrancelhas-master-loiro-escuro.webp', '/produto/henna-sobrancelhas-master-loiro-escuro'),
  ('protetor-palpebras-eyepatch-master-flor', 'Protetor Para Pálpebras Eyepatch Master Flor', 'Master', 'cilios',
   'Protetor de pálpebras em hidrogel, com recorte floral que cobre os cílios inferiores.',
   'Protetor de pálpebras em hidrogel, com recorte floral que acompanha o contorno do olho e cobre os cílios inferiores sem tocar na linha d''água. Ideal para procedimentos de extensão de cílios e outros serviços que exigem proteção da pálpebra inferior.',
   '/images/products/21-protetor-palpebras-eyepatch-master-flor.webp', '/produto/protetor-palpebras-eyepatch-master-flor'),
  ('removedor-cilios-balm-olive-excellent', 'Removedor De Cílios Balm Olive Excellent 7g', 'Excellent', 'cilios',
   'Removedor em gel tipo balm para extensão de cílios, com azeite de oliva e uso profissional.',
   'Removedor em gel tipo balm desenvolvido para remoção de extensões de cílios, com azeite de oliva que auxilia na remoção completa da cola e nutre os cílios naturais. Fórmula hipoalergênica e livre de odores, de uso profissional.',
   '/images/products/22-removedor-cilios-balm-olive-excellent.webp', '/produto/removedor-cilios-balm-olive-excellent'),
  ('pinca-cilios-7m-pro-master', 'Pinça Profissional de Cílios 7M-PRO Master', 'Master', 'cilios',
   'Pinça profissional para extensão de cílios, em aço inox com nanotecnologia diamantada.',
   'Pinça profissional para extensão de cílios, produzida em aço inox, leve e resistente a autoclave. Conta com nanotecnologia diamantada na ponta, que aumenta a aderência e a precisão no manuseio dos fios.',
   '/images/products/23-pinca-cilios-7m-pro-master.webp', '/produto/pinca-cilios-7m-pro-master'),
  ('cola-cilios-charm-master-3g', 'Cola Adesivo para Extensão de Cílios Charm Master 3g', 'Master Elite', 'cilios',
   'Cola profissional para extensão de cílios com secagem ultrarrápida e retenção de até 9 semanas.',
   'Cola profissional para extensão de cílios, com secagem de 0,3 a 1 segundo e retenção de até 9 semanas. Ampla janela de trabalho, com boa performance em temperaturas de 16°C a 30°C e umidade de 30% a 75%. Uso exclusivamente profissional.',
   '/images/products/24-cola-cilios-charm-master-3g.webp', '/produto/cola-cilios-charm-master-3g'),
  ('kit-pinca-ponta-fina-edel-solingen-inox', 'Kit 3 Pinças Ponta Fina Edel Solingen Aço Inox', 'Edel Solingen', 'pinca-depilacao',
   'Kit com 3 pinças profissionais em aço inox, pontas reta, fina e oblíqua.',
   'Kit com 3 pinças profissionais Edel Solingen em aço inox de alta qualidade, com pontas reta, fina e oblíqua. Pontas alinhadas e firmes, com caneluras internas que garantem aderência superior. Esterilizável, ideal para uso profissional e doméstico.',
   '/images/products/25-kit-pinca-ponta-fina-edel-solingen-inox.webp', '/produto/kit-pinca-ponta-fina-edel-solingen-inox'),
  ('kit-pinca-laqueada-edel-solingen-curva-obliqua', 'Kit 3 Pinças Laqueadas Ponta Fina Curva Oblíqua Edel Solingen', 'Edel Solingen', 'pinca-depilacao',
   'Kit com 3 pinças laqueadas coloridas, pontas fina, oblíqua e curva.',
   'Kit com 3 pinças profissionais Edel Solingen em acabamento laqueado colorido, com pontas fina, oblíqua e curva. Cabo emborrachado antiderrapante, qualidade Solingen legítima, esterilizável com álcool 70%. Ideal para design de sobrancelhas profissional.',
   '/images/products/26-kit-pinca-laqueada-edel-solingen-curva-obliqua.webp', '/produto/kit-pinca-laqueada-edel-solingen-curva-obliqua'),
  ('kit-pinca-depilacao-9cm-pontas-variadas-edel-solingen', 'Kit Pinça Depilação 9cm Pontas Variadas Edel Solingen', 'Edel Solingen', 'pinca-depilacao',
   'Kit de pinças 9cm com pontas douradas variadas para precisão milimétrica.',
   'Kit de pinças profissionais Edel Solingen de 9cm, com pontas de acabamento dourado e variedade de formatos. Ponta estreita e reta para precisão milimétrica, caneluras internas, aço inox premium com qualidade Solingen legítima.',
   '/images/products/27-kit-pinca-depilacao-9cm-pontas-variadas-edel-solingen.webp', '/produto/kit-pinca-depilacao-9cm-pontas-variadas-edel-solingen')
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
-- product_marketplace_links — per-product override links (requires
-- migrations/0002_marketplace_links.sql to have been run first).
-- ============================================================
insert into product_marketplace_links (product_id, marketplace_id, url, active)
select p.id, m.id, v.url, true
from (values
  ('body-splash-chiclete-irado', 'mercado-livre', 'https://produto.mercadolivre.com.br/MLB-7699634080-body-splash-enaldinho-chiclete-irado-120ml-_JM'),
  ('body-splash-chiclete-irado', 'shopee', 'https://shopee.com.br/product/1931210934/58218961064'),
  ('body-splash-gelo-sinistro', 'mercado-livre', 'https://produto.mercadolivre.com.br/MLB-5289241709-body-splash-enaldinho-gelo-sinistro-120ml-masculino-_JM'),
  ('body-splash-gelo-sinistro', 'shopee', 'https://shopee.com.br/product/1931210934/58268954948'),
  ('body-splash-explosao-cosmica', 'mercado-livre', 'https://produto.mercadolivre.com.br/MLB-5290949839-body-splash-enaldinho-spray-radiativo-120ml-unissex-desodora-_JM'),
  ('body-splash-explosao-cosmica', 'shopee', 'https://shopee.com.br/product/1931210934/58218980035'),
  ('body-splash-treta-citrica', 'mercado-livre', 'https://produto.mercadolivre.com.br/MLB-5288912475-body-splash-enaldinho-treta-citrica-corporal-120ml-unissex-fragrncia-citrica-_JM'),
  ('body-splash-treta-citrica', 'shopee', 'https://shopee.com.br/product/1931210934/58268946196'),
  ('kit-pinca-ponta-fina-edel-solingen-inox', 'mercado-livre', 'https://www.mercadolivre.com.br/kit-3-pincas-ponta-fina-edel-solingen-aco-inox/up/MLBU5310448868?pdp_filters=item_id:MLB5292492887'),
  ('kit-pinca-ponta-fina-edel-solingen-inox', 'shopee', 'https://shopee.com.br/product/1931210934/58219026130'),
  ('kit-pinca-laqueada-edel-solingen-curva-obliqua', 'mercado-livre', 'https://www.mercadolivre.com.br/kit-3-pincas-laqueadas-ponta-fina-curva-obliqua-edel-solinge/up/MLBU5310285098?pdp_filters=item_id:MLB5292452561'),
  ('kit-pinca-laqueada-edel-solingen-curva-obliqua', 'shopee', 'https://shopee.com.br/product/1931210934/58219012276'),
  ('kit-pinca-depilacao-9cm-pontas-variadas-edel-solingen', 'mercado-livre', 'https://produto.mercadolivre.com.br/MLB-5292305735-kit-pinca-depilaco-9cm-pontas-variadas-edel-solingen-_JM'),
  ('kit-pinca-depilacao-9cm-pontas-variadas-edel-solingen', 'shopee', 'https://shopee.com.br/product/1931210934/58269035891')
) as v(product_slug, marketplace_slug, url)
join products p on p.slug = v.product_slug
join marketplaces m on m.slug = v.marketplace_slug
on conflict (product_id, marketplace_id) do update set
  url = excluded.url,
  active = true;

-- ============================================================
-- store_information
-- ============================================================
-- phone e whatsapp são o mesmo número na Della — preenchendo os dois, uma
-- pergunta sobre "telefone" responde igual a uma sobre "WhatsApp".
insert into store_information (id, name, address, phone, whatsapp, whatsapp_link, email, business_hours, instagram, instagram_link)
values (
  1,
  'Della Distribuidora de Produtos',
  'Rua Assis Figueiredo, 59 - Parolin, Curitiba - PR, CEP 80.630-280',
  '41 99679-0904',
  '41 99679-0904',
  'https://wa.me/5541996790904?text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%20da%20Della%20Distribuidora%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida!%20Pode%20me%20ajudar%3F!',
  'contato@dellastore.com.br',
  'Segunda a sexta-feira, das 09h às 17h.',
  '@dellanewstore',
  'https://www.instagram.com/dellanewstore'
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
   'Sim. A Della fica na Rua Assis Figueiredo, 59 - Parolin, Curitiba - PR, CEP 80.630-280.',
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
