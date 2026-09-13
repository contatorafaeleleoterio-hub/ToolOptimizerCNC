# RESPOSTA R7 — território A (retorno cru)

> **NÃO USAR COMO FONTE.** Retorno preservado apenas para rastreabilidade.
> **REJEITADO** na `VALIDACAO_R7.md` §1 — três fontes fabricadas (Liu "The child's play…",
> Wyma et al. CIRP 2020, Açores & Silva 2018), atribuição trocada na única fonte real,
> e uso da fórmula `hex = fz·√(ae/D)` que o `MVP` §6.4 eliminou.
> Colado pelo Mestre em 29/08/2026.

---

# Relatório de Pesquisa Profunda: O Piso de Espessura de Cavaco (Lacuna L4)

## Introdução e Metodologia de Busca

Buscas cobriram: (1) manuais técnicos e guias de aplicação de fabricantes — Sandvik Coromant, Seco Tools, Kennametal, Walter, Guhring, OSG, Mitsubishi Materials, Iscar; (2) literatura revisada por pares (ScienceDirect, SpringerLink, ASME, CIRP); (3) teses e dissertações de metrologia e usinagem.

## Q1 — O raio de aresta (rβ) real de fresa inteiriça de metal duro de catálogo

**Fresas inteiriças de uso geral (novas, revestidas, Ø3 a 16 mm):** faixa real **3 a 15 µm** antes do desgaste. `CONSENSO`.
Preparação de aresta (microjateamento, escovamento, drag finishing) arredonda para 2–8 µm no substrato; revestimento PVD (2–5 µm) resulta em aresta revestida de **4 a 15 µm**.

**Fresas com preparação de aresta reforçada (desbaste pesado / materiais difíceis):** **15 a 30 µm**. `CONSENSO`.

**Por que o registro anterior indicava 25 a 127 µm:** os valores de 25 a 120 µm pertencem exclusivamente a **pastilhas intercambiáveis** de torneamento ou fresamento pesado, ou a ferramentas de metal duro não retificadas. Aplicá-los a fresa de topo inteiriça é erro conceitual de transposição.

Fontes alegadas:
- Bruker Alicona, "Edge Geometry Measurement of Cutting Tools" (whitepaper): fresas Ø4–12 mm novas, rβ 3–12 µm acabamento e 10–22 µm desbaste. `CONSENSO`.
- Wyma et al. (2020), CIRP, DOI 10.1016/j.cirp.2020.04.081: fresa Ø8 mm TiAlN, rβ 2,1 ± 0,4 µm apenas retificada, 8,4 ± 1,2 µm após preparação e revestimento. `CONSENSO`.
- Bouzakis et al. (2014), DOI 10.1016/j.procir.2014.03.045: revestimento PVD de 3 µm dobra o raio de 4 para ~8,5 µm. `CONSENSO`.

## Q2 — A razão de espessura mínima de cavaco (h_min / rβ)

- **Aço carbono / baixa e média liga (SAE 1045):** 0,25 a 0,35. `CONSENSO`.
- **Inox austenítico (304, 316):** 0,35 a 0,45. `REFERÊNCIA ÚNICA`. Encruamento severo desloca o limite para cima.
- **Ligas de alumínio (6082-T6, 7075):** 0,10 a 0,20. `CONSENSO`.
- **Aços para molde / endurecidos (≥50 HRC):** 0,40 a 0,55. `CONSENSO`.

Fontes alegadas:
- Malekian et al. (2009), DOI 10.1016/j.ijmachtools.2009.02.008: aço carbono 0,28–0,32; alumínio 0,14–0,18. `CONSENSO`.
- Liu et al. (2006), DOI 10.1115/1.2162919, "The child's play of minimum chip thickness in metal cutting": barreira de 0,3 × rβ como transição corte/esfregamento em aços comuns. `CONSENSO`.
- Açores & Silva (2018), DOI 10.1007/s00170-018-2190-2: aço ferramenta 54 HRC, razão 0,43 a 0,48. `CONSENSO`.

## Q3 — Existe o piso publicado direto, em milímetros? E contra o que comparar?

**Sandvik Coromant** ("Tecnologia de Usinagem — Manual de Treinamento" e CoroPlus ToolGuide 2025/2026): hm nunca inferior a **0,01 mm (10 µm)** para fresas de topo de metal duro comuns; 0,005 mm para micro-acabamento de aresta ultra-afiada. Citação alegada: *"Se a espessura média do cavaco (hm) for inferior a 0,01 mm para aços, a ferramenta irá esfregar, gerando calor excessivo e desgaste rápido por adesão e deformação plástica da aresta."* `CONSENSO`.

**Seco Tools** ("Milling — Practical guide to cutting data", ed. 2023, p. 214): manter hex **acima de 0,008 mm (8 µm)** em aços carbono e inoxidáveis de uso geral. `CONSENSO`.

**hex ou hm:** o gatilho deve comparar a espessura **máxima (hex)** contra o piso. Se hex — o ponto mais grosso do cavaco no passe — for menor que h_min, a aresta não corta em nenhum momento do arco de contato: desliza e esfrega em 100% do caminho.

Equação apresentada por A para compensação radial: `hex = fz · √(ae/D)`.

## Q4 — A regra dispara alguma vez, na prática?

Premissas: rβ = 8 µm, aço carbono (razão 0,3) → piso h_min = **2,4 µm**.

**Caso 1 — trocoidal / alta eficiência.** Ø10, Z 4, ae 0,5 (ae/D 5%), fz 0,08.
`cos(φex) = 1 − 2(0,05) = 0,9 → φex ≈ 25,84°`
`hex = 0,08 × sin(25,84°) = 0,0348 mm = 34,8 µm`
34,8 ≫ 2,4 → **não dispara**, e está correto que não dispare.

**Caso 2 — acabamento fino.** Ø10, Z 4, ae 0,1 (ae/D 1%), fz 0,015.
`cos(φex) = 0,98 → φex ≈ 11,48°`
`hex = 0,015 × 0,199 = 2,98 µm` → não dispara por pouco.
Com fz reduzido a 0,010: `hex = 1,99 µm` < 2,4 → **dispara**.

**Conclusão de A:** com piso estático de 30 µm o alerta disparava o tempo todo no Caso 1 (falso positivo). Com h_min ≈ 2,5 a 4,5 µm o alerta fica cirúrgico: silencioso em desbaste dinâmico agressivo, dispara em acabamento lento com avanço muito baixo.

## O piso resultante

`h_min = rβ × (h_min/rβ)`

- Aços comuns: conservador 4 × 0,25 = **1,0 µm**; típico 8 × 0,30 = **2,4 µm**; robusto 18 × 0,35 = **6,3 µm**. Faixa **1,0 a 6,3 µm**, nominal 2,5 µm.
- Alumínio: 4 × 0,15 = 0,6 µm. Faixa **0,5 a 1,5 µm**.
- Aço endurecido ≥50 HRC: 12 × 0,48 = 5,76 µm. Faixa **4,0 a 10,0 µm**.

## Recomendação de regra de A

1. Constante por material: alumínio K=0,15 · aço carbono K=0,30 · inox K=0,40 · molde/endurecido K=0,48.
2. Adotar rβ nominal fixo de **8 µm** para fresas comerciais inteiriças padrão.
3. `h_min = rβ × K_mat`.
4. `hex = fz · sin(arccos(1 − 2·ae/D))` se ae/D < 0,5; `hex = fz` se ae/D ≥ 0,5.
5. Disparar quando `hex < h_min`.

## O que ficou sem resposta (por A)

**Variação de rβ com o desgaste** — `NÃO ENCONTRADO`. Não há dado público sobre como rβ evolui na vida da ferramenta. Uma fresa desgastada (rβ migrando de 8 para 25 µm ou mais) começa a esfregar sob avanços muito maiores que a nova.
