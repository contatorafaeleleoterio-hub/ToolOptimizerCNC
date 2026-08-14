# Contrato de `data-testid` — Gauntlet Loop v2

> **Finalidade:** Estabilizar os seletores de elementos HTML utilizados pela suíte automatizada Playwright (`tests/gauntlet.spec.ts`) contra os 24 cenários de verificação declarados no plano de execução.
> **Regra para o Builder:** Todos os elementos abaixo devem possuir a propriedade `data-testid="..."` exata como descrita nesta tabela.

---

## Tabela de Seletores

| `data-testid` | Elemento de UI | Usado pelos Cenários |
|---|---|---|
| `select-familia` | Seletor dropdown da Família de Operação (Fresar, Furar, Roscar, Mandrilar) | T01, T02, T04, T12-T22 |
| `select-tipo-ferramenta` | Seletor dropdown do Tipo de Ferramenta (18 tipos) | T01, T03, T04, T12-T22 |
| `select-material-peca` | Seletor de Material da Peça (12 materiais ISO P/M/K/N/S/H) | T01, T12, T20, T23 |
| `select-material-ferramenta` | Seletor de Material da Ferramenta (HSS, HSS-Co, MD, MD revestido) | T01, T12 |
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

### Escolha segmentada — mudança de contrato

Quatro controles deixam de ser `<select>` e viram grupo de rádios. **O `data-testid`
permanece no mesmo nome, mas passa a ficar no CONTAINER do grupo**; cada `<input type="radio">`
dentro dele carrega o `value` que o `<option>` carregava antes.

| `data-testid` | Vira | Opções |
|---|---|---|
| `select-familia` | grupo de rádios | `fresar`, `furar`, `roscar`, `mandrilar` |
| `select-operacao` | grupo de rádios | `desbaste`, `semi`, `acabamento` |
| `select-material-ferramenta` | grupo de rádios | `HSS`, `HSS_CO`, `MD`, `MD_REV` |
| `input-angulo-broca` | grupo de rádios | os ângulos do tipo selecionado; 1 opção → texto fixo, sem seletor |

Continuam `<select>` (acima do corte de 5 opções ou com rótulo longo):
`select-tipo-ferramenta`, `select-material-peca`, `select-designacao-rosca`.

O helper `escolher()` de `tests/helpers.ts` fala com as duas formas — é o que mantém a
regressão verde durante a transição.

### Blocos do formulário (a ordem é verificada)

| `data-testid` | Conteúdo |
|---|---|
| `bloco-contexto` | perfil de máquina + fator de segurança (recolhível) |
| `bloco-categorico` | família, tipo, material da peça, material da ferramenta, operação |
| `bloco-geometrico` | campos dimensionais do tipo; cada campo é um filho com classe `.row`, oculto com `.hidden` |
| `bloco-ajuste-fino` | os 4 controles de ajuste |

### Perfil de máquina

`input-maquina-rpm` · `input-maquina-potencia` · `input-maquina-torque` · `input-maquina-avanco`

### Ajuste fino — um conjunto por parâmetro (`vc`, `fz`, `ae`, `ap`)

| Padrão | Elemento |
|---|---|
| `slider-{p}` | `<input type="range">` do parâmetro |
| `valor-{p}` | valor numérico exibido, atualiza ao arrastar |
| `barra-estado-{p}` | barra de estado do parâmetro |
| `ajuda-{p}` | botão `ⓘ` — `aria-expanded`, `aria-controls` apontando para o popover |
| `popover-{p}` | painel de ajuda, `aria-live="polite"` |

### Indicadores

`gauge-eficiencia-avanco` · `gauge-mrr` · `gauge-saude`, cada um com `{gauge}-valor` para o número central.

### Procedência

`procedencia-rpm` · `procedencia-avanco` · `procedencia-potencia` · `procedencia-torque` —
o gatilho que leva da leitura à fórmula e à fonte do dado.

### Saídas com estado velho

Todo resultado ganha a classe `stale` enquanto houver alteração pendente de cálculo.
A classe já existe no mockup para valor não finito; passa a valer também para "resultado
desatualizado, clique em Calcular".
