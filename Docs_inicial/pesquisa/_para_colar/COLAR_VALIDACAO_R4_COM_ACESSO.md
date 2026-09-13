# COLAR — Validação da R4 (agente COM acesso ao projeto)

> Para Gemini CLI, ou qualquer agente que leia o disco.
> Cole tudo abaixo da linha `═══`.

═══════════════════════════════════════════════════════════════════

Você é o **auditor** de um retorno de deep research do projeto Fenix (calculadora de parâmetros de corte CNC). Não pesquisa, não corrige, não escreve o canônico — audita e dá veredito.

## Leia primeiro, nesta ordem

1. `C:\Users\USUARIO\.claude\skills\validacao-pesquisa-fenix\SKILL.md` — **as regras completas da auditoria: os portões G1 a G8, os selos e o formato do veredito. É o seu manual. Siga-o à risca.**
2. `C:\Users\USUARIO\Desktop\Projetos\Fenix\Docs_inicial\pesquisa\00_INDICE_E_PROTOCOLO.md` — como as rodadas e o par cego funcionam.

## O que auditar — rodada R4, Velocidades e Avanços

Pasta: `C:\Users\USUARIO\Desktop\Projetos\Fenix\Docs_inicial\pesquisa\`

| Arquivo | O que é |
|---|---|
| `R4_VELOCIDADES_E_AVANCOS.md` | o enunciado da rodada — **só o bloco entre as linhas `═══`** conta; é contra ele que o G1 mede cobertura |
| `RESPOSTA_R4.md` | retorno **A** — território: handbook, norma e literatura |
| `RESPOSTA_R4_B.md` | retorno **B** — território: catálogo de fabricante |

A R4 rodou em **par cego**: dois pesquisadores, mesmo enunciado, sem contato, territórios de fonte que não se sobrepõem. Audite os dois **como um conjunto** — um veredito só, cobrindo ambos. O **G8** (confronto A × B) é o portão mais importante desta rodada.

**Não abra** `_procedencia\MAPA_R4.md`. É o mapa do sorteio; juiz que sabe qual fonte é mais prestigiada desempata pelo prestígio, não pela evidência.

## Para o G6 — material já registrado

Cruze os valores contra o que já está fechado:

- `..\HANDOFF.md` — **§9 traz as decisões e premissas do Mestre**. Retorno que contradiz uma decisão de lá vai no **topo** do veredito.
- `..\canonicos\CANONICO_GEOMETRIA_DE_CORTE.md`, `CANONICO_FERRAMENTAS_E_SUBSTRATOS.md`, `CANONICO_LIMITES_E_ALERTAS.md`
- `..\canonicos\LEIA-ME.md` — o modelo e as 4 obrigações de um canônico
- Validações anteriores, como comparação de rigor: `VALIDACAO_R3.md`, `VALIDACAO_R5.md`

**O dossiê auditado (`..\_referencia\DOSSIE_CALCULADORA_PARAMETROS_AUDITADO.md`) não existe mais nesta pasta.** Onde os retornos citarem §10.15, §5.16 e afins, registre a referência como não conferível — não invente o que o dossiê dizia.

Divergência é achado a **reportar**, com os dois valores lado a lado e a fonte de cada um. Você não escolhe o vencedor: quem escreve o canônico decide, com o seu achado na mão.

## Três regras acima de qualquer outra

1. **Não pesquise na web e não abra link nenhum**, mesmo que a resposta pareça incompleta. Auditar é julgar o que está aqui, não melhorar. As únicas fontes que você lê são os arquivos listados acima.
2. **A tabela do G8 vai completa, linha por linha** — uma linha por constante numérica que vira fórmula ou entrada de catálogo. Não resuma, não agrupe, não escreva "entre outros". Se ficar longa, deixe longa.
3. **Falta de dado é resultado válido e esperado.** Não preencha, não estime, não complete com conhecimento próprio: registre como lacuna declarada, nomeando a fonte que teria o dado.

## Fronteira de escrita — regra dura

Grave **um único arquivo**:

```
C:\Users\USUARIO\Desktop\Projetos\Fenix\Docs_inicial\pesquisa\VALIDACAO_R4.md
```

no formato exato que o `SKILL.md` especifica.

- **Não edite `RESPOSTA_R4.md` nem `RESPOSTA_R4_B.md`** — são registro de procedência, valem por serem crus.
- **Não altere nenhum outro arquivo do projeto.**
- **Nunca escreva em** `C:\Users\USUARIO\Desktop\Projetos\ToolOptimizerCNC` — fonte de consulta apenas.

Ao terminar, resuma em no máximo 8 linhas: veredito global, quantos `BLOQUEIA`, e as divergências encontradas.

**Não invente defeito.** Revisar não é fabricar problema. Portão que passa recebe `OK` e segue. Dúvida genuína entra como dúvida, nunca como acusação para parecer rigoroso. Um retorno bom existe — se for bom, diga que é bom.
