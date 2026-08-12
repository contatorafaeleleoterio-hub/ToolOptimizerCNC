# Plano: Seguranca Cibernetica — ToolOptimizer CNC

> **Criado:** 13/03/2026
> **Versao alvo:** v0.5.5
> **Tipo:** Security Hardening
> **Prioridade:** ALTA
> **Escopo:** 6 arquivos modificados + 1 novo + configuracoes manuais no GitHub/Cloudflare

---

## Contexto

Auditoria completa de seguranca realizada em 13/03/2026 cobrindo: codigo-fonte, dependencias, CI/CD, headers HTTP, Cloudflare Workers, Electron desktop, GitHub e maquina local. Postura geral avaliada como BOA — zero vulnerabilidades criticas no codigo da aplicacao. Este plano endereca os gaps identificados.

**Decisao confirmada:** Repositorio GitHub sera tornado PRIVADO. GitHub Pages removido — deploy exclusivo via Cloudflare Workers.

---

## Resultado da Auditoria

| Categoria | Status | Detalhe |
|-----------|--------|---------|
| XSS / Injecao | SEGURO | Zero `dangerouslySetInnerHTML`, `eval`, `innerHTML` |
| Input Validation | SEGURO | Todos inputs com min/max constraints |
| localStorage | SEGURO | Apenas dados nao-sensiveis (parametros CNC) |
| Secrets / Credenciais | EXCELENTE | Zero secrets hardcoded no codigo |
| HTTPS / TLS | EXCELENTE | HSTS configurado, Cloudflare SSL |
| Source Maps | SEGURO | Nao expostos em producao |
| Electron Desktop | EXCELENTE | nodeIntegration=false, contextIsolation=true |
| Dependencias | ATENCAO | 3 vulnerabilidades em dev deps (minimatch, rollup, ajv) |
| CSP Header | FALTANDO | Content-Security-Policy nao configurado |
| importSettings() | GAP | Aceita JSON sem validar ranges numericos |
| Repositorio | PUBLICO | Codigo-fonte visivel a qualquer pessoa |
| GitHub Pages | REDUNDANTE | Deploy duplicado sem necessidade |

---

## Implementacao em Fases

### FASE 1 — Repositorio Privado + Remover GitHub Pages

**Acoes MANUAIS (Rafael no browser):**

1. **GitHub.com** → Repositorio → Settings → Danger Zone → **Change visibility → Private**
   - Claude Code continua funcionando (usa credenciais git locais)
   - GitHub Actions continua funcionando (secrets ja configurados)

2. **GitHub.com** → Settings → Pages → Source: **None** (desativar Pages)

**Acao de CODIGO:**

3. **Deletar** `.github/workflows/deploy.yml` (workflow do GitHub Pages)
   - O deploy agora e feito exclusivamente por `.github/workflows/deploy-cloudflare.yml`

**Verificacao:**
- Abrir repo em aba anonima → deve dar 404
- Fazer commit → verificar deploy Cloudflare funciona
- Claude Code: `git push` → deve funcionar normalmente

---

### FASE 2 — Content-Security-Policy Header

**Arquivo:** `public/_headers`

**Adicionar ao final do bloco `/*`:**
```
Content-Security-Policy: default-src 'self'; script-src 'self' https://plausible.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'
```

**Protege contra:**
- Injecao de scripts maliciosos (XSS)
- Clickjacking (frame-ancestors 'none')
- Data exfiltration (connect-src 'self')
- Form hijacking (form-action 'self')

**Verificacao:**
- DevTools → Network → Response Headers do index.html → CSP presente
- Console nao deve mostrar erros de CSP para recursos legitimos

---

### FASE 3 — Dependencias e Supply Chain

**3.1 Corrigir vulnerabilidades:**
```bash
npm audit                    # Diagnosticar
npm audit fix                # Corrigir automaticamente
npm audit fix --force        # Se necessario (pode haver breaking changes)
```

**3.2 Adicionar audit ao CI:**

**Arquivo:** `.github/workflows/ci.yml`

Adicionar step apos `npm ci`:
```yaml
- name: Security audit
  run: npm audit --audit-level=high
```

**3.3 Criar Dependabot:**

**Novo arquivo:** `.github/dependabot.yml`
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

**Verificacao:**
- `npm audit` local retorna 0 vulnerabilidades HIGH
- CI falha se nova vulnerabilidade HIGH surgir
- Dependabot cria PRs automaticamente para updates

---

### FASE 4 — Validacao de Dados Importados

**Arquivo:** `src/store/machining-store.ts` (funcao `importSettings`)

**Problema:** `importSettings()` aceita JSON sem validar ranges. Um arquivo malicioso pode injetar `maxRPM: 0`, `eficiencia: -1`, ou `safetyFactor: 999`.

**Fix:** Adicionar validacao de ranges antes do spread:
```typescript
// Validar limitesMaquina contra ranges seguros
if (data.limitesMaquina) {
  const lm = data.limitesMaquina;
  const validated = {
    ...LIMITES_PADRAO_MAQUINA,
    maxRPM: clamp(lm.maxRPM, 100, 40000),
    maxPotencia: clamp(lm.maxPotencia, 0.5, 100),
    maxTorque: clamp(lm.maxTorque, 1, 500),
    maxAvanco: clamp(lm.maxAvanco, 100, 20000),
    eficiencia: clamp(lm.eficiencia, 0.5, 1.0),
  };
  set({ limitesMaquina: validated });
}

// Validar safetyFactor
if (typeof data.safetyFactor === 'number') {
  set({ safetyFactor: clamp(data.safetyFactor, 0.5, 1.0) });
}
```

**Arquivo:** `src/store/history-store.ts` (funcao `importHistory`)

**Fix:** Validar cada entry importada com campos obrigatorios e tipos corretos.

**Testes:** Adicionar testes para importacao com valores invalidos → deve clampar/rejeitar.

**Verificacao:**
- Importar JSON com `maxRPM: -1` → deve ser clampado para 100
- Importar JSON com campo faltando → deve usar default

---

### FASE 5 — Remover Script Plausible Inativo

**Arquivo:** `index.html` (linha 111)

**Remover:**
```html
<script defer data-domain="tooloptimizercnc.com.br" src="https://plausible.io/js/script.js"></script>
```

**Motivo:** Nao existe conta Plausible ativa. Cloudflare Web Analytics ja cobre pageviews e visitas. Remover reduz superficie de ataque (menos CDN externo).

**Tambem remover/limpar:** `src/hooks/use-plausible.ts` — tornar no-op ou remover chamadas.

**Atualizar CSP** (Fase 2): remover `https://plausible.io` do `script-src`.

**Verificacao:**
- Site carrega sem erros no console
- Analytics continua via Cloudflare Dashboard

---

### FASE 6 — Protecao Cloudflare (MANUAL no Dashboard)

**Acoes no dash.cloudflare.com:**

1. **Security → Bots** → Ativar **Bot Fight Mode** (gratuito)
2. **Security → WAF** → Criar regra de Rate Limiting:
   - 100 requests/min por IP
   - Acao: Challenge (CAPTCHA)
3. **Caching → Configuration:**
   - Assets estaticos (JS, CSS, fonts): cache 1 ano
   - `index.html`: cache 1 hora (para updates rapidos)
4. **SSL/TLS** → Verificar modo "Full (strict)" ativo
5. **Security → Settings** → Security Level: Medium

**Verificacao:**
- Dashboard → Security → Overview → regras ativas visiveis

---

### FASE 7 — Branch Protection GitHub (MANUAL)

**GitHub.com → Repositorio → Settings → Branches → Add rule:**

- Branch name pattern: `main`
- Require status checks before merging: **ON** (selecionar "quality-gates")
- Do not allow force pushes: **ON**
- Do not allow deletions: **ON**

**Ativar Dependabot Alerts:**
- Settings → Code security → Dependabot alerts: **ON**
- Dependabot security updates: **ON**

**Verificacao:**
- Tentar force push → deve ser bloqueado
- Push normal com CI passando → deve funcionar

---

## Resumo de Arquivos

| Arquivo | Acao | Fase |
|---------|------|------|
| `.github/workflows/deploy.yml` | DELETAR | 1 |
| `public/_headers` | Adicionar CSP | 2 |
| `.github/workflows/ci.yml` | Adicionar npm audit step | 3 |
| `.github/dependabot.yml` | CRIAR (novo) | 3 |
| `src/store/machining-store.ts` | Validar importSettings() | 4 |
| `src/store/history-store.ts` | Validar importHistory() | 4 |
| `index.html` | Remover Plausible script | 5 |
| `src/hooks/use-plausible.ts` | Limpar/remover | 5 |

**Configuracoes manuais (Rafael):**
- GitHub: tornar repo privado + desativar Pages + branch protection + Dependabot alerts
- Cloudflare: Bot Fight Mode + Rate Limiting + cache rules

---

## Checklist Pre-Commit

- [ ] `npm run typecheck` — zero erros
- [ ] `npm run test` — todos passando
- [ ] `npm run build` — build limpo
- [ ] `npm audit` — zero HIGH/CRITICAL
- [ ] Headers CSP testados no browser
- [ ] Import com JSON invalido testado
