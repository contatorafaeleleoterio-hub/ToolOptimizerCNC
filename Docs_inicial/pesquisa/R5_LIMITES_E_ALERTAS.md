# R5 — Limites, Alertas e Bloqueios

**Vira o canônico:** `CANONICO_LIMITES_E_ALERTAS.md`
**Responde:** engajamento radial mínimo · janela de velocidade · `L/D` por família de ferramenta · referências de produtividade
**Dependências:** nenhuma. Pode rodar em paralelo com R1 e R3.
**Salve o retorno como:** `RESPOSTA_R5.md`

---

═══════════════════════════════════════════════════════════════════

# MISSÃO

Você vai validar os **alertas e bloqueios** de uma calculadora de parâmetros de corte para fresamento CNC. Estes avisos disparam na tela do operador e alguns impedem o cálculo. Nenhum deles tem fonte declarada no projeto, e a suspeita interna é que pelo menos dois estão errados.

**Por que isso é tão crítico quanto o cálculo:** alerta que dispara sem motivo treina o operador a ignorar alerta. Um sistema que grita em condição normal perde a capacidade de avisar quando o perigo é real.

## Contexto do produto

- **Usuário:** operador e programador de CNC em oficina brasileira de usinagem e ferramentaria.
- **Escopo:** fresamento com fresa inteiriça de metal duro; expansão prevista para furação, roscamento e mandrilamento.
- **Postura:** o sistema **recomenda**, o operador **decide**. O sistema distingue duas camadas: **recomendação** (pode ser ignorada — ajustar é o trabalho do operador) e **limite físico** (nunca ultrapassado em silêncio; passar por cima exige confirmação explícita e o resultado fica marcado como forçado).
- **Margem de erro declarada do modelo:** ±15–25%.

## REGRAS DE RESPOSTA — obrigatórias

1. **Não invente número.** Sem consenso, entregue a **faixa** e a dispersão entre fontes.
2. **Cada número precisa de fonte citável** — fabricante (Sandvik Coromant, Kennametal, Iscar, Seco, Walter, Mitsubishi), handbook (Machinery's Handbook, ASM Handbook Vol. 16), norma (ISO, DIN) ou artigo revisado por pares.
3. **Etiquete a confiança:** `CONSENSO` · `REFERÊNCIA ÚNICA` · `SEM CONSENSO` · `NÃO ENCONTRADO`.
4. **Classifique cada regra em uma das três camadas:**
   - **LIMITE FÍSICO** — violar quebra ferramenta, peça ou máquina. Justifica bloqueio.
   - **ALERTA** — violar degrada resultado ou vida da ferramenta. Justifica aviso, não bloqueio.
   - **RUÍDO** — a regra não corresponde a risco real e deve ser removida.
5. **Diga quando a regra atual estiver errada**, com a consequência. O objetivo é encontrar erro, não confirmar o existente.
6. **Onde a regra estiver errada, entregue a regra correta** — com as variáveis que ela precisa, não só a crítica.
7. **Alerta precisa de alvo numérico.** O sistema exige que toda mensagem de limite diga **quanto** reduzir, não só que está fora. Considere isso ao formular as regras.

---

# QUESTÃO 1 — Alerta de engajamento radial `ae/D < 10%` como condição crítica

O sistema marca engajamento radial abaixo de 10% do diâmetro como **"aviso crítico"**, sem fonte.

**A suspeita:** isso está errado. Pesquisa preliminar indica que 5–20% de engajamento radial é a faixa **normal** de usinagem de alta eficiência (HEM/HSM), estratégia recomendada por fabricantes — não condição de risco. Sinalizar 10% como crítico alarmaria justamente a técnica mais moderna que o produto deveria suportar.

**Responda:**

**a)** Confirme ou refute: engajamento radial de 5–20% de `D` é estratégia recomendada, não condição de risco?

**b)** Qual é o risco **real** em engajamento radial muito baixo, e que grandeza o mede? A hipótese a verificar: o critério correto é a **espessura de cavaco contra o raio de aresta** — abaixo de certo ponto o gume esfrega em vez de cortar (*rubbing / ploughing*), gerando calor sem remover material e desgastando por abrasão.

**c)** Qual é o raio de aresta típico de fresa inteiriça de metal duro, por faixa de diâmetro? Está disponível em catálogo ou precisa ser estimado?

**d)** Qual é a espessura mínima de cavaco em função do raio de aresta? A referência preliminar é **5–20% do raio de aresta** — confirme com fonte.

**e)** Existe algum limite inferior de `ae/D` que seja **genuinamente** crítico — por exemplo, por recorte de cavaco (*recutting*), por instabilidade, ou por o cavaco não sair da região de corte?

**f)** Existe também um limite **superior** que mereça alerta? Fresamento em rasgo (`ae = D`, engajamento 100%) tem risco próprio — evacuação de cavaco, corte concordante e discordante simultâneos, ausência de saída para o calor. O sistema hoje só valida `ae ≤ D` como limite físico e não alerta nada abaixo disso.

**g)** **Escreva a regra de alerta correta** que deveria substituir a atual, com as variáveis que ela precisa e o texto que o operador deveria ler.

---

# QUESTÃO 2 — Janela de velocidade de corte: `Vc < 50` ou `> 1000 m/min`

O sistema avisa quando a velocidade sai dessa janela, sem fonte.

**A suspeita:** ambas as pontas geram alarme falso. `Vc < 50 m/min` é normal em inox, titânio, superligas, aços endurecidos e em qualquer ferramenta de aço rápido. E a própria tabela do sistema recomenda **1000 m/min** para alumínio em acabamento — o alerta dispararia contra a recomendação do próprio sistema.

**Responda:**

**a)** Existe faixa de `Vc` universalmente aplicável a fresamento, independente de material e substrato? Ou o conceito de janela global é inválido por construção?

**b)** Confirme os extremos legítimos: qual o `Vc` mais **baixo** publicado em catálogo para fresamento — que material, que ferramenta, que condição? E qual o mais **alto**?

**c) A ponta baixa.** O risco de velocidade baixa é **aresta postiça de corte (BUE)** — material aderindo ao gume por temperatura insuficiente na zona de corte. Existe limiar numérico publicado, ou apenas o mecanismo qualitativo? O limiar depende de material da peça, revestimento, refrigeração? Há alguma faixa crítica de temperatura ou de velocidade documentada por família de material?

**d) A ponta alta.** O risco de velocidade alta é desgaste térmico acelerado. Existe limiar publicado, ou o limite prático é simplesmente a rotação máxima da máquina? Note que o limite de rotação já é validado separadamente pelo sistema, contra o perfil de máquina.

**e) A regra correta.** Confirme se a substituição defensável é: comparar contra a **faixa do material com o substrato da ferramenta** — dado que o sistema já tem `Vc` tabelado por material e operação — em vez de uma janela global. Essa é a prática das calculadoras de referência (G-Wizard, HSMAdvisor, FSWizard, calculadoras de Sandvik e Kennametal)? Como elas alertam sobre velocidade fora de faixa?

**f)** Se a janela global for removida, sobra algum alerta de velocidade que valha a pena? Por exemplo: velocidade que exige rotação acima da máquina, ou velocidade tão abaixo da faixa do material que indica erro de digitação.

---

# QUESTÃO 3 — Relação balanço/diâmetro (`L/D`) por família de ferramenta

O sistema bloqueia e alerta por `L/D`, com limites diferentes por família:

| Família | Verde | Amarelo | Vermelho | Bloqueado |
|---|---|---|---|---|
| **Fresamento** | ≤ 3 | 3–4 | 4–6 | **> 6** |
| **Mandrilamento** | ≤ 3 | 3–4 | 4–5 | **> 5** |
| **Furação** | — | — | — | `L/D > 3` exige ciclo pica-pau (aviso, não bloqueio) |

A justificativa interna registrada para o bloqueio em 6: *"L/D = 5 já é crítico em usinagem convencional; L/D > 6 só faz sentido em HSM, toroidal ou condições muito controladas"*.

**Responda:**

**a)** Esses limites batem com a recomendação de catálogo? Fabricantes publicam limite de balanço, e em que forma — `L/D`, comprimento absoluto, ou redução percentual de parâmetro por faixa?

**b)** O limite de fresamento depende do **tipo de fresa** (topo, toroidal, esférica) e da **estratégia** (convencional × alta velocidade × alta eficiência)? A justificativa interna sugere que sim — confirme.

**c)** Existe caso em que `L/D > 6` é legítimo, e sob que condições? O que muda quando se usa haste de metal duro maciça, ferramenta antivibratória (*damped*), ou extensor específico? Um bloqueio duro nesse ponto impediria trabalho válido?

**d) A alternativa que o produto já considera.** O sistema pretende migrar a comunicação de `L/D` para **deflexão em micrômetros contra a tolerância da peça** — *"L/D é proxy; deflexão é o efeito"* — mantendo o bloqueio por `L/D` como rede de segurança independente. Isso é defensável tecnicamente? Um limite de deflexão substitui adequadamente um limite de `L/D`, ou os dois medem coisas diferentes (deflexão mede erro dimensional; `L/D` também prediz vibração)?

**e)** A regra de redução de parâmetro por faixa de `L/D` tem base? Uma fonte interna manda "reduzir `ae`/`ap` em 20%" na faixa 3–4 e "em 40%" na faixa 4–5. Existe recomendação publicada nesse formato?

**f)** Para **furação**: o limiar de `L/D > 3` para exigir ciclo pica-pau se confirma? Ele muda com **refrigeração interna** — que é justamente a função da broca com canal de refrigeração? Quanto?

---

# QUESTÃO 4 — Referências de produtividade (taxa de remoção)

O sistema mostra um indicador comparando a taxa de remoção calculada contra estas referências, declaradas como "referência de mercado" e **sem fonte**:

| Operação | Referência |
|---|---|
| Desbaste | 50 cm³/min |
| Semi-acabamento | 20 cm³/min |
| Acabamento | 5 cm³/min |

**Responda:**

**a)** Existe referência publicada de taxa de remoção típica por operação em fresamento? Se existir, de que ela depende — material, potência da máquina, diâmetro da ferramenta, estratégia?

**b)** Um número absoluto sem contexto de máquina e material faz sentido como referência? Alumínio e aço endurecido diferem por ordem de magnitude em taxa de remoção alcançável — uma referência única para "desbaste" compara peras com maçãs?

**c) A alternativa provável.** O indicador deveria comparar contra a taxa de remoção **máxima que a potência disponível permite** — isto é, `Q_max = (Pm × η × 60000) / kc` — em vez de contra um número fixo? Isso o tornaria uma medida de aproveitamento da máquina, que é acionável, em vez de uma nota contra um padrão arbitrário. Confirme se essa formulação é defensável e entregue a fórmula correta.

**d)** Se a comparação for contra a potência disponível, qual é o **aproveitamento típico** considerado bom em fresamento? Existe referência publicada de percentual de utilização de potência de fuso em produção?

**e)** Existe outro indicador de produtividade mais usado na indústria que uma calculadora deveria mostrar no lugar — taxa de remoção específica (cm³/min por kW), tempo por peça, custo por volume removido?

---

# FORMATO DA ENTREGA

Para cada questão:

```
## [número] [título]

**Veredito:** [uma frase — a regra atual está certa, errada ou é ruído]
**Camada:** LIMITE FÍSICO | ALERTA | RUÍDO
**Confiança:** CONSENSO | REFERÊNCIA ÚNICA | SEM CONSENSO | NÃO ENCONTRADO

**O que as fontes dizem**
[tabela ou lista com valores e procedência]

**Regra correta recomendada**
[condição, variáveis necessárias, e o texto que o operador deveria ler — com alvo numérico]

**O que muda para o operador**
[quantos alertas a menos ou a mais, em que situação]

**Fontes**
[link, fabricante, ano]
```

Ao final, duas tabelas:

**Tabela A — Regras de alerta recomendadas**

| Regra | Condição de disparo | Camada | Mensagem com alvo numérico | Fonte |
|---|---|---|---|---|

**Tabela B — O que continua sem base**

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|

Lacuna declarada é resultado útil. Número inventado é passivo.

═══════════════════════════════════════════════════════════════════

---

## Rastreabilidade

| Questão | Origem no dossiê auditado |
|---|---|
| 1 | §5.16.3 — `ae/D < 10%` sem fonte |
| 2 | §5.16.4 — janela de `Vc` sem fonte |
| 3 | §10.3, §5.2 e §5.3 — limiares de `L/D` |
| 4 | §5.9.2 — referências de MRR sem fonte |

## O que este retorno alimenta

- `CANONICO_LIMITES_E_ALERTAS.md` — todas as quatro questões
- Cruza com **R6**: a Questão 3d decide se a deflexão substitui ou complementa o `L/D`
- Cruza com **R4**: o raio de aresta da Questão 1c é o mesmo dado que define o piso de `fz`
