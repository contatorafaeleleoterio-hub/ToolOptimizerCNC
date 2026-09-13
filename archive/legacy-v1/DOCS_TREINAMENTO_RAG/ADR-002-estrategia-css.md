# ADR-002: Tailwind v4 como Estratégia CSS

**Status:** Aceito
**Data:** 15/02/2026
**Autores:** Rafael Eleotério

---

## Contexto

Durante o planejamento AIOS, foi proposta migração para CSS Modules (Story-001 original). Após análise detalhada, verificou-se que a proposta era baseada em premissas incorretas sobre o estado do código.

## Decisão

Manter Tailwind CSS v4 utility classes com `@theme` tokens. **NÃO** migrar para CSS Modules.

## Análise

| Critério | Tailwind v4 | CSS Modules |
|----------|------------|-------------|
| Isolamento | Utility classes = zero conflitos por design | Scoped por arquivo |
| Bundle | 10KB gzip (tree-shaking automático) | Similar ou maior |
| DX | Estilos colocalizados com JSX | Arquivo separado por componente |
| Design tokens | @theme nativo, sem config | CSS Variables manual |
| Complexidade | Zero config (plugin Vite) | Import de .module.css + tipos TS |

## Arquitetura CSS Atual

```
src/index.css
  ├── @import "tailwindcss"
  ├── @theme { design tokens }
  ├── body { global resets }
  └── .select-chevron { único utilitário custom }

Componentes → Tailwind utility classes direto no className
Valores dinâmicos → inline style={{ }} (cores calculadas, widths)
```

## Consequências

- Linhas de className podem ser longas (trade-off aceitável)
- Sem arquivos .css por componente (menos arquivos, mais simples)
- Design tokens centralizados em um único lugar
- CSS Modules foi proposta cancelada — Story-001 reescrita como Limpeza Técnica
