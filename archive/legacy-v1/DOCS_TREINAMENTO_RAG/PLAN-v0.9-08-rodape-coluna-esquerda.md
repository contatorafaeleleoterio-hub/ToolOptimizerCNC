# PLAN v0.9-08 — Rodapé Fixo da Coluna Esquerda

> **Status:** 📋 Pronto para implementar
> **Complexidade:** Média
> **Versão alvo:** v0.9.3

---

## Objetivo

Adicionar rodapé fixo na parte inferior da coluna de inputs (estilo Claude app) com navegação rápida: Favoritos, Histórico, Config e versão do app.

---

## Análise do Layout Atual

### App.tsx (linhas 34-41)

```tsx
<main className="flex-1 grid grid-cols-12 gap-3 min-h-0">
  <section className="col-span-3 overflow-y-auto pr-1">
    <ConfigPanel />
  </section>
  <section className="col-span-9 overflow-y-auto pr-2">
    <ResultsPanel />
  </section>
</main>
```

**Problema:** A `<section>` da coluna esquerda tem `overflow-y-auto` — o conteúdo inteiro scrolla. Para ter rodapé fixo, precisamos de **layout flex com área scrollável + footer fixo**.

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/App.tsx` | Ajuste da `<section>` esquerda: flex col + overflow interno |
| `src/components/sidebar-footer.tsx` | **NOVO** — Componente do rodapé |
| `src/components/config-panel.tsx` | Nenhuma alteração (já exporta corretamente) |
| `tests/components/sidebar-footer.test.tsx` | **NOVO** — Testes do rodapé |

---

## Detalhamento Técnico

### 1. App.tsx — Ajuste de layout (linha 35)

A `<section>` da coluna esquerda precisa virar flex container com footer fixo:

```diff
 <main className="flex-1 grid grid-cols-12 gap-3 min-h-0">
-  <section className="col-span-3 overflow-y-auto pr-1">
-    <ConfigPanel />
+  <section className="col-span-3 flex flex-col min-h-0 pr-1">
+    <div className="flex-1 overflow-y-auto">
+      <ConfigPanel />
+    </div>
+    <SidebarFooter />
   </section>
```

**Mudanças:**
- Remove `overflow-y-auto` da `<section>` → passa para um `<div>` interno
- Adiciona `flex flex-col min-h-0` à `<section>`
- `ConfigPanel` fica em `<div className="flex-1 overflow-y-auto">` — scrolla independente
- `SidebarFooter` fica **abaixo**, fixo no bottom (não scrolla)

**Import adicional:**
```typescript
import { SidebarFooter } from './components/sidebar-footer';
```

### 2. Novo componente: `src/components/sidebar-footer.tsx`

```tsx
import { useNavigate } from 'react-router-dom';
import { useHistoryStore } from '@/store/history-store';

const APP_VERSION = __APP_VERSION__;

export function SidebarFooter() {
  const navigate = useNavigate();
  const favoriteCount = useHistoryStore((s) =>
    s.entries.filter((e) => e.favorited).length
  );
  const historyCount = useHistoryStore((s) => s.entries.length);

  return (
    <div className="border-t border-white/10 bg-surface-dark/80 backdrop-blur-md pt-2 pb-1 px-2 space-y-1">
      {/* Favoritos */}
      <button
        onClick={() => navigate('/history?filter=favoritos')}
        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-yellow-400 hover:bg-white/5 transition-colors group"
      >
        <span className="material-symbols-outlined text-[18px] group-hover:text-yellow-400">star</span>
        <span className="flex-1 text-left">Favoritos</span>
        {favoriteCount > 0 && (
          <span className="text-xs font-mono text-yellow-400/70">{favoriteCount}</span>
        )}
      </button>

      {/* Histórico */}
      <button
        onClick={() => navigate('/history')}
        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors group"
      >
        <span className="material-symbols-outlined text-[18px]">history</span>
        <span className="flex-1 text-left">Histórico</span>
        {historyCount > 0 && (
          <span className="text-xs font-mono text-gray-500">{historyCount}</span>
        )}
      </button>

      {/* Divider + bottom row */}
      <div className="border-t border-white/5 pt-1 mt-1 flex items-center justify-between px-3">
        <span className="text-2xs text-gray-600">v{APP_VERSION}</span>
        <button
          onClick={() => navigate('/settings')}
          aria-label="Configurações"
          className="p-1 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </button>
      </div>
    </div>
  );
}
```

### 3. Versão do app via Vite define

O `vite.config.ts` **não tem** `__APP_VERSION__` configurado. Adicionar:

#### 3a. vite.config.ts — adicionar define:

```diff
+import pkg from './package.json' with { type: 'json' };
+
 export default defineConfig({
   base: process.env.VITE_BASE_URL || '/',
   plugins: [tailwindcss(), react(), cloudflare(), adminSyncPlugin()],
+  define: {
+    __APP_VERSION__: JSON.stringify(pkg.version),
+  },
```

#### 3b. Declaração de tipo (para TypeScript não reclamar):

Adicionar em `src/vite-env.d.ts` (ou criar se não existir):

```typescript
declare const __APP_VERSION__: string;
```

Verificar se já existe:

```
src/vite-env.d.ts → se existir, apenas adicionar a linha
```

### 4. Navegação "Favoritos" → history-page com filtro

O botão "Favoritos" navega para `/history?filter=favoritos`. A history-page precisa ler este query param e ativar o filtro de favoritos automaticamente.

**Na history-page.tsx**, no `useEffect` de inicialização:

```typescript
import { useSearchParams } from 'react-router-dom';

// Dentro do componente:
const [searchParams] = useSearchParams();

useEffect(() => {
  if (searchParams.get('filter') === 'favoritos') {
    setFilters({ favorited: true });
  }
}, [searchParams]);
```

> **Nota:** Isto depende do #03 (campo `favorited` + filtro na history-store) estar implementado. Se #03 não estiver pronto, o botão "Favoritos" simplesmente navega para `/history` sem filtro.

---

## Dimensionamento

O rodapé tem ~80px de altura:
- 2 botões: `py-1.5` × 2 = ~60px
- Bottom row (versão + config): ~20px
- Padding: `pt-2 pb-1` = ~12px
- **Total: ~80-92px** — dentro do limite de 100px

---

## Testes

### Novos testes: `tests/components/sidebar-footer.test.tsx`

```
- 'renders Favoritos button with star icon'
- 'renders Histórico button with history icon'
- 'renders settings gear icon'
- 'renders app version'
- 'Favoritos shows count from history store'
- 'Favoritos count is 0 when no favorites → hides counter'
- 'clicking Favoritos navigates to /history?filter=favoritos'
- 'clicking Histórico navigates to /history'
- 'clicking settings navigates to /settings'
```

### Testes atualizados: `tests/App.test.tsx` (se existir)

```
- 'sidebar footer is visible below ConfigPanel'
- 'ConfigPanel area scrolls independently of footer'
```

---

## Dependências

- **Item #3** (Favoritar) — necessário para o contador de favoritos e filtro `?filter=favoritos`
  - **Sem #3:** Botão "Favoritos" navega para `/history` sem filtro, contador mostra 0. Funciona, mas sem valor.
  - **Com #3:** Experiência completa.
- **Nenhuma outra dependência**

---

## Riscos / Cuidados

- **Layout flexbox:** A mudança em App.tsx altera o modelo de scroll da coluna esquerda. Testar que:
  - O conteúdo do ConfigPanel continua scrollável
  - O footer **não** scrolla junto
  - Não há "salto" visual ao scroll
- **`min-h-0`** é crítico no `<section>` — sem ele, flex items não encolhem e o overflow não funciona
- **`useNavigate`** funciona porque o App está dentro de `<BrowserRouter>` (confirmado em main.tsx)
- **Versão:** `__APP_VERSION__` é resolvido em build time. Se o Vite define não funcionar com `import pkg`, usar `JSON.stringify(require('./package.json').version)` ou ler via `fs`.
  - **Alternativa segura:** Hardcode `'0.9.x'` e atualizar manualmente (pragmático para MVP)
- **"Mapa do Sistema" NÃO aparece aqui** — exclusivo admin via `/admin`
- **Operador (placeholder):** Removido do escopo deste plano — não há sistema de login. Pode ser adicionado futuramente.

---

## Critérios de Conclusão

- [ ] Componente `SidebarFooter` criado com botões Favoritos, Histórico, Config e versão
- [ ] Footer fixo no bottom da coluna esquerda (não scrolla com o conteúdo)
- [ ] ConfigPanel continua scrollável independentemente
- [ ] Botão Favoritos navega para `/history?filter=favoritos`
- [ ] Botão Histórico navega para `/history`
- [ ] Botão Config (⚙) navega para `/settings`
- [ ] Versão do app exibida (lida do package.json via Vite define)
- [ ] Contador de favoritos visível (se > 0)
- [ ] Contador de histórico visível (se > 0)
- [ ] Visual glassmorphic consistente com o resto do app
- [ ] `__APP_VERSION__` tipado no vite-env.d.ts
- [ ] Testes passando
- [ ] Build sem erros TypeScript
