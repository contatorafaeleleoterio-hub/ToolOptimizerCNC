# ADR-007: FENIX — AI Engineering System

**Status:** Aceito
**Data:** 09/03/2026

---

## Contexto

O ToolOptimizer CNC (v0.4.2) possui documentacao extensa e bem organizada — ADRs, stories, specs tecnicas, sessoes detalhadas e PROXIMA_SESSAO.md como ponto de entrada. Essa base solida cresceu organicamente ao longo do desenvolvimento.

No entanto, faltavam:
- **Protocolos formais** para acoes recorrentes (debug, feature, handoff)
- **Memoria de engenharia commitada no git** (a memoria Claude e ephemeral e tool-specific)
- **Comandos padronizados** para garantir consistencia entre sessoes e assistentes

O plano FENIX foi desenhado para resolver essas lacunas sem alterar codigo do produto.

## Decisao

Criar sistema FENIX em `docs/ai/` com 3 componentes:

### 1. Comandos de Sessao (12 comandos)
Arquivo: `docs/ai/commands/SESSION_COMMANDS.md`
Cada comando define: objetivo, quando usar, arquivos consultados, acoes e resultado esperado.

### 2. Protocolos Operacionais (6 protocolos)
Pasta: `docs/ai/protocols/`
- SESSION_PROTOCOL — ciclo de vida da sessao
- ARCHITECTURE_PROTOCOL — analise e evolucao arquitetural
- DEBUG_PROTOCOL — debugging estruturado
- FEATURE_PROTOCOL — implementacao story-driven
- DECISION_PROTOCOL — registro de decisoes
- HANDOFF_PROTOCOL — fim de sessao + retrospectiva

### 3. Memoria de Engenharia (3 arquivos)
Pasta: `docs/ai/memory/`
- ENGINEERING_MEMORY — aprendizados tecnicos
- ARCHITECTURE_LEARNINGS — padroes e anti-padroes
- COMMON_MISTAKES — catalogo de erros + prevencao

## Alternativas Consideradas

### Usar apenas a memoria Claude existente
- **Descartada:** Memoria Claude e ephemeral e vinculada a ferramenta especifica. Nao sobrevive troca de assistente/ferramenta.

### Expandir PROXIMA_SESSAO.md com protocolos
- **Descartada:** PROXIMA_SESSAO ja tem 853 linhas. Adicionar protocolos tornaria o arquivo ingerenciavel.

### Nao implementar nenhum sistema formal
- **Descartada:** Risco de regressao aumenta conforme projeto cresce e assistentes trocam.

## Consequencias

### Positivas
- Handoff entre assistentes mais rapido e confiavel
- Memoria de engenharia permanente (commitada no git)
- Protocolos reutilizaveis para acoes recorrentes
- Reducao de regressoes por falta de contexto

### Negativas
- 12 novos arquivos markdown para manter
- Risco de desatualizacao se protocolos nao forem usados
- Overhead minimo de manter docs/ai/memory/ atualizado

### Mitigacao
- Documentos sao curtos e focados (< 100 linhas cada)
- Comandos `registrar aprendizado` e `fim de sessao` incentivam atualizacao
- Regra: nunca auto-escrever sem aprovacao do usuario
