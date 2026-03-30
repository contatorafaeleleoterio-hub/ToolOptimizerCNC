# ITEM-10 — Sistema de Favoritos ("Fotografia de Resultado")

**Status:** ⬜ Pendente
**Grupo:** E — Sistema de Favoritos

---

## Conceito

Quando o usuário clica "Favoritar" em um resultado, o sistema deve salvar uma fotografia completa daquele momento: todos os dados que estão sendo exibidos no visor de resultados naquele instante.

---

## Regra de Implementação

- Identificar quais campos o visor de resultados exibe atualmente
- O favorito deve salvar exatamente esses campos — nem mais, nem menos
- Estrutura dinâmica: quando o visor for atualizado no futuro, os novos campos devem ser incluídos automaticamente (não hardcode de campos)

---

## Estrutura do Favorito

Cada favorito deve conter:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Único — timestamp + hash |
| `timestamp` | string | Data/hora do salvamento |
| `materialId` | string | Contexto do material |
| `tipoOperacao` | string | Contexto da operação |
| `ferramentaTipo` | string | Contexto da ferramenta |
| `parametros` | object | Inputs do usuário: Vc, fz, ae, ap |
| `resultado` | object | Snapshot completo do objeto de resultado do store no momento do clique |
| `editedAt` | string \| null | null por padrão, preenchido se usuário editar |
| `userNote` | string | String vazia por padrão, editável |

---

## Armazenamento

- Persistir em localStorage com chave `fenix_favorites_v1`
- Usar Zustand store separado: `useFavoritesStore`
- Limite sugerido: 50 favoritos (remover o mais antigo ao ultrapassar)

---

## Edição de Favorito

- Cada favorito deve ter botão "Editar"
- Ao editar: abrir modal ou inline form com os campos de `parametros` e `userNote`
- Ao salvar edição: atualizar `parametros`, recalcular resultado com base nos novos parâmetros, atualizar `editedAt`
- O campo `resultado` editado deve usar a mesma função de cálculo do motor principal

---

## Checklist Pré-Implementação

```powershell
# 1. Mapear stores existentes
Get-ChildItem -Path "src\store" -Recurse | Select-Object Name

# 2. Verificar se useFavoritesStore já existe
Select-String -Path "src\**\*.ts","src\**\*.tsx" -Pattern "favorites" -Recurse

# 6. Localizar botão favoritar existente (se houver)
Select-String -Path "src\**\*.tsx" -Pattern "favorit|Favorit" -Recurse
```

---

## Regras Gerais

- Antes de criar store novo, verificar se o store principal (machiningStore) pode ser estendido
- O visor de resultados está em atualização — não hardcodar campos de resultado. Usar spread do objeto resultado do store.
- Estilo visual: seguir dark theme existente do projeto (sem introduzir novos tokens de cor)
