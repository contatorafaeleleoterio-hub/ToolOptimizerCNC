# Reconciliação de documentação — Fenix — 2026-08-29

**Veredito: REPROVADO** — 3 `BLOQUEIA`, 1 `AVISA`
**Modo:** varredura (sem `docs/fatos.yml`, sem frontmatter de procedência)
**Commit:** `c5ff25c`
**Skill:** `reconciliacao-documentacao` v1.0 — primeira execução no projeto

Todo drift desta rodada tem **uma causa única**: a R7 (29/08) trocou o alerta canônico do
esfregamento para o balanço, e a propagação parou em `mvp/` e `escopo/E4`. Quem repete o exemplo
fora desses dois arquivos ainda encena o alerta que a própria R7 declarou inalcançável.

---

## Escopo

**Lidos:** `mvp/MVP_CALCULADORA_PARAMETROS.md` §7.4, §7.6, §7.6.1, §9.2 (dono do exemplo) ·
`construcao/BRIEF_DESIGN_INTERFACE.md` §5.7–§5.9 · `canonicos/CANONICO_LIMITES_E_ALERTAS.md`
§1.1 e lacunas · `escopo/E4_INDICADORES_E_SEGURANCA.md` (conferido, está em dia).

**Fora, e por quê:**

| Fora | Motivo |
|---|---|
| `pesquisa/` (51 arquivos) | retorno cru e validação — histórico datado, não documento vivo |
| `AUDITORIA_*`, `CRITICA_*`, `ANALISE_*` | relatórios de data fixa; envelhecer é a função deles |
| `inicio_fenix/` | material de origem, congelado |
| `escopo/E0–E3`, `E5–E7`, demais canônicos | nada marcado pela varredura mecânica e nenhum repete o exemplo canônico |

**Limitação encontrada e corrigida durante a execução:** o `inventario.py` varria só `.md` e `.mdx`,
então as 5 folhas `.dc.html` do protótipo e o `design-system-fenix.html` saíram do inventário — foram
achados por grep dirigido, não pela máquina. A skill foi corrigida para varrer HTML também
(99 docs em vez de 91), e os números abaixo são da **re-execução**.

## Mecânico (Fases 1–2)

| Verificação | Resultado |
|---|---|
| Fatos (`docs/fatos.yml`) | **não configurado** — exit 2, não é reprovação |
| Docs vencidos | **não avaliável** — 0 de 99 docs têm procedência declarada |
| Links e caminhos relativos quebrados | **0** em 99 documentos, 38 984 linhas |
| Inventário | 99 docs (`.md` `.mdx` `.html`) · maior: `HANDOFF.md` (2 091 linhas) |

---

## Achados

```
[BLOQUEIA] Docs_inicial/construcao/BRIEF_DESIGN_INTERFACE.md:406  <->  Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md:1126 e :1392
  Tipo: doc-doc (dono: MVP_CALCULADORA_PARAMETROS.md §7.6)
  Doc diz: "ATENÇÃO — espessura de cavaco (hex) 0,018 mm, abaixo do piso de 0,030 mm"
           (único exemplo de mensagem de alerta do brief)
  Fonte:   o alerta canônico é o balanço — "L/D 4,5, acima do limiar de 4,0" (:1126); e o §9.2
           (:1392) fixou o piso em k × rβ com rβ = 10 µm, k 0,22–0,36 = 0,0022–0,0036 mm.
           Os 0,030 mm do brief são 10x o piso real, e o gatilho 1 não dispara na escala do §5.3
  Verificação: leitura das duas seções; git log -1 = c5ff25c
  Agravante: o §0 do brief (:15) declara "este documento não depende de nenhum outro. Tudo que o
           desenho precisa saber está aqui". O designer que obedecer a essa linha desenha o alerta errado
  Correção: trocar o exemplo do §5.8 pela mensagem da §7.6 (balanço) — diff proposto, não aplicado
```

```
[BLOQUEIA] Docs_inicial/construcao/BRIEF_DESIGN_INTERFACE.md:360  <->  Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md:1073 e §7.4:1044
  Tipo: doc-doc (dono: MVP_CALCULADORA_PARAMETROS.md §7.4)
  Doc diz: primeira direção = "Aumente a penetração de trabalho (ae) para 2,5 mm (hoje 1,0) ...
           a aresta volta a cortar em vez de esfregar"
  Fonte:   a primeira direção passou a ser "Reduza o balanco (L) para 40 mm (hoje 45)" (:1073), e
           o §7.4 exige que a direção que resolve o alerta venha primeiro. Com o alerta sendo o
           balanço, a direção do esfregamento perdeu o alerta que a justificava
  Verificação: leitura de BRIEF §5.7 e MVP §7.4/§7.6
  Nota: a segunda direção do brief (fz 0,085, "vibrar mais com o balanço atual") continua batendo
           com o dono — não é achado
  Correção: substituir a primeira direção do bloco de exemplo — diff proposto, não aplicado
```

```
[BLOQUEIA] Docs_inicial/canonicos/CANONICO_LIMITES_E_ALERTAS.md:58, :223, :225  <->  Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md:1392 + pesquisa/VALIDACAO_R7.md
  Tipo: doc-doc, com inversão de dono
  Doc diz: ":58 — Piso de espessura dispara quando hex < hmin, com hmin = 0,3 × rβ. O valor de rβ
           é estimativa declarada, não medida — ver L-16"
           ":223 — L-16 em aberto: raio de aresta 4–20 µm nesta rodada x 25–127 µm no registro anterior"
           ":225 — L-18 em aberto: a frequência de disparo do piso não foi verificada"
  Fonte:   a R7 fechou os dois (29/08): rβ de fresa inteiriça ~10 µm com consenso 3/3, k = 0,22–0,36,
           piso 2,2–3,6 µm, e o gatilho é praticamente inativo. Já escrito no MVP §9.2 e no E4 §1.3
  Verificação: grep -rn "R7" Docs_inicial/canonicos/ -> zero ocorrências
  Por que BLOQUEIA: quem implementar o gatilho lendo o canônico usa rβ do registro antigo (25–127 µm)
           e produz o falso positivo em trabalho normal que a R7 existiu para matar
  Inversão: o CLAUDE.md declara canonicos/ "a verdade técnica já validada", e ele está atrás do
           mvp/ e do escopo/. O documento derivado sabe mais que o dono
  Correção: propagar a R7 para o §1.1, fechar L-16 e L-18 — diff proposto, não aplicado
```

```
[AVISA] Docs_inicial/construcao/prototipo/{Main,Celular,Estados}.dc.html, painel-fenix.html,
        construcao/design-system-fenix.html  <->  Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md:1126
  Tipo: doc-doc (dono: MVP §7.6)
  Doc diz: 7 ocorrências de "0,018 mm / piso de 0,030 mm" encenando o alerta de esfregamento
  Fonte:   o alerta canônico é o balanço desde c5ff25c
  Verificação: grep -c "0,018 mm" por folha — Main 2, Celular 2, Estados 2, painel-fenix 1
  Por que AVISA e não BLOQUEIA: já está registrado no HANDOFF §39.5 como herança explícita da
           sessão de /design, com o item 13 da §35.4 de pé. Drift declarado não emboscada ninguém
  Correção: nenhuma agora — entra na revisão do protótipo, junto com os outros 18 itens
```

---

## Gate

| # | Condição | Resultado |
|---|---|---|
| 1 | Verificador de fatos verde | n/a — não há registro |
| 2 | Zero docs vencidos | n/a — nenhum doc declara procedência |
| 3 | Zero `BLOQUEIA` em aberto | **NÃO — 3** |

**REPROVADO.**

## Próximo passo

Os três `BLOQUEIA` são o mesmo conserto em três lugares, e a ordem importa: **primeiro o canônico**
(é o dono declarado da verdade técnica), depois o brief nas duas seções. O protótipo já tem sessão
marcada e não entra aqui.

Os diffs estão propostos no fim deste arquivo (Fase 6a). **Nenhum documento do projeto foi editado.**

## Sugestão de infraestrutura (Fase 6b, separada e opcional)

Três fatos com verificador cobririam sozinhos os três bloqueios desta rodada — e o próximo drift
igual falharia no `verifica.py` em vez de esperar uma varredura.

Os três foram **testados contra o repositório de hoje**: o primeiro e o terceiro saem vermelhos
agora, que é o esperado — há bloqueio aberto. (A primeira versão do `alerta-canonico` procurava
`balanço/diâmetro` no brief inteiro e saía **verde** por acidente: o termo aparece 4 vezes lá, nenhuma
no exemplo de alerta. Verificador largo demais passa sempre — o §3 do `REGISTRO.md` avisa, e ainda
assim aconteceu na primeira tentativa.)

```yaml
fatos:
  alerta-canonico:
    valor: "balanço, L/D 4,5 contra limiar 4,0"
    verifica: "grep -q 'ATENÇÃO — relação balanço/diâmetro' Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md && grep -q 'ATENÇÃO — relação balanço/diâmetro' Docs_inicial/construcao/BRIEF_DESIGN_INTERFACE.md"
    explicado_em: "Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md#7.6"
  piso-esfregamento:
    valor: "2,2–3,6 µm (rβ 10 µm, k 0,22–0,36)"
    verifica: "grep -q 'Piso resultante: \\*\\*2,2–3,6 µm\\*\\*' Docs_inicial/canonicos/CANONICO_LIMITES_E_ALERTAS.md"
    explicado_em: "Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md#9.2"
  r7-nos-canonicos:
    valor: "a R7 está propagada nos canônicos"
    verifica: "grep -rq 'R7' Docs_inicial/canonicos/CANONICO_LIMITES_E_ALERTAS.md"
    explicado_em: "Docs_inicial/pesquisa/VALIDACAO_R7.md"
```

---

# Fase 6a — diffs propostos (não aplicados)

Ordem de aplicação: **canônico primeiro**, depois o brief. O canônico é o dono declarado da verdade
técnica; consertar o derivado antes deixaria o brief apontando para uma fonte ainda errada.

## Diff 1 — `canonicos/CANONICO_LIMITES_E_ALERTAS.md` (4 trechos)

### 1A · §1.1, linhas 58-60 — o piso ganha o número da R7

```diff
-**Piso de espessura** — dispara quando `hex < hmin`, com `hmin = 0,3 × rβ`.
+**Piso de espessura** — dispara quando `hex < hmin`, com `hmin = k × rβ`, `k` = 0,22–0,36 (§2.1) e
+`rβ` = 10 µm para fresa inteiriça de metal duro. Piso resultante: **2,2–3,6 µm**.
 Camada: **ALERTA**.
-Base: razão `hmin/rβ` medida na literatura (§2.1). O valor de `rβ` é **estimativa declarada, não medida** — ver L-16.
+Base: razão `hmin/rβ` medida na literatura (§2.1); o valor de `rβ` foi fechado pela R7 — ver abaixo.
+
+> ✅ **RESOLVIDO — R7 fechou (29/08/2026, ver `pesquisa/VALIDACAO_R7.md`).** O raio de aresta de
+> fresa inteiriça é da ordem de **10 µm**, não das dezenas do registro anterior — consenso 3/3 entre
+> territórios independentes, e o território que discordava foi rejeitado por fabricação de fonte.
+> **Nenhum fabricante publica piso em milímetros**: o mercado previne o esfregamento entregando `fz`
+> já corrigido por `ae/D`, em vez de alertar depois. Consequência: com o piso em 2,2–3,6 µm o gatilho
+> é **praticamente inativo** na escala de uso do produto — o que não o invalida, mas tira dele o papel
+> de alerta canônico. `k` para inox e aço endurecido segue `NÃO ENCONTRADO`.
```

### 1B · L-16, linha 223 — fechada

```diff
-| **L-16** | **O piso de espessura depende de dois números que divergem do registrado**: o raio de aresta (4–20 µm nesta rodada × 25–127 µm no registro anterior) e a razão de espessura mínima (20–40% × 5–20%). O **produto** dos dois muda o piso de 0,8–8 µm para 1,25–25 µm. | Reconciliar **os dois fatores**, não só o percentual. Medição de raio de aresta em fresa inteiriça convencional, de catálogo ou metrologia. |
+| **L-16** | ✅ **FECHADA pela R7 (29/08/2026).** O raio de aresta de fresa inteiriça é ~**10 µm** (consenso 3/3, `pesquisa/VALIDACAO_R7.md`); os 25–127 µm do registro anterior eram de outra classe de ferramenta. Com `k` = 0,22–0,36 (§2.1), o piso fica em **2,2–3,6 µm**. | — |
```

### 1C · L-18, linha 225 — fechada, e é ela que explica a troca do alerta canônico

```diff
-| **L-18** | **A frequência de disparo do piso não foi verificada.** Com raio de aresta de 10 µm o piso fica em 3 µm; um caso normal de alta eficiência (D 6 mm, `ae/D` 5%, `fz` 0,05) dá ~22 µm — 7× acima. A regra substituta quase nunca dispara com o default recomendado. | Simular a regra sobre a faixa de uso real antes de implementá-la. Pode ser o comportamento desejado; não foi quantificado. |
+| **L-18** | ✅ **FECHADA pela R7 (29/08/2026).** Quantificada: o gatilho **não dispara** dentro da escala do §5.3 do MVP — numa Ø10 com `fz` e `ae` nos dois mínimos da escala, `hex` chega a 3,5 µm, exatamente a fronteira; uso real fica uma ordem de grandeza acima. É o comportamento correto, e é por isso que o alerta canônico do produto passou a ser o balanço. | — |
```

### 1D · item 7, linha 247 — deixa de mandar simular o que já foi simulado

```diff
-7. **O piso de espessura pode ser implementado** — R2 fechou a escolha de fórmula (§1.1). O que continua aberto é a calibração de `rβ` (L-16 a L-18): o piso pode quase nunca disparar na faixa de uso real — simular antes de implementar.
+7. **O piso de espessura pode ser implementado** — R2 fechou a fórmula (§1.1) e a R7 fechou a calibração de `rβ` (L-16, L-18). Implementar sabendo que **quase nunca dispara** na faixa de uso real: é rede de segurança, não alerta de rotina.
```

## Diff 2 — `construcao/BRIEF_DESIGN_INTERFACE.md` §5.8, linhas 406-408

O único exemplo de mensagem de alerta do brief. Estrutura invariável do §5.8 preservada:
condição — grandeza contra referência (distância) + efeito físico.

```diff
 ATENÇÃO — espessura de cavaco (hex) 0,018 mm, abaixo do piso de 0,030 mm
-          Nessa faixa o gume esfrega em vez de cortar: gera calor e
-          desgasta por abrasão sem remover material.
+ATENÇÃO — relação balanço/diâmetro (L/D) 4,5, acima do limiar de 4,0
+          da haste comum (13% acima)
+          A ferramenta flete e tende a vibrar: a deflexão cresce com
+          o cubo dessa relação, e a 4,5 ela é 42% maior que no limiar.
```

*(O bloco inteiro sai e entra; o diff está escrito assim só para deixar as duas versões lado a lado.)*

## Diff 3 — `construcao/BRIEF_DESIGN_INTERFACE.md` §5.7, linhas 359-364

A primeira direção passa a ser a que resolve o alerta — o que o próprio §5.7 exige
(*"quando há alerta ativo, a direção que o resolve tem precedência de conteúdo"*).
A segunda direção **não muda**: já bate com o dono.

```diff
-Para a ferramenta durar mais
-  Aumente a penetração de trabalho (ae) para 2,5 mm (hoje 1,0).
-  Com o corte mais cheio, a aresta volta a cortar em vez de
-  esfregar — e o atrito de esfregar é o que queima a ponta.
-  Em troca: a força lateral sobe e a ferramenta flete mais;
-  atenção se a parede da peça for fina.
+Para a ferramenta parar de vibrar   (resolve o alerta acima)
+  Reduza o balanço (L) para 40 mm (hoje 45).
+  A relação cai de 4,5 para 4,0 e a deflexão cai cerca de 30% —
+  a ferramenta volta ao limiar da haste comum.
+  Em troca: a ferramenta alcança menos; se a parede for funda, o
+  balanço tem que ficar, e aí o caminho é outro.
```

## Achado a mais, encontrado ao escrever o diff — decisão do Mestre

`BRIEF:352` repete a direção morta como exemplo de **forma**, não de conteúdo:

> `2. O verbo de orientação, a grandeza e o alvo numérico — "aumente a penetração de trabalho para 2,5 mm (hoje 1,0)".`

**Não entrou como achado** e não está em nenhum dos diffs: ali a frase ilustra o padrão do verbo, e
continua correta como padrão. Trocar por *"reduza o balanço (L) para 40 mm (hoje 45)"* alinharia o
documento inteiro a um exemplo só. É preferência, não verdade — por isso vai como pergunta, não como
conserto.

---

# Fase 6a — aplicado em 29/08/2026

Os 3 diffs foram aplicados após aprovação. Nada além deles foi tocado.

| Documento | Trechos |
|---|---|
| `canonicos/CANONICO_LIMITES_E_ALERTAS.md` | §1.1 (piso + bloco RESOLVIDO da R7) · L-16 · L-18 · item 7 |
| `construcao/BRIEF_DESIGN_INTERFACE.md` | §5.8 exemplo de alerta · §5.7 primeira direção |

**`BRIEF:352` não foi tocado** — a repetição da direção morta como exemplo de forma segue lá.
Decisão do Mestre em 29/08: **fica**. Ali a frase ilustra a forma do verbo, não o conteúdo do
exemplo canônico. Nunca foi achado.

## Gate reavaliado

| # | Condição | Antes | Agora |
|---|---|---|---|
| 1 | Verificador de fatos verde | n/a | n/a — registro ainda não instalado |
| 2 | Zero docs vencidos | n/a | n/a — procedência ainda não declarada |
| 3 | Zero `BLOQUEIA` em aberto | NÃO — 3 | **SIM — 0** |

**APROVADO** para os três bloqueios desta rodada. O `AVISA` do protótipo continua aberto por decisão,
não por esquecimento: ele pertence à sessão de `/design`.

## Segunda lição do próprio uso da skill

O verificador proposto para o piso era **negativo** — `! grep -rq 'piso de 0,030 mm'` — e continuaria
vermelho para sempre: `HANDOFF.md`, `LESSONS.md`, `CRITICA_PROTOTIPO...md` e este relatório citam o
valor antigo **de propósito**, porque é o registro histórico. Trocado por um verificador **positivo**,
que afirma o valor certo no dono. A regra foi gravada no `REGISTRO.md` §3 da skill.
