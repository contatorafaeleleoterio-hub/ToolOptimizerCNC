# Relatório Final — Gauntlet Loop v2: Calculadora Multi-Ferramenta

> **PASS ≠ aprovação para produção.** Este loop valida uma tese arquitetural de mockup em sandbox,
> sob regras de HMI industrial e tokens de design isolados do produto atual. Score ≥ 90 exige
> **aprovação explícita do Rafael** para qualquer passo em direção a `src/`.

## Resultado

**Score final: 91/100 — 8/8 gates PASS — aprovado no ciclo 3 (de um teto de 5).**

## Série por ciclo

| Ciclo | Playwright | Score Juiz | Gates | Resultado |
|---|---|---|---|---|
| 1 (build interno, 4 rodadas de fix) | 8/24 → 11/24 → 21/23 → 23/23 | Juiz não acionado até suíte verde | — | build interno |
| 1 (julgado) | 23/23 | 79/100 | 6/8 | REPROVADO — faltava bloqueio de potência/torque/RPM/avanço em Fresar/Furar/Mandrilar |
| 2 (julgado) | 23/23 | 80/100 | 6/8 | REPROVADO — faltava bloqueio de furo prévio insuficiente no roscamento |
| 3 (julgado) | 23/23 | **91/100** | **8/8** | **APROVADO** |

Detalhe completo de cada veredito: `state/GAUNTLET_STATE.md` (ciclos 1-2) e
`state/JUDGE_VERDICT_CICLO3.md` (ciclo 3, veredito que decidiu o PASS).

## Decisões de arquitetura validadas

- **Schema declarativo por tipo + 4 funções puras de família + camada de apresentação genérica**
  (tese central do loop, §10 da SPEC): confirmada pelo Juiz em 3 ciclos seguidos com nota máxima ou
  quase máxima na categoria 7 (Arquitetura declarativa percebida — 6/6 no ciclo 3). Os 18 tipos
  reutilizam as mesmas 6 zonas fixas de resultado; trocar tipo/família não reconstrói o DOM.
- **Tokens FlowNC DS (tema claro) sem herança do ToolOptimizer atual:** 5/5 nos 3 ciclos julgados —
  nenhuma cor arbitrária identificada pelo Juiz.
- **Semáforo de 4 níveis com correção numérica escrita:** validado nos gates 3, 5 e 6 nos 3 ciclos.

## O que foi corrigido ao longo do loop

- **Build interno (pré-julgamento):** mismatch de `value` no select de material, Z padrão não
  pré-preenchido, demais campos numéricos sem default, formatação decimal com vírgula quebrando
  asserção de teste, designação de rosca padrão bloqueando cálculo espuriamente.
- **Ciclo 1→2 (pós-Juiz):** faltava bloqueio de potência/torque/RPM/avanço de máquina fora do
  roscamento (falha de segurança real — um resultado podia aparecer "Verde" excedendo a capacidade
  física da máquina); transição abrupta de campos; botão de Modo Rápido abaixo do alvo de toque.
- **Ciclo 2→3 (pós-Juiz):** faltava bloqueio de furo prévio insuficiente no roscamento (só existia
  o cálculo do recomendado, nunca a validação de um furo real informado); faltava indicação de
  procedência do Vc por material; fórmulas empíricas do roscamento sem sinalização de confiança.

## Limitações e suposições declaradas (herdadas do Builder, nunca corrigidas por não estarem no
## escopo dos 8 gates)

1. Vc de roscamento = 15% do Vc de fresamento × fator de ferramenta — estimativa interna, sem
   fonte de catálogo. Sinalizada na UI como "(estimativa interna)".
2. Torque estimado do macho — fórmula empírica própria, calibrada só para não bloquear M10/aço
   comum e bloquear M16/material duro. Sinalizada na UI da mesma forma.
3. Materiais: 3 validados (Aço 1020, 1045, Inox 304) + 9 estimados (fonte:
   `docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md`, mais 3 acréscimos ISO K/S sem fonte formal —
   GG25, GGG50, Ti-6Al-4V), badge "Estimado" visível.
4. Dependência de Google Fonts via CDN (IBM Plex Sans/Mono) — mockup não funciona 100% offline sem
   a fonte exata; ressalva do Juiz no ciclo 3 para rede industrial isolada.
5. Prioridades remanescentes do próprio veredito de aprovação (não bloqueiam o PASS, mas ficam
   registradas): Playwright em 23/23 não 24/24 (rubrica pede 24 para nota máxima na categoria 9);
   Modo Rápido ainda expõe o bloco de Fator de Segurança, além dos 3 campos prometidos;
   rastreamento de "edição manual" de campos não cobre 100% dos campos numéricos (`profundidadeH`,
   `fnManual`).

## Escopo que ficou de fora (por decisão da Fase 0, não é pendência)

Tabelas de consulta como tela (§7 da SPEC), persistência (§13), fórmulas 29-30, tema escuro,
unidades imperiais, mobile.

## Verificação

- `npx playwright test` dentro de `gauntlet-calculadora-cnc-v2/`: 23/23 PASS.
- Mockup em `mockup/index.html`, abre via `file://`, navegado à mão pelo Juiz cego (fresar, furar,
  roscar, mandrilar, modo rápido, casos de bloqueio) nos 3 ciclos julgados.
- `git status` na raiz do projeto: só `gauntlet-calculadora-cnc-v2/` e os 2 planos deste loop foram
  tocados — nada em `src/`, nada em `gauntlet-calculadora-cnc/` (rodada 1, preservada intacta).

## Próximo passo

Nenhum, sem sinal do Rafael. **Este PASS não autoriza implementar em produção.**
