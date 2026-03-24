# PLAN v0.9-05 — Redesign Visor Central (Padrão Industrial HMI)

> **Status:** ⬜ Aguardando detalhamento
> **Complexidade:** Alta
> **Versão alvo:** v0.9.3

---

## Objetivo

Reorganizar o painel de resultados (coluna direita) seguindo hierarquia HMI industrial (Siemens Sinumerik, Heidenhain, Sandvik CoroGuide). O operador lê RPM e Avanço em < 1 segundo. Alertas ficam em zona dedicada, nunca misturados com métricas. Inclui item #6 (alertas/banners em zona dedicada).

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/components/results-panel.tsx` | Reestruturação completa das zonas de exibição |
| `src/components/shared-result-parts.tsx` | Possível ajuste em `BigNumber`, `SafetyBadge`, `ProgressCard` |

---

## Estratégia Técnica

### Nova Hierarquia de Zonas (de cima para baixo)

**Zona 1 — Valores Principais (RPM + Avanço)**
- Safety Badge sobe para o topo (atualmente está entre gauges e BigNumbers)
- RPM e Avanço com BigNumber — mantém sliders bidirecionais
- Maior destaque visual — são os valores que o operador configura na máquina

**Zona 2 — Métricas Secundárias (4 colunas compactas)**
- Potência, Vc Real, Torque, MRR — em grid 4 colunas
- Cards compactos (reutilizar `ProgressCard` ou `MetricCell`)
- Visíveis mas sem competir com Zona 1

**Zona 3 — Indicadores de Saúde (Gauges)**
- Feed Efficiency, MRR Productivity, Tool Health
- Mover gauges para abaixo das métricas (atualmente estão no topo)

**Zona 4 — Alertas e Avisos (Zona Dedicada)**
- Banner "Parâmetros Alterados — Clique em Simular"
- Avisos de segurança (L/D, vibração, potência)
- Todos os warnings unificados aqui — nunca entre métricas

**Zona 5 — Fórmulas (Recolhidas)**
- FormulaCards mantém comportamento atual (expandir/recolher)
- Recolhidas por padrão — uso educacional, não produção

### Abordagem

1. **Reorganizar JSX** do results-panel sem criar novos componentes — apenas mover blocos
2. **Safety Badge** mover de linha ~108 para dentro da Zona 1 (acima dos BigNumbers)
3. **Gauges** mover de linhas 67-93 para Zona 3 (abaixo das métricas)
4. **WarningsSection** + Reset Feedback → agrupar em Zona 4
5. **Adicionar Torque e MRR** como métricas visíveis na Zona 2 (hoje MRR é benchmark no gauge)

---

## Dependências

- **Nenhuma de entrada** — pode ser implementado independentemente
- **Item #3** (Favoritar) pode colocar o botão ⭐ na Zona 1 — coordenar posição

---

## Riscos / Cuidados

- Maior item da lista — maior risco de regressão visual
- Testes de snapshot/visual podem quebrar — não há snapshots no projeto, risco baixo
- Manter responsividade para min-width 1360px (desktop only)
- Animações existentes (pulse, gaugeRoll, fadeInUp) devem continuar funcionando nas novas posições
- Não alterar lógica de cálculo — apenas reorganização visual
- Testar com todos os estados: sem resultado, resultado verde, amarelo, vermelho, bloqueado
