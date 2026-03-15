# PESQUISA Vc VALIDADA — Velocidades de Corte por Fabricante

> **Status:** 🔄 EM ANDAMENTO — Etapa 1 parcial (sessão 24/02/2026)
> **Próxima sessão:** Continuar da Etapa 1 (Al 6061-T6 + P20) e Etapas 2–5

---

## Objetivo

Validar os valores de Vc (m/min) usados em `src/data/materials.ts` contra
catálogos reais de fabricantes. Base para implementação do slider Vc dinâmico por material.

**Condições fixas desta pesquisa:**
- Ferramenta: fresa de topo em metal duro (carbide) com revestimento **TiAlN**
- Operação: fresamento (milling) com refrigeração convencional
- Documento gerado para servir de referência antes de qualquer mudança no código

---

## Baseline — Valores atuais no código

Fonte: `docs/technical/PRD_Velocidades_Corte_CNC.md` (07/02/2026)

| Material | ISO | Desbaste (m/min) | Semi (m/min) | Acabamento (m/min) | Confiabilidade base |
|----------|-----|------------------|--------------|--------------------|---------------------|
| Aço 1020 | P | 185–250 | 220–280 | 250–350 | ✅ Alta |
| Aço 1045 | P | 150–200 | 180–240 | 200–280 | ✅ Alta |
| Inox 304 | M | 60–90 | 80–120 | 100–150 | ✅ Alta |
| Al 6061-T6 | N | 400–600 | 500–800 | 600–1000 | ⚠️ Estimado |
| P20 | P | 100–120 | 120–180 | 150–200 | ⚠️ Estimado |
| **2711** | P | **N/D** | **N/D** | **N/D** | **❌ Sem dado** |
| 8620 núcleo | P | 120–180 | 150–220 | 180–250 | ⚠️ Estimado |
| 8620 cementado | H | 60–90 | 80–120 | 100–150 | ⚠️ Estimado |
| H13 | H | 80–125 | 100–150 | 125–170 | ⚠️ Estimado |

---

## Etapa 1 — Alta Prioridade (Al 6061-T6, P20, H13)

### H13 Tool Steel — ✅ VALIDADO PARCIALMENTE

**Data:** 24/02/2026
**Fontes consultadas:**
- Machining Doctor — [https://www.machiningdoctor.com/mds/?matId=1500](https://www.machiningdoctor.com/mds/?matId=1500)
- aobosteel.com — H13 Tool Steel Machinability guide
- moresuperhard.com — Case study CBN end mill H13

**Dados encontrados (carbide TiAlN, fresamento):**

| Operação | Vc recomendada (m/min) | Estado do material | Fonte |
|----------|------------------------|--------------------|-------|
| Desbaste | 80–125 | H13 recozido/macio | Machining Doctor (snippet) |
| Semi-acabamento | 100–150 | H13 recozido/macio | Machining Doctor (snippet) |
| Acabamento | **125–170** | H13 recozido/macio | Machining Doctor snippet confirmado |
| Acabamento (duro 50+ HRC) | 60–100 | H13 temperado | aobosteel + moresuperhard |

**Alertas técnicos encontrados:**
- H13 temperado (50+ HRC): risco de camada branca (white layer) em Vc > 120 m/min
- Para H13 temperado acima de 52 HRC, preferir CBN em vez de metal duro
- TiAlN e AlTiN são os revestimentos recomendados pela maioria das fontes

**Comparativo com código atual:**
| Operação | Código atual | Fabricante (macio) | Divergência |
|----------|-------------|---------------------|-------------|
| Desbaste | 80–125 | 80–125 | ✅ Alinhado |
| Semi | 100–150 | 100–150 | ✅ Alinhado |
| Acabamento | 125–170 | 125–170 | ✅ Alinhado |

**Conclusão H13:** Valores do código **confirmados**. Status elevado de ⚠️ Estimado para
**✅ Validado** (para H13 macio/recozido). Manter alerta sobre H13 temperado (CBN).

---

### Al 6061-T6 — 🔄 PENDENTE

**Status:** Busca iniciada mas não concluída (sessão encerrada por tempo).

**O que se sabe até agora:**
- Aluminum 6061-T6 com carbide não usa TiAlN (alumínio adere ao titânio).
  Fabricantes recomendam: **não revestido**, DLC, ou PCD para alumínio.
- Isso significa que a faixa de Vc para Al com carbide não revestido é muito mais alta
  do que para aços (alumínio é ISO N — baixa resistência ao corte).

**Próxima sessão:**
- Buscar especificamente: "aluminum 6061 milling cutting speed uncoated carbide m/min"
- Sites alvo: Sandvik CoroPlus, Kennametal Machining Advisor, FSWizard

---

### P20 Mold Steel — 🔄 PENDENTE

**Status:** Não pesquisado nesta sessão.

**Estratégia para próxima sessão:**
- P20 = AISI P20 = DIN 1.2311 (equivalente internacional)
- Buscar: "P20 mold steel milling Vc m/min carbide TiAlN"
- Sites alvo: Kennametal, Mitsubishi, Seco Tools

---

## Etapas pendentes

| Etapa | Descrição | Status |
|-------|-----------|--------|
| 1A | H13 — validação fabricante | ✅ Concluída |
| 1B | Al 6061-T6 — validação fabricante | 🔄 Pendente |
| 1C | P20 — validação fabricante | 🔄 Pendente |
| 2 | 2711 — resolver N/D (P20H / DIN 1.2738) | 🔄 Pendente |
| 3 | 8620 núcleo + cementado — validação | 🔄 Pendente |
| 4 | Gerar tabela consolidada final | 🔄 Pendente |
| 5 | GITHUB_REFERENCIAS.md | ✅ Concluída — `docs/technical/GITHUB_REFERENCIAS.md` |

---

## Tabela de Status Final (atualizar por sessão)

| Material | Status pesquisa | Vc Desbaste | Vc Semi | Vc Acabamento | Fontes |
|----------|-----------------|-------------|---------|----------------|--------|
| Aço 1020 | ✅ Já validado | 185–250 | 220–280 | 250–350 | PRD original |
| Aço 1045 | ✅ Já validado | 150–200 | 180–240 | 200–280 | PRD original |
| Inox 304 | ✅ Já validado | 60–90 | 80–120 | 100–150 | PRD original |
| Al 6061-T6 | 🔄 Pendente | 400–600 | 500–800 | 600–1000 | Estimado |
| P20 | 🔄 Pendente | 100–120 | 120–180 | 150–200 | Estimado |
| 2711 | ❌ Sem dado | N/D | N/D | N/D | — |
| 8620 núcleo | 🔄 Pendente | 120–180 | 150–220 | 180–250 | Estimado |
| 8620 cementado | 🔄 Pendente | 60–90 | 80–120 | 100–150 | Estimado analógico |
| H13 | ✅ Validado sessão 24/02 | 80–125 | 100–150 | 125–170 | Machining Doctor |

---

*Criado: 24/02/2026 — Sessão 9 (parcial, atividade suspensa)*
*Continuar na próxima sessão a partir da Etapa 1B (Al 6061-T6)*
