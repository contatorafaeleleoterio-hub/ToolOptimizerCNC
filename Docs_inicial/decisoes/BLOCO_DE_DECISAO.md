# Bloco de decisão — as 29 perguntas do escopo

> ✅ **Parte 1 e Parte 2 respondidas em 27/08/2026.** As 13 decisões (Q17–Q22, Q24, Q28, Q29, Q3, Q1, Q2, Q5) foram aplicadas nos documentos de escopo, no MVP e em `E7` §6.2. Emergiu uma 14ª regra geral, confirmada: **o alerta descreve o risco e situa o valor, não instrui o operador** — aplicada em E4, E5 §9 e no canônico de limites. **Em 28/08 ficou definido que a regra é do *alerta*:** o painel "o que mexer" (**E4 §6** / MVP §7.4), que o operador abre para pedir direção, orienta com verbo, em tom educativo e linguagem de chão de fábrica. A **Parte 3 (16 perguntas) segue aberta**, com recomendação preliminar. Este documento fica como registro.

**Para quem:** o Mestre. **De onde vêm:** dos oito documentos de `escopo/`, consolidadas em
`escopo/E7_ESCOPO_E_FRONTEIRAS.md` §6. **Por que em bloco:** perguntas do mesmo assunto se tocam —
decidir uma isolada gera decisão inconsistente com a vizinha.

**Como este documento economiza sua atenção:** das 29, **10 precisam de resposta agora** (afetam o que
vai ser construído) e **16 podem esperar** (pertencem a frentes adiadas ou bloqueadas por dado). As
outras **3 já têm decisão no corte do MVP** e só precisam de um "sim, vale para o produto inteiro".

**Toda pergunta vem com recomendação marcada ✅ e o critério que a derrubaria.** Onde você concordar,
basta dizer o número. Onde discordar, diga a letra.

---

## Decisões Avulsas / Emendas

> ✅ **Decidido em 08/09/2026 — Direção sobre balanço travado.**
> **O que existia:** O painel de ajuste sugeria reduzir o balanço (L) para combater a vibração disparada pelo alerta de balanço.
> **Por que estava incorreto:** O balanço (L) é frequentemente travado pela geometria da peça (profundidade da cavidade). Sugerir a alteração de um parâmetro inatingível constitui um conselho vazio.
> **O que passa a valer:** O balanço é condição de contorno. A direção aplicável ao alerta de balanço passa a incidir sobre uma grandeza que o operador realmente ajusta.
> **Quem decidiu:** Mestre.
>
> **Emenda de 09/09/2026 — a grandeza é `ae`, não `fz`.** A redação de 08/09 apontava a *carga por passe (fz)*, com três defeitos: (a) `fz` é a mesma grandeza da segunda direção do painel, que manda **aumentá-la** — duas direções em sentidos opostos sobre o mesmo parâmetro, o que a `E4` §6.2 proíbe; (b) *"carga por passe"* não existe no glossário, e o mesmo `fz` aparece como *avanço por dente* duas linhas abaixo (`CANONICO_MOTOR_DE_CALCULO` §1.7 — rótulo ambíguo vira erro de fator); (c) o texto ficou sem alvo numérico e sem procedência. **Passa a valer:** a direção incide sobre a **penetração de trabalho (ae)**, que governa a força radial — a que fleta a ferramenta —, com o teto publicado de `ae ≤ 25% × D` para balanço longo (Sandvik Coromant). **Quem decidiu:** Mestre, 09/09/2026.

---

# Parte 1 — Decidir agora (10)

## Bloco A — O catálogo e o que ele oferece

### Q17 — Estratégia de acabamento

**Em jogo:** em acabamento de parede, a profundidade recomendada difere de **20 a 40×** entre a
estratégia convencional e a de alta velocidade por contorno. Não é dispersão de fonte: são dois modos
de trabalho, cada um com evidência própria. O sistema não tem como recomendar sem saber qual é.

| | Opção | O que acontece |
|---|---|---|
| **A** ✅ | **Fixar a convencional como único modo do produto** | O valor de partida da geometria já é o convencional. Nada muda na tela; o que muda é a declaração — a ajuda diz sobre qual estratégia a recomendação vale |
| B | Seletor explícito de duas posições | Acrescenta um campo no caminho padrão e obriga o operador a saber responder antes de ver um número |
| C | Não recomendar profundidade em acabamento | Devolve ao operador o problema que ele veio resolver |

**Critério que derruba A:** o usuário trabalhar com CAM de contorno em alta velocidade. Aí a
recomendação convencional erra por 20× **para o lado conservador** — desperdiça máquina, não quebra
ferramenta.

### Q18 — Revestimento: campo próprio ou embutido no catálogo

**Em jogo:** não existe multiplicador de velocidade por revestimento (procurado, 5 de 5 vazios). O que
existe é **restrição por material** — a lista encolhe conforme a peça.

| | Opção | O que acontece |
|---|---|---|
| **A** ⚠️ *recomendada, não escolhida* | **Campo próprio, com a lista filtrada pelo material** | É o que permite mostrar a combinação proibida **listada e com a razão** — diamante sobre ferroso —, que é como o sistema ensina pelo uso. Some do campo e o operador conclui que a lista está incompleta |
| B | Embutido na entrada de catálogo da ferramenta | Multiplica as entradas da lista por cada revestimento, e o operador escolhe ferramenta lendo cinco linhas quase iguais |

> ✅ **Decidido em 27/08/2026 — nem A nem B: revestimento **fora do produto**.** Sem campo, sem lista,
> sem fator no cálculo; a ferramenta é nomeada pelo tipo e pelo substrato. Razão do Mestre: fator que
> não move o resultado além da margem do modelo não entra — e o multiplicador por revestimento veio
> vazio, cinco de cinco. A contraindicação diamante/ferroso não vira bloqueio: a combinação não chega
> a existir na lista. Aplicado em **E1** §5 (stub), **E7** §3 e **MVP** §3.4. O texto abaixo fica como
> registro da recomendação que não foi seguida.

**E quando nenhum revestimento for válido:** cai para **"sem revestimento"**, com a razão escrita. Sem
revestimento é sempre fisicamente possível, e a ausência de oferta nunca bloqueia (**E1** §5.2).

### Q19 — Aço endurecido acima de 48 HRC

**Em jogo:** a linha de uso geral dos catálogos para em torno de 48 HRC. Acima disso existe grau
dedicado, de grão ultrafino — e **não temos fator de velocidade com fonte para ele**.

| | Opção | O que acontece |
|---|---|---|
| **A** ✅ | **Não cria entrada de ferramenta agora.** O que muda é o **material**: ele entra no catálogo com a própria dureza e as próprias constantes, e o resultado sai marcado como fora da linha de uso geral | Usa mecanismo que já existe (duas linhas para a mesma liga em tratamentos diferentes) e não inventa fator |
| B | Cria entrada própria de ferramenta para grau dedicado | Exige um fator de velocidade que ninguém publicou. Seria número inventado com aparência de catálogo |

**Critério que vira A em B:** aparecer fator de velocidade com fonte para o grau dedicado.

### Q20 — Critério para uma liga entrar no catálogo

**Em jogo:** parte das ligas está registrada por prática, sem fonte publicada.

| | Opção | O que acontece |
|---|---|---|
| **A** ✅ | **Entra toda liga cujos campos que o cálculo consome estejam preenchidos, com a origem declarada e editável** | É a regra que **E1** §6.3 já aplica. Omitir a linha empurra o operador a escolher "uma parecida" sem saber que está fazendo isso — o erro fica invisível |
| B | Só entram ligas com fonte publicada | Reduz o catálogo a uma fração, e o operador resolve fora do sistema |

**Critério:** o que separa não é a qualidade do dado, é **a origem estar declarada**. Um número frágil
visível vale mais que um número frágil escondido.

### Q21 — Roscas fora da tabela de designações

| | Opção | O que acontece |
|---|---|---|
| **A** ✅ | **O operador informa passo e diâmetro à mão** | O cálculo de roscar consome passo e diâmetro; **a designação é só um atalho de preenchimento**. Sem ela o cálculo continua inteiro |
| B | A família fica indisponível | Recusa calcular o que sabe calcular, por falta de um rótulo |

---

## Bloco B — Faixas, unidades e o que sai marcado

### Q22 — Envelope de diâmetro das famílias que não são fresamento

**Em jogo:** o envelope de fresa inteiriça está levantado. Furar, roscar e mandrilar não foram
levantados, e hoje o sistema marca o resultado como extrapolado usando um envelope que não é delas.

| | Opção | O que acontece |
|---|---|---|
| **A** ✅ | **Enquanto não houver levantamento, essas famílias não têm marca de extrapolação** — e a ajuda do campo diz que o envelope não foi levantado | O sistema não afirma o que não sabe. Marcar extrapolado por um envelope emprestado é afirmação sem base, e treina o operador a ignorar a marca |
| B | Herdam o envelope da fresa inteiriça | Marcaria uma broca de Ø30 como extrapolada sem razão, e deixaria passar o que talvez devesse marcar |
| C | Levantar os três envelopes agora | Fecha de vez. Custa um levantamento de catálogo por família — trabalho conhecido, sem pesquisa |

**Critério:** A é o estado honesto; C é o estado bom. A vira C quando alguém sentar com os catálogos.

### Q24 — Unidade e separador decimal

| | Opção | O que acontece |
|---|---|---|
| **A** ✅ | **Só milímetro. O campo aceita vírgula e ponto**, e exibe no padrão local | A oficina digita vírgula. Recusar vírgula é atrito puro, e é o tipo de erro que o operador culpa a si mesmo |
| B | Milímetro e polegada | Obriga converter catálogo, faixas e envelopes inteiros, e a duplicar toda faixa declarada. É outro produto |

**Critério:** polegada entra quando existir usuário fora do sistema métrico.

### Q28 — A faixa de espessura de cavaco entre 0,02 e 0,1 mm

**Em jogo:** a margem declarada do modelo (±15–25%) **não se sustenta** abaixo de 0,1 mm. Abaixo de
0,02 o resultado já sai marcado como extrapolado. **A faixa entre os dois não tem tratamento.**

| | Opção | O que acontece |
|---|---|---|
| **A** ✅ | **Estende a marca de extrapolado até 0,1 mm** | Usa mecanismo que já existe e que o operador já entende. Nenhum número novo é inventado |
| B | Declara uma banda de erro maior nessa faixa | Exige dizer **quanto** maior — e esse número ninguém tem. Seria precisão inventada sobre uma imprecisão |

### Q29 — Rasgo cheio sem o comprimento de aresta informado

**Em jogo:** o alerta de rasgo cheio entrega o alvo *"reduza para 70% da aresta"*. Sem o comprimento
de aresta, esse alvo não existe.

| | Opção | O que acontece |
|---|---|---|
| **A** ⚠️ *recomendada, não escolhida* | **A mensagem entrega as outras duas saídas — reduzir o engajamento radial e dividir em passes — e pede o campo** | O alvo numérico exige o dado que falta. Pedir o campo no momento em que ele importa é o único caminho honesto, e ensina para que ele serve |
| B | Usa o teto proporcional ao diâmetro como alvo | Entrega um número que parece medido e é convenção |


> ✅ **Decidido em 27/08/2026 — pergunta dissolvida.** O alerta não entrega alvo de ajuste nenhum,
> nem o numérico nem os dois substitutos da opção A. Daí saiu a **14ª regra geral**: *o alerta descreve
> o risco e situa o valor, não instrui o operador*. Aplicado em **E4** §3.5, **E5** §9 e no canônico de
> limites. **Refinamento de 28/08:** a 14ª regra é do *alerta*. O painel *"o que mexer"* (E4 §6 /
> MVP §7.4), que o operador abre para pedir direção, orienta com verbo — em tom que ensina, e em
> linguagem de chão de fábrica. O texto abaixo fica como registro da recomendação que não foi seguida.

---

## Bloco C — Comportamento de tela

### Q3 — Várias ajudas abertas em tela pequena

| | Opção | O que acontece |
|---|---|---|
| **A** ✅ | **Nenhum limite — mesmo comportamento em qualquer tela; a área rola** | Comportamento que muda conforme o tamanho da tela é o que ninguém lembra que existe, nem quem usa nem quem constrói |
| B | Limitar a uma ajuda aberta em tela pequena | Fecha a ajuda que o operador estava lendo para abrir outra — justamente quando ele está comparando dois controles |

---

# Parte 2 — Confirmar (3)

Já foram decididas **no corte do MVP**. A pergunta aqui é só se a decisão vale para o produto inteiro.
**Recomendo sim nas três** — as razões não dependem do corte.

| # | Pergunta | Decisão no corte | Promover? |
|---|---|---|---|
| **Q1** | Valores manuais ao trocar de ferramenta | Permanecem enquanto a **família** for a mesma; voltam à região recomendada quando a família muda, avisando | ✅ sim |
| **Q2** | Valor fixado que deixa de ser alcançável | **Mantém e sinaliza** — aparece fora da faixa, marcado, com o que seria preciso para chegar lá | ✅ sim |
| **Q5** | Casas decimais | **Fixas por grandeza**, pelo significado físico. Não ajustáveis pelo operador | ✅ sim |

---

# Parte 3 — Pode esperar (16)

**Nenhuma destas afeta o que vai ser construído agora.** Cada uma traz a recomendação preliminar para
não se perder — mas responder hoje gasta atenção num produto que ainda vai mudar antes de chegar lá.

## Dependem do ambiente declarado (frente adiada)

| # | Pergunta | Recomendação preliminar |
|---|---|---|
| **Q6** | Máquina tem rotação mínima — o sistema deve conhecê-la e alertar? | Sim, como mais um item do perfil de máquina. É o mesmo mecanismo do teto, e o piso é onde a ferramenta esfrega |
| **Q23** | Com a máquina declarada, o piso de processo vira alerta? | Sim — com rotação máxima declarada ele é **física direta**, não estimativa |
| **Q25** | Um perfil de máquina ou vários? | Vários, com um ativo. Oficina com duas máquinas é a regra, não a exceção |
| **Q26** | Rendimento do acionamento tem valor padrão? | Não. Sem ele o sistema mostra **potência na aresta**, rotulada como tal — a faixa publicada de rendimento abre 50% entre extremos, e um padrão erraria por fator conhecido |

## Dependem de dado bloqueado

| # | Pergunta | Recomendação preliminar |
|---|---|---|
| **Q27** | Força de **pico** ou **média** na deflexão? | Pico, por ser a escolha conservadora — mas **só se decide junto com os coeficientes**, porque a fonte que trouxer os coeficientes traz também a convenção em que eles valem |

## Dependem de frentes adiadas — histórico, favoritos e biblioteca

| # | Pergunta | Recomendação preliminar |
|---|---|---|
| **Q7** | Existe copiar o resultado? Em que formato? | Adiado até o uso mostrar qual dos dois formatos é o real |
| **Q8** | Entrada de histórico com retorno do operador é preservada no limite? | Sim — é o dado mais valioso do sistema, e o único que não se recupera |
| **Q9** | Entrada restaurada cuja ferramenta não existe mais | Avisar que a referência se perdeu, oferecendo recriar. Recriar em silêncio ressuscita o que o operador apagou de propósito |
| **Q10** | Vários favoritos para a mesma combinação — qual alimenta a faixa? | O mais recente. Média mistura condições diferentes, e "mais usado" exige contagem que ninguém vê |
| **Q11** | Favorito de material removido | Manter órfão, sinalizado. Impedir a remoção prende o operador; remover ambos apaga escolha explícita |
| **Q12** | Apelido próprio para a ferramenta | Sim, **além** do nome gerado — em oficina a ferramenta é conhecida por onde vive |
| **Q13** | Material de fábrica sobreposto e depois atualizado | A sobreposição do operador prevalece, e o sistema **avisa** que existe valor novo. Quem tem a carta do fornecedor na mão vale mais que o valor de partida |
| **Q14** | Importar substitui ou mescla? | Mescla, com prévia do que muda e o conflito resolvido a favor do que está entrando — mas **só depois de existir exportação real para olhar** |
| **Q15** | Compatibilidade retroativa entre versões | Sim, com campo novo assumindo o valor de partida **sinalizado**. É a mesma regra do registro restaurado a que falta um campo |
| **Q16** | Limites de histórico e favoritos: fixos, configuráveis ou inexistentes? | Fixos e generosos. Limite configurável é preferência que ninguém abre |
| **Q30** | Sincronização entre dispositivos é adiada ou descartada? | **Descartada junto com a conta**, enquanto não houver segundo dispositivo real no uso. É a única função que traria de volta a identificação pessoal do operador |

---

## O que acontece depois da sua resposta

| Resposta | O que eu faço |
|---|---|
| Parte 1 e Parte 2 | Cada decisão entra no documento de escopo que a levantou, **substituindo o marcador `⚠ NÃO DEFINIDO`** pela regra e a razão — e no MVP, onde tocar o que vai ser construído |
| Parte 3 | Fica registrada como recomendação preliminar. Não entra em documento até a frente correspondente começar |
| Discordância | A opção escolhida entra com **a sua razão escrita**, não a minha. Regra sem porquê é a primeira a ser quebrada por conveniência |
