# Roteiro Granular de Implementação (tasks.md)

**Fase 2 — Planejamento Executável**

As tarefas devem ser implementadas usando **Test-Driven Development (TDD)**: primeiro cria-se o teste
que valida o AC, certifica-se da falha, implementa a lógica, certifica-se do passe.

> **O teste tem de falhar pelo motivo certo.** Teste que passa porque a função devolve a constante que
> ele espera não validou nada — foi assim que o Ciclo 1 saiu na primeira volta e foi por isso que
> precisou ser refeito (§Registro, abaixo). Antes de dar uma tarefa por concluída, altere uma fórmula
> do módulo e confirme que a suíte quebra.

Comandos: `npm test` (suíte), `npm run typecheck` (tipos), `npm run check` (os dois).

## Ciclo 1: Core de Cálculo e Analisador (TypeScript Puro)

### ~~TASK-001: Inicialização do Repositório e Toolchain Core~~ — concluída
* **Descrição:** Configurar projeto NPM (`package.json`), TypeScript e Vitest para desenvolvimento do Core.
* **Arquivos afetados:** `package.json`, `tsconfig.json`, `vitest.config.ts`.
* **Critério de Conclusão:** `npm run check` executando com sucesso.
* **Revisado em 08/09:** projeto passou a `type: module`, `moduleResolution: bundler`, `noEmit` e
  `strict` reforçado (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`); entraram os scripts
  `typecheck`, `test:watch` e `check`.

### ~~TASK-002: Implementação do Core Matemático Nominal (Fresamento)~~ — concluída
* **Descrição:** Cadeia de `n`, `vf`, `hm`, `hex`, `CTF`, `kc`, `Q`, `Pc` e `Mc` para a família Fresar.
* **Rastreabilidade:** US-001 → AC-001
* **Onde vive:** `src/core/calculator.ts` (`calculateMilling`, `effectiveDiameter`).
* **Critério de Conclusão:** `src/core/__tests__/milling.spec.ts` passando, incluindo as invariantes
  do `CANONICO_MOTOR_DE_CALCULO §1.6`.

### ~~TASK-003: Implementação do Core Matemático (Furação Prática)~~ — concluída
* **Descrição:** Modo de oficina para broca de aço rápido (`n = 318 · vc / D` truncado, `fn` = 0,10 mm/rot,
  passo do pica-pau `D/25` com teto 0,8 mm) e a cadeia de metal duro ao lado dele.
* **Rastreabilidade:** US-002 → AC-002
* **Onde vive:** `src/core/calculator.ts` (`calculateDrilling`, `HSS_MODE`).
* **Critério de Conclusão:** `src/core/__tests__/drilling.spec.ts` passando, reproduzindo o caso
  verificador do `ESCOPO_BROCA_ACO_RAPIDO §2`.

### ~~TASK-004: Analisador de Segurança Física~~ — concluída
* **Descrição:** Gatilhos do `MVP §9.2` e a precedência CRÍTICO > ATENÇÃO > NORMAL.
* **Rastreabilidade:** US-003 → AC-003
* **Onde vive:** `src/core/analyzer.ts`.
* **Cobertos:** 2 (rasgo cheio), 3 (`ae > D`), 4 (janela de `vc`), 5 (balanço por tipo de haste),
  6 e 7 (profundidade do furo), 10 (toroidal com `ap < r`).
* **Fora do escopo desta tarefa, por falta de família implementada:** 8 e 9 (roscamento) e 11
  (diâmetro abaixo do mínimo da geometria — depende de `tools.ts`, TASK-008).
* **Critério de Conclusão:** `src/core/__tests__/analyzer.spec.ts` passando, com a verificação de que
  entrada fisicamente impossível entrega resultado em vez de exceção.

### ~~TASK-005: Motor de Ajuste Tátil e Fator de Margem~~ — concluída
* **Descrição:** Passo de 5% sobre a rotação recalculando a cadeia inteira, inversões `vf → fz` e
  `vf → fn`, e a lente global de margem de segurança.
* **Rastreabilidade:** US-004 → AC-004, US-006 → AC-006
* **Onde vive:** `src/core/adjust.ts` e `src/core/display.ts`.
* **Critério de Conclusão:** `src/core/__tests__/adjust.spec.ts` passando, com as seis regras do
  `MVP §4.9` verificadas uma a uma.

## Ciclo 2: Infraestrutura de Persistência (IndexedDB) — concluído

### ~~TASK-006: Camada de Persistência Base~~ — concluída
* **Descrição:** Wrapper sobre IndexedDB para as tabelas de Material e Ferramentas customizadas.
* **Rastreabilidade:** US-005 → AC-005
* **Depende de:** `src/core/materials.ts` (pronto) — os materiais de fábrica são a semente imutável;
  o cadastro do operador entra por cima, com `isCustom: true`.
* **Critério de Conclusão:** Funções de inserir, editar e listar material rodando nos testes
  (`fake-indexeddb` ou jsdom), e a verificação de que nenhuma requisição de rede ocorre.

### ~~TASK-007: Persistência das Configurações~~ — concluída
* **Descrição:** Margem de segurança e os três padrões editáveis do modo aço rápido
  (`ESCOPO_BROCA_ACO_RAPIDO §5`: percentual do avanço, divisor e teto do incremento).
* **Rastreabilidade:** US-006 → AC-006, `ESCOPO_CONFIGURACOES §10`
* **Nota:** as constantes já existem em `HSS_MODE` e são o padrão de fábrica; esta tarefa dá a elas
  um valor persistido por cima, não uma segunda fonte.

### ~~TASK-008: Repositório de Geometrias (`tools.ts`)~~ — concluída
* **Descrição:** As 17 geometrias do `MAPEAMENTO_CAMPOS_FERRAMENTAS §2`, com os campos que cada uma
  pede e a faixa de diâmetro por substrato.
* **Destrava:** o gatilho 11 do `MVP §9.2` e os valores de partida por geometria (`MVP §3.2`).


## Ciclo 3: Apresentação (React UI) — concluído

As tarefas a seguir cobrem a conversão do protótipo estático (`Docs_inicial/construcao/prototipo/index.html`) para a casca React interativa e offline-first.

### ~~TASK-009: Setup do React e Toolchain UI~~ — concluída
* **Descrição:** Inicializar Vite (React + TS), configurar CSS/tokens do protótipo, e configurar o `vitest` para renderização de componentes (`jsdom` e `@testing-library/react`).
* **Critério de Conclusão:** Ambiente roda `npm run dev`, `npm run build` e testes do componente `<App />` rodam com sucesso.

### ~~TASK-010: Estrutura de Estado (Context/Zustand)~~ — concluída
* **Descrição:** Criar a store/contexto principal (`CalculatorContext`) que conecta a UI ao motor de cálculo síncrono. Gerencia os inputs ativos e invoca `calculateMilling`/`calculateDrilling` dinamicamente ao mudar qualquer valor (live calculation, Cenários A a I).
* **Critério de Conclusão:** Testes automatizados em `store.spec.tsx` validam estado inicial zerado, habilitação sob requisitos mínimos, live updates e ajuste tátil de ±5%.

### ~~TASK-011: Componentes de Input Baseados em Geometria~~ — concluída
* **Descrição:** Criar o seletor de Família -> Geometria que exibe condicionalmente os campos específicos (`r` para toroidal, `kappa` para alto avanço, etc), carregando defaults de `src/core/tools.ts`.
* **Critério de Conclusão:** O teste `inputs.spec.tsx` assegura que selecionar "Toroidal" revela o campo de raio e esconde outros irrelevantes, e valida a habilitação do CTA.

### ~~TASK-012: Painel de Resultados, Alertas e Cores~~ — concluída
* **Descrição:** Implementar a exibição bidirecional (hero numbers) de RPM e Avanço e a formatação de alertas de segurança (gatilhos). Utiliza `display.ts` para textos e a paleta canônica (CRÍTICO = `#B8461D`, ATENÇÃO = `#A96208`, NORMAL = `#1B6E5C`).
* **Critério de Conclusão:** Testes em `results.spec.tsx` validam hero numbers, cartões de física, ajuste fino tátil e exibição correta de alertas no Cenário 3 (ae > D).

### ~~TASK-013: UI de Configurações Globais~~ — concluída
* **Descrição:** Construir a aba de configurações persistindo dados no IndexedDB via `storage.ts` (margem de segurança, edição dos valores de aço rápido, cadastro de materiais customizados).
* **Critério de Conclusão:** O teste `settings.spec.tsx` monta a aba, insere dados, e verifica persistência real no IndexedDB via `fake-indexeddb`.

## Ciclo 4: o que a especificação estrutural do painel deixou nomeado — em aberto

Levantado em `Docs_inicial/construcao/design-system/`, achados **H** e **J**. Não são defeito: são
requisito do escopo que nem o protótipo nem a casca implementaram, e cada um carrega decisão de
produto que **o Mestre resolve**, não o agente. Ficam descritos aqui para não voltarem a ser achado
solto.

### TASK-014: Blocos de configuração recolhíveis, com as três regras do escopo
* **Requisito:** `E5 §3`. A casca **não tem colapsável nenhum** hoje — o `.bhead` existe no
  `src/ui/index.css` e nenhum componente o gera, herdado da folha do protótipo. O protótipo tem três
  cabeçalhos recolhíveis e cumpre só a metade fácil.
* **O que o escopo pede, e falta nas duas implementações:**
  1. **Regra 2** — o cabeçalho recolhido mostra o **resumo dos valores**, não a contagem de campos.
     "Ø10 · Z4 · L45" permite conferir sem abrir; "3 campos" não informa nada.
  2. **Regra 3** — o estado de cada bloco **persiste entre sessões**. Hoje o protótipo preserva só
     entre renders da mesma sessão. Vai no IndexedDB, junto das outras preferências da oficina.
  3. **Regra 4** — bloco com campo inválido ou obrigatório vazio **não recolhe**, e **abre sozinho**
     se o erro surgir enquanto está recolhido. Erro escondido em gaveta é erro que não existe para o
     operador.
  4. **Regra 6 de `E5 §3.2`** — trocar de ferramenta muda quais campos existem; o bloco **abre**,
     porque campo novo recolhido é campo preenchido sem ninguém olhar.
* **Decisão que o Mestre precisa dar:** quantos blocos recolhíveis, e quais. O `E5 §2.1` foi emendado
  em 09/09/2026 e agora descreve três blocos, não cinco.
* **Critério de Conclusão:** teste que recolhe um bloco, invalida um campo dentro dele e vê o bloco
  abrir sozinho; teste que recarrega a casca e encontra o mesmo bloco recolhido; e o `.bhead` deixa de
  ser regra sem gerador.

### TASK-015: Tela pequena — seções alternáveis em vez de empilhamento
* **Requisito:** `E5 §11` e `§11.2`. Hoje protótipo e casca **empilham** as duas colunas abaixo de
  1.080px. Empilhar cumpre a **R13** quanto à capacidade — nada some — mas não cumpre a leitura: com
  as colunas empilhadas num celular, mudar um campo e ver o efeito exige rolar, e o brief §3.5
  descreve esse ciclo como repetido dezenas de vezes por dia.
* **O que o escopo pede:** as áreas viram **seções alternáveis** — configurar · resultados · ajustar —
  com aviso quando chega resultado novo na seção que não está à vista, e com o alerta aparecendo **na
  seção atual**, sem esperar navegação (é condição de segurança, não pode depender de navegar).
* **Decisão que o Mestre precisa dar:** em que largura a alternância substitui o empilhamento, e se as
  seções são três ou duas. O escopo nomeia três; o painel hoje tem duas colunas mais a área
  Configurações.
* **Critério de Conclusão:** teste que, na largura de celular, encontra o alternador; que um alerta
  crítico aparece na seção ativa qualquer que seja ela; e que chegar resultado novo em outra seção
  sinaliza sem trocar a tela sob o dedo do operador.

## Registro da revisão de 08/09/2026

O Ciclo 1 foi entregue numa primeira volta com `calculateMilling` devolvendo `hm`, `Pc` e `Mc` como
constantes literais escolhidas para casar com o teste, e o próprio teste comentado com *"simplified
for harness"*. Além disso três valores do `spec.md` não vinham de cálculo nenhum. O que mudou:

| Achado | Correção |
|---|---|
| `hm = 0.018`, `Pc = 0.42`, `Mc = 0.9` hardcoded no motor | cadeia do `CANONICO_MOTOR_DE_CALCULO §1.4` implementada de ponta a ponta |
| Assinatura `(input: any): any` | contratos tipados em `types.ts`, `strict` reforçado no `tsconfig` |
| Um único teste, sem poder de detecção | 48 testes em 4 arquivos, verificados por mutação da fórmula |
| Nenhum módulo além de `calculator.ts` | `types`, `materials`, `analyzer`, `adjust`, `display`, `index` |
| `spec.md` com número sem procedência | cada AC cita a fonte; correções registradas no `spec.md §4` |
