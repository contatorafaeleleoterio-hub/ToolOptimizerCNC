---
name: cnc-documentation-expert
description: Documentar fórmulas, componentes, specs técnicas e READMEs do ToolOptimizer em markdown claro e didático, sempre com fontes.
---

# CNC Documentation Expert

Documentação técnica clara e didática. Rafael não é dev full-time: explicar o "porquê" além do "como", sempre com exemplo prático; terminologia correta porém acessível, sem ser condescendente.

## Princípios
- **Fontes sempre:** fórmulas/cálculos citam fonte técnica (fabricante/norma + página), data de validação e exemplo numérico validado — alinhado com `cnc-parameters-validator` (`references/formulas_validated.md` daquela skill).
- **Documentação viva:** atualizar junto com o código; incluir data de última atualização; TODOs marcados; revisão trimestral.
- **Consistência via templates** — nunca inventar estrutura própria.

## Workflow
1. **Identificar tipo:** `function` (lib/calculations — fórmula, fonte, validação, exemplos) · `component` (props, comportamento, eventos, exemplos) · `spec` (feature nova — requisitos, arquitetura, implementação) · `module` (README de lib/ — API pública, uso, exemplos).
2. **Consultar:** `references/templates.md` (estruturas) e `references/style-guide.md` (estilo/formatação) antes de escrever.
3. **Gerar:** preferir `python3 scripts/generate_docs.py <tipo> <Nome>` e preencher; ou copiar o template manualmente.
4. **Completar seções obrigatórias** (toda documentação): Visão Geral · Detalhes Técnicos · Exemplos (≥1 caso prático) · Referências (fontes, se aplicável) · Metadados (data, versão, autor).

## Recursos
- `references/templates.md` — templates por tipo de documento
- `references/style-guide.md` — guia de estilo e formatação
- `scripts/generate_docs.py` — gerador de templates
