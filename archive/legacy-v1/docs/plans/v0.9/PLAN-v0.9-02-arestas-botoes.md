# PLAN v0.9-02 — Arestas (Z) → 4 Botões

> **Status:** 📋 Pronto para implementar
> **Complexidade:** Baixa
> **Versão alvo:** v0.9.1

---

## Objetivo

Substituir o dropdown de Arestas (Z) por 4 botões selecionáveis (`2 | 3 | 4 | 6`), usando o mesmo padrão visual dos botões de Tipo de Ferramenta e Tipo de Usinagem já existentes no ConfigPanel.

---

## Arquivos Afetados

| Arquivo | O que muda |
|---------|-----------|
| `src/components/config-panel.tsx` | Substituir `DropdownRow` de Arestas por grid de 4 botões |
| `tests/components/config-panel.test.tsx` | Reescrever testes de dropdown → botões |

---

## Detalhamento Técnico

### 1. Mudanças em `src/components/config-panel.tsx`

#### Remover (linhas 252-259):

```tsx
// ANTES — remover isto:
<DropdownRow
  label="Arestas (Z)"
  value={ferramenta.numeroArestas}
  options={ARESTAS_OPTIONS}
  onChange={(v) => setFerramenta({ numeroArestas: v })}
  format={(v) => `${v} arestas`}
/>
```

#### Substituir por:

```tsx
{/* 4. Arestas — 4 Botões [2, 3, 4, 6] */}
<div className="px-3 py-2">
  <span className="text-sm font-semibold text-white/85 mb-2 block">Arestas (Z)</span>
  <div className="grid grid-cols-4 gap-2">
    {([2, 3, 4, 6] as const).map((z) => (
      <button key={z} onClick={() => setFerramenta({ numeroArestas: z })}
        className={`py-2 rounded border text-base transition-colors ${
          ferramenta.numeroArestas === z
            ? 'bg-primary text-black font-bold border-primary shadow-neon-cyan'
            : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10'
        }`}>
        {z}
      </button>
    ))}
  </div>
</div>
```

**Padrão visual copiado de:** Botões de Tipo de Ferramenta (config-panel.tsx linhas 220-229):
- Ativo: `bg-primary text-black font-bold border-primary shadow-neon-cyan`
- Inativo: `bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 border-white/10`
- Grid: `grid-cols-4` (4 opções em linha)

#### Import (linha 3):

Remover `ARESTAS_OPTIONS` do import de `@/data` — valores `[2, 3, 4, 6]` hardcoded inline (são fixos, não precisam de constante).

### 2. Store / Types — sem mudanças

`setFerramenta({ numeroArestas: z })` já funciona. `numeroArestas` é `number` no type `Ferramenta`.

---

## Testes

### Testes a reescrever (`tests/components/config-panel.test.tsx`)

| Teste atual (linhas) | Ação |
|---|---|
| `arestas renders as dropdown (select)` (179-182) | Reescrever: verificar que existem 4 botões com texto "2", "3", "4", "6" |
| `arestas dropdown has 4 options [2,3,4,6]` (184-190) | Reescrever: `getAllByRole('button')` filtrar por texto, verificar 4 |
| `selecting arestas dropdown updates store` (192-197) | Reescrever: `fireEvent.click(button "3")` → verificar `ferramenta.numeroArestas === 3` |

### Novos testes

```
- 'arestas button 4 is active by default' (default store = 4)
  → verificar que botão "4" tem classe 'bg-primary'

- 'clicking arestas button updates visual state'
  → clicar "2", verificar que "2" tem 'bg-primary' e "4" não tem

- 'one arestas button is always selected'
  → após qualquer clique, exatamente 1 botão tem classe ativa
```

---

## Dependências

- **Nenhuma** — completamente independente

---

## Riscos / Cuidados

- Mudança mínima e isolada — risco baixo
- Garantir que testes existentes do dropdown de arestas sejam atualizados para botões
- Manter label "Arestas (Z)" acima do grupo de botões para contexto
- Um botão sempre selecionado — sem estado "nenhum" (garantido pelo store default)

---

## Critérios de Conclusão

- [ ] Dropdown substituído por 4 botões em grid `grid-cols-4`
- [ ] Estilo ativo = cyan neon (`bg-primary text-black font-bold shadow-neon-cyan`)
- [ ] Um botão sempre selecionado (sem estado vazio)
- [ ] Default = 4 (valor do store)
- [ ] Label "Arestas (Z)" visível acima dos botões
- [ ] Testes atualizados + novos passando
- [ ] Build sem erros TypeScript
