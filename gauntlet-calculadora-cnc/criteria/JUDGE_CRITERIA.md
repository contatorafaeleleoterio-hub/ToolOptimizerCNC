# Critérios do Judge — CONGELADO

> Congelado em 12/08/2026, ao fim do Discovery. Ninguém altera depois — nem Builder nem Judge.
> Único ajuste feito nesta versão (autorizado pelo plano): dentro de "Organização da informação",
> sub-item explícito de extensibilidade percebida. Nenhum peso mudou depois disso.

## Matriz de pontuação (100 pts)

### 1. Usabilidade operacional — 20 pts
Consegue usar sem manual. Campos na ordem que o operador pensa (contexto → parâmetros → resultado).
Cliques mínimos até o primeiro resultado. Modo Rápido entrega resultado em 3 campos (T12).
- 16-20: fluxo óbvio, zero hesitação esperada, atalhos claros (Rápido × Avançado)
- 10-15: usável mas exige alguma tentativa/erro
- 0-9: confuso, requer ler código-fonte pra entender o que preencher

### 2. Clareza dos parâmetros — 15 pts
Cada campo tem label, unidade visível e (quando aplicável) origem do valor sugerido
("faixa Sandvik P, metal duro revestido"). Nenhum campo com nome só de variável (`fz`, `ap`) sem explicação.
- 12-15: toda entrada e saída autoexplicativa, unidade sempre visível
- 7-11: a maioria clara, 1-2 campos ambíguos
- 0-6: jargão sem explicação, unidades faltando

### 3. Fluxo de cálculo — 15 pts
Trocar de ferramenta não reconstrói a tela (T11). RPM e Avanço sempre no mesmo pixel.
Resultado atualiza sem recarregar página. Toggle Rápido/Avançado funciona sem perder dados preenchidos.
- 12-15: transições suaves, layout estável, sem saltos
- 7-11: funciona mas com reflow perceptível ou perda ocasional de estado
- 0-6: trocar contexto reorganiza a tela ou perde dados

### 4. Prevenção de erros — 15 pts
Valores inválidos/extremos tratados com aviso, não crash. Limites de máquina, L/D e engajamento
mostram semáforo com correção sugerida (nunca só "erro"). Avanço mínimo do U-drill, hm da broca com insertos etc.
- 12-15: todo caso de borda (T05, T06, T10, T13) tratado com mensagem acionável
- 7-11: maioria tratada, 1-2 casos deixam a UI em estado estranho sem crash
- 0-6: valor inválido quebra o cálculo, tela em branco, ou NaN visível

### 5. Organização da informação — 10 pts
Hierarquia visual clara: contexto no topo, parâmetros à esquerda, resultado à direita — nunca competindo.
**Extensibilidade percebida** (sub-item explícito, é o objetivo desta etapa): ao trocar família/ferramenta,
os campos comuns permanecem na mesma posição e os resultados não são reposicionados.
- 8-10: hierarquia impecável e extensibilidade visível ao trocar de ferramenta
- 4-7: hierarquia ok, mas extensibilidade falha (campos comuns pulam de posição)
- 0-3: sem hierarquia clara, tudo empilhado sem prioridade visual

### 6. UI / Design — 10 pts
Usa os tokens reais (`#00D9FF`, `#39FF14`, `#0F1419`, glass `rgba(22,27,34,.7)+blur(24px)`,
Inter + JetBrains Mono). Uma paleta de estado só (não duplica ciano/gauge — dívida do §18 do DS canônico).
- 8-10: tokens corretos, dark theme coerente, sem paleta duplicada
- 4-7: tokens majoritariamente corretos, 1-2 desvios
- 0-3: paleta genérica ou não segue os tokens do projeto

### 7. Legibilidade / densidade — 5 pts
Números em `font-mono`. Contraste suficiente. Não lotado a ponto de exigir zoom ou scroll horizontal.
- 4-5: denso mas legível, mono em todo número
- 2-3: legível com esforço
- 0-1: ilegível ou estourando viewport

### 8. Consistência visual — 5 pts
Mesmo espaçamento, raio de borda, peso de fonte e cor de estado em toda a tela — nenhum componente
"escapa" do padrão dos outros.
- 4-5: consistente em toda a tela
- 2-3: 1-2 inconsistências pontuais
- 0-1: cada bloco parece de um sistema diferente

### 9. Testes funcionais — 5 pts
Baseado no resultado do `npx playwright test` (T01-T13), não em julgamento do Judge.
- 5: todos os 13 cenários passam
- 3-4: até 2 falhas, nenhuma crítica (T01-T04, T10, T13)
- 0-2: 3+ falhas ou qualquer falha crítica

**TOTAL: soma dos 9 itens, máximo 100.**

---

## Os 7 gates (todos obrigatórios — FAIL em qualquer um = FAIL, mesmo com score ≥ 90)

1. **Score ≥ 90**
2. **Nenhuma falha funcional crítica** — cálculo errado, resultado NaN/undefined visível, botão que não responde
3. **Todos os fluxos principais funcionam** — T01, T02, T03, T09, T12 passam sem intervenção manual
4. **Nenhum erro JavaScript crítico** — console limpo de uncaught exceptions durante os 13 cenários
5. **Entradas inválidas tratadas** — T05, T06 não quebram a tela nem produzem resultado silenciosamente errado
6. **Fluxo principal compreensível** — Judge consegue narrar o que a tela está pedindo sem consultar os testes
7. **Judge considera adequada para uso diário** — julgamento qualitativo final, registrado com justificativa de 1-2 frases

---

## Regras do Judge

- Recebe **apenas**: caminho do `mockup/index.html`, este arquivo, `tests/TEST_SCENARIOS.md` e o resultado bruto do `npx playwright test`.
- **Nunca recebe**: justificativa do Builder, histórico de decisões, ciclos anteriores.
- **Não pode editar** mockup, critérios ou testes — só escrever o veredito em `state/`.
- Para cada ciclo: nota por item (1-9), gates (pass/fail cada um), e **3 prioridades de correção**, ordenadas por: funcional → usabilidade → fluxo → clareza → organização → visual → cosmético.
