# Glossário de termos — a nomenclatura do produto

**Regra de escrita, decidida em 27/08/2026.** Em todo texto do projeto — escopo, MVP e a interface —
o **nome usado na indústria vem primeiro**, em linguagem simples, e o **símbolo técnico vem ao lado,
entre parênteses, só como informação**:

> `Velocidade de corte (vc)` — nunca só `vc` no meio da frase.

**Onde aplicar:**

| Local | Regra |
|---|---|
| Prosa dos documentos e da tela | Nome por extenso + `(símbolo)` na **primeira menção de cada seção**; depois disso, o nome por extenso sozinho, ou o símbolo quando o texto ficaria repetitivo |
| Fórmulas | **Só o símbolo**, com a legenda de variáveis ao lado (nome por extenso + unidade) |
| Tabelas densas | Símbolo, quando o nome por extenso quebra a leitura da tabela; a coluna de cabeçalho ou a legenda traz o nome |
| `canonicos/` | Toque leve: nome por extenso na primeira menção em prosa; fórmulas e tabelas mantêm o símbolo — são a ponte para o código |

---

## A tabela

| Símbolo | Nome na indústria (primário) | Observação |
|---|---|---|
| **vc** | Velocidade de corte (vc) | m/min |
| **fz** | Avanço por dente (fz) | mm/dente |
| **fn** | Avanço por rotação (fn) | mm/volta — famílias que trabalham por rotação |
| **vf** | Velocidade de avanço da mesa (vf) | mm/min — também chamado "avanço da mesa" |
| **n** | Rotação (n) | rpm |
| **ap** | Profundidade de corte (ap) | mm — profundidade axial; onde o texto antigo dizia "incremento por passe", passa a dizer "profundidade de corte (ap)" |
| **ae** | Penetração de trabalho (ae) | mm — largura radial do corte; onde o texto antigo dizia "engajamento radial" ou "largura de corte", passa a dizer "penetração de trabalho (ae)" |
| **D** | Diâmetro da ferramenta (D) | mm |
| **De** | Diâmetro efetivo (De) | mm — diâmetro real **no plano de corte** da fresa toroidal ou esférica (a calota que corta em corte raso). Entra na rotação. Não confundir com `Deq` |
| **Deq** | Diâmetro equivalente (Deq) | mm — diâmetro da **parte canalizada** da fresa (núcleo resistente, reduzido pelos canais). `Deq = 0,80 × D` por padrão. Entra só no cálculo de deflexão (`CANONICO_DEFLEXAO_E_VIDA.md` §2.3) |
| **Dmin / Dmax** | Diâmetro menor / maior (Dmin / Dmax) | mm — extremos da faixa de diâmetro de uma ferramenta cônica (fresa de chanfrar); o cálculo usa a média `(Dmin + Dmax)/2` |
| **D_inicial / D_final** | Diâmetro inicial / final (D_inicial / D_final) | mm — diâmetro antes e depois da passada de mandrilamento; definem a profundidade de corte `ap = (D_final − D_inicial)/2` e a coroa circular de remoção de material |
| **Z** | Número de arestas (Z) | também "número de dentes" / "número de facas"; em furação e mandrilamento aparece como `z` (`z = 2` em broca helicoidal, `z = 1` em mandrilamento por passos) |
| **L** | Balanço (L) | mm — o quanto a ferramenta se projeta do porta-ferramenta; o texto antigo dizia "altura de fixação" |
| **Lc** | Comprimento de aresta (Lc) | mm — trecho canalizado da ferramenta |
| **L/D** | Relação balanço/diâmetro (L/D) | adimensional |
| **MRR** | Taxa de remoção de material (MRR) | cm³/min — também aparece como `Q` |
| **kc** | Força específica de corte (kc) | N/mm² — `kc1.1` é o valor de referência para espessura de cavaco de 1 mm |
| **mc** | Expoente de Kienzle (mc) | adimensional |
| **h** | Espessura de cavaco não deformada (h) | mm — espessura cortada por cada aresta; na furação vale `h = (fn/z)·sin(σ/2)`; em fresamento assume as formas máxima (`hex`) e média (`hm`) |
| **hex** | Espessura de cavaco máxima (hex) | mm |
| **hm** | Espessura de cavaco média (hm) | mm — é a espessura que entra no cálculo de força |
| **hmin** | Espessura mínima de cavaco (hmin) | mm — abaixo dela a aresta esfrega em vez de cortar |
| **rε** | Raio de ponta (rε) | mm — raio da quina da pastilha ou da fresa toroidal |
| **rβ** | Raio de aresta (rβ) | µm — arredondamento do gume; também "raio de gume" |
| **σ** | Ângulo de ponta (σ) | graus — ângulo da ponta da broca helicoidal; metade dele é o ângulo de posição `κ = σ / 2` |
| **κ** | Ângulo de posição (κ) | graus — em furação vale a metade do ângulo de ponta (`κ = σ / 2`) |
| **Ff** | Força de avanço (Ff) | N — força axial na direção do avanço (furação) |
| **Pc** | Potência de corte (Pc) | kW — potência **na aresta**, sem perdas |
| **Pm** | Potência no motor (Pm) | kW — `Pm = Pc / η`; é contra ela que se compara a potência nominal do fuso |
| **Mc** | Torque (Mc) | N·m — também "momento de corte"; sai de `Pc`, nunca de `Pm` |
| **P** | Passo da rosca (P) | mm |
| **η** | Rendimento do acionamento (η) | adimensional (0 a 1) |
| **Rm** | Resistência à tração (Rm) | N/mm² — usado para encaixar o material numa faixa de `kc` |
| **Ra** | Rugosidade (Ra) | µm |
| **CTF** | Fator de afinamento de cavaco (CTF) | adimensional — corrige o avanço em corte de baixa penetração |
| **HB / HRC** | Dureza (HB / HRC) | Brinell / Rockwell C |

---

## O que não muda

- **As fórmulas continuam em símbolo.** `n = vc × 1000 / (π × D)` é como o mundo inteiro escreve, e
  como o código vai ser lido. O que muda é que a legenda ao lado traz o nome por extenso.
- **Os canônicos continuam densos.** São a fonte técnica; o toque é leve (ver tabela acima).
- **Nenhum número muda.** Isto é regra de redação, não de conteúdo.
