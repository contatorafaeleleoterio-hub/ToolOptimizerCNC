# Padrões de Código TypeScript - ToolOptimizer

Padrões obrigatórios para garantir qualidade production-ready.

## Estrutura de Arquivos

```
src/
├── lib/
│   ├── calculations/      # Cálculos CNC puros
│   │   ├── rpm.ts
│   │   ├── feed.ts
│   │   ├── depth.ts
│   │   ├── force.ts
│   │   └── power.ts
│   ├── validation/        # Validação de inputs
│   │   ├── parameters.ts
│   │   ├── materials.ts
│   │   └── tools.ts
│   └── utils/            # Funções auxiliares
│       ├── converters.ts
│       └── formatters.ts
├── types/
│   ├── calculations.ts
│   ├── materials.ts
│   └── tools.ts
├── data/
│   ├── materials.json
│   └── tools.json
└── components/           # UI (React)
    ├── calculators/
    └── inputs/
```

## Template de Função de Cálculo

```typescript
/**
 * Calcula [NOME DO CÁLCULO]
 * 
 * FÓRMULA: [equação]
 * FONTE: [fabricante/norma com página]
 * UNIDADES: [input1(unidade), input2(unidade) → output(unidade)]
 * APLICÁVEL: [condições de uso]
 * 
 * @param param1 - Descrição (unidade)
 * @param param2 - Descrição (unidade)
 * @returns Resultado com unidade e status
 * 
 * @example
 * ```ts
 * const resultado = calcularRPM(50, 200);
 * // { valor: 1273, unidade: 'RPM', status: 'ok' }
 * ```
 * 
 * VALIDADO: YYYY-MM-DD
 * REVISÃO: YYYY-MM-DD
 */
export function calcularNomeDescritivo(
  parametro1: number,
  parametro2: number
): ResultadoCalculo {
  // 1. VALIDAÇÃO DE ENTRADA
  if (parametro1 <= 0) {
    return {
      valor: 0,
      unidade: 'unidade',
      status: 'erro',
      mensagem: 'Parâmetro 1 deve ser positivo'
    };
  }
  
  if (parametro2 <= 0) {
    return {
      valor: 0,
      unidade: 'unidade',
      status: 'erro',
      mensagem: 'Parâmetro 2 deve ser positivo'
    };
  }
  
  // 2. CÁLCULO
  // Fórmula: [equação]
  // Fonte: [referência]
  const resultado = (parametro1 * parametro2) / 1000;
  
  // 3. VALIDAÇÃO DO RESULTADO
  const { valido, tipo } = validarResultado(resultado);
  
  if (!valido) {
    return {
      valor: resultado,
      unidade: 'unidade',
      status: 'aviso',
      mensagem: `Resultado fora do range típico: ${tipo}`
    };
  }
  
  // 4. RETORNO
  return {
    valor: resultado,
    unidade: 'unidade',
    status: 'ok'
  };
}
```

## Tipos Padrão

```typescript
// types/calculations.ts

/**
 * Resultado de qualquer cálculo CNC
 */
export interface ResultadoCalculo {
  /** Valor numérico calculado */
  valor: number;
  
  /** Unidade de medida (RPM, m/min, mm, N, kW, etc) */
  unidade: string;
  
  /** Status do cálculo */
  status: 'ok' | 'aviso' | 'erro';
  
  /** Mensagem explicativa (opcional) */
  mensagem?: string;
  
  /** Fonte da fórmula (opcional, para rastreabilidade) */
  fonte?: string;
}

/**
 * Parâmetros de validação de range
 */
export interface RangeValidacao {
  minimo: number;
  maximo: number;
  unidade: string;
  recomendadoMin?: number;
  recomendadoMax?: number;
}

/**
 * Material de usinagem
 */
export interface Material {
  id: string;
  nome: string;
  classificacao: 'P' | 'M' | 'K' | 'N' | 'S' | 'H'; // ISO 513
  velocidadeCorteBase: number; // m/min
  durezaHB?: number;
  observacoes?: string;
}

/**
 * Ferramenta de corte
 */
export interface Ferramenta {
  id: string;
  tipo: 'fresa' | 'bedame' | 'broca' | 'alargador' | 'macho';
  diametro: number; // mm
  numeroArestas?: number;
  materialSubstrato: 'metal-duro' | 'aco-rapido' | 'ceramica';
  revestimento?: string;
}
```

## Validação de Inputs

```typescript
// lib/validation/parameters.ts

/**
 * Valida parâmetros de entrada CNC
 * 
 * FONTE: Sandvik Handbook 2024 - Ranges típicos
 */
export function validarParametros(params: {
  diametro?: number;
  rpm?: number;
  velocidadeCorte?: number;
  avanco?: number;
  profundidade?: number;
}): ValidationResult {
  const erros: string[] = [];
  const avisos: string[] = [];
  
  // Diâmetro: 1-500 mm (típico)
  if (params.diametro !== undefined) {
    if (params.diametro <= 0) {
      erros.push('Diâmetro deve ser positivo');
    } else if (params.diametro < 1) {
      avisos.push('Diâmetro muito pequeno (< 1mm)');
    } else if (params.diametro > 500) {
      avisos.push('Diâmetro muito grande (> 500mm)');
    }
  }
  
  // RPM: 10-50000 (típico)
  if (params.rpm !== undefined) {
    if (params.rpm <= 0) {
      erros.push('RPM deve ser positivo');
    } else if (params.rpm < 10) {
      avisos.push('RPM muito baixo (< 10)');
    } else if (params.rpm > 50000) {
      avisos.push('RPM muito alto (> 50000) - verificar capacidade da máquina');
    }
  }
  
  // Velocidade de corte: 10-1000 m/min (típico)
  if (params.velocidadeCorte !== undefined) {
    if (params.velocidadeCorte <= 0) {
      erros.push('Velocidade de corte deve ser positiva');
    } else if (params.velocidadeCorte < 10) {
      avisos.push('Vc muito baixa (< 10 m/min)');
    } else if (params.velocidadeCorte > 1000) {
      avisos.push('Vc muito alta (> 1000 m/min) - HSM?');
    }
  }
  
  return {
    valido: erros.length === 0,
    erros,
    avisos
  };
}

export interface ValidationResult {
  valido: boolean;
  erros: string[];
  avisos: string[];
}
```

## Nomenclatura

### Funções

```typescript
// ✅ BOM - Verbo + Substantivo descritivo em português
calcularRPM()
calcularVelocidadeCorte()
validarParametros()
converterImperialMetrico()
formatarResultado()

// ❌ RUIM - Genérico ou em inglês
calculate()
getSpeed()
check()
doConversion()
```

### Variáveis

```typescript
// ✅ BOM - Descritivo em português
const velocidadeCorte = 200;
const diametroFerramenta = 50;
const numeroDentes = 4;
const profundidadeCorte = 2.5;

// ❌ RUIM - Abreviação excessiva ou inglês
const vc = 200;
const d = 50;
const z = 4;
const ap = 2.5;
const speed = 200; // inglês
```

### Constantes

```typescript
// ✅ BOM - UPPER_SNAKE_CASE em português
const PI = Math.PI;
const FATOR_CONVERSAO_MM_INCH = 25.4;
const VELOCIDADE_CORTE_MINIMA = 10;
const RANGE_RPM_MAXIMO = 50000;

// Constantes específicas com fonte
/**
 * Fator de segurança para cálculo de deflexão
 * Fonte: Sandvik Handbook 2024, p.234
 */
const FATOR_SEGURANCA_DEFLEXAO = 1.5;
```

### Tipos/Interfaces

```typescript
// ✅ BOM - PascalCase, nome claro
interface ResultadoCalculo { }
interface ParametrosFresamento { }
interface MaterialUsinagem { }
type StatusCalculo = 'ok' | 'aviso' | 'erro';

// ❌ RUIM
interface result { }
interface params { }
interface IMaterial { } // prefixo I desnecessário em TS
```

## Tratamento de Erros

```typescript
// ✅ BOM - Retorno estruturado com status
function calcularRPM(d: number, vc: number): ResultadoCalculo {
  if (d <= 0) {
    return {
      valor: 0,
      unidade: 'RPM',
      status: 'erro',
      mensagem: 'Diâmetro deve ser positivo'
    };
  }
  
  const rpm = (vc * 1000) / (Math.PI * d);
  
  return {
    valor: Math.round(rpm),
    unidade: 'RPM',
    status: 'ok'
  };
}

// ❌ RUIM - Throw em cálculos (quebra fluxo)
function calcularRPM(d: number, vc: number): number {
  if (d <= 0) throw new Error('Diâmetro inválido');
  return (vc * 1000) / (Math.PI * d);
}
```

## Comentários de Código

### Fórmulas (OBRIGATÓRIO)

```typescript
// ✅ BOM - Fonte técnica completa
// Fórmula: n = (Vc × 1000) / (π × D)
// Fonte: Sandvik Coromant Handbook 2024, p.142, Tabela 6.3
// Unidades: n(RPM), Vc(m/min), D(mm)
// Validado: 2025-01-10
const rpm = (velocidadeCorte * 1000) / (Math.PI * diametro);

// ❌ RUIM - Sem fonte
// Calcula RPM
const rpm = (vc * 1000) / (Math.PI * d);
```

### Decisões Técnicas

```typescript
// ✅ BOM - Explica o "por quê"
// Arredondamos para inteiro porque máquinas CNC
// trabalham com RPM discreto, não fracionário
const rpmFinal = Math.round(rpm);

// Multiplicamos por 0.8 para fator de segurança
// conforme recomendação Kennametal (2024)
const velocidadeSegura = velocidadeCalculada * 0.8;

// ❌ RUIM - Não explica decisão
const rpmFinal = Math.round(rpm);
const velocidadeSegura = velocidadeCalculada * 0.8;
```

## Testes de Validação

```typescript
// lib/calculations/__tests__/rpm.test.ts

import { calcularRPM } from '../rpm';

describe('calcularRPM', () => {
  it('deve calcular RPM corretamente - caso Sandvik', () => {
    // Caso de teste do Sandvik Handbook 2024, Exemplo 3.1
    // Material: AISI 1045, Vc = 200 m/min, D = 50 mm
    // Esperado: 1273 RPM
    
    const resultado = calcularRPM(50, 200);
    
    expect(resultado.status).toBe('ok');
    expect(resultado.valor).toBeCloseTo(1273, 0);
    expect(resultado.unidade).toBe('RPM');
  });
  
  it('deve retornar erro para diâmetro zero', () => {
    const resultado = calcularRPM(0, 200);
    
    expect(resultado.status).toBe('erro');
    expect(resultado.mensagem).toContain('positivo');
  });
  
  it('deve alertar para RPM muito alto', () => {
    // D = 1 mm, Vc = 1000 m/min → RPM muito alto
    const resultado = calcularRPM(1, 1000);
    
    expect(resultado.status).toBe('aviso');
    expect(resultado.valor).toBeGreaterThan(50000);
  });
});
```

## Organização de Imports

```typescript
// ✅ BOM - Agrupado e ordenado
// 1. Bibliotecas externas
import React from 'react';
import { z } from 'zod';

// 2. Tipos
import type { ResultadoCalculo, Material } from '@/types';

// 3. Utils internos
import { validarParametros } from '@/lib/validation';
import { formatarNumero } from '@/lib/utils';

// 4. Componentes
import { Input } from '@/components/ui/input';

// 5. Dados
import materials from '@/data/materials.json';

// ❌ RUIM - Bagunçado
import { formatarNumero } from '@/lib/utils';
import React from 'react';
import materials from '@/data/materials.json';
import { Input } from '@/components/ui/input';
import type { ResultadoCalculo } from '@/types';
```

## Código Production-Ready

### Checklist

Antes de considerar código pronto:

- [ ] TypeScript strict (sem `any`)
- [ ] Validação de todos os inputs
- [ ] Tratamento de erros completo
- [ ] Fórmulas com fonte técnica
- [ ] Testes unitários para casos principais
- [ ] Comentários em decisões não-óbvias
- [ ] Nomenclatura em português
- [ ] Tipos bem definidos
- [ ] Retorno consistente (ResultadoCalculo)
- [ ] Edge cases considerados

### Exemplo Completo

```typescript
/**
 * Calcula RPM (rotações por minuto) a partir de Vc e D
 * 
 * FÓRMULA: n = (Vc × 1000) / (π × D)
 * FONTE: Sandvik Coromant Handbook 2024, p.142
 * UNIDADES: n(RPM), Vc(m/min), D(mm)
 * APLICÁVEL: Todas operações rotativas (torno, fresa, furação)
 * 
 * @param diametro - Diâmetro da ferramenta ou peça em mm
 * @param velocidadeCorte - Velocidade de corte em m/min
 * @returns Resultado com RPM calculado e status de validação
 * 
 * @example
 * ```ts
 * // Fresamento de aço com fresa D=50mm, Vc=200m/min
 * const resultado = calcularRPM(50, 200);
 * console.log(resultado);
 * // { valor: 1273, unidade: 'RPM', status: 'ok' }
 * ```
 * 
 * VALIDADO: 2025-01-10
 * REVISÃO: 2025-04-10
 */
export function calcularRPM(
  diametro: number,
  velocidadeCorte: number
): ResultadoCalculo {
  // VALIDAÇÃO: Diâmetro
  if (!Number.isFinite(diametro) || diametro <= 0) {
    return {
      valor: 0,
      unidade: 'RPM',
      status: 'erro',
      mensagem: 'Diâmetro deve ser um número positivo',
      fonte: 'Sandvik Coromant Handbook 2024, p.142'
    };
  }
  
  // VALIDAÇÃO: Velocidade de corte
  if (!Number.isFinite(velocidadeCorte) || velocidadeCorte <= 0) {
    return {
      valor: 0,
      unidade: 'RPM',
      status: 'erro',
      mensagem: 'Velocidade de corte deve ser um número positivo',
      fonte: 'Sandvik Coromant Handbook 2024, p.142'
    };
  }
  
  // CÁLCULO
  // Fórmula: n = (Vc × 1000) / (π × D)
  // Multiplicamos Vc por 1000 para converter m/min → mm/min
  // Dividimos por (π × D) para obter rotações/min
  const rpm = (velocidadeCorte * 1000) / (Math.PI * diametro);
  
  // Arredondamos porque máquinas CNC trabalham com RPM inteiro
  const rpmArredondado = Math.round(rpm);
  
  // VALIDAÇÃO DO RESULTADO
  // Range típico: 10-50000 RPM (máquinas convencionais)
  // Fonte: Kennametal Technical Guide 2024
  if (rpmArredondado < 10) {
    return {
      valor: rpmArredondado,
      unidade: 'RPM',
      status: 'aviso',
      mensagem: 'RPM muito baixo (< 10). Verificar se máquina suporta.',
      fonte: 'Sandvik Coromant Handbook 2024, p.142'
    };
  }
  
  if (rpmArredondado > 50000) {
    return {
      valor: rpmArredondado,
      unidade: 'RPM',
      status: 'aviso',
      mensagem: 'RPM muito alto (> 50000). Verificar capacidade da máquina e HSM.',
      fonte: 'Sandvik Coromant Handbook 2024, p.142'
    };
  }
  
  // RETORNO
  return {
    valor: rpmArredondado,
    unidade: 'RPM',
    status: 'ok',
    fonte: 'Sandvik Coromant Handbook 2024, p.142'
  };
}
```

---

**Última Atualização:** 10/01/2025 - Rafael Mestre
