# Fase 1: Concepção e Planejamento AI-First — Fenix

> **Guia Executivo e Índice Normativo de Fechamento da Fase 1**  
> **Data:** 07/09/2026  
> **Status da Fase 1:** **100% Concluída e Formalmente Encerrada**  
> **Autoridade:** Este diretório contém os quatro artefatos finais canônicos da Fase 1 que regem e autorizam as fases subsequentes de desenvolvimento de software e testes automatizados.

---

## 1. Visão Geral dos Quatro Artefatos Finais

| Artefato | Arquivo | Papel e Autoridade no Projeto |
|---|---|---|
| **1. Vision Statement** | [`01_VISION_STATEMENT.md`](01_VISION_STATEMENT.md) | Âncora inegociável de propósito, público-alvo (operador e programador CNC), Job to Be Done (JTBD) e fronteiras estritas contra *scope creep*. |
| **2. Story Map** | [`02_STORY_MAP.md`](02_STORY_MAP.md) | Mapeamento cronológico da jornada do operador, histórias de usuário estruturadas e delimitação formal da **Linha do MVP** vs Pós-MVP. |
| **3. Specification Sheet** | [`03_SPECIFICATION_SHEET.md`](03_SPECIFICATION_SHEET.md) | **Single Source of Truth (Single SoT)** comportamental em sintaxe Given/When/Then (Gherkin), casos de verificação numérica e catálogo No Loose Ends com fontes primárias de Taylor (*Machinery's/ASM*) e Altıntaş integradas. |
| **4. Protótipo Aprovado** | [`04_PROTOTIPO_APROVADO.md`](04_PROTOTIPO_APROVADO.md) | Inventário das 10 folhas visuais `.dc.html`, fluxos de estado, arquitetura Human-in-the-Loop (HitL), fronteira da IA determinística e aprovação formal de Camada 1 no Gabarito v1.6 (homologação externa dispensada). |

---

## 2. Rastreabilidade com a Base Canônica do Projeto

Os artefatos consolidados neste diretório não substituem o acervo técnico do projeto; eles operam como a síntese comportamental e o contrato formal de engenharia derivado das fontes canônicas primárias:

- **JTBD & Problema Real:** `inicio_fenix/JTBD_O_PROBLEMA.md` e `inicio_fenix/referencia_fabrica/`.
- **Motor Físico e Constantes:** `Docs_inicial/canonicos/` (Motor de Cálculo, Geometria de Corte, Ferramentas e Substratos, Limites e Alertas, Furação/Mandrilamento/Roscamento, Ângulos HSS, Velocidades SAE 1045).
- **Especificação Detalhada do MVP:** `Docs_inicial/mvp/MVP_CALCULADORA_PARAMETROS.md`, `ESCOPO_CONFIGURACOES.md` e `ESCOPO_BROCA_ACO_RAPIDO.md`.
- **Design System & Gabarito Visual:** `Docs_inicial/construcao/DESIGN_SYSTEM_FENIX.md` e `Docs_inicial/construcao/prototipo/GABARITO_PROTOTIPO.md` (v1.6).
- **Decisões do Dono do Produto (Mestre):** `ESTADO.md`, `Docs_inicial/HANDOFF.md` e `Docs_inicial/decisoes/BLOCO_DE_DECISAO.md`.

---

## 3. Próximo Passo para a Fase 2 (Construção e Código)

Com os contratos comportamentais da Fase 1 plenamente consolidados e a aprovação visual garantida, o projeto está habilitado para iniciar imediatamente a **Fase 2 — Fundação e Arquitetura de Código**:
1. Scaffold do projeto em TypeScript / Vite conforme a ADR-0001 (`docs/adr/0001-plataforma-e-stack.md`);
2. Implementação da suite de testes automatizados com base nos cenários Gherkin da Specification Sheet;
3. Codificação modular do motor físico canônico e dos componentes do painel industrial.
