# Crítica do protótipo visual do painel — Fenix

**Data:** 28/08/2026
**Objeto:** `Docs_inicial/construcao/prototipo/` — `Main.dc.html`, `Vazio.dc.html`, `Celular.dc.html`,
`Procedencia.dc.html`, `Estados.dc.html`, `canvas.json`, e a tese declarada no `HANDOFF.md` §34.
**Padrão de julgamento:** `BRIEF_DESIGN_INTERFACE.md` (R1–R15, T1–T12, §11 vocabulário, §12
anti-requisitos), `DESIGN_SYSTEM_FENIX.md` (§9 checklist, §7 e §8 do que não existe),
`MVP_CALCULADORA_PARAMETROS.md` §7 e adjacências.
**Método:** o padrão foi fixado antes de abrir o desenho. Contexto: ToolOptimizerCNC (antecessor),
FlowNC (app em uso na mesma oficina), `Refatoracao_flowNC/REGRAS-PAINEL-INDUSTRIAL`. Mercado:
FSWizard, HSMAdvisor, G-Wizard, Sandvik, Machining Doctor.

Toda crítica nomeia o que pôr no lugar. O que não tem defeito está no bloco D, sem invenção.

> **Revisão de 29/08/2026.** Os 44 itens foram reabertos contra a fonte (`arquivo:linha` / §), com
> varredura por comando das regras enumeráveis (`L21`) e recálculo das fórmulas (`L17`). O que se
> confirmou ficou como estava; o que errou citação, número ou redação foi corrigido no lugar, com a
> correção marcada; o que a fonte contradiz foi **retirado sem apagar**. Três achados novos entraram
> no bloco A (**A12**, **A13**, **A14**) e dois em A11. Nenhum item foi removido do documento.

---

## Resumo executivo — o que muda o desenho

1. **A superfície de ajuste não existe no contrato.** Os controles são caixas de digitar. Sem
   trilha, sem faixa recomendada, sem indicador de desvio. O gesto mais repetido do produto (§3.5)
   e a tensão T5 inteira ficaram de fora. — *bloco B1, e A8.*
2. **R3 (procedência universal, inegociável) está meio-ligada.** **12 de 45** números exibidos no
   `Main` têm caminho *(revisão 29/08/2026: a contagem original — "~10 de 15+" — errava os dois
   termos; ver A1)*; os dois números de comando (no `Main`), o bloco "o que mexer", as 5 constantes
   do material e a geometria não têm nenhum. E as constantes que produzem o resultado (kc1.1, mc) não aparecem em
   lugar nenhum do lado do resultado. — *A1, A4, B2.*
3. **Só 2 dos 3 tamanhos de tela foram desenhados.** O tablet — o dispositivo de chão de fábrica
   mais provável (§2.3) — não tem quadro. O desktop é fixo em 1440 e quebra a 1366. O celular não é
   "a mesma tela reorganizada": muda a ordem e inverte a entrada. — *B3, A3.*
4. **Os dois números de comando não estão protegidos contra confusão entre si (C4).** Lado a lado,
   mesmo tamanho/peso/cor, ambos com 4 dígitos. A planilha da fábrica resolve isso melhor, com "S" e
   "F". — *B4.*
5. **T12 (comparar duas condições) não foi resolvido — foi renomeado.** "Fica barato" porque não
   custa clique; mas velocidade não é simultaneidade, e não há como segurar a condição A enquanto se
   olha a B. — *B5.*
6. **Nicks de regra verificáveis:** "Sem fonte publicada" na tela e colorido de estado; `.rule` a
   78ch; `Celular` sem "Calcular"; dados do material fora do contexto do resultado. — *bloco A.*
7. **Achados da revisão de 29/08/2026, todos de regra citável ou de conta refeita:** a marca
   **extrapolado** que o próprio exemplo exige não aparece, e a segunda condição ativa não é
   sinalizada (**A12**); o `:root` das cinco folhas copia só metade do "bloco pronto" do DS §3
   (**A13**); e o exemplo numérico canônico **não sobrevive ao recálculo** contra as fórmulas do
   próprio MVP (**A14**) — este último é defeito de montante, no `MVP` §7.6, que o protótipo
   copiou fielmente. Mais "L/D" sozinho contra o §11 (A11). — *bloco A.*

O que sobrevive à crítica é substancial e está no bloco D — em especial a disciplina de token, o
alerta que não esmaece, a ajuda que empurra o conteúdo, e "nenhum número inventado". *(Revisão
29/08/2026: D1, D5, D8 e D11 saíram imprecisos na redação; o que eles afirmam no núcleo se mantém.)*

---

## A. Violação de regra escrita

Ordenado por peso.

### A1 · R3 / §5.9 / P8 — a procedência não alcança todos os números

**Regra:** R3 — "Todo número exibido alcança fórmula, valores substituídos e fonte." §5.9 — "Todo
número exibido, **sem exceção**." É inegociável e é o defeito nomeado do que o operador usa hoje
(§2.4).

**Local:** `Main.dc.html`. A classe `.aud` (sublinhado pontilhado = gatilho) está em **12** números
— banda de alerta (`0,018 mm`, linha 153), "o que vai acontecer" (`0,018`, `3,0`, `0,9 N·m`,
`0,42 kW`, linhas 181-182), "resultados úteis" (os 7, linhas 209-215). **Não têm `.aud`:** os dois números de comando `4 456` e `1 069`
(linhas 163, 171); **todos** os números de "o que mexer" (`2,5 mm`, `0,047 mm`, `0,085 mm`,
`40%`…); os 5 dados do material (`1500`, `0,21`, `170–220`, `140`); a geometria (`10`, `30`, `4`,
`1,0`). O cartão "Detalhes e fórmulas" diz "Todo número **sublinhado** abre aqui" — logo, número sem
sublinhado não tem caminho.

**Veredito:** viola R3. A tese T3 ("o número é o gatilho") só foi fiada a uma parte dos números.

> *(Revisão 29/08/2026 — contagem refeita por comando, L21.)* `grep -c 'class="num aud'` dá **12**
> spans no `Main`, não "~10". E o denominador do resumo ("15+") vinha da tese do `canvas.json`
> ("um trigger por número seria 15 ícones"), não da tela: o `Main` exibe **45** valores numéricos —
> 6 no cabeçalho (Ø10 · r1,0 · Z4 · L30 · 14:32 · "2 valores manuais"), 5 do material, 5 da
> geometria, 3 do ajuste, 3 na banda de alerta, 2 heróis, 5 em "o que vai acontecer", 8 em "o que
> mexer", 7 em "resultados úteis" e 1 no rodapé. **A relação real é 12 de 45** — o buraco é maior
> que o relatado, não menor.

**O que fazer:** todo número recebe o sublinhado e resolve ao destino único — inclusive os dois
heróis (um pontilhado sob mono de 32px é discreto; a folha `Procedencia` já trata "Rotação" como o
exemplo-carro-chefe, então é incoerente o `Main` não marcá-los) e os números previstos em "o que
mexer" (são derivados da mesma cadeia, §7.4 r3). Para inputs (geometria, constantes), o destino diz
`origem: informado por você` ou `tabela X, válida em condição Y` (§5.9 r2–3, §4.7 r7).

### A2 · §7.5 / §2.3 Z1 — os dados do material não estão no contexto do resultado

**Regra:** §7.5 — o contexto do resultado inclui "Os dados do material que entraram na conta — força
específica, expoente, velocidade de partida… São eles, e não o nome do material, que produzem o
número." §2.3 Z1 — o cabeçalho do resultado carrega "os dados do material usados no cálculo (§4.7)".

**Local:** no `Main`, o cabeçalho (linha 49-51) mostra material + ferramenta + hora + "2 valores
manuais" — **não** os 5 dados. Eles só existem como input na coluna esquerda. E `Procedencia.dc.html`
"Parâmetros usados" (linhas 49-53) lista **vc, fz, ae, ap** — `kc1.1` e `mc` **não aparecem em
lugar nenhum** do lado do resultado nem na folha de detalhes.

**Veredito:** viola §7.5 e §4.7 r7. A tese inteira do §4.7 é "o que produz o número são os dados
dele" — e o lado do resultado os esconde. *(Revisão 29/08/2026: confirmado contra a fonte. As duas
citações estão exatas — `MVP` §7.5 e `MVP` §2.3 Z1 — e o brief §5.10 pede o mesmo com todas as
letras: "Os cinco dados do material que entraram na conta | São eles que produzem o número".)*

**O que fazer:** a linha de contexto (ou um filete compacto em Z1) ecoa `kc1.1 1500 · mc 0,21 ·
vc 140`, com a marca **editado** quando algum dos 5 foi trocado. É a impressão digital que torna o
resultado interpretável depois (§7.5) e conferível de relance (T8).

### A3 · §2.5 do MVP / §7.1 do brief — o `Celular` não tem o comando "Calcular"

**Regra:** "O comando de cálculo **nunca some e nunca é desabilitado**. Depois do primeiro uso ele
serve de ponto de retorno para reancorar" (§2.5, §7.1).

**Local:** `Celular.dc.html` inteiro (linhas 38-157): header, alerta, heróis, Ajuste, o que vai
acontecer, o que mexer, resultados úteis, "Montagem" (revelação), "Detalhes" (revelação), rodapé.
**Nenhum "Calcular".** Se estiver dentro da revelação "Montagem" colapsada, sumiu na prática.

**Veredito:** viola §2.5.

**O que fazer:** "Calcular" persistente no celular — ao pé do bloco "Ajuste" (que fica visível), ou
fixo, nunca dentro de uma gaveta colapsada.

### A4 · R9 + R10 / DS §2.9 + §9 — o gatilho de procedência não é alvo generoso nem alcançável por teclado

**Regra:** R9 — "Alvo de interação generoso em tudo, **inclusive nos gatilhos de ajuda e de
procedência**. Cursor sobre o elemento nunca é o único caminho." R10 — "Tudo que se faz com o
ponteiro se faz pelo teclado… Foco visível em todo elemento alcançável." DS §2.9: "Alvo de toque:
44px mínimo"; o checklist é o DS **§9** *(revisão 29/08/2026: o cabeçalho citava "§2.9 checklist";
o §2.9 traz o valor, o checklist é o §9)*.

**Local:** `.aud` é `border-bottom:1px dotted` sobre um número inline de 11–16px. Em `Main`, o alvo
de "abrir procedência de hex" é ~55×16px de texto no meio de uma frase em negrito. Nenhuma folha
mostra foco de teclado nesses números nem ordem de tabulação.

**Veredito:** viola R9 (alvo minúsculo, luva — §2.2) e, na ausência de demonstração, R10.

**O que fazer:** manter "o número é o gatilho" para o ponteiro, mas o alvo é a **linha inteira** do
resultado / a **caixa** do campo (44px de altura), não o glifo. Cada número auditável é um
`<button>`/link real na ordem de tabulação, com o anel de foco do DS. No celular, a linha é o alvo.
Preserva o destino único e cumpre R9 + R10 + §2.9.

### A5 · MVP §0.2 + DS §2.5 — "Sem fonte publicada" aparece na tela, e colorido de estado

**Regra:** §0.2 — "`SEM FONTE PUBLICADA` … **Este rótulo é do documento, não da tela** — na tela o
valor aparece como número editável, e a origem fica na procedência." DS §2.5 — marca fora da rampa
de estado; "se ela pegar emprestada a rampa da §2.4, passa a ser lida como severidade".

**Local:** `Procedencia.dc.html` linha 81 — `<span class="mark" style="color:var(--st-warn-ink)">Sem
fonte publicada</span>`, dentro da explicação de `vc`.

**Veredito:** dois problemas num span. (1) o rótulo de confiança documental vazou para a tela; (2)
está com a tinta de ATENÇÃO — "não tem fonte publicada" lido como risco de processo.

**O que fazer:** descrever a origem sem o carimbo de confiança e em tinta neutra: *"vc — velocidade
de corte, 140 m/min. Valor de partida da faixa do material; digite o do seu fornecedor se tiver."*

### A6 · DS §4.5 — medida de linha acima de 70 caracteres

**Regra:** DS §4.5 — "Medida máxima de **70 caracteres** por linha. Acima disso o olho perde a linha
de retorno."

**Local:** `Estados.dc.html` linha 38 — `.rule{ … max-width:78ch … }`. Usada em quase todo o texto
explicativo da folha de contrato.

**Veredito:** viola, binário. (`.prose` está em 56–64ch nas outras folhas — ok.)

**O que fazer:** `max-width:70ch` ou menos.

> *(Revisão 29/08/2026 — varredura em todas as folhas, não só na apontada.)* `grep max-width` nas
> cinco: `Estados` `.rule` **78ch** (viola), `Procedencia` `.prose` 64ch, `Main` `.prose` 62ch,
> `Vazio` `.prose` 56ch — e **`Celular` não declara medida nenhuma**: não tem `.prose` nem
> `max-width`, e a prosa herda a largura do quadro. A 390px isso não passa de 70ch na prática, mas
> a folha não carrega a regra — e é a folha que alguém vai copiar. O parêntese original ("`.prose`
> está em 56–64ch nas outras folhas") descrevia três folhas como se fossem quatro.

### A7 · brief §5.3 r3 + `MVP` §5.4 — o controle não mostra faixa recomendada nem desvio

**Regra:** **brief** §5.3 r3 — "Existe uma **faixa recomendada**, e o operador pode sair dela."
**`MVP`** §5.4 (linha 647) — "A **barra de estado** de cada controle mede o desvio contra a
referência da §5.2." *(Revisão 29/08/2026: as duas citações estão certas, mas vinham de documentos
diferentes sem rótulo — o §5.4 do brief é "Saídas de comando" e não diz nada de barra de estado.
Reforço achado na revisão: `MVP` §5.2 — "Todo controle nasce no valor de partida, e essa posição
fica marcada **na escala**" — e `MVP` §5.3 — "Mínimo e máximo são **a escala do controle**, não
trava". A escala não é sugestão do crítico: os dois documentos já a nomeiam.)*

**Local:** `Main.dc.html` linhas 94-143. Cada controle é um `.fbox` (valor + unidade) com a palavra
"Partida" ou "Manual" ao lado. Sem escala, sem faixa, sem posição de origem marcada, sem magnitude
de desvio.

**Veredito:** a faixa recomendada, que a regra diz que **existe**, é invisível; a barra de estado
(analógica: quanto e para que lado) virou um rótulo binário ("Manual").

**O que fazer:** ver B1 — trilha com faixa recomendada como segmento, tick na partida, thumb; o
rótulo "Manual" ganha a distância ("+18%", "abaixo do piso").

### A8 · brief §5.2 r1-r2 / `MVP` §4.7 r3 — os 5 dados do material não têm caminho de volta

**Regra:** brief §5.2 — os cinco valores são "todos visíveis e **todos editáveis**… um dos pontos
mais distintivos do produto". **r1**: persistem por material. **r2**: "Todo valor editado tem caminho
de volta ao valor de fábrica, individual, e existe um comando de reverter tudo." *(Revisão
29/08/2026: a numeração original — "r2: persistem / r3: caminho de volta" — estava deslocada em um;
a `ANALISE` companheira já usava a numeração certa.)* O exemplo do `MVP` §4.7 mostra o ícone `⟲` em
cada linha.

**Local:** `Main.dc.html` linhas 66-74 e `Vazio` linhas 54-62 — grid de `.fbox` com valores, **sem**
`⟲` individual, **sem** comando de reverter tudo, **sem** a marca **editado**. Contraste: o bloco
"Ajuste" mostra o retorno por-controle (`Main` linhas 110 e 133) **e** o "Voltar tudo ao valor de
partida" (linhas 140-141). Os dois são editáveis+reversíveis pelas mesmas razões; só um mostra.

**Veredito:** o ponto "mais distintivo do produto" está sem caminho de volta.

> *(Revisão 29/08/2026 — corrigido o mecanismo, mantido o achado.)* A redação original dizia "sem
> afordância de edição" e "readout inerte". Isso **não se sustenta**: os cinco dados estão em
> `.fbox`, que é `--surface-input` + `--border-control` + 44px — exatamente o sinal que o DS §2.1
> define ("o campo é a única superfície que afunda — é o que produz a leitura de 'aqui eu digito'"),
> e é o mesmo argumento com que o próprio D11 elogia os dois heróis. `grep -c "⟲"` nas cinco folhas
> dá **0**. O defeito real, e ele continua de pé, é a **ausência do caminho de volta**: sem `⟲`
> individual (brief §5.2 r2 / `MVP` §4.7 r3), sem "reverter todos", e sem a marca **editado**
> (§5.2 r3 / `MVP` §4.7 r4) — "sem caminho de volta a edição vira armadilha".

**O que fazer:** o mesmo tratamento do bloco "Ajuste" — campo editável, `⟲` individual quando
diverge do de fábrica, e um "reverter todos os dados do material".

### A9 · §9.6 / §5.8 — o ponteiro de "há outra condição" aponta para a zona errada

**Regra:** brief §5.8 / `MVP` **§9.6** — havendo segunda condição ativa, "a linha diz que existe,
**sem detalhá-lo ali**"; "ambas sinalizadas **no detalhe**" (`MVP` §7.9). *(Revisão 29/08/2026: o
corpo citava §9.7, que é "casos de borda — alerta"; a frase está no §9.6. O cabeçalho do item já
trazia §9.6.)*

**Local:** `Estados.dc.html` linha 77 — "Mais uma condição ativa — está detalhada **em resultados
úteis**." "Resultados úteis" (Z7) é o grid de 7 números de verificação; não é onde condições de
alerta são detalhadas (é Z8).

**Veredito:** inconsistência de destino.

**O que fazer:** apontar para "Detalhes e fórmulas" (Z8), onde as duas condições são listadas — ou
uma linha colapsada "condições ativas (2)" logo abaixo da banda.

### A10 · DS §2.4 / §6 — chip de nível preenchido com par de cor não verificado

**Regra:** DS §6 lista os contrastes verificados; branco sobre `-ink` de estado **não está lá**. A
§34.3 registra que a revisão trata "cor fora dos tokens" com rigor (pegou `#000000` no hover). O DS
especifica estado como **banda** (bg + bd + texto em `-ink`), não chip sólido.

**Local (lista completa após a varredura de 29/08/2026):** `Main` linhas 52 e 151, `Celular` linhas
44 **e 52**, `Procedencia` linha **100** (chip "Margem", sobre `--st-info-ink`), `Estados` `.chip`
(linha 32, usada 6×) — todos `background: var(--st-*-ink); color:#FFFFFF`. *(A lista original
esquecia `Celular:52` e `Procedencia:100`.)*

**Veredito:** o par branco/`-ink` **passa**, mas não consta como verificado num projeto que audita
contraste com rigor; e o chip sólido é um tratamento que o DS não define.

> *(Revisão 29/08/2026 — razão calculada, para a correção ser a certa.)* Branco sobre os quatro
> `-ink` da rampa: normal `#116631` **7,1:1** · atenção `#7A4F00` **7,1:1** · crítico `#A81E16`
> **7,3:1** · informação `#005E77` **7,3:1**. Todos acima do mínimo de 4,5:1 do DS §6. Logo a saída
> **não** é recolorir o chip: é registrar a linha em §6 e o padrão "chip sólido de nível" em §2.4 —
> a segunda das duas opções abaixo. O defeito é de documentação do DS, não de contraste na tela.

**O que fazer:** ou renderizar o chip como o DS especifica (texto em `-ink` sobre o `-bg` da banda),
ou adicionar o padrão "chip sólido de nível" ao DS §2.4 **com** a linha de contraste em §6.

### A11 · itens menores (corrigir sem discussão)

- **`Estados` §4 — o alerta desatualizado perde a linha de efeito físico** (linhas 122-125 mostram
  só a 1ª linha). §5.8 chama a estrutura de "invariável", e a 2ª linha faz parte. Manter a mensagem
  completa em todo estado.
- **Blocos de entrada colapsáveis (§2.4, seis regras) ausentes do contrato.** No desktop os três
  cartões de input não têm afordância de recolher; no celular viram um "Montagem" único. §2.4 quer
  recolhimento por-bloco em todo tamanho, com o cabeçalho recolhido mostrando **os valores**
  (`Ø10 · Z4 · L30`), não a contagem.
- **"Ajuste" encurta "Ajuste fino"** (§2.2/§2.3/§5 do MVP usam sempre "Ajuste fino"). Não é termo do
  §11, mas a folha é "contrato canônico" — padronizar.
- **Raio de chip inconsistente:** 4px em `Main:52` e `Celular:44`; 2px em `Main:151`,
  `Celular:52`, `Procedencia:100` e `Estados` `.chip`. O DS §2.9 fixa **2px** para chip.
  Uniformizar em 2px. *(Revisão 29/08/2026: a redação original atribuía o 2px ao token `--r-chip`
  — **nenhuma das cinco folhas define `--r-chip`**; todo raio do protótipo é literal. A causa está
  em A13.)*
- **`Vazio` — a "Velocidade de corte de partida" empilha "140 m/min · ponto de catálogo comparável
  76–122" no slot de unidade** (linha 60). "76–122" é um número com a unidade destacada dele (viola
  §6 r1). Pôr o ponto de catálogo na linha de apoio abaixo do cartão, ou na procedência.
- **"L/D" sozinho, sem o nome por extenso** *(achado da revisão, 29/08/2026)*: `Main:201` e
  `Celular:127` — "cresce a tendência a vibrar no balanço atual (**L/D** 3,0)". O §11 do brief
  proíbe com todas as letras nomes "reduzidos ao símbolo sozinho". As outras seis ocorrências de
  L/D nas cinco folhas trazem "Relação balanço/diâmetro (L/D)" e estão certas. Isto contradiz o
  D8 e a §34.3 do `HANDOFF`, que dão o "L/D" abreviado como já corrigido — a correção pegou o
  celular no bloco de resultados e deixou o de "o que mexer" nas duas folhas. É o defeito exato
  que `L21` manda conferir por comando.
- **SVGs com hex literal em vez de `var()`:** `stroke="#475569"` (= `--tx-3`) e `stroke="#3730A3"`
  (= `--select-ink`) nos ícones. Os valores são de token, mas não seguem o token se ele mudar — a
  §34.3 pegou a mesma classe de problema (`#000000` no hover). Trocar por `stroke="currentColor"` ou
  `var()`.

### A12 · `MVP` §9.2 gatilho 1a + §6.7 + §10 / brief §5.10 — a marca **extrapolado** que o próprio exemplo exige não está na tela  *(achado da revisão, 29/08/2026)*

**Regra:** `MVP` §9.2, gatilho **1a**: "`hm < 0,1 mm` — espessura **média** abaixo do limite do
modelo de Kienzle | ALERTA | … o resultado sai marcado como **extrapolado** (Q28)". §6.7, mesma
coisa por extenso: "Marca de extrapolado estendida até `hm = 0,1 mm` … O resultado continua saindo,
**marcado como extrapolado**." §10: extrapolado "convive com qualquer nível". Brief §5.10 e `MVP`
§7.5 põem a marca no contexto obrigatório do resultado.

**Local:** `Procedencia.dc.html` linha 62 exibe **`Espessura de cavaco média (hm) 0,011 mm`** — que
é 9× abaixo do limite de 0,1 mm e abaixo até do piso do modelo (`hm = 0,02 mm`, §6.7). Mesmo assim:
`grep -i extrapolado` nas cinco folhas retorna **uma** ocorrência, em `Estados:110`, e ali é uma
demonstração da marca sobre outro campo (`D` 32 mm fora do envelope). O `Main` (linha 50) e o
`Celular` (linha 47) carregam só "Calculado 14:32 · 2 valores manuais".

**Veredito:** viola §9.2 1a, §6.7 e §7.5. E há uma consequência de estrutura: com o gatilho 1a ativo
ao lado do gatilho 1 (esfregamento), **são duas condições ativas** — logo o `Main` deveria trazer a
linha "mais uma condição ativa" que a própria folha `Estados` (§1, banda CRÍTICO) desenha. Não traz.

**O que fazer:** a marca **extrapolado** entra na linha de contexto do resultado, ao lado de "2
valores manuais", em texto neutro `--tx-3` (DS §2.5 — marca de origem não é estado), com a razão
alcançável na procedência ("`hm 0,011 mm` abaixo de 0,1 mm: o par `kc1.1`/`mc` não é transferível
para esta faixa"). E a banda de alerta ganha a linha de segunda condição, apontando para Z8.

### A13 · DS §3 + §2.9 — o `:root` das cinco folhas copia só metade do "bloco pronto"  *(achado da revisão, 29/08/2026)*

**Regra:** DS §3 é chamado de "**Bloco pronto**" e traz, num único `:root`, superfícies, texto,
marca, rampa de estado, **interação** (`--surface-hover-field`, `--surface-hover-card`,
`--surface-pressed`), tipografia, **espaço** (`--sp-1…7`), **raio** (`--r-chip` 2px, `--r-field`
4px, `--r-card` 8px, `--r-pill`) e **tempo** — mais a regra `:focus-visible` e o bloco
`prefers-reduced-motion`. DS §9: "Foco visível em 100% dos elementos alcançáveis por teclado".

**Local:** as cinco folhas. O `:root` de cada uma para na tipografia: **nenhuma** define os três
tokens de interação, os sete de espaço, os quatro de raio, os dois de tempo, o `:focus-visible` nem
o `prefers-reduced-motion`.

**Veredito:** a metade do bloco que governa **medida** ficou de fora, e o efeito é mensurável:
- todo raio é literal — daí o chip a 4px em dois lugares e a 2px em quatro (A11), contra os 2px do
  DS §2.9;
- ~28 valores de `gap`/`padding` caem fora da escala `4 · 8 · 12 · 16 · 24 · 32 · 48` do §2.9
  (`gap:6px` ×8, `gap:10px` ×6, `gap:14px` ×3, `gap:2px`, `gap:20px`, `padding:5/6/7/9/14px`,
  `padding-top:18px`, `margin-top:22px`);
- o anel de foco existe desenhado à mão em dois campos (`Main:113`, `Vazio:67`) e em nenhum outro
  elemento — o que é a metade mecânica do que A4 aponta pelo lado da regra.

**O que fazer:** colar o `:root` do DS §3 **inteiro** nas cinco folhas, incluindo `:focus-visible` e
`prefers-reduced-motion`, e trocar raio e espaçamento literais pelos tokens. É a única correção
deste bloco que se confere com um comando, e é a que impede A11 de voltar.

### A14 · `MVP` §6.4 + §6.8 + §0.3 #5 — o exemplo numérico canônico não sobrevive ao recálculo  *(achado da revisão, 29/08/2026 — defeito de montante)*

**Regra:** `MVP` §6.4 — `hex = fz × 2 × √( ae/D − (ae/D)² )`, e §0.3 #5 fecha a questão: "A espessura
de cavaco (hex) usa a **fórmula exata**. A forma simplificada entrega ~79% a mais de avanço". §6.8 —
`Q = (ap × ae × Vf) / 1000`. §7.2 — CTF é "quanto a espessura real difere do avanço por dente".

**Local:** os valores de `MVP` §7.6, copiados fielmente pelo protótipo em `Main`, `Celular` e
`Procedencia`. Entradas declaradas na própria folha: `fz 0,060` · `ae 1,0` · `ap 1,0` · `D 10` ·
`Z 4` · `vc 140` → `n 4 456` · `vf 1 069` (estes dois **conferem**).

| Grandeza na tela | Valor exibido | Recalculado pela fórmula do `MVP` |
|---|---|---|
| `hex` | 0,018 mm | `0,060 × 2 × √(0,1 − 0,01)` = **0,036 mm** (fator 2 ausente) |
| `CTF` | 0,42× | `hex/fz` = **0,60×** |
| `MRR` | 8,0 cm³/min | `(1,0 × 1,0 × 1 069)/1000` = **1,07 cm³/min** |
| `hm` | 0,011 mm | `0,060 × (2·0,1)/arccos(0,8)` = **0,019 mm** |
| `hex/hm` | 1,64 | §6.4 diz que a razão "→ 2"; com os valores exatos dá **1,93** |

`Pc 0,42 kW` e `Mc 0,9 N·m` são coerentes **entre si** (§6.9: `Mc = 9549 × 0,42 / 4 456 = 0,90`),
mas só fecham com `Q ≈ 8`, herdando o `MRR` que não se reproduz.

**Veredito:** o exemplo não é reprodutível pelas fórmulas do documento que o publica. E a
consequência morde o protótipo inteiro: **com `hex = 0,036 mm` o alerta que o `Main` inteiro
encena não dispararia** — 0,036 está acima do piso de 0,030 mm que o próprio exemplo declara
(§9.2 gatilho 1). O que dispararia é o gatilho **1a** (`hm < 0,1 mm`), que é outra mensagem e pede
a marca de A12.

**Onde está o defeito:** em `MVP` §7.6, **não** no protótipo — que copiou certo (é o que D5
verifica). **A correção não é desta revisão nem deste documento:** exige abrir issue contra o
`MVP` e refazer o exemplo canônico. Registrado aqui porque nenhuma sessão de redesenho deve
re-semear as folhas antes disso: redesenhar em cima de um exemplo que não fecha é gastar duas vezes.

**Por que a auditoria não pegou:** é `L17` na letra — ler compara textos e acha divergência entre
cópias; defeito dentro de uma fórmula única só aparece contra a conta refeita.

---

## B. Tensão mal resolvida — o bloco principal

Ordenado pelo que mais mexe no desenho. Ataque à tese central no B2, B3, B4.

### B1 · T5 — precisão fina com a mão grossa: a superfície de ajuste não existe

**A tensão:** "Ele ajusta um valor com três casas decimais, de luva, possivelmente em pé,
possivelmente num celular. **Digitar e arrastar têm ergonomias opostas aqui, e os dois precisam
funcionar.**"

**Como o protótipo respondeu:** os controles `vc/fz/ae` são `.fbox` — só a metade "digitar". Não há
trilha, thumb, stepper, nem indicação de teclado numérico no celular. O `HANDOFF` §34.2 nem lista
T5 como resolvido — os autores sabem. Mas isto é "o contrato visual canônico", e o gesto que o
operador repete dezenas de vezes por sessão (§3.5) não tem forma no contrato. Quem construir o
scaffold (§34.4) não tem o que seguir.

**Por que falha na situação real:** a exploração "onde está a borda antes de encostar nela" (§3.3) é
uma tarefa de arrastar — varrer a faixa e ver o resultado mexer. Digitar `0,085` exige já saber o
alvo. O protótipo só serve quem já sabe o número.

**Alternativa concreta:** cada controle é uma trilha horizontal com (a) a **faixa recomendada** como
segmento preenchido em cinza (§5.3 r3), (b) a **partida** como tick fixo (§5.3 r1), (c) o **valor
atual** como thumb arrastável com alvo de 44px, (d) o valor **também** como número tocável que abre
entrada numérica (teclado no celular). Arrastar para a exploração grossa, digitar para as 3 casas.
A barra sob a trilha mede o desvio contra a referência (`MVP` §5.4) — resolve A7 junto.
*(Revisão 29/08/2026: a trilha não é invenção do crítico. `MVP` §5.2 já diz "essa posição fica
marcada **na escala**" e §5.3 tabula mínimo e máximo de cada controle, deixando escrito que
"mínimo e máximo são a escala do controle, **não trava**". O que o brief §12 e o DS §7 proíbem é
medidor contra um **teto de máquina** — que não existe —, não a escala do próprio controle.)*

### B2 · T3 — ataque à tese "a procedência pelo próprio número, destino único"

**A tese (canvas.json + §34.2):** "Nenhum número ganha um gatilho próprio. O número **é** o gatilho…
todo valor com sublinhado pontilhado abre este **destino único**, já posicionado na linha dele. Um
trigger por número seria 15 ícones; um destino por tela é um."

Três falhas:

**(a) o número-gatilho quebra R9 e R10.** Já em A4. A tese resolve o campo minado de ícones (T3) mas
paga com o alvo generoso que R9 nomeia explicitamente para procedência. **Dá para ter os dois:** o
alvo é a linha/o campo (44px), não o glifo; o destino continua único.

**(b) "destino único" como visão separada é uma troca de contexto.** `Procedencia.dc.html` é um
artboard de 1000px com header próprio e chevron de voltar — abri-lo é **sair** do resultado. `MVP`
**§2.3** põe Z8 como **zona da coluna de resultado**, "recolhido por padrão" — não como outra tela;
o §7.6 a desenha assim ("▸ Detalhes e fórmulas" expandindo no lugar). *(Revisão 29/08/2026: o item
citava só o §7.6, que é exemplo de conteúdo; a regra de estrutura está no §2.3.)* E por
dentro: Z8 → "Como cada número foi obtido" → derivação por número = **três níveis de gaveta**, e
§2.4 r5 proíbe "gaveta dentro de gaveta". **Alternativa:** Z8 expande no lugar (empurrando a
coluna, DS §4.4) para uma **lista plana rolável** com âncoras — clicar o número rola até a seção
dele. Uma revelação, depois plano.

**(c) o sublinhado no meio da prosa suja os blocos de texto (T4) e a seleção parece arbitrária.**
Em "o que vai acontecer" (`Main` 181-182): "a espessura de cavaco está em `0,018 mm`, abaixo do piso
de `0,030 mm`" — `0,018` sublinhado, `0,030` não. Os dois são números reais com fonte (o piso vem de
§9.2 gatilho 1). Para o leitor, por que um é auditável e o outro não? **Alternativa:** na prosa, não
sublinhar inline; o "▸" do próprio bloco leva aos detalhes. Ou sublinhar todos os números da frase,
ou nenhum.

### B3 · T9 (+ R13) — a mesma capacidade em três tamanhos: só dois foram desenhados

**A tensão:** T9 — "Computador, tablet e celular são todos cenários reais e **nenhum é secundário**.
R13 proíbe cortar função." *(Revisão 29/08/2026: o título deste item dizia "T9 · T13"; o brief §9 vai
só até **T12**. O que existe é a tensão T9, que invoca a regra R13 — título corrigido.)*

**Como o protótipo respondeu:** os quadros **do painel** no `canvas.json` são **1440** (`Main`,
`Vazio`) e **390** (`Celular`). Nada entre. *(Revisão 29/08/2026: o `canvas.json` tem mais dois
artboards na faixa intermediária — `Procedencia` 1000 e `Estados` 1080 —, mas são folhas de
documentação, não o painel numa largura de tablet. O "nada entre" vale para o painel; a redação
original o afirmava do arquivo inteiro, e ali é falso.)*

**Três problemas:**

1. **O tablet não tem quadro.** §2.3: "um tablet apoiado na máquina" — e é o dispositivo de chão de
   fábrica mais provável. Entre 1440 e 390 há a faixa 768–1024 onde o desenho não diz nada.
2. **O desktop é rígido em 1440.** `width:1440px` (`Main:44`), colunas `468px` (`Main:57`) e
   `900px` (`Main:148`), as duas com `flex:none`, mais `gap:24px` e `padding:24px` — 24 + 468 + 24
   + 900 + 24 = **1440 exatos**, sem folga de um pixel, e **zero `@media`** nas cinco folhas.
   Abaixo disso rola na horizontal. *(Revisão 29/08/2026: a redação original dizia que as colunas
   "somam 1440 exatos"; 468 + 900 = 1368 — quem fecha os 1440 é o gap mais o padding. A conclusão
   não muda, a conta sim.)* A 1366×768 (PC de escritório comum) quebra
   — e o `COMMON_MISTAKES.md` do ToolOptimizer registra exatamente isso: "Preview blank screen —
   Viewport < 1360px — Página não renderiza". Nenhuma calculadora do mercado (FSWizard, HSMAdvisor,
   G-Wizard) é presa a uma largura.
3. **O celular não é "a mesma tela reorganizada" — é outra tela, e isso é violação de regra
   escrita, não só tese mal resolvida** *(âncora achada na revisão, 29/08/2026)*. `MVP` §2.3,
   literal: "Duas áreas lado a lado. **Abaixo de uma largura mínima, empilham em coluna única
   preservando a ordem, configuração acima do resultado.**" O `Celular` faz o inverso — cabeçalho
   (38-48), alerta (50-56), heróis (58-74), Ajuste (76-104), prosa, resultados úteis, e só então
   "Montagem" (144-147), colapsada, no pé. A ordem muda: os controles pulam
   da posição 3 da coluna esquerda para logo abaixo dos heróis; "Montagem" (material + ferramenta +
   geometria) desce para uma revelação **no rodapé, colapsada por padrão**. O operador que alterna
   tablet ↔ celular aprende dois layouts — contra "o operador aprende posição". E a **entrada fica
   invertida**: na primeira vez (C1), o operador abre o app, vê a área de resultado vazia no topo, e
   precisa rolar até o fim e expandir "Montagem" para começar. Isso quebra C3 ("o próximo passo é
   evidente").

**Alternativas concretas:**
- Desenhar o breakpoint intermediário (~768–1024): provavelmente as duas colunas empilham largas,
  "resultados úteis" cai de 4 para 2 colunas, "o que mexer" de 2 para 1.
- No celular, **antes** do 1º cálculo "Montagem" fica aberta e no topo (espelha a leitura
  esquerda-primeiro do desktop). **Depois** do 1º cálculo ela colapsa para a linha de conferência de
  relance, que fica no topo, com o resultado abaixo. O layout "resultado primeiro" só serve o loop
  de reafinação, não a entrada.
- "Calcular" persistente no celular (A3).

### B4 · T2 · C4 — os dois números de comando, distinguíveis entre si

**A tensão / o critério:** C4 — "Os dois números que vão para a máquina são lidos **sem chance de
confusão entre si** e sem erro de ordem de grandeza." É teste de aceitação.

**Como o protótipo respondeu:** `Main` linhas 158-177 — `Rotação (n) 4 456 rpm` e `Velocidade de
avanço da mesa (vf) 1 069 mm/min`, **lado a lado, mesmo tamanho (32px), mesmo peso (700), mesma cor
(`--tx-1`), ambos com 4 dígitos**, separados por um filete de 1px. O único distintivo é o rótulo em
cima e a unidade ao lado.

**Por que falha:** de relance, de luva, com a máquina rodando ao lado, "4 456" e "1 069" em
tipografia idêntica lado a lado são exatamente o risco que C4 nomeia. A planilha da fábrica (§2.4)
distingue com **`S1900`** e **`F6100`** — o prefixo `S`/`F` é um marcador de tipo forte, e é o
modelo mental que o operador **já tem**. O protótipo jogou fora esse marcador. (O `Celular` empilha
os dois na vertical — melhor, e inconsistente com o desktop.)

**Alternativa concreta:** empilhar na vertical no desktop também (espelha o `S` sobre `F` da
planilha, elimina a ambiguidade esquerda/direita). E/ou adornar cada número com a letra de comando
que o operador digita: **`S 4 456`** / **`F 1 069`**. *(Ressalva da revisão, 29/08/2026: o §11 fixa
um símbolo por termo — `n` e `vf`. Se `S`/`F` entrarem, entram como **endereço de máquina**
rotulado, ao lado do par "Rotação (n)", nunca no lugar do símbolo do §11 — senão a tela passa a ter
dois símbolos para a mesma grandeza, que é o oposto do que o vocabulário existe para fazer.)*

**E a segunda metade de T2:** "a espessura de cavaco, que **não** é transcrita, dispara o alerta
mais importante." O protótipo resolve isso **só quando hex está em alerta** (sobe pela banda, acima
do par — bom). No estado NORMAL, hex é uma das 7 células iguais de "resultados úteis". O número de
verificação mais importante não tem lugar fixo. **Alternativa:** hex tem posição própria e
permanente — logo abaixo dos dois heróis, ou sempre primeiro em "resultados úteis" — para o operador
aprender "hex mora aqui", alerta ou não. É a mesma lógica de "aprende posição" da tese.

### B5 · T12 — comparar duas condições: renomeado, não resolvido

**A tensão:** "Trocar um diâmetro e ver o que muda, comparar duas ferramentas na mesma condição… O
produto tem um resultado por vez — **e mesmo assim precisa servir a esse uso**." É uso corrente
(§3.5), não exceção.

**Como o protótipo respondeu (canvas "tese"):** "Trocar um diâmetro e ver o efeito não custa nenhum
clique de ida e volta — é por isso que comparar duas condições fica barato."

**Por que falha:** velocidade não é simultaneidade. Comparar Ø10 vs Ø8 significa mudar D, ler ~15
números, mudar D de volta, ler de novo — segurando a primeira leitura **na memória**, de luva, com
ruído. A planilha da fábrica faz isso melhor: `CAB 25… CAB 20… CAB 16…`, três linhas visíveis,
compara no olho. **O Fenix regride em relação à planilha exatamente no uso que o §3.5 chama de
primeira classe.** E o contexto do FlowNC (palavras do Rafael, `DESCOBERTA-RESPOSTAS`) martelou o
valor de "ver o que **não** mudou" — o painel de resultado único não tem espaço negativo.

**Alternativa concreta:** um "fixar este resultado" leve, que mantém os dois heróis + hex + L/D da
condição A num filete compacto enquanto o operador disca a B (não um segundo painel — só o mínimo
para comparar). Ou: número-fantasma do valor anterior em cada célula depois de uma mudança
(`hex 0,018  ← era 0,024`) — a planilha-por-diferença. O "FIXADO" da folha `Estados` §5 já tem a
mecânica de **segurar um valor**; falta o equivalente para **ler** o resultado anterior. *(Revisão
29/08/2026: `Estados:154-157` fixa a **rotação** — que é saída de comando, não entrada; a mecânica
é a do `MVP` §8.2, "valor que o operador fixou não se move sozinho". O achado não muda; a descrição
sim.)*

### B6 · T1 — densidade contra velocidade: adiada, não resolvida

**A tensão:** 12–15 números, 5–8 campos, 1–3 controles, dois blocos de prosa e uma linha de
diagnóstico, para quem lê de relance dezenas de vezes por dia.

**Como o protótipo respondeu:** duas colunas, cartões empilhados, ordem vertical fixa.

**Por que a resposta é parcial:** o `Main` a 1440 parece calmo porque a coluna de leitura tem 900px
de largura e gaps de 16px. Mas o quadro é uma **página alta** (`canvas.json` `h:1720`): "resultados
úteis" e "detalhes" só com rolagem.

> *(Revisão 29/08/2026 — medida refeita a partir dos `padding`/`gap`/`line-height` declarados na
> folha.)* A redação original dizia que "os dois heróis ficam ~450px abaixo do topo". **Não ficam:**
> 24 (padding) + ~67 (cabeçalho) + 16 + ~91 (banda de alerta) + 16 + ~37 até o número dentro do
> cartão ≈ **265px** — bem dentro de um viewport de 768px. O que cai fora do primeiro écran é
> **"resultados úteis", que começa em ≈817px** — e é lá que mora o `hex`. Isso não enfraquece B6;
> **desloca o alvo**: o problema não é o par de comando estar longe, é o número de verificação mais
> importante do produto estar abaixo da dobra. Reforça B4 (segunda metade) e o item de `hex` com
> posição fixa. "O operador aprende posição" só ajuda se a posição está **na tela**. E a
ordem fixa otimiza o caso "estou apanhando" (alerta → o que houve → o que mexer) e **taxa** o caso
"só confirmando" — que o §2.1 diz ser o comum ("Já tem um valor na mão… O produto é confirmação") —
obrigando a rolar por dois blocos de prosa para chegar em hex.

**Alternativas concretas:**
- Dimensionar o topo do resultado (banda de alerta + heróis + a primeira frase de "o que vai
  acontecer") para caber numa altura de viewport de 768px. Ou: heróis + hex + L/D num cabeçalho de
  resultado que sobrevive à rolagem no desktop.
- Quando "o que vai acontecer" é só "Nada fora da faixa entre as condições verificadas", ele colapsa
  para **uma linha**, e não um cartão inteiro de rolagem.

### B7 · T4 — texto narrativo convivendo com grade numérica

**A tensão:** "Os dois blocos de prosa são **a razão de o produto existir**, e ainda assim o par de
números é o que ele reconhece na primeira olhada."

**Como o protótipo respondeu:** prosa em coluna ≤62ch dentro do mesmo cartão da grade; "o que mexer"
em duas colunas lado a lado.

**Por que falha:** os blocos "o que vai acontecer" e "o que mexer" têm o **mesmo tratamento visual
de todo cartão** — fundo branco, título `.lbl` de 11px, corpo de 13px. Parecem cartões-nota entre o
número grande e o grid de dados. O §2.4 é explícito: "entregar apenas o par rotação/avanço **não
vende nada**… O produto só existe por causa do que vem depois do par." O risco real: o operador
trata o Fenix como a planilha (pega os dois números, ignora a prosa).

E "o que mexer" em duas colunas lado a lado enfraquece a leitura de precedência do §7.4 r5 —
colunas de peso igual dizem "duas opções equivalentes". *(Revisão 29/08/2026 — retirada a acusação
de violação.* `MVP` §7.4 r5 pede que "a direção que o resolve **vem primeiro**", e no `Main` ela
está na **coluna da esquerda**, que é a primeira na ordem de leitura, com a marca "Resolve o
alerta". A regra está cumprida; o que resta é preferência de ênfase, e como tal fica registrada.)

**Alternativas concretas:**
- Tratamento distintivo para os dois blocos de prosa — **não cor** (proibido): título mais pesado,
  filete à esquerda, mais ar em volta, largura de leitura própria. Que leiam como conteúdo primário.
- Ou dobrar a frase de previsão mais importante para dentro da zona do alerta/herói.
- "O que mexer" empilhado na vertical no desktop também, a direção que resolve o alerta primeiro.
- (E `.rule` a 78ch — ver A6.)

### B8 · T11 — dois objetivos opostos, sem seletor

**A tensão:** "'Quero previsibilidade' e 'quero extrair o máximo' convivem na mesma tela ao mesmo
tempo, sem que o operador declare qual dos dois quer." (§34.2 não lista T11 como resolvido.)

**Como o protótipo respondeu:** "o que mexer" mostra duas direções. No `Main`: "Para a aresta voltar
a cortar (resolve o alerta)" + "Para usinar mais rápido".

**Por que falha — e a falha é de rótulo, não de estrutura** *(reescrito na revisão, 29/08/2026)*:
no `Main`, o slot que resolve o alerta se chama **"Para a aresta voltar a cortar"**. Nomeado assim,
o objetivo "previsibilidade / durar mais" (§3.3) **desaparece do texto** justamente quando o
operador do turno da noite mais precisa dele. Mas o `MVP` §7.4 desenha o mesmo conteúdo com outro
título — **"Para a ferramenta durar mais"** —, e o brief §5.7 idem: na fonte, a direção que resolve
o alerta **é** a direção de durabilidade, e nada some. O protótipo renomeou e, ao renomear, perdeu
o objetivo.

**Alternativa concreta:** devolver o título do objetivo ao slot ("Para a ferramenta durar mais"),
mantendo a marca **Resolve o alerta** ao lado — que é exatamente o que a fonte já faz. Quando o
alerta ativo **não** for resolvível pela direção de durabilidade, o segundo slot mostra o
objetivo-padrão de que os parâmetros atuais estão mais distantes.

> *(Retirada na revisão, 29/08/2026 — a alternativa original feria regra escrita.)* O texto anterior
> propunha "'o que mexer' admite **3 direções** quando uma delas é a resolução de um alerta". Isso é
> proibido duas vezes: brief §5.7 — "**No máximo duas direções por vez** — uma tela com seis
> caminhos não orienta, paralisa" — e `MVP` §7.4 r4 — "**Duas direções por vez, no máximo**".

### B9 · T8 — o que é conferido a cada uso e o que persiste por horas

**A tensão:** "calcular com um material errado que ficou de ontem é o **pior resultado possível**" —
e o que não está sendo revisto precisa ser conferível de relance.

**Como o protótipo respondeu:** a linha de contexto no topo ("Aço 1045 · Fresa Toroidal Ø10…").

**Por que falha:** a linha mostra "Aço 1045" — **o nome** — e o §4.7 diz explicitamente que "o que
produz o número **não é o nome do material** — são os dados dele". Os 5 dados ficam na coluna
esquerda (desktop) ou atrás da revelação "Montagem" colapsada (celular). O "pior resultado
possível" é o mais difícil de conferir de relance justamente no celular. O operador confere o nome —
que o §4.7 diz ser a coisa errada de conferir.

**Alternativa concreta:** a linha persistente carrega a impressão digital do material —
`Aço 1045 · kc1.1 1500 · mc 0,21 · vc 140` — com marca **editado** quando algum dos 5 muda. (Mesma
correção de A2.) O eixo "muda a cada peça (diâmetro, avanço) × persiste por horas (material)" também
merece um tratamento visual: o bloco de material "assentado"/mais quieto, os campos por-peça mais
presentes.

---

## C. O que o contexto e o mercado mostram e o desenho não considerou

> **Nota da revisão (29/08/2026) — vale para o bloco inteiro.** As afirmações sobre FSWizard,
> HSMAdvisor, G-Wizard, Sandvik e Machining Doctor vêm de um levantamento feito na sessão que
> escreveu esta crítica e **não estão registradas em nenhum documento do repositório** — a pesquisa
> R1–R6 cita esses produtos como fonte técnica, não como observação de interface. Elas são, portanto,
> **não verificáveis aqui**, e ficam como contexto declarado, não como evidência. O que **é**
> verificável em cada item — a regra do Fenix que ele invoca — foi conferido e está anotado abaixo.
> Os pontos externos que **puderam** ser conferidos contra os arquivos citados (`COMMON_MISTAKES.md`
> do ToolOptimizer, `DESCOBERTA-RESPOSTAS.md` do FlowNC) conferem, e estão marcados.

### C1 · A tela do meio é real e o mercado inteiro flui

O brief §2.3 põe o tablet em pé de igualdade — "um tablet apoiado na máquina", verificado na fonte.
Nenhuma calculadora de mercado (FSWizard, HSMAdvisor, G-Wizard) tem largura fixa — **não
verificável aqui** (ver a nota do bloco). O que **se verifica**: o `COMMON_MISTAKES.md` do
ToolOptimizer registra, linha 31, "Preview blank screen | Viewport < 1360px | Pagina nao renderiza"
— o antecessor já pagou esse preço. E o protótipo repete: 1440 fixos, `flex:none`, zero `@media`.
— *ver B3.*

> *(Retirado na revisão, 29/08/2026.)* A versão anterior afirmava que "o FlowNC … usa `QSplitter`
> com proporções que se ajustam (60/40 ↔ 40/60)". `grep -r "QSplitter\|60/40\|40/60"` em
> `Refatoracao_flowNC/` retorna **zero** — inclusive no `REGRAS-PAINEL-INDUSTRIAL`, que é a fonte
> que o cabeçalho desta crítica nomeia. A afirmação não tem base nos arquivos citados e sai.

### C2 · O operador sempre cruza com a folha de processo e a máquina

Palavras do Rafael (`Refatoracao_flowNC/DESCOBERTA-RESPOSTAS.md:86`): "Mesmo vendo tudo o que
listei, eu ainda comparo com a folha e com a máquina. **Isso não muda.**" *(Revisão 29/08/2026:
citação conferida palavra por palavra e confere; a referência "P4" do texto original não existe no
arquivo — a frase está na seção "O que não está dentro do arquivo — e que eu confiro fora".)* O
painel considera isso — a linha de montagem no
header existe para "conferir contra a ferramenta que está na mão" (§5.10). Mas ela poderia ser o
elemento **mais legível e estável** da tela; hoje divide o header com a hora e "2 valores manuais",
em 16px. **Alternativa:** a especificação de montagem como um filete próprio, persistente, de alto
contraste — é a única coisa que o operador levanta contra a ferramenta e a folha. *(Âncora achada na
revisão, 29/08/2026: isto não é preferência — o `MVP` §2.3 já define **Z3, "resumo da ferramenta"**,
como zona própria da coluna de resultado, com "especificação compacta do que está montado
(`Toroidal Ø10 r1,0 Z4 L30`)". O protótipo dissolveu Z3 dentro do cabeçalho global; a zona existe
na spec e não existe na tela.)*

### C3 · O mercado inteiro tem um controle de agressividade

G-Wizard (tortoise-hare, 1–100%) e HSMAdvisor ("Tool Performance slider") movem vários parâmetros
num eixo desbaste↔acabamento / conservador↔agressivo. O §12 recusa o "controle único de
agressividade" com razão registrada (sem vetor de movimento declarado; T11) e o §11 proíbe o seletor
de operação. **A razão se sustenta** — "o que mexer" é melhor pedagogia que um slider cego, e os
multiplicadores de operação do ToolOptimizer não tinham fonte (§5.2). **Mas** a quase-unanimidade do
mercado é sinal de que o operador quer um "mais seguro / mais rápido" rápido. "O que mexer" diz
*"Aumente a penetração de trabalho (ae) para 2,5 mm"* em **texto puro, sem afordância de fazer** — o
operador lê, procura o controle de ae, digita 2,5. **Alternativa:** o número-alvo em "o que mexer"
(`2,5 mm`) é o próprio controle — toca para aplicar (com marca **manual** e desfazer, §5.4). Fecha a
lacuna de velocidade que o mercado explora, sem trazer o slider cego.

### C4 · O mercado não mostra fórmula/fonte — e isso é dado dos dois lados

Só o Machining Doctor mostra fórmula + valores + "Teoria", e é um site de calculadoras avulsas de
livro-texto, não um recomendador integrado. FSWizard, HSMAdvisor, G-Wizard, Sandvik: nada. **R3 do
Fenix é território vazio** e é o que separa da planilha sem dono (§2.4). Mas o silêncio do mercado
também confirma o §5.9: procedência tem pouca tração ("o usuário real não citou a procedência"). O
protótipo acerta em colapsar (Z8). **Só que** se o R3 sai meio-ligado (A1), o Fenix perde o
diferencial **e** a alegação de honestidade de uma vez — os dois dependem de "todo número, sem
exceção".

### C5 · Vida da ferramenta e deflexão em número: o mercado mostra, o Fenix não

G-Wizard e HSMAdvisor entregam os dois como número. O §12 recusa por honestidade — o expoente de
Taylor e as constantes de deflexão não fecharam em duas rodadas (§13 L13, L14). **A razão se
sustenta e é o diferencial mais afiado do Fenix** ("não mostra número sem fonte"). Mas o operador
que vem do G-Wizard vai sentir a ausência, e "o que vai acontecer" (a previsão qualitativa que entra
no lugar, §7.3) precisa carregar esse peso — e no protótipo ele é um cartão discreto entre o número
grande e o grid (B7). Se a previsão qualitativa é a resposta do Fenix ao que o mercado dá em número,
ela não pode parecer nota de rodapé.

### C6 · Chip thinning: o mercado auto-compensa, o Fenix mostra o CTF

FSWizard tem caixas "Chip Thinning" + "HSM"; HSMAdvisor compensa automático — **não verificável
aqui** (nota do bloco). *(Corrigido na revisão, 29/08/2026: o texto original dizia "abaixo de 30% do
diâmetro". O limiar que o repositório documenta é outro — `RESPOSTA_R5.md:41`, guia da Iscar, nível
4: o afinamento começa quando "a razão entre `ae` e o diâmetro cai abaixo de **50%**". Os "7–30%" de
`RESPOSTA_R5.md:23` são a faixa radial da estratégia HEM da Harvey, não um limiar de compensação. O
número saiu.)* O Fenix mostra o CTF e **não** compensa (§0.3 #6 — compensar sobre um avanço já programado
dá até 2,3× a mais; razão sólida). Mas "CTF 0,42×" como célula neutra igual às outras 6 é o número
que o R5 alerta ("indicador que não alimenta decisão") a menos que amarrado ao alerta e à direção. O
protótipo tinge **hex** de warn-ink mas deixa **CTF** neutro — e é o mesmo fenômeno. **Alternativa:**
amarrar CTF a hex na apresentação (mesma cor de estado quando hex alerta), ou dobrar o CTF para
dentro da frase de hex em "o que vai acontecer".

### C7 · O eixo "toolroom" do mercado bate com o usuário do Fenix

G-Wizard tem uma filosofia declarada de "Toolroom Feeds and Speeds" — trabalho de peça única, "onde
quebrar uma ferramenta pode ser muito caro se refuga a peça". É exatamente a ferramentaria de moldes
do `PRODUCT_CONTEXT`. Os dois objetivos do §3.3 mapeiam nisso, e "o que mexer" (durar × render)
responde certo. Nada a corrigir — é validação de que a direção do produto está alinhada com a única
parte do mercado que atende esse operador.

---

## D. O que está certo

Obrigatório, e honesto. O que sobrevive à crítica:

### D1 · Disciplina de token — literal

**O núcleo se confirma, e é o mais difícil de manter.** Um `grep -oE '#[0-9A-Fa-f]{6}'` nas cinco
folhas devolve 23 valores distintos, e **os 23 são token do DS §3** — nenhuma cor fora da paleta.
`--brand-fill` aparece **só** na placa FENIX e no botão "Calcular" (DS §1). Uma rampa de estado,
usada como uma rampa. A revisão da §34.3 já pegou e corrigiu vazamentos (`#000000` no hover).

> *(Duas correções de redação na revisão, 29/08/2026 — o elogio fica, a descrição muda.)*
> **(1)** "Todo `:root` das cinco folhas é cópia do DS §3" **não é verdade**: cada `:root` copia a
> metade de cor e tipografia e para ali — faltam os tokens de interação, espaço, raio e tempo, o
> `:focus-visible` e o `prefers-reduced-motion`. Ver **A13**, que é onde isso vira defeito.
> **(2)** O `#FFFFFF` que sobra fora do `:root` **não é** `--surface-card`: é `color:#FFFFFF`, texto
> branco sobre os chips de nível (A10). O que sobra em `stroke=` de SVG é `#475569` e `#3730A3`
> (A11), como o texto já dizia.

### D2 · O alerta não esmaece quando os números esperam (`Estados` §4)

Os números caem de `--tx-1` para `--tx-3` **e** ganham marcador textual "Aguardando recálculo"; a
banda de alerta fica em tinta cheia. Sem `opacity` (que derrubaria o contraste). A razão está escrita
na folha: "esmaecer alarme ativo é o oposto do que um painel industrial deve fazer". R7 e DS §2.6
exatos.

### D3 · Marcas de origem em texto neutro, fora da rampa (`Estados` §3)

`manual` / `editado` / `extrapolado` em `--tx-3`, caixa alta, com a razão escrita ("Se pegassem
emprestada a cor de estado, passariam a ser lidas como severidade"). DS §2.5 cumprido. (A exceção é
o "Sem fonte publicada" da folha `Procedencia` — A5 — mas as três marcas canônicas estão certas.)

### D4 · A ajuda empurra o conteúdo, várias abertas, por clique (`Main`, controle `fz`)

O bloco de quatro partes abre embaixo do controle, empurrando a coluna — não flutua, não sobrepõe. É
a resolução correta de T6 e o que o DS §8 diz que o painel do ToolOptimizer **não** conseguia fazer
("comparar dois parâmetros lendo os dois"). DS §4.4 + §5.5 r3/r4.

### D5 · "Nenhum número inventado"

Todo valor rastreia ao MVP §7.6 / §11.1 (Aço 1045 · Toroidal Ø10 r1,0 Z4 L30). A revisão pegou o
único inventado (1740 → 1800 N/mm², topo da faixa nomeada). O `LEIA-ME.md` codifica a regra com o
comando de verificação. É a defesa direta contra o defeito que o Fenix existe para não repetir
(falsa precisão, R14). **Confirmado na revisão de 29/08/2026:** conferido número a número contra o
§7.6, e o protótipo não inventou nenhum.

> **Ressalva que a revisão acrescenta, e ela é grande:** *rastreável* não é o mesmo que *correto*.
> Os números que o protótipo copiou fielmente **não sobrevivem ao recálculo** contra as fórmulas do
> próprio `MVP` — ver **A14**. D5 continua verdadeiro sobre o protótipo; o defeito está na fonte que
> ele copiou.

### D6 · Estado vazio honesto (`Vazio`, coluna direita)

"Antes do primeiro cálculo esta área fica sem número — nem zero, nem traço." A área de resultado
mostra zero número. R4 / §7.8 r3 cumpridos. *(A questão dos dados do material aparecerem como input
na coluna esquerda antes do 1º cálculo é legítima — são `DECLARADO`, não resultado — mas o §10
"nenhum número" merece uma nota de reconciliação.)*

### D7 · A estrutura invariável da mensagem de alerta (`Estados` §1, `Main`)

"Espessura de cavaco máxima (hex) **0,018 mm**, abaixo do piso de **0,030 mm** **(−40%)** / A aresta
esfrega em vez de cortar…" — `[grandeza] [valor] contra [referência] ([distância]) / [efeito
físico]`, exatamente o §5.8. Não instrui (§9.1). O "(−40%)" quantifica a distância como o §5.8 pede.
*(Revisão 29/08/2026: confirmado nas quatro bandas de `Estados` §1 e no `Main:153-154`. A única
quebra da estrutura "invariável" está em `Estados` §4, onde a 2ª linha some — já registrada em
A11.)*

### D8 · Vocabulário completo nos rótulos — com duas exceções na prosa

"Velocidade de avanço da mesa (vf)", "Relação balanço/diâmetro (L/D)", "Potência de corte na aresta
(Pc)" — nome por extenso + símbolo, e o "na aresta" obrigatório (§5.5). Todos os **rótulos** das
cinco folhas, celular incluído, foram conferidos um a um contra a tabela do §11 e estão certos.

> *(Corrigido na revisão, 29/08/2026 — a afirmação absoluta não se sustenta.)* "O `Celular` não
> encurta nada" está errado: `Celular:127` e `Main:201` trazem "(**L/D** 3,0)" na prosa de "o que
> mexer" — símbolo sozinho, que o §11 proíbe. A correção da §34.3 pegou o L/D do bloco de
> resultados e deixou o de "o que mexer", nas duas folhas. Ver o item novo em A11. O que continua
> certo, e é o mérito: 12 dos 14 termos técnicos aparecem por extenso + símbolo em todos os
> quadros, inclusive a 390px.

### D9 · "O sistema recomenda, o operador decide" + "±15–25%" como rodapé permanente

Em todo quadro, não escondido. A folha `Procedencia` amarra a margem à recusa dos anti-requisitos:
"é por isso que nenhum número desta tela vem com percentual de limite ou nota de 0 a 100". §5.10
cumprido no espírito, não só na letra.

### D10 · `Estados` §6 — o protótipo embute a própria lista de anti-requisitos

"O que esta tela nunca vai ter" restata o §12 do brief + §7 do DS dentro do contrato. É exatamente o
que um "contrato visual canônico" deve fazer — dizer o que está proibido para quem vier depois.

### D11 · Heróis em superfície afundada, resultados úteis em cartão plano

DS §2.1 aplicado certo: "o campo é a única superfície que afunda — é o que produz a leitura de 'aqui
eu digito'". Os dois números editáveis estão em `.fbox`; os 7 de verificação, não — e essa distinção
dentro da coluna de resultado é real e bem feita.

> *(Duas ressalvas de redação, revisão 29/08/2026.)* **(1)** "O sinal está no material da superfície,
> **não numa legenda**" — há legenda: `Main:176`, "Edite qualquer um dos dois: o sistema recalcula
> tudo para trás e mantém fixo o que você digitou". O sinal é duplo, e melhor por isso.
> **(2)** `.fbox` não é exclusivo dos dois heróis: os 5 dados do material, os 6 campos de geometria
> e os 3 controles usam a mesma classe. A superfície diz "isto se digita", não "só estes dois se
> digitam" — e é justamente por isso que A8, corrigido, deixou de acusar falta de afordância nos
> dados do material.

### D12 · T10 (reconfiguração de campos) bem feito (`Estados` §5)

A banda "MUDOU" nomeia o que entrou ("Raio de canto (r)"), o que saiu ("Ângulo de ponta e passo de
rosca"), e o que foi preservado e revalidado. "Campo que não se aplica não existe — nunca aparece
desabilitado" respeitado em todo lugar; não há estado desabilitado no sistema (DS §7). Bate com
§2.6 / §7.4.

---

## Fecho

O protótipo acerta o mais difícil de acertar: a disciplina invisível (token, honestidade numérica,
alerta que não esmaece, anti-requisitos embutidos). Onde ele falha é em **completar o contrato** —
a superfície de ajuste (B1), a procedência universal de fato (A1, B2), os três tamanhos de tela
(B3) — e em **um ponto de tese que não fecha**: comparar duas condições (B5) e distinguir os dois
números de comando (B4) são usos de primeira classe que o desenho atual serve pior que a planilha
que ele quer substituir.

Nenhum desses defeitos é fatal. Os de tese (bloco B) precisam de decisão do Mestre e, idealmente, de
uma sessão de observação silenciosa com o operador — que é o que a `REGRAS-PAINEL-INDUSTRIAL` diz
que separa um painel industrial que funciona de um que só parece funcionar.

**Adendo da revisão de 29/08/2026.** Um defeito **é** bloqueante, e não é do protótipo: o exemplo
numérico canônico do `MVP` §7.6 não se reproduz pelas fórmulas do §6.4 e do §6.8 (**A14**). Com a
espessura de cavaco correta o alerta que o `Main` inteiro encena não dispararia, e a marca
**extrapolado** que os números pedem não está na tela (**A12**). Redesenhar as cinco folhas antes de
fechar isso é refazer o trabalho duas vezes — o exemplo precisa ser corrigido no `MVP` primeiro.
