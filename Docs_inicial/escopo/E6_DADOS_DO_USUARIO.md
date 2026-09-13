# E6 — Dados do Usuário

**O que este documento define:** o que o sistema guarda para o operador — simulações passadas, condições favoritas, ferramentas da oficina, materiais próprios e preferências — e o que ele pode fazer com esses dados.

**O que não define:** onde os dados moram, em que formato são gravados, se há conta ou sincronização (ver **E7**).

---

## 1. O princípio

> **O trabalho do operador não se perde entre sessões.**

Uma calculadora que esquece tudo obriga a redigitar o mesmo conjunto dezenas de vezes por semana. Pior: impede a única forma de aprendizado que o sistema pode oferecer — comparar o que foi calculado com o que aconteceu na peça.

Por isso os dados guardados têm duas funções distintas, e a diferença importa:

| Função | O que é | Exemplo |
|---|---|---|
| **Reaproveitar** | Voltar a uma condição sem redigitar | favoritos, biblioteca de ferramentas |
| **Aprender** | Registrar o que aconteceu de verdade, para calibrar decisões futuras | histórico com retorno do operador |

---

## 2. Histórico de simulações

Registro automático de cada cálculo confirmado.

### 2.1 O que cada entrada guarda

| Item | Por quê |
|---|---|
| Todos os parâmetros de entrada | Sem eles a entrada não é reproduzível |
| Todos os resultados calculados | Permite comparar sem recalcular |
| Material, operação e ferramenta | Contexto mínimo de interpretação |
| Fator de segurança aplicado | Muda a leitura das grandezas de carga |
| Nível de segurança da condição | A leitura de risco daquele momento |
| Momento do registro | Ordena e permite localizar |
| O alerta ativo na hora do cálculo, quando havia um | Um resultado com alerta comparado com um limpo, sem essa distinção, corrompe a leitura de todo o histórico |
| Valor manual **e** valor recomendado da época, quando divergirem | Sem o recomendado da época, o registro deixa de ser interpretável quando a base de recomendação mudar |

### 2.2 O que entra no histórico

Entra quando o operador **aciona o cálculo** — o gesto de "quero guardar este ponto".

Não entra a cada recálculo automático do painel vivo. Registrar cada movimento de controle encheria o histórico de ruído e destruiria o valor da lista.

### 2.3 Retorno do operador — a função que diferencia o sistema

Cada entrada do histórico aceita o registro do que aconteceu de verdade na máquina:

| Retorno | Significado |
|---|---|
| **Correu bem** | A condição funcionou |
| **Quebrou a ferramenta** | A condição foi além do que a montagem suportava |
| **Acabamento ruim** | A condição produziu superfície fora do esperado |
| **Observação livre** | O que o operador quiser registrar em texto |

Esse é o único dado do sistema que vem da realidade e não do modelo. Ele fecha o laço entre o que foi previsto e o que aconteceu.

### 2.4 O que se faz com o histórico

| Ação | Comportamento |
|---|---|
| **Filtrar** | Por material, operação, retorno do operador, e somente favoritos |
| **Restaurar** | Traz os parâmetros de uma entrada de volta ao painel, pronta para recalcular ou ajustar |
| **Favoritar** | Promove a entrada a favorito (§3) |
| **Consultar em detalhe** | Abre o conjunto completo daquela simulação |
| **Exportar e importar** | §5 |

### 2.5 Limite e descarte

O histórico guarda um número definido de entradas mais recentes; ao encher, a mais antiga sai.

⚠ **NÃO DEFINIDO** — *pergunta: entrada com retorno do operador registrado é o dado mais valioso do sistema. Ela deve ser preservada quando o limite for atingido, em vez de descartada por antiguidade?*

### 2.6 Casos de borda — histórico

| Situação | Comportamento | Por quê |
|---|---|---|
| Operador aciona o cálculo duas vezes sem mudar nada | Duas entradas, ambas registradas | O gesto é a intenção de registrar; presumir duplicidade seria decidir por ele |
| Entrada restaurada, e a base de recomendação mudou desde então | Os parâmetros voltam como estavam; o sistema sinaliza que divergem da recomendação atual | O que foi executado na máquina não muda porque uma tabela mudou |
| Entrada restaurada referencia uma ferramenta que não existe mais na biblioteca | ⚠ **NÃO DEFINIDO** — *pergunta: recriar a ferramenta a partir do registro, ou avisar que a referência se perdeu?* | — |
| Registro restaurado a que falta um campo criado depois | O campo assume o valor de partida, **sinalizado como tal** | Assumir silenciosamente produziria um resultado "completo" com parte dos dados inventada |
| Retorno do operador registrado numa entrada e depois corrigido | Permitido — o retorno é observação, e observação se corrige | — |

---

## 3. Favoritos

Condições que o operador quer ter à mão.

### 3.1 O que um favorito guarda

O conjunto completo de uma simulação — os mesmos dados de uma entrada de histórico — mais uma **anotação livre** do operador.

A anotação é o que transforma uma linha de números em conhecimento: *"esta é a que usei no molde da tampa, saiu limpa"*.

### 3.2 O que se faz com um favorito

| Ação | Comportamento |
|---|---|
| **Aplicar** | Carrega a condição no painel, pronta para calcular |
| **Editar** | Ajusta os parâmetros e **recalcula**, atualizando o resultado guardado |
| **Anotar** | Altera a observação sem mexer nos números |
| **Buscar e filtrar** | Por texto da anotação, por material, por operação |
| **Ordenar** | Por data ou por material |
| **Remover** | Com confirmação — favorito apagado por engano é trabalho perdido |

**Regra de edição:** ao recalcular um favorito editado, o sistema percorre **a mesma cadeia de cálculo** do painel principal, com **o mesmo perfil de máquina e as mesmas regras de segurança** que estão configurados. Um favorito recalculado contra premissas diferentes das do painel produz dois resultados distintos para a mesma condição — e o operador não tem como saber qual está certo.

### 3.3 Favoritos alimentam a recomendação

Quando existe favorito para a combinação de material, operação e tipo de ferramenta em uso, a faixa considerada ideal para os parâmetros passa a ser **construída em torno do valor favoritado**, em vez da faixa genérica.

É personalização por uso real: o sistema aprende o que aquela oficina, com aquelas máquinas, considera bom.

⚠ **NÃO DEFINIDO** — *pergunta: havendo vários favoritos para a mesma combinação, qual manda — o mais recente, o mais usado, ou a média deles?*

### 3.4 Casos de borda — favoritos

| Situação | Comportamento | Por quê |
|---|---|---|
| Limite de favoritos atingido | O sistema avisa e pede que algum seja removido — **não** descarta sozinho | Favorito foi escolha explícita; descartar escolha explícita sem avisar é quebra de confiança |
| Favorito de material que o operador apagou depois | ⚠ **NÃO DEFINIDO** — *pergunta: impedir a remoção do material, manter o favorito órfão sinalizado, ou remover ambos?* | — |
| Favorito editado para uma condição que fica bloqueada | O recálculo mostra o bloqueio; o favorito guarda a condição com a marca | O favorito registra o que o operador quis salvar, e o bloqueio é parte da leitura |
| Favorito aplicado quando o perfil de máquina mudou desde que foi salvo | Os parâmetros são aplicados; a verificação de carga usa o perfil **atual** | O limite que importa é o da máquina que vai executar agora |

---

## 4. Biblioteca de ferramentas

As ferramentas que existem na oficina, para não redigitar geometria a cada uso.

### 4.1 O que uma ferramenta guarda

A geometria completa que o cálculo consome — o conjunto de campos varia conforme o tipo (ver **E1**).

### 4.2 Identificação

Cada ferramenta recebe um **nome gerado a partir da própria geometria**, legível e comparável — do tipo `Toroidal Ø10 · r1,0 · Z4 · L20`.

Nome gerado tem duas vantagens sobre nome livre: duas ferramentas iguais não recebem nomes diferentes, e o operador identifica a ferramenta sem abrir o registro.

⚠ **NÃO DEFINIDO** — *pergunta: o operador pode dar um apelido próprio à ferramenta, além do nome gerado? Em oficina é comum a ferramenta ser conhecida por onde vive — "a do carrinho azul".*

### 4.3 Organização

As ferramentas são agrupadas por **faixa de diâmetro**, que é o critério pelo qual o operador procura: ele sabe que precisa de "uma de 10", não do décimo item de uma lista.

### 4.4 O que se faz

| Ação | Comportamento |
|---|---|
| **Salvar a ferramenta atual** | Guarda a geometria montada no painel |
| **Carregar** | Traz a geometria para o painel |
| **Editar** | Ajusta a geometria guardada |
| **Remover** | Com confirmação |

**O operador escolhe o tipo e informa as características que quiser** (Q19/Q20, 27/08/2026): o cálculo consome os dados que ele digita — diâmetro da ferramenta (D), número de arestas (Z), raio de ponta (rε), passo da rosca (P), comprimento de aresta (Lc) e os demais campos da geometria. Ferramenta cujos dados o cálculo consome estão preenchidos entra e calcula; o sistema não recusa por a combinação não estar no catálogo entregue.

### 4.5 Casos de borda — biblioteca

| Situação | Comportamento | Por quê |
|---|---|---|
| Operador salva uma ferramenta já existente | O sistema reconhece a duplicidade pela geometria e não cria entrada nova | Duas entradas idênticas com nomes iguais é lista suja |
| Ferramenta em uso é removida da biblioteca | O painel continua com a geometria carregada; a remoção afeta a biblioteca, não a sessão | Remover da prateleira não desmonta o que está na máquina |
| Geometria inválida ao salvar — por exemplo, raio de ponta maior que a metade do diâmetro | Rejeitada, com a razão | Geometria impossível não existe na oficina, então não entra na biblioteca |

---

## 5. Materiais próprios

O operador cria e mantém seus próprios materiais.

| # | Regra | Por quê |
|---|---|---|
| 1 | Pode **adicionar, editar e remover** materiais — os próprios **e os de fábrica** (Q19/Q20, 27/08/2026) | O catálogo entregue é ponto de partida, não uma lista fechada. O sistema não decide o que o operador pode ter |
| 2 | Pode **sobrepor** valores dos materiais que vêm com o sistema | O dado de catálogo é ponto de partida, não dogma — quem mediu na própria máquina sabe mais |
| 3 | — | Regra removida em 31/08/2026. Número preservado; a lista não é renumerada |
| 4 | Um material sobreposto **indica** que foi alterado em relação ao valor de origem | Sem isso, o operador esquece que mexeu e não entende por que o resultado mudou |
| 5 | Existe caminho de **volta ao valor de origem** para material sobreposto, e **restaurar padrões** traz de volta os materiais de fábrica removidos | Alteração sem desfazer é armadilha; remoção sem volta também |
| 6 | Um material entra desde que **os campos que o cálculo consome estejam preenchidos**, com a origem declarada | O que separa não é a qualidade do dado, é a origem estar declarada (**E1** §6.3) |

### 5.1 Casos de borda — materiais

| Situação | Comportamento | Por quê |
|---|---|---|
| Material próprio criado com dados incompletos | Rejeitado enquanto faltarem os campos que o cálculo consome | Material que não calcula não é material |
| Material de fábrica sobreposto, e depois o sistema é atualizado com valor novo de catálogo | ⚠ **NÃO DEFINIDO** — *pergunta: a sobreposição do operador prevalece, o valor novo prevalece, ou o sistema avisa e pergunta?* | — |
| Material removido estando em uso no painel | O painel mantém o material carregado na sessão e sinaliza que ele já não existe na lista | Mesma lógica da ferramenta removida (§4.5) |

---

## 6. Preferências e configuração

| Grupo | Conteúdo |
|---|---|
| **Máquina** | O perfil contra o qual toda verificação de limite é feita (ver **E2**) |
| **Segurança** | Os limiares que definem cada nível de risco (ver **E4**) |
| **Materiais** | Criar, editar, sobrepor, remover (§5) |
| **Ferramentas** | A biblioteca (§4) e as faixas de parâmetro por ferramenta |
| **Exibição** | Preferências de leitura dos números |
| **Dados** | Exportar, importar e restaurar padrões (§7) |

**Regra que atravessa todos:** configuração exposta ao operador **precisa ter efeito no cálculo ou na tela**. Preferência que não muda nada é pior que preferência inexistente — o operador ajusta, não vê efeito, e conclui que o sistema está quebrado.

---

## 7. Exportar, importar e restaurar

### 7.1 Exportar

O operador leva seus dados consigo: histórico, favoritos, biblioteca, materiais e configuração.

**Por que importa:** o sistema roda numa máquina de oficina. Máquina de oficina é formatada, trocada e compartilhada. Sem exportação, todo o registro acumulado depende da sobrevivência de um computador.

### 7.2 Importar

Traz de volta um conjunto exportado.

| # | Regra | Por quê |
|---|---|---|
| 1 | O sistema **verifica** o conteúdo antes de aplicar | Importar dado malformado corrompe o estado inteiro |
| 2 | Conteúdo incompatível é **recusado com a razão**, não parcialmente aplicado | Importação pela metade deixa o sistema num estado que ninguém projetou |
| 3 | O operador vê **o que será alterado** antes de confirmar | Importar é substituição, e substituição sem prévia é perda de dado |

⚠ **NÃO DEFINIDO** — *pergunta: importar substitui tudo, ou mescla com o que já existe? Se mesclar, o que prevalece em caso de conflito?*

### 7.3 Restaurar padrões

Devolve o sistema ao estado inicial.

É a ação mais destrutiva disponível: apaga histórico, favoritos, biblioteca, materiais próprios e configuração. Por isso exige **confirmação reforçada** — e a confirmação diz explicitamente o que será perdido, em vez de perguntar de forma genérica.

### 7.4 Casos de borda — dados

| Situação | Comportamento | Por quê |
|---|---|---|
| Importação de um conjunto exportado por uma versão anterior do sistema | ⚠ **NÃO DEFINIDO** — *pergunta: há compatibilidade retroativa garantida entre versões? Se um campo novo passar a existir, o que acontece com os registros antigos?* | — |
| Restaurar padrões com dados não exportados | A confirmação **oferece exportar antes** | Um clique separando o operador de perder meses de registro é pouco |
| Exportar com o sistema em estado vazio | Permitido — o conjunto sai vazio | Não é erro, é o estado |

---

## 8. O que o sistema não guarda

| Item | Situação |
|---|---|
| Dado que nenhuma função da tela controla | **Não existe.** Estado guardado sem controle correspondente é peso morto que ninguém revisa porque ninguém vê |
| Identificação pessoal do operador | Fora de escopo (ver **E7**) |
| Sincronização entre dispositivos | Fora de escopo (ver **E7**) |

---

## Dependências deste documento

**Valores numéricos:** os limites de quantidade — quantas entradas de histórico e quantos favoritos — são decisão de produto, não de física. Não dependem de pesquisa.

⚠ **NÃO DEFINIDO** — *pergunta: os limites de histórico e favoritos são fixos, configuráveis pelo operador, ou inexistentes?*

**Perguntas em aberto levantadas aqui:**

| # | Pergunta | Onde |
|---|---|---|
| Q8 | Entrada de histórico com retorno do operador deve ser preservada quando o limite for atingido? | §2.5 |
| Q9 | Entrada restaurada cuja ferramenta não existe mais: recriar ou avisar? | §2.6 |
| Q10 | Havendo vários favoritos para a mesma combinação, qual alimenta a faixa personalizada? | §3.3 |
| Q11 | Favorito de material removido: impedir a remoção, manter órfão, ou remover ambos? | §3.4 |
| Q12 | O operador pode dar apelido próprio à ferramenta, além do nome gerado? | §4.2 |
| Q13 | Material de fábrica sobreposto quando chega valor novo de catálogo: qual prevalece? | §5.1 |
| Q14 | Importar substitui tudo ou mescla? Se mescla, o que prevalece? | §7.2 |
| Q15 | Há compatibilidade retroativa entre versões nos dados exportados? | §7.4 |
| Q16 | Limites de histórico e favoritos: fixos, configuráveis ou inexistentes? | Dependências |

**Referências cruzadas:**

| Assunto | Documento |
|---|---|
| Campos de cada tipo de ferramenta | **E1** |
| Perfil de máquina e limiares de segurança configuráveis | **E2** e **E4** |
| Marca de manual e caminho de volta ao recomendado | **E5** §5.5 |
| O que compõe o registro completo de uma simulação | **E3** §2 |
| Login, contas e sincronização | **E7** |
