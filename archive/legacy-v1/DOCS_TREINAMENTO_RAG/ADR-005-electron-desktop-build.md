# ADR-005: Build Desktop Portátil com Electron

**Status:** Aceito
**Data:** 19/02/2026
**Autor:** Rafael Eleotério

---

## Contexto

O ToolOptimizer CNC precisa ser testado em ambiente de fábrica (chão de fábrica CNC) onde:
- Não há garantia de acesso à internet
- PCs podem não ter permissão para instalar software
- Operadores precisam rodar o sistema a partir de um **pen drive USB**

O projeto web (React + Vite) roda em navegador, mas depende de um servidor HTTP (GitHub Pages / localhost). Para uso offline em pen drive, é necessário empacotar o SPA como um executável Windows autônomo.

## Decisão

Usar **Electron** para empacotar o SPA React/Vite como `.exe` portátil (sem instalação).

### Por que Electron

| Critério | Electron | Tauri | NW.js |
|----------|----------|-------|-------|
| **Facilidade** | Alta — já tinha infra parcial no projeto | Média — requer Rust toolchain | Média |
| **Tamanho .exe** | ~85MB | ~5-10MB | ~80MB |
| **Maturidade** | Altíssima (VS Code, Slack, Discord) | Boa mas mais nova | Baixa manutenção |
| **Reuso de código** | 100% do React SPA | 100% do React SPA | 100% |
| **Offline support** | Nativo | Nativo | Nativo |
| **Complexidade setup** | Baixa (npm install) | Alta (Rust + cargo + WebView2) | Média |

**Decisão:** Electron — menor fricção, já existia infraestrutura parcial no projeto (`src/app/main.js`, `electron-builder.json`).

### Princípios da Abordagem

1. **Clone isolado** — NUNCA modificar o projeto web. Sempre clonar para `Sistema_Desktop_Pen_driver/`
2. **Portable .exe** — Sem instalação, sem registro no Windows, roda de qualquer pasta/pen drive
3. **Versão herda do package.json** — O .exe leva a mesma versão do `package.json`
4. **Fontes com fallback** — Google Fonts quando online, system fonts quando offline

---

## Guia de Build Passo-a-Passo

### Pré-requisitos
- Node.js 20+ instalado
- Git instalado
- Acesso ao repositório ToolOptimizer CNC

### Passo 1: Clonar repositório em pasta isolada

```bash
cd C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC
git clone . Sistema_Desktop_Pen_driver
cd Sistema_Desktop_Pen_driver
```

> **REGRA:** Todas as modificações acontecem SOMENTE dentro de `Sistema_Desktop_Pen_driver/`. O projeto original permanece intacto.

### Passo 2: Instalar dependências Electron

```bash
npm install --save-dev electron electron-builder cross-env
```

Resultado esperado: `electron` (~v40), `electron-builder` (~v26), `cross-env` (~v10) adicionados ao `devDependencies`.

### Passo 3: Corrigir conflito CJS/ESM

⚠️ **PROBLEMA:** `package.json` tem `"type": "module"` (ESM), mas `src/app/main.js` e `preload.js` usam `require()` (CommonJS). Node.js recusa rodar CJS em contexto ESM.

**SOLUÇÃO:** Renomear para `.cjs` (força CommonJS independente do `"type"` do package.json).

```bash
mv src/app/main.js src/app/main.cjs
mv src/app/preload.js src/app/preload.cjs
```

Depois editar `src/app/main.cjs` linha 15:
```javascript
// ANTES:
preload: path.join(__dirname, 'preload.js')
// DEPOIS:
preload: path.join(__dirname, 'preload.cjs')
```

### Passo 4: Atualizar `package.json`

Adicionar campo `"main"` e 3 novos scripts:

```json
{
  "main": "src/app/main.cjs",
  "scripts": {
    "electron-dev": "cross-env NODE_ENV=development electron .",
    "electron-build": "cross-env VITE_ELECTRON=true vite build && electron-builder --win portable",
    "desktop": "npm run typecheck && npm run test && npm run electron-build"
  }
}
```

- `electron-dev` — Modo desenvolvimento (requer `npm run dev` rodando em paralelo)
- `electron-build` — Build de produção: compila React + empacota Electron
- `desktop` — Pipeline completo: typecheck + test + build

### Passo 5: Atualizar `vite.config.ts`

⚠️ **PROBLEMA:** Base path `/ToolOptimizerCNC/` gera assets com caminho absoluto que não funciona com protocolo `file://` do Electron.

**SOLUÇÃO:** Condicionalmente usar `'./'` (relativo) e output para `dist/renderer/`:

```typescript
const isElectron = process.env.VITE_ELECTRON === 'true';

export default defineConfig({
  base: isElectron ? './' : (process.env.VITE_BASE_URL || '/ToolOptimizerCNC/'),
  build: {
    cssMinify: false,
    outDir: isElectron ? 'dist/renderer' : 'dist',
  },
  // ... resto igual
});
```

### Passo 6: Trocar BrowserRouter → HashRouter em `src/main.tsx`

⚠️ **PROBLEMA:** `BrowserRouter` usa HTML5 History API (`pushState`), que requer servidor HTTP. No Electron produção (`file://`), navegar para `/settings` tenta abrir um arquivo inexistente → tela branca.

**SOLUÇÃO:** `HashRouter` usa fragmentos de URL (`#/settings`), funciona com `file://`.

```tsx
// ANTES:
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const baseUrl = import.meta.env.BASE_URL || '/ToolOptimizerCNC/';
const basename = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
<BrowserRouter basename={basename || '/'}>

// DEPOIS:
import { HashRouter, Routes, Route } from 'react-router-dom';
<HashRouter>
```

Remover completamente as variáveis `baseUrl` e `basename` — não são necessárias com HashRouter.

### Passo 7: Limpar `index.html`

- **Remover:** Script de SPA redirect do GitHub Pages (o bloco `<script>` inteiro entre as tags `<link>` e `</head>`)
- **Adicionar:** Meta tag Content-Security-Policy para segurança Electron:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'">
```

### Passo 8: Fallback de fontes offline em `src/index.css`

⚠️ **PROBLEMA:** Google Fonts (Inter, JetBrains Mono, Material Symbols) requerem internet. Sem internet no pen drive, texto renderiza com fonte serif padrão (feio).

**SOLUÇÃO:** Adicionar system fonts como fallback:

```css
/* Dentro do @theme { } */
--font-display: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
--font-mono: "JetBrains Mono", "Cascadia Code", "Consolas", "Courier New", monospace;

/* No body { } */
font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
```

> **Nota:** Material Symbols (ícones) NÃO tem fallback — aparecerão como quadrados vazios offline. Solução futura: bundlear a fonte localmente (~300KB woff2).

### Passo 9: Atualizar `electron-builder.json`

⚠️ **PROBLEMA:** Referência `"icon": "build/icon.ico"` — arquivo não existe → build falha.

**SOLUÇÃO:** Remover a referência de ícone (usa ícone padrão Electron):

```json
{
  "win": {
    "target": ["portable"]
  }
}
```

### Passo 10: Remover artefatos web-only

```bash
rm public/404.html      # GitHub Pages SPA redirect
rm public/_redirects     # Cloudflare Pages redirects
rm -rf .github           # CI/CD workflows (não necessários no desktop)
```

### Passo 11: Atualizar testes (BrowserRouter → MemoryRouter)

7 arquivos de teste importam `BrowserRouter` como wrapper. Trocar por `MemoryRouter` (padrão recomendado para testes pelo React Router):

**Arquivos:** (mesmo padrão em todos)
- `tests/components/config-panel.test.tsx`
- `tests/components/export-buttons.test.tsx`
- `tests/components/results-panel.test.tsx`
- `tests/components/tool-summary-viewer.test.tsx`
- `tests/pages/history-page.test.tsx`
- `tests/pages/mobile-page.test.tsx`
- `tests/pages/settings-page.test.tsx`

```tsx
// ANTES:
import { BrowserRouter } from 'react-router-dom';
render(<BrowserRouter><Component /></BrowserRouter>);

// DEPOIS:
import { MemoryRouter } from 'react-router-dom';
render(<MemoryRouter><Component /></MemoryRouter>);
```

### Passo 12: Corrigir Vitest root em subdiretório

⚠️ **PROBLEMA CRÍTICO:** Quando o clone é subdiretório do projeto original (ex: `INICIO_TOOLOPTIMIZERCNC/Sistema_Desktop_Pen_driver/`), o Vitest resolve o `root` para o diretório **pai** que também tem `vite.config.ts`. Resultado: `Cannot find module .../INICIO_TOOLOPTIMIZERCNC/tests/setup.ts` (caminho errado, sem `Sistema_Desktop_Pen_driver/`).

**SOLUÇÃO:** No `vitest.config.ts`, forçar root e setupFiles com caminho absoluto:

```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  root: __dirname,  // ← FORÇAR root para este diretório
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'tests/setup.ts')],  // ← CAMINHO ABSOLUTO
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Passo 13: Build e Teste

```bash
# Validação
npx tsc --noEmit          # TypeScript — zero erros
npx vitest run            # Testes — todos 333 devem passar

# Build do .exe
npm run electron-build

# Resultado esperado:
# dist-electron/ToolOptimizer-CNC-{version}-portable.exe (~85MB)
```

### Passo 14: Verificar o .exe

Executar o `.exe` gerado e verificar:
- [ ] Janela abre em 1600×900 com background `#0f1419`
- [ ] Header com "ToolOptimizer CNC" e ícone cyan
- [ ] Menu bar removida (setMenuBarVisibility false)
- [ ] Config panel carrega com dropdowns de Material/Ferramenta
- [ ] Botão "Simular" executa cálculo com animação
- [ ] Results panel mostra RPM, Avanço, Potência
- [ ] Navegação para Settings (`/#/settings`) funciona
- [ ] Navegação para History (`/#/history`) funciona
- [ ] Gauge anima corretamente
- [ ] localStorage persiste (fechar e reabrir, configurações mantidas)

---

## Problemas Conhecidos e Soluções (Quick Reference)

| # | Problema | Sintoma | Solução |
|---|----------|---------|---------|
| 1 | CJS/ESM conflict | `require is not defined` ou `ERR_REQUIRE_ESM` | Renomear `.js` → `.cjs` |
| 2 | BrowserRouter + file:// | Tela branca, rotas quebram | Trocar por `HashRouter` |
| 3 | Vitest root em subdir | `Cannot find module .../tests/setup.ts` path errado | `root: __dirname` + `path.resolve()` no vitest.config.ts |
| 4 | Fontes offline | Texto com fonte serif genérica | Fallback: `system-ui, "Segoe UI"` |
| 5 | Icon missing | `electron-builder` falha no build | Remover `"icon"` do electron-builder.json |
| 6 | Vite base path absoluto | Assets não carregam (404 em `file://`) | `base: './'` condicional |
| 7 | Vite outDir errado | electron-builder não encontra renderer | `outDir: 'dist/renderer'` condicional |

---

## Arquivos Modificados (Referência Completa)

| Arquivo | Ação | O que muda |
|---------|------|------------|
| `src/app/main.js` → `main.cjs` | Renomear + editar | Extensão + preload path |
| `src/app/preload.js` → `preload.cjs` | Renomear | Extensão |
| `package.json` | Editar | `"main"` field + 3 scripts + 3 devDependencies |
| `vite.config.ts` | Editar | `base` condicional + `outDir` condicional |
| `vitest.config.ts` | Editar | `root: __dirname` + `setupFiles` com `path.resolve` |
| `src/main.tsx` | Editar | `BrowserRouter` → `HashRouter`, remover basename |
| `index.html` | Editar | Remover SPA redirect script + adicionar CSP meta |
| `src/index.css` | Editar | Fallback font stacks (display + mono + body) |
| `electron-builder.json` | Editar | Remover `"icon": "build/icon.ico"` |
| `public/404.html` | Deletar | Artefato GitHub Pages |
| `public/_redirects` | Deletar | Artefato Cloudflare |
| `.github/` | Deletar dir | CI/CD não necessário no desktop |
| 7 arquivos de teste | Editar | `BrowserRouter` → `MemoryRouter` |

---

## Resultado do Build (19/02/2026)

- **Arquivo:** `ToolOptimizer-CNC-0.1.0-portable.exe`
- **Tamanho:** 85 MB
- **Electron:** v40.4.1
- **electron-builder:** v26.8.1
- **Testes:** 333/333 passando
- **TypeScript:** zero erros

---

## Melhorias Futuras

1. **Ícone customizado** — Criar `build/icon.ico` com branding ToolOptimizer (256×256 .ico)
2. **Material Symbols offline** — Baixar fonte woff2 (~300KB) e servir localmente
3. **Auto-updater** — Electron built-in updater para versões futuras
4. **Code signing** — Certificado digital elimina aviso Windows SmartScreen
5. **Tauri migration** — Se tamanho do .exe for problema, Tauri reduz para ~5-10MB (requer Rust)

---

## Consequências

### Positivas
- Operadores CNC podem testar o sistema na fábrica sem internet
- Distribuição simples: copiar 1 arquivo .exe para pen drive
- Sem instalação, sem permissões de administrador
- Código 100% compartilhado entre versão web e desktop

### Trade-offs
- .exe de 85MB (aceitável para pen drive USB 3.0+)
- Material Symbols (ícones) não funcionam offline (fallback futuro)
- Aviso SmartScreen na primeira execução (sem code signing)
- Clone separado = manutenção de 2 versões ao rebuildar
