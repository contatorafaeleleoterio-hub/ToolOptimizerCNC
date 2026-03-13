# PLAN — Favicon e Ícones do Aplicativo

**Status:** Pendente
**Versão alvo:** v0.5.1 ou v0.5.2
**Prioridade:** Média (identidade visual / polimento)

---

## Contexto

O projeto tem dois targets: app web (Cloudflare Worker) e app Electron desktop portátil.
Nenhum dos dois tem favicon configurado. O `main.cjs` já referencia `build/icon.ico` (linha 18) mas o arquivo não existe — `electron-builder.json` também não tem `win.icon`.

A logo-fonte já existe: `logo_p_favcon.png` na raiz do projeto web.

---

## Estado Atual (verificado 11/03/2026)

| Item | Estado |
|------|--------|
| `public/favicon.ico` | ❌ não existe |
| `index.html` (web) — tags favicon | ❌ ausente |
| `Sistema_Desktop_Pen_driver/build/icon.ico` | ❌ não existe (pasta `build/` ausente) |
| `Sistema_Desktop_Pen_driver/index.html` — tags favicon | ❌ ausente |
| `electron-builder.json` `win.icon` | ❌ ausente |
| `electron-builder.json` `files` inclui `build/` | ❌ ausente |
| `main.cjs:18` referencia `build/icon.ico` | ✅ já configurado (só falta o arquivo) |
| `logo_p_favcon.png` (fonte) | ✅ existe na raiz |

---

## Abordagem

**Script Node.js + modificações nos HTMLs e configs**

### Dependências (web project, devDependencies)
- `sharp` — resize de imagem (binários pré-compilados para Windows x64, sem build nativo)
- `png-to-ico` — gera arquivos `.ico` multi-size a partir de buffers PNG

---

## Arquivos a Criar/Modificar

### Novos arquivos (gerados pelo script)

```
public/
  favicon.ico             ← multi-size: 16, 32, 48px
  favicon-16x16.png
  favicon-32x32.png
  apple-touch-icon.png    ← 180x180
  icon-192.png
  icon-512.png

Sistema_Desktop_Pen_driver/
  public/
    favicon.ico
    favicon-16x16.png
    favicon-32x32.png
    apple-touch-icon.png
  build/
    icon.ico              ← 16+32+48+256px — usado por main.cjs e electron-builder
```

### Script gerador
```
scripts/generate-icons.mjs    ← Node ESM, rodar com: node scripts/generate-icons.mjs
```

### Arquivos modificados
1. `package.json` (web) — adicionar `sharp` + `png-to-ico` como devDeps + script `"icons"`
2. `index.html` (web) — adicionar 4 tags `<link>` de favicon + meta theme-color
3. `Sistema_Desktop_Pen_driver/index.html` — idem
4. `Sistema_Desktop_Pen_driver/electron-builder.json` — adicionar `win.icon` e `"build/**/*"` em `files`

---

## Passos de Implementação

### Passo 1 — Instalar dependências (web project)

```bash
cd C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC
npm install --save-dev sharp png-to-ico
```

### Passo 2 — Criar `scripts/generate-icons.mjs`

Script ESM que:
- Lê `logo_p_favcon.png` da raiz
- Usa `sharp` para gerar PNGs em 16/32/48/180/192/256/512px
- Usa `png-to-ico` para criar `.ico` multi-size
- Grava em `public/` (web) + `Sistema_Desktop_Pen_driver/public/` + `Sistema_Desktop_Pen_driver/build/`
- Cria pastas automaticamente com `mkdirSync({ recursive: true })`

```js
// scripts/generate-icons.mjs
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'logo_p_favcon.png');

async function main() {
  // Web: public/
  const webPublic = join(ROOT, 'public');

  await sharp(SOURCE).resize(16, 16).png().toFile(join(webPublic, 'favicon-16x16.png'));
  await sharp(SOURCE).resize(32, 32).png().toFile(join(webPublic, 'favicon-32x32.png'));
  await sharp(SOURCE).resize(180, 180).png().toFile(join(webPublic, 'apple-touch-icon.png'));
  await sharp(SOURCE).resize(192, 192).png().toFile(join(webPublic, 'icon-192.png'));
  await sharp(SOURCE).resize(512, 512).png().toFile(join(webPublic, 'icon-512.png'));

  // favicon.ico multi-size para web
  const icoWeb = await pngToIco([
    await sharp(SOURCE).resize(16, 16).png().toBuffer(),
    await sharp(SOURCE).resize(32, 32).png().toBuffer(),
    await sharp(SOURCE).resize(48, 48).png().toBuffer(),
  ]);
  writeFileSync(join(webPublic, 'favicon.ico'), icoWeb);

  // Desktop: public/
  const desktopPublic = join(ROOT, 'Sistema_Desktop_Pen_driver', 'public');
  mkdirSync(desktopPublic, { recursive: true });

  await sharp(SOURCE).resize(16, 16).png().toFile(join(desktopPublic, 'favicon-16x16.png'));
  await sharp(SOURCE).resize(32, 32).png().toFile(join(desktopPublic, 'favicon-32x32.png'));
  await sharp(SOURCE).resize(180, 180).png().toFile(join(desktopPublic, 'apple-touch-icon.png'));

  const icoDesktop = await pngToIco([
    await sharp(SOURCE).resize(16, 16).png().toBuffer(),
    await sharp(SOURCE).resize(32, 32).png().toBuffer(),
    await sharp(SOURCE).resize(48, 48).png().toBuffer(),
  ]);
  writeFileSync(join(desktopPublic, 'favicon.ico'), icoDesktop);

  // Desktop: build/icon.ico (Electron — 256px incluso)
  const desktopBuild = join(ROOT, 'Sistema_Desktop_Pen_driver', 'build');
  mkdirSync(desktopBuild, { recursive: true });

  const icoElectron = await pngToIco([
    await sharp(SOURCE).resize(16, 16).png().toBuffer(),
    await sharp(SOURCE).resize(32, 32).png().toBuffer(),
    await sharp(SOURCE).resize(48, 48).png().toBuffer(),
    await sharp(SOURCE).resize(256, 256).png().toBuffer(),
  ]);
  writeFileSync(join(desktopBuild, 'icon.ico'), icoElectron);

  console.log('✅ Ícones gerados com sucesso!');
}

main().catch(console.error);
```

Adicionar ao `package.json` (web):
```json
"icons": "node scripts/generate-icons.mjs"
```

### Passo 3 — Executar o script

```bash
npm run icons
```

### Passo 4 — Modificar `index.html` (web)

Adicionar após `<meta name="author">`:

```html
<!-- Favicon -->
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="theme-color" content="#0F1419" />
```

### Passo 5 — Modificar `Sistema_Desktop_Pen_driver/index.html`

Adicionar as mesmas tags (paths idênticos — Vite copia da `public/` para `dist/renderer/`).

### Passo 6 — Atualizar `Sistema_Desktop_Pen_driver/electron-builder.json`

```json
{
  "appId": "com.tooloptimizer.cnc",
  "productName": "ToolOptimizer CNC",
  "directories": {
    "output": "dist-electron"
  },
  "files": [
    "dist/renderer/**/*",
    "src/app/**/*",
    "build/**/*"
  ],
  "win": {
    "target": ["portable"],
    "icon": "build/icon.ico"
  },
  "portable": {
    "artifactName": "ToolOptimizer-CNC-${version}-portable.exe"
  }
}
```

**Razão do `build/**/*`:** necessário para que `main.cjs:18` (`path.join(__dirname, '../../build/icon.ico')`) funcione no app empacotado.

---

## Verificação Pós-Implementação

```bash
# 1. Confirmar arquivos web
ls public/favicon* public/apple* public/icon*

# 2. Confirmar arquivos desktop
ls Sistema_Desktop_Pen_driver/public/
ls Sistema_Desktop_Pen_driver/build/

# 3. Build web (confirmar favicon copiado para dist/)
npm run build
ls dist/favicon*

# 4. TypeScript sem erros
npx tsc --noEmit

# 5. Build Electron
cd Sistema_Desktop_Pen_driver
npm run electron-build
# Verificar: dist-electron/ToolOptimizer-CNC-0.1.0-portable.exe
```

---

## Notas Técnicas

- **`sharp` no Windows:** v0.33+ tem binários pré-compilados para Windows x64 — sem node-gyp
- **ICO multi-size:** 16+32+48+256px cobre Windows Explorer (16/32), barra de tarefas (48) e ícone de atalho (256)
- **CSP no desktop:** `index.html` desktop tem `img-src 'self' data:` — favicon de `self` é permitido
- **Script `.mjs`:** evita precisar de `tsx` ou `ts-node` — roda direto com `node`
- **`main.cjs` não precisa ser alterado:** linha 18 já está correta
- **Commit sugerido:** `feat(ui): add favicon and Electron app icon`
