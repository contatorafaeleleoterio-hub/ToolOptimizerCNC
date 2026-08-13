# Veredito do Juiz Cego — Gauntlet v2 — Ciclo 3

> Avaliação cega: apenas `mockup/index.html`, `JUDGE_CRITERIA.md`, `DESIGN_TOKENS.md` e o resultado numérico do Playwright (23/23 PASS, 0 FAIL) foram consultados. Nenhum arquivo de contrato, teste ou veredito anterior foi lido. Revisão feita por leitura integral do HTML/CSS/JS e simulação mental dos fluxos de operador (troca de família/tipo, cálculo básico, bloqueios de L/D, máquina e furo prévio de rosca, modo rápido, fator de segurança).

---

## 1. Notas por Categoria

| # | Categoria | Nota | Justificativa |
|---|---|---|---|
| 1 | Correção de cálculo e cobertura multi-ferramenta (20 pts) | **18/20** | RPM/Vf/Kienzle/Pc dimensionalmente corretos e coerentes com as fórmulas padrão. Casos de borda tratados explicitamente: `Dc` de esférica e toroidal, afinamento de cavaco (Woxén e por `κ`), compensação `Vf_centro < Vf_periferia` na fresa de rosca, avanço travado no passo do macho, `ap=(Øf-Øi)/2` no mandrilamento, fatores HSS/HSS-Co/MD/MD-revestido aplicados em todos os `vc`. Pequeno ponto de atenção: o Vc de roscamento e o torque estimado do macho são estimativas internas assumidas (declaradas no comentário do arquivo), sem fonte de catálogo — reduz confiança nesse sub-caso. |
| 2 | Usabilidade operacional (15 pts) | **13/15** | Ordem de campos segue Contexto → Dimensões → Parâmetros → Resultado. Modo Rápido reduz corretamente para Material da Peça + Diâmetro + Operação, mas o bloco "Ajustes" (Fator de Segurança) continua visível mesmo no modo rápido, o que quebra levemente a promessa de "exatamente 3 campos". |
| 3 | Prevenção e recuperação de erro (15 pts) | **14/15** | Semáforo de 4 níveis aplicado de ponta a ponta, com mensagens sempre incluindo ação corretiva numérica em português (ex.: "reduza o balanço para no máximo X mm", "aumente fn para pelo menos Y mm/rot"). Validação de vazio/zero/negativo cobre todos os campos numéricos visíveis por tipo. `try/catch` no `recalc()` evita tela travada em qualquer erro inesperado. |
| 4 | Fluxo e estabilidade de layout (12 pts) | **11/12** | Troca de família/tipo não reconstrói o DOM — apenas alterna `hidden`/labels dos mesmos elementos, com transição suave (`max-height`/`opacity`). Rotação e Avanço permanecem fixos na Zona 4 em todo o fluxo. Valores digitados manualmente são preservados via `fieldUserEdited`; apenas campos sem edição prévia recebem defaults ao trocar de tipo — comportamento correto, mas a cobertura desse rastreamento não inclui todos os campos numéricos (ex.: `profundidadeH`, `fnManual`), então nem todo campo tem a mesma garantia de persistência semântica. |
| 5 | Conformidade HMI industrial — ISA-101 (12 pts) | **11/12** | Fundo neutro claro, alvos de toque de 44px (formulário) e 56px (CTA) respeitados, tipografia limitada a 4 tamanhos (11/13/15/32px), cor reservada ao semáforo nas zonas de estado. O laranja de marca (`--accent`) é usado no CTA como ação principal — tecnicamente fora da paleta de semáforo, mas é um token de marca distinto e documentado, não decorativo. |
| 6 | Clareza dos parâmetros e procedência (10 pts) | **9/10** | Todos os campos visíveis têm rótulo em português e unidade. Badge "Estimado" no material e texto de fonte do Vc ("catálogo interno validado" / "estimativa interna") presentes. Falta indicar a procedência do fator de material da ferramenta (HSS/MD/etc.) de forma explícita fora do texto de resumo compacto da Zona 3. |
| 7 | Arquitetura declarativa percebida (6 pts) | **6/6** | Os 18 tipos usam o mesmo painel/zonas de resultado; os campos aparecem/somem conforme o schema `TOOLS[tipo].campos`, com rótulos contextuais (`labels`) por tipo — a leitura declarativa do schema é evidente ao navegar entre os tipos. |
| 8 | Fidelidade aos tokens FlowNC DS (5 pts) | **5/5** | Todos os valores Hex, fontes (IBM Plex Sans/Mono), espaçamentos, raios, sombras e alvos de toque do `DESIGN_TOKENS.md` foram reproduzidos literalmente no `:root`. Nenhuma cor arbitrária identificada. |
| 9 | Testes objetivos (Playwright) (5 pts) | **4/5** | 23/23 cenários executados passaram (0 FAIL) — está na faixa "22-23 PASS, sem falhas críticas" da matriz, não na faixa máxima de 24/24. |

**Soma bruta: 18+13+14+11+11+9+6+5+4 = 91**

---

## 2. Status dos 8 Gates

| Gate | Descrição | Status | Justificativa |
|---|---|---|---|
| 1 | Score mínimo ≥ 90/100 | **PASS** | Score final = 91. |
| 2 | Cobertura dos 18 tipos | **PASS** | `TOOLS` contém exatamente 18 chaves (8 fresar + 6 furar + 3 roscar + 1 mandrilar), cada uma com `campos` próprios renderizados via `updateFieldsForTipo`; não há indício de erro JS na leitura do schema. |
| 3 | Sem falhas funcionais críticas (NaN/undefined/null/Infinity) | **PASS** | `fmt()` centraliza toda formatação numérica e retorna `—` para qualquer valor não finito; não há interpolação direta de número bruto sem passar por `fmt()` nas mensagens e resultados. |
| 4 | Console limpo | **PASS** (por revisão estática) | `recalc()` está envolto em `try/catch` com fallback gracioso; não há acesso a propriedades de elementos inexistentes sem guarda (`if (!el) return`). Não foi executado em navegador real neste ciclo — avaliação por leitura de código. |
| 5 | Prevenção contra entradas inválidas | **PASS** | `validate()` cobre vazio, não numérico e ≤0 para todo campo visível do tipo, com mensagem de correção em português; nunca deixa o cálculo prosseguir com dado inválido. |
| 6 | Regras de bloqueio por família | **PASS** | L/D>6 fresar (`ldSemaforoFresar`), L/D>5 mandrilar (`ldSemaforoMandrilar`), furo prévio insuficiente em roscamento (`computeThreading`), e torque/potência/RPM/avanço de máquina excedidos (`checkMachineLimits` + checagem própria do macho) — todos implementados e operantes. |
| 7 | Fluxo de operação compreensível | **PASS** | Consegui narrar o fluxo sem qualquer código de teste: selecionar Família → Tipo → Material da Peça/Ferramenta → Operação → preencher Dimensões/Parâmetros específicos do tipo → ajustar Fator de Segurança → "Calcular Parâmetros" → ler semáforo, Rotação/Avanço, Índice de Saúde e detalhes/fórmulas expansíveis. Modo Rápido é opcional e claramente rotulado. |
| 8 | Adequação ao chão de fábrica | **PASS** (ver frase abaixo) | — |

**Nenhum gate em FAIL — ciclo aprovado.**

---

## 3. Score Final

# **91 / 100**

---

## 4. Top 3 Prioridades de Correção (por gravidade)

1. **[Testes]** Fechar a lacuna para 24/24 no Playwright — identificar qual cenário não foi coberto/passou de forma marginal e reforçar o caso correspondente (gravidade funcional, maior impacto na nota objetiva).
2. **[Usabilidade]** No Modo Rápido, ocultar também o bloco "Ajustes" (Fator de Segurança) para cumprir literalmente a promessa de "exatamente 3 campos" — hoje um 4º controle continua visível e pode gerar dúvida no operador sobre o que é obrigatório.
3. **[Clareza/Fluxo]** Ampliar o rastreamento de edição manual (`fieldUserEdited`) para cobrir todos os campos numéricos com defaults potenciais (ex.: `profundidadeH`, `fnManual`), garantindo que nenhum valor digitado pelo operador seja sobrescrito ao trocar de tipo de ferramenta.

---

## 5. Adequação ao Chão de Fábrica (Gate 8)

A calculadora está **pronta para uso diário por um operador de chão de fábrica**: layout estável, alvos de toque compatíveis com uso de luva, semáforo com correção escrita e numérica em todo bloqueio, e fluxo navegável sem necessidade de manual — a única reserva é a dependência de fonte externa (Google Fonts via CDN), que merece verificação de disponibilidade em rede industrial isolada antes do deploy final.
