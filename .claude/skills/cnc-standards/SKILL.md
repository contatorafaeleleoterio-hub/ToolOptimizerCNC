---
name: cnc-standards
description: Padrões obrigatórios de código TypeScript do ToolOptimizer — aplicar sempre que escrever cálculos, validações ou tipos CNC.
---

# CNC Standards

Padrões obrigatórios para todo código CNC do ToolOptimizer. As demais skills CNC referenciam este arquivo.

## Regras (sem exceção)
1. **Fórmula = fonte técnica.** Nunca implementar sem fonte validada; comentar fórmula + fonte + data no código. Sem fonte → pedir ao Rafael, nunca inventar.
2. **Validar inputs antes de calcular:** tipo (`Number.isFinite`) → sinal (>0) → range típico. Nunca confiar em dados externos.
3. **Cálculos nunca lançam `throw`** — retornar sempre `ResultadoCalculo` com status. `ValidationError`/try-catch só na borda da UI (componentes).
4. **Nomenclatura em português** no domínio CNC: `calcularRPM`, `velocidadeCorte`, `profundidadeCorte` (abreviações vc/fz/ap só em comentários).
5. **TypeScript estrito** — zero `any`; tipar tudo.
6. **Separação:** `lib/calculations/` (cálculo puro) · `lib/validation/` · `types/` · `data/` (JSON) · `components/` (UI usa lib/). Nunca lógica na UI.
7. **Testar com caso de catálogo** (valor conhecido) + inputs inválidos + extremos. Nunca entregar placeholder.

## Tipos padrão (obrigatórios)
```typescript
interface ResultadoCalculo {
  valor: number;
  unidade: string;
  status: 'ok' | 'aviso' | 'erro';  // ok=range normal · aviso=válido mas atípico · erro=não calculou
  mensagem?: string;
  fonte?: string;
}
interface ValidationResult { valido: boolean; erros: string[]; avisos: string[]; }
interface Material { id: string; nome: string; classificacao: 'P'|'M'|'K'|'N'|'S'|'H'; velocidadeCorteBase: number; }
```

## Template de função (lib/calculations/)
```typescript
/**
 * [Descrição do cálculo]
 * FÓRMULA: [equação] | FONTE: [fabricante/norma + página] | UNIDADES: [in → out]
 * VALIDADO: YYYY-MM-DD | Teste: [caso de catálogo]
 */
export function nomeDescritivo(param: number): ResultadoCalculo {
  // 1. validação de entrada → 2. cálculo (fonte no comentário) → 3. validação de saída → 4. retorno
}
```

## Hierarquia de fontes (ordem de confiabilidade)
1. Catálogos de fabricantes (Sandvik, Kennametal, Iscar) → 2. Normas (ISO, ANSI, DIN) → 3. Handbooks (Machining Data, Machinery's) → 4. Literatura acadêmica. Lista completa: `references/technical-sources.md`.

## Ranges típicos (Sandvik 2024)
Diâmetro 1–500 mm · RPM 10–50000 · Vc 10–1000 m/min · Feed 0.01–10 mm/rev · Profundidade 0.1–20 mm. Fora do range → status `'aviso'`.

## Referências
- `references/technical-sources.md` — hierarquia completa de fontes
- `references/code-patterns.md` — templates e padrões detalhados

## Workflow entre skills
cnc-parameters-validator (valida fórmula) → **cnc-standards** (implementa) → cnc-documentation-expert (documenta).
