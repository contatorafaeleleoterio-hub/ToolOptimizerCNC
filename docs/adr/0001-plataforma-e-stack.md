# ADR-0001 — Plataforma e stack do Fenix

**Status:** Aceita
**Data:** 25/08/2026
**Decide:** `construcao/QUESTOES_ABERTAS_CONSTRUCAO.md` §Q1
**Decisor:** Mestre (Rafael)

---

## Contexto

O Fenix tem a especificação de produto completa (`Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md`,
1434 linhas) e nenhuma linha de código. Os documentos de escopo proíbem, por regra escrita, nomear
tecnologia — então a plataforma nunca foi decidida em lugar nenhum.

Q1 era a raiz da árvore de construção: granularidade de ticket, framework de teste e persistência dos
dados editados do material dependem dela.

A questão estava registrada como "só o Mestre resolve", porque parecia depender de uma decisão
comercial ainda não tomada — se o Fenix seria vendido junto com o FlowNC, o que empurraria para
desktop nativo.

**Essa dependência foi desfeita, não respondida.** Com o núcleo de cálculo isolado da casca, a
escolha da casca vira reversível e barata; a decisão comercial pode ser tomada depois, quando houver
informação para tomá-la.

---

## Decisão

**Núcleo de cálculo em TypeScript puro, isolado. Casca web em React + TypeScript, entregue como PWA
instalável e offline-first. Empacotamento desktop via Tauri, sobre o mesmo código, se e quando o
FlowNC exigir.**

### A stack, camada a camada

| Camada | Escolha | Amarração |
|---|---|---|
| **Núcleo** | TypeScript puro — funções entrada→saída, zero import de UI, zero I/O | As duas travas do §13.2 do MVP viram teste unitário sem tela nem navegador |
| **Dados canônicos** | Módulos de dados separados, um por canônico, cada registro carregando fonte e rótulo de confiança | É a condição da Q2: fechar um canônico depois é trocar uma tabela, não caçar constante espalhada |
| **Casca** | React + TypeScript, build com Vite | Painel persistente reativo (MVP, P1) |
| **Persistência** | IndexedDB atrás de uma camada fina; export/import em JSON **com número de versão desde o primeiro dia** | `E6_DADOS_DO_USUARIO` §7, e antecipa a Q15 (compatibilidade retroativa), hoje `NÃO DEFINIDO` |
| **Entrega** | PWA instalável, service worker com precache total — fonte, ícone e tabela dentro do pacote. **Zero CDN, fonte embarcada** | Única forma de cumprir "nenhuma requisição em tempo de uso". A §10.1 do E5 cita fonte nominalmente |
| **Teste** | Vitest | Mesma toolchain do build; roda o núcleo sem DOM |
| **Desktop** | Tauri, depois, se preciso | Reversível — adia a decisão comercial sem custo |

---

## Razão

A pergunta "web ou desktop" estava mal colocada. A decisão que importa é **onde fica a fronteira
entre o que calcula e o que aparece**.

Cinco fatos, todos já escritos nos documentos do projeto, fecham o desenho antes de qualquer
preferência de tecnologia:

| # | O que o documento determina | Consequência técnica |
|---|---|---|
| 1 | "Zero dependência de rede em tempo de uso" — P10, e a §10.1 explica que é requisito, não preferência | **Não existe backend no MVP.** O produto inteiro é cliente. Nenhum servidor a escolher, nenhuma API a projetar |
| 2 | Sincronização entre dispositivos está fora de escopo | Sem conta, sem login, sem nuvem. Confirma o item 1 |
| 3 | "O sistema roda numa máquina de oficina. Máquina de oficina é formatada, trocada e compartilhada" | Persistência local mais exportar/importar arquivo. É o único I/O do produto |
| 4 | Tela pequena entrega "a mesma capacidade, reorganizada" — não uma versão reduzida | Duas formas de tela são **requisito**. Uma base de código ou duas — e duas dobram o custo de cada regra de segurança |
| 5 | Painel persistente, usado dezenas de vezes por dia, resultado "sem espera perceptível" | Estado reativo em memória. O cálculo é aritmética escalar, microssegundos em qualquer runtime. **Nenhum requisito de performance justifica nativo** |

Somando: sem backend, sem acesso a hardware, sem processamento pesado, sem sistema de arquivos além
de um arquivo de exportação. **Nativo não compra nada aqui.** A web entrega o item 4 de graça.

---

## Consequências

**Positivas**
- Uma base de código serve o PC da oficina, o celular e o tablet — os três aparecem no escopo.
- O núcleo é testável sem navegador; as duas travas do §13.2 são teste desde o primeiro ticket.
- Fechar `CANONICO_MOTOR_DE_CALCULO`, `CANONICO_VELOCIDADES_E_AVANCOS` ou `CANONICO_DEFLEXAO_E_VIDA`
  depois é trocar um módulo de dados, sem tocar a lógica.
- A decisão comercial sobre o FlowNC fica aberta sem custo de retrabalho.

**Negativas e restrições aceitas**
- **Nenhum recurso externo em runtime.** Nada de CDN, nada de fonte remota, nada de ícone hospedado.
  Tudo entra no pacote. Isso restringe escolha de biblioteca e precisa ser verificado no build.
- PWA em Windows depende do navegador instalado e da política de TI da oficina. Se isso barrar,
  a saída é Tauri — troca de casca, não de arquitetura.
- IndexedDB é assíncrono. A camada de persistência tem que isolar isso do núcleo, que é síncrono e
  puro.

**O que fica proibido por esta decisão**
- Regra de cálculo dentro de componente de tela.
- Constante numérica escrita direto na lógica, fora do módulo de dados canônico.
- Qualquer requisição de rede no caminho de uso do operador.

---

## Onde esta decisão pode estar errada

Registrado para não se perder. Nenhum dos três invalida a arquitetura — todos trocam só a casca.

| # | Condição que mudaria a decisão | Efeito |
|---|---|---|
| 1 | Oficina com PC Windows travado por política de TI, ou navegador antigo demais para PWA | Tauri desde o começo. Custo baixo — o núcleo não muda |
| 2 | Licenciamento amarrado à máquina, se vender junto com o FlowNC | Nativo facilita. Informação que só o Mestre tem |
| 3 | O Fenix precisar ler pós-processador, G-code ou algo do sistema de arquivos além da exportação | A fronteira muda. Nenhum documento pede isso hoje |

---

## Fontes da decisão

Tudo o que sustenta esta ADR já estava escrito no projeto. Nada foi arbitrado.

| Afirmação | Origem |
|---|---|
| Zero dependência de rede em tempo de uso (P10) | `Docs_inicial/escopo/E5_INTERACAO_E_FLUXO.md`, linha 28 |
| "Sem rede" é requisito, não preferência — e cita fonte, ícone e tabela | idem, §10.1, linha 426 |
| Tela pequena entrega a mesma capacidade, reorganizada | idem, §11, linha 432 |
| Alvo de toque para operação com luva; operação por teclado completa | idem, §10 |
| O sistema roda numa máquina de oficina, que é formatada e trocada | `Docs_inicial/escopo/E6_DADOS_DO_USUARIO.md`, linha 212 |
| Sincronização entre dispositivos fora de escopo | idem, linha 248 |
| Compatibilidade retroativa do arquivo exportado ainda `NÃO DEFINIDO` (Q15) | idem, §7.4 |
| Painel persistente, dezenas de usos por dia (P1); atributos "Rápida" e "Dinâmica" | `Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md`, §1.2 e §2.1 |
| As duas travas que viram teste automatizado | idem, §13.2 |
| Condição "os números moram num lugar só, isolados da lógica" | `Docs_inicial/construcao/QUESTOES_ABERTAS_CONSTRUCAO.md`, Q2 |
| Fatia vertical como primeiro lote de tickets | idem, Q3 |
| O Fenix não herda arquivo, estrutura nem nome do sistema anterior | `Docs_inicial/HANDOFF.md`, §6 |

---

## O que esta decisão destrava

As três questões que dependiam da Q1, agora respondíveis:

1. Onde vivem os dados editados pelo operador → IndexedDB local, export/import versionado.
2. Framework de teste → Vitest, e as travas do §13.2 rodam contra o núcleo puro.
3. Granularidade dos tickets → por fatia de comportamento atravessando núcleo e casca, não por seção
   da spec.
