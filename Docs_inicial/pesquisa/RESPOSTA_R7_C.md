# RESPOSTA R7 — território C (retorno cru)

> **ACEITO COMO CORROBORAÇÃO** na `VALIDACAO_R7.md` §3.
> Corrobora o território B em 6 pontos, com fontes independentes onde as tem.
> **Ressalva de fonte:** o `rβ` vem de um blog de afiação (Cuttermasters), não de catálogo
> nem de literatura revisada — o próprio retorno rotula `REFERÊNCIA ÚNICA` e declara a
> ausência de estudo independente. **Não entra como número; entra como convergência.**
> Colado pelo Mestre em 29/08/2026.

---

# Q1 — Raio de aresta (`rβ`) de fresa inteiriça

As fontes encontradas indicam que fresas inteiriças de carboneto são fabricadas com **raios de aresta muito pequenos**, tipicamente na faixa de poucos micrômetros. Um guia de usinagem industrial (Cuttermasters) relata que, após retífica e pré-coating, as fresas recebem um pequeno *hone* controlado de aproximadamente **5–20 μm** (valores típicos ~10–15 μm). O mesmo texto apresenta raios típicos por material: cerca de **3–5 μm** para alumínio, **8–12 μm** para aço carbono comum, e **15–20 μm** para aço endurecido.

**Faixa citada:** aproximadamente *3–20 μm* para fresas de uso geral (após polimento/hone antes do revestimento).

**Condições:** fresas de carboneto revestidas, de diâmetros típicos (vários mm), voltadas a usinagem geral. Medidas *após retífica e controle de aresta* pré-revestimento, em ferramentas não-micro e não acabadas com raio geométrico grande.

**Rótulo:** `REFERÊNCIA ÚNICA`. Não foram achados estudos independentes de medição de `rβ` em fresas convencionais; os valores vêm da prática de preparação de aresta de fabricantes (Cuttermasters). Não foram encontrados catálogos com especificação direta desses raios em micrômetros.

# Q2 — Razão `h_min / rβ`

A literatura sugere que a espessura mínima de cavaco fica na ordem de **20–40% do raio de aresta**, variando com o material. Em aço carbono (AISI 1045) mediu-se `h_min` ≈ **22–36%** de `rβ` (outro trabalho experimental indica ~29,5%). Oliveira et al. concluíram genericamente que `h_min ≈ 1/4–1/3 rβ` (≈25–33%), praticamente independente do material. Para alumínio (dúctil), valores reportados são geralmente maiores; Malekian et al. encontraram `h_min = 0,23·rβ` (≈23%) em Al6061 e outros autores sugerem até ~35–40% para ligas de alumínio.

**Faixa sugerida (por material):**

- **Aço carbono (ferrítico):** ~0,20–0,36 `rβ` (`CONSENSO`).
- **Aço inoxidável austenítico:** não achamos fonte específica; presumivelmente da mesma ordem (~20–30%). (`SEM DADOS`).
- **Alumínio:** aproximadamente 0,20–0,40 `rβ`; fontes variam (23% a 35–40%). (`SEM CONSENSO`).
- **Aço endurecido:** *não encontrado* valor específico. Possivelmente semelhante ao aço carbono ou menor, mas sem referência pública. (`NÃO ENCONTRADO`).

**Rótulos:** para aço carbono há `CONSENSO` em ~20–35%. Para alumínio/ligas as fontes variam (`SEM CONSENSO`). Para inox e aços endurecidos não há dados publicados claros (`NÃO ENCONTRADO`).

# Q3 — Piso publicado em mm e `hex` vs `hm`

**Piso em mm:** não foi encontrado, em catálogos ou normas, nenhum valor absoluto de "espessura mínima de cavaco em mm" publicado por fabricantes. Todos os indicadores são dados via fração de `rβ`. Cuttermasters nota que fresas de carboneto são preparadas com **10–15 μm** de raio de aresta, o que sugere que cavacos abaixo dessa ordem entrariam em regime de laminagem, mas nenhum fabricante declara "não opere abaixo de X mm". Conclusão: **`NÃO ENCONTRADO`**.

**Comparação `hex` vs `hm`:** a prática usual compara com a espessura máxima de cavaco (`h_ex`). Como regra, o avanço por dente (`f_z`) corresponde à espessura máxima em corte faceado total. A Sandvik Coromant explica que para um cortador de 90° "**`f_z = h_ex`**". Assim, a verificação deve usar o **`hex`**, não a média `hm`.

# Q4 — Disparo prático da regra

Com os valores acima, o piso calculado fica em poucos micrômetros. Para `rβ` ≈ 10 μm e `h_min/rβ` ≈ 0,25, o piso é ≈ **2,5 μm**.

Comparando com condições reais de fresamento (dados de catálogo), o `hex` típico fica bem acima disso. Widia recomenda avanços por dente na faixa de **0,03–0,08 mm** para fresas de 6–16 mm em aço. Mesmo em corte raso (`ae` ≈ 5% D), essas condições geram `hex` da ordem de dezenas de µm. Em nenhuma condição comum foi encontrado `hex` menor que alguns µm. Consequentemente, **a regra quase não dispara na prática**.

**Conclusão:** nenhum caso real de catálogo apresentava `hex` abaixo do piso calculado. O alerta atual raramente seria acionado. Se fosse necessário um gatilho prático, deveria ser num nível muito inferior ao atual, ou usar outra métrica — pois com os valores encontrados **a regra não protege praticamente ninguém**.

# Tabela de fontes

| Fonte | Trecho usado |
|---|---|
| Cuttermasters "Edge Prep" (blog, 2026) | Raio de aresta ~5–20 μm (10–15 μm típico) para fresas de carboneto; ~3–5 μm (Al), 8–12 μm (aço), 15–20 μm (endurecido) — Q1 |
| F. Oliveira et al., *Int. J. Mach. Tools Manuf.* (2015) | Medição de `h_min` em AISI 1045: 22–36% de `rβ` (≈29,5% em outro estudo); `h_min ≈ 1/4–1/3 rβ` — Q2 |
| Sandvik Coromant (*entering angle and chip thickness*) | Para cortador 90°, `f_z = h_ex` — Q3 |
| Widia VariMill (dados de aplicação, 4717/4727) | Tabelas de `f_z`: aço P `fz` 0,044–0,114 mm para D 6–16 mm; aço endurecido H `fz` 0,033–0,062 mm — usados para calcular `h_ex` — Q4 |

# Piso resultante

Assumindo `rβ` = 10 μm e razão ≈ 0,25, obtém-se **piso ≈ 2,5 μm** (0,0025 mm). Com `rβ` até 15–20 μm e razão de 0,2–0,3, o piso ficaria em **~2–6 μm**. O piso calculado está na ordem de poucos micrômetros.

# Recomendação de regra

**Sem base firme para um piso em mm:** já que nenhum fabricante publica diretamente um valor de `h_min` absoluto, uma regra confiável só pode se basear em fração de `rβ`. Contudo, com `rβ` ≈ 10–20 μm, usar `0,3·rβ` (3–6 μm) praticamente nunca dispara. Dada essa discrepância, **não parece adequada a abordagem atual**.

Como alternativa, sugerimos monitorar o `hex` diretamente ou reajustar o limiar se houver dados específicos de aplicação. Em qualquer caso, comparar **`h_ex`**, não a média, ao piso. Por ora, parece mais seguro admitir que o gatilho proposto **não protege ninguém** nos valores típicos, e considerar **outro critério de alerta**.

# O que ficou sem resposta

- **Inox e aço endurecido:** não foram encontrados estudos específicos de `h_min/rβ` para esses materiais em fresamento.
- **Piso em mm publicado:** confirmado não haver publicação desse tipo.
- **Disparo prático (Q4):** quantificação geral foi feita, mas não há estatística formal de casos. Conclusão qualitativa: `hex` > piso em todos os cenários comuns.
