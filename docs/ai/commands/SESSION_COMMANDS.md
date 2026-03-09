# Comandos de Sessao — FENIX

> 12 comandos semanticos para controlar o fluxo de trabalho do assistente.
> Cada comando define: objetivo, quando usar, arquivos consultados, acoes e resultado.

---

## 1. `iniciar sessao`

**Objetivo:** Preparar o assistente para trabalhar com contexto completo.

**Quando usar:** Inicio de toda sessao (obrigatorio — ja mandatado pelo CLAUDE.md).

**Arquivos consultados:**
- `docs/PROXIMA_SESSAO.md` (ponto de entrada)
- `CLAUDE.md` (regras do projeto)

**Acoes do assistente:**
1. Ler `docs/PROXIMA_SESSAO.md` do inicio ao fim
2. Executar quality gates: `npx vitest run`, `npx tsc --noEmit`, `npx vite build`
3. Comparar estado reportado vs estado real (testes passando, branch correta)
4. Reportar estado ao usuario em formato tabela

**Resultado:** Tabela de estado do projeto + confirmacao de que quality gates passam.

---

## 2. `revisar contexto`

**Objetivo:** Obter visao completa do projeto para tomar decisoes informadas.

**Quando usar:** Antes de iniciar tarefa complexa, quando assistente troca, ou quando solicitado.

**Arquivos consultados:**
- `CLAUDE.md`
- `docs/PROXIMA_SESSAO.md`
- `.claude/.../memory/MEMORY.md`
- `docs/ai/memory/ENGINEERING_MEMORY.md`
- `docs/MELHORIAS_CONTINUAS.md`

**Acoes do assistente:**
1. Ler os 5 arquivos acima
2. Identificar estado atual (versao, testes, deploy)
3. Identificar tarefas pendentes
4. Resumir em formato conciso para o usuario

**Resultado:** Resumo de 10-15 linhas com estado + pendencias + recomendacoes.

---

## 3. `planejar sessao`

**Objetivo:** Definir scope e prioridades para a sessao atual.

**Quando usar:** Apos `iniciar sessao`, antes de comecar a trabalhar.

**Arquivos consultados:**
- `docs/MELHORIAS_CONTINUAS.md` (backlog priorizado)
- `docs/PROXIMA_SESSAO.md` (proximos passos)
- Pedido do usuario (se houver)

**Acoes do assistente:**
1. Listar tarefas pendentes do backlog
2. Cruzar com pedido do usuario
3. Propor scope realista para a sessao (2-3 tarefas maximo)
4. Criar todo list com as tarefas propostas

**Resultado:** Lista de tarefas priorizadas com estimativa de complexidade.

---

## 4. `analisar arquitetura`

**Objetivo:** Avaliar impacto arquitetural de uma mudanca proposta.

**Quando usar:** Feature tocando 3+ arquivos, mudanca no store, nova dependencia, refactoring.

**Arquivos consultados:**
- `docs/architecture/ADR-*.md` (decisoes anteriores)
- `docs/AIOS_INTEGRATION.md` (framework)
- Codigo-fonte relevante via Glob/Grep/Read

**Acoes do assistente:**
1. Seguir `docs/ai/protocols/ARCHITECTURE_PROTOCOL.md`
2. Mapear codigo existente relacionado
3. Verificar se ADRs anteriores se aplicam
4. Identificar acoplamento e riscos
5. Produzir analise estruturada

**Resultado:** Analise com: componentes afetados, riscos, recomendacao, ADR necessario (sim/nao).

---

## 5. `iniciar desenvolvimento`

**Objetivo:** Comecar implementacao seguindo protocolo story-driven.

**Quando usar:** Quando ha uma tarefa clara para implementar.

**Arquivos consultados:**
- `docs/stories/` (story da feature)
- `docs/ai/protocols/FEATURE_PROTOCOL.md`
- Codigo-fonte relevante

**Acoes do assistente:**
1. Verificar se story existe em `docs/stories/`
2. Rodar quality gates pre-mudanca (baseline)
3. Seguir FEATURE_PROTOCOL passo a passo
4. Implementar com TDD para calculos, testes integracao para componentes

**Resultado:** Codigo implementado + testes passando + commit convencional pronto.

---

## 6. `revisar codigo`

**Objetivo:** Review das mudancas antes de commit.

**Quando usar:** Apos implementar, antes de commitar.

**Arquivos consultados:**
- `git diff` (staged + unstaged)
- `CLAUDE.md` (convencoes: kebab-case, PascalCase, zero any, conventional commits)

**Acoes do assistente:**
1. Executar `git diff` para ver todas as mudancas
2. Verificar convencoes de nomenclatura (CLAUDE.md)
3. Verificar TypeScript strict (zero any)
4. Verificar testes cobrindo novas funcionalidades
5. Verificar que nao ha segredos ou arquivos desnecessarios

**Resultado:** Review com: aprovado/reprovado + lista de issues encontradas.

---

## 7. `iniciar debug`

**Objetivo:** Diagnosticar e corrigir um bug de forma estruturada.

**Quando usar:** Quando ha um bug reportado ou teste falhando.

**Arquivos consultados:**
- `docs/ai/protocols/DEBUG_PROTOCOL.md`
- `docs/technical/CASOS_TESTE_REFERENCIA.md` (valores de referencia)
- `docs/PROXIMA_SESSAO.md` (armadilhas conhecidas)

**Acoes do assistente:**
1. Seguir DEBUG_PROTOCOL: reproduzir → isolar → diagnosticar → fix → verificar
2. Checar tabela de armadilhas conhecidas antes de investigar
3. Aplicar fix minimo (menor mudanca possivel)
4. Verificar suite completa apos fix

**Resultado:** Bug corrigido + teste que prova a correcao + suite verde.

---

## 8. `registrar decisao`

**Objetivo:** Documentar uma decisao arquitetural ou tecnica importante.

**Quando usar:** Mudanca arquitetural, adicao de dependencia, feature descartada, paradigma alterado.

**Arquivos consultados:**
- `docs/ai/protocols/DECISION_PROTOCOL.md`
- `docs/architecture/ADR-*.md` (modelo existente)

**Acoes do assistente:**
1. Seguir DECISION_PROTOCOL
2. Determinar se merece ADR completo ou registro leve
3. Se ADR: criar `docs/architecture/ADR-NNN-descricao.md` seguindo template
4. Se leve: anotar em session notes

**Resultado:** ADR criado ou decisao registrada em session notes.

---

## 9. `atualizar documentacao`

**Objetivo:** Manter documentacao sincronizada com estado do codigo.

**Quando usar:** Apos implementar feature, corrigir bug, ou ao final da sessao.

**Arquivos a atualizar (sugerir, nao auto-escrever):**
- `docs/PROXIMA_SESSAO.md` — estado do projeto, sessao summary
- `docs/MELHORIAS_CONTINUAS.md` — novas sugestoes ou remocao de itens feitos
- `docs/sessions/` — criar nota de sessao
- `docs/ai/memory/` — aprendizados da sessao

**Acoes do assistente:**
1. Identificar quais docs precisam de atualizacao
2. Preparar o conteudo das atualizacoes
3. **Apresentar ao usuario para aprovacao antes de escrever**
4. Aplicar somente apos confirmacao

**Resultado:** Lista de atualizacoes propostas aguardando aprovacao.

---

## 10. `registrar aprendizado`

**Objetivo:** Capturar conhecimento da sessao para uso futuro.

**Quando usar:** Ao descobrir algo novo, resolver bug complexo, ou identificar padrao util.

**Arquivos a atualizar:**
- `docs/ai/memory/ENGINEERING_MEMORY.md` (aprendizados tecnicos)
- `docs/ai/memory/ARCHITECTURE_LEARNINGS.md` (padroes arquiteturais)
- `docs/ai/memory/COMMON_MISTAKES.md` (erros e prevencao)
- `.claude/.../memory/lessons-learned.md` (memoria Claude)

**Acoes do assistente:**
1. Identificar o aprendizado e sua categoria (tecnico, arquitetura, erro)
2. Formatar no padrao do arquivo destino
3. **Sugerir ao usuario antes de escrever**
4. Verificar que nao duplica conteudo existente

**Resultado:** Aprendizado proposto para adicao, aguardando aprovacao.

---

## 11. `preparar handoff`

**Objetivo:** Preparar transicao para proximo assistente ou proxima sessao.

**Quando usar:** Ao encerrar sessao ou quando assistente vai trocar.

**Arquivos consultados/atualizados:**
- `docs/ai/protocols/HANDOFF_PROTOCOL.md`
- `docs/PROXIMA_SESSAO.md`

**Acoes do assistente:**
1. Seguir HANDOFF_PROTOCOL
2. Resumir o que foi feito (lista de commits)
3. Listar estado atual (testes, build, deploy)
4. Listar proximos passos recomendados
5. **Propor atualizacao de PROXIMA_SESSAO.md (aguardar aprovacao)**

**Resultado:** Resumo de handoff + proposta de atualizacao do PROXIMA_SESSAO.md.

---

## 12. `fim de sessao`

**Objetivo:** Encerrar sessao com checklist completo e retrospectiva.

**Quando usar:** Ao final de toda sessao (obrigatorio).

**Arquivos consultados:**
- `docs/ai/protocols/HANDOFF_PROTOCOL.md`
- `docs/PROXIMA_SESSAO.md` (checklist fim de sessao)

**Acoes do assistente:**
1. Executar quality gates: `npx vitest run`, `npx tsc --noEmit`, `npx vite build`
2. Verificar commits pendentes (staged changes?)
3. Verificar push pendente (`git status` vs `origin/main`)
4. Executar retrospectiva:
   - O que foi feito (commits da sessao)
   - O que funcionou bem
   - O que deu problema
   - Divida tecnica identificada
   - Aprendizados (sugerir adicao ao docs/ai/memory/)
5. **Propor atualizacoes de docs (PROXIMA_SESSAO, MELHORIAS, memory)**
6. Aguardar aprovacao para cada atualizacao

**Resultado:** Checklist verde + retrospectiva + propostas de atualizacao.

---

*FENIX AI System — ToolOptimizer CNC | Criado: 09/03/2026*
