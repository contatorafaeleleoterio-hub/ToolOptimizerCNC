# Melhorias Contínuas — ToolOptimizer CNC

> Sugestões de melhoria gradual para desenvolvimento sustentável do sistema.
> Prioridade: impacto para o operador + facilidade de implementação.
> Atualizado: 07/03/2026

---

## 🔴 Prioridade Alta (próximas sessões)

### 1. Fix teste falhando — fz step mobile
- **Status:** 1 teste falhando em `mobile-fine-tune-section.test.tsx`
- **Teste:** "increase button increases fz by step"
- **Impacto:** Meta de 573/573 testes passando (zero falhas)
- **Esforço:** ~15 min

### 2. Version bump package.json
- **Status:** package.json diz 0.4.0, mas Story-007 (v0.4.1) e unificação (v0.4.2) já foram entregues
- **Ação:** Editar `package.json` → `"version": "0.4.2"`
- **Esforço:** ~2 min

### 3. Validação visual pós-deploy
- **Status:** Deploy automático deve ter ocorrido após push
- **Ação:** Verificar `tooloptimizercnc.com.br` — 4 barras unidirecionais visíveis
- **Esforço:** ~5 min

---

## 🟡 Prioridade Média (quando conveniente)

### 4. Cobertura de testes — mobile components
- **Contexto:** Mobile fine-tune tem menos cobertura que desktop
- **Sugestão:** Adicionar testes de integração para TouchSlider + ParameterHealthBar no mobile
- **Benefício:** Detectar regressões em interações touch
- **Esforço:** ~1h

### 5. Health bar — feedback visual de "recomendado"
- **Contexto:** Tick mark de "recomendado" existe mas é sutil (1px, 35% opacidade)
- **Sugestão:** Adicionar tooltip ou label "Rec" ao hover do tick mark
- **Benefício:** Operador entende imediatamente onde está o valor ideal
- **Esforço:** ~30 min

### 6. Tooltip nos indicadores de saúde
- **Contexto:** Zonas (verde/amarelo/vermelho) têm labels textuais mas sem explicação
- **Sugestão:** Tooltip ao hover mostrando "ratio: 85% do recomendado" ou similar
- **Benefício:** Transparência — operador entende o porquê da classificação
- **Esforço:** ~45 min

### 7. Performance — memoização do calcularSliderBounds
- **Contexto:** `calcularSliderBounds()` é chamado 4x por render (1x por ParameterHealthBar)
- **Sugestão:** Mover para fora do componente individual, calcular 1x no ParameterHealthBar pai ou via useMemo
- **Benefício:** Menos recálculos desnecessários
- **Esforço:** ~30 min
- **Nota:** Impacto real é mínimo (função é leve), mas é boa prática

### 8. Acessibilidade — aria-labels nos health bars
- **Contexto:** Health bars são visuais mas sem aria-label descritivo
- **Sugestão:** `aria-label="Velocidade de corte: 85% do recomendado, zona verde"`
- **Benefício:** Screen readers podem descrever o estado
- **Esforço:** ~20 min

---

## 🟢 Prioridade Baixa (futuro)

### 9. Dark/Light theme toggle
- **Contexto:** App é dark-only
- **Sugestão:** Adicionar toggle light theme para operadores em ambientes claros
- **Esforço:** ~4h (precisa de segundo conjunto de design tokens)

### 10. Export PDF profissional
- **Contexto:** Descartado para MVP (inútil em chão de fábrica)
- **Reavaliar quando:** Operadores pedirem documentação de setup
- **Esforço:** ~6h

### 11. Comparação side-by-side de simulações
- **Contexto:** Operador pode querer comparar 2 configurações
- **Sugestão:** Selecionar 2 entradas do histórico e ver diff visual
- **Esforço:** ~8h

### 12. Internacionalização (i18n)
- **Contexto:** UI 100% em pt-BR, code em inglês
- **Sugestão:** Extrair strings para arquivos de tradução
- **Reavaliar quando:** Houver demanda internacional
- **Esforço:** ~12h

---

## 📐 Princípios de Melhoria Contínua

1. **Gradual:** Uma melhoria por sessão, bem testada, bem documentada
2. **Mínimo viável:** Menor mudança que entrega valor ao operador
3. **Zero regressão:** Testes devem passar 100% antes de mergear
4. **Documentar decisões:** Toda mudança significativa tem registro em PROXIMA_SESSAO.md
5. **Validar com usuário:** Mudanças de UX devem ser aprovadas antes de implementar
6. **Reusar infraestrutura:** Mapear código existente antes de criar novo (calcularSliderBounds é exemplo)
7. **Testes primeiro:** TDD para cálculos; testes de integração para componentes

---

## 📊 Métricas de Saúde do Projeto

| Métrica | Valor Atual | Meta |
|---------|-------------|------|
| Testes passando | 572/573 (99.8%) | 100% |
| TypeScript erros | 0 | 0 |
| Bundle JS gzip | 95.03 KB | < 120 KB |
| Bundle CSS gzip | 13.02 KB | < 20 KB |
| Arquivos de teste | 35 | Crescer com features |
| Versão | 0.4.2 | 1.0.0 (MVP completo) |

---

*Criado: 07/03/2026 — Sessão de unificação dos indicadores de ajuste fino*
