# Story-002: Deploy Cloudflare Pages + Domínio

**Prioridade:** Alta
**Tipo:** infra + config
**Criada:** 15/02/2026
**Decisões tomadas:** tooloptimizercnc.com.br, Cloudflare free tier, manter GitHub Pages

---

## Contexto

O projeto está deployado no GitHub Pages (`*.github.io/ToolOptimizerCNC/`).
Queremos deploy profissional com domínio próprio `tooloptimizercnc.com.br` via Cloudflare Pages.
GitHub Pages permanece ativo como fallback no endereço `.github.io`.

### Desafio técnico: dual deploy
- **GitHub Pages:** base = `/ToolOptimizerCNC/` (subpath obrigatório)
- **Cloudflare Pages:** base = `/` (domínio próprio, root)

Solução: usar variável de ambiente `VITE_BASE_URL` para build condicional.

### Custos:
- Cloudflare Pages free: R$0/mês (bandwidth ilimitado, 500 builds/mês, SSL grátis)
- Domínio .com.br (Registro.br): ~R$40/ano
- **Total: ~R$40/ano**

---

## Fase 1: Preparar build para dual deploy (código)

### 1.1 vite.config.ts — base condicional
```ts
base: process.env.VITE_BASE_URL || '/ToolOptimizerCNC/',
```
- Default mantém GitHub Pages funcionando
- Cloudflare seta `VITE_BASE_URL=/` no build

### 1.2 src/main.tsx — basename condicional
```ts
const basename = import.meta.env.VITE_BASE_URL || '/ToolOptimizerCNC';
// Remove trailing slash for BrowserRouter
const routerBasename = basename === '/' ? '/' : basename.replace(/\/$/, '');
```

### 1.3 Criar public/_redirects (Cloudflare SPA)
```
/*    /index.html   200
```
Este arquivo é ignorado pelo GitHub Pages e usado pelo Cloudflare Pages.

### Validação Fase 1:
```bash
npm test
npm run build
# Verificar que build default ainda funciona para GitHub Pages
```

---

## Fase 2: Criar contas (manual — usuário)

### 2.1 Cloudflare (grátis)
1. Ir em https://dash.cloudflare.com/sign-up
2. Criar conta com email
3. NÃO precisa adicionar site/domínio ainda — será feito via Pages

### 2.2 Registro.br
1. Ir em https://registro.br
2. Criar conta PF (CPF)
3. Registrar domínio: `tooloptimizercnc.com.br`
4. Custo: ~R$40/ano

**IMPORTANTE:** Estas etapas são manuais. Claude fornece instruções, usuário executa.

---

## Fase 3: Setup Cloudflare Pages (manual — usuário)

### 3.1 Criar projeto Cloudflare Pages
1. Dashboard → Pages → Create a project → Connect to Git
2. Selecionar repositório: `contatorafaeleleoterio-hub/ToolOptimizerCNC`
3. Configurar build:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (default)
   - **Node version:** 20 (ou 22)
4. Environment variables:
   - `VITE_BASE_URL` = `/`
5. Deploy

### 3.2 Verificar deploy no subdomínio Cloudflare
- URL temporária: `tooloptimizercnc.pages.dev` (ou similar)
- Testar: `/`, `/mobile`, `/settings`, `/history`

---

## Fase 4: Configurar domínio (manual — usuário)

### 4.1 Adicionar custom domain no Cloudflare Pages
1. Pages → projeto → Custom domains → Setup
2. Adicionar: `tooloptimizercnc.com.br`
3. Cloudflare pedirá para apontar nameservers

### 4.2 No Registro.br — apontar DNS
1. Registro.br → domínio → alterar DNS
2. Trocar nameservers para os do Cloudflare (ex: `aria.ns.cloudflare.com`, `xxx.ns.cloudflare.com`)
3. Propagação: 24-48h (geralmente < 1h)

### 4.3 SSL
- Cloudflare gera certificado SSL automaticamente após DNS propagar
- Verificar HTTPS funciona em `https://tooloptimizercnc.com.br`

---

## Fase 5: Validação final

### 5.1 Testar todas as rotas (Cloudflare)
- `https://tooloptimizercnc.com.br/` → Dashboard desktop
- `https://tooloptimizercnc.com.br/mobile` → Mobile page
- `https://tooloptimizercnc.com.br/settings` → Settings
- `https://tooloptimizercnc.com.br/history` → History
- Refresh em cada rota (testa SPA redirect)

### 5.2 Testar GitHub Pages (fallback)
- `https://contatorafaeleleoterio-hub.github.io/ToolOptimizerCNC/` → Deve funcionar

### 5.3 Testar build local
```bash
npm run build                              # GitHub Pages (default)
VITE_BASE_URL=/ npm run build              # Cloudflare
```

---

## Fase 6: Atualizar documentação

### 6.1 Atualizar docs/PROXIMA_SESSAO.md
- Marcar Story-002 como concluída
- Adicionar URLs de produção
- Definir próxima story (Story-003: CI/CD)

### 6.2 Gerar prompt de continuação

---

## Commits sugeridos

1. `feat: support dual deploy with conditional base URL`
2. `docs: add story-002 deploy cloudflare`
3. `docs: update session docs with Story-002 completion`

---

## Critérios de Aceite

- [ ] Build funciona com base `/ToolOptimizerCNC/` (GitHub Pages)
- [ ] Build funciona com base `/` (Cloudflare, via env var)
- [ ] SPA redirect funciona no Cloudflare (`_redirects`)
- [ ] GitHub Pages continua funcionando como fallback
- [ ] Domínio `tooloptimizercnc.com.br` aponta para Cloudflare
- [ ] SSL ativo (HTTPS)
- [ ] Todas as 4 rotas funcionam no domínio
- [ ] Testes passando (325+)

---

**Prerequisito:** Story-001 Limpeza Técnica (concluída)
**Próxima story:** Story-003 CI/CD GitHub Actions
