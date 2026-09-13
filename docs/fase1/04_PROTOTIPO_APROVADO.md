# Protótipo Aprovado — Fenix

> **Artefato Canônico da Fase 1 — Concepção e Planejamento AI-First**  
> **Status:** Aprovado em Camada 1 (Conforme Gabarito v1.6)  
> **Data de Consolidação:** 07/09/2026  
> **Autoridade:** Este documento formaliza o inventário visual, o fluxo de telas, a arquitetura de interação Human-in-the-Loop (HitL), a fronteira da IA e os resultados da validação do protótipo oficial do Fenix.

---

## 1. Inventário de Arquivos do Protótipo Oficial

O protótipo visual reside em `Docs_inicial/construcao/prototipo/` e é composto por 10 folhas modulares (`.dc.html`), arquivos de configuração de canvas e builds compilados prontos para inspeção:

| Arquivo | Descrição e Papel Visual | Resolução / Alvo |
|---|---|---|
| **`Main.dc.html`** | Tela principal de cálculo para a família **Fresar** (caso canônico: fresa toroidal em Aço 1045, heróis \(S\) e \(F\), cartões de resultado, alerta de balanço). | Desktop fluido (≥ 1080px) |
| **`Furar.dc.html`** | Painel da família **Furar**, contendo o modo canônico de broca de aço rápido (HSS-Co) com pica-pau (\(D/25\)) e \(v_f = 10\% n\). | Desktop |
| **`Roscar.dc.html`** | Painel da família **Roscar** para machos de corte e conformação (tabelas métricas M3 a M16, diâmetro de broca prévia). | Desktop |
| **`Mandrilar.dc.html`** | Painel da família **Mandrilar** para cabeçotes de barra única e ferramentas de acabamento de furo. | Desktop |
| **`Fresar-Variantes.dc.html`** | Demonstração de cálculo para fresa esférica e fresa de topo reto em desbaste pesado. | Desktop |
| **`Configuracoes.dc.html`** | Tela dedicada para gestão de materiais (cadastro customizado de \(k_{c1.1}, m_c, v_c\)), biblioteca de ferramentas e margem de segurança global. | Desktop / Tablet |
| **`Estados.dc.html`** | Painel de validação de todos os estados do sistema (Vazio, Normal, Atenção, Crítico, Desatualizado). | Desktop |
| **`Tablet.dc.html`** | Layout otimizado para tablets industriais de chão de fábrica (10 polegadas em modo paisagem). | Tablet (~1024px) |
| **`Celular.dc.html`** | Layout vertical em coluna única para operadores que consultam o sistema no smartphone ao lado da máquina. | Mobile (~375px–420px) |
| **`Vazio.dc.html`** | Estado honesto inicial do sistema antes de qualquer cálculo (R4 — sem números preenchidos artificialmente). | Desktop |
| **`painel-fenix.html`** | Build compilado unificado com todas as folhas e alternância rápida para inspeção global. | Multi-dispositivo |
| **`GABARITO_PROTOTIPO.md`** | Norma de engenharia e conformidade visual do protótipo (versão 1.6). | Documento SoT de Design |

*Servidor local de visualização:* executar `python -m http.server 8899` em `Docs_inicial/construcao/prototipo/` e acessar `http://localhost:8899/`.

---

## 2. Fluxo Visual e Navegação

### 2.1 Navegação Entre Famílias de Usinagem

O operador transita entre as famílias através de abas de topo persistentes:

```
[ Fresar ]    [ Furar ]    [ Roscar ]    [ Mandrilar ]         [ Configurações ⚙ ]
```

Ao trocar de família:
- Os parâmetros geométricos adaptam-se imediatamente às grandezas próprias da família;
- Se a ferramenta nova pertencer à mesma classe de usinagem, os parâmetros manuais do operador são preservados (Decisão Q1);
- Nenhuma rota exige recarregamento de página.

### 2.2 Transição para a Área "Configurações"

Por decisão do Mestre (D2 e D5), a edição das constantes do material e a biblioteca de ferramentas saem da tela principal para evitar alterações acidentais durante o corte:
- O acesso é feito via ícone discreto no cabeçalho;
- A tela de Configurações permite alterar materiais, gerenciar ferramentas e ajustar a lente da Margem de Segurança;
- Ao salvar e retornar, o cálculo ativo é recalculado instantaneamente com os novos parâmetros.

---

## 3. Estados do Painel

O protótipo modela fielmente os cinco estados de ciclo de vida do cálculo:

1. **Estado Vazio (`Vazio.dc.html` / R4):** Nenhum número de resultado é apresentado antes de o usuário clicar em "Calcular". Sem traços ou "0" fingindo resultado. Uma mensagem simples orienta: *"Escolha o material e a ferramenta, depois calcule."*
2. **Estado Normal (Seguro):** Indicador em verde suave (`--state-normal-bg`), valores dentro das referências canônicas, bloco de alerta recolhido, foco total nos números de comando \(S\) e \(F\).
3. **Estado Atenção (`Main.dc.html`):** Indicador em amarelo/âmbar (`--state-attention-bg`). Disparado quando um limite de boa prática é excedido (ex: \(L/D > 4,0\)). O alerta abre automaticamente descrevendo a grandeza física medida.
4. **Estado Crítico (`Estados.dc.html`):** Indicador em vermelho de alta visibilidade (`--state-critical-bg`). Disparado em condições fisicamente impossíveis (ex: \(a_e > D\)). O resultado é calculado e entregue mesmo assim (R1), e o alerta adverte com destaque máximo.
5. **Estado Desatualizado:** Quando o operador altera qualquer campo de entrada com um resultado já em tela, os números de resultado recebem tratamento translúcido/desatualizado, mas o nível de segurança e o alerta permanecem plenamente visíveis (R7).

---

## 4. Fronteira de IA e Arquitetura Human-in-the-Loop (HitL)

### 4.1 Onde a IA Participa

No Fenix, a "Inteligência Artificial" adota a abordagem **AI-First na Engenharia e na Assistência Determinística**:
- **Motor Físico Determinístico:** O cálculo de velocidades, avanços, esforços (\(k_c\)) e potências (\(P_c\)) é estritamente analítico e normativo. Não há modelos probabilísticos (LLMs) gerando parâmetros numéricos de usinagem. Isso garante risco zero de alucinação numérica que possa causar acidentes graves em centros de usinagem CNC.
- **Assistência de Trade-Offs (Motor de Regras Heurísticas):** O sistema analisa a combinação de entradas e gera dinamicamente orientações de ajuste com causalidade explícita (*"Se diminuir o balanço em 10 mm, elimina o risco de vibração"*).
- **Especificação AI-First:** Todo o design, regras e critérios foram estruturados para permitir que agentes autônomos de desenvolvimento e testes implementem e validem o código sem intervenção humana manual.

### 4.2 Arquitetura Human-in-the-Loop (HitL)

O produto é regido pelo axioma: **O sistema recomenda, o operador decide.**

```
┌──────────────────────────────┐
│ Sistema Fenix (Cálculo)      │  ── Recomenda ──▶  S = 4.456 rpm  |  F = 1.070 mm/min
└──────────────────────────────┘
                                                              │
                                                        Revisão Humana (HitL)
                                                              ▼
┌──────────────────────────────┐                   ┌───────────────────────────────────┐
│ Operador CNC (Máquina)       │  ◀── Executa ──── │ Botões ±10% ou Digitação Manual   │
└──────────────────────────────┘                   └───────────────────────────────────┘
```

1. **Autonomia Irrestrita (R1):** O operador nunca é impedido de digitar qualquer parâmetro. Se quiser rodar a 150% da velocidade recomendada, o software processa e exibe o impacto térmico.
2. **Ajuste Fino Imediato (D7):** Cartões altos com controles táteis de `−` e `+` (passo de \(10\%\)) em \(S\) e \(F\). Cada toque recalcula imediatamente a potência e o avanço da mesa, permitindo sintonia fina por ouvido/vibração na máquina.
3. **Gavetas de Instrução Contextual (D11):** Para cada parâmetro ajustável, existe uma gaveta recolhida que explica a física do parâmetro e o trade-off de aumentar ou diminuir o valor.
4. **Lente da Margem de Segurança:** O operador pode aplicar uma lente global (ex: \(85\%\)) para operar consistentemente de modo mais conservador sem afetar os modelos matemáticos subjacentes.

---

## 5. Histórico e Status de Aprovação do Protótipo

### 5.1 Validação de Concepção e JTBD (26/08/2026)
- **Método:** Entrevista em profundidade com fresador CNC em turno ativo e análise documental de três arquivos de parâmetros de produção reais da fábrica (`inicio_fenix/referencia_fabrica/`).
- **Achados Incorporados:** Priorização absoluta de \(S\) e \(F\), eliminação de campos teóricos desnecessários na tela principal, inclusão do balanço (\(L\)) e profundidade (\(a_p\)) como campos de primeira linha, e substituição da "procedência visual de pesquisa" por instruções práticas de ajuste com trade-offs.

### 5.2 Protocolo de Convergência e Aprovação de Camada 1 (30/08/2026 a 01/09/2026)
- **Objeto:** 10 folhas `.dc.html` avaliadas pelo `GABARITO_PROTOTIPO.md` v1.6 sob o protocolo formal de 10 fases (`protocolo-convergencia-prototipo.html`).
- **Status:** **Aprovado em Camada 1 (Mecânica e Regras Invioláveis)** pelo Mestre (Product Owner e Especialista de Domínio).
- **Conformidades Verificadas:**
  - Zero dependência de rede (R11 — sem webfonts ou links externos);
  - Alvos de toque generosos \(\ge 44px\) (R9);
  - Contrastes industriais de alto nível (R12);
  - Formatação com ponto para milhar e vírgula para decimal (D8);
  - Prosa recolhida por padrão (D9);
  - Eliminação de marcas proibidas na tela (`estimado`, `forçado`, etc.).

### 5.3 Encerramento da Validação e Liberação
* **Decisão do Dono do Produto (07/09/2026):** A homologação de bancada com operadores externos foi formalmente **DISPENSADA / DESCARTADA**.
* **Fundamentação:** O protótipo visual já foi exaustivamente convergido através de 10 fases do protocolo, aprovado em Camada 1 no Gabarito v1.6 pelo Mestre e ancorado em entrevistas reais e planilhas de produção de fábrica.
* **Status Final:** ✅ **PROTÓTIPO PLENAMENTE APROVADO E HOMOLOGADO PARA A FASE 2.**
