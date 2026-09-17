# Briefing — os 5 artboards do redesign do painel

**Para:** Dexter · **De:** Skinner · **Aberto em:** 03/09/2026
**Status:** despachado, não iniciado.

Este arquivo existe porque em 02/09 o mesmo briefing foi despachado por mensagem, a sessão do Dexter
foi reiniciada e o briefing sumiu junto. Briefing longo mora em arquivo; a mensagem só aponta pra cá.

---

## Por que este trabalho existe

Em 02/09 o Mestre identificou que **o protótipo foi construído desconectado da documentação canônica.**
O painel atual mostra campos genéricos, iguais para tudo. A régua diz outra coisa: são **4 famílias e
17 geometrias**, e o conjunto de campos **muda por geometria** — Furar não tem `ae` nem `Z`, Disco
troca os rótulos de `ap` e `ae`, Mandrilar deriva `ap` de dois diâmetros, Roscar trava o avanço.

O `MAPEAMENTO_CAMPOS_FERRAMENTAS.md` foi escrito para acabar com essa desconexão: é a tabela
definitiva campos × geometria. **Ele é a fonte; o painel atual não é.**

---

## O que entregar

Cinco folhas `.dc.html` em `Docs_inicial/construcao/prototipo/`:

| # | Arquivo | Caso | O que precisa demonstrar |
|---|---|---|---|
| 1 | `Main.dc.html` | Fresar — Toroidal | Referência completa: estado pós-cálculo, com alerta e feedback. Campo extra `r` (raio de canto) |
| 2 | `Furar.dc.html` | Furar — Helicoidal | Ausência é informação: sem Z, sem `ae`, sem `ap` de entrada. Ângulo de ponta presente. Ajuste fino só `vc` |
| 3 | `Roscar.dc.html` | Roscar — Macho de Corte | Campos de rosca. **Avanço travado** (fn = passo, não editável) e a forma visual de "travado por física, não por bug". Ajuste só `vc` |
| 4 | `Mandrilar.dc.html` | Mandrilar — Barra | D inicial e D final; `ap` **derivado** dos dois, não digitado. `fn` e `rε` |
| 5 | `Fresar-Variantes.dc.html` | 3 mini-painéis | Alto Avanço (κ 15°), Chanfrar (Dmin), Disco/Serra (rótulos trocados: ap→largura b, ae→penetração radial). Demonstra variação **dentro** de uma família |

O `Main.dc.html` já existe e vai ser **substituído** — ele é o objeto medido, nunca a medida.

---

## A régua

Leia na ordem da sua carta (`AGENTE_DEXTER.md`, seção "Como você trabalha"). Os caminhos que valem:

| Documento | Papel aqui |
|---|---|
| `Docs_inicial/construcao/MAPEAMENTO_CAMPOS_FERRAMENTAS.md` | **A fonte deste trabalho.** Quais campos, em que unidade, com que passo, com que valor de partida |
| `Docs_inicial/construcao/prototipo/GABARITO_PROTOTIPO.md` | Gabarito v1.6. Camada 1 é limite, camada 2 é seu território. D1–D12 não se reabrem |
| `Docs_inicial/construcao/DESIGN_SYSTEM_FENIX.md` | Tokens, contraste, primitivos |
| `Docs_inicial/construcao/BRIEF_DESIGN_INTERFACE.md` | R1–R15, T1–T12, C1–C12, vocabulário §11, anti-requisitos §12 |

**Precedência em caso de divergência:** decisão escrita do Mestre > `canonicos/` > MVP > brief >
design system > relatório de crítica > protótipo.

---

## Ordem de execução — não faça os cinco de uma vez

1. **Só o `Main.dc.html` primeiro.** Ele fixa a linguagem que os outros quatro herdam. Entregue,
   reporte, espere o retorno do Mestre.
2. Aprovado o Main, os outros quatro saem em sequência, na ordem da tabela.

Fazer os cinco antes da primeira aprovação multiplica por cinco qualquer correção de linguagem.

---

## O que é "pronto"

- Cada campo da folha existe no `MAPEAMENTO` para aquela geometria — e nenhum que não exista aparece.
- Unidade, faixa, passo e valor de partida batem com o `MAPEAMENTO`.
- Nenhuma violação de camada 1 (R1–R15, vocabulário, anti-requisitos, checklist do design system).
- Toda escolha de camada 2 vem **com a razão junto**: que tensão resolve, contra o que foi medida.
- Vocabulário: **"velocidade de corte (vc)"** é o nome da grandeza. "Faixa de velocidade de corte"
  só onde o valor é mesmo um intervalo de dois números. "Velocidade de corte de partida" **não existe
  mais** (decisão do Mestre, 03/09).

## Fronteiras

Você não commita, não toca em fórmula nem em canônico, e não arbitra decisão de produto — se o
desenho esbarrar numa, pergunte pelo orquestrador. Achado de camada 2 vestido de violação de regra
é finding inválido, inclusive quando é você quem veste.
