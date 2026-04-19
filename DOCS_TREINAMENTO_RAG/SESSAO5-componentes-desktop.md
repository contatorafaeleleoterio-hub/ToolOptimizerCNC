# Sessão 5 de 6 — SegmentedGradientBar + Gauge Meia-Lua
## Redesign Visual v0.10.0 — Componentes Visuais Desktop

**Foco:** Implementar `SegmentedGradientBar` e `HalfMoonGauge` como componentes React
**Pré-requisitos:** S4 concluída (`slider-tokens.ts` criado, sliders unificados)

---

## Contexto de Início de Sessão

```
/compact Sessão 5: SegmentedGradientBar + Gauge meia-lua (componentes React desktop).
Contexto: slider-tokens.ts existe, sliders unificados (commit sessão 4).
Protótipo visual: docs/design/PROTOTIPO_V010_MUDANCAS.html
Design system: .interface-design/system.md
Plano: docs/plans/redesign-v0.8.0/SESSAO5-componentes-desktop.md
```

---

## Mudanças Incluídas

1. Criar `src/components/segmented-gradient-bar.tsx` — substitui `ParameterHealthBar`
   - 50 segmentos retangulares (`border-radius: 2px`, height 22px)
   - Cores: RED `#FF4D4D` | ORANGE `#FFA500` | GREEN `#00E676`
   - Lógica simétrica: RED → ORANGE → GREEN ← ORANGE ← RED com 15% warning margin
   - `idealHighlight` zone + cursor branco Apple-style (3px × 28px, glow)
2. Criar `src/components/half-moon-gauge.tsx` — substitui gauge circular existente
   - 41 barras em arco semicircular (−90° a +90°)
   - Barras: 5px × 20px (6px × 26px na zona ideal)
   - Needle: 3px × 110px, branca, `border-radius: 10px`, glow `rgba(255,255,255,0.7)`
   - Mesma lógica RED/ORANGE/GREEN com 15% warning margin
3. Integrar SGB nos painéis desktop (substituir `ParameterHealthBar`)
4. Integrar `HalfMoonGauge` (substituir gauge atual)

---

## Arquivos Críticos

| Arquivo | Papel |
|---------|-------|
| `src/components/segmented-gradient-bar.tsx` | **NOVO** — substitui ParameterHealthBar |
| `src/components/half-moon-gauge.tsx` | **NOVO** — substitui gauge circular |
| `src/components/parameter-health-bar.tsx` | A ser substituído (ler antes) |
| `src/components/fine-tune-panel.tsx` | Integrar SGB |
| Componente gauge existente | A identificar — integrar HalfMoonGauge |

**Referência visual:** `docs/design/PROTOTIPO_V010_MUDANCAS.html`

---

## Verificação

- [ ] SGB renderiza 50 segmentos retangulares (NÃO pills/bolinhas)
- [ ] Cores corretas: RED → ORANGE → GREEN ← ORANGE ← RED
- [ ] Cursor branco posicionado corretamente no valor atual
- [ ] HalfMoonGauge renderiza 41 barras em semicírculo
- [ ] Needle branca com glow aponta para valor correto
- [ ] Ambos integrados nos painéis desktop
- [ ] `npm run test` — testes passam
- [ ] `npm run build` — bundle limpo
- [ ] Commit: `feat: segmented-gradient-bar + half-moon-gauge`

---

## Próxima Sessão (S6)

```
/compact Sessão 6: contraste mobile + SGB/Gauge responsivo + bump v0.10.0.
Contexto: SGB + Gauge implementados (desktop, sessão 5).
Plano: docs/plans/redesign-v0.8.0/SESSAO6-mobile-healthbar.md
```
