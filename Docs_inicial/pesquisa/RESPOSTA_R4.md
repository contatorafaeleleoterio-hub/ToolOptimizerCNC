<!-- CABECALHO DE PROCEDENCIA - adicionado ao arquivar. O corpo abaixo esta INTACTO. -->
# RESPOSTA R4 (A) - Velocidades e Avancos - territorio: handbook, norma e literatura

> **Retorno cru.** Nao editado. Vale por ser cru - e registro de procedencia.
> **Rodada:** R4, executada em par cego. Este e o retorno **A**.
> **Territorio:** handbook de engenharia, norma, artigo revisado por pares, tese.
> Catalogo de fabricante estava PROIBIDO neste retorno, por desenho.
> **Ferramenta:** IA externa. **Data da pesquisa declarada:** 20/08/2026. **Arquivado:** 20/08/2026.
> **Titulo original do arquivo entregue:** "Relatorio de validacao - parametros de fresamento CNC".
> O nome e enganoso: **isto nao e uma validacao**, e o retorno de pesquisa. A validacao
> desta rodada sera gravada em `VALIDACAO_R4.md`, por um auditor que nao pesquisou.

---

# Relatório de validação — parâmetros de fresamento CNC

**Idioma:** português do Brasil.  
**Território de fontes desta rodada:** handbooks, literatura técnica, normas e artigos revisados por pares. Catálogos de fabricantes, distribuidores, blogs, calculadoras e documentos que já consolidem a resposta não foram usados como confirmação independente.  
**Data da pesquisa:** 20 de agosto de 2026.

> **Conclusão executiva.** As tabelas atuais não podem ser validadas como dados universais. A literatura confirma as relações físicas — velocidade, avanço, espessura de cavaco, raio de aresta, desgaste, refrigeração e profundidades são variáveis acopladas —, mas não fornece, neste território, uma tabela aberta e independente que feche todas as combinações material × diâmetro × revestimento × estratégia. Portanto, as células numéricas exatas pedidas para catálogos recebem **LACUNA**, e não um número substituto.

## Bloco 1 — Questão 1(a): divergência do aço 1045 em desbaste

**Veredito:** a divergência não pode ser resolvida por consenso no território desta rodada; 150–200 m/min, 140 m/min e 80–120 m/min não são intercambiáveis sem definir ferramenta, geometria, revestimento, largura/profundidade de corte, refrigeração, vida-alvo e condição metalúrgica.

**Confiança:** **NÃO ENCONTRADO** para uma faixa numérica de catálogo dentro do território; **CONSENSO** apenas para a regra de que a velocidade deve ser determinada conjuntamente com material da ferramenta, dureza e vida-alvo.

| Evidência | Condição | Resultado aplicável |
|---|---|---|
| Davis, *Metals Handbook Desk Edition*, 2ª ed., ASM, 1998, pp. 901–904 | Handbook; resumo público, sem tabela integral aberta | A seleção do material da ferramenta define faixas de aplicação em velocidade e avanço, além de tenacidade e resistência ao desgaste [1]. |
| ISO 8688-2:1989 | Ensaio de vida em fresamento | A vida é tratada em função de velocidade, avanço e profundidades axial/radial; não existe limiar universal independente da condição [2]. |
| Oliveira et al., 2015 | Microfresamento de AISI 1045, sem fluido, Vc=60 m/min, ae=D | Demonstra que mesmo em 1045 a resposta depende de escala, fz, ap e raio de aresta; não é uma tabela de Vc para fresamento convencional [3]. |

O valor de **140 m/min** pode ser uma condição pontual válida para uma combinação específica, mas estar fora de 150–200 m/min não prova erro. O valor antigo **80–120 m/min**, cuja fonte desapareceu, deve ser removido como dado auditável: sua procedência não pode ser reconstruída. A pergunta solicita catálogo; esse tipo de fonte está explicitamente fora do território desta rodada. Logo, a resposta operacional correta é: **LACUNA — localizar o catálogo primário da fresa inteiriça revestida, com classe do metal duro, diâmetro, número de cortes, ae/ap, condição de corte e vida-alvo; sem isso, não escolher entre 150–200 e 80–120 m/min**.

**Regra recomendada:** conservar 150–200 m/min apenas como valor histórico não confirmado, rotulado `REFERÊNCIA ÚNICA` se a fonte original puder ser recuperada, e não como `CONSENSO`. Até a recuperação, o sistema deve emitir “faixa sem validação” e exigir confirmação do operador.

**Se o valor atual estiver errado:** a consequência não é quantificável pela literatura encontrada sem o expoente de vida, geometria e carga. Um valor excessivo tende a elevar temperatura e desgaste; um valor baixo pode favorecer aresta postiça e corte ineficiente. Não atribuir porcentagem de vida sem um ensaio Taylor específico.

## Bloco 2 — Questão 1(b): aumento de Vc no acabamento

**Veredito:** a monotonicidade “desbaste < semi < acabamento” não é uma convenção universal. O acabamento pode admitir Vc maior em algumas condições porque reduz carga por dente, ae/ap ou espessura de cavaco, mas a causa não é simplesmente “tirar menos material”.

**Confiança:** **SEM CONSENSO** para a regra monotônica; **CONSENSO** para a dependência de Vc em material, ferramenta, geometria, calor, desgaste e condição de corte.

Em desbaste, a prioridade costuma ser taxa de remoção, e a combinação de ae, ap e fz produz maior carga, temperatura e potência. Em acabamento, pode haver menor engajamento e menor espessura efetiva de cavaco, permitindo elevar Vc para produtividade e acabamento superficial. Entretanto, uma passada de acabamento com ae pequeno e ap grande, uma parede fina, uma cavidade com evacuação ruim ou uma ferramenta esférica em contato desfavorável pode exigir redução, não aumento, de Vc. O mecanismo é a combinação entre espessura de cavaco, calor, rigidez, contato e vida da ferramenta; não uma regra “acabamento sempre mais rápido”. A revisão de ferramentas revestidas documenta mecanismos de abrasão, adesão, aresta postiça, delaminação e trincas térmicas dependentes dos parâmetros e da condição térmica [4].

| Relação atual | Avaliação | Regra segura |
|---|---|---|
| Vc acabamento > Vc desbaste | Não universal | Permitir somente quando ae/ap, fz, geometria e vida-alvo justificarem. |
| Vc constante por material | Incompleta | Usar junto com condição da ferramenta e do corte. |
| Vc menor para material mais duro | Princípio geral, não tabela automática | Separar dureza, microestrutura e tratamento térmico. |

**Situação de inversão:** ferramenta esférica em baixa altura de contato, material endurecido, parede fina, refrigeração deficiente, ferramenta sem revestimento ou acabamento com contato prolongado podem tornar o acabamento mais severo termicamente ou dinamicamente. Não há base para conservar a relação crescente nos nove materiais como regra de software.

## Bloco 3 — Questão 1(c): seis estimados e equivalências

**Veredito:** as faixas numéricas exatas solicitadas não foram encontradas em fonte permitida e aberta; os materiais podem ser classificados por família e dureza, mas isso não autoriza copiar Vc de um “equivalente”.

**Confiança:** **NÃO ENCONTRADO** para as faixas publicadas pedidas; **REFERÊNCIA ÚNICA** para equivalências aproximadas quando baseadas em designação metalúrgica, não em comportamento idêntico de usinagem.

| Material do sistema | Proxy admissível para pesquisa | Limitação do proxy | Situação da faixa Vc |
|---|---|---|---|
| P20, 280–320 HB | Aço ferramenta pré-endurecido da mesma faixa de dureza, tipicamente grupo P | Composição, inclusões, tratamento e estado de fornecimento podem alterar usinabilidade | **LACUNA**; não usar 100–120 como validado. |
| 2711, 300–340 HB | Aço para molde da mesma dureza; equivalência DIN/AISI precisa ser confirmada por norma ou certificado do material | “2711” brasileiro não é, sozinho, especificação química completa; não presumir identidade com P20/H13 | **LACUNA**. |
| 8620 núcleo, 180–220 HB | AISI/SAE 8620 normalizado ou recozido, grupo P | O estado metalúrgico e a fração de ferrita/perlita importam | **LACUNA**. |
| 8620 cementado, 58–62 HRC | Aço cementado endurecido superficialmente; grupo H apenas pela condição de dureza | A camada e o núcleo têm comportamentos diferentes; o corte pode atravessar zonas distintas | **LACUNA**. |
| H13 tratado, 45–52 HRC | H13/DIN 1.2344 na mesma faixa HRC | Revenimento, dureza real e microestrutura alteram desgaste e lascamento | **LACUNA**. |

A ASM informa que a dureza típica de aços-ferramenta deve ser consultada em seção própria de tratamento térmico, mas a página pública não expõe as tabelas de corte necessárias [5]. A classificação ISO H é por comportamento de material endurecido, não uma identidade de liga; portanto, “mesmo HRC” é um proxy incompleto.

**Regra recomendada:** armazenar `material_equivalente`, `dureza_medida`, `estado_termico` e `origem_da_faixa`. Se a origem for apenas “proxy”, a linha deve ser `REFERÊNCIA ÚNICA` ou `SEM CONSENSO`, nunca `CONSENSO`. O erro esperado não pode ser convertido em porcentagem sem estudos pareados; declarar **não quantificado**.

## Bloco 4 — Questão 1(d): revestimento, refrigeração e estratégia

**Veredito:** a variação por condição pode ser maior que a largura de várias faixas atuais; uma faixa de Vc sem essas condições entrega menos informação do que aparenta.

**Confiança:** **CONSENSO** qualitativo; **NÃO ENCONTRADO** para multiplicadores universais.

| Fator | Efeito tecnicamente sustentado | Número universal? |
|---|---|---|
| Sem revestimento → TiAlN/AlTiN/AlCrN | Altera dureza a quente, atrito, adesão, resistência à oxidação e modo de falha; o melhor revestimento depende do substrato e do material usinado [4]. | **Não encontrado.** |
| Seco → ar comprimido | Pode melhorar evacuação e resfriamento limitado; não equivale a emulsão nem a alta pressão. | **Não encontrado.** |
| Emulsão | Pode reduzir temperatura, mas ciclos térmicos/interrupções podem favorecer trincas em certas combinações. | **Não encontrado.** |
| Alta pressão | Aumenta evacuação e acesso do fluido; efeito depende do bico, pressão e cavidade. | **Não encontrado.** |
| MQL | Reduz lubrificação/consumo, mas não deve ser tratado como capacidade térmica de emulsão. | **Não encontrado.** |
| Convencional → HSM | Muda rotação, calor, dinâmica e estabilidade; exige máquina, porta-ferramenta e trajetória adequados. | **Não encontrado.** |
| HEM/HPC | Pequeno ae pode reduzir espessura instantânea, mas ap maior e tempo de contato podem manter alta carga térmica. | **Não encontrado.** |

A revisão de Sousa e Silva mostra que ferramentas revestidas sofrem desgaste abrasivo, adesivo, delaminação e trincas térmicas e que mudar revestimento ou parâmetros altera a vida [4]. Isso impede multiplicar a faixa atual por fatores fixos sem experimentação.

**Regra recomendada:** Vc deve ser função de `(material, dureza, substrato, revestimento, D, Z, ae/D, ap/D, estratégia, fluido, vida-alvo)`. Onde qualquer campo essencial faltar, retornar `CONDIÇÃO INCOMPLETA`, não uma faixa aparentemente precisa.

## Bloco 5 — Questão 1(e): dureza como eixo

**Veredito:** dureza é um eixo importante, sobretudo em aços para moldes tratados, mas não existe, nas fontes acessíveis desta rodada, uma tabela universal de correção de Vc por cada 40 HB ou uma tabela completa HRC para todos os materiais listados.

**Confiança:** **SEM CONSENSO** para multiplicador fixo; **CONSENSO** para incluir dureza e estado térmico como variáveis.

A dureza altera força específica, temperatura, desgaste e risco de lascamento, mas não descreve sozinha tenacidade, carbonetos, inclusões, microestrutura e tratamento. Para aço cementado, HRC superficial não representa necessariamente o núcleo. A ISO 8688-2 estrutura ensaios de vida variando condições de corte, o que é incompatível com uma correção universal somente por dureza [2].

**Regra recomendada:** dividir o modelo por bandas experimentais medidas — por exemplo, condição recozida/pré-endurecida/endurecida — somente quando houver dados pareados. Não preencher uma tabela HRC com extrapolação linear. A tabela H13 45–52 HRC e 8620 cementado 58–62 HRC deve permanecer `SEM CONSENSO` até ensaio ou fonte primária auditável.

## Bloco 6 — Questão 1(f): GG25, GGG50 e Ti-6Al-4V

**Veredito:** a inclusão dos grupos K e S é correta como expansão de escopo, mas as faixas numéricas não foram fechadas no território permitido.

**Confiança:** **NÃO ENCONTRADO** para faixas exatas de fresa inteiriça revestida nas condições pedidas.

| Material | Grupo ISO | Condição que precisa ser declarada | Resultado |
|---|---:|---|---|
| Ferro fundido cinzento GG25 | K | Grafita, dureza, interrupção, ferramenta/revestimento, seco ou fluido | **LACUNA**. |
| Ferro fundido nodular GGG50 | K | Matriz, nodularidade, dureza e tendência a abrasão | **LACUNA**. |
| Ti-6Al-4V | S | Estado metalúrgico, rigidez, refrigeração, ferramenta e evacuação de calor | **LACUNA**. |

Não copiar valores de ferro fundido cinzento para nodular, nem de aço inox para titânio. A publicação aberta sobre microfresamento registra Ti-6Al-4V como material com efeitos relevantes de deflexão, batimento e fz baixo [6], mas não fornece a tabela macro de Vc solicitada.

## Bloco 7 — Questão 2(a): comparação dos valores de fz

**Veredito:** a tabela contém uma progressão suave e valores pequenos coerentes com uma hipótese de microfresamento/acabamento, mas não pode ser declarada compatível com catálogo sem a fonte primária.

**Confiança:** **NÃO ENCONTRADO** para a faixa publicada de catálogo; **SEM CONSENSO** para validar os pontos por diâmetro.

A fonte permitida mais próxima, Oliveira et al., demonstra que fz baixo em AISI 1045 pode entrar no regime de tamanho, com ploughing e aumento acentuado de força específica [3]. Isso não valida automaticamente 0,003 mm/dente para Ø0,2 mm, nem 0,200 mm/dente para Ø16 mm. A pergunta pede catálogo, mas catálogo está fora do território; portanto: **LACUNA — obter tabela primária do fabricante da geometria exata ou ensaio próprio**.

## Bloco 8 — Questão 2(b): forma de fz(D)

**Veredito:** `fz proporcional ao diâmetro` não é lei universal; tabelas discretas por faixas de diâmetro são uma representação plausível de dados de ferramenta, mas a relação depende de rigidez, número de cortes, geometria e operação.

**Confiança:** **CONSENSO** para a fórmula cinemática de avanço; **SEM CONSENSO** para uma forma universal de fz(D).

A cinemática é `Vf = fz × Z × n` e `n = 1000 Vc/(πD)`. Assim, Z não desaparece do avanço de mesa. A literatura de microfresamento mostra ainda que batimento, número de dentes, raio do cortador e direção de fresamento alteram a espessura real de cavaco [6]. Uma lei linear pode ser usada como interpolador interno, mas não deve ser apresentada como relação publicada universal. O modelo deve preferir degraus por faixa de diâmetro quando a fonte original for uma tabela; interpolar só dentro da faixa da fonte.

## Bloco 9 — Questão 2(c): pico de Vc em Ø6–8 mm

**Veredito:** o pico seguido de queda é mais provavelmente artefato de tabela ou mistura de restrições do que uma lei física geral de Vc.

**Confiança:** **CONSENSO** para a interpretação física geral; **NÃO ENCONTRADO** para confirmar a origem desta tabela específica.

Em primeira aproximação, Vc é a velocidade periférica escolhida para material e ferramenta; o diâmetro altera a rotação pela equação `n = 1000 Vc/(πD)`. Uma queda de Vc em diâmetros grandes pode ser imposta por rotação máxima, potência, rigidez, balanço, vibração, porta-ferramenta ou catálogo específico. A literatura de tamanho de escala não sustenta um pico universal em Ø6–8 mm [3] [6]. Portanto, a curva atual deve ser marcada `SEM CONSENSO` até a fonte declarar por que Vc varia com D.

## Bloco 10 — Questão 2(d): regras derivadas

**Veredito:** as frações `fz acabamento = 0,60`, `Vc acabamento = 1,10` e `0,85/0,75` para endurecidos são convenções internas não confirmadas.

**Confiança:** **NÃO ENCONTRADO** para frações publicadas independentes.

A literatura confirma que acabamento e desbaste mudam a carga, a superfície e o regime de corte, mas não estabelece uma fração universal para todas as ferramentas e materiais [4]. Semi-acabamento como ponto médio aritmético também não decorre da física: a vida e a força não variam necessariamente linearmente com os parâmetros. Manter as frações somente como regras internas versionadas, rotuladas `REFERÊNCIA ÚNICA — convenção do sistema`, e não como recomendação universal.

## Bloco 11 — Questão 2(e): piso de fz

**Veredito:** `0,002 mm/dente` não é piso físico absoluto; o limite relevante é a espessura mínima de cavaco comparada ao raio de aresta e à geometria real.

**Confiança:** **CONSENSO** para o mecanismo; **SEM CONSENSO** para um único multiplicador.

Oliveira et al. relatam `h_min` de 22–36% do raio de aresta e concluem que a faixa prática do estudo ficou aproximadamente entre 1/4 e 1/3 do raio [3]. Wu et al. obtiveram `h_min = 0,17 r_n` em seu modelo/experimento e compilaram estudos entre aproximadamente 0,14 e 0,49 do raio, mostrando dispersão [7]. A revisão de Mamedov et al. resume 20–35% conforme a ductilidade [6]. Portanto, a hipótese preliminar de 5–20% não é consenso; 20–35% tem melhor apoio nesta busca, mas não é universal.

A forma correta do software é:

`fz_min_físico ≈ α × r_e`, com `α` calibrado por material, geometria, batimento e método, e não um número absoluto.

Para comparar com o recomendado:

`fração_da_recomendação = (α × r_e) / fz_recomendado`.

Sem medição ou fonte do raio de aresta para cada diâmetro, não é válido converter essa expressão em um número por Ø0,2–16 mm. O sistema deve exibir a fórmula e pedir `r_e`; se ausente, retornar `LACUNA`.

## Bloco 12 — Questão 2(f): número de arestas

**Veredito:** fz é uma grandeza por dente; Z não deve alterar automaticamente fz, mas altera diretamente o avanço de mesa e pode exigir correções por evacuação, rigidez e espessura efetiva.

**Confiança:** **CONSENSO** para a cinemática; **SEM CONSENSO** para uma correção universal por Z.

Para o mesmo Vc, D e fz, dobrar Z dobra `Vf`. Entretanto, batimento pode fazer uma aresta retirar muito mais que outra; em fz baixo, a revisão registra que batimento e imperfeições se tornam mais importantes [6]. Assim, a implementação deve manter fz por dente, mas calcular `Vf` com Z e validar carga, espaço de cavaco e batimento. Não usar a mesma tabela de fz para 2 e 4 cortes sem declarar que isso é uma aproximação interna.

## Bloco 13 — Questão 3(a): existência de janela de tolerância

**Veredito:** não existe base técnica para os limiares universais 0,50/0,75/1,20/1,50 aplicados a todos os parâmetros.

**Confiança:** **CONSENSO** para rejeitar a janela universal; **REFERÊNCIA ÚNICA** para a estrutura experimental de ISO 8688-2.

Fabricantes podem publicar faixas nominais e limites para produtos específicos, mas isso seria fonte de catálogo e não confirmação desta rodada. A ISO 8688-2 trata ensaios de vida como função de múltiplas variáveis, inclusive Vc, avanço, ap e ae [2]. Logo, uma janela deve ser derivada de envelope de processo para uma família específica, com critério de desgaste, potência, vibração, acabamento e vida.

## Bloco 14 — Questão 3(b): sensibilidade relativa de Vc, fz, ae e ap

**Veredito:** a tolerância não é igual. Não há ordem única para todos os modos de falha; para risco de ferramenta, uma ordem inicial conservadora é `fz ≈ Vc > ae/ap`, mas para potência e taxa de remoção ae e ap podem dominar.

**Confiança:** **SEM CONSENSO** para uma ordenação universal; **CONSENSO** para a dependência conjunta.

`MRR` é proporcional a `ap × ae × Vf`, e `Vf` é proporcional a `fz × Z × n`. Portanto, ae/ap menores normalmente reduzem carga e potência, enquanto fz menor pode cruzar `h_min` e causar esfregamento. Vc maior aumenta temperatura e desgaste, mas a magnitude depende do expoente de vida. A norma e os estudos de vida não autorizam um mesmo percentual de tolerância para os quatro parâmetros [2] [3].

## Bloco 15 — Questão 3(c): piso de fz e raio de aresta

**Veredito:** a fronteira é função de `h_min/r_e`, não de uma fração fixa de fz recomendado.

**Confiança:** **CONSENSO** para a formulação; **SEM CONSENSO** para raio típico por diâmetro.

| Pergunta | Resposta auditável |
|---|---|
| Raio de aresta típico por diâmetro | **LACUNA** nesta rodada. A literatura trata `r_e` como variável medida/modelada; não foi encontrada tabela independente aberta que o fixe por Ø0,2–16 mm para a fresa especificada. |
| Espessura mínima | Estudos reportam 0,17 r_n; 0,20–0,35 r_e; 0,22–0,36 r_e; e 0,14–0,49 em diferentes materiais/métodos [3] [6] [7]. |
| Tradução para o sistema | `fz_fronteira/fz_rec = α r_e/fz_rec`; calcular apenas quando r_e estiver medido e a orientação/ae permitirem aproximar fz da espessura máxima de cavaco. |

O valor de `fz` não é sempre igual à espessura instantânea de cavaco: entram imersão radial, ângulo de contato, runout, passo, hélice e direção de fresamento. Portanto, a fórmula acima é uma triagem, não uma garantia.

## Bloco 16 — Questão 3(d): teto de fz

**Veredito:** não há valor universal publicado de fz acima do qual sempre ocorre lascamento; o teto é um envelope de força, potência, rigidez, espessura de cavaco e resistência da aresta.

**Confiança:** **CONSENSO** para rejeitar um teto universal; **NÃO ENCONTRADO** para valor único.

O limite deve ser calculado por ensaio ou modelo identificado para a ferramenta: força máxima admissível, potência e torque da máquina, deflexão, estabilidade, espessura de cavaco, ae/ap, número de dentes, condição da aresta e risco de fratura. A revisão de revestimentos mostra que os modos de falha mudam com a condição e incluem delaminação, adesão e trincas térmicas [4]. O software deve retornar `limite não determinado` quando não possuir esses dados.

## Bloco 17 — Questão 3(e): Vc 20% acima

**Veredito:** pela equação de Taylor, o efeito na vida é potencialmente grande, mas não pode ser quantificado numericamente sem o expoente `n` da combinação ferramenta-material.

**Confiança:** **CONSENSO** para a forma da equação; **NÃO ENCONTRADO** para `n` nesta rodada.

Com `V T^n = C`, mantendo fz, ae, ap, ferramenta, material e critério de fim de vida constantes:

`T_1 = C/V_1^n` e `T_2/T_1 = (V_2/V_1)^(-1/n)`.

Para `V_2 = 1,20 V_1`:

`T_2/T_1 = 1,20^(-1/n)`.

Logo, a redução percentual de vida é `100 × [1 − 1,20^(-1/n)]%`. Não inserir um número até a rodada que determine n para a combinação concreta. A literatura e a norma sustentam a dependência, mas não um n transferível entre revestimentos, materiais e estratégias [1] [2].

## Bloco 18 — Questão 3(f): zonas assimétricas recomendadas

**Veredito:** substituir as quatro janelas simétricas por envelopes separados para Vc, fz, ae e ap, com fronteira física e operacional própria.

**Confiança:** **SEM CONSENSO** para percentuais universais; **CONSENSO** para a assimetria qualitativa.

| Parâmetro | Abaixo do recomendado | Acima do recomendado | Estrutura sugerida |
|---|---|---|---|
| Vc | Pode favorecer aresta postiça, corte ineficiente ou acabamento ruim | Aumenta calor/desgaste conforme Taylor | Limite inferior por estabilidade de corte; superior por temperatura/vida medida. |
| fz | Abaixo de h_min: rubbing/ploughing, força específica e desgaste | Sobrecarga, deflexão e lascamento | Piso por `αr_e` e teto por força/deflexão; não usar zona simétrica. |
| ae | Em geral reduz carga instantânea, mas pode alterar espessura e dinâmica | Aumenta contato e potência | Envelope por potência, vibração e estabilidade. |
| ap | Em geral reduz MRR e carga | Aumenta força, deflexão e potência | Envelope por rigidez, potência e comprimento de aresta. |

As cores deveriam ser calculadas por risco, não por razão única. `ae` e `ap` abaixo do recomendado podem ser conservadores para carga, enquanto fz abaixo pode ser perigoso por esfregamento. A literatura de microfresamento mostra diretamente que fz baixo muda o regime de corte [3] [6] [7].

# Tabela A — Velocidades recomendadas

A tabela abaixo separa o que o sistema atualmente usa do que esta rodada conseguiu validar. As faixas originais são reproduzidas apenas para auditoria do software, não como recomendação nova.

| Material | Operação | Faixa atual (m/min) | Condição necessária | Confiança nesta rodada | Ação |
|---|---|---:|---|---|---|
| Aço 1020 | Desbaste/semi/acabamento | 185–250 / 220–280 / 250–350 | Metal duro revestido, dureza e ae/ap não declarados | NÃO ENCONTRADO | Não validar sem fonte primária. |
| Aço 1045 | Desbaste/semi/acabamento | 150–200 / 180–240 / 200–280 | Idem | NÃO ENCONTRADO | Remover 80–120 sem fonte; não resolver 140 sem catálogo/ensaio. |
| Inox 304 | Desbaste/semi/acabamento | 60–90 / 80–120 / 100–150 | Estado, fluido e revestimento não declarados | NÃO ENCONTRADO | Não validar. |
| Alumínio 6061-T6 | Desbaste/semi/acabamento | 400–600 / 500–800 / 600–1000 | Ferramenta, geometria e evacuação não declaradas | NÃO ENCONTRADO | Estimativa deve permanecer fora da tabela validada. |
| P20, 2711, 8620 núcleo/cementado, H13 | Todas | Faixas atuais do anexo | Dureza e condição térmica declaradas, demais campos ausentes | NÃO ENCONTRADO | Usar proxy apenas como hipótese; não como Vc. |
| GG25, GGG50, Ti-6Al-4V | Todas | Não havia | Requer fonte específica ou ensaio | NÃO ENCONTRADO | Manter lacuna. |

# Tabela B — Avanços recomendados

| Ø (mm) | fz atual (mm/dente) | Regra de derivação atualmente usada | Validação |
|---:|---:|---|---|
| 0,2–1,0 | 0,003–0,012 | Interpolação linear entre pontos | NÃO ENCONTRADO; verificar h_min e r_e. |
| 1,5–4,0 | 0,020–0,070 | Interpolação linear | NÃO ENCONTRADO; não tratar como lei universal. |
| 6–16 | 0,100–0,200 | Interpolação linear | NÃO ENCONTRADO; requer ferramenta/estratégia. |
| Todos | Acabamento = 0,60 do desbaste; endurecido = 0,75 do desbaste | Convenção interna | REFERÊNCIA ÚNICA — sem confirmação independente. |

A única regra cinemática que deve permanecer implementada é `Vf = fz × Z × n`, com `n = 1000Vc/(πD)`. O interpolador linear deve ser etiquetado como decisão interna, não como relação publicada.

# Tabela C — O que continua sem base

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|
| Faixa correta do 1045 | Catálogo primário solicitado está fora do território; fontes históricas conflitantes | Catálogo aberto da ferramenta exata ou ensaio ISO 8688-2 com vida-alvo. |
| Vc dos seis estimados | Não há tabela independente aberta por liga, dureza e operação | Handbook com página verificável ou estudo pareado. |
| Vc de GG25/GGG50/Ti-6Al-4V | Não encontrado para a ferramenta e condições especificadas | Fonte primária por material e condição ou DOE próprio. |
| Multiplicadores de revestimento/refrigeração/estratégia | Não existe fator universal | Matriz experimental por substrato, coating, fluido, ae/ap e estratégia. |
| Correção por dureza | Não há multiplicador universal validado | Ensaios por liga e bandas de dureza, com mesma ferramenta e critério de vida. |
| fz por diâmetro | Catálogos estão fora do território; a literatura não fecha a tabela do produto | Catálogo primário da geometria exata ou ensaio. |
| Forma universal fz(D) | Não encontrada | Dados suficientes para comparar degraus, linear e potência. |
| Pico de Vc em Ø6–8 | Fonte da curva não identificada | Documento original e justificativa de RPM, potência ou dinâmica. |
| Piso 0,002 mm/dente | Não é piso físico universal | Medir r_e e calibrar h_min por material/geom./batimento. |
| Raio de aresta por diâmetro | Não encontrado em fonte independente aberta | Especificação metrológica do fabricante ou medição óptica. |
| Teto de fz | Não há valor universal | Força, potência, deflexão, estabilidade e resistência da aresta. |
| Janelas 0,50/0,75/1,20/1,50 | Sem documento de origem | DOE e envelope de processo por parâmetro e falha. |
| Expoente Taylor n | Explicitamente reservado para outra rodada | Ensaios de vida para cada combinação relevante. |

# Lacunas declaradas

A principal lacuna é deliberada: o documento simultaneamente restringe esta rodada a handbooks, literatura e normas e pede, em vários subitens, números de catálogo de fabricantes. Como catálogo está fora do território, nenhum número encontrado apenas em catálogo foi usado para preencher célula. Também não foi possível recuperar os textos integrais protegidos por captcha/paywall de algumas páginas de handbook e bases; seus resumos bibliográficos foram usados somente para afirmar o escopo da obra, não para inventar tabelas.

Continuam sem base auditável nesta rodada as faixas exatas de Vc para cada material e operação, as faixas de fz por diâmetro da ferramenta específica, os multiplicadores por revestimento/refrigeração/estratégia, os raios de aresta por diâmetro, um teto universal de fz, uma janela numérica de tolerância e o expoente Taylor. Para fechar esses itens seriam necessários o catálogo primário da ferramenta ou ensaios próprios estruturados pela ISO 8688-2, com material, dureza, substrato, revestimento, geometria, D, Z, ae, ap, fluido, estratégia, rotação, fz, critério de desgaste e vida-alvo registrados.

# Fontes

[1]: https://doi.org/10.31399/asm.hb.mhde2.a0003188 "Joseph R. Davis (ed.), Cutting Tool Materials, Metals Handbook Desk Edition, 2nd ed., ASM International, 1998, pp. 901–904."

[2]: https://www.iso.org/obp/ui/#iso:std:iso:8688:-2:ed-1:v1:en "ISO 8688-2:1989, Tool life testing in milling — Part 2: End milling."

[3]: https://doi.org/10.1016/j.ijmachtools.2014.11.001 "F. B. Oliveira et al., Size effect and minimum chip thickness in micromilling, International Journal of Machine Tools and Manufacture 89 (2015), 39–54."

[4]: https://doi.org/10.3390/coatings10030235 "V. F. C. Sousa; F. J. G. Silva, Recent Advances on Coated Milling Tool Technology—A Comprehensive Review, Coatings 10(3), 235 (2020)."

[5]: https://dl.asminternational.org/handbooks/edited-volume/9/chapter-abstract/109614/Introduction-to-Heat-Treating-of-Tool-Steels "R. A. Mesquita; R. E. Schneider, Introduction to Heat Treating of Tool Steels, ASM Handbook, 2014."

[6]: https://mfr.edp-open.org/articles/mfreview/full_html/2021/01/mfreview200041/T1.html "A. Mamedov et al., Micro milling process modeling: a review, Manufacturing Review (2021)."

[7]: https://doi.org/10.3390/mi11100924 "X. Wu et al., Experimental Study on the Minimum Undeformed Chip Thickness Based on Effective Rake Angle in Micro Milling, Micromachines 11(10), 924 (2020)."
