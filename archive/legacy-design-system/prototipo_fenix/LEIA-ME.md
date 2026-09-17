# Protótipo do painel

> **Decisão do Mestre, 08/09/2026 — o contrato é o `index.html`.** O protótipo interativo
> (`index.html` + `css/` + `js/`, com as suítes em `testes/`) é a fonte da verdade do painel. As dez
> folhas `.dc.html` descritas abaixo viraram **registro histórico**: não são mais atualizadas e não
> governam implementação. Elas já divergem do interativo — `Main.dc.html` ainda diz passo de 10% onde
> o produto faz 5%. Ver `ESTADO.md`, seção "O contrato do painel".

## O que as folhas `.dc.html` foram — contrato visual canônico até 08/09/2026

**O que é:** o desenho do painel do Fenix, feito do zero contra
[`BRIEF_DESIGN_INTERFACE.md`](../BRIEF_DESIGN_INTERFACE.md) e
[`DESIGN_SYSTEM_FENIX.md`](../DESIGN_SYSTEM_FENIX.md). A tese de layout e as tensões que ela resolve
estão registradas no `HANDOFF.md` §34.

**Publicado em:** https://claude.ai/code/artifact/2a248b7c-80e8-412f-b1d9-5bd08bedde89

## Os arquivos

| Arquivo | Quadro |
|---|---|
| `Main.dc.html` | Resultado com **ATENÇÃO** ativo — desktop, fluido (empilha abaixo de ~1080px) |
| `Vazio.dc.html` | Antes do primeiro cálculo — nenhum número; desktop fluido |
| `Tablet.dc.html` | A mesma capacidade em 834 de largura — as duas colunas empilham, "resultados úteis" cai de 4 para 2 colunas |
| `Celular.dc.html` | A mesma capacidade em 390 de largura — coluna única, configuração acima do resultado (`MVP` §2.3) |
| `Estados.dc.html` | **A folha de contrato** — os três níveis de diagnóstico, erro de digitação, check ao calcular, desatualizado, reconfiguração de campos, prosa e gaveta de instrução nascendo recolhidas, blocos de entrada recolhidos, dados do material visíveis (editados em Configurações) |
| `canvas.json` | Posição dos quadros e as notas de tese |

**Estes seis são a fonte.** Toda alteração se faz neles.

> **A folha de procedência (`Procedencia.dc.html`) foi removida** na correção de 30/08/2026 — o
> commit `2783a6b` tirou o conceito de procedência do produto. As fórmulas continuam no cálculo,
> invisíveis ao operador; não há mais tela de "detalhes e fórmulas" nem sublinhado que a abrisse.

`painel-fenix.html` é saída de build (2,5 MB, o editor embutido) e **não vai para o repositório** —
ele é regerado a cada alteração.

## Como alterar

1. Editar o `.dc.html` do quadro.
2. Rodar `/design` na sessão para ter o assistente e o caminho do `seed-canvas.mjs`, e re-semear
   **os cinco `.dc.html` + o `canvas.json` juntos** em `painel-fenix.html`.
3. Republicar **na mesma URL** acima — publicar sem ela cria um artifact separado.

## Regras que valem para qualquer alteração aqui

- **Nenhuma cor fora dos tokens** do design system §3. Conferir com
  `grep -oE "#[0-9A-Fa-f]{6}" *.dc.html | sort -u`.
- **Nenhum termo abreviado** — a tabela de vocabulário obrigatório é o §11 do brief. Vale igual no
  celular. Duas exceções, e só elas (`GABARITO_PROTOTIPO.md` §2.2 + `MVP` §2.4): o resumo compacto da
  ferramenta (`10 R1 Z4 L45`) e o resumo no cabeçalho de um bloco recolhido (`Ø10 · Z4 · L45`).
- **Nenhum número de demonstração.** Todo valor da tela é rastreável ao `MVP` (§7.6, §7.7, §11.1) ou
  a um canônico. Se não existe no documento, o exemplo muda — o número não se inventa.

Ver `referencia/LESSONS.md` `L21`.
