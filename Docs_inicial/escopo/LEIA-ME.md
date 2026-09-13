# Escopo Funcional do Fenix

Esta pasta descreve **o que o sistema deve fazer**. É especificação, não levantamento.

---

## A regra de escrita

Todo documento aqui é escrito como **definição de um sistema a construir**, nunca como descrição de um sistema existente.

| Não se escreve | Escreve-se |
|---|---|
| "hoje o app calcula X" | "o sistema calcula X" |
| "está implementado em tal componente" | *(nada — onde mora não é requisito)* |
| "✅ pronto · 🧪 só na maquete · 📄 não codificado" | *(nada — não existe status de implementação)* |
| "o sistema anterior fazia assim" | *(a regra, sem a origem)* |
| "decidido na sessão de 14/08" | *(a decisão, sem a data interna)* |
| "conflita com a especificação tal" | *(nada — conflito resolvido não sobrevive aqui)* |

**Nenhum documento desta pasta menciona projeto, repositório, arquivo, módulo, componente, tela, tecnologia, versão ou identificador de teste.** Se uma frase só faz sentido para quem conhece o sistema anterior, ela não pertence aqui.

**O que se preserva:** a **razão** de cada regra. Uma regra sem o porquê vira dogma e é a primeira a ser quebrada por conveniência. A justificativa fica; a citação bibliográfica interna sai.

**O que não se acrescenta:** nada. Nenhuma função, requisito ou comportamento que não esteja no material auditado. Se durante a escrita aparecer uma lacuna que exija decisão, ela é registrada como pergunta — nunca preenchida por conta própria.

---

## Nível de detalhe

Cada documento traz, além da regra e da sua razão:

| Elemento | O que é | Para quê |
|---|---|---|
| **Exemplos de conteúdo** | blocos monoespaçados mostrando o que o operador lê e em que ordem | Uma mensagem descrita em abstrato vira dez implementações diferentes. O texto exemplo fixa o tom e o nível de informação. |
| **Casos de borda** | tabela `situação → comportamento → por quê` ao fim de cada seção | É onde a especificação normalmente falha e a implementação decide sozinha. |
| **Lacunas marcadas** | `⚠ NÃO DEFINIDO` seguido da pergunta formulada | Comportamento que o material não define não é inventado aqui. |

**Os exemplos ilustram conteúdo e hierarquia da informação, não desenho de tela.** Não definem posição, cor, tipografia nem espaçamento.

**As perguntas levantadas nos casos de borda ficam consolidadas ao fim de cada documento**, numeradas, para decisão em bloco.

---

## Os documentos

| # | Documento | Cobre | Depende de pesquisa? |
|---|---|---|---|
| **E0** | `E0_PRINCIPIO_DA_CALCULADORA_AGNOSTICA.md` | os dois eixos do produto — dependência e profundidade. **Vence todos os demais documentos do projeto** | ✅ Não |
| **E1** | **`E1_DOMINIO_E_CATALOGO.md`** | ✅ **escrito** — famílias de usinagem, catálogo de ferramentas, substratos, materiais e operações (revestimento saiu do produto — Q18) | ✅ Não — R2, R3 e R4 fecharam; as fragilidades que restam estão declaradas no fim do documento |
| **E2** | **`E2_ENTRADAS_E_CONFIGURACAO.md`** | ✅ **escrito** — campos, faixas e envelope, validação em três naturezas, controles de corte, perfil de máquina, fator de segurança e preferências | ✅ Não — R1 fechou a faixa de diâmetro; o que resta está declarado no fim do documento |
| **E3** | `E3_RESULTADOS_E_APRESENTACAO.md` | o que o sistema entrega e as regras de exibição | ✅ Não |
| **E4** | **`E4_INDICADORES_E_SEGURANCA.md`** | ✅ **escrito** — as três camadas, os quatro níveis de segurança, a tabela de gatilhos, a previsão de comportamento e a direção de ajuste | ✅ Não — R5 e R6 fecharam; dois números continuam em ⧗ (deflexão em micrômetros e vida em número), declarados no fim do documento |
| **E5** | `E5_INTERACAO_E_FLUXO.md` | painel, ordem, colapso, momento do cálculo, edição reversa, ajuda, profundidade de entrada, estados | ✅ Não |
| **E6** | `E6_DADOS_DO_USUARIO.md` | histórico, favoritos, biblioteca de ferramentas, importar e exportar | ✅ Não |
| **E7** | **`E7_ESCOPO_E_FRONTEIRAS.md`** | ✅ **escrito** — as quatro naturezas de fronteira, o que foi descartado, o que ficou adiado, o que está bloqueado por dado e o que é decisão pendente | ✅ Não |

> ✅ **Vocabulário fechado em 26/08/2026 — E1, E2, E4 e E7 estão desbloqueados.** O `E0` foi reescrito
> e "camada 1 / camada 2" saiu do projeto: o nome designava três coisas em três documentos. Entraram
> **dois eixos independentes** — dependência (núcleo agnóstico → ambiente declarado) e profundidade
> (entrada mínima → entrada completa). A tabela de tradução do vocabulário antigo está em `E0` §2.1.
> **Ao escrever E1, E2, E4 e E7, use o vocabulário novo.**
>
> Seis pendências continuam abertas em `E0` §7 (A1–A6) — mas são corte de MVP, lacuna de dado e
> motor de cálculo, **não ambiguidade**. Origem em `../../inicio_fenix/`.

**Falta escrever:** nada. **Os oito documentos estão escritos** — E7 foi o último, porque a fronteira
só existe depois do interior. O que continua aberto está consolidado nele: 29 perguntas para decisão
em bloco, e os itens bloqueados por acesso a documento nomeado.
**Esperam pesquisa:** nada em estrutura. Dentro de E4, dois valores continuam marcados `⧗ AGUARDA` — deflexão em micrômetros e vida de ferramenta em número —, e os dois dependem de **acesso a documento nomeado**, não de nova rodada.

Onde um valor depende de rodada de pesquisa ainda não concluída, o documento traz o marcador:

> `⧗ AGUARDA R{n}` — com a descrição do que o número representa e o que a pesquisa precisa devolver.

Assim o documento fica completo em estrutura desde já, e o número entra depois sem reescrita.

---

## Relação com as outras pastas

| Pasta | Papel |
|---|---|
| `escopo/` | **o quê** — funções, comportamentos e regras do sistema |
| `canonicos/` | **quanto** — fórmulas, constantes e limiares, cada um com fonte |
| `mvp/` | **o corte** — que fatia do escopo é o primeiro produto funcional |
| `pesquisa/` | processo que produz os canônicos, e a proveniência de cada número |
| `construcao/` | tecnologia, ordem e tela — o que esta pasta proíbe mencionar |
| `../inicio_fenix/` | **o problema** — JTBD, entrevista de campo e arquivos reais da fábrica |

`escopo/`, `canonicos/` e `mvp/` juntos são a especificação completa. Um descreve a função, o outro fornece o número que ela usa, o terceiro define o corte. Nenhum dos três cita implementação.

---

## O que estes documentos não são

- **Não são arquitetura.** Não definem camadas, módulos, banco de dados, API ou tecnologia.
- **Não são plano de implementação.** Não têm ordem de construção, estimativa ou divisão em etapas.
- **Não são design de tela.** Descrevem o comportamento e a hierarquia da informação, não a aparência — cor, tipografia e espaçamento são decisão posterior.

A fronteira prática: se a frase responde **o que o sistema faz e por quê**, pertence aqui. Se responde **como é construído ou como se parece**, não.
