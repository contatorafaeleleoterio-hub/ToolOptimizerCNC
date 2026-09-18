# AGENTS.md — ToolOptimizer CNC v2

Instruções para Agentes de IA operando no repositório **ToolOptimizer CNC v2** (`contatorafaeleleoterio-hub/ToolOptimizerCNC`).

---

## 1. Visão Geral e Fontes de Autoridade

* **Ponto de entrada:** [`CLAUDE.md`](CLAUDE.md), [`CONTEXT.md`](CONTEXT.md) e [`ESTADO.md`](ESTADO.md).
* **Especificações e Gabarito Técnico:** [`Docs_inicial/`](Docs_inicial/) (imutável; nenhuma fórmula ou constante física entra sem citação deste diretório).
* **Design System Canônico:** [`RECONCILED_DESIGN_SYSTEM.md`](RECONCILED_DESIGN_SYSTEM.md) e tokens em [`src/ui/index.css`](src/ui/index.css).

---

## 2. Quality Gates Obrigatórios

Antes de concluir qualquer tarefa ou propor commits:
1. `npm run typecheck` (0 erros TypeScript).
2. `npm run test` (100% dos testes passando via Vitest).
3. Ou de forma unificada: `npm run check` (executa typecheck e test).
4. `npm run build` deve compilar com exit code 0 gerando `dist/`.

---

## 3. Skills de Agentes

O repositório disponibiliza skills especializadas em `.agents/skills/` (espelhadas em `.claude/skills/`).

| Skill | Gatilho de Ativação | Caminho / Descrição |
|---|---|---|
| **Prompt Architect** | `"Ative o criador de prompt"` ou `"Prompt Architect"` | [`.agents/skills/prompt-architect/SKILL.md`](.agents/skills/prompt-architect/SKILL.md) — Metodologia especializada em arquitetura e refinamento de prompts profissionais para agentes de IA. Opera com rito analítico, separação ontológica (FATO, REQUISITO, RESTRIÇÃO, PREFERÊNCIA, INFERÊNCIA, HIPÓTESE), nível de intervenção cirúrgico (N0–N3) e contexto local do projeto em [`contexto-projeto.md`](.agents/skills/prompt-architect/references/contexto-projeto.md). |

### Rito de Ativação do Prompt Architect
Quando o usuário disser:
> **"Ative o criador de prompt"** (ou solicitar "Prompt Architect", "crie um prompt para mim", "refine este prompt")

O agente deve:
1. Carregar e assumir a persona e metodologia do [`SKILL.md`](.agents/skills/prompt-architect/SKILL.md) e [`metodologia.md`](.agents/skills/prompt-architect/references/metodologia.md).
2. Consultar o contexto técnico do projeto em [`contexto-projeto.md`](.agents/skills/prompt-architect/references/contexto-projeto.md).
3. Responder impreterivelmente no formato tripartite:
   * **1. ENTENDIMENTO**
   * **2. PROMPT REFINADO** (bloco Markdown autossuficiente, executável em nova sessão sem perda de contexto)
   * **3. OBSERVAÇÃO** (apenas se houver riscos arquiteturais, trade-offs ou dúvidas)
