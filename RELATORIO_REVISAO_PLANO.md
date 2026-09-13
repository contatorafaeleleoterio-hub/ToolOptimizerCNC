# Relatório de Revisão Crítica do Plano de Migração (Fenix → ToolOptimizerCNC v2)

| | |
|---|---|
| **Alvo da Revisão** | `C:\Users\USUARIO\Desktop\Projetos\ToolOptimizerCNC\PLANO_MIGRACAO.md` |
| **Data** | 10/09/2026 |
| **Auditor / Executor** | Antigravity (Inspeção estática e mecânica em modo somente leitura) |
| **Escopo Inspecionado** | `Projetos/ToolOptimizerCNC` e `Projetos/Fenix` |
| **Veredito Geral** | **Executar com as correções listadas** |

---

## 1. Conferência das Afirmações Factuais

Todas as afirmações factuais do plano foram confrontadas diretamente contra os arquivos em disco dos dois repositórios:

| # | Afirmação do Plano | Status | Evidência (Arquivo : Linha) | Detalhes |
|---|---|---|---|---|
| F01 | O repositório Fenix não tem nenhuma configuração de publicação (sem `wrangler`, sem CI, sem favicon, sem SEO, `index.html` de 11 linhas). | **Confirmado** | `Fenix/index.html:1-13`<br>`Fenix/` (raiz) | Não existem `.github/`, `wrangler.jsonc`, favicons nem metatags de SEO no Fenix. O `index.html` possui 13 linhas (12 não-vazias), sendo estritamente minimalista. |
| F02 | A lista de ocorrências do nome a substituir contém 17 pontos mapeados. | **Confirmado (com adendo)** | `Fenix/index.html:6`<br>`Fenix/src/ui/App.tsx:19,25`<br>`Fenix/src/ui/components/HeaderZ1.tsx:15,16`<br>`Fenix/src/ui/components/SettingsView.tsx:292`<br>`Fenix/src/core/storage.ts:6`<br>`Fenix/src/ui/__tests__/App.spec.tsx:7,9,11`<br>`Fenix/harness_config.yml:2,3`<br>`Fenix/grafo_fluxo.json:4,6`<br>`Fenix/src/harness/validator.ts:230`<br>`Fenix/src/core/types.ts:2`<br>`Fenix/src/harness/types.ts:3`<br>`Fenix/src/ui/index.css:2`<br>`Fenix/src/harness/__tests__/harness.spec.ts:3` | A tabela mapeia corretamente os 17 pontos de UI, Storage, Governança e Tipos. Omitiu apenas o comentário de cabeçalho em `src/harness/__tests__/harness.spec.ts:3` ("...do Fenix"). |
| F03 | O repositório antigo tem cópias completas de si mesmo em subpastas (`.claude/worktrees/`) que envenenam qualquer varredura por glob. | **Confirmado** | `ToolOptimizerCNC/.claude/worktrees/`<br>`ToolOptimizerCNC/.gitignore:40` | Pastas como `.claude/worktrees/zealous-cerf/` contêm árvores inteiras de `src/`, `docs/`, `tests/` e configurações antigas. |
| F04 | A aplicação nova não tem rotas (painel único com overlay), enquanto o sitemap publicado lista três (`/`, `/settings`, `/history`). | **Confirmado** | `ToolOptimizerCNC/public/sitemap.xml:4,10,16`<br>`Fenix/src/ui/App.tsx:16-52`<br>`Fenix/src/ui/components/FamilyNav.tsx:1-40` | O Fenix gerencia navegação por abas e overlay de configurações via estado local React (`useState`), sem `react-router`. O `sitemap.xml` antigo possui 3 URLs. |
| F05 | `wrangler.jsonc` possui `assets.not_found_handling: single-page-application`. | **Confirmado** | `ToolOptimizerCNC/wrangler.jsonc:8-10` | O bloco de assets configura exatamente `"not_found_handling": "single-page-application"`. |
| F06 | `.env.local` do antigo contém `VITE_CF_ANALYTICS_TOKEN` e `VITE_CF_ZONE_ID`, está no `.gitignore` e nunca foi commitado. | **Confirmado** | `ToolOptimizerCNC/.env.local:1-2`<br>`ToolOptimizerCNC/.gitignore:16`<br>`git log --all -- .env.local` (vazio) | As variáveis existem no arquivo local, estão ignoradas no `.gitignore` e não constam no histórico do git. |
| F07 | O manifest do PWA antigo cita `pwa-192x192.png`/`pwa-512x512.png` que não existem em `public/` (onde há `icon-192.png`/`icon-512.png`). | **Confirmado** | `ToolOptimizerCNC/vite.config.ts:32,37,42`<br>`ToolOptimizerCNC/public/icon-192.png`<br>`ToolOptimizerCNC/public/icon-512.png` | Discrepância comprovada entre o manifesto no `vite.config.ts` e os arquivos físicos em `public/`. |
| F08 | A suíte do Fenix possui 95 testes unitários. | **Errado (Desatualizado)** | `Fenix/package.json`<br>`npm run check` (Fenix) | O commit `9c2cc1e` adicionou testes em `boring.spec.ts` e `threading.spec.ts`. A suíte atual possui **102 testes em 15 arquivos**, todos passando com sucesso (`exit code 0`). |
| F09 | Os badges do `README.md` antigo apontam para `deploy.yml` (inexistente) e versão 0.3.0. | **Confirmado** | `ToolOptimizerCNC/README.md:4,5` | O workflow real chama-se `deploy-cloudflare.yml` e a badge marca `versão-0.3.0`. |
| F10 | O app antigo salva histórico e settings no navegador em `localStorage`. | **Confirmado** | `ToolOptimizerCNC/src/store/history-store.ts:151`<br>`ToolOptimizerCNC/src/store/machining-store.ts:536` | As stores zustand antigas usam `localStorage` com as chaves `'tooloptimizer-cnc-history'` e `'tooloptimizer-cnc-settings'`. |

---

## 2. Julgamento das Três Suposições Declaradas

### Suposição 1 — Identidade vs Paleta (WCAG AA)
> *"Identidade = logo, nome, domínio, textos institucionais e SEO — não a paleta. A paleta neon escura do app antigo (#00D9FF sobre #0F1419) é reprovada pelo próprio documento antigo... A paleta do Fenix (petróleo #0F3D5C, creme #F7F5F1) foi aferida por máquina em WCAG AA... a paleta do Fenix prevalece."*
- **Veredito:** **CONFIRMADA**
- **Evidência:** `ToolOptimizerCNC/docs/design/DS_TEMA_CLARO.md:22` (registra textualmente no item P5: `"#00D9FF sobre #F3F4F6 dá 1,5:1; #39FF14 dá 1,2:1. O mínimo legível é 4,5:1"`). Em contrapartida, os tokens do Fenix em `Fenix/src/ui/index.css:5-50` foram validados contra WCAG AA pelo script de contraste `Docs_inicial/construcao/prototipo/testes/test_contraste.js` (61 tokens conformes).

### Suposição 2 — Banco IndexedDB (`fenix_db`) nunca publicado
> *"O IndexedDB do Fenix (`fenix_db`) nunca foi publicado, então renomear o banco não exige migração de dados. O que precisa de verificação é o inverso: se o app antigo em produção guarda histórico de usuário no navegador..."*
- **Veredito:** **CONFIRMADA**
- **Evidência:** O repositório Fenix nunca teve build de produção publicado nem domínio atribuído (`Fenix/package.json:5` - `private: true`, sem CI). No repo antigo, a persistência de histórico e configurações utilizava exclusivamente `localStorage` (`ToolOptimizerCNC/src/store/history-store.ts:151` e `machining-store.ts:536`). A renomeação de `fenix_db` para `tooloptimizer_db` (`Fenix/src/core/storage.ts:6`) não afeta dados legados nem introduz quebra de esquema em clientes existentes.

### Suposição 3 — Descarte das bibliotecas antigas (Tailwind, Zustand, React-Router, etc.)
> *"A toolchain que fica é a do Fenix (React 19, Vite 8, TS 7, idb). Tailwind, zustand e react-router saem porque nenhum código do Fenix os usa."*
- **Veredito:** **CONFIRMADA**
- **Evidência:** Varredura completa em `Fenix/src/` e arquivos de raiz confirmou **zero referências** e zero imports de `tailwindcss`, `zustand`, `react-router`, `@capacitor/*` ou `electron`. Todo o estado reativo do Fenix é operado via React Context + Hooks (`CalculatorContext.tsx`), a persistência via `idb` (`storage.ts`), e os estilos via CSS nativo modular e tokens (`src/ui/index.css`).

---

## 3. Análise de Dependência entre as Fases

1. **Omissão do comando `npm install` na Fase 2:**
   - O plano prescreve copiar arquivos e reescrever `package.json` na Fase 2 (passos 1 e 2) e, no passo 4, rodar imediatamente `npm run check` e `npm run build`.
   - Se o `node_modules` de `ToolOptimizerCNC` contiver as dependências antigas (React 18, Vite 6, TS 5), a execução de `npm run check` falhará imediatamente.
   - **Correção necessária:** Adicionar explicitamente `npm install` (ou limpeza de `node_modules` + `npm install`) na Fase 2, antes do portão de verificação.

2. **Acoplamento entre Fase 2 (Transplante) e Fase 3 (Identidade):**
   - Na Fase 2, ao transladar os testes do Fenix (`src/ui/__tests__/App.spec.tsx`), eles esperam asserções com o texto `'FENIX'`.
   - Se a renomeação para `ToolOptimizer CNC` for feita de forma assíncrona ou incompleta na Fase 3, o portão da Fase 3 quebrará se os testes não forem atualizados no mesmo commit dos componentes visuais.
   - **Recomendação:** A Fase 3 deve atualizar `HeaderZ1.tsx`, `App.tsx`, `SettingsView.tsx` e `App.spec.tsx` de forma atômica.

3. **Inversão Temporal no Deploy da Fase 6:**
   - A Fase 6 lista como critério pré-merge: *"No ar: app.tooloptimizercnc.com.br servindo a versão nova... Só então PR para a main e wrangler deploy"*.
   - É impossível `app.tooloptimizercnc.com.br` (domínio de produção) estar servindo o novo código antes de o deploy de produção ser efetuado.
   - **Correção necessária:** A verificação pré-PR deve ocorrer no ambiente de **Preview do Cloudflare Worker** (ou via `npm run preview` local / URL temporária de branch do Cloudflare). A verificação no domínio de produção `app.tooloptimizercnc.com.br` ocorre **após** o merge na `main` e disparo do workflow de deploy.

---

## 4. Classificação da Documentação Antiga

A triagem proposta na Fase 4 (item 6) separa a documentação em A (Aproveitar), B (Adaptar) e C/D/E (Arquivar sem uso).

- **Avaliação da Documentação Geral:** A classificação está correta. A arquitetura de cálculo, fórmulas, PRDs e ADRs do repositório antigo estão superados pelo Core formal do Fenix.
- **Ressalva de Preservação de Conhecimento:**
  - `ToolOptimizerCNC/docs/_archive/superseded/ESTRATEGIA_DUAL_DOMAIN_SEO_TOOLOPTIMIZER.md`: contém a fundamentação da divisão de tráfego entre `www` (landing institucional) e `app` (calculadora Cloudflare Worker). Embora arquivado, seu conteúdo deve ser consolidado no novo `CONTEXT.md`.
  - `ToolOptimizerCNC/docs/PROTOCOLO_CONVERSAO_APP/14_PROTOCOLO_DEVOPS.md`: documenta o histórico da infraestrutura Cloudflare. Fica corretamente preservado em `archive/legacy-v1/`.

---

## 5. Avaliação da Validação Final (Fase 6)

- **Suítes de Protótipo (`test_suite_dinamica.js`, `test_contraste.js`, `test_integridade.js`):**
  - Esses scripts localizam-se em `Docs_inicial/construcao/prototipo/testes/`. Eles exercitam o protótipo HTML estático do Golden Master.
  - Sua execução atesta que a documentação/gabarito canônico não foi corrompida, mas a validação do produto real em React 19 depende estritamente de `npm run check` (`tsc --noEmit` + Vitest com 102 testes) e `npm run build`.
- **Comando `grep -ri "fenix"`:**
  - O filtro deve ser restrito com precisão: `grep -ri "fenix" src/ index.html public/ landing/ vite.config.ts package.json`.
  - Deve-se garantir a exclusão de pastas como `.claude/worktrees/`, `Docs_inicial/`, `archive/` e `node_modules/`, para evitar falsos positivos históricos.

---

## 6. O Que o Plano Não Viu (Riscos e Omissões)

1. **Arquivos órfãos na raiz do ToolOptimizerCNC:**
   - O plano não especificou o destino de diversos arquivos e pastas presentes na raiz do repositório antigo:
     - `AGENTS.md`, `GESTOR_BOOTSTRAP.md`
     - `copy_additional.sh`, `copy_rag_docs.sh`
     - `eslint.config.mjs`, `desktop.ini`, `vite-env.d.ts`, `tsconfig.tsbuildinfo`
     - Diretórios de assistentes: `.aiox-core/`, `.antigravity/`, `.codex/`, `.cursor/`, `.gemini/`, `.interface-design/`
   - *Ação:* Todos os arquivos `.md` antigos, scripts `.sh`, `eslint.config.mjs` e pastas de agentes obsoletos devem ser movidos para `archive/legacy-v1/` ou excluídos na Fase 1 para manter a raiz limpa.

2. **Tratamento do `index.html` antigo na Fase 1:**
   - O plano omitiu `index.html` tanto na lista de arquivos a mover quanto na de arquivos a preservar na Fase 1. O `index.html` antigo possui metatags cruciais de SEO, Open Graph e Schema JSON-LD.
   - *Ação:* Manter o `index.html` antigo temporariamente ou garantir backup para extrair as tags de SEO na Fase 3 antes de substituí-lo pelo novo casulo React.

3. **Asset da Logo (`Logo_ToolOptimizer.png`):**
   - Na raiz do repo antigo existe `Logo_ToolOptimizer.png` (arquivo de 1.27 MB, 2048x2048 px).
   - A Fase 3 cita `src/assets/logo-tooloptimizer.png` dimensionado para a barra Z1. O plano não inclui a etapa de criar a pasta `src/assets/` e gerar/otimizar a imagem correspondente.

4. **Script `validate` no `package.json`:**
   - O `package.json` antigo define `validate: "npm run typecheck && npm run test && npm run lint"`.
   - O Fenix não utiliza ESLint em seu pipeline (`npm run check` roda `typecheck` e `test`). Se o script `validate` mantiver a chamada ao `eslint` sem um `eslint.config.js` adaptado ao React 19/TS 7, o comando falhará.
   - *Ação:* Ajustar o script `validate` no `package.json` para espelhar o `npm run check` do Fenix.

---

## 7. Registro Consolidado de Achados

| ID | Severidade | Caminho da Evidência | Descrição do Achado | Proposta de Correção (1 linha) |
|---|---|---|---|---|
| **A-01** | **bloqueia a execução** | `ToolOptimizerCNC/PLANO_MIGRACAO.md:63-65` | Falta o comando `npm install` após reescrever o `package.json` na Fase 2 antes de rodar `npm run check`. | Inserir `npm install` como passo 3 da Fase 2 antes do portão de validação `npm run check`. |
| **A-02** | **corrigir antes da fase 6** | `ToolOptimizerCNC/PLANO_MIGRACAO.md:118-121` | Fase 6 exige conferir produção (`app.tooloptimizercnc.com.br`) antes de efetuar o merge e deploy. | Ajustar a validação pré-merge para o Preview do Worker e validar produção após o merge na `main`. |
| **A-03** | **corrigir antes da fase 1** | `ToolOptimizerCNC/PLANO_MIGRACAO.md:46-55` | Arquivos órfãos na raiz (`AGENTS.md`, `GESTOR_BOOTSTRAP.md`, `copy_*.sh`, etc.) não foram mapeados no arquivamento. | Adicionar os arquivos soltos da raiz na lista de movimentação para `archive/legacy-v1/`. |
| **A-04** | **corrigir antes da fase 1** | `ToolOptimizerCNC/PLANO_MIGRACAO.md:46-55` | O `index.html` antigo não foi listado na Fase 1 nem na cópia da Fase 2, arriscando perda de tags de SEO. | Declarar explicitamente a preservação/leitura das metatags do `index.html` antigo antes de sua substituição. |
| **A-05** | **corrigir antes da fase 3** | `ToolOptimizerCNC/PLANO_MIGRACAO.md:83` | A logo `src/assets/logo-tooloptimizer.png` não existe e não há instrução para redimensionar `Logo_ToolOptimizer.png`. | Incluir etapa na Fase 3 para redimensionar `Logo_ToolOptimizer.png` e copiá-la para `src/assets/`. |
| **A-06** | **anotar** | `Fenix/package.json`<br>`npm run check` (Fenix) | O plano cita 95 testes no Fenix, mas a suíte atualizada (commit `9c2cc1e`) possui 102 testes em 15 arquivos. | Atualizar a contagem de testes de 95 para 102 no texto das Fases 2 e 6. |
| **A-07** | **anotar** | `Fenix/src/harness/__tests__/harness.spec.ts:3` | Omitida ocorrência do nome Fenix em comentário de teste do harness na tabela da Fase 3. | Incluir `harness.spec.ts:3` na substituição de identidade se o módulo harness for mantido. |
| **A-08** | **anotar** | `ToolOptimizerCNC/package.json:15` | Script `validate` herdado do antigo chama `eslint`, que não está configurado na toolchain do Fenix. | Definir o script `validate` como alias de `npm run check` no `package.json` unificado. |

---

## 8. Veredito Final

**Executar com as correções listadas**
