# Canônico — Velocidades e Avanços

> **Nomenclatura (27/08/2026).** Nos textos de produto: `vc` = "velocidade de corte (vc)", `fz` = "avanço por dente (fz)", `fn` = "avanço por rotação (fn)", `vf` = "velocidade de avanço da mesa (vf)". Ver `Docs_inicial/referencia/GLOSSARIO_DE_TERMOS.md`. Este canônico é fonte técnica: fórmulas e tabelas mantêm o símbolo.

**Status:** fonte única de verdade sobre velocidade de corte (`Vc`) e avanço por dente (`fz`) — faixa por material, tabela por diâmetro, e janela de tolerância em torno do valor recomendado — para fresamento com fresa inteiriça de metal duro revestido.
**Precedência:** este documento vence, no sistema anterior: (a) as faixas de `Vc` por material rotuladas "validado" ou "confiabilidade alta" sem fonte auditável; (b) a regra "Vc cresce do desbaste para o acabamento" aplicada igualmente a todos os materiais do catálogo; (c) a tabela de `fz` por diâmetro com interpolação linear e as frações derivadas (acabamento = 60% do desbaste; grupo endurecido = 85%/75%; semi-acabamento = ponto médio); (d) o piso absoluto `fz = 0,002 mm/dente`; (e) as quatro zonas de cor (`0,50 / 0,75 / 1,20 / 1,50`) aplicadas igualmente a `Vc`, `fz`, `ae` e `ap`.
**Origem:** rodada de pesquisa R4 (par cego — território handbook/norma/literatura × território catálogo de fabricante, retornos de 20/08/2026) + `VALIDACAO_R4.md` (23/08/2026), veredito `APROVADO COM RESSALVAS`, **0 bloqueios**.
**Regra:** No Invention — nenhum número entra sem fonte citada.

---

## 1. Regras e fórmulas

### 1.1 `Vc` não tem faixa universal por material — só ponto de partida condicionado

Nenhuma faixa de velocidade de corte vale por si só. Todo valor publicado por fabricante vem amarrado a: tipo e revestimento da ferramenta, grupo de dureza (não a liga isolada), engajamento (`ae/D`, `ap`), refrigeração e estratégia (convencional × HSM/HEM). Uma faixa sem essas seis condições declaradas **entrega menos informação do que aparenta** — confirmado pelos dois territórios da rodada.

**Consequência prática:** o sistema não guarda "`Vc` do aço 1045", guarda "`Vc` do aço 1045, grupo de dureza X, ferramenta Y revestida com Z, estratégia W". Ver tabela A (§2.1) para os valores condicionados que a rodada conseguiu localizar.

**Confiança:** `CONSENSO` — os dois territórios (handbook e catálogo) chegam à mesma conclusão por caminhos que não se tocam.

### 1.2 "`Vc` cresce do desbaste para o acabamento" não é lei — é regra de catálogo específica, e a magnitude publicada é maior que a usada

A relação existe em catálogo, mas não é universal nem tem a magnitude que o sistema assumia. Duas cartas de um mesmo fabricante publicam razão acabamento/desbaste de **1,78×** e **1,60×** — contra o **1,10×** em uso no projeto: o acréscimo de `Vc` no acabamento que o sistema aplica (**+10%**) é uma fração do publicado (**+60% a +78%**). A causa não é "tirar menos material": é o menor `ae/ap` reduzindo carga instantânea e espessura de cavaco, o que permite subir `Vc` sem sobrecarregar a aresta.

**A relação pode se inverter.** Em contato desfavorável (esférica em baixa altura, parede fina, refrigeração deficiente, material endurecido), o acabamento pode exigir `Vc` **menor**, não maior. Nenhum dos dois territórios encontrou carta de fabricante que publique essa inversão explicitamente para o mesmo par ferramenta-material — fica `NÃO ENCONTRADO`, não inventar.

**Confiança:** `CONSENSO` para a não-universalidade e para o mecanismo; `REFERÊNCIA ÚNICA` para as magnitudes 1,78× e 1,60× (um fabricante).

### 1.3 `fz` é tabela discreta por ferramenta — degraus de diâmetro, não função contínua

O formato publicado por fabricante é **degraus por faixa ou ponto de diâmetro**, nunca uma relação fechada `fz = f(D)` (linear ou de potência). A interpolação linear em uso no sistema é **decisão de implementação, não regra publicada** — só é defensável dentro da mesma carta, mesma geometria, mesma dureza, mesmo revestimento e mesma estratégia; interpolar entre tabelas de fontes diferentes mistura condições.

**Confiança:** `SEM CONSENSO` — o território de literatura rotula esta conclusão explicitamente como `SEM CONSENSO para uma forma universal de fz(D)` (não há lei comprovada, só uma representação plausível); o território de catálogo mostra três cartas em formato de degraus, mas nunca atribui `CONSENSO` a achado nenhum, por desenho da rodada. A prática recomendada — armazenar a tabela discreta e interpolar só dentro da mesma carta — segue válida como decisão de implementação, não como fato consensado.

### 1.4 O pico de `Vc` em Ø6–8 mm no sistema é artefato de tabela — o diâmetro afeta a rotação, não `Vc`

Nenhuma carta consultada publica `Vc` variando com o diâmetro dentro do mesmo grupo de material e estratégia — `Vc` é **praticamente constante por grupo**, e o diâmetro entra só via `n = 1000·Vc/(π·D)`. A curva do sistema (subindo até Ø6–8 e caindo até Ø16) não tem base física identificada nos dois territórios; é mais compatível com limite de RPM da máquina, mistura de cartas, ou artefato de tabela do que com uma lei de dissipação de calor.

**Regra recomendada:** calcular `n` a partir do `Vc` de catálogo (constante por grupo) e aplicar o limite real de RPM da máquina como camada separada. Se o limite for atingido, reportar `Vc` efetivo menor — não desenhar uma curva de pico sem fonte.

**Confiança:** `CONSENSO` para "não é lei física", `NÃO ENCONTRADO` para a origem específica da curva do sistema.

### 1.5 O piso de `fz` é função do raio de aresta, não valor absoluto

O piso `0,002 mm/dente` do sistema não tem base como limite físico. O mecanismo real é o **esfregamento** (*rubbing/ploughing*): abaixo de uma espessura mínima de cavaco relativa ao raio de aresta, o gume esfrega em vez de cortar.

```
h_min ≈ α × rβ
fz_min = função_de_geometria(h_min, KAPR, ae/D)
```

`α` (fração do raio de aresta) varia **0,14 a 0,49** entre estudos e métodos — Oliveira et al. relatam 0,22–0,36; Mamedov et al. resumem 0,20–0,35 conforme a ductilidade; Wu et al. obtêm 0,17 em ensaio próprio, dentro de uma faixa compilada de ~0,14–0,49. Não há valor único consensado. A hipótese preliminar de 5–20% do enunciado da rodada **não é sustentada** — os valores medidos ficam acima disso.

**O que falta para calcular:** o raio de aresta (`rβ`) por diâmetro de ferramenta não está publicado em nenhum catálogo consultado nos dois territórios — ver lacuna (§4).

**Confiança:** `CONSENSO` para o mecanismo e para a forma da fórmula; `SEM CONSENSO` para o valor de `α`; `NÃO ENCONTRADO` para `rβ` por diâmetro.

### 1.6 O teto de `fz` não tem valor universal

Não existe, em nenhum dos dois territórios, um `fz` máximo publicado para todas as fresas, materiais e máquinas. O teto real é o envelope de força, potência, torque, rigidez, balanço e resistência da aresta ao lascamento — calculado por carta da ferramenta específica e pelo perfil da máquina, nunca por constante fixa.

**Confiança:** `CONSENSO` para rejeitar teto universal.

### 1.7 Janela de tolerância — as quatro zonas de cor não têm base, e a estrutura correta é assimétrica por parâmetro

Os quatro limiares `0,50 / 0,75 / 1,20 / 1,50` (razão contra o valor recomendado), aplicados igualmente a `Vc`, `fz`, `ae` e `ap`, **não têm fonte em nenhum documento nos dois territórios pesquisados** — nem handbook, nem norma, nem catálogo de fabricante.

**A tolerância não é igual entre os quatro parâmetros**, e a assimetria muda de sinal por parâmetro:

| Parâmetro | Abaixo do recomendado | Acima do recomendado |
|---|---|---|
| `fz` | **Perigoso** — risco de esfregamento (§1.5) se cruzar `h_min` | Sobrecarga, deflexão, risco de lascamento |
| `Vc` | Favorece aresta postiça, corte ineficiente em certas condições | Aumenta calor e desgaste (Taylor, §1.8) |
| `ae` | Geralmente conservador — reduz carga instantânea, mas afina o cavaco e pode empurrar `fz` efetivo abaixo do piso | Aumenta contato e potência |
| `ap` | Geralmente conservador — reduz carga | Aumenta força, deflexão, potência |

Os dois territórios convergem nessas cinco conclusões: (1) tabela sem condição declarada é pouco informativa; (2) `Vc` crescente no acabamento não é universal; (3) os quatro limiares não têm base; (4) o piso de `fz` é função de `h_min/rβ`, não fração fixa; (5) a janela deve ser assimétrica e por parâmetro, derivada do mecanismo próprio de cada um, não de uma razão comum.

**Não confundir com** a "janela de tolerância de `Vc`" (fatores `0,6`/`1,4`) já declarada em `CANONICO_LIMITES_E_ALERTAS.md` §1.3 e §3.1 — aquela é decisão de projeto isolada para disparo de alerta de `Vc` contra a faixa tabelada; esta seção trata dos quatro limiares que classificavam os **quatro** parâmetros pela mesma régua, achado que esta rodada derruba por completo.

**Confiança:** `CONSENSO` para rejeitar a janela simétrica universal; `SEM CONSENSO` para a ordenação exata de sensibilidade entre os quatro (um território propõe `fz ≈ Vc > ae/ap`, o outro `fz > ae > ap > Vc` — convergem em que `fz` é o mais sensível, divergem no resto, dentro da margem do modelo).

### 1.8 `Vc` acima do recomendado — efeito quantificável só com o expoente de Taylor

```
T₂/T₁ = (V₂/V₁)^(−1/n)
redução percentual de vida = [1 − (V₂/V₁)^(−1/n)] × 100%
```

Para `V₂ = 1,20 × V₁`: `T₂/T₁ = 1,20^(−1/n)`. A fórmula é `CONSENSO` nos dois territórios; o expoente `n` **não foi procurado nesta rodada por desenho** — pertence a `CANONICO_DEFLEXAO_E_VIDA.md` (R6). Não inserir número de redução de vida até `n` estar disponível.

### 1.9 `fz` é grandeza por dente — `Z` nunca é ignorável no avanço de mesa

```
Vf = fz × Z × n
```

`fz` não muda automaticamente com o número de arestas, mas `Vf` sim. Não existe, em nenhum território, uma correção universal de `fz` em função de `Z` isoladamente — o `fz` adequado vem da carta da ferramenta específica (que já embute `Z` na recomendação). O sistema não deve aplicar a mesma tabela de `fz` a ferramentas de 2 e 4 cortes sem declarar que isso é aproximação interna.

**Confiança:** `CONSENSO` para a cinemática; `SEM CONSENSO` para correção universal por `Z`.

---

## 2. Constantes e tabelas

### 2.1 Tabela A — Velocidades de corte (`Vc`) localizadas, por material/grupo

Nenhuma linha é "faixa validada do material" no sentido antigo — cada uma é um ponto de catálogo com a condição que a sustenta. Fonte primária das linhas numéricas: **OSG, cartas técnicas de Speeds & Feeds** (WXL 4 cortes — Lists 3430/3530, 3604, 3670 — e AERO UVX-Ti — Lists 2100/2102/2106/2108), salvo onde outra fonte é nomeada.

| Material do sistema | Condição publicada | `Vc` (m/min) | Fonte | Confiança |
|---|---|---:|---|---|
| Aço 1020/1045 (proxy grupo `<32 HRC`) | WXL 4F, side/contour milling | **76,2 – 121,9** | OSG List 3604, 3430 | `REFERÊNCIA ÚNICA` proxy — não individualiza a liga |
| Aço 1045/1055 nomeado, HSM light milling | WXL Radius 4F, ferramenta dedicada HSM | **475,5** | OSG List 3670 | `REFERÊNCIA ÚNICA` direta — não misturar com side milling |
| Inox (proxy de grupo) | side milling, grupos de aço/inox | **58,5 – 76,2** | OSG List 3670, 3604 | `REFERÊNCIA ÚNICA` proxy — não nomeia AISI 304 |
| Alumínio (proxy "aluminum/copper alloy") | WXL 4F, side milling / HSM | **296,9 / 495,9** | OSG List 3604 | `REFERÊNCIA ÚNICA` proxy — não individualiza 6061-T6 |
| P20 — só no grupo `42–50 HRC` | side milling / HSM | **46,6 / 147,0** | OSG List 3604 | `REFERÊNCIA ÚNICA` parcial — não cobre P20 a 280–320 HB |
| 2711 | — | — | — | `NÃO ENCONTRADO` — sem equivalência DIN/AISI publicada em fonte autorizada |
| 8620 núcleo (proxy `<32 HRC`) | side milling / HSM | **76,2 / 375,2** | OSG List 3604 | `REFERÊNCIA ÚNICA` proxy — não nomeia 8620 |
| 8620 cementado, 45–60 HRC (parcial) | side milling | **29,3 – 47,5** | OSG List 3670 | `REFERÊNCIA ÚNICA` parcial — não cobre 60–62 HRC |
| H13, grupo `42–50 HRC` (parcial) | side milling / HSM | **46,6 / 147,0** | OSG List 3604 | `REFERÊNCIA ÚNICA` parcial — não cobre acima de 50 HRC |
| Faixas de dureza HRC (side milling, tabela própria) | `<20` / `20–30` / `30–38` / `38–45` / `45–55` / `55–60` HRC | **120,7 / 89,7 / 78,6 / 58,5 / 47,5 / 29,3** | OSG List 3670 | `REFERÊNCIA ÚNICA` — um fabricante só, mas é a organização real do dado (por faixa de HRC, não por correção contínua) |
| GG25 (proxy "cast iron") | side milling / HSM | **76,2 / 375,2** | OSG List 3604 | `REFERÊNCIA ÚNICA` proxy — não individualiza GG25 |
| GGG50 | — | — | — | `NÃO ENCONTRADO` |
| Ti-6Al-4V, side milling | AERO UVX-Ti 5F, `aa≤1,8D`, `ar=0,2D`, refrigerante solúvel | **61,0 – 80,8** | OSG Lists 2100/2102/2106/2108 | `REFERÊNCIA ÚNICA` direta — ferramenta dedicada |
| Ti-6Al-4V, slotting | AERO UVX-Ti 5F, `aa≤1D` | **30,5 – 50,3** | idem | `REFERÊNCIA ÚNICA` direta |

**O que isto substitui:** as faixas do sistema perdem o rótulo "validado" / "confiabilidade alta" — nenhuma tem fonte que sustente esse rótulo nos dois territórios pesquisados. O valor **150–200 m/min** do 1045 fica **23–64% acima** de 121,9 m/min e **97–162% acima** de 76,2 m/min — nenhuma das duas referências de catálogo sustenta o rótulo. O valor pontual **140 m/min** fica `SEM CONSENSO` (~15% acima de 121,9); o valor antigo **80–120 m/min** não tem fonte reconstruível. Nenhum dos dois é confirmado nem descartado por evidência direta, mas nenhum sustenta "validado".

### 2.2 Tabela B — Avanço por dente (`fz`), sistema × catálogo, por diâmetro

Base: OSG WXL 4F ball end, grupo `Up to 32 HRC` (proxy para o grupo `28–34 HRC` do sistema — mesma ressalva de proxy da tabela A).

| Ø (mm) | `fz` sistema (desbaste) | `fz` OSG (desbaste) | `fz` OSG (acabamento) | Diferença (desbaste) | Confiança |
|---:|---:|---:|---:|---:|---|
| 1,0 | 0,012 | 0,0110 | 0,0110 | +9% | `REFERÊNCIA ÚNICA` |
| 2,0 | 0,030 | 0,0220 | 0,0220 | **+36%** | `REFERÊNCIA ÚNICA` |
| 3,0 | 0,050 | 0,0366 | 0,0376 | **+37%** | `REFERÊNCIA ÚNICA` |
| 4,0 | 0,070 | 0,0494 | 0,0505 | **+42%** | `REFERÊNCIA ÚNICA` |
| 6,0 | 0,100 | 0,0756 | 0,0766 | **+32%** | `REFERÊNCIA ÚNICA` |
| 8,0 | 0,120 | 0,1028 | 0,1031 | +17% | `REFERÊNCIA ÚNICA` |
| 10,0 | 0,140 | 0,1301 | 0,1299 | +8% | `REFERÊNCIA ÚNICA` |
| 12,0 | 0,160 | 0,1568 | 0,1564 | +2% | `REFERÊNCIA ÚNICA` |
| 0,2 / 0,5 / 0,75 / 0,8 / 1,5 / 14 / 16 | — | — | — | — | `NÃO ENCONTRADO` — nenhuma carta consultada publica esses pontos |

**Divergência acima da margem do modelo (±15–25%) em quatro diâmetros consecutivos** — Ø2 a Ø6 mm, +32% a +42%. Converge para o proxy a partir de Ø8 mm. É achado a levar em conta, não correção automática: a comparação é entre a fresa do sistema e uma fresa esférica OSG específica, geometrias podem não ser idênticas — mas a divergência sistemática em quatro pontos contíguos indica que a tabela do sistema **pode ser agressiva** nessa faixa.

### 2.3 Regras derivadas do sistema — nenhuma confirmada em catálogo

| Regra em uso | O que o catálogo mostra | Veredito |
|---|---|---|
| `fz` acabamento = 60% do desbaste | OSG mantém `fz` quase igual entre desbaste e acabamento (Ø4 mm: 0,0505/0,0494 ≈ 1,02) | `NÃO ENCONTRADO` |
| `Vc` acabamento = 110% do desbaste | OSG publica razões de 1,78× e 1,60× — maiores e específicas por grupo | `NÃO ENCONTRADO` — magnitude errada, ver §1.2 |
| Grupo endurecido: `Vc × 0,85`, `fz × 0,75` | OSG publica tabela própria por faixa de HRC (§2.1), sem essa fração fixa | `NÃO ENCONTRADO` |
| Semi-acabamento = ponto médio aritmético | Nenhuma carta declara essa interpolação | `NÃO ENCONTRADO` |
| Piso `fz = 0,002 mm/dente` | Sem base como limite absoluto — ver §1.5 | `NÃO ENCONTRADO` |
| Multiplicadores por revestimento (sem × TiAlN × AlTiN × AlCrN) | Nenhuma carta publica fator entre condições | `NÃO ENCONTRADO`, convergente com `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` §2.3, que já descartou os cinco multiplicadores de revestimento |
| Multiplicadores por refrigeração (seco × ar × MQL × emulsão × HP) | Só recomendações qualitativas por ferramenta (ex.: "usar ar comprimido"), nunca fator numérico | `NÃO ENCONTRADO` |
| Multiplicadores por estratégia (convencional × HSM) | **Existe, mas não é fator fixo**: OSG mostra +392% (grupo `<32 HRC`) e +215% (grupo `42–50 HRC`) de side milling para HSM light milling — a magnitude muda por grupo | `REFERÊNCIA ÚNICA` — variação real, maior que qualquer fator único |

---

## 3. O que foi decidido pelo Mestre

Nenhuma decisão de produto ficou pendente desta rodada — as três questões foram respondidas com evidência (condicionada) ou fecharam em lacuna declarada. O único ponto que exigia escolha editorial — o que fazer com o rótulo "validado" das nove faixas antigas — foi resolvido por aplicação direta da evidência (retirar o rótulo, §2.1), não por decisão de produto que precisasse do Mestre.

---

## 4. Lacunas declaradas

Itens marcados **[convergente]** foram declarados lacuna pelos **dois** territórios — a ausência é achado, não falha de busca.

1. **[convergente] Faixa de `Vc` para aço 1045 em fresamento convencional**, individualizada (não por grupo/proxy). Fecharia com três cartas de fabricante independentes para a mesma geometria, revestimento, dureza e estratégia.
2. **[convergente] Equivalência DIN/AISI do aço 2711** e dados de corte — não existe em catálogo nem em handbook pesquisado.
3. **P20 na condição 280–320 HB** — só existe no grupo de catálogo `42–50 HRC`.
4. **H13 acima de 50 HRC** — a linha de catálogo termina em 50 HRC.
5. **8620 núcleo e cementado** — só proxies por grupo geral de dureza, sem erro estatístico publicado.
6. **GG25 e [convergente] GGG50 como dado direto** — só proxy genérico "cast iron"; GGG50 sem dado algum.
7. **Ti-6Al-4V, semi-acabamento e acabamento** — a carta encontrada cobre side milling e slotting, não as demais operações.
8. **[convergente] Multiplicadores numéricos de revestimento** — não existem em nenhuma fonte pesquisada.
9. **[convergente] Multiplicadores numéricos de refrigeração** — só recomendação qualitativa.
10. **[convergente] Raio de aresta (`rβ`) por diâmetro** — lacuna que persiste desde `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md` e `CANONICO_LIMITES_E_ALERTAS.md`. Sem ela, o piso de `fz` da §1.5 não é calculável em número.
11. **Valor exato de `α` (fração de `rβ` que define `h_min`)** — faixa 0,14–0,49, sem consenso do ponto.
12. **[convergente] Piso absoluto `fz = 0,002 mm/dente`** — não é piso físico em nenhum dos dois territórios; fica sem valor de substituição até `rβ` (item 10) e `α` (item 11) fecharem.
13. **[convergente] Teto universal de `fz`** — depende de carta específica e envelope de máquina.
14. **Expoente de Taylor `n`** — reservado por desenho para `CANONICO_DEFLEXAO_E_VIDA.md` (R6), que fecha com essa mesma lacuna declarada.
15. **[convergente] Os quatro limiares de zona (`0,50/0,75/1,20/1,50`)** — não existem em fabricante, norma nem handbook.
16. **As quatro regras derivadas do sistema** (`fz` acabamento = 60% do desbaste; `Vc` acabamento = 110% do desbaste; grupo endurecido `Vc×0,85`/`fz×0,75`; semi-acabamento = ponto médio aritmético) — nenhuma confirmada em catálogo, handbook ou norma nos dois territórios (§2.3).
17. **Pico de `Vc` em Ø6–8 mm do sistema** — artefato de tabela nos dois territórios; origem da curva nunca identificada.
18. **`fz` para Ø 0,2 / 0,5 / 0,75 / 0,8 / 1,5 / 14 / 16 mm** — nenhuma carta publicada nos dois territórios cobre esses pontos.

---

## 5. Consequências

- **O rótulo "validado" sai das nove faixas de `Vc` e da tabela de `fz` do sistema anterior.** Nenhuma tem fonte que sustente esse rótulo nos dois territórios pesquisados; entram como pontos de catálogo condicionados (§2.1, §2.2) ou lacuna.
- **A tabela de `fz` do sistema pode ser agressiva entre Ø2 e Ø6 mm** (+32% a +42% acima do proxy de catálogo, acima da margem ±15–25% do modelo) — revisar antes de manter como recomendação.
- **As quatro zonas de cor simétricas (`0,50/0,75/1,20/1,50`) saem.** Substituídas por zonas assimétricas derivadas do mecanismo próprio de cada parâmetro (§1.7) — piso e teto de `fz` nunca são a mesma razão espelhada; `ae`/`ap` abaixo do recomendado é geralmente conservador, `fz`/`Vc` abaixo pode ser perigoso.
- **O pico de `Vc` em Ø6–8 mm sai do modelo.** `Vc` passa a ser constante por grupo de material/estratégia; o diâmetro afeta só a rotação, com o limite de RPM da máquina como camada separada (§1.4).
- **A interpolação linear de `fz` por diâmetro vira decisão de implementação declarada**, não regra publicada — só interpolar dentro da mesma carta/condição (§1.3).
- **O piso absoluto `fz = 0,002 mm/dente` sai.** Substituído por `fz_min ≈ α × rβ` — mas não é calculável em número até `rβ` por diâmetro ser localizado (lacuna 10). Até lá, o sistema não tem piso físico numérico para `fz` — só a fórmula.
- **As quatro frações derivadas do sistema (acabamento 60%/110%, endurecido 85%/75%, semi = ponto médio) saem** — nenhuma confirmada; a magnitude real publicada por catálogo é maior e específica por grupo (§1.2, §2.3).
- **Os cinco multiplicadores de revestimento continuam fora do produto** — convergente com o achado já registrado em `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md`.
- **O expoente de Taylor `n` permanece pendente** para o cálculo de redução de vida por `Vc` acima do recomendado (§1.8) — depende de `CANONICO_DEFLEXAO_E_VIDA.md`.
