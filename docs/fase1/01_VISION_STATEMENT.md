# Vision Statement — Fenix

> **Artefato Canônico da Fase 1 — Concepção e Planejamento AI-First**  
> **Status:** Aprovado e Vigente  
> **Data de Consolidação:** 07/09/2026  
> **Autoridade:** Este documento é a âncora fundamental de propósito do produto contra *scope creep* e orienta todas as decisões funcionais e arquiteturais.

---

## 1. Declaração de Visão

O **Fenix** é um sistema inteligente e determinístico de cálculo de parâmetros de corte CNC projetado para o chão de fábrica. Ele não existe para quem não sabe usinar — esse usuário não existe. Toda oficina já opera com valores herdados: uma planilha mantida pelo encarregado de ferramentas, um operador veterano de turno, ou parâmetros genéricos repetidos no CAM por comodismo ou pressão de prazo. Esses valores funcionam até a peça, o material, a dureza real, o balanço da ferramenta ou a meta de produção saírem do padrão tabelado. Quando isso acontece, operador e programador perdem o chão e recorrem à tentativa e erro com ferramenta e peça reais, queimando pastilhas, acumulando horas de desbaste arrastado e absorvendo o prejuízo como "trabalho normal".

O **Fenix** transforma essa realidade eliminando a descoberta empírica destrutiva. A partir de **cinco dados imediatos** que o operador obtém olhando para a máquina (material da peça, tipo de ferramenta, diâmetro, altura de fixação/balanço e profundidade de corte/incremento), o Fenix entrega em menos de 30 segundos:
1. **Rotação (\(S\)) e Avanço (\(F\)) prontos** para digitação direta no comando da máquina;
2. **Previsão honesta do comportamento de corte** (vibração, aquecimento, carga e risco);
3. **Direção do ajuste com trade-offs explícitos** (*"faça isso para obter aquilo, com tal contrapartida"*).

Toda a física do cálculo é estritamente canônica, baseada em modelos comprovados (Kienzle, Taylor, trigonometria de usinagem) e dados de ferramentas reais, sem alucinações probabilísticas. O sistema é uma **calculadora livre e agnóstica**: nenhum resultado é recusado ou bloqueado por limites de máquina. **O sistema recomenda, o operador decide.**

---

## 2. Para Quem o Sistema Existe

### 2.1 Personas Primárias

1. **O Operador de Máquina CNC (Chão de Fábrica):**
   - **Cenário:** Em pé, na máquina, com luva e ruído de oficina.
   - **Necessidade:** Rapidez absoluta, interface limpa, toque generoso (≥ 44px), zero dependência de conexão de internet e valores diretamente acionáveis em \(S\) e \(F\).
   - **Dor eliminada:** O cansaço físico e a frustração de interromper a máquina dezenas de vezes para virar pastilhas queimadas ou sofrer com vibração na peça.

2. **O Programador de CAM / Preparador de Processos:**
   - **Cenário:** Na bancada ou estação de trabalho, programando estratégias de usinagem antes de enviar o código à máquina.
   - **Necessidade:** Confiança técnica, conhecimento da profundidade (\(a_p\)) e penetração (\(a_e\)), e capacidade de prever esforços de corte e deflexão de haste.
   - **Dor eliminada:** A insegurança de enviar programas com parâmetros genéricos que serão sabotados ou ajustados às cegas pelo operador no potenciômetro da máquina.

### 2.2 Beneficiário Indireto de Negócio

* **O Gestor de Fábrica / Responsável pelo Ferramental:**
  - Embora não seja o operador do software no MVP, ele é o comprador e patrocinador. É quem enxerga a conta financeira de consumo excessivo de ferramentas no fim do mês. O Fenix fecha o ciclo entre o parâmetro de corte e a vida útil real do ferramental.

---

## 3. O Job to Be Done (JTBD)

> *"Fazer o corte se comportar do jeito esperado e, quando ele não se comportar, saber exatamente qual variável mexer, para qual lado, e o que se ganha e se perde ao mexer."*

Sucesso para o usuário não é um número isolado — é a **ausência de eventos destrutivos**:
- A ferramenta exerce sua função no tempo previsto;
- A ferramenta não quebra no meio da operação;
- O corte ocorre sem ruído estridente nem vibração prejudicial;
- O cavaco não superaquece de forma anormal;
- O desgaste da ferramenta permanece dentro da margem previsível da oficina.

---

## 4. Princípios Invioláveis da Visão

1. **Calculadora Livre (R1):** Nenhuma entrada é bloqueada, nenhum cálculo é recusado e nenhum clamp artificial é imposto. Se o operador digitar um valor extremo, o cálculo é entregue e o alerta de integridade física descreve o risco com precisão.
2. **Human-in-the-Loop:** O operador é o responsável técnico final da máquina. O sistema recomenda com rigor científico e transparência; o operador decide o que executar.
3. **Zero Rede (R11):** O software opera com autonomia total offline. Nenhuma requisição a APIs remotas, fontes externas ou telemetria em tempo de uso.
4. **Sem Falsa Precisão (R14):** Resultados refletem a física real. Sem índices cosméticos (ex: "saúde 0–100"), medidores de arco sem fonte ou barras percentuais de limites não calibrados.
5. **Simplicidade Operacional (D9):** A interface é dinâmica e focada em resultados numéricos claros. Textos longos, instruções de gaveta e explicações nascem recolhidos e só se abrem sob demanda intencional do usuário.

---

## 5. Âncora Contra Scope Creep (O que NÃO é o MVP)

Para preservar a integridade, velocidade de entrega e utilidade de campo do produto, as seguintes funcionalidades estão **terminantemente fora do MVP**:

| Funcionalidade | Justificativa Técnica do Corte |
|---|---|
| **Perfil de Máquina CNC** | Variável de ambiente (potência de spindle, torque máximo, avanço rápido). O cálculo essencial de corte independe do modelo da máquina. |
| **Seletor de Tipo de Operação** | "Desbaste", "Semi-acabamento" e "Acabamento" são intenções do operador, não propriedades matemáticas do corte. A agressividade é regulada nos controles contínuos de corte. |
| **Contas de Usuário / Login / Nuvem** | Fricção inútil em chão de fábrica. O sistema deve abrir instantaneamente e persistir dados localmente no dispositivo. |
| **Deflexão em Micrômetros (\(\mu m\))** | Requer dados empíricos de rigidez modal e constantes elásticas específicas de haste que ainda não possuem consenso bibliográfico publicado (Lacuna L14). |
| **Vida Absoluta em Horas/Minutos** | O modelo de Taylor requer expoentes de desgaste (\(n\)) por liga que variam por fornecedor e não possuem dados abertos universais (Lacuna L13). O MVP entrega previsão qualitativa e direcional de desgaste. |
| **Cópia / Exportação Complexa** | O operador necessita dos números diretamente na máquina. Exportação para folhas de processo será abordada em evoluções futuras. |
| **Comparação Simultânea Lado a Lado** | Mantém-se o foco em um cálculo ativo por vez para garantir clareza visual e ergonomia operacional (Decisão Q3 do Mestre). |
