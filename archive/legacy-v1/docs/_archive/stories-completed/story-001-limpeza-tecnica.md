# Story-001: Limpeza Técnica + ADRs

**Prioridade:** Alta
**Estimativa:** 2-3h
**Tipo:** refactor + docs
**Criada:** 15/02/2026 v2.0 (reescrita — substituiu story CSS Modules)

---

## Contexto

O projeto ToolOptimizer CNC evoluiu rapidamente de protótipo para app funcional com 272 testes, deploy no GitHub Pages, e páginas mobile e desktop. Durante essa evolução, acumulou-se código morto e decisões arquiteturais não documentadas.

A story anterior (CSS Modules migration) foi **cancelada** porque:
- O projeto usa Tailwind v4 utility classes — não há conflitos de CSS
- CSS Modules adicionaria complexidade sem benefício real
- A abordagem atual é a best practice para projetos Tailwind

---

## Objetivo

Limpar codebase de código morto e documentar decisões arquiteturais em ADRs (Architecture Decision Records), preparando o projeto para deploy profissional.

---

## Fase 1: Remoção de Código Morto (30min)

### 1.1 Deletar src/ui/styles/index.css
- **Motivo:** 2324 linhas de CSS legado (Tailwind v3 @layer base), nunca importado
- **Risco:** Zero — grep confirma que nenhum arquivo importa este CSS
- **Ação:** Deletar arquivo e diretório src/ui/styles/ se ficar vazio

### 1.2 Avaliar src/cnc-engine/
- **Verificar:** Se algum arquivo em src/ ou tests/ importa de cnc-engine/
- **Se não importado:** Deletar diretório inteiro
- **Se importado:** Documentar dependência e planejar migração

### 1.3 Verificar src/ui/ inteiro
- **Se diretório ficar vazio após 1.1:** Deletar src/ui/

### Validação Fase 1:
```powershell
# Confirmar remoções
Get-ChildItem -Path src/ui -Recurse -ErrorAction SilentlyContinue
Get-ChildItem -Path src/cnc-engine -Recurse -ErrorAction SilentlyContinue
# Build deve passar
npm run build
# Testes devem passar
npm test
```

---

## Fase 2: ADRs — Architecture Decision Records (1h)

Criar em `docs/architecture/`:

### ADR-001: Stack Tecnológica
- Status: Aceito
- React 18 + TypeScript strict + Vite 6 + Zustand + Tailwind v4
- localStorage sem backend, GitHub Pages deploy
- Bundle ~87KB gzip, 272+ testes

### ADR-002: Estratégia CSS — Tailwind v4
- Status: Aceito
- Tailwind v4 utility classes com @theme tokens
- CSS Modules avaliados e descartados (sem benefício)
- Design tokens centralizados em src/index.css
- Inline styles apenas para valores dinâmicos

### ADR-003: Separação Desktop/Mobile
- Status: Aceito
- Páginas separadas (/, /mobile) com auto-detect via useIsMobile()
- Desktop: grid 3 colunas, min 1360px
- Mobile: scroll vertical, controles touch
- Responsive design descartado (complexidade > benefício)

---

## Fase 3: Organização de Docs (30min)

### 3.1 Remover story antiga
- Deletar docs/stories/story-001-css-isolado.md (substituída por esta)

### 3.2 Limpar artefatos
- Remover docs/~$OXIMA_SESSAO.md (temp Word)
- Remover nul (artefato Windows na raiz)

### Validação Fase 3:
```powershell
# Verificar estrutura final
Get-ChildItem -Path docs -Recurse -Name
```

---

## Fase 4: Validação Final (15min)

```powershell
# 1. Build limpo
npm run build

# 2. Todos os testes passam
npm test

# 3. TypeScript sem erros
npx tsc --noEmit

# 4. Verificar bundle size (deve ser ~87KB ou menor)
Get-ChildItem -Path dist/assets -Recurse | Select-Object Name, Length
```

### Critérios de Aceite:
- [ ] Zero arquivos mortos em src/
- [ ] 3 ADRs criados em docs/architecture/
- [ ] Build passa sem warnings
- [ ] 272+ testes passando
- [ ] Bundle size <= 90KB gzip

---

## Commits Sugeridos

1. `refactor: remove dead CSS and legacy engine code`
2. `docs: add ADR-001 stack, ADR-002 CSS strategy, ADR-003 mobile separation`
3. `docs: organize session files and clean up artifacts`

---

**Substitui:** story-001-css-isolado.md (cancelada)
**Próxima story:** Story-002 Deploy Cloudflare
