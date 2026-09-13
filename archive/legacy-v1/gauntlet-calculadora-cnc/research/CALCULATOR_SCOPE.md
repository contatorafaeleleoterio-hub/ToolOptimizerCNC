# Escopo dos cálculos

> Contrato do Builder. Nada fora desta lista entra no mockup.
> Prioridade: **ESSENCIAL** = no ciclo 1 · **IMPORTANTE** = até o ciclo 3 · **OPCIONAL** = se sobrar · **FORA** = não fazer.

## Convenções

| Símbolo | Significado | Unidade |
|---|---|---|
| `Vc` | velocidade de corte | m/min |
| `n` | rotação | rpm |
| `D` | diâmetro da ferramenta (ou do furo) | mm |
| `z` | nº de arestas / insertos | — |
| `fz` | avanço por dente | mm/dente |
| `f` | avanço por rotação | mm/rot |
| `Vf` | avanço da mesa | mm/min |
| `ap` | profundidade axial | mm |
| `ae` | engajamento radial | mm |
| `κ` | ângulo de posição | graus |
| `P` | passo da rosca | mm |
| `kc1.1`, `mc` | constantes de Kienzle | N/mm², — |
| `η` | eficiência do fuso | 0–1 |

**Regra global de Vc:** `Vc = Vc_base(material da peça, operação) × fator(material da ferramenta)`.
Fatores: HSS 0,29 · HSS-Co 0,37 · Metal duro 1,00 · MD c/ pastilha 1,25.

**Regra global de Kienzle:** `kc = kc1.1 · hm^(−mc)`, e `Pc = MRR · kc / (60000 · η)`.
Isso corrige o produto atual, que usa `kc = kc1.1` fixo.

---

## Compartilhados (todas as famílias)

| Cálculo | Entradas | Saída | Unid. | Depende de | Pri. | Motivo |
|---|---|---|---|---|---|---|
| Rotação · `n = Vc·1000/(π·D)` | Vc, D | n | rpm | — | **ESSENCIAL** | É a saída nº 1 de qualquer calculadora de usinagem |
| Potência · `Pc = MRR·kc/(60000·η)` | MRR, kc1.1, mc, hm, η | Pc | kW | MRR, hm | **ESSENCIAL** | Máquina trava ou alarma se estourar |
| Torque · `M = Pc·9549/n` | Pc, n | M | Nm | Pc, n | **ESSENCIAL** | Desbaste lento estola por torque, não por potência |
| Limites de máquina | n, Pc, Vf vs limites | avisos | — | todos | **ESSENCIAL** | Gate 5 depende disso |
| Relação L/D | balanço, D | nível + aviso | — | — | **ESSENCIAL** | Verde ≤3 · amarelo ≤4 · vermelho ≤6 · bloqueado >6 |
| Tempo de corte · `t = L/Vf` | L, Vf | t | min | Vf | IMPORTANTE | Fecha o ciclo "vale a pena?" |

---

## 1. Fresar

### 1.1 Fresa inteiriça (metal duro ou HSS) — topo · toroidal · esférica

| Cálculo | Entradas | Saída | Unid. | Pri. | Motivo |
|---|---|---|---|---|---|
| Avanço da mesa · `Vf = fz_ef·z·n` | fz_ef, z, n | Vf | mm/min | **ESSENCIAL** | Núcleo |
| MRR · `ap·ae·Vf/1000` | ap, ae, Vf | MRR | cm³/min | **ESSENCIAL** | Base da potência |
| Afinamento radial (CTF) · `fz_ef = fz/√(ae/D)` quando `ae < D/2` | fz, ae, D | fz_ef | mm/dente | **ESSENCIAL** | Diferencial técnico já existente no produto |
| Espessura média · `hm = fz_ef·√(ae/D)` | fz_ef, ae, D | hm | mm | **ESSENCIAL** | Entrada do Kienzle |
| **Ø efetivo esférica** · `Def = 2·√(ap·(D−ap))` p/ `ap < D/2` | D, ap | Def → Vc e n reais | mm | **ESSENCIAL** | Corrige erro real do produto: hoje a esférica calcula com Ø nominal, o que superestima Vc |
| **Ø efetivo toroidal** · `Def = D − 2r + 2·√(ap·(2r−ap))` p/ `ap < r` | D, ap, r | Def | mm | **ESSENCIAL** | Mesmo motivo |
| Altura de crista · `h = ae²/(8·R)` | ae, R | h | µm | IMPORTANTE | Fecha acabamento sem CAM |
| Rasgo fechado (slot): `ae = D`, sem CTF, alerta de evacuação | D | alerta | — | IMPORTANTE | Cenário de quebra frequente |
| Afinamento axial em ponta esférica | fz, ap, R | fz_ef | mm/dente | OPCIONAL | Refinamento sobre o Ø efetivo |
| Trocoidal / HEM | — | — | — | **FORA** | É estratégia de percurso, não ferramenta |

### 1.2 Cabeçote / faceador com pastilhas de metal duro

| Cálculo | Entradas | Saída | Unid. | Pri. | Motivo |
|---|---|---|---|---|---|
| **Correção por ângulo de posição** · `hm = fz·sin κ` | fz, κ | hm | mm | **ESSENCIAL** | É o cálculo que define esta ferramenta. κ=45° → hm=0,71·fz; κ=90° → hm=fz (Sandvik) |
| **fz corrigido para hm alvo** · `fz = hm_alvo/sin κ` | hm alvo, κ | fz | mm/dente | **ESSENCIAL** | Ao baixar κ é preciso **aumentar** fz — contraintuitivo, e é o valor prático |
| `Vf = fz·z·n` com z = **nº de insertos** | fz, z, n | Vf | mm/min | **ESSENCIAL** | Mesma fórmula, outra semântica de z |
| MRR de faceamento · `ap·ae·Vf/1000` | ap, ae, Vf | MRR | cm³/min | **ESSENCIAL** | — |
| Alerta `ae > 0,8·D` (posicionar fora de centro) | ae, D | alerta | — | IMPORTANTE | Entrada centrada gera choque no inserto |
| ap máx por geometria do inserto | inserto | ap máx | mm | OPCIONAL | Exigiria catálogo — evitar |

---

## 2. Furar

### 2.1 Broca inteiriça (metal duro · HSS · HSS-Co) e 2.2 alargador

| Cálculo | Entradas | Saída | Unid. | Pri. | Motivo |
|---|---|---|---|---|---|
| Rotação pelo Ø da broca | Vc, D | n | rpm | **ESSENCIAL** | — |
| **Avanço por rotação** · `Vf = f·n` | f, n | Vf | mm/min | **ESSENCIAL** | Muda a semântica: furação não usa fz por dente |
| Comprimento da ponta · `Lp = (D/2)·tan(90 − θ/2)` | D, θ | Lp | mm | **ESSENCIAL** | Sem isso o tempo de furo erra |
| Tempo de furo · `t = (L + Lp)/Vf` | L, Lp, Vf | t | min | **ESSENCIAL** | — |
| Potência de furação · `Pc = kc·f·D·Vc/(240000·η)` | f, D, Vc, kc, η | Pc | kW | IMPORTANTE | Furo grande estoura fuso pequeno |
| L/D da broca (alerta de pica-pau acima de 3×D) | L, D | alerta | — | **ESSENCIAL** | — |
| Pica-pau: incremento e nº de ciclos | D, L total | ciclos, incremento | — | IMPORTANTE | — |
| **Alargador:** Vc ≈ 1/3 da broca, `f` ≈ 2–3× | D, material | Vc, f | — | IMPORTANTE | Regra invertida — é o valor do item |

### 2.3 Broca com insertos (U-drill)

| Cálculo | Entradas | Saída | Unid. | Pri. | Motivo |
|---|---|---|---|---|---|
| Rotação e `Vf = f·n` | Vc, D, f | n, Vf | rpm, mm/min | **ESSENCIAL** | — |
| **Avanço mínimo** · alerta se `f < 0,05·√D` | f, D | alerta | — | **ESSENCIAL** | Avanço tímido faz o inserto central **esfregar** em vez de cortar → falha prematura (CNCCookbook, AccurateCut) |
| Faixa de Ø válida (12–60 mm) | D | alerta | — | IMPORTANTE | Abaixo disso não existe U-drill |
| Alerta de rigidez / runout | L/D | alerta | — | IMPORTANTE | U-drill é sensível a batimento |

---

## 3. Roscar — macho (HSS ou metal duro; corte ou formador)

| Cálculo | Entradas | Saída | Unid. | Pri. | Motivo |
|---|---|---|---|---|---|
| **Furo de macho, corte** · `Ø = D − P` | D, P | Ø broca | mm | **ESSENCIAL** | A consulta mais frequente da oficina |
| **Furo de macho, formador** · `Ø ≈ D − P/2` | D, P | Ø broca | mm | **ESSENCIAL** | Furo **maior** que no de corte. Erro clássico e caro |
| **Avanço sincronizado** · `Vf = n·P` | n, P | Vf | mm/min | **ESSENCIAL** | Não é avanço livre: é travado no passo |
| Rotação por Vc do macho | Vc, D | n | rpm | **ESSENCIAL** | Vc de macho é baixo mesmo em MD |
| % de engajamento · `Ø = D − (%/100)·P·1,0825` | D, P, % | Ø broca | mm | IMPORTANTE | 65–75 % é o alvo prático; 100 % quebra macho |
| Tabela M / MF (passo por bitola) | designação | P, Ø | mm | **ESSENCIAL** | M3–M20 no mockup |
| Tabela UNC / UNF | designação | P, Ø | pol/mm | OPCIONAL | Mesma mecânica, mais dados |
| Torque de rosqueamento | D, P, material | M | Nm | OPCIONAL | — |
| Medição por 3 arames | D, P, W | medida | mm | **FORA** | É metrologia, não parâmetro de corte |

---

## 4. Mandrilar — barra / cabeçote ajustável

| Cálculo | Entradas | Saída | Unid. | Pri. | Motivo |
|---|---|---|---|---|---|
| Rotação pelo **Ø real do furo** | Vc, D furo | n | rpm | **ESSENCIAL** | O Ø é ajustável — não vem da ferramenta |
| `Vf = f·n` | f, n | Vf | mm/min | **ESSENCIAL** | — |
| **L/D da barra — crítico** · verde ≤3 · amarelo ≤4 · vermelho ≤5 · bloqueado >5 | L, D barra | nível | — | **ESSENCIAL** | Mandrilar é o caso onde a vibração mais mata. Limite **mais rígido** que o da fresa |
| ap por lado · `ap = (Ø final − Ø inicial)/2` | Ø ini, Ø fim | ap | mm | **ESSENCIAL** | Erro de fator 2 é comum aqui |
| Ra teórico · `Ra = f²/(8·rε)·1000` | f, rε | Ra | µm | IMPORTANTE | Mandrilar é operação de acabamento |
| Nº de passes por sobremetal | Ø ini, Ø fim, ap máx | nº | — | IMPORTANTE | — |
| Barra antivibratória / contrapeso | — | alerta | — | OPCIONAL | Sugestão textual quando L/D > 4 |

---

## 5. Cálculo rápido (agnóstico de ferramenta)

| Cálculo | Entradas | Saída | Unid. | Pri. | Motivo |
|---|---|---|---|---|---|
| Sugerir `Vc` e `fz`/`f` | material, D, operação, (material da ferramenta) | Vc, fz | m/min, mm | **ESSENCIAL** | É o modo do usuário inexperiente — e o teste T12 |
| `n` e `Vf` a partir do sugerido | Vc, D, fz, z | n, Vf | rpm, mm/min | **ESSENCIAL** | Resultado em 3 campos |
| Origem do valor exibida | — | texto | — | **ESSENCIAL** | "o sistema recomenda, o operador decide" — regra 6 do projeto |
| Faixa (mín–máx) além do ponto | vcRanges | faixa | — | IMPORTANTE | Mostra que é faixa, não verdade única |

---

## Dados embarcados no mockup

- **9 materiais de peça** — copiados de `src/data/materials.ts` (id, nome, ISO, dureza, `kc1.1`, `mc`, `vcRanges`, `status`). `vcRanges` são **base metal duro**.
- **4 materiais de ferramenta** com os fatores da seção de convenções.
- **Tabela de roscas M3–M20** — passo grosso, e passo fino onde aplicável.
- **Limites de máquina padrão** — 12000 rpm · 15 kW · 80 Nm · 5000 mm/min · η 0,85.

## Fora do escopo — declarado

Torneamento e tornos (decisão do Mestre) · custo / orçamento / PDF · catálogo de pastilhas de fabricante · simulação 3D · G-code · vida de ferramenta (Taylor) · fresa de disco · fresa de rosca · broca de centro e escareador.
