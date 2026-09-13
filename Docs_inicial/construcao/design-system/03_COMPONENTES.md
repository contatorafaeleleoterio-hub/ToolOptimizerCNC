# Catálogo de componentes — Fenix

**O que é:** o inventário de peças reutilizáveis do painel, em cinco níveis, com uma ficha por
componente.

**Como ler uma ficha.** Nove campos, sempre os mesmos, na ordem do pedido: **finalidade · anatomia ·
comportamento · estados · conteúdo · responsividade · acessibilidade · uso · dependências**. Campo
que diz "—" significa que a propriedade não se aplica, não que ninguém pensou nela.

**Nomes.** Cada componente tem um **nome funcional** — o que ele faz — e a **classe atual** no
protótipo. O nome funcional é o contrato; a classe é onde ele mora hoje.

---

## 1. Arquitetura e a regra de consistência

| Nível | O que é | Quantos |
|---|---|---|
| **Foundations** | Tokens e regras que não são componente | §2 |
| **Primitives** | Peças indivisíveis | 8 |
| **Components** | Peças compostas com comportamento próprio | 12 |
| **Patterns** | Combinações recorrentes | 8 |
| **Templates** | Estruturas de vista completas | 2 |
| **Pages** | Instâncias do produto | 5 |

### 1.1 Antes de criar um componente novo

Quatro perguntas, em ordem. Sair na primeira que responder sim:

1. Já existe um equivalente no catálogo?
2. Existe um que pode ser estendido por propriedade?
3. O comportamento se resolve por composição de dois que já existem?
4. A diferença é de **comportamento, semântica ou estrutura** — ou é só de aparência?

**Aparência diferente não justifica componente novo.** O cartão alto e o cartão baixo de resultado
são dois componentes porque **um aceita edição e o outro não** (`GABARITO` **D7**) — a diferença de
tamanho é consequência, não causa.

### 1.2 Um nome, dois componentes — a correção que o catálogo faz

`.bhead` é hoje `<button>` interativo (`app.js:1544, 2851`) e `<div>` estático (`app.js:2982, 3014`).
Mesma classe, mesma aparência, comportamentos opostos: um recolhe, o outro não. **São dois
componentes** — §4.6 e §4.7 — e a classe compartilhada é o defeito, não a economia.

---

## 2. Foundations

| Fundamento | Onde vive |
|---|---|
| Tokens estruturais — espaçamento, dimensão, raio, duração, alvo | [`02_ESTRUTURA.md`](02_ESTRUTURA.md) §8 |
| Tokens semânticos — os quatro níveis de estado | [`04_COMPORTAMENTO.md`](04_COMPORTAMENTO.md) §4 |
| Tokens visuais — cor, tipografia, superfície, sombra | [`../DESIGN_SYSTEM_FENIX.md`](../DESIGN_SYSTEM_FENIX.md) |
| Formatação numérica | [`04_COMPORTAMENTO.md`](04_COMPORTAMENTO.md) §7 |
| Vocabulário obrigatório | `../BRIEF_DESIGN_INTERFACE.md` §11 |
| Sistema de grade | [`02_ESTRUTURA.md`](02_ESTRUTURA.md) §4 |

**Quatro níveis semânticos, e só eles:** normal · atenção · crítico · informação. Os três primeiros
são os níveis de diagnóstico do produto; o quarto é informação neutra que não é diagnóstico. **Não
existe segunda rampa.**

---

## 3. Primitives

### 3.1 Campo numérico com passo — `.sctl`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Receber uma grandeza numérica que o operador ajusta por incremento **ou** digitando |
| **Anatomia** | Rótulo · botão `−` · caixa com valor e unidade · botão `+` · rodapé opcional (nota ou erro) |
| **Comportamento** | O passo lê o incremento e as casas decimais da própria marcação; **dispara os mesmos eventos que a digitação** (`app.js:1073-1074`), então o campo se comporta igual sendo tocado ou digitado. Piso rígido em zero (`app.js:1068`). Toda mudança marca a grandeza como ajustada pelo operador (`app.js:2198`) e dispara recálculo se já houve cálculo |
| **Estados** | Padrão · foco no contêiner · erro · fim de curso (o `−` desabilita ao chegar no piso) |
| **Conteúdo** | Rótulo por extenso com o símbolo entre parênteses. Unidade **dentro da caixa**, nunca em rótulo distante. Casas decimais são propriedade da grandeza e não se ajustam |
| **Responsividade** | Permanece igual; a grade que o contém é que reorganiza |
| **Acessibilidade** | `<label for>` obrigatório · `inputmode="decimal"` · cada passo com `aria-label` por extenso ("Diminuir diâmetro") · alvo de 44px · fim de curso com `disabled` **e** `aria-disabled`. **Falta `aria-invalid` no estado de erro** |
| **Uso** | Toda grandeza contínua que entra no cálculo. **Não** usar para grandeza que o sistema impõe — use §3.4 |
| **Dependências** | Tokens de alvo e raio; contrato de passo; formatação numérica |

### 3.2 Campo simples — `.fbox`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Receber texto ou número sem incremento |
| **Anatomia** | Rótulo · caixa com valor · unidade opcional · rodapé opcional |
| **Comportamento** | Grava a cada digitação; valida na saída quando há regra |
| **Estados** | Padrão · foco · erro |
| **Conteúdo** | Nome, apelido, descrição, e as cinco constantes de material |
| **Responsividade** | Permanece; a grade elástica que o contém acrescenta linha |
| **Acessibilidade** | `<label for>`. **Falta `aria-invalid` e `aria-describedby` ligando o campo à mensagem de erro** |
| **Uso** | Quando não há incremento natural — texto, ou número que se digita inteiro |
| **Dependências** | Tokens de alvo e raio |

### 3.3 Seleção — `.selbox`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Escolher um item de uma lista fechada |
| **Anatomia** | Rótulo · seleção nativa · seta |
| **Comportamento** | Trocar dispara a cascata da própria escolha: material refiltra ferramentas e deriva a velocidade de corte; ferramenta carrega geometria e substrato **sem sobrescrever o que o operador tocou** (`app.js:2093-2128`) |
| **Estados** | Padrão · foco · selecionado (nativo) |
| **Conteúdo** | Rótulo de ferramenta com 30 a 50 caracteres, agrupado por geometria (brief §6) |
| **Responsividade** | Permanece; o rótulo longo quebra dentro da seleção nativa |
| **Acessibilidade** | Elemento nativo — teclado e leitor de tela de graça. **Dois usos só com `aria-label`, sem rótulo visível** (`app.js:1558`) |
| **Uso** | Material, ferramenta, designação de rosca, classe ISO, tipo e modelo no cadastro. Acima de 5 opções ou com rótulo longo, é a escolha certa; abaixo disso considere a escolha segmentada |
| **Dependências** | Tokens de alvo e raio |

### 3.4 Valor não editável — `.valor-fixo`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Mostrar um dado que o sistema impõe, na forma de campo, para que se leia na mesma varredura dos campos vizinhos |
| **Anatomia** | Rótulo · valor, com a superfície que **não** afunda |
| **Comportamento** | Nenhum. Não recebe foco, não recebe toque |
| **Estados** | Só o padrão |
| **Conteúdo** | Substrato quando o modelo só tem um; tipo e modelo de uma ferramenta já cadastrada; avanço no roscamento, imposto pelo passo da rosca |
| **Responsividade** | Permanece |
| **Acessibilidade** | O rótulo é `<span>`, **não `<label>`** — não há campo a associar. A distinção não é semântica hoje |
| **Uso** | Quando o valor existe e não é escolha. **Nunca** use campo desabilitado para isso: o produto não tem estado desabilitado, e o que não se aplica **não existe** em vez de aparecer apagado |
| **Dependências** | — |

### 3.5 Botão

Um componente, **oito papéis funcionais**. O papel é definido pela função na tela, nunca pela
aparência.

| Papel | Quando | Quantos por vista |
|---|---|---|
| **Ação principal** | O comando que encerra o fluxo — Calcular | **Um** |
| Secundária larga | Desfazer o conjunto — Restaurar padrões | Um por bloco |
| Primária de formulário | Confirmar um cadastro | Um por formulário |
| Cancelamento | Abandonar sem gravar | Sempre par de uma primária ou destrutiva |
| **Destrutiva** | Apagar | **Só dentro de zona de confirmação** — §4.8 |
| Terciária sublinhada | Reverter um valor ao de fábrica | Sem limite |
| Linha-link | Atalho contextual para outra vista | Um por bloco |
| **Somente ícone** | Incremento `−` e `+` | Sempre em par |

| Campo | Conteúdo |
|---|---|
| **Anatomia** | Ícone opcional · texto. **Somente ícone só nos incrementos**, e sempre com `aria-label` por extenso |
| **Comportamento** | Um toque age. **Exceção única: a ação destrutiva exige dois** — §4.8 |
| **Estados** | Padrão · hover · foco · pressionado · desabilitado · carregando · executado |
| **Conteúdo** | Verbo no infinitivo. **A mesma função tem sempre o mesmo nome** em todo o produto |
| **Responsividade** | A ação de cabeçalho ocupa a largura toda abaixo de 600px; as demais permanecem |
| **Acessibilidade** | `type="button"` sempre · alvo de 44px, e **52px na ação principal** ([`02_ESTRUTURA.md`](02_ESTRUTURA.md) §8.5) · foco visível |
| **Uso** | Um papel por necessidade. Se dois botões da mesma tela têm o mesmo papel e aparências diferentes, um dos dois está errado |
| **Dependências** | Tokens de alvo, raio e duração |

**Estados que o botão de ação principal usa e os outros não:** *carregando* (240 ms, `app.js:855`),
*executado* (`app.js:763-768`) e *desabilitado* — este último é a única exceção real à regra de que o
produto não tem estado desabilitado, e é a divergência **F**.

### 3.6 Chip de nível — `.chip`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Nomear o nível de diagnóstico com **palavra**, para que a cor nunca seja o único portador (**R8**) |
| **Anatomia** | Rótulo curto em caixa alta |
| **Comportamento** | Somente leitura. **Não se arrasta, não se ajusta, não se silencia** (brief §5.8 regra 5) |
| **Estados** | Quatro níveis semânticos. Nenhum estado de interação |
| **Conteúdo** | Exatamente três nomes de diagnóstico — `CRÍTICO` · `ATENÇÃO` · `NORMAL` — mais `AVISO` para informação neutra |
| **Responsividade** | Permanece |
| **Acessibilidade** | É texto real, lido como texto. **Nunca** um quadrado colorido com o significado só na cor |
| **Uso** | Dentro da banda de alerta. **Nunca solto** — o chip diz o nível, a banda diz a condição |
| **Dependências** | Tokens semânticos |

### 3.7 Tag informativa — `.tag`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Marcar uma condição de um objeto: valor ajustado, grandeza diferente de fábrica, item criado pelo operador |
| **Anatomia** | Texto curto, com o valor dentro quando houver ("ajuste +5 %") |
| **Comportamento** | Aparece e some com a condição |
| **Estados** | Informação. A variante crítica existia em CSS e nunca era gerada; **apagada em 09/09/2026** (defeito **E**) — o nível crítico é do chip, e nenhuma condição de objeto é crítica |
| **Conteúdo** | Frase curta com o número dentro, nunca só um símbolo |
| **Responsividade** | Permanece |
| **Acessibilidade** | Texto real |
| **Uso** | Condição de um objeto específico. **Não confundir com o chip de nível**, que é diagnóstico de processo. Um descreve o dado; o outro, o corte |
| **Dependências** | Tokens semânticos |

### 3.8 Aba de família — `.nav-tab`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Escolher entre as quatro famílias de usinagem |
| **Anatomia** | Ícone · texto. **Nunca só ícone** |
| **Comportamento** | Um toque troca a vista, preservando os valores de cada família |
| **Estados** | Padrão · hover · foco · **ativa** |
| **Conteúdo** | Exatamente quatro nomes obrigatórios: Fresar · Furar · Roscar · Mandrilar |
| **Responsividade** | 4×1 → 2×2 abaixo de 720px |
| **Acessibilidade** | `role="tab"` + `aria-selected` + `aria-controls` + roving `tabindex`, e o painel é `role="tabpanel"` com `aria-labelledby`. Seta anda e circula; Home e End vão às pontas. **No protótipo segue assim** — é o contrato congelado; **corrigido na casca do Ciclo 3 em 09/09/2026** (`00_LEIA-ME.md` §5.1). No protótipo o padrão segue pela metade |
| **Uso** | Só para as quatro famílias. Configurações **não é aba** — [`02_ESTRUTURA.md`](02_ESTRUTURA.md) §5.1 |
| **Dependências** | Tokens de alvo |

---

## 4. Components

### 4.1 Cartão de resultado alto — `.rcard-hero`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Carregar um número que o operador **transcreve à mão para a máquina**, e que ele pode editar de volta |
| **Anatomia** | Distintivo de endereço (`S`, `F`, `Q`) · rótulo por extenso com símbolo · tag de ajuste, condicional · linha com `−`, valor, unidade, `+` · rodapé com o valor de origem e o comando de reverter, condicional |
| **Comportamento** | Cada toque move 5% **do valor calculado de origem**, não do valor corrente — o offset é acumulado e a base é reconstituída por divisão (`app.js:1347-1350`). **Todo o painel recalcula a cada toque**, não só o número tocado (`GABARITO` **D7**). Editar rotação deduz a velocidade de corte e reescreve o campo dela; editar avanço deduz o avanço por dente ou por rotação |
| **Estados** | Padrão · **ajustado manualmente** (tag + rodapé com o valor de origem) · fim de curso no `−` · antes do primeiro cálculo os passos ficam desabilitados |
| **Conteúdo** | Rótulo por extenso com símbolo. Valor monoespaçado com dígito de largura fixa. Unidade ao lado. **Sem casa decimal em rotação e avanço** |
| **Responsividade** | A fila quebra em linha; o cartão não encolhe abaixo da base |
| **Acessibilidade** | Passos com `aria-label` por extenso ("Diminuir a rotação em 5 por cento") · fim de curso com `disabled` **e** `aria-disabled` · o ajuste é anunciado numa região viva (`app.js:1523-1525`). **O valor não é anunciado quando muda por digitação em outro campo** — a região viva só é alimentada pelos passos |
| **Uso** | **Só nos dois números que vão para a máquina**, e no passo do pica-pau na furação. Dar incremento a uma saída derivada prometeria uma edição que não existe |
| **Dependências** | Passo; tag; formatação numérica; região viva |

**Uma instância sem incremento:** no roscamento o avanço é imposto pelo passo da rosca e o cartão
nasce sem os passos (`app.js:1366`), com a razão escrita no rodapé. **É o mesmo componente com o
incremento desligado**, não um componente novo — a distinção é de dado, não de comportamento.

### 4.2 Cartão de resultado baixo — `.rcard`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Carregar uma saída de **verificação** — o operador olha para validar ou desconfiar, e não transcreve |
| **Anatomia** | Rótulo por extenso com símbolo · valor · unidade. Rótulo de nível, quando a grandeza está fora da faixa |
| **Comportamento** | Somente leitura. **Nunca tem incremento** |
| **Estados** | Padrão · em atenção (rótulo textual **e** cor) |
| **Conteúdo** | 7 a 8 simultâneos, conforme a família. **Casas decimais fixas por grandeza** |
| **Responsividade** | Grade elástica: acrescenta linha em vez de encolher coluna |
| **Acessibilidade** | Texto real; o nível carrega rótulo além da cor |
| **Uso** | Toda saída que não vai para a máquina. **Um número só aparece se alimentar uma validação ou uma decisão** (**R5**) |
| **Dependências** | Tokens semânticos; formatação numérica |

**A distinção entre os dois cartões é de forma, não de tamanho.** Altura e presença de incremento
separam *o que se transcreve* de *o que se confere* — o que resolve a tensão **T2** do brief sem
rebaixar nenhum dos dois.

### 4.3 Banda de alerta — `.alert-band`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Mostrar a condição mais grave ativa, com a grandeza medida contra a referência |
| **Anatomia** | Marca lateral · chip de nível · título com a condição · corpo com o efeito físico · nota de "há outra condição", condicional |
| **Comportamento** | **Sempre visível.** Quando nada dispara, mostra a condição normal — a zona nunca fica vazia, porque área que some e volta faz o painel saltar |
| **Estados** | Quatro níveis semânticos |
| **Conteúdo** | Estrutura invariável: `[condição] — [grandeza medida] contra [referência] ([de quanto a distância])` e o efeito físico em 1 a 2 linhas. **Descreve o risco e situa o valor; não instrui** — sem "reduza", "aumente", "divida em passes". **Uma condição por vez**, de 17 gatilhos; havendo outra, a linha diz que existe sem detalhá-la |
| **Responsividade** | Permanece; expande verticalmente |
| **Acessibilidade** | O nível carrega chip textual e posição fixa, além da cor (**R8**) |
| **Uso** | Uma por vista. **Nunca dentro de gaveta, nunca esmaecida, nunca adiada** (**R7**) — nem durante recálculo |
| **Dependências** | Chip de nível; tokens semânticos |

### 4.4 Tira de status do cálculo — `.calc-status-strip`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Dizer se o que está na tela corresponde ao que está nos campos |
| **Anatomia** | Linha com ícone e frase |
| **Comportamento** | Três ramos: painel zerado · desatualizado · sincronizado (`app.js:1264-1294`) |
| **Estados** | Zerado · desatualizado · sincronizado. Os três alcançáveis desde 09/09/2026 |
| **Conteúdo** | Frase curta e literal. Nada de horário — o estado vazio não mostra horário (brief §7.2) |
| **Responsividade** | Permanece |
| **Acessibilidade** | Texto real. **Não é região viva** — a mudança não é anunciada |
| **Uso** | Uma por coluna de resultado, sempre no topo |
| **Dependências** | Tokens semânticos |

### 4.5 Linha de status transitória — `#cfg-status`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Confirmar uma ação de edição na área Configurações |
| **Anatomia** | Linha fixa ao topo da coluna, com altura zero quando vazia |
| **Comportamento** | Aparece com a mensagem, some sozinha em **3.600 ms** (`app.js:2581-2584`). **Substitui os diálogos nativos do navegador**, que saíram do protótipo em 07/09/2026 |
| **Estados** | Vazia · informação · sucesso · erro |
| **Conteúdo** | Uma frase, no passado, dizendo o que foi feito |
| **Responsividade** | Permanece fixa ao topo da coluna |
| **Acessibilidade** | `role="status"` + `aria-live="polite"` — é anunciada |
| **Uso** | Confirmação de ação em Configurações. **Não é toast:** é ancorada, não flutua, não empilha e não tem fechamento manual |
| **Dependências** | Tokens semânticos e de duração |

### 4.6 Cabeçalho recolhível — `.bhead` interativo

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Recolher um bloco mostrando o resumo do que há dentro |
| **Anatomia** | Seta · título · **resumo dos valores**, à direita |
| **Comportamento** | Alterna o painel; o estado é preservado entre renders da mesma sessão (`app.js:1040-1044`) |
| **Estados** | Aberto · fechado · hover · foco |
| **Conteúdo** | **O resumo mostra valores, nunca contagem.** "Ø10 · Z4 · L45" permite conferir sem abrir; "3 campos" não informa nada. É a exceção autorizada ao vocabulário por extenso |
| **Responsividade** | O resumo é o primeiro a ceder espaço |
| **Acessibilidade** | `<button>` com `aria-expanded` e `aria-controls` |
| **Uso** | Topo de cartão de bloco. **Nunca dentro de outro recolhível** |
| **Dependências** | Contrato de revelação |

**Três regras do escopo que este componente não cumpre** — **TASK-014** do Ciclo 4, em
[`../../../tasks.md`](../../../tasks.md): o estado não persiste
entre sessões; um bloco com campo inválido continua podendo recolher; e trocar de ferramenta não
abre o bloco cujos campos mudaram.

### 4.7 Cabeçalho estático

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Nomear um cartão que **não** recolhe |
| **Anatomia** | Título · resumo opcional. **Sem seta** |
| **Comportamento** | Nenhum |
| **Estados** | Só o padrão |
| **Conteúdo** | Título do cartão |
| **Responsividade** | Permanece |
| **Acessibilidade** | Não é botão, não recebe foco, **não tem `aria-expanded`** |
| **Uso** | Cartão cujo conteúdo é curto e sempre relevante — margem de segurança, broca de aço rápido |
| **Dependências** | — |

**Hoje compartilha a classe do §4.6 e não deveria** — §1.2.

### 4.8 Zona destrutiva de dois toques — `.danger-zone`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Apagar um item sem diálogo modal |
| **Anatomia** | Estado pedido: um botão de pedir. Estado confirmando: pergunta + par confirmar/cancelar |
| **Comportamento** | O primeiro toque troca a zona; o segundo apaga. **A confirmação em curso é limpa ao entrar na área** (`app.js:3357`), então nunca se herda uma pergunta pendente |
| **Estados** | Pedido · confirmando |
| **Conteúdo** | A pergunta nomeia o item. O botão destrutivo nomeia o ato, nunca "OK" |
| **Responsividade** | O par de botões empilha quando não cabe |
| **Acessibilidade** | Dois botões reais, alcançáveis por teclado. A troca acontece **no lugar**, sem mover o foco para longe |
| **Uso** | Só em item criado pelo operador. **Item de fábrica não se apaga — ele se reverte** |
| **Dependências** | Botão destrutivo; botão de cancelamento |

**É a substituição consciente do modal.** O produto não tem sobreposição (`DESIGN_SYSTEM_FENIX.md`
§7), e a confirmação acontece onde o objeto está.

### 4.9 Gaveta — `.drawer`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Guardar conteúdo sob demanda sem tirá-lo do lugar |
| **Anatomia** | Gatilho com seta, rótulo e valor quando houver · corpo em grade de rótulo fixo e texto elástico |
| **Comportamento** | **Abre por clique ou teclado. Nunca só por passar o cursor** (**R9**). Fecha pelo próprio gatilho. **Mais de uma pode ficar aberta ao mesmo tempo** — exigência da tensão **T6** |
| **Estados** | Aberta · fechada · hover · foco |
| **Conteúdo** | Explicação, nota, prosa. **O gatilho mostra o que há dentro** — rótulo e valor. Seta sozinha obriga a abrir para descobrir se vale abrir |
| **Responsividade** | O corpo troca para coluna quando a grade não cabe |
| **Acessibilidade** | Padrão de revelação do WAI-ARIA, `aria-expanded` + `aria-controls`. **Não é dica flutuante** — dica é para rótulo, não para explicação |
| **Uso** | Toda prosa. **Nasce recolhida e continua recolhida depois do cálculo** (**D9**) — calcular produz números, não leitura. A única exceção do produto é a banda de alerta |
| **Dependências** | Contrato de revelação |

### 4.10 Chip de identidade — `.z1-chip`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Manter visível, sem ocupar formulário, o que permanece por horas — material e ferramenta |
| **Anatomia** | Rótulo pequeno · valor |
| **Comportamento** | Somente leitura; reflete a seleção |
| **Estados** | Preenchido · **vazio, com frase explícita** ("Nenhum material selecionado") |
| **Conteúdo** | Varia por família; a ordem não varia: material · ferramenta · dimensões |
| **Responsividade** | Empilha abaixo de 600px |
| **Acessibilidade** | Texto real |
| **Uso** | Só no cabeçalho. Resolve a tensão **T8** |
| **Dependências** | — |

### 4.11 Aviso permanente — `.aviso-fornecedor`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Dizer que os valores que vêm com o sistema são ponto de partida, e que o número certo se pede ao fornecedor da ferramenta |
| **Anatomia** | Bloco de texto, com a ação em destaque |
| **Comportamento** | Nenhum. **Não fecha, não recolhe** |
| **Estados** | Só o padrão |
| **Conteúdo** | Constante única (`app.js:2279`), repetida em dois cartões |
| **Responsividade** | Expande verticalmente |
| **Acessibilidade** | Texto real |
| **Uso** | Uma vez por cartão de biblioteca. **Não é alerta** — não tem nível, não tem chip, não ocupa a zona de alerta |
| **Dependências** | — |

**Por que não é um selo em cada valor:** o brief §5.2 regra 5 proíbe carimbar o próprio dado como
estimado — *um selo genérico repetido em cinco linhas ensina o operador a ignorá-lo*. O aviso é do
cartão, não do número.

### 4.12 Passo persistente — `.stepline`

| Campo | Conteúdo |
|---|---|
| **Finalidade** | Ajustar uma configuração da oficina que vale entre sessões |
| **Anatomia** | Rótulo · `−` · valor · `+` · linha de reverter ou nota de piso |
| **Comportamento** | Cada toque grava, reaplica no painel e confirma na linha de status. **Re-renderiza devolvendo o foco ao botão usado** (`app.js:2555-2562`) |
| **Estados** | Padrão · alterado (com reverter) · no piso |
| **Conteúdo** | Margem de segurança em **`% do calculado`** — nunca multiplicador, nunca porcentagem com sinal. Mais os três da broca de aço rápido |
| **Responsividade** | Grade elástica |
| **Acessibilidade** | `aria-label` por extenso; piso com `aria-disabled` |
| **Uso** | Só em Configurações. **Nunca cursor deslizante nem barra** — barra proporcional sugeriria uma escala com teto que não existe (**R14**) |
| **Dependências** | Botão somente ícone; formatação numérica |

---

## 5. Patterns

Combinações recorrentes. **São composições, não componentes novos** — não devem ganhar classe
própria nem virar peça indivisível.

| # | Padrão | Composição | Regra própria |
|---|---|---|---|
| **5.1** | **Bloco de configuração** | cabeçalho recolhível + campos + gaveta explicativa + linha-link | O resumo do cabeçalho mostra os valores do bloco. A gaveta é **irmã** do campo, nunca filha |
| **5.2** | **Fila de resultados de comando** | 2 ou 3 cartões altos em fila que quebra | Nunca mais de três. O passo do pica-pau não cresce; os outros dois dividem o espaço |
| **5.3** | **Grade de verificação** | 7 a 8 cartões baixos em grade elástica | Acrescenta linha, nunca encolhe coluna. Grandeza que não se aplica **some**, não aparece com valor neutro |
| **5.4** | **Explicação de quatro partes** | gaveta + quatro pares rótulo/texto | As quatro partes são fixas: *o que é · ao aumentar · ao diminuir · equilíbrio*. **Parâmetro sem os quatro textos não entra na tela** |
| **5.5** | **Direção de ajuste** | título + ação + explicação + contrapartida | Nesta ordem, e **a contrapartida fica na mesma unidade de leitura**, nunca em outro lugar da tela. **No máximo duas por vez** — seis caminhos não orientam, paralisam. É o único lugar do produto onde o sistema usa verbo de orientação |
| **5.6** | **Lista de itens editáveis** | lista + uma gaveta por item + grade de campos + zona destrutiva condicional | O gatilho da gaveta mostra o resumo do item. A zona destrutiva só existe em item criado pelo operador |
| **5.7** | **Cadastro em cascata** | seleção de tipo → seleção de modelo → substrato + campos livres | Trocar o tipo **reconstrói o rascunho preservando o que o operador digitou** (`app.js:3192-3217`). O substrato colapsa para valor não editável quando o modelo só tem um |
| **5.8** | **Agrupamento por categoria** | cabeçalho com contagem + lista + **estado vazio textual** | O cabeçalho diz quantos há. Grupo vazio mostra frase, nunca some |

**Padrões que o pedido menciona e o Fenix não tem:** filtros + tabela · tabela + paginação · card +
gráfico · dashboard de indicadores. Nenhum tem correspondente porque nenhum dos componentes de base
existe — [`01_INVENTARIO.md`](01_INVENTARIO.md) §17.

---

## 6. Templates

| Template | Estrutura | Onde |
|---|---|---|
| **Vista de cálculo** | cabeçalho de identidade · navegação · duas colunas (entrada · resultado) · ação ao pé da coluna de entrada | `index.html:80-92` |
| **Vista de biblioteca** | cabeçalho com voltar · linha de status · quatro cartões em coluna única | `app.js:2827-3056` |

**A ação fica ao pé da coluna de entrada**, não no topo: o fluxo é de cima para baixo e a ação
principal encerra o fluxo. Comando no topo obriga o olho a voltar depois de preencher tudo
(`E5 §2.3`).

---

## 7. Pages

Cinco instâncias, sobre dois templates. **Nenhuma é um componente.**

| Página | Template | O que muda |
|---|---|---|
| Fresar | cálculo | Campos de geometria e os controles contínuos da família |
| Furar | cálculo | Acrescenta o cartão do passo do pica-pau |
| Roscar | cálculo | O avanço vira leitura, imposto pelo passo da rosca |
| Mandrilar | cálculo | Diâmetro inicial e final |
| Configurações | biblioteca | — |

**O que as quatro páginas de cálculo compartilham é tudo, menos os campos.** É por isso que elas são
páginas e não templates: a diferença é de dado, não de estrutura.

---

## 8. Como documentar um componente novo

Copie a ficha de nove campos de §3.1 e responda todos. Além disso:

| # | Exigência |
|---|---|
| 1 | O nome descreve a **função**, nunca a aparência. "Cartão de resultado alto", não "cartão grande" |
| 2 | Só os estados **semanticamente relevantes**. Estado inventado por simetria é ruído |
| 3 | O campo de acessibilidade diz o que existe **e o que falta**. Lacuna conhecida é melhor que lacuna silenciosa |
| 4 | O campo "uso" diz **quando não usar**. É a metade que impede duplicação |
| 5 | Se o componente carrega número, cita a regra de formatação. Se carrega grandeza, cita o vocabulário obrigatório |
| 6 | **Nenhuma cor, fonte, sombra ou biblioteca.** Isso é a camada de aparência |
