# Story-007 — Candidatos de Feature

> **Status:** 🟡 A definir com usuário
> **Versão atual:** 0.4.0 (503 testes passando)
> **Criado:** 01/03/2026

---

## Contexto

Story-006 foi entregue (HistoryPage responsiva + Plausible Analytics). O produto está maduro
tecnicamente (auditoria 95/100, 503 testes). A próxima story deve agregar valor real ao operador
CNC — não complexidade técnica.

---

## Candidatos

### Opção A — Slider Vc Dinâmico por Material ⏸️

**Descrição:** Slider de Velocidade de Corte no Fine Tune adapta seu range (min/max) ao material selecionado.

**Motivação:**
- Slider atual: min=1, max=1200 m/min, genérico para todos os materiais
- Alumínio: range real 400–1200 m/min → slider deve refletir isso
- H13 duro: range real 60–100 m/min → slider de 1200 é contra-intuitivo

**Pré-requisito:** Concluir pesquisa em `docs/technical/PESQUISA_VC_VALIDADA.md`
- H13: ✅ validado
- Al 6061-T6, P20, 2711, 8620: 🔄 pendentes

**Estimativa:** 2 sessões (1 pesquisa + 1 implementação)

**Status:** ⏸️ Em pausa — retomar quando pesquisa Vc estiver completa

---

### Opção B — Comparação Side-by-Side de Simulações

**Descrição:** Usuário pode "congelar" um resultado e comparar com nova simulação lado a lado.

**Motivação:**
- Operador frequentemente quer comparar "desbaste com D=12" vs "desbaste com D=16"
- Hoje: precisa anotar os valores manualmente ou usar o histórico
- Com side-by-side: diferença visual imediata

**Impacto:**
- UI: painel de resultados duplicado (read-only + live)
- Store: estado "frozen" de uma simulação
- Novo componente: `ComparisonPanel`

**Estimativa:** 2-3 sessões

**Status:** 🟡 Disponível

---

### Opção C — Dashboard de Métricas Rápidas

**Descrição:** Página de métricas com KPIs do histórico de simulações.

**Conteúdo sugerido:**
- Total de simulações realizadas
- Material mais usado
- Distribuição de status de segurança (verde/amarelo/vermelho)
- Evolução temporal (simulações por dia/semana)
- Top 3 combinações material + operação

**Motivação:**
- Dados do Plausible mostram uso agregado
- Dashboard interno mostra uso individual do operador
- Útil para supervisores/engenheiros

**Estimativa:** 1-2 sessões

**Status:** 🟡 Disponível

---

### Opção D — Coating Multipliers (Revestimento da Ferramenta)

**Descrição:** Adicionar campo "Revestimento" na seleção de ferramenta. Multiplicador de Vc baseado no revestimento.

**Motivação:**
- Pesquisa GitHub (sessão s8) identificou padrão CNC-ToolHub:
  - TiAlN: Vc × 1.40
  - AlCrN: Vc × 1.30
  - TiN: Vc × 1.10
  - Não revestido: Vc × 1.00
  - DLC: Vc × 1.50 (alumínio)
  - PCD: Vc × 2.00 (alumínio)
- Melhora a precisão da recomendação de Vc
- Al 6061-T6: revestimento TiAlN é incorreto (alumínio adere ao titânio)

**Impacto:**
- Novo campo no `Ferramenta` type
- Novo UI element em `config-panel.tsx`
- Modificação em `rpm.ts` ou novo módulo `coating.ts`
- Badge de alerta para Al + TiAlN

**Estimativa:** 1-2 sessões

**Status:** 🟡 Disponível

---

### Opção E — Machine Rigidity Classes (Rigidez da Máquina)

**Descrição:** Campo "Rigidez da Máquina" em Settings com multiplicador de Vc.

**Motivação:**
- Pesquisa GitHub identificou padrão em CNC-ToolHub:
  - Rígida (centro moderno): Vc × 1.00
  - Média (fresadora convencional): Vc × 0.85
  - Flexível (máquina antiga): Vc × 0.70
- Complementa e aprimora o safety factor atual (que é global)
- Aplicação direta em chão de fábrica

**Impacto:**
- Novo campo em `LimitesMaquina` type
- UI em Settings (radio ou select)
- Modificação no cálculo de Vc recomendado

**Estimativa:** 1 sessão

**Status:** 🟡 Disponível

---

### Opção F — Presets de Operação (Quick-Start)

**Descrição:** Botões de preset que configuram automaticamente material + ferramenta + operação para cenários comuns.

**Exemplos de presets:**
- "Desbaste Aço" → Aço 1045 + D16 + Desbaste
- "Acabamento Alumínio" → Al 6061 + D8 + Acabamento
- "Inox fino" → Inox 304 + D6 + Acabamento

**Motivação:**
- Operador novo configura o app em segundos
- Reduz fricção de onboarding

**Estimativa:** 1 sessão

**Status:** 🟡 Disponível

---

## Matriz de Priorização

| Opção | Valor para operador | Complexidade | Pré-requisitos | Recomendação |
|-------|--------------------|--------------|--------------------|--------------|
| A — Slider Vc dinâmico | Alto | Média | Pesquisa Vc incompleta | ⏸️ Após pesquisa |
| B — Comparação side-by-side | Alto | Alta | Nenhum | 🟡 Viável |
| C — Dashboard métricas | Médio | Baixa | Histórico existente | ✅ Quick win |
| D — Coating multipliers | Alto | Baixa | Pesquisa Vc (parcial) | ✅ Quick win |
| E — Machine rigidity | Alto | Baixíssima | Nenhum | ✅ Quick win |
| F — Presets de operação | Médio | Baixa | Nenhum | ✅ Quick win |

---

## Quick Wins (recomendados para Story-007)

**E + D + F** combinados em uma única story:
- Machine rigidity class (1 sessão)
- Coating multipliers + alerta Al+TiAlN (1 sessão)
- Presets de operação (1 sessão)

**Total estimado:** 2-3 sessões | **Impacto:** Alto para operadores reais

---

## Opções Pausadas

### Login Google
- **Motivo:** Sem demanda validada, LGPD complexa, perfil conservador dos operadores CNC
- **Pré-req:** Firebase Console setup + `.env.local`
- **Planos:** `docs/_archive/superseded/PLANO_LOGIN_GOOGLE.md` + `docs/_archive/superseded/IMPLEMENTACAO_LOGIN.md`
- **Retomar quando:** Usuários pedirem sync entre dispositivos explicitamente

### Export PDF
- **Motivo:** Descartado para MVP — operadores de chão de fábrica não usam PDF
- **Status:** Definitivamente fora do MVP v1.0.0

### Landing Page
- **Motivo:** Pré-requisitos manuais pendentes no Cloudflare Pages
- **Pré-req A:** Criar projeto `tooloptimizer-landing` no Cloudflare Pages
- **Pré-req B:** Atualizar token `CF_API_TOKEN` com permissão `Cloudflare Pages: Edit`
- **Plano:** `docs/_archive/superseded/ESTRATEGIA_DUAL_DOMAIN_SEO_TOOLOPTIMIZER.md`

---

*Criado: 01/03/2026 — Sessão s23*
*Fonte: PROXIMA_SESSAO.md + MEMORY.md + GITHUB_REFERENCIAS.md + story-006*
