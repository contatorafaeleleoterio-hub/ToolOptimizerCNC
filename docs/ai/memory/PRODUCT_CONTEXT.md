# Product Context — ToolOptimizer CNC

> Contexto de negocio, produto e decisoes estrategicas.
> Otimizado para consumo por LLMs: dados estruturados, sem redundancia, alta densidade de informacao.
> Complementa: ENGINEERING_MEMORY.md (tecnico), ARCHITECTURE_LEARNINGS.md (padroes), COMMON_MISTAKES.md (erros).
>
> **Fonte:** Contexto direto do criador Rafael Eleoterio (sessao 18/03/2026-7).
> **Versao:** 1.0 | **Ultima atualizacao:** 18/03/2026

---

## CRIADOR

```yaml
nome: Rafael Eleoterio
experiencia_cnc: 16+ anos
cargo_atual: Fresador e Programador CNC
empresa: Fabricante de moldes para injecao de plastico
software_cam: Machining Strategist
funcao_principal: Executar fichas de programas criados pelo setor CAM, usinar pecas na fresadora
funcao_secundaria: Programar ocasionalmente (computador ao lado da maquina)
estudo_programacao: ~2 anos autodidata
objetivo_profissional: Migrar para desenvolvimento de software
```

---

## PROBLEMA REAL (validado em campo)

### Observacao direta do criador

A grande maioria dos fresadores e programadores CNC **NAO realiza calculos de parametros de corte**. Utilizam **valores padrao genericos** para todas as ferramentas por classe. Esse comportamento foi verificado em multiplas empresas do setor.

### Causas raiz (5)

```
1. FALTA_CONHECIMENTO    — nao sabem aplicar formulas ou interpretar catalogos
2. SOBRECARGA_TRABALHO   — nao ha tempo entre uma peca e outra
3. TABELAS_DESATUALIZADAS — quando existem, estao defasadas ou incompletas
4. FALTA_INICIATIVA      — cultura do "sempre fiz assim"
5. FERRAMENTAS_INADEQUADAS — calculadoras existentes sao em ingles, pagas ou complexas
```

### Consequencias (custo, NAO acidente)

```
- QUEBRA_FERRAMENTA      → custo direto R$80-R$800+ por fresa de metal duro
- DESGASTE_PREMATURO     → vida util reduzida pela metade
- ACABAMENTO_RUIM        → retrabalho ou refugo
- TEMPO_PARADO           → troca de ferramenta quebrada + reprocessamento
- DEPENDENCIA_EXPERIENCIA → novatos repetem erros sem referencia confiavel
```

> **IMPORTANTE:** O problema NAO e "calcular errado" — e NAO calcular. Risco de acidente NAO e consequencia relevante; o impacto e financeiro (ferramental + tempo + refugo).

### Impacto financeiro estimado

Oficina que quebra 2-3 ferramentas/semana por parametros errados: R$15.000-R$50.000/ano em ferramental (sem contar maquina parada e refugo).

---

## VISAO DO PRODUTO

### Definicao

Sistema web que calcula e recomenda parametros de corte para fresamento CNC em < 2 segundos, com validacao automatica de seguranca.

### Principio central

> O sistema RECOMENDA, o operador DECIDE.

### Tagline

> "A ciencia da usinagem, simplificada."

### Criterios de design (definidos pelo criador)

```
1. FACIL_CONSULTAR        — sem curva de aprendizado
2. INDICADORES_ALERTAS    — tomada de decisao com feedback visual
3. ECONOMIA_EFICIENCIA    — reduzir quebras e desgaste
4. INTERFACE_ATRATIVA     — que o operador QUEIRA usar diariamente
5. EDUCATIVA              — profissional evolui a cada interacao
6. FACIL_CONFIGURAR       — setup rapido e intuitivo
```

### Visao do criador

> "Acredito ser algo realmente inovador e unico nessa industria especifica, com possibilidade de se tornar uma solucao referencia na area — um sistema indispensavel."

---

## ESCOPO DO DASHBOARD ATUAL

### Classe de ferramenta: Fresas de Metal Duro (Solid Carbide End Mills)

```yaml
tipos:
  - topo_reto: Flat End Mill (desbaste, cavidades, contornos)
  - toroidal: Bullnose / Corner Radius (semi-acabamento, transicoes)
  - esferica: Ball End Mill (acabamento 3D, superficies curvas)
escopo: APENAS fresas de metal duro — classe especifica com dinamicas proprias
futuro: dashboards separados por classe (ver ROADMAP_FEATURES)
```

### Materiais

```yaml
pre_cadastrados: 9 (Aco 1020, 1045, Inox 304, Al 6061-T6, P20, 2711, 8620 nucleo, 8620 cementado, H13)
editaveis: SIM — usuario pode adicionar, editar, excluir livremente
validacao: NAO existe conceito de "validado vs estimado" — todos sao editaveis
limite: NENHUM — quantidade configuravel pelo usuario
```

### Tipo de operacao (Desbaste / Semi-acabamento / Acabamento)

```yaml
status: MANTIDO — impacto significativo nos calculos
impacto_vc: ate 67% de variacao entre desbaste e acabamento (ex: Inox 304)
impacto_ae: 10x diferenca (45-50% D desbaste vs 3.5-8% D acabamento)
impacto_ap: 4-5x diferenca (80-100% D vs 20% D)
impacto_fz: 25-40% reducao no acabamento
concorrentes: TODOS usam (FSWizard, G-Wizard, HSMAdvisor, Sandvik, Kennametal)
decisao: manter — 1 clique preenche 4 parametros corretos
```

---

## PUBLICO-ALVO (6 personas)

```yaml
operador_cnc:
  perfil: Chao de fabrica, 20-45 anos, usa valores genericos por habito
  dor: Quebra ferramenta e perde tempo por parametros errados

programador_cam:
  perfil: Escritorio tecnico, usa Machining Strategist/Mastercam/Fusion360
  dor: TAMBEM nao calcula parametros — usa valores padrao, descobre erro na maquina

professor_instrutor:
  perfil: SENAI, ETEC, cursos tecnicos
  dor: Precisa de ferramenta educativa que mostre formulas e o "por que"

dono_oficina:
  perfil: Microempresa, 1-5 maquinas, cuida de tudo
  dor: Cada ferramenta quebrada e prejuizo direto no caixa

encarregado_compras:
  perfil: Setor de compras, cobrado pela diretoria por economia
  dor: Precisa justificar gastos com ferramental — quer reduzir quebras

encarregado_chao_fabrica:
  perfil: Supervisao das maquinas, cobrado por produtividade e custos
  dor: Responsavel pelos gastos excessivos de ferramenta
```

---

## ESTRATEGIA DE DISTRIBUICAO

### Fases de lancamento

```yaml
fase_1_validacao:
  modelo: Web gratis, sem login
  objetivo: Barreira zero — coletar feedback de profissionais reais
  estado: ATUAL

fase_2_retencao:
  modelo: Login opcional (Google/email)
  objetivo: Salvar historico na nuvem, entender padroes de uso
  trigger: Apos feedback inicial positivo

fase_3_monetizacao:
  modelo: Freemium com features PRO
  objetivo: Receita sustentavel com base ja validada
  detalhes: Doc 07-MODELO-MONETIZACAO.md
```

### Canais

```yaml
web_principal: tooloptimizercnc.com.br (LIVE)
web_alias: app.tooloptimizercnc.com.br (LIVE)
codigo: GitHub (repositorio privado)
exe_portatil: USO PESSOAL de teste apenas — NAO e estrategia de distribuicao
```

### MestreCNC (canal de apoio)

```yaml
site: mestrecnc.com.br (ativo)
funcao: Canal de conteudo tecnico — artigos com experiencias reais e pesquisas avancadas
estrategia: Publicar conteudo de valor → gerar autoridade → direcionar trafego qualificado para ToolOptimizer
relacao: Estrutura de APOIO — foco principal e o sistema
detalhes: Doc 06-ESTRATEGIA-CONTEUDO.md
```

---

## ANALISE COMPETITIVA (resumo)

### Lacuna de mercado

> NAO existe nenhuma ferramenta gratuita, em portugues, com calculos de engenharia (Kienzle), validacao de seguranca (L/D), e interface moderna para o mercado brasileiro de usinagem CNC.

### Concorrentes por categoria

```yaml
comerciais_pagos:
  - G-Wizard: $216 lifetime, 1000+ materiais, 100k+ usuarios, ML, ingles
  - HSMAdvisor: $65+ licenca, desktop Win, forcas de corte, ingles
  - CNC_Machinist_Calc_Pro: ~$10, iOS/Android, 83 ferramentas, ingles

freemium:
  - FSWizard: free limitado / $50 Pro, web + mobile, 200+ materiais, ingles
  - Machining_Doctor: $2/mes, 27 calculadoras, ~135k visitas/mes, ingles

fabricantes_gratis_mas_presos_ao_catalogo:
  - Sandvik_CoroPlus_ToolGuide
  - Kennametal_NOVO
  - Walter_GPS
  - ISCAR_ITA
  - Seco_Tools
  - Mitsubishi_Cutting_App

web_gratuitos:
  - CNC_Optimization: 50+ materiais, baseado Machinery's Handbook
  - cncfeeds_com: simples, risk meter, focado CNC router

open_source:
  - brturn/feeds-and-speeds: ~18 stars, basico, sem L/D
  - FreeCAD_addons: acoplados ao ecossistema FreeCAD
```

### Diferenciais exclusivos ToolOptimizer (NENHUM concorrente combina todos)

```yaml
1. semaforo_ld: 4 niveis + bloqueio visual — UNICO
2. kienzle_kc11: modelo de potencia padrao engenharia — raro em calculadoras
3. portugues_br: interface 100% PT-BR — UNICO no mercado
4. sliders_ajuste_fino: bidirecionais + health bars tempo real — UNICO
5. gratis_sem_login: sem limitacao de funcionalidade
6. formulas_visiveis: valores reais substituidos — UNICO
7. ui_moderna: dark glassmorphism — todos concorrentes desktop tem UI datada
8. offline: funciona sem internet
```

### Onde concorrentes sao mais fortes

```yaml
- base_materiais: G-Wizard 1000+, FSWizard 200+ vs ToolOptimizer 9 pre-cadastrados
- multi_operacao: torneamento, furacao, rosqueamento (ToolOptimizer = apenas fresamento)
- chatter_analysis: G-Wizard tem algoritmo dedicado
- catalogo_fabricante: Sandvik/Kennametal tem 50k+ ferramentas proprias
- mobile_nativo: FSWizard, CNC Machinist Calc tem apps iOS/Android
- base_usuarios: G-Wizard 100k+, anos de mercado
```

---

## ROADMAP DE FEATURES

### Lancamento (v0.7.0 — estado atual)

Features atuais descritas em `01-VISAO-PRODUTO.md` secao 4.5. Lançamento com o que tem.

### Pos-lancamento (curto prazo)

```yaml
- feedback_profissionais: coleta com operadores e programadores reais
- login_opcional: Google/email para salvar dados na nuvem
- hardening_seguranca: CSP, validacao imports, CI audit
- landing_page: conversao em tooloptimizercnc.com.br
```

### Novas features (medio prazo — dashboard atual)

```yaml
- calculadora_trigonometria_visual
- guia_processos_especificos
- secao_codigos_g: referencia de codigos G e codigos de maquinas
- banco_dados_colaborativo: parametros que funcionam vs nao funcionam
- gamificacao: elementos de engajamento diario (sentimento fliperama/caca-niquel)
- modelo_freemium: features PRO pagas
```

### Novos dashboards (medio prazo — classes de ferramenta)

```yaml
dashboard_2:
  classe: Cabecotes com pastilhas de metal duro com revestimentos
  complexidade: ALTA — dashboard separado, dinamicas proprias
  estado: Conceito (ainda nao definido como sera)

dashboard_3:
  classe: Brocas de metal duro
  estado: Conceito

outros:
  conforme_demanda: Baseado em feedback dos usuarios
```

### Longo prazo

```yaml
- integracao_api_cam: exportar parametros para Machining Strategist/Mastercam/Fusion360
- expansao_materiais: titanio, Inconel, compositos
- app_mobile_nativo
- comunidade_operadores: compartilhamento de parametros validados
- parceria_escolas: SENAI, ETEC como ferramenta didatica
```

---

## DECISOES ESTRATEGICAS REGISTRADAS

| Decisao | Contexto | Data |
|---------|----------|------|
| Materiais editaveis pelo usuario | Sem conceito "validado vs estimado" — usuario controla tudo | 18/03/2026 |
| Dashboard exclusivo por classe de ferramenta | Cada classe tem dinamicas proprias — dashboards separados | 18/03/2026 |
| Tipo de operacao MANTIDO | Impacto significativo (ate 67% Vc) — todos concorrentes usam | 18/03/2026 |
| MestreCNC = canal de apoio | Gera trafego qualificado — foco principal e o sistema | 18/03/2026 |
| Login pos-validacao | Lancar sem login, implementar apos feedback positivo | 18/03/2026 |
| .exe portatil = uso pessoal | NAO e estrategia de distribuicao — apenas teste na empresa | 18/03/2026 |
| Lancar com features atuais | Novas features sao pos-lancamento — nao atrasar por elas | 18/03/2026 |
| Programador CAM tambem nao calcula | Mesma dor do operador — nao e "conferencia", e falta total | 18/03/2026 |
| 6 personas (nao 4) | Adicionados: Encarregado Compras + Encarregado Chao Fabrica | 18/03/2026 |
| Tagline mantida | "A ciencia da usinagem, simplificada." — aprovada pelo criador | 18/03/2026 |

---

## REFERENCIAS CRUZADAS

```yaml
visao_produto: DOCUMENTACAO_MARKETING_MONETIZACAO/01-VISAO-PRODUTO.md
plano_docs: DOCUMENTACAO_MARKETING_MONETIZACAO/PLANO_REESTRUTURACAO_DOCS.md
roadmap: docs/ROADMAP_SESSAO_ATUAL.md
memoria_tecnica: docs/ai/memory/ENGINEERING_MEMORY.md
arquitetura: docs/ai/memory/ARCHITECTURE_LEARNINGS.md
erros: docs/ai/memory/COMMON_MISTAKES.md
prd: docs/specs/PRD_MASTER.md
design: docs/design/UI_DESIGN_SPEC_FINAL.md
branding: docs/design/UI_BRANDING.md
```

---

*FENIX AI System | Product Context | Seed: 18/03/2026*
