# Canônico — Geometria de Corte

> **Nomenclatura (27/08/2026).** Nos textos de produto (`escopo/`, `mvp/`), `ap` é **"profundidade de corte (ap)"** e `ae` é **"penetração de trabalho (ae)"** — nome da indústria primeiro, símbolo entre parênteses. Ver `Docs_inicial/referencia/GLOSSARIO_DE_TERMOS.md`. Este canônico é fonte técnica: fórmulas e tabelas mantêm o símbolo.

**Status:** fonte única de verdade sobre profundidade de corte (ap), penetração de trabalho (ae) e faixa de diâmetro aceita, para fresamento com fresa inteiriça de metal duro em moldes e matrizes.
**Precedência:** este documento vence as três regras concorrentes de `ap` em acabamento do sistema anterior (`0,20×D`, `0,50 mm fixo`, `0,30×D`), a faixa de diâmetro `0,1–200 mm`, e os multiplicadores fixos de `ae`/`ap` por operação registrados no dossiê auditado.
**Origem:** rodada de pesquisa R1, retorno de 17/08/2026.
**Regra:** No Invention — nenhum número entra sem fonte citada.

---

## 1. Regras e fórmulas

### 1.1 Profundidade axial (`ap`) em acabamento — não existe constante nem proporção universal

As três regras do sistema anterior (`0,20×D`, `0,30×D`, `0,50 mm fixo`) são todas descartadas como regra única. A evidência de catálogo mostra que `ap` em acabamento depende de **tipo de ferramenta** e de **estratégia de acabamento**, não só de `D`:

- **Fresa esférica/toroidal, acabamento 3D:** `ap` não é o parâmetro de controle de qualidade — quem controla a rugosidade é `ae` (engajamento radial) via altura de crista (regra 1.2). `ap` fica ligado a força de corte, TIR/runout e sobremetal deixado pelo semi-acabamento, e cresce pouco com `D` (faixa observada: ~0,05–0,3 mm entre Ø6 e Ø16). Fonte: Sandvik Coromant, "What is profile milling" (REFERÊNCIA ÚNICA); Guhring série 3101, condições ball nose (REFERÊNCIA ÚNICA).
- **Fresa reta, acabamento de parede/perfil, estratégia convencional:** `ap ≈ 0,05×D` (constante na razão, testado Ø6–Ø16). Fonte: Mitsubishi Materials, VQMHVRBF, shoulder milling (REFERÊNCIA ÚNICA).
- **Fresa reta, acabamento de perfil, estratégia HSM/contorno (ae baixo):** `ap = 1×D` a `2×D`, combinado com `ae = 0,01×D` a `0,1×D` — o oposto da intuição de "acabamento usa ap pequeno". Fonte: Guhring série 3019 (REFERÊNCIA ÚNICA).

**Veredito:** SEM CONSENSO sobre um valor ou regra única — mas CONSENSO (3 fabricantes independentes: Sandvik, Guhring, Mitsubishi) de que **nenhuma das três regras do sistema anterior está correta**, e de que a resposta certa depende de tipo de ferramenta e estratégia declarada, não de `D` sozinho. Isso responde P1 na forma que a evidência permite: não com um número, mas com a condição que decide o número.

**Fórmula auxiliar — diâmetro efetivo em corte raso (fresa esférica):**
```
De = 2·√(D·ap − ap²)      válido para 0 < ap ≤ D/2
```
Em corte raso, a `Vc` real cai porque só uma calota da ferramenta corta — a rotação deve ser calculada a partir de `De` (diâmetro efetivo de corte), não do diâmetro nominal. Exemplo: `ap = 0,2×D` → `De = 0,8×D`; `ap = 0,05×D` → `De ≈ 0,436×D`. Fonte: Sandvik Coromant, "What is profile milling" — CONSENSO conceitual (derivação geométrica), REFERÊNCIA ÚNICA para a citação do fabricante. *(Grafia alinhada a `De` em 27/08 — auditoria A16; não confundir com `Deq` da deflexão.)*

### 1.2 Engajamento radial (`ae`) em acabamento 3D — governado pela altura de crista, não por percentual fixo de `D`

```
h = R − √(R² − (ae/2)²)  ≈  ae² / (8R)        para h ≪ D
ae = 2·√(2Rh − h²) = 2·√(Dh − h²)  ≈  2·√(Dh)  para h ≪ D
```
onde `h` = altura de crista alvo (scallop height), `R = D/2`.

`ae/D ≈ 2·√(h/D)` — não é um percentual constante; cresce com `√h`, não linearmente. Para superfície inclinada com fresa toroidal, `R` deve ser substituído pelo raio efetivo `Reff` (varia entre o raio de ponta e o raio externo conforme inclinação e direção de avanço).

**Confiança:** CONSENSO — derivação geométrica confirmada por 3 fontes acadêmicas revisadas por pares e independentes: Segonds et al. 2017 (*Journal of Intelligent Manufacturing*, DOI 10.1007/s10845-017-1360-0), Hendriko 2017 (*Key Engineering Materials*, DOI 10.4028/www.scientific.net/KEM.728.48), Xu/Zhang/Sun 2018 (*Int. J. Advanced Manufacturing Technology*, DOI 10.1007/s00170-017-0322-1).

**Sensibilidade:** `∂ln(h)/∂ln(ae) ≈ 2` — um erro de 10% em `ae` produz ~21% de erro na altura de crista resultante. Classificação: **MODELAR** (altura de crista alvo justifica campo explícito na tela; não é candidato a `DEFAULT` nem `IGNORAR`, pois está acima da margem de ±15–25% do modelo).

### 1.3 Piso de diâmetro — dinâmico por perfil de máquina, não um número fixo único

```
D_min,proc = 1000 · Vc_min / (π · n_max)
```
onde `n_max` = rotação máxima do spindle da máquina do operador, `Vc_min` = velocidade de corte mínima recomendada para a ferramenta/material. Abaixo de `D_min,proc`, a `Vc` real cai proporcionalmente ao déficit de rotação — não é possível "forçar" o valor recomendado.

**Exemplo numérico (spindle 12.000 rpm, Vc alvo 200 m/min):** `D_min,proc ≈ 5,3 mm`. Nesse mesmo spindle, uma fresa de Ø0,2 mm roda a `Vc` real de 7,54 m/min — 3,8% do valor alvo.

**Confiança:** CONSENSO conceitual (física de corte direta) + prática convergente de 2 calculadoras de referência (HSMAdvisor, G-Wizard) que usam perfil de máquina com `Max RPM` como limite, em vez de piso fixo universal.

**Distinção que importa:** o piso de **catálogo** (menor diâmetro comercialmente disponível, ~Ø0,2 mm — Kennametal KenCut MEMM, OSG linha 8590) é diferente do piso **de processo** (o que a máquina do operador consegue cortar sem `Vc` cair a pique). O dado de campo do Mestre (Ø0,5 mm) é um piso de processo plausível para spindle de oficina convencional, não um limite físico universal — ver Lacuna 4.4.

### 1.4 Comportamento em extrapolação de tabela

A calculadora nunca deve repetir silenciosamente o último valor tabelado acima do maior diâmetro coberto. Deve marcar o resultado como extrapolado, mostrar a linha-base usada e a fórmula/fator aplicado, ou recusar o cálculo quando ultrapassar o envelope de validade.

**Confiança:** REFERÊNCIA MÚLTIPLA — comportamento documentado publicamente em 3 produtos independentes (FSWizard: expõe "Effective Dia" e Max RPM; HSMAdvisor: separa chip thinning de compensação de Vc/RPM e desaconselha aplicar em acabamento de parede; G-Wizard: perfil de máquina com Max RPM, potência e rigidez). Nenhuma das três teve o comportamento interno de extrapolação confirmado por código-fonte — a fonte é documentação pública, não o software auditado.

---

## 2. Constantes e tabelas

### 2.1 Multiplicadores `ae`/`ap` por operação

| Operação | `ae` | `ap` | Fonte | Confiança |
|---|---|---|---|---|
| Desbaste convencional | 40–50% D | 0,5–1,0×D | Guhring 3019 (roughing: ae 0,4–0,9D / ap 0,5–1D) | REFERÊNCIA ÚNICA |
| Desbaste HSC/HDC (alta eficiência) | 5–15% D | 1–2×D | Guhring 3019 + Walter MD133/HDC | REFERÊNCIA MÚLTIPLA (2 fabricantes convergentes) |
| Semi-acabamento | ~30% D | ~0,5×D | plausível como default de oficina; não encontrada fonte independente que fixe o par | SEM CONSENSO |
| Acabamento de parede/perfil, fresa reta, estratégia convencional | — | ≈0,05×D (testado Ø6–Ø16) | Mitsubishi VQMHVRBF | REFERÊNCIA ÚNICA |
| Acabamento de parede/perfil, fresa reta, estratégia HSM/contorno | 1–10% D | 1–2×D | Guhring 3019 (finishing) | REFERÊNCIA ÚNICA |
| Acabamento 3D, fresa esférica/toroidal | via fórmula 1.2 (altura de crista) | ~0,05–0,3 mm, cresce com D sem regra fixa | Guhring 3101, Sandvik | CONSENSO (fórmula de `ae`) / REFERÊNCIA ÚNICA (faixa numérica de `ap`) |

**Nota sobre coerência de escola:** o par atual do sistema anterior (`ae = 45% D` desbaste + `ap = 0,8–1,0×D`) descreve fresamento convencional de alto engajamento, dentro da faixa Guhring — não é HEM/HDC e não deve ser chamado assim. HEM/HDC exige o par oposto (`ae` baixo, `ap` alto) e recálculo de `fz`/`Vc` por chip thinning, que este canônico não resolve (ver R4).

### 2.2 Faixa de diâmetro de fresa inteiriça de metal duro comercialmente disponível

| Extremo | Valor | Fonte | Confiança |
|---|---|---|---|
| Menor comercial | Ø0,2 mm | Kennametal KenCut MEMM; OSG linha 8590 | CONSENSO (2 fabricantes independentes) |
| Menor comercial (2º patamar) | Ø0,3 mm | Walter, Technical Compendium 2024 | REFERÊNCIA ÚNICA |
| Maior — famílias específicas de alta performance | ~Ø20–25 mm | Walter (MD133 dynamic: 6–20 mm; ConeFit: 10–25 mm) | REFERÊNCIA ÚNICA |
| Maior — catálogo filtrado, não verificado por SKU | até Ø50,8 mm | Kennametal (filtro de catálogo online) | SEM CONSENSO no teto exato |
| Acima da fresa inteiriça | cabeçote com pastilha intercambiável, até Ø315 mm | Walter | CONSENSO conceitual (mudança de tipo de ferramenta, não de calculadora) |

---

## 3. O que foi decidido pelo Mestre

- **D5 — piso prático Ø0,5 mm** (registrado no HANDOFF, dado de campo): confirmado como plausível para oficina convencional de moldes, mas a pesquisa mostra que **não é limite físico universal** — é um piso de processo específico do spindle do operador (regra 1.3), enquanto o piso comercial real é Ø0,2 mm. Nenhuma decisão nova tomada aqui; fica registrado como pergunta aberta na seção 4.

---

## 4. Lacunas declaradas

1. **Não existe fonte que sustente uma constante ou proporção única de `ap` em acabamento** válida para toda combinação ferramenta × operação. A tabela 2.1 é o melhor disponível hoje, mas cada linha é `REFERÊNCIA ÚNICA`, não consenso de mercado. Fechar isso exigiria levantar a mesma condição de corte (acabamento, mesma família de material) em 3+ fabricantes independentes — não foi feito nesta rodada.
2. **A regra interna citada no dossiê** ("microfresas <1 mm: `ap = 0,5×D`, `ae ≤ 0,3×D`") **não tem sustentação em nenhuma fonte primária ou acadêmica encontrada.** Nem confirmada, nem refutada como regra geral — tratar como default de processo assumido, nunca como limite físico ou recomendação de fabricante (`SEM CONSENSO`).
3. **Teto exato de diâmetro onde a fresa inteiriça deixa de ser oferecida** não fechou: Walter documenta famílias específicas até 20–25 mm, Kennametal cita até 50,8 mm em filtro de catálogo não verificado por SKU individual. Fechar exigiria consultar SKU por SKU ou contato direto com fabricante.
4. **Comportamento interno exato de extrapolação** nas calculadoras de referência (G-Wizard, HSMAdvisor, FSWizard) não foi confirmado por código-fonte, só por documentação pública — suficiente para orientar a regra 1.4, insuficiente para citar como "é assim que essas ferramentas fazem por dentro".
5. **Se o produto precisa de um seletor de estratégia de acabamento** (convencional vs. HSM/contorno para fresa reta) é uma decisão de escopo, não uma lacuna de pesquisa — a evidência (1.1) mostra que as duas estratégias produzem `ap` recomendados que diferem em 20–40×, então o sistema não pode escolher um número sem saber qual estratégia o operador está seguindo. **Pergunta ao Mestre, não decisão minha.**

---

## 5. Consequências

- As três regras do sistema anterior para `ap` em acabamento (`0,20×D`, `0,30×D`, `0,50 mm fixo`) saem todas de uso. Em Ø10 mm elas davam 2,0 / 3,0 / 0,5 mm — nenhuma bate com a faixa de catálogo para acabamento convencional de parede (~0,2–0,5 mm nesse diâmetro, via Mitsubishi) nem com a estratégia HSM/contorno (10–20 mm nesse diâmetro, via Guhring). **O sistema precisa saber a estratégia antes de recomendar `ap`** — isso é a Lacuna 4.5, e é decisão de produto, não de pesquisa.
- A faixa de diâmetro aceita deve deixar de ser `0,1–200 mm` (universal, sem base) e passar a refletir fresa inteiriça (`Ø0,2–~25 mm`, com aviso de extrapolação nas bordas) com transição declarada para cabeçote/pastilha acima disso. Isso muda o produto de "calculadora universal de diâmetro" para "calculadora de fresa inteiriça com fronteira explícita".
- O piso de diâmetro por máquina (regra 1.3) exige um campo de perfil de máquina (rotação máxima do spindle) que o sistema não tem hoje — isso entra em `E2` (entradas e configuração), não neste canônico.
- Onde `ae` em acabamento 3D é calculado, o sistema precisa de um campo de altura de crista alvo (ou equivalente — rugosidade `Ra` alvo convertida) em vez de percentual fixo de `D` — consequência direta da regra 1.2.
