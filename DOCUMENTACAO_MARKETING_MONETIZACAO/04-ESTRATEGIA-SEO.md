# 04 — Estrategia SEO: ToolOptimizer CNC

> **Versao:** 1.0 | **Data:** 20/03/2026 | **Autor:** Rafael Eleoterio + Claude
> **Formato:** Otimizado para consumo por LLMs — dados estruturados, sem prosa, alta densidade
> **Depende de:** `01-VISAO-PRODUTO.md` (produto, UVP), `02-ANALISE-COMPETITIVA.md` (gaps), `03-PERSONAS-E-JORNADA.md` (personas, gatilhos)
> **Alimenta:** `05-PLANO-GOOGLE-ADS.md`, `06-ESTRATEGIA-CONTEUDO.md`, `10-LANDING-PAGE-SPEC.md`
> **Consolida:** 3 docs originais — "Pesquisa de SEO e Palavras-Chave", "Investigacao de SEO e Estrategia de Anuncios", "Guia de Implementacao de SEO"

---

## 1. AUDITORIA TECNICA — ESTADO ATUAL (v0.7.0)

### 1.1 index.html — Implementado

```yaml
meta_tags:
  title: "ToolOptimizer CNC — Calculadora de Parametros de Corte"
  description: "Calculadora profissional de parametros de corte CNC. Calcule RPM, Avanco e Potencia em 2 segundos com seguranca. Fresamento, torneamento e furacao. Modelo de Kienzle."
  keywords: "CNC, fresamento, parametros de corte, RPM, avanco, potencia, velocidade de corte, torneamento, calculadora CNC, usinagem, Kienzle, Vc, fz, fresa toroidal, mestre CNC"
  robots: "index, follow"
  author: "Mestre CNC"
  charset: UTF-8
  viewport: "width=device-width, initial-scale=1.0"
  lang: pt-BR

open_graph:
  type: website
  title: "ToolOptimizer CNC — Calculadora de Parametros de Corte"
  description: presente (truncada)
  url: "https://app.tooloptimizercnc.com.br/"
  image: "https://app.tooloptimizercnc.com.br/og-image.png"
  site_name: "ToolOptimizer CNC"
  locale: pt_BR

twitter_card:
  card: summary_large_image
  title: presente
  description: presente
  image: presente

canonical: "https://app.tooloptimizercnc.com.br/"

schema_org:
  - tipo: SoftwareApplication
    campos: [name, applicationCategory, operatingSystem, description, url, inLanguage, offers(free), author, featureList(7 items)]
  - tipo: FAQPage
    perguntas: 4
    temas: [calculo RPM, gratuidade, offline, Kienzle]

favicons:
  - favicon.ico (any)
  - favicon-32x32.png
  - favicon-16x16.png
  - apple-touch-icon 180x180
  theme_color: "#0F1419"

fonts:
  preconnect: [fonts.googleapis.com, fonts.gstatic.com]
  families: [Inter (300-700), JetBrains Mono (400,700), Material Symbols Outlined]

scripts:
  spa_redirect: script GitHub Pages (122-133) — OBSOLETO (deploy agora via Cloudflare Workers)
```

### 1.2 robots.txt — Implementado

```yaml
estado: OK
conteudo:
  user_agent: "*"
  allow: "/"
  sitemap: "https://app.tooloptimizercnc.com.br/sitemap.xml"
```

### 1.3 sitemap.xml — Implementado (desatualizado)

```yaml
estado: DESATUALIZADO
paginas_listadas:
  - loc: "https://app.tooloptimizercnc.com.br/"
    priority: 1.0
  - loc: "https://app.tooloptimizercnc.com.br/settings"
    priority: 0.5
  - loc: "https://app.tooloptimizercnc.com.br/history"
    priority: 0.5

problemas:
  - lastmod desatualizado: "2026-02-24" (sistema e v0.7.0, ultima atualizacao 20/03/2026)
  - faltam rotas: /admin nao deve ser indexada (OK omitir)
  - dominio primario: tooloptimizercnc.com.br (sem "app.") e o dominio principal — sitemap usa "app."
```

### 1.4 _headers — Implementado (nao commitado)

```yaml
estado: NAO COMMITADO — headers existem localmente mas nao estao em producao
conteudo:
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: "camera=(), microphone=(), geolocation=()"
  X-XSS-Protection: "1; mode=block"
  HSTS: "max-age=31536000; includeSubDomains; preload"
  CSP: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'"

bug_conhecido:
  - "connect-src 'self'" bloqueia api.cloudflare.com — necessario para Admin Analytics
  - correcao planejada na Fase 2 da Seguranca Cibernetica (PLAN_Seguranca_Cibernetica.md)
```

### 1.5 Infraestrutura SEO

```yaml
hosting: Cloudflare Workers (edge global, latencia baixa)
ssl: HTTPS forcado (Cloudflare)
spa_routing: "not_found_handling: single-page-application" (wrangler.jsonc)
cdn: Cloudflare CDN (assets em cache global)
analytics: Cloudflare Web Analytics (ativo — sem script no HTML)

performance_build:
  js_gzip: 99.20 KB
  css_gzip: 14.35 KB
  code_splitting: lazy routes (React.lazy + Suspense para /admin/*, /settings, /history)
  tree_shaking: Vite 6 (automatico)
  minificacao: Vite 6 (automatico)

dominios:
  primario: tooloptimizercnc.com.br
  alias: app.tooloptimizercnc.com.br
  nameservers: Cloudflare (fatima + odin)
```

---

## 2. PROBLEMAS E MELHORIAS IDENTIFICADAS

### 2.1 Problemas Tecnicos

```yaml
P1_spa_indexacao:
  problema: SPA React — conteudo renderizado client-side
  impacto: MEDIO — Googlebot executa JS, mas outros crawlers podem nao indexar
  solucao_atual: meta tags + Schema.org no index.html (pre-render parcial)
  solucao_ideal: prerender das rotas principais OU landing page estatica separada
  prioridade: MEDIA (Google indexa SPAs modernos — risco real e para Bing/Yahoo)

P2_script_github_pages:
  problema: script SPA redirect para GitHub Pages no index.html (linhas 122-133) — OBSOLETO
  impacto: BAIXO — script inerte, mas codigo morto confunde crawlers
  solucao: remover na Fase 5 da Seguranca Cibernetica (junto com Plausible)
  prioridade: BAIXA

P3_sitemap_desatualizado:
  problema: lastmod "2026-02-24", dominio "app." em vez de dominio primario
  solucao: atualizar lastmod + usar tooloptimizercnc.com.br como loc principal
  prioridade: MEDIA

P4_og_image:
  problema: og-image.png referenciado — verificar se existe e se e otimizado (1200x630px)
  solucao: validar existencia + dimensoes + compressao
  prioridade: MEDIA

P5_meta_description_length:
  problema: description atual tem ~155 chars — proximo do limite de 160
  estado: OK (dentro do limite)

P6_canonical_dominio:
  problema: canonical aponta para "app.tooloptimizercnc.com.br" — dominio primario e "tooloptimizercnc.com.br"
  impacto: MEDIO — pode dividir autoridade entre dominios
  solucao: canonical para tooloptimizercnc.com.br + redirect 301 de app. -> principal
  prioridade: ALTA

P7_title_tag:
  estado_atual: "ToolOptimizer CNC — Calculadora de Parametros de Corte" (52 chars)
  sugestao: "ToolOptimizer CNC — Calculadora de Parametros de Corte CNC | Gratis" (68 chars)
  motivo: inclui "CNC" na cauda + "Gratis" como diferencial decisivo
  prioridade: BAIXA (titulo atual e bom)
```

### 2.2 Melhorias de Schema.org

```yaml
schema_softwareapplication:
  adicionar:
    - screenshot: URL de screenshot do dashboard
    - aggregateRating: quando houver avaliacoes
    - softwareVersion: "0.7.0"
    - datePublished: data do primeiro deploy
    - downloadUrl: link do .exe quando landing page existir

schema_faqpage:
  adicionar_perguntas:
    - "Quais materiais o ToolOptimizer suporta?"
    - "O que e a relacao L/D e por que importa?"
    - "Como funciona o ajuste fino com sliders?"
    - "O ToolOptimizer funciona para torneamento?"
    - "Como calcular a potencia de corte pelo modelo de Kienzle?"

schema_futuro:
  - tipo: HowTo — "Como calcular parametros de corte para fresamento CNC"
  - tipo: Organization — MestreCNC como entidade
  - tipo: WebApplication — alternativa a SoftwareApplication
```

---

## 3. PALAVRAS-CHAVE

### 3.1 Keyword Map Principal

```yaml
keyword_primaria:
  termo: "calculadora de parametros de corte cnc"
  volume_estimado: MEDIO-ALTO
  intencao: comercial/ferramenta
  concorrencia: MEDIA (fabricantes dominam, mas em ingles)
  uso: title tag, H1 da landing page, meta description

keywords_secundarias:
  - termo: "calculadora de usinagem cnc"
    volume: ALTO
    intencao: comercial/ferramenta
    concorrencia: MEDIA
  - termo: "calculo de rpm e avanco fresa"
    volume: MEDIO-ALTO
    intencao: informativo/pratico
    concorrencia: BAIXA
  - termo: "parametros de corte fresamento"
    volume: MEDIO
    intencao: educativo/tecnico
    concorrencia: MEDIA
  - termo: "tabela de avanco para fresa"
    volume: MEDIO
    intencao: referencia rapida
    concorrencia: ALTA (fabricantes)
  - termo: "velocidade de corte usinagem"
    volume: MEDIO
    intencao: educativo
    concorrencia: MEDIA
  - termo: "calculadora de potencia de corte"
    volume: MEDIO
    intencao: tecnico/engenharia
    concorrencia: BAIXA

keywords_cauda_longa:
  - "como calcular rpm para fresamento cnc"
  - "calculadora cnc gratuita em portugues"
  - "parametros de corte para aluminio cnc"
  - "calculo de avanco por dente fresa"
  - "relacao L/D fresa vibracao"
  - "chip thinning calculator fresamento"
  - "forca de corte kienzle"
  - "potencia de corte cnc formula"
  - "calculadora de usinagem cnc online gratis"
  - "como evitar quebra de fresa cnc"
  - "semaforo L/D usinagem"

keywords_nicho_avancado:
  - "chip thinning factor calculator"
  - "kienzle cutting force model"
  - "kc1.1 specific cutting force"
  - "fz corrigido radial engagement"
  nota: termos em ingles — atraem programadores CAM e engenheiros
```

### 3.2 Keywords por Persona

```yaml
P1_operador_cnc:
  busca_tipica:
    - "calculadora rpm fresa"
    - "como calcular avanco cnc"
    - "parametros de corte para [material]"
    - "tabela avanco fresa topo reto"
  intencao: pratica/imediata
  canal: Google Search + YouTube

P2_programador_cam:
  busca_tipica:
    - "calculadora parametros corte cnc"
    - "L/D ratio vibracao fresa"
    - "calculadora kienzle potencia corte"
    - "chip thinning correcao avanco"
  intencao: tecnica/validacao
  canal: Google Search + LinkedIn + forums

P3_professor_senai:
  busca_tipica:
    - "calculadora cnc gratuita educativa"
    - "ferramenta didatica usinagem"
    - "app parametros corte gratuito portugues"
    - "como ensinar parametros de corte"
  intencao: educacional
  canal: Google Search + grupos professores

P4_dono_oficina:
  busca_tipica:
    - "reduzir quebra de fresa cnc"
    - "como diminuir custo ferramental"
    - "parametros de corte corretos cnc"
    - "calculadora cnc para equipe"
  intencao: economia/ROI
  canal: Google Search + WhatsApp grupos
```

### 3.3 Keywords de Negativacao (para Google Ads — ref cruzada com Doc 05)

```yaml
negativar:
  - emprego operador cnc
  - curso usinagem presencial
  - comprar fresadora usada
  - torno mecanico convencional
  - pecas usinadas sob encomenda
  - cnc router madeira
  - cnc laser corte
  - impressora 3d cnc
  - arduino cnc
```

---

## 4. SEO ON-PAGE — CHECKLIST

### 4.1 Meta Tags

```yaml
status_geral: BOM — base solida, ajustes incrementais

otimizacoes_pendentes:
  title_tag:
    atual: "ToolOptimizer CNC — Calculadora de Parametros de Corte"
    sugestao: "ToolOptimizer CNC — Calculadora de Parametros de Corte CNC | Gratis"
    acao: OPCIONAL (titulo atual e adequado)

  meta_description:
    atual: 155 chars — inclui RPM, Avanco, Potencia, seguranca, Kienzle
    estado: BOM
    sugestao_alternativa: "Calcule RPM, Avanco e Potencia de corte CNC em 2 segundos. Gratis, em portugues, offline. Semaforo de seguranca L/D + modelo de Kienzle. Sem login."
    acao: OPCIONAL (descricao atual e boa)

  meta_keywords:
    estado: presente com 14 termos relevantes
    nota: Google nao usa para ranking, mas Bing/outros podem
    acao: MANTER

  canonical:
    atual: "https://app.tooloptimizercnc.com.br/"
    correcao: "https://tooloptimizercnc.com.br/" (dominio primario)
    acao: NECESSARIA — prioridade ALTA
```

### 4.2 HTML Semantico

```yaml
estado_atual:
  - SPA React — HTML base minimo no index.html
  - conteudo renderizado client-side

recomendacoes_para_landing_page_futura:
  - H1 unico: "Calculadora de Parametros de Corte CNC"
  - H2: "Calcule RPM e Avanco em 2 Segundos" | "Semaforo de Seguranca L/D" | etc
  - tags semanticas: header, nav, main, section, footer
  - alt em imagens: descritivos com keywords naturais
  - noscript: mensagem para crawlers que nao executam JS

app_atual:
  - H1 no dashboard: verificar se existe e contem keyword principal
  - alt em logo: "Logo ToolOptimizer CNC - Calculadora de Usinagem"
```

### 4.3 Open Graph e Twitter Card

```yaml
estado: BOM — todos os campos presentes

validar:
  - og:image existe em producao? verificar https://app.tooloptimizercnc.com.br/og-image.png
  - dimensoes ideais: 1200x630px
  - formato: PNG ou JPG otimizado (< 300KB)
  - texto na imagem: legivel em thumbnail pequeno

testar_com:
  - Facebook Sharing Debugger
  - Twitter Card Validator
  - LinkedIn Post Inspector
```

---

## 5. SEO DE CONTEUDO — ESTRATEGIA EDITORIAL

### 5.1 Conteudo Existente

```yaml
app_web:
  - dashboard de calculo (SPA — conteudo dinamico)
  - pagina settings
  - pagina history
  - pagina admin (nao indexar)

conteudo_estatico:
  - FAQ no Schema.org (4 perguntas)
  - meta description com keywords

site_apoio:
  - mestrecnc.com.br (ativo — conteudo tecnico)
```

### 5.2 Plano de Conteudo SEO (futuro)

```yaml
pilar_1_glossario_tecnico:
  descricao: pagina com definicoes de termos de usinagem CNC
  url_sugerida: /glossario ou mestrecnc.com.br/glossario
  termos:
    - Velocidade de Corte (Vc)
    - Avanco por Dente (fz)
    - RPM (Rotacoes por Minuto)
    - Chip Thinning Factor (CTF)
    - Relacao L/D (comprimento/diametro)
    - Forca Especifica de Corte (kc1.1)
    - Modelo de Kienzle
    - Profundidade Axial (ap)
    - Largura Radial (ae)
    - MRR (Material Removal Rate)
  valor_seo: cada termo e uma keyword de cauda longa com volume de busca
  referencia_cruzada: linkar termos para a calculadora

pilar_2_tutoriais_praticos:
  descricao: artigos how-to em mestrecnc.com.br
  temas:
    - "Como calcular RPM para fresamento CNC — guia passo a passo"
    - "Relacao L/D: por que sua fresa esta vibrando"
    - "Chip Thinning: o ajuste que 90% dos fresadores ignoram"
    - "Kienzle explicado: como calcular potencia de corte real"
    - "Parametros de corte para aluminio 6061-T6 — guia completo"
    - "Parametros de corte para aco inox 304 — o que muda?"
    - "5 erros que quebram fresas de metal duro"
    - "Como reduzir custo de ferramental CNC"
  formato: 1000-2000 palavras, Schema HowTo, link para calculadora
  frequencia: 2 artigos/mes

pilar_3_calculadoras_especificas:
  descricao: landing pages focadas em calculo especifico
  urls_sugeridas:
    - /calculadora-rpm-cnc
    - /calculadora-avanco-fresa
    - /calculadora-potencia-corte
    - /tabela-velocidade-corte
  nota: requer implementacao de rotas estaticas ou landing page separada
  valor: cada URL captura keyword especifica com alta intencao
```

### 5.3 Estrategia de Link Building (organica)

```yaml
oportunidades:
  - mestrecnc.com.br -> tooloptimizercnc.com.br (link interno entre propriedades)
  - forums: usinagem.com.br, Reddit r/machining, r/CNC
  - YouTube: videos com link na descricao
  - LinkedIn: posts tecnicos com link
  - github.com (se repo publico): link no README

parcerias_potenciais:
  - SENAI: inclusao na lista de ferramentas recomendadas
  - distribuidores_ferramentas: recomendacao em treinamentos
  - canais_youtube_cnc_br: review/menção
```

---

## 6. CORE WEB VITALS E PERFORMANCE

```yaml
metricas_atuais:
  fonte: Cloudflare Web Analytics (dados reais em producao)
  dashboard: dash.cloudflare.com -> Analytics -> Web analytics -> tooloptimizercnc.com.br

  LCP:
    descricao: Largest Contentful Paint — tempo ate maior elemento visivel
    otimizacoes_aplicadas:
      - preconnect para Google Fonts
      - code splitting (lazy routes)
      - Cloudflare CDN global
      - bundle JS 99.20KB gzip (abaixo do limiar de 150KB)
    risco: Google Fonts externas podem impactar — considerar self-hosting futuro

  INP:
    descricao: Interaction to Next Paint (substitui FID desde marco 2024)
    otimizacoes_aplicadas:
      - interacoes simples (formularios + sliders)
      - sem computacao pesada no thread principal
      - calculos CNC sao rapidos (< 50ms)

  CLS:
    descricao: Cumulative Layout Shift — estabilidade visual
    otimizacoes_aplicadas:
      - fonts com display=swap (flash aceitavel, sem shift)
      - dimensoes fixas no layout (dashboard nao muda tamanho)
    risco_potencial: Material Symbols Outlined pode causar shift se carregamento lento

bundle_optimization:
  js_gzip: 99.20 KB — BOM (< 150KB recomendado)
  css_gzip: 14.35 KB — EXCELENTE
  total: ~113.55 KB — abaixo do limiar critico
  tree_shaking: ativo (Vite 6)
  minificacao: ativo (Vite 6)
  code_splitting: lazy loading para /admin/*, /settings, /history

cache:
  cloudflare_cdn: assets estaticos em cache global
  _headers: cache headers nao definidos explicitamente — usar Cloudflare Page Rules
  recomendacao: "Cache-Control: public, max-age=31536000, immutable" para assets com hash
```

---

## 7. DESAFIOS TECNICOS — SPA E INDEXACAO

```yaml
desafio_principal:
  descricao: React SPA — conteudo renderizado via JavaScript no browser
  impacto_google: BAIXO — Googlebot executa JS (renderizacao dinamica)
  impacto_outros: MEDIO — Bing, Yahoo, crawlers sociais podem nao executar JS
  impacto_velocidade: Googlebot agenda rendering JS em segunda onda (atraso na indexacao)

estrategia_atual:
  - meta tags + Schema.org no HTML estatico (index.html) — crawlers veem metadata mesmo sem JS
  - sitemap.xml com rotas principais
  - robots.txt permissivo

estrategias_futuras:
  opcao_1_landing_page_estatica:
    descricao: criar landing page de venda/conversao em HTML estatico ou SSG
    url: tooloptimizercnc.com.br (dominio principal)
    app: app.tooloptimizercnc.com.br (aplicacao SPA)
    beneficio: landing page 100% indexavel, app SPA nao precisa mudar
    complexidade: BAIXA — pagina separada
    prioridade: ALTA (Doc 10 - Landing Page Spec)

  opcao_2_prerender:
    descricao: prerender rotas principais com vite-plugin-ssr ou react-snap
    beneficio: HTML estatico gerado no build para crawlers
    complexidade: MEDIA
    prioridade: BAIXA (landing page separada resolve melhor)

  opcao_3_ssr:
    descricao: migrar para Next.js ou Remix
    beneficio: SSR nativo
    complexidade: ALTA — rewrite significativo
    prioridade: NAO RECOMENDADA (custo/beneficio desfavoravel para o estado atual)

  recomendacao: opcao_1 — landing page estatica separada em tooloptimizercnc.com.br
```

---

## 8. PLANO DE ACAO — PRIORIZADO

### 8.1 Acoes Imediatas (sem alteracao de codigo)

```yaml
A1_google_search_console:
  acao: registrar tooloptimizercnc.com.br no Google Search Console
  metodo: DNS TXT record via Cloudflare
  beneficio: monitorar indexacao, erros de rastreamento, keywords reais
  responsavel: Rafael
  prioridade: CRITICA

A2_bing_webmaster_tools:
  acao: registrar em Bing Webmaster Tools
  metodo: DNS ou meta tag
  beneficio: indexacao Bing + Yahoo
  responsavel: Rafael
  prioridade: MEDIA

A3_validar_og_image:
  acao: verificar se og-image.png existe em producao, dimensoes 1200x630px
  testar: Facebook Sharing Debugger + Twitter Card Validator
  prioridade: MEDIA
```

### 8.2 Acoes de Codigo (proximas sprints)

```yaml
C1_canonical_dominio:
  acao: alterar canonical de "app.tooloptimizercnc.com.br" para "tooloptimizercnc.com.br"
  arquivo: index.html (linha 37)
  tambem_alterar: og:url (linha 25), sitemap.xml (todas as loc)
  prioridade: ALTA
  dependencia: decidir qual dominio e principal (app. vs raiz)

C2_sitemap_atualizar:
  acao: atualizar lastmod para data atual, alinhar dominio com canonical
  arquivo: public/sitemap.xml
  prioridade: MEDIA

C3_remover_script_github_pages:
  acao: remover script SPA redirect (linhas 122-133 index.html) — obsoleto
  arquivo: index.html
  prioridade: BAIXA (planejado na Fase 5 Seguranca Cibernetica)

C4_schema_softwareversion:
  acao: adicionar softwareVersion "0.7.0" ao Schema SoftwareApplication
  arquivo: index.html
  prioridade: BAIXA

C5_faq_expandir:
  acao: adicionar 3-5 perguntas ao FAQPage schema (ver secao 2.2)
  arquivo: index.html
  prioridade: MEDIA (mais FAQ = mais chance de rich snippet)

C6_cache_headers:
  acao: adicionar Cache-Control para assets estaticos
  arquivo: public/_headers ou Cloudflare Page Rules
  prioridade: MEDIA
```

### 8.3 Acoes Estrategicas (medio prazo)

```yaml
E1_landing_page:
  acao: criar landing page estatica em tooloptimizercnc.com.br
  spec: 10-LANDING-PAGE-SPEC.md (Doc 10)
  beneficio: 100% indexavel, SEO on-page completo, funil de conversao
  prioridade: ALTA (pos Docs 5-9)

E2_blog_mestrecnc:
  acao: publicar artigos tecnicos em mestrecnc.com.br
  frequencia: 2/mes
  temas: ver secao 5.2 pilar_2
  prioridade: MEDIA

E3_glossario:
  acao: criar pagina de glossario CNC
  prioridade: MEDIA

E4_self_host_fonts:
  acao: baixar Google Fonts e servir localmente (eliminar dependencia externa)
  beneficio: LCP melhor + sem request externo
  prioridade: BAIXA
```

---

## 9. METRICAS DE SUCESSO SEO

```yaml
kpis_organicos:
  - impressoes_google: baseline a definir (Google Search Console)
  - cliques_organicos: baseline a definir
  - posicao_media: alvo top 10 para "calculadora parametros corte cnc" em 6 meses
  - ctr: > 5% (benchmark SaaS tools)

kpis_tecnicos:
  - lcp: < 2.5s (bom) | < 1.8s (excelente)
  - inp: < 200ms (bom) | < 100ms (excelente)
  - cls: < 0.1 (bom) | < 0.05 (excelente)
  - paginas_indexadas: 3+ (home, settings, history)

kpis_conteudo:
  - artigos_publicados: 2/mes (mestrecnc.com.br)
  - backlinks_organicos: baseline a definir
  - trafego_referral: mestrecnc -> tooloptimizer

ferramentas_monitoramento:
  - Google Search Console (CRITICO — registrar)
  - Cloudflare Web Analytics (ja ativo)
  - Bing Webmaster Tools (registrar)
  - Lighthouse (auditorias periodicas)
  - PageSpeed Insights (Core Web Vitals em campo)
```

---

## 10. REFERENCIAS

```yaml
docs_internos:
  produto: 01-VISAO-PRODUTO.md (UVP, diferenciais, estado v0.7.0)
  concorrentes: 02-ANALISE-COMPETITIVA.md (gaps, pricing)
  personas: 03-PERSONAS-E-JORNADA.md (gatilhos busca por persona)
  google_ads: 05-PLANO-GOOGLE-ADS.md (campanhas pagas — complemento ao organico)
  conteudo: 06-ESTRATEGIA-CONTEUDO.md (editorial mestrecnc)
  landing_page: 10-LANDING-PAGE-SPEC.md (implementacao da LP estatica)
  seguranca: docs/plans/PLAN_Seguranca_Cibernetica.md (Fase 2: CSP, Fase 5: cleanup scripts)

arquivos_projeto_relevantes:
  index_html: index.html (meta tags, Schema.org, scripts)
  robots: public/robots.txt
  sitemap: public/sitemap.xml
  headers: public/_headers (CSP, security headers)
  wrangler: wrangler.jsonc (SPA routing config)

docs_originais_consolidados:
  - "Pesquisa de SEO e Palavras-Chave - ToolOptimizer CNC.md"
  - "Investigacao de SEO e Estrategia de Anuncios_ ToolOptimizer CNC.md"
  - "Guia de Implementacao de SEO para ToolOptimizer CNC.md"
```

---

*v1.0 — 20/03/2026. Consolida 3 docs originais. Auditoria baseada em estado real do codigo v0.7.0 (index.html, robots.txt, sitemap.xml, _headers). Keywords mapeadas por persona (Doc 03). Acoes priorizadas com dependencias.*
