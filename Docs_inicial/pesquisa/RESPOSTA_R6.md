<!-- CABECALHO DE PROCEDENCIA - adicionado ao arquivar. O corpo abaixo esta INTACTO. -->
# RESPOSTA R6 - Rigidez, Deflexao e Vida da Ferramenta

> **Retorno cru.** Nao editado. Vale por ser cru - e registro de procedencia.
> **Rodada:** R6. **Pesquisador unico** - sem par cego, por decisao registrada.
> **Territorio:** amplo, com nivel de fonte declarado (1 norma / 2 handbook /
> 3 artigo revisado / 4 catalogo de fabricante).
> **Ferramenta:** IA externa (o retorno se identifica como "Manus AI").
> **Data da pesquisa declarada:** 20/08/2026. **Arquivado:** 20/08/2026.
> **Titulo original:** "Pesquisa profunda - constantes e regras para calculo de
> deflexao, vida de ferramenta e refrigeracao em fresamento CNC".
>
> **ATENCAO AO AUDITOR - divergencia conhecida a confrontar:**
> Esta rodada apurou o modulo de elasticidade do metal duro de forma independente.
> A rodada R3 ja havia apurado o mesmo valor por outro caminho, e o numero NAO foi
> informado no enunciado desta rodada - a omissao foi deliberada, para permitir
> confirmacao independente. Os dois resultados **divergem**. Confronte
> `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` secao 2.2 contra o Bloco 1 deste retorno
> antes de escrever o canonico de deflexao. A deflexao e inversamente proporcional
> a esse valor.

---

# Pesquisa profunda — constantes e regras para cálculo de deflexão, vida de ferramenta e refrigeração em fresamento CNC

**Autor:** Manus AI  
**Idioma:** português do Brasil  
**Data da pesquisa:** 20 de agosto de 2026  
**Escopo:** fresa inteiriça de metal duro, topo reto, toroidal e esférica; extensão futura para furação com HSS e HSS ao cobalto.

## Resumo executivo

A apuração fecha apenas parte das travas com números suficientemente auditáveis. Para uma fresa inteiriça WC-Co, a literatura aberta verificável confirma um **diâmetro equivalente `De ≈ 0,8D`** para fresas de dois e quatro canais no estudo de Kops e Vo; esse valor deve ser tratado como **referência única**, não como constante universal para todas as geometrias. Para o módulo elástico, fontes abertas fornecem uma faixa comercial de aproximadamente **466,0–516,5 GPa** para WC-Co e valores de cerca de **523–577 GPa** em ensaios de composições com diferentes teores de Co e granulometrias, mas não foi recuperada uma tabela completa e auditável por grau/teor de Co. Um default de `E = 500 GPa` pode ser usado somente como **valor derivado de implementação**, não como grau publicado; dentro dos valores verificados, o erro induzido na deflexão fica aproximadamente entre **−6,8% e +15,4%**, mas a lacuna por grau continua aberta.[1] [2] [3] [4]

A razão `Fr/Fc` não deve ser fixada em `0,3–0,5` sem calibração. Modelos acadêmicos usam um coeficiente radial proporcional à força tangencial, mas o coeficiente depende do par ferramenta–material, da geometria helicoidal, do engajamento e da posição instantânea do dente. A força varia durante a passagem do dente; portanto, para a verificação de flexão máxima, a calculadora deve usar força radial de pico ou uma envoltória conservadora, desde que o modelo de força esteja calibrado. Sem `Fr/Fc`, a função não pode produzir uma deflexão fisicamente auditável.[5] [6] [7]

Para Taylor, a aritmética presumida está correta: com `n = 0,25`, elevar `Vc` em 20% produz `T/Tref = 0,4823`; com `n = 0,125`, produz `0,2326`. Contudo, esses dois expoentes não foram confirmados como valores universais no território permitido. A evidência consultada mostra que `n` depende da combinação ferramenta–peça e das condições; a literatura também usa a forma estendida `V T^n f^a ap^b = C`. O produto deve mostrar **vida relativa condicional**, identificando `n`, material da peça, grau/revestimento e `Tref`, e não deve exibir “metade da vida” como regra geral.[8] [9] [10]

Na refrigeração, não foi encontrada uma regra auditável que converta refrigeração interna em um multiplicador universal de profundidade sem ciclo pica-pau, avanço ou velocidade. Alta pressão é uma categoria distinta da simples existência de canais internos: a Sandvik informa capacidade usual de 70/80 bar e aplicações de até 150 bar, mas também ressalta que pressão e vazão dependem da ferramenta, do bico, do material, da profundidade e do avanço. A refrigeração interna deve alterar a recomendação somente quando a tabela do fabricante ou um ensaio específico publicar o ganho para a combinação exata.[11] [12] [13]

> **Regra de produto recomendada:** quando uma trava permanecer sem fonte, mostrar a variável ou a deflexão calculada apenas até o último ponto auditável e exibir “dados insuficientes para julgamento”; não substituir uma lacuna por um default silencioso.

---

# Bloco 1 — Questão 1a: módulo de elasticidade

**Veredito:** não foi possível fechar uma matriz completa de `E` por teor de Co e grau comercial; recomenda-se `E = 500 GPa` somente como default derivado e explicitamente provisório para fresa geral WC-Co, com o grau real solicitado sempre que disponível.  
**Confiança:** `SEM CONSENSO` para um único `E` universal; `REFERÊNCIA ÚNICA` para cada valor individual abaixo.

## Valor ou regra

O modelo usa `E` em MPa. Portanto, um valor de implementação de `500 GPa` equivale a `500.000 MPa`. Esse valor **não é apresentado como um grau específico por uma fonte**; ele é uma escolha derivada do intervalo comercial aberto de `466,0–516,5 GPa` citado para WC-Co. O relatório recomenda que a interface o rotule como `default derivado`, e não como “módulo do metal duro” sem qualificação.[1]

As fontes mostram a tendência física esperada: aumentar a fração de Co, a fase ligante mais macia, tende a reduzir o módulo; tamanho de grão e microestrutura também influenciam. Kanno e colaboradores mediram ligas WC–(1–30) wt.% Co por ressonância dinâmica e relataram dependência dos módulos em relação às frações volumétricas das fases, dentro dos limites de Hashin–Shtrikman. A página aberta não fornece a tabela numérica completa por teor de Co, portanto ela não pode ser usada para preencher células ausentes.[2]

Okamoto et al. ensaiaram composições com 5, 10, 15 e 20 wt.% Co e tamanhos de grão WC de aproximadamente 3–30 µm. O trecho aberto recuperado informa cerca de `577 GPa` para grãos de 3–20 µm e `523 GPa` para grão de 30 µm, além de afirmar que o módulo é inversamente proporcional ao teor de Co. Como a tabela completa por composição não ficou acessível, esses valores devem ser tratados como referências de estudo, não como tabela de grau.[3]

Ratov et al. citam para WC-Co comercial valores típicos de `466,0–516,5 GPa`. O artigo estudado inclui reforço de zircônia estabilizada por ítria, de modo que sua redução de aproximadamente 10% de `EIT` com 10 wt.% de ZrO₂ não deve ser transferida para uma fresa WC-Co pura. A faixa citada é útil como contexto de ordem de grandeza, mas não como especificação de todos os graus.[1]

Para aço rápido, a página técnica da Hudson Tool Steel informa `E = 207 GPa` para AISI M2, cuja composição nominal publicada inclui C 0,85%, Mn 0,28%, Si 0,30%, Cr 4,15%, W 6,15%, Mo 5,00% e V 1,85%. Para o HSS ao cobalto M42, a mesma fonte informa `E = 207 GPa` e Co 8,00%, com composição nominal C 1,08%, Si 0,45%, Cr 3,85%, W 1,50%, Mo 9,50% e V 1,20%. Esses dois valores são de nível 4 e não devem ser generalizados para qualquer HSS, tratamento térmico ou condição de temperatura.[14]

> “The ‘equivalent diameter’ De, i.e. the diameter of a solid cylinder yielding the same deflection under identical loading conditions as the cutter…” — Kops e Vo, definição de diâmetro equivalente.[4]

## Sensibilidade

Como `δ ∝ 1/E`, o erro relativo de deflexão produzido por um `E` de implementação é calculado por `δcalc/δreal = Ereal/Ecalc`. Com `Ecalc = 500 GPa`, os valores abertos de `466–516,5 GPa` produzem aproximadamente `−6,8%` a `+3,3%` de diferença na deflexão calculada. Incluindo os valores de Okamoto `523–577 GPa`, a faixa passa aproximadamente a `+4,6%` a `+15,4%`. Portanto, **dentro desse conjunto de fontes verificadas**, o default derivado fica dentro da margem de erro declarada de ±15–25%, embora a dispersão real por grau não possa ser fechada sem a tabela de composição correta.

A diferença entre HSS/M2 ou M42, `207 GPa`, e WC-Co na ordem de `500 GPa` é grande. Usar o valor de WC-Co para HSS subestimaria a deflexão aproximadamente por um fator `207/500 = 0,414`, ou seja, apresentaria uma deflexão cerca de 58,6% menor que a correspondente a `E = 207 GPa`. Esse cálculo é consequência direta da equação e não uma recomendação de ferramenta.[14]

## Fontes

As fontes específicas são [1], [2], [3] e [14]. A página de Kanno foi usada para confirmar a faixa de composição estudada e a dependência por fração de fases, mas não para inventar uma tabela ausente. A recomendação de `500 GPa` deve aparecer no software como **default derivado de faixa**, com opção de substituição por grau de catálogo.

---

# Bloco 2 — Questão 1b: diâmetro efetivo, canais, viga escalonada e haste reduzida

**Veredito:** `De/D = 0,8` é publicável para fresas de dois e quatro canais no estudo de Kops e Vo; a dependência para outros números/profundidades de canal e o erro de uma viga simples em relação a uma viga escalonada permanecem sem base quantitativa.  
**Confiança:** `REFERÊNCIA ÚNICA` para `De/D ≈ 0,8`; `NÃO ENCONTRADO` para uma lei universal por número e profundidade de canal.

## Valor ou regra

Kops e Vo definiram `De` como o diâmetro de um cilindro maciço que produz a mesma deflexão sob carregamento idêntico e, portanto, o mesmo momento de inércia equivalente. O estudo combinou ensaios com extensômetros e modelo de elementos finitos e encontrou `De ≈ 80%` do diâmetro da fresa para fresas de dois e quatro canais. A razão `De/D` pode ser interpretada como fator de forma nesse domínio experimental.[4]

A evidência não fecha a pergunta sobre seis ou mais canais, sobre geometrias de desbaste e acabamento, nem sobre profundidade de canal. Kivanc e Budak modelaram fresas de dois, três e quatro canais para obter momentos de inércia e deflexões, mas o trecho aberto não publica uma fração única aplicável a cada número de canais. O artigo de modelagem helicoidal de Li et al. trata a hélice como uma sequência de elementos oblíquos, integrando geometria e forças ao longo da aresta; isso indica que a seção resistente deve ser função de `z`, não apenas de um diâmetro nominal.[5] [7]

Para a ferramenta com haste cilíndrica e parte cortante canalizada, o modelo fisicamente mais correto é uma **viga escalonada ou de seção variável**, com `I(z)` e possivelmente `E(z)`. Uma viga simples com a seção mais fraca somente pode ser justificada como aproximação conservadora depois de um estudo da proporção de comprimentos. A pesquisa não encontrou um valor publicado do erro dessa simplificação dentro do território permitido. Portanto, o software deve manter a opção “modelo simples” identificada como aproximação e não declarar que o erro está dentro de ±15–25%.

Em uma haste reduzida, se a seção crítica for circular e homogênea, `I = πd⁴/64`. Reduzir o diâmetro de 10 para 6 mm deixa a rigidez local na razão `(6/10)^4 = 0,1296`, ou `12,96%` da rigidez da seção Ø10. A deflexão correspondente, mantendo força, comprimento e módulo constantes, aumenta por `(10/6)^4 = 7,716`, ou aproximadamente `+671,6%`. Esse resultado é **geométrico**, não um ensaio da ferramenta completa; não inclui contato, fixação, transição de raio, pescoço, balanço total ou distribuição de carga.

## Sensibilidade

Aplicar `De = D` quando o estudo indicar `De = 0,8D` subestima a deflexão por um fator `1/0,8⁴ = 2,441`. Em termos relativos à deflexão correta, o cálculo nominal fica cerca de **59,0% abaixo**; em termos de comparação, a previsão com `De = 0,8D` é **144,1% maior** que a previsão artificial com `De = D`. Essa sensibilidade excede claramente a margem de ±15–25%, portanto a correção geométrica não deve ser omitida quando o domínio de validade de `0,8D` for aceito.

O comprimento é ainda mais crítico: `δ ∝ L³`. Um aumento de 20% no balanço aumenta a deflexão por `1,2³ = 1,728`, ou `+72,8%`. A calculadora deve pedir o balanço real e não inferi-lo apenas por uma classe de `L/D`.

## Fontes

A fração `0,8` vem de Kops e Vo [4]. A modelagem estrutural por canais vem de Kivanc e Budak [5]. A modelagem de forças ao longo da hélice vem de Li et al. [7]. As relações `I ∝ d⁴` e `δ ∝ L³` são deduções da fórmula da viga do próprio enunciado; seus resultados devem ser exibidos como sensibilidades matemáticas, não como resultados experimentais.

---

# Bloco 3 — Questão 1c: razão força radial/força tangencial

**Veredito:** não há base auditável para fixar `Fr/Fc = 0,3–0,5` como constante de oficina; o cálculo deve usar um coeficiente calibrado `Pf` ou permanecer aberto.  
**Confiança:** `SEM CONSENSO` para uma razão universal; `CONSENSO` qualitativo de que força e geometria precisam ser modeladas/calibradas, sem transformar isso em número universal.

## Valor ou regra

O modelo convencional de fresamento aberto recuperado na literatura usa `Ft = Km b h` e `Fr = Pf Ft`. O parâmetro `Pf` é justamente a razão radial/tangencial do modelo, mas a fonte não publica um único valor aplicável a todas as combinações. O artigo de Dépincé e Hascoët estima funções de coeficientes tangencial e radial por mínimos quadrados e ressalta que o par ferramenta–material deve ser conhecido para calcular as forças aplicadas às flautas e, em seguida, a deflexão.[5] [6]

A razão depende do ângulo de engajamento, do ângulo de hélice, do passo, da geometria de saída e dos parâmetros de corte. O modelo oblíquo de Li et al. decompõe a hélice em elementos diferenciais e integra as forças ao longo da aresta, confirmando que a força não deve ser tratada como uma constante independente da posição do dente.[7]

A força varia quando o dente entra, percorre o arco imerso e sai. Para uma função de **deflexão máxima**, usar a força radial de pico ou a envoltória de pico é a escolha conservadora; para estimar erro médio ou potência média, deve-se integrar a força instantânea e usar a média coerente com o objetivo. Misturar força tangencial média com razão radial de pico sem declarar a convenção criaria uma combinação não auditável.

Não foi encontrada, em artigo, norma ou catálogo técnico elegível, uma simplificação publicada do tipo `Fr ≈ 0,3–0,5 Fc` válida por família de fresa. Logo, esse intervalo deve permanecer como `NÃO ENCONTRADO`, e não como default oculto.

## Sensibilidade

Se `Fr = Pf Fc`, então `δ ∝ Pf`. Qualquer erro percentual em `Pf` produz o mesmo erro percentual em `δ`. Uma hipótese arbitrária de `Pf = 0,4` com erro real de ±0,1 produziria ±25% de erro na deflexão; como a própria base do valor não foi confirmada, nem esse intervalo deve ser embutido silenciosamente. A aplicação deve exigir `Pf`, coeficientes calibrados, força medida, potência acompanhada de um modelo de força, ou declarar a trava aberta.

## Fontes

As fontes principais são Dépincé e Hascoët [5], o artigo de simulação 3D de forças e deflexão [6] e o modelo oblíquo de Li et al. [7].

---

# Bloco 4 — Questão 1d: limite de deflexão aceitável

**Veredito:** não foi encontrada uma constante universal, publicada por fabricante ou norma elegível, para substituir o `δ ≤ 0,05 mm`; o limite deve ser comparado à tolerância da peça quando ela for fornecida, e a calculadora deve mostrar a deflexão sem julgamento quando a tolerância não existir.  
**Confiança:** `NÃO ENCONTRADO` para limite absoluto universal e relação direta com início de chatter.

## Valor ou regra

A deflexão pode causar erro dimensional e erro de forma, mas a tolerância aceitável é uma propriedade da peça, da operação e do processo. O estudo de Salgado et al. encontrou, em uma montagem e condição específicas, erros máximos de aproximadamente 15 µm em up-milling e valores acima de 20 µm em down-milling. Esse resultado mostra a escala de um experimento, não um limite geral de desbaste ou acabamento.[15]

A literatura de modelagem separa duas situações: deflexão estática excessiva, que pode violar tolerâncias, e chatter, que produz vibração e acabamento inadequado. Kivanc e Budak modelam forma, estabilidade e dinâmica da fresa; a revisão de modelagem de fresamento da ASME distingue modelos de deflexão estática de modelos com feedback de deflexão e força regenerativa. Portanto, um limite dimensional absoluto não é equivalente a um limite de estabilidade.[5] [16]

O limite deve ser relativo à tolerância efetiva da característica usinada, porém a pesquisa não encontrou uma fração normativa ou de fabricante que possa ser aplicada a todas as peças. Uma política de produto segura é: se `tol` for informada, apresentar `δ/tol` e sinalizar conforme uma regra de produto aprovada; se não for informada, exibir `δ` em µm e a mensagem “tolerância não informada — sem julgamento”. Não se deve assumir `0,05 mm` nem convertê-lo em fração do diâmetro sem fonte.

Para acabamento e desbaste, o limite desejável naturalmente pode diferir, mas não foi encontrado um par de valores absolutos elegíveis. O acabamento deve ser vinculado à tolerância e à rugosidade especificadas, enquanto o desbaste pode priorizar produtividade; ambos continuam dependentes da peça e do sistema.

## Sensibilidade

Uma deflexão de 20 µm em uma característica com tolerância de 20 µm consome 100% da tolerância; a mesma deflexão em uma tolerância de 100 µm consome 20%. Esses percentuais são aritmética da razão `δ/tol`, não limites publicados. A ausência de `tol` impede qualquer julgamento numérico responsável.

Chatter não pode ser prevenido por um limite estático isolado. Para esse objetivo seriam necessários rigidez e amortecimento da montagem, frequências naturais, FRFs, força instantânea, número de dentes, rotação e um modelo de estabilidade regenerativa. A função de deflexão estática deve ser descrita como previsão de deslocamento, não como detector de chatter.

## Fontes

Salgado et al. [15], Kivanc e Budak [5], Dépincé e Hascoët [16] e a revisão ASME de modelagem [17].

---

# Bloco 5 — Questão 1e: cadeia completa de cálculo de deflexão

**Veredito:** a cadeia algébrica pode ser pronta para código até `δ`, mas permanece travada em `Fr` enquanto não houver `Pf`, força radial medida ou modelo de força com coeficientes por par ferramenta–material.  
**Confiança:** `REFERÊNCIA ÚNICA` para `De/D = 0,8` no domínio de Kops e Vo; `NÃO ENCONTRADO` para `Fr/Fc` universal e para a viga escalonada completa.

## Cadeia pronta para virar código

A calculadora deve manter unidades internamente coerentes. Com `Vc` em m/min, `D` em mm, `fz` em mm/dente, `Z` adimensional, `ap`, `ae` e `L` em mm, `E` em MPa e forças em N, a cadeia é:

```text
1. rpm = 1000 * Vc / (π * D)
2. vf  = fz * Z * rpm                         [mm/min]
3. determinar o arco de engajamento e a espessura instantânea h(φ,z)
4. obter Ft(φ,z) por coeficientes de força ou por força/potência auditável
5. obter Fr(φ,z) = Pf(φ,z) * Ft(φ,z), se Pf for fornecido/calibrado
6. escolher Fr_pico para a verificação de flexão máxima
7. escolher De = 0,8 * D somente para o domínio publicado de 2/4 canais
8. I = π * De^4 / 64                           [mm^4]
9. δ_mm = Fr_pico * L^3 / (3 * E * I)           [mm]
10. δ_µm = 1000 * δ_mm                         [µm]
11. se tolerância tol existir: exibir δ/tol
12. se tol não existir: exibir δ_µm sem aprovar/reprovar
```

A velocidade de rotação e o avanço por minuto são relações de fresamento divulgadas em guias técnicos de fabricantes, como a página de fórmulas de fresamento da Sandvik. A relação entre força tangencial e força radial, entretanto, precisa ser fechada por um modelo de força, pois a literatura usa coeficientes calibrados e forças instantâneas ao longo da hélice.[7] [18]

Se a fresa tiver haste ou pescoço de diâmetro diferente, o código deveria aceitar uma lista de trechos `(z_i, d_i, E_i)` e resolver uma viga de seção variável ou, no mínimo, emitir `MODELO SIMPLES — SEÇÃO CRÍTICA`. Sem o comprimento de cada trecho, não é possível quantificar o erro de substituir a viga escalonada por uma viga simples.

## Travas abertas e efeito no código

`E` pode ser preenchido por default derivado, com transparência. `De` pode ser preenchido como `0,8D` apenas para o domínio publicado. `Fr` não pode ser calculada de forma auditável com `Fc` isolada sem `Pf` ou outro modelo. Limite de aceitação não pode ser produzido sem tolerância. Chatter não pode ser avaliado pela função estática.

---

# Bloco 6 — Questão 2a: expoentes de Taylor por material da ferramenta

**Veredito:** não foi encontrada uma tabela elegível, completa e verificável que publique um único `n` para HSS, HSS-Co, metal duro sem revestimento, metal duro revestido, cerâmica e CBN independentemente do material da peça; os valores `0,25` e `0,125` não devem ser apresentados como universais.  
**Confiança:** `NÃO ENCONTRADO` para uma matriz universal; `REFERÊNCIA ÚNICA` para valores de casos específicos.

## Tabela de evidência disponível

| Material da ferramenta | `n` verificável no território | Material da peça | Situação | Confiança | Fonte |
|---|---:|---|---|---|---|
| HSS | Não encontrado como valor universal | — | ISO 8688-2 define procedimentos de ensaio para HSS em fresamento de topo, mas não uma constante universal na página aberta | `NÃO ENCONTRADO` | [19] |
| HSS ao Co | Não encontrado | — | M42 é identificado como material e módulo elástico, mas não há expoente Taylor verificável na fonte aberta | `NÃO ENCONTRADO` | [14] |
| Metal duro sem revestimento | Não encontrado como valor universal | — | A literatura usa valores ajustados por combinação ferramenta–peça e condição | `NÃO ENCONTRADO` | [8] [9] |
| Metal duro revestido | Não encontrado como valor universal | Ti/Ni em caso específico | Zhang usa inserto TiAlN e ajusta modelo específico; a página aberta não expõe um `n` universal | `REFERÊNCIA ÚNICA` para o modelo, não para `n` universal | [9] |
| Cerâmica | Não encontrado | — | ISO 3685 cobre procedimentos de ensaio em torneamento, mas a página aberta não fornece um `n` de aplicação geral | `NÃO ENCONTRADO` | [8] |
| CBN/PCBN | Não encontrado como número único | Aço endurecido em estudos específicos | Arsecularatne et al. analisam expoentes e mecanismos de desgaste por combinação, mas a tabela numérica não ficou aberta | `REFERÊNCIA ÚNICA` para a existência da análise; valor não fechado | [8] |
| Metal duro + alumínio | `n = 0,33` aparece como caso específico no material aberto do artigo de Rao et al. | Alumínio | O valor vem de uma combinação específica e não deve ser generalizado para toda ferramenta de metal duro | `REFERÊNCIA ÚNICA` | [10] |

A conclusão não é que nenhum valor exista na literatura. A conclusão é mais restrita: **a pesquisa não recuperou uma tabela que permita transformar uma classe de ferramenta em constante universal auditável**, obedecendo à regra de não inventar. Os valores de `n` precisam ser vinculados ao material da peça, grau, revestimento, geometria, critério de desgaste e faixa de velocidade.

---

# Bloco 7 — Questão 2b: dependência do material da peça

**Veredito:** sim, `n` depende do material da peça e das condições; uma matriz ferramenta × material é necessária para precisão, mas não foi encontrada completa nas fontes abertas consultadas.  
**Confiança:** `CONSENSO` qualitativo sobre dependência; `NÃO ENCONTRADO` para a matriz numérica completa.

## Valor ou regra

Arsecularatne et al. afirmam que a vida depende da máquina, ferramenta e geometria, material da peça e condições de corte, e analisam WC/aço, PCBN/aço endurecido e PCD/MMC separadamente. Zhang et al. mostram que modelos recentes incorporam velocidade, avanço, profundidade, temperatura, geometria, dureza, canal e revestimento. A forma estendida citada no artigo de Rao et al. inclui avanço e profundidade, `V T^n f^a ap^b = C`.[8] [9] [10]

Portanto, o `n` não pode ser indexado apenas pela palavra “carbide”. A chave de dados mínima deve ser algo como `(tool_family, grade, coating, work_material_group, hardness, coolant_mode, operation, wear_criterion, data_source)`. Se qualquer campo que altere a curva não for conhecido, a mensagem deve ser uma aproximação condicionada.

## Sensibilidade

Para uma mudança de 20% em `Vc`, a vida relativa é muito sensível ao expoente. Os resultados são: `n=0,125` dá 23,26% da vida; `n=0,25` dá 48,23%; `n=0,33` dá 57,55%; `n=0,4` dá 63,39%; `n=0,5` dá 69,44%; e `n=0,6` dá 73,80%. A dispersão entre expoentes, sozinha, excede a margem de ±15–25% do modelo. Logo, escolher um `n` genérico pode dominar o erro final mais que a incerteza de `E` dentro da faixa comercial aberta.

---

# Bloco 8 — Questão 2c: verificação da mensagem de +20% de velocidade

**Veredito:** as duas contas estão corretas; os expoentes presumidos não estão validados como universais.  
**Confiança:** `CONSENSO` matemático; `NÃO ENCONTRADO` para a validade universal de `n = 0,25` e `n = 0,125`.

## Cálculo

A equação relativa é:

```text
T/Tref = (Vc_ref/Vc)^(1/n)
```

Para `Vc = 1,2 Vc_ref`:

```text
n = 0,25  → T/Tref = (1/1,2)^4 = 0,482253 ≈ 48,2%
n = 0,125 → T/Tref = (1/1,2)^8 = 0,232568 ≈ 23,3%
```

Assim, a frase “aproximadamente metade da vida” é matematicamente válida **somente se** `n=0,25` for documentado para o par ferramenta–peça e para as condições de referência. Para `n=0,125`, a redução é muito mais severa, para aproximadamente 23% da vida de referência.

## Sensibilidade

A diferença entre 48,2% e 23,3% é 24,9 pontos percentuais absolutos e uma razão de aproximadamente 2,07 entre as vidas previstas. Isso é grande demais para esconder a escolha de `n` no código.

---

# Bloco 9 — Questão 2d: vida de referência `Tref`

**Veredito:** ISO 3685 e ISO 8688 normalizam procedimentos de ensaio, mas a pesquisa não confirmou nas páginas abertas que 15 ou 30 minutos sejam um `Tref` universal obrigatório para os dados do produto; cada linha de dados deve carregar seu próprio critério e referência.  
**Confiança:** `SEM CONSENSO` para 15/30 min como convenção universal no escopo aberto.

## Valor ou regra

A ISO 3685 trata ensaios de vida com ferramentas de HSS, metal duro e cerâmica em torneamento de aço e ferro fundido e remete o fresamento às ISO 8688-1 e ISO 8688-2. A ISO 8688-1 cobre ensaios de vida em fresamento frontal com metal duro; a ISO 8688-2 cobre fresamento de topo com HSS. As páginas de visualização consultadas não expõem o texto integral das cláusulas nem uma tabela que permita afirmar que todos os catálogos usem `Tref=15 min` ou `Tref=30 min`.[19] [20] [21]

Para a forma absoluta, a interface deve guardar `Tref`, critério de desgaste, material, geometria, refrigeração e fonte na mesma linha de dados. Se o catálogo não declarar a vida a que corresponde a velocidade, mostrar velocidade como parâmetro recomendado do catálogo, mas não converter automaticamente para “a aresta dura X minutos”.

## Sensibilidade

A forma relativa cancela `C` e `Tref` apenas quando as duas velocidades pertencem à mesma curva e à mesma combinação de ferramenta–peça. Ela não permite comparar duas linhas de fabricantes com diferentes critérios de fim de vida. A ausência de `Tref` impede a vida absoluta, não a comparação relativa condicional.

---

# Bloco 10 — Questão 2e: Taylor estendido e utilidade na calculadora

**Veredito:** a forma estendida existe e é usada na literatura, mas deve ser um modo avançado; a forma simples é adequada apenas para uma mensagem relativa de velocidade com `n` devidamente vinculado à combinação de corte.  
**Confiança:** `REFERÊNCIA ÚNICA` para os artigos específicos; `CONSENSO` qualitativo de que a forma estendida exige mais dados.

A forma estendida é usualmente escrita como:

```text
V * T^n * f^a * ap^b = C
```

Rao et al. mostram explicitamente essa estrutura para velocidade, avanço e profundidade. Zhang et al. descrevem extensões que incluem velocidade, avanço por revolução, profundidade, temperatura, geometria, dureza, canal e revestimento.[9] [10]

Para uma calculadora de oficina, a forma simples pode ser mantida para a mensagem relativa de `Vc`, mas a tela precisa identificar a hipótese e o `n`. A forma estendida só deve ser ativada quando `a`, `b`, `C`, unidade, operação, critério de desgaste e faixa experimental forem fornecidos pela fonte. Caso contrário, mais parâmetros significam apenas mais constantes sem procedência.

---

# Bloco 11 — Questão 2f: decisão de produto sobre “metade da vida”

**Veredito:** a mensagem não é defensável como regra universal; é defensável como resultado condicional, com `n`, par ferramenta–peça e referência visíveis.  
**Confiança:** `CONSENSO` matemático sobre a forma relativa; `SEM CONSENSO` para a mensagem sem identificação do expoente.

A interface deve evitar “+20% de Vc ≈ metade da vida da aresta” como texto fixo. Uma formulação auditável seria: **“Com `n = 0,25` para a combinação selecionada e mantendo as demais condições, a vida relativa estimada é 48,2% de `Tref`; o valor de `n` é uma hipótese/fonte específica.”** Se `n` não existir na base, a interface deve mostrar: **“efeito de vida não calculado — expoente Taylor sem fonte para esta combinação.”**

Dizer apenas “metade da vida” sem saber a vida absoluta não é necessariamente enganoso quando o objetivo é uma razão relativa; torna-se enganoso quando a origem de `n`, o material da peça, a ferramenta ou o critério de desgaste são ocultados.

---

# Bloco 12 — Questão 3a: profundidade sem ciclo pica-pau

**Veredito:** não foi encontrado fator publicado que permita substituir `L/D > 3` por uma nova profundidade universal quando há refrigeração interna.  
**Confiança:** `NÃO ENCONTRADO`.

A literatura e os fabricantes confirmam que refrigeração through-tool melhora a evacuação de cavacos e reduz o risco de entupimento, mas isso não equivale a um fator universal de profundidade. O preview do estudo sobre furação com high-pressure through-coolant cita um ensaio a 40 bar com `L/D = 4` e outro a 110 bar em Ti6Al4V/Inconel 718; são condições de estudos específicos, não uma demonstração de que todo furo até quatro diâmetros dispensa peck.[12]

A política correta é manter o limiar atual como regra de segurança até que um catálogo específico da broca publique profundidade máxima contínua para aquele diâmetro, material, geometria, pressão, vazão e critério de cavaco. O sistema pode exibir “through-coolant habilitado” como fator de risco reduzido, mas não como multiplicador de `L/D` sem fonte.

---

# Bloco 13 — Questão 3b: avanço, velocidade e vida

**Veredito:** não há ganho universal de avanço ou velocidade que possa ser aplicado automaticamente; o benefício documentado pode aparecer como vida maior, melhor evacuação, menor temperatura ou maior produtividade, dependendo do sistema.  
**Confiança:** `SEM CONSENSO` para multiplicador universal; `REFERÊNCIA ÚNICA` para os casos publicados.

A Sandvik declara que alta pressão pode aumentar a eficiência de corte e que a escolha de pressão depende do bico, material, profundidade e avanço. A revisão de alta pressão confirma que pressão, vazão, concentração e direção do jato afetam vida, desgaste, força, temperatura e acabamento. Isso é evidência de dependência, não um multiplicador único.[11] [13]

Em furação de ligas de baixa usinabilidade, o estudo de López de Lacalle et al. examina Ti6Al4V e Inconel 718 com alta pressão; a página aberta identifica a aplicação, mas o texto integral está atrás de paywall, portanto nenhum fator numérico adicional é usado. Em fresamento de Inconel 718, o estudo de Barbosa et al. encontrou maior vida com inundação e menor vida a seco; a elevação de velocidade reduziu significativamente a vida. Esse resultado não permite converter refrigeração interna em um percentual de `Vc` ou `fz`.[13] [22]

## Sensibilidade

Sem um fator publicado, a calculadora deve manter `Vc`, `fz`, `ap` e `ae` inalterados ao marcar refrigeração interna, e alterar somente a descrição do processo ou a elegibilidade da regra de evacuação. Qualquer multiplicador arbitrário, como `+10%` ou `+20%`, seria um número sem fonte para a combinação real.

---

# Bloco 14 — Questão 3c: efeito em fresamento

**Veredito:** o efeito em fresamento existe qualitativamente, mas os ganhos numéricos são específicos da ferramenta e do material; o benefício mais seguro é evacuação de cavaco, gestão térmica e potencial aumento de vida, não um novo parâmetro universal.  
**Confiança:** `REFERÊNCIA ÚNICA` para benefícios declarados por fabricante; `SEM CONSENSO` para multiplicador de parâmetro.

A Helical Solutions declara, para fresas com coolant-through, redução de calor, melhoria da evacuação, aumento de MRR e possibilidade de parâmetros agressivos com menor vibração/chatter em setups rígidos. A página não fornece número de ganho em `Vc`, `fz`, `ap` ou `ae`, portanto os valores não podem ser incorporados à calculadora como constantes.[23]

O estudo de Inconel 718 citado no Bloco 13 compara estratégias de lubri-refrigeração, mas não é um ensaio universal de fresa com canais internos. A inundação foi superior ao seco no conjunto estudado. Isso sustenta a separação entre “condição de fluido” e “existência de canais internos” e impede assumir que qualquer refrigeração interna se comporte como inundação ou alta pressão.

---

# Bloco 15 — Questão 3d: pressão e distinção entre interna comum e alta pressão

**Veredito:** sim, alta pressão deve ser tratada como categoria própria; refrigeração interna descreve o caminho de entrega, enquanto 70 bar ou mais descreve uma faixa de pressão do sistema.  
**Confiança:** `REFERÊNCIA ÚNICA` para os valores de pressão do fabricante; `CONSENSO` conceitual para separar caminho de entrega, pressão e vazão.

A página da Sandvik informa que quase todas as máquinas oferecem 70/80 bar de alta pressão e algumas chegam a 150 bar para materiais/operações exigentes. Também afirma que os benefícios dependem de ferramentas desenvolvidas para coolant de precisão e que a vazão depende da pressão e da área dos canais. Em furação, o objetivo prático é volume de fluxo suficiente para evacuar os cavacos; pressão isolada não descreve todo o desempenho.[11]

O modelo de dados deve separar pelo menos:

| Campo | Significado |
|---|---|
| `coolant_path` | externo, through-tool, through-spindle, jato direcionado |
| `pressure_bar` | pressão efetiva no ponto de entrega |
| `flow_lpm` | vazão disponível |
| `coolant_medium` | seco, ar, emulsão, óleo, MQL, criogênico ou outro |
| `tool_compatibility` | se a ferramenta foi projetada para o caminho e a pressão |

Sem esses campos, marcar apenas “refrigeração interna” não contém dados suficientes para modificar números.

---

# Bloco 16 — Questão 3e: tipo de refrigeração, material e velocidade admissível

**Veredito:** há efeito documentado do tipo de refrigeração sobre temperatura, desgaste e vida em materiais específicos, mas não há matriz geral que permita recalcular todas as tabelas de `Vc` sem declarar a condição original.  
**Confiança:** `REFERÊNCIA ÚNICA` para os estudos específicos; `SEM CONSENSO` para uma matriz universal.

No fresamento de Inconel 718, o estudo de Barbosa et al. compara seco, ar comprimido, MQL, tubo de vórtice e inundação. A inundação produziu a maior vida e o corte seco a menor; os métodos a ar ficaram intermediários; o aumento de velocidade reduziu significativamente a vida por elevar a temperatura. As conclusões são específicas da liga, ferramenta, geometria, condições e critérios do ensaio.[22]

A revisão de MQL e alta pressão confirma que diferentes fluidos e estratégias podem atuar por lubrificação, resfriamento, redução de contato, controle de cavacos e alteração de mecanismos de desgaste. Ainda assim, a tabela de `Vc` do sistema só pode ser corrigida se o catálogo informar a condição de fluido a que o valor corresponde. Se a condição estiver ausente, a interface deve sinalizar “condição de refrigeração da fonte não declarada” em vez de aplicar um fator.

---

# Tabela A — Constantes para deflexão

| Constante | Valor recomendado | Faixa encontrada | Efeito da dispersão em `δ` | Confiança | Fonte |
|---|---:|---:|---:|---|---|
| `E` para WC-Co de fresa geral | `500 GPa` apenas como default derivado; `500.000 MPa` no código | `466,0–516,5 GPa` em faixa comercial citada; `523–577 GPa` em estudo com composição/granulometria específicas | Com default 500 GPa, aproximadamente `−6,8%` a `+15,4%` na faixa aberta verificada | `SEM CONSENSO` para universal; `REFERÊNCIA ÚNICA` para faixas | [1] [2] [3] |
| `E` para HSS M2 | `207 GPa` | valor publicado para M2 | referência direta para o valor usado | `REFERÊNCIA ÚNICA`, nível 4 | [14] |
| `E` para HSS-Co M42 | `207 GPa` | valor publicado para M42 com Co 8% | referência direta para o valor usado | `REFERÊNCIA ÚNICA`, nível 4 | [14] |
| `De/D` | `0,8` somente em 2 e 4 canais no domínio de Kops e Vo | não encontrada lei universal | usar `De=D` em vez de `0,8D` subestima a deflexão correta em cerca de 59% | `REFERÊNCIA ÚNICA` | [4] |
| `Fr/Fc` | `Pf` calibrado; sem default | não encontrada faixa universal | `δ` varia linearmente com `Pf` | `NÃO ENCONTRADO` para número | [5] [6] [7] |
| limite absoluto de `δ` | não fixar `0,05 mm` sem tolerância | não encontrado | `δ/tol` depende da tolerância da peça | `NÃO ENCONTRADO` | [15] [16] |
| viga escalonada | usar quando houver trechos com diâmetros diferentes; caso contrário sinalizar simplificação | erro quantitativo da viga simples não encontrado | comprimento e seção controlam fortemente `δ` | `NÃO ENCONTRADO` para erro | [5] |

---

# Tabela B — Expoente de Taylor

| Material da ferramenta | `n` | Material da peça, se depender | `Tref` | Confiança | Fonte |
|---|---:|---|---|---|---|
| HSS | não encontrado como universal | depende da peça e do ensaio | não fechado | `NÃO ENCONTRADO` | [19] [21] |
| HSS ao Co | não encontrado | depende da peça e do ensaio | não fechado | `NÃO ENCONTRADO` | [14] |
| Metal duro sem revestimento | não encontrado como universal | aço, ferro fundido, alumínio, Ti/Ni etc. exigem curvas próprias | não fechado | `NÃO ENCONTRADO` | [8] [9] |
| Metal duro revestido | não encontrado como universal | Zhang usa TiAlN em Ti e Ni em estudo específico | não fechado | `REFERÊNCIA ÚNICA` para caso/modelo | [9] |
| Cerâmica | não encontrado como universal | depende de peça, dureza e condição | não fechado | `NÃO ENCONTRADO` | [8] [20] |
| CBN/PCBN | não encontrado como universal | estudos específicos com aço endurecido | não fechado | `REFERÊNCIA ÚNICA` para análise, sem tabela aberta | [8] |
| Metal duro + alumínio, caso específico | `0,33` no material aberto do artigo de Rao et al. | alumínio e condições do artigo | não fechado na página aberta | `REFERÊNCIA ÚNICA`, não generalizar | [10] |

**Nota:** `n=0,25` para metal duro e `n=0,125` para HSS permanecem como valores internos sem fonte confirmada. Eles podem ser usados apenas em teste de sensibilidade, nunca como constantes universais silenciosas.

---

# Tabela C — O que continua sem base

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|
| `E` por teor de Co e grau | tabela completa por grau, Co, grão e estado | ficha técnica específica do grau ou artigo completo com composição e método |
| `E` para toda a linha de HSS/HSS-Co | valores por liga e tratamento térmico em fonte de nível 1–3 | handbook/Norma ou catálogo do grau real |
| `De/D` por número de canais | nenhum valor aberto para 3, 5, 6+ canais e famílias de geometria | artigos/modelos ou ensaio de compliance por família |
| efeito da profundidade do canal | não há função `De(z)` universal | geometria CAD da ferramenta, seção transversal ou ensaio de rigidez |
| erro viga simples versus escalonada | não foi encontrado percentual | modelo de viga escalonada/FE comparado com ensaio |
| `Fr/Fc` | não há faixa universal auditável | coeficientes de força por par ferramenta–material, dinamômetro ou calibração |
| limite de deflexão | nenhum limite universal fabricante/norma encontrado | tolerância da peça, acabamento, processo e regra de produto aprovada |
| limite de chatter | deflexão estática não determina estabilidade | FRF, rigidez/amortecimento e modelo regenerativo |
| matriz de `n` | não há tabela universal por ferramenta × peça | curvas de vida com grau, revestimento, peça, geometria e critério de desgaste |
| `Tref` universal | ISO é procedimento; páginas abertas não confirmam 15/30 min universal | catálogo/ensaio declarando vida-alvo e critério |
| profundidade sem peck com through-coolant | nenhum multiplicador universal para o limiar `L/D>3` | catálogo da broca e ensaios por diâmetro, material, pressão e vazão |
| ganho de `Vc`, `fz`, `ap` ou `ae` por refrigeração interna | não há fator universal em fresamento | catálogo específico ou DOE/ensaio da ferramenta e material |
| efeito por tipo de fluido | estudos são específicos e não formam matriz | dados de corte com condição de refrigeração declarada |

---

# Implementação recomendada e travas de segurança

A primeira versão da função de deflexão pode ser implementada com `E` configurável e auditado, `De/D = 0,8` somente para ferramentas no domínio de dois/quatro canais, e entrada explícita de `Pf` ou de uma força radial já medida. Se `Pf` não existir, a função deve retornar estado `INCOMPLETA — Fr/Fc sem fonte`, e não um número de µm com aparência de precisão.

A função deve guardar, junto do resultado, a fonte de cada constante: grau e teor de Co de `E`; fonte e domínio de `De/D`; origem de `Pf`; balanço `L`; geometria `D`; e hipótese sobre a seção da haste. A saída deve separar “deflexão prevista” de “aceitação dimensional”. Sem tolerância da peça, não mostrar “aprovado” ou “reprovado”.

Para Taylor, a base deve ser indexada por par ferramenta–peça e condição. A interface pode mostrar o cálculo relativo, mas deve expor `n`, `Tref` se houver, critério de desgaste e fonte. Se não houver `n` específico, ocultar o impacto quantitativo da vida e oferecer apenas a explicação qualitativa.

Para refrigeração, a caixa de seleção só deve alterar números quando a base possuir os campos `coolant_path`, `pressure_bar`, `flow_lpm`, `coolant_medium` e a fonte que publique a alteração de parâmetro. Caso contrário, deve alterar apenas o estado de risco/evacuação, sem multiplicar profundidade, avanço ou velocidade.

---

# Lacunas declaradas

1. Não foi recuperada uma tabela completa de módulo elástico WC-Co por teor de Co e grau comercial de fresa. A fonte que teria parte desses dados é a ficha técnica do grau ou o texto integral dos artigos de módulos; as páginas abertas forneceram tendências e faixas, não a matriz solicitada.

2. Não foi encontrada uma tabela elegível de `E` para toda a família HSS/HSS-Co. Foram obtidos apenas M2 e M42 de um fornecedor técnico, ambos com 207 GPa; a fonte está fora do nível 1–3 e não deve ser generalizada.

3. Não foi encontrado valor de `De/D` por profundidade de canal ou para todos os números de canais. Kops e Vo sustentam 0,8 para dois e quatro canais em seu domínio; extrapolação para outras geometrias exigiria ensaio ou modelo estrutural com a seção real.

4. Não foi quantificado o erro de uma viga simples em comparação com uma viga escalonada ou de seção variável. É necessário obter os comprimentos de cada trecho, modelar `I(z)` e validar com ensaio de compliance ou elementos finitos.

5. Não foi encontrada razão universal `Fr/Fc`, nem confirmação de `0,3–0,5` para uma família de fresas. É necessário calibrar coeficientes radial/tangencial por par ferramenta–material e arco de engajamento.

6. Não foi encontrado limite universal de deflexão aceitável nem relação direta entre uma deflexão estática em µm e o início de chatter. O limite dimensional requer tolerância da peça; chatter requer dinâmica da montagem.

7. Não foi recuperada uma tabela completa de expoentes de Taylor para HSS, HSS-Co, metal duro sem revestimento, metal duro revestido, cerâmica e CBN por material da peça. Os valores internos `0,25` e `0,125` não foram confirmados no território permitido.

8. Não foi confirmado `Tref` universal de 15 ou 30 minutos nas páginas abertas das normas ISO. É necessário o texto integral da norma ou a declaração do fabricante para cada linha de dados.

9. Não foi encontrado multiplicador publicado para permitir determinada profundidade sem peck com refrigeração interna. Ensaios citados em 40 e 110 bar são casos específicos e não substituem um fator geral.

10. Não foi encontrado multiplicador universal de avanço ou velocidade em fresamento com refrigeração interna. Estudos de alta pressão, inundação, MQL, ar e seco mostram dependência de material, ferramenta e condição.

11. As tabelas de `Vc` do sistema continuam incompletas enquanto não declararem a condição de refrigeração que originou cada valor. Sem essa informação, não é possível aplicar correção numérica auditável.

---

# Referências

[1]: https://www.mdpi.com/2504-477X/10/3/156 "Ratov et al. — Properties of WC-Co Cemented Carbide Reinforced with Yttria-Stabilized Zirconia Nanoparticles, Journal of Composites Science, 2026"
[2]: https://link.springer.com/article/10.1007/BF02900264 "A systematic investigation of elastic moduli of WC-Co alloys"
[3]: https://www.sciencedirect.com/science/article/pii/S1044580305001440 "Okamoto et al. — Mechanical properties of WC/Co cemented carbide with larger WC grain size, Materials Characterization, 2005"
[4]: https://www.sciencedirect.com/science/article/pii/S0007850607610105 "Kops e Vo — Determination of the Equivalent Diameter of an End Mill Based on its Compliance, CIRP Annals, 1990, DOI 10.1016/S0007-8506(07)61010-5"
[5]: https://www.sciencedirect.com/science/article/pii/S0890695504000896 "Kivanc e Budak — Structural modeling of end mills for form error and stability analysis, 2004"
[6]: https://www.sciencedirect.com/science/article/pii/S1569190X08001627 "Simulation of three-dimension cutting force and tool deflection in the end milling operation based on finite element method"
[7]: https://link.springer.com/article/10.1007/s00170-015-7724-8 "Modeling of cutting forces in end milling based on oblique cutting analysis"
[8]: https://www.sciencedirect.com/science/article/abs/pii/S0890695505001537 "Arsecularatne, Mathew et al. — Wear and tool life of tungsten carbide, PCBN and PCD cutting tools, Wear, 2006"
[9]: https://doi.org/10.3390/coatings12101553 "Zhang et al. — A Tool Life Prediction Model Based on Taylor’s Equation for High-Speed Ultrasonic Vibration Cutting Ti and Ni Alloys, Coatings, 2022"
[10]: https://www.sciencedirect.com/science/article/pii/S1877705814033062 "Rao, Sreeamulu e Mathew — Analysis of Tool Life during Turning Operation by Determining Optimal Process Parameters, Procedia Engineering, 2014"
[11]: https://www.sandvik.coromant.com/en-us/knowledge/machine-tooling-solutions/tooling-considerations/machining-with-coolant "Sandvik Coromant — Coolant aspects – Machining with coolant"
[12]: https://www.igi-global.com/article/effect-of-process-parameters-on-hole-diameter-accuracy-in-high-pressure-through-coolant-peck-drilling-using-taguchi-technique/192157 "Effect of process parameters on hole diameter accuracy in high pressure through coolant peck drilling using Taguchi technique"
[13]: https://www.inderscienceonline.com/doi/abs/10.1504/IJMTM.2019.104551 "Machining in high pressure coolant environment – a strategy to improve machining performance: a review"
[14]: https://www.hudsontoolsteel.com/technical-data/steelM2 "Hudson Tool Steel — M2 High Speed Steel"; https://www.hudsontoolsteel.com/technical-data/steelM4 "Hudson Tool Steel — M42 Super High Speed Steel"
[15]: https://www.sciencedirect.com/science/article/abs/pii/S0890695504002603 "Salgado et al. — Evaluation of the stiffness chain on the deflection of end-mills"
[16]: https://www.sciencedirect.com/science/article/pii/S0890695505002142 "Dépincé e Hascoët — Active integration of tool deflection effects in end milling. Part 1: Prediction of milled surfaces"
[17]: https://asmedigitalcollection.asme.org/manufacturingscience/article-abstract/113/2/169/454906 "An overview of modeling and simulation of the milling process, ASME, 1991"
[18]: https://www.sandvik.coromant.com/en-us/knowledge/machining-formulas-definitions/milling-formulas-definitions "Sandvik Coromant — Milling formulas and definitions"
[19]: https://www.iso.org/obp/ui/#iso:std:iso:8688:-2:ed-1:v1:en "ISO 8688-2:1989 — Tool life testing in milling — Part 2: End milling"
[20]: https://www.iso.org/obp/ui/#iso:std:iso:8688:-1:ed-1:v1:en "ISO 8688-1:1989 — Tool life testing in milling — Part 1: Face milling"
[21]: https://www.iso.org/obp/ui/#iso:std:iso:3685:ed-2:v1:en "ISO 3685:1993 — Tool-life testing with single-point turning tools"
[22]: https://link.springer.com/article/10.1007/s00170-025-16809-9 "Barbosa et al. — Tool life and wear mechanisms in the milling of Inconel 718 under different cooling strategies, 2025"
[23]: https://www.helicaltool.com/products/tool-type/coolant-through-tools "Helical Solutions — Coolant Through Tools"
