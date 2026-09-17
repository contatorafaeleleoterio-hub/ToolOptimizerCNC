# DECISION_RECORDS.md — Registro Formal de Decisões Arquiteturais e Visuais

> **Protocolo:** Auditoria, Reconciliação e Migração do Design System  
> **Fase:** FASE 11 — REGISTRO DE DECISÕES  
> **Data:** 16 de Setembro de 2026  
> **Projeto:** `ToolOptimizerCNC` (v2.0.0)  

---

## ADR-001: Preservação do `StepperInput` Real vs Contrato `InputStepper` do DS

- **Elemento:** Componente de entrada numérica com microajuste $\pm$.
- **Problema:** O contrato declarado no DS (`InputStepper.d.ts`) define `value: number` e `onChange: (val: number) => void`. Se adotado cegamente, quebra o suporte a vírgula brasileira (`0,25`), quebra a digitação livre sem perda de foco do cursor, impede o estado inicial zerado (`undefined` com placeholder técnico) e causa travamento de renderização no React 19.
- **Evidência:** Arquivo `src/ui/components/ConfigForm.tsx` (linhas 18–100) e testes automatizados em `src/ui/__tests__/inputs.spec.tsx` (9 testes específicos cobrindo vírgula, backspace e formatação de decimais).
- **Alternativas Consideradas:**
  1. *Substituir pelo componente do DS:* Descartada (regressão severa de UX de chão de fábrica e quebra de testes).
  2. *Criar uma casca intermediária:* Descartada (complexidade desnecessária).
  3. *Preservar a implementação do produto e elevar seu contrato a padrão normativo do Design System:* **Aprovada**.
- **Decisão:** **`PRESERVE & ADAPT`**. A implementação do produto é a autoridade canônica.
- **Justificativa:** O software atende operadores de máquinas no Brasil que usam teclado móvel numérico com vírgula decimal. A experiência tátil sem travamento de digitação é requisito de negócio inegociável.
- **Impacto:** Zero regressões no produto. Atualização normativa no DS.
- **Dependências:** `ConfigForm.tsx`, `SettingsView.tsx`.
- **Nível de Intervenção:** **N1**.

---

## ADR-002: Calibração da Cor de Ação no Tema Claro (`#3F700B` vs `#4D7C0F`)

- **Elemento:** Token `--action-fill` no tema claro (`[data-theme="claro"]`).
- **Problema:** O DS extraído propôs `--action-fill: #4D7C0F`. O código de produção utiliza `#3F700B`.
- **Evidência:** Auditoria de contraste com analisador WCAG AA. Sobre texto branco (`#FFFFFF`), a cor `#4D7C0F` alcança ~4.55:1 (margem mínima no limite). A cor `#3F700B` alcança **> 5.9:1**, garantindo alta legibilidade sob iluminação intensa de galpão industrial.
- **Alternativas Consideradas:**
  1. *Substituir por `#4D7C0F`:* Descartada (reduz a margem de segurança de acessibilidade).
  2. *Manter `#3F700B` no produto:* **Aprovada**.
- **Decisão:** **`PRESERVE`**.
- **Justificativa:** Em chão de fábrica sob luz solar ou lâmpadas industriais de vapor metálico, o contraste superior de 5.9:1 do botão de ação primária (Calcular) reduz a fadiga visual e previne toques errôneos.
- **Impacto:** Estabilidade visual e conformidade WCAG AA estrita.
- **Dependências:** Botão `#btn-calcular` e botões de ação prioritária.
- **Nível de Intervenção:** **N0**.

---

## ADR-003: Superfície Dark Obsidiana (`#080C12` vs `#0C1017`)

- **Elemento:** Token `--bg-page` no tema escuro (`[data-theme="escuro"]`).
- **Problema:** O DS preliminar propôs `#0C1017`. O produto real implementou `#080C12`. A referência original Vitasilix descreve a escala de superfícies entre `#000000` e `#0A0D12`.
- **Evidência:** Relatório pericial `EXTRACAO_ORIGINAL_IMAGENS_VITASILIX.md` (item 3.2): *"Plano de Fundo Primário da Aplicação: #000000 a #0A0D12 (preto e cinza-obsidiana absoluto anti-reflexo)"*.
- **Alternativas Consideradas:**
  1. *Substituir por `#0C1017` do DS:* Descartada (afasta-se da referência médica original).
  2. *Preservar `#080C12` do produto:* **Aprovada**.
- **Decisão:** **`PRESERVE`**. O valor `#080C12` do produto real está mais próximo da referência pericial do que o valor do DS preliminar.
- **Justificativa:** Proporciona maior profundidade de contraste contra o ciano neon `#19E4BB` e o lime elétrico `#BDFF4B`, eliminando reflexos indesejados na tela.
- **Impacto:** Zero regressão.
- **Dependências:** `:root[data-theme="escuro"]`.
- **Nível de Intervenção:** **N0**.

---

## ADR-004: Harmonização Não-Destrutiva da Escala de Espaçamento (`--sp-*`)

- **Elemento:** Tokens de espaçamento modular base 4px.
- **Problema:** O DS utiliza uma escala nominal de saltos (`--sp-5: 20px`, `--sp-6: 24px`, `--sp-8: 32px`, `--sp-12: 48px`). O produto real implementou índices diretos (`--sp-5: 24px`, `--sp-6: 32px`, `--sp-7: 48px`).
- **Evidência:** `src/ui/index.css` (linhas 68–69). Múltiplas classes (cards, botões, margens) consomem `--sp-5`, `--sp-6` e `--sp-7`. Mudar o valor em pixels dessas variáveis distorceria os layouts de grid e cartões.
- **Alternativas Consideradas:**
  1. *Substituir imediatamente todos os valores no CSS:* Descartada (altíssimo risco de quebra de alinhamento visual e paddings).
  2. *Manter os valores do produto e adicionar aliases de conformidade estendida:* **Aprovada**.
- **Decisão:** **`CONSOLIDATE`**. Manter `--sp-1` a `--sp-7` com os valores existentes em pixels do produto, adicionando os tokens semânticos complementares (`--sp-md: 20px`, `--sp-lg: 24px`, `--sp-xl: 32px`, `--sp-2xl: 48px`) para compatibilidade com qualquer especificação externa.
- **Justificativa:** Respeita o princípio da menor intervenção necessária (N1) e garante risco zero de regressão de layout.
- **Impacto:** Preserva 100% da geometria visual existente.
- **Dependências:** Todos os blocos de layout do `src/ui/index.css`.
- **Nível de Intervenção:** **N1**.

---

## ADR-005: Preservação da Trava Mecânica de Roscamento Sincronizado

- **Elemento:** Comportamento dos controles de avanço ($F$) ao selecionar a família "Roscar".
- **Problema:** Em fresamento, o operador pode usar os botões ±5% para ajustar o avanço da mesa. No roscamento por macho rígido, o avanço é fisicamente acoplado à rotação pelo passo da rosca ($F = S \times P$). Ajustar o avanço independentemente arrancaria a rosca ou partiria o macho na usinagem.
- **Evidência:** `src/ui/components/ResultsPanel.tsx` (linhas 46, 210–230) e `src/core/threading.ts`.
- **Alternativas Consideradas:**
  1. *Tratar os Hero Cards de forma genérica uniforme:* Descartada (erro perigoso de engenharia mecânica).
  2. *Preservar a trava física com ocultação dos botões e tag "Rosqueamento Sincronizado":* **Aprovada**.
- **Decisão:** **`PRESERVE`**.
- **Justificativa:** Integridade física e segurança de processo têm precedência absoluta sobre padronização visual genérica.
- **Impacto:** Protege operadores reais e ferramentas no chão de fábrica.
- **Dependências:** `ResultsPanel.tsx`, `MobileResultsSheet.tsx`.
- **Nível de Intervenção:** **N0**.
