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
