# Matriz de Critérios e 14 Gates — Juiz Cego do Refactor Visual

> **CONGELADO EM E1.** Ninguém altera depois — nem Construtor, nem Juiz.
> **Corte de aprovação: 95/100 + 14/14 gates + nenhuma categoria abaixo do piso.**
>
> **Os scores deste loop NÃO são comparáveis com o 91/100 do loop de construção.** A base é outra
> (mockup aprovado em vez de folha em branco) e a matriz é outra: o motor está congelado e
> verificado por script, então o peso migrou do cálculo para o que este loop de fato decide —
> visual, acessibilidade, economia de setup e ajuda.

---

## Como este loop reduz o espaço de opinião

O que dá para medir por script **saiu da avaliação do Juiz**. As categorias marcadas como
`script` chegam ao Juiz com o número já preenchido, e ele **não pode alterá-lo**.

O Juiz é **read-only**: lê o mockup, este arquivo, o Design System e o relatório da suíte. Não
grava em `state/`, não edita teste, não edita critério — quem registra o veredito é o Orquestrador.

**Toda dedução e toda nota cheia exigem evidência citada** — seletor, linha ou elemento concreto.
Nota sem evidência é tratada como nota não justificada e a categoria vai para o piso.

---

## Matriz de pontuação (100 pontos)

| # | Categoria | Pts | Quem pontua | Piso |
|---|---|---|---|---|
| 1 | Correção de cálculo e cobertura das 33 entradas | 12 | script (golden values + integridade) | 10 |
| 2 | Usabilidade operacional: economia de setup + ajuda contextual | 14 | Juiz | 11 |
| 3 | Prevenção e recuperação de erro | 12 | Juiz | 10 |
| 4 | Fluxo e estabilidade de layout | 10 | Juiz | 8 |
| 5 | Conformidade HMI industrial — ISA-101 | 12 | Juiz | 10 |
| 6 | Clareza dos parâmetros e procedência do valor | 8 | Juiz | 6 |
| 7 | Fidelidade ao Design System (tema claro) | 12 | script + Juiz | 10 |
| 8 | Acessibilidade: contraste AA, foco, alvo ≥44px | 12 | script | 10 |
| 9 | Indicadores (3 gauges legíveis) + suíte objetiva | 8 | script + Juiz | 6 |

**Piso por categoria:** nenhuma pode ficar abaixo do valor da coluna, mesmo com o total em 95.
É o que impede um total alto esconder uma categoria podre.

---

### 1. Correção de cálculo e cobertura das 33 entradas — 12 pts *(script)*

Preenchido pelo resultado objetivo, sem julgamento:

- **12 pts:** `goldens.spec.ts` verde (99/99 combinações idênticas) **e** integridade intacta.
- **0 pts:** qualquer divergência. Não há meio-termo — o motor mudou ou não mudou.

### 2. Usabilidade operacional: economia de setup + ajuda contextual — 14 pts *(Juiz)*

Ordem natural de decisão (contexto → categórico → geométrico → ajuste → ação). Modo rápido em 4
campos, com `Z` entre eles (SPEC §9.3). Nenhum campo pedido sem efeito no resultado. Escolha de 1 clique onde há poucas opções.
Ajuda que explica o impacto de cada parâmetro, alcançável por clique e por teclado.

- **12-14:** fluxo sem hesitação; o operador entende o que cada controle muda antes de mexer.
- **8-11:** usável, mas com passo redundante ou ajuda que não explica consequência.
- **0-7:** exige adivinhação, ou pede dado que não muda nada na tela.

### 3. Prevenção e recuperação de erro — 12 pts *(Juiz)*

Entrada vazia, zero, negativa e extrema tratadas com semáforo **e correção escrita em português com
número** ("reduza ap para 2 mm ou a rotação para 4000 rpm"). Bloqueios por família operantes.
Limite de máquina que reage ao perfil informado.

- **10-12:** todo erro traz a saída, por escrito; a tela nunca trava.
- **6-9:** avisos presentes, mas genéricos, sem ação numérica.
- **0-5:** aceita valor absurdo em silêncio.

### 4. Fluxo e estabilidade de layout — 10 pts *(Juiz)*

Trocar tipo ou família não reconstrói a tela. Rotação e avanço ficam no mesmo pixel. Campos comuns
preservam valor. Campo específico aparece e some sem salto.

- **8-10:** zero deslocamento nos elementos fixos, estado comum preservado.
- **4-7:** funciona, com salto perceptível ou perda ocasional de valor.
- **0-3:** troca remonta o formulário.

### 5. Conformidade HMI industrial — ISA-101 — 12 pts *(Juiz)*

**Cinza dominante, cor reservada a anomalia.** Hierarquia clara, no máximo 4 tamanhos de texto,
alvo ≥44px, botão principal 56px, zero elemento decorativo.

- **10-12:** passaria por painel de processo; a cor que aparece significa alguma coisa.
- **6-9:** desvio pontual — cor decorativa ou alvo pequeno.
- **0-5:** interface festiva, incompatível com chão de fábrica.

**Precedência declarada:** onde ISA-101 e fidelidade de marca brigarem, **legibilidade ganha**.
Fidelidade é medida por família de matiz, tipografia e forma — nunca por saturação literal em toda
superfície. O Juiz não decide isso sozinho: está escrito aqui.

### 6. Clareza dos parâmetros e procedência do valor — 8 pts *(Juiz)*

Rótulo em português, unidade visível, e **procedência alcançável a partir de todo número exibido**
— fórmula simbólica, valores substituídos e fonte do dado. Badge de material estimado visível.

- **7-8:** qualquer número leva à conta que o gerou.
- **4-6:** procedência existe, mas não alcança todo resultado principal.
- **0-3:** número sem origem; jargão sem explicação.

### 7. Fidelidade ao Design System (tema claro) — 12 pts *(script + Juiz)*

Tokens de `DS_TEMA_CLARO.md`. **`node scripts/check-tokens.mjs`** confere ausência da paleta antiga
e de hex fora do sistema — o número dele entra fechado, o Juiz não altera. O Juiz avalia a
aplicação: neon restrito à marca, uma rampa de estado só, três níveis de superfície, sem glass,
sem glow.

- **10-12:** paleta limpa e coerente; nenhum hex estranho.
- **5-9:** 1 ou 2 desvios.
- **0-4:** cor arbitrária, ou paleta antiga de volta.

### 8. Acessibilidade: contraste AA, foco, alvo ≥44px — 12 pts *(script)*

Preenchido pelos cenários R13, R14 e R15:

- **12 pts:** contraste ≥4,5:1 em todo texto medido, foco visível em 100% dos elementos alcançáveis
  por teclado, alvo ≥44px nos controles de escolha.
- **6 pts:** um dos três falha.
- **0 pts:** dois ou mais falham.

### 9. Indicadores + suíte objetiva — 8 pts *(script + Juiz)*

4 pts pelos 3 gauges presentes e legíveis (Juiz: ponteiro visível em fundo claro, valor central
legível, cor vinda da rampa de estado). 4 pts pela suíte completa: **23 de regressão + 3 invariantes
+ 1 golden + 21 alvos = 48 cenários**, contagem exata conferida por `check-suites.mjs`.

---

## Os 14 gates — um FAIL reprova tudo

> Um único FAIL derruba o ciclo **mesmo com score ≥ 95**.

| # | Gate | Quem confere |
|---|---|---|
| 1 | Score total ≥ **95**/100 **e** nenhuma categoria abaixo do piso | soma |
| 2 | As 33 entradas do catálogo selecionáveis, cada uma renderizando seus campos sem erro de JS | script — `I01` |
| 3 | Nenhum `NaN`, `undefined` ou `Infinity` visível na tela | script — `I02` |
| 4 | Console sem exceção não tratada durante a suíte | script — `I03` |
| 5 | Entrada inválida tratada com correção escrita, sem travar | script + Juiz |
| 6 | Bloqueios por família operantes (fresar L/D > 6 · mandrilar L/D > 5 · furo prévio · torque) | script |
| 7 | Fluxo compreensível — o Juiz narra a tela sem consultar os testes | Juiz |
| 8 | Adequada para uso diário no chão de fábrica, com justificativa de 1–2 frases | Juiz |
| 9 | Design System aplicado: tokens (`check-tokens.mjs` sem irregularidade), cinza dominante, marca laranja e seleção índigo, 3 gauges read-only, slider de agressividade + 4 controles de ajuste, ajuda inline, escolha segmentada, **recálculo híbrido** (não recalcula antes do 1º Calcular; painel vivo depois dele) | script + Juiz |
| 10 | Contraste AA e foco visível em 100% dos pares medidos | script |
| 11 | Integridade: região `DADOS`, `tests/`, `criteria/`, `scripts/` e `research/` intactos; 99 golden values idênticos | script |
| 12 | Fluxo de entrada: ordem dos 5 blocos, 6 campos mortos ausentes, nenhum tipo acima de 6 campos | script |
| 13 | **Zero requisição externa** — nenhuma rede disparada pela página | script |
| 14 | Perfil de máquina manda no resultado, e todo número principal tem procedência alcançável | script |

---

## Formato obrigatório do veredito

Saída fixa, sempre nesta ordem. Prosa livre é inconsistente entre ciclos e impossível de comparar.

1. **Tabela de notas** — uma linha por categoria (1 a 9), com a nota, o piso e **a evidência
   citada** de cada dedução e de cada nota cheia.
2. **Tabela dos 14 gates** — PASS/FAIL, com o motivo de cada FAIL.
3. **Score final** (0 a 100) e o veredito: APROVADO só com ≥95, 14/14 e nenhuma categoria no chão.
4. **As 3 prioridades de correção**, ordenadas por gravidade: funcional → usabilidade → fluxo →
   clareza → organização → visual → cosmético.

O Juiz nunca recebe o raciocínio do Construtor, nem o histórico de ciclos anteriores.
