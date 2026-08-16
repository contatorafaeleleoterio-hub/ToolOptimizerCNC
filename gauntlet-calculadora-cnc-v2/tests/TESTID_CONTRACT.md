# Contrato de `data-testid` — Gauntlet Loop v2

> **Finalidade:** Estabilizar os seletores de elementos HTML utilizados pela suíte automatizada Playwright (`tests/gauntlet.spec.ts`) contra os 24 cenários de verificação declarados no plano de execução.
> **Regra para o Builder:** Todos os elementos abaixo devem possuir a propriedade `data-testid="..."` exata como descrita nesta tabela.

---

## Tabela de Seletores

| `data-testid` | Elemento de UI | Usado pelos Cenários |
|---|---|---|
| `select-familia` | Seletor do **Tipo de Usinagem** (Fresar, Furar, Roscar, Mandrilar). O rótulo visível mudou em 15/08/2026; **o testid não** — trocá-lo quebraria 23 cenários sem ganho | T01, T02, T04, T12-T22 |
| `select-tipo-ferramenta` | Seletor da **Ferramenta**: 33 entradas (17 geometrias × substratos), agrupadas por `<optgroup>` de geometria | T01, T03, T04, T12-T22 |
| `select-material-peca` | Seletor de Material da Peça (12 materiais ISO P/M/K/N/S/H) | T01, T12, T20, T23 |
| `select-operacao` | Seletor do Tipo de Operação (Desbaste, Semi-acabamento, Acabamento) | T01, T04, T23 |
| `input-diametro` | Input do Diâmetro Nominal $D$ (mm) | T01, T08, T09, T10, T13-T23 |
| `input-arestas` | Input do Número de Arestas / Insertos ($Z$) | T01, T12, T15, T16 |
| `input-balanco` | Input do Balanço / Stickout da ferramenta $L$ (mm) | T01, T10, T22 |
| `input-ap` | Input da Profundidade Axial de corte $ap$ (mm) | T01, T13, T14, T15, T16, T22 |
| `input-ae` | Input do Engajamento Radial $ae$ (mm) | T01, T14, T16 |
| `input-raio-canto` | Input do Raio de Canto $r$ (mm, fresa toroidal) | T14 |
| `input-angulo-posicao` | Input do Ângulo de Posição $\kappa$ (°, alto avanço e cabeçote) | T15, T16 |
| `input-passo-rosca` | Input do Passo de Rosca $P$ (mm, família roscar) | T19, T20, T21 |
| `input-diametro-inicial` | Input do Diâmetro Inicial do Furo (mm, mandrilar) | T22 |
| `input-diametro-final` | Input do Diâmetro Final Desejado (mm, mandrilar) | T22 |
| `input-fator-seguranca` | Input / Slider do Fator de Segurança (50%–100%) | T24 |
| `toggle-modo-rapido` | Botão / Switch de alternância para Modo Rápido (3 campos) | T23 |
| `resultado-rpm` | Exibição da Rotação calculada $n$ (rpm) | T01–T24 |
| `resultado-avanco` | Exibição do Avanço de mesa calculado $Vf$ (mm/min) | T01–T24 |
| `resultado-furo-previo` | Exibição do Diâmetro de Furo Prévio calculado (mm) | T19, T20 |
| `resultado-tempo-furo` | Exibição do Tempo de Furação calculado $t$ (min) | T01, T04 |
| `resultado-potencia` | Exibição da Potência de Corte calculada $Pc$ (kW) | T01, T24 |
| `resultado-torque` | Exibição do Torque calculado $Mc$ (Nm) | T01, T11, T19, T24 |
| `resultado-mrr` | Exibição da Taxa de Remoção de Material $Q$ (cm³/min) | T01 |
| `resultado-indice-saude` | Medidor / Valor do Índice de Saúde dos parâmetros (0–100) | T24 |
| `badge-alerta-seguranca` | Banner / Chip do Semáforo (Verde, Amarelo, Vermelho, Bloqueado) | T10, T11, T16, T17, T20, T22, T24 |
| `badge-material-estimado` | Badge indicador de material com parâmetros estimados | T01, T12 |
| `cartao-formula` | Container expansível exibindo fórmula e substituição numérica | T01, T04 |
| `btn-calcular` | Botão que dispara o cálculo | T01–T24, R01–R17 |

---

## Adendo do refactor visual (R01–R17)

> **Congelado junto com a suíte.** O Builder implementa exatamente estes nomes.

### Testid removido

| `data-testid` | O que houve |
|---|---|
| `select-material-ferramenta` | **Deixou de existir** (SPEC §3.2, decidido em 15/08/2026). O substrato virou parte do nome da ferramenta em `select-tipo-ferramenta`. Nenhum cenário pode voltar a procurá-lo; nenhum elemento pode voltar a carregá-lo |

### Escolha segmentada — mudança de contrato

**Três** controles deixam de ser `<select>` e viram grupo de rádios (eram quatro; o material da
ferramenta saiu). **O `data-testid` permanece no mesmo nome, mas passa a ficar no CONTAINER do
grupo**; cada `<input type="radio">` dentro dele carrega o `value` que o `<option>` carregava antes.

| `data-testid` | Vira | Opções |
|---|---|---|
| `select-familia` | grupo de rádios | `fresar`, `furar`, `roscar`, `mandrilar` |
| `select-operacao` | grupo de rádios | `desbaste`, `semi`, `acabamento` |
| `input-angulo-broca` | grupo de rádios | os ângulos do tipo selecionado; 1 opção → texto fixo, sem seletor |

Continuam `<select>` (acima do corte de 5 opções ou com rótulo longo):
`select-tipo-ferramenta`, `select-material-peca`, `select-designacao-rosca`.

O helper `escolher()` de `tests/helpers.ts` fala com as duas formas — é o que mantém a
regressão verde durante a transição.

### Blocos do formulário (a ordem é verificada)

| `data-testid` | Conteúdo |
|---|---|
| `bloco-contexto` | perfil de máquina + fator de segurança. Recolhível, **começa expandido** — `T24` e `R09` preenchem campos aqui dentro, e `page.fill` falha em elemento oculto |
| `bloco-categorico` | tipo de usinagem, ferramenta, *(separador)*, material da peça, operação — **quatro campos**, sem material da ferramenta |
| `bloco-geometrico` | campos dimensionais do tipo; cada campo é um filho com classe `.row`, oculto com `.hidden` |
| `bloco-ajuste-fino` | os 4 controles de ajuste |

### Perfil de máquina

`input-maquina-rpm` · `input-maquina-potencia` · `input-maquina-torque` · `input-maquina-avanco`

### Ajuste fino — slider de agressividade

| `data-testid` | Elemento |
|---|---|
| `slider-agressividade` | `<input type="range">` 0–100%, conservador ↔ produtivo. Nasce no recomendado, move Vc/fz/ae/ap juntos. Só existe na família **fresar** (é onde os 4 parâmetros existem) |
| `valor-agressividade` | percentual exibido; mostra **misto** quando um controle individual foi mexido depois |
| `procedencia-agressividade` | gatilho da gaveta que mostra o que cada parâmetro virou e por quê |

### Ajuste fino — um conjunto por parâmetro

`{p}` ∈ `vc` · `fz` · `ae` · `ap` · **`fn`** (furar com `fnManual` e mandrilar) · **`passo`**
(roscar, travado). Fresa de topo usa os quatro primeiros — é o que `R01`, `R02` e `R04` medem.

| Padrão | Elemento |
|---|---|
| `slider-{p}` | `<input type="range">` do parâmetro, com `min`/`max`/`step` do §5.1 do contrato |
| `valor-{p}` | valor numérico exibido, atualiza ao arrastar |
| `barra-estado-{p}` | barra de estado do parâmetro |
| `ajuda-{p}` | botão `ⓘ` — `aria-expanded`, `aria-controls` apontando para o popover |
| `popover-{p}` | painel de ajuda, `aria-live="polite"` |

`slider-passo` é leitura travada (`disabled` ou `readonly`): o avanço do macho é `P × n`.

`botao-recomendado-{p}` volta um parâmetro ao recomendado; `botao-recomendado-tudo` volta todos, no
rodapé do bloco. A gaveta de ajuda (`popover-{p}`) é **inline** e **várias podem ficar abertas ao
mesmo tempo** — não há mais "uma por vez" nem fechamento por clique fora.

### Edição reversa dos números-herói

| `data-testid` | Elemento |
|---|---|
| `input-resultado-rpm` | campo editável do RPM, sobre `resultado-rpm`. Inverte `Vc = π·D·n/1000` e trava em `maxRPM` |
| `input-resultado-avanco` | campo editável do Avanço. Inverte `fz`/`fn` e trava em `maxFeed`. **Inerte na família roscar** — `Vf = P × n` é imposto pela rosca |
| `badge-forcado` | marca de override de limite físico no resultado |

### Gavetas de bloco

| `data-testid` | Elemento |
|---|---|
| `gaveta-{bloco}` | cabeçalho clicável de `contexto`, `categorico`, `geometrico`, `ajuste-fino`. `aria-expanded`, alvo ≥44px, resumo do conteúdo quando recolhido |

Teto de **4 gavetas**, sem gaveta aninhada. Ação e painel de resultados não são colapsáveis.
`bloco-contexto` começa **expandido** — `T24` e `R09` preenchem campos lá dentro.

### Indicadores

`gauge-eficiencia-avanco` · `gauge-mrr` · `gauge-saude`, cada um com `{gauge}-valor` para o número central.

### Procedência

`procedencia-rpm` · `procedencia-avanco` · `procedencia-potencia` · `procedencia-torque` —
o gatilho que leva da leitura à fórmula e à fonte do dado.

### Saídas com estado velho

Todo resultado ganha a classe `stale` enquanto houver alteração pendente de cálculo — **a janela
entre a mudança e o resultado novo**, não um estado de espera por clique. Com o recálculo híbrido
(SPEC §6.6), `stale` só persiste antes do primeiro Calcular; depois dele o painel é vivo e a janela
dura o tempo do recálculo.

**A classe vai no próprio elemento do `data-testid`, não num container acima** — `R03` faz
`expect(resultado-rpm).toHaveClass(/stale/)` no elemento, e classe no pai não conta.

**Não recebem `stale`:** `badge-alerta-seguranca` e o chip de nível. Apagar alarme ativo contraria
o ISA-101 — o alerta continua legível enquanto o número envelhece.

### Preservados do mockup atual (a regressão depende deles)

`texto-fonte-vc` (procedência do Vc, usado por `R14` e `R17`) · `badge-material-estimado` ·
`cartao-formula` · `toggle-modo-rapido`. Reorganizar a tela não pode perder estes nomes.
