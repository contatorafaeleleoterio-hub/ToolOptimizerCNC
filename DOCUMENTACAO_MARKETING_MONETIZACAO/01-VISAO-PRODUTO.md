# 01 — Visao do Produto: ToolOptimizer CNC

> **Versao:** 2.0 | **Data:** 18/03/2026 | **Autor:** Rafael Eleoterio
> **Estado do sistema:** v0.7.0 | 824 testes | Deploy LIVE em `tooloptimizercnc.com.br`

---

## 1. O Problema

A grande maioria dos fresadores e programadores CNC **nao realiza calculos de parametros de corte**. Nao consultam tabelas com engenharia, nao aplicam formulas, nao validam velocidades. Utilizam **valores padrao genericos** para basicamente todas as ferramentas de acordo com suas classes — e repetem esses valores independentemente do material, da ferramenta ou da operacao.

Esse comportamento e comum em toda a industria. As causas sao multiplas:

- **Falta de conhecimento** — nao sabem aplicar formulas ou interpretar catalogos
- **Sobrecarga de trabalho** — nao ha tempo para calcular entre uma peca e outra
- **Tabelas desatualizadas** — quando existem, estao defasadas ou incompletas
- **Falta de iniciativa** — a cultura do "sempre fiz assim" prevalece
- **Ferramentas inadequadas** — as calculadoras existentes sao em ingles, pagas, ou complexas demais

As consequencias sao reais e custam caro:

- **Quebra de ferramentas** por RPM ou avanco excessivo — custo direto de reposicao
- **Desgaste prematuro** por parametros inadequados — ferramenta dura metade da vida util
- **Acabamento ruim** por parametros conservadores demais — retrabalho ou refugo
- **Tempo parado** trocando ferramentas quebradas ou reprocessando pecas
- **Dependencia de experiencia** — operadores novatos nao tem referencia confiavel e repetem erros

> **Impacto financeiro:** Cada fresa de metal duro custa entre R$80 e R$800+. Uma oficina que quebra 2-3 ferramentas por semana por parametros errados perde R$15.000–R$50.000/ano so em ferramental — sem contar tempo de maquina parado e pecas refugadas.

As calculadoras existentes (G-Wizard, FSWizard, Machining Doctor, apps de fabricantes) resolvem parte do problema, mas **nenhuma combina:** calculo rapido + validacao de seguranca + educacao tecnica + gratuidade + portugues + acesso offline.

---

## 2. A Solucao

**ToolOptimizer CNC** e um sistema web que calcula e recomenda parametros de corte para fresamento CNC em menos de 2 segundos, com validacao automatica de seguranca — sem precisar fazer conta, consultar catalogo ou depender de experiencia.

### Fluxo do Usuario

```
Selecionar Material -> Escolher Ferramenta -> Definir Operacao -> Clicar "Simular"
                                                                      |
                                                          RPM, Avanco, Potencia,
                                                          Torque, MRR + Semaforo
                                                          de Seguranca (L/D)
                                                                      |
                                                          Ajuste Fino (opcional)
                                                          com feedback visual
```

### Principio Central

> **O sistema RECOMENDA, o operador DECIDE.** O ToolOptimizer entrega parametros calculados com base em engenharia, mas a decisao final e sempre do profissional na maquina.

### Tagline

> **"A ciencia da usinagem, simplificada."**

---

## 3. Proposta de Valor Unica (UVP)

**Parametros de corte CNC seguros em 2 segundos — gratis, em portugues, offline e com validacao automatica de seguranca.**

### O que torna isso diferente:

| Diferencial | O que faz | Por que importa |
|-------------|-----------|-----------------|
| **Semaforo L/D** | Classifica a relacao comprimento/diametro em verde/amarelo/vermelho/bloqueado | Previne vibracao e quebra — nenhuma calculadora gratuita faz isso |
| **Chip Thinning (CTF)** | Corrige automaticamente o fz quando ae < 50% do diametro | Evita desgaste prematuro em passes laterais rasos |
| **Formulas educativas** | Mostra a formula usada com os valores reais substituidos | Operador aprende enquanto usa — valor educacional unico |
| **Ajuste fino visual** | Sliders bidirecionais (-150% a +150%) com feedback em tempo real | Operador experimenta variacoes sem redigitar tudo |
| **Indicadores de saude** | 4 barras coloridas (Vc, fz, ae, ap) + 3 gauges (Feed, MRR, Tool Health) | Feedback visual imediato sobre a qualidade dos parametros |
| **Portugues nativo** | Interface 100% em portugues brasileiro | Unica solucao no mercado BR — todos os concorrentes sao em ingles |
| **Gratuito e sem login** | Versao web completa sem cadastro, sem limitacoes | Barreira zero para adocao |
| **Offline** | Funciona sem internet | Acessivel no chao de fabrica |

---

## 4. Estado Atual do Sistema (v0.7.0)

> **Nota sobre o lancamento:** O sistema sera lancado com as features atuais descritas abaixo. Novas funcionalidades e ferramentas serao adicionadas progressivamente apos o lancamento, com base no feedback dos usuarios.

### 4.1 Escopo do Dashboard Atual: Fresas de Metal Duro

O dashboard atual e projetado e arquitetado **exclusivamente para fresas de metal duro (solid carbide end mills)**, divididas em 3 tipos:

| Tipo | Nome tecnico | Aplicacao tipica |
|------|-------------|-----------------|
| **Topo Reto** | Flat End Mill | Desbaste, cavidades, contornos |
| **Toroidal** | Bullnose / Corner Radius | Semi-acabamento, transicoes |
| **Esferica** | Ball End Mill | Acabamento 3D, superficies curvas |

Essa e uma classe especifica de ferramenta com dinamicas e especificacoes proprias de uso e calculo. **Futuros dashboards separados** serao desenvolvidos para outras classes de ferramentas (ver Secao 9).

### 4.2 Dados Tecnicos

| Recurso | Detalhe |
|---------|---------|
| **Materiais** | 9 pre-cadastrados (Aco 1020, 1045, Inox 304, Aluminio 6061-T6, P20, 2711, 8620 nucleo, 8620 cementado, H13) — **totalmente editaveis pelo usuario** |
| **Classificacao ISO** | 4 grupos: P (acos), M (inox), N (aluminio), H (endurecidos) |
| **Ferramentas** | 3 tipos de fresas de metal duro (Topo Reto, Toroidal, Esferica) |
| **Diametros** | 6 padrao (6, 8, 10, 12, 16, 20 mm) — configuraveis |
| **Operacoes** | 3 (Desbaste, Semi-acabamento, Acabamento) |
| **Faixas de Vc** | 27 combinacoes (9 materiais x 3 operacoes) |

> **Materiais configuráveis:** O usuario pode adicionar, editar e excluir materiais livremente na secao de configuracao. Os 9 materiais pre-cadastrados sao um ponto de partida — nao um limite.

### 4.3 Calculos Implementados

| Calculo | Formula | Fonte |
|---------|---------|-------|
| **RPM** | (Vc x 1000) / (pi x D) | ISO 3685 |
| **Avanco (F)** | fz x Z x RPM | Norma geral usinagem |
| **Forca de corte (Kienzle)** | kc1.1 x h^(1-mc) x b | Kienzle/Victor |
| **Potencia** | Fc x Vc / (60000 x n) | — |
| **Torque** | Fc x D / 2000 | — |
| **MRR** | ap x ae x F / 1000 | — |
| **CTF** | 1/sqrt(1-(1-2ae/D)^2) quando ae < 50% D | Sandvik |
| **L/D ratio** | L / D -> semaforo (<=3 / 3-4 / 4-6 / >6) | Pratica industrial |

### 4.4 Infraestrutura

| Item | Estado |
|------|--------|
| **Web** | LIVE em `tooloptimizercnc.com.br` (Cloudflare Workers) |
| **CI/CD** | GitHub Actions -> auto-deploy ao push |
| **Testes** | 824 passando (49 arquivos), 0 falhas |
| **TypeScript** | Strict mode, zero `any`, zero erros |
| **Bundle** | JS 99.20KB gzip, CSS 14.35KB gzip |
| **Analytics** | Cloudflare Web Analytics (ativo) |
| **Admin** | Dashboard com 9 paginas (tarefas, bugs, erros, usage, analytics, flags, changelog, health) |

### 4.5 Features do Sistema

**Calculo e Simulacao:**
- Calculo completo (RPM, F, Potencia, Torque, MRR, Vc real) em < 2 segundos
- Chip Thinning Factor (CTF) automatico
- Safety factor configuravel (0.7-0.8)
- Limites de maquina configuraveis (RPM, potencia, torque, avanco)

**Validacao e Seguranca:**
- Semaforo L/D (verde/amarelo/vermelho/bloqueado)
- Validacao de inputs com ranges seguros
- Disclaimer: "o sistema recomenda, o operador decide"

**Ajuste Fino e Visualizacao:**
- Sliders bidirecionais para Vc, fz, ae, ap (-150% a +150%)
- Sliders de RPM e Avanco no painel de resultados
- 4 ParameterHealthBars (Vc, fz, ae, ap) com zonas coloridas
- 3 Gauges parametrizados (Feed Headroom, MRR, Tool Health)
- Animacoes de simulacao (spinner, gauge roll, pulse)

**Configuracao:**
- Materiais: adicionar, editar, excluir livremente
- Limites de maquina personalizaveis
- Import/export de configuracoes

**Historico e Exportacao:**
- Historico de simulacoes com feedback do operador
- Exportacao JSON e CSV

**Educacao:**
- Formulas com valores reais substituidos (modo educativo)
- Tooltips explicativos

**Admin (acesso em `/admin`):**
- Dashboard com KPIs em tempo real
- Gerenciamento de tarefas (CRUD)
- Inbox de bug reports
- Error tracking (window.onerror)
- Usage stats (materiais, operacoes, ferramentas mais usados)
- Integracao Cloudflare Analytics (trafego + Web Vitals)
- Feature flags em runtime
- Changelog visual
- Health check do sistema

---

## 5. Analise Competitiva

> Analise detalhada em `02-ANALISE-COMPETITIVA.md` (Doc 02). Abaixo um resumo comparativo.

### 5.1 Panorama do Mercado

| Categoria | Exemplos | Caracteristica comum |
|-----------|----------|---------------------|
| **Comerciais pagos** | G-Wizard ($216), HSMAdvisor ($65+), CNC Machinist Calc Pro ($10) | Completos, mas caros e em ingles |
| **Freemium** | FSWizard (free limitado / $50 Pro), Machining Doctor ($2/mes) | Funcionalidade limitada na versao gratis |
| **Fabricantes** | Sandvik CoroPlus, Kennametal NOVO, Walter GPS, ISCAR ITA, Seco Tools | Gratis, mas presos ao catalogo do fabricante |
| **Web gratuitos** | CNC Optimization, cncfeeds.com | Simples, sem validacao de seguranca |
| **Open-source** | brturn/feeds-and-speeds, FreeCAD addons | Basicos, sem L/D, sem UI moderna |
| **Mobile** | FSWizard, Sandvik Calc, Mitsubishi Cutting App | Limitados ou presos a fabricante |

**Nenhum concorrente combina TODOS estes atributos:**

### 5.2 Matriz de Diferenciais Exclusivos

| Feature | ToolOptimizer | G-Wizard | FSWizard | HSMAdvisor | Machining Doctor | Fabricantes |
|---------|:---:|:---:|:---:|:---:|:---:|:---:|
| **Semaforo L/D (4 niveis + bloqueio)** | SIM | Parcial | NAO | NAO | NAO | NAO |
| **Kienzle (kc1.1) como modelo de potencia** | SIM | NAO | NAO | NAO | Parcial | NAO |
| **Portugues (BR)** | SIM | NAO | NAO | NAO | NAO | NAO |
| **Sliders ajuste fino + health bars** | SIM | NAO | NAO | NAO | NAO | NAO |
| **Gratis + sem login** | SIM | NAO | Parcial | Parcial | SIM (ads) | SIM* |
| **Offline** | SIM | SIM | SIM (app) | SIM | NAO | Parcial |
| **Formulas visiveis com valores reais** | SIM | NAO | NAO | NAO | NAO | NAO |
| **UI moderna (dark/glassmorphism)** | SIM | NAO | NAO | NAO | NAO | NAO |

*Fabricantes: gratis mas limitado ao catalogo proprio.

### 5.3 Comparativos Diretos

**vs. G-Wizard (CNC Cookbook) — $216 lifetime / ~$80/ano**
- Maior concorrente: 1000+ materiais, 100k+ usuarios, ML de 250+ catalogos
- **Vantagens ToolOptimizer:** Gratis, portugues, UI moderna, semaforo L/D visual, formulas educativas
- **Vantagens G-Wizard:** Base de dados massiva, analise de chatter, anos de mercado

**vs. FSWizard — Free limitado / $50 Pro**
- Multi-plataforma (web + iOS + Android), 200+ materiais no Pro
- **Vantagens ToolOptimizer:** 100% gratis sem limitacao, portugues, L/D com bloqueio, health bars
- **Vantagens FSWizard:** App mobile nativo, base maior de materiais

**vs. Machining Doctor — Freemium (~135k visitas/mes)**
- 27 calculadoras, algoritmo SpeeDoctor proprietario
- **Vantagens ToolOptimizer:** Offline, portugues, L/D semaforo, interface unificada (nao 27 paginas separadas)
- **Vantagens Machining Doctor:** Escopo amplo (torneamento, furacao), conteudo educativo extenso

**vs. HSMAdvisor — $65+ licenca permanente**
- Desktop Windows, forcas de corte, perfis de maquina
- **Vantagens ToolOptimizer:** Gratis, web + desktop, UI moderna, portugues
- **Vantagens HSMAdvisor:** Integracao CAM, base industrial consolidada

**vs. Plataformas de Fabricantes (Sandvik, Kennametal, Walter, ISCAR, Seco)**
- Gratis e com dados de alta qualidade dos proprios catalogos
- **Vantagens ToolOptimizer:** Agnóstico de fabricante, L/D semaforo, ajuste fino visual, educativo
- **Desvantagem:** Fabricantes tem dados de 50.000+ ferramentas proprias

### 5.4 Lacuna de Mercado

> **Nao existe nenhuma ferramenta gratuita, em portugues, com calculos de engenharia (Kienzle), validacao de seguranca (L/D), e interface moderna para o mercado brasileiro de usinagem CNC.** O ToolOptimizer CNC preenche essa lacuna.

---

## 6. Publico-Alvo

> Detalhamento completo em `03-PERSONAS-E-JORNADA.md` (Doc 03).

| Persona | Perfil | Dor principal |
|---------|--------|---------------|
| **Operador CNC** | Chao de fabrica, 20-45 anos, usa valores genericos por habito | Quebra ferramenta e perde tempo por usar parametros errados, nao tem referencia confiavel |
| **Programador CAM** | Escritorio tecnico, usa Machining Strategist/Mastercam/Fusion360 | Tambem nao calcula parametros — usa valores padrao e so descobre o erro na maquina |
| **Professor / Instrutor** | SENAI, ETEC, cursos tecnicos | Precisa de ferramenta educativa que mostre as formulas e ensine o "por que" |
| **Dono de oficina** | Microempresa, 1-5 maquinas, cuida de tudo | Cada ferramenta quebrada e prejuizo direto no caixa |
| **Encarregado de Compras** | Setor de compras, cobrado pela diretoria por economia | Precisa justificar gastos com ferramental — quer reduzir quebras e desgaste prematuro |
| **Encarregado de Chao de Fabrica** | Supervisao das maquinas, cobrado por produtividade e custos | Responsavel pelos gastos excessivos de ferramenta — precisa de dados para cobrar boas praticas |

---

## 7. Modelo de Distribuicao

### 7.1 Canais Atuais

| Canal | URL / Local | Estado |
|-------|-------------|--------|
| **Web (producao)** | `tooloptimizercnc.com.br` | LIVE |
| **Web (alias)** | `app.tooloptimizercnc.com.br` | LIVE |
| **Codigo-fonte** | GitHub (repositorio privado) | Ativo |

**Modelo atual:** 100% gratuito, sem login, sem limitacoes de funcionalidade.

### 7.2 Estrategia de Lancamento

| Fase | Modelo | Objetivo |
|------|--------|----------|
| **1. Validacao** | Web gratis, sem login | Barreira zero — coletar feedback de profissionais reais |
| **2. Retencao** | Login opcional (Google/email) | Salvar historico na nuvem, entender padroes de uso |
| **3. Monetizacao** | Freemium com features PRO | Receita sustentavel com base ja validada |

> **Plano futuro de monetizacao:** Detalhado em `07-MODELO-MONETIZACAO.md` (Doc 07).

### 7.3 MestreCNC — Canal de Conteudo e Trafego

O **MestreCNC** (`mestrecnc.com.br`) e uma marca de apoio criada para gerar trafego qualificado e direcionar profissionais para o ToolOptimizer CNC.

| Aspecto | Detalhe |
|---------|---------|
| **Site** | `mestrecnc.com.br` (ativo) |
| **Funcao** | Canal de conteudo tecnico — artigos com experiencias reais da pratica e pesquisas avancadas |
| **Publico** | Fresadores, programadores, estudantes de usinagem |
| **Estrategia** | Publicar conteudo de valor -> gerar autoridade -> direcionar trafego qualificado para o ToolOptimizer |
| **Relacao com ToolOptimizer** | Estrutura de apoio — o foco principal e o sistema |

> Detalhamento completo em `06-ESTRATEGIA-CONTEUDO.md` (Doc 06).

---

## 8. Tecnologia (Resumo para Stakeholders)

| Aspecto | Escolha | Por que |
|---------|---------|---------|
| **Frontend** | React + TypeScript | Tipagem forte = menos bugs em calculos |
| **Hosting** | Cloudflare Workers | Global, rapido, custo quase zero |
| **Testes** | 824 testes automatizados | Cada formula e validada contra valores de referencia |
| **Design** | Dark theme (glassmorphism) | Visual moderno, reduz fadiga visual em ambiente industrial |
| **Deploy** | Automatico (push -> producao) | Atualizacoes em minutos, sem downtime |

---

## 9. Visao de Futuro

### Curto prazo (pos-lancamento imediato)
- Coleta de feedback com profissionais reais (operadores, programadores, encarregados)
- Login opcional (Google/email) para salvar dados na nuvem
- Hardening de seguranca (CSP, validacao de imports, CI audit)
- Landing page de conversao em `tooloptimizercnc.com.br`

### Medio prazo (novas features no dashboard atual)
- Calculadora de trigonometria visual
- Guia de processos especificos
- Secao de referencia de codigos G e codigos de maquinas
- Banco de dados colaborativo (parametros que funcionam vs. que nao funcionam)
- Elementos de gamificacao para engajamento diario
- Modelo freemium com features PRO

### Medio prazo (novos dashboards por classe de ferramenta)
- **Dashboard 2:** Cabeçotes com pastilhas de metal duro com revestimentos (mais complexo — dashboard separado)
- **Dashboard 3:** Brocas de metal duro
- **Outros:** Conforme demanda e feedback dos usuarios

### Longo prazo
- Integracao API com softwares CAM (exportar parametros direto para Machining Strategist/Mastercam/Fusion360)
- Expansao de materiais (titanio, Inconel, compositos)
- App mobile nativo
- Comunidade de operadores (compartilhamento de parametros validados)
- Parceria com escolas tecnicas (SENAI, ETEC) como ferramenta didatica

---

## 10. Metricas de Qualidade do Produto

| Metrica | Valor atual | Meta |
|---------|-------------|------|
| **Testes** | 824 (0 falhas) | > 800 mantidos a cada release |
| **TypeScript** | Zero erros, zero `any` | Manter 100% strict |
| **Bundle** | 99.20KB gzip (JS) | < 120KB |
| **Tempo de calculo** | < 2 segundos | < 1 segundo |
| **Uptime** | 99.9%+ (Cloudflare) | Manter |

---

## 11. Origem do Projeto

O ToolOptimizer CNC nasceu de uma observacao real no chao de fabrica. **Rafael Eleoterio**, com mais de 16 anos de experiencia como fresador e programador CNC em uma empresa de moldes para injecao de plastico, identificou que:

> *"A grande parte dos fresadores ou programadores nao realizam calculos ou sequer utilizam tabelas com algum grau de engenharia de parametros. Utilizam valores padrao para basicamente todas as ferramentas de acordo com suas classes."*

Esse problema nao era exclusivo da empresa onde trabalha — verificou o mesmo padrao em outras empresas do setor. A partir dessa constatacao, e com 2 anos de estudo autodidata em programacao, decidiu criar uma ferramenta que fosse:

- **Facil de consultar e usar** — sem curva de aprendizado
- **Com indicadores e alertas** — para tomada de decisao segura
- **Geradora de economia** — reduzir quebras e desgaste
- **Atrativa e envolvente** — interface que o operador *queira* usar diariamente
- **Educativa** — que o profissional evolua a cada interacao

Apos pesquisar solucoes existentes no mercado e nao encontrar nenhuma que atendesse todos esses criterios simultaneamente, iniciou o desenvolvimento do que viria a se tornar o ToolOptimizer CNC.

> **Visao do criador:** *"Acredito ser algo realmente inovador e unico nessa industria especifica, com possibilidade de se tornar uma solucao referencia na area — um sistema indispensavel."*

---

## Referencias Internas

| Documento | Conteudo |
|-----------|----------|
| `02-ANALISE-COMPETITIVA.md` | Analise detalhada de concorrentes |
| `03-PERSONAS-E-JORNADA.md` | Personas completas com jornada de compra |
| `06-ESTRATEGIA-CONTEUDO.md` | Estrategia MestreCNC + conteudo |
| `07-MODELO-MONETIZACAO.md` | Estrategia freemium e precificacao BR |
| `10-LANDING-PAGE-SPEC.md` | Spec da landing page de conversao |

---

*Documento baseado em dados reais do sistema v0.7.0 e contexto direto do criador (18/03/2026). Versao 2.0 — refinado com validacao item a item.*
