# Estrutura do painel — Fenix

**O que é:** o esqueleto. Regiões, vistas, sistema de layout, navegação, hierarquia de conteúdo,
tokens estruturais, comportamento no espaço e regras de composição.

**O que não é:** catálogo de componente (é a peça `03`) nem descrição de estado (é a `04`). E não
define cor, tipografia nem sombra — [`../DESIGN_SYSTEM_FENIX.md`](../DESIGN_SYSTEM_FENIX.md).

---

## 1. Shell

O shell é o que sobrevive à navegação. No Fenix são **três regiões**, e todas as três são
condicionais — a área Configurações esconde duas delas.

| Região | Visível na vista de cálculo | Visível em Configurações | Rolagem |
|---|---|---|---|
| Cabeçalho de identidade | Sim | **Não** (`app.js:3362`) | Rola com a página |
| Navegação de famílias | Sim | **Não** (`app.js:3361`) | Rola com a página |
| Área de conteúdo | Sim | Sim | Rola com a página |

**Nenhuma região é fixa na tela, e nenhuma tem rolagem independente.** O painel inteiro rola como um
documento. A única exceção é a linha de status de Configurações, fixa ao topo da própria coluna
(`css/prototipo.css`).

**Não existe rodapé.**

**A barra de homologação não é shell.** Ela mora fora do contêiner de viewport (`index.html:12-40`),
serve para carregar cenário de teste e simular largura, e **não faz parte do produto**. Quem
implementar não a reproduz.

### 1.1 O que o escopo pede e o shell não faz

`E5 §2.4` determina: *"conteúdo de Z6 maior que a altura disponível rola dentro da própria zona —
rolar o painel inteiro faria os números de Z4 saírem de vista"*. **O protótipo não implementa
rolagem por zona.** Registrado aqui porque é requisito de shell, não de componente.

---

## 2. As duas vistas

Não há rota, URL nem histórico de navegador. `switchTab(tabId)` (`app.js:3336-3378`) é a navegação
inteira, e trata cinco destinos: as quatro famílias e Configurações.

```
  Fresar ─┐
  Furar  ─┼─→ vista de cálculo ⇄ vista de configurações
  Roscar ─┤        (o destino de volta é a família anterior)
Mandrilar┘
```

### 2.1 O que sobrevive à troca

| O quê | Sobrevive a trocar de família | Sobrevive a ir e voltar de Configurações |
|---|---|---|
| Os valores digitados de cada família | **Sim** — cada família tem seu próprio conjunto (`app.js:103-155`) | Sim |
| O ajuste `±` dos resultados de comando | **Não** — zera (`app.js:3371-3372`) | **Sim** — a guarda de família impede o zeramento |
| A marca de "ajustado manualmente" | Sim, é por família (`app.js:94-99`) | Sim |
| O estado aberto/fechado das gavetas | Sim, enquanto a sessão durar (`app.js:1040-1044`) | Sim |
| A confirmação destrutiva em curso | — | **Não** — é limpa ao entrar (`app.js:3357`) |

**A regra por trás:** o ajuste `±` é percentual sobre um valor calculado; mudar de família muda a
grandeza de base, então o percentual perderia sentido. Ir a Configurações não muda base nenhuma.

**Consequência de desenho:** comparar duas famílias é barato — os valores ficam. Comparar duas
ferramentas dentro da família também, porque a troca de ferramenta só sobrescreve o que o operador
não tocou (`app.js:2093-2128`). Isso atende diretamente à tensão **T12** do brief.

### 2.2 Padrão de leitura da família ativa

Nove pontos do código repetem a mesma expressão: *se a aba ativa é Configurações, use a anterior*
(`app.js:235, 243, 804, 851, 985, 1092, 1236, 1534, 2570`). É a forma de o painel continuar sabendo
qual família está em foco enquanto o operador edita a biblioteca da oficina. **Quem reimplementar
precisa desse conceito**, com um nome — hoje ele não tem.

---

## 3. Área de conteúdo

### 3.1 Vista de cálculo — duas colunas

| Coluna | Papel | Largura |
|---|---|---|
| Configuração | O que o operador informa | Base 440px, cresce, **teto 520px** |
| Resultado | O que o sistema devolve | Base 640px, cresce, **sem teto** |

Medianiz de 24px, alinhamento pelo topo, quebra automática (`css/prototipo.css`).

**A regra de comportamento, sem os números:** a coluna de entrada é uma **região de largura mínima
com teto** — ela não se beneficia de mais espaço, porque campo largo demais afasta o rótulo do valor.
A coluna de resultado é uma **região elástica sem teto** — todo excedente vai para ela, porque é onde
moram as grades que se reorganizam por largura disponível.

**A soma das bases é 1.104px** (440 + 640 + 24). Abaixo disso a quebra do flexbox empilha as colunas
sozinha; o limiar de 1.080px formaliza o empilhamento (§7).

### 3.2 Vista de configurações — coluna única

Mais estreita que o painel (`css/prototipo.css`), centrada. **A diferença de largura é intencional e
carrega significado:** a área é a biblioteca da oficina, consultada e editada devagar, não o painel
que se lê de relance.

### 3.3 Ritmo vertical

Medianiz uniforme de 16px entre as regiões do contêiner, entre os cartões de cada coluna e entre os
cartões de Configurações — a medianiz de `.viewport-wrapper`, `.col-config`, `.col-results` e
`.config-wrap`. **Um único valor governa toda a separação
vertical do produto** — o que é uma decisão de sistema, e deve ser preservada.

---

## 4. Sistema de layout

Três mecanismos, e cada um resolve um problema diferente.

| Mecanismo | Onde se usa | Comportamento |
|---|---|---|
| **Coluna com medianiz** | contêiner, cada coluna, cada cartão | Empilha na ordem, separação uniforme |
| **Flexbox com quebra** | as duas colunas principais; a fila de resultados de comando | Itens com base declarada; quebram quando não cabem |
| **Grade** | agrupamentos internos | Duas formas, abaixo |

### 4.1 As duas formas de grade

| Forma | Quando usar | Onde aparece |
|---|---|---|
| **Colunas fixas** — `n` colunas iguais | Quando o número de itens é conhecido e a leitura depende do alinhamento | Navegação de famílias (4) · pares de campo (2) · leitura de material (2) · gaveta explicativa (rótulo fixo · texto elástico) |
| **Colunas elásticas** — por largura mínima | Quando o número de itens varia com o dado | Grade de verificação (mín. 180px) · campos de formulário (mín. 220px) · passos de configuração (mín. 240px) |

**A regra:** se a contagem de itens vem do dado, a grade é elástica. Se vem do desenho, é fixa.

### 4.2 Comportamento de excesso

| Situação | O que acontece hoje |
|---|---|
| Texto longo em campo | O campo não trunca; o valor rola dentro do próprio campo |
| Rótulo longo de ferramenta (30 a 50 caracteres, brief §6) | Quebra em linha dentro do `<select>` nativo |
| Muitos cartões de verificação | A grade elástica acrescenta linha |
| Prosa longa nas gavetas | Expande verticalmente, sem teto |
| **Zona mais alta que o espaço** | **Rola a página inteira** — não há rolagem por zona (§1.1) |

**Não há truncamento com reticências em lugar nenhum, e não há dica flutuante para revelar conteúdo
oculto.** É coerente com o brief: o produto não esconde valor.

---

## 5. Navegação

### 5.1 Navegação principal — escolha segmentada de quatro famílias

| Propriedade | Valor |
|---|---|
| Níveis hierárquicos | **Um.** Sem agrupamento, sem subitem, sem item expansível |
| Quantidade de itens | **Quatro, fixos** — Fresar · Furar · Roscar · Mandrilar. Vocabulário obrigatório do brief §11 |
| Conteúdo de cada item | Ícone + texto. **Nunca só ícone** |
| Identificação da atual | Estado ativo **e** `aria-selected` (`app.js:3344-3348`) |
| Alvo | 44px mínimo (`css/prototipo.css`) |
| Comportamento em espaço reduzido | Vira 2×2 abaixo de 720px (`css/prototipo.css`) |
| Navegação por teclado | **Não existe** — só clique (`app.js:3498`). Defeito **K** |
| Ação especial | Nenhuma. Configurações **não** é uma quinta aba |

**Por que Configurações não é aba:** ela troca a vista inteira e esconde a própria navegação. Uma
quinta aba prometeria irmandade com as quatro famílias, que são escolha de processo. São coisas de
natureza diferente, e a forma separa as duas — o acesso é um botão no cabeçalho.

### 5.2 Navegação secundária

**Não existe.** Sem abas internas, sem submenu, sem etapas, sem navegação contextual.

**Onde ela quase existe:** os três atalhos que levam a Configurações a partir do formulário
(`app.js:2153, 2161` e a linha-link de cada bloco de ferramenta). São **atalhos contextuais**, não
navegação: levam a um lugar só, e o retorno é o botão "voltar".

### 5.3 Breadcrumb

**Não existe, e não deve existir.** A hierarquia tem dois níveis e o botão "voltar" já nomeia o
destino.

---

## 6. Cabeçalho

| Elemento | Prioridade | Posição | Comportamento em espaço reduzido |
|---|---|---|---|
| Placa de marca | Identidade | Início | Permanece |
| Chips de identidade | **Conferência** — material · ferramenta · dimensões | Centro, elástico | Empilha abaixo de 600px (`css/prototipo.css`) |
| Distintivo de margem | Condicional | Junto dos chips | Permanece |
| Acesso a Configurações | Ação | Fim | Ocupa a largura toda abaixo de 600px (`css/prototipo.css`) |

**Por que os chips são a maior parte do cabeçalho:** eles resolvem a tensão **T8** do brief — *o que
não está sendo revisto ainda precisa ser conferível de relance, porque calcular com um material
errado que ficou de ontem é o pior resultado possível*. Material e ferramenta permanecem por horas; o
cabeçalho é onde eles ficam visíveis sem ocupar espaço no formulário.

**O conteúdo dos chips varia por família** (`app.js:1120, 1145, 1171, 1196`), porque as dimensões que
identificam uma montagem são diferentes em cada uma. **O que não varia é a ordem:** material,
ferramenta, dimensões.

---

## 7. Hierarquia de conteúdo

Definida por **função semântica**, sem tamanho. Os valores concretos moram em
`DESIGN_SYSTEM_FENIX.md` §2.8, e o teto é de quatro tamanhos de texto mais um numérico
(`GABARITO` D6).

| Papel | Função | Onde aparece | Relação com o vizinho |
|---|---|---|---|
| **Título de bloco** | Nomeia um cartão ou uma seção | Cabeçalho de cartão, cabeçalho de Configurações | Separação de grupo acima |
| **Rótulo de campo** | Nomeia uma entrada | Acima de todo campo | Colado ao campo — separação mínima |
| **Rótulo de resultado** | Nomeia uma saída, por extenso, com o símbolo entre parênteses | Topo de todo cartão de resultado | Colado ao valor |
| **Valor** | O número. Sempre monoespaçado, com dígito de largura fixa | Cartões, campos | — |
| **Unidade** | Sempre junto do valor, nunca em rótulo distante (brief §6 regra 1) | Ao lado do valor | Colada |
| **Resumo de gaveta** | Mostra o conteúdo sem abrir — valores, não contagem | Cabeçalho recolhível, à direita | — |
| **Prosa** | Previsão de comportamento e direção de ajuste | Gavetas Z5 e Z6 | Separação de grupo entre parágrafos |
| **Texto de apoio** | Nota, aviso, contrapartida | Rodapé de cartão, dentro de gaveta | Colado ao que explica |
| **Legenda** | Valor de origem sob um resultado ajustado | Rodapé do cartão alto | Colada |

### 7.1 A hierarquia semântica está ausente

**Não existe nenhum `<h1>` a `<h6>` no painel.** Os nove papéis acima são todos `div` ou `span` com
classe. Para um leitor de tela, o painel não tem estrutura de documento: não há como saltar entre
seções nem construir um sumário. Defeito **K** do `00_LEIA-ME.md` §5.2.

**O mapeamento que falta**, quando alguém for corrigir: título da vista → `h1`; título de cartão →
`h2`; título de grupo dentro do cartão → `h3`. Rótulo de campo continua sendo `<label>`, e rótulo de
resultado **não é título** — é rótulo de um dado.

---

## 8. Tokens estruturais

Os valores concretos que o painel usa hoje, com o nome semântico que cada um deveria carregar.

### 8.1 Espaçamento

| Nome semântico | Valor | Onde se aplica |
|---|---|---|
| Mínimo | 4px | Entre rótulo e valor colados |
| Entre elementos relacionados | 8px | Dentro de uma linha de controle |
| Entre campos | 12px | Medianiz vertical das grades de campo |
| **Entre grupos** | **16px** | Entre cartões, entre regiões, dentro de coluna. **É o ritmo do produto** |
| Entre seções | 24px | Entre as duas colunas |
| Interno de cartão | 14px a 20px | Recheio dos cartões |
| Externo do contêiner | 24px lateral, 16px topo, 64px pé | `css/prototipo.css` |

**Os tokens `--sp-1` a `--sp-7` são a escala declarada**, e o `test_contraste.js` cobra que o bloco
`:root` do `css/prototipo.css` bata com a §3 do `../DESIGN_SYSTEM_FENIX.md` token por token. **Não
são órfãos** — o achado **E** dizia que eram, e errava. O que é verdade é que todo espaçamento do
painel é escrito literal em vez de referenciar o token; a escala existe e vale como contrato, e usar
`var(--sp-4)` no lugar de `16px` é limpeza que ninguém pediu.

### 8.2 Dimensões

| Nome semântico | Valor | Regra |
|---|---|---|
| **Alvo de interação** | **44px** | Piso de tudo que se toca — campo, passo, aba, gatilho de gaveta, linha-link |
| Alvo da ação principal | **52px** | Valor decidido em 08/09/2026 — ver §8.5 |
| Largura mínima da coluna de entrada | 440px | Base do flexbox |
| Teto da coluna de entrada | 520px | — |
| Largura mínima da coluna de resultado | 640px | Base do flexbox |
| Largura máxima do painel | 1.440px | — |
| Largura máxima de Configurações | 1.100px | — |
| Coluna mínima — verificação | 180px | Grade elástica |
| Coluna mínima — formulário | 220px | Grade elástica |
| Coluna mínima — passos | 240px | Grade elástica |
| Base do cartão de comando | 240px, ou 260px no roscamento | Fila flexível |
| Base do cartão de passo do pica-pau | 180px, **não cresce** | `app.js:1378` |
| Rótulo da gaveta explicativa | 100px, fixo | `css/prototipo.css` |

### 8.3 Raio

Quatro degraus: chip · campo · cartão · pílula. A pílula **não é usada em componente nenhum**, e
continua declarada de propósito: a §3 do `../DESIGN_SYSTEM_FENIX.md` é o contrato da escala, e o
`test_contraste.js` cobra que o CSS bata com ela token por token.

### 8.4 Duração

| Nome | Papel |
|---|---|
| Controle | Mudança de estado de um controle |
| Painel | Abertura de gaveta, mudança de largura de viewport |
| Confirmação de execução | 240 ms de pulso (`app.js:862`) |
| Permanência da linha de status | 3.600 ms (`app.js:2581-2584`) |
| Esmaecimento do feedback de restauração | 2.600 ms (`app.js:1031`) |

**Não existem tokens de elevação, de camada nem de limiar.** A sombra é literal, não há empilhamento
no produto (§10 do `01_INVENTARIO.md`), e os três limiares são literais nas consultas de mídia.

### 8.5 Os tokens que estavam em desacordo — e como isso terminou

Quando este conjunto foi medido, **seis tokens estruturais tinham valor diferente** no
`../DESIGN_SYSTEM_FENIX.md` e no protótipo:

| Token | Design system dizia | Protótipo entregava |
|---|---|---|
| Raio de chip | 2px | 4px |
| Raio de campo | 4px | 6px |
| Raio de cartão | 8px | 10px |
| Duração de controle | 120 ms | 140 ms |
| Duração de painel | 180 ms | 200 ms |
| **Alvo da ação principal** | **56px** | **52px** |

O último era o que importava: o design system declarava 56px **com razão escrita** — *"tela tocada em
pé, na máquina, muitas vezes com toque impreciso"* — e o protótipo entregava 52px. Quatro pixels a
menos não é arredondamento; é a razão sendo perdida.

**Resolvido na `main` em `6f36784`, no mesmo dia**, pela sessão que adotou a paleta nova. O
`../DESIGN_SYSTEM_FENIX.md` §10 registra a decisão: *"o documento estava desatualizado; os valores do
protótipo passam a valer"*.

**Portanto o valor corrente é 52px**, e é o que a §8.2 declara. Registrado aqui, e não apagado, para
que quem encontrar um documento antigo citando 56px saiba onde a diferença morreu — e para que ninguém
"corrija" 52 de volta para 56 achando que achou um defeito.

---

## 9. Responsividade

Definida por **necessidade de conteúdo**, não por categoria de dispositivo. Cada limiar existe porque
alguma coisa deixa de caber.

| Limiar | O que deixa de caber | O que acontece |
|---|---|---|
| **1.080px** | As duas colunas nas bases declaradas (soma 1.104px) | Empilham em coluna única, **configuração acima do resultado**. Os tetos de largura são liberados |
| **720px** | Quatro abas com ícone e texto numa linha | Viram 2×2 |
| **600px** | Pares de campo lado a lado; cabeçalho em linha | Grades de 2 colunas viram 1; cabeçalho vira coluna; a ação de cabeçalho ocupa a largura toda; a medianiz do contêiner encolhe |

**A ordem do empilhamento não é escolha visual:** ela carrega a dependência de dados. Configuração
acima porque o resultado depende dela (`E5 §2.4`, princípio P2).

### 9.1 Vocabulário de adaptação

Como cada componente reage quando o espaço diminui:

| Reação | Componentes |
|---|---|
| Permanece igual | Cartão de comando, banda de alerta, tira de status, gaveta |
| Reduz espaçamento | Contêiner, abaixo de 600px |
| Quebra linha | Fila de cartões de comando, chips de identidade |
| Reorganiza | Grades elásticas — acrescentam linha em vez de encolher coluna |
| Reorganiza em coluna | Grades fixas de 2 colunas, cabeçalho, layout principal |
| Oculta elemento | **Nunca.** Proibido por **R13** — a mesma capacidade, reorganizada |
| Vira outro padrão | **Não acontece hoje.** É o que o escopo pede e falta — **TASK-015** do Ciclo 4 |
| Rola | Só a página inteira |
| Expande verticalmente | Prosa, listas, grades elásticas |

### 9.2 O que o escopo pede e não existe

`E5 §11` determina que em tela pequena as áreas virem **seções alternáveis** — configurar ·
resultados · ajustar — com aviso quando chega resultado novo na seção que não está à vista, e com o
alerta aparecendo **na seção atual**, sem esperar navegação. **O protótipo apenas empilha.**

Empilhar cumpre R13 quanto à capacidade — nada some. **Não cumpre o requisito de leitura:** com as
duas colunas empilhadas num celular, mudar um campo e ver o efeito exige rolar, o que encarece
exatamente o ciclo que o brief §3.5 descreve como repetido dezenas de vezes por dia. Divergência
**J**.

---

## 10. Regras de composição

### 10.1 O que pode morar dentro do quê

```
contêiner
├── cabeçalho de identidade          (cartão, nunca aninhado)
├── navegação de famílias            (nunca aninhada)
└── vista
    ├── vista de cálculo
    │   ├── coluna de configuração
    │   │   └── cartão de bloco
    │   │       ├── cabeçalho recolhível  ← um por cartão, no topo
    │   │       ├── campo | grade de campos
    │   │       ├── gaveta explicativa    ← irmã do campo, nunca dentro dele
    │   │       └── linha-link
    │   └── coluna de resultado
    │       ├── tira de status
    │       ├── banda de alerta
    │       ├── resumo da montagem
    │       ├── fila de cartões altos
    │       ├── gaveta de prosa
    │       └── grade de cartões baixos
    └── vista de configurações
        └── cartão
            ├── cabeçalho (recolhível ou estático)
            ├── aviso permanente
            ├── lista de gavetas
            │   └── gaveta de item
            │       ├── grade de campos
            │       └── zona destrutiva   ← só em item criado pelo operador
            └── formulário de cadastro
```

### 10.2 As proibições

| # | Regra | Razão |
|---|---|---|
| 1 | **Gaveta dentro de gaveta, nunca** | `E5 §3` regra 5 — aninhamento vira caça ao tesouro |
| 2 | **A gaveta explicativa é irmã do campo, não filha** | Ela precisa ficar legível *enquanto* o controle é manipulado (brief **T6**) |
| 3 | **Cartão dentro de cartão, nunca** | A elevação perde significado no segundo nível |
| 4 | **Passo `±` só nos dois resultados editáveis** | `GABARITO` **D7** — dar incremento a uma saída derivada promete uma edição que não existe |
| 5 | **Uma ação principal por vista** | O comando de cálculo é o único preenchido de marca na tela de cálculo |
| 6 | **Ação destrutiva sempre dentro de zona de confirmação** | Nunca solta numa fila de botões |
| 7 | **Alerta nunca dentro de gaveta** | **R7** — alerta ativo nunca é escondido, esmaecido nem adiado |
| 8 | **Toda prosa nasce recolhida, inclusive depois de calcular** | `GABARITO` **D9**. A única exceção é o alerta |

### 10.3 Teto de densidade

Do brief §6, e vale como limite de composição, não como meta:

| Dimensão | Teto |
|---|---|
| Números na tela ao mesmo tempo | ≈ 12 a 15 |
| Campos de entrada simultâneos | 5 a 8 |
| Controles contínuos simultâneos | 1 a 3 |
| Saídas de verificação simultâneas | 7 a 8 |
| Sinais de previsão | 0 a 6, tipicamente 0 a 2 |
| **Direções de ajuste** | **0 a 2, nunca mais** |
| Linha de alerta | **1 por vez**, de 17 gatilhos possíveis |
| Gavetas abertas ao mesmo tempo | Sem teto — mais de uma pode ficar aberta, por exigência de **T6** |

**Antes de acrescentar um elemento à tela, a pergunta é a R5 do brief:** *ele muda algo que o
operador lê?* Elemento que não muda um número nem alimenta uma decisão não entra — ruído treina o
operador a ignorar a tela, e o sinal verdadeiro morre junto.
