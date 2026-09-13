# Plano — corpus de dados da indústria CNC (etapa 0: inventário)

## Contexto

O Mestre quer virar **fornecedor confiável de dado técnico da indústria CNC** — tabelas de rosca,
constantes de material (kc1.1, mc), faixas de velocidade, geometria de ferramenta — hoje espalhadas
por cinco projetos, em formatos que vão de `.ts` validado a `.xlsx` de chão de fábrica. O destino é
um repo próprio (`dados-industria-cnc`), consumido por Fenix, ToolOptimizer, OrcaCNC e o que vier,
com **procedência por valor** (fonte, edição, página, licença, confiança) e o corte entre dado
**calculável** (gerado por fórmula normativa, verificável) e dado **empírico** (só citável).

Antes de desenhar esquema ou mover arquivo, é preciso saber o que existe. Esta etapa **não move,
não copia e não decide** — produz um relatório de inventário com conflitos sinalizados. O que entra
no repo é decisão do Mestre, na etapa seguinte.

## O que já foi localizado (varredura preliminar, read-only)

| Camada | Onde | O que tem | Estado |
|---|---|---|---|
| **A — validado** | `Fenix/Docs_inicial/canonicos/` (6 docs) + `pesquisa/R1–R6` | Kienzle, velocidades/avanços, geometria, deflexão/vida, limites, ferramentas/substratos — já com rótulo de confiança e fonte por afirmação | Melhor material existente. É a régua |
| **B — estruturado** | `ToolOptimizerCNC/src/data/materials.ts` (141 l.), `tools.ts` (42 l.) | `kc1_1`, `mc`, `vcRanges` por operação, dureza, grupo ISO — 8+ materiais | Cita fonte no cabeçalho: `docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md` (24 KB) e `PRD_Velocidades_Corte_CNC.md` (23 KB) |
| **C — bruto** | `monetizaCNC/ativos/docs_usinagem/_entrada/` (~40 arquivos) | `Roscas.xlsx`, 3 tabelas de rosca para furo, brocas Guhring/Temax/metal duro, parâmetros CAB50 BT40/BT50, fresa alto avanço 2738, alargador, esférica acab/semi | Ouro de chão de fábrica, **sem procedência e não validado**. Binário (xlsx/pdf/docx/png) |
| **D — adjacente** | `OrcaCNC/src/domain/calculation/`, `domain/models/` | `material-peso.ts`, `motor.ts`, `material.ts` — densidade, potência, custo | Escopo a confirmar (ver pergunta) |
| **E — verificar** | `MestreCNC/`, `Sistema_verificador_codigos_cnc/` | Provavelmente só código G / skills, sem dado técnico | Confirmar e descartar em 1 varredura |

**Conflito já visível:** `materials.ts` fixa `Aço 1020 → kc1.1 = 1800, mc = 0,17` como valor único;
os canônicos do Fenix tratam kc1.1/mc como **faixa com incerteza declarada**. Um dos dois está
errado sobre a natureza do dado — é o primeiro item do relatório.

**Sinal de decadência já visível:** `DADOS_TECNICOS_KIENZLE_E_VC.md` existe em duas cópias
(`docs/` e `docs/technical/`), tamanhos diferentes (23,3 KB × 24,0 KB). Fonte duplicada e divergente
é exatamente o problema que o repo único resolve.

## Escopo desta etapa

1. **Varredura dirigida** dos 6 projetos, por todo dado técnico da indústria — **decisão do Mestre:
   escopo amplo**, três blocos: (a) **corte** — rosca, kc1.1/mc, faixas de vc, geometria de
   ferramenta; (b) **custo/produção** — densidade, potência de motor, tempo e preço (OrcaCNC);
   (c) **código G** — tabelas Fanuc e manuais de programação (monetizaCNC). Fora: documento de
   processo, marketing e código de aplicação. Grep-first, sem abrir o que o nome já descarta.
   O bloco (c) é o de **pior risco de licença** de todo o acervo (manual de fabricante) — entra no
   inventário catalogado e marcado, e a decisão de publicar ou não fica para a etapa de esquema.
2. **Catálogo por artefato:** caminho, formato, o que contém, volume aproximado, procedência
   declarada (ou "ausente"), licença aparente, e a camada (A–E acima).
3. **Catálogo por assunto** — a visão que interessa: *rosca*, *constantes de material*, *faixas de
   velocidade*, *geometria de ferramenta*, *densidade e potência*, *custo e tempo*, *código G*.
   Para cada um: quantas fontes,
   quais concordam, quais divergem, qual tem procedência.
4. **Lista de conflitos**, com o valor de cada lado e o arquivo onde está. Nenhum arbitrado.
5. **Triagem calculável × empírico** — marcar o que pode ser **gerado por fórmula normativa** (rosca
   ISO/métrica em primeiro lugar) em vez de copiado, que é o que resolve o risco de direito autoral
   sobre tabela de norma.
6. **Risco de licença por artefato:** tabela de fabricante, trecho de norma, e o que é medição
   própria do Mestre (a única que ele pode publicar sem pedir licença a ninguém).

**Fora desta etapa:** criar o repo, definir esquema, mover ou converter arquivo, resolver conflito,
extrair conteúdo de binário célula a célula.

**Suposição declarada:** os `.xlsx/.pdf/.docx` da camada C entram no inventário **pelo nome, aba e
cabeçalho** — extração completa do conteúdo é cara e vira etapa própria, depois de o Mestre decidir
quais valem. Se estiver errado, avisa.

## Entrega

Arquivo único: `Fenix/Docs_inicial/INVENTARIO_DADOS_INDUSTRIA.md` — mora no Fenix por enquanto
porque o repo de destino ainda não existe; migra na etapa seguinte.

Estrutura: resumo em 5 linhas · tabela por artefato · tabela por assunto · lista de conflitos ·
tabela de risco de licença · recomendação do que entra na primeira leva do repo, ordenado por
(valor × baixo risco de licença).

## Verificação

- Todo caminho citado no relatório existe (`test -f` em lote sobre a lista final).
- Todo conflito listado traz os dois valores e os dois arquivos — nenhum "parecem divergir".
- Nenhum arquivo dos outros projetos foi modificado: `git status` limpo em `ToolOptimizerCNC`,
  `OrcaCNC` e `monetizaCNC` ao fim.
- Contagem por assunto fecha com a contagem por artefato.

## Etapas seguintes (não fazem parte desta)

1. Esquema + campos de procedência, decidido sobre o que o inventário achou.
2. Criar `dados-industria-cnc`; migrar a camada A (canônicos do Fenix) como primeira leva.
3. Gerador de rosca por fórmula normativa, com teste contra amostra publicada.
4. Skill de auditoria de dataset (procedência ausente, série que quebra monotonia, duplicata entre
   projetos, constante órfã).
5. Skill de auditoria de documento — as 5 verificações já desenhadas.
