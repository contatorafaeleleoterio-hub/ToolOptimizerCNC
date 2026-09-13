# Canônico — Deflexão e Vida da Ferramenta

> **Nomenclatura (27/08/2026).** Nos textos de produto: `L/D` = "relação balanço/diâmetro (L/D)", `L` = "balanço (L)", `Lc` = "comprimento de aresta (Lc)", `E` = "módulo de elasticidade (E)", `n` de Taylor = "expoente de Taylor (n)", `Fr/Fc` = "razão força radial / força tangencial". Ver `Docs_inicial/referencia/GLOSSARIO_DE_TERMOS.md`. Este canônico é fonte técnica: fórmulas e tabelas mantêm o símbolo.

**Status:** fonte única de verdade sobre rigidez de fresa em balanço (modelo de viga escalonada), deflexão resultante, e o que se sabe hoje sobre vida de ferramenta (relação de Taylor) — para fresamento com fresa inteiriça de metal duro.
**Precedência:** este documento vence, onde ainda estiverem em uso: (a) o cálculo de deflexão que trata a fresa como viga simples de diâmetro único ("diâmetro da haste") — `CANONICO_LIMITES_E_ALERTAS.md` §1.4 já foi corrigido para a viga escalonada (issue #1, ver §5); (b) qualquer módulo de elasticidade de metal duro sem fonte declarada, em particular o default antigo de 500 GPa; (c) a faixa folclórica `Fr/Fc = 0,3–0,5` tratada como constante de material.
**Origem:** rodada de pesquisa R6 (retorno de 51,2 KB) → `VALIDACAO_R6.md`, veredito `APROVADO COM RESSALVAS`, 2 bloqueios → rodada de verificação R6-V (par cego sobre os bloqueios) → `VALIDACAO_R6V.md` → rodada de verificação R6-V2 → `VALIDACAO_R6V2.md`. R6-V e R6-V2 fecharam `REPROVADO` nos itens de `Fr/Fc` e do expoente de Taylor. Pela regra de cadência do projeto (`HANDOFF.md`, "Cadência corrigida"): o loop re-roda uma vez ajustando o briefing nos itens que bloquearam; reprovando de novo, o canônico sai com o item na §4 Lacunas declaradas, em vez de repetir a rodada indefinidamente — a causa apurada foi acesso a fonte nomeada, não ausência de busca.
**Regra:** No Invention — nenhum número entra sem fonte citada.

---

## 1. Regras e fórmulas

### 1.1 A fresa em balanço é uma viga escalonada, não uma viga simples — o diâmetro único subestima ou superestima a deflexão

Toda fresa de topo montada em balanço tem dois trechos de rigidez diferente: a haste lisa (diâmetro maior) e a parte canalizada — a parte cortante (diâmetro efetivo menor, por causa dos canais). Tratar o conjunto como viga simples de um diâmetro só, qualquer que seja o diâmetro escolhido, erra sistematicamente:

```
δ = (F / 3E) · [ (L³ − L2³)/I1  +  L2³/I2 ]        [mm]

onde:
F  = força radial aplicada na ponta                 [N]
E  = módulo de elasticidade do material da fresa     [MPa]
L  = balanço total (da fixação até a ponta)          [mm]
L2 = comprimento da parte canalizada (parte cortante) [mm] — é o campo `Lc` do MVP (§5, issue #1)
I1 = π·D⁴/64     momento de inércia da haste lisa      [mm⁴] — diâmetro nominal D
I2 = π·Deq⁴/64   momento de inércia da parte canalizada [mm⁴] — Deq = 0,80·D (§2.3)
```

Derivação: trabalho virtual sobre `M(x) = F·(L−x)`, com `I(x)` constante por trecho — `δ = ∫₀ᴸ F·(L−x)² / (E·I(x)) dx`, resolvida em dois trechos e recombinada.

**Teste de sanidade:** se `I1 = I2` (nenhum afinamento, diâmetro único), a fórmula colapsa para `δ = F·L³/(3·E·I)`, a viga simples clássica — confere.

**Tamanho do erro das duas simplificações**, com `Deq/D = 0,80` (§2.3) e `L2/L` = fração do balanço que é parte cortante:

| Parte cortante (`L2/L`) | Usar só o diâmetro da parte cortante (viga simples, D=De) | Usar só o diâmetro da haste (viga simples, D=D_haste) |
|---|---|---|
| 20% | superestima 141% | subestima 1,1% |
| 40% | superestima 124% | subestima 8,4% |
| 60% | superestima 86% | subestima 23,7% |
| 80% | superestima 40% | subestima 42,5% |
| 100% | superestima 0% | subestima 59,0% |

Nenhuma das duas simplificações serve na faixa inteira. Usar o diâmetro da haste erra sempre para o lado que quebra ferramenta (subestima); usar o diâmetro da parte cortante erra sempre para o lado do alarme falso (superestima), que treina o operador a ignorar o aviso.

**Confiança:** derivação própria, conferida por dois caminhos independentes — o teste de sanidade algébrico, e o caso-limite de 100% de parte cortante (59,0%), que bate com o número já registrado por outra via em `VALIDACAO_R6.md` §D-2. Não depende de fonte externa: é geometria de resistência dos materiais, não dado medido.

**O que isto substitui:** o modelo de "diâmetro da haste" — ver §5 para a consequência sobre `CANONICO_LIMITES_E_ALERTAS.md`.

### 1.2 `Fr/Fc` não é fração fixa de material — depende da espessura de cavaco

O modelo convencional relaciona a força radial (a que flete a ferramenta) à força tangencial por um fator `Pf`: `Fr = Pf · Fc`. Nenhum valor único de `Pf` está publicado como constante de material — e o motivo tem explicação mecânica, não é lacuna de busca.

A forma correta é o modelo mecanístico, com dois pares de coeficiente por material (corte e aresta):

```
Fc(h) = Ktc·h·b + Kte·S
Fr(h) = Krc·h·b + Kre·S

Fr/Fc = (Krc·h·b + Kre·S) / (Ktc·h·b + Kte·S)

onde:
h  = espessura de cavaco instantânea    [mm]
b  = largura de corte                    [mm]
S  = comprimento de aresta em contato    [mm]
Ktc, Krc = coeficientes de corte (tangencial, radial)  [N/mm²]
Kte, Kre = coeficientes de aresta (tangencial, radial) [N/mm]
```

Como o termo de aresta (`Kte·S`, `Kre·S`) não escala com `h` e o termo de corte escala, a razão `Fr/Fc` **cai** conforme `h` cresce — é isso que produz a faixa folclórica "0,3 a 0,5": ela é o efeito da força de aresta dominando em espessuras de cavaco pequenas (avanço de oficina), não uma constante do material. Em amostra observada (não fonte citável — ver §4), a mesma ferramenta no mesmo material variou de 0,50 (h=0,05mm) a 0,26 (h→∞) só mudando o avanço.

**Confiança:** `SEM CONSENSO` para uma razão `Fr/Fc` universal — é o rótulo da fonte primária (`RESPOSTA_R6.md` Bloco 3). Que força e geometria precisem ser modeladas ou calibradas, em vez de fixadas em número, é conclusão da rodada: a fonte a marca com rótulo qualificado, que por instrução de `VALIDACAO_R6.md` (G3) não se transporta para cá. O mecanismo — o termo de aresta não escala com `h` e o de corte escala — se sustenta pela álgebra das duas equações acima, não por consenso de fontes; a ilustração numérica 0,50 → 0,26 vem de amostra observada, não citável (§4). `NÃO ENCONTRADO` para os valores de `Ktc/Krc/Kte/Kre` por material — sem eles, a fórmula não produz número (lacuna crítica, §4.1).

### 1.3 Vida de ferramenta segue a relação de Taylor — mas o expoente pesa mais que qualquer constante de força

```
T / T_ref = (Vc_ref / Vc) ^ (1/n)        [adimensional, fração de vida remanescente]

onde:
T     = vida no Vc real usado           [min]
T_ref = vida de referência do catálogo  [min]
Vc_ref = Vc de referência do catálogo   [m/min]
Vc     = Vc real usado                  [m/min]
n      = expoente de Taylor (depende de ferramenta × material)
```

A forma da equação não depende de fonte: é a relação de Taylor rearranjada, verificável pela própria álgebra. O que muda o resultado é `n`, e a sensibilidade a ele é maior que a de qualquer outra constante deste documento: para o mesmo desvio de 20% em `Vc` acima do catálogo, a vida remanescente varia de **23,3% a 73,8%** dependendo só de qual `n` se assume:

| `n` | 0,125 | 0,25 | 0,33 | 0,4 | 0,5 | 0,6 |
|---|---|---|---|---|---|---|
| Vida remanescente (Vc = 1,2×Vc_ref) | 23,3% | 48,2% | 57,6% | 63,4% | 69,4% | 73,8% |

Essa dispersão sozinha excede a margem do modelo (±15–25%). Usar um `n` errado é mais grave que usar uma constante de força aproximada — é o tipo de erro que o projeto existe para não repetir em silêncio.

**Confiança:** a forma da equação **não recebe rótulo** — é identidade algébrica, se sustenta pela conta e não por consenso de fontes (instrução de `VALIDACAO_R6.md` G3; a fonte primária a marca como rótulo qualificado, que não se transporta). `NÃO ENCONTRADO` para `n` por classe de ferramenta; `SEM CONSENSO` para `T_ref` (15 e 30 min não se confirmam como convenção universal) — ver §4.3. Os valores 0,25 (metal duro) e 0,125 (HSS) que circulavam no material auditado **não têm fonte confirmada** e não devem ser usados como constante silenciosa — só em teste de sensibilidade, explicitamente rotulado como tal.

### 1.4 Nota cruzada — profundidade sem ciclo pica-pau com refrigeração interna já está resolvida, não é assunto deste documento

A pergunta "quanto a refrigeração interna estende a profundidade de furação sem exigir ciclo pica-pau" já tem resposta com `CONSENSO` de três fabricantes independentes, registrada em `CANONICO_LIMITES_E_ALERTAS.md` §1.4: sem canal interno, alerta acima de 3×D; com canal interno, não avisar até 30×D. Este canônico não reabre o ponto — é mencionado aqui só para deixar claro que não é uma lacuna deste assunto.

### 1.5 Nota cruzada — limite de deflexão é relativo à tolerância, não valor absoluto

Não existe um limiar universal de deflexão aceitável em micrômetros — nenhuma fonte pesquisada nesta rodada publica um. A política correta, e que já está registrada em `CANONICO_LIMITES_E_ALERTAS.md` §1.4 (deflexão como alerta contra a tolerância informada, virando limite físico só se violada em mais de 2×), é a mesma que esta rodada chegaria a recomendar de forma independente. Duas fontes convergindo na mesma conclusão de produto — não é achado novo, é confirmação.

---

## 2. Constantes e tabelas

### 2.1 Módulo de elasticidade do metal duro

**`E = 580 GPa`** — valor único recomendado para metal duro submícron de uso geral (a classe dominante em fresa inteiriça).

| Grau (referência) | %Co | Granulometria | E [GPa] | Fonte | Confiança |
|---|---|---|---|---|---|
| CTU08L | 4,2 | ultrafino | 646 | CERATIZIT, *p-line*, ed. 05/2024 | `REFERÊNCIA ÚNICA` (ver nota abaixo) |
| CTS12D / CTF12E | 6,0 | submícron / fino | 624 | CERATIZIT (par de mesma %Co, granulometria diferente) | idem |
| CTS15D | 7,5 | submícron | 605 | CERATIZIT | idem |
| CTS20D / CT-GS20Y | 10,0 | submícron | 570 / 577 | CERATIZIT | idem |
| K3833 | 11,0 | — | 560 | Kennametal, *Specialty Carbide Products* | idem |
| CTS24Z / TSF44 | 12,0 | submícron / ultrafino | 549 / 547 | CERATIZIT (par de mesma %Co) | idem |
| CTS30D | 15,0 | submícron | 512 | CERATIZIT | idem |

**Nota de rótulo — o que é `CONSENSO` aqui e o que não é.** Cada linha desta tabela vem de **um fabricante só**, e `VALIDACAO_R6V.md` registra o dado por grau como `RESSALVA`: *"Não é confirmação cruzada — é resposta de um território só."* Por isso cada linha é `REFERÊNCIA ÚNICA`. O que tem `CONSENSO` é a **faixa 560–624 GPa na janela de 6–11% Co** (a classe dominante em fresa inteiriça de uso geral) e o **método**, sustentados por três linhagens independentes — ver `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §2.2. Não promover valor de grau individual a consenso. Graus de 12–15% Co (549, 547, 512 GPa) ficam **abaixo** da faixa — são para uso mais tenaz, menos comuns em fresa inteiriça; fixar 580 ainda cabe na margem do modelo mesmo neles (tabela de erro abaixo).

Método declarado nas três fontes: ressonância dinâmica macroscópica (NPL — norma **EN 23312**/ISO 3312; CERATIZIT — mesma norma; Kennametal — "resonance method", National Bureau of Standards). Dispersão entre as três fontes ≤3,2% no mesmo %Co. NPL e Doi contam como **uma fonte só** (a eq. 44 do NPL é o ajuste de Doi); a contagem de três se sustenta porque CERATIZIT e Kennametal são independentes das duas. **Granulometria não afeta `E`** — confirmado por dois pares de mesmo %Co e granulometria diferente (624×624 a 6% Co; 547×549 a 12% Co), diferença ≤0,4%.

**Fórmula geradora (NPL, Measurement Good Practice Guide No. 20, eq. 44), para quando a fração de cobalto for conhecida com precisão:**
```
E [GPa] = 708 − 821·V_Co + 412·V_Co²        (V_Co = fração VOLUMÉTRICA de cobalto)
```

> ⚠️ **A fórmula come fração volumétrica; a coluna `%Co` da tabela acima é fração de MASSA** (é como CERATIZIT e Kennametal publicam). Converter antes de usar — auditoria, achado A14:
> ```
> V_Co = (w_Co/ρ_Co) / [ w_Co/ρ_Co + (1 − w_Co)/ρ_WC ]     ρ_Co = 8,9   ρ_WC = 15,6  [g/cm³]
> ```
> Exemplos: 6% massa → V_Co ≈ 0,101 ; 15% massa → V_Co ≈ 0,236. Usar a massa direto na fórmula infla `E` em até +16% (cresce com o teor de cobalto).

**Confirmação por par cego:** o enunciado que produziu esta tabela omitiu deliberadamente o valor já registrado em `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` (580 GPa, `REFERÊNCIA ÚNICA` até então). O território de fonte primária chegou a 580 GPa de forma independente — ver §5 para a consequência sobre aquele documento.

**Erro em `δ` ao fixar 580 GPa como constante única** (δ ∝ 1/E):

| Grau real | %Co (massa) | E real [GPa] | Erro em δ ao fixar 580 |
|---|---|---|---|
| CTU08L | 4,2 | 646 | +11,4% |
| CTS12D/CTF12E | 6,0 | 624 | +7,6% |
| CTS20D | 10,0 | 570 | −1,7% |
| K3833 | 11,0 | 560 | −3,4% |
| CTF25E | 12,5 | 543 | −6,4% |
| CTS30D | 15,0 | 512 | −11,7% |

Na janela de fresa inteiriça de uso geral (6–11% Co), o erro de fixar 580 fica entre **+7,6%** e **−3,4%**. Estendendo aos graus mais tenazes (12–15% Co), chega a **−11,7%** — ainda dentro da margem ±15–25% do modelo. (CTF25E, 12,5% Co, entra aqui para ancorar a ponta; não está na tabela §2.1 por não ser grau de uso geral — auditoria, achado A31.)

### 2.2 Módulo de elasticidade do aço rápido (HSS)

**`E ≈ 207 GPa`** — Hudson Tool Steel, graus M2 e M42.

**Confiança:** `REFERÊNCIA ÚNICA`, e com ressalva: o localizador da fonte aponta para uma página de grau M4, não M42 — divergência de identificação não resolvida. Não confirmado por segunda fonte independente (território de código encontrou 186–220 GPa em várias fontes sem grau declarado, não citável). Ver lacuna §4.5.

### 2.3 Diâmetro equivalente (`Deq`) por número de canais

**`Deq/D = 0,80`** — fresas de 2 e 4 canais. `Deq` é o diâmetro da parte canalizada para efeito de rigidez — **não** é o `De` de corte da fresa esférica (que entra na rotação, `CANONICO_MOTOR_DE_CALCULO.md` §1.2). Símbolos distintos desde 27/08 (auditoria, achado A16).

**Fonte:** Kops e Vo, *"Determination of the Equivalent Diameter of an End Mill Based on its Compliance"*, CIRP Annals, 1990. **Confiança:** `REFERÊNCIA ÚNICA` — o artigo em si nunca foi aberto em três tentativas ao longo do projeto (nome e DOI identificados, texto integral atrás de paywall); o valor circula por citação de segunda mão. Entra como **default declarado**, não como constante confirmada.

**Por que o default é utilizável apesar da incerteza:** com o modelo de viga escalonada (§1.1), o efeito de `Deq/D` variar entre 0,75 e 0,85 só passa a pesar quando a parte cortante domina o balanço:

| Parte cortante do balanço | Efeito de `Deq/D` variar 0,75→0,85 em `δ` |
|---|---|
| 20% | 1,0% |
| 30% | 3,3% |
| 50% | 14,0% |
| 70% | 32,5% |
| 100% | 65,0% |

Em montagem normal de oficina (fixação pela haste, saída mínima da parte canalizada), a parte cortante fica tipicamente ≤50% do balanço, e o efeito cabe dentro da margem do modelo.

**Sem valor para 3, 5, 6+ canais** — ver lacuna §4.4.

---

## 3. O que foi decidido pelo Mestre

**`E` do metal duro entra como constante interna, sem campo editável na tela.** Não é arbítrio — vem direto da tabela de erro em §2.1: a dispersão real entre graus comerciais (−6,4% a +7,6% na faixa de uso geral) fica dentro da margem ±15–25% que o projeto já aceita para todo o modelo. Expor um campo editável para uma variável cujo erro de fixá-la já cabe na margem seria complexidade sem ganho de precisão.

Nenhuma outra decisão de produto coube nesta rodada — as demais definições vieram direto da evidência (resolvida) ou ficaram como lacuna declarada (§4), sem espaço de escolha do Mestre no meio.

---

## 4. Lacunas declaradas

### 4.1 `Fr/Fc` — a lacuna crítica deste documento

Sem os coeficientes `Ktc`, `Krc`, `Kte`, `Kre` por material, a fórmula de §1.2 tem forma mas não produz número — e sem `Fr`, a fórmula de deflexão de §1.1 não tem força de entrada. Duas rodadas de verificação (R6-V, R6-V2) tentaram fechar isto e reprovaram nas duas. **O que fecharia:** os coeficientes publicados por material em Altintas, *Manufacturing Automation* — obra nomeada, não é mais busca aberta.

### 4.2 Escolha entre pico e média de `Fr` para o cálculo

O enunciado pediu essa decisão em duas rodadas seguidas e nenhuma resposta se sustentou — uma rodada chegou a propor "o pico" e se desdisse na sequência. Fica em aberto: usar o pico é a escolha conservadora para deflexão máxima, mas não há confirmação de que é a prática de referência do setor. **O que fecharia:** série de força instrumentada por ciclo de dente, ou decisão explícita do Mestre assumindo o risco de subestimar.

### 4.3 `n` de Taylor e `T_ref`, por classe de ferramenta

Nenhuma tabela elegível de `n` por classe (HSS, HSS-Co, metal duro sem/com revestimento, cerâmica, CBN) × grupo de material foi encontrada em duas rodadas de verificação. **O que fecharia:** Machinery's Handbook ou ASM Vol. 16, abertos na tabela — obras nomeadas.

**Pista barata a confirmar antes de insistir na busca:** há indício não confirmado de que a ISO 3685 cobre só ferramenta de ponta única (torneamento), não fresamento. Se confirmado, o `T_ref` dos catálogos de fresa não tem norma que o ancore — a lacuna passa de "não achamos" para "não existe onde estar", que é resposta definitiva e fecha a pergunta sem exigir mais acesso a fonte.

### 4.4 `Deq/D` (diâmetro equivalente) para fresas de 3, 5, 6 ou mais canais

A única fonte (§2.3) cobre só 2 e 4 canais. Sem valor publicado nem modelo estrutural para os demais. **O que fecharia:** abrir o próprio Kops e Vo (pode ter cobertura mais ampla que a citação de segunda mão sugere), ou um ensaio de compliance.

### 4.5 `E` do aço rápido por grau (M2, M35, M42)

Valor único de §2.2 tem fonte com identificação inconsistente e nenhuma segunda fonte independente confirma. Prioridade baixa enquanto o catálogo do projeto não incluir ferramenta de aço rápido além de broca e macho (ver `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §3). **O que fecharia:** ficha técnica por grau de um segundo fabricante.

### 4.6 Ganho de `Vc`/`fz`/`ap`/`ae` por refrigeração interna

`NÃO ENCONTRADO` em toda a rodada — nenhum multiplicador publicado, nenhum fator por pressão/vazão. **O que fecharia:** catálogo específico de fabricante que declare o ganho numérico, ou ensaio próprio (DOE por diâmetro/material/pressão).

---

## 5. Consequências

- **A deflexão tem fórmula pronta, mas não é calculável em número ainda.** Com `Fr/Fc` em lacuna (§4.1), o sistema pode expor a fórmula de §1.1 estruturalmente (mostrar a relação, aceitar os dados geométricos) mas não entregar um valor de deflexão em micrômetros até um dos três documentos de §4.1/§4.3/§4.4 chegar. Não há meio-termo defensável — declarar isto sem arbitrar um `Fr/Fc` provisório.
- ~~**`CANONICO_LIMITES_E_ALERTAS.md` §1.4 fica pendente de correção.**~~ **RESOLVIDO** (issue #1). O `L2` da fórmula é o campo **`Lc` — comprimento de aresta**, já existente como entrada opcional em `MVP_CALCULADORA_PARAMETROS.md` §4.1 (hoje usado só como teto de `ap`); nenhum campo novo foi necessário. Com `Lc` informado, §1.4 aplica a viga escalonada de §1.1 na íntegra. Sem `Lc`, o cálculo cai para viga simples de diâmetro único `D` e o resultado sai marcado como estimativa conservadora — nenhum default de `Lc` por classe de ferramenta é assumido, por falta de fonte.
- ~~**`CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §2.2 tem seu rótulo de confiança desatualizado.**~~ **RESOLVIDO** (issue #2). O rótulo da **faixa** subiu para `CONSENSO` — três linhagens independentes com método declarado — e a faixa passou de 550–610 para **560–624 GPa**. Duas ressalvas apuradas na correção, ambas registradas lá: o **580 GPa é decisão de engenharia**, não número publicado (`VALIDACAO_R6V.md` G4), e o `CONSENSO` cobre faixa e método, **não** a tabela grau a grau — que é de um fabricante só e continua `REFERÊNCIA ÚNICA` (ver a nota de rótulo em §2.1 deste documento, corrigida junto).
- **Nenhuma previsão de vida em número entra no MVP por esta via.** Como já registrado em `MVP_CALCULADORA_PARAMETROS.md` §12 e no HANDOFF, a ausência de `n` de Taylor com fonte (§4.3) mantém a previsão de vida como qualitativa (sinal + grandeza), não numérica — este canônico não muda essa decisão de produto, só confirma por que ela continua correta.
