# R2-V — Verificação dos bloqueios da R2

**Não é uma rodada nova.** É a conferência dos 5 pontos que `VALIDACAO_R2.md` marcou como impedimento para escrever `CANONICO_MOTOR_DE_CALCULO.md`.

**O enunciado mora em `_para_colar/COLAR_R2V.md`** — é lá que ele é mantido, e é de lá que se cola. Este arquivo é a ficha de rastreabilidade: por que cada item existe e o que ele destrava. Não duplicar o enunciado aqui.

**Salvar o retorno como:** `RESPOSTA_R2V.md`, nesta pasta.

---

## Por que sem par cego

As cinco perguntas apontam para **documento nomeado, página nomeada**. O risco aqui não é erro correlacionado entre dois pesquisadores — é **erro de transcrição de PDF diagramado em colunas**, e contra isso a trava é citação verbatim com localização, não duplicação. A única pergunta de apuração aberta (V2c) já vai restrita a uma lista fechada de fabricantes.

Se o retorno vier com muitos `NÃO VERIFICADO`, aí sim vale um segundo pesquisador — mas com **outro território de fonte**, não com o mesmo prompt.

## O que cada item verifica

| Item | Pergunta | Origem | Destrava |
|---|---|---|---|
| **V1** | O diâmetro efetivo entra na rotação ou no avanço? São cumulativos? | bloqueio **B1**; confronto A×B, linha 10 | passos 1 e 5 da cadeia de `CANONICO_MOTOR_DE_CALCULO.md` — sem isso a cadeia não pode ser escrita para fresa esférica e toroidal |
| **V2** | Conferir 4 linhas da tabela Walter F 9 na fonte; procurar 2º fabricante com `kc1.1`/`mc` | bloqueio **B4**; portão **G2** | a tabela de constantes por material, linha a linha |
| **V3** | O que Diniz/Marcondes/Coppini publica de fato para 1020, 1045 e 304, e em que condição mediu | bloqueio **B2**; confronto A×B, linhas 23–24 | os três pares hoje declarados "validados" |
| **V4** | O 8620 núcleo — 1500/0,21 × 1800/0,26, 35% de dispersão, nenhuma medição da liga | bloqueio **B3**; confronto A×B, linha 25 | duas linhas da tabela (núcleo e cementado) |
| **V5** | A Kennametal publica mesmo o fator de desgaste 1,1–1,3? | divergência **D2**; `../canonicos/CANONICO_LIMITES_E_ALERTAS.md` §2.2 | o teto de aproveitamento de potência de 0,77 |

## O que este retorno NÃO precisa responder

A cadeia de cálculo para **fresa de topo reto** já está fechada e confirmada pelos dois territórios da R2 — fórmula de afinamento, limiar de 50%, `hm` em Kienzle, piso de `h`, rejeição do `mc = 0,75`. **Não reabrir.** O enunciado colável foi escrito para não convidar a isso.

## Quando o retorno chegar

1. Auditar `RESPOSTA_R2V.md` pelos portões G1, G2, G3 e G7 (G8 não se aplica — pesquisador único).
2. Atualizar `VALIDACAO_R2.md`: cada bloqueio vira `RESOLVIDO`, `RESOLVIDO COMO FAIXA` ou `LACUNA PERMANENTE`.
3. Escrever `CANONICO_MOTOR_DE_CALCULO.md`.
4. Voltar ao `⧗ AGUARDA R2` de `CANONICO_LIMITES_E_ALERTAS.md` §1.1 e fechá-lo — a resposta já existe (ver D3 em `VALIDACAO_R2.md`), independe deste retorno.
