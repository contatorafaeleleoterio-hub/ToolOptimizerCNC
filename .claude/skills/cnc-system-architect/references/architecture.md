# Arquitetura do Sistema Mestre CNC

## Visão Geral

Sistema web modular para cálculo de parâmetros de usinagem CNC, desenvolvido em React/TypeScript com foco em escalabilidade e manutenibilidade.

## Stack Tecnológico

### Frontend
- **React 18+** com TypeScript
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Zustand** ou **React Context** - State management (decisão: Zustand para melhor performance)
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### Deployment
- **Vercel** ou **Netlify** (preferência: Vercel)
- **Domínio próprio** + **subdomínio teste**

### Testes (futuro)
- **Vitest** - Unit tests
- **React Testing Library** - Component tests

## Estrutura de Diretórios

```
sistema-mestre-cnc/
├── public/
│   ├── favicon.ico
│   └── assets/
│       └── images/
├── src/
│   ├── components/          # Componentes React
│   │   ├── ui/             # Componentes base (Button, Input, Card)
│   │   ├── calculators/    # Componentes de calculadora específicos
│   │   ├── forms/          # Formulários de entrada
│   │   └── layout/         # Layout e navegação
│   ├── lib/                # Lógica de negócio
│   │   ├── calculations/   # Funções de cálculo CNC
│   │   ├── validations/    # Validadores (integra com cnc-parameters-validator)
│   │   ├── constants/      # Constantes e tabelas de materiais
│   │   └── utils/          # Utilitários gerais
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript types/interfaces
│   ├── store/              # State management (Zustand)
│   ├── config/             # Configurações
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/                   # Testes (futuro)
├── .env.example
├── .env.local
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── README.md
```

## Princípios de Arquitetura

### 1. Separação de Responsabilidades

**Componentes (src/components/):**
- Apenas lógica de apresentação
- Recebem dados via props
- Emitem eventos via callbacks
- Sem lógica de cálculo complexa

**Lib (src/lib/):**
- Toda lógica de cálculo CNC
- Validações e transformações
- Funções puras (testáveis)
- Zero dependência de React

**Store (src/store/):**
- Estado global da aplicação
- Histórico de cálculos
- Preferências do usuário
- Cache de resultados

### 2. TypeScript Estrito

**Configuração tsconfig.json:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

**Tipos obrigatórios:**
- Todos os parâmetros de função
- Todas as props de componente
- Todos os retornos de função
- Interfaces para dados de domínio

### 3. Componentização

**Hierarquia:**
```
App
├── Layout
│   ├── Header
│   ├── Sidebar (navegação)
│   └── Footer
└── CalculatorPage
    ├── CalculatorForm
    │   ├── MaterialSelector
    │   ├── ToolSelector
    │   ├── OperationSelector
    │   └── ParametersInput
    ├── ResultsPanel
    │   ├── PrimaryResults (RPM, Vf, etc)
    │   ├── SecondaryResults (Potência, Torque, Tempo)
    │   └── AlertsPanel (validações)
    └── HistoryPanel (opcional)
```

**Componentes reutilizáveis (src/components/ui/):**
- Button
- Input
- Select
- Card
- Alert
- Badge
- Tooltip

### 4. Estado e Dados

**Estado Local (useState):**
- Inputs de formulário
- UI temporária (modals, tooltips)

**Estado Global (Zustand):**
- Resultados de cálculos
- Histórico de operações
- Preferências de usuário
- Material/ferramenta selecionados

**Estado Derivado:**
- Cálculos baseados em inputs
- Validações
- Formatações

## Padrões de Código

### Nomenclatura

**Arquivos:**
- Componentes: `PascalCase.tsx` (ex: `MaterialSelector.tsx`)
- Lib/Utils: `camelCase.ts` (ex: `calculateRpm.ts`)
- Types: `camelCase.types.ts` (ex: `material.types.ts`)

**Variáveis e Funções:**
```typescript
// Português técnico, descritivo
const velocidadeCorte = calcularVelocidadeCorte(diametro, rpm);
const avancoPorDente = 0.15; // mm/dente
const profundidadeAxial = 8; // mm

// Evitar abreviações (exceto em contexto claro)
❌ const vc = calc(d, n);
✅ const velocidadeCorte = calcularVelocidadeCorte(diametro, rpm);
```

**Componentes:**
```typescript
// Props explícitas e tipadas
interface MaterialSelectorProps {
  materialSelecionado: Material | null;
  onMaterialChange: (material: Material) => void;
  disabled?: boolean;
}

function MaterialSelector({ 
  materialSelecionado, 
  onMaterialChange,
  disabled = false 
}: MaterialSelectorProps) {
  // ...
}
```

### Funções de Cálculo

**Estrutura padrão:**
```typescript
/**
 * Calcula velocidade de corte (Vc)
 * 
 * Fórmula: Vc = (π × D × n) / 1000
 * Fonte: Sandvik Coromant Handbook 2023, p.142
 * Norma: ISO 3685
 * 
 * @param diametro - Diâmetro da ferramenta (mm)
 * @param rpm - Rotação (RPM)
 * @returns Velocidade de corte (m/min)
 * 
 * @throws {ValidationError} Se parâmetros inválidos
 * @validado 09/01/2025
 */
export function calcularVelocidadeCorte(
  diametro: number,
  rpm: number
): number {
  // 1. Validação de entrada
  if (diametro <= 0 || rpm <= 0) {
    throw new ValidationError("Diâmetro e RPM devem ser positivos");
  }
  
  // 2. Cálculo (fonte explícita)
  const vc = (Math.PI * diametro * rpm) / 1000; // Sandvik 2023
  
  // 3. Validação de saída (opcional - pode ser separada)
  if (vc < 10 || vc > 1500) {
    console.warn(`Vc fora de limites típicos: ${vc.toFixed(1)} m/min`);
  }
  
  // 4. Retorno
  return vc;
}
```

**Retorno estruturado para múltiplos valores:**
```typescript
interface ResultadoCalculoCompleto {
  rpm: number;
  velocidadeCorte: number;
  avancoPorMinuto: number;
  potencia: number;
  torque: number;
  tempoCorte: number;
  alertas: Alerta[];
}

export function calcularOperacaoCompleta(
  params: ParametrosOperacao
): ResultadoCalculoCompleto {
  // Cálculos sequenciais com validação
  const rpm = calcularRPM(params.velocidadeCorte, params.diametro);
  const vf = calcularAvancoPorMinuto(params.fz, params.numDentes, rpm);
  // ... etc
  
  // Validação integrada
  const alertas = validarParametros(params, { rpm, vf });
  
  return {
    rpm,
    velocidadeCorte: params.velocidadeCorte,
    avancoPorMinuto: vf,
    potencia: calcularPotencia(/* ... */),
    torque: calcularTorque(/* ... */),
    tempoCorte: calcularTempoCorte(/* ... */),
    alertas
  };
}
```

### Validação e Alertas

**Integração com cnc-parameters-validator:**
```typescript
import { validarParametros } from '@/lib/validations/cncValidator';
import type { Alerta, NivelAlerta } from '@/types/validation.types';

export function validarOperacao(
  params: ParametrosOperacao
): Alerta[] {
  const alertas: Alerta[] = [];
  
  // Usar lógica da skill cnc-parameters-validator
  const validacaoRPM = validarRPM(params.rpm, params.diametro, params.tipoMaquina);
  if (validacaoRPM.nivel !== 'OK') {
    alertas.push(validacaoRPM);
  }
  
  const validacaoVc = validarVelocidadeCorte(
    params.velocidadeCorte, 
    params.material, 
    params.operacao
  );
  if (validacaoVc.nivel !== 'OK') {
    alertas.push(validacaoVc);
  }
  
  // ... outras validações
  
  return alertas;
}
```

**Componente de Alertas:**
```typescript
interface AlertaPanelProps {
  alertas: Alerta[];
}

function AlertaPanel({ alertas }: AlertaPanelProps) {
  if (alertas.length === 0) return null;
  
  // Ordenar por severidade: CRÍTICO > AVISO > SUGESTÃO
  const ordenados = [...alertas].sort((a, b) => 
    severidadeOrdem[a.nivel] - severidadeOrdem[b.nivel]
  );
  
  return (
    <div className="space-y-2">
      {ordenados.map((alerta, idx) => (
        <Alert 
          key={idx}
          nivel={alerta.nivel}
          parametro={alerta.parametro}
          mensagem={alerta.mensagem}
          fonte={alerta.fonte}
        />
      ))}
    </div>
  );
}
```

### Constantes e Tabelas

**Organização em lib/constants/:**
```typescript
// lib/constants/materials.ts
export const MATERIAIS_DISPONIVEIS = [
  {
    id: 'aco-1020',
    nome: 'Aço 1020-1045',
    categoria: 'acos-carbono',
    kc: 2000, // N/mm² (força de corte específica)
    vcDesbaste: { min: 80, max: 150 },
    vcAcabamento: { min: 120, max: 200 },
    fzDesbaste: { min: 0.10, max: 0.25 },
    fzAcabamento: { min: 0.05, max: 0.10 }
  },
  // ... outros materiais
] as const;

export type MaterialId = typeof MATERIAIS_DISPONIVEIS[number]['id'];

// lib/constants/machines.ts
export const LIMITES_MAQUINAS = {
  convencional: {
    rpmMin: 100,
    rpmMax: 12000,
    rpmAviso: 8000,
    potenciaTipica: 15, // kW
    vfMaxSeguro: 5000 // mm/min
  },
  hsm: {
    rpmMin: 1000,
    rpmMax: 40000,
    rpmAviso: 35000,
    potenciaTipica: 30,
    vfMaxSeguro: 20000
  }
} as const;
```

### Custom Hooks

**Exemplo - useCalculosCNC:**
```typescript
// hooks/useCalculosCNC.ts
import { useState, useCallback, useMemo } from 'react';
import { calcularOperacaoCompleta } from '@/lib/calculations';
import { validarOperacao } from '@/lib/validations';
import type { ParametrosOperacao, ResultadoCalculoCompleto } from '@/types';

export function useCalculosCNC() {
  const [parametros, setParametros] = useState<ParametrosOperacao | null>(null);
  const [calculando, setCalculando] = useState(false);
  
  const resultado = useMemo(() => {
    if (!parametros) return null;
    return calcularOperacaoCompleta(parametros);
  }, [parametros]);
  
  const alertas = useMemo(() => {
    if (!parametros || !resultado) return [];
    return validarOperacao(parametros);
  }, [parametros, resultado]);
  
  const calcular = useCallback((novosParams: ParametrosOperacao) => {
    setCalculando(true);
    // Simular delay (se tiver operações assíncronas futuras)
    setTimeout(() => {
      setParametros(novosParams);
      setCalculando(false);
    }, 100);
  }, []);
  
  const limpar = useCallback(() => {
    setParametros(null);
  }, []);
  
  return {
    parametros,
    resultado,
    alertas,
    calculando,
    calcular,
    limpar
  };
}
```

## Estilização com Tailwind

### Convenções

**Classes organizadas por categoria:**
```tsx
<div className={`
  // Layout
  flex items-center justify-between gap-4
  // Tamanho
  w-full max-w-2xl h-auto
  // Espaçamento
  p-4 mx-auto
  // Aparência
  bg-white rounded-lg shadow-md
  // Interação
  hover:shadow-lg transition-shadow
  // Responsivo
  md:p-6 lg:max-w-4xl
`}>
```

**Tema customizado (tailwind.config.js):**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Cores do sistema CNC
        'cnc-primary': '#2563eb',
        'cnc-secondary': '#64748b',
        'alerta-critico': '#dc2626',
        'alerta-aviso': '#f59e0b',
        'alerta-info': '#3b82f6'
      }
    }
  }
}
```

### Componentes Base (src/components/ui/)

**Reutilizar ao máximo:**
- Não reinventar componentes básicos
- Manter consistência visual
- Usar Radix UI ou shadcn/ui como base (opcional)

## Performance

### Otimizações

1. **Memoização de cálculos:**
```typescript
const resultado = useMemo(() => 
  calcularOperacaoCompleta(params), 
  [params]
);
```

2. **Lazy loading de rotas:**
```typescript
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
```

3. **Debounce em inputs:**
```typescript
const debouncedCalcular = useMemo(
  () => debounce(calcular, 300),
  [calcular]
);
```

4. **Code splitting:**
- Separar cálculos pesados em chunks
- Carregar sob demanda

## Deploy

### Vercel (Recomendado)

**Configuração (vercel.json):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_APP_VERSION": "1.0.0"
  }
}
```

**Domínios:**
- Produção: `mestrecnc.com` (exemplo)
- Teste: `teste.mestrecnc.com`

### Variáveis de Ambiente

**.env.example:**
```
VITE_APP_NAME=Sistema Mestre CNC
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
```

## Documentação de Código

### JSDoc obrigatório para:

1. **Funções de cálculo** (com fonte/norma)
2. **Componentes públicos**
3. **Hooks customizados**
4. **Types/Interfaces complexos**

### README.md do projeto:

```markdown
# Sistema Mestre CNC

Calculadora web de parâmetros de usinagem CNC.

## Instalação
\`\`\`bash
npm install
\`\`\`

## Desenvolvimento
\`\`\`bash
npm run dev
\`\`\`

## Build
\`\`\`bash
npm run build
\`\`\`

## Testes
\`\`\`bash
npm test
\`\`\`

## Estrutura
Ver ARCHITECTURE.md para detalhes.
```

## Roadmap Técnico

### Fase 1 (MVP)
- [ ] Estrutura base do projeto
- [ ] Componentes UI básicos
- [ ] Calculadora de RPM e Vc
- [ ] Validação básica
- [ ] Deploy em Vercel

### Fase 2
- [ ] Calculadoras adicionais (potência, torque, tempo)
- [ ] Sistema de alertas completo
- [ ] Histórico de cálculos
- [ ] Export de resultados

### Fase 3
- [ ] Multi-idioma (PT/EN)
- [ ] Modo offline (PWA)
- [ ] Testes automatizados
- [ ] Analytics

## Referências

- React Docs: https://react.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- Vite Guide: https://vitejs.dev/guide/
- Tailwind CSS: https://tailwindcss.com/docs

---

**Última Atualização:** 09/01/2025 - Rafael Mestre
