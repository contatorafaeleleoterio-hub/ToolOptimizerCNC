# Blueprint Técnico: Calculadora de Parâmetros CNC

## E1 · Resumo Executivo
**Problema resolvido:** Operadores de CNC e programadores CAM precisam determinar rapidamente os parâmetros de corte ideais (RPM, Avanço, Potência) para evitar quebra de ferramentas e otimizar o tempo de usinagem.
**Núcleo de valor:** Motor matemático que processa as características da ferramenta, do material e as condições de corte para gerar parâmetros operacionais físicos e seguros, respeitando os limites da máquina e da física de usinagem.
**O que realmente importa:** As fórmulas padrão da indústria para RPM, Avanço (com compensação de espessura de cavaco/CTF), Taxa de Remoção de Material (MRR), Potência e Torque, junto com a restrição de limite de deflexão (razão L/D).
**O que foi eliminado e por quê:** Sistemas de "Health Score" gamificado, cálculos complexos de limites visuais para sliders dinâmicos, e camadas de estado para Histórico/Favoritos. Estes são recursos de experiência do usuário (UX) que não alteram a resolução central do problema.

## E2 · Mapa de Regras de Negócio
| Regra | Descrição | Categoria |
|-------|-----------|-----------|
| **Compensação de Cavaco (CTF)** | Se o engajamento radial (ae) for menor que 50% do diâmetro, o avanço por dente deve ser compensado dividindo pela raiz da proporção: `fz / sqrt(ae/D)`. | Crítica |
| **Limite de Deflexão (L/D)** | A razão entre o balanço (comprimento exposto) e o diâmetro da ferramenta não pode exceder `6`. Acima disso a vibração é catastrófica. | Crítica |
| **Limites de Potência da Máquina** | Potência e Torque exigidos pelo cálculo não podem exceder a capacidade física configurada na máquina. | Importante |
| **Zonas de Saúde (Health Score)**| Cálculo de nota `[0-100]` baseado em pesos predefinidos (ap:40%, fz:30%, ae:20%, vc:10%) para classificar a usinagem em zonas (verde, amarelo, vermelho). | Opcional (Removida do MVP) |
| **Multiplicador de ap Max** | Restringe a profundidade de corte sugerida dependendo do tipo da operação (Desbaste = 1.0x, Acabamento = 0.3x). | Opcional |

## E3 · Inventário de Variáveis
| Item | Função | Impacto no resultado | Necessidade técnica | Complexidade adicionada | Decisão |
|------|--------|----------------------|---------------------|------------------------|---------|
| `vc` (m/min) | Velocidade de corte base definida | Alto | Sim | Baixa | Manter |
| `fz` (mm/dente)| Avanço por dente base | Alto | Sim | Baixa | Manter |
| `ae` (mm) | Profundidade radial do corte | Alto | Sim | Baixa | Manter |
| `ap` (mm) | Profundidade axial do corte | Alto | Sim | Baixa | Manter |
| `d` (mm) | Diâmetro da ferramenta | Alto | Sim | Baixa | Manter |
| `z` | Número de arestas de corte (facas) | Alto | Sim | Baixa | Manter |
| `balanco` (mm) | Comprimento em balanço da ferramenta| Médio | Sim (Segurança) | Baixa | Manter |
| `kc` (N/mm²) | Força específica de corte do material | Alto | Sim (Potência) | Baixa | Manter |
| `efficiency` | Eficiência elétrica/mecânica do fuso | Médio | Sim | Baixa | Manter |
| `healthScore` | Indicador quantitativo consolidado | Baixo | Não | Alta | Remover |
| `ZoneId` | Enum (verde, amarelo, bloqueado) | Baixo | Não | Alta | Remover |
| `ObjetivoUsinagem` | Variável de ajuste fino visual (vida útil vs velocidade)| Baixo | Não | Média | Remover |
| `SliderBounds` | Limites reativos calculados para a UI | Baixo | Não | Alta | Remover |

## E4 · Mapa de Fórmulas
| Fórmula | Finalidade | Categoria | Justificativa |
|---------|------------|-----------|---------------|
| `n = (vc * 1000) / (π * d)` | Cálculo de RPM | Essencial | Fundamental para definir a rotação do eixo. |
| `fz_efetivo = fz / √(ae/d)` | Compensação de Avanço (CTF) | Essencial | Se a regra de ae < 0.5d se aplicar, é crítico para preservar o tempo e a ferramenta. |
| `Vf = fz_efetivo * z * n` | Avanço de Mesa (mm/min) | Essencial | Define a translação das coordenadas cartesianas na CNC. |
| `Q = (ap * ae * Vf) / 1000` | MRR (Taxa de Remoção) | Essencial | É a base direta da energia que será gasta na máquina. |
| `Pc = (Q * kc) / (60000 * η)` | Potência de Corte (kW) | Essencial | Garante que a máquina suporte o passe sem travar ou alarmar o drive. |
| `M = (Pc * 9549) / n` | Torque (Nm) | Essencial | Em desbastes lentos, a máquina pode ter potência mas estolar por falta de torque. |
| `S = ap*0.4 + fz*0.3 + ae*0.2...` | Fórmula de Health Score | Redundante | Trata-se de uma aproximação visual e não reflete física real isolada. |

## E5 · Matriz 80/20 Consolidada
| Elemento | Tipo | Decisão | Motivo técnico |
|----------|------|---------|----------------|
| Funções Básicas (RPM, Vf, Pc, MRR) | Módulo | Manter | São os 20% do código fonte que entregam o valor principal do app. Sem eles não há calculadora. |
| Módulo de Chip Thinning (CTF) | Regra de Negócio | Manter | Embora menor, é o diferencial técnico de calculadoras especializadas contra fórmulas teóricas engessadas. |
| Regra de Bloqueio L/D | Validação | Manter | Previne as maiores perdas industriais em fresamento longo. |
| Health Score Engine | Componente | Remover | Requer processamento das propriedades individualizadas para UI e não afeta o resultado das grandezas da máquina. |
| Slider Bounds e Ajustes Finos | Componente / Tipagem | Remover | Traz dependências reativas de interface para dentro do motor do backend, poluindo a arquitetura matemática. |

## E6 · Benchmark de Mercado
| Funcionalidade | Comum no mercado | No sistema atual | No MVP |
|----------------|----------------------------------|------------------|--------|
| Cálculo Base (RPM / Avanço / MRR)| Sim | Sim | Sim |
| Cálculo de Carga Física (kW / Nm)| Sim | Sim | Sim |
| Compensação Radial (CTF) | Sim | Sim | Sim |
| Validação Física L/D | Não (Raro) | Sim | Sim (É um diferencial central de valor prático). |
| Gamificação (Score / Zonas de cor)| Não | Sim | Não (Removido). |

## E7 · Definição Formal do MVP
**O MVP FAZ:**
- Processa inputs estritos de geometria (`d`, `z`, `balanco`), material (`kc`), eficiência da máquina (`η`) e parâmetros de processo (`vc`, `fz`, `ap`, `ae`).
- Calcula 6 saídas determinísticas: RPM, Fz Efetivo (com CTF dinâmico), Avanço de mesa (Vf), Taxa de Remoção (MRR), Potência Requerida (Pc) e Torque (M).
- Falha e rejeita os dados imediatamente (lançando erros) nas seguintes violações absolutas de segurança física: Valores zerados/negativos; Engajamento Radial (`ae`) maior que o Diâmetro (`d`); Razão `balanço/diâmetro` > 6.

**O MVP NÃO FAZ:**
- O MVP não avalia qualidade qualitativa do parâmetro (ex: avisos de "bom", "ruim", "verde").
- O MVP não calcula intervalos mínimos ou máximos de slider para os inputs da UI.
- O MVP não guarda contexto ou possui banco de dados embutido (Histórico, Materiais Favoritos, Perfil de Máquina).

## E8 · Arquitetura Conceitual
**Entradas → Validações e Restrições → Motor de Compensações → Cálculos em Cascata → Resultado**

1. **Camada de Entrada (Stateless DTO):** Recebe o Payload. 
2. **Camada de Validações:** Assegura a ausência de números nulos ou negativos. Avalia L/D e integridade geométrica (ae <= d). Protege contra `DivideByZero`.
3. **Motor de Compensações (CTF):** Avalia a razão de penetração. Se `ae < 0.5d`, sobrepõe o `fz` com o `fz_efetivo`.
4. **Cálculos em Cascata:** Usa os dados validados. A execução é sequencial obrigatoriamente, pois há dependência matemática linear: `RPM` e `fz_efetivo` geram `Vf`. `Vf` é usado no `MRR`. `MRR` gera `Potência`. `Potência` com `RPM` gera `Torque`.
5. **Saída Simples:** Devolve um único objeto de leitura contendo o resultado da simulação mecânica.

## E9 · Blueprint Funcional
**Objetivo do Módulo:** Prover um motor matemático puro e testável para usinagem CNC sem dependências de frameworks.

**Dados de Entrada:**
- Ferramenta: `d` (float>0), `z` (int>0), `balanco` (float>0).
- Máquina/Material: `kc` (float>0), `efficiency` (0<x<=1.0).
- Condições: `vc`, `fz`, `ap`, `ae` (floats > 0).

**Fluxo de Processamento:**
1. Validar entradas vitais (`if (input <= 0) throw error`).
2. Validar viabilidade do corte (`if (ae > d) throw error`).
3. Analisar limite de ressonância (`if (balanco / d > 6) throw erro: L/D Crítico`).
4. `n = (vc * 1000) / (Math.PI * d)`.
5. Se `(ae/d) < 0.5`: `fz_eff = fz / Math.sqrt(ae/d)`; senão `fz_eff = fz`.
6. `vf = fz_eff * z * n`.
7. `mrr = (ap * ae * vf) / 1000`.
8. `potencia = (mrr * kc) / (60000 * efficiency)`.
9. `torque = (potencia * 9549) / n`.
10. Retornar estrutura: `{ n, vf, fz_eff, mrr, potencia, torque }`.

**Critérios de Aceitação:**
- Funções operam estritamente independentes.
- Um engajamento radial pequeno (ex: ae=1mm em freza 10mm) **deve** ativar o Chip Thinning Factor aumentando drasticamente o Fz Efetivo.
- Ausência total de importações de store, React ou bibliotecas externas.

## E10 · Plano de Reconstrução
| Etapa | O Que Fazer | Dependências | Critério de Conclusão |
|-------|-------------|--------------|-----------------------|
| 1 | Módulo de Tipos e Validações | Nenhuma | Tipos gerados sem chaves desnecessárias e função `validate()` protegendo física de erro zero e limitação de deflexão (L/D>6). |
| 2 | Módulo de CTF e RPM | Etapa 1 | Dada a entrada e diâmetro, RPM calcula correto e avanço é compensado pela raiz quadrada de `ae/d` apropriadamente. |
| 3 | Módulo de Esforços Físicos | Etapa 2 | Funções Puras para Avanço (Vf), Taxa de Remoção (MRR), Potência e Torque consolidadas e integradas. |
| 4 | Engine Facade | Etapa 3 | Único ponto de entrada para o Frontend chamar, injetando payload JSON e obtendo todos os parâmetros calculados de volta de modo síncrono. |

## E11 · Riscos Técnicos
| Risco | Origem | Impacto potencial | Ação recomendada |
|-------|--------|-------------------|------------------|
| Simplificação Excessiva (Perda da UI rica) | Remoção completa do *Health Score Engine* | Operadores iniciantes sem a indicação em "vermelho/verde" podem extrapolar parâmetros não capturados pelo cálculo. | O Frontend precisará implementar uma camada de alerta simples validando se a Potência consumida é maior que a Máquina e destacando isso. |
| Inexatidão com floats (JS Native) | Operadores `Math.PI` e números Float em JS. | Divergência minuciosa do MRR ou Potência em comparação às máquinas modernas em painel. | Manter `Number()` puro durante os cálculos e utilizar casas decimais fixas (ex: `toFixed(2)`) apenas quando exibir a string no Frontend. |
