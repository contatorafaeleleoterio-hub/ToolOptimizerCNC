# ITEM #2 — ATUALIZAÇÃO 1.2: Botão "Editar Ferramenta"

**Status:** ✅ APROVADO
**Data:** 30/03/2026

---

## O quê / Onde / Impacto

- **O quê:** Adicionar botão lápis (editar) ao lado do ícone de lixeira em cada ferramenta salva
- **Onde:** Configurações → aba Ferramentas — componente da lista "Ferramentas Salvas"
- **Impacto visual:** Cada ferramenta salva exibe dois ícones: ✏️ (editar) + 🗑️ (deletar)

---

## Decisões

| # | Decisão | Detalhe |
|---|---------|---------|
| 1 | **Local do botão** | Ao lado do ícone de lixeira existente, na mesma linha de cada ferramenta salva |
| 2 | **Ação ao clicar** | Abre modal com formulário pré-preenchido com dados da ferramenta selecionada |
| 3 | **Comportamento ao salvar** | Substituição in-place — edita a ferramenta existente na lista, NÃO cria nova entrada |
| 4 | **Novo componente** | `ToolEditModal.tsx` em `src/components/modals/` |
| 5 | **Store** | Novo método `updateFerramenta(id, dados)` ou `editFerramenta()` no store de ferramentas salvas |

---

## Campos editáveis no modal

Os mesmos campos usados no cadastro original:
- Tipo (ex: Toroidal, Esférica, Flat)
- Diâmetro (Ø)
- Raio (R)
- Altura de Fixação (H)
- Número de Hélices/Flautas

---

## Notas

- Modal deve carregar dados da ferramenta selecionada ao abrir
- Ao confirmar, salvar no índice original da lista (sem duplicar)
- Ao cancelar, fechar sem alteração

---

## Mapeamento Técnico do Codebase

### Componentes Envolvidos

| Componente | Arquivo | Linhas | Relevância |
|------------|---------|--------|------------|
| `ConfigPanel` | `src/components/config-panel.tsx` | 1-362 | Seção Ferramenta com dropdown saved tools |
| Saved Tools dropdown | `src/components/config-panel.tsx` | 210-244 | Local onde adicionar botão ✏️ |
| `NumberInputRow` | `src/components/config-panel.tsx` | 25-81 | Reutilizar no modal (input numérico com validação) |
| `useMachiningStore` | `src/store/machining-store.ts` | 147-632 | Store central — `savedTools[]`, `addSavedTool`, `removeSavedTool` |
| `MobileConfigSection` | `src/components/mobile/mobile-config-section.tsx` | 177-262 | Versão mobile da seção Ferramenta |

### Estado Atual — Saved Tools no Store

```ts
// src/store/machining-store.ts — actions existentes
addSavedTool: (tool) => { ... }    // L494-503 — verifica duplicata, gera nome, push
removeSavedTool: (id) => { ... }   // L505-507 — filter por id
loadSavedTool: (id) => { ... }     // L509-519 — find + setFerramenta + autoPopulate
```

**Função utilitária (machining-store.ts:132-138):**
```ts
function gerarNomeFerramenta(
  f: Pick<Ferramenta, 'tipo' | 'diametro' | 'raioQuina' | 'numeroArestas' | 'balanco'>
): string {
  const tipoLabel = f.tipo === 'toroidal' ? 'Toroidal' : f.tipo === 'esferica' ? 'Esférica' : 'Topo';
  const raio = f.tipo === 'toroidal' && f.raioQuina != null ? ` - R${f.raioQuina}` : '';
  return `${tipoLabel} Ø${f.diametro}${raio} - H${f.balanco} - A${f.numeroArestas}`;
}
```

### Interface SavedTool

```ts
// src/types/index.ts:218-227
interface SavedTool {
  id: string;           // crypto.randomUUID()
  nome: string;         // "Topo Ø10 - H20 - A4" | "Toroidal Ø10 - R1 - H20 - A4"
  tipo: Ferramenta['tipo'];  // 'toroidal' | 'esferica' | 'topo'
  diametro: number;
  raioQuina?: number;   // toroidal only
  numeroArestas: number;
  balanco: number;
  createdAt: string;    // ISO 8601
}
```

### Ponto de Inserção do Botão ✏️ (config-panel.tsx:210-244)

```tsx
// ANTES: dropdown + botão save (L210-244)
<div className="flex items-center gap-2">
  <select ...>  {/* dropdown das ferramentas salvas */} </select>
  <button onClick={handleSaveTool} ...>  {/* botão save */} </button>
</div>
// DEPOIS: adicionar botões ✏️ e 🗑️ por ferramenta no dropdown ou em lista expandida
```

> **Nota:** O dropdown atual não mostra botões por item. Opções:
> - (A) Substituir `<select>` por lista visual com cards (permite botões por item)
> - (B) Manter `<select>` + adicionar ícones ✏️🗑️ que operam na ferramenta selecionada
> - **Recomendação:** Opção (A) — lista visual com cards, cada um com ✏️🗑️, padrão mais acessível

---

## Plano de Implementação

### Arquivos a Criar / Modificar

| Arquivo | Ação | Linhas afetadas |
|---------|------|-----------------|
| `src/store/machining-store.ts` | Adicionar action `updateSavedTool(id, partial)` | Após L507 (removeSavedTool) |
| `src/components/modals/tool-edit-modal.tsx` | **Criar** — modal com formulário pré-preenchido | Novo arquivo |
| `src/components/config-panel.tsx` | Substituir dropdown por lista + botões ✏️🗑️, integrar modal | L210-244 |
| `src/components/mobile/mobile-config-section.tsx` | Mesma substituição para mobile | Seção Ferramenta (~L177-262) |

### Sequência de Execução

1. **Adicionar action no store** — `updateSavedTool(id: string, updates: Partial<Omit<SavedTool, 'id' | 'createdAt'>>)`:
   ```ts
   updateSavedTool: (id, updates) => {
     set((state) => ({
       savedTools: state.savedTools.map((t) =>
         t.id === id ? { ...t, ...updates, nome: gerarNomeFerramenta({ ...t, ...updates }) } : t
       ),
     }));
   },
   ```
   - Regenerar `nome` automaticamente via `gerarNomeFerramenta()` — mantém consistência
2. **Verificar/criar pasta `src/components/modals/`** — pode não existir (verificar com `ls`)
3. **Criar `tool-edit-modal.tsx`**:
   - Props: `{ tool: SavedTool; onSave: (updates) => void; onClose: () => void }`
   - 5 campos: tipo (3 botões), diâmetro (NumberInput), raio (condicional toroidal), arestas (4 botões [2,3,4,6]), fixação (NumberInput)
   - Reutilizar `NumberInputRow` se possível (exportar de config-panel ou extrair)
   - Botões: "Salvar" (chama `onSave`) + "Cancelar" (chama `onClose`)
   - Overlay: `fixed inset-0 z-50 bg-black/60 backdrop-blur-sm` + card centralizado
4. **Integrar no config-panel.tsx**:
   - State local: `const [editingTool, setEditingTool] = useState<SavedTool | null>(null)`
   - Substituir `<select>` por lista de cards (ou manter select + adicionar botões laterais)
   - Botão ✏️: `onClick={() => setEditingTool(tool)}`
   - Botão 🗑️: `onClick={() => removeSavedTool(tool.id)}` (já existe a action)
   - Renderizar `<ToolEditModal>` condicionalmente quando `editingTool !== null`
5. **Replicar no mobile** (mobile-config-section.tsx) — mesma lógica adaptada

### Dependências

- **Depende de:** nenhum item
- **Bloqueia:** ITEM-8 (mobile replica — precisa replicar o botão Editar no mobile)

### Edge Cases e Riscos

| Risco | Mitigação |
|-------|-----------|
| `NumberInputRow` é definido internamente em `config-panel.tsx` (não exportado) | Extrair para arquivo shared ou duplicar no modal |
| Editar tipo de `toroidal` → `topo` deve limpar `raioQuina` | No save: se `tipo !== 'toroidal'`, setar `raioQuina: undefined` |
| Editar ferramenta que está atualmente carregada no store | Atualizar `savedTools[]` mas NÃO alterar `ferramenta` ativa — são independentes |
| Pasta `src/components/modals/` pode não existir | Criar com `mkdir -p` antes de escrever o arquivo |

### Critérios de Aceitação

- Botão ✏️ visível ao lado de cada ferramenta salva
- Modal abre pré-preenchido com dados da ferramenta selecionada
- Salvar atualiza in-place (não duplica) — `nome` regenerado automaticamente
- Cancelar fecha sem alteração
- Validação: diâmetro > 0, numeroArestas ∈ [2,3,4,6], balanco > 0, raioQuina ≥ 0 (se toroidal)
- Troca de tipo `toroidal` → outro limpa `raioQuina`

### Testes

| Teste | Descrição |
|-------|-----------|
| `opens modal with pre-filled data` | Campos do modal = dados da ferramenta selecionada |
| `closes modal without changes on cancel` | Store inalterado após cancelar |
| `saves edited tool in-place` | `savedTools[i]` atualizado, mesmo `id`, `nome` regenerado |
| `validates diameter > 0` | Input inválido (0, negativo) rejeitado |
| `validates numeroArestas in [2,3,4,6]` | Outros valores rejeitados |
| `clears raioQuina when changing from toroidal` | Se tipo muda para `topo`/`esferica`, `raioQuina` vira `undefined` |
| `does not affect active ferramenta` | Editar savedTool não altera `store.ferramenta` |

---

## Estimativa de Complexidade

| Ação | Peso |
|------|------|
| Action `updateSavedTool` no store | 1 |
| Criar `tool-edit-modal.tsx` | 3 |
| Integrar no config-panel (botão + state + modal) | 2 |
| Replicar no mobile | 2 |
| Testes (7 casos) | 2 |
| **Total** | **10 pontos (~1 sessão)** |

---

## Checklist de Verificação

```bash
npm run typecheck   # Zero erros TypeScript
npm run test -- --run   # Todos os testes passando
npm run build       # Build sem erros
```

---

## REFINAMENTO FINAL (31/03/2026)

### Decisões Resolvidas

| Decisão | Resolução |
|---------|-----------|
| Dropdown `<select>` vs lista visual de cards | **Opção A confirmada** — lista visual de cards com botões ✏️🗑️ por item |
| `NumberInputRow` não exportado | **Duplicar** a lógica no `tool-edit-modal.tsx` (input numérico simples com clamp) — não extrair para evitar mudança no config-panel |
| Pasta `src/components/modals/` | Criar com `mkdir` antes de escrever — verificar existência primeiro |

### Imports Adicionais

**`src/store/machining-store.ts`** — nenhum import novo (só nova action inline)

**`src/components/config-panel.tsx`**:
```ts
import { useState } from 'react';                                  // já existe provavelmente
import { ToolEditModal } from './modals/tool-edit-modal';          // NOVO
import type { SavedTool } from '@/types/index';                    // NOVO (se não importado)
```

**`src/components/modals/tool-edit-modal.tsx`** (arquivo novo):
```ts
import { useState } from 'react';
import type { SavedTool } from '@/types/index';
```

### Código Proposto — `updateSavedTool` no store (Depois)

```ts
// src/store/machining-store.ts — inserir após removeSavedTool (L507)
updateSavedTool: (id, updates) =>
  set((state) => ({
    savedTools: state.savedTools.map((t) =>
      t.id === id
        ? { ...t, ...updates, nome: gerarNomeFerramenta({ ...t, ...updates }) }
        : t
    ),
  })),
```

### Código Proposto — Lista de Cards em `config-panel.tsx` (Depois)

```tsx
// Substituir bloco <select> + botão save (L210-244)
// State local no componente:
const [editingTool, setEditingTool] = useState<SavedTool | null>(null);

// JSX da lista:
{savedTools.length > 0 && (
  <div className="flex flex-col gap-1 mt-1">
    {savedTools.map((tool) => (
      <div key={tool.id}
        className="flex items-center justify-between px-2 py-1.5 rounded-lg
                   bg-black/20 border border-white/8 hover:bg-white/5 transition-colors"
      >
        <button
          className="flex-1 text-left text-xs font-mono text-gray-300 truncate"
          onClick={() => loadSavedTool(tool.id)}
        >
          {tool.nome}
        </button>
        <div className="flex items-center gap-1 ml-2">
          <button
            aria-label={`Editar ${tool.nome}`}
            onClick={() => setEditingTool(tool)}
            className="text-gray-500 hover:text-primary transition-colors p-0.5"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>edit</span>
          </button>
          <button
            aria-label={`Remover ${tool.nome}`}
            onClick={() => removeSavedTool(tool.id)}
            className="text-gray-500 hover:text-red-400 transition-colors p-0.5"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>delete</span>
          </button>
        </div>
      </div>
    ))}
  </div>
)}

{editingTool && (
  <ToolEditModal
    tool={editingTool}
    onSave={(updates) => { updateSavedTool(editingTool.id, updates); setEditingTool(null); }}
    onClose={() => setEditingTool(null)}
  />
)}
```

### Código Proposto — `tool-edit-modal.tsx` (Novo arquivo)

```tsx
// src/components/modals/tool-edit-modal.tsx
import { useState } from 'react';
import type { SavedTool } from '@/types/index';

interface ToolEditModalProps {
  tool: SavedTool;
  onSave: (updates: Partial<Omit<SavedTool, 'id' | 'createdAt'>>) => void;
  onClose: () => void;
}

export function ToolEditModal({ tool, onSave, onClose }: ToolEditModalProps) {
  const [tipo, setTipo]         = useState(tool.tipo);
  const [diametro, setDiametro] = useState(tool.diametro);
  const [raio, setRaio]         = useState(tool.raioQuina ?? 0);
  const [arestas, setArestas]   = useState(tool.numeroArestas);
  const [balanco, setBalanco]   = useState(tool.balanco);

  const handleSave = () => {
    if (diametro <= 0 || balanco <= 0) return;
    if (tipo === 'toroidal' && raio > diametro / 2) return; // raio não pode exceder D/2
    onSave({
      tipo,
      diametro,
      raioQuina: tipo === 'toroidal' ? raio : undefined,
      numeroArestas: arestas,
      balanco,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[rgba(20,28,40,0.98)] border border-white/12 rounded-2xl
                      p-5 w-80 shadow-glass flex flex-col gap-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-300">
          Editar Ferramenta
        </h3>

        {/* Tipo */}
        <div className="flex gap-2">
          {(['topo', 'toroidal', 'esferica'] as const).map((t) => (
            <button key={t}
              onClick={() => setTipo(t)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase border transition-all
                ${tipo === t
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-black/30 border-white/10 text-gray-500 hover:border-white/20'}`}
            >{t}</button>
          ))}
        </div>

        {/* Diâmetro */}
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Diâmetro (mm)</span>
          <input type="number" min={0.1} max={100} step={0.1} value={diametro}
            onChange={(e) => setDiametro(Number(e.target.value))}
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5
                       font-mono text-sm text-white outline-none focus:border-primary/50" />
        </label>

        {/* Raio (só toroidal) */}
        {tipo === 'toroidal' && (
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Raio de Quina (mm)</span>
            <input type="number" min={0} max={diametro / 2} step={0.1} value={raio}
              onChange={(e) => setRaio(Number(e.target.value))}
              className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5
                         font-mono text-sm text-white outline-none focus:border-primary/50" />
          </label>
        )}

        {/* Arestas */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Arestas (Z)</span>
          <div className="flex gap-2">
            {[2, 3, 4, 6].map((n) => (
              <button key={n} onClick={() => setArestas(n)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all
                  ${arestas === n
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-black/30 border-white/10 text-gray-500 hover:border-white/20'}`}
              >{n}</button>
            ))}
          </div>
        </div>

        {/* Balanço / Fixação */}
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Fixação (mm)</span>
          <input type="number" min={1} max={200} step={1} value={balanco}
            onChange={(e) => setBalanco(Number(e.target.value))}
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5
                       font-mono text-sm text-white outline-none focus:border-primary/50" />
        </label>

        {/* Ações */}
        <div className="flex gap-2 pt-1">
          <button onClick={onClose}
            className="flex-1 py-2 rounded-xl border border-white/10 text-xs
                       text-gray-500 hover:bg-white/5 transition-colors">
            Cancelar
          </button>
          <button onClick={handleSave}
            disabled={diametro <= 0 || balanco <= 0}
            className="flex-1 py-2 rounded-xl bg-primary/20 border border-primary/50
                       text-xs font-bold text-primary hover:bg-primary/30 transition-colors
                       disabled:opacity-40 disabled:cursor-not-allowed">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Testes — Nomes Exatos (describe/it)

```ts
describe('ToolEditModal', () => {
  it('renders with pre-filled data from tool prop', ...)
  it('closes without changes when cancel is clicked', ...)
  it('closes without changes when overlay is clicked', ...)
  it('calls onSave with updated data when save is clicked', ...)
  it('saves tool in-place — same id, nome regenerated', ...)
  it('clears raioQuina when tipo changes from toroidal to topo', ...)
  it('disables save button when diametro is 0', ...)
})

describe('updateSavedTool store action', () => {
  it('updates tool fields in-place by id', ...)
  it('regenerates nome after update', ...)
  it('does not affect active ferramenta in store', ...)
})
```

### Correções de Auditoria (01/04/2026)

#### Snippet Mobile (mobile-config-section.tsx)

```tsx
// src/components/mobile/mobile-config-section.tsx
// Mesma estrutura do desktop, adaptada para mobile:
// 1. Adicionar state: const [editingTool, setEditingTool] = useState<SavedTool | null>(null);
// 2. Substituir a seção de ferramentas salvas por lista de cards (igual ao desktop)
// 3. Renderizar <ToolEditModal> quando editingTool !== null
// 4. Import: import { ToolEditModal } from '@/components/modals/tool-edit-modal';
// O modal já tem overlay fullscreen (fixed inset-0) — funciona bem em mobile.
```

#### Validação `raioQuina <= diametro/2`

Adicionada ao `handleSave` no snippet do `tool-edit-modal.tsx` acima:
`if (tipo === 'toroidal' && raio > diametro / 2) return;`
