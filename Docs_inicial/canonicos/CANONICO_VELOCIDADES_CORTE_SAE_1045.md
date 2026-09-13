# Canônico — Velocidades de Corte para SAE/AISI 1045

**Status:** CANÔNICO — fonte oficial de referência técnica do projeto Fenix para faixas de velocidade de corte ($v_c$) no material **SAE/AISI 1045** para múltiplos processos de usinagem (torneamento, fresamento, furação e mandrilamento).  
**Precedência:** este documento estabelece as faixas canônicas de $v_c$ para o aço SAE/AISI 1045 no projeto. Preenche as lacunas de faixas de velocidade de corte de partida por processo e ferramenta. Em caso de divergência com valores genéricos não condicionados ou estimativas não documentadas, este documento prevalece como a referência oficial do material.  
**Origem:** material técnico fornecido pelo Mestre / usuário em 07/09/2026 (`tabela_vc_1045_torneamento_fresamento_furacao.csv`).  
**Status da fonte bibliográfica:** **SEM FONTE BIBLIOGRÁFICA ASSOCIADA / PENDENTE DE VALIDAÇÃO EXTERNA.** Registrado explicitamente que esta tabela não possui catálogo de fabricante, norma técnica, livro ou publicação bibliográfica informada. Nenhuma procedência externa foi inferida ou inventada. A validação ou atribuição futura de fonte bibliográfica deverá ser tratada em tarefa dedicada.  
**Regra:** No Invention — todos os valores numéricos, faixas mínimas e máximas, unidades ($m/min$ e $SFM$), processos, ferramentas e observações foram fielmente preservados sem alterações, arredondamentos ou interpolações.

---

## 1. Escopo e Significado dos Campos

Este documento padroniza as condições e grandezas de velocidade de corte para o material SAE/AISI 1045, preparando os dados para consulta direta pelos módulos de cálculo:

| Campo | Tipo / Unidade | Significado |
|---|---|---|
| `processo` | Texto | Operação de usinagem e regime de corte (`Torneamento (desbaste)`, `Torneamento (acabamento)`, `Fresamento (desbaste)`, `Fresamento (acabamento)`, `Furacao`, `Mandrilhamento`). |
| `ferramenta` | Texto | Substrato, classe ISO e/ou revestimento da ferramenta de corte aplicável. |
| `vc_m_min_min` | Numérico (`m/min`) | Limite inferior da faixa de velocidade de corte recomendada no sistema métrico. |
| `vc_m_min_max` | Numérico (`m/min`) | Limite superior da faixa de velocidade de corte recomendada no sistema métrico. |
| `vc_sfm_min` | Numérico (`SFM`) | Limite inferior da faixa de velocidade de corte no sistema imperial (*Surface Feet per Minute*). |
| `vc_sfm_max` | Numérico (`SFM`) | Limite superior da faixa de velocidade de corte no sistema imperial (*Surface Feet per Minute*). |
| `observacoes` | Texto | Condição metalúrgica do aço (ex.: normalizado ~180–210 HB), diretrizes de refrigeração, rigidez, profundidade de corte e acabamento superficial ($R_a$). |

---

## 2. Tabela Canônica de Velocidades de Corte (SAE/AISI 1045)

Os dados a seguir reproduzem integralmente os 11 registros técnicos fornecidos:

| Processo (`processo`) | Ferramenta (`ferramenta`) | $v_c$ Mín (`m/min`) | $v_c$ Máx (`m/min`) | $v_c$ Mín (`SFM`) | $v_c$ Máx (`SFM`) | Observações (`observacoes`) |
|---|---|:---:|:---:|:---:|:---:|---|
| **Torneamento (desbaste)** | HSS (M2) | 20 | 25 | 66 | 82 | Aço 1045 normalizado (~180-210 HB). Valores conservadores para boa vida de ferramenta. |
| **Torneamento (acabamento)** | HSS (M2) | 25 | 30 | 82 | 98 | Acabamento com menor avanço; manter rigidez para evitar vibração. |
| **Torneamento (desbaste)** | Metal duro revestido (TiAlN/TiCN, ISO P20-P30) | 130 | 200 | 426 | 656 | Faixa inicial recomendada; subir conforme estabilidade da máquina e fixação. |
| **Torneamento (acabamento)** | Metal duro revestido (TiAlN/TiCN, ISO P20-P25) | 180 | 260 | 590 | 853 | Para Ra melhor; ajustar avanço e profundidade para acabamento. |
| **Fresamento (desbaste)** | HSS (M2) | 18 | 24 | 59 | 79 | Fresa HSS em 1045; manter ap moderado e bom refrigerante. |
| **Fresamento (acabamento)** | HSS (M2) | 24 | 30 | 79 | 98 | Acabamento com menor ap ae; evitar vibração em saliências. |
| **Fresamento (desbaste)** | Metal duro revestido (fresa inteira ou pastilhada, TiAlN) | 100 | 180 | 328 | 590 | Faixa segura para 1045 normalizado; subir conforme rigidez e refrig. |
| **Fresamento (acabamento)** | Metal duro revestido (fresa inteira ou pastilhada, TiAlN) | 150 | 220 | 492 | 722 | Para melhor acabamento superficial; reduzir avanço por dente. |
| **Furação** | Broca HSS (118-135 graus) | 20 | 28 | 66 | 92 | 1045 normalizado; usar refrigerante e evitar avanços excessivos. |
| **Furação** | Broca de metal duro (inteira ou com ponta de carboneto) | 80 | 130 | 262 | 426 | Para furos mais profundos e maior produtividade; exigir rigidez e bom fixador. |
| **Mandrilamento** | Barra de mandrilar com pastilha de metal duro | 120 | 170 | 394 | 558 | Ajustar conforme diâmetro e comprimento da barra; reduzir em barras longas. |

---

## 3. Dados Estruturados para Consumo por Código (JSON de Referência)

Estrutura pronta para ser consumida por módulos de cálculo, validação de limites ou tabelas de consulta interna:

```json
[
  {
    "processo": "Torneamento (desbaste)",
    "ferramenta": "HSS (M2)",
    "vc_m_min_min": 20,
    "vc_m_min_max": 25,
    "vc_sfm_min": 66,
    "vc_sfm_max": 82,
    "observacoes": "Aco 1045 normalizado (~180-210 HB). Valores conservadores para boa vida de ferramenta."
  },
  {
    "processo": "Torneamento (acabamento)",
    "ferramenta": "HSS (M2)",
    "vc_m_min_min": 25,
    "vc_m_min_max": 30,
    "vc_sfm_min": 82,
    "vc_sfm_max": 98,
    "observacoes": "Acabamento com menor avanco; manter rigidez para evitar vibracao."
  },
  {
    "processo": "Torneamento (desbaste)",
    "ferramenta": "Metal duro revestido (TiAlN/TiCN, ISO P20-P30)",
    "vc_m_min_min": 130,
    "vc_m_min_max": 200,
    "vc_sfm_min": 426,
    "vc_sfm_max": 656,
    "observacoes": "Faixa inicial recomendada; subir conforme estabilidade da maquina e fixacao."
  },
  {
    "processo": "Torneamento (acabamento)",
    "ferramenta": "Metal duro revestido (TiAlN/TiCN, ISO P20-P25)",
    "vc_m_min_min": 180,
    "vc_m_min_max": 260,
    "vc_sfm_min": 590,
    "vc_sfm_max": 853,
    "observacoes": "Para Ra melhor; ajustar avanco e profundidade para acabamento."
  },
  {
    "processo": "Fresamento (desbaste)",
    "ferramenta": "HSS (M2)",
    "vc_m_min_min": 18,
    "vc_m_min_max": 24,
    "vc_sfm_min": 59,
    "vc_sfm_max": 79,
    "observacoes": "Fresa HSS em 1045; manter ap moderado e bom refrigerante."
  },
  {
    "processo": "Fresamento (acabamento)",
    "ferramenta": "HSS (M2)",
    "vc_m_min_min": 24,
    "vc_m_min_max": 30,
    "vc_sfm_min": 79,
    "vc_sfm_max": 98,
    "observacoes": "Acabamento com menor ap ae; evitar vibracao em saliencias."
  },
  {
    "processo": "Fresamento (desbaste)",
    "ferramenta": "Metal duro revestido (fresa inteira ou pastilhada, TiAlN)",
    "vc_m_min_min": 100,
    "vc_m_min_max": 180,
    "vc_sfm_min": 328,
    "vc_sfm_max": 590,
    "observacoes": "Faixa segura para 1045 normalizado; subir conforme rigidez e refrig."
  },
  {
    "processo": "Fresamento (acabamento)",
    "ferramenta": "Metal duro revestido (fresa inteira ou pastilhada, TiAlN)",
    "vc_m_min_min": 150,
    "vc_m_min_max": 220,
    "vc_sfm_min": 492,
    "vc_sfm_max": 722,
    "observacoes": "Para melhor acabamento superficial; reduzir avanco por dente."
  },
  {
    "processo": "Furacao",
    "ferramenta": "Broca HSS (118-135 graus)",
    "vc_m_min_min": 20,
    "vc_m_min_max": 28,
    "vc_sfm_min": 66,
    "vc_sfm_max": 92,
    "observacoes": "1045 normalizado; usar refrigerante e evitar avancos excessivos."
  },
  {
    "processo": "Furacao",
    "ferramenta": "Broca de metal duro (inteira ou com ponta de carboneto)",
    "vc_m_min_min": 80,
    "vc_m_min_max": 130,
    "vc_sfm_min": 262,
    "vc_sfm_max": 426,
    "observacoes": "Para furos mais profundos e maior produtividade; exigir rigidez e bom fixador."
  },
  {
    "processo": "Mandrilamento",
    "ferramenta": "Barra de mandrilar com pastilha de metal duro",
    "vc_m_min_min": 120,
    "vc_m_min_max": 170,
    "vc_sfm_min": 394,
    "vc_sfm_max": 558,
    "observacoes": "Ajustar conforme diametro e comprimento da barra; reduzir em barras longas."
  }
]
```

---

## 4. Diretrizes para o Código e Status da Base

1. **Consulta Centralizada:**
   * O código que realizar cálculos de rotação ($n = 1000 \cdot v_c / (\pi \cdot D)$) ou validação de faixas para o material SAE/AISI 1045 deve referenciar este documento como a verdade canônica das faixas admissíveis.
   * Não embutir valores avulsos (*magic numbers*) espalhados em componentes de UI ou cálculos de backend.
2. **Tratamento de Alertas e Limites:**
   * Conforme a diretriz de produto (`E0 §3.3`), valores fora da faixa recomendada disparam avisos ou alertas orientativos ao operador, mas nunca recusam o cálculo nem bloqueiam a digitação.
3. **Pêndencia Bibliográfica:**
   * Caso a interface exponha metadados de proveniência de dados técnicos para auditoria ou catálogo, o material SAE/AISI 1045 deve constar com status de fonte externa **pendente/não atribuída**, distinguindo-se das faixas com catálogos específicos já validados em outras rodadas (ex.: R4, R8, R9).
