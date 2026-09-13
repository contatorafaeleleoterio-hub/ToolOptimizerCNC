# Sessão: Reset Feedback ao Alterar Parâmetros

**Data:** 17/02/2026 - Noite (2ª sessão)
**Commit:** `1a09e33`
**Status:** ✅ CONCLUÍDO e PUBLICADO

---

## Resumo Executivo

Implementação de **reset visual do painel de resultados** quando qualquer parâmetro de
entrada é alterado. O operador agora recebe feedback imediato de que os valores exibidos
estão desatualizados e precisa clicar em "SIMULAR" novamente.

Também foram aumentados em **+50% os tempos de animação** do botão Simular para UX mais
suave e profissional.

---

## Motivação

**Problema:** Antes desta feature, ao alterar Material, Ferramenta ou qualquer parâmetro
de corte, o painel de resultados permanecia exibindo os valores da simulação anterior —
sem nenhuma indicação visual de que estavam desatualizados. O operador poderia tomar
decisões com base em dados inválidos.

**Solução:** Zerar `resultado` no store ao detectar qualquer mudança de input, e exibir
um aviso visual animado orientando o operador a simular novamente.

---

## O Que Foi Implementado

### 1. Mudança no Store (`src/store/machining-store.ts`)

**Comportamento ANTES:**
```typescript
setParametros: (p) => {
  set((state) => ({ parametros: { ...state.parametros, ...p }, manualOverrides: {} }));
  get().calcular(); // Auto-recalculava silenciosamente
},
```

**Comportamento DEPOIS:**
```typescript
setParametros: (p) => {
  set((state) => ({ parametros: { ...state.parametros, ...p }, resultado: null, manualOverrides: {} }));
  // Don't auto-calculate — user must click Simular
},
```

**Setters que agora zeram `resultado`** (sem auto-calcular):
- `setMaterial(id)`
- `setFerramenta(f)`
- `setTipoOperacao(tipo)`
- `setParametros(p)`
- `setSafetyFactor(f)`

**Exceção** (ainda auto-calcula):
- `setLimitesMaquina(l)` → mantém `calcular()` (limites de máquina são configuração global)

### 2. Hook de Feedback (`src/hooks/use-reset-feedback.ts`)

Novo hook que monitora mudanças nos parâmetros usando `useRef` para comparar com
valores anteriores. Quando detecta mudança, dispara animação de 800ms.

```typescript
export function useResetFeedback() {
  const [isResetting, setIsResetting] = useState(false);
  // Monitora: materialId, diametro, numeroArestas, balanco,
  //           tipoOperacao, ap, ae, fz, vc, safetyFactor
  // Trigger: isResetting=true por 800ms ao detectar mudança
  return { isResetting };
}
```

### 3. Banner Visual (`src/components/results-panel.tsx`)

Quando `storeResultado === null`, exibe:

```tsx
{showResetMessage && (
  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4
                  animate-[fadeInUp_0.4s_ease-out]">
    <div className="flex items-center gap-3">
      <span className="material-symbols-outlined text-yellow-400 animate-pulse">refresh</span>
      <div>
        <p className="text-sm font-semibold text-yellow-300">Parâmetros Alterados</p>
        <p className="text-xs text-yellow-400/80">
          Clique em "SIMULAR" para recalcular os resultados
        </p>
      </div>
    </div>
  </div>
)}
```

### 4. Keyframe `fadeOut` (`src/index.css`)

```css
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0.3; }
}
```

Usado para reduzir a opacidade dos cards de resultado quando estão desatualizados.

### 5. Animações do Simular +50% (`src/hooks/use-simulation-animation.ts`)

| Timing | Antes | Depois |
|--------|-------|--------|
| Loading state | 300ms | 450ms |
| Gauge animation | 900ms | 1350ms |
| Safety pulse | 1000ms | 1500ms |

---

## Arquivos Modificados

```
M  src/store/machining-store.ts           — resultado=null nos setters, sem auto-calcular
M  src/components/results-panel.tsx       — banner amarelo animado + import useResetFeedback
M  src/hooks/use-simulation-animation.ts  — timings +50%
M  src/index.css                          — keyframe fadeOut
M  tests/components/config-panel.test.tsx — timeout 400ms → 2000ms (novo timing)
M  tests/store/machining-store.test.ts    — calcular() explícito após setParametros/setFerramenta
+  src/hooks/use-reset-feedback.ts        — NOVO: hook de feedback visual
```

---

## Impacto nos Testes

**Testes do store precisaram ser atualizados** porque antes dependiam do auto-recalc:

```typescript
// ANTES (funcionava porque setParametros chamava calcular())
getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
expect(getState().resultado!.seguranca.nivel).toBe('verde'); // ✅ funcionava

// DEPOIS (precisa chamar calcular() explicitamente)
getState().setParametros({ ap: 2, ae: 5, fz: 0.1, vc: 100 });
getState().calcular(); // ← obrigatório agora
expect(getState().resultado!.seguranca.nivel).toBe('verde'); // ✅ funciona
```

**Resultado:** 333 testes passando (24 arquivos) — zero regressões.

---

## UX — Fluxo do Operador

**Antes:**
1. Seleciona material → resultado atualiza silenciosamente
2. ❌ Operador não sabe que houve recálculo automático
3. ❌ Pode confiar em valores de simulação anterior sem perceber

**Depois:**
1. Seleciona material → banner amarelo aparece com `fadeInUp`
2. ✅ "Parâmetros Alterados — Clique em SIMULAR"
3. Operador clica Simular → spinner 450ms → resultados atualizados
4. Banner desaparece, pulse verde/vermelho confirma resultado

---

## Resultado Final

- **Commit:** `1a09e33` — feat: reset panel on input change + increase simulate animation by 50%
- **Testes:** 333 passing
- **Build:** limpo (86KB gzip)
- **Status:** Publicado no GitHub e GitHub Pages
