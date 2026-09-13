# CLAUDE.md — ToolOptimizer CNC v2

**Projeto:** ToolOptimizer CNC — Calculadora Industrial de Parâmetros de Corte CNC.  
**Versão:** 2.0.0 (Núcleo canônico do Fenix integrado ao produto ToolOptimizerCNC).  
**Ponto de entrada:** [`ESTADO.md`](ESTADO.md) e [`CONTEXT.md`](CONTEXT.md).

---

## 1. Estrutura do Repositório

| Diretório / Arquivo | Função |
|---|---|
| `src/core/` | Motores matemáticos canônicos (Kienzle, cinemática, materiais, IndexedDB `storage.ts`) |
| `src/ui/` | Componentes React 19, hooks, `CalculatorContext.tsx`, tokens WCAG AA em `index.css` |
| `src/harness/` | Governança multi-agente, validação de grafos de execução DAG |
| `Docs_inicial/` | Documentação técnica oficial e canônica (fórmulas, requisitos, relatórios de auditoria) |
| `public/` | Favicons, manifest PWA, ícones, robots.txt, sitemap.xml |
| `landing/` | Landing page institucional (Cloudflare Pages: `www.tooloptimizercnc.com.br`) |
| `archive/legacy-v1/` | Histórico v1 arquivado (sem autoridade decisória) |
| `DOCUMENTACAO_MARKETING_MONETIZACAO/` | Estratégia de SEO, posicionamento e monetização |
| `wrangler.jsonc` | Configuração do Cloudflare Worker (Static Assets SPA) |

---

## 2. Comandos e Quality Gates

### Comandos de Desenvolvimento
- `npm run dev`: Inicia o servidor de desenvolvimento local (Vite).
- `npm run typecheck`: Executa validação de tipos TypeScript (`tsc --noEmit`).
- `npm run test`: Executa a suíte de testes unitários (`vitest run`).
- `npm run check`: Quality gate obrigatório — roda `typecheck` e `test` (102 testes).
- `npm run build`: Gera o bundle estático de produção em `dist/`.
- `npm run preview`: Build local e emulação com o runtime Cloudflare (`wrangler dev`).
- `npm run deploy`: Build e deploy direto para o Cloudflare Worker (`wrangler deploy`).
- `npm run icons`: Regenera favicons e ícones PWA a partir de `logo_p_favcon.png`.

### Quality Gate Obrigatório Antes de Qualquer Commit
1. `npm run check` deve passar 100% verde (0 erros de tipo, 102/102 testes passando).
2. `npm run build` deve compilar com exit code 0 e gerar `dist/`.
3. `git status` limpo antes de novos fluxos.

---

## 3. Arquitetura de Deploy e Domínios (Cloudflare)

O ecossistema opera em **Dual-Domain**:
- **Calculadora (App):** `https://app.tooloptimizercnc.com.br/`
  - Servido via **Cloudflare Worker Static Assets** com `not_found_handling: single-page-application` configurado em `wrangler.jsonc`.
  - Deploy automatizado via GitHub Actions ([.github/workflows/deploy-cloudflare.yml](.github/workflows/deploy-cloudflare.yml)) no push para a branch `main`.
- **Landing Page Institucional:** `https://www.tooloptimizercnc.com.br/`
  - Servido via **Cloudflare Pages** a partir do diretório `landing/`.

---

## 4. Regras de Código e Governança

1. **A regra que organiza o cálculo:** Nenhuma fórmula, constante ou limiar físico entra sem fonte citada em `Docs_inicial/`. O modelo de corte é o de Kienzle.
2. **Offline-First:** O aplicativo não depende de APIs ou backend para calcular. Persistência de configurações e materiais customizados é estritamente local em IndexedDB (`tooloptimizer_db`).
3. **Design System & Acessibilidade:** Uso exclusivo de CSS nativo com design tokens em `src/ui/index.css`. Todos os contrastes de texto e controles devem cumprir WCAG AA (mínimo 4.5:1 para texto normal, 3.0:1 para controles).
4. **Sem frameworks desnecessários:** Tailwind, Zustand e React-Router foram removidos e não devem ser reintroduzidos. O estado reativo é gerido por React Context (`CalculatorContext.tsx`).