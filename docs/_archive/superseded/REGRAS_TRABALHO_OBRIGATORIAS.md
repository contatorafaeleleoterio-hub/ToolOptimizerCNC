# ⚠️ REGRAS DE TRABALHO OBRIGATÓRIAS - TOOLOPTIMIZER CNC

## 🚫 PROIBIÇÕES ABSOLUTAS

### NUNCA TRABALHAR EM:
- /home/claude/ (ambiente temporário do assistente)
- /tmp/ ou diretórios temporários
- Qualquer path Linux que não seja mapeado para Windows

### ❌ COMPORTAMENTOS PROIBIDOS:
- Criar arquivos fora do diretório do projeto
- Usar paths relativos sem contexto claro
- Assumir estrutura de pastas sem validar
- Executar comandos destrutivos sem aprovação explícita

---

## ✅ DIRETRIZES OBRIGATÓRIAS

### DIRETÓRIO PRINCIPAL DO PROJETO:
`
C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC
`

### SEMPRE:
1. **Validar path completo** antes de qualquer operação
2. **Usar Windows-MCP:Shell** para operações de arquivo no Windows
3. **Confirmar localização** ao iniciar nova sessão
4. **Documentar decisões** em arquivos ETAPA_XX_*.md
5. **Criar backups** antes de modificações estruturais

### ESTRUTURA DE COMANDOS:
`powershell
# ✅ CORRETO - Path absoluto Windows
Get-Content "C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC\package.json"

# ❌ ERRADO - Path relativo/Linux
cat /home/claude/package.json
`

---

## 📁 ESTRUTURA DO PROJETO (ATUAL)

`
INICIO_TOOLOPTIMIZERCNC/
├── .claude/              # Configurações Claude
├── .git/                 # Controle de versão
├── docs/                 # Documentação
├── src/                  # Código fonte
├── tests/                # Testes
├── public/               # Assets públicos
├── scripts/              # Scripts auxiliares
├── dist/                 # Build output
├── node_modules/         # Dependências
└── [arquivos config]     # package.json, tsconfig, etc
`

---

## 🔄 PROTOCOLO DE SESSÃO

### AO INICIAR NOVA SESSÃO:
1. Ler este arquivo primeiro
2. Validar diretório de trabalho:
   `powershell
   Get-Location
   # Deve retornar: C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC
   `
3. Ler documento da etapa atual: ETAPA_XX_*.md
4. Confirmar entendimento antes de executar

### DURANTE A SESSÃO:
- Sempre usar paths absolutos completos
- Validar antes de criar/modificar/deletar
- Documentar decisões técnicas
- Atualizar documento da etapa com progresso

### AO FINALIZAR SESSÃO:
- Salvar estado em documento de etapa
- Criar prompt de continuação claro
- Listar próximos passos

---

## 📊 OTIMIZAÇÃO DE TOKENS

### LEITURA DE ARQUIVOS:
- **Perguntar antes** de ler arquivos grandes (>500 linhas)
- **Informar custo estimado** em tokens
- **Ler seletivamente** (apenas seções necessárias)
- **Usar view com ranges** quando possível

### DOCUMENTAÇÃO:
- **Concisa por padrão** (expandir só se solicitado)
- **Tabelas > bullets** para comparações
- **Código direto** (sem preâmbulos longos)
- **Evitar repetições** de informações já na conversa

---

## 🎯 PRIORIDADES INEGOCIÁVEIS

1. **CONFIABILIDADE**: Validar antes de afirmar
2. **SEGURANÇA**: Nunca executar comandos destrutivos sem aprovação
3. **RASTREABILIDADE**: Documentar todas as decisões
4. **EFICIÊNCIA**: Otimizar uso de tokens
5. **CLAREZA**: Comunicação objetiva

---

## 📝 TEMPLATE DE DECISÃO

Antes de qualquer ação significativa:

1. **Objetivo**: O que precisa ser feito?
2. **Validação**: Informações suficientes?
3. **Plano**: Quais passos executar?
4. **Aprovação**: Usuário confirma?
5. **Execução**: Documentar durante
6. **Verificação**: Validar resultado

---

## 🔗 ARQUIVOS RELACIONADOS

- ETAPA_XX_*.md - Documentos de etapas específicas
- .claude/ - Configurações do projeto
- docs/ - Documentação técnica completa

---

**Versão**: 1.0  
**Data**: 2026-02-16  
**Autor**: Sistema ToolOptimizer CNC  
**Revisão**: Obrigatória a cada nova sessão
