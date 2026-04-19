# CASOS DE TESTE DE REFERÊNCIA
## ToolOptimizer CNC - Validação de Fórmulas
**Versão:** 1.0 | **Data:** 07/02/2026

---

## FÓRMULAS UTILIZADAS

| Cálculo | Fórmula | Fonte |
|---------|---------|-------|
| **RPM** | `n = (Vc × 1000) / (π × D)` | ISO 3685:2017, Sandvik p.142 |
| **Avanço** | `Vf = fz × Z × n` | Sandvik 2023 p.142 |
| **MRR** | `Q = (ap × ae × Vf) / 1000` | ASM Handbook Vol.16 |
| **Potência** | `Pc = (Q × Kc) / (60000 × η)` | DIN 6584 |
| **Torque** | `M = (Pc × 9549) / n` | Conversão kW→Nm |
| **Chip Thinning** | `fz_corr = fz / √(ae/D)` | Quando ae < 50%D |

**Constantes:**
- π = 3.14159265359
- η (eficiência) = 0.80 (CNC padrão)
- Z = 4 flautas (toroidal padrão)

---

## CENÁRIO A: AÇO 1045 - DESBASTE

### Dados de Entrada
| Parâmetro | Valor | Fonte |
|-----------|-------|-------|
| Material | Aço 1045 | PARAMETROS_MATERIAL.md |
| Kc | 2000 N/mm² | MATERIAIS_BASE.md |
| Operação | Desbaste | — |
| Diâmetro (D) | 12 mm | Entrada usuário |
| ap | 3 mm | Entrada usuário |
| ae | 6 mm (50%D) | Entrada usuário |
| Vc | 100 m/min | Tabela desbaste (80-120) |
| fz | 0.08 mm/dente | Tabela desbaste |
| Z | 4 flautas | Padrão toroidal |

### Cálculo Passo a Passo

**1. Verificar Chip Thinning:**
```
ae/D = 6/12 = 0.50 (50%)
Condição: ae ≥ 50%D → NÃO APLICA chip thinning
fz_efetivo = 0.08 mm/dente
```

**2. Calcular RPM:**
```
n = (Vc × 1000) / (π × D)
n = (100 × 1000) / (3.14159 × 12)
n = 100000 / 37.699
n = 2652.58 rpm
```

**3. Calcular Avanço (Vf):**
```
Vf = fz × Z × n
Vf = 0.08 × 4 × 2652.58
Vf = 848.83 mm/min
```

**4. Calcular MRR (Q):**
```
Q = (ap × ae × Vf) / 1000
Q = (3 × 6 × 848.83) / 1000
Q = 15278.94 / 1000
Q = 15.28 mm³/min = 15.28 cm³/min
```

**5. Calcular Potência (Pc):**
```
Pc = (Q × Kc) / (60000 × η)
Pc = (15.28 × 2000) / (60000 × 0.80)
Pc = 30560 / 48000
Pc = 0.637 kW
```

**6. Calcular Torque (M):**
```
M = (Pc × 9549) / n
M = (0.637 × 9549) / 2652.58
M = 6082.70 / 2652.58
M = 2.29 Nm
```

### Resultado Esperado - Cenário A

| Parâmetro | Valor | Unidade |
|-----------|-------|---------|
| **RPM** | **2652.58** | rpm |
| **Avanço (Vf)** | **848.83** | mm/min |
| **Potência** | **0.64** | kW |
| **Torque** | **2.29** | Nm |
| Chip Thinning | Não aplicado | — |

---

## CENÁRIO B: ALUMÍNIO 6061 - ACABAMENTO

### Dados de Entrada
| Parâmetro | Valor | Fonte |
|-----------|-------|-------|
| Material | Alumínio 6061 | PARAMETROS_MATERIAL.md |
| Kc | 700 N/mm² | MATERIAIS_BASE.md |
| Operação | Acabamento | — |
| Diâmetro (D) | 10 mm | Entrada usuário |
| ap | 1 mm | Entrada usuário |
| ae | 2 mm (20%D) | Entrada usuário |
| Vc | 500 m/min | Tabela acabamento (400-600) |
| fz | 0.10 mm/dente | Tabela acabamento |
| Z | 4 flautas | Padrão toroidal |

### Cálculo Passo a Passo

**1. Verificar Chip Thinning:**
```
ae/D = 2/10 = 0.20 (20%)
Condição: ae < 50%D → APLICA chip thinning

Fator = √(ae/D) = √0.20 = 0.4472
fz_corrigido = fz / Fator = 0.10 / 0.4472 = 0.2236 mm/dente
```

**2. Calcular RPM:**
```
n = (Vc × 1000) / (π × D)
n = (500 × 1000) / (3.14159 × 10)
n = 500000 / 31.4159
n = 15915.49 rpm
```

**3. Calcular Avanço (Vf) - COM fz corrigido:**
```
Vf = fz_corrigido × Z × n
Vf = 0.2236 × 4 × 15915.49
Vf = 14234.03 mm/min
```

**4. Calcular MRR (Q):**
```
Q = (ap × ae × Vf) / 1000
Q = (1 × 2 × 14234.03) / 1000
Q = 28468.06 / 1000
Q = 28.47 cm³/min
```

**5. Calcular Potência (Pc):**
```
Pc = (Q × Kc) / (60000 × η)
Pc = (28.47 × 700) / (60000 × 0.80)
Pc = 19929 / 48000
Pc = 0.415 kW
```

**6. Calcular Torque (M):**
```
M = (Pc × 9549) / n
M = (0.415 × 9549) / 15915.49
M = 3962.84 / 15915.49
M = 0.25 Nm
```

### Resultado Esperado - Cenário B

| Parâmetro | Valor | Unidade |
|-----------|-------|---------|
| **RPM** | **15915.49** | rpm |
| **Avanço (Vf)** | **14234.03** | mm/min |
| **Potência** | **0.42** | kW |
| **Torque** | **0.25** | Nm |
| Chip Thinning | **Aplicado** (fator 2.24×) | — |

---

## CENÁRIO C: INOX 304 - SEMI-ACABAMENTO (COM CHIP THINNING)

### Dados de Entrada
| Parâmetro | Valor | Fonte |
|-----------|-------|-------|
| Material | Aço Inox 304 | PARAMETROS_MATERIAL.md |
| Kc | 2400 N/mm² | MATERIAIS_BASE.md |
| Operação | Semi-acabamento | — |
| Diâmetro (D) | 8 mm | Entrada usuário |
| ap | 2 mm | Entrada usuário |
| ae | 2 mm (25%D) | Entrada usuário |
| Vc | 95 m/min | Tabela semi-acab (80-110) |
| fz | 0.05 mm/dente | Tabela semi-acabamento |
| Z | 4 flautas | Padrão toroidal |

### Cálculo Passo a Passo

**1. Verificar Chip Thinning:**
```
ae/D = 2/8 = 0.25 (25%)
Condição: ae < 50%D → APLICA chip thinning

Fator = √(ae/D) = √0.25 = 0.50
fz_corrigido = fz / Fator = 0.05 / 0.50 = 0.10 mm/dente
```

**2. Calcular RPM:**
```
n = (Vc × 1000) / (π × D)
n = (95 × 1000) / (3.14159 × 8)
n = 95000 / 25.1327
n = 3780.23 rpm
```

**3. Calcular Avanço (Vf) - COM fz corrigido:**
```
Vf = fz_corrigido × Z × n
Vf = 0.10 × 4 × 3780.23
Vf = 1512.09 mm/min
```

**4. Calcular MRR (Q):**
```
Q = (ap × ae × Vf) / 1000
Q = (2 × 2 × 1512.09) / 1000
Q = 6048.36 / 1000
Q = 6.05 cm³/min
```

**5. Calcular Potência (Pc):**
```
Pc = (Q × Kc) / (60000 × η)
Pc = (6.05 × 2400) / (60000 × 0.80)
Pc = 14520 / 48000
Pc = 0.303 kW
```

**6. Calcular Torque (M):**
```
M = (Pc × 9549) / n
M = (0.303 × 9549) / 3780.23
M = 2893.35 / 3780.23
M = 0.77 Nm
```

### Resultado Esperado - Cenário C

| Parâmetro | Valor | Unidade |
|-----------|-------|---------|
| **RPM** | **3780.23** | rpm |
| **Avanço (Vf)** | **1512.09** | mm/min |
| **Potência** | **0.30** | kW |
| **Torque** | **0.77** | Nm |
| Chip Thinning | **Aplicado** (fator 2.0×) | — |

---

## TABELA RESUMO - VALIDAÇÃO

| Cenário | Material | Operação | D | RPM | Vf (mm/min) | P (kW) | T (Nm) | CTF |
|---------|----------|----------|---|-----|-------------|--------|--------|-----|
| **A** | Aço 1045 | Desbaste | 12 | 2652.58 | 848.83 | 0.64 | 2.29 | Não |
| **B** | Al 6061 | Acabam. | 10 | 15915.49 | 14234.03 | 0.42 | 0.25 | 2.24× |
| **C** | Inox 304 | Semi-ac. | 8 | 3780.23 | 1512.09 | 0.30 | 0.77 | 2.0× |

---

## CRITÉRIOS DE APROVAÇÃO

Para o código ser considerado **válido**, os resultados devem:

| Parâmetro | Tolerância Aceitável |
|-----------|---------------------|
| RPM | ±1 rpm |
| Avanço (Vf) | ±1 mm/min |
| Potência | ±0.01 kW |
| Torque | ±0.01 Nm |

**Nota:** Tolerâncias mínimas devido a arredondamentos em π e √.

---

## REFERÊNCIAS TÉCNICAS

- **ISO 3685:2017** - Tool Life Testing
- **Sandvik Coromant** - Modern Metal Cutting 2023
- **Kennametal** - Milling Catalog 2024
- **ASM Handbook Vol.16** - Machining
- **DIN 6584** - Specific Cutting Force
