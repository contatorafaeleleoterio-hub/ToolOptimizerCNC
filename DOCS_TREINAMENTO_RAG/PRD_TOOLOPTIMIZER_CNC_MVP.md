# PRD - ToolOptimizer CNC (MVP)
## Product Requirements Document - Master

**Versão:** 1.0  
**Data:** 07/02/2026  
**Status:** Aprovado para Desenvolvimento  
**Autor:** Rafael Eleoterio  
**Validade:** Documento permanente (fonte única da verdade)

---

## 1. VISÃO GERAL DO PRODUTO

### 1.1 Nome e Identidade

**Nome Oficial:** ToolOptimizer CNC  
**Posicionamento:** "A ciência da usinagem, simplificada."  
**Missão:** Maximizar produtividade e vida útil de ferramentas através de cálculos científicos com foco em segurança absoluta.

### 1.2 Declaração do Problema

**Contexto Industrial:**
Operadores e programadores CNC experientes enfrentam diariamente a necessidade de calcular parâmetros de usinagem (RPM, avanço, profundidades de corte, forças, potência) de forma rápida e confiável. 

**Problema Atual:**
- Consulta manual a catálogos físicos fragmentados
- Planilhas desatualizadas ou inexistentes
- Uso de "valores padrão" sem base científica
- Cálculos mentais imprecisos
- Perda de tempo (5-15 minutos por setup)
- Risco de quebra de ferramenta ou desgaste acelerado
- Falta de conhecimento técnico para aplicar fórmulas

**Impacto:**
- Baixa produtividade
- Desperdício de ferramentas caras
- Peças refugadas
- Custos operacionais elevados
- Dependência de "gurus" locais

### 1.3 Solução Proposta

Sistema de **recomendação rápida** (decisão em ~2 segundos) de parâmetros de usinagem CNC com base em:
- Fórmulas físicas validadas (Kienzle, cinemática de corte)
- Tabelas técnicas de fabricantes (Sandvik Coromant, Kennametal, ISO 13399)
- Conhecimento empírico consolidado (CNC Oracle)

**Importante:** O sistema **recomenda**, o operador **decide**. Validação humana é obrigatória.

### 1.4 Objetivos Mensuráveis do MVP

| Métrica | Meta MVP |
|---------|----------|
| Tempo de decisão | < 2 segundos |
| Precisão de cálculos | ±15-25% (modelo simplificado) |
| Materiais suportados | 8-10 materiais mais comuns |
| Tipos de ferramenta | 3 tipos (Toroidal, Topo Reto, Esférica) |
| Usuários simultâneos | 1 (single-user, local) |
| Plataforma | Desktop (Windows/Mac/Linux) |

---

## 2. PERSONAS E PÚBLICO-ALVO

### 2.1 Persona Primária: Operador CNC Experiente

**Perfil:**
- Nome fictício: Carlos, 35 anos
- Experiência: 3-8 anos em fresamento CNC
- Função: Operador de máquina/Preparador
- Conhecimentos: Identifica materiais, ferramentas, estratégias; interpreta forças, rigidez, balanço (L/D)
- Limitação: Não é programador de software, não domina engenharia avançada

**Necessidades:**
- Decisão rápida no chão de fábrica
- Interface visual clara (cores, status)
- Confiança nos valores sugeridos
- Não quer "caixa preta" - precisa entender de onde vêm os números

**Dores:**
- Pressão por produtividade
- Medo de quebrar ferramenta cara (R$ 500-3000)
- Catálogos desatualizados ou inacessíveis
- Tabelas genéricas que não funcionam na prática

### 2.2 Persona Secundária: Programador CNC

**Perfil:**
- Nome fictício: Ana, 42 anos
- Experiência: 10+ anos em programação CAM
- Função: Programador CNC (software Mastercam/Esprit/NX)
- Conhecimentos: Estratégias avançadas, toolpath, otimização

**Necessidades:**
- Validar parâmetros antes de gerar código G
- Comparar múltiplas estratégias (desbaste vs semi vs acabamento)
- Exportar dados para integração futura com CAM

**Dores:**
- Sobrecarga de trabalho (muitos projetos simultâneos)
- Falta de tempo para consultar tabelas detalhadas
- Pressão para entregar programas "ontem"

### 2.3 Persona Terciária (Futuro - Fase 2): Gestor de Produção

**Perfil:**
- Nome fictício: Roberto, 50 anos
- Função: Supervisor/Engenheiro de Processos
- Conhecimentos: Gestão, custos, tempos de ciclo

**Necessidades (fora do MVP):**
- Análise de custos operacionais
- Comparação de cenários (material A vs B, ferramenta X vs Y)
- Relatórios de produtividade

---

## 3. ESCOPO DO MVP

### 3.1 O Que ENTRA no MVP (Fase 1)

#### 3.1.1 Funcionalidades Core

**A. Cálculo Dinâmico de Parâmetros**
- **Entradas:** Material, Ferramenta (tipo, diâmetro, raio), Operação (desbaste/semi/acabamento)
- **Parâmetros numéricos editáveis:** RPM, F (avanço mm/min), fz (avanço por dente), Vc (velocidade de corte), ap (profundidade axial), ae (profundidade radial)
- **Saídas calculadas:** RPM recomendado, F recomendado, fz efetivo, Vc efetivo, Potência (kW), Torque (Nm), MRR (taxa de remoção de material cm³/min)

**B. Reajuste Dinâmico (Feature B)**
- Botões de ajuste rápido: ±5%, ±10% para RPM e F
- Inputs numéricos diretos para ajuste fino
- Recálculo automático ao alterar RPM ou F

**C. Validação e Segurança (Feature C)**
- Sistema de 3 cores: Verde (OK), Amarelo (Aviso), Vermelho (Crítico/Bloqueado)
- Ranges por parâmetro: Mínimo - Recomendado - Máximo
- Alertas visuais quando valores excedem limites
- Validação contra limites de máquina (RPM máx: 24.000, Potência máx: 15kW)

**D. Dashboard Único**
- Interface híbrida para Operador + Programador
- 3 colunas: Configurações (esquerda), Resultados (centro), Impactos (direita, colapsável)
- Visor de resumo no centro mostrando valores usados no cálculo (incluindo número de flautas Z)

**E. Página de Configurações**
- Editar limites de máquina (RPM máx, Potência, Comprimento ferramenta, Diâmetro máx, Feed máx)
- Adicionar/editar materiais customizados (nome, ISO, dureza, Kc, densidade, Vc por operação)
- Adicionar/editar ferramentas (tipo, diâmetro, flautas, RPM max, geometria haste [inteiriça/com rebaixo], raio [se toroidal])
- Editar múltiplos fatores de correção em pontos específicos das fórmulas

#### 3.1.2 Tipos de Ferramenta Suportados

1. **Fresa Toroidal (Bull Nose)**
   - Raios padrão: R0.5, R1 (editável nas configurações para adicionar R2, R3, etc)
   - Geometria haste: Inteiriça OU Com rebaixo
   - Flautas: 4 (padrão, editável)

2. **Fresa de Topo Reto (End Mill)**
   - Geometria haste: Inteiriça OU Com rebaixo
   - Flautas: 4 (padrão, editável)

3. **Fresa Esférica (Ball Nose)**
   - Geometria haste: Inteiriça OU Com rebaixo
   - Flautas: 4 (padrão, editável)

#### 3.1.3 Materiais Suportados (Pré-carregados)

| Material | ISO | Dureza Típica |
|----------|-----|---------------|
| Aço 1020 | P | 120-160 HB |
| Aço 1045 | P | 170-220 HB |
| Aço Inox 304 | M | 140-180 HB |
| Alumínio 6061-T6 | N | 95 HB |
| P20 (tratado) | P | 280-320 HB |
| 2711 (tratado) | P | 300-340 HB |
| 8620 (núcleo) | P | 180-220 HB |
| 8620 (cementado) | H | 58-62 HRC |
| H13 (tratado) | H | 45-52 HRC |

**Nota:** Usuário pode adicionar materiais customizados via Configurações.

#### 3.1.4 Cálculos Implementados

- **Cinemática:** RPM, Vc, F (mm/min), fz
- **Geometria:** ae, ap, largura de corte efetiva, chip thinning (fator de correção)
- **Esforços:** Força de corte (Fc - modelo Kienzle 2D), Potência (P), Torque (T)
- **Rigidez:** Deflexão estimada (modelo viga simplificado), relação L/D
- **Produtividade:** MRR (taxa de remoção cm³/min)

#### 3.1.5 Stack Tecnológica

- **Frontend:** React + TypeScript + Vite
- **State Management:** Zustand ou Context API (a definir)
- **Storage:** localStorage (Fase 1 - single user)
- **Testes:** Vitest (unit tests nas fórmulas)
- **Deploy:** Build estático (servir via HTTP local ou Electron)
- **Plataforma:** Desktop (1360px min-width, tema dark obrigatório)

#### 3.1.6 Dados e Armazenamento

- **Dados pré-carregados:** JSON estático embarcado no build (Materials.json, Tools.json, Operations.json)
- **Configurações do usuário:** localStorage (limites de máquina, materiais/ferramentas customizados, fatores de correção)
- **Histórico:** Não armazena histórico no MVP (stateless entre sessões)

### 3.2 O Que FICA DE FORA do MVP (Fase 2 ou Futuro)

❌ **Funcionalidades Não Incluídas:**
- Multi-usuário / Web
- Integração com CAM (API para Mastercam, Esprit, etc)
- Histórico de cálculos / Comparação de cenários
- Geração de código G/M
- Feedback em tempo real da máquina (potência, vibração, temperatura)
- Inteligência Artificial / Machine Learning
- Tipos de ferramenta adicionais: Brocas, Machos, Cabeçotes com inserto, Mandrilhadores, Turbinas
- Materiais exóticos: Titânio, Inconel, Ligas especiais
- Modo responsivo mobile
- Múltiplos temas (apenas dark theme)
- Gamificação avançada / Sistema de pontos
- Calculadora trigonométrica, Guia de códigos G, Checklists (utilidades extras)

---

## 4. NÚCLEO MATEMÁTICO E LÓGICO

### 4.1 Fórmulas Principais

**NOTA IMPORTANTE:** As fórmulas detalhadas, unidades de medida, constantes, fontes técnicas e exemplos de cálculo serão documentadas em arquivo separado: **`FORMULAS_TECNICAS.md`**.

Este PRD lista apenas os cálculos implementados sem entrar em detalhes matemáticos.

### 4.2 Cálculos Implementados no MVP

1. **RPM (Rotação por Minuto)**
   - Baseado em Vc (velocidade de corte) e D (diâmetro da ferramenta)

2. **F (Avanço em mm/min)**
   - Baseado em RPM, Z (número de flautas), fz (avanço por dente)

3. **Vc Efetivo**
   - Velocidade de corte real considerando diâmetro efetivo

4. **fz (Avanço por Dente)**
   - Determinado por tabelas de fabricante + tipo de operação

5. **Força de Corte (Fc)**
   - Modelo Kienzle 2D (simplificado)
   - Margem de erro: ±15-25%

6. **Potência (P)**
   - Baseada em Fc e Vc
   - Validação contra potência máxima da máquina

7. **Torque (T)**
   - Calculado a partir de Fc e geometria da ferramenta

8. **MRR (Material Removal Rate)**
   - Taxa de remoção em cm³/min
   - Baseado em ap, ae, F

9. **Deflexão de Ferramenta**
   - Modelo viga em balanço (simplificado)
   - Alerta se deflexão > limite

10. **Relação L/D (Comprimento/Diâmetro)**
    - Alerta se L/D > 4 (rigidez crítica)

11. **Chip Thinning Factor (CTF)**
    - Correção de fz quando ae < 50% D

### 4.3 Unidades Padrão (Sistema Internacional)

- **Velocidade de corte (Vc):** m/min
- **Avanço (F):** mm/min
- **Avanço por dente (fz):** mm/dente
- **Profundidade axial (ap):** mm
- **Profundidade radial (ae):** mm
- **Diâmetro (D):** mm
- **RPM:** rev/min
- **Potência (P):** kW
- **Torque (T):** Nm
- **MRR:** cm³/min
- **Força (Fc):** N

### 4.4 Validações de Segurança

**Ranges de Validação (valores padrão):**

| Parâmetro | Mínimo | Máximo | Unidade |
|-----------|--------|--------|---------|
| Vc | 50 | 1000 | m/min |
| Diâmetro | 3 | 32 | mm |
| ap | 0.1 | 10 | mm |
| ae | 0.1 | 10 | mm |
| RPM | 1 | 10000* | rev/min |
| F | 1 | 2000 | mm/min |
| Potência | 0 | 15 | kW |
| MRR | 0 | 10 | cm³/min |

*RPM padrão de mercado: 0-10.000 (até 8.000 típico, 10.000 para fresas pequenas Ø2mm). Turbinas (40k-50k RPM) estão fora do escopo do MVP.

**Estados de Validação:**

| Estado | Cor | Condição | Ação |
|--------|-----|----------|------|
| ✅ OK | Verde #2ecc71 | valor ≤ Recomendado | Permite uso |
| ⚠️ AVISO | Laranja #f39c12 | Recomendado < valor < Máximo | Permite com alerta |
| 🚫 CRÍTICO | Vermelho #e74c3c | valor ≥ Máximo | Bloqueia input (read-only) |

### 4.5 Fatores de Segurança

- Fator conservador padrão: 0.7-0.8 (aplicado aos valores calculados)
- Usuário pode editar múltiplos fatores de correção nas Configurações para ajuste fino
- Fórmulas são fixas (não editáveis para evitar quebra de cálculos)

---

## 5. ARQUITETURA DE DADOS

### 5.1 Entidades Principais

#### 5.1.1 Material

```typescript
interface Material {
  id: string;              // "aco-1045"
  name: string;            // "Aço 1045"
  iso: string;             // "P" | "M" | "K" | "N" | "S" | "H"
  dureza: string;          // "170-220 HB"
  kc: number;              // Pressão de corte N/mm²
  density: number;         // g/cm³
  vc: {
    desbaste: number;      // m/min
    semi: number;
    acabamento: number;
  };
  usinabilidade: string;   // "Fácil" | "Média" | "Difícil" | etc
}
```

#### 5.1.2 Ferramenta

```typescript
interface Tool {
  id: string;              // "toroidal-10-r1"
  type: "toroidal" | "topo_reto" | "esferica";
  diameter: number;        // mm
  flutes: number;          // Z = número de arestas (padrão: 4)
  maxRPM: number;          // Rotação máxima suportada
  raio?: number;           // mm (apenas para toroidal)
  geometria_haste: "inteirица" | "com_rebaixo";
  comprimento_util?: number; // mm
}
```

#### 5.1.3 Operação

```typescript
interface Operation {
  id: string;              // "desbaste"
  name: string;            // "Desbaste"
  fzRecommended: number;   // mm/dente
  fzMax: number;           // máximo seguro
  Q_limit: number;         // MRR limite cm³/min
}
```

#### 5.1.4 Limites de Máquina

```typescript
interface MachineLimits {
  rpmMax: number;          // 24000 (padrão, editável)
  powerMax: number;        // 15 kW (padrão, editável)
  toolLengthMax: number;   // 200 mm (editável)
  diameterMax: number;     // 32 mm (editável)
  feedMax: number;         // 2000 mm/min (editável)
}
```

#### 5.1.5 Estado de Cálculo

```typescript
interface CalculationState {
  // Inputs
  materialId: string;
  toolId: string;
  operationId: string;
  diameter: number;        // mm
  vc: number;              // m/min
  ap: number;              // mm (axial)
  ae: number;              // mm (radial)
  
  // Outputs
  rpm: number | null;
  feed: number | null;     // F mm/min
  fz: number | null;
  vcEffective: number | null;
  Q: number | null;        // MRR cm³/min
  power: number | null;    // kW
  torque: number | null;   // Nm
  
  // Status
  warnings: Warning[];
  isChipThinning: boolean;
}

interface Warning {
  code: string;            // "L_D_CRITICAL" | "POWER_HIGH" | etc
  severity: "low" | "mid" | "high";
  message: string;
}
```

### 5.2 Relacionamentos

```
Material (1) ──── (N) CalculationState
Tool (1) ──── (N) CalculationState
Operation (1) ──── (N) CalculationState
MachineLimits (1) ──── (N) CalculationState (validação)
```

### 5.3 Persistência (Fase 1 - localStorage)

**Keys utilizadas:**
- `tooloptimizer:limits` - Limites de máquina customizados
- `tooloptimizer:materials` - Materiais adicionados pelo usuário
- `tooloptimizer:tools` - Ferramentas customizadas
- `tooloptimizer:correction_factors` - Fatores de correção editados

**Dados pré-carregados (embarcados no build):**
- `Materials.json` - 9 materiais base
- `Tools.json` - Ferramentas exemplo por tipo/diâmetro
- `Operations.json` - 3 operações (Desbaste, Semi, Acabamento)

---

## 6. REQUISITOS FUNCIONAIS

### 6.1 RF01 - Seleção de Material

**Prioridade:** Alta  
**Descrição:** Usuário seleciona material da peça a ser usinada  

**Critérios de Aceitação:**
- Dropdown com lista de materiais pré-carregados
- Ao selecionar material, sistema auto-popula Vc baseado em tabela
- Material selecionado fica visível no visor de resumo
- Se material não existe, usuário pode adicionar via Configurações

### 6.2 RF02 - Seleção de Ferramenta

**Prioridade:** Alta  
**Descrição:** Usuário seleciona tipo e geometria da ferramenta

**Critérios de Aceitação:**
- Dropdown para tipo (Toroidal, Topo Reto, Esférica)
- Dropdown para diâmetro disponível
- Se Toroidal: dropdown adicional para raio (R0.5, R1)
- Ao selecionar ferramenta, sistema auto-popula fz recomendado
- Número de flautas (Z) NÃO aparece no dashboard principal
- Número de flautas aparece apenas no visor de resumo (ex: "Flautas (Z): 4")

### 6.3 RF03 - Seleção de Operação

**Prioridade:** Alta  
**Descrição:** Usuário define tipo de operação

**Critérios de Aceitação:**
- Dropdown com 3 opções: Desbaste, Semi-acabamento, Acabamento
- Cada operação ajusta fz e Vc automaticamente
- Operação selecionada visível no visor de resumo

### 6.4 RF04 - Entrada de Parâmetros Numéricos

**Prioridade:** Alta  
**Descrição:** Usuário pode editar manualmente RPM, F, fz, Vc, ap, ae

**Critérios de Aceitação:**
- Inputs numéricos com validação de range
- Cada input mostra unidade (ex: "mm/min", "RPM")
- Border do input muda de cor conforme validação (verde/laranja/vermelho)
- Se valor excede Máximo, input fica read-only (bloqueado)
- Se valor entre Recomendado e Máximo, mostra alerta mas permite edição

### 6.5 RF05 - Cálculo Automático

**Prioridade:** Alta  
**Descrição:** Sistema calcula parâmetros automaticamente ao mudar inputs

**Critérios de Aceitação:**
- Ao selecionar Material/Ferramenta/Operação, cálculo dispara automaticamente
- Ao editar RPM manualmente, F recalcula automaticamente
- Ao editar F manualmente, fz recalcula automaticamente
- Resultados aparecem em tempo real (<0.5s latência)
- Outputs: RPM, F, fz, Vc, Potência, Torque, MRR

### 6.6 RF06 - Reajuste Rápido (Botões ±5%, ±10%)

**Prioridade:** Média  
**Descrição:** Usuário ajusta RPM ou F rapidamente com botões

**Critérios de Aceitação:**
- Botões ±5%, ±10% disponíveis para RPM
- Botões ±5%, ±10% disponíveis para F
- Ao clicar botão, valor atualiza e sistema recalcula automaticamente
- Slider visual (opcional) mostra posição relativa do ajuste
- Ajuste não pode ultrapassar limites de máquina (bloqueio automático)

### 6.7 RF07 - Validação de Segurança

**Prioridade:** Alta  
**Descrição:** Sistema valida parâmetros contra limites seguros

**Critérios de Aceitação:**
- Cada parâmetro (RPM, F, Potência, etc) tem range Min-Rec-Max
- Status visual: Verde (OK), Laranja (Aviso), Vermelho (Crítico)
- Se valor > Máximo, input bloqueia (read-only)
- Se Potência > 15kW, alerta crítico
- Se L/D > 4, warning de rigidez
- Avisos aparecem em painel lateral ou banner no topo

### 6.8 RF08 - Visor de Resumo

**Prioridade:** Alta  
**Descrição:** Dashboard mostra resumo consolidado no centro

**Critérios de Aceitação:**
- RPM em destaque (font 40px, bold)
- F (avanço) em destaque (font 40px, bold)
- Valores secundários: fz, Vc, Potência, Torque, MRR (font 18px)
- Número de flautas (Z) visível no resumo (ex: "Flautas: 4")
- Cards colapsáveis para valores secundários (opcional P9)
- Cores de status aplicadas (verde/laranja/vermelho)

### 6.9 RF09 - Painel de Impactos (Colapsável)

**Prioridade:** Baixa  
**Descrição:** Painel direito mostra relações entre parâmetros

**Critérios de Aceitação:**
- Painel colapsável (300px → 20px)
- Botão toggle ◀/▶
- Accordions clicáveis: "Vc → RPM", "fz → F", "ae → Cavaco", "ap → Torque"
- Conteúdo: descrição texto + fórmula (se aplicável)
- Mostra apenas impactos relevantes para parâmetros atuais

### 6.10 RF10 - Página de Configurações

**Prioridade:** Alta  
**Descrição:** Usuário personaliza sistema via Configurações

**Critérios de Aceitação:**

**Seção 1: Limites de Máquina**
- Editar RPM máximo (padrão: 24.000)
- Editar Potência máxima (padrão: 15kW)
- Editar Comprimento máximo ferramenta (padrão: 200mm)
- Editar Diâmetro máximo ferramenta (padrão: 32mm)
- Editar Feed máximo (padrão: 2000 mm/min)

**Seção 2: Materiais**
- Adicionar material customizado (campos: nome, ISO, dureza, Kc, densidade, Vc por operação)
- Editar materiais existentes
- Deletar materiais customizados (não permite deletar pré-carregados)

**Seção 3: Ferramentas**
- Adicionar ferramenta (campos: tipo, diâmetro, flautas, RPM max, geometria haste [inteiriça/com rebaixo], raio [se toroidal])
- Editar ferramentas existentes
- Deletar ferramentas customizadas

**Seção 4: Fatores de Correção**
- Múltiplos campos de fator de correção (ex: fator Vc, fator fz, fator ap, fator força, fator potência)
- Permite ajuste fino em pontos específicos das fórmulas
- Valores padrão: 1.0 (sem correção)

**Persistência:** Todas alterações salvas em localStorage

### 6.11 RF11 - Dark Theme Obrigatório

**Prioridade:** Média  
**Descrição:** Interface usa tema escuro profissional

**Critérios de Aceitação:**
- Background primário: #0f1419
- Cards: #1e2936
- Texto primário: #ecf0f1
- Cores de status: Verde #2ecc71, Laranja #f39c12, Vermelho #e74c3c
- Azul para interação: #3498db
- Header com gradiente: linear-gradient(90deg, #1e3a5f 0%, #2c5282 100%)

---

## 7. REQUISITOS NÃO FUNCIONAIS

### 7.1 RNF01 - Performance

- Cálculos executados em <0.5s
- Interface responsiva (60fps em animações)
- Build final <10MB

### 7.2 RNF02 - Usabilidade

- Tempo de aprendizado: <5 minutos para operador experiente
- Decisão completa (entrada + cálculo + validação): <2 segundos
- Interface intuitiva sem necessidade de manual
- Feedback visual imediato em todas ações

### 7.3 RNF03 - Confiabilidade

- Margem de erro nos cálculos: ±15-25% (modelo simplificado)
- Validação de inputs: 100% dos campos
- Fórmulas baseadas em fontes reconhecidas (Sandvik, Kennametal, ISO)
- Sistema não "trava" ou "quebra" com inputs inválidos

### 7.4 RNF04 - Manutenibilidade

- Código TypeScript com zero `any`, zero `@ts-ignore`
- Fórmulas documentadas com fonte técnica (JSDoc)
- Componentes modulares e reutilizáveis
- Testes unitários em fórmulas críticas (Vitest)

### 7.5 RNF05 - Segurança

- Dados locais (localStorage) não expostos na rede
- Sem transmissão de dados para servidor (Fase 1)
- Validação client-side robusta contra inputs maliciosos

### 7.6 RNF06 - Plataforma

- Desktop only (1360px min-width)
- Suporte: Windows 10+, macOS 11+, Linux (Ubuntu 20.04+)
- Browsers: Chrome 90+, Edge 90+, Firefox 88+ (se web)
- Electron: v28+ (se aplicação desktop standalone)

### 7.7 RNF07 - Acessibilidade

- Contraste mínimo WCAG AA (4.5:1 para texto)
- Navegação por teclado funcional (Tab, Enter, Esc)
- Inputs com labels semânticos

---

## 8. INTERFACE E UX

### 8.1 Estrutura de Layout (Desktop)

**Grid 3 Colunas:**

```
┌──────────────────────────────────────────────────────────┐
│  Header (60px) - Gradiente #1e3a5f → #2c5282            │
├──────────┬───────────────────────┬──────────────────────┤
│          │                       │                      │
│  Config  │      Resultados       │   Impactos (300px)   │
│ (360px)  │       (1fr)           │   [Colapsável]       │
│          │                       │                      │
│ Material │  ┌─────────────────┐  │  ▶ Vc → RPM         │
│ Ferram.  │  │  RPM: 3500      │  │  ▶ fz → F           │
│ Operação │  │  F: 850 mm/min  │  │  ▶ ae → Cavaco      │
│          │  └─────────────────┘  │  ▶ ap → Torque      │
│ RPM      │                       │                      │
│ F        │  fz: 0.08 mm/dente   │                      │
│ fz       │  Vc: 110 m/min       │                      │
│ Vc       │  Potência: 2.3 kW    │                      │
│ ap       │  Torque: 6.2 Nm      │                      │
│ ae       │  MRR: 45 cm³/min     │                      │
│          │                       │                      │
└──────────┴───────────────────────┴──────────────────────┘
```

**Estado Colapsado (Painel Impactos):**
- Coluna direita: 300px → 20px
- Toggle ◀/▶ permanece visível

### 8.2 Fluxos de Interação

#### Fluxo 1: Setup Inicial (Feature A)

1. Usuário seleciona Material → Vc auto-popula
2. Usuário seleciona Ferramenta → fz auto-popula
3. Usuário seleciona Operação → ajustes finos em Vc/fz
4. Usuário edita RPM/F/ap/ae (opcional) → Dashboard calcula
5. Outputs aparecem: RPM, F, fz, Vc, Potência, Torque, MRR
6. Status visual aplica cores (verde/laranja/vermelho)

#### Fluxo 2: Reajuste RPM (Feature B)

1. Usuário clica botão +10% RPM
2. RPM atualiza (ex: 3500 → 3850)
3. F recalcula automaticamente
4. Slider RPM move suavemente (0.3s)
5. Validação atualiza status de cor

#### Fluxo 3: Reajuste F com Alerta (Feature B + C)

1. Usuário tenta aumentar F além de Recomendado
2. Input border fica laranja
3. Banner aviso aparece: "⚠️ Avanço acima de recomendado"
4. Sistema permite confirmar (não bloqueia)
5. Se F > Máximo: border vermelho, input bloqueado (read-only)

#### Fluxo 4: Visualizar Impactos

1. Usuário clica accordion "Vc → RPM" no painel direito
2. Conteúdo expande (slideToggle 0.3s)
3. Seta rotaciona ▼ ↔ ▲
4. Mostra descrição: "Aumentar Vc resulta em RPM mais alto. Fórmula: n = (Vc × 1000) / (π × D)"

### 8.3 Estados Visuais

**Input States:**
- Default: border 1px rgba(255,255,255,0.1)
- Hover: border #3498db
- Focus: border #3498db + shadow inset
- Disabled: opacity 50%, cursor not-allowed
- Valid (OK): border #2ecc71
- Warning (Aviso): border #f39c12
- Critical (Bloqueado): border #e74c3c + read-only

**Botões:**
- Default: bg #3498db
- Hover: bg #2980b9
- Active: bg #21618c
- Disabled: bg #7f8c8d, cursor not-allowed

### 8.4 Tipografia

| Elemento | Tamanho | Peso | Uso |
|----------|---------|------|-----|
| RPM, F (Principais) | 40px (2.5rem) | 700 bold | Valores de destaque |
| fz, Vc (Secundários) | 18px (1.125rem) | 400 | Cálculos complementares |
| Labels, inputs, texto | 15px (0.9375rem) | 400 | Corpo padrão |
| Hints, unidades | 13px (0.8125rem) | 400 | Informação terciária |

**Font Stack:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`  
**Monospace (valores numéricos):** `'Courier New', 'Consolas'`

### 8.5 Espaçamento (Base-8)

| Token | Valor | Uso |
|-------|-------|-----|
| XS | 4px | Gaps internos |
| SM | 8px | Entre cards |
| MD | 12px | Padding cards |
| LG | 16px | Padding containers |
| XL | 24px | Entre seções |

### 8.6 Transições

| Caso | Duração | Easing |
|------|---------|--------|
| Hover, focus | 0.15s | ease |
| Layout, toggles | 0.3s | ease |

**Sem:** Staggered animations, glow effects, efeitos decorativos.

### 8.7 Wireframes Descritivos

**Tela Principal - Dashboard:**

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: [Logo ToolOptimizer] ────────────────── [⚙️ Config] │
├─────────────┬───────────────────────────┬───────────────────┤
│ CONFIG      │  RESULTADOS               │  IMPACTOS [◀]     │
│             │                           │                   │
│ Material ▼  │  ┌──────────────────────┐ │  ▶ Vc → RPM      │
│ [Aço 1045]  │  │  RPM                 │ │  ▶ fz → F        │
│             │  │  3500                │ │  ▶ ae → Cavaco   │
│ Ferramenta ▼│  │  [──●────────] ±10%  │ │  ▶ ap → Torque   │
│ [Toroidal]  │  └──────────────────────┘ │                  │
│ Ø10mm R1    │                           │                  │
│             │  ┌──────────────────────┐ │                  │
│ Operação ▼  │  │  F (mm/min)          │ │                  │
│ [Desbaste]  │  │  850                 │ │                  │
│             │  │  [──●────────] ±10%  │ │                  │
│ RPM: 3500   │  └──────────────────────┘ │                  │
│ F: 850      │                           │                  │
│ fz: 0.08    │  Cards:                  │                  │
│ Vc: 110     │  [fz: 0.08] [Vc: 110]    │                  │
│ ap: 1.0     │  [P: 2.3kW] [T: 6.2Nm]   │                  │
│ ae: 5.0     │  [MRR: 45 cm³/min]       │                  │
│             │                           │                  │
└─────────────┴───────────────────────────┴───────────────────┘
```

**Tela de Configurações:**

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: [Logo ToolOptimizer] ─────────────── [✕ Fechar]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CONFIGURAÇÕES                                              │
│                                                             │
│  ┌─ Limites de Máquina ────────────────────────────────┐   │
│  │ RPM Máximo:        [24000    ] RPM                  │   │
│  │ Potência Máxima:   [15       ] kW                   │   │
│  │ Comprimento Máx:   [200      ] mm                   │   │
│  │ Diâmetro Máximo:   [32       ] mm                   │   │
│  │ Feed Máximo:       [2000     ] mm/min               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─ Materiais ──────────────────────────────────────────┐  │
│  │ [+ Adicionar Material]                               │  │
│  │                                                       │  │
│  │ Aço 1045            [Editar] [✕]                     │  │
│  │ Aço 1020            [Editar] [✕]                     │  │
│  │ Inox 304            [Editar] [✕]                     │  │
│  │ ...                                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─ Ferramentas ────────────────────────────────────────┐  │
│  │ [+ Adicionar Ferramenta]                             │  │
│  │                                                       │  │
│  │ Toroidal Ø10 R1     [Editar] [✕]                    │  │
│  │ Topo Reto Ø12       [Editar] [✕]                    │  │
│  │ ...                                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─ Fatores de Correção ─────────────────────────────────┐ │
│  │ Fator Vc:          [1.0      ]                       │ │
│  │ Fator fz:          [1.0      ]                       │ │
│  │ Fator ap:          [1.0      ]                       │ │
│  │ Fator Força:       [1.0      ]                       │ │
│  │ Fator Potência:    [1.0      ]                       │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│                           [Salvar] [Cancelar]               │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. ROADMAP DE DESENVOLVIMENTO

### 9.1 Fase 1 - MVP (Prioridade ALTA)

**Objetivo:** Sistema funcional local, single-user, 3 tipos de ferramenta, 8-10 materiais.

**Sprint 1 - Setup Projeto (1 semana)**
- Configurar Vite + React + TypeScript
- Estrutura de pastas modular
- Configurar Tailwind CSS (custom dark theme)
- Setup Vitest para testes
- Configurar ESLint/Prettier (padrões strict)

**Sprint 2 - Motor de Cálculo (2 semanas)**
- Implementar fórmulas core (RPM, F, fz, Vc, Fc, P, T, MRR)
- Validar fórmulas com valores conhecidos (Sandvik, Kennametal)
- Testes unitários em todas as fórmulas
- Documentar fontes técnicas (JSDoc)
- Implementar validação de ranges

**Sprint 3 - Dados e State (1 semana)**
- Criar Materials.json, Tools.json, Operations.json
- Implementar state management (Zustand/Context)
- Persistência em localStorage
- Hook useCalculation (lógica de cálculo)
- Hook useValidation (validação de segurança)

**Sprint 4 - UI Dashboard (2 semanas)**
- Componente Header (gradiente, logo)
- Componente ConfigPanel (esquerda: Material, Ferramenta, Operação, inputs)
- Componente ResultsCenter (centro: RPM/F destaque, cards secundários)
- Componente ImpactPanel (direita: accordions colapsáveis)
- Integração state + UI
- Estados visuais (cores, validação)

**Sprint 5 - Features B e C (1 semana)**
- Botões ±5%, ±10% (RPM e F)
- Slider visual (opcional)
- Sistema de alertas (banner warnings)
- Bloqueio de inputs (read-only quando crítico)
- Painel de impactos (accordions)

**Sprint 6 - Página de Configurações (1 semana)**
- Tela de Configurações (roteamento simples)
- Edição de Limites de Máquina
- Adição/Edição de Materiais
- Adição/Edição de Ferramentas
- Edição de Fatores de Correção
- Persistência em localStorage

**Sprint 7 - Testes e Refinamento (1 semana)**
- Testes E2E (opcional: Playwright/Cypress)
- Validação com usuários reais (operadores CNC)
- Ajustes de UX baseados em feedback
- Correção de bugs
- Otimização de performance

**Sprint 8 - Deploy e Documentação (1 semana)**
- Build de produção
- Deploy local (HTTP server ou Electron)
- Documentação de uso (README.md)
- Guia de instalação
- Video tutorial (opcional)

**Total Fase 1:** ~10 semanas (2.5 meses)

### 9.2 Fase 2 - Expansão (Futuro)

**Não detalhado no MVP. Inclui:**
- Web multi-user
- Backend (Node.js + PostgreSQL)
- Autenticação e permissões
- Histórico de cálculos
- Comparação de cenários
- Tipos de ferramenta adicionais (Brocas, Machos, Insertos)
- Integração API com CAM (Mastercam, Esprit)
- Inteligência Artificial (sugestões adaptativas)
- Gamificação avançada
- Modo responsivo mobile

---

## 10. LIMITAÇÕES E RISCOS CONHECIDOS

### 10.1 Limitações Técnicas

**Modelo Simplificado de Forças:**
- Fórmula Kienzle (Fc = kc × b × h): modelo 2D
- Não captura: variação de kc com temperatura, efeito de geometria complexa, atrito dinâmico em alta velocidade
- **Impacto:** Erro de ±15-25% em Fc → potência/torque aproximados

**Rigidez Estimada:**
- Modelo viga em balanço (δ = FL³/3EI)
- Não considera: rigidez do conjunto (máquina + fixação + peça), modos de vibração dinâmicos, amortecimento
- **Impacto:** Deflexão real pode ser 2-3× maior → usuário deve validar com passe de teste

**Chip Thinning:**
- Fator de correção (CTF) baseado em tabelas empíricas (ae/D)
- Não captura: variação por geometria de ferramenta, estratégia trocoidal/adaptativa
- **Impacto:** Em HSM/HEM, valores podem precisar ajuste fino na prática

**Ausência de Feedback de Máquina:**
- Sistema não lê potência real, vibração, temperatura
- Baseado em valores nominais de catálogo
- **Impacto:** Se máquina tiver 70% da potência nominal (desgaste), sistema não detecta

### 10.2 Riscos Operacionais

| Risco | Causa | Consequência | Mitigação |
|-------|-------|--------------|-----------|
| Quebra de ferramenta | Parâmetros agressivos + fixação fraca | Perda de ferramenta, peça, tempo | Sistema usa fatores de segurança conservadores (0.7-0.8) |
| Chatter/vibração | Rigidez insuficiente + modelo simplificado | Acabamento ruim, desgaste acelerado | Alertas de L/D > 4, deflexão > limite |
| Sobrecarga de eixo | Potência calculada > potência disponível | Parada de máquina, dano ao eixo | Verificação de potência com margem 20% |
| Erro de entrada | Usuário insere dados errados (D, Z, material) | Cálculos inválidos | Validação de ranges, alertas visuais |
| Uso em condições não previstas | Máquina em mau estado, fixação inadequada | Qualquer falha acima | Disclaimers obrigatórios na UI |

### 10.3 Responsabilidade Humana Obrigatória

**Antes de usar valores do sistema:**
- Verificar estado da máquina (folgas, lubrificação, calibração)
- Confirmar fixação adequada (rigidez, área de contato, torque de aperto)
- Validar compatibilidade ferramenta-porta (batimento, cone limpo)
- Revisar valores sugeridos contra catálogo do fabricante

**Durante primeira usinagem:**
- Teste com 50-70% dos parâmetros sugeridos
- Monitorar som, vibração, temperatura, qualidade do cavaco
- Ajustar incrementalmente até condição ótima

**Decisão final:**
- Operador é único responsável por aceitar/rejeitar/ajustar parâmetros
- Sistema é ferramenta de apoio, não autoridade técnica

### 10.4 Consequências de Uso Incorreto

**Uso direto sem validação:**  
→ Risco alto de quebra, vibração, peça refugada

**Ignorar alertas visuais (Warning/Danger):**  
→ Sistema detectou condição limite, prosseguir = responsabilidade do usuário

**Entrada de dados errados:**  
→ "Garbage in, garbage out" — cálculos inválidos

**Uso em máquinas/materiais não testados:**  
→ Resultados imprevisíveis (ex: ligas exóticas, máquinas antigas com baixa rigidez)

---

## 11. CRITÉRIOS DE SUCESSO DO MVP

### 11.1 Métricas Técnicas

| Métrica | Meta | Método de Validação |
|---------|------|---------------------|
| Tempo de decisão | < 2 segundos | Teste com cronômetro (entrada → resultado) |
| Precisão de cálculos | ±15-25% | Comparar com valores Sandvik/Kennametal |
| Taxa de erro (bugs críticos) | 0 | Testes E2E antes de release |
| Performance (cálculo) | < 0.5s | Profiling no browser |
| Build size | < 10MB | Análise do bundle Vite |

### 11.2 Métricas de Usabilidade

| Métrica | Meta | Método de Validação |
|---------|------|---------------------|
| Tempo de aprendizado | < 5 minutos | Teste com 5 operadores novatos |
| Taxa de conclusão de tarefa | > 90% | Tarefa: "Calcular RPM/F para Aço 1045, Toroidal Ø10 R1, Desbaste" |
| Satisfação do usuário | > 4/5 | Questionário pós-uso (escala Likert) |
| Erros de entrada | < 5% | Log de validações falhadas |

### 11.3 Critérios de Aceitação do MVP

✅ **MVP está pronto quando:**
1. Todos os 11 Requisitos Funcionais (RF01-RF11) implementados e testados
2. Cálculos validados contra tabelas Sandvik/Kennametal (margem ±15-25%)
3. Interface funcional em desktop (Chrome, Edge, Firefox)
4. Configurações persistem em localStorage sem perda de dados
5. Sistema não "trava" com inputs inválidos
6. Feedback visual (cores) funcionando em 100% dos casos
7. Testes com 3+ operadores CNC reais com aprovação
8. Documentação de uso completa (README + video)

---

## 12. GLOSSÁRIO TÉCNICO

| Termo | Definição |
|-------|-----------|
| **RPM** | Rotações por minuto (rev/min) |
| **Vc** | Velocidade de corte (m/min) |
| **F** | Avanço da ferramenta (mm/min) |
| **fz** | Avanço por dente (mm/dente) |
| **ap** | Profundidade de corte axial (mm) |
| **ae** | Profundidade de corte radial (mm) |
| **Z** | Número de flautas/arestas da ferramenta |
| **D** | Diâmetro da ferramenta (mm) |
| **Fc** | Força de corte (N) |
| **P** | Potência consumida (kW) |
| **T** | Torque (Nm) |
| **MRR** | Material Removal Rate - Taxa de remoção (cm³/min) |
| **Kc** | Pressão específica de corte (N/mm²) |
| **L/D** | Relação comprimento/diâmetro (indicador de rigidez) |
| **CTF** | Chip Thinning Factor - Fator de correção para cavaco fino |
| **ISO** | Classificação de materiais (P, M, K, N, S, H) |
| **HSM** | High Speed Machining - Usinagem de alta velocidade |
| **HEM** | High Efficiency Milling - Fresamento de alta eficiência |
| **HB** | Dureza Brinell |
| **HRC** | Dureza Rockwell C |

---

## 13. REFERÊNCIAS TÉCNICAS

### 13.1 Fabricantes e Normas

- Sandvik Coromant - Modern Metal Cutting 2023
- Kennametal - Milling Catalog 2024
- Seco Tools - Milling Application Guide 2023
- ISO 13399 - Cutting tool data representation
- ISO 513 - Classification and application of hard cutting materials

### 13.2 Documentos Relacionados

- **FORMULAS_TECNICAS.md** (em desenvolvimento) - Detalhamento matemático completo
- **UI-SPEC.md** (existente) - Especificações visuais detalhadas
- **ARCH.md** (existente) - Arquitetura do sistema
- **DATA-SCHEMA.md** (existente) - Estruturas de dados TypeScript

### 13.3 Repositório e Projeto

- **GitHub:** [em breve]
- **Site Institucional:** mestrecnc.com.br (conteúdo educacional)
- **Nome do Projeto:** ToolOptimizer CNC
- **Criador:** Rafael Eleoterio

---

## 14. HISTÓRICO DE VERSÕES

| Versão | Data | Autor | Alterações |
|--------|------|-------|------------|
| 1.0 | 07/02/2026 | Rafael Eleoterio | Versão inicial aprovada - Master PRD |

---

## 15. APROVAÇÃO

**Status:** ✅ **APROVADO PARA DESENVOLVIMENTO**

Este documento representa a **fonte única da verdade** para o desenvolvimento do ToolOptimizer CNC MVP. Qualquer alteração deve ser documentada e versionada.

**Próximos Passos:**
1. Revisão final com time de desenvolvimento
2. Validação de fórmulas com especialistas CNC
3. Início Sprint 1 (Setup Projeto)

---

**Documento gerado por:** Claude (Anthropic)  
**Baseado em:** Sessão de entrevista completa com Rafael Eleoterio  
**Formato:** Markdown (.md)  
**Uso:** Desenvolvimento de software | Documentação técnica | Especificação de produto

---

_"A ciência da usinagem, simplificada."_  
**ToolOptimizer CNC** - Sistema de Recomendação de Parâmetros de Usinagem
