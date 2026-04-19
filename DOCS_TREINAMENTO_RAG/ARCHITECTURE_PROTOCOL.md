# Protocolo de Arquitetura

> Define quando e como analisar impacto arquitetural e evoluir a arquitetura do projeto.

---

## Quando Usar

- Feature tocando 3 ou mais arquivos
- Mudanca no store (Zustand)
- Nova dependencia ou remocao de dependencia
- Novo componente compartilhado
- Mudanca em data structures (types)
- Refactoring significativo

---

## Processo de Analise

### 1. Mapear Codigo Existente
- Usar Glob/Grep para encontrar todas as referencias
- Ler os arquivos envolvidos completamente
- Identificar dependencias e acoplamento

### 2. Consultar ADRs Anteriores
- Verificar `docs/architecture/ADR-*.md` para decisoes que se aplicam
- ADRs ativos do projeto:
  - ADR-001: Stack tecnologica (React + TS + Vite + Zustand + Tailwind)
  - ADR-002: Estrategia CSS (Tailwind v4, sem CSS Modules)
  - ADR-003: Separacao desktop/mobile
  - ADR-004: Adocao Synkra AIOS
  - ADR-005: Electron desktop build
  - ADR-006: Estrategia versionamento (SemVer)

### 3. Verificar Padroes do Projeto
- **Engine independence:** calculos em `src/engine/` nao dependem de UI
- **No CSS Modules:** usar Tailwind + style={{}} para dinamicos
- **Store no-auto-recalc:** set* zera resultado, usuario clica Simular
- **calcularSliderBounds():** bounds dinamicos — nunca hardcodar ranges
- **ZONE_RGB:** lookup estatico para cores dinamicas

### 4. Produzir Analise
Formato:
```
## Analise Arquitetural: [titulo]

**Componentes afetados:** [lista]
**ADRs relevantes:** [lista]
**Riscos:** [lista]
**Recomendacao:** [abordagem proposta]
**ADR necessario:** sim/nao
```

---

## Criar ADR

Se a mudanca merece ADR:
1. Usar proximo numero sequencial (`ADR-007`, `ADR-008`...)
2. Seguir template de `docs/architecture/ADR-004-adocao-synkra-aios.md`
3. Campos: Status, Data, Contexto, Decisao, Alternativas, Consequencias
4. Commitar com `docs: ADR-NNN descricao`

---

## Referencia

- ADRs: `docs/architecture/ADR-*.md`
- Framework AIOS: `docs/AIOS_INTEGRATION.md`
- Padroes: `docs/ai/memory/ARCHITECTURE_LEARNINGS.md`

---

*FENIX AI System | Protocolo de Arquitetura*
