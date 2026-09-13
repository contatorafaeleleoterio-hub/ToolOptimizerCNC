# User Story Map — Fenix

> **Artefato Canônico da Fase 1 — Concepção e Planejamento AI-First**  
> **Status:** Aprovado e Vigente  
> **Data de Consolidação:** 07/09/2026  
> **Autoridade:** Este documento define a jornada do usuário de ponta a ponta, as histórias de usuário estruturadas e a linha delimitadora inegociável do MVP.

---

## 1. Visão Geral da Jornada do Usuário

A jornada do Fenix espelha o fluxo de trabalho real de um operador ou programador de CNC: desde a chegada da ordem de serviço/desenho na máquina até a digitação dos parâmetros no comando numérico e o acompanhamento do corte.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   JORNADA CRONOLÓGICA DO USUÁRIO                                       │
├───────────────┬───────────────┬───────────────┬────────────────┬───────────────────────┬───────────────┤
│  Atividade 1  │  Atividade 2  │  Atividade 3  │  Atividade 4   │      Atividade 5      │  Atividade 6  │
│ Contexto do   │ Ferramenta &  │ Montagem &    │ Cálculo &      │ Refinamento HITL &    │ Execução CNC  │
│ Material      │ Geometria     │ Profundidade  │ Comportamento  │ Instrução de Ajuste   │ & Persistência│
└───────────────┴───────────────┴───────────────┴────────────────┴───────────────────────┴───────────────┘
```

---

## 2. Estrutura do Story Map (Backbone & User Stories)

A tabela abaixo organiza as histórias de usuário por atividade cronológica. A **Linha de Corte do MVP** separa o que é obrigatório no primeiro produto do que compõe os lançamentos subsequentes.

```
══════════════════════════════════════════════════════════════════════════════════════════════════════════
▲ ACIMA DA LINHA: ESCOPO DO MVP (Entrega em 30 segundos, núcleo agnóstico, biblioteca local e HITL)
──────────────────────────────────────────────────────────────────────────────────────────────────────────
▼ ABAIXO DA LINHA: PÓS-MVP / EVOLUÇÃO FUTURA (Ambiente declarado, perfis de máquina, telemetria)
══════════════════════════════════════════════════════════════════════════════════════════════════════════
```

| Atividade | Tarefas do Usuário | User Stories no MVP (Acima da Linha) | Histórias Pós-MVP (Abaixo da Linha) |
|---|---|---|---|
| **1. Contexto do Material** | Escolher material a ser usinado<br>Conferir propriedades<br>Cadastrar liga customizada | **US-01:** Como operador, quero selecionar o material da peça a partir de uma lista padrão de 12 materiais industriais, para que o sistema carregue propriedades de corte verificadas.<br>**US-02:** Como operador, quero cadastrar um material customizado ou editar as propriedades físicas (\(k_{c1.1}, m_c, v_c\)) na área Configurações, para usar os dados específicos da carta técnica do meu fornecedor. | **US-03-POST:** Como gestor, quero importar tabelas de materiais em lote via arquivo estruturado, para padronizar o parque de máquinas. |
| **2. Ferramenta & Geometria** | Escolher família de corte<br>Definir tipo e dimensões<br>Gerenciar catálogo | **US-04:** Como operador, quero alternar entre as 4 famílias canônicas (**Fresar**, **Furar**, **Roscar**, **Mandrilar**), para que o painel adapte os campos geométricos específicos da operação.<br>**US-05:** Como operador, quero informar diâmetro (\(D\)), número de arestas (\(Z\)) e raio (\(r\)), para que o sistema calcule as grandezas dinâmicas com rigor dimensional.<br>**US-06:** Como operador no painel Furar, quero selecionar o modo broca de aço rápido (HSS-Co), para obter os parâmetros segundo a prática de oficina com pica-pau (\(D/25\)) e \(v_f = 10\% n\).<br>**US-07:** Como operador, quero gerenciar minha biblioteca de ferramentas na área Configurações, para reutilizar montagens usuais sem redigitar dimensões. | **US-08-POST:** Como programador, quero calcular parâmetros para fresas cônicas e ferramentas de 5 eixos inclinadas, para operações de matrizaria complexa. |
| **3. Montagem & Profundidade** | Informar balanço livre<br>Definir profundidade/passo | **US-09:** Como operador, quero informar o balanço da ferramenta (\(L\)) e a profundidade de corte (\(a_p\)) como caixas diretas de digitação, para que a calculadora processe a rigidez relativa (\(L/D\)) e o volume de cavaco. | **US-10-POST:** Como operador, quero receber compensação automática contínua de parâmetros em função do balanço (\(L\)), assim que houver correlação analítica publicada (Lacuna L15). |
| **4. Cálculo & Comportamento** | Executar cálculo<br>Obter comandos S e F<br>Verificar integridade | **US-11:** Como operador, quero acionar o comando "Calcular" e obter confirmação visual imediata (check D10) e exibição destacada de Rotação (\(S\)) e Avanço (\(F\)), para digitá-los no comando CNC em menos de 30 segundos.<br>**US-12:** Como operador, quero ver o indicador de segurança (**NORMAL**, **ATENÇÃO**, **CRÍTICO**) e o bloco "O que vai acontecer", para saber antecipadamente se o corte provocará vibração, superaquecimento ou risco de quebra.<br>**US-13:** Como operador, quero que nenhum cálculo seja bloqueado ou recusado caso eu digite parâmetros extremos (R1), para que eu mantenha autonomia técnica e veja a dimensão do desvio. | **US-14-POST:** Como operador, quero visualizar a vida útil da ferramenta estimada em minutos exatos, assim que os coeficientes de Taylor forem calibrados por liga (Lacuna L13).<br>**US-15-POST:** Como programador, quero verificar se a potência exigida excede a potência disponível no spindle da minha máquina CNC específica (perfil de máquina). |
| **5. Refinamento HITL & Instrução** | Ajustar rotação e avanço<br>Consultar trade-offs<br>Explorar gavetas | **US-16:** Como operador, quero ajustar Rotação e Avanço diretamente em botões de \(\pm 10\%\) com recálculo instantâneo de toda a cadeia física, para buscar o ponto ideal de operação sem reiniciar o fluxo.<br>**US-17:** Como operador, quero abrir gavetas contextuais de instrução para cada parâmetro (\(v_c, a_e, f_z, a_p\)), para entender o que acontece se eu aumentar ou diminuir cada variável (trade-offs explícitos).<br>**US-18:** Como operador, quero que textos explicativos e gavetas secundárias nasçam recolhidos por padrão (D9), para manter o foco visual estrito nos números de comando. | **US-19-POST:** Como operador, quero visualizar trilhas gráficas de faixa recomendada de parâmetros com marcadores de dispersão (D4).<br>**US-20-POST:** Como programador, quero comparar dois conjuntos de parâmetros lado a lado na mesma tela (T12). |
| **6. Execução CNC & Persistência** | Aplicar parâmetros<br>Ajustar margem de segurança<br>Persistir preferências | **US-21:** Como operador, quero aplicar uma Margem de Segurança percentual persistente (padrão \(100\%\)) em Configurações, para escalar os números exibidos de acordo com meu critério de agressividade sem mascarar alertas físicos.<br>**US-22:** Como operador, quero que meus favoritos e histórico de cálculos recentes fiquem gravados localmente sem exigir login ou conexão de rede (R11), para acesso imediato no próximo turno. | **US-23-POST:** Como gestor de fábrica, quero gerar relatórios de processo e sincronizar dados com o sistema ERP/MES via nuvem corporativa. |

---

## 3. Delimitação Clara da Linha do MVP

### 3.1 O que está Dentro do MVP (Core Agnóstico)

1. **4 Famílias de Usinagem:** Fresar (topo reto, toroidal, esférica), Furar (metal duro e broca HSS com modo de pica-pau), Roscar (machos métricos M3 a M16) e Mandrilar.
2. **5 Entradas Centrais:** Material da peça, Tipo de ferramenta, Diâmetro (\(D\)) com arestas (\(Z\)) e raio (\(r\)), Balanço livre (\(L\)), Profundidade (\(a_p\)) / Incremento de passe.
3. **Resultados Acionáveis:**
   - Heróis de comando: Rotação (\(S\) em rpm) e Avanço (\(F\) em mm/min) com ajuste fino \(\pm 10\%\);
   - Resultados de verificação: Espessura de cavaco (\(h_{ex}\) ou \(h_m\)), Potência de corte na aresta (\(P_c\)), Torque (\(M_c\)), Taxa de remoção (\(MRR\)), Rigidez (\(L/D\));
   - Indicador de segurança com precedência canônica: **CRÍTICO** > **ATENÇÃO** > **NORMAL**;
   - Previsão qualitativa honesta: "O que vai acontecer" e "O que mexer";
   - Gavetas de instrução por parâmetro (nascem recolhidas).
4. **Área Configurações:**
   - Edição e cadastro de materiais customizados (\(k_{c1.1}, m_c, v_c\));
   - Gestão da biblioteca de ferramentas salvas;
   - Margem de segurança global (lente de leitura sobre resultados, padrão 100%).
5. **Histórico Local e Favoritos:** Persistidos em `localStorage` no dispositivo, zero dependência de rede.

### 3.2 O que está Explicitamente Fora do MVP (Pós-MVP)

1. **Perfil de Máquina:** Potência de motor elétrico, rotação máxima de spindle e torque de máquina (ambiente declarado).
2. **Cálculo de Deflexão Absoluta em \(\mu m\):** Bloqueado por falta de dados modais e coeficientes de rigidez (Lacuna L14).
3. **Tempo de Vida Útil em Horas/Peças:** Bloqueado por ausência de expoentes de Taylor normalizados para fresamento (Lacuna L13).
4. **Login, Senha, Perfis de Acesso e Sincronização em Nuvem:** Violação da premissa de zero atrito industrial e independência de rede.
5. **Comparação Lado a Lado de Resultados:** Decisão do Mestre (Q3) para preservar simplicidade de tela.
6. **Controle Único de Agressividade (Slide Geral):** O operador ajusta grandezas individualmente com física declarada.
