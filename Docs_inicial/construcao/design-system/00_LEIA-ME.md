# Especificação estrutural do painel — Fenix

**O que é:** a descrição do painel do Fenix em termos de **estrutura e comportamento**, com a
aparência deliberadamente de fora. Diz o que existe na tela, para que serve, como funciona, que
estados tem, como reage quando o espaço encolhe e como os pedaços se combinam.

**Para quem:** quem for construir uma tela nova do Fenix, ou reconstruir uma existente, sem ter
participado da concepção.

**O que ele não faz:** não define cor, tipografia, ícone, sombra, marca, framework, biblioteca nem
ferramenta. Essas decisões existem e moram em outro lugar — ver §2.

**Data:** 08/09/2026, revisto em 09/09. **Objeto medido:** `Docs_inicial/construcao/prototipo/`
no commit `d6a841e` — já com a paleta nova de `6f36784` e o alerta de balanço do mandrilamento de
`933cdba`.

---

## 1. As quatro peças

| Peça | O que responde |
|---|---|
| [`01_INVENTARIO.md`](01_INVENTARIO.md) | **O que existe no painel hoje**, por categoria, com o lugar exato no código. E o que não existe |
| [`02_ESTRUTURA.md`](02_ESTRUTURA.md) | Shell, regiões, vistas, sistema de layout, navegação, hierarquia de conteúdo, responsividade, tokens estruturais, regras de composição |
| [`03_COMPONENTES.md`](03_COMPONENTES.md) | O catálogo, em cinco níveis, com uma ficha por componente |
| [`04_COMPORTAMENTO.md`](04_COMPORTAMENTO.md) | Ciclo de cálculo, modelo vivo, estados, feedback, erro, vazio, carregamento, conteúdo, formatação, acessibilidade, movimento |

Este arquivo é o índice, a regra de precedência e a lista de pendências. Não tem conteúdo próprio de
especificação.

---

## 2. As três camadas, e quem manda em cada uma

O pedido que originou este conjunto separa a interface em três camadas. A separação não é acadêmica:
ela é o que permite trocar a identidade visual sem reconstruir componente nenhum.

| Camada | O que define | Documento que manda |
|---|---|---|
| **Estrutura** | O que existe: regiões, componentes, campos, zonas, hierarquia | **Este conjunto**, peças 01 a 03 |
| **Comportamento** | Como funciona: interação, estado, validação, recálculo, feedback, foco | **Este conjunto**, peça 04 |
| **Aparência** | Como se apresenta: cor, tipografia, superfície, contraste, sombra, ícone | [`../DESIGN_SYSTEM_FENIX.md`](../DESIGN_SYSTEM_FENIX.md) |

**A regra prática:** se você precisou escrever um valor de cor ou um nome de fonte neste conjunto,
você atravessou a fronteira. Se precisou decidir onde uma informação mora na tela dentro do
`DESIGN_SYSTEM_FENIX.md`, atravessou no outro sentido — ele declara isso na própria linha 13.

**A camada de aparência já existe e está resolvida.** O processo recomendado pelo pedido põe "aplicar
identidade visual" como Etapa 7, depois da estrutura; no Fenix ela veio antes, herdada do
`ToolOptimizerCNC` e auditada por contraste. Isso não invalida a separação — significa que a Etapa 7
está pronta e este conjunto aponta para ela em vez de refazê-la.

**Fora das três camadas:** tecnologia. Plataforma, framework, persistência e empacotamento estão
decididos em [`../../../docs/adr/0001-plataforma-e-stack.md`](../../../docs/adr/0001-plataforma-e-stack.md)
e **não entram aqui**, por regra do próprio pedido.

> **A Fase 2 começou em 08/09/2026**, e isso muda para quem este conjunto serve. O Ciclo 1 entregou o
> núcleo de cálculo em `src/core/` — puro, sem tela, com 48 testes. O Ciclo 3 é a casca. **Este
> conjunto é o insumo do Ciclo 3:** ele descreve a estrutura e o comportamento que a casca precisa
> reproduzir, sem prescrever como. Ver `../../../ESTADO.md` e `../../../tasks.md`.

---

## 3. Precedência — quem vence quando dois documentos divergem

Herdada do [`../prototipo/GABARITO_PROTOTIPO.md`](../prototipo/GABARITO_PROTOTIPO.md) §1 e da decisão
do Mestre de 08/09/2026 registrada no [`../../../ESTADO.md`](../../../ESTADO.md).

| # | Fonte | Vence sobre |
|---|---|---|
| 1 | **Decisão escrita do Mestre**, com data | tudo |
| 2 | **`prototipo/index.html` + `js/` + `css/`** — o contrato do painel | escopo, folhas `.dc.html`, este conjunto |
| 3 | **`BRIEF_DESIGN_INTERFACE.md`** — as regras invioláveis R1 a R15 | escopo e este conjunto |
| 4 | **`escopo/E0` a `E7`** e `mvp/` | este conjunto |
| 5 | **Este conjunto** | folhas `.dc.html` |
| 6 | As dez folhas `.dc.html` | nada — são registro histórico |

**Consequência para quem lê:** onde este conjunto descreve o painel, ele descreve o **protótipo**,
porque o protótipo é o contrato. Onde o protótipo contraria o brief ou o escopo, a contradição está
nomeada na §5 e **não foi resolvida por agente nenhum** — resolver é decisão do Mestre.

---

## 4. Como este conjunto foi produzido

Segue as oito etapas do pedido, com a Etapa 7 já cumprida antes (§2).

| Etapa | O que foi feito | Onde aparece |
|---|---|---|
| 1 — Analisar | Leitura integral de `index.html` (104 linhas), `css/prototipo.css` (1.168), `js/app.js` (3.528) e `js/mock-data.js` (686) | `01_INVENTARIO.md` |
| 2 — Agrupar | Markup equivalente reunido; duplicações nomeadas | `01_INVENTARIO.md` §12 |
| 3 — Diferenciar | Separado o que difere por comportamento do que difere só por aparência | `03_COMPONENTES.md` §1 |
| 4 — Estruturar | Cinco níveis: foundations, primitives, components, patterns, templates | `03_COMPONENTES.md` |
| 5 — Comportamento | Estados, interação, responsividade, acessibilidade | `04_COMPORTAMENTO.md` |
| 6 — Tokens | Estruturais e semânticos. Os visuais ficaram na camada de aparência | `02_ESTRUTURA.md` §8 |
| 7 — Identidade visual | Já existia | `../DESIGN_SYSTEM_FENIX.md` |
| 8 — Validar | Cobertura, consistência, estados, responsividade, acessibilidade, redundância | §5 e §6 deste arquivo |

**Todo fato sobre o painel neste conjunto carrega `arquivo:linha`.** Afirmação sem endereço é
julgamento, e julgamento está marcado como tal.

---

## 5. Os doze achados, e o que aconteceu com cada um

Levantados na Etapa 8. **Todos fechados em 09/09/2026**, por decisão do Mestre de limpar as
pendências — nove corrigidos ou reconciliados, dois nomeados como tarefa de ciclo, um resolvido no
caminho por outra sessão.

### 5.1 Defeitos corrigidos

| # | O quê | Como fechou |
|---|---|---|
| **A** | `markOutdated()` chamada em dois pontos e definida em nenhum → `ReferenceError`. Editar em Configurações um material em uso quebrava a área, e o estado "desatualizado" era inalcançável | **Corrigido.** A função existe, só age depois do primeiro cálculo (**R4**), e o alerta não a acompanha (**R7**). Achei mais dois pedaços quebrados no caminho: a grade de verificação não tinha o ancestral que a regra de esmaecimento exige, e o `!important` dessa regra venceria a cor inline do alerta — o que esmaeceria alarme ativo. O valor em atenção ficou de fora |
| **B** | A data gravava `'0.7xD'` e o código testava `'0.7*D'`: a derivação da penetração de trabalho do cabeçote faceador nunca disparava, e em silêncio | **Corrigido.** Um caractere na data, mais dois testes que provam o comportamento — com Ø63 o `ae` deriva 44,1 mm, e trocando para Ø80 acompanha para 56,0 mm |
| **C** | `geo.campos` das 17 geometrias nunca lido; o formulário era fixo por família | **Corrigido na casca**, que é onde ainda importa. A casca tinha o mesmo defeito em outra forma: o condicional vinha de `id.includes('toroidal')` e não de `extraFields`. O Cabeçote Faceador pedia `kappa` e nunca recebia; `Dmin` não era renderizado em lugar nenhum. **O protótipo fica como está** — é o contrato congelado, e refazer o formulário dele seria reconstruí-lo |
| **D** | O celular simulado entregava 420px onde a barra anuncia 390px, e não havia override de tablet | **Corrigido**, e era maior do que parecia: sem override, a coluna de configuração ficava presa no teto de 520px e deixava 266px de espaço morto em 834px simulado. A simulação passou a espelhar os três limiares, um bloco por limiar |
| **E** | CSS órfão sem gerador, e markup gerado sem CSS | **Corrigido.** Nove regras apagadas (restos da trilha revogada por **D4**, e variantes que nunca chegaram ao markup), três classes ganharam regra de verdade e os quatro estilos inline saíram. `.estado-vazio` passou a ser usada em vez de texto solto |
| **K** | Nenhum `<h1>`–`<h6>`; padrão ARIA de abas pela metade | **Corrigido na casca.** Entrou o `tabpanel`, o `aria-controls`, o `aria-labelledby`, o roving `tabindex`, a navegação por seta com Home e End, e o `<h1>`. As quatro abas repetidas à mão viraram lista de dado — é assim que um padrão ARIA fica pela metade, com quatro cópias que ninguém mantém em sincronia |

### 5.2 Divergências reconciliadas

| # | O quê | Como fechou |
|---|---|---|
| **F** | Botão Calcular desabilitado × `E5 §4` e brief §7.1 (*"nunca some, nunca é desabilitado"*) | **Reconciliado, nos dois documentos, com data.** A **R1** proíbe **recusar um resultado**, e antes do primeiro cálculo não existe resultado a recusar — falta entrada. O comando nunca desaparece, nunca desabilita com o conjunto completo na tela, e nunca se recusa a entregar um número que poderia existir. **O que a R1 proíbe é o silêncio; aqui o comando diz exatamente o que falta** |
| **G** | Passo do `±` em 5% × os 10% da Specification Sheet | **Corrigido na Spec Sheet**, que ficou para trás da emenda do Mestre de 07/09/2026. O `S_novo` do Cenário 4 passou de 4.010 para 4.233 rpm, e um guarda amarra os três lugares: a constante do código, o passo do cenário e o número que ele espera |
| **I** | Bloco "Contexto" do `E5 §2.1` × anti-requisito do brief §12 | **`E5 §2.1` emendado, riscado e datado.** O bloco não podia existir: perfil de máquina é anti-requisito e o fator de segurança saiu dele em 01/09/2026. Sem os dois, o bloco ficou vazio. São **três blocos**, como o protótipo faz |
| **L** | Seis tokens estruturais em desacordo | **Fechada em `6f36784`**, no mesmo dia em que foi encontrada — ver §5.3 |

### 5.3 Fechada por outra sessão — L

**L — tokens estruturais em desacordo.** Seis tokens tinham valor diferente no design system e no
protótipo: os três raios, as duas durações e o alvo da ação principal. O que importava era o último —
o design system declarava **56px com razão escrita** e o protótipo entregava **52px**.

**Resolvida na `main` em `6f36784`**, pela sessão que adotou a paleta nova: o
`../DESIGN_SYSTEM_FENIX.md` §10 registra que *"o documento estava desatualizado; os valores do
protótipo passam a valer"*. **O alvo da ação principal é 52px.**

Fica registrada porque **a divergência era real e foi encontrada aqui** — e porque quem ler um
documento antigo citando 56px precisa saber onde ela morreu, e não "corrigir" 52 de volta para 56.

### 5.4 Nomeadas como tarefa — H e J

Estas duas **não são defeito**: são requisito do escopo que nem o protótipo nem a casca implementaram,
e cada uma carrega decisão de produto que **o Mestre resolve**. Deixaram de ser achado solto e viraram
tarefa descrita em [`../../../tasks.md`](../../../tasks.md), Ciclo 4.

| # | O quê | Onde foi |
|---|---|---|
| **H** | Blocos colapsáveis sem as regras 2, 3, 4 e 6 do `E5 §3`. **A casca não tem colapsável nenhum** — o `.bhead` está no CSS e nada o gera | **TASK-014.** Falta o Mestre decidir quantos blocos, e quais |
| **J** | Tela pequena empilha; o escopo pede seções alternáveis com aviso de resultado novo | **TASK-015.** Falta o Mestre decidir em que largura a alternância entra, e se as seções são três ou duas |

### 5.5 O que a especificação errou sobre si mesma

**Os tokens `--sp-1` a `--sp-7` e `--r-pill` não são órfãos**, e o achado **E** os listava como se
fossem. São a escala declarada na §3 do `../DESIGN_SYSTEM_FENIX.md`, e o `test_contraste.js` cobra que
o bloco `:root` do CSS bata com ela token por token. Não havia nada a apagar ali. Corrigido também na
[`02_ESTRUTURA.md`](02_ESTRUTURA.md) §8.1.

### 5.6 A lição que os doze deixaram

**Onze dos doze eram invisíveis para as suítes** — três delas, cinquenta e tantos testes, todas verdes
enquanto uma função inexistente esperava para quebrar a área Configurações. A razão é sempre a mesma:
o teste exercitava o caminho que alguém lembrou de escrever.

O que entrou por causa disso é `../prototipo/testes/test_integridade.js`, **34 verificações
estáticas** que pegam a *classe* de cada defeito, não a instância: função chamada e não definida,
sentinela de dado que o código não reconhece, simulação de viewport que não bate com o rótulo, classe
no CSS sem gerador e markup sem classe, e o passo do `±` contado igual em três documentos. O guarda
testa a si próprio contra uma amostra que tem o defeito e uma que não tem — **guarda que não pega nada
passa sempre**.

---

## 6. Critério final de qualidade

O conjunto está suficiente quando uma equipe que não participou da concepção consegue:

1. compreender a estrutura do painel sem abrir o `js/app.js`;
2. escolher o componente certo para cada necessidade a partir do catálogo;
3. reproduzir os comportamentos existentes, inclusive o modelo vivo bidirecional;
4. tratar corretamente os estados, sabendo quais são semanticamente relevantes em cada componente;
5. montar telas novas por composição, sem inventar componente;
6. manter consistência entre a tela de cálculo e a área Configurações;
7. adaptar a interface aos três limiares de espaço sem cortar capacidade (**R13**);
8. implementar sem depender de decisão implícita;
9. trocar a identidade visual sem tocar em estrutura nem comportamento;
10. evoluir o sistema sem duplicar componente.

**O teste de aceitação, concretamente:** ler `00` e `03` e montar no papel a área Configurações
usando só componentes e padrões nomeados. Se faltar um nome, o catálogo está incompleto.

---

## 7. O princípio central

> **Define-se primeiro a estrutura e o comportamento. A aparência vem depois, e pode ser trocada
> sem que nada acima dela mude.**
