# RESPOSTA_R6V — território: CÓDIGO ABERTO E PRÁTICA DE IMPLEMENTAÇÃO

<!-- arquivo criado vazio antes da primeira busca (trava 4: gravação incremental) -->

_status: em apuração_

---

## CADERNO DE CAMPO — achados brutos, por repositório

> Cada bloco registra: repo, arquivo, linha, valor, fonte declarada pelo próprio código,
> e adoção (estrelas/forks). **Nenhuma fonte declarada por código foi aberta para conferir**
> (trava do cruzamento). Onde o código cita handbook/artigo/norma, isso está registrado
> como *metadado do código*, não como fonte minha.

### A1 — `brturn/feeds-and-speeds` (Bryan Turner) — "Optimizing Feeds & Speeds Calculator for CNC Milling"

- Adoção: **29 estrelas, 4 forks**, 21 commits. Último commit em `beta.html`: **2020-09-06**;
  bloco de física introduzido em **2017-04-26** (commit `2b1903d`, "added new BETA calculator").
- É a **implementação-raiz** do cálculo de deflexão em código aberto de usinagem: o
  `better-tool-library` (addon do FreeCAD) declara ter derivado seu algoritmo daqui.
- Arquivo: `beta.html` (2738 linhas, JS embutido). Bruto:
  `https://raw.githubusercontent.com/brturn/feeds-and-speeds/master/beta.html`

**Módulo de elasticidade — linhas 306-308 e 144**

```js
306:    var Modulus = {}
307:    Modulus.HSS = 27;
308:    Modulus.Carbide = 75;
```
```html
144: <li>Modulus of Elasticity <input id="in_E" value="27"> <small>(10^6 psi)</small></li>
```
```js
565:  var local_E = E.v * 1000000;   // Scale modulus of elasticity
```

- Unidade confirmada pelo rótulo do campo (10^6 psi) e pelo fator 1e6 na linha 565.
- **Metal duro: 75e6 psi = 517,1 GPa.** **Aço rápido: 27e6 psi = 186,2 GPa.**
- **Grau, teor de Co e tamanho de grão: NÃO declarados.** O código tem uma única entrada
  "Carbide", sem grau.
- **Fonte declarada pelo código para esses dois números: NENHUMA.** Não há comentário de
  procedência nas linhas 306-308, embora o mesmo arquivo cite fontes explicitamente em
  outros pontos (linhas 310, 322, 763, 771). A ausência é seletiva, portanto significativa.
- Método de medição (flexão macroscópica × indentação `EIT`): **não declarado**.

**Diâmetro efetivo resistente — linhas 766-772**

```js
766:  // Moment of Inertia: This is the equation for a SOLID round beam - the shank of the end mill
767:  // https://en.wikipedia.org/wiki/List_of_area_moments_of_inertia
768:  var IS = (PI * Math.pow(SHANK.v/2,4)) / 4;
770:  // Estimated equivelent solid diameter of fluted portion = 80% of fluted diameter
771:  // "Determination of the Equivalent Diameter of an End Mill Based on its Compliance", L. Kops, D.T. Vo
772:  var IF = (PI * Math.pow((DIAMETER.v*0.8)/2,4)) / 4;
```

- **De = 0,80 × D.** Aplicado a **qualquer** fresa: o código não ramifica por número de
  canais nem por profundidade de canal.
- **Fonte declarada pelo código:** artigo de L. Kops e D.T. Vo, "Determination of the
  Equivalent Diameter of an End Mill Based on its Compliance". *(Registro como metadado;
  não abri — é território do outro pesquisador.)*
- Nota de unidade: o código usa `I = π·r⁴/4`, equivalente a `π·D⁴/64` do enunciado do Fenix.

**Modelo de viga — linhas 774-788: viga ESCALONADA de 3 trechos**

```js
774:  var LS  = L.v - FL.v;    // Length of shank portion
775:  var LFu = FL.v - DOC.v;  // Length of non-cutting flute portion
776:  var LFc = DOC.v;         // Length of flute portion in cut
...
782:  var deflectionShank      = cantileverDeflectEndLoad(P.v,LS ,local_E,IS);
783:  var deflectionNonCutting = cantileverDeflectEndLoad(P.v,LFu,local_E,IF);
784:  var deflectionCutting    = cantileverDeflectUniLoad(P.v,LFc,local_E,IF);
786:  // NOTE: We ignore the contribution from the angle of deflection, which should be negligable for cutting purposes.
787:  DEFLECTION.v = deflectionShank + deflectionNonCutting + deflectionCutting;
```
```js
438: function cantileverDeflectEndLoad(F,L,E,I) { return     F*Math.pow(L,3) / (3*E*I); }
439: function cantileverDeflectUniLoad(F,L,E,I) { return (F/L)*Math.pow(L,4) / (8*E*I); }
```

- **Fonte declarada pelo código (linhas 763-764):** *Metal Cutting Theory and Practice*,
  Stephenson & Agapiou, p.362; e Kivanc & Budak, "Structural modeling of end mills for form
  error and stability analysis". *(Registrados como metadado; não abertos.)*
- Achado importante: a implementação **soma três parcelas independentes**, cada uma tratada
  como engaste na base do próprio trecho — ela **ignora o termo de rotação** (a inclinação
  acumulada do trecho de baixo multiplicada pelo comprimento do trecho de cima), o que o
  próprio comentário 786 admite. Isso **subestima** a deflexão total. Ver a seção de erro na
  Questão 4.

**Razão radial/tangencial — linhas 713-754: NÃO existe um `Fr/Fc`; existe um `radial/axial`**

```js
713: // INGERSOLL Cutting Tools - LEAD angle adjustment to deflection force
714: // "As depth of cut decreases, a greater proportion of the cutting force is exerted in the axial direction."
715: // http://www.mmsonline.com/articles/the-high-feed-high-reliability-process
719: // Equation designed by Bryan Turner
732: // Not quite correct .. radial/axial forces will not generally add up to 100% of spindle power,
733: // rather they have oblique force-multipliers due to lever/fulcrum effects. For now just make them balance.
735: radialFactor = Math.min( 1,
736:                Math.cos( Math.atan( Math.min(WOC.v,EffectiveDiameter.v/2) / DOC.v) ) *
737:                Math.sqrt(WOC.v / EffectiveDiameter.v) *
738:                Math.cos(toRadians(HELIX)));
740: axialFactor  = 1 - radialFactor;
753: P.v      = (radialFactor * HP.v * OneHP) / SFM.v;   // Force acting to bend the end mill
754: PAxial.v = (axialFactor  * HP.v * OneHP) / SFM.v;
723: var HELIX = 30;   // helice fixa em 30 graus, nao vem da ferramenta
```

- Leitura: `(HP·OneHP)/SFM` **é** a força tangencial (potência ÷ velocidade). O `radialFactor`
  é portanto, literalmente, a razão **Fr/Fc** implementada. Ou seja: a maior calculadora de
  código aberto do ramo **não usa uma constante** — usa uma função de engajamento.
- **Fonte declarada para a equação: "Equation designed by Bryan Turner"** — ou seja,
  **autoral, sem fonte**. A citação da Ingersoll (linha 713-715) sustenta apenas a
  *tendência qualitativa* (DOC menor → mais força axial), não os fatores.
- O próprio autor marca a equação como aproximada ("Not quite correct", linha 732).
- Valores que essa função produz (helix 30 graus, cos 30 = 0,866):
  - slot pleno (WOC = D, DOC grande): `cos(atan((D/2)/DOC)) · 1 · 0,866` → tende a **0,87**
  - WOC = 0,5·D, DOC = 1·D: `cos(atan(0,25)) · √0,5 · 0,866` = 0,970·0,707·0,866 = **0,594**
  - WOC = 0,1·D, DOC = 2·D: `cos(atan(0,05)) · √0,1 · 0,866` = 0,999·0,316·0,866 = **0,274**
  - WOC = 0,05·D, DOC = 3·D (HSM típico): = **0,194**
  → a faixa gerada, **0,19 a 0,87**, contém a faixa folclórica "0,3 a 0,5" mas é bem mais larga.

**Expoente de Taylor `n`: AUSENTE.** `grep -i "taylor\|tool life"` em `beta.html` não retorna
o modelo de vida. A calculadora limita por deflexão, torque, potência e força — **não** por vida
de ferramenta. Achado: a implementação de referência do ramo **não implementa Taylor**.

### A2 — `knipknap/better-tool-library` (BTL) — addon oficial do FreeCAD para biblioteca de ferramentas

- Adoção: **43 estrelas, 16 forks**; criado 2023-07-15, último push **2025-08-28** (vivo).
  É distribuído pelo *Addon Manager* do FreeCAD e exporta para LinuxCNC, Camotics e Fusion.
- Declara na doc (`docs/feeds-and-speeds.md`): *"The algorithm was originally based on the
  work done by Bryan Turner"* — **mesma linhagem de A1**.

**Módulo de elasticidade — `btl/toolmaterial.py`, linhas 7-25 (arquivo inteiro, 25 linhas)**

```py
 7:    elasticity = 200000 # Modulus of elasticity (N/mm²)     <- classe base ToolMaterial
11: class HSS(ToolMaterial):
14:    # https://material-properties.org/high-speed-steel-density-strength-hardness-melting-point/
15:    elasticity = 200000 # Modulus of elasticity (N/mm²)
16:    yield_strength = 1000 # MPa
19: class Carbide(ToolMaterial):
22:    # https://material-properties.org/tungsten-carbide-properties-application-price/
23:    elasticity = 600000 # Modulus of elasticity (N/mm²)
24:    yield_strength = 330 # MPa
```

- **Metal duro: 600 000 MPa = 600 GPa.** **Aço rápido: 200 000 MPa = 200 GPa.**
- **Grau, %Co e tamanho de grão: NÃO declarados.** Uma única classe `Carbide`.
- **Fonte declarada pelo código:** `material-properties.org` — página genérica de
  *tungsten carbide*, não de metal duro de fresa. Nível 5 (web terciária). O código **não**
  cita norma, handbook nem catálogo aqui.
- Método (flexão × `EIT`): **não declarado**.

**ACHADO DE PROCEDÊNCIA — a "convergência" entre A1 e A2 é falsa, e o histórico prova**

Commit `88d593f` (2023-08-10, "change units of modulus of elasticity"). Diff literal:

```diff
-    elasticity = 0.186158 # Modulus of elasticity (N/mm²)
+    elasticity = 200000 # Modulus of elasticity (N/mm²)
-    elasticity = 0.517107 # Modulus of elasticity (N/mm²)
+    elasticity = 600000 # Modulus of elasticity (N/mm²)
```

- `0,517107` e `0,186158` são **exatamente** os valores de A1 convertidos:
  75e6 psi × 0,00689476 = **517 107 MPa**; 27e6 psi × 0,00689476 = **186 158 MPa**.
  Isso (i) confirma sem dúvida que os `75` e `27` de A1 são Mpsi, e (ii) mostra que o BTL
  **herdou** os números de A1 e depois os **substituiu por valores redondos** de uma página
  web genérica.
- Consequência para a contagem de convergência: **A1 e A2 são UMA fonte, não duas.**
  E dentro dessa fonte única o valor de `E` do metal duro **mudou de 517 para 600 GPa por
  troca de referência**, não por medição. Isso é dispersão de 16% dentro da mesma linhagem.

**Diâmetro efetivo — `btl/tool.py`, linhas 290-308 (`get_inertia`)**

```py
294:  # Estimated equivalent of the fluted portion = 80% of the fluted diameter
295:  # "Determination of the Equivalent Diameter of an End Mill Based on its
296:  # Compliance", L. Kops, D.T. Vo
297:  diameter = self.shape.get_diameter()
298:  fluted_inertia = (math.pi * ((diameter*0.8) / 2)**4) / 4
300:  # Moment of inertia equation for a SOLID round beam (shank portion of the end mill)
302:  shank_d = self.shape.get_shank_diameter()
304:  solid_inertia = (math.pi/4) * (shank_d/2)**4
306:  else: solid_inertia = fluted_inertia
```

- **De = 0,80 × D**, idêntico a A1, **mesma fonte declarada** (Kops & Vo). Herdado, não
  independente. **Sem ramificação por número de canais** e **sem ramificação por
  profundidade de canal** — o mesmo 0,8 vale para 2, 3, 4 ou 6 canais no código.

**Viga escalonada — `btl/tool.py` 310-341**: soma das mesmas 3 parcelas de A1, com as mesmas
duas fontes declaradas (Stephenson & Agapiou p.362; Kivanc & Budak) e o mesmo aviso na
linha 339: *"We ignore the contribution from the angle of deflection"*.

**Razão radial/axial — `btl/feeds/util.py`, linhas 7-35**: **cópia literal** da equação de A1,
inclusive os comentários `# Equation designed by Bryan Turner` (linha 20) e
`# Not quite correct` (linha 25), com `helix_angle=30` como padrão de assinatura (linha 7).
Acrescenta uma citação de catálogo Ingersoll (`ingersoll_cat-009_technical.pdf`, linha 14)
que A1 só citava pela matéria do MMS Online. **Nenhuma constante `Fr/Fc` fixa.**

**Expoente de Taylor: AUSENTE.** `grep -rn -i "taylor|tool_life|wear" --include=*.py` no
repositório inteiro (49 arquivos .py) retorna **zero linhas**. O addon de biblioteca de
ferramentas do FreeCAD **não modela vida de ferramenta**.

### A3 — `bhowiebkr/CNC-ToolHub` — app de gestão de ferramentas + feeds/speeds (PySide)

- Adoção: **15 estrelas, 4 forks**; criado 2022-09-12, último push **2025-09-06**.
- Linhagem: **independente** de A1/A2 (não cita Turner, não usa 0,8, estrutura própria).

```py
src/constants/machining.py:24: # Physical Constants for Tool Deflection
src/constants/machining.py:25: CARBIDE_YOUNGS_MODULUS = 600e9  # Pa (600 GPa for carbide)
src/constants/machining.py:26: CARBIDE_DENSITY = 14500  # kg/m³
```
```py
src/formulas/deflection.py:26:  E = CARBIDE_YOUNGS_MODULUS  # Young's modulus (Pa)
src/formulas/deflection.py:29:  radius_m = (diameter_mm / 2) / 1000
src/formulas/deflection.py:33:  moment_inertia = (math.pi * (radius_m ** 4)) / 4
src/formulas/deflection.py:36:  deflection_m = (force_n * (stickout_m ** 3)) / (3 * E * moment_inertia)
```

- **Metal duro: 600 GPa. Fonte declarada: NENHUMA.** Sem grau, sem %Co, sem grão, sem método.
  (A densidade 14 500 kg/m³ é o único indício indireto de composição, e não é rotulada.)
- **Não há valor de `E` para aço rápido** — o app assume metal duro para deflexão.
- **De/D = 1,00**: usa o **diâmetro nominal cheio** (`radius_m = diameter_mm/2`), **sem** fator
  de canal. Divergência direta contra A1/A2 (0,8). Ver sensibilidade na Questão 4.
- **Fr/Fc = 1,00 implícito**: `calculate_tool_deflection(cutting_force, ...)` recebe a força de
  corte **inteira** como força de flexão (`src/calculators/standard.py:121`). O app **não separa**
  componente radial de tangencial.
- Viga: **simples**, um trecho só (balanço inteiro no diâmetro nominal). Não escalonada.
- **Taylor: ausente.**

### A4 — `dubstar-04/FeedsAndSpeeds` — addon "Feed and Speeds Calculator" do FreeCAD CAM

- `grep -rn -i "modulus|elasticity|deflect|taylor|radial"` no repositório: **zero linhas**.
- O addon calcula rotação, avanço, potência e torque a partir de uma tabela de constante de
  potência (`CAMFeedsAndSpeeds.py:42-57`, comentário `# Data from Machineries Handbook 28. Table 2`)
  — **fonte declarada: handbook** *(metadado; não aberto)*.
- **Achado por ausência:** o addon de feeds & speeds do CAM do FreeCAD **não calcula deflexão,
  não separa componentes de força e não modela vida de ferramenta.** Ou seja, o caminho de
  cálculo mais usado por usuários de FreeCAD **não implementa nenhuma das quatro constantes**.

### A5 — `machiningdoctor.com` — ferramenta web de cálculo de usinagem (artigo "Endmills Deflection")

- Endereço: `https://www.machiningdoctor.com/expert-articles/endmiils-deflection/`
  (o site hospeda calculadoras públicas de usinagem; nível 5).
- Fórmula publicada: **`Δ = 64·F·L³ / (3·E·π·d⁴)`** — idêntica à do Fenix (`δ=FL³/3EI`, `I=πd⁴/64`).
- Tabela de rigidez relativa do artigo:

| Material | `E` publicado | Rigidez relativa |
|---|---|---|
| Metal duro (carbide) | **600–650 GPa** | 1,0 |
| Aço rápido (HSS) | **200–220 GPa** | 0,33 |

- **Grau, %Co, tamanho de grão: NÃO declarados.** **Método (flexão × `EIT`): não declarado.**
- **Fonte citada pelo artigo: NENHUMA.**
- Diâmetro efetivo: o artigo **não publica um fator fixo**. Ele instrui a usar o **diâmetro de
  núcleo real** (medido no fundo do canal) e dá um exemplo numérico: fresa de **12 mm** com núcleo
  de **~10 mm** deflete **~85% a mais** do que o cálculo com o diâmetro de corte.
  Conferência aritmética: se a deflexão com o núcleo é 1,85x a do diâmetro de corte, então
  (D/De)⁴ = 1,85 → **De/D = (1/1,85)^(1/4) = 0,857**, o que dá De = 10,3 mm para D = 12 mm —
  exatamente o "~10 mm de núcleo" citado. Ou seja, o exemplo publicado equivale a **De/D ≈ 0,86**
  para uma fresa de 12 mm (a contagem de canais não é declarada no exemplo).
- Viga escalonada: o artigo reconhece os dois trechos (pescoço cheio × parte canalizada) e diz
  que **o menor dos dois governa** — não fornece cálculo escalonado.
- **Fr/Fc: não fornecido neste artigo.**

### A6 — Varredura de código para o expoente de Taylor (`gh search code`)

Buscas: `taylor_exponent`, `tool_life_exponent`, `taylor_n`, `taylor tool life exponent`.
Resultado da varredura no GitHub inteiro — **nenhuma calculadora de oficina consolidada
implementa Taylor**. Só aparecem três repositórios, todos de 2026 e todos de adoção nula:

| Repo | Arquivo | Valor | Fonte declarada | Estrelas |
|---|---|---|---|---|
| `clay-good/anvilate` | `src/anvilate/analysis/machining.py:14-21,109-132` | `n ~0,1–0,2 HSS` · `~0,2–0,4 metal duro` (faixa em docstring; `n` é **parâmetro obrigatório**, sem default) | docstring linha 20: *Machinery's Handbook* e Kalpakjian, *Manufacturing Engineering and Technology* *(metadado; não abertos)* | 5 |
| `ObaIsSoft/Bound-Representation-...-Kernel` | `backend/vmk_process_simulation.py` | `taylor_n` **default 0,25 para metal duro**; `taylor_c` default **300 m/min** | nenhuma | 0 |
| `Magnatrix-Lab/MAGNATRIX-OS` | `tools/calculators/general/llm_tool_life_native.py` | função `taylor_exponent()` | nenhuma (nome do arquivo contém `llm_`) | 1 |

- **Alerta de circularidade:** os três são repositórios recentes (2026), de zero a cinco estrelas,
  com forte marca de geração assistida por LLM (um deles literalmente chamado `llm_tool_life_native.py`).
  Um `n = 0,25` que aparece num repo gerado por modelo de linguagem **não é confirmação
  independente** do `n = 0,25` presumido pelo Fenix — é possivelmente o mesmo eco. Registro, mas
  **não conto como fonte**.
- Também apareceram dois repositórios de material didático (`H-XX-D/CNC-Engineering-Course-`,
  `ihjas-ahammed/duofy`) com `n = 0,125 HSS / 0,25 metal duro / 0,50 cerâmica-CBN`, ambos em
  markdown gerado, sem localizador de fonte. Mesmo alerta.

### A7 — `Blair-Johnson/cut-force-simulator` — simulador mecanístico de força de fresamento

- Adoção: **0 estrelas, 0 forks**; 2025-08. Adoção nula, mas é o **único** código aberto achado
  que expõe explicitamente a razão radial/tangencial como parâmetro nomeado.

```py
sim-forces.py:308: parser.add_argument('--kr', type=float, default=0.4, dest='radial_force_ratio',
                     help='Radial-to-Tangential force ratio (Kr)')
sim-forces.py:48:  Kr = params['radial_force_ratio']
sim-forces.py:95:  dFr_slice = Kr * dFt_slice
```

- **`Kr` = Fr/Ft, valor padrão 0,40. Fonte declarada: nenhuma.**
- **Achado de modelagem, relevante para a Questão 2c:** o código aplica `Kr` como **constante
  local por fatia axial** (`dFr = Kr·dFt`), e a variação ao longo da volta emerge da **integração
  sobre o arco de engajamento**, não de um `Kr` variável. Ou seja, na prática de implementação
  `Fr/Fc` é tratada como **constante do par ferramenta-material**, e o pico/média sai da geometria.

### A8 — Varredura sistemática de `E` do metal duro em código (`gh search code`)

Buscas por valor literal: `600e9 carbide`, `620e9 carbide`, `550e9 carbide`, `580e9 carbide`,
`500e9 carbide`, `carbide elasticity`. Tudo que apareceu em código real de usinagem:

| Repo | Arquivo:linha | Valor de `E` (metal duro) | Grau/%Co/grão | Fonte declarada | Estrelas |
|---|---|---|---|---|---|
| `brturn/feeds-and-speeds` | `beta.html:308` | 75e6 psi = **517 GPa** | não | **nenhuma** | 29 |
| `knipknap/better-tool-library` | `btl/toolmaterial.py:23` | **600 GPa** | não | `material-properties.org` (web genérica) | 43 |
| `bhowiebkr/CNC-ToolHub` | `src/constants/machining.py:25` e `src/formulas.py` | **600 GPa** (`600e9 Pa`) | não (densidade 14 500 kg/m³) | **nenhuma** | 15 |
| `Up25-pathan/edegpredict-engine-rotary` | `include/FEMSolver.cuh`, `include/Config.h`, `include/BoringStrategy.h` | **600 GPa**, densidade 14 500 | não | **nenhuma** | 0 |
| `Anton-dot911/worklog` | `index.html` (`const E = 600e9; // δ = (F·L³)/(3·E·I), E_carbide=600GPa`) | **600 GPa** | não | **nenhuma** | 0 |
| `ahm-tkaan/tmd_hesaplayici` | `core/cutting_tool.py:37-41` | **550 GPa** (densidade 15 000, ν = 0,24) | não | **nenhuma** | 0 |
| `Rahuldeb5/finite-element-analysis` | `main.py` (`mat_E = [200e9, 69e9, 620e9, 1150e9]`, "Tungsten Carbide") | **620 GPa** | não | **nenhuma** | 0 |
| `danxdz/contas` | `cnc-calculator/src/.../FeedsSpeedsOptimizer.jsx:267` | **200 GPa** (valor do aço, aplicado à ferramenta) | não | **nenhuma** | 0 |

**Leitura honesta desta tabela:**
1. **Nenhuma linha declara grau, teor de cobalto, tamanho de grão ou método de medição.**
   Em código aberto, "carbide" é **um material só**. A pergunta 1a, tal como formulada, **não tem
   resposta neste território**.
2. As duas linhas de maior adoção (43 e 29 estrelas) **não concordam entre si** (600 × 517) e são
   a **mesma linhagem** — a divergência é uma troca de referência documentada no commit `88d593f`.
3. O par recorrente **600 GPa + 14 500 kg/m³** aparece em `CNC-ToolHub` e em
   `edegpredict-engine-rotary` com o mesmo comentário de estilo; ambos são projetos com forte
   marca de assistência por LLM. **Trato como possível eco, não como confirmação independente.**
4. Contagem defensável de **fontes independentes** para ~600 GPa dentro do território:
   **duas** — a linhagem `brturn`→`BTL` (que mudou de 517 para 600) e o `machiningdoctor.com`
   (600-650). O resto é de adoção nula e/ou sem fonte. Isso **não** chega a `CONSENSO` (3 fontes).

### A9 — `danxdz/contas` — única matriz Taylor ferramenta × material achada em código

- Adoção: **0 estrelas, 0 forks**; push 2025-08-30. Repositório híbrido (VB.NET antigo + React novo).
- `cnc-calculator/src/components/modules/ToolLifeCalculator.jsx`, linhas 28-39:

```js
28: // Taylor's tool life equation coefficients
29: const taylorCoefficients = {
30:   'hss-steel':        { C: 75,   n: 0.125 },
31:   'hss-aluminum':     { C: 500,  n: 0.25  },
32:   'hss-stainless':    { C: 40,   n: 0.1   },
33:   'carbide-steel':    { C: 200,  n: 0.25  },
34:   'carbide-aluminum': { C: 1000, n: 0.3   },
35:   'carbide-stainless':{ C: 120,  n: 0.2   },
36:   'carbide-titanium': { C: 80,   n: 0.15  },
37:   'ceramic-steel':    { C: 300,  n: 0.3   },
38:   'ceramic-cast-iron':{ C: 400,  n: 0.35  },
39: };
54: const taylor = taylorCoefficients[key] || { C: 100, n: 0.2 };  // fallback
57: const toolLife = Math.pow(taylor.C / vc, 1 / taylor.n);
```

- **Fonte declarada: NENHUMA.** Nenhum comentário de procedência no arquivo.
- **Cobertura:** só há metal duro e HSS *sem revestimento implícito*; **não há linha para metal duro
  revestido, para HSS ao cobalto, nem para CBN.** Cerâmica aparece só para aço e ferro fundido.
- **O que esta matriz sustenta (e o que não sustenta):** ela **prova que a dependência do material
  da peça é implementada na prática** (`n` varia de 0,15 a 0,30 dentro do metal duro, ou seja
  **um fator 2**), e reproduz exatamente os dois valores presumidos pelo Fenix
  (`n = 0,125` HSS/aço e `n = 0,25` metal duro/aço). Mas com 0 estrelas, sem fonte e com marca de
  geração assistida, **não é confirmação** — é mais um eco do mesmo folclore.
- **Bônus (deflexão), mesmo repo, `FeedsSpeedsOptimizer.jsx:267`:**
  `const deflection = (cuttingForce * Math.pow(ap,3)) / (3 * 200000 * Math.PI * Math.pow(d,4)/64);`
  — usa `E = 200 000 MPa` (valor de **aço**) para uma ferramenta, e usa a **profundidade de corte
  `ap` como comprimento de balanço**. Registro como exemplo do nível médio de rigor do território.

### A10 — Razão radial/tangencial nos modelos mecanísticos em código (`Krc/Ktc`)

Estes repositórios implementam o modelo mecanístico clássico `dFt = Ktc·h·db + Kte·dS`,
`dFr = Krc·h·db + Kre·dS`. A razão `Fr/Ft` sai dos coeficientes:

| Repo | Arquivo:linha | `Ktc` (N/mm²) | `Krc` (N/mm²) | `Krc/Ktc` | `Kte`/`Kre` (N/mm) | Condição declarada | Estrelas |
|---|---|---|---|---|---|---|---|
| `leekunhwee/ForceCalculation` | `CommonCutterFull.m:15-20` | 796,1 | 168,8 | **0,212** | 27,7 / 30,8 | fresa D16, 2 dentes, hélice 25°, toroidal R3; dados de ensaio `20170822` | 14 |
| `leekunhwee/ForceCalculation` | `Force.m:12-17` | 958,86 | 250,86 | **0,262** | 15,76 / 19,43 | fresa D25, 2 dentes, hélice 45° | 14 |
| `yigito2cn/milling-force-model-altintas` | `milling_force.py:205-212` | 447,88 | 374,21 | **0,835** | 70,30 / 12,60 | conjunto "calibrated coefficients from original MATLAB code"; tensão de cisalhamento τ = 613 MPa, saída radial 12°, hélice 30° | 0 |
| `zhenzhuzz/Milling-Chatter-Modeling` | `Codes/m050_milling_Time_domain_Sim_01.m:32-33,214` | `Kt = 600e6 Pa` | — | **`Kr = 0,07`** (razão explícita: `Fr = Kt*Kr*hd*a`) | — | simulação de chatter | 9 |
| `Blair-Johnson/cut-force-simulator` | `sim-forces.py:308` | — | — | **`Kr = 0,40`** (default de linha de comando) | — | nenhuma | 0 |
| `bhowiebkr/CNC-ToolHub` | `src/calculators/standard.py:121` | — | — | **1,00 implícito** | — | nenhuma | 15 |
| `brturn` / `BTL` | `beta.html:735-740` / `util.py:30-33` | — | — | **função**, 0,19–0,87 | — | "Equation designed by Bryan Turner" | 29 / 43 |

- **Nenhuma dessas linhas declara fonte para o número.** Os dois conjuntos do `ForceCalculation`
  vêm de **ajuste sobre dados de ensaio próprios** (`Cuttingparameters.m:191-196` calcula
  `Ktc_fit` e `Krc_fit` a partir dos coeficientes de Fourier das forças medidas) — isso é a
  procedência mais forte que achei no território para `Fr/Fc`: **medição própria, não citação**.
- **Achado estrutural, decisivo para a Questão 2:** no modelo mecanístico a razão **não é uma
  constante** — é `(Krc·h + Kre)/(Ktc·h + Kte)`, que **depende da espessura de cavaco `h`**.
  Com os coeficientes do `ForceCalculation/Force.m` e `h = 0,05 mm`:
  `(250,86·0,05 + 19,43)/(958,86·0,05 + 15,76)` = 31,97/63,70 = **0,50**.
  Com `h = 0,15 mm`: 57,06/159,59 = **0,36**. Com `h → ∞`: **0,262**.
  Ou seja, **a mesma ferramenta e o mesmo material dão 0,26 a 0,50** só variando o avanço.
  Isso explica por que a faixa folclórica "0,3 a 0,5" existe — e mostra que ela é o efeito da
  **força de aresta** em espessuras de cavaco de oficina, não uma constante do material.
