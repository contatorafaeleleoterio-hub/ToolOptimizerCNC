# Centro de Planejamento de Lançamento — ToolOptimizer CNC

Bem-vindo ao diretório central de planejamento, documentação e acompanhamento do lançamento do **ToolOptimizer CNC** na **Google Play Store** com monetização via **Google AdMob**.

---

## 1. Finalidade deste Diretório

Este diretório funciona como o **centro de planejamento permanente** do projeto de lançamento. Seu propósito é garantir a rastreabilidade de todas as fases de engenharia, governança, conformidade e publicação, permitindo que qualquer desenvolvedor ou agente de IA compreenda imediatamente:
- Em que ponto o projeto se encontra;
- O que já foi concluído;
- O que deve ser executado em seguida;
- Quais regras e decisões técnicas orientam cada etapa.

---

## 2. Estrutura e Organização

A documentação está estruturada em dois níveis complementares:

1. **Visão Geral e Alinhamento Estratégico:**
   - [`00_MASTER_PLAN.md`](00_MASTER_PLAN.md): Documento mestre que consolida o objetivo geral, o estado atual do sistema, as 9 etapas em sequência lógica, suas dependências diretas, entregáveis centrais e critérios globais de conclusão.

2. **Detalhamento Progressivo por Etapa:**
   - Cada pasta numerada (`01-etapa/` a `09-etapa/`) corresponde a uma fase executiva do projeto.
   - Cada etapa contém inicialmente seu próprio [`README.md`](01-etapa/README.md) com objetivo, escopo preliminar, dependências e espaço estruturado para detalhamento progressivo, decisões e pendências.
   - O detalhamento fino de cada etapa é elaborado antes da sua implementação, evitando retrabalho e decisões prematuras.

---

## 3. Fluxo de Trabalho e Governança

Antes de iniciar qualquer atividade relacionada ao lançamento do aplicativo, consulte obrigatoriamente este centro de planejamento seguindo o fluxo:

$$\text{00\_MASTER\_PLAN.md} \longrightarrow \text{Selecionar Etapa Ativa} \longrightarrow \text{Analisar Estado Atual} \longrightarrow \text{Refinar Tarefas} \longrightarrow \text{Implementar} \longrightarrow \text{Validar Quality Gate} \longrightarrow \text{Atualizar Documentação} \longrightarrow \text{Avançar}$$

> [!IMPORTANT]
> **Regra de Manutenção:** O plano mestre (`00_MASTER_PLAN.md`) deve ser mantido como visão geral sintética. Decisões técnicas específicas, notas de implementação e artefatos de homologação devem residir na pasta da respectiva etapa.
