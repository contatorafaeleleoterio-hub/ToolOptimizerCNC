# Story-001: Migração CSS Global ? CSS Modules

**ID:** STORY-001  
**Prioridade:** Alta  
**Estimativa:** 3h  
**Status:** Planejamento  
**Assignee:** Claude Code Desktop

---

## ?? OBJETIVO

Migrar estilização global CSS para CSS Modules isolados, garantindo:
- Zero conflitos de classes CSS
- Manutenibilidade (escopo por componente)
- Performance (tree-shaking CSS não usado)
- Dark theme mantido (CSS Variables)

---

## ?? CONTEXTO TÉCNICO

### Estado Atual:
- **Estrutura:** src/styles/global.css com classes globais
- **Problema:** Risco de colisão de nomes, difícil manutenção
- **Tech Stack:** Vite 5 (CSS Modules nativo)

### Estado Desejado:
- **Estrutura:** Componente.module.css por componente
- **Benefício:** Escopo isolado automático
- **Exemplo:** .button ? .Componente_button_a3d2e

---

## ?? ESPECIFICAÇÃO TÉCNICA

### 1. Estrutura de Arquivos

**ANTES:**
src/
+-- components/
¦   +-- Calculator.tsx
¦   +-- ResultDisplay.tsx
+-- styles/
¦   +-- global.css

**DEPOIS:**
src/
+-- components/
¦   +-- Calculator/
¦   ¦   +-- Calculator.tsx
¦   ¦   +-- Calculator.module.css
¦   +-- ResultDisplay/
¦       +-- ResultDisplay.tsx
¦       +-- ResultDisplay.module.css
+-- styles/
¦   +-- variables.css (theme vars)
¦   +-- reset.css (normalize)

### 2. Pattern de Conversão

**global.css (REMOVER):**
.calculator-container {
  padding: 20px;
  background: var(--bg-primary);
}

**Calculator.module.css (CRIAR):**
.container {
  padding: 20px;
  background: var(--bg-primary);
}

**Calculator.tsx (ATUALIZAR):**
import styles from './Calculator.module.css';

export function Calculator() {
  return <div className={styles.container}>...</div>;
}

### 3. CSS Variables (MANTER)

**variables.css:**
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
}

---

## ? ACCEPTANCE CRITERIA

### Funcional:
- [ ] Todos componentes usam .module.css
- [ ] Zero classes globais (exceto variables.css)
- [ ] Dark theme funciona identicamente
- [ ] Build sem warnings CSS

### Técnico:
- [ ] TypeScript reconhece imports CSS Modules
- [ ] Vite gera CSS com hash único
- [ ] Bundle size = anterior ±5%
- [ ] Hot reload funciona

### Qualidade:
- [ ] Zero conflitos de classes
- [ ] Nomes semânticos (não .a, .b, .c)
- [ ] Comentários em CSS complexo

---

## ?? IMPLEMENTAÇÃO PASSO-A-PASSO

### FASE 1: Setup Estrutura (30min)
1. Criar vite-env.d.ts (TypeScript types CSS Modules)
2. Criar src/styles/variables.css
3. Criar src/styles/reset.css
4. Atualizar main.tsx (imports globais)

### FASE 2: Migrar Componentes (2h)
**Para cada componente:**
1. Criar pasta componente/
2. Criar Componente.module.css
3. Copiar estilos relevantes de global.css
4. Atualizar imports em Componente.tsx
5. Testar visualmente
6. Commit incremental

**Ordem sugerida:**
1. ResultDisplay (simples)
2. InputField (médio)
3. Calculator (complexo)

### FASE 3: Limpeza (30min)
1. Deletar global.css
2. Verificar imports órfãos
3. Build production test
4. Validar bundle size

---

## ?? TESTES

### Checklist Visual:
- [ ] Layout idêntico ao anterior
- [ ] Responsividade mantida
- [ ] Dark theme toggle funciona
- [ ] Hover states corretos

### Checklist Técnico:
npm run build
npm run preview
- [ ] Build sem erros
- [ ] CSS extraído corretamente
- [ ] Classes hasheadas em HTML

---

## ?? DELIVERABLES

1. ? Código migrado (src/components/)
2. ? Styles organizados (src/styles/)
3. ? Types atualizados (vite-env.d.ts)
4. ? Build validado (dist/)

---

## ?? RISCOS & MITIGAÇÕES

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| CSS Variables não funcionar | Baixa | Alto | Testar theme antes de migrar tudo |
| Classes duplicadas | Média | Médio | Lint CSS + code review |
| Bundle size aumentar | Baixa | Médio | Comparar antes/depois |
| Hot reload quebrar | Baixa | Baixo | Reiniciar dev server |

---

## ?? REFERÊNCIAS

- [Vite CSS Modules](https://vitejs.dev/guide/features.html#css-modules)
- [CSS Modules Spec](https://github.com/css-modules/css-modules)
- [React CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)

---

## ?? CONTINUIDADE

### Próxima Story:
**Story-002:** Cloudflare Deploy (aguarda domínio)

### Dependencies:
- Nenhuma (pode iniciar imediatamente)

### Blocked By:
- Nada

---

## ?? NOTAS IMPLEMENTAÇÃO


## ?? SISTEMA AUTO-AVALIAÇÃO (Anti-Desvio)

**A cada 30min de implementação, PAUSAR e executar:**

### Checklist Obrigatório:
1. **Contexto:** Ainda estou implementando Story-001 CSS Modules?
2. **Escopo:** Arquivos modificados estão em src/components/ ou src/styles/?
3. **Objetivo:** Mudanças relacionadas a CSS Modules?
4. **Desvio detectado:** Fiz algo não especificado na story?

### Se SIM para pergunta 4:
STOP. Execute:
Get-ChildItem "C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC\src" -Recurse -File | Where-Object {$_.LastWriteTime -gt (Get-Date).AddMinutes(-30)} | Select-Object FullName

**Analise outputs:**
- Arquivo fora de src/components/ ou src/styles/? = DESVIO
- Arquivo não relacionado a CSS? = DESVIO

**Ação corretiva:**
git checkout [arquivo-desvio]
Retomar story do ponto correto

### Para Claude Code Desktop:

**IMPORTANTE - VALIDAÇÃO OBRIGATÓRIA:**

Ao finalizar a implementação, você DEVE executar os comandos abaixo e COLAR OS RESULTADOS na resposta final:

1. **Confirmar estrutura criada:**
Get-ChildItem "C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC\src\components" -Recurse -Filter "*.module.css" | Select-Object FullName

2. **Confirmar build funcional:**
cd C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC
npm run build

3. **Validar tamanho bundle:**
Get-ChildItem "C:\Users\USUARIO\Desktop\INICIO_TOOLOPTIMIZERCNC\dist" -Recurse | Measure-Object -Property Length -Sum | Select-Object Count, @{Name="SizeMB";Expression={[math]::Round(\$_.Sum/1MB,2)}}

**FORMATO RESPOSTA FINAL OBRIGATÓRIO:**

? Story-001 IMPLEMENTADA

**Arquivos criados/modificados:**
[COLAR OUTPUT COMANDO 1]

**Build status:**
[COLAR OUTPUT COMANDO 2]

**Bundle size:**
[COLAR OUTPUT COMANDO 3]

**NUNCA responda "implementei com sucesso" sem PROVAS dos comandos acima.**

### Commits Sugeridos:

git commit -m "feat: setup CSS Modules structure"
git commit -m "feat: migrate ResultDisplay to CSS Modules"
git commit -m "feat: migrate Calculator to CSS Modules"
git commit -m "chore: remove global.css, cleanup"

### Se algo der errado:

git reset --hard HEAD  # Voltar estado anterior
git clean -fd          # Limpar arquivos não rastreados

---

**Criado:** 15/02/2026  
**Última atualização:** 15/02/2026  
**Versão:** 1.0


