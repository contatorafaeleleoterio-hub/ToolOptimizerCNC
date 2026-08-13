# Cenários de teste — T01-T13

> Em português, espelhados 1:1 em `gauntlet.spec.ts`. Nenhum cenário novo entra sem passar por aqui primeiro.

## T01 — Fluxo básico
Abrir o mockup → escolher Operação = Fresar → Ferramenta = Fresa inteiriça MD topo →
Material da peça = aço carbono → Ø = 10mm → clicar Calcular → RPM e Avanço aparecem
com valor numérico > 0.

## T02 — Troca de ferramenta
Com T01 já calculado, trocar Ferramenta para Macho (Roscar) → tela não recarrega →
campos específicos da fresa (κ, ae) somem → campos do macho (passo) aparecem.

## T03 — Alteração de parâmetros
Alterar Ø de 10 para 12mm → clicar Calcular novamente → RPM muda (proporcional a 1/D).

## T04 — Campos obrigatórios
Limpar o campo Ø e tentar calcular → sistema não deixa calcular com Ø vazio/zero,
mostra aviso, não gera resultado com NaN.

## T05 — Valores inválidos
Digitar Ø = -5 (negativo) → sistema rejeita ou trata como inválido, sem crash e sem
resultado numérico visível baseado no valor negativo.

## T06 — Valores extremos
Digitar Ø = 200mm com balanço alto → sistema calcula L/D, mostra alerta vermelho ou
bloqueado (L/D > 6), não deixa passar como se fosse seguro.

## T07 — Repetição
Calcular duas vezes seguidas com os mesmos valores → resultado idêntico nas duas vezes
(determinístico, sem drift).

## T08 — Navegação
Usar Tab para percorrer os campos do trilho de contexto e dos parâmetros → foco visível
e ordem lógica (contexto → comuns → específicos).

## T09 — Interface
Redimensionar/verificar que RPM e Avanço aparecem sempre na mesma região da tela
(coluna direita), independente da ferramenta escolhida.

## T10 — Troca de material da ferramenta
Broca Ø10, mesmo material de peça, calcular com HSS → anotar Vc e RPM. Trocar só o
material da ferramenta para Metal duro → Vc e RPM aumentam na proporção do fator
(metal duro / HSS ≈ 1,00 / 0,29 ≈ 3,45×), com tolerância de arredondamento.

## T11 — Campos específicos ao trocar tipo
Selecionar Fresar → Fresa inteiriça → calcular. Trocar para Roscar → Macho →
passo (P) aparece, κ (ângulo de posição, exclusivo do cabeçote) não está mais visível,
Ø e material da peça permanecem com os valores já preenchidos (não resetam).

## T12 — Modo rápido
Ativar toggle "Rápido" → preencher só Material da peça + Ø + Operação (3 campos) →
resultado (RPM, Avanço) aparece sem preencher mais nenhum campo.

## T13 — Furo de macho
Selecionar Roscar → Macho de corte → M10×1,5 (via tabela ou passo manual) →
Ø da broca de furo prévio calculado = 8,5mm (D − P = 10 − 1,5).

---

## Critérios de falha crítica (afeta Gate 2 e 4)

- Qualquer cenário que produza `NaN`, `undefined` ou `Infinity` visível na tela
- Qualquer erro JavaScript não tratado no console durante a execução do cenário
- Botão Calcular sem resposta (nenhuma mudança de estado observável)
