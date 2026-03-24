# PLAN v0.9-08 — Rodapé Fixo da Coluna Esquerda

> **Status:** ⬜ Aguardando detalhamento
> **Complexidade:** Média
> **Versão alvo:** v0.9.3

---

## Objetivo

Adicionar rodapé fixo na parte inferior da coluna de inputs (estilo Claude app) com navegação rápida: Favoritos, Histórico, Config e versão do app.

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/components/config-panel.tsx` | Adicionar rodapé fixo no bottom da coluna |
| `src/App.tsx` | Possível ajuste de layout para acomodar rodapé fixo |

---

## Estratégia Técnica

### Layout do Rodapé

```
┌──────────────────────────────────────┐
│  ⭐  Favoritos          (3 salvas)   │  → Modal/painel de favoritos
│  🕐  Histórico                       │  → Navega /history
├──────────────────────────────────────┤
│  👤  Operador              ⚙        │  → Placeholder + navega /settings
│      v0.9.x                         │  → Versão do package.json
└──────────────────────────────────────┘
```

### Abordagem

1. **Posição fixa:** `sticky bottom-0` ou `mt-auto` no flex container da coluna esquerda
2. **Favoritos:** Abre modal/panel listando `validatedSimulations.filter(v => v.favorited)`
   - Cada item: nome da ferramenta, material, RPM, Avanço
   - Ações: carregar (restaura params), excluir
3. **Histórico:** `navigate('/history')` — link simples
4. **Operador:** Placeholder provisório — futuro login Google
5. **Config (⚙):** `navigate('/settings')` — atalho rápido
6. **Versão:** Ler de `import.meta.env` ou hardcoded do package.json via Vite define
7. **Visual:** Glassmorphic card com `border-t border-white/10`, backdrop blur

---

## Dependências

- **Item #3** (Favoritar) deve ser implementado antes — o rodapé exibe a lista de favoritos
- Depende de `validatedSimulations` com campo `favorited`

---

## Riscos / Cuidados

- Layout: coluna esquerda precisa ter `flex flex-col` com conteúdo scrollável e rodapé fixo
- Não empurrar conteúdo para fora da viewport — rodapé deve ser compacto (~80-100px)
- Versão do app: usar `__APP_VERSION__` via Vite define (verificar se já existe)
- Modal de favoritos: avaliar se é modal overlay ou panel inline
- "Mapa do Sistema" NÃO aparece aqui — exclusivo admin via `/admin`
