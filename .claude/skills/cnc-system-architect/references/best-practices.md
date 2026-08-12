# Boas Práticas - Sistema Mestre CNC

## Princípios Fundamentais

### 1. Código Limpo e Legível

**Rafael não é desenvolvedor full-time** - o código deve ser:
- Auto-explicativo
- Bem documentado
- Fácil de dar manutenção
- Testável (mesmo sem testes escritos)

### 2. TypeScript Estrito

**Sem `any`, sem exceções:**
```typescript
❌ ERRADO
function calcular(params: any) { ... }
const resultado: any = calcular(data);

✅ CORRETO
function calcular(params: ParametrosOperacao): ResultadoCalculo { ... }
const resultado: ResultadoCalculo = calcular(data);
```

### 3. Separação de Responsabilidades

**Componente NÃO faz cálculo:**
```typescript
❌ ERRADO - Lógica no componente
function CalculatorForm() {
  const calcular = () => {
    const vc = (Math.PI * diameter * rpm) / 1000; // ERRADO!
    setResult(vc);
  };
}

✅ CORRETO - Lógica na lib
import { calcularVelocidadeCorte } from '@/lib/calculations/velocidadeCorte';

function CalculatorForm() {
  const calcular = () => {
    const vc = calcularVelocidadeCorte(diameter, rpm);
    setResult(vc);
  };
}
```

## Estrutura de Componentes

### Anatomia de um Componente

```typescript
// 1. Imports (ordem: React, libs externas, internos, types, styles)
import { useState, useCallback } from 'react';
import { calcularVelocidadeCorte } from '@/lib/calculations';
import { Input } from '@/components/ui/Input';
import type { Material } from '@/types/material.types';

// 2. Types/Interfaces
interface CalculatorFormProps {
  materialInicial?: Material;
  onCalcular: (resultado: Resultado) => void;
}

// 3. Componente
export function CalculatorForm({ 
  materialInicial, 
  onCalcular 
}: CalculatorFormProps) {
  // 3a. State
  const [diameter, setDiameter] = useState(10);
  const [rpm, setRpm] = useState(3000);
  
  // 3b. Callbacks/Handlers
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const vc = calcularVelocidadeCorte(diameter, rpm);
    onCalcular({ velocidadeCorte: vc });
  }, [diameter, rpm, onCalcular]);
  
  // 3c. Render
  return (
    <form onSubmit={handleSubmit}>
      {/* JSX */}
    </form>
  );
}
```

### Props vs State

**Props (dados de cima para baixo):**
```typescript
// Componente pai passa dados
<MaterialSelector 
  materiais={MATERIAIS_DISPONIVEIS}
  selecionado={materialAtual}
  onChange={setMaterial}
/>
```

**State (dados internos do componente):**
```typescript
// Estado local do componente
const [isOpen, setIsOpen] = useState(false);
const [inputValue, setInputValue] = useState('');
```

**Quando usar qual:**
- Props: dados que vêm de fora, configuração
- State: dados temporários, UI local, inputs

### Composição > Herança

**Componentizar tudo:**
```typescript
// ❌ Componente monolítico
function CalculatorPage() {
  return (
    <div>
      <input />
      <input />
      <input />
      <button>Calcular</button>
      <div>Resultados...</div>
      <div>Alertas...</div>
    </div>
  );
}

// ✅ Componentes compostos
function CalculatorPage() {
  return (
    <>
      <CalculatorForm onSubmit={handleCalcular} />
      <ResultsPanel resultado={resultado} />
      <AlertsPanel alertas={alertas} />
    </>
  );
}
```

## Gerenciamento de Estado

### Estado Local vs Global

**Local (useState):**
- Inputs de formulário
- UI temporária (modals abertos/fechados)
- Estado que só um componente usa

**Global (Zustand/Context):**
- Dados compartilhados entre múltiplos componentes
- Histórico de cálculos
- Preferências de usuário
- Material/ferramenta selecionados

### Exemplo com Zustand

```typescript
// store/calculosStore.ts
import { create } from 'zustand';

interface CalculosState {
  historico: Resultado[];
  ultimoCalculo: Resultado | null;
  adicionarCalculo: (resultado: Resultado) => void;
  limparHistorico: () => void;
}

export const useCalculosStore = create<CalculosState>((set) => ({
  historico: [],
  ultimoCalculo: null,
  
  adicionarCalculo: (resultado) => set((state) => ({
    historico: [...state.historico, resultado],
    ultimoCalculo: resultado
  })),
  
  limparHistorico: () => set({
    historico: [],
    ultimoCalculo: null
  })
}));

// Uso no componente
function CalculatorPage() {
  const { adicionarCalculo, ultimoCalculo } = useCalculosStore();
  
  const handleCalcular = (params: ParametrosOperacao) => {
    const resultado = calcularOperacaoCompleta(params);
    adicionarCalculo(resultado);
  };
  
  return <div>{/* ... */}</div>;
}
```

## Funções de Cálculo (lib/)

### Template Padrão

```typescript
/**
 * [Descrição do que calcula]
 * 
 * Fórmula: [equação]
 * Fonte: [fabricante/norma, ano, página]
 * Norma: [ISO/ANSI se aplicável]
 * 
 * @param [param1] - [descrição e unidade]
 * @param [param2] - [descrição e unidade]
 * @returns [descrição e unidade]
 * 
 * @throws {ValidationError} [quando lança erro]
 * @validado [data]
 * 
 * @example
 * const vc = calcularVelocidadeCorte(10, 6366);
 * // vc = 200 m/min
 */
export function calcularNomeFuncao(
  parametro1: number,
  parametro2: number
): number {
  // Validação
  validarEntradas(parametro1, parametro2);
  
  // Cálculo
  const resultado = formula(parametro1, parametro2);
  
  // Retorno
  return resultado;
}
```

### Validação de Entradas

**Sempre validar ANTES de calcular:**
```typescript
function calcularVelocidadeCorte(diametro: number, rpm: number): number {
  // Validação explícita
  if (diametro <= 0) {
    throw new ValidationError("Diâmetro deve ser positivo");
  }
  
  if (rpm <= 0) {
    throw new ValidationError("RPM deve ser positivo");
  }
  
  // Validação de range (opcional, pode ser warning)
  if (rpm > 40000) {
    console.warn(`RPM muito alto: ${rpm}`);
  }
  
  // Cálculo
  return (Math.PI * diametro * rpm) / 1000;
}
```

### Funções Puras

**Sem efeitos colaterais:**
```typescript
// ❌ ERRADO - Modifica estado externo
let ultimoResultado = 0;

function calcular(a: number, b: number): number {
  ultimoResultado = a + b; // Efeito colateral!
  return ultimoResultado;
}

// ✅ CORRETO - Função pura
function calcular(a: number, b: number): number {
  return a + b; // Sem efeitos colaterais
}
```

**Mesma entrada → Mesma saída:**
```typescript
// Deve sempre retornar o mesmo valor para mesmos inputs
calcularVelocidadeCorte(10, 6366); // sempre retorna 200
calcularVelocidadeCorte(10, 6366); // sempre retorna 200
```

## Types e Interfaces

### Nomenclatura

```typescript
// Tipos de dados de domínio
interface Material { ... }
interface Ferramenta { ... }
interface Operacao { ... }

// Props de componentes
interface MaterialSelectorProps { ... }
interface ResultsPanelProps { ... }

// Parâmetros/resultados de funções
interface ParametrosOperacao { ... }
interface ResultadoCalculo { ... }

// Enums para constantes
enum TipoMaquina {
  CONVENCIONAL = 'convencional',
  HSM = 'hsm',
  TORNO = 'torno'
}
```

### Estruturas Comuns

**Material:**
```typescript
interface Material {
  id: string;
  nome: string;
  categoria: 'acos-carbono' | 'inox' | 'aluminio' | 'titanio' | 'ferro-fundido';
  kc: number; // N/mm² - Força de corte específica
  vc: {
    desbaste: { min: number; max: number };
    acabamento: { min: number; max: number };
  };
  fz: {
    desbaste: { min: number; max: number };
    acabamento: { min: number; max: number };
  };
}
```

**Resultado de Cálculo:**
```typescript
interface ResultadoCalculo {
  // Parâmetros primários
  rpm: number;
  velocidadeCorte: number; // m/min
  avancoPorMinuto: number; // mm/min
  
  // Parâmetros secundários (opcionais)
  potencia?: number; // kW
  torque?: number; // N·m
  tempoCorte?: number; // min
  
  // Validações
  alertas: Alerta[];
  
  // Metadados
  timestamp: Date;
  parametrosEntrada: ParametrosOperacao;
}
```

**Alerta:**
```typescript
interface Alerta {
  nivel: 'CRÍTICO' | 'AVISO' | 'SUGESTÃO';
  parametro: string;
  mensagem: string;
  fonte?: string;
  valorAtual?: number;
  valorRecomendado?: number;
}
```

## Tratamento de Erros

### Errors Customizados

```typescript
// lib/errors/ValidationError.ts
export class ValidationError extends Error {
  constructor(
    message: string,
    public parametro?: string,
    public valorInvalido?: unknown
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Uso
if (diametro <= 0) {
  throw new ValidationError(
    "Diâmetro deve ser positivo",
    "diametro",
    diametro
  );
}
```

### Error Boundaries (React)

```typescript
// components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Algo deu errado</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Recarregar página
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

### Try-Catch em Componentes

```typescript
function CalculatorForm() {
  const [erro, setErro] = useState<string | null>(null);
  
  const handleCalcular = useCallback(() => {
    try {
      setErro(null);
      const resultado = calcularVelocidadeCorte(diameter, rpm);
      onSuccess(resultado);
    } catch (error) {
      if (error instanceof ValidationError) {
        setErro(error.message);
      } else {
        setErro("Erro desconhecido ao calcular");
        console.error(error);
      }
    }
  }, [diameter, rpm, onSuccess]);
  
  return (
    <div>
      {/* Form */}
      {erro && <Alert tipo="erro">{erro}</Alert>}
    </div>
  );
}
```

## Formatação e Unidades

### Números com Precisão

```typescript
// lib/utils/formatters.ts

export function formatarVelocidadeCorte(vc: number): string {
  return `${vc.toFixed(1)} m/min`;
}

export function formatarRPM(rpm: number): string {
  return `${Math.round(rpm)} RPM`;
}

export function formatarPotencia(kw: number): string {
  return `${kw.toFixed(2)} kW`;
}

// Uso no componente
<span>{formatarVelocidadeCorte(resultado.velocidadeCorte)}</span>
```

### Conversão de Unidades

```typescript
// Se futuramente suportar imperial
export function mmToInches(mm: number): number {
  return mm / 25.4;
}

export function mMinToSfm(mMin: number): number {
  return mMin * 3.28084;
}
```

## Performance

### useMemo para Cálculos

```typescript
function ResultsPanel({ parametros }: ResultsPanelProps) {
  // Recalcula apenas se parametros mudarem
  const resultado = useMemo(
    () => calcularOperacaoCompleta(parametros),
    [parametros]
  );
  
  return <div>{/* Renderizar resultado */}</div>;
}
```

### useCallback para Handlers

```typescript
function CalculatorForm({ onSubmit }: Props) {
  const [diameter, setDiameter] = useState(10);
  
  // Callback memorizado - não recria a cada render
  const handleDiameterChange = useCallback((value: number) => {
    setDiameter(value);
  }, []);
  
  return <Input value={diameter} onChange={handleDiameterChange} />;
}
```

### Lazy Loading

```typescript
// App.tsx
import { lazy, Suspense } from 'react';

const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<CalculatorPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Suspense>
  );
}
```

## Acessibilidade

### Semântica HTML

```typescript
// ✅ Use elementos semânticos
<button onClick={handleClick}>Calcular</button>
<input type="number" />
<select>...</select>

// ❌ Evite divs clicáveis
<div onClick={handleClick}>Calcular</div>
```

### Labels e ARIA

```typescript
<div>
  <label htmlFor="diameter-input">
    Diâmetro da ferramenta (mm)
  </label>
  <input
    id="diameter-input"
    type="number"
    aria-describedby="diameter-help"
  />
  <span id="diameter-help">
    Insira o diâmetro em milímetros
  </span>
</div>
```

## Comentários

### Quando Comentar

**SIM - Comentar:**
- Fórmulas e fontes (obrigatório)
- Lógica complexa não-óbvia
- Workarounds temporários
- TODOs e FIXMEs

**NÃO - Não comentar:**
- Código auto-explicativo
- Comentários redundantes

```typescript
// ❌ Comentário redundante
// Incrementa o contador
contador++;

// ✅ Comentário útil
// Fator de correção para engajamento radial < 30%
// Fonte: Walter Tools Technical Guide 2023, p.78
if (engajamentoRadial < 0.3) {
  fz *= 1.3;
}
```

### TODOs

```typescript
// TODO: Adicionar validação de temperatura
// TODO(Rafael): Implementar cálculo de vida da ferramenta
// FIXME: Bug no cálculo quando rpm < 100
```

## Testes (Preparação Futura)

### Funções Testáveis

**Escrever código pensando em testes:**
```typescript
// ✅ Fácil de testar - função pura
export function calcularVelocidadeCorte(d: number, n: number): number {
  return (Math.PI * d * n) / 1000;
}

// Teste (futuro):
// expect(calcularVelocidadeCorte(10, 6366)).toBe(200);

// ❌ Difícil de testar - dependências externas
function calcularVelocidadeCorte() {
  const d = getDiameterFromDB(); // Dependência externa
  const n = getRPMFromAPI(); // Dependência externa
  return (Math.PI * d * n) / 1000;
}
```

### Estrutura para Testes

```typescript
// lib/calculations/__tests__/velocidadeCorte.test.ts
import { describe, it, expect } from 'vitest';
import { calcularVelocidadeCorte } from '../velocidadeCorte';

describe('calcularVelocidadeCorte', () => {
  it('calcula corretamente com valores positivos', () => {
    expect(calcularVelocidadeCorte(10, 6366)).toBeCloseTo(200, 1);
  });
  
  it('lança erro com diâmetro negativo', () => {
    expect(() => calcularVelocidadeCorte(-10, 6366)).toThrow(ValidationError);
  });
});
```

## Checklist Antes de Commit

- [ ] Código compila sem erros TypeScript
- [ ] Sem `any` ou `@ts-ignore`
- [ ] Fórmulas documentadas com fonte
- [ ] Validação de entradas implementada
- [ ] Componentes com props tipadas
- [ ] Nomenclatura em português consistente
- [ ] Imports organizados
- [ ] Código formatado (Prettier)

---

**Última Atualização:** 09/01/2025 - Rafael Mestre
