# Funções futuras — Fenix

> **Sobre o lugar deste documento.** O Mestre pediu um "documento canônico". Ficou em
> `Docs_inicial/construcao/` e não em `Docs_inicial/canonicos/` porque `canonicos/` guarda número,
> fórmula e limiar já validados — decisão do orquestrador (fenix-2a), 30/08/2026; o Mestre pode
> discordar.

**O que é.** Destino do que sai do MVP por decisão do Mestre. Cada função removida entra aqui num
bloco próprio: o que é, por que saiu, e o que precisaria acontecer para voltar. Um item por bloco.
A lista cresce por acréscimo — nada se apaga.

---

## 1. Trilha de posição relativa por controle (ex-D4)

**Origem.** Era a decisão D4 do gabarito do protótipo
(`Docs_inicial/construcao/prototipo/GABARITO_PROTOTIPO.md` §2.7). Retirada do MVP pelo Mestre em
30/08/2026, junto com o fechamento da Q2 ("remover do MVP").

**O que é.** Um feedback visual por controle de corte (velocidade de corte `vc`, avanço por dente
`fz`, penetração de trabalho `ae`): uma trilha horizontal com a **faixa recomendada** como segmento,
o **valor de partida** como tick e o **valor atual** como indicador. Nunca uma escala absoluta contra
teto de máquina — esse teto não existe no produto (R14, brief §12). A forma foi prescrita nas
críticas de 28/08 (`Docs_inicial/relatorios/ANALISE_CRITICAS_MESTRE_PAINEL_2026-08-28.md`, grupo 5).

**Por que saiu.** A **faixa recomendada não tem fonte publicada.** Os fabricantes entregam a faixa
por par material × ferramenta em ferramenta própria (CoroPlus ToolGuide, Kennametal Speed and Feed)
e não expõem os limites de forma citável (`Docs_inicial/pesquisa/RESPOSTA_R5.md`). Desenhar a trilha
sem a faixa seria inventar número sem fonte — proibido (`Docs_inicial/referencia/LESSONS.md` `L21`).

**O que precisaria para voltar.**
1. Uma rodada de pesquisa que feche a faixa recomendada por par material × ferramenta com fonte
   citável, ou uma decisão do Mestre de adotar uma faixa declarada como premissa do produto.
2. Reabrir D4 no gabarito e o item correspondente no MVP.
3. A auditoria de F2 volta a medir a trilha (hoje não mede).

**O que foi retirado do MVP em 30/08/2026, junto com a decisão.** O `MVP_CALCULADORA_PARAMETROS.md`
descrevia a trilha como "barra de estado de cada controle" (§5.4) e "posição marcada na escala"
(§5.2), e as tabelas de limite do §5.3 falavam em "escala do controle". Essas menções foram limpas
— a **faixa recomendada** (mínimo/máximo por controle) continua no MVP como número, sem o desenho da
trilha. Quando a trilha voltar, ela desenha essa faixa.

---

## 2. Perfil de máquina e tudo que depende dele

**Origem.** Sempre foi anti-requisito do brief (§12) e do MVP. O Mestre **reafirmou** a remoção em
30/08/2026 e mandou guardar a descrição longe do MVP.

**O que é.** As propriedades da máquina de quem usa: rotação máxima, **potência disponível**, torque
máximo, avanço máximo, rendimento. E tudo que só existe se elas forem declaradas:

- **Alerta de produtividade contra a potência disponível** — "esse passe pede mais potência do que a
  máquina tem".
- **Rótulo de potência na interface** — "% do limite", leitura de "sobra", medidor com teto.

**Não confundir:** a **potência de corte na aresta (`Pc`)** é resultado calculado — entra dado, sai
número — e **continua no MVP**. O que sai é a potência **da máquina**, que é dado de ambiente.

**Por que saiu.** Exigir o perfil da máquina transforma a calculadora em configurador. É propriedade
do ambiente de quem usa, não do cálculo (brief §12). Sem um limite de máquina declarado não há
contra o que medir "% do limite" nem "sobra".

**O que precisaria para voltar.** Uma decisão explícita do Mestre de que o produto passa a pedir o
perfil da máquina como entrada — o que muda a natureza do produto, não só uma tela.
