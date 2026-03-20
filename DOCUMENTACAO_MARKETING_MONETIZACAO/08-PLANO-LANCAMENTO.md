# 08 — Plano de Lancamento: ToolOptimizer CNC

> **Versao:** 1.0 | **Data:** 20/03/2026 | **Autor:** Rafael Eleoterio + Claude
> **Formato:** Otimizado para consumo por LLMs — dados estruturados, sem prosa, alta densidade
> **Depende de:** `01-VISAO-PRODUTO.md` (produto, diferenciais), `03-PERSONAS-E-JORNADA.md` (personas, gatilhos), `06-ESTRATEGIA-CONTEUDO.md` (canais, calendario), `07-MODELO-MONETIZACAO.md` (fases, pricing, trial)
> **Alimenta:** `09-METRICAS-E-KPIs.md`, `10-LANDING-PAGE-SPEC.md`, `11-MATERIAIS-MARKETING.md`

---

## 1. VISAO GERAL DO LANCAMENTO

```yaml
produto: ToolOptimizer CNC v0.7.0+
estado_atual: LIVE em tooloptimizercnc.com.br (sem divulgacao ativa)
objetivo_lancamento: transicao de "produto no ar" para "produto com usuarios reais"
modelo_lancamento: soft launch iterativo — sem "big bang"

principios:
  - barreira_zero: gratis, sem login, sem limitacao
  - feedback_antes_de_escala: validar com profissionais reais antes de investir em aquisicao
  - conteudo_primeiro: autoridade tecnica gera confianca antes de pedir adocao
  - comunidade_organica: boca a boca > anuncios pagos no inicio

timeline_resumo:
  fase_0_preparacao: 4-6 semanas (pre-lancamento)
  fase_1_soft_launch: 8-12 semanas (lancamento controlado)
  fase_2_crescimento: 12-24 semanas (escala organica + pago)
  fase_3_monetizacao: mes 13+ (freemium PRO — ref Doc 07 §1)
```

---

## 2. FASE 0 — PRE-LANCAMENTO (Semanas 1-6)

```yaml
objetivo: preparar todos os ativos antes de qualquer divulgacao publica

workstream_1_produto:
  prioridade: CRITICA
  itens:
    - landing_page:
        descricao: pagina de conversao em tooloptimizercnc.com.br (spec em Doc 10)
        conteudo_minimo: hero + diferenciais + CTA "usar agora" + FAQ
        prazo: semana 1-2
    - og_tags_validados:
        descricao: titulo, descricao, og-image funcionando ao colar link no WhatsApp/LinkedIn
        teste: colar URL no WhatsApp e verificar preview (titulo + imagem + descricao)
        prazo: semana 1
    - bug_fixes_criticos:
        descricao: resolver qualquer bug reportado no admin inbox antes de divulgar
        prazo: semana 1-2
    - seguranca:
        descricao: CSP headers + validacao imports + remover scripts inativos (ref PLAN_Seguranca)
        prazo: semana 2-3

workstream_2_conteudo:
  prioridade: ALTA
  itens:
    - mestrecnc_blog:
        descricao: 2-4 artigos fundacionais publicados antes do lancamento
        artigos_prioritarios:
          - "O que e velocidade de corte e como calcular RPM para fresamento CNC"
          - "Relacao L/D — por que sua fresa esta vibrando"
          - "5 erros que quebram fresas de metal duro"
        ref: Doc 06 §3.2 (mes 1)
        prazo: semana 2-4
    - canal_youtube:
        descricao: canal MestreCNC criado + 1-2 videos iniciais
        video_1: "RPM para fresamento CNC — como calcular em 2 segundos"
        ref: Doc 06 §6
        prazo: semana 3-5
    - perfil_linkedin:
        descricao: perfil Rafael otimizado (headline, banner, sobre com menção ToolOptimizer)
        prazo: semana 1

workstream_3_infraestrutura:
  prioridade: ALTA
  itens:
    - google_search_console:
        descricao: verificar tooloptimizercnc.com.br + mestrecnc.com.br
        prazo: semana 1
    - utm_tracking:
        descricao: definir padroes UTM para cada canal
        padrao: utm_source={canal}&utm_medium={tipo}&utm_campaign=lancamento
        canais: [mestrecnc, youtube, linkedin, whatsapp, google_ads, senai]
        prazo: semana 1
    - cloudflare_analytics:
        descricao: ja ativo — validar que rastreia pageviews corretamente
        prazo: semana 1

workstream_4_parcerias_iniciais:
  prioridade: MEDIA
  itens:
    - lista_contatos_senai:
        descricao: mapear 5-10 instrutores SENAI acessiveis (rede pessoal Rafael)
        acao: identificar contatos diretos ou via LinkedIn
        prazo: semana 3-4
    - lista_influenciadores_cnc:
        descricao: mapear 5-10 canais/perfis BR de usinagem (YouTube, LinkedIn, Instagram)
        criterio: >1000 seguidores, conteudo tecnico, ativo
        prazo: semana 3-4
    - fornecedores_ferramentas:
        descricao: identificar 2-3 distribuidores locais de ferramentas (Sandvik rep, distribuidor)
        acao: potenciais canais de indicacao
        prazo: semana 4-6

checklist_go_no_go:
  descricao: criterios para iniciar Fase 1
  obrigatorio:
    - landing_page_live: true
    - og_tags_funcionando: true
    - 0_bugs_criticos: true
    - 2_artigos_publicados: true
    - linkedin_otimizado: true
    - utm_tracking_configurado: true
  recomendado:
    - 1_video_youtube: true
    - google_search_console_ativo: true
    - 5_contatos_senai_mapeados: true
```

---

## 3. FASE 1 — SOFT LAUNCH (Semanas 7-18)

```yaml
objetivo: primeiros 100-500 usuarios reais + feedback qualitativo + ajustes

estrategia: lancamento em ondas — cada onda expande o publico progressivamente

onda_1_rede_pessoal:
  periodo: semana 7-8
  publico: contatos diretos de Rafael (colegas, ex-colegas, rede profissional)
  tamanho_estimado: 20-50 pessoas
  canais:
    - whatsapp_direto: mensagem pessoal para 10-20 profissionais CNC conhecidos
    - linkedin_dm: mensagem direta para 10-15 programadores/operadores da rede
  mensagem_tipo: >
    "Criei uma calculadora de parametros de corte CNC — gratis, em portugues,
    com semaforo de seguranca L/D. Estou buscando feedback de profissionais reais.
    Testa ai e me diz o que achou: tooloptimizercnc.com.br"
  objetivo: feedback qualitativo honesto de profissionais de confianca
  coleta_feedback:
    metodo: conversa direta (WhatsApp) + bug reports pelo botao no sistema
    perguntas_chave:
      - "O resultado bate com o que voce usaria na maquina?"
      - "Faltou algum material ou ferramenta?"
      - "O que ficou confuso ou dificil de usar?"
      - "Voce usaria no dia a dia?"
  meta: 10+ feedbacks qualitativos

onda_2_comunidade_expandida:
  periodo: semana 9-12
  publico: grupos WhatsApp de usinagem, forums, comunidades online
  tamanho_estimado: 100-300 alcance
  canais:
    - grupos_whatsapp:
        acao: compartilhar em 3-5 grupos de operadores/donos de oficina
        tom: util, nao promocional — "fiz essa ferramenta, o que acham?"
        cuidado: nao fazer spam — 1 mensagem por grupo, responder duvidas
    - usinagem_com_br:
        acao: postar na secao relevante do forum
        tom: apresentacao genuina + link
    - linkedin_posts:
        acao: iniciar cadencia de 3 posts/semana (ref Doc 06 §7)
        primeiro_post: storytelling "De 16 anos no chao de fabrica a uma calculadora CNC gratuita"
    - mestrecnc_blog:
        acao: artigos com CTA para ToolOptimizer (ref Doc 06 §5)
  meta: 50+ usuarios ativos (visitaram + fizeram simulacao)

onda_3_conteudo_escala:
  periodo: semana 13-18
  publico: trafego organico via SEO + YouTube + LinkedIn
  tamanho_estimado: 300-500 alcance
  canais:
    - youtube: 2 videos/mes — demonstracoes + conceitos tecnicos
    - blog_mestrecnc: 2 artigos/mes — SEO long-tail
    - linkedin: 3 posts/semana — cadencia completa
    - instagram_reels: 1-2/semana — recorte de YouTube
  acoes_especificas:
    - contato_senai:
        acao: enviar email/mensagem para 5-10 instrutores mapeados
        mensagem_tipo: >
          "Professor [nome], sou Rafael, fresador e programador CNC ha 16+ anos.
          Criei uma calculadora gratuita de parametros de corte em portugues,
          com formulas visiveis e semaforo de seguranca. Funciona no celular
          do aluno, sem login. Gostaria de apresentar para uso em sala de aula.
          tooloptimizercnc.com.br"
        material_apoio: guia rapido "Como usar o ToolOptimizer em aula" (1 pagina)
        meta: 2-3 professores testando em sala
    - contato_influenciadores:
        acao: enviar mensagem para 3-5 criadores de conteudo CNC BR
        oferta: demonstracao gratuita + conteudo exclusivo sobre o sistema
        meta: 1-2 mencoes organicas
  meta: 200+ usuarios ativos mensais (MAU)

feedback_loop_fase_1:
  coleta:
    - bug_report_button: ja implementado no sistema (v0.5.0)
    - admin_inbox: monitorar semanalmente
    - whatsapp_direto: respostas dos contatos pessoais
    - cloudflare_analytics: pageviews, visitas, paises
  acoes:
    - bug_critico: fix em 24-48h + deploy
    - feature_request_recorrente: adicionar ao backlog + priorizar
    - material_faltando: adicionar ao banco de materiais (P2/P4 pedem muito isso)
    - feedback_positivo: pedir depoimento para uso na landing page
  cadencia_revisao: semanal
```

---

## 4. FASE 2 — CRESCIMENTO (Semanas 19-48)

```yaml
objetivo: escalar de 500 para 2.000+ MAU com mix organico + pago

prerequisitos:
  - 200_mau_atingido: validacao de que o produto resolve o problema
  - 10_feedbacks_positivos: prova social para landing page
  - conteudo_ativo: blog + YouTube + LinkedIn em cadencia regular
  - google_ads_configurado: ref Doc 05

canais_organicos:
  seo:
    descricao: artigos mestrecnc.com.br ranqueando para keywords long-tail
    ref: Doc 04 §3 (keywords), Doc 06 §5 (blog strategy)
    meta: top 10 Google para 5+ keywords em 6 meses
    keywords_prioritarias:
      - "calculadora parametros corte cnc"
      - "como calcular rpm fresamento"
      - "velocidade de corte tabela"
      - "chip thinning calculator"
      - "relacao L/D fresa vibracao"

  youtube:
    descricao: canal MestreCNC com videos tecnicos
    ref: Doc 06 §6
    meta: 10+ videos publicados, 1000+ views total em 6 meses
    formato: tela gravada + voz (producao minima)

  linkedin:
    descricao: perfil Rafael como autoridade tecnica
    ref: Doc 06 §7
    meta: 500+ conexoes no nicho, 3+ posts/semana
    conteudo: insights tecnicos + bastidores + dicas rapidas

  boca_a_boca:
    descricao: motor principal de aquisicao para P1 (operador)
    facilitadores:
      - url_simples: tooloptimizercnc.com.br
      - og_preview_atraente: preview bonito ao colar no WhatsApp
      - resultado_compartilhavel: screenshot limpo do resultado
    meta: cada usuario satisfeito traz 2-3 novos (ref Doc 03 §5 insight_3)

canais_pagos:
  google_ads:
    descricao: campanhas Search para keywords de alta intencao
    ref: Doc 05 (plano completo)
    orcamento_inicial: R$15-25/dia
    inicio: apos validacao organica (semana 19-24)
    grupos:
      - G1_calculadora: "calculadora cnc", "calcular rpm fresa"
      - G2_problema: "fresa quebrando", "vibracao fresa cnc"
      - G3_parametros: "parametros de corte", "tabela velocidade corte"
    meta: CPC < R$1,50, conversao (simulacao) > 15%
    otimizacao: testar por 4 semanas, pausar grupos com CPA > R$5

  linkedin_ads:
    descricao: OPCIONAL — teste pequeno para P2 (programadores CAM)
    orcamento: R$300-500 total (teste)
    formato: post patrocinado com demonstracao
    segmentacao: cargo "programador CNC/CAM", industria "manufatura", Brasil
    decisao: so investir se organico LinkedIn mostrar engajamento > 3%

parcerias_fase_2:
  senai_institucional:
    objetivo: 3-5 escolas usando ToolOptimizer em sala de aula
    abordagem: bottom-up (professor adota → escola institucionaliza)
    acoes:
      - webinar_para_professores:
          descricao: apresentacao online de 30 min "ToolOptimizer para educacao CNC"
          formato: demonstracao ao vivo + Q&A
          publico: 10-20 professores SENAI/ETEC
          frequencia: 1x por trimestre
          meta: 5+ professores adotam apos webinar
      - material_didatico:
          descricao: guia PDF "Como usar ToolOptimizer em aula de parametros de corte"
          conteudo: passo a passo, exercicios sugeridos, relacao com curriculo
          distribuicao: email direto + download no site
      - cupom_institucional:
          descricao: 50% no plano institucional futuro (ref Doc 07 §3)
          preco_efetivo: R$249,90/ano (30 alunos)
          prazo: valido para primeiras 10 escolas
    escala: 1 professor = 30-120 alunos/ano → efeito cascata
    meta_ano_1: 5 escolas adotando, 300+ alunos expostos

  influenciadores_cnc_br:
    objetivo: mencoes organicas em canais de usinagem
    abordagem:
      - identificar: 10 criadores BR com >1000 seguidores em usinagem/CNC
      - contato: mensagem personalizada oferecendo demonstracao + conteudo
      - oferta: nao pagar — oferecer valor (demonstracao exclusiva, collab, entrevista)
      - formato: video collab, menção em post, review espontaneo
    canais_alvo:
      - youtube_br_usinagem: canais de instrutores independentes, SENAI regionais
      - linkedin_br_industria: engenheiros, programadores CAM, supervisores
      - instagram_br_makers: perfis de ferramentaria, torneiros, fresadores
    meta: 3-5 mencoes organicas em 6 meses

  distribuidores_ferramentas:
    objetivo: indicacao indireta por vendedores de ferramentas
    abordagem:
      - contato: 2-3 distribuidores locais (Sandvik rep, Walter rep, distribuidor generico)
      - pitch: "ferramenta gratuita que ajuda seus clientes a usar as fresas corretamente — menos devoluções, mais satisfacao"
      - material: flyer digital 1 pagina com QR code
    meta: 1-2 distribuidores mencionando para clientes

eventos:
  tipo: feiras e eventos do setor metalmecanico
  eventos_alvo:
    - EXPOMAFE: maior feira de maquinas-ferramenta da America Latina (Sao Paulo, bienal)
    - FEIMEC: feira internacional de mecanica (Sao Paulo)
    - INTERMACH: feira de maquinas e equipamentos (Joinville)
    - eventos_SENAI_regionais: encontros pedagogicos, semanas tecnologicas
  participacao: visitante com material de divulgacao (nao expositor — custo alto)
  material: cartoes com QR code + flyer digital
  objetivo: networking + distribuir QR codes para profissionais

metas_fase_2:
  mau: 2.000+ usuarios ativos mensais
  simulacoes_mes: 5.000-15.000
  depoimentos: 10+ feedbacks positivos coletados
  escolas_senai: 3-5 usando em aula
  artigos_blog: 12+ publicados
  videos_youtube: 8+ publicados
  google_top_10: 5+ keywords
```

---

## 5. FASE 3 — MONETIZACAO (Mes 13+)

```yaml
descricao: ativacao do modelo freemium PRO (detalhado em Doc 07)
prerequisito: base minima 1.000 MAU com login

pre_monetizacao:
  mes_7_12:
    acao: introduzir login opcional (Google OAuth)
    objetivo: construir base de emails + historico nuvem
    meta: 15-25% dos MAU com cadastro
    ref: Doc 07 §1 fase_2_retencao

lancamento_pro:
  modelo: trial 14 dias + planos pagos (ref Doc 07 §3)
  planos:
    mensal: R$19,90/mes
    anual: R$149,90/ano (destaque)
    vitalicio: R$349,90
    institucional: R$499,90/ano (30 usuarios)
  desconto_early_adopter:
    nome: "Fundador PRO"
    desconto: 40%
    limite: 100 primeiros assinantes
    ref: Doc 07 §3 estrategia_lancamento

comunicacao_lancamento_pro:
  email:
    lista: usuarios cadastrados (login Google/email)
    sequencia:
      - email_1_anuncio: "ToolOptimizer PRO chegou — 14 dias gratis"
      - email_2_features: "O que tem no PRO: historico nuvem, export PDF, 50+ materiais"
      - email_3_urgencia: "Desconto Fundador PRO (40%) — so para os 100 primeiros"
      - email_4_lembrete: "Seu trial termina em 3 dias — garanta o desconto"
  linkedin: post de lancamento PRO + carrossel de features
  youtube: video "O que tem no ToolOptimizer PRO (e por que criamos)"
  blog: artigo detalhado comparando Free vs PRO

meta_monetizacao:
  conversao_trial_pro: 5-10%
  metas_receita: ref Doc 07 §5 (3 cenarios)
```

---

## 6. ESTRATEGIA DE BETA TESTERS

```yaml
objetivo: grupo seleto de profissionais que testam features novas antes do publico

programa_beta:
  nome: "Beta Testers ToolOptimizer"
  tamanho: 20-50 profissionais
  composicao:
    operadores_cnc: 8-15 (P1 — uso diario real)
    programadores_cam: 5-10 (P2 — validacao tecnica)
    professores_senai: 3-5 (P3 — uso educativo)
    donos_oficina: 3-5 (P4 — implementacao equipe)
  recrutamento:
    fonte_1: contatos diretos Rafael (onda 1 do soft launch)
    fonte_2: usuarios que enviaram feedback positivo
    fonte_3: professores SENAI que adotaram em aula
    fonte_4: respondentes de enquetes LinkedIn

beneficios_beta_tester:
  - acesso_antecipado: features novas 2-4 semanas antes
  - badge_beta: visual no sistema (futuro com login)
  - canal_direto: grupo WhatsApp exclusivo com Rafael
  - pro_gratis: quando PRO lancar, beta testers ganham 6 meses gratis
  - credito: nome no changelog como beta tester (opcional)

obrigacoes_beta_tester:
  - testar_feature_nova: quando solicitado (1-2x por mes)
  - reportar_bugs: via botao no sistema ou WhatsApp
  - responder_pesquisa: 1 pesquisa curta por trimestre (5 perguntas)
  - prazo_feedback: 7 dias apos liberacao de feature

canal_comunicacao:
  principal: grupo WhatsApp (familiar, baixa friccao)
  backup: email (para pesquisas formais)
  frequencia: 1-2 mensagens/mes (nao saturar)

coleta_dados:
  qualitativo: conversas WhatsApp, bug reports, sugestoes
  quantitativo: pesquisa trimestral (Google Forms — 5 perguntas)
  perguntas_padrao:
    - "Nota de 0-10: quao util e o ToolOptimizer no seu dia a dia?"
    - "Qual feature voce mais usa?"
    - "O que esta faltando?"
    - "Voce recomendaria para um colega? (NPS)"
    - "Quanto pagaria por mes por features extras?" (pre-monetizacao)
```

---

## 7. PARCERIAS SENAI — PLANO DETALHADO

```yaml
contexto:
  senai_brasil: 500+ unidades em todos os estados
  cursos_relevantes: tecnico mecanica, usinagem CNC, CAD/CAM, automacao industrial
  turmas_por_unidade: 2-6 turmas/ano em cursos com usinagem
  alunos_por_turma: 15-30
  potencial_por_unidade: 60-180 alunos/ano expostos ao ToolOptimizer

estrategia: bottom-up (professor adota individualmente → escola institucionaliza)

fase_1_professor_individual:
  periodo: meses 1-6
  objetivo: 5-10 professores usando em aula por iniciativa propria
  abordagem:
    - identificar_contatos: LinkedIn, grupos WhatsApp professores, rede pessoal
    - mensagem_personalizada: demonstrar valor educativo (formulas visiveis, gratuito, sem login)
    - material_apoio: guia "Como usar o ToolOptimizer em aula" (PDF 2-3 paginas)
    - suporte_direto: WhatsApp/email para duvidas
  argumento_professor:
    - "Formulas com valores reais substituidos — o aluno ve o calculo acontecer"
    - "Funciona no celular do aluno — sem precisar de laboratorio"
    - "100% gratuito, sem login, sem limitacao"
    - "Semaforo L/D ensina o que o catalogo nunca explicou"
    - "Criado por quem trabalhou 16 anos no chao de fabrica"
  meta: 5 professores usando ativamente

fase_2_validacao_educativa:
  periodo: meses 6-12
  objetivo: evidencia de que o ToolOptimizer melhora o ensino
  acoes:
    - coleta_depoimentos: pedir relato escrito dos professores que adotaram
    - pesquisa_alunos: questionario simples (Google Forms) — "o ToolOptimizer ajudou a entender parametros?"
    - case_study: montar 1-2 estudos de caso "Professor X usou em Y turmas, resultado Z"
    - apresentacao_coordenacao: professor beta tester apresenta para coordenador do curso
  meta: 2-3 depoimentos formais + 1 case study

fase_3_institucional:
  periodo: meses 12-18
  objetivo: parceria formal com 2-3 unidades SENAI
  abordagem:
    - contato_formal: email/carta para coordenacao pedagogica com case study
    - proposta: ferramenta didatica gratuita (ou licenca institucional a R$249,90/ano com cupom 50%)
    - diferencial_vs_concorrente: "gratis, PT-BR, sem internet — nenhuma alternativa oferece isso"
    - apresentacao: webinar ou visita presencial na unidade
  beneficios_para_senai:
    - custo_zero: versao gratuita completa, sem necessidade de comprar licenca
    - alinhamento_curriculo: formulas ISO + Kienzle cobertas no curriculo tecnico
    - engajamento_aluno: interface moderna + interativa > catalogo PDF
    - offline: funciona no laboratorio sem internet
  meta: 2-3 unidades com adocao formal

fase_4_rede_nacional:
  periodo: meses 18-36
  objetivo: presenca na rede SENAI como ferramenta recomendada
  acoes:
    - case_studies_multiplos: 3-5 unidades com resultados documentados
    - contato_departamento_nacional: SENAI-DN com proposta de ferramenta educativa
    - evento_pedagogico: apresentacao em encontro nacional/regional de instrutores
    - material_curricular: suggestao de atividades com ToolOptimizer para grades curriculares
  meta_aspiracional: reconhecimento como ferramenta educativa na rede SENAI
  nota: fase ambiciosa — depende de resultados das fases anteriores

escolas_tecnicas_estaduais:
  etec_sp: Centro Paula Souza (224 ETECs em SP)
  ifsp_ifsc_etc: Institutos Federais com cursos de mecanica
  abordagem: mesma estrategia bottom-up — professor primeiro
```

---

## 8. INFLUENCIADORES E CANAIS BR

```yaml
mapeamento_canais_youtube:
  criterio: >1000 inscritos, conteudo em PT-BR, topico usinagem/CNC/mecanica
  categorias:
    instrutores_independentes:
      descricao: profissionais que ensinam usinagem no YouTube
      abordagem: collab ou review do ToolOptimizer
      potencial: audiencia qualificada e engajada
    canais_senai_regionais:
      descricao: SENAI SP, SC, PR, MG tem canais com aulas
      abordagem: sugerir uso do ToolOptimizer em aulas gravadas
    canais_makers_ferramentaria:
      descricao: canais de torneiros, fresadores, donos de oficina que mostram trabalho
      abordagem: oferecer demonstracao + usar no video
    canais_engenharia_mecanica:
      descricao: conteudo tecnico de engenharia com foco em manufatura
      abordagem: post tecnico sobre o sistema

mapeamento_linkedin:
  criterio: >500 conexoes, publica sobre usinagem/CNC/manufatura, perfil BR
  categorias:
    programadores_cam: publicam sobre estrategias de usinagem, softwares CAM
    engenheiros_processo: publicam sobre otimizacao, custos, qualidade
    gerentes_producao: publicam sobre gestao de chao de fabrica
    vendedores_ferramentas: Sandvik reps, Walter reps, distribuidores — rede grande

abordagem_contato:
  principio: valor primeiro — nunca pedir promocao direta
  template_mensagem:
    youtube: >
      "[Nome], acompanho seu canal e admiro o conteudo sobre [topico].
      Sou fresador/programador CNC ha 16 anos e criei uma calculadora gratuita
      de parametros de corte em portugues, com semaforo de seguranca L/D.
      Acho que seu publico ia curtir conhecer. Posso te mandar um acesso
      para voce testar? tooloptimizercnc.com.br"
    linkedin: >
      "[Nome], vi seu post sobre [topico] e achei muito relevante.
      Trabalhei 16 anos no chao de fabrica e criei o ToolOptimizer CNC —
      calculadora gratuita com semaforo L/D e formulas educativas.
      Sem compromisso: tooloptimizercnc.com.br"

  formatos_collab:
    - menção_espontanea: influenciador testa e menciona por conta propria
    - video_review: review dedicado no canal (mais raro sem pagamento)
    - live_conjunta: live no YouTube/LinkedIn demonstrando o sistema
    - post_convidado: Rafael escreve artigo para blog/canal do influenciador
    - entrevista: influenciador entrevista Rafael sobre a historia do projeto
```

---

## 9. GRUPOS WHATSAPP E COMUNIDADES

```yaml
principio: facilitar compartilhamento organico — NAO criar grupos proprios (ainda)

grupos_existentes:
  operadores_cnc:
    descricao: grupos informais de 10-50 operadores
    como_acessar: Rafael ja participa de alguns + pedir indicacao
    acao: compartilhar 1 vez com contexto genuino, responder duvidas
    mensagem_tipo: >
      "Pessoal, fiz uma calculadora de parametros de corte CNC — gratis,
      em portugues, funciona offline. Calcula RPM, avanco, potencia com
      semaforo de seguranca. Quem quiser testar: tooloptimizercnc.com.br
      Feedback e bem-vindo!"
    regra: 1 mensagem por grupo, NUNCA repetir, responder todas as duvidas

  donos_oficina:
    descricao: grupos de sindicatos regionais, associacoes
    como_acessar: rede de contatos de industria
    acao: focar no ROI — "reduz quebra de fresa"
    mensagem_tipo: foco em custo de ferramental + padronizacao

  professores_senai:
    descricao: grupos pedagogicos por regional
    como_acessar: via contatos de instrutores ja mapeados
    acao: focar no valor educativo — "funciona no celular do aluno"

forum_usinagem_com_br:
  descricao: principal forum brasileiro de usinagem
  acao: criar topico de apresentacao + responder duvidas com links
  tom: profissional, genuino, sem hype

reddit:
  subreddits: [r/machining, r/CNC, r/Machinists]
  idioma: ingles
  acao: responder perguntas sobre feeds/speeds com mencao casual
  cuidado: Reddit penaliza auto-promocao — ser util primeiro
  frequencia: quando surgir pergunta relevante
```

---

## 10. CRONOGRAMA CONSOLIDADO

```yaml
semana_1_2:
  - landing page live
  - og tags validados
  - LinkedIn Rafael otimizado
  - UTM tracking configurado
  - Google Search Console ativo
  - bug fixes criticos

semana_3_4:
  - 2 artigos blog publicados
  - canal YouTube criado
  - seguranca (CSP headers, validacao imports)
  - lista contatos SENAI mapeada
  - lista influenciadores mapeada

semana_5_6:
  - 1-2 videos YouTube publicados
  - 3-4 artigos blog total
  - go/no-go checklist validado
  - material "Como usar em aula" PDF pronto

semana_7_8:
  - LANCAMENTO — onda 1 (rede pessoal)
  - 20-50 contatos diretos
  - coleta de feedback qualitativo
  - LinkedIn posts iniciam cadencia

semana_9_12:
  - onda 2 (comunidades online)
  - grupos WhatsApp + forum usinagem
  - LinkedIn 3 posts/semana
  - YouTube 2 videos/mes
  - meta: 50+ MAU

semana_13_18:
  - onda 3 (conteudo em escala)
  - contato SENAI (5-10 professores)
  - contato influenciadores (3-5)
  - Google Ads teste (R$15-25/dia)
  - meta: 200+ MAU

semana_19_30:
  - crescimento organico + pago
  - parcerias SENAI avancando
  - 12+ artigos blog, 8+ videos
  - meta: 500+ MAU

semana_31_48:
  - escala para 2.000+ MAU
  - login opcional (Google OAuth)
  - coleta base de emails
  - preparacao para monetizacao

mes_13_plus:
  - lancamento PRO (freemium)
  - trial 14 dias
  - desconto Fundador 40%
  - plano institucional SENAI
```

---

## 11. ORCAMENTO ESTIMADO

```yaml
fase_0_pre_lancamento:
  custo_total: R$0
  detalhes:
    - dominio_tooloptimizercnc: ja pago
    - dominio_mestrecnc: ja pago
    - cloudflare: free tier
    - OBS_studio: gratis
    - canva_thumbnails: free tier
    - tempo_rafael: investimento proprio

fase_1_soft_launch:
  custo_total: ~R$0
  detalhes:
    - tudo organico (WhatsApp, LinkedIn, forums)
    - producao conteudo: tempo Rafael

fase_2_crescimento:
  custo_mensal: R$450-750
  detalhes:
    google_ads: R$450-750/mes (R$15-25/dia)
    ferramentas:
      - microfone_basico: R$150-300 (investimento unico — melhora audio YouTube)
      - canva_pro: R$35/mes (opcional — templates de carrossel)
    linkedin_ads: R$300-500 total (teste unico, opcional)
  custo_6_meses: R$3.000-5.000

fase_3_monetizacao:
  custos_adicionais:
    - stripe: 4% sobre receita (variavel)
    - firebase: free tier (ate 50k MAU)
    - email_transacional: Resend free tier (3k emails/mes)
  investimento: autofinanciado pela receita PRO

total_primeiro_ano: ~R$3.000-5.000
  nota: >
    extremamente baixo para lancamento de SaaS. Possivel porque: hosting free (Cloudflare),
    producao de conteudo propria (Rafael), marketing organico prioritario,
    Google Ads so apos validacao organica.
```

---

## 12. RISCOS E MITIGACOES DO LANCAMENTO

```yaml
risco_1_ninguem_usa:
  probabilidade: MEDIA
  impacto: ALTO
  causa: produto novo, sem brand awareness, nicho conservador
  mitigacao:
    - barreira_zero: gratis, sem login — elimina qualquer objecao de adocao
    - boca_a_boca: P1 mostra para 2-5 colegas se funcionar (ref Doc 03 §5)
    - conteudo_util: artigos e videos geram trafego independente do produto
    - pivote: se web nao pegar, focar em desktop (.exe) para distribuicao offline

risco_2_feedback_negativo:
  probabilidade: BAIXA-MEDIA
  impacto: MEDIO
  causa: resultados imprecisos, materiais faltando, UX confusa
  mitigacao:
    - beta_testers: validar com profissionais antes de escalar
    - 824_testes: base tecnica solida — calculos validados
    - iteracao_rapida: deploy automatico — fix em horas, nao semanas
    - expectativa_clara: "v0.7 — fresamento com fresas de metal duro (mais ferramentas em breve)"

risco_3_senai_nao_responde:
  probabilidade: MEDIA
  impacto: MEDIO (perde canal multiplicador, mas nao bloqueia)
  mitigacao:
    - abordagem_bottom_up: professor individual, nao burocracia institucional
    - alternativas: ETECs, IFs, cursos particulares de CNC
    - conteudo_educativo: mesmo sem parceria formal, professores podem usar (gratis, sem login)

risco_4_google_ads_caro:
  probabilidade: MEDIA
  impacto: BAIXO (Google Ads e complemento, nao dependencia)
  mitigacao:
    - so_iniciar_apos_validacao: primeiro organico funciona, depois escala com ads
    - orcamento_limitado: R$15-25/dia — pausar se CPA > R$5
    - keywords_long_tail: menor CPC que keywords genericas (ref Doc 05)
    - foco_organico: SEO + conteudo sao investimento de longo prazo com custo zero

risco_5_cultura_nao_calcula:
  probabilidade: ALTA
  impacto: MEDIO
  causa: "sempre fiz assim" — maioria dos operadores nao calcula parametros
  mitigacao:
    - focar_em_dor: conteudo focado em "quebra de fresa" e "custo", nao "faca calculos"
    - p4_como_driver: dono de oficina implementa para equipe (adocao forcada)
    - p3_como_multiplicador: professor ensina desde a formacao
    - simplicidade: 3 selecoes + 1 botao = resultado (menor friccao possivel)
```

---

## 13. METRICAS DE SUCESSO POR FASE

```yaml
fase_0_pre_lancamento:
  landing_page_live: boolean
  artigos_publicados: >= 2
  canal_youtube_criado: boolean
  linkedin_otimizado: boolean

fase_1_soft_launch:
  feedbacks_qualitativos: >= 10
  mau: >= 50
  bugs_criticos: 0
  nps_informal: >= 7 (de 0-10)
  depoimentos_coletados: >= 3

fase_2_crescimento:
  mau: >= 2.000
  simulacoes_mes: >= 5.000
  escolas_senai: >= 3
  artigos_blog: >= 12
  videos_youtube: >= 8
  google_top_10: >= 5 keywords
  cac_google_ads: < R$5
  depoimentos: >= 10

fase_3_monetizacao:
  usuarios_com_login: >= 400 (20% MAU)
  conversao_trial_pro: >= 5%
  mrr: ref Doc 07 §5 cenarios
  churn_mensal: < 8%
  nps: >= 40

meta_norte_star:
  metrica: simulacoes por mes
  motivo: >
    cada simulacao = um profissional confiando no ToolOptimizer para definir
    parametros antes de ligar a maquina. E a medida mais direta de valor entregue.
  alvo_ano_1: 10.000 simulacoes/mes
  alvo_ano_2: 50.000 simulacoes/mes
```

---

## 14. REFERENCIAS

```yaml
docs_internos:
  produto: 01-VISAO-PRODUTO.md (diferenciais §3, features §4, canais §7, visao §9)
  concorrentes: 02-ANALISE-COMPETITIVA.md (SWOT §4, gaps §5, pricing §6)
  personas: 03-PERSONAS-E-JORNADA.md (P1-P4, gatilhos §2, funil AARRR §4, insights §5)
  seo: 04-ESTRATEGIA-SEO.md (keywords §3, conteudo §5)
  google_ads: 05-PLANO-GOOGLE-ADS.md (campanhas, orcamento, grupos)
  conteudo: 06-ESTRATEGIA-CONTEUDO.md (pilares §2, calendario §3, canais §5-9)
  monetizacao: 07-MODELO-MONETIZACAO.md (fases §1, pricing §3, trial §3, projecoes §5)
  metricas: 09-METRICAS-E-KPIs.md (AARRR, dashboards)
  landing_page: 10-LANDING-PAGE-SPEC.md (destino dos CTAs)
  materiais: 11-MATERIAIS-MARKETING.md (templates de mensagem)

dados_produto:
  url: tooloptimizercnc.com.br
  estado: v0.7.0 | 824 testes | deploy LIVE | Cloudflare Web Analytics ativo
  admin: /admin (bugs, tarefas, erros, usage, analytics, flags, changelog, health)
  mestrecnc: mestrecnc.com.br (canal de conteudo)

dados_mercado:
  operadores_cnc_br: 300-500k (CAGED, STIMMMEMS)
  unidades_senai: 500+ (SENAI Nacional)
  custo_ferramental_oficina: R$15.000-50.000/ano
  salario_medio_operador: R$3.089/mes
```

---

*v1.0 — 20/03/2026. Plano de lancamento completo: 4 fases (preparacao/soft launch/crescimento/monetizacao), estrategia de beta testers, parcerias SENAI detalhadas (4 fases bottom-up), influenciadores BR, cronograma 48 semanas, orcamento ~R$3-5k/ano, riscos e metricas. Baseado em dados reais de Docs 01-07.*
