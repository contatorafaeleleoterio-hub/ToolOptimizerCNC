# Veredito do Juiz Cego — Gauntlet v2 — Ciclo 2

> Avaliação cega: apenas `mockup/index.html`, `criteria/JUDGE_CRITERIA.md`, `criteria/DESIGN_TOKENS.md` e o resultado numérico do Playwright (23/23 PASS, 0 FAIL) foram consultados. Nenhum arquivo de contrato do Construtor, teste, estado anterior ou spec do projeto foi lido.

## 1. Notas por Categoria (0–100)

| # | Categoria | Nota | Justificativa |
|---|---|---|---|
| 1 | Correção de cálculo e cobertura multi-ferramenta | 16/20 | Fórmulas base (RPM, Vf, Kienzle, MRR) corretas e consistentes; casos de borda de Dc para toroidal/esférica/chanfro tratados corretamente; ap = (Øf−Øi)/2 e avanço travado no passo do macho corretos. Perde pontos por assumir Vc de roscamento = 15% do Vc de fresamento (arbitrário, sem base de catálogo visível) e por uma fórmula de torque de macho totalmente empírica/não rastreável a norma. Comentário morto em `fresa_disco` ("inversão geométrica") que não faz nada (`apEff=ap; aeEff=ae`) sugere lógica pretendida mas não implementada. |
| 2 | Usabilidade operacional | 13/15 | Ordem de campos segue exatamente Contexto → Dimensões → Parâmetros → Resultado. Modo Rápido reduz corretamente para os 3 campos exigidos (Material da Peça, Diâmetro, Operação), escondendo os demais blocos sem exigir interação extra. Pequena perda por o Modo Rápido sempre assumir fresamento genérico (Z4/ap2/ae2) sem indicar isso com destaque suficiente na UI além do texto de resumo. |
| 3 | Prevenção e recuperação de erro | 10/15 | Validação de campo vazio/negativo/inválido com mensagem corretiva textual funciona bem; L/D e limites de máquina (RPM/potência/torque/avanço) bloqueiam com correção numérica explícita ("reduza X para no máximo Y mm"); `try/catch` evita crash total. Porém falta uma checagem central exigida pela matriz: **não existe campo para o operador informar o furo já pré-executado na peça** — o sistema só calcula o furo prévio recomendado, nunca valida um furo informado como insuficiente. Essa regra de bloqueio fica sem cobertura prática. |
| 4 | Fluxo e estabilidade de layout | 10/12 | Trocar família/tipo não desmonta o painel de resultado (zona 4 é DOM estático, só o texto muda). Campos comuns (Diâmetro, Material) persistem valor via `fieldUserEdited`. Transição de linhas usa `max-height`/`opacity` suave. Pequena perda: ao trocar de família o `<select>` de tipo é inteiramente re-populado (inevitável, mas gera uma pequena "queda" da seleção para o primeiro tipo da nova família sem aviso). |
| 5 | Conformidade HMI industrial (ISA-101) | 10/12 | Fundo neutro claro, cor reservada ao semáforo, alvos de toque ≥44px respeitados (CTA 56px, botões 44px, inclusive o Modo Rápido corrigido explicitamente para 44px via comentário no CSS). Tipografia efetivamente limitada a 4 tamanhos (11/13/15/32px). Pequena perda: slider de fator de segurança usa `--h-btn` (44px) como altura do próprio `<input type=range>`, o que é uma aplicação não convencional do token (a faixa de clique real do slider nativo é bem menor que 44px visualmente). |
| 6 | Clareza dos parâmetros e procedência | 7/10 | Todos os campos têm rótulo em português e unidade visível; badge "Estimado" aparece para materiais não validados. Falta indicação de procedência/catálogo por valor de corte (ex.: fonte "Sandvik" ou norma) — os Vc vêm de uma tabela interna sem citar origem, mesmo para materiais "validados". |
| 7 | Arquitetura declarativa percebida | 5/6 | O objeto `TOOLS` com `campos[]` visivelmente dirige quais linhas aparecem por tipo (`updateFieldsForTipo`), e os 18 tipos reutilizam as mesmas 6 zonas de resultado padronizadas — a extensibilidade é perceptível navegando. |
| 8 | Fidelidade aos tokens FlowNC DS | 5/5 | Todos os valores Hex, fontes (IBM Plex Sans/Mono), espaçamentos (4–64px), raios e sombras conferem exatamente com `DESIGN_TOKENS.md`. Fallback alpha não foi necessário/usado indevidamente. |
| 9 | Testes objetivos (Playwright) | 4/5 | Resultado informado é "23/23 PASS, 0 FAIL". A matriz define 24/24 para nota máxima; com 23 cenários passando (independente do denominador informado ser 23), a pontuação cai na faixa 22-23 PASS = 3-4 pts. Atribuída a nota superior da faixa por não haver nenhuma falha reportada. |

**Score Final: 80 / 100**

---

## 2. Status dos 8 Gates

| Gate | Descrição | Status | Justificativa |
|---|---|---|---|
| 1 | Score mínimo ≥ 90/100 | **FAIL** | Score obtido: 80/100. |
| 2 | Cobertura dos 18 tipos | PASS | `TOOLS` define 18 chaves (8 fresar + 6 furar + 3 roscar + 1 mandrilar), todas com `campos[]` e ramos de cálculo próprios em `computeMilling`/`computeDrilling`/`computeThreading`/`computeBoring`; nenhuma rota de código deixa de tratar um tipo. |
| 3 | Sem falhas funcionais críticas (NaN/undefined/Infinity visíveis) | PASS | Toda saída passa por `fmt()`, que retorna `—` para valores não finitos; não há concatenação direta de número cru na UI. |
| 4 | Console limpo (zero exceções não tratadas) | PASS | Não verificável por execução direta pelo Juiz (sem navegador), mas por inspeção estática todo o cálculo roda dentro de `recalc()` protegido por `try/catch`, e o número informado pelo Playwright (0 FAIL) é consistente com ausência de exceções na suíte. |
| 5 | Prevenção contra entradas inválidas | PASS | Campos vazios, não numéricos ou ≤0 são barrados com mensagem textual antes de qualquer cálculo; tela nunca trava (fallback genérico no catch). |
| 6 | Regras de bloqueio por família | **FAIL** | Fresar L/D>6 ✓, Mandrilar L/D>5 ✓, Torque de máquina excedido ✓ — mas "furo prévio insuficiente em roscamento" **não está implementado**: não existe campo de entrada para o furo já executado na peça, apenas o cálculo do furo prévio recomendado como saída. O bloqueio físico exigido pela matriz para essa condição não pode ser acionado pelo operador. |
| 7 | Fluxo de operação compreensível | PASS | O fluxo é narrável sem consultar código de teste: escolher Família → Tipo → Material da Peça → Material da Ferramenta → Operação, preencher Dimensões/Parâmetros específicos do tipo, ajustar Fator de Segurança e clicar "Calcular Parâmetros" (ou digitar, já que há recálculo automático em `input`/`change`). |
| 8 | Adequação ao chão de fábrica | **FAIL** | Ver seção 5. |

---

## 3. Top 3 Prioridades de Correção (por gravidade)

1. **[Funcional/Segurança]** Implementar a validação de "furo prévio insuficiente" no roscamento: adicionar um campo para o operador informar o diâmetro do furo já executado e comparar contra o furo prévio recomendado, bloqueando quando insuficiente. Hoje o sistema só calcula o valor ideal, nunca valida a entrada real — o Gate 6 fica sem cobertura prática para essa regra.
2. **[Funcional]** Substituir ou justificar as fórmulas empíricas não rastreáveis (Vc de roscamento = 15% arbitrário do Vc de fresamento; torque estimado do macho por fórmula própria não documentada) por valores de catálogo/norma, ou ao menos sinalizar visualmente na UI que esses números são estimativas de baixa confiança — hoje aparecem com a mesma autoridade visual dos demais resultados calculados.
3. **[Clareza/Procedência]** Adicionar indicação de procedência/fonte dos valores de Vc por material (ex.: catálogo, norma ou "estimativa interna"), inclusive para materiais marcados como "validado" — atualmente só existe o badge binário "Estimado", sem explicar de onde vêm os números "validados".

---

## 4. Adequação ao Chão de Fábrica (Gate 8)

**Não está adequada para uso diário no chão de fábrica ainda.** A calculadora tem um fluxo compreensível, HMI limpa e cálculos majoritariamente corretos, mas a ausência de validação do furo prévio real no roscamento é uma lacuna de segurança física explicitamente exigida pela matriz, e duas fórmulas centrais (Vc e torque de macho) são estimativas não calibradas apresentadas com a mesma confiança visual dos demais números — isso é arriscado para uma ferramenta que "recomenda" parâmetros de corte reais.
