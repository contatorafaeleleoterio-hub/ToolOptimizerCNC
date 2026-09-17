# Inventário do painel — Fenix

**O que é:** o levantamento do que existe no painel hoje, categoria por categoria, com o lugar exato
no código. É a Etapa 1 do processo, e a base factual das outras três peças.

**Objeto medido:** `Docs_inicial/construcao/prototipo/` no commit `d6a841e` —
`index.html` (104 linhas) · `css/prototipo.css` (1.177) · `js/app.js` (3.542) · `js/mock-data.js` (686).

**Por que o CSS é citado por seletor e não por linha.** Entre a medição e a publicação deste conjunto,
a sessão da paleta nova (`6f36784`) mexeu em 151 linhas do `css/prototipo.css` e deslocou **todas** as
40 citações de linha que este documento tinha. **No CSS o endereço estável é o seletor**, e é assim
que ele passou a ser citado.

**Aconteceu de novo no dia seguinte, agora no JavaScript.** O alerta de balanço do mandrilamento
(`933cdba`) acrescentou 14 linhas ao `js/app.js`, e as 178 citações de linha deste conjunto foram
remapeadas contra os deslocamentos exatos do diff e reconferidas por amostragem. **Toda citação de
linha deste conjunto vale para o commit declarado acima** — quem ler depois de o protótipo andar
confere pelo nome da função ou do seletor, que é o que não se move.

**Como ler:** toda linha tem endereço. Onde a coluna "Onde" está vazia, o item **não existe** e a
linha registra a ausência, que é informação tanto quanto a presença.

**Um fato que governa a leitura inteira:** o `index.html` é só o esqueleto — quatro contêineres
vazios com o comentário *"Renderizado dinamicamente por…"*. **Todo o DOM útil é gerado por template
string em JavaScript.** Não existe marcação declarativa para inspecionar; a estrutura mora dentro de
quatro funções de render.

---

## 1. Estrutura

### 1.1 Regiões

| Região | Marcação | Onde | Persistência |
|---|---|---|---|
| Barra de homologação | `header.demo-toolbar[role=region]` | `index.html:12-40` | Sempre visível, **fora** do contêiner de viewport. **É andaime de protótipo, não é produto** |
| Contêiner de viewport | `main#viewport-container.viewport-wrapper` | `index.html:43` | Sempre |
| Cabeçalho de identidade | `section.card.z1-card` | `index.html:46-55` | Escondido ao entrar em Configurações (`app.js:3362`) |
| Navegação de famílias | `nav.nav-bar > .nav-families[role=tablist]` | `index.html:58-77` | Escondida ao entrar em Configurações (`app.js:3361`) |
| Vista de cálculo | `div#view-calculo.main-layout` | `index.html:80-92` | Alternada por `hidden` |
| Coluna de configuração | `section.col-config#config-form-container` | `index.html:83-85` | Preenchida por `renderConfigForm()` |
| Coluna de resultado | `section.col-results#col-resultados-content` | `index.html:88-90` | Preenchida por `renderCalculatedResults()` |
| Vista de configurações | `section#view-configuracoes[hidden]` | `index.html:95-97` | Preenchida por `renderSettingsView()` |

**Duas vistas, uma rota.** `switchTab(tabId)` (`app.js:3336-3378`) é o roteador inteiro. Não há URL,
histórico de navegador nem rota nomeada.

### 1.2 Contêineres e grades

| Contêiner | Definição | Onde |
|---|---|---|
| `.viewport-wrapper` | coluna, largura máxima, medianiz vertical uniforme | `css/prototipo.css` |
| `.main-layout` | **flexbox** com quebra automática, medianiz única | `css/prototipo.css` |
| `.col-config` | base estreita, cresce, **com teto** | `css/prototipo.css` |
| `.col-results` | base larga, cresce, **sem teto** | `css/prototipo.css` |
| `.config-wrap` | coluna única, mais estreita que o painel | `css/prototipo.css` |
| `.nav-families` | grade de 4 colunas iguais, com trilho | `css/prototipo.css` |
| `.vgrid` / `.mgrid` | grade de 2 colunas iguais | `css/prototipo.css` |
| `.form-grid` | grade elástica por largura mínima de coluna | `css/prototipo.css` |
| `.grid-cfg-steps` | grade elástica, coluna mais larga | `css/prototipo.css` |
| `.dbody` | grade de duas colunas — rótulo fixo · texto elástico | `css/prototipo.css` |
| Grade de verificação | grade elástica, inline no template | `app.js:1450` |
| Fila de resultados de comando | flex com quebra, inline no template | `app.js:1333, 1356, 1368, 1378, 1392` |

**Não há CSS Grid no nível do layout principal** — as duas colunas são flexbox. Grade só nos
agrupamentos internos.

---

## 2. Navegação

| Item | O quê | Onde |
|---|---|---|
| **Navegação principal** | Escolha segmentada de **quatro famílias** — Fresar · Furar · Roscar · Mandrilar. Um nível, sem agrupamento, sem subitem, sem item expansível | `index.html:58-77` |
| Identificação da atual | `.nav-tab.active` + `aria-selected`, alternados em bloco | `app.js:3344-3348` |
| Entrada em Configurações | Botão no cabeçalho, mais dois atalhos contextuais dentro do formulário | `index.html:51`; `app.js:2153, 2161` |
| Saída de Configurações | Botão "voltar", que retorna à **família anterior** | `app.js:3050-3052` |
| Memória de origem | `state.previousTab`, gravado só quando a aba atual não é Configurações | `app.js:3338-3340` |
| Navegação por teclado nas abas | **Não existe.** Só `click` | `app.js:3498` |
| Navegação secundária | **Não existe** — sem abas internas, sem submenu, sem etapas | — |
| Breadcrumb | **Não existe.** A hierarquia tem dois níveis e o botão "voltar" basta | — |
| Filtro persistente como navegação | **Não existe** | — |

---

## 3. Cabeçalho

| Elemento | Finalidade | Onde |
|---|---|---|
| Placa de marca | Identidade do produto | `index.html:47` (`role="img"`), `app.js:2829` |
| Chips de identidade | Resumo do que está montado: material com classe ISO · ferramenta · dimensões. **O conteúdo varia por família** | `renderHeaderZ1()`, `app.js:1088-1229` — ramos em `1120`, `1145`, `1171`, `1196` |
| Ramo vazio dos chips | "Nenhum material selecionado" / "Nenhuma ferramenta selecionada" | `app.js:1114, 1137, 1163, 1188, 1213` |
| Distintivo de margem | Só aparece quando a margem de segurança difere de `100 %` | `app.js:1094-1096` |
| Acesso a Configurações | Botão com ícone e texto | `index.html:51-54` |
| Pesquisa · notificações · perfil | **Não existem.** O produto não tem conta nem usuário | — |
| Indicador de estado no cabeçalho | **Não existe** — o nível de diagnóstico mora na zona de alerta, na coluna de resultado | — |

---

## 4. Conteúdo — seções e agrupamentos

### 4.1 Coluna de configuração
Produzida inteira por `renderConfigForm()` (`app.js:1530-2185`). Três blocos, mais o rodapé de ação:

| Bloco | Cabeçalho | Nasce | Onde |
|---|---|---|---|
| Material | `bhead-material`, recolhível | **fechado** | `app.js:1543-1589` |
| Ferramenta e geometria | `bhead-ferramenta`, recolhível | **aberto** | `app.js:1590-1689` (fresar), `1774` (furar) |
| Ajuste fino | `bhead-ajuste`, recolhível | **aberto** | `app.js:1690-1773` (fresar), `1833` (furar) |
| Rodapé de ação | `.form-actions-group` — comando de cálculo + restaurar padrões | — | `app.js:2032-2050` |

### 4.2 Coluna de resultado
Produzida por `renderCalculatedResults()` (`app.js:1231-1528`), **sete blocos nesta ordem**
(`app.js:1456-1465`):

| Ordem | Bloco | Conteúdo | Onde |
|---|---|---|---|
| 1 | Região viva | Anúncio para leitor de tela, invisível | `app.js:1457` |
| 2 | Tira de status do cálculo | Três ramos: zerado · desatualizado · sincronizado | `app.js:1264-1294` |
| 3 | **Z2** — alerta | Banda com o nível e a condição mais grave ativa | `app.js:1244-1253` |
| 4 | **Z3** — resumo da montagem | Pares compactos `nome valor` | `app.js:1257` |
| 5 | **Z4** — resultados de comando | Cartões altos: rotação, avanço e, na furação, o passo do pica-pau | `app.js:1352, 1362, 1370, 1377-1390` |
| 6 | **Z5** — o que vai acontecer | Gaveta de prosa, nasce recolhida | `app.js:1399-1423` |
| 7 | **Z6** — o que mexer | Gaveta de prosa em quatro partes, nasce recolhida | `app.js:1425-1435` |
| 8 | **Z7** — verificação | Grade de cartões baixos | `app.js:1437-1453` |

**Nota de numeração:** o protótipo produz **sete blocos** onde `E5 §2.2` declara **seis zonas**. A
tira de status e a região viva não existem no escopo; a grade de verificação do protótipo (Z7)
corresponde ao Z5 do escopo. As duas numerações não se alinham e **nenhuma foi renumerada** — a
regra do projeto proíbe.

### 4.3 Área Configurações
Produzida por `renderSettingsView()` (`app.js:2650-3334`). Coluna única, **quatro cartões**:

| Cartão | Conteúdo | Onde |
|---|---|---|
| Materiais | Lista de gavetas, uma por material, com os 5 campos editáveis e o caminho de volta ao valor de fábrica | `app.js:2850-2939` |
| Ferramentas | Lista agrupada por tipo, uma gaveta por ferramenta, mais o formulário de cadastro | `app.js:2940-2980` |
| Margem de segurança | Passo persistente | `app.js:2981-3012` |
| Broca de aço rápido | Três passos persistentes — avanço, divisor e teto do pica-pau | `app.js:3013-3056` |

### 4.4 Títulos
**Não existe nenhum `<h1>` a `<h6>` no painel.** Toda a hierarquia de título é `div` ou `span` com
classe `.lbl`, `.item-nome` ou similar. Registrado como defeito **K** no `00_LEIA-ME.md` §5.2.

---

## 5. Ações

| Papel funcional | Classe | Onde |
|---|---|---|
| **Ação principal** — Calcular | `.btn-cta` (+ `.is-calculated`, `.loading`, `.btn-cta-disabled`) | `app.js:2038`; CSS `css/prototipo.css` |
| Ação secundária larga — Restaurar padrões | `.btn-reset-main` | `app.js:2041`; CSS `css/prototipo.css` |
| Ação primária de formulário | `.btn-primary` | `app.js:2521, 2912` |
| Ação de cancelamento | `.btn-secondary` | `app.js:2522, 2643, 2913` |
| **Ação destrutiva** | `.btn-danger`, sempre dentro de zona de confirmação | `app.js:2642` |
| Ação terciária, sublinhada | `.btn-undo` — reverter campo, reverter tudo | `app.js:2403, 2634, 2680, 2923` |
| Linha-link com ícone | `.linkrow` — atalhos contextuais | `app.js:1572, 1761, 1870, 1928, 2011` |
| Ação de cabeçalho | `.hbtn` | `index.html:51` |
| Voltar | `.config-back` | `app.js:2831` |
| **Passo de campo** | `.sctl .step` | dentro de todo `.sctl` |
| **Passo de resultado** | `.hero-step-btn.btn-step-hero` | `app.js:1314, 1318` |
| Reverter ajuste de resultado | `.btn-revert.btn-revert-hero` | `app.js:1328` |
| Aba de família | `.nav-tab` | `index.html:60-75` |
| Link inline para Configurações | `.btn-link-cfg` — **sem regra CSS**, sobrevive por estilo inline | `app.js:1602, 1786, 1887, 1944` |

**Todo botão é `type="button"`** — não há formulário com envio.

**Ação somente por ícone:** só os passos `−` e `+`, e todos carregam `aria-label` por extenso.

---

## 6. Entrada

| Componente | Marcação | Onde |
|---|---|---|
| **Campo numérico com passo** | `.sctl > .step + .fbox > input.fin + .funit` | fresar `app.js:1621-1667`, furar `1791-1842`, roscar `1899-1911`, mandrilar `1947-1994` |
| Campo simples | `.fbox > input.fin` | `fieldHtml()`, `app.js:2600-2613` |
| Campo de texto | idem, sem unidade | criar material `app.js:2880-2908`; apelido e descrição de ferramenta `2489` |
| **Seleção única** | `.selbox > select.fsel + svg.selcv` | `selectFieldHtml()`, `app.js:2614-2628`; material `1557`, ferramenta `1604`, rosca `1903`, cadastro `2463, 2472`, classe ISO `2886` |
| Valor não editável | `.valor-fixo` | `app.js:2455, 2749, 2764, 2768` |
| Passo fora do campo | `.stepline > .step` + `.stepval > .stepnum` | `stepConfigHtml()`, `app.js:2389-2399` |
| Área de texto · seleção múltipla · caixa de marcação · rádio · interruptor · seletor de data · seletor de período · envio de arquivo · campo com máscara · campo com preenchimento automático | **Não existem** | — |

**Contrato do passo de campo** (`setupStepControls`, `app.js:1055-1085`): lê `data-step`
(0,005 · 0,01 · 0,05 · 0,2 · 0,5 · 1 · 5) e `data-decimals` (0 a 3); piso rígido em zero
(`app.js:1068`); dispara `input` **e** `change` sintéticos (`1059-1060`), o que faz o campo se
comportar igual sendo digitado ou sendo incrementado. `data-min` é lido (`1069`) e **nunca emitido**
— código morto.

**Todo campo numérico tem `inputmode="decimal"`** e `<label for>` (38 pares no total).

---

## 7. Dados

| Componente | Marcação | Onde |
|---|---|---|
| **Cartão alto** — resultado de comando | `.rcard.rcard-hero` | `heroCardHtml()`, `app.js:1297-1345` |
| **Cartão baixo** — verificação | `.rcard` com `.u20` | `app.js:1437-1445` |
| Cartão base | `.card` | 14 pontos, de `index.html:46` a `app.js:3013` |
| Par de resumo | `.z3pair > .z3name` | `app.js:1257` |
| Chip de identidade | `.z1-chip > .zidlbl + .zidval` | `app.js:1104-1219` |
| Lista de gavetas | `.lista-cfg` | `app.js:2820, 2918` |
| Agrupamento por tipo | `.tipo-ferramenta-grupo` — **sem regra CSS** | `app.js:2815-2819` |
| **Tabela** | **Não existe.** Nenhum `<table>` no painel. Toda listagem é lista de gavetas | — |
| Indicador com comparação, tendência ou período | **Não existe** — o produto entrega valor e unidade, sem série temporal | — |

**Por que não há tabela:** as duas listagens do produto — materiais e ferramentas — precisam de
edição no lugar, e cada linha abre num formulário de 5 a 6 campos. Isso é lista expansível, não
tabela. Não há ordenação, seleção múltipla, ação em massa nem paginação em lugar nenhum.

---

## 8. Visualização

**Não existe nenhum gráfico, medidor, barra proporcional, faixa, trilha ou escala no painel.**

A ausência é deliberada e tem razão registrada em três lugares: brief §12 (medidor sugere escala com
teto, e não há limite declarado contra o qual medir), `DESIGN_SYSTEM_FENIX.md` §7 (mesma proibição,
na camada visual) e `GABARITO §2.7` D4 (a trilha de posição relativa foi tirada do MVP em
30/08/2026 e virou função futura).

Restos de CSS de uma trilha que não existe mais: `.faixa-d`, `.faixa-linha`, `.refline` — defeito
**E**.

---

## 9. Feedback

| Componente | Marcação | Duração | Onde |
|---|---|---|---|
| **Banda de alerta** | `.alert-band` + nível | Permanente | `app.js:1244-1253`; CSS `css/prototipo.css` |
| Banda informativa | mesma banda, nível informação — usada quando o material sai da lista | Permanente | `app.js:1550-1553` |
| **Tira de status do cálculo** | `.calc-status-strip` — neutra · `.outdated` · `.in-sync` | Permanente | `app.js:1264-1294`; CSS `css/prototipo.css` |
| Feedback junto ao comando | `.calc-feedback` | Permanente, reescrito a cada validação | `app.js:779-799`; CSS `css/prototipo.css` |
| Feedback de restauração | mesma linha, esmaece | **2.600 ms** | `app.js:1024-1032` |
| **Linha de status de Configurações** | `#cfg-status[role=status][aria-live=polite]`, fixa ao topo | **3.600 ms** | `app.js:2577-2599`; CSS `css/prototipo.css` |
| Anúncio de ajuste | `#hero-live.sr-only[role=status]` — só para leitor de tela | Transitório | `app.js:1457, 1509-1527` |
| Aviso permanente do fornecedor | `.aviso-fornecedor` | Permanente, 2 instâncias | `app.js:2279, 2869, 2960` |
| Pulso de resultado novo | `.calc-pulse` na coluna | Animação | `app.js:874-879`; CSS `css/prototipo.css` |
| Mensagem de erro de campo | `.erro-campo` | Enquanto o erro durar | `app.js:1651`; CSS `css/prototipo.css` |
| **Toast** | **Não existe.** O papel é cumprido pela linha de status, que é ancorada e não flutua | — |

---

## 10. Sobreposição

**Não existe nenhuma sobreposição no painel:** sem modal, sem diálogo, sem gaveta lateral, sem
popover, sem menu suspenso de ações, sem dica flutuante, sem véu de fundo.

Registrado em `DESIGN_SYSTEM_FENIX.md` §7 como decisão: *"não há fluxo modal no produto"*.

Os dois papéis que normalmente pediriam sobreposição são resolvidos no lugar:

| Papel | Como o Fenix resolve | Onde |
|---|---|---|
| Confirmação destrutiva | **Zona de dois toques no lugar** — o botão vira um par confirmar/cancelar dentro do próprio cartão | `app.js:2629-2648`; CSS `css/prototipo.css` |
| Explicação sob demanda | **Gaveta no lugar**, padrão de revelação do WAI-ARIA, nunca dica flutuante | `app.js:1036-1053` |

O único elemento com posicionamento fora do fluxo é a linha de status de Configurações, que é fixa
ao topo da própria coluna — não flutua sobre conteúdo.

---

## 11. Estados

Levantamento completo em [`04_COMPORTAMENTO.md`](04_COMPORTAMENTO.md) §3. Resumo do que existe:

| Estado | Existe | Onde |
|---|---|---|
| Vazio — painel zerado | Sim, é o estado inicial | `app.js:328-425, 3534` |
| Comando desabilitado | Sim | `app.js:750-758` |
| Carregando | Sim, simulado, 240 ms, só no botão | `app.js:855-880` |
| Erro de campo | Parcial — 3 pontos | `app.js:1648, 2604, 3135` |
| Nível crítico | Sim | fresamento `app.js:473-477` (`ae > D`) · roscamento `619-622` (`vc > 40`) |
| Nível atenção | Sim | fresamento `app.js:478-483` e **mandrilamento** `688-696`, os dois por `L/D > 4,0` |
| Sucesso · sincronizado | Sim | `app.js:763-768, 787-790, 1285-1293` |
| **Desatualizado** | Sim, desde 09/09/2026 — `markOutdated()` liga, `executeCalculation` desliga | `app.js:2571-2575`, chamadas em `2581, 3129` |
| Selecionado | Sim, via `<option selected>` | `app.js:1559, 1606, 1905, 2620` |
| Ativo — aba | Sim | `app.js:3344-3348` |
| Ajustado manualmente | Sim | `app.js:1333, 1303, 2198` |
| Fim de curso do passo | Sim | `app.js:1299, 1315, 2380` |
| Confirmação destrutiva | Sim | `app.js:2638-2646` |
| Foco · hover · pressionado | Sim, só em CSS | `css/prototipo.css` e 17 regras de hover |
| Lista vazia | Sim, desde 09/09/2026 — `.estado-vazio` deixou de ser regra sem gerador | `css/prototipo.css` · `app.js:2732` |
| Movimento reduzido | Sim | `css/prototipo.css` |
| Somente leitura | Sim, como `.valor-fixo` | `app.js:2455` |

---

## 12. Responsividade

**Dois mecanismos independentes e sobrepostos.**

### 12.1 Limiares reais — `css/prototipo.css`

| Limiar | O que muda |
|---|---|
| 1.080px | As duas colunas viram uma; os tetos de largura são liberados |
| 720px | As quatro abas viram 2×2 |
| 600px | A medianiz do contêiner encolhe; as grades de 2 colunas viram 1; o cabeçalho vira coluna; a ação de cabeçalho ocupa a largura toda |

### 12.2 Simulação da barra de homologação
Classes no contêiner (`css/prototipo.css`), alternadas em `app.js:3520-3530`, com overrides próprios de
celular em `css/prototipo.css`. **Necessários porque o limiar olha a janela, não o contêiner.**

**Duas lacunas, defeito D:** não existe override de tablet — em 834px simulado as colunas continuam
lado a lado; e o celular simulado entregava 420px onde a barra anuncia 390px. **Fechada em
09/09/2026** — a simulação espelha os três limiares e as duas larguras batem com o rótulo.

**Não há container query em lugar nenhum.** O que faz o layout quebrar naturalmente é a quebra do
flexbox quando as duas bases não cabem.

---

## 13. Acessibilidade

| Recurso | Quanto | Onde |
|---|---|---|
| `role=` | 7 no HTML, 2 no JS | `index.html:12, 47, 59, 60-75`; `app.js:1457, 2837` |
| `aria-live="polite"` | 2 | `app.js:1457, 2837` |
| `aria-expanded` + `aria-controls` | 26 pares | todo `.bhead` e `.dtrigger`; sincronizados em `app.js:1042, 1048` |
| `aria-selected` | 4 | `app.js:3347` |
| `aria-label` | 49 no JS, 9 no HTML | passos, selects sem rótulo visível |
| `aria-hidden="true"` | 18 | ícones e separadores decorativos |
| `aria-disabled="true"` | 3 | acompanha `disabled` no fim de curso |
| `<label for>` | 37 no JS, 1 no HTML | `app.js:2603, 2617` e todos os campos do painel |
| Foco visível global | 1 regra | `css/prototipo.css` |
| Foco no contêiner do campo | 2 regras | `css/prototipo.css` — `.sctl:focus-within` e `.fbox:focus-within` |
| Alvo de toque | token de 44px | aplicado em 9 componentes |
| Gestão de foco após re-render | 2 pontos | `app.js:2555-2562, 3140` |
| Classe só para leitor de tela | `.sr-only` | `css/prototipo.css` |
| `inputmode="decimal"` | todos os numéricos | — |
| Movimento reduzido | 1 regra | `css/prototipo.css` |

**O que falta**, item a item, em [`04_COMPORTAMENTO.md`](04_COMPORTAMENTO.md) §9. Em uma linha:
zero `tabindex`, nenhum `role="tabpanel"`, nenhuma navegação por setas, nenhum `aria-invalid`,
nenhum `aria-required`, nenhum título de documento, nenhum atalho de salto.

---

## 14. Conteúdo e linguagem

| Item | Onde |
|---|---|
| Formatação numérica pt-BR | `formatInt`, `formatDec`, `parseBrNum`, `valStr` — `app.js:22-62` |
| Explicação de quatro partes por parâmetro | `gavetasInstrucao` — 5 verbetes (`vc`, `fz`, `ae`, `ap`, `fn`) com as chaves *o que é · ao aumentar · ao diminuir · equilíbrio* | `mock-data.js:427-464` |
| Direção de ajuste em quatro partes | título · ação · explicação · contrapartida | `app.js:1411-1421` |
| Previsão de comportamento | `oQueVaiAcontecer[]`, por cenário | `mock-data.js` |
| Aviso do fornecedor | constante única | `app.js:2279` |
| Rótulo de grandeza | nome por extenso + símbolo entre parênteses | ubíquo |
| Resumo compacto | exceção autorizada — `Ø10 · Z4 · L45` | `app.js:1257`, `.bsum` |

**As mensagens são dados, não código.** Vivem em `mock-data.js` e em constantes de `app.js`, não
interpoladas no meio do template — o que já é metade do caminho para internacionalização, se um dia
existir.

---

## 15. Tokens

| Categoria | O que existe | Onde |
|---|---|---|
| Espaçamento | `--sp-1` a `--sp-7` — **declarados e nunca referenciados**; todo espaçamento é literal | `css/prototipo.css` |
| Raio | `--r-chip`, `--r-field`, `--r-card` usados; `--r-pill` **nunca** | `css/prototipo.css` |
| Duração | `--t-control`, `--t-panel` | `css/prototipo.css` |
| Dimensão | `--h-target` (44px), `--h-cta` (52px) — aplicados em 9 componentes | `css/prototipo.css` |
| Cor, tipografia, superfície, sombra | Existem, e **pertencem à camada de aparência** | `../DESIGN_SYSTEM_FENIX.md` |
| Elevação, camada, breakpoint | **Não existem como token.** Sombra é literal; não há empilhamento; os limiares são literais nas consultas de mídia | — |

**Os valores concretos dos tokens estruturais estão em [`02_ESTRUTURA.md`](02_ESTRUTURA.md) §8**, com
o nome semântico que cada um deveria ter.

---

## 16. Agrupamento — o que hoje é cópia e deveria ser um componente

Etapa 2 do processo. Cada linha é markup repetido que se comporta igual em todos os pontos: a
diferença entre eles é **de dado, não de comportamento**.

| O que se repete | Quantas vezes | Onde |
|---|---|---|
| Bloco "ferramenta cadastrada + geometria vinculada" | **4×** | `app.js:1599-1614, 1783-1798, 1884-1899, 1941-1956` |
| Linha-link de restaurar padrões | **5×** | `app.js:1572, 1761, 1870, 1928, 2011` |
| Rodapé de gaveta explicativa | **5×** | as gavetas de `vc`, `fz`, `ae`, `ap`, `fn` |
| Ramo vazio dos chips de identidade | **4×**, um por família | `app.js:1114, 1137, 1163, 1188, 1213` |
| Cartão alto de resultado | 3 instâncias de um mesmo gerador — **já resolvido** | `heroCardHtml()`, `app.js:1297` |

**Estilo inline dentro dos templates** é o obstáculo real à extração: `style="display:flex…"`,
`style="color:…"` e similares aparecem em dezenas de pontos (`app.js:1107, 1247, 1335, 1450, 1543,
1612, 2507, 2816` entre outros). **Todo esse layout precisa virar classe antes de virar componente.**

**Um caso de nome único para dois componentes:** `.bhead` é `<button>` interativo em `app.js:1544` e
`2851`, e `<div>` estático em `2982` e `3014`. São dois componentes com o mesmo nome — separados em
[`03_COMPONENTES.md`](03_COMPONENTES.md).

---

## 17. O que o pedido menciona e o painel não tem

Registrado para que ninguém procure, e para que a ausência seja decisão consciente e não esquecimento.

| Não existe | Razão registrada |
|---|---|
| Gráfico, medidor, barra proporcional, escala | brief §12 · `DESIGN_SYSTEM_FENIX.md` §7 · `GABARITO` D4 |
| Tabela | Toda listagem precisa de edição no lugar — ver §7 |
| Modal, diálogo, gaveta lateral, popover, dica flutuante, véu | `DESIGN_SYSTEM_FENIX.md` §7 |
| Menu de ações, menu contextual, submenu, separador | Nenhuma tela tem mais de duas ações por objeto |
| Paginação, carregamento progressivo, rolagem infinita | 12 materiais e 27 ferramentas — volumetria do brief §6 não pede |
| Pesquisa | idem |
| Breadcrumb | Dois níveis de hierarquia |
| Toast | O papel é da linha de status ancorada |
| Filtro | A única filtragem é implícita: o material escolhido determina as ferramentas oferecidas |
| Caixa de marcação, rádio, interruptor, seletor de data, envio de arquivo | Nenhuma entrada do brief §5.1 é desse tipo |
| Conta, perfil, permissão, papel de usuário | Não há backend nem conta — `ADR-0001` |
| Notificação | Não há evento assíncrono no produto |
| Estado desabilitado como padrão do sistema | `DESIGN_SYSTEM_FENIX.md` §7: *"campo que não se aplica não existe em vez de aparecer apagado"* |

**A regra que governa esta tabela:** ausência com razão registrada é decisão de produto. Reabrir
qualquer linha exige o Mestre nomear a tarefa.
