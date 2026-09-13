# Migração Fenix → ToolOptimizerCNC v2

Revisão de 10/09/2026 aplicada em 12/09/2026: A-01 a A-08, S-01 e S-02.
Defeitos D-01 a D-03 (achados ao aplicar a revisão) corrigidos em 13/09/2026.

## Contexto

Existem dois repositórios vivos e complementares:

- **`Projetos/ToolOptimizerCNC`** — produto publicado. Tem a marca (logo, favicons, og-image), o SEO, a landing, o CI, o Cloudflare Worker e o domínio `tooloptimizercnc.com.br`. O código (`src/`, React 18 + Tailwind + zustand + react-router) e a documentação foram considerados não confiáveis pelo Mestre.
- **`Projetos/Fenix`** — reconstrução validada. Core TypeScript puro com 102 testes, casca React 19, offline-first em IndexedDB, documentação canônica atual. **Não tem deploy nenhum**: sem `wrangler`, sem CI, sem favicon, sem SEO, `index.html` de 11 linhas.

O que cada lado tem é exatamente o que o outro não tem. A migração é, portanto, **trazer o Fenix para dentro do repo ToolOptimizerCNC** — herdando marca, domínio e infraestrutura — e não o contrário.

Resultado esperado: um único produto, `ToolOptimizerCNC`, rodando a implementação do Fenix, com a documentação do Fenix como oficial e a documentação antiga arquivada sem autoridade.

### Decisões do Mestre (10/09/2026)

- **Domínio:** mantém o split. `www.tooloptimizercnc.com.br` = landing (Pages), `app.tooloptimizercnc.com.br` = a calculadora (Worker). Sem mexer em DNS.
- **Canais:** só web. `android/`, Capacitor, `electron-builder.json` e o workflow de APK vão para o arquivo. PWA/offline preservado.

### Suposições declaradas (se estiverem erradas, avise antes da Fase 3)

1. **Identidade = logo, nome, domínio, textos institucionais e SEO — não a paleta.** A paleta neon escura do app antigo (`#00D9FF` sobre `#0F1419`) é reprovada pelo próprio documento antigo (`docs/design/DS_TEMA_CLARO.md` registra que o neon não passa contraste em fundo claro). A paleta do Fenix (petróleo `#0F3D5C`, creme `#F7F5F1`) foi aferida por máquina em WCAG AA, com script de auditoria. Pela regra de autoridade, **a paleta do Fenix prevalece**; o que se reincorpora é a logo, o nome e a voz do produto.
2. **O IndexedDB do Fenix (`fenix_db`) nunca foi publicado**, então renomear o banco não exige migração de dados. O que precisa de verificação é o inverso: se o app antigo em produção guarda histórico de usuário no navegador, a substituição o torna inacessível — ver Fase 0, item 4.
3. A toolchain que fica é a do **Fenix** (React 19, Vite 8, TS 7, CSS próprio). Tailwind, zustand e react-router saem porque nenhum código do Fenix os usa.

---

### Onde este plano fica salvo

Cópia em **`ToolOptimizerCNC/PLANO_MIGRACAO.md`** (raiz), como primeiro ato da Fase 0.

Razão: o repo que sobrevive é o ToolOptimizerCNC, é lá que toda a execução acontece, e a raiz é o único lugar que a Fase 1 não arquiva (`docs/` inteiro vai para `archive/legacy-v1/`). Salvar no Fenix colocaria o plano no repo que a Fase 7 arquiva. Ao fim da Fase 6 o arquivo é riscado como concluído, não apagado.

## Fase 0 — Verificações que decidem o resto (antes de mover um arquivo)

0. **Rede de segurança (primeiro item, antes dos outros).** Registrar o `git status` dos dois repositórios (ToolOptimizerCNC e Fenix). **Parar e perguntar ao Mestre o destino das alterações não commitadas:** commitar, descartar ou deixar de fora. Criar a tag `pre-migracao` na HEAD atual da `main` dos dois repositórios e dar push só da tag (`git push origin pre-migracao`).

Sem essas quatro respostas o plano tem furo:

1. **Compatibilidade da infra com a toolchain nova.** `@cloudflare/vite-plugin` e `vite-plugin-pwa` funcionam com Vite 8 / React 19? Testar em branch. Se `@cloudflare/vite-plugin` não bater: **ele é dispensável** — a aplicação é SPA estática pura, e `wrangler deploy` com `assets.not_found_handling: single-page-application` (já em `wrangler.jsonc`) basta. Se `vite-plugin-pwa` não bater, o PWA é adiado e registrado como pendência, não bloqueia o deploy.
2. **Bloqueadores B1–B3.** O commit `9c2cc1e` do Fenix diz resolvê-los, mas o `ESTADO.md` ainda os lista como abertos. Rodar `npm run check` no Fenix e conferir contra `Docs_inicial/relatorios/REAVALIACAO_FASE4_CICLO3_MORFEU_2026-09-09.md`. **Se algum estiver aberto, publicar cálculo errado é pior que atrasar** — nesse caso a Fase 5 (deploy) espera, e as Fases 1–4 seguem.
3. **`.env.local` do repo antigo** contém `VITE_CF_ANALYTICS_TOKEN` e `VITE_CF_ZONE_ID` com valores reais. Confirmar que está no `.gitignore` e nunca foi commitado (`git log --all -- .env.local`). Se vazou, rotacionar antes de qualquer push.
4. **Dados de usuário em produção.** Verificar se `app.tooloptimizercnc.com.br` grava histórico local (rota `/history` existe no app antigo). Se grava, o plano ganha um item: aviso na primeira abertura da versão nova.

Trabalho em branch `feat/migracao-fenix` no repo `ToolOptimizerCNC`. Nada na `main` até a Fase 6.

## Fase 1 — Arquivar o legado (nada é apagado)

Criar `archive/legacy-v1/` no repo `ToolOptimizerCNC` e mover para lá, com `git mv` (preserva histórico):

- `src/` inteiro (motor, componentes, store, admin, engine antigos)
- `docs/` inteiro, `DOCS_TREINAMENTO_RAG/`, `blueprint_calculadora_cnc.md`, `AJUSTE_FINO_VALIDACAO_GROK.md`, `HANDOFF.md`, `LESSONS.md`
- `android/`, `capacitor.config.ts`, `electron-builder.json`, `.github/workflows/build-android.yml`
- `gauntlet-calculadora-cnc*/`, os protótipos HTML soltos na raiz, `memory/`, `Rafael/`
- `tests/` antigo, `coverage/`
- `index.html` antigo → `archive/legacy-v1/index.html`, com `git mv` (a Fase 3 tira a cabeça de SEO de lá)
- Órfãos da raiz (arquivar, nunca excluir): `AGENTS.md`, `GESTOR_BOOTSTRAP.md`, `copy_additional.sh`, `copy_rag_docs.sh`, `eslint.config.mjs`, `desktop.ini`, `vite-env.d.ts` (substituído na Fase 2), `.aiox-core/`, `.antigravity/`, `.codex/`, `.cursor/`, `.gemini/`, `.interface-design/`. Não entra: `tsconfig.tsbuildinfo` e `dist/` (fora do git; `dist/` é saída de build que o `npm run build` da Fase 2 recria).

**Não movar** (é infraestrutura ou marca que continua servindo): `public/`, `landing/`, `wrangler.jsonc`, `.github/workflows/deploy-cloudflare.yml` e `ci.yml`, `Logo_ToolOptimizer.png`, `logo_p_favcon.png`, `scripts/generate-icons.mjs`.

**Decisão sobre marketing:** `DOCUMENTACAO_MARKETING_MONETIZACAO/` é sobre posicionamento e SEO do produto, não sobre a arquitetura descartada — classe **B (adaptar)**. Fica fora do arquivo; a Fase 4 revisa o que descreve funcionalidade.

Escrever `archive/legacy-v1/LEIA-ME.md`: o que é, por que está aqui, a data, e a frase que retira a autoridade — *"nenhum documento desta pasta decide nada; a fonte é `CONTEXT.md` e `Docs_inicial/`"*. O legado fica fora do build e do typecheck sem exclusão manual: o ESLint vai para o arquivo, e o `tsconfig.json` e o `vitest.config.ts` que chegam do Fenix na Fase 2 só olham `src/` — o portão da Fase 2 confirma.

## Fase 2 — Transplantar o código

1. Copiar do Fenix para o repo ToolOptimizerCNC: `src/core/`, `src/ui/`, `src/harness/`, `src/vite-env.d.ts`, `index.html`, `spec.md`, `design.md`, `tasks.md`, `grafo_fluxo.json`, `harness_config.yml`, `vitest.config.ts`, `tsconfig.json`.
2. **`package.json`:** partir do do Fenix (React 19, Vite 8, TS 7, `idb`). Mudar `name` para `tooloptimizer-cnc`, `version` para `2.0.0`, `repository`/`bugs`/`homepage` para o repo ToolOptimizerCNC. Reincorporar do antigo apenas: `wrangler`, `vite-plugin-pwa` (se a Fase 0 aprovar), `sharp` + `png-to-ico` (script de ícones) e os scripts `deploy`, `preview`, `icons`, `validate` — este vira alias de `npm run check`, sem eslint. **Não** trazer tailwind, zustand, react-router, capacitor, electron.
3. **`vite.config.ts`:** reescrever a partir do do Fenix, acrescentando só `VitePWA` com o manifest do ToolOptimizer (nome, `#0F1419` → revisar para a cor de marca do Fenix `#0F3D5C`) e corrigindo o defeito herdado: o manifest cita `pwa-192x192.png`/`pwa-512x512.png`, que **não existem** em `public/` (lá há `icon-192.png`/`icon-512.png`). Gerar os arquivos com `npm run icons` ou apontar o manifest para os nomes reais.
4. Apagar `node_modules/` do repo ToolOptimizerCNC (regenerável — hoje tem as dependências antigas) e rodar `npm install`.
5. Rodar `npm run check` (typecheck + 102 testes) e `npm run build`. **Portão: verde antes de seguir.**

## Fase 3 — Identidade

Substituir Fenix → ToolOptimizerCNC ponto a ponto, não por busca-e-troca cega. São 19 pontos, mapeados:

| Onde | Arquivo | O quê |
|---|---|---|
| Título do documento | `index.html:6` | `Fenix — …` → `ToolOptimizer CNC — Calculadora de Parâmetros de Corte` |
| `<h1>` de leitor de tela | `src/ui/App.tsx:25` | mesmo texto |
| Placa de marca (header) | `src/ui/components/HeaderZ1.tsx:15-16` | `aria-label` e o texto `FENIX` |
| Placa de marca (config) | `src/ui/components/SettingsView.tsx:292` | `FENIX` |
| Nome do IndexedDB | `src/core/storage.ts:6` | `fenix_db` → `tooloptimizer_db` |
| Classe raiz | `src/ui/App.tsx:19` | `fenix-app` → `tool-app` (é classe órfã, não existe no CSS — remover é a opção mais limpa) |
| Testes | `src/ui/__tests__/App.spec.tsx:7,9,11` | asserção literal `'FENIX'` e regex `/marca fenix/i` |
| Governança | `harness_config.yml:2-3`, `grafo_fluxo.json:4-6`, `src/harness/validator.ts:230` | `project: "fenix"` |
| Comentários | `src/core/types.ts:2`, `src/harness/types.ts:3`, `src/ui/index.css:2`, `src/harness/__tests__/harness.spec.ts:3` | cabeçalhos JSDoc/CSS |

**A placa tipográfica vira logo.** Hoje a marca do Fenix é a palavra `FENIX` numa `.brand-plate`. Substituir por `src/assets/logo-tooloptimizer.png` (ou o SVG, se existir), dimensionada dentro da altura da barra Z1 que a especificação estrutural define — sem alterar a altura da barra. **Verificar contraste da logo sobre o petróleo `#0F3D5C`**; se a logo foi desenhada para fundo neon escuro, pode precisar de variante. Se precisar, é tarefa do Dexter, e a Fase 3 entrega com a placa tipográfica provisória em vez de travar.

**Gerar o asset da logo (antes de trocar a placa).** `src/assets/logo-tooloptimizer.png` não existe: gerar a partir de `Logo_ToolOptimizer.png` (2048x2048, 1,27 MB), redimensionada com `sharp` para 2x a altura da barra Z1. O original fica intacto na raiz.

**`index.html` recebe a cabeça completa**, trazida de `archive/legacy-v1/index.html` e atualizada: favicon, apple-touch-icon, `meta description`, keywords, Open Graph (`og:url` = `https://app.tooloptimizercnc.com.br/`), Twitter card, `canonical`, `theme-color` (cor do Fenix), e os dois blocos JSON-LD — o `SoftwareApplication` com o `featureList` **reescrito para as funcionalidades reais do Fenix** (4 famílias: fresar, furar, roscar, mandrilar; modelo vivo bidirecional; modo broca de aço rápido; offline) e o `FAQPage` revisado. Descrever funcionalidade que não existe mais é o erro que a Etapa 3 do pedido proíbe.

**Fica o nome Fenix** onde é história e não produto: `archive/`, `Docs_inicial/` (que registra a construção), `Skinner/`, mensagens de commit. E onde ficar, a relação precisa estar escrita: *Fenix foi o codinome da reconstrução; o produto é o ToolOptimizerCNC*.

## Fase 4 — Documentação

1. Trazer `Docs_inicial/` do Fenix inteiro para o repo ToolOptimizerCNC. Ela é a documentação oficial.
2. **`CONTEXT.md` na raiz** (o `docs/agents/domain.md` do projeto já prevê single-context): o que é o produto, a relação Fenix↔ToolOptimizerCNC em um parágrafo, onde vive cada coisa, o que está arquivado e por quê.
3. Reescrever `README.md` a partir do zero, usando o do Fenix como base de conteúdo e o antigo só para tagline/autoria/badges. Corrigir os dois defeitos já achados: os badges apontam para `deploy.yml` (não existe; é `deploy-cloudflare.yml`) e para v0.3.0 (o real será 2.0.0).
4. `CLAUDE.md`: fundir o do Fenix (que é o vigente) com as regras de deploy do antigo que continuam valendo. Substituir "Projeto: Fenix" pela identidade nova.
5. `ESTADO.md` do Fenix vira o `ESTADO.md` do produto, com uma seção nova no topo registrando a migração.
6. **Triagem explícita do que era do antigo**, com veredito por documento em `archive/legacy-v1/TRIAGEM.md`:
   - **A (aproveitar):** identidade visual de marca, textos institucionais, estratégia de domínio, `docs/PROTOCOLO_CONVERSAO_APP/` na parte de deploy Cloudflare.
   - **B (adaptar):** `DOCUMENTACAO_MARKETING_MONETIZACAO/` — persona, SEO e monetização continuam válidos, a descrição de funcionalidade não.
   - **C/D/E (arquivar sem uso):** `docs/specs/PRD_*`, `docs/architecture/ADR-001..007`, `blueprint_calculadora_cnc.md`, `docs/DOSSIE_CALCULADORA_PARAMETROS.md`, `docs/design/*`, `docs/ai/*`, `docs/plans/*`. São a metodologia e o motor substituídos. **O dossiê de fórmulas é o caso mais tentador e o mais perigoso** — os canônicos do Fenix são a fonte de número; conflito entre os dois resolve-se pelo Fenix, sem tentativa de conciliação.
7. **Landing (`landing/index.html`):** revisar o texto para descrever a versão nova, corrigir o bloco JSON-LD degradado que o inventário encontrou, e confirmar os links para `app.tooloptimizercnc.com.br`.

## Fase 5 — Publicação

1. `deploy-cloudflare.yml`: remover o job de Android; conferir que o job `deploy-app` roda com a toolchain nova; o job `deploy-landing` segue `continue-on-error` (projeto Pages ainda pendente — registrar como pendência aberta, não fingir resolvida).
2. `ci.yml`: apontar para `npm run check` (o comando do Fenix).
3. `public/sitemap.xml`: hoje lista `/`, `/settings`, `/history`. **O Fenix não tem rotas** — é painel único com Configurações em overlay. Reduzir para `/` e atualizar `lastmod`. `robots.txt` conferido.
4. `public/_redirects` e `public/404.html`: o comentário no `_redirects` explica um loop 10021 no Pages e o SPA resolvido por `404.html` + script. Isso é do **Pages**; o app roda no **Worker**, que já resolve SPA por `not_found_handling`. Verificar se o `404.html` e o script ainda são necessários — se não forem, saem.
5. Deploy em preview do Worker antes da `main`. Conferir no preview antes de promover — a validação antes do merge (Fase 6) é aqui, não em produção.

## Fase 6 — Validação e merge

Portão mecânico, com saída colada no relatório (sem "deve funcionar"):

### Antes do merge

- `npm run check` — typecheck + a suíte inteira, verde
- `npm run build` — bundle gerado
- Suítes do protótipo que o Fenix carrega: dinâmica, integridade (34), contraste
- `grep -ri "fenix"` no que vai a produção (`src/`, `index.html`, `public/`, `landing/`, `vite.config.ts`, `package.json`) — **zero acertos**
- Navegador (Browser pane): abrir a build, conferir as 4 famílias calculando, a persistência no IndexedDB novo, a área Configurações, o `±5%`, a tarja de alerta, e o responsivo nos três limiares
- Preview do Worker (Fase 5, passo 5): no ar e servindo a versão nova — nunca o domínio de produção nesta etapa

### Plano de volta (escrito antes do deploy em produção)

- **Como voltar:** antes do deploy, anotar o ID da versão do Worker que está em produção (`wrangler deployments list`). Para republicar a versão anterior: `wrangler rollback <id>`; se não servir, redeploy a partir da tag `pre-migracao` (checkout da tag, `npm ci`, `npm run deploy`).
- **Sinal que manda acionar:** qualquer item de "Depois do merge e do deploy" falhando, ou cálculo errado em produção.

Só então PR para a `main` e `wrangler deploy`.

### Depois do merge e do deploy

- `app.tooloptimizercnc.com.br` servindo a versão nova; `www` servindo a landing; favicon e og-image resolvendo; sitemap e robots corretos

## Fase 7 — Encerrar o repo Fenix

`README.md` no repo `Fenix`: *arquivado em 10/09/2026; o código vive em `contatorafaeleleoterio-hub/ToolOptimizerCNC`*. Arquivar no GitHub. **Não deletar.**

---

## Risco principal

O repo antigo tem `.claude/worktrees/` com **cópias completas do repositório** dentro. Uma varredura ingênua por "Fenix" ou uma movimentação por glob vai tocar nelas e produzir um diff de milhares de arquivos. Toda operação de arquivo desta migração precisa excluir `.claude/worktrees/`, `node_modules/` e `dist/` explicitamente.

## Sequência de sessões

Fase 0 · Fases 1–2 · Fase 3 · Fase 4 · Fases 5–7. Cinco sessões, com reporte e "pode seguir" ao fim de cada uma.
