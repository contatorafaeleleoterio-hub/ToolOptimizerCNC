# 07 — Modelo de Monetizacao: ToolOptimizer CNC

> **Versao:** 1.0 | **Data:** 20/03/2026 | **Autor:** Rafael Eleoterio + Claude
> **Formato:** Otimizado para consumo por LLMs — dados estruturados, sem prosa, alta densidade
> **Depende de:** `01-VISAO-PRODUTO.md` (produto, features), `02-ANALISE-COMPETITIVA.md` (pricing concorrentes), `03-PERSONAS-E-JORNADA.md` (willingness to pay)
> **Alimenta:** `08-PLANO-LANCAMENTO.md`, `09-METRICAS-E-KPIs.md`, `10-LANDING-PAGE-SPEC.md`

---

## 1. ESTRATEGIA DE MONETIZACAO

```yaml
modelo: freemium
principio: "gratis completo primeiro, PRO depois — nunca castrar o produto base"

fases:
  fase_1_validacao:
    periodo: lancamento ate 6 meses
    modelo: 100% gratuito, sem login, sem limitacao
    objetivo: adocao massiva + feedback real + SEO organico
    metricas_alvo:
      usuarios_ativos_mes: 500-2.000
      simulacoes_mes: 5.000-20.000
      feedback_coletado: 50+ reports
    racional: barreira zero e prerequisito — P1 e P3 nao pagam, P4 exige ROI comprovado antes

  fase_2_retencao:
    periodo: 6 a 12 meses pos-lancamento
    modelo: login opcional (Google OAuth / email)
    features_login:
      - historico salvo na nuvem (sync entre dispositivos)
      - preferencias persistentes (materiais, limites de maquina)
      - badge "usuario verificado" no historico
    objetivo: construir base de emails + entender padroes de uso + preparar paywall
    metricas_alvo:
      taxa_cadastro: 15-25% dos usuarios ativos
      retencao_30d: 40-60%

  fase_3_monetizacao:
    periodo: 12+ meses pos-lancamento
    modelo: freemium com plano PRO
    prerequisito: base minima de 1.000 usuarios ativos mensais com login
    racional: so monetizar quando houver prova de valor + base engajada
```

---

## 2. DIVISAO FREE vs PRO

```yaml
tier_free:
  nome: "ToolOptimizer Free"
  preco: R$0
  login: opcional (para historico na nuvem)
  features:
    calculo:
      - RPM, Avanco, Potencia, Torque, MRR
      - Chip Thinning Factor (CTF) automatico
      - Safety factor configuravel
    validacao:
      - Semaforo L/D completo (verde/amarelo/vermelho/bloqueado)
      - Validacao de inputs com ranges seguros
    interface:
      - Sliders de ajuste fino (Vc, fz, ae, ap)
      - 4 ParameterHealthBars
      - 3 Gauges (Feed Headroom, MRR, Tool Health)
      - Animacoes de simulacao
    dados:
      - 9 materiais pre-cadastrados
      - 3 tipos de fresa (Topo Reto, Toroidal, Esferica)
      - 6 diametros padrao
      - 3 operacoes (Desbaste, Semi-acabamento, Acabamento)
    configuracao:
      - Limites de maquina personalizaveis
      - Materiais: adicionar/editar/excluir
    educacao:
      - Formulas com valores reais substituidos
      - Tooltips explicativos
    historico:
      - Historico local (localStorage) — 50 ultimas simulacoes
    exportacao:
      - Export JSON (historico completo)
    acesso:
      - Web ilimitado
      - Offline (desktop .exe)
  racional: >
    versao free DEVE ser completa o suficiente para resolver o problema principal
    (calcular parametros seguros em 2 segundos). Features PRO sao conveniencia
    e produtividade, nao funcionalidade basica castrada.

tier_pro:
  nome: "ToolOptimizer PRO"
  features_exclusivas:
    historico_nuvem:
      descricao: historico sincronizado entre dispositivos (ilimitado)
      valor_percebido: ALTO para P2 (programador CAM com 2+ dispositivos)
    export_avancado:
      descricao: export CSV formatado + relatorio PDF com logo da empresa
      valor_percebido: ALTO para P4 (dono oficina — relatorio para cliente/diretoria)
    materiais_expandidos:
      descricao: banco de dados expandido com 50+ materiais pre-cadastrados
      inclui: [titanio Ti6Al4V, Inconel 718, D2, A2, S7, cobre, latao, nylon, PEEK, compositos]
      valor_percebido: MEDIO para P2 (materiais especiais)
    perfis_maquina:
      descricao: salvar multiplos perfis de maquina (limites RPM, potencia, torque)
      limite_free: 1 perfil
      limite_pro: ilimitado
      valor_percebido: ALTO para P4 (oficina com 2-5 maquinas diferentes)
    comparador:
      descricao: comparar 2-3 simulacoes lado a lado
      valor_percebido: MEDIO para P2 (otimizar estrategia de corte)
    suporte_prioritario:
      descricao: resposta em 24h via email
      valor_percebido: BAIXO (nice-to-have)
    badge_pro:
      descricao: badge visual "PRO" no historico e interface
      valor_percebido: BAIXO (status)

  features_NAO_incluidas_no_pro:
    - calculo basico (RPM, F, Potencia) — permanece FREE
    - semaforo L/D — permanece FREE
    - CTF — permanece FREE
    - ajuste fino (sliders) — permanece FREE
    - health bars e gauges — permanece FREE
    - materiais customizados (adicionar/editar) — permanece FREE
    - offline (.exe) — permanece FREE
    - formulas educativas — permanece FREE
  racional_nao_castrar: >
    castrar calculo basico ou seguranca (L/D) destruiria a proposta de valor
    e afastaria P1 (operador) e P3 (professor). A versao free deve ser util
    o suficiente para gerar evangelizacao (boca a boca).
```

---

## 3. PRECIFICACAO

```yaml
premissas:
  mercado: Brasil
  moeda: BRL (R$)
  publico_alvo_primario_pagante: P2 (programador CAM) + P4 (dono oficina)
  salario_medio_operador: R$3.089/mes
  salario_medio_programador: R$4.000-R$8.000/mes
  renda_media_dono_oficina: R$8.000-R$25.000/mes
  custo_ferramental_anual_oficina: R$15.000-R$50.000/ano
  referencia_concorrentes_brl:
    g_wizard: R$1.188 (lifetime) | ~R$440/ano
    hsmadvisor: R$825-R$1.375 (permanente)
    fswizard_pro: R$275 (lifetime)
    machining_doctor: R$132/ano
    cnc_calc_ultra: R$110/ano

planos:
  mensal:
    nome: "PRO Mensal"
    preco: R$19,90/mes
    publico: quem quer testar antes de comprometer
    percentual_salario_operador: 0.6%
    percentual_salario_programador: 0.3-0.5%
    posicionamento: "menos que um cafe por dia"

  anual:
    nome: "PRO Anual"
    preco: R$149,90/ano
    preco_mensal_equivalente: R$12,49/mes
    desconto_vs_mensal: 37%
    publico: usuario recorrente que validou o valor
    posicionamento: "melhor custo-beneficio — custa menos que 1 fresa de metal duro"
    destaque: true  # plano recomendado na UI

  vitalicio:
    nome: "PRO Vitalicio"
    preco: R$349,90 (pagamento unico)
    equivalente_anual: ~2.3 anos do plano anual
    publico: maquinista "raiz" que detesta assinatura + dono de oficina que quer investir uma vez
    posicionamento: "pague uma vez, use para sempre"
    racional: FSWizard Pro ($50/~R$275) valida demanda por compra unica no nicho

  institucional:
    nome: "PRO Institucional"
    preco: R$499,90/ano (ate 30 usuarios)
    preco_por_usuario: ~R$16,66/ano (~R$1,39/mes)
    publico: SENAI, ETEC, escolas tecnicas, oficinas com 5+ operadores
    inclui: [todas features PRO, painel de gestao de grupo, relatorio de uso por aluno/operador]
    posicionamento: "menos de R$1,50/mes por aluno — ferramenta didatica completa"
    racional: >
      1 professor SENAI expoe 30-120 alunos/ano. Licenca institucional tem
      CAC (custo de aquisicao) proximo de zero — o professor faz a venda.

estrategia_lancamento:
  trial_pro:
    duracao: 14 dias
    acesso: todas features PRO
    requer: cadastro (email ou Google)
    objetivo: criar base de emails + mostrar valor PRO antes de pedir pagamento
    conversao_esperada: 5-10% trial -> pago

  desconto_early_adopter:
    nome: "Fundador PRO"
    desconto: 40% sobre qualquer plano
    limite: primeiros 100 assinantes
    validade: vitalicia (enquanto manter assinatura)
    objetivo: criar urgencia + recompensar primeiros usuarios + gerar depoimentos
    preco_efetivo:
      mensal: R$11,94/mes
      anual: R$89,94/ano
      vitalicio: R$209,94

  cupom_senai:
    desconto: 50% no plano institucional
    preco_efetivo: R$249,90/ano (ate 30 usuarios = R$8,33/usuario/ano)
    objetivo: penetracao institucional — custo proximo de zero para escola
```

---

## 4. PLATAFORMAS DE PAGAMENTO

```yaml
plataforma_principal:
  nome: Stripe
  motivo: padrao global SaaS, suporte PIX nativo, checkout embutido, webhooks
  taxas_brasil:
    cartao_credito: 3.99% + R$0.39
    pix: 0% (Stripe nao cobra taxa PIX no Brasil ate mar/2026)
    boleto: 1.75% + R$3.50
  features:
    - checkout embutido (Stripe Checkout)
    - portal do cliente (gerenciar assinatura)
    - webhooks para ativar/desativar PRO
    - suporte PIX nativo
    - faturamento automatico
    - trial period nativo (14 dias)
  integracao:
    frontend: Stripe.js + Checkout Session
    backend: Cloudflare Worker (API route) ou Stripe Checkout (hosted)
    webhook: Worker endpoint para processar eventos (checkout.session.completed, customer.subscription.deleted)

plataforma_alternativa:
  nome: Hotmart
  motivo: maior plataforma de infoprodutos do Brasil, familiaridade do publico BR
  taxas:
    taxa_padrao: 9.9% + R$1.00 (Hotmart Pagamentos)
    parcelamento: ate 12x sem juros (Hotmart absorve)
  vantagens:
    - publico BR ja familiarizado com checkout Hotmart
    - parcelamento facilitado (ate 12x)
    - cupons e afiliados nativos
    - area de membros pronta
  desvantagens:
    - taxa mais alta que Stripe
    - menos controle sobre UX do checkout
    - associacao com "infoproduto" pode reduzir credibilidade tecnica
  recomendacao: usar como canal SECUNDARIO (afiliados, parcelamento 12x)

metodos_pagamento_brasil:
  prioridade_1: PIX (instantaneo, sem taxa, preferido por 70%+ dos brasileiros)
  prioridade_2: cartao de credito (recorrencia automatica, parcelamento)
  prioridade_3: boleto bancario (publico que nao tem cartao, empresas que pagam por boleto)
  nota: PIX e OBRIGATORIO — qualquer checkout sem PIX perde conversao no Brasil
```

---

## 5. PROJECOES DE RECEITA (3 CENARIOS)

```yaml
premissas_base:
  mes_inicio_monetizacao: mes 13 (apos 12 meses de fase gratuita + retencao)
  base_usuarios_no_mes_13: 2.000 usuarios ativos mensais (MAU)
  taxa_cadastro: 20% dos MAU tem login
  usuarios_com_login_mes_13: 400
  crescimento_mensal_mau: 10-15% (organico + conteudo MestreCNC)
  churn_mensal_pro: 5-8%
  ticket_medio_mensal: R$14,50 (mix entre mensal R$19,90 e anual R$12,49/mes)
  custo_infra_mensal: R$50 (Cloudflare Workers free tier + dominio)
  custo_stripe: ~4% sobre receita

cenario_conservador:
  nome: "Crescimento Lento"
  premissas:
    mau_mes_13: 1.500
    crescimento_mensal_mau: 8%
    conversao_free_para_pro: 3%
    churn_mensal: 8%
    ticket_medio: R$13,00
  projecao:
    mes_13:
      mau: 1.500
      usuarios_login: 300
      assinantes_pro: 9
      receita_bruta: R$117
      receita_liquida: R$62  # apos Stripe + infra
    mes_18:
      mau: 2.204
      usuarios_login: 441
      assinantes_pro: 28
      receita_bruta: R$364
      receita_liquida: R$300
    mes_24:
      mau: 3.499
      usuarios_login: 700
      assinantes_pro: 58
      receita_bruta: R$754
      receita_liquida: R$674
    ano_2_total:
      receita_bruta_anual: ~R$5.400
      receita_liquida_anual: ~R$4.800
  conclusao: cobre custos de infra, nao gera renda significativa

cenario_moderado:
  nome: "Crescimento Saudavel"
  premissas:
    mau_mes_13: 2.500
    crescimento_mensal_mau: 12%
    conversao_free_para_pro: 5%
    churn_mensal: 6%
    ticket_medio: R$14,50
    institucional_senai: 2 licencas/ano (R$499,90 cada)
  projecao:
    mes_13:
      mau: 2.500
      usuarios_login: 500
      assinantes_pro: 25
      receita_bruta: R$362
      receita_liquida: R$298
    mes_18:
      mau: 4.404
      usuarios_login: 881
      assinantes_pro: 72
      receita_bruta: R$1.044
      receita_liquida: R$952
    mes_24:
      mau: 8.698
      usuarios_login: 1.740
      assinantes_pro: 156
      receita_bruta: R$2.262
      receita_liquida: R$2.122
    ano_2_total:
      receita_bruta_anual: ~R$18.000
      receita_liquida_anual: ~R$16.500
      mais_institucional: R$999,80
      total_ano_2: ~R$17.500
  conclusao: renda complementar — cobre custos + gera R$1.400/mes no final do ano 2

cenario_otimista:
  nome: "Tracao com Parcerias"
  premissas:
    mau_mes_13: 5.000
    crescimento_mensal_mau: 15%
    conversao_free_para_pro: 7%
    churn_mensal: 5%
    ticket_medio: R$15,50
    institucional_senai: 5 licencas/ano
    vitalicio_vendas: 10/ano (R$349,90 cada)
    gatilho: parceria SENAI institucional + viral em grupo WhatsApp/YouTube
  projecao:
    mes_13:
      mau: 5.000
      usuarios_login: 1.250
      assinantes_pro: 88
      receita_bruta: R$1.364
      receita_liquida: R$1.260
    mes_18:
      mau: 10.057
      usuarios_login: 2.514
      assinantes_pro: 268
      receita_bruta: R$4.154
      receita_liquida: R$3.938
    mes_24:
      mau: 23.177
      usuarios_login: 5.794
      assinantes_pro: 612
      receita_bruta: R$9.486
      receita_liquida: R$9.057
    ano_2_total:
      receita_bruta_anual: ~R$72.000
      receita_liquida_anual: ~R$67.000
      mais_institucional: R$2.499,50
      mais_vitalicio: R$3.499,00
      total_ano_2: ~R$73.000
  conclusao: renda significativa — R$6.000/mes no final do ano 2

nota_sobre_projecoes: >
  projecoes sao estimativas baseadas em benchmarks SaaS (conversao free-pro 3-7%,
  churn 5-8%, crescimento organico 8-15%). Valores reais dependem de execucao
  de marketing (Doc 06), SEO (Doc 04), Google Ads (Doc 05) e parcerias (Doc 08).
  Revisitar apos 6 meses de dados reais do Cloudflare Analytics.
```

---

## 6. WILLINGNESS TO PAY POR PERSONA

```yaml
P1_operador_cnc:
  disposicao: BAIXA
  faixa: R$0 (prefere gratis)
  motivo: salario apertado (R$2.500-4.000), nao tem habito de pagar por app
  excecao: pagaria R$9,90/mes se o chefe pedir ou se puder parcelar
  estrategia: manter 100% gratis — Carlos e o motor de aquisicao (boca a boca)
  valor_indireto: cada Carlos satisfeito traz 2-5 novos usuarios sem CAC

P2_programador_cam:
  disposicao: MEDIA-ALTA
  faixa: R$19-39/mes
  motivo: usa no trabalho, pode justificar como ferramenta profissional
  features_gatilho: historico nuvem + export PDF + comparador + materiais expandidos
  estrategia: plano mensal R$19,90 ou anual R$149,90
  potencial: pode propor compra pelo CNPJ da empresa (nota fiscal)

P3_professor_senai:
  disposicao_individual: BAIXA
  disposicao_institucional: ALTA
  faixa_individual: R$0
  faixa_institucional: R$499,90/ano (30 alunos)
  motivo: SENAI tem orcamento para ferramentas didaticas — professor nao paga do proprio bolso
  features_gatilho: painel de gestao de grupo + relatorio de uso por aluno
  estrategia: licenca institucional + cupom 50% para primeiras escolas
  valor_multiplicador: 1 licenca institucional = 30-120 alunos expostos/ano

P4_dono_oficina:
  disposicao: ALTA
  faixa: R$49-99/mes ou R$349,90 vitalicio
  motivo: ROI claro — R$349 vs R$15.000-50.000/ano em quebras de ferramenta
  features_gatilho: perfis maquina multiplos + export relatorio + historico equipe
  estrategia: plano vitalicio R$349,90 (decisao rapida, sem mensalidade)
  argumento_venda: "1 fresa de metal duro custa R$200-800 — o PRO custa menos que 1 fresa"
  potencial: implementa para 2-8 operadores — possivel upsell institucional
```

---

## 7. METRICAS DE MONETIZACAO

```yaml
kpis_primarios:
  mrr: receita recorrente mensal (Monthly Recurring Revenue)
  arr: receita recorrente anual (MRR x 12)
  arpu: receita media por usuario pagante (ticket medio)
  ltv: lifetime value = ARPU / churn_mensal
  cac: custo de aquisicao por usuario pagante
  ltv_cac_ratio: alvo > 3:1

kpis_secundarios:
  conversao_free_pro: % usuarios free que viram PRO
  conversao_trial_pro: % trial que viram pagantes
  churn_mensal: % assinantes que cancelam por mes
  net_revenue_retention: receita retida apos churn + expansao
  payback_period: meses para recuperar CAC

benchmarks_saas_freemium:
  conversao_free_pro_tipica: 2-5% (media industria SaaS)
  conversao_free_pro_otima: 5-10%
  churn_mensal_tipico: 5-10% (micro-SaaS)
  churn_mensal_otimo: < 5%
  ltv_cac_saudavel: > 3:1

metas_tooloptimizer:
  ano_1: validar produto (0 receita — 100% gratis)
  ano_2_conservador: R$400-500/mes de MRR
  ano_2_moderado: R$1.400-1.800/mes de MRR
  ano_2_otimista: R$6.000-8.000/mes de MRR
  ano_3_meta: R$5.000-15.000/mes de MRR (renda complementar solida)
```

---

## 8. CUSTOS E BREAK-EVEN

```yaml
custos_fixos_mensais:
  cloudflare_workers: R$0 (free tier: 100k requests/dia)
  dominio_tooloptimizercnc: R$40/ano (~R$3,33/mes)
  dominio_mestrecnc: R$40/ano (~R$3,33/mes)
  github_pro: R$0 (free para repos privados)
  stripe: R$0 (so cobra % sobre transacao)
  total_fixo: ~R$7/mes

custos_variaveis:
  stripe_por_transacao: 3.99% + R$0.39 (cartao) | 0% (PIX)
  stripe_estimado_mensal: ~4% da receita bruta
  cloudflare_workers_pago: R$25/mes se exceder 100k requests/dia (improvavel no ano 1-2)
  email_transacional: R$0 (Resend free tier: 3.000 emails/mes)

break_even:
  custo_mensal_total: ~R$50 (arredondado com margem)
  ticket_medio_liquido: R$13,50 (R$14,50 - 7% taxas)
  assinantes_para_break_even: 4 assinantes PRO
  conclusao: break-even extremamente baixo — qualquer conversao ja cobre custos
```

---

## 9. RISCOS E MITIGACOES

```yaml
risco_1_ninguem_paga:
  probabilidade: MEDIA
  impacto: BAIXO (produto funciona gratis, custos sao minimos)
  mitigacao: >
    versao free continua operando sem custo relevante.
    Pivotar para modelo de doacao/patrocinio se freemium nao converter.
    Alternativa: monetizar via conteudo (MestreCNC) em vez do app.

risco_2_churn_alto:
  probabilidade: MEDIA
  impacto: MEDIO
  mitigacao: >
    features PRO devem ser "sticky" (historico nuvem, perfis maquina).
    Plano vitalicio elimina churn para quem paga uma vez.
    Engajamento via conteudo educativo (MestreCNC) mantem usuarios ativos.

risco_3_concorrente_traduz:
  probabilidade: BAIXA-MEDIA
  impacto: ALTO
  mitigacao: >
    first mover advantage no BR. Base instalada + boca a boca + parcerias SENAI
    criam barreira de troca. Diferenciais exclusivos (L/D semaforo, Kienzle,
    health bars, formulas educativas) nao sao triviais de copiar.

risco_4_pix_muda_taxa:
  probabilidade: BAIXA
  impacto: BAIXO
  mitigacao: >
    Stripe pode comecar a cobrar por PIX. Impacto pequeno (< 1% da receita).
    Alternativa: integrar PIX direto via API do banco (Mercado Pago, PagBank).

risco_5_stripe_nao_disponivel:
  probabilidade: MUITO BAIXA
  impacto: MEDIO
  mitigacao: >
    Hotmart como plataforma secundaria ja configurada.
    Alternativas: Mercado Pago, PagSeguro, Asaas (BR-native).
```

---

## 10. IMPLEMENTACAO TECNICA

```yaml
fase_1_prerequisitos:
  - login_google_oauth: Firebase Auth (email + Google) — ja no roadmap (L1-L5)
  - banco_dados: Firestore (historico nuvem, perfil usuario, assinatura)
  - api_route: Cloudflare Worker endpoint para webhooks Stripe

fase_2_integracao_stripe:
  checkout:
    tipo: Stripe Checkout (hosted page)
    motivo: menor esforco de implementacao, PCI compliance nativo
    fluxo: botao "Upgrade PRO" -> Stripe Checkout -> webhook -> ativar flag PRO no Firestore
  portal_cliente:
    tipo: Stripe Customer Portal
    funcoes: [cancelar, trocar plano, atualizar cartao, ver faturas]
  webhooks:
    endpoint: /api/stripe-webhook (Cloudflare Worker)
    eventos:
      - checkout.session.completed -> ativar PRO
      - customer.subscription.updated -> atualizar plano
      - customer.subscription.deleted -> desativar PRO
      - invoice.payment_failed -> notificar usuario

fase_3_feature_flags:
  mecanismo: admin-store feature flags (ja implementado em v0.7.0)
  flags:
    - pro_historico_nuvem: boolean
    - pro_export_pdf: boolean
    - pro_materiais_expandidos: boolean
    - pro_perfis_maquina: boolean
    - pro_comparador: boolean
  verificacao: hook useIsPro() verifica flag no Firestore do usuario logado

ordem_implementacao:
  1: login Google OAuth + Firestore
  2: Stripe Checkout + webhook
  3: feature flag PRO no frontend
  4: historico nuvem (primeira feature PRO)
  5: export PDF
  6: materiais expandidos + perfis maquina
  7: comparador
  8: plano institucional (painel grupo)
```

---

## 11. MODELO DE RECEITA ALTERNATIVO (FALLBACK)

```yaml
se_freemium_nao_converter:
  opcao_1_doacao:
    modelo: "Buy me a coffee" / PIX voluntario
    implementacao: botao "Apoie o projeto" com QR code PIX
    expectativa: R$100-500/mes (baseado em projetos open-source BR)

  opcao_2_patrocinio:
    modelo: logo de fabricante/distribuidor no footer
    candidatos: [Sandvik distribuidores BR, Kennametal BR, ferramentarias locais]
    preco: R$500-2.000/mes por sponsor
    risco: percepção de brand-lock — mitigar com "patrocinado por" discreto

  opcao_3_conteudo_premium:
    modelo: monetizar MestreCNC (cursos, ebooks, consultoria)
    exemplos:
      - curso "Parametros de Corte na Pratica" (R$97-197)
      - ebook "Guia Completo de Fresamento CNC" (R$47)
      - consultoria online 1h (R$150-300)
    vantagem: nao interfere no app gratuito
    desvantagem: exige producao de conteudo constante

  opcao_4_api:
    modelo: API paga para integracao CAM/ERP
    preco: R$0.01 por calculo (pay-per-use) ou R$99/mes (flat)
    publico: empresas com ERP/MES que querem integrar calculos
    prazo: longo prazo (requer demanda comprovada)
```

---

## 12. REFERENCIAS

```yaml
docs_internos:
  produto_features: 01-VISAO-PRODUTO.md (secoes 4, 7)
  pricing_concorrentes: 02-ANALISE-COMPETITIVA.md (secao 6)
  willingness_to_pay: 03-PERSONAS-E-JORNADA.md (secao 4 etapa_receita)
  canais_aquisicao: 04-ESTRATEGIA-SEO.md + 05-PLANO-GOOGLE-ADS.md + 06-ESTRATEGIA-CONTEUDO.md
  plano_lancamento: 08-PLANO-LANCAMENTO.md (go-to-market, trial, parcerias)
  metricas: 09-METRICAS-E-KPIs.md (AARRR, dashboards)
  landing_page: 10-LANDING-PAGE-SPEC.md (CTAs de conversao, pricing table)

benchmarks_saas:
  conversao_freemium: 2-5% media industria (Lenny Rachitsky, OpenView Partners)
  churn_micro_saas: 5-10% mensal (Baremetrics, ProfitWell)
  pricing_br_saas: R$9,90-49,90/mes faixa competitiva para ferramentas B2B nicho

plataformas_pagamento:
  stripe_brasil: stripe.com/br (taxas, PIX, checkout)
  hotmart: hotmart.com (taxas, checkout, afiliados)

estado_sistema:
  versao: v0.7.0
  feature_flags: implementado (admin-store)
  login: NAO implementado (prerequisito fase 2)
  firestore: NAO implementado (prerequisito fase 2)
```

---

*v1.0 — 20/03/2026. Modelo freemium com 3 fases (validacao/retencao/monetizacao), 4 planos (mensal/anual/vitalicio/institucional), 3 cenarios de receita, implementacao tecnica e fallbacks. Baseado em dados reais de `02-ANALISE-COMPETITIVA.md` e `03-PERSONAS-E-JORNADA.md`.*
