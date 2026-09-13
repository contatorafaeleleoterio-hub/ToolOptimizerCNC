# E3 — Resultados e Apresentação

**O que este documento define:** o que o sistema entrega ao operador depois de calcular, com que hierarquia, e sob que regras de exibição.

**O que não define:** as fórmulas que produzem cada grandeza (ver `canonicos/`), a aparência, a arquitetura.

**Sobre os exemplos:** os blocos monoespaçados ilustram **conteúdo e hierarquia da informação**. Não são desenho de tela.

> **Escopo (27/08/2026).** Este documento descreve o **produto completo**. Três coisas que ele especifica — **perfil de máquina** (limite de rotação, potência, torque, avanço), ~~**fator de segurança** (§6)~~ e **tipo de operação** (desbaste/semi/acabamento) — **ficam fora do MVP** (`mvp/MVP_CALCULADORA_PARAMETROS.md` §12, §1.3). Onde este texto diz "quanto representa do limite da máquina", "folga de potência" ou "segurança 80%", leia como comportamento do produto completo; no MVP o número sai sem essas referências. O exemplo da §3.1 é em escopo de MVP.
>
> **Atualização 01/09/2026 — decisão do Mestre: o fator de segurança ENTRA no MVP.** Ficam fora **dois**, não três: perfil de máquina e tipo de operação. A razão registrada em 27/08 — *"só faz sentido comparado a um limite de máquina"* — não se sustentou: ele não mede contra limite nenhum, é uma **lente de exibição** sobre o próprio resultado do cálculo, e por isso funciona sem perfil de máquina. Ver §6.

---

## 1. A regra que governa esta seção

> **Nenhum resultado visual sem função.**

Um número só aparece se alimentar uma validação ou uma decisão do operador. Número exibido por completude é ruído, e ruído treina o operador a parar de ler a tela.

O corolário incomoda mas é necessário: **grandeza que o sistema calcula e não exibe também não deveria ser calculada** — ou tem função e aparece, ou não tem e sai da cadeia. Cálculo silencioso é peso morto que ninguém revisa porque ninguém vê.

---

## 2. O que o sistema entrega

### 2.1 Números de comando — o que vai para a máquina

São os dois números que o operador digita no comando. Recebem o destaque visual da tela e são **editáveis** (E5 §5).

| Grandeza | Unidade | Função |
|---|---|---|
| **Rotação (n)** | rpm | O que o operador programa no eixo-árvore |
| **Velocidade de avanço da mesa (vf)** | mm/min | O que o operador programa no deslocamento |

*(Produto completo — fora do MVP:)* cada um mostra, junto, **quanto representa do limite da máquina** — a leitura de "sobra" é o que permite decidir se dá para ser mais agressivo. No MVP não há perfil de máquina, então os dois números saem sem "% do limite".

### 2.2 Grandezas de verificação

Não vão para a máquina; dizem se o passe é viável.

| Grandeza | Unidade | Função |
|---|---|---|
| **Potência de corte exigida (Pc)** | kW | Diz se a máquina aguenta o passe sem travar ou alarmar o acionamento |
| **Torque exigido (Mc)** | N·m | Em passes de baixa rotação, a máquina pode ter potência e ainda assim parar por falta de torque |
| **Taxa de remoção de material (MRR)** | cm³/min | Mede a produtividade do passe e é a base direta da energia gasta |
| **Velocidade de corte real (vc)** | m/min | A velocidade efetiva depois de a rotação ser ajustada ou arredondada — pode diferir da pedida |
| **Espessura de cavaco máxima (hex)** | mm | O que a aresta realmente enxerga. Em penetração de trabalho (ae) baixa fica bem abaixo do avanço por dente (fz) — e é o gatilho do alerta mais importante |
| **Relação balanço/diâmetro (L/D)** | — | Rigidez do conjunto montado |
| **Fator de afinamento de cavaco (CTF)** | × | `fz` dividido por `hex` — o quanto o avanço programado é maior que a espessura que a aresta corta. **Só aparece quando `ae < D/2`.** É leitura, não compensação: o sistema não corrige o `fz` (MVP §6.5) |
| **Folga de potência** | % | Quanto da capacidade da máquina sobra — a leitura acionável de "posso ir mais fundo?" |

**Sobre o torque (Mc):** no produto completo ele aparece acompanhado do limite da máquina, como a potência. **No MVP não há limite de máquina** — o torque sai como número, e a sua função é a mesma da potência de corte: em passe de baixa rotação, a máquina pode ter potência e ainda assim parar por falta de torque (é o que o operador confere contra o que conhece da máquina dele).

### 2.3 Contexto do resultado

Sem isso, um resultado copiado ou consultado depois não é interpretável.

| Item | Por quê |
|---|---|
| Material e ferramenta ativos, por extenso | O mesmo par rotação/avanço significa coisas diferentes em materiais diferentes |
| **Os dados do material que entraram na conta** — força específica de corte (kc1.1), expoente (mc), velocidade de corte (vc) | São eles, não o nome do material, que produzem o número. Ficam visíveis e editáveis (§4.7 do MVP). **Não existe "marca de estimativa"** — o sistema mostra o número que usa, e quem quer conferir confere |
| Fator de segurança aplicado, **quando difere de `100 %`** *(~~produto completo — fora do MVP~~ — **no MVP desde 01/09/2026**)* | Diz com que lente os números daquele resultado foram lidos. Aparece como margem em `% do calculado` — `85 %` (§6) |
| Parâmetros de corte usados, com marca de manual onde houver | Permite reproduzir o resultado |
| Momento do cálculo | Distingue o resultado atual de um resultado esquecido na tela |
| Alerta ativo no momento do cálculo, quando havia um | O resultado carrega a condição que o produziu. Não existe marca de forçado: nada trava, logo nada é forçado (**E4** §1) |

---

## 3. Hierarquia da informação

Três níveis, e a distinção entre eles é funcional, não estética.

| Nível | O que ocupa | Critério |
|---|---|---|
| **Destaque** | rotação (n) e avanço da mesa (vf) | São os números que vão para a máquina |
| **Leitura direta** | alerta e ação · indicadores · resumo da ferramenta | O operador precisa ver sem procurar |
| **Sob demanda** | parâmetros usados, grandezas de verificação em detalhe | Consulta, não decisão imediata — recolhido por padrão |

### 3.1 Exemplo de conteúdo

Em escopo de MVP — sem perfil de máquina e sem seletor de operação (o MVP corta ~~os três~~ **os dois**; o fator de segurança entrou em 01/09/2026). **O exemplo continua válido dígito a dígito:** com a lente no padrão de fábrica `100 %` a tela mostra o resultado exatamente como o cálculo o entrega, e por não diferir de `100 %` a lente também não aparece no contexto do resultado (§6.1). Números recalculados pela cadeia corrigida (`canonicos/CANONICO_MOTOR_DE_CALCULO.md` §1.4, força específica do 1045 = 1500 / 0,21).

```
Aço 1045 · Fresa toroidal Ø10 r1,0 Z4 L30 — metal duro
                                                        [ NORMAL ]

NORMAL — nada fora da faixa entre as condições verificadas.

    ROTAÇÃO                        AVANÇO DA MESA
    6 366 rpm                      3 565 mm/min

    Balanço L/D 3,0        Afinamento de cavaco (CTF) 1,01×

▸ Detalhes
```

E, aberto:

```
▾ Detalhes

    Parâmetros usados
    Velocidade de corte (vc)     200 m/min
    Avanço por dente (fz)        0,140 mm
    Penetração de trabalho (ae)  4,5 mm
    Profundidade de corte (ap)   8,0 mm

    Verificação
    Velocidade de corte real          200,0 m/min
    Espessura de cavaco máxima (hex)  0,139 mm
    Espessura de cavaco média (hm)    0,086 mm   (é ela que entra na força)
    Potência de corte (Pc)           5,4 kW     (na aresta, não no motor)
    Torque (Mc)                      8,1 N·m
    Taxa de remoção (MRR)            128,3 cm³/min
```

> **Exemplo anterior corrigido (auditoria, achado A18).** Trazia o `CTF` pela fórmula simplificada eliminada (`1,49×` em vez de `1,01×`), `vf` que não era `fz × Z × n` (`1 528` em vez de `3 565`) e `Pc` que exigia um `kc` ≈ 6 327 (o par do 1045 dá `kc` = 2 513). A versão completa deste exemplo — com "% do limite" e "sobra de potência" — depende das convenções do §6 e de um perfil de máquina, ainda não especificados.

> **Nota 31/08/2026.** O exemplo acima foi enxugado: a gaveta passou a se chamar só "Detalhes", a coluna "partida" saiu dos parâmetros e a linha "Como cada número foi obtido" foi removida — a procedência deixou de ser função do produto (ver §4).

---

## 4. —

> Seção removida em 31/08/2026 — a procedência deixou de ser função do produto (a tela de fórmulas,
> a fonte de cada número e a marca de origem no campo saíram). O número da seção é preservado para
> não deslizar §5–§7 nem quebrar referências.

---

## 5. Regras de exibição

| # | Regra | Por quê |
|---|---|---|
| 1 | **O cálculo trabalha em precisão plena; o arredondamento acontece só na exibição** | Arredondar no meio da cadeia propaga erro para todos os passos seguintes |
| 2 | **Números em fonte de largura fixa** | Dígito que dança quando o valor muda dificulta a leitura de um painel que se atualiza ao vivo |
| 3 | **Antes de calcular, nenhum número** — nem zero, nem traço preenchendo o formato | Zero calculado exibido como resultado é indistinguível de um resultado real |
| 4 | **Unidade sempre junto do número**, nunca só no rótulo distante | Número sem unidade em chão de fábrica é convite a erro de ordem de grandeza |
| 5 | **Casas decimais coerentes com a precisão real da grandeza** | Rotação com três casas decimais sugere uma precisão que o modelo não tem |

### 5.1 Casas decimais

A quantidade de casas decimais é **propriedade da grandeza**, não preferência de exibição: rotação (n) e velocidade de avanço da mesa (vf) são números inteiros na prática da máquina; o avanço por dente (fz) precisa de milésimos para ser útil.

**As casas decimais são fixas por grandeza, pelo significado físico, e não ajustáveis pelo operador** (Q5, 27/08/2026). Rotação com três decimais sugere uma precisão que o modelo não tem; uma casa a menos na espessura de cavaco (hex) esconde informação que decide o alerta. Um controle de casas decimais é falsa precisão — refino abaixo do que o modelo resolve, configuração de baixo valor que não entra.

### 5.2 O disclaimer

Texto fixo e permanente: **o sistema recomenda, o operador decide.**

Ele não é aviso legal escondido no rodapé — é a declaração do papel do sistema, e sustenta toda a arquitetura de recomendação × limite físico.

---

## 6. Fator de segurança

**É uma lente de exibição.** Um ajuste único e persistente, em **porcentagem do valor calculado**, aplicado **por último**, sobre os números de resultado que a tela mostra. Padrão **`100 %`** — a tela entrega o resultado exatamente como as fórmulas o produzem. A `85 %`, os números de resultado aparecem a 85 % do calculado, sempre, até o operador mudar.

> **No MVP desde 01/09/2026** (decisão do Mestre). **E2** §7 é o dono do modelo, da lista do que escala e da regra de edição; esta seção descreve o efeito na leitura.
>
> ⚠ **Correção de modelo, 01/09/2026, mesmo dia.** A redação anterior desta seção dizia que o fator era um multiplicador que inflava a previsão de esforço, com padrão `+0 %` e efeito só sobre potência de corte (Pc) e torque (Mc). O Mestre corrigiu o modelo; o que vale é a lente descrita aqui.
>
> - Na tela chama-se **margem de segurança**, em **`% do calculado`**: `100 %`, `85 %`. Não é `0,85×` nem `−15 %`. Na fala do operador, `85 %` mostrado é `15 %` de margem.
> - O controle é **campo numérico ou passo `±`** (os mesmos `±` de rotação e avanço), **nunca cursor deslizante ou barra** — proibido por **R14**.
> - Mora na área **Configurações**; o painel principal só o mostra quando difere de `100 %` (§6.1).
> - **Não é limitador:** acima de `100 %` é permitido — a tela mostra mais que o calculado, e a decisão é do operador (**R1**, §5.2).
> - **Nenhuma fonte é exigida:** é interação de tela, e `100 %` é a identidade "mostra o que o cálculo deu".

| Escala | Não escala |
|---|---|
| Rotação (n) | Espessura de cavaco máxima (hex) e média (hm) |
| Velocidade de avanço da mesa (vf) | Relação balanço/diâmetro (L/D) |
| Velocidade de corte real (vc) | Fator de afinamento de cavaco (CTF) |
| Potência de corte exigida (Pc) | O alerta e o nível de segurança |
| Torque exigido (Mc) | Tudo o que o operador digitou (ap, ae, L, Z, dados do material) |
| Taxa de remoção de material (MRR) | |

**A linha divisória:** escala **o que o operador executa e o esforço que ele dimensiona**; não escala **o que o alerta mede**.

**Por que as grandezas de verificação ficam de fora.** Número e alerta sobre a mesma grandeza não podem discordar na mesma tela. Se a espessura de cavaco exibida fosse escalada e o alerta continuasse no valor físico — que é o que ele tem de fazer —, a tela mostraria uma espessura e alertaria sobre outra (**E4**, e **R7**/**R15** do gabarito). Além disso, "conservador" não quer dizer nada numa espessura de cavaco reduzida: ela deixaria de corresponder a condição de corte nenhuma. O alerta descreve o físico real; a lente filtra a leitura de comando e de esforço.

> ~~**Por que só a carga:** rotação e avanço são comandos — o operador vai digitá-los exatamente como estão. Multiplicá-los por um fator de segurança entregaria um número que não é o que se quer executar. Potência e torque são previsões de esforço, e é sobre previsão que a margem se aplica.~~
>
> **Revogado em 01/09/2026 por decisão do Mestre.** Esta razão vinha do bloco de decisão de 27/08 e sustentava o modelo antigo, em que o fator inflava a previsão de esforço. No modelo de lente ela se inverte: **rotação e avanço são exatamente o que o operador conservador quer ver já descontado**, porque são o que ele vai digitar na máquina. Ele continua sendo quem decide o que executar (**E5** P12) — a lente só muda o número que ele lê antes de decidir.

### 6.1 O fator de segurança é visível quando difere do padrão

Um resultado **lido por uma lente diferente de `100 %`** precisa dizê-lo, ou será comparado indevidamente com outros resultados depois. Em `100 %` — o padrão — nada aparece: não há o que declarar quando a tela mostra o cálculo como ele é.

### 6.2 Casos de borda — fator de segurança

| Situação | Comportamento | Por quê |
|---|---|---|
> **Tabela reescrita em 01/09/2026** para o modelo de lente. As linhas anteriores descreviam um multiplicador de previsão de esforço e não se aplicam mais.

| Situação | Comportamento | Por quê |
|---|---|---|
| Lente em `100 %` | Os números saem exatamente como o cálculo os produz, e **nada** sobre a lente aparece no contexto do resultado | É o padrão de fábrica e o estado neutro (§6.1) |
| Lente abaixo de `100 %` — o caso do operador conservador | Todo número de resultado que a lente cobre aparece reduzido; o valor da lente aparece no contexto do resultado | É o que ele configurou para ver. O contexto diz qual lente produziu aquela leitura |
| **Lente acima de `100 %`** | **Permitido.** A tela mostra mais que o calculado, com o valor da lente no contexto | Não é limitador (**E2** §7.1, **R1**). O sistema recomenda, o operador decide (E5 P12) |
| Lente diferente de `100 %` e um alerta ativo | **O alerta não muda.** Nível, texto e a grandeza medida seguem o valor físico real | O alerta é sobre limite físico, não sobre a lente. Alerta que se movesse com ela seria a lente virando limitador de segurança (**R7**, **R15**) |
| Operador edita a rotação ou o avanço com a lente diferente de `100 %` | Edita o número que vê; o sistema desescala, recalcula em precisão plena e reaplica a lente | **E2** §7.3. O cálculo nunca roda sobre o valor escalado |
| Lente alterada depois do primeiro cálculo | A exibição se ajusta na hora, sem novo comando | Modelo vivo (E5 §4). Não é recálculo: a cadeia não mudou, só a lente sobre ela |
| Dois resultados lidos com lentes diferentes | Cada um carrega no contexto a lente que o produziu | Sem isso seriam comparados como iguais (§6.1) |

---

## 7. Casos de borda — resultados

| Situação | Comportamento | Por quê |
|---|---|---|
| A rotação calculada excede o limite da máquina | O número é exibido **como calculado**, com o alerta de limite ativo dizendo a rotação exigida contra o teto e de quanto excede — não uma instrução de reduzir (**E4** §1) | Esconder ou truncar o número tiraria do operador a informação de **quanto** está excedendo |
| A rotação calculada é tão baixa que a máquina não a atinge | Rotação mínima da máquina é **ambiente declarado — fora do MVP** (Q6, `decisoes/BLOCO_DE_DECISAO.md` Parte 3: quando o perfil de máquina entrar, é mais um item dele). Sem perfil declarado, nenhum alerta de rotação | O sistema não afirma o que não sabe (**E4** §1.2) |
| O afinamento de cavaco (CTF) não está ativo (`ae ≥ D/2`) | O indicador correspondente **não aparece** | Indicador que mostra "1,00×" ocupa espaço para dizer "nada aconteceu" |
| O operador substitui um dado do material pelo do fornecedor dele | Recalcula na hora | O número passou a ser dele; é assim que uma estimativa vira dado (§4.7 do MVP) |
| Resultado obtido, e em seguida o operador muda um campo | Os números recebem tratamento de desatualizado até o resultado novo; alerta e nível de segurança não (E5 §4.1) | Alarme ativo não se esmaece |
| Duas grandezas excedem limites diferentes ao mesmo tempo | O alerta mostra a mais grave e indica que há outra; ambas aparecem sinalizadas na leitura de detalhe | Uma linha com duas ordens vira ruído (E5 §9.2) |
| O operador copia o resultado para uso externo | **Não existe função de copiar no MVP** (Q7, `decisoes/BLOCO_DE_DECISAO.md` Parte 3 e `mvp` §12). Entra quando o uso mostrar qual formato é o real — dois números soltos ou o bloco com contexto | Um resultado copiado sem contexto não é interpretável depois |

---

## Dependências deste documento

**Valores numéricos:** nenhum. Este documento define o que se exibe e sob que regras, não os valores.

**Pergunta fechada (bloco de decisão, 27/08/2026):**

| # | Pergunta | Decisão | Onde |
|---|---|---|---|
| Q5 | Casas decimais ajustáveis ou fixas? | Fixas por grandeza, pelo significado físico. Não ajustáveis pelo operador | §5.1 |

**Perguntas triadas para a Parte 3 do bloco de decisão (pode esperar — frentes adiadas):**

| # | Pergunta | Recomendação preliminar | Onde |
|---|---|---|---|
| Q6 | O sistema deve conhecer a rotação **mínima** da máquina e alertar quando o cálculo ficar abaixo dela? | Sim, como item do perfil de máquina, quando o ambiente declarado entrar. Fora do MVP | §7 · `decisoes/BLOCO_DE_DECISAO.md` |
| Q7 | Existe função de copiar o resultado? Em que formato? | Adiado até o uso mostrar qual formato é o real. Fora do MVP | §7 · `decisoes/BLOCO_DE_DECISAO.md` |

**Referências cruzadas:**

| Assunto | Documento |
|---|---|
| Quando e como o resultado é recalculado; edição dos números de comando | **E5** |
| Limiares que definem o nível de segurança e os alertas | **E4** |
| Perfil da máquina contra o qual as grandezas são verificadas | **E2** |
| Fórmulas e constantes de cada grandeza | `canonicos/` |
