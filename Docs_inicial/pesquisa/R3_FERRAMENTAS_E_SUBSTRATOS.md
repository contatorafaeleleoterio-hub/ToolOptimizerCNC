# R3 — Ferramentas, Substratos e Revestimentos

**Vira o canônico:** `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md`
**Responde:** que combinações ferramenta × substrato existem de verdade · a premissa "substrato é commodity, revestimento é a variável" · quantos níveis de granularidade o catálogo deve ter
**Dependências:** nenhuma para rodar. Alimenta R6 (módulo de elasticidade) e R4 (fator de revestimento sobre Vc).
**Vale rodar em dois agentes** — depende de dado de catálogo.
**Salve o retorno como:** `RESPOSTA_R3.md`

---

═══════════════════════════════════════════════════════════════════

# MISSÃO

Você vai testar uma **premissa de projeto** sobre material de ferramenta, e determinar quanto cada variação de substrato e revestimento realmente muda o resultado de uma calculadora de parâmetros de corte. Esta não é uma pesquisa aberta sobre metalurgia de metal duro — é um teste de hipótese com consequência direta no desenho do produto.

## Contexto do produto

- **Usuário:** operador e programador de CNC em oficina brasileira de usinagem e ferramentaria. Não é engenheiro de processos, e **precisa conseguir responder qualquer pergunta que o sistema faça olhando a ferramenta ou a embalagem que tem na mão**.
- **Escopo atual:** fresamento com fresa inteiriça de metal duro. Expansão prevista para furação, roscamento e mandrilamento — 18 tipos de ferramenta em 4 famílias.
- **Decisão de produto já tomada (15/08/2026):** não existe campo "material da ferramenta" na tela. O substrato passa a fazer parte da **identidade da ferramenta no catálogo** — uma entrada por variação real de mercado. Combinação impossível deixa de ser representável. Sua pesquisa deve dizer se essa decisão se sustenta tecnicamente.
- **Margem de erro declarada do modelo:** ±15–25%. Refinamento abaixo dessa margem é falsa precisão.

## REGRAS DE RESPOSTA — obrigatórias

1. **Não invente número para preencher lacuna.** Sem consenso, entregue a **faixa** e a dispersão entre fontes.
2. **Cada número precisa de fonte citável** — catálogo de fabricante (Sandvik Coromant, Kennametal, Iscar, Seco, Walter, Mitsubishi, OSG, Guhring), handbook, norma (ISO 513, ISO 3685) ou artigo revisado por pares.
3. **Etiquete a confiança:** `CONSENSO` · `REFERÊNCIA ÚNICA` · `SEM CONSENSO` · `NÃO ENCONTRADO`.
4. **Quantifique a sensibilidade, sempre.** Não diga que um fator "influencia" — diga **quanto**, em porcentagem sobre o resultado final (velocidade admissível, avanço, potência, deflexão, vida da ferramenta), mantendo o resto constante. Ao final de cada fator, classifique-o:
   - **MODELAR** — a variação justifica uma entrada no catálogo de ferramentas
   - **DEFAULT** — cabe num valor médio assumido, com a premissa declarada ao operador
   - **IGNORAR** — a variação é menor que a margem de erro do próprio modelo (±15–25%)

   **Essa classificação é o principal produto desta pesquisa.** É ela que decide o que vira código.
5. **Não ofereça combinação que não existe.** Onde uma variação não for encontrada em catálogo para determinado tipo de ferramenta, diga isso — o sistema prefere não representar uma combinação a representá-la errada.
6. **Diga quando o valor implementado estiver errado**, com a consequência quantificada.
7. **Priorize a prática de oficina brasileira** onde houver divergência regional, mas registre a divergência.

---

# QUESTÃO 1 — Matriz de combinações reais: o que existe em catálogo

O sistema hoje oferece quatro opções de material de ferramenta como multiplicador sobre a velocidade de corte:

| Substrato | Fator sobre `Vc` |
|---|---|
| Aço rápido (HSS) | 0,29 |
| Aço rápido ao cobalto (HSS-Co) | 0,37 |
| Metal duro inteiriço | 1,00 (referência) |
| Metal duro com pastilha revestida | 1,25 |

**A suspeita a testar:** oferecer "fresa de HSS" pode ser representar uma combinação que praticamente não existe mais na indústria. Fresamento é domínio do metal duro; o aço rápido sobreviveria em broca e macho.

**Monte a matriz tipo de ferramenta × substrato**, marcando cada célula como *padrão de mercado*, *existe mas é nicho*, ou *não existe / obsoleto*, com fonte:

| Tipo de ferramenta | HSS | HSS-Co | Metal duro inteiriço | Pastilha intercambiável | Cerâmica / CBN / PCD |
|---|---|---|---|---|---|
| Fresa de topo reto | | | | | |
| Fresa toroidal | | | | | |
| Fresa esférica | | | | | |
| Broca helicoidal | | | | | |
| Broca insertada / U-drill | | | | | |
| Macho de máquina | | | | | |
| Fresa de rosca | | | | | |
| Alargador | | | | | |
| Barra de mandrilar | | | | | |

**Responda também:**

**a)** Confirme ou refute: fresa de aço rápido é obsoleta na indústria de usinagem atual? Se ainda tem uso, em que nicho — manutenção, oficina de baixo volume, material específico, máquina sem rotação suficiente?

**b)** Em **broca**, o aço rápido e o HSS-Co continuam padrão de mercado, ou também estão sendo substituídos por metal duro? Qual a divisão prática por faixa de diâmetro e por material usinado?

**c)** Em **macho de máquina**, qual é o substrato padrão hoje? A divisão entre macho de corte e macho de conformação muda a resposta?

**d)** Os fatores de `Vc` do sistema (HSS 0,29 · HSS-Co 0,37 · MD 1,00) têm base em catálogo? Qual é a razão **real** de velocidade admissível entre HSS, HSS-Co e metal duro para o mesmo material de peça?

**e) Decisão de produto:** se uma combinação é obsoleta, o sistema deve **não oferecê-la** ou oferecê-la com aviso? Considere o operador de oficina pequena que ainda tem essa ferramenta na gaveta e vai usá-la de qualquer jeito — é melhor ele calcular com o fator certo ou não calcular?

---

# QUESTÃO 2 — A premissa central: substrato é commodity, revestimento é a variável

**Esta é a questão mais importante desta rodada. Sua tarefa é tentar derrubar a premissa com evidência, e — se ela sobreviver — entregar os números que a tornam implementável.**

**A premissa, nas palavras de quem decidiu:**

> O metal duro para fresa é uma receita estabelecida, com pouquíssima variação de fornecedor para fornecedor — como a receita do pão francês: mexer num elemento desagrada todo mundo, então ninguém mexe. O que de fato varia entre ferramentas é o **revestimento**. Para pastilha vale a mesma lógica, e um fator médio resolve. Substrato não é o 80/20 do cálculo: com o melhor material do mundo e parâmetro errado, a ferramenta não dura.

**Responda nesta ordem:**

**a) A premissa se sustenta para fresa inteiriça de uso geral?**

Levante a composição do substrato de fresas de topo de metal duro de uso geral de pelo menos **quatro fabricantes**. Compare **teor de cobalto, tamanho de grão de carboneto e dureza (HV)**. Entregue a **dispersão real** entre eles, em porcentagem.

Depois responda direto: essa dispersão é grande o bastante para mudar `Vc`, `fz` ou deflexão **além da margem de ±15–25%** do modelo? Se não for, a premissa está confirmada e o substrato de fresa vira **constante do sistema**.

**b) Onde a premissa quebra — as três exceções a verificar.**

1. **Fresa para aço endurecido (acima de 50 HRC).** Usa substrato diferente do de uso geral — cobalto mais baixo, grão ultrafine, dureza maior? Quanto isso muda `Vc` e `fz` admissíveis?
2. **Microfresa (abaixo de 1 mm).** Exige grão submicron ou ultrafine obrigatoriamente? Isso muda o raio de aresta obtenível e, com ele, a espessura mínima de cavaco antes de o gume esfregar em vez de cortar?
3. **Fresa para alumínio.** Usa substrato ou preparação de gume próprios — gume polido, sem revestimento, hélice alta? Ou só muda a geometria?

Para cada exceção confirmada, responda a pergunta que decide o desenho do produto: **essa variação já vem embutida na escolha da ferramenta** — isto é, quem vai usinar aço endurecido já compra uma fresa específica para isso — ou exigiria um campo à parte na tela? Se vem embutida, resolve-se no **catálogo**, não no motor de cálculo.

**c) Módulo de elasticidade — a consequência mais direta da premissa.**

Se o substrato de fresa é padronizado, o `E` usado no cálculo de deflexão é uma **constante**, não uma variável. Confirme: qual é o `E` do metal duro de fresa de uso geral?

A faixa ampla conhecida é 500–650 GPa, mas ela cobre todos os graus de metal duro, inclusive os que não são usados em fresa. **Estreite para o que fresas realmente usam**, entregue **um valor único recomendado**, e diga qual o erro máximo de deflexão ao aplicar esse valor único em toda a linha de produtos.

**d) Revestimento — agora a variável principal. Quantifique.**

O sistema aplica ganho fixo de **25% de `Vc`** para ferramenta revestida.

1. A razão de `Vc` entre metal duro sem revestimento e revestido se sustenta em 1,25? Qual a faixa real em catálogo?
2. **O ganho é seletivo por material da peça?** Esta é a pergunta que pode invalidar o modelo de fator único. Revestimento não é ganho universal: TiAlN e AlTiN existem para o calor da usinagem de aço; em alumínio a prática é gume polido **sem** revestimento, ou DLC/diamante. Aplicar +25% de TiAlN em alumínio pode ser ganho negativo. Confirme ou refute, e entregue a **matriz revestimento × material da peça** com o fator de cada célula.
3. Se o ganho for seletivo, qual a forma correta no modelo:
   - (i) fator por par revestimento × material
   - (ii) restringir quais revestimentos aparecem por material selecionado
   - (iii) manter fator único com a premissa "revestimento adequado ao material" declarada na tela

   Recomende uma, com o critério.
4. Os multiplicadores de uma lista alternativa não adotada — **TiAlN 1,40 · AlCrN 1,30 · TiN 1,10 · DLC 1,50 · PCD 2,00** — têm fonte? PCD e DLC são de não-ferrosos; usá-los como fator geral sobre qualquer material seria erro grave. Confirme.
5. O revestimento muda só a velocidade, ou muda também o `fz` admissível e a vida da ferramenta a velocidade constante?

**e) Pastilha intercambiável — onde a premissa é mais frágil.**

Pastilhas são explicitamente segmentadas por classe de aplicação ISO 513 (P, M, K, N, S, H) e o fabricante publica `Vc` diferente por classe. Mas há um argumento que salva a simplificação: **a classe já vem casada com o material da peça** — quem vai fresar inox compra pastilha M, não P.

1. A dispersão de `Vc` entre classes de pastilha **para o mesmo material de peça** é grande? Ou seja: uma vez fixado o material, a classe certa é praticamente uma só e o resto do catálogo é irrelevante para aquela situação?
2. Se sim, note que a simplificação correta **não é "fator médio entre todas as classes"** — média entre a classe adequada e as inadequadas produz um número que não corresponde a nenhuma situação real. Seria assumir a **classe adequada ao material selecionado** e usar o `Vc` dela. Confirme se essa formulação é mais defensável, e entregue o fator resultante.
3. A razão de `Vc` entre fresa inteiriça de metal duro e ferramenta com pastilha revestida, para o mesmo material, sustenta o fator **1,25** do sistema? Qual o valor real?

**f) Nomenclatura — o teste final de qualquer campo.**

Se alguma variação de substrato ou revestimento merecer virar entrada do sistema: o operador consegue identificá-la **olhando a embalagem da ferramenta que tem na mão**? Existe classificação neutra de fabricante utilizável — ISO 513, dureza HV, teor de cobalto declarado, sigla do revestimento impressa na embalagem?

**Um campo que o operador não consegue preencher com certeza é pior que não ter o campo** — produz número errado com aparência de precisão.

---

# QUESTÃO 3 — Veredito de modelagem

Feche com uma recomendação direta:

| Fator | Dispersão real encontrada | Efeito no resultado | MODELAR / DEFAULT / IGNORAR | Se MODELAR: como o operador informa |
|---|---|---|---|---|
| Substrato de fresa (uso geral) | | | | |
| Substrato de fresa (aço endurecido) | | | | |
| Substrato de microfresa | | | | |
| Revestimento | | | | |
| Classe de pastilha | | | | |
| Preparação de gume | | | | |
| Ângulo de hélice (30/45/60°) | | | | |

E responda a pergunta de fechamento: **quantos níveis de granularidade de material de ferramenta uma calculadora de oficina deve ter?**

Opções em disputa:
- (i) um único metal duro genérico, revestimento embutido
- (ii) metal duro com e sem revestimento como entradas separadas
- (iii) por classe de aplicação ISO 513
- (iv) grau específico por fabricante

Recomende uma, com o critério. Considere que o produto **já decidiu** embutir o substrato no nome da ferramenta do catálogo, uma entrada por variação real de mercado. Diga se essa decisão se sustenta tecnicamente ou precisa ser revista.

**Ordem de grandeza para calibrar sua resposta:** a decisão de produto por trás desta rodada é que **erro de parâmetro domina erro de substrato**. Se sua pesquisa mostrar que a dispersão de substrato entre fabricantes é da ordem de poucos por cento enquanto um `Vc` mal escolhido corta a vida da ferramenta pela metade, a premissa está quantitativamente confirmada e o sistema deve investir precisão em parâmetro, não em catálogo de substrato.

**Se mostrar o contrário, diga com todas as letras.** A premissa é do dono do produto, não sua, e derrubá-la com número é resultado válido.

---

# FORMATO DA ENTREGA

Para cada questão:

```
## [número] [título]

**Veredito:** [uma frase]
**Confiança:** CONSENSO | REFERÊNCIA ÚNICA | SEM CONSENSO | NÃO ENCONTRADO

**O que as fontes dizem**
[tabela com valores e procedência]

**Sensibilidade quantificada**
[quanto muda o resultado final, em %]

**Classificação**
MODELAR | DEFAULT | IGNORAR — com a justificativa em uma linha

**Fontes**
[link, fabricante, ano]
```

Ao final, três tabelas:

**Tabela A — Matriz tipo × substrato** (a da Questão 1, preenchida)

**Tabela B — Veredito de modelagem** (a da Questão 3, preenchida)

**Tabela C — O que continua sem base**

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|

Lacuna declarada é resultado útil. Número inventado é passivo.

═══════════════════════════════════════════════════════════════════

---

## Rastreabilidade

| Questão | Origem no dossiê auditado |
|---|---|
| 1 | §1.1.5, §1.1.6, §1.1.7 — catálogo de 18 tipos e substrato embutido no nome |
| 2 | §1.1.6, §8.2.8, §8.3.3 — fatores de substrato e revestimento |
| 3 | §8.2.7 — decisão de 15/08 de embutir o substrato na identidade da ferramenta |

## O que este retorno alimenta

- `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` — todas as três questões
- Alimenta **R6**: se o substrato for constante, o `E` da deflexão vira valor único e uma das quatro travas do cálculo de deflexão cai
- Alimenta **R4**: o fator de revestimento entra nas tabelas de velocidade
- Cruza com **R1**: microfresa exige substrato de grão fino, o que liga faixa de diâmetro a substrato
