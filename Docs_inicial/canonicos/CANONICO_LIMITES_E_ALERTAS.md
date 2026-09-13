# Canônico — Limites, Alertas e Bloqueios

> **Nomenclatura (27/08/2026).** Nos textos de produto: `hex/hm/hmin` = "espessura de cavaco máxima / média / mínima", `ae` = "penetração de trabalho (ae)", `ap` = "profundidade de corte (ap)", `L/D` = "relação balanço/diâmetro (L/D)", `rβ` = "raio de aresta (rβ)", `vc` = "velocidade de corte (vc)", `CTF` = "fator de afinamento de cavaco (CTF)". Ver `Docs_inicial/referencia/GLOSSARIO_DE_TERMOS.md`. Este canônico é fonte técnica: fórmulas e tabelas mantêm o símbolo.

**Status:** fonte única de verdade sobre quando o sistema avisa, quando bloqueia e o que diz ao operador.
**Precedência:** este documento vence qualquer regra de alerta registrada antes dele — **nos limiares e nas fórmulas**. Onde uma regra anterior conflitar com o que está aqui, vale este documento.

> ⚠️ **Decisão de produto de 27/08/2026 — o efeito "bloqueia" saiu, o limiar ficou.** Nenhuma condição
> deste documento recusa entregar um resultado: **nada trava, nada bloqueia, nada exige liberação.**
> É uma calculadora, e a função dela é entregar o número — por mais absurdo que seja — dizendo o que
> há de errado e de quanto. Onde este documento diz **LIMITE FÍSICO** ou **bloqueia**, leia
> **"condição impossível: entrega e avisa em nível crítico"**. A regra completa está em
> `../escopo/E0_PRINCIPIO_DA_CALCULADORA_AGNOSTICA.md` §3.3 e em
> `../escopo/E4_INDICADORES_E_SEGURANCA.md` §1. **Os limiares, as fórmulas e a procedência deste
> documento continuam valendo integralmente** — muda o efeito na tela, não o número.
>
> **Nota de 30/08/2026:** decisões posteriores do Mestre revogaram parte do que este bloco declarava
> vigente — o piso de espessura, a comparação de produtividade contra a potência de máquina e o aviso
> de rotação acima da máquina saíram. Ver a sub-tabela "Revogações posteriores — decisão do Mestre,
> 30/08/2026" no fim da seção "O que esta rodada derrubou".

**Origem:** rodada de pesquisa R5, retorno de 18/08/2026, auditado em 18/08/2026 — veredito `APROVADO COM RESSALVAS`, 2 itens bloqueados e mantidos fora deste canônico.
**Regra:** No Invention — nenhum número entra sem fonte citada. Os dois números que a auditoria marcou como sem procedência **não estão neste documento**; estão na §4 como lacuna.

---

## O que esta rodada derrubou

Quatro regras de alerta vinham sendo aplicadas sem base. As quatro caíram, e cada queda tem evidência de fabricante aberta e conferida na auditoria, não argumento.

| Regra que caía | Por que caiu | Confiança |
|---|---|---|
| `ae/D < 10%` ⇒ aviso crítico | 5–20% é **estratégia recomendada**, não anomalia. Sandvik e Iscar prescrevem trabalhar nessa faixa. O risco real não é o engajamento radial: é a espessura de cavaco cair abaixo do raio de aresta. | `CONSENSO` |
| Janela global `Vc` fora de 50–1000 m/min | Não existe faixa universal. A amplitude legítima cobre cerca de 600× entre extremos, e uma janela fixa recorta arbitrariamente. Caso publicado de 3000 m/min em alumínio fundido, com mais de 10.000 peças. | `CONSENSO` |
| Bloqueio duro por `L/D` acima de 6 | Os limiares proíbem produto que existe em catálogo: adaptador amortecido trabalha em 7–8×D, barra amortecida em 10×D, barra reforçada em 14×D, broca de canal interno até 30×D sem pica-pau. | `REFERÊNCIA ÚNICA` (ver L-19) |
| Referências fixas de taxa de remoção (50 / 20 / 5 cm³/min) | Não existem em fonte nenhuma, após varredura de nove fabricantes. Duas operações igualmente legítimas de desbaste variam por **fator 38×**, então nenhum valor único as concilia. | `NÃO ENCONTRADO` |

> **Revogações posteriores — decisão do Mestre, 30/08/2026** (não são desta rodada de pesquisa):
>
> | Regra revogada | Motivo | Onde |
> |---|---|---|
> | Piso de espessura de cavaco / esfregamento (`hex < k × rβ`) | Piso de 2,2–3,6 µm praticamente inativo; razão importada de micro-fresamento; nenhum fabricante publica piso em milímetros | §1.1 |
> | Produtividade contra a potência disponível, teto de aproveitamento, rótulo de potência de máquina | Potência de máquina é dado de ambiente, não de cálculo — saiu do produto | §1.5 → `FUNCOES_FUTURAS.md` §2 |
> | Aviso de "rotação exigida acima da máquina" | Revogado por dependência do perfil de máquina, não por decisão sobre o alerta em si — sem a rotação máxima declarada, é incalculável | §1.3 → `FUNCOES_FUTURAS.md` §2 |

---

## 1. Regras e fórmulas

As regras usam três camadas, e a camada importa tanto quanto o limiar:

| Camada | Significado | Efeito |
|---|---|---|
| **LIMITE FÍSICO** | geometria ou capacidade da máquina — não é opinião | bloqueia |
| **ALERTA** | condição de processo que degrada resultado | avisa, descrevendo a condição e situando o valor |
| **SANIDADE** | provável erro de digitação | avisa, e deve ser rotulado como validação de entrada, nunca como risco de processo |

> **Regra revista em 27/08/2026 (bloco de decisão).** A regra anterior — *"toda mensagem de alerta carrega um alvo numérico, o valor para o qual o operador deve ir"* — **cai**. O alerta **descreve o risco e situa o valor**: a grandeza medida, a referência (limiar, faixa, limite declarado) e de quanto a distância. **Não instrui o operador sobre o que fazer** — o número factual fica porque situa, o verbo de comando ("suba", "reduza", "divida em passes") sai. Onde este documento diz "a mensagem, com alvo" ou lista "as saídas com número", leia como descrição da condição, não como instrução. Ver `escopo/E4_INDICADORES_E_SEGURANCA.md` §1.

### 1.1 Espessura de cavaco

**Fórmula do fator de afinamento radial**, para `ae/D < 0,5`:

```
hex = fz × 2 × √( ae/D − (ae/D)² )
```

Fonte: forma padrão do afinamento radial; a Sandvik publica o mesmo resultado como fator de modificação (exemplo resolvido: `Dc` 20 mm, `ae` 2 mm, `ae/Dc` = 10%, `hex` = 0,10 mm ⇒ `fz` = 0,17 mm/dente, fator 0,6). Confiança: `CONSENSO` — dois fabricantes publicam exemplo resolvido que a reproduz.

> ✅ **RESOLVIDO — R2 fechou (27/08/2026, ver `CANONICO_MOTOR_DE_CALCULO.md` §5 e §1.1).** A fórmula acima (`hex = fz × 2 × √(ae/D − (ae/D)²)`) é a **exata** — é o inverso do fator de afinamento (`CTF`) do motor de cálculo, confirmado pelos dois territórios da rodada. A segunda fórmula em circulação (`fz × √(ae/D)`) **sai**: ela aproxima a espessura **média** e vinha sendo usada como se fosse para a máxima, entregando ~79% de avanço a mais em `ae/D` = 0,20.

> 🚫 **REVOGADO — decisão do Mestre, 30/08/2026.** O **Piso de espessura** — alerta (`ALERTA`) que
> disparava quando `hex < hmin`, com `hmin = k × rβ` (piso resultante 2,2–3,6 µm) — **sai do
> produto**. Motivo declarado: piso praticamente inativo na escala de uso; a razão `hmin/rβ` foi
> importada de micro-fresamento e aplicada a fresa convencional; e nenhum fabricante publica piso em
> milímetros — o mercado previne o esfregamento entregando `fz` já corrigido por `ae/D`. A constante
> `k` e a razão saíram da §2.1; as lacunas L-16, L-17 e L-18 perderam objeto.
>
> **Não sai:** a fórmula de afinamento radial acima (`hex = fz × 2 × √(ae/D − (ae/D)²)`), que segue
> no cálculo da espessura. O achado da R7 (`rβ` ≈ 10 µm) continua correto — apenas não sustenta mais
> nenhum gatilho.

### 1.2 Rasgo cheio

Dispara quando `ae ≥ 0,95 × D`. Camada: **ALERTA**.
Motivo: corte concordante e discordante simultâneos, sem saída para o calor e com risco de recorte de cavaco.
Mensagem (descreve, não instrui — ver §1): o `ae` contra o `D`, e o efeito físico da condição. O gatilho `0,95` é definição operacional de projeto, não dado — ver L-20. As três respostas que os catálogos citam (reduzir profundidade, refrigeração dirigida, fresa menor + trocoidal) ficam como registro; a mensagem não as prescreve (Q29, 27/08/2026).
Fonte: Sandvik Coromant — *Groove or slot milling* e *Slicing and trochoidal milling*. Confiança: `REFERÊNCIA ÚNICA`.

**`ae ≤ D` permanece condição de geometria** — mas **não bloqueia**: acima de `D` o resultado sai com alerta em nível crítico, dizendo que a fresa corta no máximo a própria largura (decisão de 27/08, ver o cabeçalho).

### 1.3 Velocidade de corte — comparação relativa, nunca janela global

**A regra é comparar contra a faixa tabelada do par material × substrato**, que o sistema já possui. O padrão da indústria é **prescrever a faixa**, não vigiar uma janela: os fabricantes entregam faixa recomendada por par material×ferramenta e não expõem alerta de velocidade.

> 🚫 **REVOGADO — 30/08/2026.** ~~**Rotação exigida acima da máquina** · ambiente declarado — avisa e entrega, nunca trava.~~ Revogado **por dependência do perfil de máquina, não por decisão sobre o alerta em si**: o aviso exige que o operador declare a rotação máxima da máquina, e rotação máxima faz parte do perfil de máquina revogado pelo Mestre. Sem o dado de entrada, o aviso é incalculável. Ver `Docs_inicial/construcao/FUNCOES_FUTURAS.md` §2.

**Velocidade fora da faixa de partida** · Camada: **ALERTA**.
Dispara em `Vc < 0,6 × Vc_partida(material, substrato)` ou `Vc > 1,4 × Vc_partida(material, substrato)`. *(A pesquisa não localizou uma faixa `Vc_min`–`Vc_max` com fonte para a maioria dos materiais — o que existe é um valor de partida por material, MVP §11.2. Os fatores 0,6 e 1,4 são a tolerância em torno dele; auditoria, achado A8.)*
Abaixo: o cavaco adere ao gume (aresta postiça) — acabamento ruim e desgaste irregular. Acima: o desgaste é térmico e a vida cai rápido.
Fonte do mecanismo: Sandvik Coromant — *Milling different materials* (inox 150–250 m/min **explicitamente para evitar aresta postiça**; calor limita a velocidade em titânio e HRSA; rebarba limita em ferro fundido). Confiança: `REFERÊNCIA ÚNICA`.
**Os fatores 0,6 e 1,4 não têm fonte publicada** — são decisão de projeto declarada, ver §3.

> **Roscamento com macho — teto absoluto (R8, emenda A5, M6):** No roscamento com macho, o limiar de alerta **não é afastamento relativo**, mas sim um **teto absoluto** (~40 m/min para macho de corte e ~60 m/min para macho de conformação; `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §1.8). Acima do teto, o sistema **entrega o número e avisa no nível máximo/crítico** (`IMPOSSÍVEL`/crítico), nomeando o teto e a distância até ele (nunca recusa o resultado; §3.4 da R8). Para **fresa de rosca**, continua valendo a régua de afastamento relativo do fresamento (`0,6` e `1,4 × Vc_partida`).

**Sanidade** · Camada: **SANIDADE**. Dispara em `Vc < 0,1 × Vc_partida` ou `Vc > 10 × Vc_partida`. É validação de entrada e deve ser rotulada como tal, para não se confundir com risco de processo.

### 1.4 Balanço, deflexão e vibração

**Deflexão contra tolerância** · Camada: **ALERTA**; acima de 2× a tolerância informada sobe para **nível crítico** — ~~vira LIMITE FÍSICO~~ **não bloqueia** (decisão de 27/08: tolerância é dado declarado pelo operador, e dado declarado nunca bloqueia).

**Modelo: viga escalonada, não viga simples de diâmetro único.** A fresa em balanço tem dois trechos de rigidez diferente — haste lisa e parte canalizada. Derivação, teste de sanidade e o tamanho do erro de cada simplificação estão em `CANONICO_DEFLEXAO_E_VIDA.md` §1.1; este documento aplica a fórmula.

```
δ = (F / 3E) · [ (L³ − L2³)/I1  +  L2³/I2 ]        [mm]

I1 = π·D⁴/64      (haste — diâmetro nominal D, já informado)
I2 = π·Deq⁴/64    (parte canalizada — Deq = 0,80×D, default declarado, CANONICO_DEFLEXAO_E_VIDA.md §2.3. `Deq` ≠ `De` de corte — ver glossário)
```

Entradas: força radial (já calculada), balanço `L` (já informado), diâmetro `D` (já informado), comprimento de aresta `Lc` — campo opcional da §4.1 do MVP, é o `L2` da fórmula —, módulo de elasticidade (constante interna, 580 GPa, `CANONICO_DEFLEXAO_E_VIDA.md` §2.1), tolerância da peça.

**Se `Lc` não for informado:** não há como isolar o trecho canalizado, e o cálculo cai para viga simples de diâmetro único `D` — que **subestima** a deflexão real em até 59% (`CANONICO_DEFLEXAO_E_VIDA.md` §1.1, tabela). O resultado sai marcado como **estimativa conservadora — o valor exato exige o campo `Lc`**, nunca como número final silencioso. Nenhum valor de `Lc` é assumido por classe de ferramenta: não há fonte para esse default, e o projeto não inventa número sem fonte.

Mensagem: a deflexão estimada contra a tolerância informada, e de quanto a distância. Descreve a condição; não instrui sobre o que reduzir (§1).

**Relações que governam o comportamento em ordem de grandeza** — trend do modelo de diâmetro único, útil para intuição, não para o número entregue (que usa a fórmula acima):

```
deflexão   ∝ (L/D)³ × 1/D
estabilidade ∝ 1/( D × (L/D)² )
```

Os expoentes são diferentes, e **nenhuma é função da outra**. É por isso que deflexão e balanço são indicadores separados: um não substitui o outro.

Consequências numéricas: passar `L/D` de 3 para 4 aumenta a deflexão em **137%**; de 3 para 5, **363%**; de 3 para 6, **700%**. Uma fresa de 3 mm flete **6,7×** mais que uma de 20 mm no mesmo balanço relativo. Metal duro permite balanço **1,44×** maior que aço para a mesma deflexão.

**Limiares de `L/D` por família e tipo de haste** · Camada: **ALERTA**.

| Família | Tipo de haste ou adaptador | Alerta acima de | Fonte |
|---|---|---|---|
| Fresar | Fresa ou haste comum | **4 × D** | vibração começa a limitar a partir de 4×D |
| Fresar | Adaptador amortecido | **8 × D** | faixa otimizada publicada de 7–8×D |
| Mandrilar | Barra de mandrilar comum | **4 × D** | barra de aço ou metal duro até 4×D |
| Mandrilar | Barra amortecida de aço | **10 × D** | publicado até 10×D |
| Mandrilar | Barra amortecida com reforço de metal duro | **14 × D** | publicado até 14×D |

Fonte dos cinco: Sandvik Coromant, páginas de ferramenta antivibratória e de balanço longo. Confiança: `REFERÊNCIA ÚNICA` — **um fabricante só, e é o fabricante que vende a linha antivibratória**. Ver L-19.

**Aplicabilidade por família — quem for implementar lê isto, não deduz:**
- **Fresar:** alerta de balanço **ativo**, limiares da tabela acima.
- **Mandrilar:** alerta de balanço **ativo**, limiares da tabela acima.
- **Furar:** **sem alerta de balanço.** Vale a regra própria de furo profundo (logo abaixo): broca sem canal interno acima de `3 × D`, broca com canal interno até `30 × D`. Um `L/D` alto de broca **não** dispara alerta de balanço.
- **Roscar:** **sem alerta de balanço** — nem ativo, nem como lacuna. Não há limiar de `L/D` para macho de corte, macho de conformação ou fresa de rosca.

Existe **um** limiar de confirmação explícita com procedência: **6 × D** para fresamento com haste comum, que casa com o balanço máximo publicado de uma fresa de encaixe (`UL` = 6×`DC`). Os demais limiares de confirmação estão na §4 como lacuna — não têm fonte nem derivação.

**Regras de alerta da família Furar (R8, emendas A4, A7, M5, M15, M16):**
- ~~**Alerta de espessura desligado em furação:** o regime `h < 0,1 mm` é normal em furação; o alerta de espessura média abaixo do limite do modelo **não dispara** (dispararia em ~100% dos furos; `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §1.2).~~ **PERDEU OBJETO — 08/09/2026:** o alerta de espessura foi revogado por decisão do Mestre em **todas as famílias** (ver §5, item 1), então não há mais o que desligar em furação. O achado da R8 continua correto — `h < 0,1 mm` é o regime normal da furação — e segue valendo como limite de validade do modelo de força, não como alerta.
- **Furo profundo / pica-pau condicionado à refrigeração** · Camada: **ALERTA**.
  - Broca **sem** canal interno, acima de **3 × D**: a mensagem traz a profundidade contra o limiar de `3 × D`; nessa faixa o cavaco entope. Não instrui (§1).
  - Broca **com** canal interno: **não avisar até 30 × D**. Acima disso é furação profunda dedicada, um regime com furo-guia e pressão de refrigerante próprios — a mensagem descreve o regime, não prescreve.
  Fonte: três fabricantes independentes publicam os dois limiares. Confiança: `CONSENSO`.
- **Avanço fora da faixa de partida (R8, emenda A7, M16)** · Camada: **ALERTA**.
  Dispara quando `fn < 0,5 × fn_partida` ou `fn > 2 × fn_partida` (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §1.6). Abaixo de 0,5× há risco de atrito e desgaste de guia; acima de 2× há sobrecarga axial e risco de quebra.
- **Redução na saída de furo passante (R8, emenda A7, M15)** · Camada: **ALERTA**.
  Alerta para reduzir o avanço em 40–50% cerca de 1 mm antes do rompimento da peça em furo passante, prevenindo o lascamento das arestas na saída (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §1.7).

**Regras de alerta da família Roscar (R8, emendas A5, A6, M6, M9):**
- **Velocidade de corte acima do teto absoluto:** ver §1.3 (teto absoluto de ~40 m/min para corte e ~60 m/min para conformação; nível máximo com número entregue).
- **Macho de conformação em material inadequado (R8, emenda A6, M9)** · Camada: **IMPOSSÍVEL / nível mais grave** (com o número entregue, nunca recusa o resultado — §3.4 da R8).
  Dispara ao selecionar macho de conformação em materiais sem dutilidade para conformação: **ferro fundido, aço acima de 350 HB, aço temperado, inox endurecível por precipitação ou Ti-6Al-4V** (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §2.2 e §3.4). A mensagem nomeia o mecanismo físico (o material não escoa plasticamente e quebra a ferramenta).

### 1.5 Produtividade — ~~contra a potência disponível, não contra número fixo~~

A referência fixa de taxa de remoção **sai do produto**. Não é recalibrada: não existe valor único que a conserte.

> 🚫 **REVOGADO — decisão do Mestre, 30/08/2026.** A potência de máquina saiu do produto. Com ela
> saem: o indicador de produtividade medido contra a potência disponível, a fórmula `Q_max`
> (`= Pm × η × 60000 / kc`), o teto de aproveitamento de potência, e o rótulo de potência **de
> máquina** na interface. Perfil de máquina e dependências foram movidos para
> `Docs_inicial/construcao/FUNCOES_FUTURAS.md` §2.
>
> **Não sai:** a potência de corte na aresta (`Pc`), a taxa de remoção (`Q` / `MRR`) e o torque
> (`Mc`) são **resultado calculado** e continuam — a cadeia canônica está em
> `CANONICO_MOTOR_DE_CALCULO.md` §1.6, não neste documento, para não duplicar fórmula. A distinção
> de rótulo `Pc` (na aresta) × `Pm` (no motor), cujo erro é de fator `1/η`, fica em
> `CANONICO_MOTOR_DE_CALCULO.md` §1.7.

---

## 2. Constantes e tabelas

Cada linha tem fonte e confiança próprias. Não existe confiança por tabela.

### 2.1 Razão espessura mínima / raio de aresta

> 🚫 **REVOGADO — decisão do Mestre, 30/08/2026.** Esta tabela existia só para calcular o piso de
> espessura da §1.1, revogado. A razão `hmin/rβ` (centro da massa em 0,2–0,4, de literatura de
> micro-fresamento; faixas publicadas descendo até 0,14–0,15) e a constante `k` saem do produto com
> ele. O dado da auditoria não foi invalidado — perdeu função. Seção mantida vazia para não
> renumerar a §2.2 e a §2.3.

### 2.2 Rendimento e desgaste no cálculo de potência

> 🚫 **REVOGADO — decisão do Mestre, 30/08/2026.** Esta seção servia à comparação de produtividade
> contra a potência de máquina (§1.5), revogada. Saem:
>
> - **Fator de desgaste da ferramenta** `1,1–1,3` — só sustentava o teto de aproveitamento de 0,77 e
>   nunca teve fonte verificável (atrás de CAPTCHA; `CANONICO_MOTOR_DE_CALCULO.md` Lacuna 4.8).
> - **Rendimento de máquina** `0,6–0,9`, default `0,85` — era parâmetro do perfil de máquina.
>   Movido para `Docs_inicial/construcao/FUNCOES_FUTURAS.md` §2. Segue vivo como **entrada de
>   modelo** (`η`) em `CANONICO_MOTOR_DE_CALCULO.md` §2.2, que é onde ele mora.
> - **Teto de aproveitamento de potência** (`0,77`, ou o alvo de "70–85% da nominal") — `NÃO
>   ENCONTRADO`, sem fonte aceitável, e sem efeito num produto que não pede a potência da máquina.
>
> Seção mantida vazia para não renumerar a §2.3.

### 2.3 O que **não** entrou nesta tabela

Dois números do retorno foram bloqueados pela auditoria e **não constam deste canônico**:

- Um valor de velocidade mínima atribuído a titânio e ligas resistentes ao calor, apresentado sem fonte e sem página. A conclusão que ele apoiava sobrevive por outras três vias já verificadas, então nada se perde ao retirá-lo.
- Os limiares de confirmação explícita de balanço, exceto o de fresamento comum. São o limiar de alerta somado de 2, em quatro de cinco linhas, sem fonte, sem derivação e sem declaração de que são escolha de projeto — ao contrário dos fatores 0,6 e 1,4, que foram declarados corretamente.

---

## 3. O que foi decidido pelo Mestre

*(Decisões de produto que não vêm de fonte externa. As três primeiras estão declaradas; as três últimas são perguntas abertas que a pesquisa não pode responder.)*

**Declaradas:**

1. **Tolerância de ±40% em torno da faixa tabelada** (fatores 0,6 e 1,4) para disparar o alerta de velocidade. Não tem fonte publicada. É a tolerância que envelopa a margem declarada do próprio modelo (±15–25%) sem disparar dentro dela. Registrada como escolha de projeto, com data desta rodada.
2. **Gatilho de rasgo cheio em `ae ≥ 0,95 × D`.** Definição operacional, não dado.
3. ~~**Rendimento padrão de 0,85** no perfil de máquina, editável, não perguntado ao operador.~~ **REVOGADO — 30/08/2026:** perfil de máquina saiu do produto; ver `Docs_inicial/construcao/FUNCOES_FUTURAS.md` §2. `η` permanece como entrada de modelo em `CANONICO_MOTOR_DE_CALCULO.md` §2.2.

**Pendentes de decisão — a pesquisa fez o que podia e para aqui:**

4. **Bloqueio duro por balanço: manter ou trocar por confirmação explícita?** Existe registro anterior no projeto de que o bloqueio por balanço **continua** e que a comunicação em micrômetros de deflexão o substitui na comunicação, não na proteção. A evidência desta rodada mostra que os limiares atuais proíbem produto que existe em catálogo. As duas posições são defensáveis: a evidência é de pesquisa, a decisão é de produto. **Não decidida aqui.**
5. ~~**A fórmula de afinamento de cavaco**~~ **RESOLVIDO — R2 fechou (27/08/2026).** A favor da fórmula **exata** já em uso na §1.1 (`hex = fz × 2 × √(ae/D − (ae/D)²)`), que é o inverso do fator de afinamento do motor de cálculo — dois fabricantes publicam exemplo resolvido que a reproduz. A fórmula simplificada `fz × √(ae/D)` sai (aproximava a espessura média, não a máxima). Ver §1.1 e `CANONICO_MOTOR_DE_CALCULO.md` §5.
6. **Fresa de aço rápido está no escopo do produto?** Há registro de que a fresa de HSS é obsoleta e sobrevive em broca e macho — e o escopo desta rodada é fresa inteiriça de metal duro. Mas o sistema anterior modela HSS com fatores de velocidade próprios, e o catálogo de fresas de topo HSS-Co de um fabricante corrente tem seis grupos, cinco deles abaixo de 50 m/min (dado conferido grupo a grupo na auditoria). Se o HSS está no escopo, o piso de velocidade precisa acomodá-lo; se não está, os fatores de HSS saem do produto. **As duas coisas não podem valer ao mesmo tempo.**

---

## 4. Lacunas declaradas

As 15 lacunas da rodada entram como estão. A auditoria acrescentou seis, listadas aqui com o identificador que ela atribuiu.

| # | Lacuna | O que fecharia |
|---|---|---|
| **L-16** | 🚫 ~~FECHADA pela R7~~ **REVOGADA — 30/08/2026:** perdeu objeto com a revogação do piso de espessura (§1.1). O achado da R7 continua correto — `rβ` de fresa inteiriça ≈ **10 µm** (consenso 3/3, `pesquisa/VALIDACAO_R7.md`), contra 25–127 µm de outra classe de ferramenta —, só não calibra mais nenhum gatilho. | — |
| **L-17** | 🚫 **REVOGADA — 30/08/2026:** a extrapolação de micro-fresamento para fresa convencional deixou de importar com a revogação do piso de espessura (§1.1). A pesquisa não foi invalidada — a lacuna perdeu objeto. | — |
| **L-18** | 🚫 ~~FECHADA pela R7~~ **REVOGADA — 30/08/2026:** perdeu objeto com a revogação do piso (§1.1). O achado — o gatilho não dispararia dentro da escala de uso do MVP — continua correto, e foi parte do motivo da revogação. | — |
| **L-19** | **Todos os limiares de balanço vêm de um único fabricante**, e são páginas de produto da própria linha antivibratória — há interesse comercial em publicar balanço alto. | Confirmação em dois outros fabricantes. Contraste: os limiares de furação têm três fabricantes independentes e são genuinamente `CONSENSO`. |
| **L-20** | O gatilho de rasgo cheio não tem fonte. | Nada a pesquisar — é decisão de produto, já registrada como tal na §3. |
| **L-21** | 🚫 **REVOGADA — 30/08/2026:** o fator de desgaste `1,1–1,3` e o teto de aproveitamento de 0,77 saíram com a revogação da comparação de produtividade contra a potência de máquina (§1.5, §2.2). Perfil de máquina e dependências → `Docs_inicial/construcao/FUNCOES_FUTURAS.md` §2. | — |

**Não fecháveis por pesquisa** — são decisão de produto e estão na §3: o bloqueio por balanço e o escopo do aço rápido. *(O "rótulo de potência mostrado na interface" saiu desta lista — revogado em 30/08/2026 com a potência de máquina; ver §1.5.)*

---

## 5. Consequências

**Para o operador:**

1. **Some o alerta que mais dispara sem motivo.** Trabalhar em 5–20% de engajamento radial é a estratégia recomendada pelos fabricantes; hoje ela acende aviso crítico. No lugar, a espessura de cavaco (`hex`) passa a ser resultado visível — quem opera vê o afinamento acontecer — e ~~o alerta que resta nessa faixa é o de espessura média abaixo do limite do modelo de cálculo, não o de engajamento~~ **nessa faixa não resta alerta nenhum.** *(O piso de esfregamento que antes ocupava este lugar foi revogado em 30/08/2026 — ver §1.1.)* ~~**Recorte por família (R8, emenda A4, M5):** esse alerta é exclusivo de **fresamento**. Em **furação ele NÃO dispara**, pois o regime `h < 0,1 mm` é a condição operacional normal de furação e o alerta dispararia em praticamente 100% dos furos (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §1.2).~~
   > **REVOGADO — decisão do Mestre, 08/09/2026.** O **alerta de espessura média abaixo do limite do modelo** (`hm < 0,1 mm`; `MVP §9.2` gatilho 1a) **sai do produto em todas as famílias**, não só em furação. Com ele perde objeto o recorte por família da emenda A4 — não há mais alerta a desligar em furação. **O que fica:** o cálculo de `hm` e `hex`, a espessura como resultado visível, e o limite de validade `hm = 0,1 mm` descrito no `CANONICO_MOTOR_DE_CALCULO` §1.5 como propriedade do modelo de força. O que sai é o aviso na tela.
2. **Some o piso e o teto globais de velocidade.** A comparação passa a ser contra a faixa do material que ele está usando, com o substrato que ele tem na mão.
3. **O balanço deixa de proibir ferramenta que existe.** Quem tem adaptador amortecido pode usá-lo até onde o fabricante publica.
4. ~~**O indicador de produtividade passa a medir a máquina dele**~~ **REVOGADO — 30/08/2026:** não há mais indicador de produtividade — a potência de máquina saiu do produto (§1.5). **Some a referência fixa de taxa de remoção**, e o motivo de ela sair permanece: o mesmo rótulo "desbaste" cobre duas ordens de grandeza — 413 cm³/min num faceamento publicado e 10,8 cm³/min num trocoidal com fresa pequena, os dois legítimos. Um número fixo daria 826% para um e 22% para o outro: mediria diâmetro de ferramenta, não produtividade.

**Para quem for implementar:**

5. **A camada do alerta é parte da regra.** Confundir validação de entrada com risco de processo treina o operador a ignorar aviso.
6. **Todo alerta carrega os números que situam a condição** — a grandeza medida, a referência (limiar, faixa ou limite declarado) e a distância entre as duas. **Não carrega instrução de ajuste** ("reduza", "suba", "divida em passes"): o alerta descreve o risco e situa o valor; quem decide o que fazer é o operador (regra de 27/08, §1).
7. ~~**O piso de espessura pode ser implementado**~~ **REVOGADO — 30/08/2026:** o piso de esfregamento saiu do produto (§1.1). A fórmula de afinamento radial que a R2 fechou permanece no cálculo da espessura; o que morre é o alerta.
8. ~~**O rótulo de potência precisa ser declarado na interface.**~~ **MOVIDO — 30/08/2026:** o rótulo de potência **de máquina** foi revogado com o perfil de máquina. A distinção que continua importando — `Pc` (na aresta) × `Pm` (no motor), erro de fator `1/η` — vale só para o resultado `Pc`, e a regra vive em `CANONICO_MOTOR_DE_CALCULO.md` §1.7 e MVP §6.9.
