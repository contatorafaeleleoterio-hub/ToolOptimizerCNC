# BRIEF TÉCNICO — Reestruturação Documental e Organizacional
## ToolOptimizer CNC | v0.5.2 → MVP Production-Ready

> **Tipo:** Prompt de requisição para plano de execução
> **Autor:** Rafael Eleotério (assistido por Claude Code)
> **Data:** 14/03/2026
> **Destinatário:** Agente de IA com perfil de Arquiteto de Software Sênior (20+ anos)

---

## 1. CONTEXTO DO PROJETO

### 1.1 O que é o ToolOptimizer CNC

Sistema desktop para cálculo e recomendação de parâmetros de corte CNC (RPM, Avanço, Potência, Forças de Corte via modelo Kienzle). Aplicação single-page em React 18 + TypeScript strict + Vite 6, com deploy em Cloudflare Workers e build desktop via Electron (.exe portátil). Atualmente em **v0.5.2**, com 637 testes passando, zero erros TypeScript, bundle otimizado (96KB JS gzip).

### 1.2 Modelo de desenvolvimento

O projeto é desenvolvido **100% por agentes de IA** (Claude Code, Codex, Gemini). O proprietário (Rafael) não lê nem escreve código — ele direciona, valida e decide. Toda a eficiência do sistema depende da **qualidade e organização dos documentos de contexto** que os agentes consomem ao iniciar cada sessão.

### 1.3 Referência arquitetural

O projeto adota princípios do framework **Synkra AIOS (aiox-core)**, disponível em `https://github.com/SynkraAI/aiox-core`. Deste framework, extraem-se:

- **Story-Driven Development:** features nascem como stories documentadas
- **Architect-First:** documentar antes de codar
- **CLI First → Observability Second → UI Third**
- **Contexto por IDE:** cada agente (.claude/, .cursor/, .gemini/) carrega seu contexto automaticamente
- **Hierarquia isolada por domínio:** docs/ separados por tipo (specs, design, architecture, plans, stories)

**Restrição de orçamento:** O framework aiox-core é enterprise-grade e consome muitos tokens. A implementação aqui deve ser **adaptada ao essencial** — usar apenas o que gera valor real para um projeto single-developer com agentes de IA.

---

## 2. DIAGNÓSTICO DO ESTADO ATUAL

### 2.1 Inventário quantitativo

| Categoria | Arquivos | Linhas | Observação |
|-----------|----------|--------|------------|
| Root markdown | 3 | ~400 | CLAUDE.md, README, AJUSTE_FINO_VALIDACAO_GROK |
| docs/ raiz | 18 | ~5.800 | Mistura de planos, protocolos, estratégias, modelos matemáticos |
| docs/architecture/ | 7 ADRs | ~776 | ADR-001 a ADR-007 |
| docs/design/ | 4 | ~638 | Dashboard, UI spec, branding (duplicado) |
| docs/specs/ | 4 | ~1.667 | PRD completo, PRD master, validações, 1 stub vazio |
| docs/technical/ | 7 | ~3.024 | Kienzle, Vc, test cases, types, pesquisas |
| docs/stories/ | 9 | ~1.088 | Stories S1-S7 + guias de uso Claude |
| docs/sessions/ | 18 | ~3.500 | Logs de sessão por fase/data |
| docs/plans/ | 7 | ~1.466 | Backlog + 6 planos individuais |
| docs/ai/ | 12 | ~1.040 | AI System, protocolos, comandos, memória |
| docs/architecture-map/ | 4 | ~226 | Mapa arquitetural (baixo uso) |
| .github/workflows/ | 3 | — | CI, deploy, deploy-cloudflare (possível duplicata) |
| .claude/ | 4+ | — | Configuração Claude Code + worktrees |
| **TOTAL** | **~150 arquivos** | **~19.600 linhas** | — |

### 2.2 Problemas identificados

#### P1: Dispersão documental
- 18 arquivos soltos na raiz de `docs/` sem categorização clara
- Planos de features concluídas misturados com planos futuros
- Estratégias de SEO (1.310 linhas) no mesmo nível de protocolos de 60 linhas

#### P2: Duplicatas e redundâncias
- `docs/design/BRANDING_FINAL.md` ≡ `docs/design/UI_BRANDING.md` (conteúdo idêntico)
- `docs/specs/ESPECIFICACAO_TECNICA_CONSOLIDADA.md` → stub vazio (1 linha), versão real está em `docs/technical/`
- `docs/REGRAS_TRABALHO_OBRIGATORIAS.md` → conteúdo absorvido por `CLAUDE.md`
- `docs/MODELO MATEMÁTICO FORMAL.md` → dados já em `docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md`
- `docs/MELHORIAS_CONTINUAS.md` → superseded por PROXIMA_SESSAO.md
- `docs/IMPLEMENTATION_PLAN.md.md` → filename malformado, conteúdo já em docs/ai/
- `docs/AI ENGINEERING SYSTEM (FÊNIX)...GPT.md` → superseded por docs/ai/AI_SYSTEM.md

#### P3: Acúmulo de logs de sessão
- 18 arquivos em `docs/sessions/` cobrindo fases 2-9 e datas específicas
- Nenhum é referenciado por CLAUDE.md ou por código
- Ocupam ~3.500 linhas de contexto potencial sem valor ativo

#### P4: Nomes de arquivo inconsistentes
- Mix de português e inglês nos nomes
- Espaços e acentos em nomes de arquivo (`MODELO MATEMÁTICO FORMAL.md`, `PADRONIZAÇÃO ADOTADA.md`)
- Extensão duplicada (`IMPLEMENTATION_PLAN.md.md`)
- Nenhum padrão de prefixo (PLAN_, PROMPT_, SESSION_, SESSAO_ misturados)

#### P5: Stories encerradas ocupando espaço ativo
- Stories S1 a S6 concluídas ainda em `docs/stories/` como arquivos individuais
- Guias de uso de ferramentas (`GUIA-USO-CLAUDE-CODE.md`, `GUIA-USO-CLAUDE-DESKTOP.md`) dentro de `docs/stories/` — local incorreto

#### P6: Planos concluídos sem distinção dos pendentes
- 5 de 6 planos em `docs/plans/` já estão `✅ Concluído`
- Não há separação visual ou hierárquica entre concluído e pendente

#### P7: Ineficiência para agentes de IA
- Agentes precisam ler `PROXIMA_SESSAO.md` (1.137 linhas) para contexto histórico — peso excessivo em tokens
- Documentos de referência técnica espalhados por 3 pastas diferentes (docs/ raiz, docs/technical/, docs/specs/)
- Nenhum índice unificado de toda a documentação além do CLAUDE.md

#### P8: Workflow duplicado no GitHub Actions
- `deploy.yml` e `deploy-cloudflare.yml` — potencial duplicata; apenas um é usado ativamente

---

## 3. OBJETIVO DA REESTRUTURAÇÃO

### 3.1 Objetivo primário
Reorganizar a estrutura documental do projeto para que esteja **production-ready para MVP**, com hierarquia limpa, sem duplicatas, sem acúmulo histórico desnecessário, e **otimizada para consumo por agentes de IA** (mínimo de tokens, máximo de contexto útil).

### 3.2 Objetivos específicos

1. **Eliminar duplicatas e stubs vazios** — zero redundância documental
2. **Arquivar documentos históricos** — logs de sessão, stories concluídas, planos executados → pasta `docs/_archive/` (resgatáveis se necessário)
3. **Padronizar nomenclatura** — kebab-case, sem acentos, sem espaços, prefixos consistentes
4. **Reorganizar hierarquia** — cada documento em uma única pasta lógica, sem arquivos soltos na raiz de docs/
5. **Consolidar documentos fragmentados** — reduzir quantidade, aumentar densidade informacional
6. **Otimizar para IA** — documentos enxutos, com metadados claros, indexados, e com seções bem delimitadas para parsing rápido
7. **Manter CLAUDE.md como fonte de verdade** — atualizar todas as referências após reorganização
8. **Limpar workflows GitHub** — remover duplicatas

### 3.3 Critérios de retenção (o que NÃO pode ser apagado)

Para um sistema em produção, os documentos essenciais são:

| Categoria | Critério | Exemplos |
|-----------|----------|----------|
| **Configuração** | Necessário para build/deploy/test | package.json, tsconfig, vite.config, wrangler.jsonc, CI/CD workflows |
| **Contexto de IA** | Carregado automaticamente por agentes | CLAUDE.md, .claude/*, ROADMAP_SESSAO_ATUAL.md |
| **Especificação técnica** | Dados usados pelo código-fonte | Kienzle, Vc, test cases, types |
| **Arquitetura** | Decisões que afetam o sistema inteiro | ADRs vigentes, stack decisions |
| **Requisitos** | Definem o que o sistema faz | PRD, validações |
| **Design** | Definem como o sistema parece | Dashboard spec, UI spec, branding |
| **Planos ativos** | Trabalho ainda não executado | Backlog, planos pendentes |
| **Protocolos operacionais** | Governam o processo de desenvolvimento | Protocols em docs/ai/ |

**Tudo que não se encaixar nesses critérios → arquivo morto.**

---

## 4. RESTRIÇÕES E PREMISSAS

| # | Restrição |
|---|-----------|
| R1 | **Orçamento de tokens limitado** — plano free/básico do Claude Code. Estrutura deve minimizar leitura obrigatória |
| R2 | **Zero downtime** — reestruturação não pode quebrar build, testes, ou deploy |
| R3 | **Git history preservado** — usar `git mv` para manter histórico de arquivos renomeados |
| R4 | **Reversível** — documentos arquivados ficam em `docs/_archive/`, não são deletados |
| R5 | **CLAUDE.md atualizado por último** — todas as referências devem ser atualizadas ao final |
| R6 | **Nenhum documento novo desnecessário** — consolidar em existentes sempre que possível |
| R7 | **Compatível com multi-agente** — estrutura deve funcionar para Claude Code, Codex, e Gemini |

---

## 5. ENTREGÁVEIS ESPERADOS DO PLANO DE EXECUÇÃO

O plano de execução deve conter:

1. **Mapa de ações** — tabela com cada arquivo e sua ação: MANTER, MOVER, RENOMEAR, CONSOLIDAR, ARQUIVAR, DELETAR
2. **Nova hierarquia de pastas** — árvore proposta com justificativa para cada nível
3. **Ordem de execução** — faseamento para evitar quebras (o que mover primeiro, o que atualizar depois)
4. **Checklist de atualização de referências** — CLAUDE.md, ROADMAP, BACKLOG, código-fonte (comments)
5. **Verificação** — como validar que nada quebrou após a reestruturação (testes, build, links)
6. **Estimativa de redução** — quantos arquivos e linhas serão reduzidos

---

## 6. INVENTÁRIO COMPLETO PARA ANÁLISE

### 6.1 Arquivos referenciados por CLAUDE.md (ESSENCIAIS)

```
docs/ROADMAP_SESSAO_ATUAL.md          → Entry point de sessão
docs/PROXIMA_SESSAO.md                → Histórico de sessões
docs/specs/PRD_TOOLOPTIMIZER_CNC_MVP.md → PRD completo
docs/specs/PRD_MASTER.md              → PRD condensado
docs/specs/DECISOES_VALIDACAO_PRD.md   → Decisões de validação
docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md → Dados Kienzle
docs/technical/PRD_Velocidades_Corte_CNC.md   → Velocidades de corte
docs/technical/CASOS_TESTE_REFERENCIA.md       → Test cases
docs/technical/srctypes.md             → TypeScript types
docs/design/DASHBOARD.md              → Dashboard spec
docs/design/UI_DESIGN_SPEC_FINAL.md   → UI spec
docs/design/UI_BRANDING.md            → Branding
docs/ai/AI_SYSTEM.md                  → Sistema FÊNIX
docs/ai/commands/SESSION_COMMANDS.md   → Comandos de sessão
docs/ai/protocols/*.md                → 7 protocolos
docs/ai/memory/*.md                   → 3 arquivos de memória
docs/architecture/ADR-005-electron-desktop-build.md → Build desktop
docs/architecture/ADR-006-estrategia-versionamento.md → Versionamento
docs/AIOS_INTEGRATION.md              → Framework AIOS
docs/plans/BACKLOG_IMPLEMENTACAO.md    → Backlog ativo
```

### 6.2 Arquivos referenciados pelo código-fonte

```
docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md  ← src/data/materials.ts
docs/technical/PRD_Velocidades_Corte_CNC.md     ← src/data/materials.ts
docs/specs/PRD_MASTER.md                        ← src/data/operations.ts, tools.ts
docs/technical/srctypes.md                      ← src/types/index.ts
docs/PADRONIZAÇÃO ADOTADA.md                    ← src/engine/recommendations.ts
docs/PLANO_IMPLEMENTACAO_SLIDER_BOUNDS.md       ← src/engine/slider-bounds.ts
```

### 6.3 Candidatos a arquivo morto (COMPLETOS ou SUPERSEDED)

```
# Planos concluídos
docs/PLANO_AUDITORIA.md                        → ✅ Audit completo
docs/PLANO_IMPLEMENTACAO_SLIDER_BOUNDS.md       → ✅ Shipped v0.4.1 (⚠️ referenciado em código)
docs/plans/PLAN_Divida_Tecnica_v051_v052.md     → ✅ Concluído
docs/plans/PLAN_Favicon_Icons.md                → ✅ Concluído
docs/plans/PLAN_Fix_BugReportModal.md           → ✅ Concluído
docs/plans/PLAN_Fix_TouchSlider_Mobile.md       → ✅ Concluído
docs/plans/PLAN_Unificar_Indicadores_Ajuste_Fino.md → ✅ Concluído

# Planos futuros não priorizados
docs/PLANO_LOGIN_GOOGLE.md                     → ❌ Não implementado, fora do MVP
docs/IMPLEMENTACAO_LOGIN.md                    → ❌ Mesmo tema, duplicado
docs/IMPLEMENTACAO_SESSOES.md                  → ❌ Fora do escopo atual

# Superseded
docs/REGRAS_TRABALHO_OBRIGATORIAS.md           → Absorvido por CLAUDE.md
docs/MELHORIAS_CONTINUAS.md                    → Absorvido por PROXIMA_SESSAO.md
docs/MODELO MATEMÁTICO FORMAL.md               → Dados já em DADOS_TECNICOS_KIENZLE_E_VC.md
docs/IMPLEMENTATION_PLAN.md.md                 → Filename errado, conteúdo em docs/ai/
docs/AI ENGINEERING SYSTEM (FÊNIX)...GPT.md    → Superseded por docs/ai/AI_SYSTEM.md
docs/PROMPT_PROXIMA_SESSAO.md                  → Superseded por ROADMAP_SESSAO_ATUAL.md
docs/PADRONIZAÇÃO ADOTADA.md                   → Parcialmente em CLAUDE.md (⚠️ referenciado em código)

# Sessions (todos os 18 arquivos)
docs/sessions/*.md                             → 18 arquivos de log histórico

# Stories concluídas
docs/stories/story-001 → story-006             → 6 stories concluídas

# Duplicatas
docs/design/BRANDING_FINAL.md                  → = UI_BRANDING.md
docs/specs/ESPECIFICACAO_TECNICA_CONSOLIDADA.md → Stub vazio (1 linha)

# Architecture map (baixo uso)
docs/architecture-map/ (4 arquivos)
```

### 6.4 Workflow GitHub Actions

```
.github/workflows/ci.yml                → ✅ ATIVO — testes + typecheck
.github/workflows/deploy-cloudflare.yml  → ✅ ATIVO — deploy Cloudflare
.github/workflows/deploy.yml             → ❓ Possivelmente obsoleto
```

---

## 7. DIRETRIZES DO AIOX-CORE (ADAPTADAS)

Do framework de referência, aplicar **apenas o essencial**:

| Princípio aiox-core | Adaptação para ToolOptimizer |
|---------------------|------------------------------|
| Contexto por IDE (.claude/, .cursor/) | Manter .claude/ como já existe. Não criar .cursor/ ou .gemini/ até usar esses agentes regularmente |
| Story-driven | Manter docs/stories/ apenas para stories ativas. Concluídas → archive |
| docs/ isolados por domínio | Manter: specs/, technical/, design/, architecture/, plans/, ai/. Eliminar arquivos soltos na raiz |
| Scripts de validação de paridade | Desnecessário — projeto simples, single-IDE primário |
| Monorepo com packages/ | Não aplicável — projeto único |
| Multi-language docs | Não aplicável — PT-BR único |

---

## 8. REQUISIÇÃO FORMAL

**Solicita-se** a elaboração de um **plano de execução detalhado** para a reestruturação documental e organizacional do projeto ToolOptimizer CNC, contemplando:

- Análise do inventário acima (seções 6.1 a 6.4)
- Proposta de nova hierarquia de pastas
- Mapa de ações por arquivo (manter/mover/renomear/consolidar/arquivar/deletar)
- Faseamento de execução com validação entre fases
- Atualização de todas as referências cruzadas (CLAUDE.md, código-fonte, ROADMAP)
- Estimativa de redução de volume documental

O plano deve ser **pragmático, reversível, e otimizado para desenvolvimento assistido por IA com orçamento limitado de tokens**.

---

*Documento gerado em 14/03/2026 — ToolOptimizer CNC v0.5.2*
