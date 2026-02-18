# Story-003: CI/CD GitHub Actions

**Prioridade:** Alta
**Estimativa:** 2h
**Tipo:** devops + docs
**Criada:** 17/02/2026
**Status:** NÃO INICIADA

---

## Contexto

O projeto ToolOptimizer CNC está com 333 testes passando, build limpo e deploy no GitHub Pages.
O próximo passo de maturidade é garantir que **toda contribuição futura** seja validada
automaticamente antes de chegar ao branch main.

Atualmente os quality gates (test + build + typecheck) são executados manualmente antes
de cada commit. Isso funciona mas depende de disciplina humana — um commit descuidado
pode quebrar o deploy.

---

## Objetivo

Implementar um pipeline CI/CD com GitHub Actions que:
1. Rode automaticamente em todo push e pull request para `main`
2. Execute: `npm test` + `npx tsc --noEmit` + `npm run build`
3. Bloqueie merge se qualquer gate falhar
4. Adicione badge de status no README
5. Use cache de `node_modules` para performance

---

## Fase 1: Workflow GitHub Actions (1h)

### Arquivo a criar: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality-gates:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: TypeScript check
        run: npx tsc --noEmit

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
```

### Validação:
- Push para `main` → workflow dispara automaticamente
- Ver aba "Actions" no GitHub
- Confirmar que todos os jobs passam (verde)

---

## Fase 2: Badge no README (15min)

### Arquivo a criar/atualizar: `README.md`

Adicionar no topo:
```markdown
![CI](https://github.com/contatorafaeleleoterio-hub/ToolOptimizerCNC/actions/workflows/ci.yml/badge.svg)
```

---

## Fase 3: Branch Protection (opcional, 15min)

No GitHub → Settings → Branches → Add rule para `main`:
- ☑ Require status checks to pass before merging
- Status check: `quality-gates`
- ☑ Require branches to be up to date

*Nota: requer plano GitHub gratuito (funciona em repositórios públicos).*

---

## Critérios de Aceite

- [ ] `.github/workflows/ci.yml` criado e commitado
- [ ] Workflow dispara automaticamente no push para `main`
- [ ] Todos os 3 gates passam: typecheck + test + build
- [ ] Badge verde visível no README
- [ ] Cache de node_modules funcionando (segunda execução mais rápida)

---

## Commits Sugeridos

1. `ci: add GitHub Actions workflow with test, typecheck and build gates`
2. `docs: add CI badge to README`

---

**Depende de:** Story-001 ✅, Story-002 (fase 1) ✅
**Próxima story:** Story-004 SEO Schema.org + meta tags
