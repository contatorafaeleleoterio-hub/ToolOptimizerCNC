# Validação — R6-V2 (segunda tentativa nos bloqueios da R6)

**Veredito:** `REPROVADO`
**Retorno auditado:** `RESPOSTA_R6V2.md`
**Enunciado de referência:** prompt R6-V2 (pesquisador único, território de fonte primária, regra da dupla fonte)
**Data:** 26/08/2026

> **Segunda reprovação consecutiva.** Pela regra de cadência do `HANDOFF.md` (correção de 18/08), os itens que reprovam duas vezes vão para a §4 do canônico como **lacuna declarada**.
>
> **Mas a leitura correta desta rodada não é "o dado não existe".** É "o pesquisador não teve acesso às fontes". A diferença muda o que fazer a seguir — ver a seção final.

---

## Resumo

O retorno **não fechou nenhuma constante**. Das quatro questões, três voltaram `NÃO ENCONTRADO` e uma voltou `REFERÊNCIA ÚNICA` sem localizador confirmado. A regra da dupla fonte, que era a novidade desta rodada, foi **cumprida com honestidade** — o pesquisador preencheu a ficha de procedência e escreveu "não consegui verificar" em vez de fabricar independência. Isso vale registro: a trava funcionou, e o que ela mostrou foi que não havia fonte nenhuma para auditar.

A única entrega substantiva foi a Questão 3, a derivação da viga escalonada — que **não depende de fonte externa** e por isso deveria ter sido a mais segura da rodada. **Ela está errada**, na fórmula e na tabela. A fórmula falha o teste de sanidade mais elementar.

**Consequência prática:** dos 8 bloqueios da `VALIDACAO_R6V.md`, esta rodada resolve **um** — e resolve porque a auditoria refez a conta, não porque o retorno a entregou.

---

## Achados por portão

| Portão | Selo | Achado | O que fazer |
|---|---|---|---|
| **G1 Cobertura** | **`BLOQUEIA`** | As 5 questões foram *abordadas*, mas 4 voltaram sem valor. Q1(d) — pico ou média — foi respondida como "seria o pico, porém não pode ser implementado", que é **devolver a pergunta**, não escolher. Q2(b) e Q2(c) sem resposta. Q5 não pesquisada (declarado, e legítimo: era prioridade baixa). | Ver "O que fazer agora". |
| **G2 Fonte** | **`BLOQUEIA`** | **Nenhum localizador exato foi confirmado em toda a rodada.** Kops e Vo: "DOI e páginas não confirmados". Altintas e Budak: "edição, página não confirmadas". ISO 3685: "preview disponível". Um retorno inteiro sem um único localizador verificável. | Nada entra em canônico. |
| **G3 Confiança** | `OK` | Os rótulos estão **corretamente aplicados e corretamente pessimistas**. `NÃO ENCONTRADO` onde não achou; `REFERÊNCIA ÚNICA` no único item com pista. Não houve inflação. | — |
| **G4 Default** | `OK` | **Nenhum sinal de preenchimento por default.** O retorno recusou-se explicitamente a preencher a tabela de 2 a 6 canais com 0,80 repetido, e recusou-se a preencher a matriz de Taylor. É o comportamento pedido. | Registrar como acerto. |
| **G5 Sensibilidade** | `RESSALVA` | As sensibilidades **conceituais** estão certas: `δ ∝ Fr` (linear) e `δ ∝ 1/De⁴` (quarta potência) — ambas conferidas. A aritmética tem desvios pequenos: `1 − (0,80/0,85)⁴` dá **21,5%**, não 20,0%. Irrelevante para decisão. A sensibilidade de `n` está formulada corretamente como derivada, mas sem número. | Aceitar o conceito, corrigir os decimais. |
| **G6 Divergência** | `RESSALVA` | Um achado novo e útil sobre a ISO 3685 — ver V-1 abaixo. | Registrar. |
| **G7 Lacunas** | `OK` | A Tabela 3 existe, é honesta e diz **o que seria preciso** para fechar cada item. É a melhor parte do retorno. | Aproveitar integralmente. |
| **G8 Cross-check** | *n/a* | Pesquisador único. A auditoria de independência (Tabela 2) substitui, e foi preenchida — com "UMA SÓ até prova em contrário" em todas as linhas, que é a resposta honesta. | — |
| **Extra — aritmética** | **`BLOQUEIA`** | A Questão 3 está errada na fórmula e na tabela. Ver a seção seguinte. | Corrigido nesta auditoria. |

---

## O erro da Questão 3 — e a derivação correta

### O que o retorno entregou

    delta_esc = F·L1³/(3·E·I1) + F·L1²·L2/(2·E·I1) + F·L2³/(3·E·I2)

### Por que está errada

**Teste de sanidade:** se os dois diâmetros forem iguais (`D1 = D2`, sem degrau), a fórmula tem obrigatoriamente que voltar a ser a viga simples, `δ = F·L³/(3·E·I)`. Ou seja, a razão normalizada precisa dar **exatamente 1,000**.

| Parte cortante `L2/L` | Fórmula do retorno, com `r = 1` | Deveria dar |
|---|---|---|
| 20% | **0,712** | 1,000 |
| 50% | **0,438** | 1,000 |
| 80% | **0,568** | 1,000 |

Não volta. **Falta um termo inteiro.**

**Onde ele foi perdido.** A carga na ponta, vista pelo trecho de baixo, é uma força `F` **mais um momento** `F·L2`. Esse momento produz **duas** coisas no trecho de baixo: uma flecha (`F·L2·L1²/2EI1`, que o retorno tem) **e uma rotação** (`F·L2·L1/EI1`, que o retorno não tem). A rotação, multiplicada por `L2`, é o termo `F·L1·L2²/(E·I1)` — ausente.

Ironia registrada: o próprio retorno avisa que *"o termo de rotação é obrigatório; removê-lo subestima a deflexão"* — e então remove metade dele.

### A derivação correta

Por trabalho virtual, com `M(x) = F·(L − x)`:

    δ = ∫₀ᴸ F·(L−x)² / (E·I(x)) dx

    δ = (F / 3E) · [ (L³ − L2³)/I1  +  L2³/I2 ]

**onde:** `L` = balanço total · `L2` = comprimento da parte canalizada · `I1` = inércia da haste lisa · `I2` = inércia da parte canalizada.

Passa no teste de sanidade: com `I1 = I2`, os termos somam `L³/I`, e a expressão vira `F·L³/(3EI)`. ✓

**Forma equivalente, expandida** (mostra o termo que faltava):

    δ = (F/E) · [ L1³/(3·I1) + L1²·L2/I1 + L1·L2²/I1 + L2³/(3·I2) ]

Comparando com o retorno: o segundo termo é `L1²·L2/I1` e não `L1²·L2/(2·I1)`, e o terceiro termo — `L1·L2²/I1` — está inteiramente ausente.

### A tabela corrigida

Hipótese geométrica, a mesma do retorno: `De/D = 0,80`, logo `D_haste / D_canal = 1,25`.

| Parte cortante `L2/L` | Usar só o diâmetro **da parte cortante** em todo o balanço | Usar só o diâmetro **da haste** em todo o balanço |
|---|---|---|
| 20% | superestima **141%** | subestima **1,1%** |
| 40% | superestima **124%** | subestima **8,4%** |
| 60% | superestima **86%** | subestima **23,7%** |
| 80% | superestima **40%** | subestima **42,5%** |
| 100% | superestima **0%** | subestima **59,0%** |

**Conferência independente:** a linha de 100% dá **59,0%**, que é exatamente o número já registrado na `VALIDACAO_R6.md` §D-2 (*"usar o diâmetro cheio onde vale 0,8D subestima a deflexão em 59,0%"*), apurado por outra rodada e por outro caminho. A derivação está consistente com o registro do projeto.

**Comparação com a tabela do retorno:** ele reportou 44% a 78%, com o erro crescendo monotonicamente e o mínimo em 100%. A tabela correta tem os erros **maiores**, na direção oposta, e o mínimo em 20%. Nenhuma das quatro linhas intermediárias do retorno confere. Além disso, a coluna "Erro" do retorno não corresponde à própria definição que ele escreveu duas linhas acima — ele definiu `(δ_simples − δ_esc)/δ_esc` e calculou `(δ_esc − δ_simples)/δ_simples`.

### As três conclusões que a conta correta produz

**1. Nenhuma das duas simplificações serve na faixa inteira.** O diâmetro da haste erra até 59% para menos — e errar para menos é o lado que **quebra ferramenta**. O diâmetro da parte cortante erra até 141% para mais — e um alarme que dispara três vezes mais alto do que a realidade treina o operador a ignorar o alarme. **Os dois modos de falhar são ruins, por motivos diferentes.**

**2. A fórmula escalonada resolve, e é de graça.** É uma linha de conta, não precisa de fonte nova, não precisa de campo novo na tela — a calculadora já vai pedir balanço e diâmetro; falta pedir o comprimento da parte cortante, que está gravado na haste de qualquer fresa. **`D-2` deixa de ser uma escolha entre duas convenções erradas e passa a ser um cálculo certo.**

**3. E isto muda o peso do `De/D`** — o achado mais útil desta auditoria:

| Parte cortante como fração do balanço | Efeito de `De/D` variar de 0,75 a 0,85 |
|---|---|
| 20% | **1,0%** |
| 30% | **3,3%** |
| 50% | **14,0%** |
| 70% | 32,5% |
| 100% | 65,0% |

No modelo de viga simples, a incerteza do `De/D` valia 20–29% e estourava a margem — era por isso que Kops e Vo bloqueava o canônico. **No modelo escalonado, com a parte cortante até ~50% do balanço, a mesma incerteza vale 1% a 14% e cabe dentro da margem do modelo.** E "parte cortante até metade do balanço" é a montagem normal de oficina: prende-se pela haste e deixa-se sair o mínimo.

**Consequência:** `De/D = 0,80` pode entrar como **default declarado**, com a ressalva de que ele passa a pesar quando a parte cortante domina o balanço. Kops e Vo continua valendo a pena abrir — mas **deixa de travar o canônico**.

---

## Itens que BLOQUEIAM

1. **`Fr/Fc` — nada.** Nenhum coeficiente, nenhum localizador. Segunda rodada consecutiva. **É a trava que impede a função de deflexão inteira**, porque sem ela não existe a força que entra na fórmula.
2. **Pico ou média — não escolhido.** Segunda vez. O retorno diz que "seria o pico" e imediatamente se desdiz. O enunciado proíbe devolver a pergunta.
3. **`n` de Taylor — nada.** Segunda rodada consecutiva, seis classes vazias.
4. **`T_ref` — nada,** mas com um achado novo aproveitável (ver V-1).
5. **`De/D` — Kops e Vo não foi aberta.** Terceira tentativa, terceiro fracasso de acesso. **Rebaixado de bloqueio a ressalva** pelo achado 3 da seção anterior.
6. **Erro de viga simples × escalonada — entregue errado.** **Resolvido nesta auditoria**, por derivação verificada.
7. **`E` do aço rápido — não pesquisado.** Declarado, e aceito: era prioridade baixa e fora do caminho crítico.

---

## Divergências com material já registrado

**V-1 — A ISO 3685 pode não cobrir fresamento.** *(achado novo, relevante)*
O retorno registra que o documento localizado da ISO 3685 trata de ensaios de vida com **ferramentas de corte de ponta única** — isto é, torneamento —, e não de fresamento. Se isso se confirmar, a consequência é grande: **não existe norma que ancore o `T_ref` dos catálogos de fresa**, e o `n` de Taylor para fresamento nunca teve base normativa. Deixaria de ser "não achamos o valor" e passaria a ser "o valor não tem onde estar ancorado" — que é resposta definitiva, e vira lacuna permanente com motivo, não lacuna por busca insuficiente.
**Não confirmado** — o retorno viu preview, não o texto. **Vale confirmar: é barato e fecha uma pergunta de vez.**

**V-2 — `CANONICO_LIMITES_E_ALERTAS.md` §1.4 ("diâmetro da haste") está errado, e agora dá para dizer o quanto.**
Não é questão de convenção: usar o diâmetro da haste em todo o balanço **subestima** a deflexão em 1,1% a 59,0%, conforme a proporção da parte cortante. Subestimar é o lado perigoso. **Corrigir para o modelo escalonado** ao escrever `CANONICO_DEFLEXAO_E_VIDA.md`.

---

## Por que este retorno voltou vazio

**A hipótese que a evidência sustenta: limite de acesso, não ausência de dado.**

O padrão se repete em todas as questões — *"artigo identificado, DOI não confirmado"*, *"edição e página não confirmadas"*, *"preview disponível"*. O pesquisador **achou** as referências e **não conseguiu abrir** nenhuma. E a tela do Mestre no momento do disparo mostrava a ferramenta em conta gratuita, com oferta de upgrade.

Isso importa porque muda o diagnóstico:

- **Se o dado não existisse**, a resposta certa seria lacuna permanente, e o produto sairia sem a função.
- **Como o dado existe atrás de paywall**, a lacuna é de acesso — e acesso se compra ou se contorna.

Os coeficientes de força do Altintas estão num livro-texto conhecido, com edições em biblioteca universitária. Kops e Vo está no ScienceDirect. A ISO 3685 é norma paga, com cópia em biblioteca de instituto técnico. **Nada disso é conhecimento perdido; é conhecimento com pedágio.**

**Registro honesto do outro lado:** duas rodadas seguidas falharam no mesmo ponto. Continuar disparando o mesmo tipo de busca é repetir o que já não funcionou duas vezes.

---

## O que fazer agora

**Já resolvido nesta auditoria, sem custo:**
- A fórmula da viga escalonada — derivada, conferida contra o registro do projeto, pronta para virar código.
- `De/D` rebaixado de bloqueio a ressalva, com a tabela de quando ele passa a pesar.

**Continua travado, e só destrava com acesso a fonte paga:**
- `Fr/Fc` — a força que entorta a ferramenta.
- `n` de Taylor e `T_ref` — a vida da ferramenta.

**Três saídas, em ordem de custo:**

1. **Confirmar o achado da ISO 3685** (V-1). Barato, e se confirmar, fecha a questão da vida de ferramenta em definitivo — como lacuna com motivo, que é resultado válido.
2. **Obter as duas fontes específicas** — Altintas (coeficientes de força) e Kops e Vo. São duas obras nomeadas, não uma busca aberta. Biblioteca universitária, acesso institucional ou compra avulsa.
3. **Entregar o MVP sem as duas funções**, com as lacunas visíveis no canônico. A calculadora entrega velocidade, avanço, rotação e potência — que R1, R3, R4 e R5 já fecharam — e **não** entrega o aviso de deflexão nem o de vida de ferramenta. Nenhum número inventado entra.

**As três são compatíveis:** a 3 pode rodar enquanto a 1 e a 2 acontecem. O canônico registra a lacuna, e a função entra depois sem reescrever nada — que é exatamente o que o marcador `⧗ AGUARDA` existe para permitir.
