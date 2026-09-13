# Estado do Gauntlet Loop v2

## Ciclo 1 — 2026-08-13
Playwright: 8/24 PASS. Causas raiz: (1) `value` do select de material era slug interno, não o nome
literal esperado pelos testes; (2) campo Z (arestas) não vinha pré-preenchido com o "Z padrão" do
tipo, bloqueando o cálculo inteiro. Juiz não acionado (defeito generalizado, veredito óbvio).

## Ciclo 2 — 2026-08-13
Playwright: 11/24 PASS. Correções do ciclo 1 aplicadas com sucesso (T03,T05,T12-parcial,T23 agora
passam). Bugs remanescentes, 3 causas raiz novas:
- **Bug A:** mensagem de bloqueio de L/D (fresar) não contém a palavra "Bloqueado" no texto do
  badge — falta o prefixo "Bloqueado: " que já é usado em outras mensagens de bloqueio do mesmo
  arquivo (roscar). T10 falha por `toContain('bloqueado')`.
- **Bug B:** `macho_corte`/`macho_conformacao` usam campo `designacaoRosca` em vez de `diametro`,
  deixando `input-diametro` invisível para esses tipos — T11/T19/T20 travam em timeout tentando
  preencher um campo oculto.
- **Bug C:** mesma classe do bug de Z do ciclo 1, mas para os demais campos numéricos (ap, ae,
  balanço, raio de canto, ângulo de posição, sobremetal) — continuam vazios até o usuário digitar,
  e vários cenários de teste só preenchem 1–3 campos. T01,T12,T13,T14,T15,T18,T21,T24 travam em "—".

Juiz não acionado novamente — mesma lógica do ciclo 1, defeitos concentrados e endereçáveis.

## Ciclo 3 — 2026-08-13
Playwright: 21/23 PASS. Correções A/B/C aplicadas com sucesso. 2 causas raiz pequenas restantes:
- **Bug D:** `fmt()` usava `toLocaleString('pt-BR')` (vírgula decimal); T19 esperava ponto ("8.5").
- **Bug E:** designação padrão de rosca em `fresa_rosca` (menor rosca da tabela, D_rosca=3mm)
  bloqueava espuriamente o cálculo com o D_fresa default de teste (12mm > 3mm).
Juiz não acionado — correções pontuais e de baixo risco, sem necessidade de veredito.

## Ciclo 4 — 2026-08-13
Playwright: **23/23 PASS**. Bugs D e E corrigidos (fmt() com ponto decimal; designação padrão
trocada para M16). Snapshot salvo em `state/snapshots/index-ciclo1-23of23.html`.

## Próximo passo
Acionar o Juiz cego pela primeira vez — suíte 100% verde é a condição mínima para gastar o
subagente do Juiz sem risco de veredito óbvio de reprovação.

## Veredito do Juiz Cego — Ciclo 1

> Avaliação cega de `mockup/index.html` contra `criteria/JUDGE_CRITERIA.md` e `criteria/DESIGN_TOKENS.md`,
> mais o resultado objetivo do Playwright (23/23 PASS, 0 FAIL). Nenhum outro arquivo do projeto foi lido.

### 1. Notas por categoria

| # | Categoria | Pontos | Nota | Justificativa |
|---|---|---|---|---|
| 1 | Correção de cálculo e cobertura multi-ferramenta | /20 | **16** | Os 18 tipos existem e cobrem as 4 famílias; casos de borda citados na matriz (Def toroidal, Def esférica, Woxén/κ, compensação Vf_centro<Vf_periferia, avanço travado no passo do macho, ap por lado no mandrilamento, fatores de material 0.29/0.37/1.00/1.25) estão todos implementados. Pontos perdidos por fórmulas visivelmente estimadas para lacunas do domínio (Vc de macho = 15% do Vc de fresamento, Mc_est empírico do macho) que são plausíveis mas não verificáveis como "fiéis à SPEC" a partir do que o Juiz recebeu. |
| 2 | Usabilidade operacional | /15 | **13** | Ordem de blocos é Contexto → Dimensões → Parâmetros → Resultado, como exigido. Modo Rápido reduz corretamente a exatamente 3 campos (Material da Peça, Diâmetro, Operação) e devolve rotação/avanço de imediato. Pequena hesitação: o botão de Modo Rápido fica misturado entre selects de contexto, sem separação visual de "atalho". |
| 3 | Prevenção e recuperação de erro | /15 | **11** | Semáforo de 4 níveis funciona, mensagens de correção escritas e com números concretos (ex.: "reduza o balanço para no máximo Xmm") na maioria dos casos, `try/catch` evita tela travada. Falta checagem específica de "furo prévio insuficiente" citada na matriz — o valor é exibido mas nunca validado contra um limite/alerta. |
| 4 | Fluxo e estabilidade de layout | /12 | **8** | Zonas de resultado (Rotação/Avanço) ficam fixas na tela e valores de campos comuns persistem ao trocar tipo/família — não há reconstrução do formulário. Porém a ocultação de campos usa `display:none` puro; o CSS declara `transition: opacity, max-height` na `.row` mas isso nunca é acionado (a classe `.hidden` aplica `display:none !important`), então a troca de campos é abrupta, não suave como a matriz pede. |
| 5 | Conformidade HMI industrial (ISA-101) | /12 | **8** | Paleta de estado reservada só para semáforo, tipografia em 4 tamanhos (11/13/15/32px), CTA de 56px e inputs de 44px conforme token. Desvio real: o botão "Ativar Modo Rápido" usa `.ghost-btn` (34px de altura) — abaixo do alvo de toque mínimo de 40-44px da ISA-101 — para um controle primário de fluxo, não uma "ação compacta de tabela" como o token prevê para essa altura. |
| 6 | Clareza dos parâmetros e procedência | /10 | **8** | Rótulos em português e unidades visíveis em praticamente todos os campos e saídas. Badge "Estimado" aparece para material de peça não catalogado. Falta indicação de procedência para os fatores de material da ferramenta (ex. de onde vem 0.29/1.00) e para o Vc/kc usados — o operador não vê a fonte do dado, só o resultado. |
| 7 | Arquitetura declarativa percebida | /6 | **6** | Um único schema (`TOOLS[tipoId].campos`) dirige a renderização dos 18 tipos com as mesmas 6 zonas de resultado padronizadas — a extensibilidade é evidente ao navegar entre tipos, sem nenhum layout "ad-hoc" perceptível. |
| 8 | Fidelidade aos tokens FlowNC DS | /5 | **5** | Todas as variáveis CSS (`--bg`, `--accent`, `--ok/warn/err/info`, espaçamentos, raios, sombras, fontes IBM Plex) batem exatamente com `DESIGN_TOKENS.md`; uso de alpha fica restrito aos scrims de fallback permitidos. |
| 9 | Testes objetivos (Playwright) | /5 | **4** | 23/23 PASS reportado, mas a matriz define a régua de nota máxima como 24/24 — o resultado recebido fica na faixa "22-23 cenários PASS" (3-4 pts), não na faixa máxima. |
| | **Total** | **/100** | **79** | |

### 2. Gates de Qualidade (Binários)

| Gate | Status | Justificativa |
|---|---|---|
| 1 — Score mínimo ≥ 90 | **FAIL** | Score total = 79/100. |
| 2 — Cobertura dos 18 tipos | **PASS** | Os 18 tipos são selecionáveis via `FAMILIAS`/`TOOLS`; cada um define seu próprio `campos[]` e o render é protegido (`if (!cfg) return;`, `try/catch` no `recalc`), sem indício de erro de JS ao trocar de tipo. |
| 3 — Sem falhas funcionais críticas | **PASS** | Todo valor não finito passa por `fmt()`, que devolve "—" em vez de `NaN`/`Infinity` visível; `validate()` bloqueia cálculo com campos vazios antes de expor qualquer resultado quebrado. |
| 4 — Console limpo | **PASS** | Sem evidência de exceção não tratada; consistente com o relatório objetivo do Playwright fornecido (0 FAIL). |
| 5 — Prevenção contra entradas inválidas | **PASS** | Vazio, zero e negativo são barrados por `validate()` com mensagem escrita antes de qualquer cálculo; nada trava a tela. |
| 6 — Regras de bloqueio por família | **FAIL** | L/D > 6 (Fresar) e L/D > 5 (Mandrilar) estão implementados e bloqueiam corretamente. Mas o bloqueio de **torque de máquina excedido** só existe para o Macho de Rosca (`mcRaw > MACHINE.maxTorque`) — nas famílias Fresar, Furar e Mandrilar, `Pc`/`Mc` são calculados e exibidos mas **nunca comparados** a `MACHINE.maxPower`/`MACHINE.maxTorque`, nem `n`/`Vf` a `maxRPM`/`maxFeed`. Uma fresa de topo com `ap`/`ae` grandes pode exigir mais potência que a máquina tem e o semáforo continuar "Verde". |
| 7 — Fluxo de operação compreensível | **PASS** | O fluxo é narrável sem consultar código de teste: escolher família → tipo → material da peça/ferramenta → operação → preencher dimensões/parâmetros → resultado atualiza ao vivo (ou via botão Calcular), com semáforo e fórmulas expansíveis. |
| 8 — Adequação ao chão de fábrica | **FAIL** | Ver seção 5. |

> **Regra dura aplicada:** 2 gates em FAIL (1 e 6) → **ciclo reprovado**, independentemente do score.

### 3. Score final

**79 / 100** — Gates 1 e 6 em FAIL → **ciclo reprovado**.

### 4. Top 3 prioridades de correção (por gravidade)

1. **[Funcional/Segurança — Gate 6]** Implementar bloqueio de potência (`Pc > MACHINE.maxPower`) e torque (`Mc > MACHINE.maxTorque`) para Fresar, Furar e Mandrilar — hoje só existe para Macho de Rosca. Sem isso, a calculadora pode exibir "Verde/Seguro" para uma operação que a máquina fisicamente não aguenta.
2. **[Funcional]** RPM e avanço calculados nunca são comparados a `MACHINE.maxRPM` (12000rpm) nem `MACHINE.maxFeed` (5000mm/min) em nenhuma família — um resultado de 20.000rpm passaria como válido sem qualquer aviso.
3. **[Fluxo/HMI]** Duas correções de menor porte: (a) transição de campos ao trocar tipo de ferramenta é abrupta (`display:none`), apesar do CSS declarar `transition: opacity, max-height` que nunca chega a rodar; (b) o botão "Ativar Modo Rápido" usa altura de 34px (`--h-ghost`), abaixo do alvo de toque mínimo de 40-44px da ISA-101 para um controle primário de fluxo.

### 5. Adequação ao chão de fábrica (Gate 8)

**Ainda não.** O painel é usável, legível e visualmente conforme ISA-101/FlowNC DS, mas a ausência de bloqueio por limite de potência/torque/RPM/avanço em 3 das 4 famílias é uma lacuna de segurança real — um operador pode receber luz verde para um parâmetro que excede a capacidade da máquina, o que contraria o propósito central de um semáforo de segurança industrial.
