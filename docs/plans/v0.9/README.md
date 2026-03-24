# Planos de Implementação — Dashboard v0.9

> **Status geral:** ⬜ Aguardando detalhamento técnico
> **Especificação fonte:** `docs/plans/IMPLEMENTACOES_DASHBOARD_v0.9.md`

---

## Ordem de Implementação Sugerida

A ordem considera dependências entre itens e agrupa mudanças que tocam os mesmos arquivos.

### Fase A — Inputs (sem dependências)
| # | Plano | Complexidade |
|---|-------|-------------|
| 01 | [Input Livre (D, R, H)](PLAN-v0.9-01-input-livre.md) | Média |
| 02 | [Arestas Z → 4 Botões](PLAN-v0.9-02-arestas-botoes.md) | Baixa |

### Fase B — Favoritos + Safety Factor
| # | Plano | Complexidade |
|---|-------|-------------|
| 03 | [Favoritar Simulação](PLAN-v0.9-03-favoritar-simulacao.md) | Média |
| 07 | [Slider Safety Factor](PLAN-v0.9-07-slider-safety-factor.md) | Baixa |

### Fase C — Redesign Visual (maior risco)
| # | Plano | Complexidade |
|---|-------|-------------|
| 05 | [Redesign Visor HMI](PLAN-v0.9-05-redesign-visor-hmi.md) | Alta |
| 08 | [Rodapé Coluna Esquerda](PLAN-v0.9-08-rodape-coluna-esquerda.md) | Média |

### Fase D — Limpeza (depende de Fase A)
| # | Plano | Complexidade |
|---|-------|-------------|
| 09 | [Config: Remover Kc + Gestão Ferramentas](PLAN-v0.9-09-config-ferramentas.md) | Média |

---

## Grafo de Dependências

```
01 (Input Livre) ──────────────────→ 09 (Config: remover listas)
03 (Favoritar) ────────────────────→ 08 (Rodapé: exibe favoritos)
02, 07 ────────────────────────────→ (independentes)
05 (Visor HMI) ────────────────────→ (independente, mas coordenar com 03)
```

---

## Legenda de Status

- ⬜ Aguardando detalhamento
- 🔧 Detalhamento em progresso
- 📋 Pronto para implementar
- 🚧 Em implementação
- ✅ Concluído
