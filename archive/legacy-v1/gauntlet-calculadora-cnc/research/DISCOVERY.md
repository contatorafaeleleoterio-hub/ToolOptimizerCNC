# Discovery — conclusões

> Só conclusões. O caminho até elas está no plano `docs/plans/PLAN_GAUNTLET_CALCULADORA_CNC.md`.
> Data: 12/08/2026

## 1. Estado real do produto

| Achado | Consequência para a arquitetura |
|---|---|
| `Ferramenta.tipo` é union de 3 strings (`topo\|toroidal\|esferica`) em `src/types/index.ts:40` e **não entra em nenhum cálculo** — serve só para nomenclatura | O tipo de ferramenta precisa virar entidade com **capabilities**, não rótulo |
| **Material da ferramenta não existe no domínio.** Nenhum campo, nenhum fator | É o eixo faltante mais caro. HSS × metal duro = 3–5× em Vc. Vira multiplicador de primeira classe |
| `vcRanges` dos 9 materiais são implicitamente **para metal duro** | Para HSS, dividir pelo fator. Explicitar a premissa na UI |
| `mc` (expoente de Kienzle) existe em `Material` mas **nunca é usado** — `calcular()` trata `kc = kc1_1` como constante | O mockup usa Kienzle correto: `kc = kc1_1 · hm^(−mc)`. Corrige um erro real do produto |
| Motor é função pura, sem estado (`src/engine/`) | A arquitetura por família cabe sem refactor do motor: cada família é um novo módulo puro |
| Avanço é sempre por **dente** (`fz·z·n`) | Furar, roscar e mandrilar usam avanço por **rotação** (`f·n`). O modelo de dados precisa dos dois |

## 2. Taxonomia adotada

Três eixos ortogonais. O terceiro é o novo.

```
FAMÍLIA          TIPO DE FERRAMENTA           MATERIAL DA FERRAMENTA
Fresar    ×      inteiriça / cabeçote   ×     HSS · HSS-Co · Metal duro · MD c/ pastilha
Furar            broca / U-drill / alargador
Roscar           macho (corte / formador)
Mandrilar        barra / cabeçote ajustável
Rápido           — (agnóstico)
```

**Fator de Vc por material da ferramenta** (multiplicador sobre a faixa do material da peça, que é base metal duro):

| Material da ferramenta | Fator | Origem |
|---|---|---|
| HSS | **0,29** (÷3,5) | carbide roda 3–5× HSS (AIMS, BrightHub) |
| HSS-Co (cobalto) | **0,37** (÷2,7) | ~30 % acima do HSS comum |
| Metal duro inteiriço | **1,00** | base — é o que os `vcRanges` do projeto já assumem |
| Metal duro c/ pastilha revestida | **1,25** | revestimento e troca rápida de aresta permitem mais |

## 3. Decisão sobre as candidatas pesquisadas

| Candidata | Decisão | Motivo |
|---|---|---|
| **Macho formador (roll tap)** | **Entra**, como variante do macho | Furo prévio é **maior** (`Ø ≈ D − P/2`), não menor. Erro clássico e caro. Custo: um radio button |
| **Alargador (reamer)** | **Entra**, como ferramenta em Furar | Regra invertida (Vc menor, avanço maior) que quem não sabe erra |
| **Broca de centro / escareador** | **Fora do mockup** | Cálculo idêntico ao da broca; não exercita nada novo da arquitetura |
| **Fresa de rosca** | **Fora do mockup**, prevista na arquitetura | Correção de raio (avanço no centro ≠ periferia) é prioridade 2 no doc canônico e infla o escopo sem testar o eixo novo |

## 4. Escopo final do mockup

**5 famílias · 9 tipos de ferramenta · 4 materiais de ferramenta · 9 materiais de peça.**

Fresar: inteiriça MD (topo/toroidal/esférica) · inteiriça HSS · cabeçote c/ pastilhas
Furar: broca MD · broca HSS/HSS-Co · U-drill · alargador
Roscar: macho (corte / formador, HSS ou MD)
Mandrilar: barra / cabeçote ajustável
Rápido: agnóstico de ferramenta

## 5. Design

Tokens vêm de `src/index.css` (valores reais, não do `UI_DESIGN_SPEC_FINAL.md`, que está desatualizado — prescreve 3 colunas, o código entrega 2).

**Não replicar** a dívida catalogada em `docs/_canonicos/DESIGN-SYSTEM.html` §18: segundo ciano no LCD (`rgba(0,229,255,.12)`) e paleta de gauge (`#00E676/#FFA500/#FF4D4D`) separada da paleta do semáforo (`#2ecc71/#f39c12/#e74c3c`). No mockup existe **uma** paleta de estado.

**Fora do escopo do mockup:** `docs/_canonicos/Design_system_referencia/` é DS de outro projeto (FlowNC — IBM Plex, azul/laranja). Serve de molde estrutural, nenhum valor visual se aplica.
