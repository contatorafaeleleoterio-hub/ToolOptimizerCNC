# Plano — aplicar todas as pendências do protótipo do painel

**Criado:** 29/08/2026 (25ª sessão). **Estado:** ✅ executado — Fatia 1 (`HANDOFF.md` §43),
Fatia 2 itens 15–28 (§44), item 29 (§45). Concluído 29/08/2026. O "Fora deste plano" (revisão de
texto/cópia, altura de crista, Q3) segue como trabalho aberto, registrado no `HANDOFF.md` §45.4.
**Registro da sessão:** `HANDOFF.md` §42. **Substitui** o plano solto da §35.4, incorporando a
troca de alerta da R7 (§38–39) e as decisões do Mestre de 29/08.

---

## Contexto

O protótipo visual (`Docs_inicial/construcao/prototipo/` — 5 `.dc.html` + `canvas.json`) é o
**contrato visual canônico** do Fenix. Foi publicado em 28/08/2026 e **não foi tocado desde então**.

Duas rodadas de crítica (independente e do Mestre) — `relatorios/CRITICA_PROTOTIPO_PAINEL_2026-08-28.md`
e `relatorios/ANALISE_CRITICAS_MESTRE_PAINEL_2026-08-28.md` — produziram **5 decisões (D1–D5)** e um
plano de revisão. O bloqueador de montante (o exemplo canônico do `MVP` §7.6 não fechava pelas
fórmulas) foi resolvido em duas etapas:

- **§36** — a cadeia foi recalculada e corrigida.
- **§38–39 (R7)** — a R7 mostrou que o alerta que o painel encena (esfregamento, gatilho 1) **não
  dispara dentro da escala do `MVP` §5.3**: o piso real é 2,2–3,6 µm. O Mestre decidiu: o exemplo
  passa a encenar o **balanço (gatilho 5)**, e uma entrada muda — `L` de 30 → **45 mm**.

Resultado: as 5 folhas hoje mostram um exemplo numérico obsoleto e um alerta que não existiria. Este
plano aplica **tudo** — a re-semeadura com o exemplo novo, os ajustes mecânicos de regra, e os itens
que pedem desenho.

**Números de partida (do `MVP` §7.6 / §7.6.1 corrigido — aço 1045 · Toroidal Ø10 r1,0 Z4 **L45**):**

| Grandeza | Valor |
|---|---|
| `n` | 4 456 rpm |
| `vf` | 1 070 mm/min |
| `hex` | 0,036 mm |
| `hm` | 0,019 mm — **extrapolado** |
| `CTF` | 0,60× |
| `MRR` | 1,1 cm³/min |
| `Pc` | 0,06 kW |
| `Mc` | 0,1 N·m |
| `L/D` | **4,5** (limiar 4,0; +13%; deflexão +42%) |
| `vc` real | 140,0 m/min |

Alerta encenado: **ATENÇÃO — relação balanço/diâmetro (L/D) 4,5, acima do limiar de 4,0 da haste
comum**. Direção que resolve: reduzir `L` para 40 mm → deflexão −30%. Segunda condição ativa:
gatilho **1a** (`hm` 0,019 < 0,1) → marca **extrapolado** + linha "há mais uma condição ativa".

**Fronteira:** brief e design system **não** entram (o brief §5.7/§5.8 já foi corrigido na §40; o DS
não contém o exemplo). A única edição de DS prevista é a do item 29, que pede "pode seguir" à parte.

**Disciplina (regras da pasta `prototipo/LEIA-ME.md` + `L21`):** nenhuma cor fora dos tokens do DS
§3, nenhum termo abreviado (brief §11), nenhum número que não rastreie ao `MVP` ou a um canônico.
Toda regra enumerável se confere por comando, não por releitura.

**Decisões do Mestre (29/08/2026):**
1. **Duas fatias** — Fatia 1 (re-semeadura + mecânico, `grep`-verificável) primeiro, com "pode
   seguir" próprio; Fatia 2 (desenho) como aprovação separada (segue `L22`).
2. **Aplicar os itens de desenho já**, cada um com a recomendação ancorada nas fontes. Observação
   silenciosa com operador vira **validação posterior**, não pré-requisito.
3. **Altura de crista fica fora** — nenhum documento traz o valor; não se inventa. Registrada como
   pergunta aberta.

---

## Fatia 1 — re-semeadura + mecânico (verificável por `grep`, zero decisão de produto)

Aplicar numa sessão de `/design`, re-semeando os seis arquivos e republicando **na mesma URL**
(`https://claude.ai/code/artifact/2a248b7c-80e8-412f-b1d9-5bd08bedde89`).

### 1. Re-semear o exemplo canônico nas 4 folhas de conteúdo — `Main`, `Celular`, `Estados`, `Procedencia` — verify: `grep -n "0,018\|0,030\|esfrega\|L/D 3,0\|L30" *.dc.html` retorna zero

Trocar todo o exemplo de esfregamento pelo de balanço. Por folha:

- **`Main.dc.html`** — cabeçalho `L45`; chip do cabeçalho e banda `ATENÇÃO` com o texto de balanço
  (`MVP` §7.6); "o que vai acontecer" reescrito (vibração + extrapolado + "nada mais fora da faixa:
  hex 0,036, Mc 0,1, 0,06 kW"); "o que mexer" — 1ª direção "Para a ferramenta parar de vibrar
  (resolve o alerta) — Reduza o balanço (L) para 40 mm (hoje 45)…", 2ª direção `fz` 0,085 mantida;
  "resultados úteis" com os 8 números novos da tabela acima; geometria `L` 30 → 45.
- **`Celular.dc.html`** — mesmas trocas, mesma ordem de folha.
- **`Estados.dc.html`** — §1 banda `ATENÇÃO` e §4 banda "desatualizado" com o texto de balanço;
  manter a banda `CRÍTICO` (é outro caso, `ae` > D) e a `NORMAL`.
- **`Procedencia.dc.html`** — "Parâmetros usados": `L` (Balanço) 45 mm `informado`; "Verificação":
  `Pc` 0,06 · `Mc` 0,1 · `hm` 0,019 **extrapolado**; cartão de fórmula da rotação inalterado
  (`n` 4 456); a lista "Como cada número foi obtido" com `vf` 1 070, `hex` 0,036, `CTF` 0,60,
  `MRR` 1,1, `L/D` 4,5, `Pc` 0,06, `Mc` 0,1.
- **`Vazio.dc.html`** — sem alerta; só os itens mecânicos abaixo.

### 2. Colar o `:root` inteiro do DS §3 nas 5 folhas (A13) — verify: cada folha tem `--sp-1`…`--sp-7`, `--r-chip`/`--r-field`/`--r-card`, `--surface-hover-*`, `--t-control`, o bloco `:focus-visible` e `@media (prefers-reduced-motion)`

Hoje o `:root` para na tipografia. Colar o bloco pronto completo do DS
(`DESIGN_SYSTEM_FENIX.md:157-206`), incluindo interação, espaço, raio, tempo, `:focus-visible` e
`prefers-reduced-motion`. É a correção que impede os itens 3 e 4 de voltarem (raio/espaço literais e
anel de foco à mão).

### 3. Trocar raio e espaçamento literais pelos tokens (A11, A13) — verify: `grep -nE "border-radius:[0-9]|gap:(6|10|14|2|20)px|padding:[0-9]+px" *.dc.html` só devolve valores da escala `4·8·12·16·24·32·48` e raios `2/4/8`

Inclui: raio de chip **2px** uniforme em `Main:52`, `Celular:44` (hoje 4px); ~28 `gap`/`padding`
fora da escala do §2.9.

### 4. `:focus-visible` do DS aplicado; remover os anéis de foco desenhados à mão (A4/A13) — verify: `grep -n "box-shadow:0 0 0 3px rgba(55,48,163" *.dc.html` só aparece onde o DS manda (não hard-coded em campos isolados como `Main:113`, `Vazio:67`)

### 5. SVGs sem hex literal (A11) — verify: `grep -nE 'stroke="#' *.dc.html` retorna zero

Trocar `stroke="#475569"` e `stroke="#3730A3"` por `stroke="currentColor"` + `color:` no token
correto no elemento pai.

### 6. `.rule` de 78ch → 70ch em `Estados.dc.html:38`; declarar `max-width:70ch` na prosa do `Celular` (A6) — verify: `grep -n "max-width:" *.dc.html` — nenhum valor > 70ch, e o `Celular` declara a medida

### 7. `Celular` ganha "Calcular" persistente (A3) — verify: `grep -n "Calcular" Celular.dc.html` retorna ≥1, ao pé do bloco "Ajuste", fora de qualquer revelação

### 8. "Sem fonte publicada" sai da tela (`Procedencia.dc.html:81`) (A5) — verify: `grep -ni "sem fonte publicada" *.dc.html` retorna zero

Substituir por descrição de origem em tinta neutra (`--tx-3`), sem carimbo de confiança:
*"vc — velocidade de corte, 140 m/min. Valor de partida da faixa do material; digite o do seu
fornecedor se tiver."*

### 9. "L/D" sozinho por extenso em `Main:201` e `Celular:127` (A11) — verify: `grep -nE "\(L/D [0-9]" *.dc.html` retorna zero; toda ocorrência é "relação balanço/diâmetro (L/D)"

### 10. "Ajuste" → "Ajuste fino" onde é rótulo de bloco (A11) — verify: `grep -n ">Ajuste<" *.dc.html` retorna zero

### 11. `Vazio.dc.html:60` — "76–122" sai do slot de unidade (A11) — verify: o slot `.funit` não contém faixa numérica; o ponto de catálogo vai para a linha de apoio abaixo do cartão

### 12. Marca **extrapolado** na linha de contexto do resultado + linha de 2ª condição (A12, item 13 §35.4) — verify: `grep -ni "extrapolado" Main.dc.html Celular.dc.html` ≥1 na linha de contexto (`--tx-3`), e a banda de alerta traz "há mais uma condição ativa — ver Detalhes e fórmulas"

A marca entra ao lado de "2 valores manuais", texto neutro `--tx-3` (não é estado, DS §2.5). Razão
alcançável na procedência: *"hm 0,019 mm abaixo de 0,1 mm — a margem de ±15–25% do modelo não se
sustenta nessa faixa"*.

### 13. Ponteiro "há outra condição" aponta para "Detalhes e fórmulas" (Z8), não "resultados úteis" (A9) — verify: `grep -n "resultados úteis" Estados.dc.html` na linha 77 trocado por "Detalhes e fórmulas"

### 14. `Estados` §4 — devolver a 2ª linha (efeito físico) à banda de alerta desatualizada (A11) — verify: a banda do §4 tem a estrutura invariável completa `[grandeza][valor] contra [ref] / [efeito]`

---

## Fatia 2 — itens que pedem desenho (aprovação separada, depois da Fatia 1)

Ordenados por impacto no desenho. Todos ancorados em brief/DS/MVP e nas duas críticas. O Mestre
decidiu aplicar cada um com a recomendação abaixo; onde o item ainda tem uma bifurcação real
(marcada *Decisão do Mestre:*), ela é resolvida na aprovação desta fatia. Observação com operador é
validação posterior, não bloqueio.

### 15. Trilha de posição relativa por controle (D4, B1, A7, Grupo 5) — verify: cada controle `vc`/`fz`/`ae` tem faixa recomendada (segmento) + tick de partida + thumb 44px + valor tocável que abre entrada numérica

Sobre a escala que o `MVP` §5.3 já tabula. **Não** é medidor contra teto de máquina (proibido, R14);
é a posição dentro da escala do próprio controle. Resolve a metade "arrastar" de T5 e a barra de
desvio do §5.4.
**Recomendação:** aplicar como a `ANALISE` Grupo 5 prescreve.

### 16. R3 completo — todo número exibido alcança o destino (A1, B2, C4) — verify: `grep -c 'class="num aud"' Main.dc.html` cobre os 45 valores exibidos (hoje 12), inclusive os dois heróis e os números de "o que mexer"

O alvo de interação é a **linha/o campo de 44px**, não o glifo (resolve A4 sem perder "um destino").
Para inputs (geometria, constantes), o destino diz `origem: informado por você` ou `tabela X, válida
em condição Y`. `kc1.1`/`mc` passam a aparecer no lado do resultado (Z1/contexto).
**Recomendação:** linha inteira como alvo; `Procedencia` continua sendo uma revelação que empurra a
coluna, depois lista plana rolável com âncoras (não view separada — B2b, §2.4 r5).

### 17. Breakpoint intermediário de tablet (~768–1024) (B3, C1) — verify: `canvas.json` ganha um artboard do painel entre 390 e 1440; o `Main` deixa de ter `width:1440px` fixo com `flex:none`

Hoje: `width:1440px`, colunas `flex:none`, zero `@media` — quebra abaixo de 1440 (o antecessor
registrou "viewport < 1360px não renderiza").
**Recomendação:** desktop fluido com `max-width`; no tablet as duas colunas empilham largas,
"resultados úteis" 4→2 colunas, "o que mexer" 2→1.

### 18. `Celular` — ordem do `MVP` §2.3 (B3, regra escrita) — verify: antes do 1º cálculo "Montagem" está aberta e no topo; depois, colapsa para a linha de relance com o resultado abaixo — "configuração acima do resultado"

Hoje o celular inverte a ordem (resultado no topo, montagem colapsada no rodapé) — viola `MVP` §2.3
literal.
**Recomendação:** aplicar a regra; é execução, não escolha.

### 19. Os dois números de comando, distinguíveis entre si (B4, T2, C4 — teste de aceitação) — verify: `n` e `vf` empilhados na vertical no desktop; cada um com o endereço de máquina (`S` / `F`) ao lado do símbolo do §11, nunca no lugar dele

**Recomendação:** empilhar vertical (espelha `S`/`F` da planilha da fábrica) **e** rotular
`S 4 456` / `F 1 070` como endereço de máquina ao lado de "Rotação (n)". *Decisão do Mestre: manter
`S`/`F` ou só empilhar sem eles?*

### 20. `hex` com posição fixa própria (B4 2ª metade, B6, Grupo 5 ponto 3) — verify: `hex` é sempre o 1º item de "resultados úteis" (ou filete logo abaixo dos heróis), alerta ou não

Hoje "resultados úteis" começa em ≈817px — abaixo da dobra de 768px — e é onde mora o `hex`, o número
de verificação mais importante.
**Recomendação:** `hex` primeiro em "resultados úteis" sempre; e o topo do resultado (banda + heróis
+ 1ª frase) dimensionado para caber em 768px de altura.

### 21. Comparar duas condições — T12 (B5) — verify: existe um "fixar este resultado" leve OU número-fantasma do valor anterior por célula

Hoje T12 foi renomeado ("fica barato"), não resolvido — o painel regride em relação à planilha no uso
que o §3.5 chama de primeira classe.
**Recomendação:** "fixar este resultado" — filete compacto com heróis + `hex` + `L/D` da condição A
enquanto o operador disca a B. *Decisão do Mestre: filete fixado vs. número-fantasma por célula.*

### 22. Prosa comprimida por estado (D3) — verify: existe mock do estado NORMAL — "o que vai acontecer" em 1 linha ("Nada fora da faixa entre as condições verificadas"), "o que mexer" recolhido

Hoje só existe o estado com alerta. §2.4 + D3: comprimir por estado, **não** colapsar por escolha.
**Recomendação:** adicionar um quadro ou variação de estado NORMAL ao canvas.

### 23. "O que mexer" empilhado na vertical + devolver o título do objetivo (B7, B8/T11) — verify: as duas direções empilham vertical no desktop; o slot que resolve o alerta chama "Para a ferramenta durar mais" (como `MVP` §7.4), com a marca "Resolve o alerta"

Hoje: duas colunas lado a lado (peso igual = "duas opções equivalentes") e o slot renomeado para
"Para a aresta voltar a cortar" — perdeu o objetivo de durabilidade. No exemplo de balanço o `MVP`
§7.6 já usa "Para a ferramenta parar de vibrar (resolve o alerta acima)".
**Recomendação:** empilhar vertical, direção que resolve primeiro, título do objetivo de volta.

### 24. Blocos de config auto-colapsáveis mostrando os valores (D3, A11, §2.4) — verify: mock do cabeçalho recolhido de cada bloco de entrada mostrando `Ø10 · Z4 · L45` (os valores, não a contagem), com as travas r4 (não recolhe com erro) e r6 (trocar ferramenta abre geometria)

**Recomendação:** desenhar o estado recolhido no `Main` e descrevê-lo na folha `Estados`; sem botão
"OK" por campo (modelo híbrido §2.5).

### 25. Zona Z3 — "resumo da ferramenta" como zona própria da coluna de resultado (C2, `MVP` §2.3) — verify: `Toroidal Ø10 r1,0 Z4 L45` aparece como filete próprio no topo da coluna de resultado, não dissolvido no cabeçalho global

**Recomendação:** filete persistente de alto contraste — é a única coisa que o operador levanta
contra a ferramenta na mão e a folha de processo.

### 26. Dados do material com caminho de volta (A8, D2, Grupo 1) — verify: os 5 dados têm `⟲` individual quando divergem + "reverter todos os dados do material" + marca **editado**; editar por revelação/gaveta no lugar, não rota separada

Hoje `grep -c "⟲"` nas 5 folhas = 0. A superfície de edição já existe (`.fbox`); falta o caminho de
volta — "sem caminho de volta a edição vira armadilha" (brief §5.2 r2).
**Recomendação:** mesmo tratamento do bloco "Ajuste" (que já mostra `⟲` por controle + "voltar tudo").

### 27. `ap` reconhecível como mexível (D1, Grupo 2) — verify: `ap` (hoje `Main:88`, já em `--surface-input`) ganha marca **Partida** / **Manual** + `⟲` ao lado do rótulo, mantendo a posição de campo de entrada

**Recomendação:** só a marca de estado + retorno; **não** mover `ap` de volta ao bloco de ajuste
(§0.4 #12, evidência de campo).

### 28. Cabeçalho / Z1 ecoa `kc1.1 · mc · vc` de partida com marca `editado` (A2, B9, §7.5) — verify: a linha de contexto mostra `kc1.1 1500 · mc 0,21 · vc 140`, não só o nome "Aço 1045"

**Recomendação:** filete no Z1; marca **editado** quando algum dos 5 dados foi trocado.

### 29. Registrar no DS o padrão "chip sólido de nível" + linha de contraste em §6 (A10, A14/item 14 §35.4) — **pede "pode seguir" à parte: é edição do design system, não do protótipo**

Branco sobre `-ink` de estado mede 7,1–7,3:1 (passa), mas não consta como verificado. Duas saídas:
registrar o padrão + a linha em `DESIGN_SYSTEM_FENIX.md` §2.4/§6, **ou** renderizar os chips como o
DS já especifica (texto em `-ink` sobre `-bg`).
**Recomendação:** registrar no DS (o par passa; é lacuna de documentação, não de contraste).

---

## Fora deste plano (registrado, não executado aqui)

- **Altura de crista** nos resultados úteis da ponta curva — **fica fora** (decisão do Mestre,
  29/08). O `MVP` §7.2 diz "só em ponta curva" e a toroidal r1,0 é ponta curva, mas o exemplo §7.6
  não a lista e não há valor em documento nenhum. Segue como pergunta aberta no `HANDOFF` §35.5.
- **`Vazio.dc.html`** já mostra os dados do material como input antes do 1º cálculo — o §10 "nenhum
  número" merece uma nota de reconciliação (D6). Baixo impacto; pode entrar na Fatia 1 se o Mestre
  quiser.
- **Q3** — o "pode seguir" sobre o recorte da fatia vertical de código (aço 1045 + fresa de topo) é
  outra frente (scaffold), não protótipo.

---

## Verificação end-to-end

1. **Regras enumeráveis (Fatia 1)** — rodar, a partir de `Docs_inicial/construcao/prototipo/`:
   ```bash
   grep -nE '#[0-9A-Fa-f]{6}' *.dc.html | sort -u        # toda cor no bloco DS §3
   grep -n 'max-width:' *.dc.html                         # nenhum > 70ch
   grep -nE 'stroke="#' *.dc.html                         # zero
   grep -ni 'sem fonte publicada|0,018|0,030|esfrega|L30' *.dc.html   # zero
   grep -nE '\(L/D [0-9]' *.dc.html                        # zero
   grep -c 'class="num aud"' Main.dc.html                  # cobre os 45 valores
   ```
2. **Números** — recalcular a cadeia do `MVP` §7.6.1 e conferir cada valor exibido nas folhas contra
   a tabela (skill `formulas-usinagem` no modo auditar, se disponível).
3. **Vocabulário** — cada rótulo das 5 folhas contra a tabela do brief §11, celular incluído.
4. **Visual** — re-semear os seis arquivos com `/design`, abrir o `painel-fenix.html` gerado, tirar
   screenshot de cada quadro em 1440 / tablet / 390 e conferir contra o checklist do DS §9.
5. **Publicar** — republicar **na mesma URL** do artifact; atualizar `prototipo/LEIA-ME.md` e o
   `HANDOFF.md` (nova seção de sessão) e `LESSONS.md` se houver lição.
6. **Não commitar sem "pode seguir"** — regra da pasta.
