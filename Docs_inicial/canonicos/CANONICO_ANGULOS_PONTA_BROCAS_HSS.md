# Canônico — Ângulos de Ponta para Brocas HSS

**Status:** CANÔNICO — fonte oficial de referência técnica do projeto Fenix para ângulos de ponta ($\sigma$) de brocas em aço rápido (HSS / HSS-Co) conforme material, dureza e diâmetro.  
**Precedência:** este documento estabelece os valores canônicos para a geometria de ponta de brocas HSS. Preenche a lacuna de indicação de ângulo de ponta em graus registrada na furação HSS (referenciada provisoriamente como 140° de metal duro em protótipos anteriores). Em caso de divergência com tabelas não canônicas, este documento prevalece para brocas de aço rápido.  
**Origem:** material técnico fornecido pelo Mestre / usuário em 07/09/2026 (`tabela_angulo_brocas_hss.csv`).  
**Status da fonte bibliográfica:** fornecido diretamente para o projeto nesta data como referência canônica interna (sem catálogo/norma externa associada declarada).  
**Regra:** No Invention — todos os valores, faixas, unidades e observações foram fielmente preservados do material fornecido, sem interpolações, inferências ou alterações arbitrárias.

---

## 1. Escopo e Significado dos Campos

Este documento destina-se a servir como fonte de verdade para a futura implementação no código do motor de cálculo e assistente de seleção de ferramentas:

| Campo | Tipo / Unidade | Significado |
|---|---|---|
| `angulo_graus` | Inteiro (`°` / graus) | Ângulo de ponta da broca ($\sigma$). Relaciona-se com o ângulo de posição canônico pela fórmula $\kappa = \sigma / 2$ (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md` §1.1). |
| `materiais` | Texto | Classes, grupos ou tipos de ligas/materiais aos quais a geometria de ponta se aplica. |
| `dureza_condicao` | Texto (HB / HRC) | Faixa ou patamar de dureza do material na condição usinada, e/ou comportamento mecânico relevante (ex.: encruamento / *work-hardening*). |
| `diametro_tipico_mm` | Faixa / Limiar (`mm`) | Faixa de diâmetro nominal da ferramenta em que a geometria é comumente empregada na prática. |
| `observacoes` | Texto | Particularidades de afiação (ex.: *split point* / afiação em cruz), classe de substrato HSS (jobber, M35, M42), revestimentos associados (TiN/TiAlN) e diretrizes operacionais. |

---

## 2. Tabela Canônica de Ângulos de Ponta

Os dados a seguir reproduzem exatamente as 6 condições fornecidas:

| Ângulo de Ponta (`angulo_graus`) | Materiais (`materiais`) | Dureza / Condição (`dureza_condicao`) | Diâmetro Típico (`diametro_tipico_mm`) | Observações (`observacoes`) |
|:---:|---|---|---|---|
| **118°** | Aço carbono baixo (1018/1020), alumínio e ligas, brass/cobre, plásticos, madeira | Até ~180 HB (aço < ~30 HRC) | 0.5–13 mm | Padrão de prateleira (HSS jobber). Melhor penetração; ideal para furação geral em materiais macios/medianos. |
| **135°** | Aços média/alta resistência, inox (304/316), ferro fundido, titânio (com split point) | ~180–380 HB; inox work-hardening; aços > ~30 HRC | 1–13 mm (e >13 em linhas industriais) | Split point reduz walk e aumenta vida útil. Recomendado para inox e aços mais duros. |
| **135°** | Aços endurecidos/tool steel, aplicações alta carga em inox/titânio | > 380 HB; tool steel 40–50 HRC; titânio 30–38 HRC | >=3 mm (linhas de performance, HSS-Co M35/M42) | Geometria mais aberta para reduzir desgaste; associada a revestimentos (TiN/TiAlN). |
| **140°** | Aços endurecidos/tool steel, aplicações extrema dureza em inox/titânio | > 380 HB; aços > 45 HRC; titânio 35–40 HRC | >=3 mm (HSS-Co M42, revestido) | Máxima resistência da aresta; usar com parâmetros conservadores de corte. |
| **90°** | Magnésio, não ferrosos muito macios, plásticos/composites (geometrias especiais) | < 150 HB | Especializado (consultar catálogo) | Reduz empastamento em materiais muito macios; mais comum em catálogos especializados. |
| **118°** | Aço carbono médio (ex.: 1045) em condições gerais | ~180–280 HB | 1–13 mm | Pode ser usado com split point 118 para melhor centrabilidade em CNC. |

---

## 3. Dados Estruturados para Consumo por Código (JSON de Referência)

Para assegurar que implementações de código não dependam de conversões manuais propensas a erros de digitação, segue a representação JSON direta correspondente:

```json
[
  {
    "angulo_graus": 118,
    "materiais": "Aco carbono baixo (1018/1020), aluminio e ligas, brass/cobre, plasticos, madeira",
    "dureza_condicao": "Ate ~180 HB (aco < ~30 HRC)",
    "diametro_tipico_mm": "0.5-13",
    "observacoes": "Padrao de prateleira (HSS jobber). Melhor penetracao; ideal para furacao geral em materiais macios/medianos."
  },
  {
    "angulo_graus": 135,
    "materiais": "Acos media/alta resistencia, inox (304/316), ferro fundido, titanio (com split point)",
    "dureza_condicao": "~180-380 HB; inox work-hardening; acos > ~30 HRC",
    "diametro_tipico_mm": "1-13 (e >13 em linhas industriais)",
    "observacoes": "Split point reduz walk e aumenta vida util. Recomendado para inox e acos mais duros."
  },
  {
    "angulo_graus": 135,
    "materiais": "Acos endurecidos/tool steel, aplicacoes alta carga em inox/titanio",
    "dureza_condicao": "> 380 HB; tool steel 40-50 HRC; titanio 30-38 HRC",
    "diametro_tipico_mm": ">=3 (linhas de performance, HSS-Co M35/M42)",
    "observacoes": "Geometria mais aberta para reduzir desgaste; associada a revestimentos (TiN/TiAlN)."
  },
  {
    "angulo_graus": 140,
    "materiais": "Acos endurecidos/tool steel, aplicacoes extrema dureza em inox/titanio",
    "dureza_condicao": "> 380 HB; acos > 45 HRC; titanio 35-40 HRC",
    "diametro_tipico_mm": ">=3 (HSS-Co M42, revestido)",
    "observacoes": "Maxima resistencia da aresta; usar com parametros conservadores de corte."
  },
  {
    "angulo_graus": 90,
    "materiais": "Magnesio, nao ferrosos muito macios, plasticos/composites (geometrias especiais)",
    "dureza_condicao": "< 150 HB",
    "diametro_tipico_mm": "Especializado (consultar catalogo)",
    "observacoes": "Reduz empastamento em materiais muito macios; mais comum em catalogos especializados."
  },
  {
    "angulo_graus": 118,
    "materiais": "Aco carbono medio (ex.: 1045) em condicoes gerais",
    "dureza_condicao": "~180-280 HB",
    "diametro_tipico_mm": "1-13",
    "observacoes": "Pode ser usado com split point 118 para melhor centrabilidade em CNC."
  }
]
```

---

## 4. Relação com Outros Canônicos e Diretrizes para o Código

1. **Vínculo com o Canônico de Furação (`CANONICO_FURACAO_ROSCAMENTO_MANDRILAMENTO.md`):**
   * O ângulo $\sigma$ (`angulo_graus`) define diretamente o ângulo de posição $\kappa = \sigma / 2$.
   * A espessura não deformada de cavaco é dada por:
     $$h = \frac{f_n}{z} \cdot \sin(\kappa) = \frac{f_n}{2} \cdot \sin\left(\frac{\sigma}{2}\right)$$
   * Para brocas de uso geral em aço 1045 ($\sigma = 118^\circ$), $\kappa = 59^\circ$ e $\sin(59^\circ) \approx 0{,}8571$.
   * Em brocas HSS de alto rendimento para aços duros/inox ($\sigma = 135^\circ$), $\kappa = 67{,}5^\circ$ e $\sin(67{,}5^\circ) \approx 0{,}9239$.
2. **Uso no Código Futuro:**
   * Quando o usuário selecionar broca de aço rápido (HSS / HSS-Co), o sistema deverá sugerir como padrão o ângulo de ponta correspondente ao material/dureza conforme esta tabela (por exemplo, $118^\circ$ para aço carbono 1045 geral, $135^\circ$ para inox e aços de média/alta resistência).
   * O valor sugerido deve permanecer editável pelo operador, respeitando a diretriz de produto (`E0 §3.3`).
   * Não duplicar valores codificados (*hardcoded*) em componentes isolados; centralizar a consulta neste conjunto de dados.
