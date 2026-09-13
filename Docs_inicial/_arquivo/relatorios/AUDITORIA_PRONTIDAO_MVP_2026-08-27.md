# Auditoria de Documentação — MVP — 2026-08-27

**Skill:** `mvp-audit`. **Pergunta:** a documentação do Fenix basta para começar a codar o MVP sem adivinhar?
**Escopo:** projeto inteiro, raiz `Fenix/`. A spec do MVP é `Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md`.
**Papel:** auditor externo. Este relatório aponta; **não corrige documento-fonte, não decide conflito, não escreve spec.**
Nenhum arquivo-fonte foi alterado.

---

## Veredito

### 🔴 Não pronto — 4 bloqueantes abertas.

Nenhuma delas é "falta documento". A spec é vasta e detalhada. As quatro são **contradição entre
documentos já escritos** — e as três primeiras já estão localizadas linha a linha em
`AUDITORIA_DOCUMENTOS_TECNICOS.md` (27/08), sem correção aplicada.

**Distância para "pronto": 1 a 2 sessões de reconciliação de documento** — não meses. A própria
auditoria técnica diz: *"os três são localizados e corrigíveis; nenhum exige nova pesquisa"*
(`AUDITORIA_DOCUMENTOS_TECNICOS.md:26`).

---

## Resumo executivo

Das 9 dimensões: **2 completas** (escopo do MVP, problema), **7 parciais**, 0 ausentes, 0 puramente conflitantes.

O buraco central **não é de conteúdo — é de consistência entre camadas.** Os canônicos (que governam
todo número, `mvp/…:22`) e o MVP (que governa a função) divergem em ~20 pontos: 3 graves que entregam
número errado, 17 médios que são contradição canônico↔MVP ou código morto. Some-se o `E3` — citado
como fonte do próprio MVP (`mvp/…:1642`) — descrevendo perfil de máquina, fator de segurança e "marca
de estimativa", **os três fora do MVP**, e com um exemplo resolvido cujos números não fecham.

A base é forte onde raramente é: escopo com lista de fora item a item e razão de cada exclusão (`mvp/…` §12),
cadeia de cálculo fórmula a fórmula com rótulo de confiança (`mvp/…` §6), stack decidida com alternativas
e consequências (`docs/adr/0001`), sete tabelas numéricas recalculadas e fechando dígito a dígito.

**Recomendação em uma frase:** rodar uma sessão de reconciliação que aplique os 32 achados de
`AUDITORIA_DOCUMENTOS_TECNICOS.md` e alinhe `E3`/`E5` ao MVP, depois scaffold + fatia vertical.

---

## Inventário

| Documento | Propósito | Maturidade |
|---|---|---|
| `Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md` (1655 l) | Spec completa do 1º produto: fluxo, catálogo, entradas, cadeia de cálculo, resultados, alertas, dados, lacunas | **Fechado como produto** — 12 lacunas e L6 declaradas; §7.4 EM REVISÃO |
| `Docs_inicial/escopo/E0_PRINCIPIO…` | Precedência de produto: agnóstico por padrão, nada trava (correção 27/08) | Fechado |
| `Docs_inicial/escopo/E1_DOMINIO_E_CATALOGO.md` (346 l) | 4 famílias, 17 geometrias, campos, substratos, 12 ligas | Fechado |
| `Docs_inicial/escopo/E2_ENTRADAS_E_CONFIGURACAO.md` (374 l) | Campos, faixas, validação em 3 naturezas, fator de segurança | Fechado |
| `Docs_inicial/escopo/E3_RESULTADOS_E_APRESENTACAO.md` (241 l) | O que o sistema entrega, hierarquia, procedência, regras de exibição | **Rascunho desatualizado** — contradiz o MVP (ver B3) |
| `Docs_inicial/escopo/E4_INDICADORES_E_SEGURANCA.md` (363 l) | 3 camadas, 3 níveis, 17 gatilhos, limiares de balanço | Fechado, **§6 EM REVISÃO** |
| `Docs_inicial/escopo/E5_INTERACAO_E_FLUXO.md` (481 l) | Painel, ordem, cálculo híbrido, edição, estados | Fechado com **2 linhas residuais** pré-27/08 (ver I3) |
| `Docs_inicial/escopo/E6_DADOS_DO_USUARIO.md` (283 l) | Histórico, favoritos, biblioteca, importar/exportar | Fechado (frente adiada) |
| `Docs_inicial/escopo/E7_ESCOPO_E_FRONTEIRAS.md` (269 l) | 4 naturezas de fronteira, 29 perguntas consolidadas | Fechado |
| `Docs_inicial/canonicos/CANONICO_*.md` (6 docs, 1158 l) | Todo número, fórmula e limiar, com fonte e confiança por valor | **Auditados 27/08 — 3 graves + achados médios abertos** |
| `Docs_inicial/GLOSSARIO_DE_TERMOS.md` (63 l) | 30 símbolos, definição única, regra de nomenclatura | Fechado — faltam `Pm`, `Dmin`; `De` e `L/D` usados para 2 grandezas |
| `docs/adr/0001-plataforma-e-stack.md` (135 l) | Stack: núcleo TS puro + casca React PWA + Vitest + IndexedDB | **Aceita** — única ADR |
| `Docs_inicial/construcao/QUESTOES_ABERTAS_CONSTRUCAO.md` | Q1 fechada; Q2/Q3/Q4 "abertas" | **Desatualizado** — Q2 e Q4 resolvidas depois (ver I4) |
| `Docs_inicial/AUDITORIA_DOCUMENTOS_TECNICOS.md` (675 l) | Auditoria técnica modo 4: 32 achados, 3 graves | Entregue 27/08, **nenhum aplicado** |
| `Docs_inicial/BLOCO_DE_DECISAO.md` | 29 perguntas; Partes 1–2 (13) decididas, Parte 3 (16) "pode esperar" | Parte 3 aberta, **não bloqueia** |
| `Docs_inicial/HANDOFF.md` (1269 l) | Estado, protocolo, histórico de 14 sessões | Vivo e datado — **2 seções "## 10"** (l. 385 e 453); longo |
| `Docs_inicial/LESSONS.md` (301 l) | L1–L17, erros a não repetir | Vivo |
| `inicio_fenix/JTBD_O_PROBLEMA.md` (396 l) | O problema, reescrito sobre entrevista com fresador de fábrica | Fechado |
| `inicio_fenix/ATUALIZACAO_NECESSARIA.md` · `VERIFICACAO_DA_ATUALIZACAO.md` | 7 pontos JTBD × escopo, conferidos | Reconciliados 26/08 |

**Código:** nenhum. Sem `package.json`, sem scaffold, sem `docs/adr/` além do 0001.
**`Docs_inicial/pesquisa/`** (30+ arquivos): insumo de procedência, não auditado como spec (`HANDOFF.md:86`).

---

## Matriz de completude

| # | Dimensão | Veredito | Evidência |
|---|---|---|---|
| 1 | **Problema & objetivo** | **Completo** | Usuário nomeado: operador/fresador na máquina (`inicio_fenix/JTBD_O_PROBLEMA.md`; `mvp/…:984` *"perguntado como sabe que acertou, o operador cita a ferramenta cortar, não quebrar…"*). Condição de sucesso verificável: margem ±15–25% declarada (`mvp/…:46`) + 2 invariantes testáveis (`mvp/…` §13.2). Ressalva: os 13 atributos de aceite de `§1.2:102-116` ("Auto-intuitiva", "Confiável") não são testáveis como escritos |
| 2 | **Escopo do MVP** | **Completo** | Lista de dentro: `mvp/…` §2.2, §3, §6, §7. Lista de fora **com razão item a item**: `mvp/…` §12 (14 itens) + `escopo/E7` (4 naturezas). É a dimensão mais forte do acervo |
| 3 | **Requisitos & regras** | **Parcial** | Estrutura completa: cada função com entrada/saída/exceção (`mvp/…` §4, §5, §6, §9). **Falta:** os 3 graves de `AUDITORIA_DOCUMENTOS_TECNICOS.md` (A1 `MOTOR:71`, A2 `MOTOR:114`×`mvp:1403`, A3 `mvp:833`) + 17 médios, todos abertos. São regras que se contradizem entre documentos ou produzem número errado |
| 4 | **Arquitetura & decisões** | **Parcial** | Plataforma: `docs/adr/0001` — completa, com alternativa e "onde pode estar errada". **Falta:** granularidade de ticket (`QUESTOES_ABERTAS_CONSTRUCAO.md` Q3, aberta), estrutura do módulo de dados só em prosa (`0001:40`), zero ADR sobre organização de código ou teste |
| 5 | **Dados, segurança & conformidade** | **Parcial** | Modelo de armazenamento completo: local-only, sem conta, sem rede (`0001:59`, `mvp/…:1385`); o que se guarda em `escopo/E6`. **Falta:** 5 materiais `SEM FONTE PUBLICADA` em `mvp/…:1412-1416` conflitando com o canônico (A2, grave); licença do dado embarcado (Walter) não endereçada |
| 6 | **Critérios de pronto / testes** | **Parcial** | 2 invariantes nomeadas e testáveis (`mvp/…` §13.2); exemplo resolvido que reproduz caso publicado em 0,4% (`mvp/…:751`). **Falta:** critério de aceite por entrega/tela; o corpus de teste golden (`CASOS_TESTE_REFERENCIA.md`, 285 l) está no `ToolOptimizerCNC`, não aqui |
| 7 | **Operação & lançamento** | **Parcial → Ausente** | Intenção em `0001`: build Vite, entrega PWA, teste Vitest. **Falta tudo o que é executável:** nenhum comando de build/run, sem scaffold, sem alvo de publicação ("PC da oficina" — mas como chega lá?), sem sinal de falha (e não pode haver — zero rede) |
| 8 | **Estado do projeto** | **Parcial** | `HANDOFF.md` vivo, datado, exaustivo + `LESSONS.md` + `BLOCO_DE_DECISAO.md`. **Falta:** `QUESTOES_ABERTAS_CONSTRUCAO.md` está desatualizado (diz 3 canônicos faltando — os 6 estão escritos); `HANDOFF.md` tem 2 seções "## 10" e é longo demais para recall rápido |
| 9 | **Vocabulário & consistência** | **Parcial / Conflitante** | `GLOSSARIO_DE_TERMOS.md` limpo, 30 símbolos, definição única. **Conflitos:** `De` = 2 grandezas na mesma cadeia (A16 `MOTOR:40`×`LIMITES:98`), `L/D` = 2 (A17 `mvp:1283`), `rβ`/`r_e`/`rε` colidem (A23), `Pm` em fórmula e ausente do glossário (A22). E `E3` contradiz o MVP em 3 pontos de produto |

---

## Lacunas e conflitos priorizados

Proveniência: `[F]` fato documental · `[I]` inferência · `[S]` sugestão minha.

### 🔴 Bloqueante

**B1 · A cadeia de cálculo do núcleo não pode ser implementada — o canônico se contradiz.** `[F]`
Tarefa que trava: *"implementar `MVP §6` (De → n → hm/hex → Vf → Q → kc → Pc → Mc)"*.
- **A1 (grave)** — `canonicos/CANONICO_MOTOR_DE_CALCULO.md:71,73`: o travamento `φmax = π/2` no passo 4 faz a espessura média sair **maior que o avanço por dente** acima de `ae/D` 0,785, e `Pc` −11% a −13% em rasgo cheio. Viola a invariante que o próprio doc manda testar (`:99`). `§1.1:20` e `mvp/…:787` têm a fórmula certa — só o passo 4 não.
- **A4 (médio)** — `MOTOR:59,74`: a correção de ângulo de saída aplica a referência no lugar do ângulo real → `kc` 6% baixo em todo material.
- **A5 (médio)** — `CANONICO_LIMITES_E_ALERTAS.md:144`: chama de `Pc` uma fórmula com `η` no denominador (que é `Pm`); erro de fator `1/η` = 18%.
- **A15 (médio)** — `MOTOR:75`: `vf` é consumido no passo 6 e nunca produzido na cadeia do MOTOR.
- **Onde deveria viver:** correção nos canônicos. **O que fazer:** aplicar A1, A4, A5, A15 conforme `AUDITORIA_DOCUMENTOS_TECNICOS.md` (cada um traz a linha e a forma correta).

**B2 · O módulo de dados de materiais não pode ser criado — duas tabelas vivas divergem.** `[F]`
Tarefa que trava: *"criar `data/materiais.ts` (kc1.1, mc), um registro por liga com fonte"* (`0001:40`).
- **A2 (grave)** — `CANONICO_MOTOR_DE_CALCULO.md:114-128` × `mvp/MVP_CALCULADORA_PARAMETROS.md:1403-1416`: divergem em 5 de 12 materiais. Ti-6Al-4V: canônico `1500/0,25` (Walter F 9 #23), MVP `2800/0,22` ⚠ sem fonte — **+87%**, e `Pc` é linear em `kc1.1`. GGG50, GG25, P20, 2711 idem. O canônico tem valor com fonte; o MVP carrega o legado sem fonte, contra a própria regra de precedência (`mvp/…:22`).
- **Onde deveria viver:** decisão do Mestre + o canônico como fonte única. **O que fazer:** escolher qual tabela vale para os 5; se for o canônico, corrigir `mvp/…` §11.1; declarar os que ficam sem fonte como default editável (`mvp/…` §4.7 já é o caminho — L12).

**B3 · A zona de resultados da tela não pode ser construída — `E3` contradiz o MVP.** `[F]`
Tarefa que trava: *"construir as zonas Z1–Z8 do painel (`mvp/…` §2.3)"*. `E3` é citado como fonte do MVP para "hierarquia do resultado" (`mvp/…:1642`).
- `escopo/E3_RESULTADOS_E_APRESENTACAO.md:32` — *"cada um mostra quanto representa do limite da máquina"* × `mvp/…:962` — *"eles **não** trazem '% do limite' — não há limite declarado"*.
- `E3` §2.2, §2.3:58, §6 inteira — "folga de potência", "fator de segurança aplicado", "torque acompanhado do limite da máquina": **perfil de máquina e fator de segurança estão fora do MVP** (`mvp/…` §1.3, §12).
- `E3:61` — *"marca de estimativa, quando o dado do material não é verificado"* × `mvp/…:1361` — *"não existe estado 'estimado'"* (divergência #10).
- `E3:79-114` — exemplo resolvido: `CTF 1,49×` usa a fórmula simplificada que `MOTOR:175` eliminou; `vf 1528` não é `fz×Z×n`; `Pc 5,8 kW` exige `kc≈6327` contra ~2513 do par canônico (auditoria A18).
- **Onde deveria viver:** `E3` precisa declarar se descreve o **produto completo** (aí perfil de máquina é válido, e o MVP corta) ou o **MVP** (aí sobra muito). **O que fazer:** decidir o recorte de `E3` (ver Pergunta 4) e refazer o exemplo `§3.1` com a cadeia atual.

**B4 · O primeiro lote de tickets não pode ser escrito sobre spec contraditória.** `[I]`
Tarefa que trava: *"`/to-tickets` sobre a fatia vertical da Q3"*.
- 17 achados médios de `AUDITORIA_DOCUMENTOS_TECNICOS.md` abertos (A4–A20). A maioria é contradição canônico↔MVP (A16, A17, A19), marcador obsoleto (A9 `⧗ AGUARDA R2` vivo no LIMITES depois de fechado), regra revogada sobrevivendo (A10, em 5 lugares), ou código morto (A7 — o teto do controle de `Vc` é menor que o limiar do alerta, duas regras nascem mortas).
- **O que fazer:** a sessão de reconciliação (Plano, passo 1) resolve B1, B2 e B4 juntos — são o mesmo trabalho.

### 🟡 Importante (não trava o primeiro commit do núcleo; trava o lançamento ou a casca)

**I1 · Nenhum desenho de tela.** `[F]` O MVP declara não ser design (`mvp/…:8`); os blocos monoespaçados são "conteúdo e hierarquia, não desenho". Suficiente para o núcleo; **bloqueia os tickets da casca**. Onde deveria viver: um doc novo `construcao/` ou `docs/design/`.

**I2 · Nenhum procedimento de build/run/deploy, nenhum scaffold.** `[F]` `0001` nomeia Vite/Vitest/PWA mas não há `package.json`, comando reproduzível, nem alvo de publicação. Onde deveria viver: o scaffold em si + um `README` de operação.

**I3 · `E5` tem 2 linhas do modelo "bloqueia" anterior a 27/08.** `[F]` `escopo/E5_INTERACAO_E_FLUXO.md:204` (*"não contorna bloqueio nem limite físico"*) e `:364` (*"o bloqueio é limite físico, e limite físico não é negociável por edição"*) contra `E0` §3.3 e `mvp/…:1262` (*"nenhuma das três bloqueia"*).

**I4 · `QUESTOES_ABERTAS_CONSTRUCAO.md` desatualizado.** `[F]` Diz *"três dos seis canônicos continuam ⬜"* (`:75`) — os 6 estão escritos e auditados (`HANDOFF.md:942`). Q4/L6 marcada aberta lá; fechada em `mvp/…:1563` (Q28). Só **Q3** (escopo do 1º lote) segue realmente aberta.

**I5 · `E4` §6 / `mvp/…` §7.4 — bloco "o que mexer" EM REVISÃO.** `[F]` Entrega direção no imperativo ("suba fz para 0,085"); a 14ª regra confirmada (`BLOCO_DE_DECISAO.md:3`) diz que o alerta não instrui. Decisão pendente do Mestre: transformar (mostrar só como cada grandeza responde) ou remover.

**I6 · Corpus de teste golden fora do repo.** `[F]` `ToolOptimizerCNC/docs/technical/CASOS_TESTE_REFERENCIA.md` (285 l) tem valores de referência; a fronteira de pastas (`HANDOFF.md:14`) proíbe depender do outro repo. Precisa ser recriado ou migrado com procedência.

### 🟢 Desejável (pós-MVP)

**D1 ·** 12 achados leves de `AUDITORIA_DOCUMENTOS_TECNICOS.md` (A21–A32) — comentário de conversão faltando, símbolo com 2 grafias, "dobrar" onde é 3×. `[F]`
**D2 ·** `HANDOFF.md` tem 2 seções "## 10" (`:385`, `:453`) e ~1270 linhas — o gatilho "continuar" manda ler ele inteiro (`CLAUDE.md`). `[F]`
**D3 ·** `GLOSSARIO_DE_TERMOS.md` sem `Pm` e `Dmin`; `De`/`L/D` definidos uma vez, usados para 2 grandezas cada. `[F]`

---

## Perguntas em aberto (decisão humana)

| # | Pergunta | Recomendação | Motivo |
|---|---|---|---|
| 1 | **A2 — qual tabela de `kc1.1` vale para P20, 2711, GG25, GGG50, Ti?** | O canônico (valores Walter), e os 5 entram como default **editável** sem selo, via `mvp/…` §4.7 | O canônico tem fonte primária; o MVP tem legado sem fonte. `mvp/…` §4.7 já é o mecanismo — o fornecedor entrega o dado a quem compra a ferramenta (L12) |
| 2 | **`E3` descreve o produto completo ou o MVP?** (auditoria P4) | Produto completo — e marcar no cabeçalho que perfil de máquina, fator de segurança e tipo de operação **são cortados no MVP** (`mvp/…` §12) | `E0`–`E7` são o domínio; o MVP é o recorte. Assim `E3` não vira rascunho errado, vira escopo de fase 2 |
| 3 | **`E4` §6 / §7.4 "o que mexer": transformar ou remover?** | Transformar — mostrar como cada grandeza responde, sem verbo de comando | Mantém o valor (a direção do trade-off é "a metade que falta no mercado", `mvp/…:1032`) sem violar a 14ª regra |
| 4 | **Auditoria P1 —** `Vc_min` ou `Vc` alvo na fórmula de piso de diâmetro? **P2 —** o piso `fz = 0,002` saiu ou ficou? **P3 —** `ae/D` da esférica usa `D` ou `De`? | Resolver na sessão de reconciliação, com o canônico como árbitro | São 3 decisões de implementação que mudam o número; `AUDITORIA_DOCUMENTOS_TECNICOS.md` §2 tem o contexto de cada uma |

Parte 3 do `BLOCO_DE_DECISAO.md` (16 perguntas) **não entra aqui** — todas são ambiente declarado, dado bloqueado ou frente adiada; nenhuma toca o que vai ser construído (`BLOCO_DE_DECISAO.md:169`).

---

## Plano de ação

Ordem por dependência. Passos 1–4 são documento; 5–7 são construção.

1. **Sessão de reconciliação canônicos + MVP.** Aplicar os 32 achados de `AUDITORIA_DOCUMENTOS_TECNICOS.md` (3 graves + 17 médios + 12 leves), decidir as 4 perguntas acima. Resolve B1, B2 e B4. Arquivos: os 6 `canonicos/CANONICO_*.md`, `mvp/…` §6/§9/§11. Saída: canônicos e MVP internamente consistentes. *(Não é trabalho da skill `mvp-audit` — é etapa separada, aprovada.)*
2. **Reconciliar `E3` e `E5` com o MVP.** `escopo/E3` — decidir o recorte (Pergunta 2), refazer o exemplo `§3.1` com a cadeia atual, trocar "marca de estimativa" por premissa/extrapolado/editado. `escopo/E5` — remover `:204` e `:364`.
3. **Decidir `E4` §6 / `mvp/…` §7.4** (Pergunta 3) e aplicar nos dois arquivos.
4. **Atualizar `construcao/QUESTOES_ABERTAS_CONSTRUCAO.md`** — marcar Q2 e Q4 fechadas com destino; deixar só Q3 aberta. Consertar `HANDOFF.md` (2× "## 10").
5. **Scaffold do repositório.** `package.json`, núcleo TS puro (`src/nucleo/`), Vite, Vitest, esqueleto de `src/data/` (um módulo por canônico, cada registro com `fonte` e `confianca` — `0001:40`). As 2 invariantes de `mvp/…` §13.2 entram como teste **falhando**.
6. **`/to-tickets` sobre a fatia vertical da Q3.** Aço 1045 + fresa de topo, entrada → núcleo → resultado na tela, com as 2 invariantes como teste desde o ticket 1 (`QUESTOES_ABERTAS_CONSTRUCAO.md:104`).
7. **Design de tela.** Forçado pelo primeiro ticket da casca; pode andar em paralelo com 5–6, não antes.

**Caminho crítico até o primeiro `git commit` de código:** passos 1 + 5. Passo 1 é a única coisa
grande, e a auditoria técnica já fez o levantamento — é aplicar, não investigar.

---

## Suposições desta auditoria

- `[S]` Auditei `Fenix/` como projeto único. `Docs_inicial/pesquisa/` tratado como insumo de procedência (`HANDOFF.md:86`), não como spec.
- `[S]` **Não rodei `triagem-estrutural`** apesar do acervo ter ~21.600 linhas de markdown — a maior parte é `pesquisa/` (insumo), e eu já tinha lido o `HANDOFF.md` inteiro (o mapa) e a spec-núcleo (~7.000 linhas: escopo + canônicos + MVP + ADR). A skill manda declarar essa decisão.
- `[F]` Tratei `AUDITORIA_DOCUMENTOS_TECNICOS.md` (27/08) como corrente — é o commit mais recente (`005fbf3`) e nenhum documento-fonte mudou depois dele.
- `[I]` As 3 grave da auditoria técnica são bloqueantes de construção porque cada uma nomeia uma tarefa concreta de código que não pode começar (cadeia de cálculo, módulo de dados, zona de resultados).
- `[S]` "1 a 2 sessões" para a reconciliação é estimativa minha, baseada em a auditoria já ter localizado cada achado com `arquivo:linha` e a forma correta.

---

## Como reauditar

- **Mudou desde a auditoria técnica de 27/08:** nada nos documentos-fonte. Esta auditoria é a primeira de prontidão para MVP — não há anterior para comparar.
- **Reler primeiro na próxima:** este relatório §"Plano de ação", e `AUDITORIA_DOCUMENTOS_TECNICOS.md` §1 (os 3 graves) — para confirmar que a sessão de reconciliação os fechou.
- **Sinal de "pronto":** `AUDITORIA_DOCUMENTOS_TECNICOS.md` com os 3 graves marcados resolvidos; `E3` e `E5` sem contradição com o MVP; `QUESTOES_ABERTAS_CONSTRUCAO.md` só com Q3; scaffold no repo com os 2 testes de `§13.2` rodando (falhando é aceitável — existindo é o requisito).
