# PLAN: Fix BugReportModal — Card Semi-Transparente + UX Issues

> **Status:** Aguardando implementação
> **Criado:** 11/03/2026
> **Arquivo a modificar:** `src/components/bug-report-button.tsx` (único)
> **Versão após fix:** v0.5.0 → v0.5.1 (patch)

---

## Contexto

Ao clicar em "Reportar Bug", o modal abre mas o card interno é **semi-transparente** — a UI da aplicação (sliders, ae=5.00 em ciano) aparece visível através do modal, dando aparência de bug. A causa raiz é o CSS token `bg-surface-dark` que mapeia para `rgba(22, 27, 34, 0.7)` — apenas 70% de opacidade. Além disso, existem 2 issues menores de UX identificados.

---

## O Que Acontece ao Clicar "Reportar Bug"

1. Modal abre com textarea + checkbox
2. Usuário preenche descrição e clica "Enviar por E-mail"
3. O app monta URL `mailto:` com:
   - Subject: `[Bug Report] ToolOptimizer CNC v0.5.0`
   - Body: descrição + timestamp + navegador (User-Agent) + resolução de tela + (opcional) estado da simulação
4. `window.location.href = mailto:contatorafaeleleoterio@gmail.com?subject=...&body=...`
5. Isso abre o **cliente de e-mail do usuário** (Gmail, Outlook, etc.) com o e-mail pré-preenchido
6. O usuário deve clicar **"Enviar"** no cliente de e-mail — **não é enviado automaticamente pelo app**
7. O e-mail chega no **Gmail do Rafael** (`contatorafaeleleoterio@gmail.com`)

---

## Bugs Identificados

### Bug #1 — CRÍTICO: Card semi-transparente (o "erro" visível na screenshot)

**Causa:** `bg-surface-dark` → CSS var `--color-surface-dark: rgba(22, 27, 34, 0.7)` (70% opaco)
- O card do modal deixa a app aparecer através dele
- Outros modais (CorrectionModal) sofrem do mesmo problema mas são menos evidentes

**Fix:**
```tsx
// ANTES (linha ~90):
<div className="w-full max-w-md rounded-2xl bg-surface-dark border border-white/10 shadow-glass p-6 mx-4 flex flex-col gap-4">

// DEPOIS:
<div
  className="w-full max-w-md rounded-2xl border border-white/10 shadow-glass p-6 mx-4 flex flex-col gap-4"
  style={{ backgroundColor: '#161B22' }}
>
```

---

### Bug #2 — MODERADO: Textarea sem limite de caracteres

**Causa:** URL `mailto:` tem limite ~2000 chars. `navigator.userAgent` ocupa ~100-150 chars + estado da app ~500 chars. Com descrição longa, mailto silenciosamente falha ou trunca.

**Fix:**
```tsx
// ANTES:
<textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="..."
  rows={4}
  className="..."
/>

// DEPOIS:
<div className="flex flex-col gap-1">
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="..."
    rows={4}
    maxLength={500}
    className="..."
  />
  <span className="text-right text-[10px] text-gray-600 font-mono">
    {description.length}/500
  </span>
</div>
```

---

### Bug #3 — MENOR: `onClose()` chamado antes do `mailto:` disparar

**Causa:** `window.location.href = mailto:...` e `onClose()` rodam síncronos. Em alguns sistemas, modal fecha antes do cliente de e-mail abrir.

**Fix:**
```tsx
// ANTES (linhas ~76-80):
window.location.href = `mailto:${BUG_EMAIL}?subject=${subject}&body=${body}`;
track('Bug_Reportado');
onClose();

// DEPOIS:
track('Bug_Reportado');
onClose();
setTimeout(() => {
  window.location.href = `mailto:${BUG_EMAIL}?subject=${subject}&body=${body}`;
}, 50);
```

---

## Testes a Atualizar/Adicionar

Arquivo: `tests/components/bug-report-button.test.tsx`

- Adicionar teste: card do modal tem `style` com `backgroundColor: '#161B22'`
- Adicionar teste: textarea tem `maxLength={500}`
- Adicionar teste: contador "0/500" está presente no DOM

---

## Checklist de Implementação

```bash
# 1. Editar src/components/bug-report-button.tsx (3 fixes acima)

# 2. Atualizar tests/components/bug-report-button.test.tsx

# 3. Verificar testes
npx vitest run tests/components/bug-report-button.test.tsx

# 4. TypeScript limpo
npx tsc --noEmit

# 5. Testes gerais
npx vitest run

# 6. Build
npx vite build

# 7. Visual: npm run dev → clicar "Reportar Bug" → verificar card opaco

# 8. Commit
git add src/components/bug-report-button.tsx tests/components/bug-report-button.test.tsx
git commit -m "fix(bug-report): opaque modal card background + textarea maxLength + send order"

# 9. Version bump: package.json 0.5.0 → 0.5.1
git add package.json
git commit -m "chore: bump version to 0.5.1"

# 10. Push
git push origin main

# 11. Atualizar PROXIMA_SESSAO.md + timeline + MEMORY.md + docs
```

---

## Arquivos Envolvidos

| Arquivo | Ação |
|---------|------|
| `src/components/bug-report-button.tsx` | Aplicar 3 fixes |
| `tests/components/bug-report-button.test.tsx` | Adicionar 3 testes |

---

*Plano criado em 11/03/2026 — sessão de diagnóstico*
