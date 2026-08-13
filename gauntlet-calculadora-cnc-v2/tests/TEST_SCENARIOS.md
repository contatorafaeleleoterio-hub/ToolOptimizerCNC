# Cenários de Verificação Objetiva (~24 Cenários)

> **Documento de Referência dos Testes para o Construtor (Builder) e o Juiz Cego**  
> **Arquivo de Código Correspondente:** `tests/gauntlet.spec.ts`

---

## 1. Fluxo Principal e Estabilidade (T01 a T07)

- **T01 — Básico Fresar:** Selecionar Fresa de Topo, Aço 1045, Metal Duro Inteiriço, Desbaste, $\varnothing 10\text{ mm}$, $Z=4$, $ap=5\text{ mm}$, $ae=5\text{ mm}$. Verificar se Rotação $n \approx 4456\text{ rpm}$ e Avanço $Vf \approx 2673\text{ mm/min}$ são exibidos na Zona 4.
- **T02 — Troca de Família sem Reconstruir Tela:** Alterar Família de Fresar para Furar. Verificar que o container do resultado permanece na mesma posição fixa e não há reflow.
- **T03 — Troca de Tipo Preserva Campos Comuns:** Trocar de Fresa de Topo para Fresa Toroidal. Verificar que os campos Material da Peça (Aço 1045) e Diâmetro (10 mm) mantêm seus valores.
- **T04 — Zonas Fixas nas 4 Famílias:** Percorrer Fresar, Furar, Roscar e Mandrilar. Conferir se as Zonas 1 a 6 são renderizadas na mesma hierarquia e ordem visual.
- **T05 — Determinismo de Cálculo:** Recarregar a página, preencher os mesmos inputs de T01 e verificar se o resultado numérico é rigorosamente idêntico.
- **T06 — Ordem de Tab Lógica:** Pressionar Tab sequencialmente a partir do primeiro campo. Conferir se o foco navega ordenadamente por Contexto $\rightarrow$ Dimensões $\rightarrow$ Parâmetros $\rightarrow$ Ação.
- **T07 — Estado Vazio Honesto:** Ao abrir a página antes de preencher os campos obrigatórios, conferir se os resultados exibem traço (`—`), e NUNCA `0`, `NaN` ou `undefined`.

---

## 2. Tratamento de Entradas e Limites (T08 a T11)

- **T08 — Diâmetro Vazio:** Limpar o campo de Diâmetro. Verificar se a UI exibe mensagem de alerta acionável e impede cálculo invalidados sem travar a tela.
- **T08.1 / T09 — Diâmetro Zero ou Negativo:** Digitar `-5` ou `0` no Diâmetro. Conferir se é exibido aviso "Diâmetro deve ser maior que zero" e resultado permanece `—`.
- **T10 — Deflexão $L/D > 6$ (Fresar) Bloqueado:** Definir Diâmetro $10\text{ mm}$ e Balanço $70\text{ mm}$ ($L/D = 7$). Verificar se o semáforo indica estado Bloqueado em Vermelho com a mensagem "Relação L/D = 7.0 excede o limite máximo de 6.0".
- **T11 — Limite de Torque de Máquina Excedido:** Definir parâmetro de corte extremo em roscamento M16. Conferir se o torque calculado excede o limite da máquina e o semáforo dispara estado de Bloqueio.

---

## 3. Cálculos por Tipo de Ferramenta (T12 a T22)

- **T12 — Fator de Material da Ferramenta (HSS vs. MD):** Comparar $Vc$ sugerido para Aço 1045 com Metal Duro ($140\text{ m/min}$) vs. Aço Rápido HSS ($140 \cdot 0.29 \approx 40.6\text{ m/min}$). Proporção $\approx 3.45\times$.
- **T13 — Diâmetro Efetivo em Fresa Esférica ($ap < D/2$):** Fresa Esférica $\varnothing 10\text{ mm}$, $ap = 2\text{ mm}$. Verificar se $Def = 2\sqrt{2(10 - 2)} = 8\text{ mm}$ é usado para calcular a rotação ($n = \frac{140 \cdot 1000}{\pi \cdot 8} \approx 5570\text{ rpm}$).
- **T14 — Diâmetro Efetivo em Fresa Toroidal ($ap < r$):** Fresa Toroidal $\varnothing 10\text{ mm}$, $r = 2\text{ mm}$, $ap = 1\text{ mm}$. Verificar se $Def = 10 - 4 + 2\sqrt{1(4 - 1)} = 9.46\text{ mm}$ é considerado.
- **T15 — Fresa de Alto Avanço ($\kappa = 15°$):** Selecionar Fresa Alto Avanço. Verificar se $fz = \frac{hm}{\sin 15°} \approx 3.86 \cdot hm$.
- **T16 — Cabeçote Faceador ($\kappa = 45°$ + Alerta $ae > 0.8D$):** Definir $\varnothing 80\text{ mm}$, $ae = 70\text{ mm}$ ($ae/D = 0.875$). Conferir alerta de descentralização recomendada.
- **T17 — U-Drill ($fn \ge 0,05\sqrt{D}$):** Broca U-drill $\varnothing 20\text{ mm}$. Ajustar $fn = 0.1\text{ mm/rot}$ (abaixo de $0.05\sqrt{20} \approx 0.223\text{ mm/rot}$). Conferir alerta de avanço mínimo.
- **T18 — Alargador ($Vc \approx 1/3$ e $fn$ 2–3$\times$):** Selecionar Alargador $\varnothing 10\text{ mm}$. Verificar se $Vc$ recomendado $\approx 45\text{ m/min}$ (1/3 da broca) e $fn \approx 0.3\text{ mm/rot}$.
- **T19 — Macho de Corte M10$\times$1.5:** Selecionar Macho M10x1.5. Conferir se Furo Prévio recomendado $= 8.5\text{ mm}$ e Avanço $Vf = 1.5 \cdot n$.
- **T20 — Macho de Conformação em Alumínio vs. Aço Inox:** Selecionar Macho Conformação M10x1.5 em Alumínio 6061-T6 (Furo prévio $\approx 9.25\text{ mm}$, OK). Trocar para Inox 304 (material não conformável) e verificar bloqueio/alerta.
- **T21 — Fresa de Rosca ($Vf_{centro} < Vf_{periferia}$):** Fresa de rosca $\varnothing 8\text{ mm}$ em furo M12x1.75. Verificar se $Vf_{centro} = Vf_{perif} \cdot \frac{12 - 8}{12} = \frac{1}{3} Vf_{perif}$.
- **T22 — Mandrilar ($ap = (\varnothing_f - \varnothing_i)/2$ e $L/D > 5$ Bloqueado):** Mandril em furo de $\varnothing_i 30\text{ mm}$ para $\varnothing_f 34\text{ mm}$ ($ap = 2\text{ mm}$). Se Balanço $L = 160\text{ mm}$ ($\varnothing_{barra} 30\text{ mm} \implies L/D = 5.33$), verificar bloqueio.

---

## 4. Requisitos Transversais (T23 e T24)

- **T23 — Modo de Cálculo Rápido em 3 Campos:** Ativar Modo Rápido. Preencher apenas Material da Peça (Aço 1045), Diâmetro (10 mm) e Operação (Desbaste). Verificar se Rotação e Avanço sugeridos aparecem imediatamente.
- **T24 — Fator de Segurança e Índice de Saúde:** Alterar Fator de Segurança para 80%. Verificar se Potência e Torque exibidos sobem 20%, enquanto Rotação, Avanço e MRR permanecem inalterados. Alterar $ap$ para valor extremo e verificar se o Índice de Saúde cai na curva pelo pior parâmetro.
