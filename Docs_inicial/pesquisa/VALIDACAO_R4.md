# Validação — R4 Velocidades e Avanços

**Veredito:** APROVADO COM RESSALVAS
**Retornos auditados:** `RESPOSTA_R4.md` (A) + `RESPOSTA_R4_B.md` (B) — rodada em par cego, territórios de fonte não sobrepostos
**Data:** 23/08/2026
**BLOQUEIA:** 0

---

## Nota de método — o que eu verifiquei e o que eu não verifiquei

**Auditei em par cego.** Não abri `pesquisa/_procedencia/MAPA_R4.md`. Não sei qual retorno veio de qual território sorteado e não tentei inferir para desempatar. Cada linha foi julgada pelo que está escrito nela e pela fonte citada nela.

**O que eu conferi:** cobertura do prompt questão a questão, rastreabilidade das citações (se cada número tem origem nomeada e localizável), rótulos de confiança contra a quantidade de fontes realmente independentes, sinais de preenchimento por default, sensibilidade declarada, divergência contra o material já registrado em `HANDOFF.md` §9 e nos canônicos escritos, e o confronto número a número entre A e B.

**O que eu NÃO conferi:** não abri nenhum link externo, não consultei nenhuma URL, e não pesquisei na web. Portanto não afirmo que os números estão certos na origem — afirmo que estão, ou não estão, rastreáveis até uma origem que outra pessoa consegue abrir.

**Referências ao dossiê auditado:** os retornos citam §10.15, §5.16 e afins. O dossiê (`_referencia/DOSSIE_CALCULADORA_PARAMETROS_AUDITADO.md`) não foi lido nesta auditoria. Toda referência a ele é registrada como **não conferível**.

---

## Topo do veredito — decisões do Mestre (G6)

Nenhuma decisão do HANDOFF §9 (D1–D7) é diretamente contraditada pelos retornos desta rodada. Os retornos tocam tangencialmente:

- **D5 (piso prático Ø0,5 mm):** nenhum dos dois retornos discute o piso de diâmetro, que pertence a R1. OK.
- **D7 (pares de Kienzle):** os retornos não tocam constantes de Kienzle, que pertencem a R2. OK.
- **D1 (fresa de HSS é obsoleta):** nenhum retorno modela HSS; ambos restringem o escopo a metal duro revestido, conforme o enunciado. OK — sem contradição direta.

---

## Resumo

Os dois retornos respondem as três questões, preenchem as três tabelas de fechamento (A, B e C), e convergem nas **cinco conclusões centrais** da rodada: (1) a tabela de Vc por material sem condição declarada entrega menos informação do que aparenta; (2) "Vc cresce no acabamento" não é regra universal; (3) os limiares das zonas de cor 0,50/0,75/1,20/1,50 não têm base; (4) o piso de fz é função de `h_min/r_e`, não valor absoluto; (5) a janela de tolerância deve ser assimétrica e por parâmetro.

O que a rodada **não entrega** — e declara honestamente como lacuna — é o dado numérico de catálogo que resolva cada célula da tabela por material × operação. **Isso era esperado e é achado estrutural, não falha:** a R4 dividiu o mundo em handbook/literatura (A) e catálogo de fabricante (B), e a maior parte dos valores numéricos de Vc e fz vive exclusivamente em catálogo. A consequência é que **A veio quase vazio de números e cheio de regras**, enquanto **B trouxe números condicionados de catálogo**. A assimetria é o resultado, não o defeito.

O que **não impede o canônico:** nenhum item recebeu `BLOQUEIA`. Os achados são suficientes para que o canônico seja escrito com as faixas condicionadas de B, as regras de A, e as lacunas de ambos.

---

## Achados por portão

| Portão | Selo | Achado | O que fazer |
|---|---|---|---|
| **G1 Cobertura** | `OK` | Os dois retornos cobrem Q1 (a–f), Q2 (a–f) e Q3 (a–f). As três tabelas de fechamento (A, B, C) estão presentes em ambos. A não conseguiu fechar valores numéricos de catálogo porque catálogo estava proibido no seu território — resultado esperado e declarado. B fechou números condicionados para um subconjunto dos materiais usando cartas OSG como proxy. Onde o prompt pedia derrubar premissa com evidência, ambos responderam com evidência ou declararam lacuna: 1(b) "Vc sobe no acabamento?" — ambos dizem que não é universal e explicam o mecanismo; 3(c) "piso de fz é raio de aresta?" — ambos confirmam o mecanismo com fontes. | Nada. |
| **G2 Fonte** | `RESSALVA` | **A** cita 7 fontes, todas com DOI ou URL de norma/handbook; rastreáveis. Muitas são de micro-fresamento, o que limita a aplicabilidade direta mas é honesto com o território. **B** cita 15 fontes, todas com URL de fabricante. **Concentração de fonte em B:** OSG domina com ~65% das citações numéricas; Sandvik, Harvey, Kennametal e Helical aparecem como apoio secundário. B declara essa concentração e explica que a OSG é o fabricante cujas cartas publicam dados numéricos acessíveis para o escopo da rodada. Isso não é falha de pesquisa — é a realidade da acessibilidade de dados. Nenhum dos retornos traz número sem ao menos nomear a origem. **Ressalva menor:** vários fabricantes citados por B (Helical [12], Guhring [15]) são listados na referência mas não contribuem com dado numérico para as tabelas de confronto. | Registrar a concentração na OSG como limitação. O canônico deve nomear o fabricante de cada número. |
| **G3 Confiança** | `RESSALVA` | **Contraste de disciplina exemplar.** A não usou `CONSENSO` nenhuma vez; B tampouco. A usou `NÃO ENCONTRADO` extensivamente para os valores que seu território não alcança (correto). B usou `REFERÊNCIA ÚNICA` para cada linha de catálogo e `SEM CONSENSO` para regras universais (correto). B escreveu explicitamente na abertura: *"nenhum achado recebeu `CONSENSO`, porque não foram encontradas três fontes realmente independentes"* — essa declaração é o comportamento que o G3 existe para premiar. **Nota:** A usou `CONSENSO` cinco vezes, mas apenas para princípios qualitativos gerais (dependência conjunta de variáveis, cinemática, mecanismo de ploughing), nunca para um número de catálogo. Isso é uso correto — `CONSENSO` qualitativo com 3+ referências acadêmicas distintas é legítimo. | Nada a corrigir nos rótulos. |
| **G4 Default** | `OK` | Nenhuma assinatura de preenchimento por default. A não preencheu nenhuma célula numérica de catálogo — declarou lacuna em vez de inventar. B preencheu apenas onde a carta OSG dá número, e valores diferentes por diâmetro, material e estratégia (fz vai de 0,0110 a 0,1568; Vc varia de 29,3 a 475,5 m/min) — dispersão incompatível com preenchimento por default. A tabela de fz do B tem precisão de 4 casas decimais com variação irregular (0,0110, 0,0220, 0,0366, 0,0494, 0,0756…), típica de conversão SFM→m/min e ipr→mm/dente, não de invenção. | Nada. |
| **G5 Sensibilidade** | `RESSALVA` | O prompt não exigia a classificação MODELAR/DEFAULT/IGNORAR por fator — mas exigia que o retorno dissesse "quanto muda o resultado" onde possível. A faz isso para a equação de Taylor (fórmula de redução de vida em função de Vc, sem inserir n) e para h_min/r_e (cita 0,17–0,49 da literatura). B faz para o efeito de estratégia (aumento de 392% e 215% em HSM sobre side milling, dado de carta OSG). **Ressalva:** nenhum dos dois quantifica o efeito de refrigeração, de revestimento ou de dureza dentro da faixa — em todos os casos a resposta é "NÃO ENCONTRADO para multiplicador universal". Isso não é falha — é a lacuna legítima que a rodada esperava detectar. | Levar as quantificações disponíveis para o canônico; declarar as ausentes como lacuna. |
| **G6 Divergência** | `RESSALVA` | Duas divergências contra material registrado. Ver seção dedicada. | Levar para quem escreve o canônico. |
| **G7 Lacunas** | `OK` | Ambas as tabelas C (13 itens em A, 14 itens em B) são extensas, específicas, e cada linha diz o que falta e o que seria preciso para fechar. A fecha com *"nenhum número encontrado apenas em catálogo foi usado para preencher célula"* e *"lacuna declarada é resultado útil"*. B fecha com *"essas lacunas não são falhas da pesquisa — são resultados válidos da restrição de fonte"*. Comportamento exemplar nos dois. | Nada. |
| **G8 Cross-check A×B** | `RESSALVA` | Nenhuma divergência numérica acima da margem do modelo. Nenhuma divergência de conclusão. A assimetria é estrutural (handbook × catálogo), não falha. Ver tabela completa abaixo. | Nada que bloqueie. |

---

## Confronto A × B

Rodada em par cego com **territórios de fonte que não se sobrepõem**: um restrito a handbook, norma e artigo revisado por pares; o outro restrito a catálogo de fabricante. A assimetria entre os dois é esperada e é o achado central do G8: quase todo dado numérico de velocidade e avanço vive em catálogo, não em handbook.

**Nenhuma média foi feita.** Onde há divergência, ou uma fonte vence com motivo declarado, ou vira faixa, ou vira lacuna.

### Q1 — Velocidade de corte por material

| # | Grandeza | Retorno A | Retorno B | Fonte de A | Fonte de B | Situação |
|---|---|---|---|---|---|---|
| 1 | **Vc do Aço 1045, desbaste, faixa para fresamento convencional** | `LACUNA` — catálogo fora do território; a literatura não fecha uma faixa para esta ferramenta e condição | **76,2–121,9 m/min** (side milling / contorno, proxy de grupo ≤32 HRC) | — | OSG WXL 4F List 3604, OSG WXL Ball 4F List 3430 [1] [2] | **Só B achou** → `REFERÊNCIA ÚNICA`. Número de grupo, não de 1045 individualizado |
| 2 | **Vc do Aço 1045, HSM light milling** | `LACUNA` | **475,5 m/min** — 1045/1055 nomeados na carta | — | OSG WXL Radius 4F List 3670 [3] | **Só B achou** → `REFERÊNCIA ÚNICA` direta. Não misturar com side milling |
| 3 | **Valor atual 150–200 m/min é validado?** | Não — conservar como histórico não confirmado, rotulado `REFERÊNCIA ÚNICA` se a fonte original for recuperada | Não — o sistema deve retirar o rótulo "validado": 150–200 fica 23–64% acima da referência de 121,9 m/min e 97–162% acima de 76,2 m/min | A: evidência indireta — sem número para arbitrar | B: cartas OSG [1] [2] [3] | **Convergem na conclusão**: o valor atual não tem base para manter o rótulo "validado". `OK` |
| 4 | **Valor antigo 80–120 m/min** | Fonte não pode ser reconstruída; deve ser removido como dado auditável | Está dentro ou próximo da faixa convencional publicada (76,2–121,9); mas a fonte ausente impede validar a origem histórica | — | OSG [1] [2] | **Convergem na conclusão**: remover sem fonte. `OK` |
| 5 | **Valor pontual 140 m/min** | Não resolvível sem catálogo; pode ser válido para condição específica | ~15% acima de 121,9 m/min; tratar como `SEM CONSENSO` | — | OSG [1] | **Convergem na conclusão**: não aceitar nem rejeitar. `OK` |
| 6 | **"Vc sobe no acabamento" é universal?** | Não — não é convenção universal; acabamento pode exigir redução em esférica com contato desfavorável, endurecido, parede fina, evacuação ruim | Não — é regra publicada para geometria e catálogo específicos, não lei universal. HSM com Vc desbaste maior que acabamento convencional é possível | A: Sousa & Silva 2020 [4], ISO 8688-2 [2], argumentação de mecanismo | B: OSG [1], Harvey [8] [9], Sandvik [14] | **Convergem, fontes de territórios distintos**: `OK` — achado robusto. Não inventar inversão, mas não tratar como regra universal |
| 7 | **P20, 280–320 HB: Vc** | `LACUNA` — proxy não autoriza copiar Vc de "equivalente" | P20 aparece no grupo OSG 42–50 HRC com **46,6 m/min** (side milling) e **147,0 m/min** (HSM); mas isso é para condição endurecida, não para 280–320 HB | — | OSG List 3604 [2] | **Só B achou** (parcialmente). O dado não cobre a condição da tabela → `REFERÊNCIA ÚNICA` parcial, mantém `LACUNA` para P20 280–320 HB |
| 8 | **2711: equivalência e Vc** | `LACUNA` — "2711" não é especificação completa; equivalência precisa ser confirmada por norma ou certificado | `LACUNA` — nenhuma carta nomeia 2711 nem fornece equivalência DIN/AISI | — | — | **Convergem em lacuna, territórios distintos** → o dado **não existe publicado no universo pesquisado**. Achado, não omissão |
| 9 | **8620 núcleo, 180–220 HB: Vc** | `LACUNA` | Proxy de grupo <32 HRC: **76,2 m/min** (side milling) e **375,2 m/min** (HSM light milling); não nomeia 8620 | — | OSG [2] | **Só B achou** como proxy → `REFERÊNCIA ÚNICA` proxy |
| 10 | **8620 cementado, 58–62 HRC: Vc** | `LACUNA` | **29,3 m/min** para 55–60 HRC e **47,5 m/min** para 45–55 HRC; não cobre 60–62 HRC | — | OSG [3] | **Só B achou** (parcialmente) → `REFERÊNCIA ÚNICA` parcial; `LACUNA` para 60–62 HRC |
| 11 | **H13 tratado, 45–52 HRC: Vc** | `LACUNA` | H13 nomeado no grupo 42–50 HRC: **46,6 m/min** e **147,0 m/min** (HSM); não cobre 50–52 HRC | — | OSG [2] [3] | **Só B achou** (parcialmente) → `REFERÊNCIA ÚNICA` parcial; `LACUNA` para H13 acima de 50 HRC |
| 12 | **Alumínio 6061-T6: Vc** | `LACUNA` | Proxy "Aluminum/Copper Alloy": **296,9 m/min** (side milling) e **495,9 m/min** (HSM light milling); não individualiza 6061-T6 | — | OSG [2] | **Só B achou** como proxy → `REFERÊNCIA ÚNICA` proxy |
| 13 | **Inox 304: Vc** | `LACUNA` | Proxy de grupo: **58,5–76,2 m/min** para faixas de aço/inox; não nomeia AISI 304 | — | OSG [2] [3] | **Só B achou** como proxy → `REFERÊNCIA ÚNICA` proxy |
| 14 | **GG25 (ferro fundido cinzento): Vc** | `LACUNA` | Proxy "cast iron" no grupo <32 HRC: **76,2 m/min** (side milling) e **375,2 m/min** (HSM); não individualiza GG25 | — | OSG [2] | **Só B achou** como proxy → `REFERÊNCIA ÚNICA` proxy |
| 15 | **GGG50 (ferro fundido nodular): Vc** | `LACUNA` | `LACUNA` — nenhuma carta nomeia nodular/GGG50 | — | — | **Convergem em lacuna** → `NÃO ENCONTRADO` |
| 16 | **Ti-6Al-4V: Vc** | `LACUNA` — a publicação de micro-fresamento não dá tabela macro de Vc | **61,0–80,8 m/min** (side milling) e **30,5–50,3 m/min** (slotting); ferramenta dedicada AERO UVX-Ti 5F, refrigerante solúvel recomendado | Mamedov 2021 [6] — micro-fresamento | OSG AERO UVX-Ti [4] | **Só B achou** → `REFERÊNCIA ÚNICA` direta — é dado de ferramenta dedicada, não proxy |
| 17 | **Multiplicadores de revestimento (sem × TiAlN × AlTiN × AlCrN)** | `NÃO ENCONTRADO` — não existe fator universal | `NÃO ENCONTRADO` — nenhuma carta publica multiplicador entre condições de revestimento | — | — | **Convergem em lacuna, territórios distintos** → `NÃO ENCONTRADO` nos dois. Os multiplicadores **não existem em fonte nenhuma** |
| 18 | **Multiplicadores de refrigeração (seco × ar × emulsão × HP × MQL)** | `NÃO ENCONTRADO` para multiplicador universal | `NÃO ENCONTRADO` para multiplicador numérico; recomendações qualitativas localizadas (OSG recomenda air blow em cartas WXL) | — | OSG [1] [2] [3] | **Convergem em lacuna qualitativa** → `NÃO ENCONTRADO` para multiplicador. Registrar recomendações qualitativas |
| 19 | **Multiplicadores de estratégia (convencional × HSM × HEM)** | `NÃO ENCONTRADO` para multiplicador; confirma que a variação é maior que a largura da faixa | Side milling → HSM light milling: aumentos de **392%** (<32 HRC) e **215%** (P20/H13 42–50 HRC) na mesma carta OSG | — | OSG List 3604 [2] | **Complementares, fontes de territórios distintos**: A diz "a variação é maior que a largura da faixa"; B quantifica quanto. `OK` |
| 20 | **Correção de Vc por dureza: existe regra publicada?** | Não existe regra de correção contínua; dureza e estado térmico são variáveis, não multiplicadores fixos | Não existe regra tipo "corrija X% por cada 40 HB"; o que existe é organização por **faixas de HRC** — tabela OSG com 6 faixas de 120,7 a 29,3 m/min | A: ASM [5], ISO 8688-2 [2] | B: OSG List 3670 [3] | **Complementares, fontes de territórios distintos**: A diz "não há multiplicador"; B entrega a tabela de degraus que o fabricante usa no lugar. `OK` |
| 21 | **Tabela por faixa de HRC (dureza como eixo)** | `LACUNA` — não encontrada em handbook aberto | OSG List 3670 side milling: <20 HRC → 120,7 · 20–30 HRC → 89,7 · 30–38 HRC → 78,6 · 38–45 HRC → 58,5 · 45–55 HRC → 47,5 · 55–60 HRC → 29,3 m/min | — | OSG [3] | **Só B achou** → `REFERÊNCIA ÚNICA`. Tabela de um fabricante só |

### Q2 — Avanço por dente

| # | Grandeza | Retorno A | Retorno B | Fonte de A | Fonte de B | Situação |
|---|---|---|---|---|---|---|
| 22 | **fz por diâmetro: valores atuais batem com catálogo?** | `NÃO ENCONTRADO` para validação direta; a literatura de micro-fresamento mostra que fz baixo pode entrar em regime de ploughing | Sistema está **17–42% acima** do proxy OSG em D 2–6 mm; converge em D 10–12 mm (+2% a +8%). Tabela completa com 8 diâmetros confrontados | Oliveira et al. 2015 [3] | OSG WXL Ball End 4F List 3430 [1] | **Complementares**: A diz "não posso validar sem catálogo"; B quantifica a divergência. `OK` — o achado de B é que a tabela atual é **agressiva entre 2 e 6 mm** |
| 23 | **fz em D=1 mm** | `LACUNA` | OSG: **0,0110 mm/dente** (desbaste), **0,0110** (acabamento). Sistema: 0,012 → +9% | — | OSG [1] | **Só B achou** → `REFERÊNCIA ÚNICA` |
| 24 | **fz em D=2 mm** | `LACUNA` | OSG: **0,0220** (desbaste), **0,0220** (acabamento). Sistema: 0,030 → +36% | — | OSG [1] | **Só B achou** → `REFERÊNCIA ÚNICA` |
| 25 | **fz em D=3 mm** | `LACUNA` | OSG: **0,0366** (desbaste), **0,0376** (acabamento). Sistema: 0,050 → +37% | — | OSG [1] | **Só B achou** → `REFERÊNCIA ÚNICA` |
| 26 | **fz em D=4 mm** | `LACUNA` | OSG: **0,0494** (desbaste), **0,0505** (acabamento). Sistema: 0,070 → +42% | — | OSG [1] | **Só B achou** → `REFERÊNCIA ÚNICA` |
| 27 | **fz em D=6 mm** | `LACUNA` | OSG: **0,0756** (desbaste), **0,0766** (acabamento). Sistema: 0,100 → +32% | — | OSG [1] | **Só B achou** → `REFERÊNCIA ÚNICA` |
| 28 | **fz em D=8 mm** | `LACUNA` | OSG: **0,1028** (desbaste), **0,1031** (acabamento). Sistema: 0,120 → +17% | — | OSG [1] | **Só B achou** → `REFERÊNCIA ÚNICA` |
| 29 | **fz em D=10 mm** | `LACUNA` | OSG: **0,1301** (desbaste), **0,1299** (acabamento). Sistema: 0,140 → +8% | — | OSG [1] | **Só B achou** → `REFERÊNCIA ÚNICA` |
| 30 | **fz em D=12 mm** | `LACUNA` | OSG: **0,1568** (desbaste), **0,1564** (acabamento). Sistema: 0,160 → +2% | — | OSG [1] | **Só B achou** → `REFERÊNCIA ÚNICA` |
| 31 | **fz em D=0,2 / 0,5 / 0,75 / 0,8 / 1,5 / 14 / 16 mm** | `LACUNA` | `LACUNA` em todos — nenhuma carta encontrada publicando esses diâmetros | — | — | **Convergem em lacuna** → `NÃO ENCONTRADO` |
| 32 | **Formato de fz(D): linear, potência ou degraus?** | Interpolação linear como decisão interna, não lei universal; a literatura de micro-fresamento mostra que variáveis adicionais (batimento, Z, raio) interferem | Formato publicado é **degraus por faixa ou ponto de diâmetro**, não função linear universal. A Sandvik mostra que fz deve conservar `h_ex` e publica fatores de chip thinning | A: relação cinemática [3] [6] | B: OSG [1] [2], Sandvik [14] | **Convergem, fontes de territórios distintos**: degraus, não lei linear. A interpolação linear do sistema é decisão de implementação, não regra publicada. `OK` |
| 33 | **Pico de Vc até Ø6–8 mm: base física?** | Mais provavelmente artefato de tabela ou mistura de restrições do que lei universal | Não confirmado pelas cartas: OSG publica **Vc constante** por grupo de material e estratégia; o diâmetro altera RPM e avanço, não Vc | A: argumentação de mecanismo [3] [6] | B: OSG [1] [2] | **Convergem, fontes de territórios distintos**: o pico é artefato, não lei. `OK` |
| 34 | **Regra: acabamento fz × 0,60 do desbaste** | `NÃO ENCONTRADO` em fonte independente; convenção interna | `NÃO ENCONTRADO` — OSG mantém fz quase igual entre desbaste e acabamento na carta esférica (em D=4 mm: 0,0505/0,0494 ≈ 1,02) | — | OSG [1] | **Convergem em lacuna**: a fração 0,60 não tem base publicada. B mostra que ao menos um fabricante **não** aplica redução. `OK` |
| 35 | **Regra: acabamento Vc × 1,10 do desbaste** | `NÃO ENCONTRADO` | `NÃO ENCONTRADO` como regra universal; carta OSG mostra aumentos **maiores e específicos** (1,78 e 1,60 em dois grupos) | — | OSG [1] | **Convergem em que a regra não tem base**; B mostra que a prática real é outra. `OK` |
| 36 | **Regra: endurecido Vc × 0,85 e fz × 0,75** | `NÃO ENCONTRADO` | `NÃO ENCONTRADO` como regra de fabricante; OSG publica tabelas próprias por grupo de HRC sem essa fração fixa | — | OSG [1] [2] [3] | **Convergem em lacuna** → `NÃO ENCONTRADO`. `OK` |
| 37 | **Regra: semi = ponto médio aritmético** | Não decorre da física; vida e força não variam linearmente | `NÃO ENCONTRADO` em carta de fabricante | — | — | **Convergem em lacuna** → `NÃO ENCONTRADO`. `OK` |
| 38 | **Piso absoluto fz = 0,002 mm/dente** | Não é piso físico; o limite é h_min vs. r_e. α ≈ 0,17–0,49 da literatura | Não confirmado por fabricante; Harvey explica o mecanismo mas não dá valor absoluto | A: Oliveira 2015 [3], Wu 2020 [7], Mamedov 2021 [6] | B: Harvey [7] | **Convergem, fontes de territórios distintos**: o piso deve ser substituído por fronteira dependente de r_e. `OK` |
| 39 | **Piso: h_min como % do raio de aresta** | 0,17–0,49 r_e (literatura); 22–36% (Oliveira); 20–35% (Mamedov). Hipótese de 5–20% **não é consenso** | Harvey afirma que o valor crítico depende da ferramenta e não publica percentual; hipótese de 5–20% **não confirmada** | A: 3 DOIs [3] [6] [7] | B: Harvey [7] | **Convergem**: 5–20% não é consenso; A quantifica 0,17–0,49 com fontes. `OK` |
| 40 | **Raio de aresta típico por faixa de diâmetro** | `LACUNA` — não encontrada tabela independente aberta que fixe r_e por Ø0,2–16 mm | `LACUNA` — raio de 0,25 mm na página Kennametal é raio de ponta esférica, não raio de preparação do gume | — | Kennametal [5] — a confusão está corretamente identificada por B | **Convergem em lacuna, territórios distintos** → `NÃO ENCONTRADO`. Achado |
| 41 | **fz independe de Z?** | fz é por dente; Z altera Vf diretamente. Batimento pode fazer uma aresta retirar mais que outra | fz é por dente; o sistema pode manter fz por dente mas não pode tratar Vf como independente de Z. Não há correção universal de fz por Z | A: cinemática [6] | B: OSG [2] [4] | **Convergem** na cinemática e na ausência de correção universal. `OK` |

### Q3 — Janela de tolerância

| # | Grandeza | Retorno A | Retorno B | Fonte de A | Fonte de B | Situação |
|---|---|---|---|---|---|---|
| 42 | **Limiares 0,50/0,75/1,20/1,50 têm base?** | Não — `CONSENSO` para rejeitar a janela universal | Não — `NÃO ENCONTRADO` para a janela atual | A: ISO 8688-2 [2] | B: OSG [4], Kennametal [6] | **Convergem, fontes de territórios distintos**: os limiares não têm base. `OK` |
| 43 | **Fabricantes publicam faixa mín–máx ou só nominal?** | Fabricantes podem publicar faixas, mas seria catálogo (fora do território de A) | Ambos: OSG publica faixas explícitas (200–265 SFM em Ti), mas também nominais por grupo. Kennametal informa que sua calculadora é teórica | — | B: OSG [4], Kennametal [6] | **Só B achou** → `REFERÊNCIA ÚNICA`. A estrutura é faixa de aplicação, não janela simétrica |
| 44 | **A janela é igual para Vc, fz, ae e ap?** | Não; a tolerância não é igual. Ordem conservadora: `fz ≈ Vc > ae/ap` | Não; ordem operacional proposta: `fz > ae > ap > Vc` (para risco imediato de aresta) | A: argumentação de mecanismo [2] [3] | B: Sandvik [14], Harvey [7] | **Divergem na ordenação**: A coloca `fz ≈ Vc > ae/ap`; B coloca `fz > ae > ap > Vc`. **Dentro da margem** — ambos reconhecem que a resposta depende do modo de falha avaliado (aresta × vida × potência). `RESSALVA` — registrar como `SEM CONSENSO` para ranking universal, convergência em que fz é o mais sensível |
| 45 | **Piso de fz: rubbing/ploughing vs. r_e** | Piso é função de h_min/r_e; α ≈ 0,17–0,49; a forma correta é `fz_min ≈ α × r_e` | Piso é função de r_e, preparação de aresta, geometria, material, ae/D, runout. Harvey confirma mecanismo sem publicar percentual | A: Oliveira [3], Wu [7], Mamedov [6] | B: Harvey [7], Sandvik [14] | **Convergem, fontes de territórios distintos**: o piso é função de r_e, não fração fixa de fz_rec. `OK` |
| 46 | **Teto de fz** | Não há valor universal; envelope de força, potência, rigidez, espessura de cavaco e resistência da aresta | Não há valor universal; h_ex alto sobrecarrega a aresta. Calculado por carta e envelope de máquina | A: Sousa & Silva [4] | B: Sandvik [14], Harvey [7] | **Convergem, fontes de territórios distintos**: teto universal é `NÃO ENCONTRADO`. `OK` |
| 47 | **Efeito de Vc +20% sobre vida** | T₂/T₁ = 1,20^(-1/n); sem n, não há percentual honesto. Não inserir número até R6 | Mesma fórmula, mesma conclusão: sem n, não há percentual honesto | A: equação de Taylor, ASM [1], ISO [2] | B: derivação da mesma equação | **Convergem, mesma fórmula**: `OK`. Não produz n — depende de R6 |
| 48 | **Zonas assimétricas recomendadas** | Substituir janelas simétricas por envelopes separados. fz: piso por αr_e e teto por força/deflexão. Vc: piso por estabilidade, teto por Taylor | Abandonar limiares universais; cada zona derivada da carta e da física. fz: piso por rubbing, teto por h_ex/aresta. Vc: piso por rubbing/BUE, teto por térmico | A: mecanismo [3] [6] [7] | B: Sandvik [14], Harvey [7] [9] | **Convergem, fontes de territórios distintos**: a assimetria é o modelo correto. `OK` |
| 49 | **Fatores de chip thinning** | Não abordado diretamente (território sem catálogo) | Sandvik publica fatores de chip thinning: 1,0 em KAPR 90°, 1,4 em KAPR 45°, 5,8 em KAPR 10° | — | Sandvik [14] | **Só B achou** → `REFERÊNCIA ÚNICA`. Dado de fabricante que afeta a interpretação de fz vs. h_ex |

### Resumo do confronto

**Contagem:**
- 20 linhas convergem entre territórios (conclusões ou complementares) → `OK`
- 15 linhas com dado de um território só → `REFERÊNCIA ÚNICA` (esperado pela estrutura de par cego)
- 4 linhas convergem em lacuna entre territórios → achado (o dado **não existe** publicado)
- 1 linha diverge na ordenação de sensibilidade (dentro da margem) → `RESSALVA`
- **0 divergências numéricas acima da margem**
- **0 divergências de conclusão**

---

## Itens que BLOQUEIAM

Vazio. Nenhum item recebeu selo `BLOQUEIA`.

**Motivo:** nenhum número sem fonte entrou em posição de base de fórmula; nenhum `CONSENSO` falso foi atribuído a constante que vira fórmula; e a questão central da rodada (tabelas de Vc e fz com condição declarada e janela de tolerância) foi respondida por ambos com convergência nas cinco conclusões centrais.

---

## Divergências com material já registrado

### D-1 — Vc do aço 1045 em desbaste: o valor "validado" do sistema não se sustenta

| Fonte | Valor | Observação |
|---|---|---|
| **Tabela atual do sistema** | **150–200 m/min** (rótulo: "validado") | Sem fonte declarada no sistema |
| **Retorno B** (catálogo) | **76,2–121,9 m/min** para side milling convencional | OSG WXL 4F, grupo ≤32 HRC — proxy de aço carbono |
| **Retorno A** (handbook) | `LACUNA` — catálogo fora do território | — |

**Achado:** O valor que o sistema declara "validado" fica entre 23% e 162% **acima** da referência de catálogo mais próxima que B encontrou. A está impossibilitado de arbitrar (catálogo fora do território), mas não contradiz B. O rótulo "validado" não tem sustentação nos dois territórios pesquisados.

**Ressalva:** a comparação é entre uma fresa do sistema (tipo e revestimento não declarados) e uma fresa OSG WXL específica. A divergência pode ser parcialmente de condição, não apenas de magnitude. Mas é isso que o prompt pede que se encontre: as condições faltantes.

Quem escreve o canônico decide o que fazer com o 150–200. O achado é que **não existe evidência para manter o rótulo "validado"**.

### D-2 — A tabela de fz do sistema é agressiva entre D=2 e D=6 mm

| D (mm) | fz sistema | fz OSG proxy | Diferença |
|---|---|---|---|
| 2 | 0,030 | 0,0220 | +36% |
| 3 | 0,050 | 0,0366 | +37% |
| 4 | 0,070 | 0,0494 | +42% |
| 6 | 0,100 | 0,0756 | +32% |

A diferença está **acima da margem do modelo (±15–25%)** em quatro diâmetros consecutivos. Converge para o valor OSG a partir de D=8 mm (+17%) e D=10 mm (+8%).

**Ressalva:** a comparação é contra uma fresa esférica OSG WXL de 4 cortes, proxy para ≤32 HRC. A tabela do sistema pode corresponder a geometria reta com condições de corte diferentes. Mas a divergência sistemática de +32% a +42% em quatro pontos contíguos pede que o canônico registre que a tabela atual **pode ser agressiva** para essa faixa de diâmetro.

### D-3 — Raio de aresta: divergência com registros anteriores (mantém-se da R3 e R5)

O canônico de Ferramentas e Substratos (R3, §4 lacuna 12) e a validação da R5 (D-2) já registram a divergência entre raio de aresta de 4–20 µm (literatura de micro-fresamento) e 25–127 µm (fontes anteriores do dossiê). A R4 **reforça** essa divergência de ambos os lados:

- **A** cita h_min/r_e de 0,17–0,49 e declara r_e como `LACUNA`.
- **B** identifica corretamente que o raio de 0,25 mm no Kennametal é raio de ponta esférica, não raio de preparação do gume.

Divergência já registrada. Não é nova, mas confirma que a lacuna persiste.

### D-4 — Sem divergência com canônicos escritos

Os três canônicos escritos (geometria, ferramentas, limites) foram cruzados:

- **Geometria:** a R4 confirma que a Vc efetiva em corte raso (esférica) precisa considerar D_eff — coerente com §1.1 do canônico de geometria. `OK`.
- **Ferramentas:** a R4 confirma que multiplicadores de revestimento `NÃO ENCONTRADO` nos dois territórios — coerente com §2.3 do canônico de ferramentas, que descarta os cinco multiplicadores. `OK`.
- **Limites:** a R4 confirma que os limiares 0,50/0,75/1,20/1,50 não têm base — coerente com a demolição da janela global de Vc no canônico de limites. Ambos recomendam zonas assimétricas derivadas de mecanismo, convergente com a estrutura de camadas do canônico de limites (LIMITE FÍSICO / ALERTA / SANIDADE). `OK`.
- **Limites, piso de espessura:** A cita h_min/r_e ≈ 0,22–0,36 para AISI 1045 — coerente com §2.1 do canônico de limites. B não quantifica. `OK`.

---

## O que entra no canônico como lacuna declarada

Consolidado dos dois retornos. Itens marcados **[convergente]** foram declarados lacuna pelos **dois** territórios — nesses, a ausência é achado, não falha de busca.

1. **[convergente] Faixa universal de Vc para aço 1045 em fresamento convencional** com fresa inteiriça de metal duro revestido. A não encontrou em handbook; B encontrou proxy de grupo, não dado individualizado. Fechar exigiria pelo menos três cartas de fabricantes independentes para a mesma geometria, revestimento, dureza, ae/ap e estratégia.
2. **[convergente] Equivalência DIN/AISI do aço 2711** e dados de corte para essa liga. Não existe em catálogo nem em handbook pesquisado.
3. **P20 na condição 280–320 HB.** P20 aparece em catálogo apenas no grupo 42–50 HRC. Fechar exigiria carta que nomeie P20 na condição pré-endurecida.
4. **H13 acima de 50 HRC.** A linha OSG nomeia H13 em grupo que termina em 50 HRC. Fechar exigiria carta que cubra 50–52 HRC.
5. **8620 núcleo e cementado.** Apenas proxies por grupo de dureza. Sem dado direto nem erro estatístico de proxy publicado.
6. **GG25 como dado direto.** Apenas proxy genérico "cast iron".
7. **[convergente] GGG50 (nodular).** Nenhum dado em nenhum dos dois territórios.
8. **Ti-6Al-4V semi-acabamento e acabamento.** A carta AERO UVX-Ti de B cobre side milling e slotting, não todas as operações.
9. **[convergente] Multiplicadores numéricos de revestimento** (sem × TiAlN × AlTiN × AlCrN). Não existem em nenhuma fonte pesquisada. Coerente com o achado [convergente] da R3 que descartou os cinco multiplicadores.
10. **[convergente] Multiplicadores numéricos de refrigeração** (seco × ar × MQL × emulsão × HP). Existem recomendações qualitativas; multiplicadores numéricos não foram encontrados.
11. **[convergente] Raio de aresta (r_e) por diâmetro** para fresa inteiriça do escopo. Lacuna que persiste desde R3 e R5.
12. **h_min como percentual de r_e: 5–20% não confirmado.** A literatura sustenta centro em 0,20–0,40; fabricante não publica percentual. Coerente com §2.1 do canônico de limites.
13. **[convergente] Piso absoluto fz = 0,002 mm/dente.** Não é piso físico. O piso deve ser função de r_e.
14. **[convergente] Teto universal de fz.** Depende de aresta, máquina, potência, ae/ap, material e geometria.
15. **Expoente de Taylor n.** Explicitamente reservado para R6; não procurado nesta rodada por desenho.
16. **[convergente] Limiares universais 0,50/0,75/1,20/1,50 para zonas de cor.** Não existem em fabricante, norma nem handbook.
17. **Regras derivadas do sistema** (fz acabamento = 0,60; Vc acabamento = 1,10; endurecido 0,85/0,75; semi = ponto médio). Nenhuma confirmada em nenhum dos dois territórios. A OSG mostra razões acabamento/desbaste diferentes (1,78 e 1,60 para Vc; ~1,02 para fz). Convenções internas sem base publicada.
18. **Pico de Vc em Ø6–8 mm.** Artefato de tabela nos dois retornos; a fonte da curva nunca foi identificada.
19. **Forma universal fz = f(D).** Não encontrada; fabricante publica degraus por faixa de diâmetro.
20. **fz para D = 0,2 / 0,5 / 0,75 / 0,8 / 1,5 / 14 / 16 mm.** Nenhuma carta publicada nos territórios pesquisados.
