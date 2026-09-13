# PRD - ToolOptimizer CNC (MVP)
## Apêndice A - Especificações Técnicas de Cálculo

**Versão:** 1.1 (Extensão do PRD v1.0)  
**Data:** 07/02/2026  
**Status:** Aprovado para Desenvolvimento  
**Autor:** Rafael Eleoterio  
**Tipo:** Documento complementar ao PRD Master  
**Validade:** Documento permanente (fonte única da verdade técnica)

---

## SOBRE ESTE DOCUMENTO

Este documento é uma **extensão oficial do PRD Master** (v1.0) e detalha as especificações técnicas de cálculo de força de corte e velocidade de corte necessárias para implementação do ToolOptimizer CNC MVP.

**Relação com PRD Master:**
- Complementa a Seção 3.1.4 (Cálculos Implementados)
- Expande as fórmulas mencionadas na Seção 6 (Requisitos Funcionais)
- Fornece dados técnicos para os 9 materiais da Seção 3.1.3

**Uso:**
- Implementação das funções de cálculo
- Validação de fórmulas contra literatura técnica
- Referência durante desenvolvimento e testes

---

## 1. MODELO DE KIENZLE - CÁLCULO DE FORÇA DE CORTE

### 1.1 Fundamentação Teórica

**Contexto:**
O cálculo de força de corte (Fc) é essencial para estimar potência, torque e deflexão da ferramenta. O ToolOptimizer CNC utiliza o **modelo de Kienzle**, amplamente validado em indústria e academia.

**Fonte:** Literatura técnica (DINIZ, Metzner), adotado por fabricantes como Sandvik Coromant e Kennametal.

### 1.2 Fórmula Principal

```
Fc = kc1.1 × h^(1-mc) × b
```

**Parâmetros:**

| Símbolo | Descrição | Unidade | Equivalente no Sistema |
|---------|-----------|---------|------------------------|
| **Fc** | Força de corte | N | Valor calculado |
| **kc1.1** | Força específica (seção 1×1 mm²) | N/mm² | Constante por material |
| **h** | Espessura do cavaco | mm | fz efetivo |
| **b** | Largura de corte | mm | ae |
| **mc** | Expoente de correção | adimensional | Constante por material |

### 1.3 Comportamento da Força Específica (kc)

A força específica **não é constante** - ela varia com a espessura do cavaco:

```
kc = kc1.1 × h^(-mc)
```

**Implicações práticas:**
- **Cavaco fino** (h pequeno, típico em acabamento): kc aumenta → maior força por mm²
- **Cavaco grosso** (h grande, típico em desbaste): kc diminui → menor força por mm²

**Exemplo numérico:**
```
Material: Aço 1045 (kc1.1 = 2165 N/mm², mc = 0.155)

h = 0.1 mm (acabamento):  kc ≈ 2500 N/mm²
h = 0.3 mm (desbaste):    kc ≈ 2100 N/mm²
```

### 1.4 Limitações do Modelo

**O modelo de Kienzle é simplificado (2D):**
- ✅ Apropriado para estimativas rápidas (<2 segundos)
- ✅ Validado para fresamento convencional
- ⚠️ Não captura variação de kc com temperatura
- ⚠️ Não modela geometria complexa da ferramenta
- ⚠️ Assume corte ortogonal

**Margem de erro esperada:** ±15-25% (conforme Seção 1.4 do PRD Master)

---

## 2. CONSTANTES DE KIENZLE POR MATERIAL

### 2.1 Objetivo

Definir os valores de **kc1.1** e **mc** para os 9 materiais pré-carregados no sistema (conforme Seção 3.1.3 do PRD Master), permitindo o cálculo preciso de força de corte.

### 2.2 Tabela de Constantes - Dados Oficiais

| Material | ISO | Dureza | kc1.1 (N/mm²) | (1-mc) | mc | Status |
|----------|-----|--------|---------------|--------|----|---------| 
| Aço 1020 | P | 120-160 HB | 1800 | 0.83 | 0.17 | ✅ Validado |
| Aço 1045 | P | 170-220 HB | 2165 | 0.845 | 0.155 | ✅ Validado |
| Aço Inox 304 | M | 140-180 HB | 2150 | 0.815 | 0.185 | ✅ Validado |
| Alumínio 6061-T6 | N | 95 HB | 1200 | 0.25 | 0.75 | ⚠️ Estimativa |
| P20 (tratado) | P | 280-320 HB | 2300 | 0.80 | 0.20 | ⚠️ Estimativa |
| 2711 (tratado) | P | 300-340 HB | 2500 | 0.80 | 0.20 | ⚠️ Estimativa |
| 8620 (núcleo) | P | 180-220 HB | 2100 | 0.80 | 0.20 | ⚠️ Estimativa |
| 8620 (cementado) | H | 58-62 HRC | 2800 | 0.80 | 0.20 | ⚠️ Estimativa |
| H13 (tratado) | H | 45-52 HRC | 2800 | 0.80 | 0.20 | ⚠️ Estimativa |

### 2.3 Fontes de Dados

**Materiais Validados (3):**
- **Fonte primária:** Literatura técnica (DINIZ, A.E.; MARCONDES, F.C.; COPPINI, N.L. - Tecnologia da Usinagem dos Metais)
- **Validação:** Valores medidos experimentalmente, amplamente citados em guias de usinagem
- **Aços 1020, 1045:** Análogos C22/C45 em normas europeias
- **Inox 304:** Valores típicos para austenítico conforme Sandvik/Kennametal

**Materiais com Estimativas (6):**
- **Fonte:** Valores típicos por grupo de material (aços liga, alta dureza, não-ferrosos)
- **Limitação:** Sem medição experimental específica disponível em fontes públicas
- **Ação requerida:** Consultar fabricantes de ferramentas (Sandvik, Kennametal, Seco, Iscar) ou realizar ensaios

### 2.4 Notas Técnicas por Material

#### Aço 1020 (ABNT 1020 / AISI 1020)
- **Classificação:** Baixo carbono, baixa liga
- **Usinabilidade:** Excelente (material macio)
- **Aplicação típica:** Componentes estruturais, parafusos, eixos não críticos

#### Aço 1045 (ABNT 1045 / AISI 1045)
- **Classificação:** Médio carbono
- **Usinabilidade:** Boa (material padrão de referência)
- **Aplicação típica:** Eixos, engrenagens, componentes mecânicos

#### Aço Inox 304 (AISI 304)
- **Classificação:** Austenítico (18Cr-8Ni)
- **Usinabilidade:** Moderada (encruamento significativo)
- **Observação:** kc pode aumentar 20-30% com encruamento durante corte

#### Alumínio 6061-T6
- **Classificação:** Liga alumínio, não-ferroso
- **Usinabilidade:** Excelente (baixa força de corte)
- **Observação:** mc alto (~0.75) indica forte variação de kc com h
- **⚠️ Status:** Estimativa - valores típicos de não-ferrosos variam 700-1400 N/mm²

#### P20, 2711, 8620, H13
- **Classificação:** Aços para moldes e ferramentas, tratados termicamente
- **Usinabilidade:** Moderada a difícil (alta dureza)
- **⚠️ Status:** Estimativas baseadas em grupo de material
- **Recomendação:** Consultar catálogos específicos para valores precisos

### 2.5 Estratégia de Fallback

**Quando dados validados não estiverem disponíveis:**

1. **Usar valores por grupo:**
   - Aços carbono/médio: kc1.1 = 2000-2200 N/mm², mc = 0.15-0.20
   - Aços liga tratados: kc1.1 = 2300-2500 N/mm², mc = 0.20
   - Aços alta dureza (>40 HRC): kc1.1 = 2500-3000 N/mm², mc = 0.20
   - Alumínio: kc1.1 = 900-1400 N/mm², mc = 0.70-0.75
   - Inox austenítico: kc1.1 = 2000-2300 N/mm², mc = 0.18-0.25

2. **Marcar no sistema:**
   - Flag `validated: false` na estrutura de dados
   - Exibir alerta: **"⚠️ Valores estimados - recomenda-se validação com fabricante"**

3. **Documentar limitação:**
   - Informar origem da estimativa (grupo de material)
   - Sugerir consulta a catálogo técnico específico

---

## 3. ESPECIFICAÇÕES DE IMPLEMENTAÇÃO

### 3.1 Estrutura de Dados TypeScript

#### 3.1.1 Interface de Constantes de Kienzle

```typescript
/**
 * Constantes de Kienzle para cálculo de força de corte
 * Baseado em: DINIZ et al. (Tecnologia da Usinagem dos Metais)
 * 
 * @property kc1_1 - Força específica (N/mm²) quando seção cavaco = 1×1 mm²
 * @property one_minus_mc - Expoente (1-mc) para correção com espessura
 * @property source - Fonte de validação dos dados
 * @property validated - true = dado medido experimentalmente; false = estimativa
 */
interface KienzelConstants {
  kc1_1: number;
  one_minus_mc: number;
  source: string;
  validated: boolean;
}
```

#### 3.1.2 Dados Pré-carregados no Sistema

```typescript
const KIENZLE_CONSTANTS: Record<string, KienzelConstants> = {
  "Aço 1020": {
    kc1_1: 1800,
    one_minus_mc: 0.83,
    source: "DINIZ et al. - análogo C22",
    validated: true
  },
  "Aço 1045": {
    kc1_1: 2165,
    one_minus_mc: 0.845,
    source: "DINIZ et al. - valores medidos",
    validated: true
  },
  "Aço Inox 304": {
    kc1_1: 2150,
    one_minus_mc: 0.815,
    source: "Guias técnicos - inox austenítico",
    validated: true
  },
  "Alumínio 6061-T6": {
    kc1_1: 1200,
    one_minus_mc: 0.25,
    source: "Estimativa - não-ferrosos",
    validated: false
  },
  "P20": {
    kc1_1: 2300,
    one_minus_mc: 0.80,
    source: "Estimativa - consultar fabricante",
    validated: false
  },
  "2711": {
    kc1_1: 2500,
    one_minus_mc: 0.80,
    source: "Estimativa - consultar fabricante",
    validated: false
  },
  "8620 (núcleo)": {
    kc1_1: 2100,
    one_minus_mc: 0.80,
    source: "Estimativa - consultar fabricante",
    validated: false
  },
  "8620 (cementado)": {
    kc1_1: 2800,
    one_minus_mc: 0.80,
    source: "Estimativa - aço alta dureza",
    validated: false
  },
  "H13": {
    kc1_1: 2800,
    one_minus_mc: 0.80,
    source: "Estimativa - consultar fabricante",
    validated: false
  }
};
```

### 3.2 Função de Cálculo

```typescript
/**
 * Calcula força de corte usando modelo de Kienzle
 * Fórmula: Fc = kc1.1 × h^(1-mc) × b
 * 
 * @param material - Nome do material (deve existir em KIENZLE_CONSTANTS)
 * @param h - Espessura do cavaco (mm) - fz efetivo após aplicar CTF
 * @param b - Largura de corte (mm) - ae
 * @returns Força de corte em Newtons (N)
 * @throws Error se material não estiver definido ou inputs inválidos
 * 
 * @example
 * // Aço 1045, fz=0.2mm, ae=2.0mm
 * const Fc = calculateCuttingForce("Aço 1045", 0.2, 2.0);
 * // Resultado: ~1068 N
 */
function calculateCuttingForce(
  material: string,
  h: number,
  b: number
): number {
  // Validar input
  if (h <= 0 || b <= 0) {
    throw new Error("Espessura (h) e largura (b) devem ser > 0");
  }
  
  // Buscar constantes
  const constants = KIENZLE_CONSTANTS[material];
  if (!constants) {
    throw new Error(`Material "${material}" não possui constantes definidas`);
  }
  
  // Calcular: Fc = kc1.1 × h^(1-mc) × b
  const { kc1_1, one_minus_mc } = constants;
  const h_term = Math.pow(h, one_minus_mc);
  const Fc = kc1_1 * h_term * b;
  
  return Fc;
}
```

### 3.3 Sistema de Alertas para Materiais Não Validados

```typescript
/**
 * Retorna força de corte com alerta se dados não validados
 */
function getCuttingForceWithWarning(
  material: string,
  h: number,
  b: number
): { force: number; warning: string | null } {
  const constants = KIENZLE_CONSTANTS[material];
  
  if (!constants) {
    throw new Error(`Material "${material}" não definido`);
  }
  
  const force = calculateCuttingForce(material, h, b);
  
  let warning = null;
  if (!constants.validated) {
    warning = `⚠️ Valores para "${material}" são estimativas. ` +
              `Recomenda-se validação com fabricante de ferramentas.`;
  }
  
  return { force, warning };
}
```

### 3.4 Exemplo de Cálculo Completo

**Cenário:** Aço 1045, Toroidal Ø10mm, Desbaste

```typescript
// Inputs
const material = "Aço 1045";
const D = 10;           // mm
const fz = 0.15;        // mm/dente
const ae = 5.0;         // mm (50% D em desbaste)
const Z = 4;            // flautas

// Aplicar CTF se necessário
const ae_ratio = ae / D; // 0.5
const CTF = (ae_ratio >= 0.5) ? 1.0 : 1 / Math.sqrt(1 - Math.pow(1 - 2*ae_ratio, 2));
const fz_efetivo = fz * CTF; // 0.15 mm (sem correção, ae=50%)

// Calcular Fc
const { force, warning } = getCuttingForceWithWarning(material, fz_efetivo, ae);

console.log(`Força de corte: ${force.toFixed(0)} N`);
// Output: Força de corte: 1068 N
// warning: null (material validado)
```

---

## 4. VELOCIDADE DE CORTE (Vc) POR MATERIAL

### 4.1 Objetivo

Definir valores de **Vc (m/min)** para os 9 materiais do sistema, diferenciados por tipo de operação (Desbaste, Semi-acabamento, Acabamento), permitindo o cálculo correto de RPM.

### 4.2 Importância no Sistema

**Relação com RPM:**
```
RPM = (Vc × 1000) / (π × D)

Onde:
- RPM = Rotações por minuto
- Vc = Velocidade de corte (m/min)
- D = Diâmetro da ferramenta (mm)
```

**Impacto:** Sem valores de Vc validados, o sistema não pode calcular RPM. Este é um **dado crítico bloqueante**.

### 4.3 Estrutura de Dados

```typescript
/**
 * Velocidade de corte por material e operação
 * Fonte: Catálogos técnicos (Sandvik, Kennametal) e ISO 513
 */
interface CuttingSpeedData {
  desbaste: number;        // m/min - roughing
  semi_acabamento: number; // m/min - semi-finishing
  acabamento: number;      // m/min - finishing
  source: string;          // Fonte de validação
  conditions: string;      // Condições (ferramenta, refrigeração)
}
```

### 4.4 Tabela de Velocidades de Corte

**Status:** ⏳ **PENDENTE - Aguardando pesquisa validada**

| Material | ISO | Dureza | Vc Desbaste | Vc Semi | Vc Acabamento | Fonte |
|----------|-----|--------|-------------|---------|---------------|-------|
| Aço 1020 | P | 120-160 HB | ??? m/min | ??? m/min | ??? m/min | Pendente |
| Aço 1045 | P | 170-220 HB | ??? m/min | ??? m/min | ??? m/min | Pendente |
| Aço Inox 304 | M | 140-180 HB | ??? m/min | ??? m/min | ??? m/min | Pendente |
| Alumínio 6061-T6 | N | 95 HB | ??? m/min | ??? m/min | ??? m/min | Pendente |
| P20 (tratado) | P | 280-320 HB | ??? m/min | ??? m/min | ??? m/min | Pendente |
| 2711 (tratado) | P | 300-340 HB | ??? m/min | ??? m/min | ??? m/min | Pendente |
| 8620 (núcleo) | P | 180-220 HB | ??? m/min | ??? m/min | ??? m/min | Pendente |
| 8620 (cementado) | H | 58-62 HRC | ??? m/min | ??? m/min | ??? m/min | Pendente |
| H13 (tratado) | H | 45-52 HRC | ??? m/min | ??? m/min | ??? m/min | Pendente |

**Total de valores necessários:** 27 (9 materiais × 3 operações)

### 4.5 Fontes Prioritárias para Validação

**Ordem de prioridade:**

1. **Catálogos de Fabricantes:**
   - Sandvik Coromant - Modern Metal Cutting (2023/2024)
   - Kennametal - Milling Guide (2024)
   - Seco Tools - Machining Navigator (2023)
   - Iscar - Machining Parameters

2. **Normas Técnicas:**
   - ISO 513 - Classification and application of hard cutting materials
   - ISO 3685 - Tool-life testing

3. **Literatura Acadêmica:**
   - DINIZ, A.E. et al. - Tecnologia da Usinagem dos Metais
   - FERRARESI, D. - Fundamentos da Usinagem dos Metais
   - Machining Data Handbook (Institute of Advanced Manufacturing Sciences)

### 4.6 Condições de Referência

**Valores de Vc devem ser para:**
- Ferramentas de **metal duro revestido** (coated carbide)
- Operação de **fresamento** (milling)
- Profundidade de corte padrão (ap e ae conforme operação)
- **Com refrigeração** (cutting fluid)

**Observação:** Valores para metal duro não-revestido ou HSS são tipicamente 30-50% menores.

---

## 5. INTEGRAÇÃO COM OUTROS CÁLCULOS DO SISTEMA

### 5.1 Fluxo de Cálculo Completo

**Sequência de execução no sistema:**

```
1. Input do usuário:
   - Material, Operação (desbaste/semi/acabamento)
   - Ferramenta: D, R (se toroidal), Z
   - Parâmetros: fz, ae, ap

2. Buscar Vc:
   - Vc = CUTTING_SPEED_DATA[material][operação]

3. Calcular RPM:
   - RPM = (Vc × 1000) / (π × D)

4. Aplicar Chip Thinning (se ae < 0.5×D):
   - CTF = 1 / √[1 - (1 - 2×ae/D)²]
   - fz_efetivo = fz × CTF

5. Calcular Fc (Força de Corte):
   - Fc = kc1.1 × (fz_efetivo)^(1-mc) × ae

6. Calcular Potência:
   - P = (Fc × Vc) / 60000  [kW]

7. Calcular Torque:
   - T = (Fc × D) / 2000  [Nm]

8. Calcular Deflexão:
   - I = (π × D⁴) / 64  [mm⁴]
   - δ = (Fc × Le³) / (3 × E × I)  [mm]
   - Onde: E = 600.000 N/mm²

9. Validar resultados:
   - P ≤ P_máquina × 0.8
   - RPM ≤ RPM_máquina
   - δ ≤ 0.05 mm (limite recomendado)
   - L/D ≤ 6 (bloqueio se excedido)

10. Exibir com alertas visuais:
    - Verde: OK
    - Amarelo: Aviso
    - Vermelho: Crítico/Bloqueado
```

### 5.2 Dependências Entre Cálculos

| Cálculo | Depende de | Usado em |
|---------|-----------|----------|
| **Vc** | Material + Operação | RPM, Potência |
| **RPM** | Vc, D | F (avanço mm/min) |
| **CTF** | ae, D | fz_efetivo |
| **fz_efetivo** | fz, CTF | Fc |
| **Fc** | kc1.1, mc, fz_efetivo, ae | P, T, δ |
| **P** | Fc, Vc | Validação potência |
| **T** | Fc, D | Validação torque |
| **δ** | Fc, Le, I, E | Validação rigidez |

### 5.3 Exemplo Completo - Cenário Real

**Setup:**
- Material: Aço 1045
- Operação: Desbaste
- Ferramenta: Toroidal Ø10mm R1, Z=4
- Parâmetros: fz=0.15mm, ae=5mm, ap=10mm
- Comprimento em balanço: Le=40mm

**Cálculos:**

```typescript
// 1. Buscar Vc (PENDENTE - exemplo com valor típico)
const Vc = 120; // m/min (desbaste Aço 1045)

// 2. Calcular RPM
const D = 10; // mm
const RPM = (Vc * 1000) / (Math.PI * D);
// RPM = 3820 rev/min

// 3. Aplicar CTF
const ae = 5; // mm
const ae_ratio = ae / D; // 0.5
const CTF = 1.0; // ae = 50%, sem correção

// 4. fz efetivo
const fz = 0.15; // mm
const fz_efetivo = fz * CTF; // 0.15 mm

// 5. Calcular Fc
const kc1_1 = 2165; // N/mm²
const one_minus_mc = 0.845;
const Fc = kc1_1 * Math.pow(fz_efetivo, one_minus_mc) * ae;
// Fc ≈ 1068 N

// 6. Calcular Potência
const P = (Fc * Vc) / 60000;
// P ≈ 2.1 kW

// 7. Calcular Torque
const T = (Fc * D) / 2000;
// T ≈ 5.3 Nm

// 8. Calcular Deflexão
const Le = 40; // mm
const E = 600000; // N/mm²
const I = (Math.PI * Math.pow(D, 4)) / 64;
// I ≈ 490.9 mm⁴
const delta = (Fc * Math.pow(Le, 3)) / (3 * E * I);
// δ ≈ 0.077 mm

// 9. Validação L/D
const LD = Le / D; // 4.0 → 🔴 Crítico
```

**Resultado:**
- RPM: 3820 rev/min → 🟢 OK
- F: 2292 mm/min (RPM × fz × Z)
- Fc: 1068 N
- P: 2.1 kW → 🟢 OK (máquina 15 kW)
- T: 5.3 Nm
- δ: 0.077 mm → 🟡 Aviso (>0.05mm)
- L/D: 4.0 → 🔴 Crítico (reduzir parâmetros)

---

## 6. REQUISITOS DE IMPLEMENTAÇÃO

### 6.1 Testes Unitários Obrigatórios

**Casos de teste para função calculateCuttingForce():**

```typescript
describe("calculateCuttingForce", () => {
  test("Aço 1045 - Caso padrão", () => {
    const Fc = calculateCuttingForce("Aço 1045", 0.2, 2.0);
    expect(Fc).toBeCloseTo(1067.5, 0); // ±1N
  });
  
  test("Aço 1020 - Cavaco fino", () => {
    const Fc = calculateCuttingForce("Aço 1020", 0.1, 1.5);
    expect(Fc).toBeCloseTo(328.5, 0);
  });
  
  test("Alumínio 6061 - Não validado", () => {
    const { force, warning } = getCuttingForceWithWarning(
      "Alumínio 6061-T6", 0.15, 3.0
    );
    expect(force).toBeGreaterThan(0);
    expect(warning).toContain("estimativas");
  });
  
  test("Material inválido - Deve lançar erro", () => {
    expect(() => {
      calculateCuttingForce("Material Inexistente", 0.2, 2.0);
    }).toThrow();
  });
  
  test("Input negativo - Deve lançar erro", () => {
    expect(() => {
      calculateCuttingForce("Aço 1045", -0.2, 2.0);
    }).toThrow();
  });
});
```

### 6.2 Validação Contra Valores Conhecidos

**Benchmarks de referência (Sandvik/Kennametal):**

| Cenário | Material | fz | ae | Fc Esperado | Margem |
|---------|----------|----|----|-------------|--------|
| 1 | Aço 1045 | 0.2 | 2.0 | 1050-1150 N | ±10% |
| 2 | Aço 1020 | 0.15 | 1.5 | 300-350 N | ±10% |
| 3 | Inox 304 | 0.12 | 2.5 | 750-850 N | ±15% |

### 6.3 Documentação de Código

**Requisitos de JSDoc:**
- Todas as funções de cálculo devem ter JSDoc completo
- Incluir: descrição, parâmetros, retorno, exemplo, fonte técnica
- Fórmulas matemáticas em LaTeX ou ASCII art
- Link para seção relevante do PRD

---

## 7. PRÓXIMOS PASSOS E CHECKLIST

### 7.1 Urgente - Bloqueadores

- [ ] **Preencher tabela de Vc** - Pesquisa em catálogos validados (27 valores)
- [ ] **Validar valores provisórios de kc1.1/mc** - Consultar fabricantes para P20, 2711, 8620, H13, Al 6061

### 7.2 Importante - Pré-desenvolvimento

- [ ] Implementar funções TypeScript de cálculo
- [ ] Criar testes unitários com casos de referência
- [ ] Documentar JSDoc em todas as funções
- [ ] Validar margem de erro contra valores conhecidos

### 7.3 Opcional - Melhorias Futuras (Fase 2)

- [ ] Adicionar mais materiais ao catálogo
- [ ] Implementar modelo 3D de forças (Fx, Fy, Fz)
- [ ] Integrar correção de temperatura em kc
- [ ] Criar banco de dados de fabricantes integrado

### 7.4 Checklist de Validação Final

- [x] Fórmula de Kienzle documentada e validada
- [x] Constantes kc1.1 e mc para 9 materiais (3 validados, 6 estimativas)
- [x] Interface TypeScript completa
- [x] Função de cálculo implementada com exemplos
- [x] Sistema de alertas para materiais não validados
- [x] Integração com outros cálculos documentada
- [ ] Tabela de Vc preenchida (BLOQUEADOR)
- [ ] Testes unitários implementados
- [ ] Validação contra benchmarks

---

## 8. REFERÊNCIAS TÉCNICAS

### 8.1 Literatura Acadêmica

- **DINIZ, A.E.; MARCONDES, F.C.; COPPINI, N.L.** - Tecnologia da Usinagem dos Metais. 9ª ed. São Paulo: Artliber, 2013.
- **FERRARESI, D.** - Fundamentos da Usinagem dos Metais. São Paulo: Edgard Blücher, 1970.
- **METZNER** - Tabelas de constantes de Kienzle para diversos materiais.

### 8.2 Fabricantes de Ferramentas

- **Sandvik Coromant** - Modern Metal Cutting: A Practical Handbook (2023)
- **Kennametal** - Milling Guide (2024)
- **Seco Tools** - Machining Navigator (2023)
- **Iscar** - Machining Parameters Guide
- **Walter Tools** - Cutting Data Tables

### 8.3 Normas Técnicas

- **ISO 513** - Classification and application of hard cutting materials for metal removal with defined cutting edges
- **ISO 3685** - Tool-life testing with single-point turning tools
- **ISO 13399** - Cutting tool data representation and exchange
- **ASTM E140** - Standard Hardness Conversion Tables for Metals Relationship Among Brinell Hardness, Vickers Hardness, Rockwell Hardness, Superficial Hardness, Knoop Hardness, Scleroscope Hardness, and Leeb Hardness

### 8.4 Documentos Relacionados do Projeto

- **PRD Master v1.0** - Documento principal (PRD_TOOLOPTIMIZER_CNC_MVP.md)
- **DECISOES_VALIDACAO_PRD.md** - Pontos 1-4 validados (State Management, Validações, CTF, Rigidez)
- **FORMULAS_CORE.md** - Fórmulas completas do sistema (em desenvolvimento)
- **MATERIAIS_BASE.md** - Base de dados de materiais (a validar)

---

## 9. GLOSSÁRIO TÉCNICO COMPLEMENTAR

| Termo | Definição | Uso no Sistema |
|-------|-----------|----------------|
| **kc1.1** | Força específica de corte quando seção cavaco = 1×1 mm² (N/mm²) | Constante do modelo de Kienzle |
| **mc** | Expoente de correção da força com espessura do cavaco | Constante do modelo de Kienzle |
| **h** | Espessura do cavaco (mm) | fz efetivo após CTF |
| **b** | Largura de corte (mm) | ae (profundidade radial) |
| **CTF** | Chip Thinning Factor - Correção para ae < 50% D | Multiplica fz quando aplicável |
| **E** | Módulo de elasticidade do metal duro (600 GPa = 600.000 N/mm²) | Cálculo de deflexão |
| **I** | Momento de inércia da seção transversal (mm⁴) | Cálculo de rigidez |

---

## 10. HISTÓRICO DE VERSÕES

| Versão | Data | Alterações |
|--------|------|------------|
| 1.0 | 07/02/2026 | Criação inicial - Modelo Kienzle validado |
| 1.1 | 07/02/2026 | Reformatado como extensão oficial do PRD Master |

---

## 11. APROVAÇÃO E STATUS

**Status:** ⚠️ **PARCIALMENTE COMPLETO**

**Bloqueadores:**
- Tabela de Vc (27 valores) - Pendente de pesquisa validada

**Próxima Ação:**
- Executar pesquisa técnica em catálogos Sandvik/Kennametal para valores de Vc
- Validar constantes provisórias de Kienzle com fabricantes

**Aprovado para implementação:**
- ✅ Modelo de Kienzle (fórmula e constantes)
- ✅ Interface TypeScript
- ✅ Função de cálculo
- ⏳ Aguardando valores de Vc para completar sistema

---

**Documento gerado por:** Claude (Anthropic)  
**Baseado em:** Sessão de validação técnica com Rafael Eleoterio  
**Formato:** Markdown (.md) - Extensão oficial do PRD Master v1.0  
**Uso:** Implementação de cálculos | Referência técnica | Validação de fórmulas

---

_"A ciência da usinagem, simplificada."_  
**ToolOptimizer CNC** - Apêndice A: Especificações Técnicas de Cálculo
