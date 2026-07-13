# Redesign Dashboard — Calculadora 80/20

## Contexto
O dashboard principal (`/`) tem ~45-50 elementos visuais simultâneos (8 sliders, 3 gauges, ~12 cards, 5 FormulaCards, 6 badges). Rafael quer: menos poluição, navegação fluida, calculadora enxuta com só inputs de alto impacto (80/20), automação de Vc/fz, manter indicadores como diferencial para operadores inexperientes.

## Diagnóstico (fatos do código)

**O que a exploração confirmou:**
1. **Vc/fz/ae/ap JÁ são 100% automáticos** — `src/engine/recommendations.ts` popula tudo por material+operação+diâmetro com interpolação. O problema não é falta de automação, é que a UI *expõe* tudo de uma vez.
2. **maxTorque não é validado em lugar nenhum** — só serve de escala visual no FormulaCard de torque. Corte limpo.
3. **Nenhum limite de máquina altera os parâmetros de corte** — maxRPM/maxPotencia/maxAvanco/eficiencia só geram avisos/escalas. Podem virar constantes internas com defaults sensatos.
4. **safetyFactor é o único input que muda outputs** (potência/torque) — manter, mas simplificado.
5. Benchmark (FSWizard/HSMAdvisor): o padrão da indústria é **3 passos: Material → Ferramenta → Resultado**, com tudo o mais escondido em "advanced". FSWizard mostra RPM+Feed gigantes no topo e o resto em lista secundária.

## Proposta — Fluxo em 3 passos (wizard horizontal implícito)

### Inputs essenciais (o que fica visível) — 5 inputs
| # | Input | Como fica |
|---|-------|-----------|
| 1 | Material | select (mantém) |
| 2 | Operação | 3 botões Desbaste/Semi/Acab. (mantém) |
| 3 | Tipo de fresa | 3 botões (mantém) |
| 4 | Diâmetro + Z | linha única (diâmetro input + Z botões) |
| 5 | Balanço (altura fixação) | input — necessário p/ L/D (segurança) |

→ Botão **SIMULAR** grande logo abaixo. Tudo pré-preenchido com defaults; usuário troca 2-3 campos e clica. Tempo alvo: <10s.

### O que sai da tela principal (vai para "Modo Avançado" colapsado)
- **4 sliders do Ajuste Fino (Vc, fz, ae, ap)** → colapsados atrás de um toggle "⚙ Ajuste avançado" (fechado por default). Valores recomendados aparecem read-only no resultado; quem quiser mexe.
- **Raio da ponta (toroidal)** → aparece só quando toroidal selecionado, dentro do avançado (default 1.0).
- **safetyFactor** → move para o avançado (default 0.80 já é conservador).
- **Lista de ferramentas salvas** → vira dropdown compacto "Usar ferramenta salva ▾" no topo da seção ferramenta, não lista expandida.

### O que sai do sistema (remoção/constante)
- **maxTorque**: remover da UI e do FormulaCard (só escala visual, zero validação). Fica no engine como constante para quem usar API futura.
- **FormulaCard de Torque (Zona 8)**: remover — torque some do dia a dia do operador.
- **Torque na Data Row (Zona 6)**: remover.
- **maxPotencia/eficiencia**: já são fixos na UI — manter como constantes internas (sem mudança).
- **maxRPM/maxAvanco**: continuam editáveis em `/settings` (avisos úteis), fora da tela principal — sem mudança.

### Results Panel — de 8 zonas para 4
| Zona nova | Conteúdo |
|-----------|----------|
| 1. **Herói** | RPM + Avanço gigantes (font-mono) + badge semáforo integrado. Sliders bidirecionais mantidos (override é valioso), mas visual mais limpo |
| 2. **Ação** | LCD reduzido a 1-2 linhas: alerta + "AÇÃO:" (mantém — é o diferencial p/ inexperientes) |
| 3. **Indicadores** | 3 HalfMoon Gauges mantidos (Avanço, MRR, Saúde) + L/D e CTF como chips coloridos. **Este é o diferencial — fica.** |
| 4. **Detalhes ▾** | Colapsado por default: params (Vc/fz/ap/ae), Potência, Vc Real, MRR numérico, e os 4 FormulaCards restantes (RPM, Avanço, MRR, Potência) |

Resultado: de ~45-50 elementos para **~15-18 visíveis** — corte de ~65%.

### Navegação
- Header ganha nav simples: **Calcular · Favoritos · Histórico · Config** (hoje escondido no SidebarFooter — descoberta ruim).
- Fluxo auto-explicativo: numeração visual sutil nas seções do config ("1 Material → 2 Ferramenta → Simular").

## Arquivos a modificar
- `src/components/config-panel.tsx` — reorganizar em essencial + avançado colapsado
- `src/components/fine-tune-panel.tsx` — mover para dentro do toggle avançado
- `src/components/results-panel.tsx` — 8→4 zonas, seção Detalhes colapsável
- `src/components/formula-card.tsx` / dados — remover card Torque
- `src/App.tsx` + `src/components/sidebar-footer.tsx` — nav no header
- Reusar: `recommendations.ts`, `slider-bounds.ts`, `SegmentedGradientBar`, `HalfMoonGauge`, `BidirectionalSlider` (tudo existente — zero engine novo)
- Testes: ajustar testes de results-panel/config-panel afetados (suite atual: 1052 testes)

## Fases sugeridas (sessões)
1. **S1 — Config Panel enxuto**: essencial + toggle avançado + dropdown ferramentas salvas
2. **S2 — Results Panel 4 zonas**: herói + ação + indicadores + detalhes colapsados; remover torque
3. **S3 — Navegação + polish**: nav header, numeração do fluxo, ajuste de testes, bump MINOR

## Verificação
- `npm run build` + `npm test` + typecheck (quality gates)
- Verificar em `npm run dev`: fluxo completo material→simular <10s, toggle avançado funciona, mobile intacto (redesign é desktop-only nesta fase)
