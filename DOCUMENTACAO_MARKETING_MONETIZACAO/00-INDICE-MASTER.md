# 00 — Indice Master: Documentacao Marketing & Monetizacao

> **Versao:** 1.0 | **Data:** 20/03/2026 | **Autor:** Rafael Eleoterio + Claude
> **Formato:** Otimizado para consumo por LLMs — indice estruturado, resumo executivo, grafo de dependencias
> **Total:** 11 documentos + este indice | **Substitui:** 8 docs originais (movidos para `_originais/`)

---

## 1. RESUMO EXECUTIVO

```yaml
produto: ToolOptimizer CNC
versao_sistema: v0.7.0
estado: LIVE em tooloptimizercnc.com.br (sem divulgacao ativa)
dominio: tooloptimizercnc.com.br + app.tooloptimizercnc.com.br
testes: 824 passando | typescript: zero erros | bundle: 99KB gzip

proposta_de_valor: >
  calculadora profissional de parametros de corte CNC — gratuita, em portugues,
  com validacao de seguranca. operador calcula RPM, avanco e potencia em < 2 segundos.
  nenhum concorrente combina: gratis + PT-BR + seguranca + offline + educacao.

mercado:
  tam_brasil: 300.000-500.000 operadores CNC
  salario_medio: R$3.089/mes
  concorrentes_diretos: G-Wizard ($80/ano), FSWizard (gratis limitado), Machining Doctor (gratis limitado)
  gap_explorado: nenhuma ferramenta gratis + PT-BR + validacao de seguranca + offline

modelo_negocio:
  fase_1: 100% gratuito sem login (0-6 meses) — adocao massiva
  fase_2: login opcional + historico na nuvem (6-12 meses) — retencao
  fase_3: freemium PRO R$29-49/mes (12+ meses) — monetizacao
  break_even: ~250 assinantes PRO

north_star_metric: simulacoes_por_mes (cliques em "Simular" com resultado valido)

lancamento:
  estrategia: soft launch iterativo (sem big bang)
  timeline: pre-lancamento 6 semanas → soft launch 12 semanas → crescimento 24 semanas → monetizacao mes 13+
  canais_primarios: [blog mestrecnc.com.br, YouTube MestreCNC, LinkedIn]
  parcerias_chave: [SENAI, escolas tecnicas, influenciadores CNC BR]

personas:
  P1_operador_cnc: usuario principal — calculo rapido, sem login
  P2_programador_cam: usuario avancado — validacao, Kienzle, historico
  P3_professor_senai: multiplicador — adocao em massa via sala de aula
  P4_dono_oficina: decisor de compra — ROI, padronizacao, reducao de quebras
```

---

## 2. INDICE DE DOCUMENTOS

### Fase 1 — Fundacao Estrategica

```yaml
doc_01:
  arquivo: 01-VISAO-PRODUTO.md
  titulo: Visao do Produto
  versao: 2.0
  status: concluido
  secoes: [problema, solucao, UVP, estado v0.7.0, analise competitiva, publico-alvo, distribuicao, tecnologia, visao futuro, metricas qualidade, origem]
  resumo: >
    define o problema (operadores nao calculam → quebras R$15-50K/ano),
    a solucao (calculo em 2s com semaforo de seguranca),
    UVP e 7 diferenciais competitivos, estado real v0.7.0
  substitui: "ToolOptimizer CNC - Informacoes do Projeto" + parte de "Analise de Monetizacao e Aderencia"
  alimenta: [02, 03, 04, 07, 10]

doc_02:
  arquivo: 02-ANALISE-COMPETITIVA.md
  titulo: Analise Competitiva
  versao: 2.0
  status: concluido
  secoes: [contexto mercado, mapa concorrentes, mercado BR, SWOT, gaps exploraveis, pricing BRL, referencias]
  resumo: >
    mercado global CNC US$2.5B→4.5B (8% CAGR), BR US$240M→374M.
    10 concorrentes mapeados (G-Wizard, FSWizard, Machining Doctor, etc).
    SWOT completo, 6 gaps exploraveis, pricing comparativo em BRL
  substitui: "Analise de Concorrentes e Melhores Praticas de Vendas"
  alimenta: [03, 07, 10]

doc_03:
  arquivo: 03-PERSONAS-E-JORNADA.md
  titulo: Personas e Jornada de Compra
  versao: 1.0
  status: concluido
  secoes: [publico-alvo, 4 personas primarias, 2 secundarias, jornada AARRR, insights cross-persona, proposta valor por persona, referencias]
  resumo: >
    4 personas primarias (operador, programador CAM, professor SENAI, dono oficina)
    com dores, gatilhos, canais, willingness to pay.
    mapa de jornada AARRR por persona, insights cross-persona
  substitui: novo documento
  alimenta: [04, 05, 06, 07, 10, 11]
```

### Fase 2 — Estrategia de Aquisicao

```yaml
doc_04:
  arquivo: 04-ESTRATEGIA-SEO.md
  titulo: Estrategia SEO
  versao: 1.0
  status: concluido
  secoes: [auditoria tecnica v0.7.0, problemas/melhorias, palavras-chave, SEO on-page checklist, SEO conteudo editorial, Core Web Vitals, desafios SPA, plano acao priorizado, metricas sucesso, referencias]
  resumo: >
    auditoria real do index.html + Schema.org + OG.
    keywords primarias/secundarias/long-tail validadas.
    checklist tecnico, estrategia editorial blog/glossario, plano acao 3 fases
  substitui: "Pesquisa de SEO" + "Investigacao de SEO" + "Guia de Implementacao de SEO" (3 docs → 1)
  alimenta: [05, 06, 10]

doc_05:
  arquivo: 05-PLANO-GOOGLE-ADS.md
  titulo: Plano Google Ads
  versao: 1.0
  status: concluido
  secoes: [estrategia geral, orcamento, estimativa CPC BR, 5 grupos anuncios, textos RSA, negativacao, landing pages por grupo, tracking, cronograma, metricas, riscos, dependencias, referencias]
  resumo: >
    campanha Search Network completa. orcamento R$600-900/mes.
    5 grupos de anuncios com keywords, textos RSA, landing pages.
    CPC estimado R$0.80-3.50. cronograma 4 fases (setup → otimizacao)
  substitui: parte de "Investigacao de SEO e Estrategia de Anuncios"
  alimenta: [06, 09, 10]

doc_06:
  arquivo: 06-ESTRATEGIA-CONTEUDO.md
  titulo: Estrategia de Conteudo
  versao: 1.0
  status: concluido
  secoes: [estrategia geral, 4 pilares conteudo, calendario 3 meses, conteudo por persona/funil, blog mestrecnc, YouTube, LinkedIn, WhatsApp, forums, metricas, repurposing, dependencias, referencias]
  resumo: >
    3 canais primarios (blog, YouTube, LinkedIn) + secundarios (WhatsApp, Instagram, forums).
    calendario editorial detalhado 12 semanas.
    conteudo mapeado por persona × etapa funil AARRR
  substitui: novo documento
  alimenta: [07, 09, 10, 11]
```

### Fase 3 — Monetizacao + Modelo de Negocio

```yaml
doc_07:
  arquivo: 07-MODELO-MONETIZACAO.md
  titulo: Modelo de Monetizacao
  versao: 1.0
  status: concluido
  secoes: [estrategia freemium, free vs PRO, precificacao BRL, plataformas pagamento, projecoes 3 cenarios, willingness to pay, metricas monetizacao, custos/break-even, riscos, implementacao tecnica, modelo fallback, referencias]
  resumo: >
    freemium em 3 fases (gratis → login → PRO R$29-49/mes).
    projecoes conservador/moderado/otimista com break-even ~250 assinantes.
    plataformas: Stripe + Hotmart. custos operacionais ~R$350/mes
  substitui: "Estrategia de Monetizacao e Precificacao" + parte de "Analise de Monetizacao"
  alimenta: [08, 09, 10]

doc_08:
  arquivo: 08-PLANO-LANCAMENTO.md
  titulo: Plano de Lancamento
  versao: 1.0
  status: concluido
  secoes: [visao geral, fase 0 pre-lancamento, fase 1 soft launch, fase 2 crescimento, fase 3 monetizacao, beta testers, parcerias SENAI detalhado, influenciadores BR, WhatsApp/comunidades, cronograma, orcamento, riscos, metricas por fase, referencias]
  resumo: >
    go-to-market em 4 fases (prep 6 sem → soft 12 sem → crescimento 24 sem → monetizacao mes 13+).
    plano SENAI detalhado. 7 influenciadores BR mapeados.
    orcamento total estimado para ano 1
  substitui: novo documento
  alimenta: [09, 10, 11]

doc_09:
  arquivo: 09-METRICAS-E-KPIs.md
  titulo: Metricas e KPIs
  versao: 1.0
  status: concluido
  secoes: [north star metric, AARRR por etapa, dashboard fontes dados, metricas por fase lancamento, alertas/thresholds, cadencia revisao, metricas por canal, anti-metricas, implementacao tecnica gaps, template report mensal, referencias]
  resumo: >
    north star = simulacoes/mes. framework AARRR completo com metricas por etapa.
    integra CF Analytics + admin dashboard + Google Ads.
    template de report mensal, sistema de alertas, anti-metricas
  substitui: novo documento
  alimenta: [10]
```

### Fase 4 — Execucao

```yaml
doc_10:
  arquivo: 10-LANDING-PAGE-SPEC.md
  titulo: Landing Page Spec
  versao: 1.0
  status: concluido
  secoes: [visao geral, arquitetura 10 blocos, spec bloco a bloco, copy consolidada, Schema.org, meta tags SEO, design tokens, implementacao tecnica, tracking/analytics, testes A/B futuro, checklist pre-publicacao, referencias]
  resumo: >
    single-page landing em tooloptimizercnc.com.br.
    10 blocos (hero → problema → solucao → features → prova social → CTA).
    copy final PT-BR, Schema.org, design tokens, stack Astro + Tailwind
  substitui: "Plano de Execucao Site de Vendas de Alta Conversao"
  alimenta: [11]

doc_11:
  arquivo: 11-MATERIAIS-MARKETING.md
  titulo: Materiais de Marketing
  versao: 1.0
  status: concluido
  secoes: [visao geral, 4 emails lancamento, 8 posts LinkedIn, 3 descricoes YouTube, 4 WhatsApp, 3 pitches 30s, 2 one-pagers parceria, assinatura email, bios perfis, flyer QR code, guia aula, mensagem influenciadores, mensagem distribuidores, copy OG image, checklist pre-lancamento, referencias]
  resumo: >
    templates prontos para execucao: 4 emails, 8 LinkedIn, 3 YouTube,
    4 WhatsApp, 3 pitches, one-pagers SENAI + distribuidores,
    bios, flyer, guia para professores, copy final PT-BR
  substitui: novo documento
  alimenta: execucao direta
```

---

## 3. GRAFO DE DEPENDENCIAS

```
01-VISAO-PRODUTO ─────┬──→ 02-ANALISE-COMPETITIVA ──→ 03-PERSONAS-E-JORNADA
                      │                                       │
                      │    ┌──────────────────────────────────┘
                      │    │
                      ├────┼──→ 04-ESTRATEGIA-SEO ──→ 05-PLANO-GOOGLE-ADS
                      │    │         │                        │
                      │    │         └──→ 06-ESTRATEGIA-CONTEUDO
                      │    │                    │
                      ├────┼──→ 07-MODELO-MONETIZACAO
                      │    │         │
                      │    │         ├──→ 08-PLANO-LANCAMENTO
                      │    │         │         │
                      │    │         └──→ 09-METRICAS-E-KPIs
                      │    │                    │
                      └────┴──→ 10-LANDING-PAGE-SPEC
                                       │
                                       └──→ 11-MATERIAIS-MARKETING
```

```yaml
leitura_recomendada:
  visao_rapida: [01, 00]  # este indice + visao produto
  estrategia_completa: [01, 02, 03, 07, 08]  # fundacao + monetizacao + lancamento
  execucao_imediata: [10, 11, 06]  # landing page + materiais + conteudo
  aquisicao_paga: [04, 05, 09]  # SEO + Ads + metricas
  decisao_pricing: [02, 07, 03]  # competitiva + monetizacao + personas
```

---

## 4. CROSS-REFERENCE RAPIDA

```yaml
por_tema:
  produto_e_diferenciais: [01 §1-3, 02 §4-5]
  mercado_e_concorrentes: [02 §1-3, 02 §6]
  personas: [03 §2-3, 01 §6]
  seo: [04 §1-10]
  google_ads: [05 §1-13]
  conteudo_editorial: [06 §1-13, 04 §5]
  monetizacao: [07 §1-12, 02 §6]
  lancamento: [08 §1-14]
  metricas: [09 §1-11, 07 §7, 05 §10]
  landing_page: [10 §1-12]
  materiais_prontos: [11 §1-16]

por_persona:
  P1_operador: [03 §2.1, 06 §4, 07 §6, 10 §3, 11 §2-5]
  P2_programador: [03 §2.2, 06 §4, 07 §6]
  P3_professor: [03 §2.3, 06 §4, 08 §7, 11 §7+11]
  P4_dono_oficina: [03 §2.4, 06 §4, 07 §6, 10 §3, 11 §7]

por_canal:
  blog: [04 §5, 06 §5]
  youtube: [06 §6, 11 §4]
  linkedin: [06 §7, 11 §3]
  whatsapp: [06 §8, 08 §9, 11 §5]
  google_ads: [05 §1-13]
  email: [11 §2, 11 §8]
  senai_parcerias: [08 §7, 11 §7+13]

por_fase_lancamento:
  fase_0_preparacao: [08 §2, 10, 11 §15, 04 §8]
  fase_1_soft_launch: [08 §3, 06 §3, 11 §2-5]
  fase_2_crescimento: [08 §4, 05, 06 §3]
  fase_3_monetizacao: [08 §5, 07 §1-5]
```

---

## 5. ESTADO DOS DOCUMENTOS ORIGINAIS

```yaml
documentos_originais:
  localizacao: DOCUMENTACAO_MARKETING_MONETIZACAO/ (mesma pasta)
  total: 8 arquivos
  status: substituidos pelos 11 novos docs — manter como referencia historica
  acao_pendente: mover para _originais/ quando Rafael confirmar

  mapeamento:
    - original: "ToolOptimizer CNC - Informacoes do Projeto.md"
      substituido_por: 01-VISAO-PRODUTO.md

    - original: "Analise de Monetizacao e Aderencia - Mercado de Calculadoras CNC.md"
      substituido_por: [01-VISAO-PRODUTO.md, 07-MODELO-MONETIZACAO.md]

    - original: "Analise de Concorrentes e Melhores Praticas de Vendas (Nicho CNC).md"
      substituido_por: 02-ANALISE-COMPETITIVA.md

    - original: "Pesquisa de SEO e Palavras-Chave - ToolOptimizer CNC.md"
      substituido_por: 04-ESTRATEGIA-SEO.md

    - original: "Investigacao de SEO e Estrategia de Anuncios_ ToolOptimizer CNC.md"
      substituido_por: [04-ESTRATEGIA-SEO.md, 05-PLANO-GOOGLE-ADS.md]

    - original: "Guia de Implementacao de SEO para ToolOptimizer CNC.md"
      substituido_por: 04-ESTRATEGIA-SEO.md

    - original: "Estrategia de Monetizacao e Precificacao_ ToolOptimizer CNC.md"
      substituido_por: 07-MODELO-MONETIZACAO.md

    - original: "Plano de Execucao_ Site de Vendas de Alta Conversao - ToolOptimizer CNC.md"
      substituido_por: 10-LANDING-PAGE-SPEC.md
```

---

## 6. COMO USAR ESTA DOCUMENTACAO

```yaml
para_llms:
  contexto_minimo: carregar 00 (este indice) + 01 (visao produto)
  contexto_completo: carregar todos os 12 docs (~15K tokens total)
  busca_por_tema: usar secao 4 (cross-reference) para localizar secoes especificas
  ordem_de_leitura: seguir grafo de dependencias (secao 3) — docs anteriores sao pre-requisito

para_rafael:
  decisao_rapida: ler resumo executivo (secao 1) — 1 minuto
  revisar_estrategia: ler docs 01 + 07 + 08 — visao + monetizacao + lancamento
  executar_agora: ler docs 10 + 11 — landing page + materiais prontos
  acompanhar_metricas: ler doc 09 — KPIs e report mensal

atualizacao:
  frequencia: atualizar este indice quando qualquer doc for revisado
  versao_sistema: atualizar resumo executivo quando versao do produto mudar
  docs_novos: adicionar ao indice mantendo numeracao sequencial
```

---

## 7. CHANGELOG

```yaml
- data: 20/03/2026
  versao: 1.0
  descricao: criacao do indice master com 11 docs concluidos
  autor: Rafael + Claude
```
