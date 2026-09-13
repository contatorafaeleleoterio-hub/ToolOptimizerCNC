# Fenix — Calculadora de Parâmetros de Corte CNC

**Estado:** fase inicial. Especificação em construção; nenhuma linha de código escrita.

---

## O que é

Sistema de cálculo e recomendação de parâmetros de corte para usinagem CNC. O operador informa material, ferramenta e condições; o sistema devolve rotação, avanço, potência exigida e uma leitura de segurança da operação.

**Quem usa:** operador e programador de CNC em oficina de usinagem e ferramentaria. Não é engenheiro de processos. Precisa do número pronto para digitar na máquina, em segundos.

Uma entrevista de campo (26/08/2026) apontou um **terceiro personagem** — o gestor ou responsável pelo ferramental, que carrega o custo do consumo excessivo e não enxerga a causa. **Ele não é usuário deste MVP**, e a razão não é escopo: o que ele precisa ver é a linha que liga o parâmetro ao consumo de ferramental, e ela depende do expoente de Taylor, que a pesquisa não conseguiu obter. Registrado em `mvp/MVP` §13.4.

**Postura do produto:** o sistema **recomenda**, o operador **decide**.

---

## A regra que organiza tudo aqui

> **Nenhuma fórmula, constante de cálculo ou limiar derivado de constante física entra sem fonte citada.**

Vale para o motor de cálculo — Kienzle (kc1.1, mc), Taylor, deflexão, geometria de corte — e para o ponto em que cada fórmula ou constante deixa de valer. Onde falta fonte, o documento declara **o que falta** em vez de arbitrar um valor. Lacuna registrada é resultado; lacuna preenchida com palpite é passivo que vira bug seis meses depois.

Decisão de escopo, nome, vocabulário e limiar de julgamento de produto que não deriva de constante física **não** dependem de fonte externa — são escolha do dono do produto (decisão do Mestre, 01/09/2026).

Isso não é preferência de estilo — é a razão de existir da etapa em que o projeto está agora.

---

## Por que existe uma etapa de auditoria antes do código

O Fenix parte de um levantamento funcional de um sistema anterior que resolvia o mesmo problema. Aquele sistema funcionava, mas cresceu com documentação contraditória: três regras para a mesma profundidade de corte, duas fórmulas para o mesmo efeito de afinamento de cavaco, quatro faixas de diâmetro aceitas, alertas sem fonte nenhuma.

Herdar isso significaria carregar a ambiguidade para dentro do código novo, onde ela custa muito mais caro para descobrir.

Por isso o levantamento passou por auditoria, e o que sobrou de dúvida virou pesquisa com fonte externa. **O sistema anterior é insumo, não modelo.** Nada aqui deve ser desenhado como ele por inércia.

---

## Como navegar

| Pasta / arquivo | O que é | Vale como especificação? |
|---|---|---|
| **`HANDOFF.md`** | Ponto de entrada. Estado atual, próxima ação, ciclo de trabalho. **Leia primeiro.** | — |
| **`escopo/`** | O que o sistema faz e por quê. `E0` tem precedência sobre todos os demais documentos do projeto. | ✅ **Sim — é a fonte** |
| **`canonicos/`** | Fonte única de verdade por assunto. Cada regra com fórmula, condição de validade, fonte e nível de confiança. | ✅ **Sim — é a fonte** |
| **`mvp/`** | A especificação do primeiro produto funcional. Consolida a fatia de MVP do escopo. | ✅ **Sim — é a fonte** |
| `construcao/` | Decisões de construção — tecnologia, ordem, tela. O que a `escopo/` proíbe mencionar. | ⚠️ Fonte só de construção |
| `pesquisa/` | Os prompts de validação técnica e os retornos crus das pesquisas. Material de processo. | ⚠️ Insumo, não fonte |
| `../inicio_fenix/` | O JTBD, a entrevista de campo e os arquivos reais de parâmetros da fábrica. | ⚠️ Insumo, não fonte |

**A distinção que importa:** `pesquisa/` explica *por que* um número é o que é. `canonicos/` declara *qual* é o número. Só o segundo vale como especificação do Fenix.

> ✅ **Reconciliado em 26/08/2026.** O JTBD, reescrito sobre entrevista de campo, contradizia premissas registradas como decididas — inclusive em `escopo/E0`. Os sete pontos foram registrados em `../inicio_fenix/ATUALIZACAO_NECESSARIA.md`, conferidos em `../inicio_fenix/VERIFICACAO_DA_ATUALIZACAO.md` e resolvidos em `escopo/E0` (reescrito) e `mvp/MVP` §0.4.
>
> **"Camada 1 / camada 2" saiu do vocabulário do projeto** — o nome designava três coisas em três documentos. Use os dois eixos do `E0` §2: **dependência** (núcleo agnóstico → ambiente declarado) e **profundidade** (entrada mínima → entrada completa). Tabela de tradução em `escopo/E0` §2.1.

---

## Estado atual

**Atualizado em 26/08/2026.**

| Etapa | Situação |
|---|---|
| Levantamento do sistema anterior | ✅ Concluído |
| Auditoria do levantamento | ✅ Concluída — 14 de 16 conflitos resolvidos por evidência |
| Pesquisa de validação técnica | ✅ **6 rodadas apuradas** — R6 encerrada com lacuna declarada (falta de acesso a fonte paga) |
| Documentos canônicos | 🔄 **3 de 6 escritos** — geometria, ferramentas e substratos, limites e alertas. R2 e R4 liberados a escrever |
| Escopo funcional | 🔄 **E0, E3, E5 e E6 escritos** — E1, E2, E4 e E7 faltam, e estão **desbloqueados** |
| Especificação do MVP | ✅ Escrita 21/08, **revisada 26/08** contra a evidência de campo (§0.4) |
| JTBD / problema | ✅ Reescrito 26/08 sobre entrevista de campo |
| Reconciliação JTBD × escopo | ✅ **Concluída 26/08** — vocabulário fechado, MVP revisado. Restam 3 lacunas de **dado**, não de escopo |
| Arquitetura e código | 🔄 Stack decidida (`../docs/adr/0001`); nenhuma linha escrita |

Detalhe completo de cada etapa e do que fazer agora: **`HANDOFF.md`**.

---

## Fronteira

O repositório do sistema anterior (`ToolOptimizerCNC`) é **fonte de consulta apenas**. Nada é escrito lá, e o Fenix não herda dele arquivo, estrutura, nome de módulo nem decisão de implementação.

O que atravessa a fronteira é só o **conhecimento validado**: uma regra de cálculo com fonte, uma constante com procedência, uma lição registrada. Tudo isso entra pelos canônicos, nunca por cópia direta.
