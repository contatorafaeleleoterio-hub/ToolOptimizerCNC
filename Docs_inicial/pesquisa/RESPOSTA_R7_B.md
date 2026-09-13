# RESPOSTA R7 — território B (retorno cru)

> **ACEITO** na `VALIDACAO_R7.md` §2, com os rótulos que o próprio retorno pôs.
> Fontes conferidas: Wojciechowski (Materials 15(1):59) confirmado ponto a ponto;
> Globisch et al. (JMMP 8(4):170) confirmado como existente.
> Autor declarado: Manus AI · 29/08/2026 · colado pelo Mestre.

---

# R7 — O piso de espessura de cavaco em fresas inteiriças de metal duro

**Escopo:** fresas inteiriças de metal duro, convencionais, revestidas ou não, para fresamento de aço carbono, inox, alumínio e aço para molde. Microfresas, pastilhas de torneamento e ferramentas especiais de acabamento excluídas, salvo quando citadas para delimitar a evidência.

## Resumo executivo

Não foi encontrada faixa de `rβ` publicada por fabricante para o gume de fresa inteiriça convencional de catálogo. Também não foi encontrado fabricante que publique piso universal de `hex` em milímetros para essa classe. A literatura fornece razões `h_min/rβ`, mas predominantemente em microusinagem, torneamento ou modelos de corte ortogonal; a própria revisão mais abrangente alerta que há poucos modelos para o corte oblíquo real de fresas com aresta arredondada, especialmente toroidais e esféricas.

Há uma referência direta e útil: artigo de desenvolvimento de fresa inteiriça convencional para desbaste/acabamento de aço Toolox 44 usa `rβ = 10 µm`. É valor de ferramenta/protótipo específico, não faixa de catálogo.

Para `h_min/rβ`, os dados mais defensáveis para metais dúcteis são ~0,20–0,40, mas não é constante universal: os valores publicados variam de **0,08 a 0,63** misturando materiais, métodos, cinemáticas e escalas. Deve ser rotulado `SEM CONSENSO`.

Com o único exemplo de catálogo suficientemente detalhado (WIDIA WCE, D 20 mm, ae 2 mm, ae/D 10%, fz 0,146 após correção), `hex ≈ 87,6 µm`, muito acima de um piso de 2,2–3,6 µm. O alerta não dispara. No exemplo canônico do documento (D 10, ae/D 5%, fz 0,060), `hex ≈ 26,2 µm`, também acima.

**Recomendação provisória:** não embarcar `hex < 0,3 × rβ` como gatilho universal com `rβ` presumido. Se mantido, rotular como heurística de baixa confiança, exigir `rβ` informado ou medido, e aplicar à espessura **máxima** `hex`, não à média `hm`.

## Q1 — Qual é o rβ real de uma fresa inteiriça convencional de catálogo?

**Resultado: `NÃO ENCONTRADO` como faixa de catálogo; `REFERÊNCIA ÚNICA` para o valor de 10 µm.**

Nos materiais oficiais consultados da Sandvik Coromant, WIDIA/Kennametal e Kennametal não há tabela informando o raio de preparação do gume `rβ` de fresa inteiriça convencional de catálogo, discriminando diâmetro, desbaste/acabamento e condição antes/depois do revestimento. Os catálogos especificam diâmetros, canais, geometria de canto, revestimento e dados de corte — não o `rβ` como parâmetro metrológico.

A melhor evidência direta é Globisch et al., que descreve fresa inteiriça de metal duro para desbaste e acabamento de Toolox 44 e informa `rβ = 10 µm` na caracterização da ferramenta. Contexto: ferramenta de desenvolvimento/protótipo. O artigo não autoriza generalizar para todas as fresas de 3–25 mm, nem estabelece faixa de 4–20 µm ou de 25–127 µm.

| Evidência | Valor | Condição | Classificação |
|---|---|---|---|
| Globisch et al. (2024) | rβ = 10 µm | fresa inteiriça de MD para desbaste/acabamento de Toolox 44; experimental/protótipo | `REFERÊNCIA ÚNICA` |
| WIDIA WCE | não informado | WCE4/WCE5, 3–25 mm ou 4–20 mm, TiAlN/WU20PE | `NÃO ENCONTRADO` |
| Kennametal HARVI II TE | não informado | fresa de MD e tabelas de aplicação | `NÃO ENCONTRADO` |

Não confundir o **raio de canto** da fresa (Rε de 0,5 ou 2 mm) com o **raio de arredondamento do gume** `rβ`, da ordem de micrômetros. O catálogo WIDIA separa "sharp-edged, chamfered, radiused, ball nose", mas isso não é medição do arredondamento microscópico.

Não é possível corrigir honestamente para "depois do revestimento" sem fonte que meça a aresta revestida. O catálogo informa TiAlN/WU20PE, mas não a espessura na aresta nem o `rβ` resultante.

**O que foi procurado e não encontrado:** página oficial WIDIA da família WCE e catálogo métrico oficial 2022; Kennametal HARVI II TE Application Data; páginas técnicas Sandvik; buscas por *cutting edge radius*, *edge rounding*, *edge preparation*, *rβ*, *solid carbide end mill*. Excluídos microfresas abaixo de ~1 mm, pastilhas de torneamento, brocas e raio de canto macroscópico.

## Q2 — Qual é a razão h_min/rβ?

**Resultado: `SEM CONSENSO`; a dependência do material e do método é comprovada.**

`h_min = k × rβ`

A revisão crítica de Wojciechowski define `k` como a espessura mínima de cavaco não cortado normalizada pelo raio da aresta, e afirma que depende das propriedades da peça e da ferramenta, dos parâmetros de corte e dos fenômenos tribológicos no contato. Abaixo de `h_min` a ferramenta produz deformação elástico-plástica, recuperação elástica e *flash* plástico, sem formação completa de cavaco.

| Material e estudo | Método | Processo | k | Observação |
|---|---|---|---|---|
| Aço ferrítico–perlítico (Vogler et al.) | FEM | microusinagem | 0,14–0,43 | escala reduzida |
| AISI 1040 (Liu et al.) | analítico | torneamento | 0,20–0,35 | cinemática não é fresamento |
| Al 6082-T6 (Liu et al.) | analítico | torneamento | 0,35–0,40 | não é fresa convencional |
| AISI 1045 (Kang et al.) | experimental | microusinagem | 0,30 | — |
| AISI 1045 (Cuba Ramos et al.) | experimental | microusinagem | 0,29 | — |
| Al 6061 (Malekian et al., 2012) | analítico + teste | microusinagem | 0,23 | — |
| AISI 1045 (Oliveira et al., 2015) | experimental | "milling" | 0,22–0,36 | o mais próximo de fresamento, mas o artigo é de microusinagem |
| **conjunto da revisão** | métodos mistos | torneamento, micro e outros | **0,08–0,63** | não usar como faixa de projeto |

| Grupo | Faixa encontrada | Força | Conclusão operacional |
|---|---|---|---|
| Aço carbono / baixa liga | ~0,20–0,36 (1040/1045) | `REFERÊNCIA ÚNICA` / `SEM CONSENSO` | 0,3 plausível em microusinagem, não constante universal de fresa convencional |
| Alumínio | 0,23 (Al6061) e 0,35–0,40 (Al6082-T6) | `SEM CONSENSO` | a dependência do material é suportada; não há k único para "alumínio" |
| Inox austenítico | — | `NÃO ENCONTRADO` | **não preencher com valor de aço carbono** |
| Aço endurecido / molde | — | `NÃO ENCONTRADO` | o rβ de 10 µm não fornece, sozinho, h_min |

O 0,22–0,36 de Oliveira et al. é real e tem fonte, mas título e desenho experimental são de *micromilling*. A revisão registra que os estudos se concentram em corte ortogonal livre, sobretudo torneamento, e que há poucos modelos para a cinemática oblíqua de fresas com aresta arredondada. O produto não deve transformar essa faixa em regra validada para fresas de topo, toroidais e esféricas.

**Piso ilustrativo, condicionado a rβ = 10 µm:**

```
k = 0,22  ->  h_min = 2,2 µm = 0,0022 mm
k = 0,30  ->  h_min = 3,0 µm = 0,0030 mm
k = 0,36  ->  h_min = 3,6 µm = 0,0036 mm
```

Cenários condicionais, não piso universal. Com rβ = 4 µm: 0,88–1,44 µm. Com rβ = 20 µm: 4,4–7,2 µm.

## Q3 — Existe piso publicado direto em mm? E o critério usa hex ou hm?

**Piso direto: `NÃO ENCONTRADO`.** Não foi localizado, nos catálogos oficiais WIDIA/Kennametal consultados, enunciado do tipo "não opere abaixo de X mm de espessura de cavaco" para fresa inteiriça convencional, nem `fz_min` universal por diâmetro justificado por `h_min` e `rβ`. O que os fabricantes publicam são dados de aplicação — o catálogo WIDIA WCE publica Vc, fz e fatores de ajuste em função de ae/D, mas não os chama de h_min nem os justifica por raio de aresta medido.

A ausência é coerente com a revisão: `h_min` depende do material, da microgeometria, dos parâmetros e da tribologia. Uma tabela universal em mm perderia as variáveis que controlam o fenômeno.

**hex versus hm.** A documentação da Sandvik afirma que a espessura máxima de cavaco `h_ex` é o parâmetro mais importante para fresamento produtivo e confiável, e para aresta reta a 90° informa `fz = h_ex`. Explica também que o afinamento aparece em fresamento periférico com baixo ae/D e permite aumentar o avanço por dente. Portanto, para um alerta de "o dente está recebendo espessura suficiente para cortar", a grandeza defensável é `hex`.

A média não é irrelevante — serve para força, potência, temperatura média e dimensionamento. Mas comparar o gatilho de transição corte/esfregamento com `hm` faria o alerta disparar mais cedo e misturaria uma média ao evento local de maior espessura.

Geometria usada nos cálculos, para 0 < ae/D ≤ 0,5:

```
hex = 2 × fz × √[(ae/D) × (1 − ae/D)]
```

## Q4 — O alerta dispara alguma vez na prática?

**Resultado: nos casos verificáveis encontrados, não.**

Exemplo mais completo localizado em fonte de fabricante — catálogo métrico oficial WIDIA WCE, p. 13:

```
D = 20 mm · material = grupo M2 · ae = 2 mm
Vc recomendado = 80 m/min · fz recomendado = 0,089 mm/dente
ae/D = 10% · KFz = 1,64 · fz ajustado = 0,089 × 1,64 = 0,146 mm/dente
```

A família WCE4 tem 4 canais e a WCE5, 5; o exemplo não fixa o número de canais nem um ap efetivo. Conta como caso **parcialmente completo**.

```
hex = 2 × 0,146 × √(0,10 × 0,90) = 0,0876 mm = 87,6 µm
```

| Cenário | Piso h_min | hex | Razão | Alerta? |
|---|---|---|---|---|
| k = 0,22 | 2,2 µm | 87,6 µm | 39,8× | não |
| k = 0,30 | 3,0 µm | 87,6 µm | 29,2× | não |
| k = 0,36 | 3,6 µm | 87,6 µm | 24,3× | não |

Exemplo canônico do documento:

```
D = 10 mm · ae/D = 5% · fz = 0,060 mm/dente
hex = 2 × 0,060 × √(0,05 × 0,95) = 0,02615 mm = 26,15 µm
```

Excede o piso de 2,2–3,6 µm por ~7,3 a 11,9×.

**Em que ae/D o alerta dispararia?** Com fz 0,146 (WIDIA): ae/D abaixo de 0,0057% a 0,0152%. Com fz 0,060 (canônico): ae/D abaixo de 0,034% (piso 2,2 µm) a 0,090% (piso 3,6 µm). São ordens de grandeza extremamente pequenas — consequência matemática de comparar fz de centésimos de mm com piso de poucos micrômetros.

**Contagem:** 0 de 1 caso de catálogo verificável dispara; 0 de 2 incluindo o exemplo canônico. Nenhum caso de catálogo totalmente completo (com Z e ap fixados) foi encontrado.

## O piso resultante e a incerteza

Não existe piso único defensável para toda a família. O que existe é intervalo condicional:

```
h_min = k × rβ
com rβ = 10 µm (referência única) e k = 0,22–0,36 (sem consenso)
h_min = 2,2 a 3,6 µm = 0,0022 a 0,0036 mm
```

Não chamar de faixa universal de projeto: `rβ` é referência única de ferramenta específica, e `k` vem de literatura sem consenso, predominantemente de microescala e/ou corte ortogonal.

**A tela atual de 30 µm não é sustentada.** Para 30 µm ser o piso, o raio necessário seria:

```
k = 0,30 -> rβ = 100 µm
k = 0,22 -> rβ ≈ 136,4 µm
k = 0,36 -> rβ ≈ 83,3 µm
```

Nenhum valor entre 83,3 e 136,4 µm foi encontrado como especificação de `rβ` de gume de fresa inteiriça convencional. Os 30 µm devem ser removidos ou marcados como heurística não validada.

## Recomendação para a regra do produto

**Primeiro:** não usar `rβ` padrão oculto para todas as fresas. Solicitar o `rβ` informado pelo fabricante ou uma classe de preparação de gume. Sem o dado, declarar a incerteza em vez de fingir medição.

**Segundo:** não usar 30 µm como piso físico universal.

**Terceiro:** se o alerta permanecer, compará-lo a `hex`, e registrar internamente como

```
alerta físico condicional quando hex < k × rβ
```

com `k` visível e `rβ` rastreável. Na ausência de ambos, emitir "dados insuficientes para avaliar risco de esfregamento", e não um alerta numérico com falsa precisão.

Para proteger o operador contra o que o piso de `h_min` não captura, o produto provavelmente precisa de gatilhos adicionais: avanço por dente abaixo do recomendado pelo fabricante para a classe de ferramenta/material; ae/D tão pequeno que o afinamento exige correção; velocidade efetiva muito baixa em regiões de fresa esférica/toroidal; desgaste elevado; falta de rigidez ou runout excessivo. São problemas de processo distintos e não devem ser rebatizados como `h_min` sem fonte específica.

## O que ficou sem resposta

| Lacuna | Estado |
|---|---|
| Faixa de rβ para fresa inteiriça convencional de catálogo | `NÃO ENCONTRADO` |
| Efeito quantitativo do revestimento sobre rβ em catálogo comercial | `NÃO ENCONTRADO` |
| h_min/rβ para inox austenítico em fresa inteiriça convencional | `NÃO ENCONTRADO` |
| h_min/rβ para aço endurecido / Toolox 44 na fresa do artigo | `NÃO ENCONTRADO` |
| Piso direto em mm publicado por fabricante para essa classe | `NÃO ENCONTRADO` |
| Casos de catálogo com D, Z, fz, ae e ap completos | apenas um parcialmente completo; insuficiente para inferência |
| Validação experimental de hex < 0,3 rβ em fresas convencionais | `NÃO ENCONTRADO` |

## Tabela de fontes

| # | Documento e localizador | O que sustenta |
|---|---|---|
| 1 | Wojciechowski, S. (2021/2022), *"Estimation of Minimum Uncut Chip Thickness during Precision and Micro-Machining Processes of Various Materials — A Critical Review"*, Materials 15(1):59, DOI 10.3390/ma15010059, seção 6, Tabela 1 | Define h_min = k·rn; compila k; mostra dependência de material/método; alerta para a falta de modelos de fresamento oblíquo real |
| 2 | Globisch, S.; Friedrich, M.; Heidemann, N.; Döpper, F. (2024), *"Tool Concept for a Solid Carbide End Mill for Roughing and Finishing of the Tool Steel Toolox 44"*, JMMP 8(4):170, DOI 10.3390/jmmp8040170 | Fonte direta do rβ = 10 µm em ferramenta de desenvolvimento; fresa inteiriça convencional, Toolox 44 |
| 3 | Sandvik Coromant, *"Entering angle and chip thickness in milling"* | h_ex é a espessura máxima relevante para corte produtivo/confiável; fz = h_ex em aresta reta 90°; afinamento em baixo ae/D |
| 4 | WIDIA/Kennametal, *"WCE: Versatile Solid Carbide End Mills"* e catálogo métrico oficial A-22-06658EN_me (2022), p. 13 | Família WCE4/WCE5, diâmetros, canais, TiAlN/WU20PE; exemplo D=20, ae=2, fz=0,089, KFz=1,64, fz ajustado=0,146 |
| 5 | Kennametal, *"HARVI II TE • Application Data • METRIC"* | Tabelas de fz, Vc, grupos de material, diâmetros; **não** publica rβ nem piso de h_min |
| 6 | Malekian, M.; Park, S.S.; Jun, M.B.G. (2012), DOI 10.1016/j.jmatprotec.2011.05.022 | Al6061, k ≈ 0,23, microusinagem |
| 7 | Oliveira, F.B. et al. (2015), *"Size effect and minimum chip thickness in micromilling"*, IJMTM 89:39–54, DOI 10.1016/j.ijmachtools.2014.11.001 | Faixa experimental h_min/rβ = 0,22–0,36; microusinagem |

## Links

- https://pmc.ncbi.nlm.nih.gov/articles/PMC8745993/
- https://www.mdpi.com/2504-4494/8/4/170
- https://www.sandvik.coromant.com/en-us/knowledge/milling/entering-angle-and-chip-thickness
- https://www.widia.com/ae/en/products/solid-end-mills/general-purpose-end-mills/wce.html
- https://www.kennametal.com/content/dam/final/kennametal/docs/application-data/harvi-ii-te/harvi-ii-te-application-data_en.pdf
- https://doi.org/10.1016/j.jmatprotec.2011.05.022
- https://doi.org/10.1016/j.ijmachtools.2014.11.001
