# Índice de arquivos — mapa de redirecionamento

**Isto não é um catálogo do projeto.** Quem quiser saber o que existe em `Docs_inicial/` consulta a
tabela "Estrutura" do `CLAUDE.md` (raiz do repo) ou o §4 (Mapa de arquivos) do `HANDOFF.md` — essa é
a fonte de verdade sobre o que cada pasta contém, e duplicá-la aqui só criaria uma segunda fonte pra
divergir.

**Isto é um redirecionamento.** Serve só pra uma pergunta: *um documento antigo cita um caminho que
não existe mais — pra onde foi?* Se você é um agente e um `grep`/`Read` falhou num caminho citado por
um documento histórico (sessão passada do `HANDOFF.md`, entrada fechada do `LESSONS.md`, relatório
arquivado), procure aqui antes de perguntar ao Mestre ou de tentar recriar o arquivo.

**Regra de manutenção:** toda vez que um arquivo deste projeto for movido, renomeado ou descartado,
adiciona uma linha aqui. **Não** volta a editar o texto histórico que cita o caminho antigo — isso
quebraria a doutrina de log fechado (ver `HANDOFF.md` §4, "nunca editado — é registro de
procedência"). Só os documentos vivos de navegação (`CLAUDE.md`, `HANDOFF.md` §1/§4 e as poucas
citações funcionais dentro de `escopo/`) são corrigidos quando um caminho muda.

## Movimentações — reorganização de 29/08/2026

| Arquivo | Local antigo | Local novo | Por quê |
|---|---|---|---|
| `GLOSSARIO_DE_TERMOS.md` | `Docs_inicial/` | `referencia/GLOSSARIO_DE_TERMOS.md` | vivo, citado por todo `canonicos/` — agrupado com o outro documento de consulta cruzada |
| `LESSONS.md` | `Docs_inicial/` | `referencia/LESSONS.md` | idem |
| `BLOCO_DE_DECISAO.md` | `Docs_inicial/` | `decisoes/BLOCO_DE_DECISAO.md` | Parte 3 (16 perguntas) ainda aberta — registro de decisão, não relatório nem plano |
| `AUDITORIA_PRONTIDAO_MVP_2026-08-28.md` | `Docs_inicial/` | `planos/pendentes/AUDITORIA_PRONTIDAO_MVP_2026-08-28.md` | a seção "Plano de ação" (6 passos) segue não executada — é o plano pendente vivo do projeto |
| `RECONCILIACAO_DOCS_2026-08-29.md` | `Docs_inicial/` | `relatorios/RECONCILIACAO_DOCS_2026-08-29.md` | achados ainda guiam trabalho aberto (Fase 6b não decidida) |
| `CRITICA_PROTOTIPO_PAINEL_2026-08-28.md` | `Docs_inicial/construcao/` | `relatorios/CRITICA_PROTOTIPO_PAINEL_2026-08-28.md` | relatório de crítica, não decisão de construção — o plano de 19 itens que ele gerou ainda não foi executado |
| `ANALISE_CRITICAS_MESTRE_PAINEL_2026-08-28.md` | `Docs_inicial/construcao/` | `relatorios/ANALISE_CRITICAS_MESTRE_PAINEL_2026-08-28.md` | idem, é o par do documento acima |
| `AUDITORIA_DOCUMENTOS_TECNICOS.md` | `Docs_inicial/` | `_arquivo/relatorios/AUDITORIA_DOCUMENTOS_TECNICOS.md` | achados já absorvidos em `canonicos/`; fechado |
| `AUDITORIA_PRONTIDAO_MVP_2026-08-27.md` | `Docs_inicial/` | `_arquivo/relatorios/AUDITORIA_PRONTIDAO_MVP_2026-08-27.md` | substituída pela auditoria de 28/08 (veredito superado) |
| `PLANO_AUDITORIA_DOCUMENTOS_TECNICOS.md` | `Docs_inicial/` | `_arquivo/planos/PLANO_AUDITORIA_DOCUMENTOS_TECNICOS.md` | plano executado, resultado já em `canonicos/` |
| `PLANO_DADOS_INDUSTRIA_CNC.md` | `Docs_inicial/` | `_arquivo/planos/PLANO_DADOS_INDUSTRIA_CNC.md` | idem — plano do inventário, executado |
| `INVENTARIO_DADOS_INDUSTRIA.md` | `Docs_inicial/` | `_arquivo/descarte/INVENTARIO_DADOS_INDUSTRIA.md` | dado bruto, já absorvido nos canônicos; o Mestre marcou como descartável em 28/08 (`HANDOFF.md` §30.4) e não confirmou apagar de vez — movido, não `git rm` |

## Pastas novas criadas nesta reorganização

`referencia/`, `decisoes/`, `planos/` (+ `pendentes/`, `executados/`), `relatorios/`, `_arquivo/`
(+ `planos/`, `relatorios/`, `descarte/`). Cada uma tem seu próprio `LEIA-ME.md` com o critério de
entrada e saída.

## Planos concluídos — movidos de `pendentes/` para `executados/`

| Arquivo | Local antigo | Local novo | Quando |
|---|---|---|---|
| `PLANO_REVISAO_PROTOTIPO_2026-08-29.md` | `planos/pendentes/` | `planos/executados/` | 29/08/2026 — Fatia 1 (§43), Fatia 2 (§44) e item 29 (§45) executados. §42/§43/§44 do `HANDOFF.md` citam o caminho antigo (log fechado). |

## Movimentações — 08/09/2026 (saída da raiz do repo)

Os três arquivos nasceram na **raiz do repositório** no commit `a97201f`, da sessão do Gemini. Saíram
de lá no mesmo dia: a raiz guarda só `CLAUDE.md`, `EQUIPE.md` e `ESTADO.md`, e teste de protótipo
solto ali atrapalharia quando a fase de construção criar o código de verdade.

| Arquivo | Local antigo | Local novo | Por quê |
|---|---|---|---|
| `test_suite.js` | raiz do repo | `construcao/prototipo/testes/test_suite.js` | teste do protótipo, mora junto do que testa |
| `test_suite_dinamica.js` | raiz do repo | `construcao/prototipo/testes/test_suite_dinamica.js` | idem |
| `walkthrough.md` | raiz do repo | `relatorios/WALKTHROUGH_GEMINI_2026-09-08.md` | relatório datado de sessão; ganhou nome com autor e data, como os outros de `relatorios/` |

Os dois testes tiveram o caminho interno corrigido de `Docs_inicial/construcao/prototipo/js/` para
`../js/` e foram reexecutados do novo local — 31/31 e regressão completa, ambos passando. Rodam com
`node <caminho>` a partir da raiz. Citações atualizadas em `CLAUDE.md`, `EQUIPE.md` e `ESTADO.md`.
