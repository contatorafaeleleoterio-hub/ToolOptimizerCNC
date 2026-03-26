# Protocolo de Sessões — Redesign Visual v0.10.0

**Total:** 4 sessões | ~62 pontos
**Estimativa de contexto por sessão:** ~80-96K tokens
**Plano aprovado:** 26/03/2026
**Arquivos de detalhe:** `SESSAO3-*.md` → `SESSAO6-*.md`

---

## Resumo das Mudanças

| ID | Mudança | Sessão | Prioridade |
|----|---------|--------|-----------|
| A | Correções de tokens (rgba → mapas estáticos, spacing 4px) | 4+5 | 1 |
| B | Mobile: Fusão "Config Corte" + "Ajuste Fino" em accordion único | 6 | 3 |
| C | ParameterHealthBar: mover acima do slider + redesign equalizer | 5+6 | 3 |
| D | Legenda de siglas: Vc/fz/ae/ap com texto explicativo | 5+6 | 2 |
| E | Botão ℹ explícito por parâmetro com drawer educacional | 5+6 | 2 |

---

## Mapa de Sessões

```
Sessão 3  →  Protótipo HTML (READ-ONLY src/)
Sessão 4  →  slider-tokens.ts + Sliders desktop
Sessão 5  →  Desktop: shared-result-parts / fine-tune / config / results
Sessão 6  →  Mobile: HealthBar redesign + Fusão + botão ℹ → v0.10.0
```

---

## Regras de Execução

1. Cada sessão começa com `/compact [foco da sessão]` ou sessão nova
2. Ao final de cada sessão: `npm run test` + `npm run build` antes do commit
3. Commit parcial obrigatório após Sessão 4 e Sessão 5
4. Sessão 6 = commit final + bump de versão para `0.10.0`
5. O protótipo HTML (Sessão 3) deve ser aprovado por Rafael ANTES de iniciar Sessão 4
