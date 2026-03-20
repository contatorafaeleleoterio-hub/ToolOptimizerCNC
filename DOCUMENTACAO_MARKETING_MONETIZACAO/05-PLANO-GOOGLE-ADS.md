# 05 — Plano Google Ads: ToolOptimizer CNC

> **Versao:** 1.0 | **Data:** 20/03/2026 | **Autor:** Rafael Eleoterio + Claude
> **Formato:** Otimizado para consumo por LLMs — dados estruturados, sem prosa, alta densidade
> **Depende de:** `03-PERSONAS-E-JORNADA.md` (personas, gatilhos), `04-ESTRATEGIA-SEO.md` (keywords, negativacao)
> **Alimenta:** `06-ESTRATEGIA-CONTEUDO.md`, `09-METRICAS-E-KPIs.md`, `10-LANDING-PAGE-SPEC.md`
> **Consolida:** parte de "Investigacao de SEO e Estrategia de Anuncios" (textos de anuncios originais — revisados e expandidos)

---

## 1. ESTRATEGIA GERAL

```yaml
tipo_campanha: Rede de Pesquisa (Search Network)
objetivo: trafego qualificado para landing page + ativacao (primeiro calculo)
motivo_search_only:
  - usuario ja esta buscando solucao (alta intencao)
  - display/video tem CPC mais baixo mas conversao muito menor para ferramenta tecnica
  - orcamento limitado — concentrar em alta intencao

modelo_cobranca: CPC manual (inicio) → CPC otimizado (apos 30 conversoes)
conversao_primaria: primeiro calculo completo (clique em "Simular")
conversao_secundaria: download .exe | bookmark | retorno em 7 dias

fase_inicial: validacao — 30-60 dias para coletar dados de CPC real e taxa de conversao
fase_otimizacao: apos 30 conversoes — migrar para Maximizar Conversoes ou CPA alvo

idioma_anuncios: PT-BR
segmentacao_geografica: Brasil (todo territorio — polos industriais tem mais busca)
dispositivos: todos (desktop + mobile — operadores buscam pelo celular)
horarios_recomendados:
  - segunda a sexta: 07:00-20:00 (horario comercial + almoco)
  - sabado: 08:00-14:00 (oficinas funcionam sabado manha)
  - domingo: desligado (volume insignificante)
```

---

## 2. ORCAMENTO

```yaml
cenario_conservador:
  orcamento_diario: R$20
  orcamento_mensal: ~R$600
  cliques_estimados: 120-200/mes (CPC medio R$3-5)
  objetivo: coletar dados, validar keywords, testar anuncios

cenario_moderado:
  orcamento_diario: R$50
  orcamento_mensal: ~R$1.500
  cliques_estimados: 300-500/mes
  objetivo: volume suficiente para otimizar campanhas

cenario_agressivo:
  orcamento_diario: R$100
  orcamento_mensal: ~R$3.000
  cliques_estimados: 600-1000/mes
  objetivo: escala rapida apos validacao de CPA

recomendacao: comecar com cenario_conservador (R$20/dia) por 30 dias → avaliar → escalar
motivo: produto gratuito — conversao esperada alta (sem barreira de pagamento)
```

---

## 3. ESTIMATIVA CPC — MERCADO BRASILEIRO

```yaml
nota: valores estimados para nicho CNC/usinagem no Brasil — nicho tecnico B2B com volume baixo-medio

keywords_alta_intencao:
  cpc_estimado: R$2.50-R$5.00
  exemplos: ["calculadora usinagem cnc", "calculadora parametros corte cnc", "calcular rpm fresa"]
  concorrencia: MEDIA (poucos anunciantes BR neste nicho)

keywords_informativas:
  cpc_estimado: R$1.00-R$3.00
  exemplos: ["como calcular rpm cnc", "parametros de corte fresamento", "formula avanco por dente"]
  concorrencia: BAIXA

keywords_problema:
  cpc_estimado: R$1.50-R$4.00
  exemplos: ["evitar quebra fresa cnc", "fresa vibrando cnc", "como reduzir custo ferramental"]
  concorrencia: BAIXA-MEDIA

keywords_nicho_avancado:
  cpc_estimado: R$0.50-R$2.00
  exemplos: ["chip thinning calculator", "kienzle cutting force", "kc1.1 specific cutting force"]
  concorrencia: MINIMA (termos em ingles, volume baixo)

cpc_medio_ponderado_estimado: R$3.00
fonte_estimativa: benchmarks Google Ads Brasil nicho B2B industrial/ferramentaria
nota_importante: valores reais podem variar — monitorar nas primeiras 2 semanas e ajustar
```

---

## 4. GRUPOS DE ANUNCIOS

### 4.1 Grupo 1 — Calculadora CNC (Alta Intencao)

```yaml
id: GA1
nome: "Calculadora CNC"
persona_alvo: [P1_operador, P2_programador_cam]
intencao: comercial/ferramenta — usuario busca uma calculadora
landing_page: tooloptimizercnc.com.br (landing page principal)

keywords_exata:
  - [calculadora usinagem cnc]
  - [calculadora parametros corte cnc]
  - [calculadora cnc online]
  - [calculadora rpm fresa]
  - [calculadora de corte cnc]

keywords_frase:
  - "calculadora cnc gratuita"
  - "calculadora parametros de corte"
  - "calculadora de usinagem online"
  - "app calculadora cnc"

keywords_ampla_modificada:
  - +calculadora +cnc +parametros
  - +calculadora +usinagem +fresa
  - +calcular +rpm +cnc

cpc_max_sugerido: R$5.00
prioridade_orcamento: 40% do total
```

### 4.2 Grupo 2 — Seguranca e Problemas (Diferencial L/D)

```yaml
id: GA2
nome: "Seguranca CNC"
persona_alvo: [P1_operador, P4_dono_oficina]
intencao: problema/solucao — usuario tem uma dor e busca resolver
landing_page: tooloptimizercnc.com.br/seguranca (ou ancora #seguranca na LP)

keywords_exata:
  - [evitar quebra fresa cnc]
  - [parametros corretos cnc]
  - [relacao l/d fresa]

keywords_frase:
  - "como evitar quebra de fresa"
  - "fresa vibrando cnc"
  - "parametros de corte seguros"
  - "reduzir quebra ferramenta cnc"
  - "como diminuir custo ferramental cnc"

keywords_ampla_modificada:
  - +quebra +fresa +cnc +evitar
  - +vibracao +fresa +parametros
  - +custo +ferramental +cnc +reduzir

cpc_max_sugerido: R$4.00
prioridade_orcamento: 25% do total
```

### 4.3 Grupo 3 — Educacao e Formulas (Professor + Estudante)

```yaml
id: GA3
nome: "Educacao CNC"
persona_alvo: [P3_professor_senai, P1_operador (aprendizado)]
intencao: educativa/informativa — usuario quer aprender
landing_page: tooloptimizercnc.com.br/educacao (ou ancora #educacao na LP)

keywords_exata:
  - [formula rpm fresamento]
  - [calculo avanco por dente]
  - [parametros de corte fresamento]

keywords_frase:
  - "como calcular rpm para fresamento cnc"
  - "formula avanco por dente fresa"
  - "calculadora cnc gratuita educativa"
  - "ferramenta didatica usinagem"
  - "velocidade de corte usinagem tabela"
  - "potencia de corte cnc formula"

keywords_ampla_modificada:
  - +formula +rpm +fresamento
  - +calcular +avanco +fresa
  - +ensinar +parametros +corte

cpc_max_sugerido: R$3.00
prioridade_orcamento: 20% do total
```

### 4.4 Grupo 4 — Nicho Avancado (Programador CAM)

```yaml
id: GA4
nome: "Nicho Tecnico Avancado"
persona_alvo: [P2_programador_cam]
intencao: tecnica avancada — profissional validando calculos
landing_page: tooloptimizercnc.com.br (landing principal — destaque Kienzle + CTF)

keywords_exata:
  - [chip thinning calculator]
  - [chip thinning fresamento]
  - [kienzle cutting force]
  - [calculadora potencia corte kienzle]
  - [kc1.1 forca especifica corte]

keywords_frase:
  - "chip thinning factor calculator"
  - "forca de corte kienzle"
  - "correcao avanco radial engagement"
  - "calculadora kienzle potencia"

cpc_max_sugerido: R$2.00
prioridade_orcamento: 15% do total
nota: termos mistos PT/EN — volume baixo, mas conversao alta (publico qualificado)
```

---

## 5. TEXTOS DE ANUNCIOS (RSA — Responsive Search Ads)

### 5.1 Regras Google Ads RSA

```yaml
titulos: ate 15 (minimo 3) — max 30 caracteres cada
descricoes: ate 4 (minimo 2) — max 90 caracteres cada
url_visivel: dominio + 2 caminhos de 15 chars cada
nota: Google combina automaticamente — cada titulo/descricao deve funcionar isolado
```

### 5.2 GA1 — Calculadora CNC

```yaml
url_final: https://tooloptimizercnc.com.br
url_visivel: tooloptimizercnc.com.br/Calculadora/CNC

titulos:                                    # max 30 chars — contagem indicada
  - "Calculadora CNC Inteligente"           # 29 chars
  - "RPM e Avanco em 2 Segundos"            # 28 chars
  - "Calculadora de Usinagem CNC"           # 28 chars
  - "Parametros de Corte CNC"               # 25 chars
  - "100% Gratis e Sem Login"               # 25 chars
  - "Funciona Offline no Celular"           # 29 chars
  - "ToolOptimizer CNC Gratis"              # 26 chars
  - "Otimize sua Usinagem Agora"            # 28 chars
  - "Em Portugues | Sem Cadastro"           # 29 chars
  - "Calcule RPM, Avanco e Kw"              # 26 chars

descricoes:                                 # max 90 chars — contagem indicada
  - "Calcule RPM, Avanco e Potencia com precisao. Modelo de Kienzle. Gratis e em portugues."   # 88 chars
  - "Parametros de corte em 2 segundos. Sem conta, sem tabela, sem catalogo. Acesse agora."    # 87 chars
  - "Semaforo de seguranca L/D + ajuste fino com sliders. A ciencia da usinagem simplificada." # 90 chars
  - "Funciona no celular e offline. Ideal para chao de fabrica. Resultado imediato."           # 83 chars

extensoes:
  sitelinks:
    - titulo: "Calcular Agora" | url: /
    - titulo: "Baixar Versao Offline" | url: /#download
    - titulo: "Como Funciona" | url: /#como-funciona
    - titulo: "Para Educadores" | url: /#educacao
  callout:
    - "100% Gratis"
    - "Sem Login"
    - "Funciona Offline"
    - "PT-BR Nativo"
    - "Modelo de Kienzle"
  snippet_estruturado:
    tipo: Tipos
    valores: ["Fresamento", "Fresa Topo Reto", "Fresa Toroidal", "Fresa Esferica"]
```

### 5.3 GA2 — Seguranca CNC

```yaml
url_final: https://tooloptimizercnc.com.br
url_visivel: tooloptimizercnc.com.br/Seguranca/CNC

titulos:
  - "Usinagem CNC com Seguranca"            # 28 chars
  - "Validacao de Parametros L/D"            # 29 chars
  - "Evite Quebra de Fresa CNC"             # 27 chars
  - "Semaforo Visual de Risco"              # 26 chars
  - "Parametros Seguros em 2 Seg"           # 29 chars
  - "Chega de Quebrar Ferramenta"           # 29 chars
  - "Reduza Custo de Ferramental"           # 29 chars
  - "ToolOptimizer CNC Gratis"              # 26 chars
  - "Proteja Suas Fresas"                   # 21 chars
  - "Alerta de Vibracao L/D"                # 24 chars

descricoes:
  - "Semaforo visual classifica seguranca dos parametros. Verde, amarelo, vermelho ou bloqueio." # 90 chars
  - "Evite erros de calculo e quebra de fresa. Interface intuitiva com ajuste fino por sliders." # 90 chars
  - "Fresa de R$200-800 quebrada por parametro errado? Valide antes de ligar a maquina."        # 85 chars
  - "O sistema recomenda, voce decide. Parametros com engenharia real para operadores CNC."     # 89 chars

extensoes:
  callout:
    - "Semaforo L/D"
    - "Bloqueio L/D > 6"
    - "Safety Factor 0.7-0.8"
    - "Gratis"
```

### 5.4 GA3 — Educacao CNC

```yaml
url_final: https://tooloptimizercnc.com.br
url_visivel: tooloptimizercnc.com.br/Formulas/CNC

titulos:
  - "Formulas CNC com Resultado"            # 28 chars
  - "Aprenda Parametros de Corte"            # 29 chars
  - "Calculadora CNC Educativa"              # 27 chars
  - "RPM, Avanco, Potencia | CNC"            # 29 chars
  - "Gratis para Professores"                # 25 chars
  - "Ideal para Sala de Aula"                # 25 chars
  - "Formulas Visiveis e Reais"              # 27 chars
  - "Ferramenta Didatica CNC"                # 25 chars
  - "Sem Login | Em Portugues"               # 26 chars
  - "Kienzle e Chip Thinning"                # 25 chars

descricoes:
  - "Mostra a formula com valores reais substituidos. Aluno ve o calculo acontecer na tela."    # 89 chars
  - "Gratis, sem login, funciona no celular do aluno. Ideal para aulas de usinagem e SENAI."    # 89 chars
  - "Calcule RPM, Avanco e Potencia. Modelo de Kienzle com valores reais. 100% em portugues."  # 90 chars
  - "Professor: projete na sala de aula. Alunos acessam pelo celular. Sem instalacao."          # 85 chars

extensoes:
  callout:
    - "Formulas Visiveis"
    - "Modelo de Kienzle"
    - "Chip Thinning"
    - "Gratis para Todos"
```

### 5.5 GA4 — Nicho Tecnico Avancado

```yaml
url_final: https://tooloptimizercnc.com.br
url_visivel: tooloptimizercnc.com.br/Kienzle/Calculator

titulos:
  - "Chip Thinning Calculator"               # 26 chars
  - "Kienzle Cutting Force CNC"              # 27 chars
  - "Calculadora Potencia Corte"             # 28 chars
  - "CTF + Correcao de Avanco"               # 26 chars
  - "kc1.1 Forca de Corte Real"              # 27 chars
  - "Valide L/D Antes de Usinar"             # 28 chars
  - "Brand-Agnostic | Gratis"                # 25 chars
  - "Kienzle + Health Bars"                  # 23 chars

descricoes:
  - "Chip thinning factor automatico quando ae < 50% do diametro. Correcao de fz integrada."   # 89 chars
  - "Potencia de corte pelo modelo de Kienzle (kc1.1). Validacao L/D com semaforo. Gratis."    # 88 chars
  - "Funciona com qualquer fresa, de qualquer fabricante. Sem lock-in. Dados tecnicos reais."  # 89 chars
  - "Para programadores CAM que precisam validar parametros com engenharia, nao com feeling."   # 90 chars
```

---

## 6. KEYWORDS DE NEGATIVACAO

```yaml
fonte: Doc 04 (04-ESTRATEGIA-SEO.md) secao 3.3 — expandida

negativar_obrigatorio:
  emprego_e_carreira:
    - emprego operador cnc
    - vaga operador cnc
    - salario operador cnc
    - curso usinagem presencial
    - curso cnc online
    - certificado cnc

  compra_equipamento:
    - comprar fresadora
    - fresadora usada
    - comprar torno cnc
    - maquina cnc preco
    - centro de usinagem preco
    - comprar fresa metal duro

  servicos_usinagem:
    - pecas usinadas sob encomenda
    - usinagem sob medida
    - servico de usinagem
    - orcamento usinagem

  cnc_outros_tipos:
    - cnc router madeira
    - cnc laser corte
    - impressora 3d cnc
    - arduino cnc
    - cnc plasma
    - cnc gravacao

  software_cam:
    - mastercam preco
    - fusion 360 download
    - solidworks cam
    - edgecam

  termos_genericos:
    - o que e cnc
    - historia do cnc
    - tipos de maquinas cnc

nota: revisar e expandir lista apos primeiras 2 semanas com dados do Search Terms Report
```

---

## 7. LANDING PAGES POR GRUPO

```yaml
estrategia: landing page unica com ancoras por secao (MVP) → landing pages separadas (pos-validacao)

mvp_landing_page:
  url_base: https://tooloptimizercnc.com.br
  tipo: pagina estatica (HTML) — separada da SPA React
  ref: 10-LANDING-PAGE-SPEC.md (Doc 10)

  secoes_por_grupo:
    GA1_calculadora:
      ancora: / (topo da pagina)
      conteudo:
        - hero com CTA "Calcular Agora"
        - 3 passos (Material → Ferramenta → Simular)
        - screenshot do dashboard
        - badges: "Gratis | Sem Login | Offline | PT-BR"
      cta_principal: "Calcular Agora" → app.tooloptimizercnc.com.br

    GA2_seguranca:
      ancora: /#seguranca
      conteudo:
        - secao "Seguranca que Nenhuma Calculadora Oferece"
        - visual do semaforo L/D (verde/amarelo/vermelho/bloqueado)
        - exemplo real: "L/D 4.2 → Amarelo → Alerta de vibracao"
        - depoimento/cenario: "Fresa de R$500 salva por 1 calculo"
      cta: "Testar com Meus Parametros" → app.tooloptimizercnc.com.br

    GA3_educacao:
      ancora: /#educacao
      conteudo:
        - secao "Para Professores e Escolas Tecnicas"
        - screenshot das formulas com valores reais
        - badges: "Gratis para Educadores | Sem Instalacao | Celular do Aluno"
        - guia rapido: "Como usar em sala de aula em 3 minutos"
      cta: "Usar em Aula" → app.tooloptimizercnc.com.br

    GA4_nicho:
      ancora: / (topo — mesmo que GA1)
      conteudo: hero ja menciona Kienzle + CTF
      nota: publico tecnico nao precisa secao separada — o dashboard e auto-explicativo

pos_validacao:
  quando: apos 60 dias e 100+ conversoes
  acao: criar landing pages dedicadas por grupo se dados mostrarem diferenca significativa de conversao
  urls_futuras:
    - tooloptimizercnc.com.br/calculadora-cnc
    - tooloptimizercnc.com.br/seguranca-usinagem
    - tooloptimizercnc.com.br/para-educadores
```

---

## 8. TRACKING E CONVERSOES

```yaml
plataforma_analytics: Cloudflare Web Analytics (ja ativo — sem script adicional)
tracking_conversao: Google Ads conversion tag (requer instalacao)

conversoes_a_rastrear:
  primaria:
    nome: "Primeiro Calculo"
    evento: clique no botao "Simular" com resultado valido
    valor: R$0 (produto gratuito — otimizar por volume)
    janela: 30 dias

  secundarias:
    - nome: "Download Desktop"
      evento: clique no link de download .exe
    - nome: "Retorno 7 dias"
      evento: segundo acesso em janela de 7 dias
    - nome: "Compartilhamento"
      evento: uso do botao compartilhar (se existir)

implementacao:
  google_tag: Google Tag (gtag.js) na landing page estatica
  nota_csp: ajustar CSP connect-src para permitir googleads.g.doubleclick.net e google-analytics.com
  ref: PLAN_Seguranca_Cibernetica.md Fase 2 (CSP headers)

utm_parameters:
  padrao: "?utm_source=google&utm_medium=cpc&utm_campaign={campaign}&utm_content={adgroup}"
  exemplo_GA1: "?utm_source=google&utm_medium=cpc&utm_campaign=calculadora_cnc&utm_content=ga1_calculadora"
  exemplo_GA2: "?utm_source=google&utm_medium=cpc&utm_campaign=seguranca_cnc&utm_content=ga2_seguranca"
```

---

## 9. CRONOGRAMA DE EXECUCAO

```yaml
semana_1:
  - criar conta Google Ads (se nao existir)
  - configurar conversao primaria (primeiro calculo)
  - criar campanha com GA1 + GA2 (grupos de maior intencao)
  - definir orcamento R$20/dia
  - adicionar lista completa de negativacao
  - configurar extensoes (sitelinks, callouts)

semana_2:
  - analisar Search Terms Report → expandir negativacao
  - verificar Quality Score dos anuncios
  - adicionar GA3 (educacao) se orcamento permitir
  - ajustar CPC max por keyword com base em dados reais

semana_3_4:
  - adicionar GA4 (nicho avancado)
  - primeiro A/B test de titulos (trocar 2 titulos por grupo)
  - avaliar CTR por grupo → pausar keywords com CTR < 1%
  - avaliar conversao → pausar keywords sem conversao em 14 dias

mes_2:
  - avaliar CPA (custo por primeiro calculo)
  - se CPA < R$5 → escalar orcamento para R$50/dia
  - se CPA > R$10 → revisar keywords + landing page + textos
  - testar novos formatos de titulo baseado nos dados
  - considerar Smart Bidding se 30+ conversoes acumuladas

mes_3:
  - migrar para Maximizar Conversoes ou CPA alvo (se dados suficientes)
  - criar remarketing list (visitantes que nao converteram)
  - avaliar ROAS se modelo freemium ja estiver ativo
```

---

## 10. METRICAS DE SUCESSO

```yaml
kpis_primarios:
  ctr: "> 3% (benchmark search ads B2B Brasil)"
  cpc_medio: "< R$5.00"
  conversao_primeiro_calculo: "> 15% (produto gratuito — barreira baixa)"
  cpa: "< R$10 por primeiro calculo"

kpis_secundarios:
  quality_score: "> 6/10 (media por keyword)"
  impression_share: "> 50% (nicho pequeno — dominavel)"
  bounce_rate_landing: "< 60%"
  tempo_na_pagina: "> 60 segundos"

benchmarks_referencia:
  ctr_medio_search_br: "3-5% (B2B industrial)"
  cpc_medio_b2b_br: "R$2-6 (nicho tecnico)"
  conversao_media_saas_free: "10-20% (sem barreira de pagamento)"

cadencia_revisao:
  semanal: CTR, CPC, impressoes, cliques, Search Terms
  quinzenal: conversoes, CPA, Quality Score
  mensal: ROAS (se monetizado), share of voice, decisao de escalar/pausar
```

---

## 11. RISCOS E MITIGACOES

```yaml
R1_volume_baixo:
  risco: nicho CNC tem volume de busca limitado no Brasil
  impacto: poucos cliques mesmo com orcamento disponivel
  mitigacao: expandir keywords (frase + ampla modificada) + GA3/GA4 com termos educacionais
  indicador: < 50 impressoes/dia apos 7 dias → expandir keywords

R2_cpc_alto:
  risco: CPC real acima do estimado (concorrentes de fabricantes)
  impacto: orcamento esgota antes de gerar volume significativo
  mitigacao: focar em cauda longa + termos educacionais (CPC mais baixo) + melhorar Quality Score
  indicador: CPC medio > R$8 → reavaliar estrategia

R3_conversao_baixa:
  risco: usuario clica no anuncio mas nao faz primeiro calculo
  impacto: CPA alto, desperdicio de orcamento
  mitigacao: otimizar landing page (CTA claro, carregamento rapido, demonstracao visual)
  indicador: conversao < 5% apos 100 cliques → revisar landing page

R4_landing_page_inexistente:
  risco: landing page estatica ainda nao existe (Doc 10 pendente)
  impacto: anuncios direcionam para SPA — menos controle de mensagem
  mitigacao_temporaria: usar app.tooloptimizercnc.com.br como destino ate LP ser criada
  acao: priorizar Doc 10 (Landing Page Spec) antes de ativar Google Ads

R5_csp_bloqueia_tracking:
  risco: CSP atual (nao commitado) bloqueia scripts de tracking do Google Ads
  impacto: conversoes nao rastreadas
  mitigacao: ajustar CSP na Fase 2 da Seguranca Cibernetica antes de ativar campanha
  ref: 04-ESTRATEGIA-SEO.md secao 1.4 (bug connect-src)
```

---

## 12. DEPENDENCIAS

```yaml
antes_de_ativar_google_ads:
  obrigatorio:
    - D1: landing page estatica (Doc 10 — 10-LANDING-PAGE-SPEC.md)
    - D2: Google Tag (gtag.js) instalado na landing page
    - D3: CSP ajustado para permitir Google Ads tracking (Fase 2 Seguranca)
    - D4: conta Google Ads criada e verificada

  recomendado:
    - D5: Google Search Console ativo (Doc 04 acao A1)
    - D6: og-image.png validado em producao (Doc 04 acao A3)
    - D7: canonical corrigido para dominio primario (Doc 04 acao C1)

ordem_sugerida: D4 → D1 → D3 → D2 → D5 → D6 → D7 → ativar campanha
```

---

## 13. REFERENCIAS

```yaml
docs_internos:
  personas: 03-PERSONAS-E-JORNADA.md (P1-P4, gatilhos, mensagens)
  seo_keywords: 04-ESTRATEGIA-SEO.md (secao 3 — keyword map completo, secao 3.3 — negativacao)
  conteudo: 06-ESTRATEGIA-CONTEUDO.md (alinhamento mensagem ads + conteudo organico)
  metricas: 09-METRICAS-E-KPIs.md (AARRR + integracao analytics)
  landing_page: 10-LANDING-PAGE-SPEC.md (destino dos anuncios)
  seguranca: docs/plans/PLAN_Seguranca_Cibernetica.md (Fase 2 — CSP para tracking)

doc_original_consolidado:
  - "Investigacao de SEO e Estrategia de Anuncios_ ToolOptimizer CNC.md" (secoes 3-5)

benchmarks_externos:
  cpc_brasil_b2b: benchmarks Google Ads BR industria/ferramentaria 2024-2025
  ctr_search_ads: WordStream/SEMrush benchmarks B2B search 2024
  conversao_saas_free: Unbounce Conversion Benchmark Report 2024
```

---

*v1.0 — 20/03/2026. Campanha Google Ads completa: 4 grupos por persona, textos RSA revisados (30/90 chars verificados), keywords de negativacao expandidas (ref Doc 04 §3.3), estimativa CPC Brasil, landing page por grupo, cronograma 90 dias, dependencias priorizadas.*
