# Estado — ToolOptimizer CNC — 15/09/2026

Arquivo de retomada e fonte única do estado do produto. É o documento que o operador ou qualquer agente carrega ao iniciar uma sessão.

---

## 🎯 Suporte a Duas Casas Decimais em AP & Engajamento Radial (ae) (15/09/2026)

Revisão técnica de engenharia e implementação de precisão decimal de duas casas para os parâmetros **AP (profundidade de corte)** e **Engajamento Radial (ae)** na seção de Condições/Condução de Corte do **ToolOptimizer CNC**:
- **Diagnóstico e Análise do Motor Físico:**
  - Mapeamento das equações dependentes: diâmetro efetivo $D_e = 2\sqrt{ap(D-ap)}$ (fresa esférica), engajamento radial $\epsilon = \min(1, ae/D)$, arco engajado $\phi_{max} = \arccos(1-2\epsilon)$, espessura média $h_m$, afinamento de cavaco $CTF = 1/\sqrt{1-(1-2\epsilon)^2}$, força de Kienzle $k_c$, taxa de remoção $Q = (ap \cdot ae \cdot v_f)/1000$, potência $P_c$ e torque $M_c$.
  - Constatado que o motor físico em `src/core/calculator.ts` preserva números de ponto flutuante com total estabilidade e sem singularidades para passes finos (como $0,15\text{ mm}$).
- **Fontes de Arredondamento Sanadas:**
  - `ConfigForm.tsx` & `MobileCalculator.tsx`: Campos `input-ap` e `input-ae` atualizados para `decimals={2}`, `step={0.1}`, `placeholder="Ex: 2.00"` / `"Ex: 2.50"` e rotulagem "Engajamento radial".
  - `ResultsPanel.tsx`: Chips de exibição Z3 de $AP$ e $AE$ em fresamento atualizados de `formatDec(..., 1)` para `formatDec(..., 2)`. $AP$ de mandrilamento também ajustado para 2 decimais.
  - `MobileResultsSheet.tsx`: $AP$ de mandrilamento ajustado para 2 decimais.
  - `analyzer.ts`: Mensagens dos gatilhos 2 e 3 de fresamento atualizadas para `formatNumber(ae, 2)`.
  - Correção de erro de compilação TS2532 em `ConfigForm.tsx` e `SettingsView.tsx`.
- **Quality Gate:**
  - 114 testes automatizados em 16 arquivos de teste passando com 100% de sucesso (`npm run check` verde).
  - Novos testes para livre digitação de `0,15`, `0,20`, `0,35`, `1,25`, vírgula pt-BR e preservação de 2 decimais.
  - Novos testes em `milling.spec.ts` validando passes finos de $0,15\text{ mm}$ em topo reto e esférica.
  - Build estático Vite (`npm run build`) compilado com exit code 0.

---

## ⌨️ Revisão Geral de Inputs & Experiência Decimal Fluida (14/09/2026)

Revisão completa e saneamento de todos os campos de entrada numérica da solução (desktop e mobile), garantindo digitação fluida, previsível e sem bloqueios artificiais:
- **Diagnóstico das Causas-Raízes:**
  - `StepperInput`: Ausência de estado local desacoplado de texto fazia com que re-renders intermediários forçassem `toFixed(decimals)` imediatamente ao digitar `0`, destruindo pontos `.` e vírgulas `,` e impedindo a inserção de `0.2`, `0.25`, `6.35`, etc.
  - `SettingsView`: Fallbacks imediatos com operador falsy (`|| 100`, `|| 10`, `|| 0.8`) impediam apagar o campo com Backspace ou digitar `0`/decimais.
  - Teclado Mobile: Elementos nativos `<input type="number">` bloqueavam a vírgula brasileira (pt-BR) dos teclados virtuais móveis.
- **Arquitetura Implementada:**
  - `StepperInput`: Implementação de estado local `localText`, rastreamento de foco (`isFocused`) e ref de emissão (`lastEmittedRef`). Preserva integralmente estados transitórios (`""`, `"0"`, `"0."`, `"0,"`, `"."`, `","`).
  - `SettingsNumericInput`: Componente desacoplado em `SettingsView.tsx` para Margem de Segurança, Parâmetros HSS e edição inline de grandezas de materiais (`kc1.1`, `mc`, `vcReference`), com fallbacks aplicados de forma graciosa apenas no `onBlur`.
  - Formulários de Cadastro: Migração para `type="text"` e `inputMode="decimal"` com sanitização `.replace(',', '.')`, aceitando tanto ponto quanto vírgula sem travamento no mobile e desktop.
  - Botões Stepper: Aritmética de passo com cálculo dinâmico de precisão decimal máxima, eliminando dízimas de ponto flutuante do JavaScript (ex: `0.1 + 0.2 = 0.3`).
- **Portão de Qualidade:**
  - 111 testes automatizados em 16 arquivos de teste passando com 100% de sucesso (incluindo 6 novos testes de digitação de `0.2`, `0.25`, vírgula pt-BR, Backspace e precisão de stepper).
  - Build de produção Vite limpo e compilado com sucesso.
- **Deploy em Produção:** Cloudflare Worker atualizado via Wrangler.

---

## 📱 Experiência Mobile Dedicada & Deploy de Produção (14/09/2026)

Conclusão da investigação de UX e implementação da interface mobile dedicada para o ToolOptimizer CNC, além da publicação em produção na Cloudflare:
- **Diagnóstico UX:** Identificação de causas-raízes do layout mobile (overflow horizontal em StepperInput devido a estilos inline em `.vgrid`, fadiga de rolagem de > 3.200px e desconexão entre o botão de cálculo e o painel de resultados).
- **Arquitetura Dedicada:** Criação do hook `useIsMobile(768)` e dos componentes mobile dedicados em `src/ui/components/mobile/`:
  - `MobileHeader`: Cabeçalho ultra-compacto (48px) com resumo do contexto ativo e acesso a configurações.
  - `MobileFamilyTabs`: Seletor deslizante horizontal das 4 famílias com total acessibilidade WAI-ARIA.
  - `MobileStickyBar`: Barra fixa inferior na *thumb zone* com exibição em tempo real dos números de comando ($S$ e $F$) e nível de segurança Kienzle.
  - `MobileResultsSheet`: Bottom Sheet modal deslizante com controles táteis de $\pm 5\%$, diagnóstico Z2 e verificação física Z7.
  - `MobileCalculator`: Shell integrador com formulário sanfona em 1 coluna (sem corte de inputs) e compensação vertical.
- **Preservação Integral:** Desktop intacto (zero regressão nos 102 testes legados), mesma lógica física e de storage IndexedDB em `src/core/` e `CalculatorContext.tsx`.
- **Quality Gate:** `npm run check` 100% verde (0 erros de tipo TypeScript, 16 arquivos de teste e 105/105 testes passando).
- **Publicação Online:** Deploy do Cloudflare Worker (`tooloptimizercnc`) via Wrangler com compilação de produção Vite (`npm run build`). Verificação ativa em `app.tooloptimizercnc.com.br` e `tooloptimizercnc.com.br` confirmando entrega dos novos pacotes compilados.

---

## 🚀 Migração Fenix → ToolOptimizerCNC v2 (13/09/2026)

Conclusão da migração arquitetural do codinome Fenix para o repositório mãe definitivo **ToolOptimizerCNC**:
- **Fase 0 (Segurança):** Árvores de trabalho conferidas, tag `pre-migracao` criada e enviada ao GitHub em ambos os repositórios, branch `feat/migracao-fenix` ativa, ausência de vazamento de segredos confirmada e verificação de B1-B3 aprovada com 102 testes.
- **Fase 1 (Arquivamento):** Todo o legado v1 (`src/`, `docs/`, `tests/`, Android/Capacitor/Electron, protótipos e órfãos de raiz) movido com histórico Git (`git mv`) para `archive/legacy-v1/`. Criação de `archive/legacy-v1/LEIA-ME.md` estabelecendo perda de autoridade dos documentos antigos.
- **Fase 2 (Transplante):** Transplante completo do núcleo canônico (`src/core/`), casca React 19 (`src/ui/`), governança (`src/harness/`), configs e unificação do `package.json` (v2.0.0, React 19, Vite 8, TS 7, Vitest 5, IDB, PWA, Wrangler). Portão validado com 102 testes passando e build limpo.
- **Fase 3 (Identidade):** Atualização dos 19 pontos mapeados de identidade visual e institucional (HTML head completo de SEO/OG/Schema.org JSON-LD, marca `TOOLOPTIMIZER` em header e settings, IndexedDB `tooloptimizer_db`, logo redimensionada em `src/assets/logo-tooloptimizer.png`, harness e suíte de testes).
- **Fase 4 (Documentação):** Incorporação de `Docs_inicial/` como documentação oficial, criação de `CONTEXT.md`, reescrita do `README.md` (badges, v2.0.0), consolidação de `CLAUDE.md`, triagem explícita em `archive/legacy-v1/TRIAGEM.md` e atualização da landing page.

---
# Estado â€” Fenix â€” 09/09/2026

Arquivo de retomada. Ã‰ o que o Skinner ou qualquer agente carrega quando o Mestre diz **"continuar"**.
Fonte Ãºnica do estado: se algo aqui divergir de outro documento, atualize aqui.

> **Nota para agentes:** A sessÃ£o de 09/09/2026 concluiu a implementaÃ§Ã£o do **Ciclo 3: ApresentaÃ§Ã£o React UI (TASK-009 a TASK-013)** conduzida pelo **Gemini (Antigravity)**. A aplicaÃ§Ã£o React tipada, reativa e offline-first estÃ¡ operacional com Vite, `CalculatorContext`, formulÃ¡rios condicionais por geometria, painel de resultados tÃ¡teis (Â±5%), tarja de seguranÃ§a, e configuraÃ§Ãµes persistidas no IndexedDB. O portÃ£o mecÃ¢nico estÃ¡ 100% verde (93/93 testes Vitest passando, build limpo, 50/50 dinÃ¢mico, 61 tokens WCAG AA). A reavaliaÃ§Ã£o independente de **Morfeu** (`Docs_inicial/relatorios/REAVALIACAO_FASE4_CICLO3_MORFEU_2026-09-09.md`, Score 72/100) confirmou a resoluÃ§Ã£o de AC-005, AC-006 e da fiaÃ§Ã£o Storage, levantando trÃªs bloqueadores de coerÃªncia canÃ´nica (B1: partida de `vc` em Furar; B2: partida de `vc` em Roscar; B3: motor de Roscar/Mandrilar na camada Core vs escopo) para a prÃ³xima iteraÃ§Ã£o.

**O que estÃ¡ em trÃ¢nsito nÃ£o mora aqui.** Tarefa despachada e nÃ£o entregue, com o prompt literal, vive
em `Skinner/tarefas/ABERTAS.md` â€” criado em 03/09 exatamente porque trabalho em voo nÃ£o tinha onde
pousar. **Se a Ã¡rvore de trabalho estiver suja, leia aquele arquivo antes de commitar qualquer coisa.**

---

## SessÃ£o de 09/09/2026 (3Âª) â€” ReavaliaÃ§Ã£o de Auditoria do Ciclo 3 (Morfeu & Gemini)

- **Auditoria Independente Realizada:**
  - RelatÃ³rio: `Docs_inicial/relatorios/REAVALIACAO_FASE4_CICLO3_MORFEU_2026-09-09.md`.
  - Resultado: Score 72/100 (REPROVADO devido a 3 bloqueadores crÃ­ticos conceituais).
- **Conquistas Validadas por Morfeu:**
  - PortÃ£o mecÃ¢nico 5/5 inteiramente verde: `npm run check` (93/93), `npm run build` (bundle 240 kB sem rede), 50/50 testes dinÃ¢micos, 61 tokens WCAG AA e 5/5 cenÃ¡rios da specification sheet.
  - Bloqueadores anteriores de AC-005 (material IndexedDB no cÃ¡lculo) e AC-006 (boot de margem global e aviso na UI) totalmente sanados com testes de contrato fÃ­sico real (`integration.spec.tsx`).
- **Bloqueadores CrÃ­ticos a Tratar na PrÃ³xima SessÃ£o:**
  - **B1 (Partida em Furar):** `selectMaterial` injeta `vcReference` de fresa (140 m/min) para brocas em vez dos canÃ´nicos de furaÃ§Ã£o (16â€“30 m/min HSS), e `CalculatorContext` precisa passar `vcStart` a `calculateDrilling` para reativar o Gatilho 4.
  - **B2 (Partida em Roscar):** `vc` de partida de 140 m/min reproduz erro histÃ³rico de fator ~8 em machos (teto de 40 m/min para corte, 60 para conformaÃ§Ã£o).
  - **B3 (Motor de Roscar/Mandrilar):** Deslocar equaÃ§Ãµes de cinemÃ¡tica/potÃªncia de Roscar e Mandrilar para `src/core/` com testes unitÃ¡rios, ou restringir o botÃ£o Calcular com nota clara de "em construÃ§Ã£o", preservando o escopo original de `tasks.md`.
  - **F1 (Tipagem & Geometria):** Campo explÃ­cito de geometria em `ToolGeometry` eliminando buscas por substring.

---

## SessÃ£o de 09/09/2026 (2Âª) â€” Fase 4: ConstruÃ§Ã£o e Desenvolvimento Iterativo (Ciclo 3: React UI) (Gemini/Antigravity)

- **Entregas ConcluÃ­das:**
  1. **TASK-009 (Toolchain e Setup React):** Vite + React 18/19 + TypeScript (`jsx: react-jsx`), suporte a `jsdom` via pragma local de teste sem quebrar o ambiente `node` do Core, scripts `dev` e `build` (`npm run build` gerado em ~650ms).
  2. **TASK-010 (Estrutura de Estado e Reatividade):** `CalculatorContext` gerenciando estado das 4 famÃ­lias, live calculation dinÃ¢mico a cada mudanÃ§a de input, respeito estrito Ã  regra `UI â†’ Storage â†’ Core` (`getAllMaterials()` e `getConfig()`), e eliminaÃ§Ã£o de silÃªncio em Roscar (`vf = n * P`) e Mandrilar (`vf = n * fn`).
  3. **TASK-011 (Componentes de Input GeomÃ©tricos):** `HeaderZ1` com chips dinÃ¢micos de material/ferramenta, `FamilyNav` com segmented control canÃ´nico, e `ConfigForm` exibindo inputs condicionais por geometria (`r` para toroidal, `kappa` para alto avanÃ§o) e defaults de `tools.ts`.
  4. **TASK-012 (Painel de Resultados, Hero Numbers e Alertas):** `ResultsPanel` com rotaÃ§Ã£o `S` e avanÃ§o `F` destacados, botÃµes tÃ¡teis `Â±` de 5% com recÃ¡lculo em tempo real (Mc constante sob ajuste de S), tarja de alerta colorida (CRÃTICO `#B8461D`, ATENÃ‡ÃƒO `#A96208`, NORMAL `#1B6E5C`), aviso visual de Margem Global Ativa, cartÃµes de verificaÃ§Ã£o fÃ­sica (`hm`, `hex`, `CTF`, `L/D`, `Q`, `Pc`, `Mc`) e direÃ§Ã£o anti-vibraÃ§Ã£o canÃ´nica (reduÃ§Ã£o de `ae` com teto de 25% de D).
  5. **TASK-013 (ConfiguraÃ§Ãµes Globais Offline-First):** `SettingsView` conectada ao IndexedDB (`storage.ts`), persistindo margem de seguranÃ§a global, parÃ¢metros de broca HSS e cadastro de materiais customizados refletidos imediatamente no cÃ¡lculo (AC-005).
- **ValidaÃ§Ã£o e PortÃ£o MecÃ¢nico:**
  - `npm run check` (typecheck + vitest): **93/93 testes passando** (13 arquivos) com exit code 0.
  - SuÃ­te dinÃ¢mica de protÃ³tipo: **50/50 testes passando** sem regressÃ£o.
  - Auditoria de contraste: 100% aprovada (WCAG AA).
  - Build de produÃ§Ã£o: `npm run build` gerando bundle estÃ¡tico sem erros.
  - Registro de incidentes e soluÃ§Ãµes em `LESSONS.md` (L01, L02 e L03).
- **Estado:** Ciclo 1, Ciclo 2 e Ciclo 3 de `tasks.md` implementados.

---

## SessÃ£o de 09/09/2026 â€” Fase 3: Arquitetura Cognitiva e Engenharia de Grafos (Gemini/Antigravity)

- **PrincÃ­pios Implementados:**
  1. **ReAct:** Ciclos estruturados de `Thought â†’ Action â†’ Observation` para agentes iterativos, com guardrails duros contra loops infinitos (mÃ¡x 10 passos) e detecÃ§Ã£o de repetiÃ§Ãµes improdutivas consecutivas.
  2. **Harness Engineering (`harness_config.yml`):** Matriz estrita de ferramentas e menor privilÃ©gio por agente (Skinner nÃ£o edita cÃ³digo, Morfeu tem permissÃ£o de escrita restrita a relatÃ³rios de auditoria, Gemini/Dexter/Ãcaro confinados a seus escopos), checkpoints e validaÃ§Ãµes mecÃ¢nicas ativas prioritÃ¡rias.
  3. **Graph Engineering (`grafo_fluxo.json`):** Grafo Direcionado AcÃ­clico (DAG) com 14 nÃ³s, paralelismo entre ramos ortogonais (cÃ³digo, UI, documentaÃ§Ã£o), verificaÃ§Ã£o isolada com nota mÃ­nima (threshold 85/100) + tolerÃ¢ncia zero a falhas crÃ­ticas bloqueadoras, loops de correÃ§Ã£o limitados (mÃ¡x 3 retries) e convergÃªncia controlada.
- **ValidaÃ§Ã£o Automatizada e Auditoria:** MÃ³dulo TypeScript em `src/harness/` (validador de DAG via algoritmo de Kahn, verificador de menor privilÃ©gio com parse real do YAML fÃ­sico, simulador ReAct e motor de verificaÃ§Ã£o). Auditoria independente do Morfeu concluÃ­da com **Score 90/100 (APROVADO)** e refinada com transferÃªncia exclusiva de governanÃ§a ao Skinner.
- **Testes:** 71/71 testes passando no `npm run check` (60 testes do Core CNC + 11 do Harness) e 50/50 testes dinÃ¢micos de usinagem passando sem regressÃ£o.
- **PrÃ³ximo Passo:** Ciclo 3 de ApresentaÃ§Ã£o (React UI - Setup do React e Toolchain UI, TASK-009).

---

## SessÃ£o de 08/09/2026 â€” CenÃ¡rios A a I no protÃ³tipo (Gemini/Antigravity + conferÃªncia do Skinner)

Commits `5229898`, `32c7832` e `dbe628f`. **SeparaÃ§Ã£o canÃ´nica:** a aba ConfiguraÃ§Ãµes Ã© a biblioteca
da oficina (4 tipos, 17 geometrias) e nÃ£o guarda mais parÃ¢metro de corte; `D, r, Z, L, ap, ae, vc,
fz, fn` vivem sÃ³ na tela de corte. **CenÃ¡rio A:** painel abre zerado, sem material nem ferramenta,
inputs vazios e botÃ£o Calcular desabilitado. **B e C:** o botÃ£o habilita quando o Ãºltimo requisito da
famÃ­lia Ã© preenchido. **I:** escolher ferramenta carrega geometria e substrato, sem impor valor de
corte. **D a H:** modelo vivo bidirecional (`n â†” vc â†” vf`, `ap`/`ae` â†’ `Q, Pc, Mc`); no roscamento o
avanÃ§o fica travado no passo. **Valores de partida:** derivados de `MVP Â§3.2`, `Â§3.5` e da curva de
`fz` por diÃ¢metro (`Â§11.3`), com ediÃ§Ã£o manual do operador preservada na troca de ferramenta.

**Dois nÃºmeros corrigidos na conferÃªncia:** `fn` de mandrilamento 0,20 â†’ **0,08 mm/rot** (a fonte
citada publica 0,04â€“0,12 para 1045; o valor estava 67% acima do teto) e fator do aÃ§o rÃ¡pido 0,25 â†’
**0,22** (a faixa publicada Ã© 0,22â€“0,25 e o Ãºnico par medido em fresa aponta 0,12â€“0,23).

**50/50 testes** em `testes/test_suite_dinamica.js` e regressÃ£o completa em `testes/test_suite.js`;
rodam com `node <caminho>` a partir da raiz.

---

## SessÃ£o de 08/09/2026 (5Âª) â€” a especificaÃ§Ã£o estrutural do painel

`Docs_inicial/construcao/design-system/` â€” cinco arquivos. **O que faltava:** o
`DESIGN_SYSTEM_FENIX.md` Ã© a camada de aparÃªncia e declara que nÃ£o define layout; o
`BRIEF_DESIGN_INTERFACE.md` Ã© requisito e proÃ­be soluÃ§Ã£o de interface. **A camada do meio â€” o que
existe na tela, como se comporta e como se compÃµe â€” sÃ³ existia em cÃ³digo.**

`00_LEIA-ME.md` (Ã­ndice, trÃªs camadas, precedÃªncia, pendÃªncias) Â· `01_INVENTARIO.md` (quinze
categorias, com `arquivo:linha` em cada afirmaÃ§Ã£o) Â· `02_ESTRUTURA.md` (shell, layout, navegaÃ§Ã£o,
hierarquia, tokens estruturais, responsividade, composiÃ§Ã£o) Â· `03_COMPONENTES.md` (cinco nÃ­veis,
ficha de nove campos: 8 primitivos, 12 componentes, 8 padrÃµes, 2 templates, 5 pÃ¡ginas) Â·
`04_COMPORTAMENTO.md` (ciclo de cÃ¡lculo, modelo vivo, estados, diagnÃ³stico, vazio, carregamento,
linguagem, erro, acessibilidade, movimento).

**Nenhum arquivo do protÃ³tipo foi tocado** â€” as duas suÃ­tes seguem em 50/50 e regressÃ£o completa.
Agnosticismo verificado: zero cor, fonte, framework ou biblioteca nos cinco arquivos.

### Doze achados, verificados no cÃ³digo, **nenhum arbitrado** â€” `design-system/00_LEIA-ME.md` Â§5

**Onze seguem abertos; o dÃ©cimo segundo fechou na `main` no mesmo dia** â€” ver o fim desta seÃ§Ã£o.

**Defeitos:** **A** `markOutdated()` Ã© chamada em `js/app.js:2557` e `3108` e **nunca Ã© definida** â†’
`ReferenceError`; editar material em uso quebra a Ã¡rea ConfiguraÃ§Ãµes, e o estado "desatualizado" Ã©
inalcanÃ§Ã¡vel apesar de CSS e tira de status prontos. **B** `aePartida` grava `'0.7xD'` e o cÃ³digo
testa `'0.7*D'`. **C** `geo.campos` das 17 geometrias nunca Ã© lido. **D** o celular simulado entrega
420px onde a barra anuncia 390px, e nÃ£o hÃ¡ override de tablet. **E** CSS Ã³rfÃ£o e markup sem CSS.

**DivergÃªncias de documento:** **F** botÃ£o Calcular desabilitado Ã— `E5 Â§4` e brief Â§7.1. **G** passo
do `Â±` em 5% Ã— os 10% da Specification Sheet. **H** blocos colapsÃ¡veis sem as regras 3, 4 e 6 do
`E5 Â§3`. **I** bloco "Contexto" do `E5 Â§2.1` Ã— anti-requisito do brief Â§12. **J** tela pequena
empilha, mas o escopo pede seÃ§Ãµes alternÃ¡veis. **K** nenhum `<h1>`â€“`<h6>` e padrÃ£o ARIA de abas pela
metade.

**L fechou sozinho, e vale saber como.** A especificaÃ§Ã£o encontrou seis tokens estruturais com valor
diferente no design system e no protÃ³tipo â€” o que importava era o alvo da aÃ§Ã£o principal, **56px
declarado com razÃ£o escrita Ã— 52px entregues**. A sessÃ£o da paleta nova achou o mesmo e decidiu em
`6f36784`: *o documento estava desatualizado, os valores do protÃ³tipo passam a valer*. **O valor
corrente Ã© 52px.** Registrado em `design-system/00_LEIA-ME.md` Â§5.3, nÃ£o apagado â€” quem achar um
documento citando 56px precisa saber onde a diferenÃ§a morreu.

**Uma liÃ§Ã£o de manutenÃ§Ã£o que a colisÃ£o ensinou:** a paleta nova mexeu em 151 linhas do
`css/prototipo.css` e deslocou **todas** as 40 citaÃ§Ãµes de linha de CSS que a especificaÃ§Ã£o tinha. O
`js/app.js` e o `index.html` nÃ£o mudaram de contagem. **No CSS o endereÃ§o estÃ¡vel Ã© o seletor**, e a
especificaÃ§Ã£o passou a citÃ¡-lo assim.

**Reconciliada duas vezes contra a `main`, e a segunda ensinou o resto da liÃ§Ã£o.** Na primeira
(`83e8fd6`) a paleta nova deslocou as 40 citaÃ§Ãµes de linha de CSS. Na segunda (09/09) o alerta de
balanÃ§o do mandrilamento (`933cdba`) acrescentou 14 linhas ao `js/app.js` e deslocou **178** citaÃ§Ãµes,
todas remapeadas pelos deslocamentos exatos do diff e reconferidas por amostragem. **Toda citaÃ§Ã£o de
linha do conjunto vale para o commit declarado no cabeÃ§alho de cada peÃ§a** â€” quem ler depois de o
protÃ³tipo andar confere pelo nome da funÃ§Ã£o ou do seletor.

**Uma mudanÃ§a de comportamento entrou na especificaÃ§Ã£o:** o mandrilamento passou a disparar `ATENÃ‡ÃƒO`
por `L/D > 4,0`, como o fresamento jÃ¡ fazia. SÃ£o quatro gatilhos implementados agora, em trÃªs
famÃ­lias â€” o brief Â§5.8 declara dezessete possÃ­veis.

**A casca do Ciclo 3 herdou dois dos achados, e isso foi verificado.** `c366bc9` entregou
`src/ui/` com a estrutura que este conjunto descreve â€” as trÃªs regiÃµes do shell, as duas vistas, as
duas colunas. Duas verificaÃ§Ãµes pontuais: **K** reproduzido (um Ãºnico `<h2>`, em `SettingsView.tsx`;
`tablist` e quatro `tab` em `FamilyNav.tsx`, sem `tabpanel`, sem `aria-controls`, sem navegaÃ§Ã£o por
setas) e **F** reproduzido (`disabled={!canCalculate}` em `ConfigForm.tsx`). **NÃ£o Ã© crÃ­tica ao Ciclo
3** â€” a casca foi construÃ­da contra o protÃ³tipo, que Ã© o contrato, e o protÃ³tipo tem os dois
comportamentos. Ã‰ a demonstraÃ§Ã£o de que o achado Ã© real: defeito que nÃ£o estÃ¡ escrito atravessa a
reimplementaÃ§Ã£o inteira sem ninguÃ©m notar. **A comparaÃ§Ã£o completa da casca contra o conjunto Ã©
tarefa que o Mestre nomeia** â€” as duas verificaÃ§Ãµes acima foram pontuais, nÃ£o auditoria.

**Os doze fecharam em 09/09/2026, por ordem do Mestre de limpar as pendÃªncias.** Nove corrigidos ou
reconciliados, dois nomeados como tarefa de ciclo, um resolvido no caminho por outra sessÃ£o. O
desfecho de cada um estÃ¡ em `design-system/00_LEIA-ME.md` Â§5.

---

## SessÃ£o de 09/09/2026 (4Âª) â€” as doze pendÃªncias, limpas

**Ordem do Mestre:** decidir 1 e 2 pela melhor prÃ¡tica, dispensar a auditoria completa da casca, e
limpar as pendÃªncias. **PR #4 mesclado** (`a05fc61`) â€” a especificaÃ§Ã£o estrutural entrou na `main`.

**Cinco defeitos corrigidos no protÃ³tipo.** **A** `markOutdated()` definida â€” e apareceram mais dois
pedaÃ§os quebrados no caminho: a grade de verificaÃ§Ã£o nÃ£o tinha o ancestral que a regra de esmaecimento
exige, e o `!important` dessa regra venceria a cor inline do alerta, o que esmaeceria alarme ativo
(**R7**). **B** o sentinela `aePartida` casado entre data e cÃ³digo, com dois testes que provam a
derivaÃ§Ã£o (Ã˜63 â†’ 44,1 mm; Ã˜80 â†’ 56,0 mm). **D** a simulaÃ§Ã£o de viewport passou a espelhar os trÃªs
limiares â€” sem isso a coluna de configuraÃ§Ã£o ficava presa em 520px e deixava 266px de espaÃ§o morto em
834px simulado. **E** nove regras Ã³rfÃ£s apagadas, trÃªs classes ganharam CSS de verdade, quatro estilos
inline saÃ­ram.

**Dois defeitos corrigidos na casca do Ciclo 3, com TDD.** **C** o campo condicional vinha de
`id.includes('toroidal')` e nÃ£o de `extraFields`: o CabeÃ§ote Faceador pedia `kappa` e nunca recebia, e
`Dmin` nÃ£o era renderizado em lugar nenhum. **K** entrou o `tabpanel`, o `aria-controls`, o
`aria-labelledby`, o roving `tabindex`, a navegaÃ§Ã£o por seta e o `<h1>` que nÃ£o existia â€” e as quatro
abas repetidas Ã  mÃ£o viraram lista de dado, que Ã© a razÃ£o de o padrÃ£o ter ficado pela metade.

**TrÃªs divergÃªncias reconciliadas, riscadas e datadas.** **F** em `E5 Â§4` e no brief Â§7.1: a **R1**
proÃ­be recusar um resultado, e antes do primeiro cÃ¡lculo nÃ£o existe resultado a recusar â€” o que a R1
proÃ­be Ã© o silÃªncio, e o comando diz o que falta. **G** a Specification Sheet corrigida de 10% para
5%, com `S_novo` de 4.010 â†’ **4.233 rpm**. **I** o bloco "Contexto" do `E5 Â§2.1` retirado: perfil de
mÃ¡quina Ã© anti-requisito e o fator de seguranÃ§a saiu em 01/09 â€” o bloco ficou vazio, e sÃ£o **trÃªs
blocos**.

**Duas viraram tarefa, porque carregam decisÃ£o de produto que sÃ³ o Mestre dÃ¡:** **H** blocos
colapsÃ¡veis com as regras 2, 3, 4 e 6 do `E5 Â§3` â€” a casca nÃ£o tem colapsÃ¡vel nenhum, e o `.bhead`
estÃ¡ no CSS sem gerador. **J** tela pequena em seÃ§Ãµes alternÃ¡veis. SÃ£o **TASK-014** e **TASK-015** do
Ciclo 4, descritas em `tasks.md`.

**A liÃ§Ã£o, e Ã© a que fica:** **onze dos doze eram invisÃ­veis para as suÃ­tes.** TrÃªs suÃ­tes, cinquenta e
tantos testes, todas verdes enquanto uma funÃ§Ã£o inexistente esperava para quebrar a Ã¡rea
ConfiguraÃ§Ãµes. Entrou `prototipo/testes/test_integridade.js`, **34 verificaÃ§Ãµes estÃ¡ticas** que pegam a
*classe* de cada defeito e nÃ£o a instÃ¢ncia: funÃ§Ã£o chamada e nÃ£o definida, sentinela de dado que o
cÃ³digo nÃ£o reconhece, simulaÃ§Ã£o de viewport que nÃ£o bate com o rÃ³tulo, classe no CSS sem gerador, e o
passo do `Â±` contado igual em trÃªs documentos. **O guarda testa a si prÃ³prio** contra uma amostra que
tem o defeito e uma que nÃ£o tem â€” guarda que nÃ£o pega nada passa sempre.

**A especificaÃ§Ã£o tambÃ©m errou sobre si mesma, e estÃ¡ corrigido:** os tokens `--sp-1` a `--sp-7` e
`--r-pill` nÃ£o sÃ£o Ã³rfÃ£os. SÃ£o a escala declarada na Â§3 do design system, e o `test_contraste.js` cobra
que o CSS bata com ela token por token.

**ValidaÃ§Ã£o:** regressÃ£o completa Â· 52/52 dinÃ¢mica Â· contraste aprovado Â· integridade 34/34 Â·
core e casca em **95/95** com tipos limpos.

---

## O contrato do painel â€” decisÃ£o do Mestre, 08/09/2026

**`Docs_inicial/construcao/prototipo/index.html` Ã© a fonte da verdade do painel.** As dez folhas
`.dc.html` passam a **registro histÃ³rico**: continuam no repositÃ³rio, nÃ£o sÃ£o atualizadas e nÃ£o
governam mais implementaÃ§Ã£o nenhuma.

**Por que a decisÃ£o foi necessÃ¡ria:** as folhas pararam em 03â€“05/09 e o interativo andou em 07â€“08/09.
Elas jÃ¡ divergiam â€” `Main.dc.html` linhas 385â€“400 ainda dizem passo de **10%** em rotaÃ§Ã£o e avanÃ§o,
enquanto a emenda do Mestre de 07/09 mudou para **5%**; a Ã¡rea ConfiguraÃ§Ãµes editÃ¡vel e os CenÃ¡rios
A a I tambÃ©m sÃ³ existem no interativo. Dois artefatos disputando o papel de contrato faziam toda
tarefa nova herdar a dÃºvida de qual obedecer.

**O que isso muda na prÃ¡tica:** quem for implementar lÃª o `index.html` e as suÃ­tes de teste. Quem
quiser saber a intenÃ§Ã£o de desenho de uma tela pode olhar a folha, sabendo que ela pode estar velha.
DivergÃªncia entre os dois **nÃ£o Ã© defeito a corrigir na folha** â€” Ã© o esperado.

---

## O achado que manda na fase de construÃ§Ã£o

**O modelo de forÃ§a do motor nÃ£o vale na maioria dos furos reais do usuÃ¡rio-alvo.** A espessura de
cavaco na furaÃ§Ã£o cai abaixo de `0,1 mm` â€” o piso de validade de Kienzle â€” com avanÃ§o de partida real,
em toda broca de aÃ§o rÃ¡pido atÃ© Ã˜25, metal duro comum atÃ© ~Ã˜20 e **todo U-drill**. Ã‰ o regime normal,
nÃ£o a borda. Texto completo e fontes: `CANONICO_FURACAO Â§1.1` e `Â§1.2` (`fa54d9c`).

**O estrago Ã© menor do que parece, e isso foi verificado:** `kc` sÃ³ alimenta potÃªncia e torque, que
sÃ£o cartÃµes de conferÃªncia. **RotaÃ§Ã£o e avanÃ§o â€” os dois nÃºmeros que vÃ£o para a mÃ¡quina â€” nÃ£o passam
por `kc`.**

~~**O que ainda nÃ£o foi feito:** o gatilho `1a` dispararia em ~100% dos furos e precisa nÃ£o valer para
furaÃ§Ã£o. Ã‰ a emenda A-algo da Â§6, dentro da dÃ­vida das 15 abaixo.~~ **Fechou.** O recorte por famÃ­lia
entrou em 07/09/2026 com as emendas **A2** e **A4** da `CANONICO_FURACAO Â§6` â€” o gatilho existe e
mora no `MVP Â§9.2`, com o nome `1a`.

**Encerrado por decisÃ£o do Mestre, 08/09/2026: o alerta de espessura sai do produto, em todas as
famÃ­lias.** NÃ£o Ã© mais recorte por famÃ­lia â€” nÃ£o existe alerta de espessura em fresamento, furaÃ§Ã£o,
roscamento nem mandrilamento. **O que fica:** o cÃ¡lculo de `hm` e `hex`, a espessura como resultado
visÃ­vel na tela, e o limite `hm = 0,1 mm` descrito nos canÃ´nicos como propriedade do modelo de forÃ§a.
**O que sai:** o aviso. Aplicado em `MVP Â§9.2` (gatilho 1a), `E4` (gatilhos 1 e 11a),
`CANONICO_LIMITES_E_ALERTAS Â§5`, `CANONICO_FURACAO Â§1.2`, `E1`, `E2`, `E5` e no protÃ³tipo
(`js/app.js`, `js/mock-data.js`) â€” riscado e datado, nunca apagado. **Nada a fazer aqui.**

---

## A rÃ©gua do produto, na palavra do Mestre

*Isto Ã© uma calculadora, e calculadora nÃ£o manda no usuÃ¡rio. Se digitar um absurdo, o absurdo
aparece.* `E0 Â§3.3`, decisÃ£o de 27/08: **nada neste sistema recusa entregar um resultado** â€” sumir
com o nÃºmero esconde a informaÃ§Ã£o Ãºtil, que Ã© o tamanho do erro. JÃ¡ decidiu trÃªs colisÃµes: o bloqueio
de diÃ¢metro revertido (`cc438a5`), os verbos de recusa da R8 (`fa54d9c`) e a inversÃ£o em broca fina da
R9 (`4b11b12`). Quando um retorno de pesquisa mandar bloquear, a resposta jÃ¡ estÃ¡ dada: vira alerta.

**Lacuna sem fonte nÃ£o bloqueia** (decisÃ£o de 04/09): valor de partida razoÃ¡vel, **editÃ¡vel**, com o
aviso de que o nÃºmero certo se pede ao fornecedor da ferramenta. NÃ£o afrouxa a regra de fonte â€” muda o
que "resolvido" significa.

---

## SessÃ£o de 05/09 â€” a fÃ³rmula do Mestre virou modo do painel

Fechada em `4b11b12`; narrativa completa no diÃ¡rio `Skinner/memoria/sessoes/2026-09-05-broca-aco-rapido.md`.
O que a retomada precisa saber: `318 Ã— vc / D` Ã© `1000/Ï€`, o motor de sempre na forma de oficina; o
"incremento" Ã© o **passo do pica-pau** (`D/25`, teto 0,8 mm), e o avanÃ§o do modo Ã© `fn` = **0,10 mm/rot
em qualquer diÃ¢metro**. Caso verificador: **Ã˜10 com `vc` 16 â†’ S 508 Â· F 50 Â· Q 0,4**. Abaixo de ~Ã˜4,5
a regra dos 10% pede **mais** avanÃ§o que o catÃ¡logo â€” o alerta que jÃ¡ existe cobre a partir de ~Ã˜2,5.
A regra dos 10% e o passo do pica-pau **nÃ£o tÃªm fonte publicada**: sÃ£o prÃ¡tica do Mestre, declarada
como tal. PendÃªncia aberta pelo modo: o Ã¢ngulo de ponta segue 140Â° (valor de metal duro); nenhuma
fonte publica Ã¢ngulo em graus para broca de aÃ§o rÃ¡pido, e ele nÃ£o entra em nenhum dos trÃªs nÃºmeros.


## Onde paramos

A Fase 1 foi formalmente consolidada em `docs/fase1/` (Vision Statement, Story Map, Specification Sheet e ProtÃ³tipo Aprovado).
O **ProtÃ³tipo HTML CanÃ´nico e Interativo (Golden Master)** foi implementado e validado em `Docs_inicial/construcao/prototipo/index.html` (com `css/prototipo.css`, `js/mock-data.js` e `js/app.js`), cobrindo as 4 famÃ­lias de usinagem, Ã¡rea ConfiguraÃ§Ãµes completa e todos os 6 cenÃ¡rios da Specification Sheet. As folhas estÃ¡ticas histÃ³ricas foram preservadas em `folhas-estaticas.html`.

**SessÃ£o de 08/09 (CorreÃ§Ã£o do Alerta de BalanÃ§o):** A direÃ§Ã£o de ajuste para o alerta de balanÃ§o (gatilho 5) foi alterada. O sistema parou de sugerir a reduÃ§Ã£o do prÃ³prio balanÃ§o â€” que frequentemente Ã© travado pela geometria da peÃ§a â€” e passou a orientar a reduÃ§Ã£o da **penetraÃ§Ã£o de trabalho (ae)**, que Ã© efetivamente ajustÃ¡vel e alivia a deflexÃ£o pela forÃ§a radial. **Emenda de 09/09/2026:** a primeira redaÃ§Ã£o apontava `fz`, a mesma grandeza que a segunda direÃ§Ã£o do painel manda aumentar â€” corrigida para `ae`, com o teto publicado de 25% do diÃ¢metro (Sandvik). O balanÃ§o passou a ser tratado como condiÃ§Ã£o de contorno. A regra de nÃ£o sugerir ajuste em condiÃ§Ãµes de contorno foi formalizada no `MVP` Â§7.4 e espelhada no `E4` Â§6. Textos unificados nos documentos de escopo, protÃ³tipo visual e dados mock. O caso de Mandrilar foi preservado (sem ajuste), sendo apenas documentado.

**SessÃ£o de 07/09 (2Âª) â€” a Ã¡rea ConfiguraÃ§Ãµes passou a editar de verdade.** Ela listava materiais e
ferramentas em **leitura**; agora edita as cinco grandezas de qualquer material (marca de *diferente de
fÃ¡brica*, retorno individual e *voltar tudo*), cria, edita e apaga ferramenta pelas **17 geometrias** do
`MAPEAMENTO_CAMPOS_FERRAMENTAS`, e traz o aviso do fornecedor (`ESCOPO_CONFIGURACOES` Â§2.2), que faltava.
Os `Â±` de rotaÃ§Ã£o e avanÃ§o andam **5% por toque** â€” era 10% â€”, com selo do ajuste, o valor calculado no
rodapÃ© do cartÃ£o e volta por eixo; `GABARITO_PROTOTIPO.md` **D7** e `MAPEAMENTO Â§4` foram emendados com a
decisÃ£o do Mestre de 07/09. SaÃ­ram `alert()` e `confirm()` nativos; entrou uma linha de status Ãºnica.
Quatro defeitos corrigidos no caminho: cÃ³pia rasa dos padrÃµes (editar um material destruÃ­a o prÃ³prio
valor de fÃ¡brica), ajuste zerado em silÃªncio ao voltar de ConfiguraÃ§Ãµes, recÃ¡lculo disparado de lÃ¡
quebrava a tela, e o `Â±` fora do campo nÃ£o tinha os 44 px de alvo. ~~**Fica aberto:** escolher uma
ferramenta cadastrada **dentro do cÃ¡lculo** (`ESCOPO_CONFIGURACOES` Â§4.1) nÃ£o existe no protÃ³tipo.~~
**Fechou em 08/09** â€” Ã© o CenÃ¡rio I do commit `5229898`: escolher a ferramenta carrega a geometria
dela, sem impor valor de corte. Coberto por teste.

**SessÃ£o de 08/09 (2Âª) â€” o alerta de espessura saiu do produto.** DecisÃ£o do Mestre: nÃ£o existe mais
alerta de espessura de cavaco em famÃ­lia nenhuma. Riscado e datado em `MVP Â§9.2` (gatilho 1a), `E4`
(gatilhos 1 e 11a), `CANONICO_LIMITES_E_ALERTAS Â§1.4` e `Â§5`, `CANONICO_FURACAO Â§1.2` e `Â§5`, `E1`,
`E2` e `E5`; no protÃ³tipo saÃ­ram a frase de espessura do cenÃ¡rio de referÃªncia e a linha "hÃ¡ mais uma
condiÃ§Ã£o ativa", que sÃ³ existia por causa dela (`80571ec`). Fica o cÃ¡lculo de `hm`/`hex` e a espessura
como resultado visÃ­vel. **SuÃ­tes seguem em 50/50 e regressÃ£o completa.**

**Estado da Ã¡rvore:** limpa apÃ³s o encerramento da sessÃ£o de 09/09/2026 (2Âª). A Fase 2 e a paleta nova foram commitadas em `1f71391`, `6f36784` e
`9524149`; a especificaÃ§Ã£o estrutural do painel entrou depois, na sessÃ£o (4Âª) â€” ver acima.

---

## SessÃ£o de 08/09 (3Âª) â€” a Fase 2 comeÃ§ou, e o Ciclo 1 passou por revisÃ£o

**NÃ£o commitado. Tudo local, por ordem do Mestre.**

O Gemini abriu a Fase 2 com `spec.md`, `design.md`, `tasks.md`, a toolchain (`package.json`,
`tsconfig.json`, `vitest.config.ts`) e um primeiro `src/core/calculator.ts`. A revisÃ£o tÃ©cnica de
08/09 encontrou o motor **fingindo calcular**: `hm`, `Pc` e `Mc` eram constantes literais escolhidas
para casar com o Ãºnico teste existente, comentadas no prÃ³prio arquivo como *"simplified for harness"*.
O teste passava sem validar nada.

**O que a revisÃ£o fez:** implementou a cadeia do `CANONICO_MOTOR_DE_CALCULO Â§1.4` de ponta a ponta,
mais a de furaÃ§Ã£o e o modo aÃ§o rÃ¡pido do `ESCOPO_BROCA_ACO_RAPIDO Â§2`; separou o core em
`types Â· materials Â· calculator Â· analyzer Â· adjust Â· display`; e trocou o teste Ãºnico por 48 testes,
verificados por mutaÃ§Ã£o â€” alterar uma fÃ³rmula quebra a suÃ­te.

**TrÃªs nÃºmeros do `spec.md` estavam errados** e foram corrigidos com a fonte ao lado, no `spec.md Â§4`:
`hm` 0,018 â†’ **0,029 mm** (o 0,018 era o exemplo tipogrÃ¡fico do `GABARITO D8`, nÃ£o um cÃ¡lculo),
`Pc` 0,42 â†’ **0,28 kW** e `Mc` 0,9 â†’ **0,60 NÂ·m**.

**DivergÃªncias protÃ³tipo Ã— canÃ´nico, registradas em `design.md Â§6` e nÃ£o corrigidas no protÃ³tipo:**
o painel devolve 509 rpm Â· 51 mm/min no caso Ã˜10 / `vc` 16, onde o caso verificador normativo do
`ESCOPO_BROCA_ACO_RAPIDO Â§2` manda **508 Â· 50** (a aritmÃ©tica de oficina trunca); e o `js/mock-data.js`
carrega `kc1.1`, `mc` e `vc` de partida prÃ³prios em 8 materiais, que nÃ£o sÃ£o os dos canÃ´nicos. O core
segue o canÃ´nico; o protÃ³tipo segue sendo o contrato do **painel**, nÃ£o fonte de nÃºmero.

**Ciclo 1 fechado** (TASK-001 a TASK-005). Ciclo 2 (IndexedDB) e Ciclo 3 (React) em aberto, com
TASK-006 a TASK-008 descritas em `tasks.md`. ValidaÃ§Ã£o: `npm run check` â€” 48/48 testes e tipos limpos.

## A paleta nova entrou no protÃ³tipo â€” decisÃ£o do Mestre, 08/09/2026

**`Docs_inicial/construcao/prototipo/` segue sendo o contrato do painel, agora com as cores novas.**
A paleta que estava na cÃ³pia `prototipo_fenix_colors` foi aplicada nele; a cÃ³pia foi para
`Docs_inicial/_arquivo/prototipo_fenix_colors/` com um `LEIA-ME` explicando por quÃª. **Uma pasta de
protÃ³tipo, nÃ£o duas** â€” era esse o risco de engano que a decisÃ£o fecha.

**SÃ³ cor mudou, e isso foi verificado antes de aplicar.** O diff dos dois CSS tem 65 linhas trocadas
e **nenhuma** propriedade de layout, tamanho ou tipografia â€” sÃ³ `background`, `color`, `border`,
`box-shadow` e os tokens de cor do `:root`. O `app.js` diferia em **uma** linha, que troca dois hex
literais por tokens. Depois de aplicar: **50/50 na suÃ­te dinÃ¢mica e regressÃ£o completa**, e conferÃªncia
visual nos CenÃ¡rios A e 3.

**A paleta:** marca passa de laranja `#E85D04` para azul-petrÃ³leo **`#0F3D5C`**; o laranja vira cor de
**aÃ§Ã£o** em trÃªs tokens novos (`--action-fill` `#C4720A`, `--action-hover`, `--action-active`), usados
sÃ³ no botÃ£o de calcular; fundo de pÃ¡gina de `#F1F5F9` para creme **`#F7F5F1`**; rampa de estado
repintada (normal `#1B6E5C`, atenÃ§Ã£o `#C4720A`, crÃ­tico `#B8461D`, info `#0F3D5C`).

### As duas pontas soltas foram fechadas â€” e uma delas escondia defeito

**A ponta dos hex remanescentes era menor do que parecia.** Dos onze usos, **dez estÃ£o na
`.demo-toolbar`** â€” o chrome do protÃ³tipo, a barra escura com seletor de cenÃ¡rio e botÃµes de
viewport. Ela Ã© escura de propÃ³sito, para ninguÃ©m confundir o andaime com o painel, e converter
aquilo para a paleta do produto seria erro, nÃ£o limpeza. Ficou com um comentÃ¡rio dizendo isso.
**Um Ãºnico uso era do produto** (`.hbtn:hover`) e virou token. Apareceu ainda um dÃ©cimo-segundo caso
que eu nÃ£o tinha visto: o halo do anel de foco estava no **Ã­ndigo da paleta anterior** enquanto o
traÃ§o jÃ¡ era petrÃ³leo â€” corrigido.

**A ponta do design system escondia trÃªs reprovaÃ§Ãµes de acessibilidade.** Ao medir a paleta nova
contra a rÃ©gua do prÃ³prio documento (WCAG AA), quatro tokens reprovavam:

| Token | Vinha | Medido | Passou a ser | Onde doÃ­a |
|---|---|---|---|---|
| `--tx-3` | `#75787E` | 4,07:1 | **`#696C71`** | unidade e legenda, 15 usos |
| `--tx-muted` | `#A6A8AC` | 2,38:1 | **`#696B6D`** | texto de espera do campo |
| `--border-control` | `#A6A8AC` | 2,38:1 (mÃ­n. 3) | **`#85868A`** | borda de todo controle, 11 usos |
| `--action-fill` | `#C4720A` | 3,65:1 com branco | **`#A96208`** | **o botÃ£o de calcular** |

O caso do laranja Ã© o mais instrutivo: o design system jÃ¡ registrava, desde sempre, que *"branco
sobre o laranja dÃ¡ 3,50:1 e reprova"*. O laranja saiu da identidade, voltou como cor de aÃ§Ã£o, e
trouxe o defeito de volta â€” agora no botÃ£o mais importante da tela. **A correÃ§Ã£o Ã© o menor
escurecimento que resolve, preservando a matiz;** `--action-hover` acompanhou para o hover continuar
perceptÃ­vel. Nenhuma outra cor foi tocada.

**Agora quem afere Ã© mÃ¡quina, nÃ£o documento.** Entrou
`Docs_inicial/construcao/prototipo/testes/test_contraste.js`, que lÃª os tokens direto do CSS e faz
duas coisas: mede cada par contra a **pior** superfÃ­cie em que ele aparece, e confere que o bloco
`:root` da Â§3 do design system nÃ£o divergiu do CSS. **Rode com `node <caminho>` a partir da raiz,
como as outras duas suÃ­tes.** Foi exatamente essa deriva nÃ£o vigiada que deixou o design system
descrevendo, por semanas, uma paleta que o produto nunca usou â€” sÃ³ `--brand-fill` coincidia.

**O `DESIGN_SYSTEM_FENIX.md` foi reconciliado**, e a mudanÃ§a maior nÃ£o Ã© de valor: **ele deixou de
arbitrar e passou a descrever.** A precedÃªncia agora estÃ¡ escrita lÃ¡ â€” o protÃ³tipo vence, e o
documento Ã© que estÃ¡ errado quando divergem. AlÃ©m da paleta, entraram os valores reais de raio,
transiÃ§Ã£o e altura do CTA, que tambÃ©m estavam desatualizados; a regra "marca Ã© uma cor sÃ³" virou
marca **e** aÃ§Ã£o, com token prÃ³prio para cada; e a Â§10 registra tudo, incluindo trÃªs coisas anotadas
e deliberadamente nÃ£o mexidas.

**Detalhe pequeno com histÃ³ria:** o exemplo de decimal do design system era `0,018 mm`. Foi dali que
o nÃºmero saiu para o `spec.md` como se fosse resultado de cÃ¡lculo, e custou uma correÃ§Ã£o. Virou
`0,060 mm`.

### Segunda passagem: as anotaÃ§Ãµes viraram decisÃ£o, e apareceram mais dois defeitos

O fechamento anterior deixou trÃªs itens "anotados, nÃ£o mexidos". **AnotaÃ§Ã£o em design system Ã© dÃ­vida
com juros** â€” descreve o defeito e nÃ£o o corrige, e quem lÃª depois nÃ£o sabe se foi decidido ou
esquecido. Por ordem do Mestre os trÃªs foram resolvidos, e a investigaÃ§Ã£o encontrou mais dois.

| # | Item | DecisÃ£o |
|---|---|---|
| 1 | `--tx-muted` praticamente idÃªntico a `--tx-3` | **Aposentado.** Os dois usos passam a `--tx-3`; a distinÃ§Ã£o do texto de espera vira **peso** (400 Ã— 700), que o CSS jÃ¡ aplicava |
| 2 | `--action-fill` e `--st-warn-accent` na mesma matiz (34Â°) | **Cor mantida, colisÃ£o fechada por regra:** entrou no checklist *nenhum botÃ£o preenchido de aÃ§Ã£o dentro da Ã¡rea de resultado*. O que faltava nÃ£o era outra cor â€” era a regra que impede os dois de se encontrarem |
| 3 | `--accent-cyan` "sÃ³ funciona sobre a marca" | **Renomeado para `--brand-accent`.** O nome mentia duas vezes: `#E4BF90` Ã© dourado (matiz 34Â°), nÃ£o ciano, e o "sÃ³ sobre a marca" era acaso. Agora Ã© contrato, e a auditoria afere o par (6,60:1) |
| 4 | **achado** â€” `--st-info-accent` era `#0F3D5C`, **hex idÃªntico ao `--brand-fill`** | **Rampa de informaÃ§Ã£o neutralizada.** Duas barras laterais de 4px, mesma cor, sentidos diferentes: "identidade do sistema" e "informaÃ§Ã£o". InformaÃ§Ã£o neutra nÃ£o Ã© diagnÃ³stico, entÃ£o perdeu a matiz de estado e aponta para os neutros |
| 5 | **achado** â€” `--accent-blue` `#57778C` **reprovava** | **Escurecido para `#506E82`.** Passou batido em duas auditorias porque parecia decorativo: Ã© **texto** em trÃªs botÃµes de apoio, e dava 4,36:1 sobre a pÃ¡gina |

A separaÃ§Ã£o entre a barra de informaÃ§Ã£o e a de marca agora Ã© de **croma** â€” 7% de saturaÃ§Ã£o contra
84%. Cinza ao lado de azul-petrÃ³leo se distingue Ã  primeira vista, mesmo em 4px. Conferido na tela.

**A auditoria foi ampliada para nÃ£o repetir o descuido:** `--accent-blue` e `--brand-accent` entraram
na lista aferida, e o script passa a resolver alias `var()` â€” que Ã© como a rampa de informaÃ§Ã£o se
escreve agora. Token citado na auditoria que suma do CSS falha com o nome dele, nÃ£o com exceÃ§Ã£o.

### As folhas `.dc.html` â€” marcadas, e deliberadamente nÃ£o repintadas

**Repintar foi considerado e descartado, com razÃ£o tÃ©cnica:** elas divergem em **conteÃºdo**, nÃ£o sÃ³ em
cor â€” o passo dos `Â±` aparece como 10% onde a emenda de 07/09 mudou para 5%, os CenÃ¡rios A a I e a
Ã¡rea ConfiguraÃ§Ãµes editÃ¡vel nÃ£o existem nelas, e **os nÃºmeros desenhados sÃ£o preenchimento de maquete
que nÃ£o confere com a cadeia canÃ´nica** (a folha `Main` mostra `hex` 0,036 e `Pc` 0,06 kW). Repintar
as faria **parecer atuais sem serem** â€” e artefato obsoleto com cara de novo Ã© mais perigoso que um
com cara de velho. A paleta antiga Ã©, na prÃ¡tica, o aviso mais eficaz de que aquilo nÃ£o Ã© o produto.

O que foi feito: **as dez folhas ganharam uma faixa de aviso na prÃ³pria face**, datada, listando as
divergÃªncias e dizendo que nenhum nÃºmero dali pode ser copiado para especificaÃ§Ã£o, teste ou cÃ³digo â€”
que Ã© exatamente o erro que jÃ¡ custou uma correÃ§Ã£o no `spec.md`. Quem chega por link direto de
qualquer documento vÃª o aviso; nÃ£o depende de abrir o Ã­ndice. O `folhas-estaticas.html` recebeu o
mesmo aviso, ganhou a folha `Fresar-Variantes` que faltava, e o link no protÃ³tipo passou de
"Artboards EstÃ¡ticos" para **"Artboards HistÃ³ricos"**.

**ValidaÃ§Ã£o:** 50/50 dinÃ¢mica Â· regressÃ£o completa Â· auditoria de paleta aprovada (contraste +
sincronia) Â· core 48/48 e tipos limpos. Auditoria verificada por mutaÃ§Ã£o nas duas metades, e a rampa
de informaÃ§Ã£o conferida na tela.

**NÃ£o hÃ¡ pendÃªncia aberta nesta frente.** O Ciclo 2 e o Ciclo 3 da Fase 2 nÃ£o sÃ£o pendÃªncia: sÃ£o a
sequÃªncia do trabalho, descrita em `tasks.md`.

**RegressÃ£o corrigida no caminho:** o `"type": "module"` que a Fase 2 pÃ´s no `package.json` da raiz
quebrava as suÃ­tes do protÃ³tipo, que sÃ£o CommonJS e rodam a partir da raiz. Resolvido com um
`testes/package.json` de duas linhas devolvendo o escopo CommonJS Ã quela pasta â€” e sÃ³ a ela.
Entrou tambÃ©m `.claude/launch.json`, que serve o protÃ³tipo em `http://localhost:8765` para conferÃªncia
visual (`npx http-server`).

---

## SessÃ£o de 09/09/2026 (2Âª) â€” a direÃ§Ã£o do alerta de balanÃ§o, corrigida duas vezes

**O achado do Mestre:** o painel *"o que mexer"* mandava *"reduza o balanÃ§o (L) para 40 mm"* como a
Ãºnica direÃ§Ã£o que resolvia o alerta de vibraÃ§Ã£o. **O balanÃ§o nÃ£o Ã© ajustÃ¡vel** â€” Ã© imposto pela
profundidade da peÃ§a. Quem pudesse encurtar jÃ¡ teria encurtado. DireÃ§Ã£o sobre variÃ¡vel travada Ã©
conselho vazio, e era a Ãºnica oferecida para aquele alerta.

**Primeira correÃ§Ã£o (`1a47d91`, executada por outro agente): acertou o alcance e errou a redaÃ§Ã£o.**
Trocou `L` por `fz` â€” a **mesma grandeza que a segunda direÃ§Ã£o do painel manda aumentar**. Duas setas
opostas sobre o mesmo parÃ¢metro, lado a lado, contra a regra que a `E4` Â§6.2 jÃ¡ tinha. Ainda: chamou
`fz` de *"carga por passe"*, termo que nÃ£o existe no glossÃ¡rio, enquanto o mesmo `fz` aparecia como
*avanÃ§o por dente* duas linhas abaixo; e o texto ficou sem alvo numÃ©rico e sem procedÃªncia.

**Segunda correÃ§Ã£o (`5c30011` e `933cdba`, decisÃ£o do Mestre de 09/09):**

| O que | Onde ficou |
|---|---|
| **Fresar:** a direÃ§Ã£o incide sobre a **penetraÃ§Ã£o de trabalho (ae)**, que governa a forÃ§a radial â€” a que fleta a ferramenta. Teto publicado: `ae â‰¤ 25% Ã— D` para balanÃ§o longo (Sandvik Coromant) | `MVP` Â§7.4 (2 exemplos), `E4` Â§6.1, `BRIEF`, `app.js`, `mock-data.js` |
| **Mandrilar:** o alerta de balanÃ§o **nÃ£o disparava** â€” o painel fixava `NORMAL` e escrevia *"dentro da zona de rigidez ideal"* mesmo com `L/D` acima do limiar, enquanto o resumo jÃ¡ pintava o nÃºmero. Corrigido, com a direÃ§Ã£o sobre **profundidade por passe (ap)**, piso publicado de `2/3 Ã— rÎµ` | `app.js`, bloco de mandrilar |
| **A regra que impede a recaÃ­da:** direÃ§Ã£o sÃ³ incide sobre grandeza que o operador ajusta no contexto declarado; entrada imposta pela peÃ§a Ã© **condiÃ§Ã£o de contorno**, nÃ£o alvo | `MVP` Â§7.4 regra 6, `E4` Â§6 regra 7 |
| **O que o sistema nÃ£o sabe, declarado:** nÃ£o existe valor publicado para *quanto* reduzir abaixo do teto. A direÃ§Ã£o nomeia a grandeza, cita a referÃªncia e deixa a consequÃªncia aparecer no recÃ¡lculo | nota de procedÃªncia no `MVP` Â§7.4 e `E4` Â§6 |

**RotaÃ§Ã£o continua proibida como direÃ§Ã£o anti-vibraÃ§Ã£o** â€” exigiria dados modais que nÃ£o existem
(`MVP` Â§7.3, `E4` Â§5.2). A menÃ§Ã£o do Mestre a "diminuir a rotaÃ§Ã£o" foi ilustrativa, nÃ£o ordem.

**Dois defeitos de infraestrutura, achados e fechados:** a liÃ§Ã£o `L32` e a resposta do executor
tinham sido gravadas em **UTF-16** â€” arquivos ilegÃ­veis por `cat`, reconstruÃ­dos em UTF-8. E a causa
raiz do diff de 1.480 linhas para 14 de conteÃºdo era o `core.autocrlf=true` global do Windows: entrou
um `.gitattributes` com `* text=auto eol=lf`.

**Verificado no protÃ³tipo servido em `localhost`, nÃ£o sÃ³ no cÃ³digo:** com `L/D` 4,5 o alerta de
mandrilar abre e a direÃ§Ã£o aparece primeiro com o selo *"resolve o alerta"*; com `L/D` 2,3 volta a
`NORMAL` e a direÃ§Ã£o some. `npm run check` verde â€” 71 testes.

> **O que isto NÃƒO Ã©: sistema funcionando.** A correÃ§Ã£o vive em documento e protÃ³tipo. O protÃ³tipo
> roda com `mock-data.js` â€” dados falsos. O `src/core/analyzer.ts` gera o alerta de balanÃ§o, mas
> **nÃ£o gera direÃ§Ã£o nenhuma**: o bloco *"o que mexer"* nÃ£o existe no motor. Quando o Ciclo 3 (casca
> React) for construÃ­do, esta correÃ§Ã£o precisa ser implementada de novo, no cÃ³digo real.

**Ordem do documento de comunicaÃ§Ã£o:** o arquivo
`comunicacao/2026-09-08_ICARO_DIRECAO_COM_BALANCO_TRAVADO.md` teve o nome do agente removido do
cabeÃ§alho â€” o Mestre nÃ£o designou destinatÃ¡rio. O nome do arquivo ainda carrega `ICARO`, por
histÃ³rico; renomear Ã© decisÃ£o dele.

---

## PrÃ³ximo passo â€” quando o Mestre mandar

**PARE AQUI.** Esta lista Ã© inventÃ¡rio, nÃ£o fila de execuÃ§Ã£o â€” ela existe para vocÃª saber o que hÃ¡,
nÃ£o para escolher. Nenhuma delas comeÃ§a sem o Mestre **nomear a tarefa no chat**. Se ele disse sÃ³
"continuar" e nÃ£o hÃ¡ tarefa em trÃ¢nsito em `Skinner/tarefas/ABERTAS.md`, o certo Ã© resumir o estado,
dizer qual seria o prÃ³ximo passo em uma linha, e esperar. NÃ£o decida qual, nÃ£o escreva prompt, nÃ£o
despache.

1. ~~Terminar a correÃ§Ã£o do bloqueio~~ â€” fechou em `cc438a5`.
2. ~~CanÃ´nico da R8 e as 15 emendas da Â§6~~ â€” canÃ´nico fechou em `fa54d9c`; **emendas A1â€“A9 e B1â€“B6 aplicadas em 07/09/2026**. ContradiÃ§Ã£o com o canÃ´nico de limites e alertas resolvida.
3. **Consertar o protocolo de pesquisa** â€” ele Ã© do commit inicial, 12 dias antes de a equipe existir,
   e ainda manda o Mestre colar texto Ã  mÃ£o.
4. ~~**Dois aprendizados pendentes**~~ â€” **aplicados em 07/09/2026** na skill `par-cego-pesquisa` (Trava 4 reformulada para persistÃªncia incremental e Passo 1 com diretrizes de autonomia/precedÃªncia documental).
5. ~~**Plano da fase de construÃ§Ã£o.**~~ **Retirado da lista em 08/09/2026 â€” decisÃ£o do Mestre: a
   construÃ§Ã£o quem decide Ã© ele.** Nenhum agente planeja arquitetura, stack ou ordem por conta prÃ³pria.

**Descartado em 08/09/2026, a pedido do Mestre â€” nÃ£o reabrir sem ordem dele:** implementar alerta de
espessura no protÃ³tipo (o alerta foi revogado, ver "Onde paramos"), uniformizar a data dos stubs da
varredura E0â€“E7, e quebrar o `SKINNER.md` em nÃºcleo e detalhe.

---

## Fator de seguranÃ§a â€” lente de exibiÃ§Ã£o (decisÃ£o de 01/09/2026)

**Dono do modelo: `E2` Â§7.1â€“Â§7.3.** O que a retomada precisa para nÃ£o errar: Ã© **lente de exibiÃ§Ã£o**
(`% do calculado`, padrÃ£o `100 %`), nÃ£o margem que infla esforÃ§o e nÃ£o limitador â€” acima de 100 % Ã©
permitido. Escala os resultados; **nÃ£o** escala o que o operador digitou, o que dispara alerta, nem o
alerta. NÃ£o Ã© "controle Ãºnico de agressividade" (anti-requisito).

---

## Fases fechadas â€” nÃ£o releia, estÃ¡ tudo em commit e diÃ¡rio

| O que fechou | Quando | Onde estÃ¡ registrado |
|---|---|---|
| Protocolo de convergÃªncia, procedÃªncia removida, Ã¡rea ConfiguraÃ§Ãµes, pendÃªncias P-1 a P-3 | 30/08â€“01/09 | diÃ¡rio `2026-09-01` Â· assunto `fenix-procedencia.md` |
| Redesign do painel (5 artboards) Â· vocabulÃ¡rio do `vc` Â· R8 em par cego | 03/09 | `b3199df`, `f5a6078`, `8cbe0b8` |
| Faixa de diÃ¢metro: alerta, nunca bloqueio | 04/09 | `cc438a5` |
| **SÃ©timo canÃ´nico â€” furaÃ§Ã£o, roscamento, mandrilamento** | 04/09 | `fa54d9c` |
| **Modo de partida da broca de aÃ§o rÃ¡pido** â€” R9, canÃ´nico, escopo e duas folhas | 05/09 | `4b11b12` Â· diÃ¡rio `2026-09-05` |
| **CanÃ´nicos de Ã‚ngulos HSS e Vc 1045** â€” dados do Mestre canonizados | 07/09 | `CANONICO_ANGULOS_PONTA_BROCAS_HSS.md` Â· `CANONICO_VELOCIDADES_CORTE_SAE_1045.md` |
| **Fase 1 e ProtÃ³tipo CanÃ´nico Interativo** â€” 4 artefatos em `docs/fase1/` e Golden Master interativo em `construcao/prototipo/index.html` | 07/09 | `docs/fase1/` Â· `Docs_inicial/construcao/prototipo/` |
| **ConfiguraÃ§Ãµes editÃ¡vel e ajuste de 5%** â€” materiais, 17 geometrias de ferramenta, margem e broca sem trava muda | 07/09 (2Âª sessÃ£o) | `js/app.js` Â· `css/prototipo.css` Â· `js/mock-data.js` Â· `GABARITO Â§D7` |
| **EspecificaÃ§Ã£o estrutural do painel** â€” cinco peÃ§as agnÃ³sticas de aparÃªncia, doze achados levantados | 08/09 (5Âª sessÃ£o) | `Docs_inicial/construcao/design-system/` |
| **As doze pendÃªncias, limpas** â€” 7 defeitos corrigidos (5 no protÃ³tipo, 2 na casca), 3 divergÃªncias reconciliadas, 2 viradas TASK-014 e TASK-015 | 09/09 (4Âª sessÃ£o) | `design-system/00_LEIA-ME.md` Â§5 Â· `testes/test_integridade.js` Â· `tasks.md` |

A rÃ©gua do protÃ³tipo Ã© o `GABARITO_PROTOTIPO.md` **v1.6**; o objeto medido sÃ£o as 10 folhas `.dc.html`
em `construcao/prototipo/`. HistÃ³rico completo dos commits: `git log`.

---
## A equipe

**Fonte Ãºnica: `EQUIPE.md`, na raiz.** Quem Ã© quem, modelo de cada um, as cartas e o procedimento de
endereÃ§amento moram lÃ¡ â€” nÃ£o sÃ£o repetidos aqui.

Em uma linha: Skinner orquestra (Opus), Dexter desenha (Opus), Ãcaro documenta (Opus), Morfeu executa
e verifica (Sonnet). **Quatro sessÃµes separadas, abertas.** Para falar com uma: `list_sessions` (o
tÃ­tulo identifica o agente, o `cwd` confirma o projeto) â†’ `mcp__ccd_session_mgmt__send_message`, **com
aceite de volta obrigatÃ³rio**. Despachar tarefa jÃ¡ aprovada nÃ£o se pergunta ao Mestre
(`Skinner/SKINNER.md` Â§3).

Servidor de visualizaÃ§Ã£o dos protÃ³tipos: `python -m http.server 8899` em
`Docs_inicial/construcao/prototipo/` â†’ `http://localhost:8899/`.

---

## Pontas soltas para o Mestre

- ~~A faixa de velocidade de corte do aÃ§o 1045~~ â€” **canonizada em 07/09/2026** pelo Mestre (`CANONICO_VELOCIDADES_CORTE_SAE_1045.md`, status: sem fonte bibliogrÃ¡fica externa declarada).
- ~~Ã‚ngulo de ponta da broca de aÃ§o rÃ¡pido~~ â€” **canonizado em 07/09/2026** pelo Mestre (`CANONICO_ANGULOS_PONTA_BROCAS_HSS.md`, tabela completa por material, dureza e diÃ¢metro).
- ~~Os stubs de aposentadoria da varredura E0â€“E7 datados 31/08 em vez de 01/09~~ e ~~quebrar o
  `SKINNER.md` em nÃºcleo e detalhe~~ â€” **descartados pelo Mestre em 08/09/2026.** Ver a nota no fim da
  seÃ§Ã£o "PrÃ³ximo passo".

---

## Regras que governam qualquer continuaÃ§Ã£o

- ProcedÃªncia, marca, fonte, extrapolado e margem: apagar **sem rastro**. MudanÃ§a de decisÃ£o de
  produto: **riscar e anotar com data**. NÃ£o sÃ£o a mesma coisa.
- **NÃ£o renumerar** regra, seÃ§Ã£o ou gatilho. Buraco fica â€” renumerar quebra referÃªncia em documento
  que a varredura nÃ£o alcanÃ§a.
- **Alerta de seguranÃ§a nÃ£o Ã© procedÃªncia.** Ã‰ o erro mais fÃ¡cil de cometer numa varredura por
  palavra-chave.
- A regra de fonte vale sÃ³ para **fÃ³rmula, constante do motor de cÃ¡lculo e limiar derivado de
  constante fÃ­sica** (decisÃ£o do Mestre, 01/09). NÃ£o vale para
  decisÃ£o de escopo, nome, vocabulÃ¡rio, limiar de julgamento de produto, nem para o operador dentro do
  produto. Nos `canonicos/` a regra Ã© integral.
- **Corrigir antes de auditar** quando o objeto jÃ¡ vai mudar.

---

## SessÃ£o de 08/09/2026 (4Âª) â€” Ciclo 2 concluÃ­do

**O que foi entregue:** Camada de infraestrutura de persistÃªncia (IndexedDB).
- `TASK-006` a `TASK-008` (Ciclo 2 do `tasks.md`) concluÃ­das seguindo TDD restrito.
- Implementado `src/core/storage.ts` usando `idb` para persistir dados editados do usuÃ¡rio sobre os dados de fÃ¡brica (`materials`, `config`).
- Implementado repositÃ³rio de geometrias e catÃ¡logos em `src/core/tools.ts` consolidando o `MAPEAMENTO_CAMPOS_FERRAMENTAS Â§2`.
- SuÃ­te do Vitest rodou com **60/60** testes passando (em 6 arquivos), provando o comportamento de storage isolado e regras geomÃ©tricas sem depender de DOM ou rede (usando `fake-indexeddb`).
- O sistema agora possui a casca de persistÃªncia e base de ferramentas necessÃ¡ria para iniciar o **Ciclo 3: ApresentaÃ§Ã£o (React UI)**.