# FENIX — AI Engineering System

> Sistema de engenharia assistida por IA para o ToolOptimizer CNC.
> Formaliza protocolos de sessao, captura decisoes e cria memoria persistente.

---

## O que e o FENIX

FENIX e uma camada documental e operacional que complementa a infraestrutura existente do projeto. Ele nao altera codigo, nao substitui CLAUDE.md nem PROXIMA_SESSAO.md — adiciona estrutura em cima do que ja funciona.

**Objetivos:**
- Padronizar o fluxo de trabalho entre sessoes
- Registrar decisoes e aprendizados de forma permanente (commitada no git)
- Acelerar handoff entre assistentes
- Evitar regressoes com protocolos estruturados

---

## Relacao com Infraestrutura Existente

| Componente existente | Funcao | Como FENIX complementa |
|---|---|---|
| `CLAUDE.md` | Instrucoes do projeto | FENIX referencia, nao duplica |
| `docs/PROXIMA_SESSAO.md` | Ponto de entrada de sessao | Protocolos formalizam o fluxo |
| `.claude/.../memory/` | Memoria ephemeral do Claude | `docs/ai/memory/` e permanente (git) |
| `docs/architecture/ADR-*` | Decisoes arquiteturais | DECISION_PROTOCOL padroniza criacao |
| `docs/stories/` | Features story-driven | FEATURE_PROTOCOL guia implementacao |
| `docs/sessions/` | Notas de sessao | HANDOFF_PROTOCOL padroniza formato |
| `docs/MELHORIAS_CONTINUAS.md` | Backlog de melhorias | Comandos sugerem atualizacoes |

---

## Mapa de Arquivos

```
docs/ai/
  AI_SYSTEM.md                    # Este documento
  commands/
    SESSION_COMMANDS.md            # 12 comandos de sessao
  protocols/
    SESSION_PROTOCOL.md            # Ciclo de vida da sessao
    ARCHITECTURE_PROTOCOL.md       # Analise e evolucao arquitetural
    DEBUG_PROTOCOL.md              # Debugging estruturado
    FEATURE_PROTOCOL.md            # Implementacao story-driven
    DECISION_PROTOCOL.md           # Registro de decisoes (ADRs)
    HANDOFF_PROTOCOL.md            # Fim de sessao + retrospectiva
  memory/
    ENGINEERING_MEMORY.md          # Aprendizados tecnicos gerais
    ARCHITECTURE_LEARNINGS.md      # Padroes e anti-padroes
    COMMON_MISTAKES.md             # Catalogo de erros + prevencao
```

---

## Regras

1. **Nunca auto-escrever sem aprovacao** — comandos sugerem atualizacoes, usuario decide
2. **Sem duplicacao** — referenciar docs existentes, nao copiar conteudo
3. **Projeto-especifico** — citar arquivos reais, padroes reais, licoes reais
4. **Complementar** — FENIX adiciona estrutura, nao substitui nada existente

---

## Quick Reference — 12 Comandos

| Comando | O que faz |
|---------|-----------|
| `iniciar sessao` | Le PROXIMA_SESSAO, roda quality gates, reporta estado |
| `revisar contexto` | Le CLAUDE.md + PROXIMA_SESSAO + memory, resume |
| `planejar sessao` | Propoe scope baseado em MELHORIAS_CONTINUAS + pedido |
| `analisar arquitetura` | Le ADRs, traca code paths, produz analise |
| `iniciar desenvolvimento` | Verifica story, quality gates, segue FEATURE_PROTOCOL |
| `revisar codigo` | Review diff-based contra convencoes do CLAUDE.md |
| `iniciar debug` | Reproduzir, isolar, fix minimo, verificar suite |
| `registrar decisao` | Criar/atualizar ADR em docs/architecture/ |
| `atualizar documentacao` | Update PROXIMA_SESSAO, MELHORIAS, sessions, memory |
| `registrar aprendizado` | Append ao docs/ai/memory/ + memory Claude |
| `preparar handoff` | Resumir mudancas, atualizar PROXIMA_SESSAO |
| `fim de sessao` | Checklist completo: gates, commit, push, docs, retrospectiva |

---

*Criado: 09/03/2026 | ADR: docs/architecture/ADR-007-fenix-ai-engineering-system.md*
