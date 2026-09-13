# R6-V — Verificação dos bloqueios da R6

**Não é uma rodada nova.** É a apuração dos pontos que `VALIDACAO_R6.md` marcou como impedimento para escrever `CANONICO_DEFLEXAO_E_VIDA.md`.

**O enunciado mora em `_para_colar/COLAR_R6V.md`.** Este arquivo é a ficha de rastreabilidade: por que cada item existe e o que ele destrava. Não duplicar o enunciado aqui.

**Salvar os retornos como:** `RESPOSTA_R6V.md` e `RESPOSTA_R6V_B.md`, nesta pasta.

---

## Por que em par cego, desta vez

A R6 rodou com pesquisador único. A validação encontrou o motivo pelo qual isso não bastou: **das quatro travas da deflexão, três voltaram vazias**, e a única constante que veio (o módulo de elasticidade) **divergiu ~16% de um valor que a R3 já tinha apurado** — união das faixas de 30,9% em `δ`, acima da margem do modelo.

O protocolo (`00_INDICE_E_PROTOCOLO.md`) prevê exatamente isto: *"Se a validação apontar número sem fonte, dispara-se um segundo território apenas para os itens bloqueados."*

O risco aqui não é erro de transcrição — é **constante de engenharia que circula muito na internet e é repetida sem origem**. O "600 GPa do metal duro" é o caso clássico: aparece em toda parte e quase nunca com a ficha de grau atrás. Contra isso, a trava é confrontar **o que a fonte primária mede** com **o que a prática de fato usa**, e ver se os dois se apoiam ou se apenas se repetem.

## Os dois territórios

| | Território |
|---|---|
| **PRIMÁRIA DE ENGENHARIA** | norma (ISO), handbook (Machinery's, ASM Vol. 16), artigo revisado com DOI, tese, e **ficha técnica de fabricante de substrato de metal duro** — Ceratizit, Sandvik Hard Materials, Kennametal, H.C. Starck, Global Tungsten, Fraunhofer. É quem publica `E` por grau com %Co e granulometria |
| **CÓDIGO ABERTO E PRÁTICA** | GitHub e GitLab, calculadoras de usinagem e plugins de CAM (Fusion, FreeCAD, LinuxCNC), documentação de HSMAdvisor / FSWizard / G-Wizard, planilhas públicas, e fóruns técnicos **quando discutem o valor usado no cálculo** |

**Teste do território:** uma ficha técnica de grau de metal duro e um repositório de código não podem citar a mesma página. Passa.

**A trava que faz o cruzamento valer:** quando o território de código encontrar uma implementação que declara ter tirado o número de um handbook ou norma, ele registra **a declaração como metadado do código** — "o repositório X afirma ter tirado de Y" — e **não abre Y**. Abrir Y é território da fonte primária. É assim que se descobre se a prática está de fato apoiada na fonte que ela alega.

## O que cada questão destrava

| Item | Pergunta | Origem em `VALIDACAO_R6.md` | Destrava |
|---|---|---|---|
| **Q1** | `E` do metal duro por grau, %Co e granulometria; medição em grão fino existe? `EIT` ou flexão? | **BLOQUEIA #1 e #2**, divergência **D-1** | a constante mais sensível do modelo — `δ ∝ 1/E`. Sem ela, o canônico de deflexão não pode ser escrito |
| **Q2** | `Fr/Fc` — razão, dependências, pico ou média, e se a faixa 0,3–0,5 tem origem rastreável | **lacuna 6** | a função de deflexão inteira: sem `Fr`, a cadeia não produz µm auditável |
| **Q3** | `n` de Taylor por classe de ferramenta e por material da peça; `T_ref` | **lacuna 9** | a função de vida da ferramenta e a mensagem de preço em vida ao subir `Vc` |
| **Q4** | `De/D` por número de canais; erro da viga simples contra a escalonada | divergência **D-2**, **lacuna 5** | qual seção resiste à flexão — hoje o canônico de limites diz "haste" e a R6 diz `0,8 × D` da parte cortante. A diferença vale 59% em `δ` |

## O que este retorno NÃO precisa responder

**Não reabrir** — já fechado, com fonte, e reabrir só produz ruído:

- **O limite de deflexão aceitável.** R6 e `CANONICO_LIMITES_E_ALERTAS.md` §1.4 chegaram à mesma política por caminhos independentes: relativa à tolerância informada, sem julgamento quando não houver tolerância. O `δ ≤ 0,05 mm` sem fonte já caiu.
- **Refrigeração interna e o limiar de pica-pau.** R5 já fechou com `CONSENSO` de três fabricantes: sem canal interno, pica-pau acima de 3×D; com canal interno, não avisar até 30×D. A R6 declarou isso `NÃO ENCONTRADO` sem saber que já estava resolvido.
- **A relação entre deflexão estática e chatter.** Não existe, e o motivo já está estabelecido: exige FRF, rigidez e amortecimento da montagem.
- **A cadeia de cálculo até `Ft`.** Sai de `CANONICO_MOTOR_DE_CALCULO.md`, via R2.

## Quando os retornos chegarem

1. **Auditar como conjunto**, pela skill `validacao-pesquisa-fenix`, com **G8 aplicado** — desta vez o cross-check A×B vale.
2. **O juiz precisa ser cego.** O mapa do sorteio está em `_procedencia/MAPA_R6V.md` e **não deve ser aberto por quem julga**. Revelar só depois do veredito escrito.
3. Atualizar `VALIDACAO_R6.md`: cada bloqueio vira `RESOLVIDO`, `RESOLVIDO COMO FAIXA` ou `LACUNA PERMANENTE`.
4. Só então escrever `CANONICO_DEFLEXAO_E_VIDA.md` — e depois de `CANONICO_MOTOR_DE_CALCULO.md`, de onde sai a força tangencial que alimenta `Fr`.

## Regra do confronto que quem julgar precisa aplicar

- **Divergência nunca vira média.** Ou uma fonte vence com motivo declarado, ou o resultado vira faixa, ou vira lacuna assumida.
- **Convergência dentro do mesmo território não conta.** Se os dois chegaram à mesma origem por caminhos diferentes, é uma fonte só.
- **Lacuna nos dois é resultado válido**, e o mais honesto de todos.
- **Frequência de uso não é prova de correção.** Se o território de código mostrar que 8 implementações usam o mesmo número e o território primário mostrar que ninguém mediu esse número, o achado é *"a prática convergiu num valor sem origem"* — que é informação de alto valor, e não uma confirmação.
