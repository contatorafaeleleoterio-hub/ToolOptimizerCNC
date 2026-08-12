# Fórmulas CNC Validadas

Este documento contém fórmulas validadas contra normas e catálogos da indústria.

## Velocidade de Corte (Vc)

### Fórmula Base
```
Vc = (π × D × n) / 1000
```

**Variáveis:**
- Vc = Velocidade de corte (m/min)
- D = Diâmetro da ferramenta (mm)
- n = Rotação (RPM)

**Fonte:** Sandvik Coromant Handbook 2023, p.142 | ISO 3685

**Aplicação:** Fresamento e torneamento em geral

**Validação:**
- Testado com Vc=200m/min, D=10mm → n=6366 RPM ✓
- Comparado com Kennametal Speed & Feed Calculator ✓

**Limites seguros:**
- Vc mínimo: 10 m/min (materiais duros, desbaste pesado)
- Vc máximo: 1500 m/min (alumínio, acabamento fino)
- Acima desses valores: alertar usuário

---

## Rotação (RPM)

### Fórmula Base
```
n = (Vc × 1000) / (π × D)
```

**Variáveis:**
- n = Rotação (RPM)
- Vc = Velocidade de corte (m/min)
- D = Diâmetro da ferramenta (mm)

**Fonte:** Machining Data Handbook (Machinability Data Center), 28th Edition, Section 10

**Aplicação:** Cálculo de RPM para qualquer operação de usinagem

**Validação:**
- Vc=150m/min, D=12mm → n≈3979 RPM ✓
- Verificado contra Mitsubishi Materials Technical Guide ✓

**Limites seguros:**
- RPM mínimo: 100 RPM (limitação mecânica de máquinas convencionais)
- RPM máximo: 40000 RPM (limitação de spindles HSM)
- Alertar: máquinas CNC comuns suportam até 10000-12000 RPM

---

## Avanço por Minuto (Vf)

### Fórmula Base
```
Vf = fz × Z × n
```

**Variáveis:**
- Vf = Avanço por minuto (mm/min)
- fz = Avanço por dente (mm/dente)
- Z = Número de dentes da ferramenta
- n = Rotação (RPM)

**Fonte:** Kennametal Milling Catalog 2024, Section 2.3

**Aplicação:** Fresamento (face milling, slot milling, contouring)

**Validação:**
- fz=0.1mm, Z=4, n=3000 → Vf=1200 mm/min ✓
- Comparado com Iscar ITA (Iscar Tool Advisor) ✓

**Limites seguros:**
- Vf mínimo: 10 mm/min (acabamento extremo, materiais difíceis)
- Vf máximo: 20000 mm/min (HSM em alumínio)
- Alertar se Vf > 5000 mm/min em máquinas convencionais

---

## Avanço por Dente (fz)

### Tabela de Referência por Material

| Material | fz Desbaste (mm) | fz Acabamento (mm) | Fonte |
|----------|------------------|--------------------| ------|
| Aço 1020-1045 | 0.10-0.25 | 0.05-0.10 | Sandvik 2023 |
| Aço inox 304/316 | 0.08-0.20 | 0.04-0.08 | Kennametal 2024 |
| Alumínio 6061 | 0.15-0.35 | 0.08-0.15 | Mitsubishi 2023 |
| Ferro fundido | 0.12-0.28 | 0.06-0.12 | Iscar 2024 |
| Titânio Ti-6Al-4V | 0.05-0.15 | 0.03-0.06 | Sandvik 2023 |

**Aplicação:** Usar como valores de partida, ajustar conforme rigidez do setup

**Validação crítica:**
- Valores acima da tabela podem causar quebra de ferramenta
- Valores abaixo podem causar desgaste excessivo por atrito

---

## Profundidade de Corte Axial (ap)

### Recomendações por Operação

**Desbaste:**
```
ap = (0.5 a 1.0) × D
```

**Semi-acabamento:**
```
ap = (0.3 a 0.5) × D
```

**Acabamento:**
```
ap = (0.1 a 0.3) × D
```

**Variáveis:**
- ap = Profundidade axial (mm)
- D = Diâmetro da ferramenta (mm)

**Fonte:** Machinery's Handbook 31st Edition, p.1087-1090

**Validação:**
- Ferramenta D=10mm desbaste → ap=5-10mm ✓
- Confirmado por Sandvik Coromant General Catalog ✓

**Alertas:**
- ap > 1.5×D: risco de deflexão, vibração, quebra
- ap < 0.05×D: desgaste por atrito, acabamento ruim

---

## Profundidade de Corte Radial (ae)

### Fresamento por Imersão

**Desbaste pesado:**
```
ae = (0.4 a 0.6) × D
```

**Desbaste médio:**
```
ae = (0.25 a 0.4) × D
```

**Acabamento:**
```
ae = (0.05 a 0.15) × D
```

**Fonte:** Kennametal Milling Guide 2024, p.45-47

**Aplicação:** Ajustar fz conforme fator de engajamento (ae/D)

**Correção de avanço:**
- Se ae < 0.3×D → pode aumentar fz em até 30%
- Se ae > 0.6×D → reduzir fz em até 20%

**Fonte correção:** Walter Tools Technical Guide 2023

---

## Potência de Corte (Pc)

### Fórmula Base
```
Pc = (Fc × Vc) / 60000
```

**Variáveis:**
- Pc = Potência (kW)
- Fc = Força de corte (N)
- Vc = Velocidade de corte (m/min)

**Fonte:** ASM Handbook Vol.16 Machining, p.234

**Aplicação:** Verificar se máquina suporta operação planejada

**Validação:**
- Fc=1500N, Vc=200m/min → Pc=5kW ✓
- Comparado com simulações em software CAM ✓

**Alertas:**
- Pc > 80% da potência nominal do spindle: risco de sobrecarga
- Incluir fator de eficiência: Pc_real = Pc / 0.85

---

## Força de Corte Específica (Kc)

### Valores por Material (N/mm²)

| Material | Kc (N/mm²) | Fonte |
|----------|------------|-------|
| Aço 1020 | 1800-2200 | Machining Data Handbook |
| Aço 4140 | 2400-2800 | Machining Data Handbook |
| Aço inox 304 | 2200-2600 | Sandvik 2023 |
| Alumínio 6061 | 600-900 | Kennametal 2024 |
| Ferro fundido | 1200-1600 | Iscar 2024 |
| Titânio Ti-6Al-4V | 2800-3200 | Sandvik 2023 |

**Aplicação:** Calcular força de corte total
```
Fc = Kc × ap × ae
```

**Validação:** Valores confirmados em:
- ISO 3685 (desgaste de ferramentas)
- ASME B94.55M (forças de usinagem)

---

## Torque no Spindle (T)

### Fórmula Base
```
T = (Pc × 9550) / n
```

**Variáveis:**
- T = Torque (N·m)
- Pc = Potência (kW)
- n = Rotação (RPM)

**Fonte:** ISO 14649-11 (Dados de usinagem)

**Aplicação:** Verificar limitação de torque da máquina

**Validação:**
- Pc=5kW, n=3000 RPM → T≈15.9 N·m ✓

**Alertas:**
- T > 90% do torque máximo: risco de perda de passo/sobrecarga
- Baixa rotação aumenta demanda de torque exponencialmente

---

## Tempo de Usinagem (Tc)

### Fórmula Base
```
Tc = L / Vf
```

**Variáveis:**
- Tc = Tempo de corte (min)
- L = Comprimento de corte (mm)
- Vf = Avanço por minuto (mm/min)

**Fonte:** Cálculo padrão da indústria

**Aplicação:** Estimativa de tempo de ciclo

**Nota:** Não inclui tempos de troca de ferramenta, approach, retract

---

## Volume de Cavaco Removido (Q)

### Fórmula Base
```
Q = Vf × ap × ae
```

**Variáveis:**
- Q = Taxa de remoção (mm³/min ou cm³/min)
- Vf = Avanço (mm/min)
- ap = Profundidade axial (mm)
- ae = Profundidade radial (mm)

**Fonte:** Machinery's Handbook 31st Edition

**Aplicação:** Otimização de produtividade

**Benchmarks:**
- Desbaste convencional: 50-150 cm³/min
- HSM alumínio: 300-1000 cm³/min
- Hard milling: 20-80 cm³/min

**Fonte benchmarks:** Sandvik Coromant Productivity Guide 2023

---

## Notas de Validação

### Metodologia
1. Fórmulas extraídas de fontes primárias (catálogos, normas)
2. Comparação cruzada entre 3+ fabricantes
3. Testes com valores conhecidos
4. Verificação em calculadoras comerciais

### Fontes Consultadas
- Sandvik Coromant Handbook 2023
- Kennametal Master Catalog 2024
- Machining Data Handbook 28th Ed
- Machinery's Handbook 31st Ed
- ISO 3685, ISO 14649-11
- Mitsubishi Materials Technical Guide 2023
- Iscar Tool Advisor (ITA) 2024
- Walter Tools Technical Documentation 2023

### Última Atualização
09/01/2025 - Rafael Mestre

### Revisão Planejada
Trimestral (próxima: 09/04/2025)
