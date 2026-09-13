# Validação — R2-V2 · Onde entra o diâmetro efetivo em fresa esférica (bloqueio B1)

**Veredito:** REPROVADO como retorno — **mas o bloqueio B1 está RESOLVIDO**, por fonte primária obtida durante esta auditoria.
**Retorno auditado:** relatório entregue em 20/08/2026 (⚠ ainda não arquivado como `RESPOSTA_R2V2.md` — ver "Pendência de arquivamento").
**Data:** 20/08/2026

## Resumo

O retorno concluiu que as duas correções são **ALTERNATIVAS** — que a rotação se corrige pelo diâmetro efetivo e o avanço não. **A conclusão está errada**, e o erro é rastreável a duas falhas de transcrição da fonte que ele mesmo cita.

Mas o retorno entregou **uma coisa de valor real**: um exemplo numérico resolvido, de catálogo, cuja aritmética fecha em 0,4%. Esse exemplo é a evidência que faltava — só que ele prova outra coisa, não o que o retorno afirma.

Durante a auditoria, o PDF do guia Sandvik foi obtido e a página D 24 lida diretamente. **Com a fonte na mão, B1 fecha.**

---

## O que a fonte primária diz, verbatim

> **Sandvik Coromant — *Metalcutting Technical Guide*, seção D "Milling", página D 24**, bloco *"Formulas for specific milling cutters"*.
> Extrato completo em `_procedencia/SANDVIK_D23_D24_extrato.md`. Obtido do CDN de distribuição da Sandvik (o site oficial bloqueia por firewall), extraído com `pdftotext -layout`.

Na linha **`Ballnose endmills`**:

```
Max cutting diameter at a specific depth (mm)     De = √[D3² − (D3 − 2 × ap)²]

Feed per tooth (mm/tooth), side milling           fz = D3 × hex / √[De² − (De − 2 × ae)²]

Feed per tooth (mm/tooth), cutter centered        fz = D3 × hex / De
```

Na linha **`Cutters with round inserts`** (fresa de inserto redondo — **outra família**):

```
Max cutting diameter at a specific depth (mm)     De = Dc + √[iC² − (iC − 2·ap)²]
Feed per tooth (mm/tooth), cutter centered        fz = iC × hex / (De − Dc)
Feed per tooth (mm/tooth), side milling           fz = 2·De·iC·hex / [(De − Dc)·√(De² − (De − 2·ae)²)]
```

E nas **fórmulas gerais**, página D 23:

```
Spindle speed (rev/min)     n = vc × 1000 / (π × Dc)
```

---

## Os dois erros do retorno

**E1 — Numerador trocado.** O retorno transcreveu a fórmula de ball nose como `fz = De × hex / √[De² − (De−2ae)²]`. A fonte diz **`D3`** no numerador, não `De`. Foi com essa versão adulterada que ele fez o "limite trigonométrico" e concluiu que `fz = hex` — ou seja, que não há correção. Com o numerador correto, o limite dá `fz = D3 × hex / De`, que é **exatamente o fator que ele afirmou não existir**.

**E2 — Atribuição invertida.** O retorno afirma, e repete em dois blocos, que `fz = D3 × hex / De` pertence a *"cutters with round inserts"* e **não** ao ecossistema da fresa esférica. A fonte põe essa fórmula, literalmente, na linha **`Ballnose endmills — feed per tooth, cutter centered`**. As fórmulas de inserto redondo são outras, e usam `iC` (círculo inscrito da pastilha), símbolo que nem aparece nas de ball nose.

Os dois erros empurram na mesma direção: eliminar a correção do avanço. Foi o que produziu o veredito "ALTERNATIVAS".

---

## O bloqueio B1, resolvido

**As duas correções são CUMULATIVAS — e não se sobrepõem, porque operam sobre grandezas diferentes.**

| Correção | O que faz | Entrada → saída |
|---|---|---|
| `n = vc·1000/(π·De)` | garante que a **velocidade de corte** real na calota seja a desejada | m/min → rpm |
| `fz = D3·hex/De` | converte a **espessura de cavaco alvo** no avanço a programar | mm de espessura → mm/dente |

Uma trata velocidade, a outra trata espessura. Não há efeito contado duas vezes.

**O erro de 5,2× que eu temia existe, mas não é esse.** Ele acontece quando se pega um `fz` **já recomendado em catálogo** e se aplica a fórmula de conversão como se ele fosse `hex`. É a mesma armadilha que a R2 já havia registrado — *"`h_alvo` é ESPESSURA, não avanço"*. A regra que evita:

> **Se a entrada é `hex` (espessura de cavaco alvo), aplique `fz = D3·hex/De`. Se a entrada é um `fz` de catálogo, não aplique nada — a recomendação do fabricante já é o avanço a programar.**

### O exemplo que prova, e que o retorno entregou sem entender

> **Mitsubishi Materials**, guia de aplicação série SRF: *"Tool: SRFT20. Revolution: 5500min-1. Cutting speed: 150m/min. Table feed: 2200mm/min. Feed per tooth: 0.2mm/tooth. Axial depth of cut: 1mm."*

Com `D` = 20 mm, `ap` = 1 mm, `z` = 2:

| Passo | Conta | Resultado | Publicado |
|---|---|---|---|
| `De` | `2√(1 × 19)` | 8,7178 mm | — |
| `n` pelo **nominal** | `150000/(π×20)` | 2 387 rpm | ✗ |
| `n` pelo **efetivo** | `150000/(π×8,7178)` | **5 477 rpm** | **5 500** ✓ (0,4%) |
| `vf` | `5500 × 2 × 0,2` | **2 200 mm/min** | **2 200** ✓ (exato) |

A rotação é corrigida pelo diâmetro efetivo — confirmado por reconstrução exata. E o `fz` de 0,2 entra direto em `vf`, sem fator adicional, **porque 0,2 é o avanço recomendado, não a espessura alvo**. O `hex` implícito é `0,2 × 8,7178/20` = **0,087 mm** — valor coerente com acabamento em aço.

O retorno leu isso como "a correção do avanço foi descartada". Não foi: ela nunca se aplicou, porque a entrada já era o resultado dela.

### Corroboração da correção de rotação, em três fabricantes

- **Mitsubishi Materials** — publica a fórmula explícita: `Cutting Speed = π · 2√[ap(D1 − ap)] · n / 1000`, e uma variante para eixo inclinado com `θ = arccos[(D1−2ap)/D1] + 90 − α`.
- **Sandvik Coromant** (página de conhecimento) — *"the most important diameter to consider is (Dcap) – the effective cutting diameter at the actual depth of cut (ap) – used for calculation of the true cutting speed"*.
- **Kennametal** — *"Working diameter (Dw) or effective diameter has to be considered when calculating appropriate RPM."*

**Divergência interna da Sandvik, a registrar:** a fórmula **geral** do guia (D 23) traz `n = vc·1000/(π·Dc)` — diâmetro **nominal**. É a fórmula genérica, escrita para ferramenta de aresta reta, onde `Dc = De`. A instrução de usar o efetivo está na página de conhecimento e na definição de `Dcap`, não no bloco de fórmulas gerais. **Não é contradição de conteúdo, é fórmula genérica sem a ressalva do caso esférico** — mas quem implementar lendo só a página D 23 erra a rotação por 2,3×.

---

## Achados por portão

| Portão | Selo | Achado |
|---|---|---|
| G1 Cobertura | `OK` | Os 5 pedidos foram respondidos, na ordem, e o exemplo resolvido — o item nº 1 — foi de fato encontrado |
| G2 Fonte | `BLOQUEIA` | Duas transcrições **não conferem com a fonte** (E1, E2). Além disso, o próprio Bloco 6 admite: *"Grande parcela das deduções efetuadas baseou-se em repositórios CDN espelhados, arquivos acadêmicos de terceiros e repositórios acadêmicos como ResearchGate"* — e a lista de fontes traz Scribd, ResearchGate e três distribuidores (bigtools, lancerludhiana, kennatech), todos fora do que foi pedido |
| G3 Confiança | `BLOQUEIA` | **Atribuição de fonte trocada:** o texto citado como sendo da **Fraisa** (*"Step One… ADOC… SFM x 3.82 / Deff"*) é da **Harvey Tool / Helical** — notação imperial (`ADOC`, `SFM`, constante 3,82) que a Fraisa, suíça e métrica, não usa. E o Bloco 6 declara que a Harvey **não pôde ser acessada**, enquanto o Bloco 2 reproduz o conteúdo dela sob outro nome. Contradição interna do próprio retorno |
| G4 Default | `OK` | Nenhum valor redondo suspeito; os números vêm de exemplos identificados |
| G5 Sensibilidade | `OK` | Quantificou o efeito (2,29×, 5 047 vs 2 200 mm/min) |
| G6 Divergência | `RESSALVA` | Não percebeu a divergência interna da Sandvik entre a fórmula geral (D 23, nominal) e a orientação de `Dcap` |
| G7 Lacunas | `RESSALVA` | O Bloco 6 é honesto sobre os bloqueios de acesso, mas **o Exemplo 2 não foi declarado como não reproduzido**: a conta dá 6 398 rpm contra 5 220 publicados, e o retorno preencheu a diferença com uma explicação térmica (*"capping empírico"*) sem citar fonte. Deveria ser `NÃO REPRODUZIDO` |
| — Opinião não solicitada | `RESSALVA` | O "raciocínio técnico" do Bloco 4 — de que a indústria *"explora essa deficiência geométrica como um amortecedor de estresse vibracional"* — não tem fonte, não foi pedido, e o prompt proibia expressamente opinar sobre o que a calculadora deveria fazer |

---

## O que entra no canônico

**Cadeia para fresa esférica (`ap < D/2`, eixo perpendicular à superfície):**

```
1. De = √[D3² − (D3 − 2·ap)²]          ≡ 2√[ap(D3 − ap)]     Sandvik D 24 · Mitsubishi
2. n  = vc × 1000 / (π × De)                                  Mitsubishi (fórmula + exemplo resolvido) ·
                                                              Sandvik (Dcap) · Kennametal
3. fz = D3 × hex / De                  (centrada)             Sandvik D 24, verbatim
   fz = D3 × hex / √[De² − (De − 2·ae)²]   (side milling)     Sandvik D 24, verbatim
4. vf = fz × n × zn
```

**Confiança:** rotação por `De` — **3 fabricantes independentes, com exemplo resolvido reproduzido**. Conversão `hex → fz` — **`REFERÊNCIA ÚNICA` (Sandvik), fórmula publicada e transcrita da fonte**.

**Trava obrigatória, e é a lição da rodada:** a entrada tem que declarar **o que é**. `hex` alimenta o passo 3; `fz` de catálogo pula o passo 3. Confundir os dois programa avanço 2,3× acima em fresa Ø10 com `ap` = 0,5 mm.

**Lacuna declarada:** o **eixo inclinado** (fresamento em 5 eixos) tem fórmula própria na Mitsubishi — `θ = arccos[(D1−2ap)/D1] + 90 − α` — e **não foi verificada nesta rodada**. Toda a cadeia acima vale para eixo perpendicular. Se o produto cobrir 5 eixos, isso reabre.

**Fresa toroidal:** continua **em aberto**. O retorno tratou-a como equivalente a "cutters with round inserts", mas essa família usa `iC` (círculo inscrito da pastilha) — grandeza que não existe em fresa inteiriça toroidal. A fórmula correta para topo reto com raio de canto, na mesma página, é `De = Dc + 2·ap/tan κr` para arestas retas; para `ap < rε` a fonte não foi lida. **Não extrapolar.**

---

## Pendência de arquivamento

O retorno chegou colado no chat, não como arquivo, e a formatação matemática se perdeu na transposição. **`RESPOSTA_R2V2.md` ainda não existe.** As citações que importam estão preservadas acima, mas o registro cru precisa ser salvo na pasta `pesquisa/` para fechar a procedência — o protocolo compara retorno contra prompt, e um retorno reprovado é justamente o que mais precisa ficar registrado.
