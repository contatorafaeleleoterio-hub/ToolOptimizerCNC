# Aprendizados Arquiteturais

> Padroes que funcionam e anti-padroes identificados no ToolOptimizer CNC.
> Commitado no git — visivel a qualquer assistente.
>
> **Como atualizar:** Usar comando `registrar aprendizado` ou durante `fim de sessao`.

---

## Padroes que Funcionam

### calcularSliderBounds() como infraestrutura
- **O que:** Funcao em `src/engine/slider-bounds.ts` que calcula bounds dinamicos
- **Por que funciona:** Elimina necessidade de ranges estaticos no store, adapta-se automaticamente a material/operacao/ferramenta
- **Licao:** Antes de propor nova infraestrutura, verificar se ja existe funcao que resolve o problema

### UnidirectionalBar compartilhado
- **O que:** Componente unico para os 4 indicadores de saude (Vc, fz, ae, ap)
- **Por que funciona:** Menos codigo (~345 linhas vs ~500+), comportamento consistente
- **Licao:** Componentes compartilhados com props > componentes individuais duplicados

### Engine independence
- **O que:** Calculos em `src/engine/` nao importam React, store ou UI
- **Por que funciona:** Testavel isoladamente, reutilizavel, sem efeitos colaterais
- **ADR:** ADR-001

### Store no-auto-recalc
- **O que:** set* zera resultado mas NAO chama calcular(). Usuario clica "Simular"
- **Por que funciona:** Controle explicito, sem recalculos desnecessarios, UX previsivel
- **Excecao:** `ajustarParametros()` recalcula imediatamente (fine-tune em tempo real)

### ZONE_RGB lookup estatico
- **O que:** Mapa fixo de zonas para valores RGB, usado com `style={{}}`
- **Por que funciona:** Evita purge do Tailwind em classes dinamicas, cores sempre funcionam em producao
- **Alternativa descartada:** `className={bg-${zone}}` — purgado pelo Tailwind v4

---

## Anti-padroes Identificados

### Ranges estaticos no store
- **Problema:** Plano original propunha `parameterRanges` hardcoded no store
- **Por que falhou:** `calcularSliderBounds()` ja existia e era dinamico
- **Resultado:** 5 erros criticos no plano, resolvidos com zero mudancas no store
- **Regra:** NUNCA propor novos campos no store sem verificar engine/ primeiro

### Interpolacao Tailwind em classes dinamicas
- **Problema:** `className={text-${color}}` compila no dev mas falha em producao
- **Causa:** Tailwind v4 purga classes que nao encontra como strings literais
- **Solucao:** Usar `style={{}}` com valores calculados ou ZONE_RGB lookup

### Abstraccoes prematuras
- **Problema:** Criar FzHealthBar, AeHealthBar, ApHealthBar separados
- **Melhor:** Componente compartilhado com props (UnidirectionalBar)
- **Regra:** Tres linhas similares > abstracao prematura. So abstrair quando ha 3+ usos confirmados

### Planos nao validados contra codebase
- **Problema:** Plano externo (GPT/outro assistente) tinha 5 erros criticos
- **Causa:** Plano assumiu coisas que nao existiam ou ignorou coisas que existiam
- **Regra:** SEMPRE auditar plano contra codigo real antes de executar. Usar agentes Explore

---

## Decisoes Arquiteturais Ativas

| ADR | Decisao | Status |
|-----|---------|--------|
| ADR-001 | Stack React+TS+Vite+Zustand+Tailwind | Aceita |
| ADR-002 | Tailwind v4 sem CSS Modules | Aceita |
| ADR-003 | Desktop/Mobile separados (min-width 1360px) | Aceita |
| ADR-004 | Synkra AIOS Framework | Aceita |
| ADR-005 | Electron para build desktop | Aceita |
| ADR-006 | SemVer para versionamento | Aceita |
| ADR-007 | FENIX AI Engineering System | Aceita |

---

## Referencia

- ADRs: `docs/architecture/ADR-*.md`
- Padroes de codigo: `.claude/.../memory/patterns.md`
- Licoes aprendidas: `.claude/.../memory/lessons-learned.md`

---

*FENIX AI System | Aprendizados Arquiteturais | Seed: 09/03/2026*
