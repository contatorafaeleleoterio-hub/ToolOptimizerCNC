# Auditoria de Documentação — MVP — 2026-08-28

**Skill:** `mvp-audit`. **Pergunta:** a documentação do Fenix basta para construir o MVP sem adivinhar?
**Escopo:** projeto inteiro, raiz `Fenix/`. Spec do MVP: `Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md`.
**Papel:** auditor externo. Aponta; **não corrige documento-fonte, não decide conflito, não escreve spec.**
Nenhum arquivo-fonte foi alterado.

**Auditoria anterior:** `AUDITORIA_PRONTIDAO_MVP_2026-08-27.md` (veredito 🔴 Não pronto — 4 bloqueantes).
Este relatório é **delta**: verifica se a reconciliação das sessões 30–32 (commits `85203eb`, `c4f2b45`)
fechou as 4 bloqueantes, e reavalia as 9 dimensões. Achados idênticos ao de 27/08 não são repetidos.

---

## Veredito

### 🟡 Pronto com ressalva — 0 bloqueantes, 4 importantes travam o lançamento (não o núcleo).

As 4 bloqueantes de 27/08 estão **fechadas e conferidas no texto-fonte** (não só no HANDOFF). A cadeia
de cálculo do núcleo é internamente consistente, as duas tabelas de `kc1.1` convergem, `E3`/`E5` não
contradizem mais o MVP. O primeiro `git commit` de código (scaffold + fatia vertical do núcleo) pode
começar. O que resta trava a **casca** e o **lançamento**: não há scaffold, não há desenho de tela,
o corpus golden de teste está fora do repositório, e a Q3 (recorte da 1ª fatia) aguarda o "pode seguir".

---

## Resumo executivo

Das 9 dimensões: **5 completas** (problema, escopo do MVP, requisitos, estado do projeto, vocabulário),
**4 parciais** (arquitetura, dados/segurança, critérios de pronto, operação), 0 ausentes, 0 conflitantes.
Salto desde 27/08: de 2 completas / 7 parciais para 5 / 4.

O buraco que restou **não é de consistência interna — é de construção não iniciada.** A especificação
(`escopo/` + `canonicos/` + `mvp/`) está fechada e coerente. Falta o que a spec declara não ser:
scaffold, tela e o procedimento de operação. Nenhum deles exige decisão de documento — exige código.

**Recomendação em uma frase:** scaffold (núcleo TS isolado, `src/data/` por canônico, as 2 invariantes
de `mvp/…` §13.2 como teste falhando), pedir o "pode seguir" da Q3, e `/to-tickets` sobre a fatia vertical.

---

## Verificação das 4 bloqueantes de 27/08

| # | Bloqueante (27/08) | Estado 28/08 | Evidência conferida |
|---|---|---|---|
| **B1** | Cadeia do núcleo não implementável — o canônico se contradiz (A1, A4, A5, A15) | ✅ **Fechada** `[F]` | `canonicos/CANONICO_MOTOR_DE_CALCULO.md:77` — passo 2 *"não travar em π/2"*; `:89` nota de correção A1/A4/A15/A21; `:83` `Pm = Pc/η` separado; passo 5 `vf` explícito. `CANONICO_LIMITES_E_ALERTAS.md:153` — `Pc`/`Pm` separados (A5) |
| **B2** | Módulo de dados de materiais — duas tabelas de `kc1.1` divergem até 87% (A2) | ✅ **Fechada** `[F]` | `mvp/MVP_CALCULADORA_PARAMETROS.md:1442-1444` — GG25 `800/0,28`, GGG50 `950/0,28`, Ti `1500/0,25`, iguais a `CANONICO_MOTOR_DE_CALCULO.md:136-138`. `:1468` documenta a sincronização e o efeito (−43% no titânio). 5 materiais agora com fonte Walter, editáveis |
| **B3** | Zona de resultados — `E3` contradiz o MVP (A18 + 3 pontos de produto) | ✅ **Fechada** `[F]` | `escopo/E3_RESULTADOS_E_APRESENTACAO.md:9` — nota de escopo (produto completo; MVP corta perfil de máquina, fator de segurança, operação); `:83-121` exemplo §3.1 refeito — recalculei os 8 números, **fecham dígito a dígito** (`n` 6366, `vf` 3565, `hm` 0,086, `kc` 2512, `Pc` 5,4 kW, `Mc` 8,1, `MRR` 128,3, `CTF` 1,01×); `:60` *"Não existe 'marca de estimativa'"* |
| **B4** | 1º lote de tickets sobre spec contraditória (17 médios A4–A20) | ✅ **Fechada** `[F]` | HANDOFF §30.2 + §32.1: os 32 achados tratados. Conferi por amostra: A9 (`⧗ AGUARDA R2` → `RESOLVIDO`, `LIMITES:56`), A10/14ª regra (`LIMITES:44`, `:246` *"Não carrega instrução de ajuste"*), A11 (`LIMITES:183` fator `1,1–1,3` → `SEM FONTE VERIFICÁVEL`), A16 (`De`≠`Deq`, `GLOSSARIO:32-33`), A20 (`mvp/…:339` partidas de `ae` para chanfrar/faceador), A3 (`mvp/…:841-842` Roscar partida macho×fresa de rosca) |

---

## Matriz de completude

| # | Dimensão | 27/08 | 28/08 | Evidência / o que mudou |
|---|---|---|---|---|
| 1 | Problema & objetivo | Completo | **Completo** | Sem mudança. `inicio_fenix/JTBD_O_PROBLEMA.md`; sucesso verificável em `mvp/…:46` + `§13.2` |
| 2 | Escopo do MVP | Completo | **Completo** | Sem mudança. `mvp/…` §12 (lista de fora item a item) + `escopo/E7` |
| 3 | Requisitos & regras | Parcial | **Completo** `[I]` | 3 graves + 17 médios fechados. A cadeia `mvp/…` §6 (`De→n→hm/hex→vf→Q→kc→Pc→Mc`) agora sem órfão e sem contradição com os canônicos. Ressalva declarada, não lacuna: vida-em-número e deflexão-em-µm ficam fora do MVP por falta de `n` de Taylor / `Fr/Fc` (`mvp/…` L13, L14) — é corte de escopo com o que fecharia nomeado |
| 4 | Arquitetura & decisões | Parcial | **Parcial** `[F]` | `docs/adr/0001` completa. **Falta:** granularidade de ticket (`construcao/QUESTOES_ABERTAS_CONSTRUCAO.md:104`, Q3 — única aberta); estrutura de `src/data/` só em prosa (`0001:40`); nenhuma ADR sobre organização de código ou teste |
| 5 | Dados, segurança & conformidade | Parcial | **Parcial** `[F]` | A2 fechou (5 materiais agora com fonte, `mvp/…:1468`). **Falta:** licença do dado embarcado — a tabela `kc1.1` inteira vem de *Walter Technical Compendium 2025* (`CANONICO_MOTOR_DE_CALCULO.md:122`) e nenhum documento trata o direito de embarcar esses valores no produto |
| 6 | Critérios de pronto / testes | Parcial | **Parcial** `[F]` | 2 invariantes testáveis (`mvp/…:1609-1615`); exemplo resolvido do 1045 agora fecha dígito a dígito (`escopo/E3:83`). **Falta:** critério de aceite por entrega/tela; corpus golden — `CASOS_TESTE_REFERENCIA.md` está no `ToolOptimizerCNC`, fora da fronteira (`HANDOFF.md:14`) |
| 7 | Operação & lançamento | Parcial→Ausente | **Parcial→Ausente** `[F]` | Sem mudança. `0001` nomeia Vite/Vitest/PWA; **não há** `package.json`, comando de build/run reproduzível, alvo de publicação, nem sinal de falha |
| 8 | Estado do projeto | Parcial | **Completo** `[F]` | `QUESTOES_ABERTAS_CONSTRUCAO.md` atualizado — só Q3 aberta (`:9`); `HANDOFF.md` 2ª "## 10" → "## 10-bis" (`:453`). `HANDOFF`, `LESSONS`, `BLOCO_DE_DECISAO` vivos e datados. Nit `[S]`: `HANDOFF.md` tem 1422 linhas e o gatilho "continuar" manda lê-lo — ver D2 |
| 9 | Vocabulário & consistência | Parcial/Conflitante | **Completo** `[F]` | A16/A17/A22/A23/A32 fechados: `GLOSSARIO_DE_TERMOS.md` define `De`≠`Deq` (`:32-33`), `Pm` (`:49`), `rε`≠`rβ` (`:45-46`), `Dmin/Dmax` (`:34`). `E3` não contradiz mais o MVP (`E3:9`, `:60`, `:66`) |

---

## Lacunas e conflitos priorizados

Proveniência: `[F]` fato documental · `[I]` inferência · `[S]` sugestão minha.

### 🔴 Bloqueante

Nenhuma. As 4 de 27/08 estão fechadas (tabela acima).

### 🟡 Importante (não trava o 1º commit do núcleo; trava a casca ou o lançamento)

**I1 · Nenhum desenho de tela.** `[F]` Inalterado desde 27/08. `mvp/…:8` declara não ser design. Suficiente
para o núcleo; bloqueia os tickets da casca. Onde deveria viver: doc novo em `construcao/` ou `docs/design/`.

**I2 · Nenhum scaffold, nenhum procedimento de build/run/deploy.** `[F]` Inalterado. `0001` nomeia a stack;
falta `package.json`, comando reproduzível, alvo de publicação ("PC da oficina" — como chega lá?), e um
`README` de operação. É o passo 1 da construção.

**I3 · Corpus de teste golden fora do repo.** `[F]` Inalterado (era I6 em 27/08). `ToolOptimizerCNC/docs/technical/CASOS_TESTE_REFERENCIA.md`
tem valores de referência; a fronteira de pastas proíbe depender do outro repo. Precisa ser recriado com
procedência. Mitigação parcial já existe: as 2 invariantes de `§13.2` + o exemplo do 1045 (`E3:83`) verificado.

**I4 · Q3 — recorte da 1ª fatia vertical — aguarda o "pode seguir".** `[F]` `construcao/QUESTOES_ABERTAS_CONSTRUCAO.md:104`.
Recomendação escrita (aço 1045 + fresa de topo, entrada→núcleo→resultado, com as 2 invariantes como teste).
Não trava o scaffold; trava o `/to-tickets`.

### 🟢 Desejável (pós-MVP)

**D1 ·** `HANDOFF.md` com 1422 linhas — o gatilho "continuar" manda lê-lo inteiro (`CLAUDE.md`). `[S]` Considerar
extrair o histórico de sessões (§11–§32) para um `HANDOFF_HISTORICO.md` e deixar no vivo só estado + protocolo.
**D2 ·** Licença do dado Walter (ver dimensão 5) — provavelmente pós-MVP, mas precisa de dono antes da distribuição pública. `[S]`
**D3 ·** `mvp/…` §11.1 GGG50 fixa `950` onde o canônico diz `950 ou 800` (`SEM CONSENSO` interno à fonte). `[F]`
O MVP escolhe e declara editável — aceitável; registrar que a escolha é do MVP, não do canônico.

---

## Perguntas em aberto (decisão humana)

| # | Pergunta | Recomendação | Motivo |
|---|---|---|---|
| 1 | **Q3 — o recorte da fatia vertical está bom?** (aço 1045 + fresa de topo, entrada→núcleo→resultado) | Sim, seguir como está | 1045 é a linha com corroboração acadêmica em 3,3%; fresa de topo é a geometria mais simples; a fatia atravessa todas as camadas e prova a ADR-0001 |
| 2 | **A tabela `kc1.1` (fonte Walter) pode ser embarcada no produto distribuído?** | Tratar antes da 1ª distribuição pública, não antes do código | Dado de catálogo de fabricante tem termo de uso; o MVP roda local e offline, mas a distribuição publica a tabela junto |

Parte 3 do `BLOCO_DE_DECISAO.md` (16 perguntas) continua fora — ambiente declarado, dado bloqueado ou frente adiada.

---

## Plano de ação

Ordem por dependência. Nenhum passo é reconciliação de documento — essa etapa fechou.

1. **Scaffold do repositório.** `package.json`, núcleo TS puro (`src/nucleo/`), Vite, Vitest, esqueleto de
   `src/data/` (um módulo por canônico, cada registro com `fonte` e `confianca` — `docs/adr/0001-plataforma-e-stack.md:40`).
   As 2 invariantes de `mvp/MVP_CALCULADORA_PARAMETROS.md` §13.2 entram como teste **falhando**.
2. **Pedir o "pode seguir" da Q3** (`construcao/QUESTOES_ABERTAS_CONSTRUCAO.md` §Q3) e disparar `/to-tickets`
   sobre a fatia vertical.
3. **Recriar o corpus golden** com procedência — um `Docs_inicial/CASOS_TESTE_REFERENCIA.md` ou `src/nucleo/__fixtures__/`,
   começando pelo exemplo do 1045 já verificado em `escopo/E3_RESULTADOS_E_APRESENTACAO.md` §3.1.
4. **Design de tela.** Forçado pelo 1º ticket da casca; anda em paralelo com 1–2, não antes. Doc novo em `construcao/` ou `docs/design/`.
5. **`README` de operação** — build, run, teste, e como o PWA chega ao PC da oficina. Junto com o scaffold ou logo depois.
6. **(pós-MVP)** Dono para a licença do dado Walter; extração do histórico do `HANDOFF.md`.

**Caminho crítico até o 1º `git commit` de código:** passo 1, sozinho. A Q3 (passo 2) libera os tickets, não o scaffold.

---

## Suposições desta auditoria

- `[S]` Auditei `Fenix/` como projeto único. `Docs_inicial/pesquisa/` tratado como insumo de procedência (`HANDOFF.md:86`), não como spec.
- `[S]` **Não rodei `triagem-estrutural`** apesar do acervo ter ~22.000 linhas de markdown — a maior parte é `pesquisa/`
  (insumo) e docs de sessão; li o `HANDOFF.md` inteiro (o mapa), a auditoria técnica de 27/08, os 3 canônicos
  centrais, `E3`, `E5`, `GLOSSARIO`, `QUESTOES_ABERTAS_CONSTRUCAO` e as seções tocadas do MVP. Como esta é
  auditoria-delta com escopo conhecido, a varredura cega não se justificava.
- `[F]` Tratei a reconciliação (commits `85203eb`, `c4f2b45`) como corrente — são os 2 commits mais recentes e
  nenhum documento-fonte mudou depois deles.
- `[I]` As 4 bloqueantes de 27/08 estão fechadas porque abri cada `arquivo:linha` da correção e confirmei o
  texto novo — não confiei no relato do `HANDOFF`. Recalculei os 8 números do exemplo `E3` §3.1.
- `[S]` "Pronto com ressalva" e não "Pronto para construir" porque a I4 (Q3 sem "pode seguir") e a I3 (sem corpus
  golden) tocam o 1º ticket, ainda que não o scaffold. Quem discordar pode ler como "Pronto para o scaffold".

---

## Como reauditar

- **Mudou desde 28/08:** verificar se o scaffold entrou com os 2 testes de `§13.2`, se a Q3 foi respondida, e
  se o corpus golden foi recriado no repo.
- **Reler primeiro na próxima:** este relatório §"Plano de ação"; `construcao/QUESTOES_ABERTAS_CONSTRUCAO.md`
  (estado da Q3); e `git log` desde `c4f2b45`.
- **Sinal de "pronto para construir":** `package.json` no repo, `src/nucleo/` e `src/data/` esqueletados, os 2
  testes de `§13.2` existindo (falhando é aceitável), e Q3 fechada com destino registrado.
```
