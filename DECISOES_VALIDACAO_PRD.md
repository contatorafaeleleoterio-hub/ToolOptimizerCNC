# Decisões e Validações - Revisão PRD ToolOptimizer CNC MVP

**Data:** 07/02/2026  
**Sessão:** Validação de Pontos Críticos e Definições Técnicas  
**Objetivo:** Complementar PRD v1.0 com regras de validação e fórmulas detalhadas

---

## 1. DECISÕES DE ARQUITETURA

### 1.1 State Management
**Decisão:** Usar **Zustand** para gerenciamento de estado

**Justificativa:**
- Mais performático que Context API
- Menos verboso
- Ideal para state derivado com recálculos automáticos
- Perfeito para sistema desktop local com cálculos em tempo real

**Status:** ✅ Aprovado

---

## 2. REGRAS DE VALIDAÇÃO DE PARÂMETROS

### 2.1 Diâmetro de Ferramenta (D)

**Range aceito:**
- **Mínimo:** 0.5 mm
- **Máximo:** 30 mm

**Aplicação:**
- Validação obrigatória em todos os inputs de diâmetro
- Bloqueio de valores fora do range

---

### 2.2 Profundidade de Corte Axial (ap)

**Objetivo:**
Evitar configurações fisicamente inviáveis que gerem quebra de ferramenta, vibração excessiva ou danos.

**Regra de Validação:**

| Tipo de Operação | Limite Máximo | Multiplicador |
|------------------|---------------|---------------|
| Desbaste | ap ≤ 1.0 × D | k = 1.0 (conservador) |
| Semi-acabamento | ap ≤ 0.5 × D | k = 0.5 |
| Acabamento | ap ≤ 0.3 × D | k = 0.3 |

**Fórmula:**
```
ap_max = k × D

Condição: ap ≤ ap_max
```

**Exemplo - Ferramenta Ø10mm:**
- Desbaste: ap_max = 10 mm
- Semi-acabamento: ap_max = 5 mm
- Acabamento: ap_max = 3 mm

**Ação do Sistema:**
- Se `ap > ap_max` → Bloquear configuração
- Mostrar mensagem: "ap excede o limite permitido. Máx: [valor] mm"

**Observação para Fase 2:**
- Em modo avançado HSM/Toroidal: permitir ap > limite se ae reduzido
- Critério: ae ≤ 0.15 × D com estratégia específica

---

### 2.3 Profundidade de Corte Radial (ae)

**Objetivo:**
Evitar sobrecarga instantânea, travamento, vibração severa e quebra por esforço radial excessivo.

**Regra de Validação:**

| Tipo de Operação | Limite Máximo | Multiplicador |
|------------------|---------------|---------------|
| Desbaste | ae ≤ 0.5 × D | k = 0.5 |
| Semi-acabamento | ae ≤ 0.3 × D | k = 0.3 |
| Acabamento | ae ≤ 0.1 × D | k = 0.1 |

**Fórmula:**
```
ae_max = k × D

Condição: ae ≤ ae_max
```

**Exemplo - Ferramenta Ø10mm:**
- Desbaste: ae_max = 5 mm
- Semi-acabamento: ae_max = 3 mm
- Acabamento: ae_max = 1 mm

**Ação do Sistema:**
- Se `ae > ae_max` → Bloquear configuração
- Mostrar mensagem: "ae excede o limite permitido. Máx: [valor] mm"

**Observação:**
- ae impacta diretamente o esforço instantâneo, torque no spindle e risco de travamento
- ae é mais crítico que ap em termos de pico de esforço

**Observação para Fase 2:**
- Em HSM/Toroidal: ae típico = 5-15% de D, ap pode ser 2-4× D
- ae e ap precisam "conversar" entre si no modo avançado

---

### 2.4 Avanço por Dente (fz)

**Objetivo:**
Garantir que fz fique dentro de faixa útil de corte, evitando atrito/rubbing (fz baixo) ou sobrecarga/vibração (fz alto).

**Regra de Validação (baseada em D e operação):**

| Tipo de Operação | Limite Mínimo | Limite Máximo |
|------------------|---------------|---------------|
| Desbaste | fz_min = 0.015 × D | fz_max = 0.050 × D |
| Semi-acabamento | fz_min = 0.010 × D | fz_max = 0.030 × D |
| Acabamento | fz_min = 0.005 × D | fz_max = 0.015 × D |

**Fórmula:**
```
Condição: fz_min ≤ fz ≤ fz_max
```

**Exemplo - Ferramenta Ø10mm, Semi-acabamento:**
- fz_min = 0.10 mm/dente
- fz_max = 0.30 mm/dente

**Ação do Sistema:**
- Se `fz < fz_min` → Alerta: "Risco de rubbing/atrito"
- Se `fz > fz_max` → Alerta: "Risco de sobrecarga/vibração"
- Fora do range → Configuração inválida

**Observação:**
- Material entrará como ajuste fino (multiplicador) em versão futura
- Range atual é genérico e seguro para MVP

---

### 2.5 Relação L/D (Comprimento/Diâmetro)

**Objetivo:**
Controlar rigidez da ferramenta e prevenir deflexão excessiva, chatter e quebra prematura.

**Fórmula:**
```
L/D = comprimento útil da ferramenta / diâmetro da ferramenta
```

**Classificação por Nível de Risco:**

| Faixa L/D | Status | Cor | Ação do Sistema |
|-----------|--------|-----|-----------------|
| L/D ≤ 3 | OK | 🟢 Verde | Operação liberada |
| 3 < L/D ≤ 4 | Aviso | 🟡 Amarelo | Alertar sobre possível deflexão |
| 4 < L/D ≤ 5 | Crítico | 🔴 Vermelho | Alertar + recomendar redução de ap/ae/fz |
| L/D > 6 | Bloqueio | ⛔ Bloqueado | Não permitir operação padrão |

**Condições de Validação:**
```
if L/D > 6:
    → BLOQUEAR operação
    
if 5 < L/D ≤ 6:
    → ALERTA CRÍTICO: "Rigidez muito comprometida"
    
if 4 < L/D ≤ 5:
    → ALERTA: "Reduzir parâmetros de corte recomendado"
```

**Observações:**
- L/D = 5 já é crítico em usinagem convencional
- L/D > 6 só faz sentido em HSM, toroidal ou condições muito controladas
- Em modo avançado (Fase 2): permitir L/D > 6 com restrições

---

## 3. FÓRMULAS TÉCNICAS DETALHADAS

### 3.1 Chip Thinning Factor (CTF)

**Conceito:**
Fator geométrico que ajusta o avanço real quando ae < 50% do diâmetro. Compensa o "afinamento" do cavaco em cortes com baixo engajamento radial.

**Fórmula Matemática Validada:**

```
CTF = {
    1.0,                                    se ae/D ≥ 0.50
    1 / √[1 - (1 - 2×(ae/D))²],            se ae/D < 0.50
}
```

**Tabela de Referência (valores aproximados):**

| ae/D | CTF | Interpretação |
|------|-----|---------------|
| 0.50 | 1.00 | Sem afinamento |
| 0.40 | 1.10 | Afinamento leve |
| 0.30 | 1.20 | Afinamento moderado |
| 0.20 | 1.41 | Afinamento significativo |
| 0.10 | 1.83 | Afinamento alto (HSM) |
| 0.05 | 2.24 | Afinamento muito alto |
| 0.02 | 3.60 | Afinamento extremo |

**Aplicação no Código:**
```typescript
function calculateCTF(ae: number, D: number): number {
    const ratio = ae / D;
    
    if (ratio >= 0.50) {
        return 1.0;
    }
    
    const factor = 1 - 2 * ratio;
    return 1 / Math.sqrt(1 - Math.pow(factor, 2));
}

// Aplicar ao fz
const fz_adjusted = fz_desired * CTF;
```

**Observações:**
- CTF só existe quando ae < 50% D
- Quando ae ≥ 50%, assumir CTF = 1.0
- Para Ball Nose com lead angle: existe CTF adicional (Fase 2)
- Valores práticos de CTF variam de ~1.0 até ~3.6

---

### 3.2 Rigidez e Deflexão - Geometria da Haste

**Conceito:**
Ferramentas com rebaixo (reduced shank) têm seção de haste reduzida, o que diminui drasticamente a rigidez devido à relação I ∝ d⁴.

#### 3.2.1 Tipos de Haste e Impacto na Rigidez

| Tipo de Haste | Descrição | Ø haste | Impacto em I (momento de inércia) |
|---------------|-----------|---------|-----------------------------------|
| **Inteiriça** | Ø haste = Ø corte | D | Maior rigidez (referência) |
| **Rebaixo leve** | Ø haste reduzido | 0.8 × D | ↓ ~41% |
| **Rebaixo moderado** | Ø haste reduzido | 0.6 × D | ↓ ~87% |
| **Rebaixo agressivo** | Ø haste muito reduzido | 0.5 × D | ↓ ~94% |

**Exemplo Numérico:**
```
Ferramenta Ø10mm:
- Inteiriça (D=10):    I ∝ 10⁴ = 10000  (100%)
- Rebaixo 8mm:         I ∝ 8⁴  = 4096   (41%)
- Rebaixo 6mm:         I ∝ 6⁴  = 1296   (13%)

Conclusão: Reduzir haste de 10→6mm deixa rigidez ~1/8 da original
```

#### 3.2.2 Cálculo do Momento de Inércia (I)

**Fórmula para seção circular:**

```typescript
function calculateMomentOfInertia(toolType: string, D: number, d_rebaixo?: number): number {
    const PI = Math.PI;
    
    if (toolType === "inteiriça") {
        // Usar diâmetro total
        return (PI * Math.pow(D, 4)) / 64;
    } else if (toolType === "rebaixo") {
        // Usar diâmetro da seção reduzida (mais fraca)
        if (!d_rebaixo) {
            throw new Error("d_rebaixo é obrigatório para haste com rebaixo");
        }
        return (PI * Math.pow(d_rebaixo, 4)) / 64;
    }
    
    throw new Error("Tipo de haste inválido");
}
```

**Fórmulas:**
- **Inteiriça:** `I = π × D⁴ / 64`
- **Rebaixo:** `I = π × d_rebaixo⁴ / 64` (onde d_rebaixo < D)

#### 3.2.3 Cálculo de Deflexão (δ)

**Modelo de viga em balanço:**

```
δ = (F × Le³) / (3 × E × I)
```

Onde:
- **F** = Força de corte radial (N)
- **Le** = Comprimento efetivo em balanço (mm)
- **E** = Módulo de elasticidade do metal duro ≈ 600 GPa = 600.000 N/mm²
- **I** = Momento de inércia (mm⁴) - calculado conforme tipo de haste

**Impacto:**
- Se I ↓ (haste com rebaixo) → δ ↑ (mais flexão)
- Se Le ↑ (L/D alto) → δ ↑ exponencialmente (Le³)

**Implementação no Sistema:**
```typescript
function calculateDeflection(
    force: number,        // N
    length: number,       // mm
    E: number,           // N/mm² (600000 para metal duro)
    I: number            // mm⁴
): number {
    return (force * Math.pow(length, 3)) / (3 * E * I);
}
```

**Observações Importantes:**
- Sistema deve priorizar a **menor seção** (d_rebaixo) na análise
- Transição corpo-rebaixo causa concentração de tensão (simplificado no MVP)
- Para análise por FEM: considerar geometria completa (Fase 2)
- Para validação simples: considerar apenas d_rebaixo é suficiente e realista

---

## 4. CONSTANTES FÍSICAS DO SISTEMA

### 4.1 Módulo de Elasticidade (E)

**Material da Ferramenta:** Metal duro (carbide)

```typescript
const E_CARBIDE = 600000; // N/mm² (600 GPa)
```

**Uso:**
- Cálculo de deflexão em fresas de metal duro
- Constante padrão para todas as ferramentas do MVP

---

## 5. IMPLEMENTAÇÃO NO PRD

### 5.1 Seções a Adicionar/Atualizar

**Seção 3.1.5 - Stack Tecnológica:**
- ✏️ Atualizar: "State Management: **Zustand**" (remover "ou Context API (a definir)")

**Seção 6 - Requisitos Funcionais:**
- ✏️ Adicionar novo RF: "RF12 - Validação de Inputs com Ranges Dinâmicos"
- Incluir tabelas de validação para D, ap, ae, fz, L/D

**Nova Seção: "6.5 Fórmulas Matemáticas Detalhadas"**
- Adicionar fórmulas CTF, Momento de Inércia, Deflexão
- Incluir constantes físicas (E = 600 GPa)
- Documentar impacto de geometria de haste

**Seção 7.4 - Testes:**
- ✏️ Adicionar casos de teste com valores de referência
- Exemplo: "Aço 1045, Toroidal Ø10 R1, Desbaste → RPM: 3820±200, F: 1145±100, P: 2.3±0.5 kW"

---

## 6. PRÓXIMOS PASSOS RECOMENDADOS

### 6.1 Antes de Iniciar Sprint 1

✅ **URGENTE:**
1. Atualizar PRD com decisão de State Management (Zustand)
2. Adicionar tabelas de validação de ranges (D, ap, ae, fz, L/D)
3. Documentar fórmulas CTF e rigidez com valores numéricos

✅ **IMPORTANTE:**
4. Criar documento complementar `FORMULAS_TECNICAS.md` com:
   - Fórmulas matemáticas completas
   - Tabelas de Vc por material × operação
   - Valores de Kc (pressão específica de corte) por material
   - Casos de teste de referência (3-5 cenários)

✅ **BOM TER:**
5. Adicionar feature de Export/Import de configurações (JSON) para backup
6. Definir método final de distribuição: HTTP local simples ou Electron app

---

## 7. DECISÕES TÉCNICAS DE IMPLEMENTAÇÃO

### 7.1 Validação de Inputs - Pseudo-código

```typescript
interface ValidationRules {
    diameter: { min: 0.5, max: 30 }; // mm
    
    ap: {
        desbaste: (D: number) => D * 1.0,
        semi: (D: number) => D * 0.5,
        acabamento: (D: number) => D * 0.3
    };
    
    ae: {
        desbaste: (D: number) => D * 0.5,
        semi: (D: number) => D * 0.3,
        acabamento: (D: number) => D * 0.1
    };
    
    fz: {
        desbaste: { 
            min: (D: number) => D * 0.015, 
            max: (D: number) => D * 0.050 
        },
        semi: { 
            min: (D: number) => D * 0.010, 
            max: (D: number) => D * 0.030 
        },
        acabamento: { 
            min: (D: number) => D * 0.005, 
            max: (D: number) => D * 0.015 
        }
    };
    
    LD_ratio: {
        safe: 3,
        warning: 4,
        critical: 5,
        blocked: 6
    };
}
```

### 7.2 Sistema de Cores (Status Visual)

```typescript
enum ValidationStatus {
    OK = "green",       // L/D ≤ 3, parâmetros dentro do range
    WARNING = "yellow", // 3 < L/D ≤ 4, ou parâmetro próximo ao limite
    CRITICAL = "red",   // 4 < L/D ≤ 5, ou parâmetro no limite
    BLOCKED = "blocked" // L/D > 6, ou parâmetro fora do range
}
```

---

## 8. OBSERVAÇÕES FINAIS

### 8.1 Limitações Conhecidas (MVP)

- Modelo de forças simplificado (Kienzle 2D) → erro ±15-25%
- Rigidez estimada não considera conjunto máquina-fixação-peça
- CTF não captura variação por geometria complexa ou lead angle
- Sem feedback de máquina (potência real, vibração, temperatura)

### 8.2 Evolução para Fase 2

**Modo Avançado:**
- Permitir ap > 1.0×D em HSM/Toroidal com ae ≤ 0.15×D
- Permitir L/D > 6 com restrições e disclaimers
- CTF para Ball Nose com lead angle
- Análise FEM de rigidez considerando geometria completa
- Integração com CAM (Mastercam, Esprit)

---

## 9. GLOSSÁRIO DE TERMOS TÉCNICOS NOVOS

| Termo | Definição |
|-------|-----------|
| **CTF** | Chip Thinning Factor - Fator de correção de avanço quando ae < 50% D |
| **I** | Momento de Inércia - Propriedade geométrica que define rigidez à flexão (mm⁴) |
| **E** | Módulo de Elasticidade - Propriedade do material (N/mm² ou GPa) |
| **δ** | Deflexão - Deformação linear da ferramenta sob carga (mm ou μm) |
| **d_rebaixo** | Diâmetro da seção reduzida da haste (mm) |
| **Le** | Comprimento efetivo em balanço da ferramenta (mm) |

---

## 10. CHECKLIST DE VALIDAÇÃO PRÉ-DESENVOLVIMENTO

- [x] State Management definido (Zustand)
- [x] Ranges de validação documentados (D, ap, ae, fz, L/D)
- [x] Fórmula CTF especificada com tabela de referência
- [x] Cálculo de rigidez definido (I para inteiriça vs rebaixo)
- [x] Constantes físicas documentadas (E = 600 GPa)
- [ ] Tabelas de Vc por material × operação (pendente - criar FORMULAS_TECNICAS.md)
- [ ] Valores de Kc por material (pendente - criar FORMULAS_TECNICAS.md)
- [ ] Casos de teste de referência (pendente - criar FORMULAS_TECNICAS.md)
- [ ] Decisão final: HTTP local vs Electron (pendente)
- [ ] Feature de Export/Import de configs (opcional - avaliar em Sprint Planning)

---

**Documento criado em:** 07/02/2026  
**Baseado em:** Sessão de validação técnica com Rafael Eleoterio  
**Próximo passo:** Criar `FORMULAS_TECNICAS.md` com dados complementares  
**Status:** ✅ Pronto para atualizar PRD v1.0 → v1.1

---

_"A ciência da usinagem, simplificada."_  
**ToolOptimizer CNC** - Decisões Técnicas Validadas
