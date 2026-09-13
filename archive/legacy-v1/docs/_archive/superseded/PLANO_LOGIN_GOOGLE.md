# Plano: Login Google + Multi-Usuario (Firebase Auth + Firestore)

> **Iniciativa separada da auditoria.** Este plano NAO substitui `docs/IMPLEMENTACAO_SESSOES.md`.
> Roadmap de implementacao: `docs/IMPLEMENTACAO_LOGIN.md`

---

## Contexto

O ToolOptimizer CNC e atualmente um SPA 100% client-side sem backend, sem autenticacao e sem modelo de usuario. Toda persistencia usa localStorage via Zustand persist. O objetivo e adicionar **login opcional com Google** para que multiplos operadores em **dispositivos diferentes** tenham seus dados sincronizados na nuvem.

### Decisoes do Usuario
- **Login com Google apenas** (Firebase Auth)
- **Login opcional** — app funciona sem login (modo convidado = comportamento atual)
- **Dispositivos diferentes** — precisa sync na nuvem (Firestore)

---

## Arquitetura

```
+--------------------------+
|  React App (Browser)     |
|  +- Zustand stores       |  <- fonte de verdade em runtime
|  +- localStorage         |  <- cache rapido (persist)
|  +- Firebase SDK         |  <- auth + sync
+----------+---------------+
           |
    +------+-------+
    | Firebase      |
    | +- Auth       |  <- Google sign-in
    | +- Firestore  |  <- dados por usuario
    +--------------+
```

**Principio:** Firebase e camada secundaria de persistencia. Zustand + localStorage continuam como fonte de verdade. Firestore e o storage duravel para usuarios logados.

### Firestore Data Model
```
users/{uid}/
  profile: { displayName, email, photoURL, createdAt, lastLoginAt }
  data/settings: { limitesMaquina, safetyFactor, preferences, safetyRules,
                   customMaterials, customToolConfig, toolCorrectionFactors, updatedAt }
  data/history: { entries: HistoricoCalculo[], updatedAt }
```

2 documents por usuario = 2 reads no login, max 2 writes por ciclo de sync.

---

## FASE 1 — Firebase Setup + Auth Store + Login UI

> Commit: `feat: add Google login with Firebase Auth`
> **Pre-requisito manual:** Criar projeto Firebase Console + habilitar Google sign-in

### Instalar
```bash
npm install firebase
```
~30KB gzip (auth module, tree-shakeable)

### Criar arquivos

| Arquivo | Descricao |
|---------|-----------|
| `src/lib/firebase.ts` | `initializeApp()` + `getAuth()` + `GoogleAuthProvider` com env vars |
| `src/store/auth-store.ts` | Zustand store (NAO persiste): user, isLoading, syncStatus, error |
| `src/hooks/use-auth.ts` | `useAuthListener()` — `onAuthStateChanged` -> atualiza auth store |
| `src/components/auth/login-button.tsx` | Botao "Entrar" com `signInWithPopup` |
| `src/components/auth/user-menu.tsx` | Avatar + dropdown (nome, email, sync dot, "Sair") |
| `.env.example` | Template das env vars Firebase (commitado) |
| `tests/store/auth-store.test.ts` | ~7 testes do store |
| `tests/components/auth/login-button.test.tsx` | ~3 testes |
| `tests/components/auth/user-menu.test.tsx` | ~6 testes |

### Modificar arquivos

| Arquivo | Mudanca |
|---------|---------|
| `src/store/index.ts` | Adicionar export do `useAuthStore` |
| `src/main.tsx` | `AuthWrapper` component que chama `useAuthListener()`, envolve Routes |
| `src/App.tsx` | Adicionar `<LoginButton />` + `<UserMenu />` no header |
| `src/components/mobile/mobile-header.tsx` | Mesmo: LoginButton + UserMenu |
| `src/types/index.ts` | Adicionar `AuthUser` e `SyncStatus` types |
| `vite-env.d.ts` | Tipagem das `VITE_FIREBASE_*` env vars |
| `tests/setup.ts` | Mock completo de `firebase/app`, `firebase/auth`, `firebase/firestore` |
| `.gitignore` | Adicionar `.env.local` |
| `package.json` | Dependencia `firebase` |

### Resultado visivel
- Header mostra botao "Entrar" (desktop + mobile)
- Click abre popup Google -> apos login, avatar aparece no header
- Dropdown com nome, email, sync dot (idle), botao "Sair"
- App funciona 100% igual sem login
- 401+ testes passando (Firebase mockado)

---

## FASE 2 — Firestore Sync Service

> Commit: `feat: add Firestore bidirectional sync for settings and history`

### Criar arquivos

| Arquivo | Descricao |
|---------|-----------|
| `src/lib/firestore.ts` | `getFirestore(app)` instance |
| `src/services/firestore-sync.ts` | CRUD: `fetchUserSettings`, `saveUserSettings`, `fetchUserHistory`, `saveUserHistory`, `createOrUpdateUserProfile` |
| `src/hooks/use-firestore-sync.ts` | Hook: pull on login, debounced push on changes (5s), sync status |
| `tests/services/firestore-sync.test.ts` | ~7 testes (mock Firestore) |
| `tests/hooks/use-firestore-sync.test.ts` | ~7 testes (debounce, pull, push, error) |

### Modificar arquivos

| Arquivo | Mudanca |
|---------|---------|
| `src/main.tsx` | Chamar `useFirestoreSync()` no AuthWrapper |
| `src/store/history-store.ts` | Adicionar `subscribeWithSelector` middleware (additive, nao quebra) |
| `src/components/auth/user-menu.tsx` | Sync dot agora funcional (tooltip com status) |

### Logica de sync
1. **Login** -> pull settings + history do Firestore -> aplicar nos stores via `importSettings()` / `importHistory()` (metodos ja existentes)
2. **Mudanca** -> Zustand subscribe detecta -> debounce 5s -> push ao Firestore
3. **Guest mode** -> zero chamadas Firestore

### Resultado visivel
- Login puxa dados da nuvem (dot amarelo piscando -> verde)
- Mudar settings -> dot amarelo -> verde apos sync
- Simular -> history sincroniza
- Outro dispositivo: login -> dados aparecem
- Offline/erro -> dot vermelho

---

## FASE 3 — Migracao Guest -> Usuario

> Commit: `feat: add migration dialog for first-time login with local data`

### Criar arquivos

| Arquivo | Descricao |
|---------|-----------|
| `src/components/auth/migration-dialog.tsx` | Modal: "Dados Locais Encontrados" com opcoes Importar / Comecar do Zero |
| `tests/components/auth/migration-dialog.test.tsx` | ~4 testes |
| `tests/services/firestore-sync-migration.test.ts` | ~6 testes |

### Modificar arquivos

| Arquivo | Mudanca |
|---------|---------|
| `src/store/auth-store.ts` | Adicionar `showMigrationDialog` + `setShowMigrationDialog` |
| `src/hooks/use-firestore-sync.ts` | Logica: se conta nova + localStorage tem dados -> mostrar dialog |
| `src/services/firestore-sync.ts` | Adicionar `checkLocalDataExists()` helper |
| `src/main.tsx` | Renderizar `<MigrationDialog />` condicionalmente |

### Fluxo
1. Primeiro login + localStorage tem custom materials/history -> mostra dialog
2. "Importar" -> push localStorage ao Firestore -> fecha dialog
3. "Comecar do Zero" -> cria docs vazios no Firestore -> fecha dialog
4. Logins subsequentes -> pula dialog, pull direto

### Resultado visivel
- Primeiro login mostra modal com resumo dos dados locais
- Escolher importar ou comecar limpo
- Logins futuros: direto ao app

---

## FASE 4 — Security Rules + Offline + Error Handling

> Commit: `feat: add Firestore security rules, offline support, retry logic`

### Criar arquivos

| Arquivo | Descricao |
|---------|-----------|
| `firestore.rules` | Regras: so owner le/escreve seus dados |
| `firebase.json` | Config do projeto Firebase (rules path) |
| `firestore.indexes.json` | Vazio (sem indexes customizados) |
| `src/services/sync-retry.ts` | `withRetry()` — exponential backoff, max 3 retries |
| `tests/services/sync-retry.test.ts` | ~4 testes |

### Modificar arquivos

| Arquivo | Mudanca |
|---------|---------|
| `src/lib/firestore.ts` | Habilitar offline persistence (IndexedDB cache) |
| `src/services/firestore-sync.ts` | Envolver chamadas com `withRetry()` |
| `src/hooks/use-firestore-sync.ts` | Rate limiting (max 10 writes/min) |
| `src/components/auth/user-menu.tsx` | UI de erro: mensagem + botao "Tentar novamente" |

### Resultado visivel
- App funciona offline (cache IndexedDB do Firestore)
- Falhas de rede: dot vermelho + mensagem + retry
- Rate limiting protege contra flood de writes
- Dados protegidos: so o owner acessa seus documentos

---

## FASE 5 — Testes de Integracao

> Commit: `test: comprehensive auth/sync integration tests`

### Criar arquivos

| Arquivo | Testes |
|---------|--------|
| `tests/integration/auth-flow.test.tsx` | ~6 testes: guest mode, login flow, data sync, history sync, logout, cross-device |
| `tests/integration/migration-flow.test.tsx` | ~4 testes: first login + local data, import, skip, returning user |

### Verificar
- Todos os 401 testes originais passam sem mudanca
- Total estimado: ~455 testes em ~35 arquivos

---

## Setup Manual (pre-requisito antes da FASE 1)

O usuario deve fazer isso ANTES de iniciar a implementacao:

### 1. Firebase Console (`https://console.firebase.google.com`)
- Criar projeto (ex: `tooloptimizer-cnc`)
- Authentication -> Sign-in method -> Google -> Habilitar
- Firestore Database -> Create database -> Production mode
- Adicionar dominio autorizado: `app.tooloptimizercnc.com.br`

### 2. Google Cloud Console (`https://console.cloud.google.com`)
- APIs & Services -> Credentials -> OAuth 2.0 Client
- Authorized redirect URIs: `https://YOUR-PROJECT.firebaseapp.com/__/auth/handler`

### 3. Copiar config para `.env.local`
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 4. GitHub Secrets (para CI/CD)
- Adicionar as mesmas vars como secrets do repository
- Atualizar workflow de deploy para inclui-las no build

---

## Resumo

| Fase | Commit | Arquivos Novos | Testes Novos | Tempo Est. |
|------|--------|----------------|--------------|------------|
| 1 — Auth + UI | `feat:` | 9 | ~16 | ~2h |
| 2 — Sync | `feat:` | 5 | ~14 | ~2h |
| 3 — Migracao | `feat:` | 3 | ~10 | ~1h |
| 4 — Security | `feat:` | 5 | ~4 | ~1.5h |
| 5 — Integracao | `test:` | 2 | ~10 | ~1.5h |

**Total: ~8 horas** (5 sessoes independentes)
**Bundle impact:** +~65KB gzip (Firebase Auth 30KB + Firestore 35KB)
**Testes finais:** ~455 (de 401 atuais)

---

*Criado em: 26/02/2026 — Plano aprovado pelo usuario*
*Roadmap de implementacao: `docs/IMPLEMENTACAO_LOGIN.md`*
