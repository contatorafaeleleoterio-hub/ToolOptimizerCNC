# ToolOptimizer CNC — Launch Track (Android)

---

## SESSION G-1 — Pesquisa de Mercado & Definição de MVP
Data: 19/04/2026
Status: ✅ CONCLUÍDO

### Público-Alvo
- Operadores de máquinas CNC, programadores e preparadores.
- Ambiente: Chão de fábrica (ruído, luvas, baixa luminosidade ou reflexo).

### MVP Features (Obrigatório para Lançamento)
- [x] Calculadora de RPM e Avanço (fz)
- [x] Interface HMI Visor de alto contraste
- [x] Feedback tátil (Haptics) para confirmação de comandos
- [x] Funcionamento Offline (PWA/Mobile Nativo)
- [x] Persistência de configurações e histórico
- [ ] Disclaimer de segurança obrigatório no primeiro acesso
- [ ] Validação de limites da máquina

---

## SESSION APP-1 — Instalação Capacitor + Estrutura Android
Data: ~19/04/2026
Status: ✅ CONCLUÍDO
Commit: `0ae47a2`

**O que foi feito:**
- Instalado `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`
- Plugins: `@capacitor/device`, `@capacitor/haptics`, `@capacitor/preferences`, `@capacitor/status-bar`
- `npx cap add android` — pasta `android/` gerada
- `capacitor.config.ts`: `appId = 'br.com.tooloptimizercnc'`, `webDir = 'dist'`
- Fix importação `storageService` em `machining-store.ts` (commit `6bd27a6`)

---

## SESSION APP-2 — Build CI/CD + Validação no Dispositivo
Data: 21/04/2026
Status: ✅ CONCLUÍDO

### PARTE A — GitHub Actions (build automatizado)

**Arquivo:** `.github/workflows/build-android.yml`

**Falha 1 — Java version mismatch** (commit `503ccb8`)
- Causa: `capacitor.build.gradle` exige `JavaVersion.VERSION_21`, workflow usava `java-version: '17'`
- Fix: `java-version: '17'` → `'21'` com `distribution: 'temurin'`

**Falha 2 — Node.js muito antigo** (commit `83314bc`)
- Causa: Capacitor CLI exige `Node >= 22.0.0`, workflow usava Node 20
- Log: `The Capacitor CLI requires NodeJS >=22.0.0`
- Fix: `node-version: '20'` → `'22'`

**Resultado:** Build verde ✅ — GitHub Actions run #24654945132 — 2m16s

### PARTE B — Validação no Dispositivo

**Checklist de validação:**
- [x] Splash + calculadora carrega
- [x] Material → Ferramenta → Simular → Resultado funciona
- [x] Histórico e Favoritos persistem
- [x] Interface HMI Visor (bugs identificados e corrigidos abaixo)

### PARTE C — Bugs Pós-Validação (corrigidos — commit `5917f39`)

**Bug 1 — Logo/Header cortado no topo**
- Causa: Capacitor 7 usa edge-to-edge no Android — WebView renderiza atrás da status bar
- Fix: `padding-top: env(safe-area-inset-top)` + `height: 100dvh` no root do `MobilePage`
- Arquivo: `src/pages/mobile-page.tsx`

**Bug 2 — Linha branca sobrepondo o SGB no ajuste fino**
- Causa: Thumb do `TouchSlider` (60×60px) em container `h-12` (48px) → overflow de 6px para cima
- Fix: container `h-12` → `h-16` (64px) + SGB envolvido em `div.relative.z-10`
- Arquivo: `src/components/mobile/mobile-fine-tune-section.tsx`

---

## SESSION APP-3 — Store Listing + Landing Page Android
Status: ⏳ EM ANDAMENTO (parcialmente concluída — ver itens abaixo)

### ✅ Concluído (commit `e3a02aa`)
- Privacy Policy `/privacidade` — rota React + página LGPD-compliant
- Feature graphic SVG 1024×500 em `public/feature-graphic.svg`
- `docs/APP3_STORE_LISTING.md` — descrição curta (46 chars) + longa PT-BR + categoria + classificação

### ⏳ Pendente — Landing Page Android (plano aprovado, não executado)

**Plano completo:** `.claude/plans/agora-voce-so-deve-sorted-spark.md`

Arquivos a modificar:
1. `landing/index.html` — 4 cirurgias:
   - Hero: trocar "Sobre o projeto" por "📱 Baixar para Android" + badge "Em breve na Play Store"
   - Feature card: "Desktop + Web" → "Web + Android + Desktop"
   - CTA Final: adicionar botão Android secundário ao lado do primário
   - Footer: adicionar links "Privacidade" + "Sobre o projeto"
2. `index.html` (app entry): remover bloco `#app-landing` (linhas 137–220) — o app deve carregar direto; a landing é o ponto de entrada correto

**Regra:** `[URL_APK]` nos CTAs fica como placeholder até APP-4 (GitHub Release com APK assinado).

---

## SESSION APP-4 — Release + Hospedagem APK + Play Store
Status: ⏳ Aguarda APP-3
Absorve: S9, S10, S11 do ROTEIRO_EXECUCAO

**O que será feito:**
- **[S9]** GitHub Release com APK permanente + substituir `[URL_APK]` no site
- Gerar keystore de assinatura (release signing)
- Build `assembleRelease` com APK assinado
- Criar listing no Google Play Console + submeter para revisão (~3-7 dias)
- **[S10]** Atualizar docs pós-launch
- **[S11]** Backlog priorizado (rodar em Claude Haiku — economia de tokens)

---

## Histórico de Commits (Android Track)

| Commit | Descrição | Status |
|--------|-----------|--------|
| `0ae47a2` | feat: add Capacitor Android — SESSION APP-1 | ✅ |
| `6bd27a6` | fix(store): import storageService to fix Android build | ✅ |
| `503ccb8` | fix(ci): upgrade Java 17→21 (capacitor.build.gradle) | ✅ |
| `83314bc` | fix(ci): upgrade Node 20→22 (Capacitor CLI req) | ✅ |
| `5917f39` | fix(mobile): safe-area padding + slider overflow onto SGB | ✅ |
