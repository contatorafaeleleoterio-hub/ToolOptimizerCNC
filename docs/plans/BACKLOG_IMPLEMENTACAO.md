# Backlog de Implementação — ToolOptimizer CNC

> **Última atualização:** 13/03/2026
> **Versão atual:** v0.5.0
> **Total de planos pendentes:** 5

Esta lista define a ordem de implementação dos planos criados e ainda não executados.
A ordem garante estabilidade progressiva: bugs corrigidos antes de features, features antes de polish.

---

## Ordem de Implementação

| # | Plano | Tipo | Versão Alvo | Escopo | Arquivos Modificados |
|---|-------|------|-------------|--------|----------------------|
| 1 | [Fix BugReportModal](#1-fix-bugreportmodal) | 🐛 Bug Fix | v0.5.1 | 2 arquivos | `bug-report-button.tsx` + teste |
| 2 | [Fix TouchSlider Mobile](#2-fix-touchslider-mobile) | 🐛 Bug Fix | v0.5.2 | 1 arquivo | `mobile-fine-tune-section.tsx` |
| 3 | [Unificar Indicadores Ajuste Fino](#3-unificar-indicadores-ajuste-fino) | ✨ Feature | v0.5.3 | 2 arquivos | `parameter-health-bar.tsx` + teste |
| 4 | [Favicon e Ícones](#4-favicon-e-icones) | 💄 Polish | v0.5.4 | 4+ arquivos | `index.html`, `public/`, scripts, Electron |
| 5 | [Seguranca Cibernetica](#5-seguranca-cibernetica) | 🔒 Security | v0.5.5 | 6 arquivos + 1 novo + config manual | headers, CI, stores, Plausible, GitHub/CF |

---

## Detalhes

### 1. Fix BugReportModal

**Arquivo do plano:** `PLAN_Fix_BugReportModal.md`
**Prioridade:** ALTA — bug já deployado em produção, visível ao usuário

**Problema:** Modal do BugReport abre com card semi-transparente (fundo da app aparece através dele). Dois problemas menores adicionais: textarea sem limite de caracteres (pode quebrar o mailto) e `onClose()` chamado antes do mailto disparar.

**Três fixes no mesmo arquivo:**
1. `bg-surface-dark` → `style={{ backgroundColor: '#161B22' }}` (opacidade 100%)
2. `<textarea maxLength={500}>` + contador "X/500" visível
3. Reordenar: `track() → onClose() → setTimeout(() => mailto, 50)`

**Testes:** Adicionar 3 casos em `bug-report-button.test.tsx`

---

### 2. Fix TouchSlider Mobile

**Arquivo do plano:** `PLAN_Fix_TouchSlider_Mobile.md`
**Prioridade:** MÉDIA-ALTA — UX bug que causa ajustes acidentais ao rolar a página no mobile

**Problema:** Qualquer toque no track do slider muda o valor imediatamente, inclusive durante scroll da página. O correto é: valor só muda ao tocar e arrastar o thumb.

**Solução em 1 arquivo (`mobile-fine-tune-section.tsx`):**
- Remover `onChange()` do `handleTouchStart` (não muda no toque, só no drag)
- Mover `onTouchStart/Move/End` do track inteiro para um **hit zone invisível** de 60×60px centrado no thumb
- Remover `touch-none` do track (re-habilita scroll da página quando fora do thumb)

**Sem novos testes** — sliders mobile não têm testes de interação direta

---

### 3. Unificar Indicadores Ajuste Fino

**Arquivo do plano:** `PLAN_Unificar_Indicadores_Ajuste_Fino.md`
**Prioridade:** MÉDIA — consistência visual, feature sem urgência de produção

**Problema:** Vc usa barra unidirecional (esquerda→direita, tick de recomendado), mas fz/ae/ap ainda usam `ActiveBar` bidirecional (centro→lados), padrão inconsistente e menos intuitivo.

**Solução em 2 arquivos:**
- Criar `computeFzByValue`, `computeAeByValue`, `computeApByValue` (pattern igual ao `computeVcByValue`)
- Criar `FzHealthBar`, `AeHealthBar`, `ApHealthBar` (template igual ao `VcHealthBar`)
- Usar `calcularSliderBounds()` para bounds dinâmicos (sem hardcode, sem mudança no store)
- Remover `ActiveBar`, `computeFzPosition`, `computeAePosition`, `computeApPosition`
- Manter `InactiveBar` (fz precisa de simulação para ativar)

**Testes:** Substituir testes bidirecionais por testes das novas funções unidirecionais

---

### 4. Favicon e Ícones

**Arquivo do plano:** `PLAN_Favicon_Icons.md`
**Prioridade:** BAIXA — polish/identidade visual, zero impacto em lógica de negócio

**Problema:** App web e Electron não têm favicon configurado. `main.cjs` já referencia `build/icon.ico` mas o arquivo não existe.

**Solução:**
- Instalar devDeps: `sharp` + `png-to-ico`
- Criar `scripts/generate-icons.mjs` — lê `logo_p_favcon.png`, gera todos os tamanhos
- Adicionar tags `<link rel="icon">` no `index.html` (web) e `Sistema_Desktop_Pen_driver/index.html`
- Atualizar `electron-builder.json` com `win.icon` e `build/**/*` em `files`
- Rodar: `npm run icons`

**Sem testes necessários** — geração de arquivos estáticos

---

## Rationale da Ordem

```
v0.5.0 (atual)
    ↓ [bug crítico em prod]
v0.5.1 — Fix BugReportModal (menor escopo, maior urgência)
    ↓ [bug UX mobile]
v0.5.2 — Fix TouchSlider Mobile (1 arquivo, sem regressão)
    ↓ [consistência visual]
v0.5.3 — Unificar Indicadores (feature, requer base estável)
    ↓ [polish/infra]
v0.5.4 — Favicon + Ícones (deps externas, toca web + desktop)
```

### 5. Seguranca Cibernetica

**Arquivo do plano:** `PLAN_Seguranca_Cibernetica.md`
**Prioridade:** ALTA — mas depende de acoes manuais (GitHub privado, Cloudflare config)

**Problema:** Auditoria identificou gaps: CSP header faltando, dependencias com vulnerabilidades, importSettings() sem validacao de ranges, repositorio publico expondo codigo-fonte, script Plausible inativo carregando CDN desnecessario.

**7 fases de implementacao:**
1. Repo privado + remover GitHub Pages (manual + deletar deploy.yml)
2. CSP header em `public/_headers`
3. npm audit no CI + Dependabot (`ci.yml` + novo `dependabot.yml`)
4. Validacao de ranges em `importSettings()` e `importHistory()`
5. Remover script Plausible inativo (`index.html` + `use-plausible.ts`)
6. Cloudflare: Bot Fight Mode + Rate Limiting (manual no dashboard)
7. GitHub: Branch protection + Dependabot alerts (manual)

**Testes:** Adicionar testes para importacao com valores invalidos

---

## Rationale da Ordem

```
v0.5.0 (atual)
    ↓ [bug crítico em prod]
v0.5.1 — Fix BugReportModal (menor escopo, maior urgência)
    ↓ [bug UX mobile]
v0.5.2 — Fix TouchSlider Mobile (1 arquivo, sem regressão)
    ↓ [consistência visual]
v0.5.3 — Unificar Indicadores (feature, requer base estável)
    ↓ [polish/infra]
v0.5.4 — Favicon + Ícones (deps externas, toca web + desktop)
    ↓ [seguranca]
v0.5.5 — Seguranca Cibernetica (headers, CI, stores, config manual)
```

**Regras aplicadas:**
- Bugs antes de features (não acumular dívida técnica visível)
- Menor escopo antes de maior escopo (reduz risco de regressão)
- Mudanças de infra (deps externas) por último
- Seguranca apos estabilidade funcional (repo privado pode ser feito a qualquer momento)
- Cada plano é independente — sem dependências cruzadas entre eles
