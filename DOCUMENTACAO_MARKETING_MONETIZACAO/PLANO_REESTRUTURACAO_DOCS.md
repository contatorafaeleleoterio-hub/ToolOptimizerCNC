# Plano de Reestruturação — Documentação Marketing & Monetização

> **Criado:** 18/03/2026
> **Autor:** Rafael + Claude
> **Status:** ⬜ Aprovado — Aguardando execução (1 doc por sessão)
> **Pasta:** `DOCUMENTACAO_MARKETING_MONETIZACAO/`

---

## Diagnóstico dos Documentos Atuais (8 arquivos)

### Problemas Identificados

1. **Redundância massiva** — SEO aparece em 3 docs, monetização em 2, concorrentes em 2. Muito conteúdo repetido.
2. **Conteúdo genérico** — Conselhos de SEO e marketing que poderiam ser de qualquer produto, não aproveitam os diferenciais reais do ToolOptimizer (v0.7.0 com Admin Dashboard, 824 testes, deploy Cloudflare, analytics).
3. **Dados sem validação** — Volumes de busca "estimados" sem fonte real, preços sem pesquisa de mercado brasileiro validada.
4. **Estado desatualizado** — Referências ao GitHub em vez do estado atual (domínio próprio `tooloptimizercnc.com.br`, worker Cloudflare, Web Analytics ativo).
5. **Sem funil de aquisição** — Documentos falam de estratégias isoladas mas não conectam em um funil coerente (atrair → converter → reter → monetizar).
6. **Tópicos ausentes** — Sem estratégia de conteúdo, sem plano de comunidade, sem email marketing, sem análise financeira/projeções, sem plano de parcerias com escolas técnicas/SENAI.
7. **Mercado BR fraco** — Pouca especificidade sobre o mercado brasileiro (PIX, Hotmart/Kiwify, preços em BRL calibrados, canais de YouTube BR de usinagem).

---

## Estratégia de Execução

- **1 documento por sessão** — foco total, sem pressa, evitar erros e equívocos
- **Refinamento iterativo** — cada doc é analisado, pesquisado e reescrito com dados reais do sistema v0.7.0
- **Aprovação incremental** — Rafael valida cada doc antes de avançar para o próximo
- **Documentos originais preservados** — movidos para `_originais/` como referência

---

## FASE 1 — Fundação Estratégica (Sessões 1-3)

> **Objetivo:** Consolidar inteligência de mercado e definir posicionamento.

| Sessão | Documento | Substitui | Descrição |
|--------|-----------|-----------|-----------|
| 1 | `01-VISAO-PRODUTO.md` | "Informações do Projeto" + "Análise de Monetização" | Visão do produto, proposta de valor única, personas resumidas, diferenciais competitivos reais baseados no estado atual v0.7.0 |
| 2 | `02-ANALISE-COMPETITIVA.md` | "Análise de Concorrentes" | Mapa completo de concorrentes com matriz SWOT, pricing comparado em BRL, screenshots/links, gaps de mercado exploráveis |
| 3 | `03-PERSONAS-E-JORNADA.md` | (novo) | 3-4 personas detalhadas (operador CNC, programador CAM, professor SENAI, dono de oficina) com jornada de compra e pontos de dor específicos |

---

## FASE 2 — Estratégia de Aquisição (Sessões 4-6)

> **Objetivo:** Unificar toda a estratégia de tráfego em documentos coerentes com funil.

| Sessão | Documento | Substitui | Descrição |
|--------|-----------|-----------|-----------|
| 4 | `04-ESTRATEGIA-SEO.md` | "Pesquisa de SEO" + "Investigação de SEO" + "Guia de Implementação de SEO" | SEO técnico + on-page + conteúdo consolidado. Estado real do `index.html`, checklist técnico, keywords validadas, plano editorial (blog/glossário), Schema.org atualizado |
| 5 | `05-PLANO-GOOGLE-ADS.md` | (parte de "Investigação de SEO") | Campanha Google Ads detalhada: orçamento diário sugerido (R$), grupos de anúncios, textos revisados, negativação, estimativa de CPC no BR, landing page por grupo |
| 6 | `06-ESTRATEGIA-CONTEUDO.md` | (novo) | Calendário editorial: posts LinkedIn, vídeos YouTube, artigos técnicos. Temas mapeados por persona e etapa do funil |

---

## FASE 3 — Monetização + Modelo de Negócio (Sessões 7-9)

> **Objetivo:** Definir modelo de negócio viável com projeções financeiras.

| Sessão | Documento | Substitui | Descrição |
|--------|-----------|-----------|-----------|
| 7 | `07-MODELO-MONETIZACAO.md` | "Estratégia de Monetização e Precificação" | Estratégia freemium detalhada: features free vs pro, pricing calibrado BR (PIX, Hotmart/Stripe), projeção de receita em 3 cenários (conservador/moderado/otimista) |
| 8 | `08-PLANO-LANCAMENTO.md` | (novo) | Roadmap go-to-market: pré-lançamento → lançamento → crescimento. Beta testers, parcerias SENAI/escolas técnicas, influenciadores BR de usinagem, canais YouTube |
| 9 | `09-METRICAS-E-KPIs.md` | (novo) | Dashboard de métricas: KPIs por fase AARRR (aquisição, ativação, retenção, receita, referência). Integração com Cloudflare Analytics já ativo |

---

## FASE 4 — Execução (Sessões 10-12)

> **Objetivo:** Documentação pronta para execução imediata.

| Sessão | Documento | Substitui | Descrição |
|--------|-----------|-----------|-----------|
| 10 | `10-LANDING-PAGE-SPEC.md` | "Plano de Execução Site de Vendas" | Spec completa: wireframe textual bloco a bloco, copy final PT-BR, CTAs, schema.org, integração com domínio existente `tooloptimizercnc.com.br` |
| 11 | `11-MATERIAIS-MARKETING.md` | (novo) | Templates prontos: email de lançamento, posts LinkedIn, descrição YouTube, pitch de 30s, one-pager PDF para parcerias |
| 12 | `00-INDICE-MASTER.md` | (novo) | Índice mestre com link para todos os docs, status de cada um, resumo executivo de 1 página |

---

## Mapeamento: Docs Atuais → Novos

| Documento Atual | Destino |
|-----------------|---------|
| `ToolOptimizer CNC - Informações do Projeto.md` | → `01-VISAO-PRODUTO.md` |
| `Análise de Monetização e Aderência.md` | → `01-VISAO-PRODUTO.md` + `07-MODELO-MONETIZACAO.md` |
| `Análise de Concorrentes e Melhores Práticas.md` | → `02-ANALISE-COMPETITIVA.md` |
| `Pesquisa de SEO e Palavras-Chave.md` | → `04-ESTRATEGIA-SEO.md` |
| `Investigação de SEO e Estratégia de Anúncios.md` | → `04-ESTRATEGIA-SEO.md` + `05-PLANO-GOOGLE-ADS.md` |
| `Guia de Implementação de SEO.md` | → `04-ESTRATEGIA-SEO.md` |
| `Estratégia de Monetização e Precificação.md` | → `07-MODELO-MONETIZACAO.md` |
| `Plano de Execução Site de Vendas.md` | → `10-LANDING-PAGE-SPEC.md` |

---

## Resumo

| Fase | Sessões | Docs | Foco |
|------|---------|------|------|
| **1** | 1-3 | 3 docs | Fundação (produto, concorrentes, personas) |
| **2** | 4-6 | 3 docs | Aquisição (SEO, Ads, conteúdo) |
| **3** | 7-9 | 3 docs | Monetização (modelo, lançamento, KPIs) |
| **4** | 10-12 | 3 docs | Execução (landing page, materiais, índice) |
| **Total** | 12 sessões | **12 docs** | Substituem os 8 atuais — sem redundância |

---

*Plano aprovado por Rafael em 18/03/2026. Execução: 1 doc por sessão para máxima qualidade.*
