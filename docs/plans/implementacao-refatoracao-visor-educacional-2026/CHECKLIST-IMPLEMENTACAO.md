# ✅ Checklist de Implementação

## FASE 1: Visor Desktop (Results Panel)

### ATUALIZAÇÃO 1.1: Layout Base em Grid
- [ ] Criar nova estrutura grid em `results-panel.tsx`
- [ ] Remover flexbox caótico anterior
- [ ] Implementar 4 seções principais:
  - [ ] Seção 1: Ferramenta (4 cards — tipo, diâmetro, raio, fixação)
  - [ ] Seção 2: Material + Operação (2 cards)
  - [ ] Seção 3: RPM + Avanço (2 cards grandes)
  - [ ] Seção 4: Potência/MRR/Torque/Vc Real (4 cards)
- [ ] Aplicar styling uniforme (borders, cores, padding)
- [ ] Testar responsividade desktop
- [ ] Rodar testes: `npm run test`
- [ ] Verificar TypeScript: `npm run typecheck`

### ATUALIZAÇÃO 1.2: Botão Editar Ferramenta
- [ ] Criar novo arquivo `src/components/modals/ToolEditModal.tsx`
- [ ] Implementar modal com campos editáveis (tipo, diâmetro, raio, fixação)
- [ ] Adicionar botão "EDITAR FERRAMENTA" na seção 1
- [ ] Integrar modal ao resultados-panel.tsx
- [ ] Testar abertura/fechamento modal
- [ ] Testar salvar mudanças
- [ ] Validar campos (ranges válidos)

### ATUALIZAÇÃO 1.3: BigNumber Sliders
- [ ] Verificar localização dos sliders existentes em `shared-result-parts.tsx`
- [ ] Reorganizar posição em `results-panel.tsx` (após seção 3)
- [ ] Ajustar spacing/layout
- [ ] Testar interação (drag, input)

### ATUALIZAÇÃO 1.4: Reposicionar Badges
- [ ] Mover SafetyBadge para topo
- [ ] Mover botão Favorite para topo (lado direito)
- [ ] Criar linha/container flex separado
- [ ] Testar visual alinhamento

### ATUALIZAÇÃO 1.5: Integrar Gauges
- [ ] Reorganizar 3 gauges após seção 4
- [ ] Ajustar tamanho (size="md")
- [ ] Grid 3 colunas
- [ ] Testar renderização e valores

### ATUALIZAÇÃO 1.6: Warnings Section
- [ ] Implementar seção de avisos
- [ ] Condição: mostrar apenas se há avisos
- [ ] Styling: border red, background red/5
- [ ] Testar com avisos presentes e ausentes

**Status: ⬜ Pendente**

---

## FASE 2: Configurações + Ajuste Fino

### ATUALIZAÇÃO 2.1: Safety Factor Slider Padronizado
- [ ] Abrir `src/components/mobile/mobile-config-section.tsx`
- [ ] Localizar `<input type="range">` nativo (linha ~277)
- [ ] Substituir por TouchSlider (mobile)
- [ ] Atualizar range: 0.5 → 1.0, step 0.05
- [ ] Mudar display: `safetyFactor.toFixed(2)` → `Math.round(safetyFactor * 100)%`
- [ ] Adicionar labels comparativos (50% = conservador, 100% = agressivo)
- [ ] Se houver `config-panel.tsx` (desktop), aplicar mesmas mudanças
- [ ] Testar mobile e desktop (se houver)
- [ ] Rodar testes

### ATUALIZAÇÃO 2.2: Botão Salvar Como Padrão
- [ ] Adicionar botão "SALVAR COMO PADRÃO" após slider
- [ ] Atualizar `src/stores/machining-store.ts`:
  - [ ] Adicionar `safetyFactorDefault: number`
  - [ ] Implementar getter/setter
  - [ ] Persistir em localStorage
- [ ] Implementar lógica ao carregar página (aplicar padrão)
- [ ] Testar salvar e recarregar página
- [ ] Validar persistência localStorage

### ATUALIZAÇÃO 3.1: Reposicionar SGB (SegmentedGradientBar)
- [ ] Desktop (`fine-tune-panel.tsx`):
  - [ ] Localizar seção do slider (linha ~121-129)
  - [ ] Mover SegmentedGradientBar ACIMA do BidirectionalSlider
  - [ ] Adicionar `active={resultado !== null}` prop
  - [ ] Testar visual sem simulação (opacidade 50%)
  - [ ] Testar visual com simulação (opacidade 100%)
- [ ] Mobile (`mobile-fine-tune-section.tsx`):
  - [ ] Localizar seção do slider (linha ~308-325)
  - [ ] Mover SGB ACIMA do +/Slider/- row
  - [ ] Usar segments={30} (vs 50 desktop)
  - [ ] Aplicar mesmos testes
- [ ] Rodar testes

### ATUALIZAÇÃO 3.2: Botão Explicação Melhorado
- [ ] Criar novo arquivo `src/components/ParamExplanation.tsx`
- [ ] Implementar componente reutilizável (popover/tooltip)
- [ ] Adicionar em `fine-tune-panel.tsx` (para cada parâmetro: Vc, fz, ae, ap)
- [ ] Adicionar em `mobile-fine-tune-section.tsx`
- [ ] Styling:
  - [ ] Botão grande e visível (bg-cyan-500/10)
  - [ ] Texto: "ℹ️ O QUE É {PARAM}?"
  - [ ] Tooltip com explicação educacional
- [ ] Testar hover em desktop
- [ ] Testar click em mobile
- [ ] Adicionar explicações customizadas por parâmetro

**Status: ⬜ Pendente**

---

## FASE 3: Mobile (Replica)

### ATUALIZAÇÃO 4.1: Replicar Visor em Mobile
- [ ] Aguardar conclusão de 1.1-1.6 (desktop pronto)
- [ ] Abrir `src/components/mobile/mobile-results-section.tsx`
- [ ] Copiar estrutura de 4 seções de desktop
- [ ] Adaptar para mobile:
  - [ ] Cards ligeiramente menores
  - [ ] Fonts reduzidas
  - [ ] Padding ajustado
  - [ ] Respeitar limites de tela (375px)
- [ ] Integrar ToolEditModal (se houver mobile version)
- [ ] Integrar BigNumber sliders
- [ ] Integrar 3 gauges (mobile size)
- [ ] Testar responsive (375px → 768px → 1360px)
- [ ] Rodar testes

**Status: ⬜ Pendente**

---

## FASE 4: Educação (Transversal)

### ATUALIZAÇÃO 5.1: Explicações Educacionais
- [ ] Adicionar tooltips em Ferramenta (tipo, descricao)
- [ ] Adicionar tooltips em Material (Vc recomendado, dureza)
- [ ] Adicionar tooltips em RPM/Avanço (por que esse valor?)
- [ ] Adicionar explanations em Warnings (o que significa? o que fazer?)
- [ ] Adicionar safety factor visual (barra de conservadorismo)
- [ ] Testar todos os tooltips
- [ ] Validar educação é clara e útil
- [ ] Rodar testes

**Status: ⬜ Pendente**

---

## TESTES GLOBAIS (Após cada fase)

### Testes de Componente
- [ ] `npm run test` — todos passando
- [ ] `npm run typecheck` — zero erros
- [ ] `npm run build` — sem warnings

### Testes Visuais (Manual)
- [ ] Desktop 1360px: layout correto?
- [ ] Mobile 375px: layout responsive?
- [ ] Cores consistentes?
- [ ] Fonts legíveis?
- [ ] Spacing uniforme?
- [ ] Botões clicáveis?

### Testes Funcionais
- [ ] Simular cálculo: valores aparecem?
- [ ] Ajustar parâmetros: valores atualizam?
- [ ] Editar ferramenta: salva?
- [ ] Salvar Safety default: persiste ao reload?
- [ ] SGB visual: posição correta?
- [ ] Tooltips: aparecem ao hover?

---

## CHECKLIST FINAL

### Antes de Commit
- [ ] Todos os testes passando
- [ ] TypeScript zero erros
- [ ] Build limpo
- [ ] Código formatado (eslint)
- [ ] Comentários adicionados onde necessário
- [ ] Commit message descritivo

### Antes de Push
- [ ] GitHub Actions passando
- [ ] Worker deploy automático
- [ ] Verificar na URL live
- [ ] Testar em navegador (latest Chrome, Firefox)
- [ ] Testar em mobile (iPhone, Android)

---

## Notas Importantes

1. **Ordem:** Não pular fases. Desktop → Mobile → Educação
2. **Referências:** Não modificar componentes auxiliares (segmented-gradient-bar, bidirectional-slider, etc.)
3. **Store:** Apenas atualizar `machining-store.ts` para `safetyFactorDefault`
4. **Modals:** Criar `ToolEditModal.tsx` só uma vez, reutilizar em desktop/mobile
5. **Educação:** Adicionar em FINAL, após todas as mudanças estruturais prontas

---

## Tempo Estimado (por fase)
- Fase 1: ~3-4 horas (1.1 é complexo)
- Fase 2: ~2 horas
- Fase 3: ~1.5 horas
- Fase 4: ~1 hora
- **Total:** ~7.5-8.5 horas (pode ser dividido em 2-3 sessões)
