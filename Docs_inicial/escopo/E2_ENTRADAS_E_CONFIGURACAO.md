# E2 — Entradas e Configuração

**O que este documento define:** o que o operador informa ao sistema — quais campos existem, que faixa cada um aceita, o que é rejeitado e o que é apenas avisado, de onde vem o valor de partida de cada controle, e o que ele configura uma vez e passa a valer sempre.

**O que não define:** quais ferramentas e materiais a lista oferece (**E1**), o que o sistema devolve depois de calcular (**E3**), os limiares que disparam alerta (**E4**), a ordem em que os campos aparecem na tela e o momento do cálculo (**E5**), onde o que o operador guardou fica armazenado (**E6**), as fórmulas que consomem estes valores (`canonicos/`).

**Sobre os exemplos:** os blocos monoespaçados ilustram **conteúdo e hierarquia da informação**. Não são desenho de tela.

---

## 1. As duas regras que governam esta seção

> **1. Campo que não muda nenhum número não existe.**
> **2. Nada é assumido em silêncio quando errar por fator dois é possível.**

A primeira protege o operador do excesso: cada campo custa uma decisão, e um campo sem efeito ensina quem usa a preencher sem olhar — hábito que ele leva para os campos onde a escolha decide o resultado. Campo que não se aplica **não fica desabilitado; não existe**.

A segunda protege o operador do silêncio: se uma variável multiplica o resultado, ela aparece — como campo ou como controle com o valor à vista. **Um número errado por fator dois parece plausível**: está na ordem de grandeza certa, e nada na tela indicaria o erro.

**As duas juntas produzem a única classificação que interessa aqui:** o que o operador chega sabendo vira **campo**; o que ele não tem na cabeça, mas que pesa no resultado, vira **controle com valor de partida visível**; o que não muda número nenhum não entra.

---

## 2. Os campos comuns

Existem em toda ferramenta, qualquer que seja a família.

| Campo | Unidade | Obrigatório | O que ele decide |
|---|---|---|---|
| **Material da peça** | — | sim | É o primeiro filtro: define a lista de ferramentas e o valor de partida da velocidade de corte (vc) (**E1** §8) |
| **Ferramenta** | — | sim | Define quais campos existem daqui para baixo e quais controles de corte fazem sentido |
| **Diâmetro da ferramenta (D)** | mm | sim | Entra na rotação (n), no diâmetro efetivo (De) e no teto da penetração de trabalho (ae) |
| **Balanço (L)** | mm | sim | O quanto a ponta se projeta da face do porta-ferramenta. Produz a relação balanço/diâmetro (L/D) e o alerta correspondente |
| **Número de arestas (Z)** | — | sim, onde o avanço é por dente | A velocidade de avanço da mesa (vf) é **diretamente proporcional** a ele |
| **Profundidade de corte (ap)** | mm | sim, nas famílias de fresamento | Principal fator da taxa de remoção de material (MRR), e com ela da potência de corte (Pc) e do torque (Mc) |
| **Comprimento de aresta (Lc)** | mm | **não** — opcional, nas famílias de fresamento | Preenchido, vira o teto físico da profundidade de corte e entra no cálculo de deflexão. Vazio, o teto é o proporcional (§5.2) e a deflexão cai para o modelo mais conservador |

**Os campos próprios de cada geometria** — raio de ponta (rε), ângulo de posição (κ), ângulo de ponta, passo da rosca (P), diâmetros inicial e final — estão em **E1** §3.3, porque são propriedade da entrada de catálogo, não uma lista à parte.

### 2.1 O número de arestas (Z) é obrigatório, e nunca assumido

O tipo de ferramenta traz um valor **padrão preenchido**, visível e editável (**E1** §3.3). Isso é sugestão, não premissa: o campo continua na tela, com o número à vista.

**A razão de não assumir:** assumir quatro arestas numa ferramenta de duas entrega **o dobro** da velocidade de avanço correta; numa de seis, entrega dois terços. É exatamente o caso que a regra 2 da §1 existe para impedir.

### 2.2 Por que a profundidade de corte (ap) é campo, e a penetração de trabalho (ae) é controle

As duas movem o resultado com peso em fresamento, e as duas ficam visíveis e editáveis. **A diferença é quem chega com o valor decidido.**

| | Profundidade de corte (ap) | Penetração de trabalho (ae) |
|---|---|---|
| O operador chega com ele decidido? | **Sim** — ela faz parte do parâmetro que a oficina registra ao lado da rotação e do avanço | **Não** — não aparece entre as variáveis do uso corrente |
| Onde fica | **campo de entrada** | **controle de ajuste**, com o valor de partida declarado na tela |

**A penetração de trabalho não é assumida em silêncio.** Ela aparece com o valor de partida, marcada como padrão da geometria, e alimenta o fator de afinamento de cavaco (CTF) e a espessura de cavaco exibida como resultado ~~e o alerta de espessura mínima de cavaco — o alerta mais importante do produto~~ — **alerta revogado em 30/08 e 08/09/2026 (`E4` gatilhos 1 e 11a); a espessura fica como número visível, não como aviso.** Um campo a mais para um valor que o operador não tem na cabeça custa mais do que resolve; um valor escondido custaria muito mais.

### 2.3 Os dados do material são entrada, não rótulo

**O que produz o número não é o nome do material — são os dados dele.** Por isso as grandezas do material que entram na conta ficam **visíveis e editáveis** ao lado dele: classe de usinabilidade, dureza, a força específica de corte (kc) e o expoente de Kienzle (mc), e a velocidade de corte (vc).

| # | Regra | Por quê |
|---|---|---|
| 1 | Todos são **editáveis pelo operador** | O fornecedor da ferramenta publica esses números, e o operador pode pedi-los. Um dado melhor que o nosso deve poder entrar sem esperar versão nova |
| 2 | O valor editado **persiste por material** (**E6** §5) | Ele digita uma vez o que o fornecedor mandou, e aquele material passa a valer na oficina dele |
| 3 | Todo valor editado tem **retorno ao valor de origem** ao lado, e existe um comando de voltar tudo | Edição sem caminho de volta é armadilha |
| 4 | — | Regra removida em 31/08/2026. Número preservado; a lista não é renumerada |
| 5 | Editar um dado **recalcula na hora** | Modelo vivo (**E5** §4) |
| 6 | O sistema **não carimba o próprio dado como estimativa** | O valor está na tela: quem quiser conferir, confere. Selo genérico repetido em toda linha ensina o operador a ignorá-lo |
| 7 | — | Regra removida em 31/08/2026. Número preservado; a lista não é renumerada |

**Exemplo de conteúdo:**

```
Material    Aço H13 (tratado)          classe H · 50 HRC

            Força específica   3000 N/mm²      ⟲
            Expoente           0,25            ⟲
            Velocidade         46–147 m/min    ⟲

            Estes são os números que entram na conta. Se o seu
            fornecedor publica outros, digite os dele.
```

**Consequência que vale registrar:** este é o caminho real de fechamento das lacunas de dado do produto. Nenhuma pesquisa alcança o que o fornecedor entrega direto a quem compra a ferramenta — e o operador que digita o dado do catálogo dele obtém, na hora, um resultado melhor que o nosso.

### 2.4 Casos de borda — campos

| Situação | Comportamento | Por quê |
|---|---|---|
| Campo obrigatório vazio | Sem resultado, campo sinalizado, e o bloco que o contém **não recolhe** | Erro escondido em gaveta é erro que não existe para o operador (**E5** §3) |
| Ferramenta trocada por outra que tem campos diferentes | Os campos que não existem na nova **somem**; os que existem nas duas mantêm o valor | Manter o que serve poupa retrabalho; manter o que não serve inventa dado |
| Balanço (L) menor que o diâmetro | Aceito, sem aviso | É a condição mais rígida possível — não há o que avisar |
| Valor digitado com vírgula ou com ponto como separador decimal | **Os dois são aceitos** (Q24, 27/08/2026); a exibição segue o padrão local (pt-BR, vírgula) | A oficina digita vírgula. Recusar vírgula é atrito puro, e é o tipo de erro que o operador culpa a si mesmo |

---

## 3. Faixas aceitas

### 3.1 A faixa de diâmetro é a fronteira declarada do produto

O sistema tem um envelope de diâmetro em que os dados de partida foram levantados, e **ele é declarado, não universal**. Fora dele o resultado continua saindo, com o alerta de processo correspondente (§3.3).

| Fronteira | Situação |
|---|---|
| **Piso comercial** de fresa inteiriça | firme — dois fabricantes independentes |
| **Teto** de fresa inteiriça | menos firme: um fabricante documenta famílias específicas, e um filtro de catálogo não verificado item a item vai bem além. Acima disso a ferramenta muda de tipo — passa a cabeçote com pastilha, o que é mudança de ferramenta, não de calculadora |
| Demais famílias (furar, roscar, mandrilar) | **Não herdam o envelope da fresa** (Q22, 27/08/2026): enquanto o envelope delas não for levantado, o sistema não aciona o alerta de fora-do-envelope, e a ajuda do campo diz que o envelope não foi levantado. Acionar esse alerta numa broca Ø30 com base num envelope emprestado seria afirmação sem base, e treinaria o operador a ignorá-lo. O levantamento de catálogo por família fecha isso quando alguém sentar com os catálogos |

**Por que uma faixa universal ampla é pior que uma faixa estreita e declarada:** uma faixa larga sem base aceita qualquer diâmetro e, acima da última linha de tabela, repete silenciosamente o último valor conhecido. O operador recebe um número que parece calculado e é cópia.

### 3.2 Piso de processo é diferente de piso de catálogo

Existe um diâmetro abaixo do qual a máquina do operador não consegue manter a velocidade de corte (vc) alvo, porque a rotação (n) necessária passa da que ela atinge. Esse piso é **derivado de física direta** e depende da rotação máxima da máquina — portanto **pertence ao ambiente declarado** (§6), e não é um limite do sistema.

```
Piso de processo = velocidade de corte alvo ÷ (π × rotação máxima da máquina)
```

Numa máquina que gira até doze mil rotações por minuto, com alvo de duzentos metros por minuto, esse piso fica perto de cinco milímetros: uma fresa de dois décimos de milímetro nessa máquina roda a menos de 4% da velocidade de corte alvo. O número continua correto — a ferramenta é que está esfregando em vez de cortar.

**Enquanto o ambiente não estiver declarado, isso é explicação na ajuda do campo de diâmetro, nunca limite aplicado.** Com o ambiente declarado, ⚠ **NÃO DEFINIDO** — *ver Q23*.

### 3.3 Comportamento fora do envelope conhecido

Ao sair do envelope de diâmetro em que os dados de partida foram levantados, o sistema:

1. **aciona o alerta de processo** correspondente (**E4**), no nível ATENÇÃO;
2. **mantém o resultado visível** — sair do envelope é aviso, não recusa.

Onde o envelope não foi levantado (§3.1), a ajuda do campo diz isso, e o operador segue com a opção de trocar a sugestão pelo dado dele.

### 3.4 O passo de cada campo acompanha a grandeza

O incremento de ajuste de um campo é propriedade da grandeza e da ordem de tamanho em que ela está sendo usada — um passo fino demais transforma ajuste em maratona, e um passo grosso demais impede o valor que o operador quer. Diâmetro abaixo de um milímetro pede centésimos; acima disso, décimos. Os valores estão em `canonicos/` e nos padrões de cada geometria (**E1** §3.3).

### 3.5 Unidade — só milímetro

O sistema trabalha **só em milímetro** (Q24, 27/08/2026). O campo aceita vírgula e ponto na digitação e exibe no padrão local. Polegada não entra: obrigaria converter catálogo, faixas e envelopes inteiros e duplicar toda faixa declarada — é outro produto, não uma opção de menu. Polegada só entra quando existir usuário real fora do sistema métrico.

---

## 4. O que é avisado — e por que nada é rejeitado

> **Nenhum campo trava e nenhum valor é recusado.** A única exceção é o valor que não é grandeza (§ final desta seção).

Três naturezas, três **mensagens** — não três permissões. A distinção vem de **E0** §3.3 e atravessa todo o produto.

| Natureza | O que é | Comportamento | Exemplo |
|---|---|---|---|
| **Impossível** | Pede à ferramenta algo que a montagem não realiza | **Aceita e avisa no nível mais grave** (**E4**), dizendo de quanto o pedido estourou | Penetração de trabalho (ae) maior que o diâmetro; profundidade de corte (ap) maior que o comprimento de aresta (Lc), quando ele foi informado; furo prévio menor que o mínimo da rosca |
| **Limite de processo** | Pede algo possível e ruim | **Aceita e avisa**, descrevendo a condição e situando o valor (**E4**) | Espessura de cavaco (hex) abaixo do piso; balanço (L) longo para o diâmetro |
| **Sanidade** | O valor não é um parâmetro, é um erro de digitação | **Aceita e avisa, rotulado como erro de digitação** — nunca como risco de processo | Uma ordem de grandeza fora do plausível |

**Por que sanidade tem categoria própria:** avisar "risco de processo" quando o operador digitou um zero a mais o ensina a desconfiar dos alertas verdadeiros. O sistema precisa dizer *"isso parece erro de digitação"*, porque é o que é.

**Por que nem o impossível é rejeitado:** rejeitar no campo esconde o tamanho do erro. Ver o número que sai de uma penetração de trabalho maior que o diâmetro é o que mostra ao operador **o quanto** ele passou — e é isso que o faz corrigir. O sistema entrega, nomeia a condição e situa o valor — o operador decide o que fazer.

**Valor nulo ou negativo em qualquer grandeza dimensional não é aceito.** Não é limite de processo nem condição impossível — é **ausência de grandeza**: não há o que calcular com ele.

### 4.1 Casos de borda — validação

| Situação | Comportamento | Por quê |
|---|---|---|
| Penetração de trabalho (ae) maior que o diâmetro | **Aceito**, com o alerta de condição impossível e o resultado entregue (**E4** §3.1) | O número mostra de quanto o pedido estourou; recusar esconderia isso |
| Profundidade de corte (ap) maior que o comprimento de aresta (Lc), **com o campo preenchido** | **Aceito**, com o alerta de condição impossível — a mensagem diz qual parte da profundidade não tem aresta para cortar | Aresta que não existe não corta, mas o operador precisa ver o quanto falta |
| Profundidade de corte maior que o comprimento de aresta, **com o campo vazio** | Aceito, limitado só pelo teto proporcional | O sistema não inventa um comprimento que não foi informado |
| Diâmetro abaixo do piso comercial | Aceito, com o alerta de fora-do-envelope (§3.3) | O produto não proíbe o que a física permite |
| Valor implausível por uma ordem de grandeza | Aceito, com aviso de erro de digitação | Ver acima |

---

## 5. Os controles de corte

São as variáveis contínuas do cálculo. Ficam num bloco próprio, depois dos campos, porque **suas faixas dependem de tudo o que está acima** (**E5** §2).

### 5.1 Quais controles existem, por família

Exibir controle que o cálculo não lê é o defeito que a regra 1 da §1 existe para impedir.

| Família | Controles | Ressalva |
|---|---|---|
| **Fresar** | velocidade de corte (vc) · avanço por dente (fz) · penetração de trabalho (ae) | a profundidade de corte (ap) é **campo**, não controle (§2.2) |
| **Furar** | velocidade de corte — e avanço por rotação (fn) **só onde ele é editável na ferramenta** | nas demais, o avanço por rotação é derivado; um controle ali não mudaria número nenhum |
| **Roscar — macho** | velocidade de corte | o avanço é **imposto pelo passo da rosca (P)** e aparece como leitura travada |
| **Roscar — fresa de rosca** | velocidade de corte · avanço por dente (fz) | a fresa de rosca avança **por dente**, com o número de arestas (Z), como fresamento — não pelo passo (**E1** §2) |
| **Mandrilar** | velocidade de corte · avanço por rotação | a profundidade é **derivada** da diferença de diâmetros — leitura travada, não controle |

### 5.2 De onde vem o valor de partida

| Controle | Nasce em |
|---|---|
| Velocidade de corte (vc) | valor de partida do material × fator do substrato da ferramenta (**E1** §4.3) |
| Avanço por dente (fz) | curva por diâmetro |
| Penetração de trabalho (ae) | padrão da geometria (**E1** §3.3) |
| Avanço por rotação (fn) | padrão do tipo de ferramenta |

| # | Regra | Por quê |
|---|---|---|
| 1 | **Todo controle nasce no valor de partida, e essa posição fica marcada na escala** | Quem não mexe em nada obtém exatamente a recomendação — é o que torna o primeiro resultado utilizável sem configuração alguma |
| 2 | **Não existe multiplicador por tipo de operação** sobre esses valores | Eles foram procurados como regra de fabricante e não existem nessa forma. Ver **E1** §7.1 |
| 3 | A referência contra a qual o desvio é medido **é declarada na ajuda do controle** | Onde a referência é padrão da geometria e não recomendação de catálogo, isso precisa estar escrito — não se inventa uma recomendação que o cálculo não produz |

### 5.3 Limites de cada controle, e a natureza de cada limite

**Nem todo limite de controle é da mesma natureza, e confundi-los é o erro caro:**

| Limite | Natureza | Comportamento no fim da escala |
|---|---|---|
| Penetração de trabalho (ae) até o diâmetro | **geométrico** | Passa, com o alerta de condição impossível (**E4**) |
| Profundidade de corte (ap) até o comprimento de aresta (Lc) informado | **geométrico** | Passa, com o alerta de condição impossível |
| Profundidade de corte até o teto proporcional ao diâmetro | **topo da faixa que a evidência cobre** | Passa, com o alerta de fora-do-envelope (**E4**) |
| Teto de velocidade de corte (vc) e de avanço por dente (fz) | **topo da faixa que a evidência cobre** | Idem |
| Piso de avanço por dente | **decisão de projeto** — não foi encontrada base para um piso absoluto | Passa ~~, com o alerta de espessura de cavaco (hex) ativo (**E4**)~~ — **sem alerta: revogado em 30/08 e 08/09/2026 (`E4` gatilhos 1 e 11a)** |

**O piso real de avanço por dente depende do raio de aresta (rβ), da geometria, do batimento, do material e da penetração de trabalho** — por isso ele é tratado como alerta, e não como trava. Uma trava fixa mentiria nos dois sentidos: proibiria o que é possível numa ferramenta afiada e permitiria o que já não corta noutra.

**O que o ajuste de controles não faz:** nenhum controle empurra outro para satisfazer um alvo, e nenhum corrige em silêncio a condição impossível que outro campo criou — ela vira alerta, não ajuste automático.

### 5.4 Marca de manual e caminho de volta

| # | Regra | Por quê |
|---|---|---|
| 1 | Todo controle que divergir do valor de partida exibe **marca de manual** | O resultado carrega a decisão que o produziu (**E3** §2.3) |
| 2 | Todo controle manual tem **retorno ao valor de partida ao lado** | Sem isso o operador perde a referência e só volta recomeçando |
| 3 | Existe um comando único de **voltar tudo ao recomendado** | — |
| 4 | Escolher material ou ferramenta **nunca** recebe marca de manual | Escolher é configuração, não desvio de uma recomendação (**E1** §3.7) |

### 5.5 Ajuda contextual — parte do controle, não página à parte

| # | Regra | Por quê |
|---|---|---|
| 1 | Aberta por um gatilho ao lado do rótulo | A dúvida nasce onde o controle está |
| 2 | **Abre por clique**, nunca só ao passar o cursor | Quem navega por teclado precisa alcançar; quem usa luva também |
| 3 | **Empurra o conteúdo** em vez de flutuar sobre ele | Conteúdo flutuante fecha justamente quando o operador mexe no controle para experimentar |
| 4 | **Várias podem ficar abertas ao mesmo tempo** | Comparar dois parâmetros exige ler os dois |
| 5 | Fecha pelo próprio gatilho ou por tecla de escape | — |
| 6 | O estado **não** persiste entre sessões | Ajuda é consulta pontual, diferente do colapso dos blocos (**E5** §3) |

**Estrutura fixa de quatro partes — o que é · ao aumentar · ao diminuir · equilíbrio.** Um parâmetro sem os quatro textos escritos **não entra na tela**: controle sem explicação é caixa-preta com um botão, e contraria o atributo de o sistema ensinar o domínio pelo uso.

#### Exemplo de conteúdo

```
Velocidade de corte (m/min)

O que é       Velocidade tangencial na aresta da ferramenta durante o corte.
Ao aumentar   Usinagem mais rápida, mas desgaste prematuro e mais calor.
Ao diminuir   Ferramenta mais protegida, porém pode manchar o acabamento.
Equilíbrio    Ajuste junto com o avanço por dente — material mais duro
              pede velocidade menor.
```

### 5.6 Casos de borda — controles

| Situação | Comportamento | Por quê |
|---|---|---|
| Operador mexe no controle com a ajuda aberta | A ajuda **permanece aberta** | É exatamente o momento em que ele quer ler |
| Ajuda aberta dentro de bloco que o operador recolhe | Recolhe junto, e volta fechada quando o bloco reabrir | Ajuda é consulta pontual |
| Avanço por dente (fz) levado abaixo do piso | Aceito ~~, com o alerta de espessura de cavaco (hex) ativo~~ — **sem alerta: revogado em 30/08 e 08/09/2026 (`E4` gatilhos 1 e 11a)** | ~~O sistema avisa, o~~ **O** operador decide |
| Penetração de trabalho (ae) levada ao valor do diâmetro | Aceito, com o alerta de rasgo cheio ativo | Rasgo cheio é condição legítima, e difícil |
| Controle levado ao extremo da escala repetidas vezes | Nenhum efeito acumulado | Não existe estado escondido nos controles |

---

## 6. O perfil de máquina

**O perfil de máquina é o ambiente declarado** (**E0** §3.2): tudo o que depende do equipamento de quem usa, e não do cálculo.

| Item | O que ele permite |
|---|---|
| **Rotação máxima (n)** | dizer quanto da máquina a rotação calculada consome, e alertar quando ela é ultrapassada |
| **Velocidade de avanço máxima da mesa (vf)** | idem, para o avanço |
| **Potência disponível** | transformar a potência de corte (Pc) na aresta em leitura de folga — *"sobra tanto"* |
| **Torque disponível** | detectar o passe que tem potência de sobra e ainda assim para por falta de torque (Mc) em baixa rotação |
| **Rendimento do acionamento (η)** | sem ele não existe potência no motor, só potência na aresta |

### 6.1 As regras do ambiente declarado

| # | Regra | Por quê |
|---|---|---|
| 1 | **Nunca bloqueia.** Ativar o perfil acrescenta informação ao resultado; não impede o resultado de existir | Um limite de máquina é um fato sobre a máquina, não uma proibição sobre a física |
| 2 | **A ativação é explícita e reversível** | Configuração que não se desfaz é armadilha |
| 3 | **O padrão é não ter perfil.** Quem abre e não declara nada obtém um resultado completo e utilizável | É o que separa calculadora de configurador |
| 4 | **É opcional em profundidade:** declarar um item não obriga a preencher os outros | Ninguém tem a ficha técnica inteira da máquina à mão |
| 5 | **Persiste entre usos, e o fato de estar ativo é visível sem abrir nada** | Quem declarou a máquina uma vez trabalha nela todo dia. O que não pode acontecer é o operador ver um resultado condicionado sem saber que está |
| 6 | **Avisa, nunca ajusta em silêncio** | Ajustar escondido tiraria do operador justamente a informação útil: que a máquina dele é o fator limitante |

### 6.2 Casos de borda — perfil de máquina

| Situação | Comportamento | Por quê |
|---|---|---|
| Perfil parcialmente preenchido | Vale o que foi declarado; o que não foi simplesmente não produz leitura de limite | Regra 4 |
| Perfil ativo e resultado excedendo um limite | O número aparece **como calculado**, com o alerta dizendo o valor exigido contra o limite e de quanto excede | Esconder ou truncar tiraria a informação de **quanto** está excedendo (**E3** §7) |
| Perfil desativado depois de um resultado | Recalcula, e as leituras de folga somem | Modelo vivo |
| Operador tem mais de uma máquina | ⚠ **NÃO DEFINIDO** — *ver Q25* | — |
| Rendimento não declarado | ⚠ **NÃO DEFINIDO** — *ver Q26* | — |

---

## 7. O fator de segurança

O fator de segurança — **mostrado na tela como "margem de segurança"** — é a
**única configuração que incide sobre o resultado final** (bloco de decisão, 27/08/2026): a regra geral de que fator com pouca ou nenhuma influência não entra deixa em pé apenas este.

> **Decisão do Mestre, 01/09/2026: entra no MVP.** Ele estava especificado aqui como produto
> completo, e o gabarito do protótipo §2.3 o listava como anti-requisito. As duas coisas foram
> revogadas. Daqui para a frente o texto usa os dois nomes — *fator de segurança* é o conceito,
> *margem de segurança* é como o operador o lê.
>
> ⚠ **Correção de modelo, 01/09/2026, mesmo dia.** A primeira redação desta seção descrevia um
> **multiplicador que inflava a previsão de esforço**, com padrão `+0 %` e efeito só sobre potência de
> corte (Pc) e torque (Mc). **O Mestre corrigiu: não é isso.** É uma **lente de exibição**, com padrão
> `100 %`, que escala os números de resultado que a tela mostra. Tudo abaixo é o modelo correto.

### 7.1 O que ele é — uma lente de exibição

Um ajuste **único e persistente**, em **porcentagem do valor calculado**, aplicado **por último**,
sobre os números de resultado exibidos:

```
o que aparece na tela  =  resultado calculado ao vivo  ×  fator
```

**O padrão é `100 %`** — a tela mostra o resultado exatamente como as fórmulas entregam. Baixado para
`85 %`, o painel passa a mostrar **sempre** os resultados a 85 % do calculado, até o operador mudar de
novo. É para o operador que quer trabalhar vendo número conservador por padrão, sem ter que
descontar de cabeça a cada passe.

**Não é limitador.** Não trava, não bloqueia, não recusa e não escala com regra própria. **Acima de
`100 %` é permitido** — a tela mostra mais que o calculado, e isso é decisão do operador (§4, **R1**;
o sistema recomenda, o operador decide).

| # | Regra | Por quê |
|---|---|---|
| 1 | **É configuração persistente, não campo por cálculo** | A margem com que uma oficina trabalha é política dela, não decisão de cada passe |
| 2 | **Está sempre disponível — não depende do perfil de máquina** | É lente sobre o resultado do cálculo, não folga contra um limite declarado. Sem perfil de máquina ela funciona igual |
| 3 | **Quando difere de `100 %`, isso é visível no resultado** | Sem isso, dois resultados lidos com lentes diferentes seriam comparados como iguais |
| 4 | **A representação é `% do calculado` — `100 %`, `85 %`.** Não é multiplicador (`0,85×`) nem porcentagem com sinal (`−15 %`) | `85 %` responde direto à pergunta que o operador faz: *"a tela está me mostrando quanto do que o cálculo deu?"* Na fala do operador, `85 %` mostrado é `15 %` de margem |
| 5 | **O controle é campo numérico ou passo `±`, do mesmo tipo dos `±` de rotação e avanço. Não é cursor deslizante nem barra** | Barra proporcional é proibida por **R14**: sugere uma escala com teto, e aqui não há teto |
| 6 | **Mora no painel de Configurações** (§8, grupo **Segurança**) | Consequência da regra 1. O painel principal exibe o valor só quando difere de `100 %` (**E3** §6.1) |
| 7 | **Nenhuma fonte externa é exigida** | A disciplina No-Invention vale para fórmula, constante do motor e limiar derivado de constante física. Isto é **interação de tela**, e `100 %` é a identidade trivial "mostra o que o cálculo deu" |

### 7.2 O que a lente escala, e o que ela não toca

**Escala** — o que o operador executa na máquina e o esforço que ele dimensiona:

| Grandeza | Por que entra |
|---|---|
| Rotação (n) | É o que ele digita no comando; é sobre este número que "conservador" quer dizer alguma coisa |
| Velocidade de avanço da mesa (vf) | Idem |
| Velocidade de corte real (vc) | Leitura direta do par rotação/diâmetro que ele vai executar |
| Potência de corte exigida (Pc) | Esforço dimensionado |
| Torque exigido (Mc) | Idem |
| Taxa de remoção de material (MRR) | Consequência direta do que ele vai executar |

**Não escala — e a distinção é a que mais importa nesta seção:**

| O que fica intocado | Por quê |
|---|---|
| **Tudo o que o operador digitou** — profundidade de corte (ap), penetração de trabalho (ae), balanço (L), número de arestas (Z), dados do material | Entrada é do operador. Uma lente que mexesse na entrada dele estaria reescrevendo o que ele informou, não filtrando o que ele lê |
| **As grandezas de verificação que disparam alerta** — espessura de cavaco máxima (hex) e média (hm), relação balanço/diâmetro (L/D), fator de afinamento de cavaco (CTF) | Duas razões. **Número e alerta sobre a mesma grandeza não podem discordar na mesma tela**: se a espessura exibida fosse escalada e o alerta continuasse no valor físico, a tela mostraria uma espessura e alertaria sobre outra (**R7**, **R15**). E "conservador" não significa nada numa espessura de cavaco escalada — ela deixaria de corresponder a condição de corte nenhuma |
| **O alerta e o nível de segurança** | Descrevem o físico real calculado. Alerta que se move com a lente seria a lente virando limitador de segurança — exatamente o que ela não é |

### 7.3 Como ela convive com a edição do resultado

Rotação e avanço da mesa são **editáveis** (**E3** §2.1, `MVP` §8), e a calculadora resolve de volta.
Com a lente diferente de `100 %`, a regra é:

1. O operador edita **o número que está vendo**.
2. O sistema **desescala** para o valor real (divide pelo fator).
3. **Recalcula a cadeia inteira em precisão plena**, sobre valores reais.
4. **Reaplica a lente** na exibição.

Os `±` e o ajuste de qualquer parâmetro de corte seguem funcionando exatamente como antes — a lente
não muda o comportamento deles, só reescala o número final mostrado. **O cálculo nunca acontece sobre
o valor escalado**; a lente é sempre o último passo, e nunca realimenta a cadeia.

---

## 8. Preferências

Configuração que o operador ajusta uma vez e passa a valer. **A regra que atravessa todas: preferência exposta precisa ter efeito no cálculo ou na tela.** Preferência que não muda nada é pior que preferência inexistente — o operador ajusta, não vê efeito, e conclui que o sistema está quebrado.

| Grupo | O que contém | Onde a regra mora |
|---|---|---|
| **Máquina** | o perfil contra o qual toda verificação de limite é feita | §6 |
| **Segurança** | o fator de segurança e os limiares que definem cada nível de risco | §7 · **E4** |
| **Materiais** | criar, editar, sobrepor e remover | §2.3 · **E6** §5 |
| **Ferramentas** | a biblioteca e as faixas de parâmetro por ferramenta | **E6** §4 |
| **Exibição** | preferências de leitura dos números | **E3** §5 |
| **Dados** | exportar, importar e restaurar padrões | **E6** §7 |

**O que a configuração não faz:** ela não muda o que o sistema calcula, só o que ele compara e como apresenta. Não existe preferência que altere fórmula — fórmula é `canonicos/`, não gosto do usuário.

### 8.1 Casos de borda — configuração

| Situação | Comportamento | Por quê |
|---|---|---|
| Configuração alterada com um resultado na tela | Recalcula na hora | Modelo vivo (**E5** §4) |
| Restaurar padrões | Volta a configuração ao estado de fábrica, e **diz o que será perdido antes de fazer** | Ação destrutiva sem aviso é a que gera desconfiança permanente no sistema |
| Configuração que ficou órfã porque o item a que se referia foi removido | Não sobrevive à remoção | Estado guardado sem controle correspondente é peso morto (**E6** §8) |

---

## Dependências deste documento

**Valores numéricos.** A estrutura está completa. Os números que ela consome vivem em `canonicos/`, e três conjuntos entram com fragilidade declarada:

| Conjunto | Situação |
|---|---|
| **Teto do envelope de diâmetro** | O piso é firme; o teto não fechou — um fabricante documenta famílias específicas, um filtro de catálogo não verificado vai bem além |
| **Faixa de diâmetro das famílias que não são fresamento** | Não levantada. O sistema aceita, não aciona o alerta de fora-do-envelope (não herda o envelope da fresa — Q22), e a ajuda do campo diz que o envelope não foi levantado. Fecha com um levantamento de catálogo por família |
| **Piso de avanço por dente** | Decisão de projeto, sem base de fabricante para um piso absoluto. Por isso é alerta, não trava (§5.3) |

**Perguntas fechadas (bloco de decisão, 27/08/2026):**

| # | Pergunta | Decisão | Onde |
|---|---|---|---|
| Q22 | Envelope de diâmetro das famílias fora do fresamento? | Não herdam o da fresa; sem marca de extrapolação até o envelope delas ser levantado. Regra universal: nunca mostrar valor de partida copiado sem dizer de qual linha veio | §3.1 · §3.3 |
| Q24 | Unidade e separador decimal? | Só milímetro; o campo aceita vírgula e ponto; exibe em pt-BR | §2.4 · §3.5 |

> **Nota 31/08/2026.** A procedência saiu do produto: a marca "extrapolado" na tela e a nota de "de qual linha veio" foram removidas. O que Q22 decidiu e continua valendo: as famílias fora do fresamento **não acionam o alerta de fora-do-envelope** até o envelope delas ser levantado, e a ajuda do campo diz isso (§3.1, §3.3).

**Perguntas ainda abertas (dependem do ambiente declarado — frente adiada):**

| # | Pergunta | Onde |
|---|---|---|
| Q23 | Com o perfil de máquina declarado, o piso de processo vira alerta, ou continua sendo só explicação na ajuda? | §3.2 |
| Q25 | O operador mantém **um** perfil de máquina ou vários, com escolha do ativo? | §6.2 |
| Q26 | O rendimento do acionamento tem valor padrão declarado, ou a leitura de potência no motor só existe quando ele é informado? | §6.2 |

**Referências cruzadas:**

| Assunto | Documento |
|---|---|
| Quais ferramentas e materiais a lista oferece, e os campos próprios de cada geometria | **E1** |
| O que o sistema entrega, casas decimais e fator de segurança na leitura | **E3** |
| Limiares, alertas e o que cada nível de risco significa | **E4** |
| Ordem dos campos na tela, momento do cálculo e colapso dos blocos | **E5** |
| Onde a configuração, os materiais próprios e a biblioteca ficam guardados | **E6** |
| O que ficou de fora, com motivo | **E7** |
| Fórmulas, envelopes e a procedência de cada valor | `canonicos/` |
