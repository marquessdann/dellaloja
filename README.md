# Della — Distribuidora de Produtos

Site institucional / vitrine digital da Della, construído com Next.js (App Router), TypeScript, Tailwind CSS e Framer Motion.

Esta é a primeira versão do site: um catálogo digital de produtos, sem checkout, carrinho ou pagamento. O objetivo é apresentar a marca, as categorias e uma seleção de produtos, com CTAs preparados para direcionar futuramente para WhatsApp e Mercado Livre.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura

- `src/data/products.ts` — dados dos produtos (id, slug, categoria, imagens, CTA externo). Facilmente substituível por uma API/CMS no futuro.
- `src/data/categories.ts` — categorias do catálogo.
- `src/data/site-config.ts` — dados de contato, navegação e slogans institucionais.
- `src/components/` — componentes de UI (Header com mega menu, cards de produto/categoria, animações de scroll, etc).
- `src/app/` — páginas: Home, Produtos, Categorias, Sobre, Catálogo, Contato e página individual de produto (`/produto/[slug]`).
- `public/images/products/` — imagens de produtos extraídas do catálogo em alta resolução.

## Produção

```bash
npm run build
npm run start
```
