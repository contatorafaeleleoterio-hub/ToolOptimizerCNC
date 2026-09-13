# Inventário — dados da indústria CNC dispersos

**Skill:** `dados-industria-cnc`, modo 1 (inventariar). **Data:** 27/08/2026.
**Não move, não copia, não converte, não decide.** O que entra no corpus é decisão do Mestre, na etapa seguinte.

**Varrido:** 6 projetos — `Fenix`, `ToolOptimizerCNC`, `monetizaCNC`, `OrcaCNC`, `MestreCNC`,
`Sistema_verificador_codigos_cnc`. Três blocos de assunto: **corte** (rosca, kc1.1/mc, vc, geometria),
**custo/produção** (densidade, potência, tempo, preço), **código G** (Fanuc, manuais).
**Método:** nome → grep → leitura de cabeçalho. Binário (`.xlsx/.pdf/.docx/.png`) catalogado por
nome, aba e cabeçalho — extração célula a célula é etapa própria.

**Nenhum arquivo de origem foi tocado** — ver §9.

---

## 1. Resumo (5 linhas)

1. **A melhor fonte já é do Fenix.** Os 6 canônicos (camada A) têm procedência por valor e rótulo de confiança; são a régua. Todo o resto está abaixo disso.
2. **O ativo exclusivo do Mestre é o chão de fábrica** — ~15 planilhas e PDFs de parâmetros reais (cabeçote CAB, fresa esférica/topo, alto avanço) em `monetizaCNC`. É a única coisa publicável sem pedir licença a ninguém, e nenhum concorrente tem.
3. **O `ToolOptimizerCNC` roda com dado que o Fenix já rejeitou.** `src/data/materials.ts` fixa `kc1.1` como ponto único, e os 3 valores marcados `validado` (aços 1020/1045/304) são exatamente os pares Diniz que a decisão D7 removeu do projeto.
4. **Custo/produção rende pouco.** O `OrcaCNC` só contribui 11 densidades de material (sem fonte). Potência e rendimento não existem lá como constante — são campos que o usuário preenche.
5. **Dois padrões de decadência confirmados:** `DADOS_TECNICOS_KIENZLE_E_VC.md` tem duas cópias divergentes dentro do `ToolOptimizerCNC`; o manual Fanuc está byte a byte idêntico em 2 projetos (e mais 4 cópias internas num deles).

---

## 2. Catálogo por artefato

Camadas: **A** validado · **B** estruturado · **C** bruto · **D** adjacente · **E** descartado.

### Fenix — camada A (a régua)

| Artefato | Conteúdo | Volume | Procedência | Licença |
|---|---|---|---|---|
| `Docs_inicial/canonicos/CANONICO_MOTOR_DE_CALCULO.md` | `kc1.1`/`mc` por 13 materiais (faixa + fonte por linha), afinamento de cavaco, `De` esférica, cadeia força/potência/torque, `η` | 180 l | Por valor. Walter *Technical Compendium* 2025 F 9, + corroboração acadêmica nomeada | Citável |
| `…/CANONICO_VELOCIDADES_E_AVANCOS.md` | `Vc` (sem faixa universal — ponto de partida condicionado), razão acabamento/desbaste, `fz` discreto por ferramenta | 204 l | Por valor. R4 par cego (handbook × catálogo) | Citável |
| `…/CANONICO_GEOMETRIA_DE_CORTE.md` | `ap` acabamento por estratégia, faixa de diâmetro, multiplicadores geométricos | 113 l | Por valor. R1 | Citável |
| `…/CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` | matriz tipo × substrato, `E` do metal duro (580 GPa, CONSENSO), revestimento como filtro | 199 l | Por valor. R3 par cego | Citável |
| `…/CANONICO_LIMITES_E_ALERTAS.md` | `ae/D`, janela de `Vc`, `L/D`, viga escalonada, teto de aproveitamento | 245 l | Por valor. R5 + cruzamentos | Citável |
| `…/CANONICO_DEFLEXAO_E_VIDA.md` | viga escalonada `δ`, `De/D=0,80`, **lacunas declaradas:** `n` de Taylor, `Fr/Fc` | 217 l | Por valor. R6 + 2 verificações; lacunas nomeadas | Citável |
| `Docs_inicial/pesquisa/RESPOSTA_R*.md` + `VALIDACAO_R*.md` | retornos crus + auditorias das 6 rodadas | ~30 arq | Registro de procedência (nunca editado) | Uso interno |
| `Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md` §11.1 | 2ª tabela `kc1.1`/`mc` — **valores legados sem fonte** | tabela | ⚠ ausente (ver conflito C3) | — |

### ToolOptimizerCNC — camada B

| Artefato | Conteúdo | Volume | Procedência | Licença |
|---|---|---|---|---|
| `src/data/materials.ts` | 9 materiais: `kc1_1` (**ponto único**), `mc`, `vcRanges` (3 operações), dureza HB/HRC, grupo ISO. 3 `validado`, 6 `estimado` | 141 l | Cabeçalho cita `docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md` + `PRD_Velocidades_Corte_CNC.md` — não por valor | Citável / ver C2 |
| `src/data/tools.ts` | `DIAMETROS_PADRAO = [6,8,10,12,16,20]`, `Z=4` para toroidal/esférica/topo, raio de quina | 42 l | Cabeçalho cita `docs/specs/PRD_MASTER.md` | Citável |
| `src/data/operations.ts` | `apMaxMult` (1,0 / 0,5 / **0,3**) e `fzMult` (1,0 / 0,7 / 0,5) por operação | 38 l | idem PRD_MASTER | Citável / ver C6 |
| `docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md` | Kienzle: fórmula, 9 materiais, casos resolvidos. Autor Rafael, 07/02/2026 | 743 l / 24 KB | "Literatura técnica (DINIZ, Metzner)… fabricantes como Sandvik, Kennametal" — vago | Citável |
| `DOCS_TREINAMENTO_RAG/DADOS_TECNICOS_KIENZLE_E_VC.md` | **2ª cópia, conteúdo diverge** (md5 `8fa5ee17` × `a1537e69`), 743 l | 24 KB | idem | Citável / ver C9 |
| `docs/technical/PRD_Velocidades_Corte_CNC.md` (+ cópia RAG divergente) | metodologia de faixas de `Vc` | 634 l ×2 | própria | Citável / ver C9 |
| `docs/technical/ESPECIFICACAO_TECNICA_CONSOLIDADA.md` | consolidação de fórmulas + constantes | 377 l | própria | Uso interno |
| `docs/technical/CASOS_TESTE_REFERENCIA.md` | valores de referência para teste | 285 l | própria | Livre (teste) |
| `docs/DOSSIE_CALCULADORA_PARAMETROS.md` (untracked) | levantamento do ToolOptimizer, 16/08/2026 — insumo do próprio Fenix | 622 l | levantamento, não fonte | Uso interno — **camada E** |
| `docs/_archive/superseded/PESQUISA_VC_VALIDADA.md` · `MODELO MATEMÁTICO FORMAL.md` | pesquisa de `Vc` e modelo antigos, arquivados | 132 l + | própria, superada | Uso interno — **camada E** |

### monetizaCNC — camada C (`ativos/docs_usinagem/`)

**`_entrada/` — 45 arquivos, 5,7 MB, bruto.** **`_saida/` — 14 `.md` consolidados** (untracked), com nota de origem **por documento**, não por valor.

| Grupo (`_entrada`) | Arquivos | Conteúdo | Procedência | Licença |
|---|---|---|---|---|
| **Cabeçote alto avanço** | `PARAMETROS CAB AUTO AVANÇO R1.6.txt`, `ATUALIZADO … R1.6.txt`, `PARAMETRO DE CORTE CABEÇOTE.xlsx`, `Parametros Cab R1,6.xlsx`, `PARAMETROS CAB50 BT40/BT50 …pdf`, `Pesquisa parametro cab50 R3.docx` | CAB 16–50, R1,6/R3, cone BT40/BT50: rotação, avanço, incremento, ap/faca, por comprimento | **Medição própria do Mestre** (chão de fábrica) | **Livre** |
| **Fresa esférica / topo por balanço** | `ESF ACAB/SEMI.pdf`, `ESF1/ESF2 SHIRINK/TURBINA.pdf`, `TOPO ACAB/SEMI.pdf`, `PARAMETRO FRESA ALTO AVANÇO MATERIAL 2738.txt` | S/F/AP por diâmetro e balanço, material 2738 | **Medição própria** | **Livre** |
| **Brocas** | `BROCA GUHRING.xlsx`, `BROCA TEMAX.xlsx`, `Broca Metal Duro.xlsx`, `Tabela de Broca Metal Duro.docx` | RPM e avanço por diâmetro | Catálogo de fabricante (Guhring, Temax) | Citável / Restrito |
| **Alargador / apalpador / relógio** | `ALARGADOR.xlsx`, `RELOGIO_APALPADOR.xlsx` | parâmetros de alargador; leitura de apalpador | mista | Citável |
| **Rosca** | `Roscas.xlsx`, `Tabela de Roscas (Para) Furos.docx`, `Tabela de roscas Rafael.docx`, `Tabela de Roscas Furos.png`, `Tabela (para usar) pente de rosca.docx`, `Tabela pente de rosca.xlsx` | furo prévio por M×passo; dimensões do pente de rosca | DIN 13/ISO 724 (padrão) **+ pente de rosca = medição própria** | Restrito (norma) / **Livre** (pente) |
| **Tolerâncias** | `Tolerancias eixo h7.jpg`, `Tolerancias furos h7.jpg` | desvios ISO furo/eixo | Norma ISO 286 | Restrito (norma) |
| **Código G / Fanuc** | `Manual_Programacao_Fanuc_CNC.md` (1326 l), `Guia Rápido de Códigos Fanuc.docx`, `Códigos CNC Mais Usados.docx`, `manual de programação CNC Fresadoras comando Fanuc.md`, `Programação CNC Fanuc – Base de Conhecimento.md`, `manual-de-programacao-para-centros-de-usinagem.pdf` | tabelas G/M, ciclos fixos, macros, compensações | Manual de comando | **Restrito** — não publicar |
| **CAM (software terceiro)** | `MANUAL_MACHINING_STRATEGIST_AUTENTICO_1.md` (4522 l) | manual do Machining Strategist reconstruído | software de terceiro | **Restrito** |
| **Processo / prosa** | `Guia Essencial de Parâmetros de Corte…md`, `Processo de Usinagem Completo.docx`, `Checkliste…docx`, `Check list - Ponte Rolante.pdf`, `notas de usinagem.txt`, `ideias de artigo.txt`, `pronpt para processo…docx`, `Novo(a) Planilha…xlsx` | texto explicativo, checklists, ideias de artigo | própria / didático | Livre — baixa densidade de dado — **camada E** |
| **`_saida/` consolidado** | `00`–`13` (`.md`) | 46 fontes → 13 temas, com "Origem" por doc | **por documento, não por valor** | mista — herda do que consolidou |

### OrcaCNC — camada D (`src/` inteiro untracked)

| Artefato | Conteúdo | Procedência | Licença |
|---|---|---|---|
| `src/domain/models/material.ts` | **11 densidades** (`densidadeKgDm3`): aços 7,85 · D2 7,70 · inox 304 7,93 / 316 7,98 · Al 2,70 · bronze 8,80 · latão 8,50 · nylon 1,14 | ⚠ **sem fonte** | Livre (fato físico) |
| `src/domain/calculation/material-peso.ts` | peso = volume (geometria) × densidade × preço/kg | fórmula (calculável) | Livre |
| `src/domain/models/maquina.ts` | campos `eficiencia`, `consumoKw`, `tarifaKwh` — **entrada do usuário, sem default** | — | — |
| `src/domain/calculation/motor.ts` · `docs/03-especificacao-de-calculo.md` | cálculo de **custo/preço/margem/markup** — lógica de negócio, zero constante de usinagem | própria | Uso interno — **camada E** para o corpus técnico |

### MestreCNC · Sistema_verificador_codigos_cnc — camada E

| Projeto | O que tem | Veredito |
|---|---|---|
| `MestreCNC` | `pesquisa site usingem gemini.md` (86 l) — pesquisa de mercado/SEO. Cita "Kienzle" só ao descrever estratégia de concorrente | **Sem dado técnico.** Descartar |
| `Sistema_verificador_codigos_cnc` | `Manual_Programacao_Fanuc_CNC.md` (**5 cópias**, idêntico ao de `monetizaCNC`), specs de biblioteca de códigos G, `flownc/ui` | Só duplicata do manual Fanuc (Restrito) + código de app. Nada novo. Descartar, **exceto** registrar a duplicata (C10) |

---

## 3. Catálogo por assunto

| Assunto | Fontes | Concordam? | Procedência? | Natureza |
|---|---|---|---|---|
| **kc1.1 / mc** | 3: `materials.ts` (9 mat, ponto) · `CANONICO_MOTOR` §2.1 (13 mat, faixa) · `MVP` §11.1 (legado) | **Não** — ver C1, C2, C3 | Só o canônico, por valor | Empírico |
| **Faixas de Vc** | 4: `materials.ts` `vcRanges` · `CANONICO_VELOCIDADES` · `monetizaCNC _saida/05` + `_entrada` · `PRD_Velocidades_Corte_CNC.md` | Parcial — canônico nega faixa universal; `materials.ts` afirma | Canônico sim; `materials.ts` não | Empírico |
| **Geometria de ferramenta** (Ø, Z, raio) | 3: `tools.ts` · `CANONICO_GEOMETRIA` + `CANONICO_FERRAMENTAS` · `monetizaCNC` (fresas) | Divergem na faixa de Ø — ver C5 | mista | mista |
| **Cabeçote alto avanço** | 1: `monetizaCNC _entrada` (CAB) + `_saida/07` | fonte única | medição própria | Empírico — **exclusivo** |
| **Fresa esférica/topo por balanço** | 1: `monetizaCNC _entrada` (ESF/TOPO) + `_saida/06` | fonte única | medição própria | Empírico — **exclusivo** |
| **Brocas rpm/avanço** | 1: `monetizaCNC` (Guhring/Temax) + `_saida/08` | fonte única | catálogo de fabricante | Empírico |
| **Rosca — furo prévio** | 3: `monetizaCNC _saida/10` + 6 `_entrada` · (Fenix não tabela — E7 "por passo+diâmetro") | consistente (DIN 13) | norma | **Calculável** |
| **Rosca — pente de rosca** | 1: `monetizaCNC` (`Tabela pente de rosca.xlsx` + docx) | fonte única | medição própria | Empírico — **exclusivo** |
| **Densidade de material** | 1: `OrcaCNC material.ts` (11) | valores são padrão de handbook | **sem fonte nominal** | Fato físico (livre) |
| **Rendimento η** | 2: `CANONICO_MOTOR` §2.2 (0,80 pub / 0,85 projeto) · `OrcaCNC maquina.ts` (campo, sem default) | — | canônico sim | Empírico / decisão |
| **E, deflexão, n de Taylor** | 1: `CANONICO_DEFLEXAO_E_VIDA` | — | por valor; `n` e `Fr/Fc` = lacuna declarada | Empírico |
| **Código G/M Fanuc** | 3 projetos, cópias idênticas — ver C10 | idêntico | manual de comando | Referência (Restrito) |
| **Tolerâncias ISO furo/eixo** | 2: `monetizaCNC _saida/11` + 2 jpg | consistente | norma ISO 286 | **Calculável** |
| **Estratégias CAM** | 1: `MANUAL_MACHINING_STRATEGIST` + `_saida/13` | fonte única | software de terceiro | Referência (Restrito) |
| **Custo / tempo / preço** | 1: `OrcaCNC` | — | própria | Lógica de negócio — fora do corpus técnico |

---

## 4. Lista de conflitos

Nenhum arbitrado. Cada linha traz os dois valores e os dois caminhos.

**C1 — Natureza do dado `kc1.1`/`mc`: ponto único × faixa.**
`ToolOptimizerCNC/src/data/materials.ts:16` grava `Aço 1020 → kc1_1: 1800, mc: 0.17` (ponto).
`Fenix/Docs_inicial/canonicos/CANONICO_MOTOR_DE_CALCULO.md:116` grava `Aço 1020 → 1500 / 0,21`, Walter F 9 #1, rótulo `REFERÊNCIA ÚNICA`, com a ressalva de encaixe imperfeito escrita. Um dos dois está errado sobre o que o dado é.

**C2 — Os valores `validado` do ToolOptimizer são os que o Fenix removeu.**
`materials.ts` marca `status: 'validado'` em: 1020 `1800/0,17`, 1045 `2165/0,155`, 304 `2150/0,185`.
`CANONICO_MOTOR_DE_CALCULO.md:130` lista **esses três pares exatos** como *"Removidos do projeto — decisão do Mestre em 20/08/2026"* (atribuídos a Diniz/Marcondes/Coppini, livro não verificável; os valores que entraram têm corroboração acadêmica 0,3–3,3%).

**C3 — A tabela sem fonte do MVP é o `materials.ts`.**
`AUDITORIA_DOCUMENTOS_TECNICOS.md` achado A2: `MVP §11.1` carrega P20 `2300/0,20` e 2711 `2500/0,20` *"⚠ sem fonte"*.
`materials.ts` id 5 e id 6: P20 `2300/0,20` (`estimado`), 2711 `2500/0,20` (`estimado`) — **idênticos**. A auditoria dizia "valores legados"; a varredura nomeia o legado.

**C4 — `mc` do alumínio.**
`materials.ts:59` Alumínio 6061 → `mc: 0.23`. `CANONICO_MOTOR §2.1` → `0,25` (Walter F 9 #15), com nota de que `0,75` foi erro de transcrição de `1−mc`. Não é divergência grave (0,23 vs 0,25), mas é ponto único sem fonte contra faixa com fonte.

**C5 — Faixa de diâmetro de ferramenta.**
`ToolOptimizerCNC/src/data/tools.ts:16` → `[6, 8, 10, 12, 16, 20]` mm (6 discretos, teto Ø20).
`Fenix` (HANDOFF §8 P2, `CANONICO_GEOMETRIA`) → campo aceita 0,1–200; tabelas de parâmetro cobrem Ø0,2–16; piso prático de campo Ø0,5 (D5). O Ø20 do `tools.ts` está **acima** da cobertura de tabela que o Fenix reconhece.

**C6 — `ap` de acabamento.**
`ToolOptimizerCNC/src/data/operations.ts:33` → Acabamento `apMaxMult: 0.3` (regra `0,30 × D`).
`Fenix` HANDOFF §8 P1 registra 3 regras concorrentes e classifica `0,30 × D` como *"especificação antiga, hoje sem efeito"*. O ToolOptimizer ainda executa a regra que o Fenix trata como legada.

**C7 — Rendimento `η`: ausência de default de um lado.**
`Fenix/CANONICO_MOTOR_DE_CALCULO.md:132` → `0,80` publicado (Mitsubishi, Keyence) / `0,85` em uso no projeto (`DECISÃO DE ENGENHARIA`).
`OrcaCNC/src/domain/models/maquina.ts:4` → `eficiencia` é campo de entrada, **sem valor default no modelo**.

**C8 — Densidade sem procedência.**
`OrcaCNC/src/domain/models/material.ts:7-19` → 11 densidades, nenhuma com fonte. Não há segundo valor para divergir (são padrão de handbook), mas a procedência está ausente.

**C9 — Duplicata divergente dentro do ToolOptimizerCNC.**
`docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md` (md5 `a1537e69…`, 743 l) × `DOCS_TREINAMENTO_RAG/DADOS_TECNICOS_KIENZLE_E_VC.md` (md5 `8fa5ee17…`, 743 l) — mesmo tamanho, conteúdo diverge. Idem `PRD_Velocidades_Corte_CNC.md` (`5947410c…` × `844e1231…`, 634 l cada).

**C10 — Duplicata entre projetos.**
`Manual_Programacao_Fanuc_CNC.md` md5 `7feda43d…` é byte a byte idêntico em
`monetizaCNC/ativos/docs_usinagem/_entrada/` e `Sistema_verificador_codigos_cnc/docs/PLANEJAMENTO/manuais/`
— mais 4 cópias em `Sistema_verificador_codigos_cnc/_arquivo/…/`.

---

## 5. Triagem calculável × empírico

| Calculável — **gerar da fórmula, testar contra amostra** | Empírico — **citar ou declarar lacuna** | Fato físico — **livre, mas com fonte nominal** |
|---|---|---|
| Rosca métrica ISO: furo prévio (DIN 13 / ISO 724), diâmetros efetivo/menor, altura do triângulo | `kc1.1`, `mc` por material | Densidade de material |
| Tolerâncias ISO 286 furo/eixo (h7 etc.) | Faixas de `Vc` por par material × ferramenta | Módulo de elasticidade `E` do metal duro (já em CONSENSO no canônico) |
| `De` efetivo da esférica/toroidal por `ap` | `n` de Taylor, `T_ref` — **lacuna declarada** | |
| Altura de crista por `ae` e raio | Espessura mínima de cavaco `hmin` | |
| `vf` a partir de `n`, `fz`, `Z` | `η` real do acionamento | |
| | Parâmetros de cabeçote/fresa da fábrica (medição própria) | |
| | `Fr/Fc` (força que entorta) — **lacuna declarada** | |

A rosca métrica ISO é o primeiro gerador a construir: resolve o assunto com mais fontes brutas do acervo e o de melhor amostra de teste (`_saida/10` + `Roscas.xlsx`).

---

## 6. Risco de licença por artefato

| Faixa | Artefatos | Regra |
|---|---|---|
| **Livre** — publicar à vontade | `monetizaCNC/_entrada`: CAB*, ESF*, TOPO*, `PARAMETRO FRESA ALTO AVANÇO 2738`, `Tabela pente de rosca` · densidade · qualquer tabela **gerada** de fórmula normativa | Medição própria do Mestre é o único ativo exclusivo do acervo |
| **Citável** — usar valor, dar crédito, não reproduzir a tabela inteira | `kc1.1` Walter (no canônico) · brocas Guhring/Temax · `Vc` de catálogo · Diniz (se algum dia verificado) | Fato não é protegido; a compilação e o arranjo, sim |
| **Restrito** — uso interno, **não publicar** | `Manual_Programacao_Fanuc_CNC.md` e derivados `_saida/01`–`04` · `MANUAL_MACHINING_STRATEGIST` e `_saida/13` · DIN 13 / ISO 286 / ISO 724 na íntegra · manual de software CAM citado em `_saida/05` | Onde for calculável, trocar por gerador; onde não, marcar `USO INTERNO` |

---

## 7. Recomendação — primeira leva do repo `dados-industria-cnc`

Ordenado por (valor × baixo risco de licença). **Nada disto é ação — é proposta para a etapa de esquema.**

| Ordem | O que | Por quê | Trabalho que exige |
|---|---|---|---|
| 1 | **Os 6 canônicos do Fenix** (camada A) | Já têm procedência por valor e rótulo de confiança. É a régua; migra quase direto | Definir o esquema a partir deles; converter prosa → registro |
| 2 | **Parâmetros de chão de fábrica do Mestre** (CAB, ESF, TOPO, alto avanço 2738, pente de rosca) | Licença **Livre**, únicos no mundo, e são o ativo comercial do fornecedor de dados | Extração de binário (`.xlsx/.pdf`) célula a célula — **etapa própria** · esquema de "medição própria" (data, máquina, condição) |
| 3 | **Gerador de rosca métrica ISO** (furo prévio + dimensões) | Calculável → Livre; cobre tamanho que tabela nenhuma cobre; resolve o risco de norma | Implementar DIN 13 / ISO 724; testar contra `_saida/10` + `Roscas.xlsx` (≥3 tamanhos, 2 fontes) |
| 4 | **Densidades de material** (11 do OrcaCNC + ampliar) | Fato físico, Livre | Atribuir fonte nominal (handbook) a cada valor antes de entrar |

**Não entram na primeira leva:** `materials.ts` (valores em C2/C3 — herança do que o Fenix rejeitou) ·
manuais Fanuc e CAM (Restrito) · `_saida/*` consolidado (procedência por documento, não por valor —
serve de amostra de teste, não de fonte).

---

## 8. Correções ao plano (`PLANO_DADOS_INDUSTRIA_CNC.md`)

A varredura mostrou três pontos diferentes do que a varredura preliminar registrou:

| Plano dizia | Varredura achou |
|---|---|
| `OrcaCNC` → "densidade, potência, custo" | Só **densidade** (11 valores, sem fonte). Potência/rendimento são campos de entrada sem default; custo é lógica de negócio — fora do corpus técnico |
| `DADOS_TECNICOS_KIENZLE_E_VC.md` duplicado em `docs/` × `docs/technical/` | A 2ª cópia divergente está em **`DOCS_TREINAMENTO_RAG/`**, não em `docs/`. Confirmada divergente por md5 (C9) |
| `_entrada/` "~40 arquivos sem procedência" | 45 arquivos; e **`_saida/` já tem 13 `.md` consolidados** com nota de origem por documento — a camada C já teve uma 1ª passada, sem procedência por valor |
| `materials.ts` "fixa kc1.1=1800 onde os canônicos têm faixa" | Confirmado, **e pior**: os 3 valores `validado` são exatamente os pares que a decisão D7 do Mestre removeu do Fenix (C2) |

O bloco de assunto **código G** é real mas rende pouco dado novo: são 3 cópias do mesmo manual Fanuc (Restrito) — o valor ali é catalogar a duplicata, não extrair.

---

## 9. Verificação

- [x] Todo caminho citado neste relatório existe (conferido em lote).
- [x] Todo conflito (C1–C10) traz os dois valores e os dois caminhos — nenhum "parecem divergir".
- [x] Contagem por assunto (§3) fecha com a contagem por artefato (§2).
- [x] **Nenhum arquivo de origem foi modificado.** `git status` ao fim, comparado ao baseline do início:

| Projeto | HEAD (início = fim) | Arquivos rastreados alterados |
|---|---|---|
| `Fenix` | `005fbf3` | nenhum (só este arquivo novo, não commitado) |
| `ToolOptimizerCNC` | `51c99fc` | `.claude/settings.local.json`, `gauntlet-…/.gitignore` — **pré-existentes** |
| `monetizaCNC` | `96986e6` | `ativos/tooloptimizer/01-escopo-calculadora.md` — **pré-existente** |
| `OrcaCNC` | `039e1c6` | `HANDOFF.md` — **pré-existente** |
| `MestreCNC` | `c38603f` | `HANDOFF.md` — **pré-existente** |
| `Sistema_verificador_codigos_cnc` | `a474f69` | `_sessao/entrega.html`, `docs/…/PROTOCOLO.md` — **pré-existentes** |

Todas as alterações listadas já existiam antes da varredura (outras sessões). O modo 1 não escreveu em nenhum dos 6 repositórios.

---

## 10. Próximo passo (fora deste modo)

Etapa de **esquema** (`references/procedencia.md`, modo 2): definir os campos de procedência a partir
do que a camada A já faz, e o corte calculável × empírico do §5. Só depois: criar o repo e migrar a
primeira leva do §7.
