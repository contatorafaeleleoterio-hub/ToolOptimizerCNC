# Protocolo de Debug

> Abordagem estruturada para diagnosticar e corrigir bugs no ToolOptimizer CNC.

---

## Passo 1: Reproduzir

- Escrever ou identificar um teste que falha demonstrando o bug
- Usar valores de `docs/technical/CASOS_TESTE_REFERENCIA.md` quando aplicavel
- Se o bug e visual, usar preview tools para capturar screenshot

---

## Passo 2: Isolar Camada

O projeto tem 4 camadas distintas. Identificar onde o bug mora:

| Camada | Pasta | Tipo de Bug |
|--------|-------|-------------|
| **Engine** | `src/engine/` | Calculo errado, formula incorreta, limites |
| **Store** | `src/store/` | Estado inconsistente, auto-recalc, manualOverrides |
| **Components** | `src/components/` | Render errado, props incorretas, CSS |
| **Data** | `src/data/` | Material/ferramenta com dados errados |

**Dica:** Se o teste unitario da engine passa mas o componente mostra valor errado → bug no store ou component.

---

## Passo 3: Checar Armadilhas Conhecidas

Antes de investigar, verificar a tabela de armadilhas em `docs/PROXIMA_SESSAO.md` (secao "Armadilhas Conhecidas"). Muitos bugs ja sao documentados:

- `toBeCloseTo(x, 0)` tem margem ±0.5, nao ±1
- StyledSlider e div, nao input — testar via botoes +/-
- Store nao auto-recalcula — chamar `calcular()` explicitamente
- Tailwind purga classes interpoladas — usar `style={{}}`
- Floating-point: `0.075/0.1 ≠ 0.75` — usar valores com margem

Ver tambem: `docs/ai/memory/COMMON_MISTAKES.md`

---

## Passo 4: Fix Minimo

- Aplicar a menor mudanca possivel que corrige o bug
- NAO refatorar codigo ao redor
- NAO adicionar features durante fix
- Se o fix requer mudanca arquitetural, seguir ARCHITECTURE_PROTOCOL primeiro

---

## Passo 5: Verificar Suite Completa

```bash
# 1. Testes passando
npx vitest run

# 2. TypeScript limpo
npx tsc --noEmit

# 3. Build de producao OK
npx vite build
```

Se algum falhar: o fix introduziu regressao. Reverter e tentar abordagem diferente.

---

## Formato de Saida

```
## Debug: [descricao do bug]

**Reproduzido:** sim/nao (teste: [nome do teste])
**Camada:** engine | store | components | data
**Causa raiz:** [descricao]
**Fix:** [descricao da mudanca]
**Arquivos alterados:** [lista]
**Suite:** X/Y testes passando | TypeScript limpo | Build OK
```

---

## Referencia

- Casos teste: `docs/technical/CASOS_TESTE_REFERENCIA.md`
- Armadilhas: `docs/PROXIMA_SESSAO.md` secao "Armadilhas Conhecidas"
- Erros comuns: `docs/ai/memory/COMMON_MISTAKES.md`

---

*FENIX AI System | Protocolo de Debug*
