# Protocolo de Decisao

> Define quando e como registrar decisoes tecnicas e arquiteturais.

---

## Quando Registrar (ADR Completo)

Criar ADR em `docs/architecture/` quando:
- Mudanca arquitetural (novo padrao, novo componente compartilhado)
- Adicao ou remocao de dependencia
- Feature descartada com justificativa
- Paradigma alterado (ex: mudar de bidirecional para unidirecional)
- Adocao de framework ou ferramenta

---

## Quando NAO Registrar ADR

- UI tweaks (cor, espaçamento, texto)
- Adicao de testes
- Atualizacao de documentacao
- Bugfix simples
- Refactoring sem mudanca de comportamento

Para esses casos: anotar na session note em `docs/sessions/`.

---

## Formato ADR

Seguir template dos ADRs existentes (modelo: `ADR-004-adocao-synkra-aios.md`):

```markdown
# ADR-NNN: Titulo da Decisao

**Status:** Proposta | Aceita | Rejeitada | Substituida
**Data:** YYYY-MM-DD

## Contexto
[Por que esta decisao e necessaria]

## Decisao
[O que foi decidido]

## Alternativas Consideradas
[Outras opcoes e por que foram descartadas]

## Consequencias
### Positivas
- [beneficio 1]
### Negativas
- [trade-off 1]
```

---

## Processo

1. Identificar que uma decisao esta sendo tomada
2. Avaliar se merece ADR completo ou registro leve
3. Se ADR:
   - Usar proximo numero sequencial
   - Preencher template acima
   - Salvar em `docs/architecture/ADR-NNN-descricao.md`
   - Commit: `docs: ADR-NNN descricao`
4. Se registro leve:
   - Anotar na session note com formato: "Decisao: [titulo] — [justificativa]"

---

## Exemplos do Projeto

| Decisao | Tipo | Referencia |
|---------|------|------------|
| Stack React+TS+Vite | ADR | ADR-001 |
| Tailwind sem CSS Modules | ADR | ADR-002 |
| Desktop/Mobile separados | ADR | ADR-003 |
| Adocao Synkra AIOS | ADR | ADR-004 |
| Electron para desktop | ADR | ADR-005 |
| SemVer estrategia | ADR | ADR-006 |
| Login Google pausado | Leve | story-006 notes |
| Export PDF descartado | Leve | BACKLOG_IMPLEMENTACAO.md |
| Indicadores unidirecionais | Leve | session 07/03 notes |

---

## Referencia

- ADRs existentes: `docs/architecture/ADR-*.md`
- Template: `docs/architecture/ADR-004-adocao-synkra-aios.md`

---

*FENIX AI System | Protocolo de Decisao*
