# R6 — Rigidez, Deflexão e Vida da Ferramenta

**Vira o canônico:** `CANONICO_DEFLEXAO_E_VIDA.md`
**Responde:** as quatro travas do cálculo de deflexão · expoente de Taylor para vida da ferramenta · refrigeração interna como fator real
**Dependências:** **R2** (a força de corte é a entrada da deflexão) e **R3** (o módulo de elasticidade do substrato). Rode por último.
**Salve o retorno como:** `RESPOSTA_R6.md`

---

═══════════════════════════════════════════════════════════════════

# MISSÃO

Você vai fornecer as constantes e regras que faltam para implementar **duas funções já especificadas mas travadas** numa calculadora de parâmetros de corte para fresamento CNC: o cálculo de deflexão da ferramenta em micrômetros, e a estimativa de vida da ferramenta.

**Por que estão travadas:** o projeto adota uma regra chamada *No Invention* — nenhum número entra sem fonte citada. As duas funções estão especificadas em detalhe e param exatamente nos pontos onde falta dado com procedência. O documento interno lista o que falta em vez de chutar. Sua tarefa é fechar essas lacunas.

## Contexto do produto

- **Usuário:** operador e programador de CNC em oficina brasileira de usinagem e ferramentaria.
- **Escopo:** fresamento com fresa inteiriça de metal duro — topo reto, toroidal e esférica.
- **Postura:** todo número é auditável — o operador abre e vê fórmula, valores substituídos e fonte.
- **Margem de erro declarada do modelo:** ±15–25%.
- **A intenção de produto por trás da deflexão:** hoje o operador lê *"L/D = 5, cuidado"*. Deveria ler *"a ferramenta vai fletir 38 µm e sua tolerância é 20 µm"*. A relação balanço/diâmetro é proxy; deflexão é o efeito. O bloqueio por `L/D` continuaria existindo como rede de segurança independente.

## REGRAS DE RESPOSTA — obrigatórias

1. **Não invente número.** Sem consenso, entregue a **faixa** e a dispersão entre fontes. Este é o bloco onde a tentação de arredondar é maior — resista: um `E` inventado produz uma deflexão com três casas decimais e nenhum significado.
2. **Cada número precisa de fonte citável** — catálogo de fabricante, handbook (Machinery's Handbook, ASM Handbook Vol. 16, Diniz/Marcondes/Coppini), norma (ISO 3685 para vida de ferramenta) ou artigo revisado por pares.
3. **Etiquete a confiança:** `CONSENSO` · `REFERÊNCIA ÚNICA` · `SEM CONSENSO` · `NÃO ENCONTRADO`.
4. **Identifique a liga ou o grau junto com o valor.** "Metal duro tem E de 600 GPa" não é resposta utilizável; "metal duro WC-Co com 10% Co, grão fino, E = 5xx GPa, fonte X" é.
5. **Quantifique a sensibilidade.** Para cada constante, diga quanto o resultado final muda quando ela varia dentro da faixa encontrada. Se a dispersão de uma constante produz variação menor que ±15–25%, ela pode ser fixada — diga isso.
6. **Diga o que não é possível fechar** e o que seria preciso — ensaio, catálogo específico, norma paga. Lacuna declarada é resultado.

---

# QUESTÃO 1 — As quatro travas do cálculo de deflexão

O modelo previsto é **viga engastada com carga na ponta**:

```
δ = (F · L³) / (3 · E · I)          I = π · De⁴ / 64
```

| Símbolo | Significado | Situação |
|---|---|---|
| `δ` | deflexão na ponta (mm, exibir em µm) | saída |
| `F` | força **radial** de corte (N) | derivada da força tangencial — **trava c** |
| `L` | balanço da ferramenta (mm) | já existe como campo |
| `E` | módulo de elasticidade (MPa) | **trava a** |
| `De` | diâmetro efetivo resistente (mm) | **trava b** |

**Responda:**

**a) Módulo de elasticidade.**
Qual é o `E` do metal duro usado em fresa inteiriça? A faixa ampla conhecida é 500–650 GPa, mas ela cobre todos os graus de metal duro, inclusive os que não são usados em fresa. Entregue valores por grau (teor de cobalto identificado) com fonte, e **um valor único recomendado** para fresa de uso geral.

Diga também: qual o erro de deflexão ao usar esse valor único em toda a linha? Como `δ` é linear em `1/E`, a conta é direta.

Entregue também o `E` do **aço rápido** e do **aço rápido ao cobalto**, para quando a furação entrar no escopo.

**b) Diâmetro efetivo resistente.**
A parte cortante da fresa tem canais helicoidais — o diâmetro que resiste à flexão é menor que o nominal.

1. Que fração do diâmetro nominal os fabricantes usam para cálculo de rigidez? Existe valor publicado — algo como `0,8 × D`?
2. A fração depende do **número de arestas**? Uma fresa de 2 cortes tem mais material removido em canal que uma de 4, ou o contrário?
3. Depende da **profundidade do canal**, que varia entre fresa de desbaste e de acabamento?
4. Fresa com **haste cilíndrica** tem dois trechos de diâmetro diferente — haste lisa e parte cortante canalizada. O modelo correto é **viga escalonada** ou basta viga simples com a seção mais fraca? **Qual o erro de usar viga simples?** Se o erro ficar dentro de ±15–25%, a simplificação se justifica e a resposta é "viga simples" — diga isso explicitamente.
5. E ferramenta com **haste rebaixada** (*reduced shank*), onde a haste é mais fina que o corte? Uma fonte interna estima que reduzir de Ø10 para Ø6 deixa a rigidez em ~13% da original, pela relação `I ∝ d⁴`. Confirme a ordem de grandeza.

**c) Razão força radial / força tangencial (`Fr/Fc`).**
A deflexão é causada pela componente **radial**, mas o cálculo de potência produz a **tangencial**. Falta a razão entre elas.

1. Qual é a razão típica em fresamento? De que ela depende — ângulo de engajamento, ângulo de hélice, geometria de saída, sentido de corte (concordante × discordante)?
2. Existe valor publicado por família de ferramenta, ou é preciso calcular a partir do arco de engajamento?
3. A razão é constante ao longo da volta, ou varia conforme o dente entra e sai? Se varia, o cálculo deve usar o **pico** (que é o que fleti mais) ou a **média**?
4. Existe simplificação aceita em catálogo — algo como "`Fr` ≈ 0,3 a 0,5 de `Fc`" — utilizável numa calculadora de oficina?

**d) Limite de deflexão aceitável.**
O sistema usa hoje `δ ≤ 0,05 mm` como condição de aviso, **sem fonte**.

Pesquisa preliminar encontrou: CNCCookbook usa 0,001″ (≈ 0,025 mm) para fresa de ½″ em desbaste, escalado por diâmetro, citando recomendação de fabricante para evitar início de chatter; tolerâncias de matrizaria ficam em 0,05–0,10 mm e de molde de injeção abaixo de 0,04 mm; usinagem de precisão exige 0,005–0,013 mm; pesquisa acadêmica aponta degradação de qualidade acima de 0,02 mm.

1. Existe limite de deflexão publicado por fabricante de ferramenta? Qual, e para que condição?
2. O limite aceitável é **absoluto** (número em mm) ou **relativo** — fração da tolerância da peça, ou fração do diâmetro da ferramenta? Se relativo, qual fração?
3. O limite muda entre desbaste e acabamento?
4. Existe relação publicada entre deflexão e **início de chatter** — isto é, um limite que previna vibração, não só erro dimensional? Isso importa porque um limite dimensional pode ser folgado demais para evitar vibração.
5. **Pergunta de produto:** como uma calculadora deve apresentar isso ao operador que **não informou** tolerância de peça — assumir um default, exigir o campo, ou mostrar a deflexão sem julgamento?

**e) Fechamento.** Escreva a **cadeia completa de cálculo de deflexão**, passo a passo, de `Vc`, `fz`, `ae`, `ap`, `D`, `Z` e `L` até `δ` em micrômetros, com cada constante identificada e com fonte. Onde uma trava permanecer aberta, diga qual e o que ela impede.

---

# QUESTÃO 2 — Expoente de Taylor para vida da ferramenta

O sistema quer mostrar ao operador o **preço em vida de ferramenta** ao aumentar a velocidade — *"+20% de Vc ≈ metade da vida da aresta"* — ligando isso diretamente ao controle de velocidade na tela.

A forma escolhida é a **relativa**, que não exige saber a vida absoluta:

```
V · Tⁿ = C          →          T / T_ref = (Vc_ref / Vc)^(1/n)
```

Os valores presumidos internamente são `n = 0,25` para metal duro e `n = 0,125` para aço rápido, **sem fonte**.

**Responda:**

**a)** Quais são os valores de `n` publicados para: aço rápido, aço rápido ao cobalto, metal duro sem revestimento, metal duro revestido, cerâmica e CBN? Cite fonte.

**b)** O `n` depende do **material da peça** além do material da ferramenta? Se sim, entregue a matriz. Se a dependência for forte, a forma relativa perde utilidade sem uma tabela por par ferramenta × material — diga isso.

**c)** Confirme ou corrija a estimativa: com `n = 0,25`, subir 20% o `Vc` reduz a vida a `(1/1,2)⁴ ≈ 48%` — aproximadamente metade. E com `n = 0,125`, a `(1/1,2)⁸ ≈ 23%`. As contas estão certas? Os expoentes estão certos?

**d)** Para a **forma absoluta** ("a aresta dura X minutos"), é preciso saber a que vida-alvo os `Vc` de catálogo se referem. Fabricantes publicam esse `T_ref`? Qual é o valor convencional — 15 minutos, 30 minutos? Sob que norma (ISO 3685)? Ele é o mesmo entre fabricantes ou cada um usa o seu?

**e)** A equação de Taylor simples considera só a velocidade. Existe forma estendida usada na prática que inclua avanço e profundidade (`V · Tⁿ · f^a · ap^b = C`)? Ela vale a complexidade numa calculadora de oficina, ou a forma simples já entrega a mensagem que importa?

**f) Pergunta de produto:** a mensagem *"+20% de Vc ≈ metade da vida"* é defensável para mostrar ao operador com a forma relativa, mesmo sem saber a vida absoluta? Ou dizer "metade da vida" sem saber de quanto era a vida é enganoso?

---

# QUESTÃO 3 — Refrigeração interna como fator de cálculo

No sistema, refrigeração interna é hoje uma caixa de seleção que **não faz nada**. O plano é removê-la da tela até que ela altere números de verdade. Espera-se que ela mexa em dois pontos: o limiar de profundidade que exige ciclo pica-pau em furação (hoje `L/D > 3`) e o avanço padrão.

**Responda:**

**a)** Existe fator publicado de ganho por refrigeração interna? Especificamente: quanto ela estende a profundidade de furo sem necessidade de ciclo pica-pau?

**b)** Quanto ela permite aumentar avanço ou velocidade, se permitir? Ou o ganho é só em vida da ferramenta e evacuação de cavaco, sem mudar parâmetro?

**c)** O efeito é o mesmo em **fresamento**? Em fresa com refrigeração interna, o ganho é de parâmetro ou de vida?

**d)** O efeito depende da **pressão** do sistema de refrigeração? Alta pressão (70 bar+) é tratada como categoria própria em catálogo, distinta de refrigeração interna comum?

**e)** Existe efeito documentado do tipo de refrigeração (a seco, ar comprimido, emulsão, MQL, alta pressão) sobre a velocidade de corte admissível, por material? Isso importa porque as tabelas de `Vc` do sistema não declaram a condição de refrigeração para a qual valem.

---

# FORMATO DA ENTREGA

Para cada questão:

```
## [número] [título]

**Veredito:** [uma frase]
**Confiança:** CONSENSO | REFERÊNCIA ÚNICA | SEM CONSENSO | NÃO ENCONTRADO

**Valor ou regra**
[constante com liga/grau identificado, ou fórmula com variáveis nomeadas]

**Sensibilidade**
[quanto o resultado final muda dentro da faixa encontrada — e se isso justifica fixar a constante]

**Fontes**
[link, autor/fabricante, ano]
```

Ao final, três entregas de fechamento:

**Tabela A — Constantes para deflexão**

| Constante | Valor recomendado | Faixa encontrada | Efeito da dispersão em δ | Confiança | Fonte |
|---|---|---|---|---|---|

**Tabela B — Expoente de Taylor**

| Material da ferramenta | `n` | Material da peça (se depender) | `T_ref` | Confiança | Fonte |
|---|---|---|---|---|---|

**Tabela C — O que continua sem base**

| Item | O que faltou | O que seria preciso para fechar (ensaio, catálogo específico, norma paga) |
|---|---|---|

E, obrigatoriamente: **a cadeia de cálculo de deflexão pronta para virar código**, ou a declaração explícita de qual trava permanece aberta e o que ela impede.

Lacuna declarada é resultado útil. Número inventado, aqui, produz uma deflexão com aparência de precisão e nenhum significado físico.

═══════════════════════════════════════════════════════════════════

---

## Rastreabilidade

| Questão | Origem no dossiê auditado |
|---|---|
| 1a–1c | §8.1.6 — as três travas declaradas do cálculo de deflexão |
| 1d | §5.16.1 — limiar `δ ≤ 0,05 mm` sem fonte |
| 2 | §8.1.4 — vida da ferramenta travada por falta do expoente `n` |
| 3 | §8.1.7 — refrigeração interna sem fonte de catálogo |

## O que este retorno alimenta

- `CANONICO_DEFLEXAO_E_VIDA.md` — todas as três questões
- Consome de **R2**: a força de corte derivada do Kienzle é a entrada de `F`
- Consome de **R3**: se o substrato for commodity, o `E` da questão 1a vira valor único e a trava cai
- Cruza com **R5**: a questão 3d de R5 decide se a deflexão substitui ou complementa o bloqueio por `L/D`
