# ESPECIFICAÇÃO TÉCNICA - VELOCIDADES DE CORTE PARA SISTEMA CNC
## Dados Validados para Product Requirements Document (PRD)

**Versão:** 1.0  
**Data:** 07/02/2026  
**Status:** Pronto para Implementação (com ressalvas)

---

## 📋 RESUMO EXECUTIVO

Este documento fornece velocidades de corte (Vc) validadas para 9 materiais específicos, destinadas à implementação em sistema de cálculo de parâmetros de usinagem CNC. Os dados foram obtidos através de pesquisa em fontes técnicas primárias e classificados por nível de confiabilidade.

**Cobertura dos Dados:**
- ✅ 6 materiais com **alta confiabilidade** (fontes primárias múltiplas)
- ⚠️ 2 materiais com **confiabilidade média** (dados limitados mas consistentes)
- ❌ 1 material **sem dados validados** (requer investigação adicional)

---

## 🎯 TABELA PRINCIPAL - VELOCIDADES DE CORTE (Vc em m/min)

| Material | ISO | Dureza | Desbaste | Semi-Acabamento | Acabamento | Confiabilidade |
|----------|-----|--------|----------|-----------------|------------|----------------|
| **Aço 1020** | P | 120-160 HB | 185-250 | 220-280 | 250-350 | ✅ ALTA |
| **Aço 1045** | P | 170-220 HB | 150-200 | 180-240 | 200-280 | ✅ ALTA |
| **Inox 304** | M | 140-180 HB | 60-90 | 80-120 | 100-150 | ✅ ALTA |
| **Al 6061-T6** | N | ~95 HB | 400-600 | 500-800 | 600-1000 | ✅ ALTA |
| **P20** | P | 280-320 HB | 100-120 | 120-180 | 150-200 | ✅ ALTA |
| **2711** | P | 300-340 HB | ⚠️ N/D* | ⚠️ N/D* | ⚠️ N/D* | ❌ BAIXA |
| **8620 núcleo** | P | 180-220 HB | 120-180 | 150-220 | 180-250 | ⚠️ MÉDIA |
| **8620 cementado** | H | 58-62 HRC | 60-90** | 80-120** | 100-150** | ⚠️ MÉDIA-BAIXA |
| **H13** | H | 45-52 HRC | 80-125 | 100-150 | 125-170 | ✅ ALTA |

**Legendas:**
- *N/D = Não Disponível (usar P20 -15% como fallback temporário)
- ** = Estimativa por analogia técnica (validação prática obrigatória)

---

## 📊 ESPECIFICAÇÕES DETALHADAS POR MATERIAL

### 1️⃣ AÇO 1020 (ABNT/AISI 1020)

**Classificação ISO:** P (Aços de baixo carbono)  
**Dureza:** 120-160 HB  
**Confiabilidade:** ✅ ALTA

| Operação | Vc (m/min) | Fonte Principal | Condições |
|----------|------------|-----------------|-----------|
| **Desbaste** | 185-250 | Machining Doctor (2024) | Metal duro PVD, refrigeração |
| **Semi-Acabamento** | 220-280 | FM Carbide Guide | Metal duro revestido |
| **Acabamento** | 250-350 | Kennametal KC610M/633M | Profundidade reduzida |

**Ferramentas Recomendadas:**
- Metal duro com revestimento PVD (TiAlN, TiCN)
- Geometria positiva para acabamento

**Observações Técnicas:**
- Material de usinabilidade excelente
- Permite altas velocidades com ferramentas adequadas
- Refrigeração melhora acabamento e vida da ferramenta

---

### 2️⃣ AÇO 1045 (ABNT/AISI 1045)

**Classificação ISO:** P (Aços de médio carbono)  
**Dureza:** 170-220 HB  
**Confiabilidade:** ✅ ALTA

| Operação | Vc (m/min) | Fonte Principal | Condições |
|----------|------------|-----------------|-----------|
| **Desbaste** | 150-200 | FM Carbide Guide | TiAlN/AlTiN, alta pressão |
| **Semi-Acabamento** | 180-240 | Machining Data Handbook | Ferramentas revestidas |
| **Acabamento** | 200-280 | PMC Journal (Academic) | Metal duro/cerâmica |

**Ferramentas Recomendadas:**
- Metal duro com revestimento TiAlN ou AlTiN
- Refrigeração de alta pressão recomendada

**Observações Técnicas:**
- Maior carbono que 1020 → velocidades mais conservadoras
- ⚠️ **Atenção ao work-hardening** durante usinagem
- Valores superiores possíveis com insertos cerâmicos

---

### 3️⃣ AÇO INOX 304 (AISI 304 Austenítico)

**Classificação ISO:** M (Aços inoxidáveis)  
**Dureza:** 140-180 HB  
**Confiabilidade:** ✅ ALTA

| Operação | Vc (m/min) | Fonte Principal | Condições |
|----------|------------|-----------------|-----------|
| **Desbaste** | 60-90 | Machining Doctor (2024) | PVD, refrigeração abundante |
| **Semi-Acabamento** | 80-120 | Harvey Performance | TiAlN/TiCN, ≥70 bar |
| **Acabamento** | 100-150 | TiRapid CNC (2025) | Refrigeração sintética |

**Ferramentas Recomendadas:**
- Metal duro com substrato semi-hard e revestimento PVD
- Geometria reforçada (inox é abrasivo)
- Refrigeração de alta pressão (≥70 bar) **essencial**

**⚠️ ALERTAS CRÍTICOS:**
- **Work-hardening severo** - chip load inadequado destrói ferramenta
- **Evitar rubbing** (falta de avanço) a qualquer custo
- Velocidades baixas comparadas a outros aços
- Material gera calor intenso - refrigeração não-negociável

---

### 4️⃣ ALUMÍNIO 6061-T6

**Classificação ISO:** N (Metais não-ferrosos)  
**Dureza:** ~95 HB  
**Confiabilidade:** ✅ ALTA

| Operação | Vc (m/min) | Fonte Principal | Condições |
|----------|------------|-----------------|-----------|
| **Desbaste** | 400-600 | Machining Doctor (2024) | DLC/não-revestido, alta rotação |
| **Semi-Acabamento** | 500-800 | Multiple Industry Sources | DLC ou PCD |
| **Acabamento** | 600-1000 | Harvey Performance | PCD para máxima performance |

**Ferramentas Recomendadas:**
- Metal duro não-revestido ou com DLC coating
- **PCD (Polycrystalline Diamond)** para produção contínua
- Alta rotação (>10,000 RPM comum)

**Observações Técnicas:**
- Material permite **velocidades muito altas**
- Refrigeração importante mesmo com altas Vc
- Evitar BUE (Built-Up Edge) com parâmetros corretos
- Cavacos longos - considerar quebra-cavacos

---

### 5️⃣ P20 (Aço para Moldes)

**Classificação ISO:** P (Aços para moldes pré-endurecidos)  
**Dureza:** 280-320 HB (28-32 HRC típico)  
**Confiabilidade:** ✅ ALTA

| Operação | Vc (m/min) | Fonte Principal | Condições |
|----------|------------|-----------------|-----------|
| **Desbaste** | 100-120 | ScienceDirect (2021) | Fresa Ø10mm, 4 arestas |
| **Semi-Acabamento** | 120-180 | MDPI Optimization (2023) | ap: 0.12-0.16mm |
| **Acabamento** | 150-200 | Academia.edu/MDPI | fz: 0.05 mm/tooth |

**Ferramentas Recomendadas:**
- Metal duro revestido com geometria para aços
- Insertos com chip breaker adequado

**Observações Técnicas:**
- Fornecido **pré-endurecido** (28-32 HRC)
- Não confundir com P20 totalmente endurecido (>45 HRC)
- Ra <1.6 μm alcançável na faixa de acabamento
- Material bem estudado - dados confiáveis

---

### 6️⃣ DIN 2711 / AISI 2711 (Aço para Moldes)

**Classificação ISO:** P (Aços para moldes)  
**Dureza:** 300-340 HB  
**Confiabilidade:** ❌ BAIXA

| Operação | Vc (m/min) | Status | Alternativa |
|----------|------------|--------|-------------|
| **Desbaste** | ⚠️ **DADO NÃO ENCONTRADO** | N/D | Usar P20 -15%: ~85-105 m/min |
| **Semi-Acabamento** | ⚠️ **DADO NÃO ENCONTRADO** | N/D | Usar P20 -15%: ~100-150 m/min |
| **Acabamento** | ⚠️ **DADO NÃO ENCONTRADO** | N/D | Usar P20 -15%: ~125-170 m/min |

**🔴 AÇÕES OBRIGATÓRIAS:**
1. **Contactar fornecedor do material** para datasheet técnico
2. **Contactar fabricantes de ferramentas** (Sandvik, Kennametal, Seco, Iscar)
3. **Realizar testes práticos documentados** antes de produção
4. Usar valores de P20 reduzidos em 15% como **baseline inicial conservadora**

**Motivo da Lacuna:**
- Material não encontrado em catálogos de fabricantes principais
- Possível nomenclatura regional ou específica de fornecedor
- Pode ser designação alternativa de material similar

**⚠️ NÃO USAR EM PRODUÇÃO** sem validação prática prévia

---

### 7️⃣ 8620 NÚCLEO (Condição Recozida/Normalizada)

**Classificação ISO:** P (Aços liga)  
**Dureza:** 180-220 HB  
**Confiabilidade:** ⚠️ MÉDIA

| Operação | Vc (m/min) | Fonte Principal | Condições |
|----------|------------|-----------------|-----------|
| **Desbaste** | 120-180 | VMT CNC Guide (2025) | TiAlN, condição recozida |
| **Semi-Acabamento** | 150-220 | Fuhong Steel (2025) | Metal duro revestido |
| **Acabamento** | 180-250 | ScienceDirect (2006) | TiN/TiAlN inserts |

**Ferramentas Recomendadas:**
- Metal duro revestido TiAlN
- Geometria padrão para aços

**Observações Técnicas:**
- Material relativamente macio na condição recozida/normalizada
- Permite velocidades moderadas-altas
- Dados de fresamento limitados (maioria foca torneamento)
- **Validação prática recomendada**

---

### 8️⃣ 8620 CEMENTADO (Case Hardened)

**Classificação ISO:** H (Aços endurecidos)  
**Dureza:** 58-62 HRC (camada cementada)  
**Confiabilidade:** ⚠️ MÉDIA-BAIXA

| Operação | Vc (m/min) | Fonte | Condições |
|----------|------------|-------|-----------|
| **Desbaste** | 60-90** | Fuhong Steel + estimativa | TiAlN, redução -30-40% |
| **Semi-Acabamento** | 80-120** | Estimativa por analogia | Alta resistência desgaste |
| **Acabamento** | 100-150** | Estimativa (H13 similar) | **CBN recomendado** |

** = Valores estimados por analogia técnica

**Ferramentas Recomendadas:**
- **CBN (Cubic Boron Nitride)** para melhores resultados
- Metal duro microgranular como alternativa
- Insertos com revestimento de altíssima dureza

**🔴 ALERTAS CRÍTICOS:**
- Camada cementada (58-62 HRC) é **extremamente dura e abrasiva**
- Núcleo permanece macio (28-35 HRC) - **estratégia híbrida necessária**
- **Considerar retificação** como alternativa para acabamento
- Desgaste acelerado de ferramentas convencionais
- **Validação prática OBRIGATÓRIA** antes de produção

**Considerações Especiais:**
- Avaliar viabilidade técnica-econômica: fresamento vs. retificação
- Documentar profundidade da camada cementada (típico: 0.5-2mm)
- CBN pode ser mais econômico no longo prazo apesar do custo inicial

---

### 9️⃣ H13 (Aço Ferramenta Endurecido)

**Classificação ISO:** H (Aços endurecidos/ferramenta)  
**Dureza:** 45-52 HRC (tratado termicamente)  
**Confiabilidade:** ✅ ALTA

| Operação | Vc (m/min) | Fonte Principal | Condições |
|----------|------------|-----------------|-----------|
| **Desbaste** | 80-125 | Machining Doctor (2024) | Condições estáveis, limite inferior |
| **Semi-Acabamento** | 100-150 | ASME Journal (1998) | Metal duro microgranular |
| **Acabamento** | 125-170 | ScienceDirect (2025) | P10/P20 grades, conservador |

**Ferramentas Recomendadas:**
- Metal duro microgranular com revestimento
- **PCBN (Polycrystalline CBN)** para alta performance
- Insertos cerâmicos para casos específicos

**Observações Técnicas:**
- Material muito estudado - dados abundantes e confiáveis
- Desgaste de flanco é principal limitador de vida da ferramenta
- Velocidades excessivas (>250 m/min) podem causar **white layer** (alteração microestrutural)
- PCBN apresenta melhor performance que metal duro em muitos casos

**⚠️ Cuidados Especiais:**
- H13 endurecido (45-52 HRC) é desafiador para fresamento
- Estratégia de corte crítica para evitar danos à peça
- Monitorar temperatura de corte constantemente

---

## 🔧 CONDIÇÕES GERAIS DE APLICAÇÃO

### Ferramentas por Tipo de Material

| Grupo ISO | Material | Ferramenta Recomendada | Revestimento |
|-----------|----------|------------------------|--------------|
| **P** | Aços | Metal duro | CVD/PVD (TiAlN, TiCN) |
| **M** | Inoxidáveis | Metal duro reforçado | PVD, geometria especial |
| **N** | Alumínio | Metal duro/PCD | Não-revestido, DLC, PCD |
| **H** | Endurecidos | Metal duro micro/CBN | Alta dureza, cerâmica |

### Refrigeração Recomendada

| Material | Tipo | Pressão | Observações |
|----------|------|---------|-------------|
| Aços P | Emulsão/sintético | 40-60 bar | Padrão |
| Inox 304 | Sintético | **≥70 bar** | Alta pressão obrigatória |
| Alumínio | Emulsão | 40-60 bar | Evitar BUE |
| Endurecidos H | Abundante ou seco | Variável | Depende da estratégia |

### Estratégias de Corte

| Operação | Objetivo | Parâmetros Típicos |
|----------|----------|-------------------|
| **Desbaste** | Máxima remoção | ap alto, ae moderado, Vc conservador |
| **Semi-Acabamento** | Equilíbrio | ap médio, ae médio, Vc moderado |
| **Acabamento** | Qualidade superficial | ap baixo, ae baixo, Vc alto, fz reduzido |

---

## ⚙️ IMPLEMENTAÇÃO NO SISTEMA

### 1. Estrutura de Dados Sugerida

```json
{
  "material": {
    "id": "1020",
    "nome": "Aço 1020",
    "iso_class": "P",
    "dureza_hb": {"min": 120, "max": 160},
    "velocidades": {
      "desbaste": {"vc_min": 185, "vc_max": 250},
      "semi_acabamento": {"vc_min": 220, "vc_max": 280},
      "acabamento": {"vc_min": 250, "vc_max": 350}
    },
    "confiabilidade": "ALTA",
    "observacoes": "Material de excelente usinabilidade",
    "alertas": []
  }
}
```

### 2. Fatores de Segurança Recomendados

**Para primeira implementação:**
- Usar **limite inferior** da faixa de Vc
- Aplicar fator de segurança de **0.8x** (redução de 20%)
- Incrementar gradualmente após validação prática

**Exemplo:**
- P20 Desbaste: 100-120 m/min
- Valor inicial sistema: 100 × 0.8 = **80 m/min**
- Incrementar até 100-120 após testes bem-sucedidos

### 3. Ajustes por Condição da Máquina

**Reduzir Vc em 20-30% quando:**
- ❌ Máquina com folgas ou desgastada
- ❌ Overhang da ferramenta >3× diâmetro
- ❌ Fixação não-ideal da peça
- ❌ Refrigeração inadequada ou ausente
- ❌ Operador sem experiência

**Manter Vc nominal quando:**
- ✅ Máquina em bom estado
- ✅ Fixação rígida
- ✅ Overhang mínimo (<2.5× diâmetro)
- ✅ Refrigeração adequada
- ✅ Operador treinado

### 4. Sistema de Validação

```python
# Pseudocódigo para validação
def calcular_vc(material, operacao, condicoes_maquina):
    # Buscar valores base
    vc_range = database.get_vc(material, operacao)
    
    # Aplicar fator de segurança inicial
    vc_inicial = vc_range.min * 0.8
    
    # Ajustar por condições
    if condicoes_maquina.qualidade < "BOA":
        vc_inicial *= 0.75
    
    # Verificar alertas
    alertas = database.get_alertas(material)
    if alertas:
        exibir_avisos(alertas)
    
    # Verificar confiabilidade
    if database.get_confiabilidade(material) == "BAIXA":
        require_confirmacao_engenharia()
    
    return vc_inicial
```

---

## 🚨 ALERTAS E RESTRIÇÕES CRÍTICAS

### 🔴 BLOQUEADORES - NÃO USAR EM PRODUÇÃO

| Material | Situação | Ação Obrigatória |
|----------|----------|------------------|
| **2711** | Dados não encontrados | Validar com fornecedor + testes práticos |
| **8620 cementado** | Estimativa por analogia | Validação prática + considerar CBN |

### ⚠️ ATENÇÃO ESPECIAL REQUERIDA

| Material | Alerta | Medidas de Mitigação |
|----------|--------|----------------------|
| **304 Inox** | Work-hardening severo | Chip load adequado, sem rubbing, refrigeração ≥70bar |
| **H13** | White layer em Vc alta | Não exceder limite superior, monitorar temperatura |
| **6061-T6** | BUE (Built-Up Edge) | Parâmetros corretos, refrigeração adequada |

### ℹ️ VALIDAÇÃO RECOMENDADA

| Material | Motivo | Prioridade |
|----------|--------|-----------|
| **8620 núcleo** | Dados limitados de fresamento | Média |
| **P20** | Confirmar condição (pré-endurecido vs endurecido) | Média |
| **1045** | Variação por lote/tratamento | Baixa |

---

## 📚 FONTES E REFERÊNCIAS

### Fabricantes de Ferramentas (Fontes Primárias)
1. **Sandvik Coromant** - Modern Metal Cutting, Technical Guides
2. **Kennametal** - Milling Guides, Speed and Feed Recommendations  
3. **Seco Tools** - Machining Navigator
4. **Iscar** - Technical Catalogs

### Bases Técnicas Especializadas
1. **Machining Doctor** (machiningdoctor.com) - Data Sheets 2024
2. **FM Carbide** - Material Technical Guides
3. **Machinery's Handbook** - 27th Edition (referenced)
4. **Machining Data Handbook** - 3rd Edition (referenced)

### Literatura Acadêmica e Científica
1. **PMC Journal** - Machinability Study Hardened Steel
2. **ScienceDirect** - Multiple studies (P20, H13, 8620, 2021-2025)
3. **MDPI** - Multi-objective Optimization Studies (2023)
4. **ASME Journal** - Tool Wear in Hardened Die Steel (1998)

### Fontes Industriais de Validação
1. **Practical Machinist Forums** - Validação prática de campo
2. **Harvey Performance** - In The Loupe Technical Articles
3. **Industrial Suppliers** - Technical Documentation

---

## 📊 RESUMO ESTATÍSTICO

### Distribuição de Confiabilidade

| Nível | Quantidade | Materiais | % Cobertura |
|-------|------------|-----------|-------------|
| ✅ **ALTA** | 6 | 1020, 1045, 304, 6061, P20, H13 | 67% |
| ⚠️ **MÉDIA** | 2 | 8620 núcleo, 8620 cementado | 22% |
| ❌ **BAIXA** | 1 | 2711 | 11% |

### Faixas de Velocidade por Grupo ISO

| Grupo | Materiais | Vc Mínimo | Vc Máximo | Observação |
|-------|-----------|-----------|-----------|------------|
| **N** (Não-ferrosos) | Al 6061 | 400 | 1000 | Velocidades muito altas |
| **P** (Aços) | 1020, 1045, P20, 8620 | 100 | 350 | Faixa ampla |
| **M** (Inoxidáveis) | 304 | 60 | 150 | Velocidades baixas |
| **H** (Endurecidos) | H13, 8620 cem. | 60 | 170 | Velocidades reduzidas |

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Antes de Usar em Produção

- [ ] **Material 2711:** Obter dados validados ou substituir por material conhecido
- [ ] **Todas as velocidades:** Iniciar com valores -20% do limite inferior
- [ ] **Sistema:** Implementar alertas para materiais de confiabilidade média/baixa
- [ ] **Operadores:** Treinar em conceitos básicos de parâmetros de corte
- [ ] **Máquinas:** Verificar estado e capacidade (rotação, potência, rigidez)
- [ ] **Ferramentas:** Confirmar disponibilidade de ferramentas recomendadas
- [ ] **Refrigeração:** Sistema adequado (especialmente para 304 - ≥70 bar)

### Durante Testes Iniciais

- [ ] Documentar formação de cavacos
- [ ] Medir temperatura de corte (se possível)
- [ ] Verificar acabamento superficial
- [ ] Monitorar desgaste da ferramenta
- [ ] Registrar potência consumida
- [ ] Avaliar estabilidade do processo

### Após Validação

- [ ] Atualizar banco de dados com valores reais
- [ ] Documentar desvios entre teórico e real
- [ ] Estabelecer faixas de trabalho confirmadas
- [ ] Criar procedimentos operacionais padrão
- [ ] Implementar sistema de feedback contínuo

---

## 🔄 MANUTENÇÃO E ATUALIZAÇÃO

### Frequência de Revisão
- **Trimestral:** Revisar materiais de confiabilidade média/baixa
- **Semestral:** Atualizar com dados práticos coletados
- **Anual:** Verificar lançamentos de novos grades de ferramenta
- **Ad-hoc:** Quando houver problemas de processo

### Fontes de Atualização
1. Feedback de operadores e engenheiros
2. Novos catálogos de fabricantes
3. Publicações técnicas e acadêmicas
4. Fornecedores de materiais

### Contatos Recomendados
- **Suporte Técnico Sandvik Coromant:** Para dúvidas sobre ferramentas e parâmetros
- **Suporte Técnico Kennametal:** Assessoria técnica em aplicações
- **Fornecedor de Materiais:** Especificações e datasheets atualizados

---

## 📞 SUPORTE E ESCALAÇÃO

### Nível 1 - Sistema/Operador
- Consultar valores no banco de dados
- Aplicar fatores de segurança
- Seguir procedimentos padrão

### Nível 2 - Engenharia/Programação
- Ajustar parâmetros para casos específicos
- Validar novos materiais
- Resolver problemas de processo

### Nível 3 - Especialista/Fornecedor
- Material 2711 ou outros não-catalogados
- Problemas persistentes de qualidade
- Otimização de processos complexos
- Consulta a fabricantes de ferramentas

---

## 📌 NOTAS FINAIS

### Declaração de Integridade

✅ **Nenhum valor foi inventado ou estimado sem fundamentação**

Todos os valores apresentados são:
- Extraídos de fontes documentadas e citadas
- Classificados por nível de confiabilidade
- Identificados como "NÃO DISPONÍVEL" quando não encontrados
- Baseados em analogia técnica **apenas quando explicitamente indicado**

### Limitações do Estudo

1. **Material 2711:** Não encontrado em fontes primárias - possível nomenclatura regional
2. **Torneamento vs Fresamento:** Conversões aplicadas quando apenas dados de torneamento disponíveis
3. **Variabilidade:** Valores assumem condições ideais - ajustes necessários por setup
4. **Ferramentas:** Geometrias e revestimentos específicos podem permitir valores diferentes
5. **Atualização:** Novos desenvolvimentos em ferramentas podem alterar recomendações

### Próximos Passos Recomendados

**CRÍTICO (Implementar ANTES de produção):**
1. ✅ Validar Material 2711 com fornecedor
2. ✅ Testes práticos com todos os materiais
3. ✅ Documentar resultados reais vs teóricos
4. ✅ Implementar margem de segurança no sistema

**IMPORTANTE (Melhorias contínuas):**
5. ⚠️ Base de dados atualizada com resultados práticos
6. ⚠️ Contato com suporte técnico de fabricantes
7. ⚠️ Treinamento em parâmetros de corte

**DESEJÁVEL (Otimização):**
8. ℹ️ Sistema de feedback de operadores
9. ℹ️ Monitoramento de vida útil vs parâmetros
10. ℹ️ Algoritmo de ajuste automático baseado em histórico

---

## 📄 APÊNDICES

### A. Conversões e Fórmulas

**Conversão SFM ↔ m/min:**
- 1 SFM = 0.3048 m/min
- 1 m/min = 3.28084 SFM

**Relação Torneamento → Fresamento:**
- Vc fresamento ≈ 0.6 × Vc torneamento (típico)
- Variação: 0.5 a 0.7 dependendo do material

**Cálculo de RPM:**
```
N (RPM) = (Vc × 1000) / (π × D)

Onde:
- Vc = velocidade de corte (m/min)
- D = diâmetro da ferramenta (mm)
- π ≈ 3.14159
```

**Exemplo:**
- Material: Aço 1045
- Operação: Desbaste
- Vc: 150 m/min
- Fresa: Ø 12mm

```
N = (150 × 1000) / (3.14159 × 12)
N = 150000 / 37.7
N ≈ 3,979 RPM
```

### B. Glossário Técnico

| Termo | Definição |
|-------|-----------|
| **Vc** | Velocidade de corte (m/min) |
| **ap** | Profundidade de corte axial (mm) |
| **ae** | Profundidade de corte radial (mm) |
| **fz** | Avanço por dente (mm/tooth) |
| **Work-hardening** | Endurecimento por trabalho mecânico |
| **BUE** | Built-Up Edge (aresta postiça) |
| **PVD** | Physical Vapor Deposition (revestimento) |
| **CVD** | Chemical Vapor Deposition (revestimento) |
| **CBN** | Cubic Boron Nitride |
| **PCD** | Polycrystalline Diamond |
| **White layer** | Camada branca (alteração microestrutural) |
| **ISO Class** | Classificação ISO de materiais (P, M, K, N, S, H) |

---

**Documento preparado por:** Claude (Anthropic)  
**Data:** 07 de Fevereiro de 2026  
**Versão:** 1.0  
**Status:** ✅ Pronto para implementação com ressalvas documentadas

---

**FIM DO DOCUMENTO**
