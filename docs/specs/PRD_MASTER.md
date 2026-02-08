# PRD MASTER - ToolOptimizer CNC (MVP)
**Versão:** 2.0 (Consolidada)
**Status:** Pronto para Desenvolvimento

## 1. VISÃO GERAL E ESCOPO
**Produto:** Sistema desktop para cálculo e recomendação de parâmetros de corte CNC.
**Stack:** React + TypeScript + Vite + Zustand (State Management).
**Objetivo:** Permitir que operadores calculem RPM, Avanço e Potência em < 2 segundos com segurança.

### 1.1 Funcionalidades Core
1.  **Cálculo Dinâmico:** RPM, $V_c$, Avanço ($F$), Potência ($P$), Torque ($T$), MRR.
2.  **Validação de Segurança (Critical):** Sistema de semáforo (Verde/Amarelo/Vermelho) para inputs.
3.  **Banco de Dados Estático:** 9 Materiais pré-carregados e 3 tipos de ferramenta.
4.  **Interface:** Dashboard único com 3 colunas (Config, Resultados, Impactos).

---

## 2. REGRAS DE VALIDAÇÃO E SEGURANÇA (OBRIGATÓRIO)

### 2.1 Chip Thinning Factor (CTF)
Sempre que o engajamento radial ($a_e$) for menor que 50% do diâmetro, o avanço deve ser compensado.
**Fórmula:**
Se $a_e < 0.5 \times D$:
$$CTF = \frac{1}{\sqrt{1 - (1 - \frac{2 \times a_e}{D})^2}}$$
Caso contrário ($a_e \ge 0.5 \times D$), $CTF = 1.0$.

*Aplicação:* O $f_z$ (avanço por dente) inserido pelo usuário é multiplicado pelo CTF para manter a espessura do cavaco constante.

### 2.2 Validação de Rigidez (L/D)
A relação Comprimento/Diâmetro ($L/D$) define o risco de vibração.
* **$L/D \le 3$:** ✅ Verde (Seguro)
* **$3 < L/D \le 4$:** ⚠️ Amarelo (Alerta de vibração)
* **$4 < L/D \le 6$:** 🔴 Vermelho (Crítico - Sugerir redução de dados)
* **$L/D > 6$:** ⛔ Bloqueado no MVP.

### 2.3 Profundidade de Corte Axial ($a_p$)
Limites máximos baseados no diâmetro ($D$):
* **Desbaste:** Máx $1.0 \times D$
* **Semi-acabamento:** Máx $0.5 \times D$
* **Acabamento:** Máx $0.3 \times D$

---

## 3. INTERFACE DE USUÁRIO (UI)

### 3.1 Layout (Grid 3 Colunas)
1.  **Esquerda (Inputs):** Seleção de Material, Ferramenta, Operação e inputs manuais ($a_p, a_e$).
2.  **Centro (Resultados):**
    * Destaque gigante para **RPM** e **Avanço (mm/min)**.
    * Cards menores para Potência, Torque e $V_c$ real.
    * Indicador visual de carga do motor (barra de progresso).
3.  **Direita (Impactos - Colapsável):** Accordions explicando a física ("Se aumentar $V_c$, a temperatura sobe").

### 3.2 Comportamento dos Inputs
* Inputs numéricos devem ter validação imediata (onChange).
* Se o valor exceder o limite da máquina (ex: RPM > 12.000), o input fica vermelho e bloqueia o cálculo.
* Botões de ajuste fino (+5%, -5%) ao lado do RPM e Avanço.

---

## 4. ESTADO E DADOS (Zustand)
O store `useMachiningStore` deve conter:
* `machineLimits`: { maxRPM, maxPower, etc }
* `currentTool`: { type, diameter, flutes, stickout }
* `material`: { id, name, kc1_1, mc }
* `operation`: { type, targetVc, targetFz }
* `calculationResults`: { rpm, feed, power, torque, mrr, status }
