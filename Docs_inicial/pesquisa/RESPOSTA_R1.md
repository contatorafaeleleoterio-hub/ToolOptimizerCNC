# Notas de pesquisa — fresamento CNC

## Escopo

Validar ap, ae, faixa de diâmetros, microfresas e estratégias convencionais/HEM para fresas inteiriças de metal duro em moldes e matrizes.

## Fontes iniciais acessadas

1. MSC Industrial Supply, "End Mills / Your Guide to Perfect Milling", https://www.mscdirect.com/resources/buying-guides/end-mills
  - Define ADOC como profundidade ao longo do eixo e RDOC como largura perpendicular ao eixo; RDOC de rasgo pleno = D.
  - Afirma que ferramentas mais curtas e de maior diâmetro aumentam rigidez.
  - Indica que reduzir profundidade axial/radial é uma ação contra chatter; avanço leve demais pode causar rubbing.
  - Traz fórmulas de rpm, avanço, chip load e SFM, mas é guia de distribuidor, não catálogo de fabricante primário.

1. RedLine Tools, "End Mill Selection Guide", https://www.redlinetools.com/resources/endmill-information
  - Distingue fresa esférica para superfícies contornadas, fresa toroidal/corner-radius e ferramentas de acabamento.
  - Explica HEM/dynamic milling como ae radial menor e ap axial maior, usando mais comprimento de corte, espalhando calor/desgaste e apoiando-se em radial chip thinning.
  - Relaciona número de canais à rigidez, espaço de cavaco e acabamento.
  - Fonte de fabricante/distribuidor; útil para conceito, mas não suficiente para fixar multiplicadores universais.

1. Machining Doctor, "Ball Nose Surface Finish: Calculators & Formulas", https://www.machiningdoctor.com/calculators/ball-nose-surface-finish/
  - Afirma que stepover é parâmetro fundamental em superfícies 3D e que aumento de stepover aumenta scallop height.
  - Diz que maior diâmetro de fresa esférica reduz a altura de crista para o mesmo stepover e aumenta rigidez.
  - Apresenta escolha de stepover a partir do acabamento desejado; menciona sweet spot próximo de 30% do raio, mas é fonte secundária/comercial.
  - O conteúdo textual não expôs a fórmula renderizada; será necessário recuperar/derivar e confirmar em fonte primária ou acadêmica.

1. Kennametal, "High-Performance • Micro-Machining End Mills", https://www.kennametal.com/us/en/products/metalworking-tools/milling/solid-end-milling/high-performance-solid-carbide-end-mills/high-performance-micro-machining-end-mills.html
  - Catálogo online mostra ferramentas de micro-usinagem de metal duro com diâmetros de corte de 0,2 a 6,0 mm, incluindo ball nose e square end.
  - Lista materiais de aplicação desde aços, inox e não ferrosos até materiais endurecidos; há linhas KenCut MM/MEMM.
  - Demonstra que Ø0,2 mm é comercialmente oferecido por grande fabricante, mas não prova que seja adequado a máquina convencional.

## Hipóteses a testar nas próximas buscas

- Catálogos de fabricantes tendem a publicar ap/ae como condição de corte ligada à operação, geometria, material e comprimento de corte, não como lei universal ap = kD para acabamento.
- Para acabamento 3D com ball nose/toroidal, a altura de crista e a geometria local devem governar o stepover (ae); ap tende a ser limitado pelo sobremetal deixado e pela geometria/rigidez, não por uma constante universal.
- HEM exige par ae baixo/ap alto e parâmetros de chip thinning; misturar ae alto com ap alto pode ser incoerente dependendo do catálogo e da máquina.
- Microfresas abaixo de 1 mm precisam fontes específicas de catálogo e aplicação, além de análise de rpm/velocidade periférica.

## Pendências

- Recuperar catálogos primários Sandvik, Seco, Walter, Mitsubishi, OSG, Guhring, Iscar e Kennametal com tabelas de ap/ae/feeds/speeds.
- Localizar fórmulas verificáveis de scallop height para ball nose e toroidal.
- Confirmar faixas mínimas/máximas de pelo menos três fabricantes e distinguir fresa inteiriça de cabeçote indexável.
- Quantificar rpm, Vc real e sensibilidade para diâmetros pequenos.
- Pesquisar calculadoras de referência e comportamento quando o diâmetro extrapola tabela.

## Confirmação por páginas primárias abertas no navegador

1. Sandvik Coromant, "What is profile milling?", https://www.sandvik.coromant.com/en-us/knowledge/milling/profile-milling
  - Classifica ball nose como ferramenta de acabamento e superacabamento, enquanto insertos redondos/conceitos com raio são usados em desbaste e semi-desbaste.
  - Para ball nose de metal duro de Ø10 mm em aço 400 HB, dá exemplo de corte profundo ap = Dc/2, com Vc = 170 m/min e fz = 0,08 mm/dente; em semi-acabamento ap = 2 mm, Vc pode subir para 300 m/min; em superacabamento ae = 0,1 mm, Vc pode chegar a 5× o valor de referência e fz fica condicionado pela qualidade superficial.
  - Afirma explicitamente que, usando o diâmetro nominal em ball nose com ap raso, a velocidade real de corte é muito menor; recomenda calcular por diâmetro efetivo em corte Dcap.
  - Recomenda inclinação de 10–15° para afastar o centro da ferramenta (Vc próximo de zero), melhorar formação de cavaco, vida e acabamento.
  - Em geração de superfícies esculpidas, a altura de crista depende de ae e fz; ap também influencia forças e TIR/runout. Para melhores resultados, a quantidade de sobremetal deve ser constante e pequena antes do acabamento.
  - Para acabamento/superacabamento, a fonte recomenda fz aproximadamente igual a ae e uso de cutter inclinado de dois dentes.
  - Para vibração em perfis profundos, reduzir profundidade de corte, velocidade ou avanço; minimizar balanço e escolher maior diâmetro possível compatível com a geometria.

1. Kennametal, "High-Performance Micro-Machining End Mills", https://www.kennametal.com/us/en/products/metalworking-tools/milling/solid-end-milling/high-performance-solid-carbide-end-mills/high-performance-micro-machining-end-mills.html
  - A página confirma linhas KenCut MM/MEMM de microfresas inteiriças, incluindo ball nose e square end, em versões curtas, longas e com pescoço estendido.
  - O filtro do catálogo mostra diâmetros de corte de 0,2 a 6,0 mm para a família de micro-usinagem; o menor Ø0,2 mm aparece em ferramenta comercial listada.
  - A família oferece 2 e 3 canais, com aplicações em aços, inox, alumínio, materiais endurecidos e não ferrosos.

## Consequência imediata

A Sandvik fornece evidência primária forte contra a ideia de uma constante universal para acabamento: em ball nose, ap raso altera diâmetro efetivo, Vc e fz; ae e fz controlam a crista, enquanto ap está ligado ao contato, força, TIR e sobremetal. Também confirma que o sistema deve modelar diâmetro efetivo e não repetir silenciosamente Vc nominal em cortes rasos.

## Fontes acadêmicas sobre crista/scallop e geometria efetiva

1. Segonds, Seitier, Bordreuil, Bugarin, Rubio e Redonnet, "An analytical model taking feed rate effect into consideration for scallop height calculation in milling with torus-end cutter", Journal of Intelligent Manufacturing, 2017, DOI 10.1007/s10845-017-1360-0; manuscrito HAL: https://hal.science/hal-01826032v1/document
  - Estudo revisado por pares voltado explicitamente a superfícies complexas de moldes e matrizes com ferramenta toroidal.
  - Define raio efetivo do corte como a projeção da marca deixada pela ferramenta em plano normal ao avanço; o stepover necessário para uma altura de crista alvo depende diretamente desse raio efetivo, que por sua vez depende da geometria toroidal, inclinação local e direção de usinagem.
  - Para superfície local plana, a altura de crista devido ao stepover é h1 = Reff − sqrt(Reff² − sod²/4). A contribuição entre passagens de dentes é h2 = TReff − sqrt(TReff² − fz²/4), e a altura total é sh = h1 + h2.
  - A fonte ressalta que o efeito do avanço na crista total é frequentemente não desprezível; runout radial/axial modifica a crista de forma dependente da configuração.
  - Em ferramenta toroidal, o raio efetivo transversal pode variar do raio de ponta r até o raio externo R conforme inclinação e direção; portanto ae não deve ser um percentual fixo universal de D.
  - O modelo é mais complexo para implementação geral, mas fornece fundamento para uma versão de primeira ordem baseada em altura de crista alvo e raio efetivo.

1. Soori, Karimi Ghaleh Jough e Arezoo, "Surface quality enhancement by constant scallop-height in three-axis milling operations", Results in Surfaces and Interfaces, 2024, DOI 10.1016/j.rsurfi.2024.100208, https://www.sciencedirect.com/science/article/pii/S266684592400028X
  - Artigo open access que trata de superfícies planas, convexas e côncavas e otimiza avanço, rotação e stepover para manter altura de crista uniforme.
  - Relata redução de rugosidade superficial de 23,8% em sua validação específica; não deve ser transformado em constante universal.
  - Mostra que a escolha do stepover depende da curvatura local e do alvo de scallop, reforçando que ae para acabamento deriva da geometria e qualidade requerida.

1. Xu, Zhang e Sun, "Swept surface-based approach to simulating surface topography in ball-end CNC milling", International Journal of Advanced Manufacturing Technology 98, 107–118 (2018), DOI 10.1007/s00170-017-0322-1, https://link.springer.com/article/10.1007/s00170-017-0322-1
  - Artigo revisado por pares sobre moldes/matrizes que modela a topografia como superfície varrida da aresta de corte, incluindo rotação, avanço, inclinação, intervalo de trajetória e runout.
  - Valida o modelo com experimentos e conclui que a seleção de parâmetros de corte deve considerar a topografia gerada, não apenas uma regra de diâmetro.

1. Hendriko, "Analytical Boundary Method for Obtaining Feed Scallop of Toroidal Cutter in Multi-Axis Milling", Key Engineering Materials 728, 48–53 (2017), DOI 10.4028/www.scientific.net/KEM.728.48, https://www.scientific.net/KEM.728.48
  - Propõe método analítico de altura de crista de avanço para ferramenta toroidal em superfície livre, incluindo ângulo de inclinação e validação contra Siemens NX.
  - As referências do artigo incluem Suresh & Yang (1994), Feng & Li (2002), Bedi et al. (1997) e Senatore et al. (2012), formando uma base independente para a dependência de scallop em raio efetivo, stepover, curvatura e orientação.

## Fórmulas geométricas de primeira ordem

Para uma fresa esférica em superfície plana e baixa densidade de efeitos secundários, com raio R = D/2 e stepover ae, a crista geométrica entre passes é:

h = R − sqrt(R² − (ae/2)²).

Invertendo para um alvo h:

ae = 2 sqrt(2Rh − h²) = 2 sqrt(Dh − h²). Para h << D, ae ≈ 2 sqrt(Dh). Portanto, ae/D ≈ 2 sqrt(h/D), não um percentual constante. Exemplo: se h = 0,01D, ae ≈ 0,20D; se h = 0,0025D, ae ≈ 0,10D.

Para ferramenta toroidal e superfície inclinada, substituir R por raio efetivo Reff ou usar o modelo de Segonds/Hendriko; além disso, considerar crista na direção do avanço via fz e raio transversal efetivo.

## Catálogos adicionais de fabricante

1. Guhring, página de condições de corte para End Mills, https://www.guhring.com/SpeedsAndFeeds/SpeedFeed/ToolChart?toolType=Milling%20Cutters
  - A página reúne 420 registros de séries e links de tabelas PDF por ferramenta, distinguindo acabamento, desbaste, HSC/HPC e materiais.

1. Guhring, série 3019 Finish Tech 50 / GH 100 U, https://guhring.com/media/speedfeed/3019.pdf
  - Tabela de aplicações estabelece, para acabamento, ae de 0,01D até 0,1D e ap de 1D até 2D; para HPC-roughing, ae 0,15D–0,4D e ap 1D–2D; para HSC-roughing, ae 0,05D–0,15D e ap 1D–2D.
  - A tabela também apresenta slotting e desbaste com faixas próprias, mostrando que o fabricante não usa um par único de multiplicadores em todas as operações.
  - Para aços estruturais até 850 N/mm², o acabamento com ferramenta de 6/8 canais aparece com Vc 240 m/min e fz tabelado por diâmetro; para aços endurecidos e inox os valores mudam de modo relevante.
  - Em alumínio, a tabela usa outras velocidades e avanços, confirmando que material e tipo de ferramenta são variáveis de primeira ordem.

1. Guhring, série 3101 GF 500 B/GF 300 B Ball nose, https://guhring.com/media/speedfeed/3101.pdf
  - Para aços até 28 HRC, a ferramenta ball nose tem condições distintas para ae = 0,1D, 0,03D e 0,01D; para aços endurecidos até 54 HRC aparecem ae = 0,1D, 0,02D e 0,01D.
  - Para acabamento, o quadro-resumo informa WOC/ae de aproximadamente 0,002–0,012 in e DOC/ap de aproximadamente 0,002–0,012 in nos diâmetros listados; os valores crescem com o diâmetro, mas não configuram um ap constante nem uma proporção única universal.
  - O catálogo separa alcance até 3D, 3–5D e 5–10D, reduzindo Vc/fz a 100%, 80% e 60%, respectivamente. Isso é evidência direta de que rigidez/balanço deve ser campo ou multiplicador explícito.

1. Guhring, série RF100, https://guhring.com/media/speedfeed/3099.pdf
  - Para acabamento, recomenda WOC/ae de 0,01D até 0,1D; para aços endurecidos 54–60 HRC limita WOC a menos de 0,1D.
  - A tabela de acabamento usa Vc baseado na coluna correspondente a aproximadamente 0,25D e instrui não aumentar IPT além dos valores tabelados, reforçando que ae pequeno afeta condições de corte.

1. Mitsubishi Materials, "Recommended Cutting Conditions" para ferramentas sólidas VQMHVRBF, https://www.mitsubishicarbide.net/contents/mmus/enus/manual/solid_end_mills_VQMHVRBF.pdf
  - A tabela mostra explicitamente ap e ae por diâmetro e por grupo de material/operação; em vários exemplos, ap e ae são valores absolutos que aumentam com DC, não uma constante fixa de acabamento.
  - Exemplo legível para shoulder milling: com DC 6, 8, 10, 12 e 16 mm aparecem profundidades axiais como 0,3; 0,4; 0,5; 0,6; 0,8 mm e larguras radiais como 4,8; 6,4; 8; 9,6; 12,8 mm em uma das condições, além de condições diferentes para outros materiais.
  - A fonte adverte que chatter pode ocorrer se rigidez da máquina/fixação for insuficiente e recomenda reduzir avanço e velocidade proporcionalmente; também diz que, quando a profundidade é menor que a mostrada, rotação e avanço podem ser aumentados.

## Implicação para Q1/Q3

Guhring 3019 é uma fonte primária forte contra ap = 0,5 mm universal: publica acabamento como faixa de ae 0,01–0,1D e ap 1–2D para uma família de ferramentas específicas, enquanto Guhring ball nose e Mitsubishi mostram pares que variam com ferramenta, diâmetro, material, alcance e operação. Isso não autoriza transportar esses números diretamente para qualquer fresa ou máquina; sustenta uma arquitetura por ferramenta/material/estratégia com limites e avisos.

## Faixa comercial de diâmetros

1. Walter, "Technical Compendium – Milling", edição 2024, https://cdn.walter-tools.com/files/sitecollectiondocuments/downloads/global/manuals/en-gb/technical-compendium-milling-2024-en.pdf
  - O compêndio informa que a Walter oferece desde mini-fresas de metal duro inteiriço com diâmetro de 0,3 mm até cabeçotes/cabeçotes de facear com pastilhas intercambiáveis de até 315 mm.
  - Para linhas específicas de metal duro, mostra MD133 dynamic milling em 6–20 mm, ConeFit em 10–25 mm e outras famílias; o limite de 315 mm é de ferramentas com pastilhas, não de fresa inteiriça.
  - Em dinâmica, a linha MD133 usa 5–6 dentes, 6–12 mm para cinco dentes e 16–20 mm para seis dentes; catálogo também informa ae ≤ 0,10D em ISO P e ≤ 0,03D em ISO M/S para shoulder milling em uma geometria específica.
  - A própria fonte separa explicitamente fresa sólida de metal duro (a partir de 0,3 mm) de cabeçote com pastilhas (até 315 mm), sustentando uma mudança de catálogo/tipo de ferramenta no topo da faixa.

1. Mitsubishi Materials, "Solid End Mills", https://www.mitsubishicarbide.net/mmus/enus/solid_end_mills/OMB03F001/
  - Catálogo lista numerosas séries de ball nose, square e corner-radius de metal duro inteiriço e também linhas de cabeça intercambiável.
  - Menciona explicitamente fresa corner-radius VQ4XLRB com pequeno diâmetro de Ø0,125 inch (~3,175 mm) e linha VQXL com Ø1,0 mm; esses exemplos não são extremos globais, mas confirmam disponibilidade comercial em faixa submilimétrica/milimétrica.
  - O catálogo distingue "Solid Carbide" de "Head Exchangeable", importante para arquitetura do produto.

1. Kennametal, "High-Performance Solid Carbide End Mills", https://www.kennametal.com/us/en/products/metalworking-tools/milling/solid-end-milling/high-performance-solid-carbide-end-mills.html
  - Filtro do catálogo lista cutting diameter de 0,2 mm a 50,8 mm na família de high-performance solid carbide end mills, incluindo muitos tamanhos intermediários e aplicações em shoulder, pocket, profile e ball nose.
  - O resultado precisa ser tratado como faixa do catálogo/filtro e não como garantia de que todo tipo de geometria e comprimento exista em cada diâmetro; o catálogo tem famílias distintas e filtros configuráveis.

1. OSG, linha de ball nose de metal duro, https://osgtool.com/milling/solid-milling/ball-nose/8590/
  - Resultado de pesquisa do catálogo oficial identifica a linha 8590 como fresa esférica de acabamento de alta precisão para aços de alta dureza, com diâmetro Ø0,2 mm.
  - A extração textual da página é incompleta por conteúdo dinâmico; o dado do diâmetro deve ser citado como registro de catálogo/resultado do fabricante, e a faixa máxima da linha precisa de uma página/catálogo adicional antes de ser fechada.

## Conclusão provisória para Q2(a,d)

Há evidência primária de fresas inteiriças submilimétricas: Walter 0,3 mm, Kennametal 0,2 mm e OSG 0,2 mm. Para o topo, Walter documenta solid carbide em famílias até 25 mm e uma faixa especial 6–20 mm; acima disso, o próprio compêndio muda para ferramentas com pastilhas, chegando a 315 mm. Kennametal lista alguns diâmetros sólidos até 50,8 mm, mas a interpretação deve ser verificada por SKU e não deve ser usada para declarar que 50 mm é padrão de oficina. A faixa do produto deve ser definida por catálogo e tipo de ferramenta, não por um limite físico abstrato de 200 mm.

## Micro-usinagem e limite de rotação

1. Kirsch, Bohley, Arrabiyeh e Aurich, "Application of Ultra-Small Micro Grinding and Micro Milling Tools: Possibilities and Limitations", Micromachines 8(9), 261 (2017), DOI 10.3390/mi8090261, https://pmc.ncbi.nlm.nih.gov/articles/PMC6190133/
  - Estudo experimental de microferramentas de 50 µm e menores; relata microfresas de metal duro fabricadas até cerca de 10 µm e ferramentas de moagem até 4 µm, mas destaca que a aplicação é muito desafiadora.
  - A máquina de microfresagem usada tinha spindle de mancal aerostático de 125.000 rpm e runout de 2–4 µm; outra máquina de precisão usava 54.000 rpm com runout de 3–6 µm. Isso caracteriza uma infraestrutura distinta de centros convencionais.
  - O artigo usa substrato de carboneto de tungstênio com grão de 0,2 µm em ferramentas ultrapequenas e observa a necessidade de reduzir erro de reclamp/runout.

1. Mamedov, "Micro milling process modeling: a review", Manufacturing Reviews 8, 3 (2021), DOI 10.1051/mfreview/2021003, https://mfr.edp-open.org/articles/mfreview/full_html/2021/01/mfreview200041/mfreview200041.html
  - Revisão open access: microfresagem não é simplesmente uma versão reduzida do fresamento convencional; os modelos tradicionais perdem validade à medida que fz/D cresce e entram em cena chip thickness variável, runout, deflexão, ploughing e dinâmica do spindle-ferramenta.
  - Para aços, a literatura citada encontra espessura mínima de cavaco na ordem de 20–35% do raio da aresta para diferentes microestruturas; a revisão também destaca que o raio de aresta e a espessura não cortada determinam a transição entre corte e ploughing.
  - Modelos de forças precisam considerar o conjunto máquina–spindle–microfresa, não apenas o diâmetro nominal.

1. Wojciechowski, "Estimation of Minimum Uncut Chip Thickness during Precision and Micro-Machining Processes of Various Materials—A Critical Review", Materials 15(1), 59 (2022), DOI 10.3390/ma15010059, https://pmc.ncbi.nlm.nih.gov/articles/PMC8745993/
  - Define h_min como espessura crítica de cavaco não cortado que inicia cisalhamento e formação de cavaco; abaixo dela predomina deformação elástica/ploughing.
  - Afirma que microfresagem costuma usar ferramentas de metal duro com D ≤ 1 mm e registra ferramentas comerciais com diâmetros de 50 µm; abaixo de 50 µm, ferramentas sem hélice são usadas por limitações de fabricação e maior rigidez.
  - A revisão conclui que h_min depende de raio de aresta, parâmetros, material da peça e material da ferramenta; não existe um percentual único transferível.

1. Liu et al., "Experimental Study on the Minimum Undeformed Chip Thickness Based on Effective Rake Angle in Micro Milling", Micromachines 11(10), 924 (2020), DOI 10.3390/mi11100924, https://www.mdpi.com/2072-666X/11/10/924
  - Encontra h_min ≈ 0,17 r_n para cobre em seu método/condição; compila literatura com aproximadamente 0,1–0,3 r_n e outros estudos entre 0,15–0,49 r_n, evidenciando dispersão dependente de material/geometria.
  - Usa microfresa de Ø1 mm, metal duro ultrafino, raio de aresta medido de 4,4 µm e centro de usinagem de microfresagem com 30.000 rpm.
  - Explica que quando a espessura não cortada é menor que o raio da aresta, surge ângulo de saída efetivo negativo, ploughing e piora de rugosidade; se fz < h_min, a ferramenta pode apenas riscar/esfregar.

1. Cálculos próprios, a partir de Vc = π·D·n/1000:
  - Para D = 0,2 mm e Vc = 200 m/min, n = 318.309,9 rpm.
  - Com spindle limitado a 12.000 rpm, atingir Vc = 200 m/min exigiria D = 5,3052 mm; com 24.000 rpm, D = 2,6526 mm.
  - Para D = 0,2 mm, a 12.000 rpm, Vc real = 7,54 m/min; a 24.000 rpm, Vc real = 15,08 m/min, apenas 3,8% e 7,5% de 200 m/min, respectivamente.

## Regra provisória para borda inferior

A calculadora deve distinguir "comercialmente disponível" de "adequado à máquina". Para um spindle máximo n_max e uma velocidade mínima operacional Vc_min escolhida pelo catálogo da ferramenta, o diâmetro mínimo de processo é D_proc,min = 1000·Vc_min/(π·n_max). Se D < esse valor, a calculadora deve emitir aviso forte de Vc insuficiente e de possível alteração do regime térmico/formação de cavaco; não deve silenciosamente manter os mesmos parâmetros. O piso de 0,5 mm é plausível para a oficina convencional do usuário, mas não é limite físico universal: fabricantes oferecem 0,2–0,3 mm e a literatura usa 50 µm ou menos em máquinas dedicadas.

## Calculadoras de referência e extrapolação

1. Kennametal, "Speeds and Feeds Calculator", https://www.kennametal.com/us/en/resources/engineering-calculators/miscellaneous/speed-and-feed.html
  - A calculadora pública separa cálculos teóricos de SFM, diâmetro, rpm, avanço e chip load; afirma que são apenas para planejamento e que resultados reais variam.
  - Para dados aplicados, exige acesso à aplicação/material/ferramenta; a FAQ ressalta que dureza, ferramenta, máquina, coolant e estabilidade alteram RPM e avanço.
  - O comportamento recomendado é não mascarar o fato de que cálculo geométrico genérico é diferente de recomendação de catálogo específica.

1. Sandvik Coromant, "Machining calculator app", https://www.sandvik.coromant.com/en-us/machining-calculators-apps/machining-calculator-app
  - Página oficial oferece aplicativo de cálculo para turning, milling, drilling, tapping e reaming, mas a extração pública não expõe seus limites internos.
  - Deve ser citada apenas para confirmar a existência de uma calculadora integrada ao catálogo; não há base para afirmar como trata extrapolação.

1. FSWizard, "Help using FSWizard", https://app.fswizard.com/help_using_fswizard
  - Exige que o usuário informe diâmetro da aresta, número efetivo de canais, stickout, comprimento de flauta, raio de canto, hélice, lead angle, ae/ap e rpm máximo.
  - Calcula "Effective Dia" para ball nose e tapered end mills e avisa que o diâmetro efetivo difere do diâmetro de ponta, alterando velocidade e avanço.
  - Tem campo de Max RPM; possui compensações separadas de chip thinning e HSM e declara que chip thinning é recomendado para desbaste, não para acabamento quando prejudicar a superfície.

1. HSMAdvisor, "Chip Thinning and HSM", https://hsmadvisor.com/help?article_id=4574_chip-thinning-and-hsm-high-speed-machining
  - Explica que chip thinning surge em ae menor que o raio da ferramenta ou, para ferramentas com raio/ball nose, em ap menor que o raio de canto; separa o aumento de fz do aumento de Vc/RPM.
  - Recomenda não ativar chip thinning ao acabar paredes e pisos se isso deteriorar o acabamento; HSM pode ser usado para aumentar Vc em perfis/acabamento.
  - Isso sustenta campos/flags explícitos de estratégia e impede que a calculadora aplique multiplicador de fz silenciosamente.

1. G-Wizard, "Calculator: Setup", https://www.cnccookbook.com/g-wizard-calculator-setup/
  - Permite perfil de máquina com Max RPM, potência, avanço máximo, rigidez, coolant e aceleração.
  - A recomendação é manter os cortes dentro dos limites da máquina; não existe evidência, nessa fonte, de que dados de ferramenta fora do catálogo sejam repetidos silenciosamente.

1. G-Wizard, "Little-Known Factors...", https://www.cnccookbook.com/little-known-factors-make-g-wizard-great-big-small-cnc-machines/
  - Descreve limites por potência, faixa de rpm e avanço, advertências de deflexão e rubbing, compensação de radial chip thinning, ball nose e lead angle.
  - Afirma calibrar-se com muitos catálogos e permitir inserir dados reais do fabricante; isso é uma prática de referência melhor do que copiar a última linha tabelada.

## Veredito provisório para Q2(f)

A prática observada é limitar por perfil de máquina/ferramenta, expor efetive diameter e flags de compensação, e permitir override explícito. Não encontrei fonte pública suficiente para afirmar o comportamento interno de todas as versões de G-Wizard/HSMAdvisor quando um diâmetro ultrapassa a última linha de um catálogo. Portanto, a calculadora do produto não deve repetir silenciosamente parâmetros de Ø16: deve marcar "extrapolado", mostrar a última linha-base, fórmula/fator e incerteza, ou recusar quando a extrapolação ultrapassar o envelope de validade.

## Regra interna de microfresas — verificação

1. A busca em catálogos e literatura primária não encontrou uma regra universal publicada como "microfresas <1 mm: ap = 0,5D e ae ≤ 0,3D". As fontes encontradas sustentam que microfresas exigem parâmetros próprios e que h_min, raio de aresta, runout, rigidez, material e dinâmica dominam, mas não fixam esses dois multiplicadores como limite geral.

Veredito para Q2(e): SEM CONSENSO para os multiplicadores propostos; como política conservadora interna, 0,5D de ap e 0,3D de ae podem ser defaults de uma família de ferramenta, mas devem ser etiquetados como default de processo validado, não como limite físico nem recomendação universal de fabricante. A calculadora deve exigir catálogo/SKU ou perfil "microfresa" e produzir aviso quando fz nominal se aproximar de h_min.

## Q3 — multiplicadores e estratégias

1. A linha Guhring 3019 publica a separação de estratégias: acabamento ae 0,01–0,1D e ap 1–2D; HPC-roughing ae 0,15–0,4D e ap 1–2D; HSC-roughing ae 0,05–0,15D e ap 1–2D; roughing ae 0,4–0,9D e ap 0,5–1D. É uma referência de família específica, não uma lei universal.

1. A linha Walter MD133/HDC publica dinâmica com ae pequeno e ap grande, limitado pelo comprimento de corte; dá examples com ap 2–5D e ae de poucos por cento a cerca de 10% D, dependendo de ISO/material e ângulo de engajamento. Em contraste, a comparação Walter HPC vs HDC classifica HPC como ae grande/ap menor e HDC como ae pequeno/ap grande, com requisitos de CAM/máquina dinâmica.

1. A linha HSMAdvisor confirma que, para ae menor que o raio, há radial chip thinning; a compensação de chip load e a de Vc/RPM são decisões independentes. Para acabamento, a própria documentação desaconselha ativar chip thinning se isso deteriorar a superfície.

## Veredito preliminar para multiplicadores atuais

- Desbaste ae = 0,45D em aço e 0,50D em alumínio, combinado com ap = 1D até Ø6 e 0,8D acima, descreve fresamento convencional/HPC de alto engajamento, não HEM/HDC. O par é coerente com a escola de alto ae/ap moderado e fica dentro de faixas de catálogo Guhring (ae 0,4–0,9D; ap 0,5–1D), mas não é consenso para todas as ferramentas/materials.
- O par não deve ser chamado de HEM. Se HEM/HDC for oferecido, precisa outra estratégia: ae baixo, tipicamente 0,03–0,15D para HDC/HSC ou 0,15–0,4D para HPC, e ap alto limitado por Lc, rigidez e engajamento; fz e Vc devem ser recalculados por chip thinning/ângulo de engajamento.
- Semi-acabamento ae = 0,30D e ap = 0,50D é plausível como default de oficina, porém não encontrei consenso independente que o fixe; deve ser condicionado ao sobremetal constante deixado e ao comprimento/rigidez.
- Acabamento ae = 0,035–0,08D está dentro de faixas de alguns catálogos, mas sua base principal deve ser o scallop/qualidade alvo. Em ball nose/toroidal, ae deve ser calculado pela altura de crista e raio efetivo; em parede vertical com fresa reta, a largura radial e ap são definidos pelo sobremetal, rugosidade, deflexão e comprimento de corte.

## Cálculos de sensibilidade e impacto

1. Para fresa esférica em superfície plana, a fórmula usada foi h = D/2 − sqrt((D/2)^2 − (ae/2)^2). Os valores calculados são:

| D | ae/D | ae | h geométrico |
| --- | --- | --- | --- |
| 6 mm | 3,5% | 0,21 mm | 0,00184 mm |
| 10 mm | 3,5% | 0,35 mm | 0,00306 mm |
| 16 mm | 3,5% | 0,56 mm | 0,00490 mm |
| 6 mm | 8% | 0,48 mm | 0,00962 mm |
| 10 mm | 8% | 0,80 mm | 0,01603 mm |
| 16 mm | 8% | 1,28 mm | 0,02564 mm |

A altura de crista cresce aproximadamente com ae²/D para ae pequeno. Logo, 10% de erro em ae produz aproximadamente 21% de erro em h; 10% de erro em D produz aproximadamente 10% de erro inverso em h. Esses fatores justificam MODELAR o alvo de scallop/ae e não usar ae/D como constante universal.

1. Valores de ap atuais calculados:

| D | ap=0,20D | ap=0,30D | ap fixo 0,50 | referência Guhring de acabamento ball nose (faixa representativa) |
| --- | --- | --- | --- | --- |
| 6 mm | 1,20 mm | 1,80 mm | 0,50 mm | ~0,10 mm |
| 10 mm | 2,00 mm | 3,00 mm | 0,50 mm | ~0,20 mm |
| 16 mm | 3,20 mm | 4,80 mm | 0,50 mm | ~0,30 mm |

A comparação não é uma validação universal porque a ferramenta, material e alcance da Guhring são específicos. Ainda assim, evidencia que ap=0,20D e ap≤0,30D podem ficar aproximadamente 9–17 vezes acima da referência de acabamento dessa família, enquanto o teto fixo 0,50 mm fica 1,5–4 vezes acima, dependendo do diâmetro. O valor fixo não escala como o catálogo, mas é menos agressivo para D pequenos e mais agressivo para D grandes.

1. Regra de diâmetro efetivo para ball nose em corte raso sobre superfície plana, derivada da seção circular: D_eff = 2·sqrt(D·ap − ap²), com 0 < ap ≤ D/2. Assim, D_eff/D = 2·sqrt((ap/D)·(1−ap/D)). Para ap=0,2D, D_eff=0,8D; para ap=0,05D, D_eff≈0,436D. A rotação baseada em D nominal subestima Vc real no contato raso; usar D_eff é uma decisão acoplada a ap, não independente.

1. Sensibilidade de crista na aproximação h≈ae²/(2D): ∂ln h/∂ln ae≈2 e ∂ln h/∂ln D≈−1. Sensibilidade de Vc efetiva, mantendo rpm, é ∂ln Vc/∂ln D_eff=1; como D_eff depende de ap, a escolha de ap também altera a velocidade real de corte da ball nose.
