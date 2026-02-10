# ESPECIFICAÇÃO TÉCNICA CONSOLIDADA
## ToolOptimizer CNC - Base de Cálculos
**Versão:** 1.0 | **Data:** 07/02/2026  
**Fontes:** Sandvik Coromant 2023, Kennametal 2024, ISO 3685:2017, ASM Handbook Vol.16

---

# SEÇÃO 1: FÓRMULAS UNIVERSAIS

## 1.1 Velocidade de Corte ↔ RPM

```
n = (Vc × 1000) / (π × D)
Vc = (π × D × n) / 1000
```

| Variável | Unidade | Descrição |
|----------|---------|-----------|
| n | RPM | Rotação |
| Vc | m/min | Velocidade de corte |
| D | mm | Diâmetro ferramenta |

**Fonte:** ISO 3685:2017, Sandvik 2023 p.142

---

## 1.2 Avanço

```
Vf = fz × Z × n
fn = fz × Z
```

| Variável | Unidade | Descrição |
|----------|---------|-----------|
| Vf | mm/min | Avanço por minuto |
| fz | mm/dente | Avanço por dente |
| fn | mm/rot | Avanço por rotação |
| Z | - | Número de dentes |

**Fonte:** Sandvik 2023 p.142

---

## 1.3 Taxa de Remoção (MRR)

```
Q = (ap × ae × Vf) / 1000
```

| Variável | Unidade | Descrição |
|----------|---------|-----------|
| Q | cm³/min | Taxa de remoção |
| ap | mm | Profundidade axial |
| ae | mm | Largura radial |
| Vf | mm/min | Avanço |

**Fonte:** ASM Handbook Vol.16 p.234

---

## 1.4 Potência de Corte

```
Pc = (Q × Kc) / (60000 × η)
```

| Variável | Unidade | Descrição |
|----------|---------|-----------|
| Pc | kW | Potência de corte |
| Q | cm³/min | Taxa de remoção |
| Kc | N/mm² | Pressão específica de corte |
| η | - | Eficiência da máquina (0.80 típico) |

**Fonte:** DIN 6584

---

## 1.5 Torque

```
M = (Pc × 9549) / n
```

| Variável | Unidade | Descrição |
|----------|---------|-----------|
| M | Nm | Torque |
| Pc | kW | Potência |
| n | RPM | Rotação |
| 9549 | - | Fator conversão kW→Nm |

---

## 1.6 Chip Thinning (Afinamento de Cavaco)

**Quando aplicar:** ae < 50% do diâmetro (ae/D < 0.5)

```
fz_corrigido = fz_tabela / √(ae / D)
```

| ae/D | Fator | Multiplicador fz |
|------|-------|------------------|
| 50% | 0.707 | 1.41× |
| 25% | 0.500 | 2.00× |
| 20% | 0.447 | 2.24× |
| 10% | 0.316 | 3.16× |

**Fonte:** Sandvik Coromant, HSM/HEM Guidelines

---

## 1.7 Força de Corte (Simplificada)

```
Fc = Kc × ap × fz × Z
```

| Variável | Unidade |
|----------|---------|
| Fc | N |
| Kc | N/mm² |

---

## 1.8 Deflexão (Modelo Viga)

```
δ = (F × L³) / (3 × E × I)
I = (π × D⁴) / 64
```

| Variável | Unidade | Descrição |
|----------|---------|-----------|
| δ | mm | Deflexão na ponta |
| F | N | Força lateral |
| L | mm | Balanço |
| E | N/mm² | Módulo elasticidade (~600000 metal duro) |
| I | mm⁴ | Momento de inércia |

---

# SEÇÃO 2: MATERIAIS - PROPRIEDADES

## 2.1 Classificação ISO e Dureza

| Material | ISO | Dureza | Kc (N/mm²) |
|----------|-----|--------|------------|
| Aço baixo carbono (1020, 1045) | P | 120-220 HB | 1800-2000 |
| Aço médio/alto carbono (4140, 4340) | P | 200-300 HB | 2200-2500 |
| Inox austenítico (304, 316) | M | 150-250 HB | 2000-2500 |
| Inox martensítico (420, 440C) | M/H | 45-55 HRC | 2200-2800 |
| Alumínio comum (6061, 6063) | N | 30-95 HB | 400-700 |
| Alumínio aeronáutico (7075) | N | 100-150 HB | 600-900 |
| Titânio Ti-6Al-4V | S | 320-380 HB | 1300-1400 |
| Ferro fundido cinzento | K | 180-250 HB | 1800-2200 |
| Cobre e latão | N | 40-120 HB | 600-1000 |

---

## 2.2 Velocidade de Corte Recomendada (m/min) - Metal Duro

| Material | Sem Revestimento | Com Revestimento |
|----------|------------------|------------------|
| Aço baixo carbono | 100-150 | 200-300 |
| Aço médio/alto carbono | 80-120 | 140-190 |
| Inox austenítico | 50-100 | 100-200 |
| Alumínio comum | 200-400 | 500-700 |
| Alumínio aeronáutico | 150-300 | 400-600 |
| Titânio Ti-6Al-4V | 30-50 | 60-100 |

---

# SEÇÃO 3: PARÂMETROS POR MATERIAL E OPERAÇÃO

## 3.1 AÇO CARBONO ABNT 1045

**Propriedades:** Dureza 170-220 HB | Kc = 2000 N/mm²  
**Fonte:** Sandvik Coromant C-2920:051 (2023)

### Fresa TOROIDAL (4 flautas)

| Operação | Vc (m/min) | fz (mm) | ap (mm) | ae (%D) |
|----------|------------|---------|---------|---------|
| Desbaste | 80-120 | 0.08 | 0.5-1.0 | 25-50 |
| Semi-acabamento | 100-140 | 0.06 | 0.3-0.6 | 15-30 |
| Acabamento | 120-160 | 0.05 | 0.2-0.4 | 10-20 |

---

## 3.2 ALUMÍNIO 6061-T6

**Propriedades:** Dureza 95 HB | Kc = 700 N/mm²  
**Fonte:** Kennametal B211-AL (2024)

### Fresa TOROIDAL (4 flautas)

| Operação | Vc (m/min) | fz (mm) | ap (mm) | ae (%D) |
|----------|------------|---------|---------|---------|
| Desbaste | 300-500 | 0.15 | 1.5-3.0 | 40-70 |
| Semi-acabamento | 350-550 | 0.12 | 0.8-1.5 | 25-40 |
| Acabamento | 400-600 | 0.10 | 0.4-0.8 | 15-30 |

---

## 3.3 AÇO INOXIDÁVEL AISI 304

**Propriedades:** Dureza 140-180 HB | Kc = 2400 N/mm²  
**Fonte:** Sandvik Coromant C-1110:1 (2023)

### Fresa TOROIDAL (4 flautas)

| Operação | Vc (m/min) | fz (mm) | ap (mm) | ae (%D) |
|----------|------------|---------|---------|---------|
| Desbaste | 60-90 | 0.07 | 0.4-0.8 | 20-40 |
| Semi-acabamento | 80-110 | 0.05 | 0.2-0.5 | 12-25 |
| Acabamento | 90-130 | 0.04 | 0.15-0.3 | 8-15 |

**Observação:** Evitar velocidades baixas (encruamento). Refrigeração alta pressão obrigatória.

---

## 3.4 AÇO CARBONO ABNT 1020

**Propriedades:** Dureza 120-160 HB | Kc = 1800 N/mm²  
**Fonte:** Sandvik Coromant C-2920:040 (2023)

### Fresa TOROIDAL (4 flautas)

| Operação | Vc (m/min) | fz (mm) | ap (mm) | ae (%D) |
|----------|------------|---------|---------|---------|
| Desbaste | 100-150 | 0.10 | 0.8-1.5 | 30-60 |
| Semi-acabamento | 120-170 | 0.08 | 0.5-1.0 | 20-40 |
| Acabamento | 140-190 | 0.06 | 0.3-0.6 | 12-25 |

---

## 3.5 AÇO FERRAMENTA P20 (TRATADO)

**Propriedades:** Dureza 280-320 HB | Kc = 2400 N/mm²  
**Fonte:** Sandvik Coromant C-2920:061 (2023)

### Fresa TOROIDAL (4 flautas)

| Operação | Vc (m/min) | fz (mm) | ap (mm) | ae (%D) |
|----------|------------|---------|---------|---------|
| Desbaste | 60-90 | 0.06 | 0.4-0.8 | 20-40 |
| Semi-acabamento | 80-110 | 0.05 | 0.2-0.5 | 12-25 |
| Acabamento | 90-130 | 0.04 | 0.15-0.3 | 8-15 |

---

## 3.6 AÇO FERRAMENTA 2711 (TRATADO)

**Propriedades:** Dureza 300-340 HB | Kc = 2600 N/mm²  
**Fonte:** Kennametal B212-HM (2024)

### Fresa TOROIDAL (4 flautas)

| Operação | Vc (m/min) | fz (mm) | ap (mm) | ae (%D) |
|----------|------------|---------|---------|---------|
| Desbaste | 50-75 | 0.05 | 0.3-0.6 | 15-30 |
| Semi-acabamento | 65-95 | 0.04 | 0.2-0.4 | 10-20 |
| Acabamento | 75-110 | 0.03 | 0.1-0.25 | 6-12 |

**Observação:** Revestimento TiAlN recomendado. Desgaste acelerado.

---

## 3.7 AÇO FERRAMENTA H13 (TRATADO 45-52 HRC)

**Propriedades:** Dureza 45-52 HRC | Kc = 3000 N/mm²  
**Fonte:** Sandvik Coromant C-2920:070 (2023)

### Fresa TOROIDAL (4 flautas, revestimento AlTiN)

| Operação | Vc (m/min) | fz (mm) | ap (mm) | ae (%D) |
|----------|------------|---------|---------|---------|
| Desbaste | 35-55 | 0.03 | 0.15-0.3 | 10-20 |
| Semi-acabamento | 50-75 | 0.025 | 0.1-0.25 | 6-15 |
| Acabamento | 60-90 | 0.02 | 0.08-0.15 | 4-10 |

**Recomendação:** Para H13 > 50 HRC, considerar EDM para cavidades complexas.

---

# SEÇÃO 4: LIMITES E VALIDAÇÕES

## 4.1 Limites de Máquina (Padrão)

| Parâmetro | Limite | Unidade |
|-----------|--------|---------|
| RPM máximo | 24000 | rpm |
| Potência máx | 15 | kW |
| Feed máx | 2000 | mm/min |
| Diâmetro máx | 32 | mm |
| Tool length | 200 | mm |

---

## 4.2 Alertas de Segurança

| Condição | Ação |
|----------|------|
| Vc < 50 ou > 1000 m/min | Aviso |
| RPM > 24000 | Aviso crítico |
| Potência > 15 kW | Aviso crítico |
| L/D > 4 | Aviso crítico (deflexão) |
| ae/D < 25% | Aplicar Chip Thinning |
| ae/D < 10% | Aviso crítico |

---

## 4.3 Relação L/D (Balanço/Diâmetro)

| L/D | Status | Recomendação |
|-----|--------|--------------|
| ≤ 3 | Seguro | Parâmetros normais |
| 3-4 | Atenção | Reduzir ae/ap em 20% |
| 4-5 | Crítico | Reduzir ae/ap em 40% |
| > 5 | Não recomendado | Usar ferramenta mais curta |

---

# SEÇÃO 5: TABELA RESUMO RÁPIDO

## Comparativo por Material (Acabamento, Toroidal 4 flautas)

| Material | Vc (m/min) | fz (mm) | Kc (N/mm²) | Dificuldade |
|----------|------------|---------|------------|-------------|
| Aço 1020 | 140-190 | 0.06 | 1800 | Fácil |
| Aço 1045 | 120-160 | 0.05 | 2000 | Média |
| Aço Inox 304 | 90-130 | 0.04 | 2400 | Difícil |
| Alumínio 6061 | 400-600 | 0.10 | 700 | Fácil |
| P20 (tratado) | 90-130 | 0.04 | 2400 | Média |
| 2711 (tratado) | 75-110 | 0.03 | 2600 | Difícil |
| H13 (tratado) | 60-90 | 0.02 | 3000 | Extremo |

---

# SEÇÃO 6: REFERÊNCIAS TÉCNICAS

## Normas
- ISO 3685:2017 - Tool Life Testing with Single-Point Turning Tools
- ISO 8688-2:1989 - Tool Life Testing in Milling
- DIN 6584 - Specific Cutting Force

## Fabricantes (Catálogos 2023-2024)
- Sandvik Coromant - Modern Metal Cutting 2023
- Kennametal - Milling Catalog 2024
- Seco Tools - Milling Application Guide 2023

## Literatura Técnica
- ASM Handbook Vol.16: Machining (ASM International)
- Machinery's Handbook 31st Edition

---

# SEÇÃO 7: CONSTANTES DO SISTEMA

```javascript
const CONSTANTES = {
  PI: 3.14159265359,
  EFICIENCIA_PADRAO: 0.80,        // η para CNC
  FATOR_TORQUE: 9549,             // kW → Nm
  FLAUTAS_TOROIDAL: 4,            // Z padrão
  MODULO_ELASTICIDADE: 600000,    // N/mm² metal duro
  LIMIAR_CHIP_THINNING: 0.50,     // ae/D < 50%
  RPM_MAX_MAQUINA: 24000,
  POTENCIA_MAX_MAQUINA: 15,       // kW
  FEED_MAX_MAQUINA: 2000          // mm/min
};
```

---

**Documento gerado para validação de implementação do ToolOptimizer CNC.**
