# Plano — Motor da Calculadora Multi-Ferramenta (aplicar na codificação real)

> **Status:** documento de especificação. Nada aqui é executado agora.
> **Item do backlog:** 18.
> **Quando aplicar:** quando a codificação das funções do sistema real começar — isto é, quando a
> calculadora multi-ferramenta sair do mockup e entrar em `src/`.
> **Por que existe:** o loop de refactor visual (item 17) congela o motor de propósito. Tudo que
> exige mexer em cálculo foi separado para cá, para não contaminar a blindagem daquele loop.
> **Regra que continua valendo:** *No Invention*. Nenhum número entra sem fonte citada linha a
> linha. Onde falta fonte, este documento diz explicitamente **o que falta** em vez de chutar.

---

## 0. Defeitos do motor encontrados na auditoria (corrigir junto)

Auditoria de 13/08/2026 sobre `gauntlet-calculadora-cnc-v2/mockup/index.html`. São defeitos reais,
não preferências:

| Defeito | Onde | Consequência |
|---|---|---|
| `computeDrilling` lê `Z` (nº de arestas) e **nunca usa** | `:863` | Campo pedido ao operador em escareador e alargador sem efeito nenhum. Furação usa avanço por rotação, não por dente — `Z` só faz sentido em fresamento |
| `computeDrilling` lê `sobremetal` e **nunca usa** | `:867` | Idem, no alargador. O sobremetal deveria influenciar avanço e acabamento |
| `profundidadeH` **nunca é lido** | declarado em `:514` e `:517` | Broca de centro e escareador pedem profundidade que não entra em conta |
| Broca de centro não tem campo de comprimento | `TOOLS.broca_centro.campos` (`:514`) | `tempo` sai `NaN` → a tela mostra `—`. O campo que existe (`profundidadeH`) é o que deveria alimentar o tempo |
| `refrigInterna` **nunca é lido** | declarado em `:512` | Ver §5 — deveria ser fator de verdade |

Os cinco campos saem da tela no loop de refactor (não faz sentido pedir dado que não é usado).
**Voltam aqui como entrada de verdade**, ligada ao cálculo.

---

## 1. Deflexão real em µm — substitui o L/D como comunicação

Hoje o operador lê *"L/D = 5, cuidado"*. Deveria ler *"a ferramenta vai fletir 38 µm e sua
tolerância é 20 µm"*. L/D é proxy; deflexão é o efeito.

**Modelo:** viga engastada com carga na ponta.

```
δ = (F · L³) / (3 · E · I)        I = π · De⁴ / 64
```

| Símbolo | Significado | Origem |
|---|---|---|
| `δ` | deflexão na ponta (mm → exibir em µm) | saída |
| `F` | força radial de corte (N) | derivada de Kienzle, ver abaixo |
| `L` | balanço da ferramenta (mm) | campo `balanco`, já existe |
| `E` | módulo de elasticidade (MPa) | **falta fonte** — ver pendências |
| `De` | diâmetro efetivo da haste (mm) | **falta regra** — ver pendências |

**Força:** o motor já calcula `kc = kc1.1 · h^(−mc)` (Kienzle) e a partir dele `Pc`. A força
tangencial sai de `Fc = kc · A` (área de cavaco). A força **radial** é uma fração de `Fc` que
depende do engajamento.

**Pendências antes de implementar** (nenhuma pode ser chutada):

1. **`E` do metal duro e do HSS.** A ordem de grandeza é conhecida (metal duro na casa de
   500–650 GPa, HSS na casa de 200–210 GPa), mas o valor que entrar precisa vir de catálogo ou
   norma citada, com a liga identificada — a variação entre graus de metal duro é grande demais
   para um número redondo.
2. **Regra de `De`.** A parte cortante tem canais, então o diâmetro resistente é menor que o
   nominal. A prática de catálogo usa uma fração do nominal, e ferramenta com haste cilíndrica tem
   dois trechos com diâmetros diferentes (haste + parte cortante), o que pede viga escalonada e não
   viga simples. Definir qual das duas abordagens entra, com fonte.
3. **Razão `Fr/Fc`.** Depende do ângulo de engajamento e da geometria. Precisa de fonte por família.
4. **Tolerância da peça** vira campo novo no bloco Contexto (µm ou mm). É o que dá sentido ao
   número — sem ela a deflexão é curiosidade, não decisão.

**O que muda na UI:** o semáforo passa a comparar `δ` com a tolerância. O bloqueio por L/D
**continua existindo** como rede de segurança independente — deflexão substitui o L/D na
*comunicação*, não na *proteção*.

---

## 2. Vida de ferramenta — equação de Taylor

Diferencial técnico do HSMAdvisor (R$ 825+, em inglês). Dá para entregar a parte que importa sem
nenhum dado novo.

```
V · Tⁿ = C          →          T = T_ref · (Vc_ref / Vc)^(1/n)
```

**Forma relativa (implementável já, sem dado novo):** comparando o `Vc` escolhido pelo operador com
o `Vc` recomendado da tabela, a razão de vida sai só com `n`:

```
T / T_ref = (Vc_ref / Vc)^(1/n)
```

Com `n = 0,25` (metal duro), subir o `Vc` em 20% dá `(1/1,2)⁴ ≈ 0,48` — **a vida cai pela metade**.
Com `n = 0,125` (HSS) o efeito é ainda mais violento: `(1/1,2)⁸ ≈ 0,23`.

Isso liga direto no slider de `Vc` do ajuste fino: ao empurrar o `Vc`, o operador vê o preço.

**Forma absoluta ("dura X minutos"):** exige saber a que vida útil os `vcRanges` da tabela se
referem. Catálogo costuma publicar `Vc` para uma vida-alvo declarada. Enquanto esse `T_ref` não
estiver documentado por material, **fica só a forma relativa** — que já é honesta e útil.

**Pendências:** valores de `n` por material de ferramenta com fonte citada (HSS, HSS-Co, metal duro,
metal duro revestido, cerâmica); e `T_ref` por linha da tabela de materiais, se for buscar a forma
absoluta.

---

## 3. Custo e tempo por peça

É o número que o dono da oficina compra — nenhum concorrente brand-agnostic entrega isso em
português.

```
t_corte  = L_percurso / Vf                          (min)
custo    = t_corte × (R$/h máquina + R$/h operador) / 60
         + custo_aresta × (t_corte / vida_aresta)
```

**O que falta no motor:** hoje `tempo` só existe em `computeDrilling` (`:902`) e sai `NaN` na broca
de centro. Precisa ser generalizado às quatro famílias, com o comprimento de percurso vindo da
geometria de cada uma.

**Entradas novas, no bloco Contexto** (não são dado de catálogo, são da oficina — o operador
informa uma vez): custo-hora de máquina, custo-hora de operador, custo por aresta.

**Depende de:** §2 na forma absoluta, para `vida_aresta`. Sem ela, entrega só tempo e custo de
hora-máquina — o que já vale.

---

## 4. Materiais: 12 → 30+

Maior buraco de credibilidade. Concorrentes anunciam 100–170 materiais; a base atual tem **9
verificados + 3 estimados**.

Não é tarefa de código, é de **extração com procedência**. Cada linha precisa de: `kc1.1`, `mc`,
dureza, faixa de `Vc` por operação, grupo ISO e **a fonte**. Linha sem fonte não entra — a
alternativa é inventar `kc1.1`, que é exatamente o que a regra proíbe.

Prioridade de cobertura por grupo ISO, do mais pedido para o menos: **P** (aço) → **M** (inox) →
**K** (ferro fundido) → **N** (alumínio) → **S** (superligas, titânio) → **H** (endurecidos).
Os buracos atuais são K e S, hoje cobertos por estimativa com badge.

Enquanto a linha for estimada, o badge `estimado` continua obrigatório na tela.

---

## 5. Refrigeração interna como fator de verdade

Sai da tela agora porque hoje é caixa de seleção que não faz nada. Volta quando fizer.

**Efeito esperado:** refrigeração interna evacua cavaco e resfria a aresta, o que permite furo mais
profundo sem ciclo pica-pau e admite avanço maior. Concretamente, deveria mexer em duas regras que
já existem:

- o limiar de `L/D > 3` que hoje dispara o aviso de pica-pau em `computeDrilling` (`:908`);
- o avanço `fn` calculado por `fnDefault` (`:857`).

**Pendência:** o novo limiar e o fator de avanço precisam de fonte de catálogo. É a diferença entre
uma regra e um palpite.

---

## 6. Camada de limite duro — separar recomendação de limite físico

Arquitetura, não dado. Hoje recomendação e limite moram no mesmo semáforo.

| Camada | Origem | Comportamento |
|---|---|---|
| **Recomendação** | tabela de material, operação, geometria | pode ser ignorada; ajustar é o trabalho do operador |
| **Limite físico** | perfil de máquina (rotação, potência, torque, avanço) + tolerância da peça + regras de bloqueio | **nunca é ultrapassado em silêncio** |

Passar por cima de um limite físico exige confirmação explícita, e o resultado carrega a marca de
que foi forçado. É a diferença entre uma ferramenta que avisa e uma que se responsabiliza — e
sustenta a Regra Crítica 6 do projeto: *o sistema RECOMENDA, o operador DECIDE*.

O perfil de máquina editável já entra no mockup do loop de refactor (o objeto `MACHINE` já é lido
em tempo de execução por `checkMachineLimits`). O que falta aqui é a **persistência** de múltiplos
perfis e a camada de override registrado.

---

## 7. Fontes empacotadas no app

Inter e JetBrains Mono servidos pelo próprio aplicativo em `woff2`, com `font-display: swap` e
subconjunto latino. Hoje vêm de CDN — numa oficina sem internet a tela abre com fonte errada e
salta o layout.

No mockup do loop isso é resolvido com pilha de fonte local (Segoe UI e Consolas existem de fábrica
nas máquinas Windows do chão de fábrica). No app real, empacotar é obrigatório.

Ver `docs/design/DS_TEMA_CLARO.md` §3.6.

---

## 8. Ordem sugerida

Dependência primeiro, credibilidade depois, sofisticação por último:

1. **Defeitos da §0** — campos lidos e não usados, tempo `NaN`. É correção, não feature.
2. **Camada de limite duro (§6)** — desbloqueia o resto e é onde mora a segurança.
3. **Materiais (§4)** — sem base, tudo em cima fica bonito e pouco confiável.
4. **Vida de ferramenta relativa (§2)** — barato, só precisa de `n`, e liga direto no slider de `Vc`.
5. **Custo e tempo (§3)** — o que o dono compra.
6. **Deflexão (§1)** — a de maior valor percebido e a que mais depende de fonte externa.
7. **Refrigeração interna (§5)** e **fontes empacotadas (§7)** — pequenos, entram junto com o que estiver aberto.

---

## 9. Fora de escopo, com motivo declarado

| Item | Por que não |
|---|---|
| **Análise de chatter / lóbulos de estabilidade** | Exige dados modais (FRF) da combinação máquina + fixação + ferramenta, que não temos e não dá para estimar. Seria chute com aparência de ciência — o oposto do posicionamento de auditabilidade |
| **Catálogo de ferramentas por aprendizado de máquina** | O G-Wizard tem 250+ catálogos e uma década de dados. Não temos base para treinar nem para validar |
| **Micro-otimização do cálculo** | 12 materiais × 18 tipos resolve em microssegundos. Otimizar ali é teatro. O que merece atenção de desempenho é partida, offline e tempo até o primeiro resultado |

---

## 10. Relação com os outros documentos

| Documento | Papel |
|---|---|
| `docs/specs/SPEC_CALCULADORA_MULTI_FERRAMENTA.md` | o quê — arquitetura funcional e workflow por família |
| `docs/technical/DADOS_TECNICOS_KIENZLE_E_VC.md` | dados de material verificados hoje |
| `docs/design/DS_TEMA_CLARO.md` | como a tela apresenta o que este motor calcula |
| `docs/plans/PLAN_GAUNTLET_V2_REFACTOR.md` | o loop que congela este motor de propósito |
| `gauntlet-calculadora-cnc-v2/research/BUILD_CONTRACT.md` | as fórmulas 1–28 já implementadas e validadas |
