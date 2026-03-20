# 02 — Analise Competitiva: ToolOptimizer CNC

> **Versao:** 2.0 | **Data:** 20/03/2026 | **Autor:** Rafael Eleoterio + Claude
> **Formato:** Otimizado para consumo por LLMs — dados estruturados, sem prosa, alta densidade
> **Depende de:** `01-VISAO-PRODUTO.md` (produto, diferenciais, matriz comparativa, comparativos diretos)
> **Alimenta:** `03-PERSONAS-E-JORNADA.md`, `07-MODELO-MONETIZACAO.md`, `10-LANDING-PAGE-SPEC.md`

---

## 1. CONTEXTO DE MERCADO

```yaml
mercado_global_cnc_software:
  2025: US$2.5B
  2033_projecao: US$4.5B
  cagr: 8%
  fonte: Business Research Insights

mercado_brasil_cnc:
  2023_receita: US$240.6M (centros de usinagem)
  2030_projecao: US$374.1M
  cagr: 6.5%
  fonte: AstroCNC

forca_trabalho_brasil:
  metalurgia_total: ~2.5M trabalhadores (2024)
  crescimento_2023_2024: +4.8% (+109.511 vagas)
  operadores_cnc_estimado: 300.000-500.000
  salario_medio_cnc: R$3.089/mes (CLT 44h, CAGED)
  cbo: 7214 (Operadores de maquinas de usinagem CNC)
  empresas_abimaq: ~8.000
  fontes: [STIMMMEMS, CAGED/salario.com.br, ABIMAQ]

diversidade_fabricantes_brasil:
  nivel: ALTA — nao ha dominio de 1 marca
  marcas_comuns: Sandvik, Kennametal, Walter, ISCAR, Seco, Dormer Pramet, Mitsubishi, OSG, YG-1, marcas chinesas
  implicacao: apps brand-locked atendem apenas parcela do mercado
```

---

## 2. MAPA DE CONCORRENTES

### 2.1 Comerciais Pagos (brand-agnostic)

```yaml
g_wizard:
  nome: G-Wizard Calculator
  empresa: CNC Cookbook
  preco: $80/ano | $216 lifetime (~R$1.188)
  plataforma: Windows desktop | ingles
  base_usuarios: ~50.000+
  destaques: [ML 250+ catalogos, chatter analysis, Safe Mode, 10+ anos mercado, 100+ materiais]
  fraquezas: [Windows-only, UI datada, ingles, renovacao anual]
  ameaca: MEDIA — preco alto e ingles afastam mercado BR

hsmadvisor:
  nome: HSMAdvisor
  preco: $65/ano hobby | $150-250 permanente (~R$825-R$1.375)
  plataforma: Windows desktop + plugin Mastercam | ingles
  base_usuarios: ~15.000-25.000
  destaques: [mais avancado tecnicamente, integracao Mastercam 2025, forcas de corte, tool life]
  fraquezas: [Windows-only, curva de aprendizado, ingles]
  ameaca: BAIXA — publico CAM avancado, sem presenca BR

cnc_machinist_calc_ultra:
  nome: CNC Machinist Calculator Ultra
  preco: $1.99/mes | $19.99/ano (~R$110/ano)
  plataforma: iOS + Android + Web | ingles
  base_usuarios: ~100.000+ downloads
  destaques: [83 ferramentas, 170 materiais, mobile-first]
  ameaca: BAIXA — mobile ingles, sem indicadores de seguranca
```

### 2.2 Freemium (brand-agnostic)

```yaml
fswizard:
  nome: FSWizard
  preco: Free (limitado) | $50 Pro lifetime (~R$275)
  plataforma: Web + iOS + Android | ingles
  base_usuarios: ~10.000-20.000
  destaques: [cross-platform, chip thinning, tool deflection, preco unico]
  fraquezas: [versao free limitada, ingles, sem L/D bloqueio]
  ameaca: MEDIA — acessivel e multi-plataforma, mas ingles

machining_doctor:
  nome: Machining Doctor
  preco: Free (ads) | $2/mes (~R$132/ano Premium)
  plataforma: Web | ingles (suporte parcial PT-BR)
  visitas_mes: ~50.000-100.000
  destaques: [27 calculadoras, conteudo educativo extenso, SpeeDoctor proprietario]
  fraquezas: [calculadoras separadas (nao integradas), web-only, sem offline]
  ameaca: MEDIA — conteudo educativo forte, mas experiencia fragmentada
```

### 2.3 Apps de Fabricantes (brand-locked, gratis)

```yaml
sandvik_coroplus:
  nome: CoroPlus ToolGuide
  plataforma: Web + offline + API CAM | multi-idioma (inclui PT)
  base_usuarios: ~200.000+
  destaques: [maior fabricante mundial, dados alta qualidade, integracao CAM, digital twin]

kennametal_novo:
  nome: NOVO
  plataforma: Web + tablets + plugins Fusion360/Mastercam | multi-idioma
  base_usuarios: ~50.000-100.000
  destaques: [Tool Advisor com regras, modelos 3D, BOM export]

walter_gps:
  nome: Walter GPS
  plataforma: Web + iOS + Android | multi-idioma (inclui PT)
  destaques: [custo-por-peca, vida ferramenta, G-code rosqueamento]

iscar_ita:
  nome: ISCAR Tool Advisor (ITA)
  plataforma: Web + plugin Fusion360 | 25 idiomas (inclui PT)
  destaques: [2-6 campos de entrada, top 3 recomendacoes, rapido]

dormer_pramet:
  nome: Dormer Pramet Calculators
  plataforma: iOS + Android | PT-BR nativo
  destaques: [fresamento, torneamento, furacao, rosqueamento, mandrilamento]
  relevancia: unico app de fabricante com PT-BR nativo

# Tambem existem (menor relevancia): Seco Tools (Web+app), Mitsubishi Cutting App (iOS+Android)
# Todos brand-locked: APENAS ferramentas do proprio fabricante
```

### 2.4 Outros (ameaca negligivel)

```yaml
web_gratuitos: [CNC Optimization (cncoptimization.com), cncfeeds.com] — ingles, basicos
open_source: [brturn/feeds-and-speeds (~18 stars), FreeCAD Path Addons] — sem UI, sem manutencao
```

---

## 3. MERCADO BRASILEIRO

```yaml
conclusao: NAO EXISTE calculadora CNC brand-agnostic, PT-BR nativa, com indicadores de seguranca

mais_proximo:
  - dormer_pramet: app gratis com PT-BR, mas brand-locked
  - machining_doctor: suporte parcial PT-BR, mas web-only e fragmentado
  - sandvik/walter/iscar: multi-idioma com PT, mas brand-locked

o_que_operadores_br_usam_hoje:
  - planilhas_internas: Excel/Google Sheets, engessadas e desatualizadas
  - parametros_fixos: valores do fabricante sem recalcular
  - experiencia_propria: "sempre fiz assim"
  - nada: maioria simplesmente nao calcula
```

---

## 4. SWOT — ToolOptimizer CNC

```yaml
forcas:
  - unico_ptbr: unica calculadora CNC brand-agnostic em portugues brasileiro
  - barreira_zero: gratis, sem login, sem limitacao de funcionalidade
  - indicadores_visuais: semaforo L/D + health bars + gauges — feedback que iniciante entende
  - kienzle: modelo de potencia com engenharia real (kc1.1) — raro em calculadoras
  - formulas_educativas: valores reais substituidos — aprendizado passivo
  - ui_moderna: dark glassmorphism — visual que operador quer usar
  - offline: funciona sem internet no chao de fabrica
  - infra_solida: 824 testes, TypeScript strict, CI/CD, Cloudflare Workers
  - criador_insider: 16+ anos de experiencia real na industria

fraquezas:
  - escopo_limitado: apenas fresamento com fresas de metal duro (3 tipos)
    plano: dashboards separados por classe (pos-lancamento)
  - base_materiais_pequena: 9 pre-cadastrados (vs 100-1000+ concorrentes)
    mitigacao: usuario pode adicionar/editar livremente
  - sem_mobile_nativo: web responsiva apenas
  - projeto_1_pessoa: 1 criador
    mitigacao: 824 testes + CI/CD automatizado
  - sem_base_usuarios: produto novo, zero usuarios
    plano: fase 1 = validacao gratuita
  - sem_integracao_cam: nao exporta para Mastercam/Fusion360

oportunidades:
  - mercado_br_vazio: ZERO concorrentes diretos no nicho
  - 300k_operadores: publico-alvo 300-500k operadores CNC no Brasil
  - crescimento_setor: +4.8% empregos metalurgia 2024, CNC BR 6.5% CAGR
  - planilhas_obsoletas: demanda reprimida
  - parcerias_senai: 500+ unidades SENAI — ferramenta educativa gratuita
  - mestrecnc_conteudo: canal de trafego qualificado ja ativo
  - custo_ferramental: R$15.000-50.000/ano em quebras — ROI claro

ameacas:
  - fabricantes_melhoram_apps: Sandvik/Kennametal podem adicionar PT-BR e features
  - concorrente_copia: barreira tecnica baixa
    mitigacao: experiencia criador + velocidade iteracao + first mover
  - mercado_br_resiste: cultura "sempre fiz assim"
    mitigacao: barreira zero + conteudo educativo via MestreCNC
  - freemium_internacional: FSWizard/Machining Doctor podem traduzir para PT-BR
    mitigacao: base instalada + diferenciais exclusivos (L/D, Kienzle, health bars)
```

---

## 5. GAPS DE MERCADO EXPLORAVEIS

```yaml
gap_1_idioma:
  descricao: nenhuma calculadora brand-agnostic em PT-BR
  tamanho: 300-500k operadores CNC
  exploracao: "a calculadora CNC do Brasil"

gap_2_indicadores_para_iniciantes:
  descricao: concorrentes exigem conhecimento previo — nao guiam o operador
  exploracao: semaforo L/D + health bars + formulas educativas

gap_3_planilhas_substituicao:
  descricao: empresas usam planilhas desatualizadas que ninguem mantem
  exploracao: "substitua sua planilha por uma ferramenta que se atualiza"

gap_4_fabricante_agnostico:
  descricao: apps de fabricante so servem para SUAS ferramentas
  exploracao: "funciona com qualquer fresa, de qualquer fabricante"

gap_5_educacao_tecnica:
  descricao: SENAI/ETEC usam catalogos PDF — precisam de ferramentas didaticas modernas
  tamanho: 500+ unidades SENAI + centenas de ETECs

gap_6_custo_ferramental:
  descricao: oficinas perdem R$15-50k/ano com quebras sem dados para justificar
  exploracao: "reduza quebras com parametros calculados" — ROI mensuravel
```

---

## 6. PRICING COMPARATIVO (BRL)

| Ferramenta | Modelo | Preco BRL | Brand-locked? | PT-BR? |
|------------|--------|-----------|:---:|:---:|
| ToolOptimizer CNC | Gratis (fase 1) | R$0 | NAO | SIM |
| G-Wizard | Lifetime | ~R$1.188 | NAO | NAO |
| HSMAdvisor | Permanente | ~R$825-R$1.375 | NAO | NAO |
| FSWizard Pro | Lifetime | ~R$275 | NAO | NAO |
| Machining Doctor | Anual | ~R$132/ano | NAO | Parcial |
| CNC Calc Ultra | Anual | ~R$110/ano | NAO | NAO |
| Fabricantes (Sandvik, Kennametal, Walter, ISCAR, Dormer) | Gratis | R$0 | SIM | Parcial |

```yaml
insight_pricing:
  - operador BR ganha ~R$3.089/mes — G-Wizard = 38% do salario
  - FSWizard Pro = 9% do salario — acessivel mas ingles
  - apps fabricante gratis mas brand-locked — nao resolvem diversidade BR
  - monetizacao futura: R$19-49/mes PRO = 0.6-1.6% do salario
```

---

## 7. REFERENCIAS

```yaml
docs_internos:
  produto_e_comparativos: 01-VISAO-PRODUTO.md (matriz comparativa §5.2, comparativos diretos §5.3, posicionamento §5.4)
  personas: 03-PERSONAS-E-JORNADA.md
  seo: 04-ESTRATEGIA-SEO.md
  monetizacao: 07-MODELO-MONETIZACAO.md
  landing_page: 10-LANDING-PAGE-SPEC.md

fontes_externas:
  mercado: [Business Research Insights, AstroCNC, Precedence Research]
  trabalho: [STIMMMEMS, CAGED/salario.com.br, ABIMAQ]
  concorrentes: [cnccookbook.com, fswizard.com, hsmadvisor.com, machiningdoctor.com]
  fabricantes: [sandvik.coromant.com, kennametal.com, walter-tools.com, iscar.com]
```

---

*v2.0 — trimmed 20/03/2026. Matriz comparativa e comparativos diretos em `01-VISAO-PRODUTO.md` §5.2/§5.3. Precos BRL a ~5.5 BRL/USD.*
