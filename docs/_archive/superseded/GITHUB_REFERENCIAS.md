# GITHUB_REFERENCIAS — Repositórios CNC Open-Source Analisados

> **Status:** ✅ Análise concluída — Sessão s8 (22/02/2026)
> **Objetivo:** Benchmarking de projetos CNC open-source para identificar padrões aproveitáveis
> e posicionamento competitivo do ToolOptimizer CNC.

---

## Resumo Executivo

| Métrica | Resultado |
|---------|-----------|
| Repositórios analisados | 15+ |
| Projetos com Kienzle | **0** — ToolOptimizer é único |
| Projetos com cobertura de testes comparable | **0** — nosso coverage é o maior |
| Padrões aproveitáveis identificados | 3 (coating multipliers, rigidity classes, machinability index) |

---

## Repositórios Analisados

### 1. CNC-ToolHub (Python)

| Campo | Detalhe |
|-------|---------|
| **Linguagem** | Python |
| **Foco** | Banco de dados de ferramentas + parâmetros de corte |
| **Relevância** | Alta |

**Padrões aproveitáveis:**
- **Coating multipliers:** TiAlN = 1.4× Vc base; TiN = 1.1×; AlCrN = 1.3×; não revestido = 1.0×
- **Machine rigidity classes:** `rigid` (100%), `medium` (85%), `flexible` (70%) — aplicado ao Vc recomendado
- Estrutura de dados: material → grupo ISO → Vc ranges por operação

**O que NÃO tem:**
- Kienzle
- Testes automatizados
- UI (CLI only)

---

### 2. brturn/feeds-and-speeds (JavaScript)

| Campo | Detalhe |
|-------|---------|
| **Linguagem** | JavaScript (vanilla) |
| **Stars** | 27 ⭐ |
| **Foco** | Cálculo de feeds and speeds para fresamento |

**Padrões aproveitáveis:**
- `unitPower` approach para cálculo de potência (alternativa ao Kienzle)
- Chip thinning implementado de forma simplificada
- Fórmula de MRR compatível com a nossa

**O que NÃO tem:**
- Base de materiais robusta
- Kienzle
- TypeScript
- Testes

---

### 3. pymachining (Python)

| Campo | Detalhe |
|-------|---------|
| **Linguagem** | Python |
| **Foco** | Cálculos de usinagem com unidades físicas (pint library) |

**Padrões aproveitáveis:**
- **Machinability index:** cada material tem índice de usinabilidade (1.0 = referência Aço 1045)
  - Ex: Al 6061 = 3.0× (3× mais fácil de usinar que o aço de referência)
  - Ex: Inox 304 = 0.45× (mais difícil)
- Uso de unidades físicas previne erros de conversão mm↔inch

**O que NÃO tem:**
- Kienzle
- UI
- Testes

---

### 4. cnc-calc-react (React + TypeScript + Vite)

| Campo | Detalhe |
|-------|---------|
| **Stack** | React + TypeScript + Vite — **mesmo stack que nós** |
| **Foco** | Cálculo básico de parâmetros CNC |

**Análise:**
- Stack idêntica ao ToolOptimizer — confirma que nossa escolha tecnológica é correta
- **Sem base de materiais** — apenas fórmulas genéricas
- **Sem Kienzle** — potência calculada por método simplificado
- **Sem testes** — zero cobertura
- UI básica sem glassmorphism ou design system

**Conclusão:** ToolOptimizer é significativamente mais completo.

---

### 5-15. Outros Repositórios (análise rápida)

| Repositório | Stack | Stars | Observação |
|-------------|-------|-------|------------|
| `cutting-calculator` | Python | <10 | Cálculos básicos, sem materiais |
| `cnc-speeds-feeds` | JavaScript | 15 | Somente torneamento, sem fresamento |
| `machining-calculator` | PHP | 5 | Sem manutenção desde 2020 |
| `fswizard-clone` | React | 8 | Interface only, sem engine |
| `speeds-feeds-calc` | Python | 12 | Apenas alumínio |
| `turning-calculator` | C++ | 22 | Desktop, sem web |
| `cnc-helper` | Vue 3 | 19 | Foco em G-code, não parâmetros |
| `tool-database` | PostgreSQL | 31 | Apenas banco, sem cálculos |
| `machining-advisor` | Angular | 7 | Abandonado (2021) |
| `milling-feeds` | Svelte | 4 | MVP incompleto |
| `cnc-params` | Python | 9 | Kienzle AUSENTE, básico |

---

## Análise Comparativa — ToolOptimizer vs Open-Source

| Feature | ToolOptimizer | Melhor concorrente open-source |
|---------|---------------|-------------------------------|
| **Kienzle (força de corte)** | ✅ Implementado | ❌ Nenhum |
| **Chip Thinning (CTF)** | ✅ Implementado | ⚠️ Parcial (brturn) |
| **Base de materiais** | ✅ 9 materiais | ⚠️ Limitada (CNC-ToolHub) |
| **Coating multipliers** | ❌ Não implementado | ✅ CNC-ToolHub |
| **Machine rigidity** | ❌ Não implementado | ✅ CNC-ToolHub |
| **Machinability index** | ❌ Não implementado | ✅ pymachining |
| **Testes automatizados** | ✅ **503 testes** | ❌ Nenhum tem cobertura comparável |
| **TypeScript strict** | ✅ | ⚠️ Somente cnc-calc-react (sem strict) |
| **UI responsiva** | ✅ Desktop + Mobile | ❌ Maioria CLI ou básico |
| **Deploy web** | ✅ Cloudflare + custom domain | ❌ Maioria local only |

---

## Padrões Aproveitáveis para Roadmap

### 1. Coating Multipliers (de CNC-ToolHub)

Aplicar multiplicador de Vc baseado no revestimento da ferramenta:

```
TiAlN:      Vc × 1.40
AlCrN:      Vc × 1.30
TiN:        Vc × 1.10
Não revestido: Vc × 1.00
DLC:        Vc × 1.50 (alumínio)
PCD:        Vc × 2.00 (alumínio)
```

**Quando implementar:** Story futura (pós-MVP)

### 2. Machine Rigidity Classes (de CNC-ToolHub)

Multiplicador de Vc baseado na rigidez da máquina:

```
Rígida (centro de usinagem moderno): Vc × 1.00
Média (fresadora convencional):       Vc × 0.85
Flexível (máquina antiga/leve):       Vc × 0.70
```

**Quando implementar:** Story futura — complementa o safety factor atual

### 3. Machinability Index (de pymachining)

Índice numérico de usinabilidade por material (referência = Aço 1045 = 1.0):

```
Al 6061-T6:     3.0
Aço 1020:       1.2
Aço 1045:       1.0
P20:            0.8
8620 núcleo:    0.75
Inox 304:       0.45
H13:            0.35
8620 cementado: 0.3
2711:           ~0.7 (estimado, similar P20)
```

**Uso potencial:** Normalização visual no ParameterHealthBar ou badge de dificuldade

---

## Insight Principal — Posicionamento

> **ToolOptimizer CNC é único** no ecossistema open-source por combinar:
> - Kienzle (força de corte física)
> - Base de materiais brasileiros (P20, 2711, VP50)
> - Chip thinning correto
> - 503 testes automatizados
> - Deploy web profissional com domínio próprio
>
> **Nenhum concorrente open-source** tem essa combinação.
> O mais próximo é CNC-ToolHub (Python, boa base de dados) + pymachining (cálculos corretos),
> mas nenhum tem UI web nem testes.

---

## Referências de Busca

Queries utilizadas na pesquisa (GitHub Search):
- `CNC milling feeds speeds calculator`
- `machining parameters calculator React`
- `Kienzle cutting force calculator`
- `speeds feeds calculator TypeScript`
- `CNC tool database material`

---

*Criado: 22/02/2026 — Sessão s8 (pesquisa pura)*
*Concluído e documentado: 01/03/2026 — Sessão s23*
*Referência em: `docs/technical/PESQUISA_VC_VALIDADA.md` (Etapa 5)*
