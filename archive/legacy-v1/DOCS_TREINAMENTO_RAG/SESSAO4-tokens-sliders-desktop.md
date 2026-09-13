# Sessão 4 de 6 — slider-tokens.ts + Unificar Sliders
## Redesign Visual v0.10.0 — Tokens e Padronização

**Foco:** Criar `slider-tokens.ts` e unificar `StyledSlider` → padrão `BidirectionalSlider`
**Pré-requisitos:** S3 concluída (protótipos HTML aprovados)

---

## Contexto de Início de Sessão

```
/compact Sessão 4: slider-tokens.ts + unificar sliders.
Plano: docs/plans/redesign-v0.8.0/SESSAO4-tokens-sliders-desktop.md
Design system: .interface-design/system.md
```

---

## Mudanças Incluídas

1. Criar `src/components/slider-tokens.ts` — mapa estático `color → { hex, rgb }`
2. Remover prop `rgb` de `BidirectionalSlider` — usar token map interno
3. Refatorar `StyledSlider` — remover `rgb` + adicionar tick marks, botões ±, exibição de percentagem (paridade visual com BidirectionalSlider)
4. Atualizar callers — remover `rgb={...}` em todos os usos de ambos os sliders

---

## Arquivos Críticos

| Arquivo | Papel |
|---------|-------|
| `src/components/slider-tokens.ts` | **NOVO** — mapa de tokens |
| `src/components/bidirectional-slider.tsx` | Refatorar — trocar `rgb` inline por tokens |
| `src/components/styled-slider.tsx` | Refatorar + upgrade visual |
| `src/components/fine-tune-panel.tsx` | Caller — remover `rgb` |
| `src/components/config-panel.tsx` | Caller — remover `rgb` |
| `src/pages/settings-page.tsx` | Caller — remover `rgb` |
| `src/components/shared-result-parts.tsx` | Caller `BidirectionalSlider` — remover `rgb` |

---

## Verificação

- [ ] Zero ocorrências de `rgb={` nos callers
- [ ] Zero classes dinâmicas `text-${color}` (usar lookup estático)
- [ ] `StyledSlider` visualmente equivalente a `BidirectionalSlider`
- [ ] `npm run test` — tudo passa
- [ ] `npm run build` — zero erros TS, bundle limpo
- [ ] Commit: `feat: slider-tokens.ts + unify sliders — remove rgb prop (S4)`

---

## Próxima Sessão (S5)

```
/compact Sessão 5: SegmentedGradientBar + Gauge meia-lua (componentes React desktop).
Contexto: slider-tokens.ts existe, sliders unificados (commit sessão 4).
Protótipo visual: docs/design/PROTOTIPO_V010_MUDANCAS.html
Plano: docs/plans/redesign-v0.8.0/SESSAO5-componentes-desktop.md
```
