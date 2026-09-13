# Nota auxiliar — constantes de Kienzle (pré-R2)

> ⚠️ **Isto NÃO é `RESPOSTA_R2.md`.** É um retorno parcial, produzido num teste do protocolo de deep research, antes da rodada R2 ser rodada de verdade. Não substitui a R2 e não deve ser tratado como retorno de rodada pela validação. Serve como **insumo prévio**: traz dois achados que mudam o que a R2 precisa procurar.

| | |
|---|---|
| **Data** | 17/08/2026 |
| **Rodada alvo** | R2 — Motor de cálculo |
| **Cobertura do prompt R2** | Questão 1: 0% · Questão 2: só o item (g) · Questão 3: parcial (itens a, e parte de b/d) |
| **Custo** | 9 buscas, 4 fetches, 0 subagente |
| **Estado das rodadas** | inalterado — R1 concluída, R2 continua pendente |

---

## Achado 1 — O `mc = 0,75` do alumínio é erro de transcrição

Responde diretamente a **Questão 3 (a)**.

**Veredito:** a versão do código (`kc1.1 = 750`, `mc = 0,23`) está certa; a do documento técnico (`1200` / `0,75`) está errada.
**Confiança:** REFERÊNCIA ÚNICA para o valor numérico, CONSENSO para a faixa de `mc`.

**O que as fontes dizem**

| Item | Valor | Procedência |
|---|---|---|
| Ligas de alumínio (grupos VDI 21–25) | `kc1.1` = 700–800 N/mm² · `mc` = 0,25 | Machining Doctor, base própria |
| Faixa geral de `mc`, qualquer material | 0,2 – 0,3 | Sandvik Coromant + Machining Doctor (independentes) |

**Consequência:** `mc = 0,75` está fora da faixa física por um fator de ~3. Com `h = 0,1 mm`, `0,1^(−0,75) = 5,62` contra `0,1^(−0,23) = 1,70` — o valor errado **triplica** o `kc` calculado e, com ele, a potência exigida. Erro para o lado conservador (superdimensiona), mas suficiente para o sistema recusar operações viáveis.

**Recomendação:** aposentar o par `1200 / 0,75` do documento técnico e do contrato de domínio. A R2 ainda deve confirmar o `750` contra uma segunda fonte primária — a única fonte encontrada aqui não é fabricante nem handbook.

---

## Achado 2 — Não existe norma pública com `kc1.1` e `mc`

Afeta o **rótulo de confiança de toda a tabela da Questão 3** e a regra "nenhum número entra sem fonte citada".

**Veredito:** a fonte citável para `kc1.1`/`mc` só pode ser catálogo de fabricante, handbook ou artigo revisado — nunca "norma".
**Confiança:** CONSENSO.

| Documento | O que de fato traz | O que **não** traz |
|---|---|---|
| DIN 6584:1982-10 | Definição dos termos: força, energia, trabalho, potência de corte; define `kc = Fc / (b·h)` | Qualquer valor por material |
| ISO 513 / VDI 3323 (ed. 2020-08) | Classificação de grupos de material e aplicabilidade de material de ferramenta | Qualquer valor de `kc1.1` ou `mc` |

**Como isso apareceu:** o resumo automático da busca afirmou que a VDI 3323 traz `kc1` e `mc` para os 41 subgrupos. A checagem da página oficial da VDI e da própria tabela VDI 3323 derrubou a afirmação — a tabela tem grupo, dureza HB e equivalências de norma, e nenhuma coluna de força específica. **É exatamente o tipo de alucinação que o protocolo de dois agentes na R2 existe para pegar.**

---

## Achado 3 — Divergência aberta no aço 1045 / C45

Insumo para **Questão 3 (b)** e **(d)**. Não conclusivo — a R2 precisa resolver.

| Origem | `kc1.1` (N/mm²) | `mc` |
|---|---|---|
| Tabela atual do sistema (declarada validada contra Diniz/Marcondes/Coppini) | 2165 | 0,155 |
| Catálogo (Machining Doctor + tabela Suhner, independentes) | 1500 | 0,22 |
| Medição experimental, variando com `Vc` (artigo revisado) | 662 – 1299 | 0,21 – 0,41 |

**A dispersão é de ~3× no mesmo material.** A leitura provável: o par `(kc1.1, mc)` não é constante do material — é constante do **material + condição de corte** (velocidade, geometria, desgaste). Um valor único de tabela pode errar a força por um fator próximo de 2.

**O que a R2 precisa fechar:** se a tabela do sistema guarda um par por material, isso vira decisão explícita — faixa declarada em vez de ponto, ou ponto com condição de validade escrita ao lado. Não dá para manter número seco com rótulo "validado".

---

## Achado 4 — Correções adicionais do modelo (Questão 2, item g)

**Veredito:** a correção de ângulo de saída cabe; as demais ficam abaixo do ruído do modelo.
**Confiança:** CONSENSO para a fórmula, REFERÊNCIA ÚNICA para os percentuais de erro.

- **Forma publicada com correção de ângulo de saída:** `kc = kc1.1 × h^(−mc) × (1 − 0,01 × γ)`, com `γ` em graus. A Sandvik publica a forma sem o termo (`kc1 × (1/hm)^mc`) e declara que vale para inserto neutro, `γ₀ = 0°` — ou seja, as duas são a mesma equação, e o termo de `γ` é a generalização.
- **Erro do modelo contra medição:** 3,3% a 6,2% em fresamento (avanços de 0,05 / 0,10 / 0,15 mm/dente); máximos de 7% e 9% em torneamento, tangencial e avanço. Fora da faixa de calibração, a dispersão vai a 2–20%.
- **Leitura:** a margem declarada do sistema (±15–25%) cobre o erro do modelo **dentro** da faixa calibrada. Correções de desgaste e de velocidade de corte são refinamento abaixo desse ruído — não implementar no MVP.
- **Modelo alternativo (Altintas, coeficientes lineares `Ktc`/`Krc` + termo de aresta):** precisão comparável ou inferior à do Kienzle segundo estudo encontrado; a objeção histórica ao Kienzle era o custo da não-linearidade, irrelevante hoje. **Sem motivo para trocar de modelo.**

---

## Referência original do modelo

Kienzle, O. *"Die Bestimmung von Kräften und Leistungen an spanenden Werkzeugen und Werkzeugmaschinen"*, VDI-Z, vol. 94, nº 11, 1952, pp. 299–305.
**Confiança:** CONSENSO — confirmado em índice de citação e em bibliografias de literatura alemã de fabricação.

---

## O que continua sem base

| Item | O que faltou | O que seria preciso para fechar |
|---|---|---|
| `kc1.1`/`mc` do alumínio 6061-T6 | Fonte primária (fabricante ou handbook) para o par `750 / 0,23` | Catálogo Sandvik/Kennametal em PDF, ou Diniz/Marcondes/Coppini |
| Aço 1045 | Qual dos três valores vale, e sob qual condição | Confronto entre dois agentes na R2 + a página do Diniz que originou o `2165` |
| P20, 2711, 8620, H13, GG25, GGG50, Ti-6Al-4V | Não pesquisados | Rodada R2 completa |
| Questão 1 inteira (afinamento de cavaco) | Não pesquisada | Rodada R2 completa |

---

## Fontes

- [Sandvik Coromant — Specific cutting force](https://www.sandvik.coromant.com/en-us/knowledge/materials/specific-cutting-force)
- [Machining Doctor — Specific Cutting Force (KC & KC1)](https://www.machiningdoctor.com/glossary/specific-cutting-force-kc-kc1/)
- [Machining Doctor — grupos VDI 3323 (sem colunas de kc)](https://www.machiningdoctor.com/charts/vdi-3323-material-groups/)
- [VDI 3323 — escopo oficial, ed. 2020-08](https://www.vdi.de/en/home/vdi-standards/details/vdi-3323-applicability-of-hard-cutting-materials-for-metal-cutting-processes)
- [DIN 6584:1982-10 — registro da norma](https://standards.globalspec.com/std/839209/din-6584)
- [Suhner — tabelas de dados de corte (PDF)](https://www.suhner-machining.com/fileadmin/user_upload/Machining-Spindeln/MACH-Formeln-Kalkulator_EN.pdf)
- [Coeficientes Kienzle experimentais para C45 (PDF)](https://www.sv-jme.eu/?ns_articles_pdf=%2Fns_articles%2Ffiles%2Fojs%2F4430%2Fpublic%2F4430-24710-1-PB.pdf&id=3374)
- [Determinação de forças de corte em furação — validação (PDF)](https://www.abcm.org.br/anais/cobem/2009/pdf/COB09-2238.pdf)
- [MM Science — identificação operacional de kc em fresamento (PDF)](https://www.mmscience.eu/journal/issues/november-2019/articles/operational-method-for-identification-of-specific-cutting-force-during-milling/download)
- [Extended Kienzle-Sağlam com progressão de desgaste de flanco](https://www.tandfonline.com/doi/full/10.1080/10910344.2025.2473572)
- [Referência bibliográfica Kienzle VDI-Z 1952](https://www.scirp.org/reference/referencespapers?referenceid=576815)
