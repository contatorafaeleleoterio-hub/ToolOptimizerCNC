# Plano — Gauntlet Loop v2: Mockup Experimental da Calculadora CNC

> **Status:** 🟡 Aguardando preenchimento da Fase 0 (objetivo) na próxima sessão — **não executar antes disso**
> **Item do backlog:** 17 (redo do item 16, com protocolo revisado)
> **Técnica:** [`protocolo-loop-construtor-juiz-cego.md`](C:\Users\USUARIO\Desktop\central_rafael\protocolos\protocolo-loop-construtor-juiz-cego.md) — versão agnóstica e atualizada do Gauntlet Loop usado na rodada 1
> **Precedente:** rodada 1 concluída em 12/08/2026 — `gauntlet-calculadora-cnc/`, score 92/100, 7/7 gates, `reports/FINAL_REPORT.md`. **Preservada intacta, não é sobrescrita por este plano.**

---

## O que mudou da rodada 1 pra esta versão

A rodada 1 usou a versão ingênua do loop: contava ciclos e parava só quando o score batia o
mínimo. Funcionou (PASS no ciclo 2), mas não testou o mecanismo real de convergência/estagnação.
Esta v2 aplica o protocolo central revisado — ver lá as 5 fontes de pesquisa que embasam cada
mudança. Resumo do que é diferente na prática:

1. **Critério de parada por convergência real**, não só contagem fixa — guardar o melhor ciclo,
   reverter se um ciclo piorar o score, estagnação = score parado **e** mesmas prioridades
   repetidas (não só "score ainda não bateu 90").
2. **Teto de agentes explícito** (ver §2) — a rodada 1 não tinha isso escrito, funcionou por
   sorte/disciplina manual.
3. **Regra de fallback para falha de subagente** — na rodada 1, o Builder do ciclo 2 caiu por
   limite de gasto da API *antes* de tocar em qualquer arquivo. A correção acabou sendo aplicada
   direto pelo Orchestrator, sem reabrir agente — isso agora é regra escrita, não improviso.
4. **Objetivo (Fase 0) explicitamente zerado** — a rodada 1 herdou escopo de documentos externos
   ao projeto (escopo canônico, memória de produto). Esta v2 não assume que o objetivo é o mesmo;
   você declara do zero na próxima sessão.

---

## FASE 0 — Objetivo e fronteiras (▢ PREENCHER NA PRÓXIMA SESSÃO)

Nada abaixo está definido. Preencher antes de qualquer Discovery/Builder/Judge.

```
Entregável (1 frase):
▢ ___________________________________________________

Por que redesenhar (o que está errado ou faltando na calculadora atual — se for diferente
do motivo da rodada 1, dizer aqui; se for o mesmo, também dizer):
▢ ___________________________________________________

Escopo travado (o que ENTRA nesta rodada — famílias/ferramentas/materiais/operações):
▢ ___________________________________________________

Escopo fora (o que fica de fora, mesmo que pareça óbvio incluir):
▢ ___________________________________________________

Sandbox desta rodada (pasta onde o loop pode mexer):
Sugestão padrão (evita sobrescrever a rodada 1): `gauntlet-calculadora-cnc-v2/`
▢ confirmar ou trocar: ___________________________________________________

Fronteiras proibidas (herdadas da rodada 1, valem por padrão salvo indicação contrária):
`src/**` · `package.json` raiz · `node_modules/` · `vite.config.ts` · `vitest.config.ts` ·
`wrangler.jsonc` · `.gitignore` da raiz · qualquer deploy. Nenhuma dependência instalada
fora da pasta da sandbox.

Teto de ciclos (padrão 5 — trocar aqui se quiser outro número):
▢ ___________________________________________________

Score mínimo de aceite (padrão 90/100 + 7 gates — trocar aqui se quiser outro número):
▢ ___________________________________________________

O que este loop NÃO decide:
Score ≥ mínimo não autoriza implementar em produção — exige aprovação explícita do Rafael,
igual na rodada 1. (Só mude esta linha se for uma decisão deliberada sua.)
```

**Sobre reaproveitar a pesquisa da rodada 1** (`gauntlet-calculadora-cnc/research/DISCOVERY.md` e
`CALCULATOR_SCOPE.md`): eles **não são herdados automaticamente**. Servem de referência de como o
Discovery foi estruturado (formato, nível de detalhe) e de fonte de dados que já foram
levantados uma vez (ex.: fatores de Vc por material da ferramenta, se o novo escopo ainda usar
esse eixo) — mas o conteúdo (taxonomia, prioridades ESSENCIAL/IMPORTANTE) precisa ser reavaliado
contra o objetivo novo declarado acima, não copiado.

---

## FASE 1 — Discovery
Levantar só o necessário pro objetivo declarado na Fase 0. Produzir `research/DISCOVERY.md`
(só conclusões) e, se o entregável tiver cálculos/regras de domínio, um contrato equivalente ao
`CALCULATOR_SCOPE.md` da rodada 1 (entradas/saída/unidade/prioridade/motivo por item).

## FASE 2 — Critérios de qualidade (CONGELA)
Reaproveitar o **esqueleto** validado na rodada 1 — 9 categorias somando 100 pts (usabilidade 20 ·
clareza 15 · fluxo 15 · prevenção de erros 15 · organização 10 · UI 10 · legibilidade 5 ·
consistência 5 · testes 5) + 7 gates — é domínio-neutro o bastante pra UI de calculadora técnica.
Ajustar as descrições/sub-itens de cada categoria ao objetivo novo da Fase 0, especialmente o
sub-item de "extensibilidade percebida" dentro de Organização (só faz sentido se o novo objetivo
também tiver múltiplas famílias/ferramentas trocáveis — confirmar antes de manter).
**Uma vez escrito, ninguém altera — nem Builder nem Judge.**

## FASE 3 — Cenários de verificação objetiva
Escrever os cenários T01+ em português e o contrato de `data-testid` **antes** do Builder
trabalhar — foi o que evitou retrabalho na rodada 1 (27 testids, zero desvio do Builder). Não
copiar T01-T13 da rodada 1 automaticamente; derivar dos fluxos que o objetivo novo realmente tem.

## FASE 4 — Infra isolada
Mesma receita da rodada 1, reaproveitável tal qual, dentro da pasta definida na Fase 0:
```bash
npm init -y && npm i -D @playwright/test && npx playwright install chromium
```
Confirmar com `git status` na raiz do projeto que nada fora da sandbox mudou — repetir essa
checagem ao fim de cada ciclo, não só no fim do loop.

## FASE 5 — O loop (regra de parada revisada)

```
Builder produz/corrige (ciclo N)
  → npx playwright test
  → Judge cego avalia (só recebe: mockup + criteria + resultado do playwright)
  → score ≥ mínimo E 7/7 gates PASS?
       sim → PARA, vai pra Fase 6
       não → score do ciclo N é MENOR que o melhor já visto?
                sim → registrar regressão; considerar reverter pro artefato do melhor ciclo
                      antes de aplicar a próxima correção (não empilhar correção sobre um
                      estado pior que um anterior)
             → 2 ciclos seguidos com score parado (±2 pts) E as MESMAS prioridades
               reaparecendo → GAUNTLET STAGNATION DETECTED, para e reporta causa provável
             → senão → 3 prioridades → Builder corrige → repete
```

Reporte compacto ao fim de cada ciclo (ciclo, score, gates, 3 prioridades, e se houve
regressão/reversão). Guardar o score de cada ciclo em `state/SCORE_HISTORY.md` — é o que permite
detectar regressão e estagnação de verdade, não só "ainda não passou".

## FASE 6 — Relatório final
`reports/FINAL_REPORT.md` — mesmo formato da rodada 1 (score, evolução por ciclo, decisões de
arquitetura validadas, limitações, assunções não confirmadas). Se o loop parar por estagnação em
vez de PASS, entregar o **melhor ciclo já visto**, não o último, com a causa provável registrada.

---

## §2 — Papéis e teto de agentes (regra dura)

| Papel | Máximo simultâneo |
|---|---|
| Orchestrator | 1 (você, nunca delega a própria orquestração) |
| Builder | 1 por ciclo — sem fan-out |
| Judge | 1 por ciclo — sem fan-out |

- **Teto de ciclos:** o número definido na Fase 0 (padrão 5).
- **Teto de invocações de agente na execução inteira:** 1 (Discovery, se precisar de subagente) +
  até 5 Builder + até 5 Judge ≈ 11 no pior caso. Bater o teto sem PASS → para e reporta, não pede
  mais orçamento em silêncio.
- **Falha de subagente por limite técnico (orçamento de API, timeout, crash) antes de produzir
  qualquer alteração:** Orchestrator aplica a correção sinalizada diretamente, no mesmo escopo
  que pediria ao Builder, em vez de reabrir um agente novo. Aconteceu na rodada 1 (ciclo 2) —
  agora é regra escrita, não decisão ad-hoc.
- **Nunca abrir agente para:** reler arquivo já lido na sessão, correção de 1-3 linhas com escopo
  já claro, ou "confirmar" o que o `playwright test` já confirmou.

## §3 — Regras do Judge cego (sem mudança da rodada 1 — funcionou)
Recebe só: mockup + `criteria/` + resultado bruto do Playwright. Nunca recebe justificativa do
Builder, histórico de ciclos anteriores, ou os arquivos de `research/`/`state/`. Não edita nada.
Formato de saída fixo: nota por item + gates PASS/FAIL + score total + 3 prioridades ordenadas
(funcional → usabilidade → fluxo → clareza → organização → visual → cosmético).

---

## Verificação (ao final)
1. `npx playwright test` dentro da pasta da sandbox — todos os cenários da Fase 3 passam.
2. Abrir o mockup no navegador e navegar à mão pelos fluxos principais.
3. Ler `reports/FINAL_REPORT.md`.
4. `git status` na raiz do projeto — nada modificado fora da pasta da sandbox definida na Fase 0.

## Fronteiras — herdadas, ver Fase 0 para confirmação
Mesmas da rodada 1: `src/**` · `docs/**` (exceto este plano e o backlog) · `package.json` raiz ·
`node_modules/` · `vite.config.ts` · `vitest.config.ts` · `wrangler.jsonc` · `.gitignore` da
raiz · qualquer deploy.

Ao fim: **para e espera aprovação explícita do Mestre.** Score ≥ 90 não autoriza produção.
