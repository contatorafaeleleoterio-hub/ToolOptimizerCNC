# Relatório final de verificação — pesquisa profunda sobre parâmetros de corte CNC

> **Critério aplicado:** somente fonte primária elegível, citação verbatim e localização identificável contam como confirmação. Resultados bloqueados, cópias re-hospedadas e snippets de busca foram mantidos como limitações, não como evidência.

## BLOCO V1 — Onde entra o diâmetro efetivo em fresa esférica

**Nota de auditoria:** a fórmula completa localizada no guia Sandvik hospedado em CDN foi preservada nos arquivos de apoio, mas não foi usada como confirmação final porque o URL acessível não pertence ao domínio do fabricante, conforme a regra do documento de origem.

**Situação:** PARCIALMENTE VERIFICADO

**O que a fonte diz**

Na página oficial da Mitsubishi Materials, a ferramenta é explicitamente intitulada “Cutting Speed Formula for Ball Nose” e a página apresenta os parâmetros “ap”, “DC”, “n” e “vc”. O trecho textual disponível é:

> “Cutting Speed Formula for Ball Nose”
>
> “ap (mm)”
>
> “DC (mm)”
>
> “n (min -1 )”
>
> “vc (m/min)”
>
> “DC：Cutting Edge Diameter(mm)”
>
> “ap：Depth of Cut(mm)”

— Mitsubishi Materials Corporation, “Cutting Speed Formula for Ball Nose”, seção “Cutting Speed Formula”, [URL](https://www.mmc-carbide.com/us/technical_information/formula/tec_milling_speed_formula).

A fonte oficial da Sandvik também está identificada, mas não pôde ser aberta: o servidor exibiu literalmente:

> “The requested URL was rejected. Your request was blocked by our Web Application Firewall due to a potential security threat detected.”

— Sandvik Coromant, “Milling formulas and definitions”, [URL](https://www.sandvik.coromant.com/en-us/knowledge/machining-formulas-definitions/milling-formulas-definitions).

Foi encontrado um PDF intitulado “Metalcutting Technical Guide (D) Milling”, com a fórmula de fresa esférica no impresso D24, mas o URL acessível é um domínio CloudFront que não é o domínio do fabricante; pelas regras deste levantamento, ele não é aceito como fonte final. A inspeção local mostrou, entre outras, a fórmula textual “De = √D3² – (D3 – 2 × ap)²” e “fz = D3 × hex / De”, mas ela fica registrada apenas como pista não elegível, não como confirmação.

**Confere com o valor que eu tinha registrado?**

Não se pode declarar confirmação completa. A evidência primária da Mitsubishi confirma que a fórmula de velocidade para ball nose usa um parâmetro de diâmetro de aresta de corte, identificado como DC, e não prova, por si só, que o cálculo de avanço e rotação deva aplicar simultaneamente as duas correções. A fonte primária da Sandvik ficou inacessível; a fórmula encontrada em cópia hospedada fora do domínio do fabricante não é aceita segundo as regras fornecidas.

**O que não consegui verificar, e por quê**

Não consegui obter, em duas fontes primárias acessíveis, a transcrição verbatim completa da rotação, do avanço com D/De e de um exemplo numérico resolvido que decida se as correções são cumulativas ou alternativas. Também não localizei, em fonte primária acessível nesta rodada, uma fórmula elegível para fresa toroidal com ap < rε. Portanto, a pergunta sobre cumulatividade permanece **NÃO VERIFICADA**.

## BLOCO V2 — Tabela de força específica e segundo fabricante

**Nota de auditoria:** as linhas Walter foram conferidas no PDF oficial e mantidas com a descrição publicada, inclusive a diferença entre a descrição registrada anteriormente e o texto efetivo de P1/P6.

**Situação:** PARCIALMENTE VERIFICADO

**O que a fonte diz**

A fonte oficial da Walter é o “Technical Compendium – General”, edição 2025 em inglês, seção F, página impressa F9. O cabeçalho extraído da tabela é:

> “Cutting forces of Walter machining groups”
>
> “Tensile strength”
>
> “Spec. cutting force”
>
> “Increase value”
>
> “Walter machining group”
>
> “Rm”
>
> “kc1.1”
>
> “mc”

— Walter AG, *Technical Compendium – General*, 2025 (EN), seção F, p. F9, [PDF oficial](https://cdn2.walter-tools.com/files/a5ea48ae-5fa6-0161-3cb3-0ac22248a0fb/3ee25a79-8681-4b3e-bf39-9e7f3ca0d193/technical-compendium-general-2025-en.pdf).

As quatro linhas solicitadas aparecem assim no PDF:

> “Wrought aluminium alloy, hardened                                                                                  600           0,25             N2”
>
> “Non-alloyed and low-alloy steels, low and medium tensile strength                                  350              750        1500          0,21           P1, P6”
>
> “Hardened steels 46–52 HRC                                                                                          3000          0,25             H1”
>
> “Hardened steels 58–62 HRC                                                                                          4300          0,25             H3”

A primeira linha confirma exatamente kc1.1 = 600 e mc = 0,25 para N2. A linha P1/P6 confirma kc1.1 = 1500 e mc = 0,21, mas a descrição publicada é “Non-alloyed and low-alloy steels, low and medium tensile strength”, não a formulação registrada anteriormente como “Rm 350–750”. As linhas H1 e H3 confirmam exatamente os pares registrados.

Na tabela de conversão de dureza, a publicação informa:

> “Tensile strength, Brinell, Vickers and Rockwell hardness (extract from DIN 50150)”
>
> “Any hardness values converted on the basis of this table will be approximate only.”
>
> “See DIN 50150.”
>
> “Values in brackets are theoretically calculated values.”

— Walter AG, *Technical Compendium – General*, 2025 (EN), seção F, p. F32, [PDF oficial](https://cdn2.walter-tools.com/files/a5ea48ae-5fa6-0161-3cb3-0ac22248a0fb/3ee25a79-8681-4b3e-bf39-9e7f3ca0d193/technical-compendium-general-2025-en.pdf).

**Confere com o valor que eu tinha registrado?**

Sim para os quatro pares numéricos registrados: N2 = 600 / 0,25; P1/P6 = 1500 / 0,21; H1 = 3000 / 0,25; H3 = 4300 / 0,25. A descrição de P1/P6 deve ser corrigida para o texto efetivamente publicado. A existência e a localização da tabela DIN 50150 foram confirmadas, assim como a ressalva de que as conversões são apenas aproximadas.

**O que não consegui verificar, e por quê**

Não encontrei, em busca nas páginas públicas elegíveis consultadas de Seco Tools e Kennametal, uma tabela numérica pública separando kc1.1 e mc por material. A Seco publica uma calculadora/aplicativo de dados de corte, mas o texto acessível descreve o recurso sem apresentar os coeficientes. A página da calculadora da Kennametal ficou atrás de CAPTCHA e não publicou os valores no conteúdo acessível. Os demais fabricantes da lista ainda precisam de verificação documental individual; portanto, a existência de um segundo fabricante permanece **NÃO VERIFICADA**.

## BLOCO V3 — Três constantes atribuídas ao livro de Diniz
**Situação:** NÃO VERIFICADO

**O que a fonte diz**

Não foi possível acessar uma edição primária digital do livro *Tecnologia da Usinagem dos Materiais* para copiar a tabela, edição, capítulo e página solicitados. O registro bibliográfico institucional localizado foi o acervo da Unicamp, mas a página ficou em validação de requisição e não disponibilizou o conteúdo do livro. Os resultados de busca também retornaram cópias hospedadas por terceiros; essas cópias são expressamente inelegíveis pelas regras do levantamento.

**Confere com o valor que eu tinha registrado?**

Não se aplica. Não foi possível confirmar nem refutar os pares 1800 / 0,17; 2165 / 0,155; e 2150 / 0,185 a partir do livro primário.

**O que não consegui verificar, e por quê**

Não consegui obter o livro em edição identificada, com capítulo e página acessíveis. Não substituí a fonte por PDF re-hospedado, catálogo de terceiro, dissertação ou página que apenas atribui os números a Diniz. Consequentemente, também não foi possível verificar a condição experimental, o processo de usinagem, a faixa de espessura de cavaco, a geometria, a dureza ou qualquer advertência de validade.

## BLOCO V4 — O aço de cementação 8620
**Situação:** PARCIALMENTE VERIFICADO

**O que a fonte diz**

Foi encontrado um catálogo técnico do próprio fabricante Jongen Werkzeugtechnik, “Tooling Guide — Technical information - solid carbide tools”. Na tabela de comparação de materiais, a linha publicada é:

> “1.6523      21NiCrMo2            805M20               362        20NCD2               20NiCrMo2               20NiCrMo2     8620           1570     0,24”

— Jongen Werkzeugtechnik, *Tooling Guide — Technical information - solid carbide tools*, tabela de comparação de materiais, p. XII-30, [PDF do fabricante](https://www.jongen-werkzeugtechnik.com/out/downloads/a3e31cd4ba8b496ebd58eec867cdde50/en.pdf).

A legenda de validade imediatamente abaixo informa:

> “The values for kc 1.1 are valid for 6° positive rake angle. Per degree of another rake angle kc1.1 is corrected to 1,5 %.”
>
> “kc 1.1 is valid for ap = 1 mm and hm = 1 mm, with mc it is converted to the current values.”

— mesma publicação, p. XII-30.

Portanto, existe uma determinação publicada em catálogo de fabricante para a equivalência 1.6523 / 21NiCrMo2 / 8620: kc1.1 = 1570 N/mm² e mc = 0,24, com as condições de validade acima. A fonte não foi apresentada como ensaio específico de estado normalizado ou beneficiado; ela é uma tabela de comparação de materiais e não autoriza atribuir-lhe uma condição metalúrgica que a linha não declara.

Para a camada cementada na faixa de 58–62 HRC, a tabela Walter publicada em F9 contém:

> “Hardened steels 58–62 HRC                                                                                          4300          0,25             H3”

— Walter AG, *Technical Compendium – General*, 2025 (EN), p. F9, [PDF oficial](https://cdn2.walter-tools.com/files/a5ea48ae-5fa6-0161-3cb3-0ac22248a0fb/3ee25a79-8681-4b3e-bf39-9e7f3ca0d193/technical-compendium-general-2025-en.pdf).

**Confere com o valor que eu tinha registrado?**

Não para o par atribuído por classe de resistência da Walter: o catálogo Jongen fornece para 8620 o par 1570 / 0,24, em vez de simplesmente reutilizar 1500 / 0,21. Isso não constitui comparação linha a linha perfeitamente controlada, porque as descrições, condições e metodologias das tabelas são diferentes. Para 58–62 HRC, a Walter confirma 4300 / 0,25; nesta rodada não foi localizada uma segunda fonte primária independente com a mesma faixa de dureza e par numérico comparável.

**O que não consegui verificar, e por quê**

Não foi localizada uma publicação revisada por pares que determine especificamente 8620 e forneça simultaneamente kc1.1 e mc sob estado metalúrgico identificado. A busca encontrou trabalhos sobre usinagem, forças ou integridade superficial de 8620, mas não uma tabela elegível com os dois coeficientes. Também não foi encontrada uma segunda fonte elegível que confirme ou desminta diretamente a ordem de grandeza 4300 N/mm² para aço endurecido 58–62 HRC.

## BLOCO V5 — Fator de desgaste e rendimento de máquina
**Situação:** PARCIALMENTE VERIFICADO

**O que a fonte diz**

A página pública da calculadora de fresamento da Kennametal foi consultada, mas o acesso interativo ficou bloqueado por CAPTCHA. O conteúdo textual acessível não publicou um valor numérico para Cw nem uma documentação da fórmula do servidor. Assim, o fator de desgaste registrado não foi confirmado.

Em contraste, a Mitsubishi Materials publica explicitamente o coeficiente de máquina e um exemplo numérico:

> “η (Machine Coefficient)”
>
> “What is the cutting power required for machining mild steel at cutting speed 120m/min with depth of cut 3mm and feed 0.2mm/rev (Machine coefficient 80%)?”
>
> “Pc=(3×0.2×120×3100)÷(60×10 ³ ×0.8)=4.65(kw)”

Na mesma página, para fresamento:

> “η (Machine Coefficient)”
>
> “What is the cutting power required for milling tool steel at cutting speed 80m/min. With depth of cut 2mm, cutting width 80mm, and table feed 280mm/min by ø250 cutter with 12 insert. Machine coefficient 80%.”
>
> “Pc=(2×80×280×1800)÷(60×10 ⁶ ×0.8)=1.68kw”

— Mitsubishi Materials Corporation, “FORMULAE FOR CUTTING POWER”, seções “CUTTING POWER in TURNING” e “CUTTING POWER in MILLING”, [URL](https://www.mitsubishicarbide.net/contents/mhg/enuk/html/product/technical_information/information/formula4.html).

A Keyence, também fabricante, publica uma formulação equivalente e um exemplo:

> “η: Machine efficiency”
>
> “Specific cutting force (Kc) = 1800 MPa”
>
> “Machine efficiency (η) = 80% (0.8)”
>
> “Pc = (5 × 70 × 300 × 1800) ÷ (60 × 10 ⁶ × 0.8) = 3.937 kw”

— Keyence, “Face Milling Formulas”, seção “Net Power (Pc)”, [URL](https://www.keyence.com/ss/products/measure-sys/machining/formula/milling.jsp).

**Confere com o valor que eu tinha registrado?**

Não para a faixa completa 0,6–0,9: as fontes primárias acessíveis confirmam um exemplo pontual de 80% (0,8), não a faixa 0,6–0,9. Não foi encontrado valor publicado de Cw = 1,1–1,3 na documentação acessível da Kennametal, nem em outra fonte primária consultada. Não foi encontrado teto numérico de aproveitamento da potência nominal do fuso do tipo “usar no máximo X%” nas fontes elegíveis consultadas.

**O que não consegui verificar, e por quê**

O valor de Cw permanece **NÃO PUBLICADO** no conteúdo acessível da calculadora Kennametal: a interface foi localizada, mas o acesso foi interrompido por CAPTCHA e a documentação pública exibida não contém o número. A faixa 0,6–0,9 não foi confirmada; apenas η = 0,8 foi copiado verbatim de Mitsubishi e Keyence. Não foi localizada publicação elegível de fabricante para fator de desgaste numérico aplicado à potência ou para teto percentual de utilização da potência nominal do fuso.

## Tabela única de fechamento

| Item | Valor que eu tinha | Situação | O que a fonte publica | Onde |
|---|---:|---|---|---|
| V1 — Ball nose | Nominal vs. efetivo; fz = D × hex / De; cumulativo vs. alternativo | Parcialmente verificado | Mitsubishi usa DC, “Cutting Edge Diameter”, na fórmula de ball nose; a página Sandvik ficou bloqueada; a fórmula completa encontrada em cópia fora do domínio não é aceita | Mitsubishi, URL acima; Sandvik, URL acima |
| V2 — Walter N2 | 600 / 0,25 | Verificado | 600 / 0,25, grupo N2 | Walter, F9 |
| V2 — Walter P1/P6 | 1500 / 0,21 | Verificado | 1500 / 0,21; descrição publicada: “Non-alloyed and low-alloy steels, low and medium tensile strength” | Walter, F9 |
| V2 — Walter H1 | 3000 / 0,25 | Verificado | 3000 / 0,25 | Walter, F9 |
| V2 — Walter H3 | 4300 / 0,25 | Verificado | 4300 / 0,25 | Walter, F9 |
| V2 — DIN 50150 | Tabela por volta de F32 | Verificado | Tabela existe em F32 e avisa que conversões são aproximadas | Walter, F32 |
| V3 — Diniz 1020 | 1800 / 0,17 | Não verificado | Livro primário não acessível | Registro Unicamp; sem texto do livro |
| V3 — Diniz 1045 | 2165 / 0,155 | Não verificado | Livro primário não acessível | Registro Unicamp; sem texto do livro |
| V3 — Diniz AISI 304 | 2150 / 0,185 | Não verificado | Livro primário não acessível | Registro Unicamp; sem texto do livro |
| V4 — AISI 8620 | Sem determinação específica; 1500 / 0,21 por classe | Parcialmente verificado | Jongen publica 1.6523 / 21NiCrMo2 / 8620 = 1570 / 0,24, sob condições declaradas | Jongen, XII-30 |
| V4 — camada 58–62 HRC | 4300 / 0,25 | Parcialmente verificado | Walter publica 4300 / 0,25 para H3; segunda confirmação independente não encontrada | Walter, F9 |
| V5 — Cw | 1,1–1,3 | Não publicado | Não localizado em documentação pública acessível da Kennametal | Calculadora Kennametal, URL acima; CAPTCHA |
| V5 — rendimento | 0,6–0,9 | Parcialmente verificado | Mitsubishi e Keyence publicam exemplos com η = 0,8; a faixa inteira não foi localizada | URLs acima |
| V5 — teto de potência do fuso | teto derivado 0,77 | Não verificado | Nenhum teto numérico elegível de fabricante foi localizado | Busca em fabricantes |

## Referências

[1]: https://www.mmc-carbide.com/us/technical_information/formula/tec_milling_speed_formula "Mitsubishi Materials — Cutting Speed Formula for Ball Nose"
[2]: https://www.sandvik.coromant.com/en-us/knowledge/machining-formulas-definitions/milling-formulas-definitions "Sandvik Coromant — Milling formulas and definitions"
[3]: https://cdn2.walter-tools.com/files/a5ea48ae-5fa6-0161-3cb3-0ac22248a0fb/3ee25a79-8681-4b3e-bf39-9e7f3ca0d193/technical-compendium-general-2025-en.pdf "Walter AG — Technical Compendium – General 2025 EN"
[4]: https://www.jongen-werkzeugtechnik.com/out/downloads/a3e31cd4ba8b496ebd58eec867cdde50/en.pdf "Jongen Werkzeugtechnik — Tooling Guide"
[5]: https://www.mitsubishicarbide.net/contents/mhg/enuk/html/product/technical_information/information/formula4.html "Mitsubishi Materials — Formulae for cutting power"
[6]: https://www.keyence.com/ss/products/measure-sys/machining/formula/milling.jsp "Keyence — Face Milling Formulas"
[7]: https://www.kennametal.com/us/en/resources/engineering-calculators/end-milling.html "Kennametal — End Milling Engineering Calculator"
[8]: https://www.secotools.com/article/machining_calculators?language=en "Seco Tools — Machining calculators"
[9]: https://repositorio.unicamp.br/acervo/detalhe/968689 "Unicamp — registro bibliográfico da obra de Diniz, Marcondes e Coppini"
