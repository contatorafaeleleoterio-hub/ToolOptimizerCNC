# Especificação Funcional e Contratual (spec.md)

**Fase 2 — Single Source of Truth (SoT) do Comportamento**

Este documento define o comportamento esperado do Fenix de forma objetiva, testável e rastreável.
Serve como contrato para o desenvolvimento (Spec-Driven Development).

> **Este documento não é fonte de número.** Todo valor esperado nos critérios abaixo é **derivado**
> dos canônicos (`Docs_inicial/canonicos/`) e do `MVP_CALCULADORA_PARAMETROS.md`, e cada critério cita
> de onde vem. Onde um número aqui divergir da fonte citada, a fonte vence e o critério está errado.
> **Revisão de 08/09/2026:** três valores do AC-001 (`hm`, `Pc`, `Mc`) foram recalculados pela cadeia
> do `CANONICO_MOTOR_DE_CALCULO §1.4` e corrigidos — o registro está na §4.

## 1. Regras Fundamentais do Sistema

* **R1 (Human-in-the-Loop):** O sistema recomenda parâmetros baseados em leis físicas. O operador decide o que programar na máquina. Nenhuma entrada arbitrária deve bloquear a entrega do resultado calculado. O erro é explicitado através do alerta visual, nunca pelo silêncio.
* **R2 (Nomenclatura):** Famílias de Usinagem: Fresar, Furar, Roscar, Mandrilar. Níveis de Segurança: CRÍTICO, ATENÇÃO, NORMAL. As camadas do `MVP §9.1` mapeiam assim: `IMPOSSÍVEL` → CRÍTICO, `ALERTA` → ATENÇÃO.
* **R3 (Formatação):** Separador de milhar é ponto (`.`), decimal é vírgula (`,`).
* **R4 (Precedência):** CRÍTICO > ATENÇÃO > NORMAL.
* **R5 (Símbolos do motor):** O núcleo de cálculo usa os símbolos dos canônicos — `n` (rotação), `vf` (avanço da mesa), `hm`, `hex`, `Pc`, `Mc`. Os rótulos **S** e **F** deste documento são nomes de tela; a tradução mora na camada de exibição, nunca no motor (`CANONICO_MOTOR_DE_CALCULO §1.7`: rótulo ambíguo vira erro de fator).

## 2. Histórias de Usuário e Critérios de Aceite

### US-001: Cálculo Base de Fresamento
**Como** operador de CNC, **quero** calcular os parâmetros de fresamento informando a ferramenta e o material, **para que** eu obtenha a rotação e avanço adequados com segurança.

* **AC-001: Cálculo Nominal de Fresa Toroidal em Aço 1045**
  Fonte da cadeia: `CANONICO_MOTOR_DE_CALCULO §1.4`. Fonte do par `(kc1.1, mc)`: §2.1 do mesmo canônico.
  ```gherkin
  Given que o operador está no painel da família "Fresar"
  And selecionou o material "Aço 1045" (kc1.1 = 1500, mc = 0,21, vc de partida = 140)
  And selecionou a ferramenta "Fresa toroidal" (Metal Duro)
  And informou: D=10, Z=4, r=1,0, L=45, ap=2,0, ae=2,5, fz=0,06
  When o operador aciona "Calcular"
  Then o sistema deve exibir: S = 4.456 rpm, F = 1.070 mm/min
  And deve calcular: L/D = 4,5, hm = 0,029 mm, hex = 0,052 mm, CTF = 1,155
  And deve calcular: kc = 3.163 N/mm2, Pc = 0,28 kW, Mc = 0,60 N.m, MRR = 5,35 cm3/min
  And deve acionar o nível de alerta "ATENÇÃO" com a mensagem do gatilho 5 sobre o balanço L/D
  ```
  **Invariantes que acompanham este AC** (`CANONICO_MOTOR_DE_CALCULO §1.6`): `hm ≤ fz` sempre,
  inclusive em rasgo cheio; o arco engajado **não** trava em π/2; o `CTF` é exibido e **nunca**
  aplicado sobre o `fz` programado (§1.2, trava de não-contagem-dupla).

### US-002: Cálculo de Furação com Prática de Oficina (Aço Rápido)
**Como** operador de CNC, **quero** utilizar o método do Mestre para furar com aço rápido, **para que** eu obtenha avanços e passos realistas baseados na experiência da fábrica.

* **AC-002: Furação HSS Modo do Mestre**
  Fonte: `ESCOPO_BROCA_ACO_RAPIDO §2` — caso verificador normativo. A velocidade de partida da
  combinação (16 m/min) vem de `CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO §2.1`, não da partida de
  fresa do material.
  ```gherkin
  Given que o operador está na família "Furar"
  And selecionou "Aço 1045" e "Broca helicoidal HSS-Co"
  And informou: D=10, L=50, vc=16
  When aciona "Calcular"
  Then o sistema deve exibir: S = 508 rpm, F = 50 mm/min, Q (Pica-pau) = 0,40 mm
  And o avanço por rotação deve ser fn = 0,10 mm/rot em qualquer diâmetro
  And o nível de segurança deve ser "NORMAL"
  ```
  **A aritmética do modo trunca, não arredonda:** `318 × 16 = 5.088 ÷ 10 = 508,8 → 508`;
  `10% de 508 = 50,8 → 50`; `10 ÷ 25 = 0,4`. O `318` é `1000/π` na forma de oficina (erro de 0,1%),
  e o caso verificador depende do literal. **Divergência conhecida:** o protótipo
  (`Docs_inicial/construcao/prototipo/js/app.js`) arredonda a partir de `1000/π` e devolve 509 · 51
  nesta entrada — o canônico vence, e a divergência está registrada na §4.

### US-003: Validação de Segurança Passiva (Sem Bloqueio)
**Como** operador de CNC, **quero** ser avisado quando informar parâmetros fisicamente impossíveis, **para que** eu saiba o nível do erro sem ter o uso bloqueado.

* **AC-003: Penetração maior que o diâmetro**
  Fonte: `MVP §9.2` gatilho 3 (camada `IMPOSSÍVEL`) e `E0 §3.3`.
  ```gherkin
  Given que a ferramenta possui Diâmetro = 10 mm
  And o operador digita ae = 12 mm
  When o cálculo é disparado
  Then o sistema NÃO deve bloquear o campo
  And deve calcular as grandezas teóricas, com o arco engajado saturado em π (rasgo cheio)
  And o nível de segurança deve ser "CRÍTICO"
  And um alerta descrevendo "remoção fora da aresta física" deve abrir automaticamente
  And o gatilho 2 (rasgo cheio) NÃO deve disparar junto — acima de D a condição já é outra
  ```

### US-004: Ajuste Fino de Parâmetros
**Como** operador de CNC, **quero** ajustar os resultados calculados com passos táteis, **para que** eu possa sintonizar a máquina sem digitar valores quebrados.

* **AC-004: Ajuste de Rotação em −5%**
  Fonte: `GABARITO_PROTOTIPO D7` (passo de 5%, emenda do Mestre de 07/09/2026) e `MVP §8.1`
  (o que a edição da rotação deduz e o que ela recalcula).
  ```gherkin
  Given que o cálculo entregou S = 4.456 rpm, F = 1.070 mm/min, Pc = 0,28 kW, Mc = 0,60 N.m
  When o operador toca no botão "−" de S
  Then S deve cair 5% para 4.233 rpm
  And a velocidade de corte real deve passar a ser consequência da rotação: vc = 133 m/min
  And F, MRR e Pc devem cair 5% junto
  And o avanço por dente (fz) NÃO deve se mover — quem o move é a edição do avanço (§8.1)
  And Mc deve permanecer em 0,60 N.m — com fz fixo, o torque não depende da rotação
  And o sistema deve habilitar o comando de voltar tudo ao recomendado
  ```
  **A inversão percorre a mesma cadeia do sentido direto** (`MVP §8.1`, requisito absoluto): a
  rotação editada entra como entrada, não como correção aplicada sobre o resultado.

### US-005: Gestão de Material
**Como** operador de CNC, **quero** criar e editar configurações de materiais, **para que** eu possa usar as propriedades fornecidas pelo meu fabricante de pastilhas.

* **AC-005: Cadastro Local Persistido**
  ```gherkin
  Given que o operador cria um novo material "Aço Ferramenta X" (ISO=P, HB=260, kc1.1=1850, mc=0,24, vc=110)
  When confirma a gravação
  Then o material deve ser salvo no armazenamento persistente local
  And deve estar disponível no painel de cálculo imediatamente
  And nenhuma requisição de rede deve ocorrer
  ```

### US-006: Margem de Segurança Global
**Como** gestor ou operador sênior, **quero** aplicar um fator global de segurança, **para que** eu possa rodar a fábrica em um regime mais conservador sem alterar propriedades dos materiais.

* **AC-006: Aplicação de Margem na Exibição**
  Fonte: `MVP §4.9`, regras 1, 2, 5, 6, 8 e 9.
  ```gherkin
  Given que a Margem de Segurança está configurada diferente de 100% (ex: 85%)
  When os dados são exibidos
  Then a interface deve escalar rotação, avanço, velocidade de corte real, MRR, Pc e Mc (regra 1)
  And NÃO deve escalar hm, hex, CTF, L/D nem kc — são as grandezas que disparam alerta (regra 2)
  And os alertas e o nível de segurança devem descrever o esforço não atenuado (regra 5)
  And a lente deve ser o último passo, sem realimentar a cadeia de cálculo (regra 9)
  And valor acima de 100% deve ser aceito — a lente não é limitador (regra 6)
  And o aviso da margem ativa deve aparecer somente quando ela difere de 100% (regra 8)
  ```

## 3. Gestão de Incerteza

### Assumptions
* **ASM-001 (Passo de Ajuste):** O passo dos `±` é de **5%** (`GABARITO_PROTOTIPO D7`, emenda do Mestre de 07/09/2026, que revogou os 10% anteriores).
* **ASM-002 (Limitação Local):** Assumido que no MVP a busca/paginação local em memória atende adequadamente.
* **ASM-003 (Referência do gatilho 4 em furação):** A janela de velocidade de corte compara contra a partida **daquela combinação material × ferramenta**, não contra `vcReference` do material, que vale para fresa de metal duro (`MVP §11.2`). Sem essa referência informada, o gatilho não roda — comparar 16 m/min de broca de aço rápido contra 140 m/min de fresa é falso positivo garantido.
* **ASM-004 (Piso numérico de Kienzle):** `kc` é avaliado em `max(h ; 0,001 mm)`. É trava contra divergência numérica em `h → 0`, não limiar físico: o alerta de espessura foi revogado em 08/09/2026 e o piso não gera aviso nenhum.

### Open Questions
* **OQ-001 (Exportação):** Em qual momento do uso do produto o backup JSON será feito? Fica pro backlog (Não bloqueia o core atual).

## 4. Registro de correções desta especificação

| Data | Item | Era | Passou a ser | Motivo |
|---|---|---|---|---|
| 08/09/2026 | AC-001 `hm` | 0,018 mm | **0,029 mm** | `hm = fz · sinκ · 2ε / φmax` com `ε` = 0,25 dá 0,0286. O 0,018 é o número de exemplo **tipográfico** do `GABARITO_PROTOTIPO D8`, que ilustra separador decimal — não saiu de cálculo |
| 08/09/2026 | AC-001 `Pc` | 0,42 kW | **0,28 kW** | `Pc = Q · kc / 60000` com `kc = 1500 · 0,0286^(−0,21)` = 3.163 N/mm2 |
| 08/09/2026 | AC-001 `Mc` | 0,9 N.m | **0,60 N.m** | `Mc = Pc · 9549 / n`, consequência do `Pc` corrigido |
| 08/09/2026 | AC-004 | "fz, Pc e Mc devem ser recalculados" | **`vf`, MRR e `Pc` acompanham; `fz` não se move; `Mc` é invariante** | `MVP §8.1`: editar a rotação deduz `vc` e recalcula o avanço — quem deduz `fz` é a edição do avanço. Com `fz` fixo, `Mc` não depende de `n` |
| 08/09/2026 | AC-002 | sem procedência | caso verificador do `ESCOPO_BROCA_ACO_RAPIDO §2`, com a aritmética de truncamento explicitada | O número existia sem a regra que o produz, e o arredondamento comum devolve 509 · 51 |
