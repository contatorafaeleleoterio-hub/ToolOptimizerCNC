# Story-004 — SEO + Schema.org

**Data:** 20/02/2026
**Status:** In Progress
**Versão:** 0.2.0 → 0.2.1

---

## Objetivo

Adicionar metadados SEO completos ao ToolOptimizer CNC para melhorar
indexação em motores de busca e compartilhamento em redes sociais.

Meta: Lighthouse SEO ≥ 90

---

## Escopo

### 1. Meta tags dinâmicas (por rota)
- `<meta name="description">` — descrição da página
- `<meta name="keywords">` — palavras-chave CNC
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`

### 2. Schema.org JSON-LD (SoftwareApplication)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ToolOptimizer CNC",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "description": "Calculadora de parâmetros de corte CNC...",
  "url": "https://contatorafaeleleoterio-hub.github.io/ToolOptimizerCNC/",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" }
}
```

### 3. Título dinâmico por rota (document.title)
| Rota | Título |
|------|--------|
| `/` | ToolOptimizer CNC — Calculadora de Parâmetros de Corte |
| `/settings` | Configurações — ToolOptimizer CNC |
| `/history` | Histórico — ToolOptimizer CNC |
| `/mobile` | ToolOptimizer CNC Mobile |

### 4. Arquivos estáticos
- `public/sitemap.xml`
- `public/robots.txt`

### 5. index.html base
- `<title>` base
- Meta charset + viewport (já existentes)
- Meta description base (fallback)
- Canonical link

---

## Arquivos a criar/modificar

| Arquivo | Ação |
|---------|------|
| `src/hooks/use-page-title.ts` | Criar |
| `src/components/seo-head.tsx` | Criar |
| `src/App.tsx` | Modificar (Schema.org + usePageTitle) |
| `src/pages/settings-page.tsx` | Modificar (usePageTitle) |
| `src/pages/history-page.tsx` | Modificar (usePageTitle) |
| `src/pages/mobile-page.tsx` | Modificar (usePageTitle) |
| `public/index.html` / `index.html` | Modificar (meta tags base) |
| `public/sitemap.xml` | Criar |
| `public/robots.txt` | Criar |

---

## Critérios de Conclusão

- [ ] Lighthouse SEO ≥ 90 (verificar via DevTools)
- [ ] Schema.org JSON-LD presente em todas as rotas
- [ ] Meta tags Open Graph presentes
- [ ] Títulos dinâmicos funcionando por rota
- [ ] sitemap.xml acessível
- [ ] robots.txt acessível
- [ ] `npx tsc --noEmit` — zero erros
- [ ] `npx vite build` — build limpo
- [ ] 338+ testes passando

---

## Notas de Implementação

- **Sem biblioteca extra** (react-helmet, etc.) — apenas JS DOM puro
- `document.title` via `useEffect` no hook `use-page-title.ts`
- Meta tags injetadas via `document.head.querySelector/createElement` no `SeoHead`
- Schema.org via `<script type="application/ld+json">` no `index.html` (estático) OU injetado em App.tsx
- URL base: `https://contatorafaeleleoterio-hub.github.io/ToolOptimizerCNC/`
