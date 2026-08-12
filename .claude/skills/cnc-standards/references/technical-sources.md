# Fontes Técnicas CNC - Ordem de Prioridade

Hierarquia de fontes confiáveis para validação de fórmulas e parâmetros de usinagem.

## Ordem de Confiabilidade

### 🥇 NÍVEL 1: Catálogos de Fabricantes (MAIS CONFIÁVEL)

**Por que priorizar:**
- Dados de testes práticos
- Atualizado com tecnologia atual
- Validado em aplicações reais
- Específico para ferramentas modernas

#### Fabricantes Top Tier

**1. Sandvik Coromant**
- **Handbook:** Coromant Cutting Tools Handbook
- **Digital:** CoroPlus ToolGuide
- **URL:** sandvik.coromant.com
- **Força:** Torneamento, fresamento, furação
- **Atualização:** Anual

**2. Kennametal**
- **Handbook:** Master Catalog + Technical Guide
- **Digital:** KOR (Keep Out Radius) Calculator
- **URL:** kennametal.com
- **Força:** Aplicações pesadas, metal duro
- **Atualização:** Anual

**3. Iscar**
- **Handbook:** Iscar Reference Guide
- **Digital:** ITA (Iscar Tool Advisor)
- **URL:** iscar.com
- **Força:** Ferramentas especiais, alta performance
- **Atualização:** Bianual

**4. Mitsubishi Materials**
- **Handbook:** General Catalog + Technical Data
- **Digital:** Web calculators
- **URL:** mitsubishicarbide.com
- **Força:** Acabamento fino, HSM
- **Atualização:** Anual

**5. Seco Tools**
- **Handbook:** Main Catalog
- **Digital:** MySeco portal
- **URL:** secotools.com
- **Força:** Aplicações aeroespaciais
- **Atualização:** Anual

#### Outros Fabricantes Confiáveis

- **Walter Tools** - GPS (General Purpose System)
- **Sumitomo Electric** - Igetalloy tools
- **Kyocera** - Cerâmica e cermet
- **Tungaloy** - Inserts especiais
- **Guhring** - Brocas e ferramentas rotativas
- **OSG** - Machos e fresas

**Como citar:**
```
// Fonte: Sandvik Coromant Handbook 2024, p.142, Tabela 6.3
// Validado: Material P2.2 (aço carbono), operação torneamento
```

### 🥈 NÍVEL 2: Normas Internacionais

**ISO (International Organization for Standardization)**
- ISO 3685 - Teste de vida de ferramenta
- ISO 513 - Classificação de materiais
- ISO 1832 - Identificação de inserts
- ISO 841 - Sistemas de coordenadas CNC

**ANSI (American National Standards Institute)**
- ANSI B212 - Identificação de ferramentas
- ANSI B94 - Terminologia de corte

**DIN (Deutsches Institut für Normung)**
- DIN 6580 - Processos de usinagem
- DIN 69871 - Interfaces de ferramentas

**JIS (Japanese Industrial Standards)**
- JIS B 0170 - Nomenclatura CNC

**Como citar:**
```
// Fonte: ISO 3685:1993 - Tool Life Testing
// Aplicável: Condições padrão de teste
```

### 🥉 NÍVEL 3: Handbooks Técnicos

**Machining Data Handbook (MDH)**
- **Editora:** Machinability Data Center
- **Edição atual:** 3rd Edition (1980) - dados base ainda válidos
- **Conteúdo:** Tabelas extensivas de Vc, feed, ap
- **Uso:** Consulta de valores típicos

**Machinery's Handbook**
- **Editora:** Industrial Press
- **Edição atual:** 32nd Edition
- **Conteúdo:** Fórmulas fundamentais, conversões
- **Uso:** Referência geral de engenharia

**Metal Cutting Theory and Practice**
- **Autor:** David A. Stephenson, John S. Agapiou
- **Editora:** CRC Press
- **Edição:** 3rd Edition (2016)
- **Uso:** Fundamentação teórica

**Como citar:**
```
// Fonte: Machining Data Handbook 3rd Ed., Section 10, p.450
// Nota: Valores base, ajustar conforme ferramenta moderna
```

### 📚 NÍVEL 4: Literatura Acadêmica

**Journals Reconhecidos:**
- International Journal of Machine Tools and Manufacture
- Journal of Manufacturing Science and Engineering (ASME)
- CIRP Annals - Manufacturing Technology

**Livros Técnicos:**
- "Manufacturing Processes for Engineering Materials" (Kalpakjian)
- "Fundamentals of Machining and Machine Tools" (Boothroyd)

**Como citar:**
```
// Fonte: Tlusty, J. (2000). Manufacturing Processes, p.234
// Contexto: Modelo teórico, validar com dados práticos
```

### ⚠️ NÍVEL 5: Fontes Secundárias (usar com cautela)

**Calculadoras Online:**
- Úteis para comparação
- Validar algoritmo
- Nunca como fonte primária

**Fóruns e Comunidades:**
- Practical Machinist
- CNCZone
- Reddit r/Machinists
- Usar apenas para insights, nunca como fonte definitiva

**Blogs e Artigos:**
- CNC Cookbook (G-Wizard)
- Harvey Performance (Helical Solutions)
- Verificar sempre com fonte primária

## Hierarquia de Decisão

**Quando há conflito entre fontes:**

```
1. Catálogo fabricante (2024) > Handbook (1980)
   → Usar catálogo (tecnologia atual)

2. Sandvik (torneamento) vs Guhring (furação)
   → Usar fonte especializada na operação

3. ISO + Kennametal (mesmo valor) vs Machining Handbook (diferente)
   → Usar ISO + fabricante (2 fontes convergem)

4. Fórmula teórica vs Tabela prática
   → Preferir tabela (validada empiricamente)
   → Usar fórmula se tabela não cobrir caso
```

## Template de Citação Completa

```javascript
/**
 * Cálculo: Velocidade de Corte (Vc)
 * 
 * Fórmula: Vc = (π × D × n) / 1000
 * 
 * VALIDAÇÃO TÉCNICA:
 * - Fonte primária: Sandvik Coromant Handbook 2024, p.142, Tabela 6.3
 * - Fonte secundária: ISO 3685:1993 (metodologia de teste)
 * - Aplicável: Torneamento, material P (aço), ferramenta metal duro
 * 
 * UNIDADES:
 * - Vc: m/min (metros por minuto)
 * - D: mm (milímetros)
 * - n: RPM (rotações por minuto)
 * 
 * RANGES VÁLIDOS:
 * - Aço C45: Vc = 180-250 m/min (desbaste)
 * - Aço C45: Vc = 250-350 m/min (acabamento)
 * 
 * VALIDADO: 2025-01-09 - Rafael Mestre
 * REVISÃO: Trimestral (próxima: 2025-04-09)
 */
```

## Processo de Validação

### Checklist Obrigatório

Antes de implementar qualquer fórmula:

- [ ] Identificada fonte primária (fabricante ou norma)
- [ ] Verificada edição/ano da fonte
- [ ] Confirmadas unidades de medida
- [ ] Validados ranges de aplicação
- [ ] Testado com valores conhecidos
- [ ] Comparado com 2+ calculadoras comerciais
- [ ] Documentada no código
- [ ] Revisão agendada

### Teste de Validação

**Exemplo: Validar fórmula RPM**

```javascript
// TESTE DE VALIDAÇÃO
// Caso conhecido: Sandvik Handbook 2024, Exemplo 3.1
// Material: Aço AISI 1045 (P2.2)
// Ferramenta: CNMG 120408 metal duro
// Operação: Torneamento desbaste
// Vc recomendado: 200 m/min
// Diâmetro: 50 mm
// RPM esperado: 1273 RPM

const teste = {
  diametro: 50,
  velocidadeCorte: 200
};

const rpm = calcularRPM(teste.diametro, teste.velocidadeCorte);
console.assert(
  Math.abs(rpm - 1273) < 5,
  'Divergência significativa da fonte'
);
// ✅ Resultado: 1273 RPM - VALIDADO
```

## Atualização de Fontes

**Frequência de revisão:**
- Catálogos fabricantes: **Anual** (geralmente Q1)
- Normas ISO/ANSI: **A cada 5 anos**
- Handbooks: **Por edição** (verificar lançamentos)
- Literatura acadêmica: **Contínuo** (papers recentes)

**Alerta de atualização:**
```javascript
// ALERTA: Fonte desatualizada
// Última verificação: 2023-01-15
// Próxima revisão: VENCIDA
// Ação: Verificar nova edição Sandvik 2025
```

## Fontes por Operação

### Torneamento
1. Sandvik Coromant
2. Kennametal
3. Mitsubishi Materials

### Fresamento
1. Kennametal
2. Seco Tools
3. Walter Tools

### Furação
1. Guhring
2. OSG
3. Sandvik Coromant

### Rosqueamento
1. OSG
2. Emuge-Franken
3. Sandvik Coromant

### HSM (High Speed Machining)
1. Mitsubishi Materials
2. Seco Tools
3. Iscar

---

**Última Atualização:** 10/01/2025 - Rafael Mestre
**Próxima Revisão:** 10/04/2025
