# GUIA RÁPIDO: Como Usar Story no Claude Code Desktop

## 📋 PRÉ-SESSÃO (5 minutos)

### 1. Preparar Ambiente
\\\powershell
# Abrir terminal no projeto
cd C:\Users\USUARIO\Desktop\ToolOptimizer

# Criar branch
git checkout -b feature/css-modules

# Verificar que app roda
npm run dev
# ✅ Deve abrir sem erros
\\\

### 2. Backup Atual
\\\powershell
# Backup estilos
xcopy src\styles src\styles.backup\ /E /I

# Screenshots antes (opcional mas recomendado)
# Tire prints da interface atual para comparar depois
\\\

---

## 💬 SESSÃO CLAUDE CODE DESKTOP

### Passo 1: Carregar Story
\\\
Abra Claude Code Desktop

Arraste arquivo para chat:
📄 C:\Users\USUARIO\Desktop\AIOS-ToolOptimizer\stories\story-001-css-isolado.md

Aguarde Claude ler e confirmar entendimento
\\\

### Passo 2: Prompt Inicial
\\\
"Leia a story-001-css-isolado.md completa.

Contexto adicional:
- Projeto: ToolOptimizer CNC (Electron + React + Vite)
- Localização: C:\Users\USUARIO\Desktop\ToolOptimizer
- Stack: React 18 + TypeScript + Vite
- Estado: Protótipo funcional com CSS global

Tarefa:
Implemente a migração para CSS Modules conforme especificado.

Abordagem:
1. Primeiro, liste os componentes React existentes em src/
2. Depois, mostre estrutura de pastas proposta
3. Aguarde minha aprovação antes de gerar código
4. Implemente fase por fase (validando cada uma)

Comece pela análise da estrutura atual."
\\\

### Passo 3: Validação Incremental

**Após cada fase, valide:**
\\\powershell
# Testar dev server
npm run dev

# Se OK, próxima fase
# Se erro, debugar antes de continuar
\\\

### Passo 4: Commit ao Final
\\\powershell
git add .
git commit -m "feat: migrate to CSS Modules

- Isolated CSS per component
- CSS Variables for theming
- Zero global styles (except reset)
- Build optimized, no warnings

Story: TOOL-001"

git push origin feature/css-modules
\\\

---

## 🎯 PROMPTS ÚTEIS DURANTE SESSÃO

### Se Claude tentar fazer tudo de uma vez:
\\\
"Pare. Vamos fazer fase por fase.

Agora implemente APENAS Fase 2 (CSS Variables).
Mostre o código de themes.css primeiro, aguarde aprovação."
\\\

### Se surgir erro inesperado:
\\\
"Erro ao rodar npm run dev:
[cole o erro aqui]

Analise e sugira correção mantendo CSS Modules."
\\\

### Para validar visual:
\\\
"Compare o visual atual com meu screenshot antes da migração.
As cores/espaçamentos estão idênticos?
Liste diferenças se houver."
\\\

### Para otimizar bundle:
\\\
"Rode npm run build e analise o tamanho do bundle.
Está maior que 2.5MB? Se sim, identifique CSS não usado."
\\\

---

## ✅ CHECKLIST PÓS-IMPLEMENTAÇÃO

- [ ] npm run dev funciona sem erros
- [ ] npm run build sem warnings
- [ ] Visual idêntico (comparar screenshots)
- [ ] Todas funcionalidades testadas manualmente:
  - [ ] Calculadora RPM calcula correto
  - [ ] SafetyIndicator muda cores
  - [ ] Inputs aceitam valores
  - [ ] Dark theme aplicado
- [ ] Código commitado
- [ ] Branch pushed

---

## 🚨 TROUBLESHOOTING

### "CSS Variables não funcionando"
**Solução:**
\\\jsx
// Verificar import em main.jsx ou App.jsx
import './styles/themes.css';
\\\

### "Classes não aplicadas"
**Solução:**
\\\jsx
// Verificar import
import styles from './Component.module.css';

// Verificar className
<div className={styles.container}> // ✅
<div className="container">         // ❌
\\\

### "Build lento após migração"
**Solução:**
\\\powershell
# Limpar cache Vite
Remove-Item -Recurse -Force node_modules\.vite
npm run dev
\\\

---

## 📞 SUPORTE

**Se travar por mais de 30min em um erro:**
1. Commitar progresso atual: \git commit -m "wip: CSS Modules partial"\
2. Descrever erro detalhado
3. Pedir ajuda focada no bloqueio específico

**Próximas stories após esta:**
- story-002-cloudflare-deploy.md
- story-003-github-actions.md
- story-004-seo-schema.md

---

**Tempo estimado total sessão:** 3-4h (incluindo testes)  
**Melhor horário:** Quando tiver bloco ininterrupto de 3h+
