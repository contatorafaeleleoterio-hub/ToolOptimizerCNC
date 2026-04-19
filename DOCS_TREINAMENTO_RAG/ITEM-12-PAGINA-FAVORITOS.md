# ITEM-12 — Página de Favoritos

**Status:** ⬜ Pendente
**Grupo:** E — Sistema de Favoritos
**Depende de:** ITEM-10 (useFavoritesStore)

---

## Conceito

Nova página dedicada a listar, visualizar e gerenciar todos os favoritos salvos.

---

## Navegação

- Adicionar botão "⭐ Favoritos" no Dashboard (local de destaque, visível sem scroll)
- Botão deve navegar para a rota `/favoritos` (mobile) ou abrir painel lateral (desktop) — escolher conforme padrão de navegação já existente no projeto
- Verificar o sistema de rotas atual antes de implementar

---

## Layout da Página

```
┌─ Favoritos ──────────────────────────────┐
│  [🔍 Buscar]  [Filtrar por Material ▼]   │
│  [Filtrar por Operação ▼]   [Ordenar ▼]  │
│                                           │
│  ┌─ Card Favorito ──────────────────────┐│
│  │  📅 28/03/2025 14:32                 ││
│  │  🔵 Aço Carbono · Desbaste · Topo    ││
│  │  ─────────────────────────────────   ││
│  │  Vc: 120 m/min   fz: 0.15 mm        ││
│  │  ae: 3.0 mm      ap: 1.5 mm         ││
│  │  ─────────────────────────────────   ││
│  │  [dados do resultado — espelho       ││
│  │   do visor no momento do favorito]   ││
│  │  ─────────────────────────────────   ││
│  │  📝 Nota: [vazio]                    ││
│  │  [✏️ Editar]  [🗑️ Remover]  [↩️ Usar]││
│  └──────────────────────────────────────┘│
│                                           │
│  [+ mais cards...]                        │
└───────────────────────────────────────────┘
```

---

## Ações por Card

| Ação | Comportamento |
|------|--------------|
| ✏️ Editar | Abre edição inline dos parâmetros e nota (ver ITEM-10) |
| 🗑️ Remover | Confirmação simples → remove do store |
| ↩️ Usar | Carrega os parâmetros do favorito de volta no Fine-Tune Panel e navega para lá |

---

## Filtros

- Por material (dropdown)
- Por tipo de operação (dropdown)
- Ordenação: mais recente primeiro (padrão) / mais antigo / por material

---

## Estado Vazio

Mostrar mensagem explicativa + botão direto para "Simular agora"

---

## Checklist Pré-Implementação

```bash
# 1. Verificar sistema de rotas atual
grep -r "Route\|useNavigate\|router" src/ --include="*.tsx" | head -10

# 2. Localizar sidebar footer (onde adicionar link)
find src/ -name "*sidebar*" -o -name "*footer*"

# 3. Verificar páginas existentes como referência
ls src/pages/
```

---

## Decisão de Navegação

Usar rota `/favoritos` — consistente com `/history` que já existe no projeto. Desktop e mobile usam a mesma rota.

---

## Regras Gerais

- Usar `src/pages/history-page.tsx` como referência de padrão (filtros, cards, ações)
- Estilo visual: seguir dark theme existente do projeto (sem introduzir novos tokens de cor)
- Ação "Usar": carrega params no store e navega para home (mesma lógica de "Restaurar" do histórico)

---

## Mapeamento Técnico do Codebase

### Sistema de Rotas (react-router-dom)

```tsx
// src/main.tsx:38-72 — BrowserRouter com Routes
<BrowserRouter basename={basename || '/'}>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/mobile" element={<MobilePage />} />
    <Route path="/history" element={<HistoryPage />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="/architecture" element={<ArchitecturePage />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboardPage />} />
      <Route path="tasks" ... />
      {/* ... mais rotas admin ... */}
    </Route>
  </Routes>
</BrowserRouter>
```

**Nova rota:** Adicionar `<Route path="/favoritos" element={<FavoritesPage />} />` após `/settings`.

### Componentes de Navegação

| Componente | Arquivo | Linhas | Relevância |
|------------|---------|--------|------------|
| `SidebarFooter` | `src/components/sidebar-footer.tsx` | 1-52 | Link "Favoritos" existente (L16-25) → já navega para `/history?filter=favoritos` |
| `useNavigate` | react-router-dom | — | Usado no SidebarFooter e em pages para navegação |

**SidebarFooter atual (L16-25):**
```tsx
<button onClick={() => navigate('/history?filter=favoritos')}
  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg ...">
  <span className="material-symbols-outlined">star</span>
  <span className="flex-1 text-left">Favoritos</span>
  {favoriteCount > 0 && <span className="text-xs font-mono text-yellow-400/70">{favoriteCount}</span>}
</button>
```

> **MIGRAR:** Mudar de `navigate('/history?filter=favoritos')` para `navigate('/favoritos')` e contagem de `useHistoryStore` para `useFavoritesStore`.

### Referência: history-page.tsx (466 linhas)

| Seção | Linhas | O que faz |
|-------|--------|-----------|
| CSS constants | 15-16 | `CARD`, `LABEL` classes reutilizáveis |
| Tipo labels | 18-22 | `TIPO_LABELS` map |
| Filters card | 156-217 | Material search, operation dropdown, feedback dropdown, favorites toggle |
| Entry cards | 300-455 | Summary row + expanded details + restore/remove buttons |
| Empty state | ~275 | Mensagem quando sem entries |

**Padrões a reutilizar:**
- `CARD` class: `"bg-[rgba(30,38,50,0.95)] backdrop-blur-sm border border-white/12 rounded-2xl"`
- `LABEL` class: `"text-xs font-bold tracking-wider text-gray-400 uppercase"`
- Ação "Restaurar": `setParametros(entry.parametros)` + `setMaterial(entry.materialId)` + `setFerramenta(entry.ferramenta)` + `navigate('/')`

### Interface FavoritoCompleto (de ITEM-10)

```ts
interface FavoritoCompleto {
  id: string;
  timestamp: string;
  materialId: number;
  materialNome: string;
  tipoOperacao: TipoUsinagem;
  ferramenta: Ferramenta;
  parametros: ParametrosUsinagem;
  resultado: ResultadoUsinagem;
  safetyFactor: number;
  editedAt: string | null;
  userNote: string;
}
```

---

## Plano de Implementação

### Arquivos a Criar / Modificar

| Arquivo | Ação | Linhas afetadas |
|---------|------|-----------------|
| `src/pages/favorites-page.tsx` | **Criar** — página com lista de cards, filtros, ações | Novo arquivo |
| `src/main.tsx` | Adicionar `<Route path="/favoritos" element={<FavoritesPage />} />` | Após L44 (route /settings) |
| `src/components/sidebar-footer.tsx` | Migrar link Favoritos de `/history?filter=favoritos` → `/favoritos` + contagem de `useFavoritesStore` | L8-9 (import), L16-25 (botão) |

### Sequência de Execução

1. **Criar `favorites-page.tsx`** usando `history-page.tsx` como referência estrutural:
   - Header com título "Favoritos" + contagem
   - Filtros: dropdown material (extrair lista de `favorites.map(f => f.materialNome)` unique), dropdown operação (`TipoUsinagem` enum), ordenação (recente/antigo/material)
   - Lista de cards com dados do `FavoritoCompleto`
   - Estado vazio: ícone star + "Nenhum favorito salvo" + botão "Simular agora" → `navigate('/')`

2. **Implementar card de favorito:**
   ```
   ┌─────────────────────────────────────────────┐
   │ 📅 28/03/2026 14:32                          │
   │ Aço 1045 · Desbaste · Toroidal Ø6            │
   │ ─────────────────────────────────────────── │
   │ Vc: 176 m/min  fz: 0.14 mm                  │
   │ ae: 2.2 mm     ap: 4.2 mm                   │
   │ ─────────────────────────────────────────── │
   │ RPM: 9.337  Avanço: 8.635 mm/min            │
   │ Potência: 3.39 kW  MRR: 68.9 cm³/min        │
   │ ─────────────────────────────────────────── │
   │ 📝 Nota: [vazio ou texto do userNote]        │
   │ [✏️ Editar]  [🗑️ Remover]  [↩️ Usar]         │
   └─────────────────────────────────────────────┘
   ```
   - CSS: reutilizar `CARD` pattern do history-page
   - Dados: `favorito.materialNome`, `favorito.tipoOperacao`, `favorito.ferramenta.tipo`, `favorito.parametros.*`, `favorito.resultado.*`

3. **Implementar ações:**
   - **✏️ Editar:** Abre modal/inline com campos `parametros` (Vc, fz, ae, ap) + `userNote`
     - Ao salvar: `useFavoritesStore.updateFavorite(id, { parametros: newParams, resultado: recalculated, userNote })`
     - Recálculo: importar funções de `@/engine/index`
   - **🗑️ Remover:** Confirmação simples (window.confirm ou mini-dialog) → `useFavoritesStore.removeFavorite(id)`
   - **↩️ Usar:** Carregar no machining-store e navegar:
     ```ts
     const { setParametros, setMaterial, setFerramenta, setTipoOperacao } = useMachiningStore();
     setMaterial(favorito.materialId);
     setTipoOperacao(favorito.tipoOperacao);
     setFerramenta(favorito.ferramenta);
     setParametros(favorito.parametros);
     navigate('/');
     ```

4. **Implementar filtros:**
   - Material: `<select>` com opções únicas de `favorites.map(f => f.materialNome)`
   - Operação: `<select>` com `TipoUsinagem` values
   - Ordenação: mais recente (default) / mais antigo / por material (alpha)

5. **Adicionar rota** em `src/main.tsx`:
   ```tsx
   <Route path="/favoritos" element={<Suspense fallback={...}><FavoritesPage /></Suspense>} />
   ```
   - Usar `lazy()` + `Suspense` (padrão do projeto para pages)

6. **Migrar SidebarFooter** (L16-25):
   - Import: trocar `useHistoryStore` por `useFavoritesStore`
   - Contagem: `useFavoritesStore((s) => s.favorites.length)`
   - Navigate: `/favoritos` em vez de `/history?filter=favoritos`

### Dependências

- **Depende de:** ITEM-10 (`useFavoritesStore` — fornece `favorites[]`, `removeFavorite`, `updateFavorite`)
- **Bloqueia:** nenhum item

### Edge Cases e Riscos

| Risco | Mitigação |
|-------|-----------|
| Ação "Usar" chama `setMaterial` + `setFerramenta` + `setParametros` → zera resultado 3 vezes | Resultado é zerado por design (usuário precisa clicar Simular) — ok |
| `setFerramenta` recebe `Ferramenta` completo mas ação aceita `Partial<Ferramenta>` | Passar objeto completo — spread funciona |
| Material do favorito pode ter sido removido (custom material deletado) | Guard: verificar se materialId existe antes de `setMaterial`, mostrar warning se não |
| Edição de parâmetros requer recálculo — engine functions são síncronas | Importar `calculateRPM`, `calculateFeedRate`, etc. de `@/engine/index` |
| Lazy loading da page pode causar flash | Usar `Suspense` com fallback spinner (padrão do projeto) |

### Critérios de Aceitação

- Página lista todos os favoritos salvos com dados completos
- Filtros por material e operação funcionais (reduzem lista)
- Ordenação: recente/antigo/material
- Ação "Usar" carrega params no machining-store + navega para `/`
- Ação "Remover" com confirmação remove do store
- Ação "Editar" permite alterar params e nota + recalcula resultado
- Estado vazio com CTA "Simular agora" → navega para `/`
- Link "Favoritos" no SidebarFooter navega para `/favoritos`
- Contagem no SidebarFooter reflete `useFavoritesStore.favorites.length`
- Rota `/favoritos` acessível diretamente (deep link funcional)

### Testes

| Teste | Descrição |
|-------|-----------|
| `renders empty state when no favorites` | Mensagem + botão "Simular agora" |
| `renders cards for each favorite` | N cards para N favoritos |
| `filters by material` | Selecionar material reduz lista |
| `filters by operation type` | Selecionar operação reduz lista |
| `action Usar navigates and loads params` | `setParametros` + `navigate('/')` chamados |
| `action Remover removes from store` | `favorites.length` diminui |
| `action Editar updates params and note` | `updateFavorite` chamado com novos valores |
| `route /favoritos accessible` | Renderiza FavoritesPage |
| `sidebar link navigates to /favoritos` | Click no "Favoritos" navega corretamente |

---

## Estimativa de Complexidade

| Ação | Peso |
|------|------|
| Criar `favorites-page.tsx` (layout + cards) | 4 |
| Implementar 3 ações (Editar, Remover, Usar) | 3 |
| Implementar filtros e ordenação | 2 |
| Estado vazio | 1 |
| Rota em main.tsx | 1 |
| Migrar SidebarFooter | 1 |
| Testes (9 casos) | 3 |
| **Total** | **15 pontos (~1.5 sessões)** |

---

## Checklist de Verificação

```bash
npm run typecheck   # Zero erros TypeScript
npm run test -- --run   # Todos os testes passando
npm run build       # Build sem erros
# Verificar: rota /favoritos acessível no browser
# Verificar: link no sidebar navega corretamente
```
