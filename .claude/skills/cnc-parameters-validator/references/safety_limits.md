# Limites de Segurança CNC - Referência Técnica

## Limites por Tipo de Máquina

### Máquinas CNC Convencionais (Centro de Usinagem Vertical/Horizontal)

**RPM:**
- Mínimo: 100 RPM
- Máximo típico: 8000-12000 RPM
- Máximo estendido: 15000 RPM (com spindle especial)

**Potência:**
- Range típico: 7.5-15 kW
- Limite operacional seguro: 80% da nominal
- Pico momentâneo: 90% da nominal (máx 30 segundos)

**Torque:**
- Crítico em baixas rotações (< 1000 RPM)
- Limite operacional: 85% do torque máximo
- Atenção: curva de torque varia com RPM

**Avanço (Vf):**
- Mínimo: 1 mm/min (operações especiais)
- Típico desbaste: 500-2000 mm/min
- Máximo convencional: 5000 mm/min
- HSM: até 20000 mm/min (máquinas preparadas)

**Fonte:** Haas Automation Technical Specifications | DMG MORI Operating Manuals

---

### Máquinas CNC High-Speed Machining (HSM)

**RPM:**
- Mínimo: 1000 RPM
- Típico: 20000-30000 RPM
- Máximo: 60000 RPM (spindles especiais)

**Potência:**
- Range: 15-40 kW
- Operação contínua: 75% da nominal

**Avanço (Vf):**
- Típico: 5000-15000 mm/min
- Máximo: 30000 mm/min

**Aceleração:**
- Crítico: 1-2 g (máquinas HSM)
- Movimentos bruscos causam imprecisão

**Fonte:** Mikron HSM Series Specs | Hermle C-Series Technical Data

---

### Tornos CNC

**RPM:**
- Mínimo: 50 RPM
- Máximo: 4000-6000 RPM (peças pequenas)
- Limite por diâmetro: considerar força centrífuga

**Força centrífuga segura:**
```
n_max = 30000 / √D
```
D = diâmetro da peça (mm)

**Exemplo:**
- D=100mm → n_max ≈ 3000 RPM
- D=200mm → n_max ≈ 2121 RPM

**Fonte:** ISO 13041-1 (Tornos CNC - Segurança) | Mazak Technical Manual

---

## Limites por Material

### Aço Carbono (1020-1045)

**Velocidade de corte (Vc):**
- Desbaste: 80-150 m/min
- Acabamento: 120-200 m/min
- Crítico: > 250 m/min (desgaste acelerado)

**Avanço por dente (fz):**
- Desbaste: 0.10-0.25 mm/dente
- Acabamento: 0.05-0.10 mm/dente
- NUNCA: > 0.35 mm/dente (risco de quebra)

**Profundidade (ap):**
- Máximo seguro: 1.5×D (com rigidez adequada)
- Alertar: > 1.0×D (verificar deflexão)

**Fonte:** Sandvik Coromant Steel Milling Guide

---

### Aço Inoxidável (304/316)

**Velocidade de corte (Vc):**
- Desbaste: 50-100 m/min
- Acabamento: 80-150 m/min
- Crítico: > 180 m/min (encruamento, desgaste)

**Avanço por dente (fz):**
- Desbaste: 0.08-0.20 mm/dente
- Acabamento: 0.04-0.08 mm/dente
- NUNCA: < 0.03 mm/dente (encruamento por atrito)

**Atenção especial:**
- Material encruante: manter fz constante
- Evitar paradas no meio do corte
- Refrigeração abundante obrigatória

**Fonte:** Kennametal Stainless Steel Machining Guide

---

### Alumínio (6061-T6)

**Velocidade de corte (Vc):**
- Desbaste: 300-600 m/min
- Acabamento: 500-1200 m/min
- HSM: até 1500 m/min

**Avanço por dente (fz):**
- Desbaste: 0.15-0.35 mm/dente
- Acabamento: 0.08-0.15 mm/dente
- Máximo: 0.50 mm/dente (com setup rígido)

**Atenção:**
- Material "pegajoso" - usar ferramentas polidas
- Ar comprimido > refrigeração líquida (cavaco longo)
- Alertar se Vc < 200 m/min (acabamento ruim)

**Fonte:** Mitsubishi Materials Aluminum Machining Guide

---

### Titânio (Ti-6Al-4V)

**Velocidade de corte (Vc):**
- Desbaste: 40-70 m/min
- Acabamento: 60-100 m/min
- Crítico: > 120 m/min (reação química, fogo)

**Avanço por dente (fz):**
- Desbaste: 0.05-0.15 mm/dente
- Acabamento: 0.03-0.06 mm/dente
- NUNCA: < 0.02 mm/dente (desgaste por fricção)

**Alertas críticos de segurança:**
- Material inflamável em alta Vc
- Exige refrigeração abundante (>20 L/min)
- Nunca cortar a seco
- Cavacos podem incendiar - coletor especial

**Fonte:** Sandvik Coromant Titanium Machining Handbook | OSHA Titanium Safety Guidelines

---

### Ferro Fundido

**Velocidade de corte (Vc):**
- Desbaste: 100-180 m/min
- Acabamento: 150-250 m/min

**Avanço por dente (fz):**
- Desbaste: 0.12-0.28 mm/dente
- Acabamento: 0.06-0.12 mm/dente

**Atenção:**
- Corte a seco preferível (cavacos quebradiços)
- Se usar refrigeração: abundante (evitar choque térmico)
- Pó abrasivo - proteção de guias/fusos

**Fonte:** Iscar Cast Iron Machining Guide

---

## Limites de Ferramentas

### Metal Duro (Carbide)

**Temperatura máxima:**
- 800-1000°C (depende da composição)
- Alertar se calc. Tc (temp de corte) > 700°C

**Velocidade periférica:**
- Máximo seguro: 500 m/min (standard)
- HSM grades: até 1000 m/min

**Desgaste aceitável:**
- VB (desgaste de flanco): 0.3 mm (geral)
- VB: 0.2 mm (acabamento fino)
- Trocar antes de VB = 0.4 mm (risco de quebra catastrófica)

**Fonte:** ISO 3685 (Desgaste de ferramentas)

---

### HSS (High Speed Steel)

**Temperatura máxima:**
- 600°C (perde dureza)
- Não usar em Vc > 100 m/min (aços)

**Aplicação moderna:**
- Limitado a rosqueamento, mandrilamento
- Obsoleto para fresamento produtivo

---

### Cerâmica / CBN / PCD

**Temperatura operacional:**
- CBN: até 1200°C
- Cerâmica: até 1400°C
- PCD: máx 600°C (limitação do ligante)

**Aplicação:**
- Hard milling (HRC > 45)
- Usinagem de ferro fundido (PCD)
- Usinagem de alumínio-silício (PCD)

**Atenção:**
- Exigem máquinas muito rígidas
- Sensíveis a impactos/vibrações
- Custo alto - justificar uso

**Fonte:** Sandvik Coromant Superhard Materials Guide

---

## Alertas Automáticos - Quando Ativar

### ALERTA CRÍTICO (vermelho) - Bloquear cálculo

1. **RPM > limite físico da máquina**
   - Convencional: > 12000 RPM
   - HSM: > 40000 RPM

2. **Potência calculada > 95% da nominal**
   - Risco de desarme/sobrecarga imediato

3. **Temperatura de corte > 1000°C**
   - Risco de fogo (especialmente titânio)

4. **Força de corte > capacidade estrutural**
   - Fc > 10000N (máquinas convencionais)

5. **Parâmetros fora de qualquer faixa conhecida**
   - Vc < 5 m/min ou > 2000 m/min
   - fz < 0.01 mm ou > 0.6 mm

### ALERTA IMPORTANTE (amarelo) - Avisar usuário

1. **Potência 80-95% da nominal**
   - "Operação próxima ao limite - monitorar temperatura"

2. **RPM > 8000 em máquina convencional**
   - "Verificar se spindle suporta esta rotação"

3. **Avanço por dente fora do ideal**
   - fz muito baixo: "Risco de desgaste por atrito"
   - fz muito alto: "Risco de quebra de ferramenta"

4. **Profundidade > 1.0×D**
   - "Verificar rigidez do setup - risco de deflexão"

5. **Material especial (titânio, inconel)**
   - "Material difícil - seguir parâmetros rigorosamente"

### SUGESTÃO (azul) - Otimização

1. **Parâmetros muito conservadores**
   - "Possível aumentar Vc em 20% para melhor produtividade"

2. **Combinação não otimizada**
   - "Para este material, considere fz maior e ap menor"

3. **Tempo de ciclo alto**
   - "Q baixo - considere estratégia de corte diferente"

---

## Validação Cruzada

### Quando Desconfiar dos Cálculos

1. **Potência calculada muito baixa (< 1 kW) para desbaste**
   - Revisar ap, ae, Kc

2. **RPM muito baixo (< 500) para ferramenta pequena (D < 12mm)**
   - Revisar Vc - pode estar muito conservador

3. **Tempo de ciclo irrealista (muito rápido ou lento)**
   - Verificar unidades de medida
   - Confirmar Vf calculado

4. **Força de corte desproporcional**
   - Revisar Kc do material
   - Confirmar ap × ae

### Sanity Checks Automáticos

```javascript
// Exemplo de validação cruzada
if (Pc < 0.5 && (ap > 5 || ae > 5)) {
  alertar("Potência muito baixa para profundidades altas - revisar cálculo");
}

if (n < 300 && D < 10) {
  alertar("RPM muito baixo para ferramenta pequena - verificar Vc");
}

if (Vf > 5000 && tipoMaquina === "convencional") {
  alertar("Avanço muito alto para máquina convencional");
}
```

---

## Fontes de Referência

### Normas Internacionais
- ISO 3685: Tool-life testing with single-point turning tools
- ISO 13041-1: CNC turning machines - Safety requirements
- ISO 14649-11: Machining data
- ANSI B11.19: Performance Requirements for Machining Centers
- OSHA Titanium Safety Guidelines

### Fabricantes de Ferramentas
- Sandvik Coromant Technical Guide 2023
- Kennametal Master Catalog 2024
- Iscar Tool Advisor Database 2024
- Mitsubishi Materials Handbook 2023
- Walter Tools Technical Documentation 2023

### Handbooks
- Machining Data Handbook, 28th Edition
- Machinery's Handbook, 31st Edition
- ASM Handbook Vol.16 - Machining

### Fabricantes de Máquinas
- Haas Automation Technical Specifications
- DMG MORI Operating Manuals
- Mazak Technical Documentation
- Hermle HSM Technical Data
- Mikron HSM Series Specifications

---

**Última Atualização:** 09/01/2025 - Rafael Mestre
**Revisão:** Trimestral
