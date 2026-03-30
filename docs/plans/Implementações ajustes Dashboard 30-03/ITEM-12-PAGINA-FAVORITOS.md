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

```powershell
# 4. Localizar painel de configurações existente
Get-ChildItem -Path "src" -Recurse -Filter "*settings*","*config*","*configurac*"

# 5. Verificar sistema de rotas
Select-String -Path "src\**\*.tsx" -Pattern "Route|useNavigate|router" -Recurse | Select-Object -First 10
```

---

## Regras Gerais

- Nunca criar arquivos novos sem verificar se já existe equivalente no projeto
- O painel de configurações já existe — localizar e estender, não criar novo
- Estilo visual: seguir dark theme existente do projeto (sem introduzir novos tokens de cor)
