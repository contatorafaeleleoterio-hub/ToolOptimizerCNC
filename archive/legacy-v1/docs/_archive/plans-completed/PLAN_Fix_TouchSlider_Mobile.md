# Fix: TouchSlider — Slider Move Only on Thumb Drag (Mobile)

## Contexto
No mobile, a seção "Ajuste Fino" tem 4 sliders (`TouchSlider`). Atualmente, qualquer toque na área do track (trilha) do slider já muda o valor imediatamente — inclusive durante o scroll da página. Isso causa ajustes acidentais enquanto o usuário navega. O correto: o slider só deve se mover quando o usuário toca e arrasta **o círculo (thumb)**.

**Causa raiz** (`src/components/mobile/mobile-fine-tune-section.tsx`, linhas 79–104):
1. `onTouchStart` está no **track inteiro** e chama `onChange(getValueFromX(...))` imediatamente no toque
2. `touch-none` no track bloqueia o scroll da página quando o dedo toca qualquer ponto do slider
3. Não há detecção de proximidade ao thumb — qualquer toque no track ativa o slider

---

## Arquivo a Modificar
**`src/components/mobile/mobile-fine-tune-section.tsx`** — apenas a função `TouchSlider` (linhas 49–163)

Nenhum outro arquivo precisa ser alterado.

---

## Solução: Thumb Hit Zone + Sem Valor no TouchStart

### Mudanças na função `TouchSlider`

#### 1. Adicionar ref ao thumb (no topo da função, junto com `trackRef`)
```tsx
const thumbRef = useRef<HTMLDivElement>(null);
```

#### 2. Substituir `handleTouchStart` — remover onChange
```tsx
// ANTES:
const handleTouchStart = useCallback((e: React.TouchEvent) => {
  setDragging(true);
  const touch = e.touches[0];
  if (touch) onChange(getValueFromX(touch.clientX));
}, [onChange, getValueFromX]);

// DEPOIS:
const handleTouchStart = useCallback((_e: React.TouchEvent) => {
  setDragging(true);
  // Não chama onChange aqui — valor só muda ao arrastar
}, []);
```

#### 3. Simplificar `handleTouchMove` — remover e.preventDefault()
```tsx
// ANTES:
const handleTouchMove = useCallback((e: React.TouchEvent) => {
  e.preventDefault();
  const touch = e.touches[0];
  onChange(getValueFromX(touch.clientX));
}, [onChange, getValueFromX]);

// DEPOIS:
const handleTouchMove = useCallback((e: React.TouchEvent) => {
  // touch-none no hit zone já previne scroll — sem necessidade de preventDefault()
  const touch = e.touches[0];
  if (touch) onChange(getValueFromX(touch.clientX));
}, [onChange, getValueFromX]);
```

#### 4. Modificar o track div — remover handlers e touch-none
```tsx
// ANTES (linha 98-110):
<div
  ref={trackRef}
  className="relative h-12 mx-[18px] flex items-center cursor-pointer touch-none select-none"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  onTouchCancel={handleTouchEnd}
  role="slider"
  ...
>

// DEPOIS:
<div
  ref={trackRef}
  className="relative h-12 mx-[18px] flex items-center select-none"
  role="slider"
  aria-label={`${label} slider`}
  aria-valuenow={value}
  aria-valuemin={min}
  aria-valuemax={max}
  tabIndex={0}
>
```

#### 5. Adicionar thumb hit zone invisível (ANTES ou DEPOIS do bloco `{/* Thumb */}`)
```tsx
{/* Invisible touch hit zone centered on thumb — captures touch events only near thumb */}
<div
  className="absolute touch-none select-none z-10"
  style={{
    left: `${pct}%`,
    width: '60px',
    height: '60px',
    transform: 'translate(-50%, -50%)',
    top: '50%',
  }}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  onTouchCancel={handleTouchEnd}
/>
```

> **Por que 60px?** O thumb visual tem 36px (w-9). A hit zone de 60px dá 12px de clearance em cada lado — facilita o toque sem ser grande demais.

> **Por que `touch-none` só no hit zone?** Porque ao remover do track inteiro, o scroll da página funciona normalmente quando o dedo está fora do thumb. Quando o usuário intencionalamente segura o thumb, o `touch-none` local captura o gesto e impede o scroll apenas nesse momento.

---

## Comportamento Esperado Após o Fix

| Ação do usuário | Antes (bug) | Depois (fix) |
|---|---|---|
| Scroll pela página, dedo passa pelo slider | Slider salta para posição do toque | Nada acontece, scroll continua ✓ |
| Toca no track fora do thumb | Slider salta para a posição | Nada acontece ✓ |
| Toca exatamente no thumb sem mover | Slider não muda (sem onChange no touchStart) | Valor não muda ✓ |
| Toca no thumb e arrasta horizontalmente | Funciona (mas também muda no toque) | Funciona, valor muda com o movimento ✓ |
| Botões +/− | Funcionam | Continuam funcionando ✓ |

---

## Verificação

1. Abrir app em viewport mobile (`preview_resize preset: mobile`)
2. Simular parâmetros, depois rolar até a seção "Ajuste Fino"
3. **Teste 1 — Scroll:** Rolar a página passando pelos sliders → scroll deve funcionar normalmente, sliders não devem mudar
4. **Teste 2 — Track click:** Tocar na área do track (fora do thumb) → valor não deve mudar
5. **Teste 3 — Thumb drag:** Tocar e arrastar o thumb → valor deve mudar com precisão
6. **Teste 4 — Botões:** Clicar em + e − → funcionam normalmente
7. Rodar `npx vitest run` → zero falhas novas

---

## Notas Técnicas

- `getValueFromX` usa `trackRef.current.getBoundingClientRect()` como referência — mantém precisão do cálculo mesmo com a hit zone separada
- `pointer-events-none` no thumb visual não precisa mudar — a hit zone é um elemento irmão sobreposto
- A hit zone usa `z-10` para garantir que fique sobre os tick marks e filled track
- Nenhum teste unitário existente quebra — os sliders mobile não têm testes de interação direta

---

*Criado em: 11/03/2026 | Sessão: Fix TouchSlider Mobile Scroll Bug*
