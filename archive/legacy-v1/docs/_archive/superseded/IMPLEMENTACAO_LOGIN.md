# Implementacao por Sessoes — Login Google + Multi-Usuario

> **PARA O PROXIMO ASSISTENTE — LEIA ISTO PRIMEIRO**
>
> Este documento controla o progresso da implementacao do login Google.
> **1 fase = 1 sessao.** Ao iniciar uma sessao, encontre a proxima fase pendente e execute-a por completo.
> O plano detalhado de cada fase esta em `docs/PLANO_LOGIN_GOOGLE.md`.
> Ao concluir, marque como concluido aqui e atualize PROXIMA_SESSAO.md + MEMORY.md.
>
> **PRE-REQUISITO:** O usuario deve completar o Setup Manual (ver PLANO_LOGIN_GOOGLE.md)
> antes de iniciar a FASE 1. Verificar se `.env.local` existe com as vars Firebase.

---

## Status Geral

| Sessao | Fase | Status | Commit |
|--------|------|--------|--------|
| L1 | FASE 1 — Firebase Setup + Auth + UI | ⬜ Pendente | — |
| L2 | FASE 2 — Firestore Sync Service | ⬜ Pendente | — |
| L3 | FASE 3 — Migracao Guest -> Usuario | ⬜ Pendente | — |
| L4 | FASE 4 — Security + Offline + Retry | ⬜ Pendente | — |
| L5 | FASE 5 — Testes de Integracao | ⬜ Pendente | — |

---

## FASE 1 — Firebase Setup + Auth Store + Login UI
**Status:** ⬜ Pendente
**Commit esperado:** `feat: add Google login with Firebase Auth`
**Plano detalhado:** `docs/PLANO_LOGIN_GOOGLE.md` -> secao FASE 1

### Pre-requisito:
- [ ] Verificar se `.env.local` existe com `VITE_FIREBASE_*` vars
- [ ] Verificar se Firebase Console tem Google sign-in habilitado
- [ ] Se nao existir, orientar usuario a completar Setup Manual

### Tarefas:
- [ ] **1A.** Instalar Firebase: `npm install firebase`
- [ ] **1B.** Criar `src/lib/firebase.ts`
  - `initializeApp()` com env vars
  - `getAuth()` + `GoogleAuthProvider`
  - Export `auth`, `googleProvider`
- [ ] **1C.** Adicionar types em `src/types/index.ts`
  - `AuthUser { uid, displayName, email, photoURL }`
  - `SyncStatus = 'idle' | 'syncing' | 'synced' | 'error'`
- [ ] **1D.** Criar `src/store/auth-store.ts`
  - Zustand store (SEM persist)
  - State: `user: AuthUser | null`, `isLoading: boolean`, `syncStatus: SyncStatus`, `error: string | null`
  - Actions: `setUser`, `setLoading`, `setSyncStatus`, `setError`, `logout`
- [ ] **1E.** Criar `src/hooks/use-auth.ts`
  - `useAuthListener()` — `onAuthStateChanged` listener
  - Set user on login, clear on logout
  - Return cleanup function
- [ ] **1F.** Criar `src/components/auth/login-button.tsx`
  - Botao "Entrar com Google" com icone
  - `signInWithPopup(auth, googleProvider)` on click
  - Loading state durante popup
  - Design: glassmorphism, cores do tema
- [ ] **1G.** Criar `src/components/auth/user-menu.tsx`
  - Avatar circular (photoURL ou iniciais)
  - Dropdown: nome, email, sync status dot, botao "Sair"
  - `signOut(auth)` on "Sair" click
- [ ] **1H.** Modificar `src/main.tsx`
  - Criar `AuthWrapper` que chama `useAuthListener()`
  - Envolver Routes com AuthWrapper
- [ ] **1I.** Modificar `src/App.tsx`
  - Importar LoginButton + UserMenu
  - Renderizar no header (condicional: mostra LoginButton se !user, UserMenu se user)
- [ ] **1J.** Modificar `src/components/mobile/mobile-header.tsx`
  - Mesmo padrao do desktop: LoginButton / UserMenu no header
- [ ] **1K.** Criar `.env.example` (template commitavel, sem valores reais)
- [ ] **1L.** Modificar `.gitignore` — adicionar `.env.local`
- [ ] **1M.** Modificar `vite-env.d.ts` — tipagem VITE_FIREBASE_* vars
- [ ] **1N.** Modificar `tests/setup.ts` — mock completo Firebase
  - Mock `firebase/app` (`initializeApp`)
  - Mock `firebase/auth` (`getAuth`, `onAuthStateChanged`, `signInWithPopup`, `signOut`, `GoogleAuthProvider`)
  - Mock `firebase/firestore` (para fases futuras)
- [ ] **1O.** Criar testes:
  - [ ] `tests/store/auth-store.test.ts` (~7 testes)
  - [ ] `tests/components/auth/login-button.test.tsx` (~3 testes)
  - [ ] `tests/components/auth/user-menu.test.tsx` (~6 testes)

### Quality Gates:
- [ ] `npx vitest run` -> todos passando (401+ testes, Firebase mockado)
- [ ] `npx tsc --noEmit` -> zero erros
- [ ] `npx vite build` -> build limpo
- [ ] Visual: botao "Entrar" visivel no header (desktop + mobile)
- [ ] Guest mode: app funciona 100% igual sem login

### Ao concluir:
- [ ] `git add` arquivos especificos + `git commit -m "feat: add Google login with Firebase Auth"`
- [ ] `git push origin main`
- [ ] Marcar FASE 1 como ✅ neste documento
- [ ] Atualizar `docs/PROXIMA_SESSAO.md` e `memory/MEMORY.md`
- [ ] Notificar usuario: **"FASE 1 (Login) concluida. Iniciar nova sessao para FASE 2."**

---

## FASE 2 — Firestore Sync Service
**Status:** ⬜ Pendente
**Commit esperado:** `feat: add Firestore bidirectional sync for settings and history`
**Plano detalhado:** `docs/PLANO_LOGIN_GOOGLE.md` -> secao FASE 2

### Tarefas:
- [ ] **2A.** Criar `src/lib/firestore.ts`
  - `getFirestore(app)` instance
  - Export `db`
- [ ] **2B.** Criar `src/services/firestore-sync.ts`
  - [ ] `createOrUpdateUserProfile(uid, data)` — set with merge
  - [ ] `fetchUserSettings(uid)` — getDoc
  - [ ] `saveUserSettings(uid, settings)` — setDoc with updatedAt
  - [ ] `fetchUserHistory(uid)` — getDoc
  - [ ] `saveUserHistory(uid, history)` — setDoc with updatedAt
- [ ] **2C.** Criar `src/hooks/use-firestore-sync.ts`
  - Pull on login: fetch settings + history -> `importSettings()` / `importHistory()`
  - Push on change: Zustand subscribe -> debounce 5s -> save
  - Update syncStatus in auth-store
  - Skip all if guest mode (!user)
- [ ] **2D.** Modificar `src/main.tsx`
  - Chamar `useFirestoreSync()` no AuthWrapper
- [ ] **2E.** Modificar `src/store/history-store.ts`
  - Adicionar `subscribeWithSelector` middleware (nao quebra)
- [ ] **2F.** Modificar `src/components/auth/user-menu.tsx`
  - Sync dot funcional: idle=cinza, syncing=amarelo piscando, synced=verde, error=vermelho
  - Tooltip com status text
- [ ] **2G.** Criar testes:
  - [ ] `tests/services/firestore-sync.test.ts` (~7 testes)
  - [ ] `tests/hooks/use-firestore-sync.test.ts` (~7 testes)

### Quality Gates:
- [ ] Todos os testes passando
- [ ] TypeScript limpo
- [ ] Build limpo
- [ ] Sync dot muda de cor corretamente

### Ao concluir:
- [ ] Commit + push
- [ ] Marcar FASE 2 como ✅ neste documento
- [ ] Atualizar PROXIMA_SESSAO.md e MEMORY.md
- [ ] Notificar usuario: **"FASE 2 (Sync) concluida. Iniciar nova sessao para FASE 3."**

---

## FASE 3 — Migracao Guest -> Usuario
**Status:** ⬜ Pendente
**Commit esperado:** `feat: add migration dialog for first-time login with local data`
**Plano detalhado:** `docs/PLANO_LOGIN_GOOGLE.md` -> secao FASE 3

### Tarefas:
- [ ] **3A.** Modificar `src/store/auth-store.ts`
  - Adicionar `showMigrationDialog: boolean` + `setShowMigrationDialog`
- [ ] **3B.** Adicionar `checkLocalDataExists()` em `src/services/firestore-sync.ts`
  - Verifica se localStorage tem custom materials ou history entries
- [ ] **3C.** Criar `src/components/auth/migration-dialog.tsx`
  - Modal padrao (glassmorphism, backdrop blur)
  - Titulo: "Dados Locais Encontrados"
  - Resumo: X materiais customizados, Y calculos no historico
  - Botao "Importar para Nuvem" -> push local data ao Firestore
  - Botao "Comecar do Zero" -> cria docs vazios
  - Design consistente com modais existentes (CorrectionModal pattern)
- [ ] **3D.** Modificar `src/hooks/use-firestore-sync.ts`
  - No pull: se conta nova (Firestore vazio) + local tem dados -> setShowMigrationDialog(true)
  - Se usuario logado retornando -> pull direto, pula dialog
- [ ] **3E.** Modificar `src/main.tsx`
  - Renderizar `<MigrationDialog />` condicionalmente
- [ ] **3F.** Criar testes:
  - [ ] `tests/components/auth/migration-dialog.test.tsx` (~4 testes)
  - [ ] `tests/services/firestore-sync-migration.test.ts` (~6 testes)

### Quality Gates:
- [ ] Todos os testes passando
- [ ] TypeScript limpo
- [ ] Build limpo
- [ ] Fluxo: primeiro login com dados locais -> dialog aparece

### Ao concluir:
- [ ] Commit + push
- [ ] Marcar FASE 3 como ✅ neste documento
- [ ] Atualizar PROXIMA_SESSAO.md e MEMORY.md
- [ ] Notificar usuario: **"FASE 3 (Migracao) concluida. Iniciar nova sessao para FASE 4."**

---

## FASE 4 — Security Rules + Offline + Error Handling
**Status:** ⬜ Pendente
**Commit esperado:** `feat: add Firestore security rules, offline support, retry logic`
**Plano detalhado:** `docs/PLANO_LOGIN_GOOGLE.md` -> secao FASE 4

### Tarefas:
- [ ] **4A.** Criar `firestore.rules`
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId}/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
  ```
- [ ] **4B.** Criar `firebase.json` (config do projeto, rules path)
- [ ] **4C.** Criar `firestore.indexes.json` (vazio, sem indexes customizados)
- [ ] **4D.** Criar `src/services/sync-retry.ts`
  - `withRetry(fn, maxRetries=3)` — exponential backoff (1s, 2s, 4s)
  - Return result or throw after max retries
- [ ] **4E.** Modificar `src/lib/firestore.ts`
  - Habilitar `enableIndexedDbPersistence(db)` (offline cache)
- [ ] **4F.** Modificar `src/services/firestore-sync.ts`
  - Envolver todas as chamadas com `withRetry()`
- [ ] **4G.** Modificar `src/hooks/use-firestore-sync.ts`
  - Rate limiting: max 10 writes/min (token bucket)
- [ ] **4H.** Modificar `src/components/auth/user-menu.tsx`
  - Error state: mensagem de erro + botao "Tentar novamente"
- [ ] **4I.** Criar testes:
  - [ ] `tests/services/sync-retry.test.ts` (~4 testes)

### Quality Gates:
- [ ] Todos os testes passando
- [ ] TypeScript limpo
- [ ] Build limpo
- [ ] Security rules validadas (so owner acessa seus dados)

### Ao concluir:
- [ ] Commit + push
- [ ] Marcar FASE 4 como ✅ neste documento
- [ ] Atualizar PROXIMA_SESSAO.md e MEMORY.md
- [ ] Notificar usuario: **"FASE 4 (Security) concluida. Iniciar nova sessao para FASE 5."**

---

## FASE 5 — Testes de Integracao
**Status:** ⬜ Pendente
**Commit esperado:** `test: comprehensive auth/sync integration tests`
**Plano detalhado:** `docs/PLANO_LOGIN_GOOGLE.md` -> secao FASE 5

### Tarefas:
- [ ] **5A.** Criar `tests/integration/auth-flow.test.tsx`
  - [ ] Guest mode: app funciona sem login, nenhuma chamada Firebase
  - [ ] Login flow: signInWithPopup -> user no store -> UI atualiza
  - [ ] Data sync: login -> pull do Firestore -> stores atualizados
  - [ ] History sync: simular -> history push ao Firestore
  - [ ] Logout: signOut -> user null -> UI volta a LoginButton
  - [ ] Cross-device: login em "outro dispositivo" -> pull dados corretos
- [ ] **5B.** Criar `tests/integration/migration-flow.test.tsx`
  - [ ] First login + local data -> dialog aparece
  - [ ] Import: dados locais vao pro Firestore
  - [ ] Skip: Firestore recebe docs vazios
  - [ ] Returning user: pula dialog, pull direto

### Quality Gates:
- [ ] Todos os 401 testes originais passam SEM mudanca
- [ ] Novos testes de integracao passam
- [ ] Total estimado: ~455 testes em ~35 arquivos
- [ ] TypeScript limpo
- [ ] Build limpo

### Ao concluir:
- [ ] Commit + push
- [ ] Marcar FASE 5 como ✅ neste documento
- [ ] Atualizar PROXIMA_SESSAO.md e MEMORY.md
- [ ] **Login Google completo!**
- [ ] Considerar version bump (ex: 0.3.0 -> 0.4.0)
- [ ] Notificar usuario: **"FASE 5 (Testes) concluida. Login Google totalmente implementado!"**

---

## Resumo de Impacto

| Metrica | Antes | Depois |
|---------|-------|--------|
| Testes | ~401 | ~455 |
| Arquivos novos | — | ~24 |
| Bundle (gzip) | ~107KB | ~172KB (+65KB Firebase) |
| Dependencias | 0 backend | firebase (client SDK) |
| Infra | Cloudflare Worker | + Firebase Auth + Firestore |

---

## Historico de Execucao

| Data | Sessao | Quem | Resultado |
|------|--------|------|-----------|
| — | L1 | — | — |
| — | L2 | — | — |
| — | L3 | — | — |
| — | L4 | — | — |
| — | L5 | — | — |

---

*Criado em: 26/02/2026 — Plano aprovado pelo usuario*
*Referencia: `docs/PLANO_LOGIN_GOOGLE.md` para detalhes completos de cada fase*
