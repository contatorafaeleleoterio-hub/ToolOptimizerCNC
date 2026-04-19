# Erros Comuns e Prevencao

> Catalogo de erros que ja ocorreram no ToolOptimizer CNC e como preveni-los.
> Commitado no git — visivel a qualquer assistente.
>
> **Como atualizar:** Adicionar durante `iniciar debug` ou `fim de sessao`.
> Consultar ANTES de investigar bugs — pode economizar tempo significativo.

---

## Erros de Teste

| Erro | Causa | Impacto | Prevencao |
|------|-------|---------|-----------|
| `toBeCloseTo(x, 0)` falha inesperada | Margem e ±0.5, nao ±1 | Teste falso-positivo/negativo | Usar `Math.abs(val - expected) <= 1` para margem ±1 |
| Floating-point boundary | `0.075/0.1 = 0.7499...` | Zona errada (amarelo vs verde) | Nunca testar exatamente no boundary, usar margem clara |
| StyledSlider "nao funciona" | StyledSlider e div, nao input | fireEvent.change nao dispara | Testar via botoes +/- com fireEvent.click |
| Store nao recalcula | NO auto-recalc by design | Resultado null apos setParametros | Chamar `getState().calcular()` explicitamente |
| BrowserRouter em testes mobile | MobilePage usa hooks de routing | Crash no teste | Envolver em `<BrowserRouter>` |
| Clone desktop nos testes | Vitest encontra arquivos duplicados | Testes duplicados ou erros | `exclude: ['Sistema_Desktop_Pen_driver/**']` em vitest.config |
| Division by zero edge case | Multiplas divisoes na funcao | Position errada | Testar cada denominador=0 separadamente |

---

## Erros de Build/Deploy

| Erro | Causa | Impacto | Prevencao |
|------|-------|---------|-----------|
| `exit code 1` vitest | Warnings ANSI no stderr | Falso alarme — testes passam | Verificar se "X passed" aparece no output |
| `exit code 1` vite build | Warnings do vite no stderr | Falso alarme — build funciona | Verificar se "built in" aparece no output |
| Preview blank screen | Viewport < 1360px | Pagina nao renderiza | Resize para 1440x900 (desktop only, ADR-003) |
| Tailwind classe purgada | `className={bg-${zone}}` | Cor nao aparece em producao | Usar `style={{}}` com ZONE_RGB lookup |

---

## Erros de Git/Workflow

| Erro | Causa | Impacto | Prevencao |
|------|-------|---------|-----------|
| Commit no worktree nao aparece | Worktree cria branch separada | Codigo nao deployado | Merge explicito para main + push |
| Deploy nao atualiza | Push para branch errada | Site antigo no ar | Verificar `git branch` antes de push |
| `usePageTitle` em teste | Muda document.title globalmente | Testes subsequentes afetados | Limpar no afterEach se necessario |

---

## Erros de Planejamento

| Erro | Causa | Impacto | Prevencao |
|------|-------|---------|-----------|
| Plano com ranges estaticos | Nao mapeou calcularSliderBounds | 5 erros criticos no plano | Map Before Modify — SEMPRE |
| Contagem errada de testes | Estimou sem contar real | Scope errado | Contar testes reais com Grep |
| UI desnecessaria proposta | Nao verificou se Settings existia | Trabalho desperdicado | Mapear codigo antes de propor |

---

## Como Usar Este Documento

1. **Antes de debug:** Ler a tabela de erros relevante
2. **Ao encontrar novo erro:** Propor adicao durante `fim de sessao`
3. **Nao duplicar:** Verificar se o erro ja esta documentado antes de adicionar
4. **Referencia cruzada:** Tabela de armadilhas em `docs/PROXIMA_SESSAO.md` tem versao resumida

---

*FENIX AI System | Erros Comuns | Seed: 09/03/2026*
