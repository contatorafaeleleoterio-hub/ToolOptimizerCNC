# SESSÃO ETAPA 0 - CRÍTICA E PREPARAÇÃO

**Data:** 2026-02-16  
**Objetivo:** Garantir ambiente de trabalho correto e preparar análise AIOS  
**Status:** ✅ CONCLUÍDA

---

## 🎯 O QUE FOI REALIZADO

### 1. CRIAÇÃO DE REGRAS OBRIGATÓRIAS
**Arquivo criado:** `C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC\REGRAS_TRABALHO_OBRIGATORIAS.md`

**Conteúdo principal:**
- ❌ PROIBIDO trabalhar em `/home/claude/`
- ✅ SEMPRE trabalhar em `C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC`
- Diretrizes de otimização de tokens
- Protocolo de sessão (início, durante, finalização)
- Prioridades inegociáveis (confiabilidade, segurança, rastreabilidade)

### 2. SCAN ESTRUTURA AIOS
**Diretório analisado:** `C:\Users\USUARIO\Desktop\Synkra_AIOS\aios-core`

**Estrutura identificada (principais pastas):**
```
.aios/              # Audit, cache, dashboard, session-digests
.aios-core/         # CLI, core, data, docs, infrastructure, schemas, utils
.claude/            # Agent-memory, agents, commands, hooks, rules, skills, templates
.github/            # Workflows, issue templates
docs/               # Multi-idioma (en, es, pt), architecture, guides
packages/           # Módulos npm isolados (aios-install, installer, etc)
tests/              # Suite completa (unit, integration, e2e)
```

**Padrões observados:**
- Modularização extrema
- Documentação multi-idioma
- Quality gates automatizados
- CLI profissional com installers
- Estrutura `.claude/` para regras de IA

### 3. VALIDAÇÃO TOOLOPTIMIZER
**Diretório validado:** `C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC`

**Estrutura existente:**
```
.claude/            # Configurações Claude
src/                # Código fonte React/TS
tests/              # Testes
docs/               # Documentação
public/             # Assets
scripts/            # Scripts auxiliares
package.json        # Dependências
tsconfig.json       # Config TypeScript
```

**Conclusão:** Projeto já tem estrutura React/TS funcional, precisa adaptar padrões AIOS.

---

## 📋 PLANO DE IMPLEMENTAÇÃO DEFINIDO

### ETAPAS DO PROJETO

#### ✅ ETAPA 0 - CRÍTICA (CONCLUÍDA)
**Objetivo:** Garantir ambiente correto
**Entregas:**
- [x] `REGRAS_TRABALHO_OBRIGATORIAS.md`
- [x] Scan superficial AIOS
- [x] Validação estrutura ToolOptimizer

#### 🔜 ETAPA 1 - ANÁLISE AIOS (PRÓXIMA)
**Objetivo:** Entender padrões AIOS profundamente
**Entregas:**
- [ ] `ETAPA_01_ANALISE_AIOS.md`
- [ ] Mapeamento de padrões
- [ ] Recomendações para ToolOptimizer

**Arquivos prioritários para ler:**
```
C:\Users\USUARIO\Desktop\Synkra_AIOS\aios-core\README.md
C:\Users\USUARIO\Desktop\Synkra_AIOS\aios-core\.claude\README.md
C:\Users\USUARIO\Desktop\Synkra_AIOS\aios-core\.aios-core\README.md
C:\Users\USUARIO\Desktop\Synkra_AIOS\aios-core\tsconfig.json
C:\Users\USUARIO\Desktop\Synkra_AIOS\aios-core\package.json
```

#### 🔜 ETAPA 2 - DIAGNÓSTICO PROJETO (FUTURA)
**Objetivo:** Avaliar estado atual vs AIOS
**Entregas:**
- [ ] `ETAPA_02_DIAGNOSTICO_PROJETO.md`
- [ ] Gaps identificados
- [ ] Plano de migração

#### 🔜 ETAPA 3 - PLANO IMPLEMENTAÇÃO (FUTURA)
**Objetivo:** Roteiro completo de adaptação
**Entregas:**
- [ ] `ETAPA_03_PLANO_IMPLEMENTACAO.md`
- [ ] Sequência de alterações
- [ ] Checklist de validação

#### 🔜 ETAPAS 4-N - EXECUÇÃO MODULAR (FUTURA)
**Objetivo:** Implementar alterações incrementalmente
**Método:** 1 módulo/aspecto por vez, documento específico por etapa

---

## 🛠️ FERRAMENTAS E MÉTODOS

### Comandos Windows-MCP Validados
```powershell
# Listar arquivos/pastas
Get-ChildItem -Path "CAMINHO" -Directory -Depth 0

# Ler arquivo
Get-Content "CAMINHO\ARQUIVO"

# Criar arquivo (evitar Out-File com caracteres especiais)
# Usar create_file do Claude para markdown
```

### Abordagem Token-Consciente
**Estratégia escolhida:** Abordagem Incremental (Opção A)
1. Criar regras primeiro
2. Scan superficial
3. Validar direção
4. Leitura profunda só após aprovação

**Benefícios:**
- Valida direção antes de investir tokens
- Permite ajustes sem retrabalho
- Usuário mantém controle do processo

---

## 🎓 APRENDIZADOS DA SESSÃO

### Técnicos
1. **Windows-MCP:** Usar `Get-Content` para leitura, `create_file` do Claude para criação
2. **Estrutura AIOS:** Altamente profissional, modular, pronto para produção
3. **ToolOptimizer:** Base boa (React/TS), precisa organização AIOS

### Metodológicos
1. **Validação incremental:** Essencial para projetos grandes
2. **Documentação por etapa:** Mantém continuidade entre sessões
3. **Regras explícitas:** Evita trabalho em diretórios errados

### Comunicação
1. **Perguntas com opções:** Mais eficiente que perguntas abertas
2. **Aprovação antes de ações:** Evita desperdício de tokens
3. **Resumos concisos:** Usuário não-dev full-time precisa clareza

---

## 📊 MÉTRICAS DA SESSÃO

**Tokens utilizados:** ~110.000 de 190.000 (58%)  
**Arquivos criados:** 1 (REGRAS_TRABALHO_OBRIGATORIAS.md)  
**Diretórios analisados:** 2 (AIOS, ToolOptimizer)  
**Decisões tomadas:** 3 principais (ambiente, método, próxima etapa)

---

## 🔗 ARQUIVOS IMPORTANTES

### Criados nesta sessão
1. `C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC\REGRAS_TRABALHO_OBRIGATORIAS.md`
2. `C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC\SESSAO_ETAPA_00_COMPLETO.md` (este arquivo)
3. `C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC\PROMPT_CONTINUAR_ETAPA_01.txt` (prompt simples)

### Para ler na próxima sessão
1. `REGRAS_TRABALHO_OBRIGATORIAS.md` (OBRIGATÓRIO PRIMEIRO)
2. `SESSAO_ETAPA_00_COMPLETO.md` (contexto completo)
3. Arquivos AIOS conforme listado acima

---

## 🚀 PRÓXIMOS PASSOS

### Imediato (próxima sessão)
1. Ler `REGRAS_TRABALHO_OBRIGATORIAS.md`
2. Ler `SESSAO_ETAPA_00_COMPLETO.md`
3. Executar ETAPA 1 - Análise AIOS
4. Gerar `ETAPA_01_ANALISE_AIOS.md`

### Médio prazo
1. ETAPA 2 - Diagnóstico
2. ETAPA 3 - Plano detalhado
3. Início da implementação modular

---

## 💡 CONTEXTO DO PROJETO TOOLOPTIMIZER

### Objetivo Geral
Criar calculadora CNC web profissional para operadores de chão de fábrica, com padrões de código e organização similares ao AIOS.

### Características
- **Usuário:** Operadores CNC experientes (não desenvolvedores)
- **Objetivo:** Decisão em <2 segundos
- **Offline-first:** localStorage, zero dependências externas
- **Idioma:** Português
- **Stack:** React 18, TypeScript strict, Vite 5, Electron 28

### Estado Atual
- **Fase:** Planejamento → Implementação
- **Docs:** PRD, specs técnicas, design system (parcial)
- **Código:** Estrutura base React/TS funcional
- **Missing:** Organização profissional estilo AIOS

### Por que AIOS?
Projeto de referência com:
- Estrutura modular exemplar
- Padrões de qualidade enterprise
- Documentação multi-idioma
- Quality gates automatizados
- CLI e tooling profissional

---

## 🎯 OBJETIVO FINAL

**Transformar ToolOptimizer de:**
- Projeto React/TS básico
- Documentação dispersa
- Sem padrões claros

**Para:**
- Estrutura modular profissional (estilo AIOS)
- Documentação organizada e multi-formato
- Padrões de código enterprise
- Quality gates automatizados
- Pronto para deploy e manutenção

**Mantendo:**
- Simplicidade para operadores
- Decisões em <2 segundos
- Offline-first
- Zero dependências de cálculo

---

## ✅ CHECKLIST FINAL ETAPA 0

- [x] Ambiente correto definido (`C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC`)
- [x] Regras de trabalho documentadas
- [x] Estrutura AIOS mapeada superficialmente
- [x] Estrutura ToolOptimizer validada
- [x] Plano de etapas definido
- [x] Arquivos prioritários identificados
- [x] Metodologia token-consciente estabelecida
- [x] Documentação completa da sessão criada
- [x] Prompt de continuação preparado

---

**Sessão concluída com sucesso!**  
**Próximo assistente: Ler `PROMPT_CONTINUAR_ETAPA_01.txt` e executar ETAPA 1**
