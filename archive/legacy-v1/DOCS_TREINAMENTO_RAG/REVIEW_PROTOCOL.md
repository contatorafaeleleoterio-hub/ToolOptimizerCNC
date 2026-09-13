# Protocolo de Revisao

> Revisao estruturada de planos de implementacao e codigo no ToolOptimizer CNC.
> Abordagem iterativa (um plano por vez), com foco em consistencia, seguranca e alinhamento com o codebase.
> Projetado para proteger contra excesso de contexto em revisoes de multiplos planos.

---

## Quando Usar

- Antes de executar um plano de implementacao complexo (3+ arquivos)
- Ao revisar multiplos planos encadeados (processar um por vez)
- Para validacao formal de codigo antes de commit (complementa `revisar codigo`)
- Quando solicitado via comando `revisao de sessao` ou `revisao`

---

## Pre-requisitos

1. Plano(s) de implementacao devem existir (em `docs/plans/` ou na conversa)
2. Ou: codigo implementado para revisao (via `git diff`)
3. Acesso ao codebase real para validacao cruzada (Glob/Grep/Read)

---

## Modo de Operacao

### Iterativo — Um Plano por Vez

- Cada execucao processa **apenas um plano**
- Ignorar suposicoes sobre outros planos nao fornecidos
- Se necessario mencionar conflitos com outros planos: marcar como "potenciais", nunca como fatos
- Apresentar revisao ao usuario → aguardar aprovacao → avancar para o proximo

### Protecao de Contexto

- Se o plano for grande: priorizar **precisao sobre completude**
- Nao tentar carregar tudo na memoria — trabalhar com o que esta visivel
- NAO auto-escrever correcoes: propor e aguardar confirmacao

---

## 8 Passos Obrigatorios

> **REGRA:** Nunca pular passos. Executar todos os 8, mesmo que o resultado de um passo seja "nenhum problema encontrado".

### Passo 1: Consistencia Interna

Verificar se o plano e internamente coerente:
- Nomes de arquivos/funcoes/types consistentes ao longo do documento
- Referencias cruzadas corretas entre secoes
- Etapas em ordem logica (dependencias respeitadas)
- Sem contradicoes entre secoes diferentes

### Passo 2: Alinhamento com Codebase

**Map Before Modify** — verificar via Glob/Grep/Read:
- Arquivos mencionados no plano realmente existem?
- Nomes de funcoes/types/componentes batem com o codebase real?
- Abstracoes propostas sao necessarias ou ja existem equivalentes?
- Imports e dependencias estao corretos?

### Passo 3: Impacto Sistemico

Identificar efeitos colaterais:
- Mudancas no store afetam quais componentes?
- Mudancas em types quebram quais imports?
- Verificar ADRs em `docs/architecture/ADR-*.md` para conflitos com decisoes anteriores
- Checar regras criticas do CLAUDE.md:
  - Store NAO auto-recalcula (set* zera resultado, usuario clica Simular)
  - L/D > 6 = BLOQUEADO no MVP
  - Safety factor 0.7-0.8 em todos os valores calculados
  - Materiais "Estimado" = badge de warning

### Passo 4: Riscos

Avaliar riscos em 4 categorias:
- **Regressao:** testes existentes que podem quebrar
- **Seguranca CNC:** limites de maquina, semaforo de validacao, valores fora de range
- **Performance:** re-renders desnecessarios, calculos pesados, componentes nao memoizados
- **Divida tecnica:** solucao temporaria vs permanente, complexidade introduzida

Para cada risco: classificar severidade como `baixo`, `medio` ou `alto`.

### Passo 5: Lacunas e Ambiguidades

Identificar o que falta no plano:
- Testes nao mencionados (especialmente para funcoes de calculo — regra CLAUDE.md)
- Edge cases nao cobertos (D=0, L/D > 6, material "Estimado", valores negativos)
- Atualizacoes de docs nao planejadas
- Version bump necessario (SemVer: feature = MINOR, fix = PATCH)
- Partes mal definidas ou vagas

### Passo 6: Conflitos

Checar conflitos potenciais com:
- Outros planos pendentes em `docs/plans/BACKLOG_IMPLEMENTACAO.md`
- Tarefas abertas em `docs/admin-requests.json`
- Prioridades do `docs/ROADMAP_SESSAO_ATUAL.md`
- Fases de outros planos que tocam os mesmos arquivos

**IMPORTANTE:** Se o conflito nao puder ser confirmado com certeza, marcar como "conflito potencial".

### Passo 7: Otimizacoes

Sugerir melhorias sem adicionar funcionalidades nao mencionadas:
- **Simplificacao:** menos arquivos, reutilizar funcoes/componentes existentes
- **Performance:** memoization, lazy loading, selectors atomicos Zustand
- **Alinhamento com padroes:** design tokens, convencoes de nomenclatura, patterns existentes
- **Organizacao:** melhor ordem de execucao, agrupamento logico de tarefas

### Passo 8: Plano Refinado

Produzir versao refinada do plano com todas as correcoes aplicadas:
- Se nao ha correcoes: declarar "Plano aprovado sem alteracoes"
- Se ha correcoes: apresentar apenas as diferencas (nao reescrever o plano inteiro)
- NAO adicionar funcionalidades nao mencionadas no plano original

---

## Regras Anti-Alucinacao

> Estas regras sao **inviolaveis**. Priorizar cautela sobre completude.

1. **NAO inventar** detalhes, nomes de arquivos, funcoes ou types
2. **NAO preencher** lacunas com suposicoes
3. **NAO inferir** comportamento do sistema sem evidencia no codigo
4. **NUNCA assumir** que um arquivo/funcao existe sem verificar via Glob/Grep/Read

### Marcadores Obrigatorios

Quando algo nao puder ser validado, usar os marcadores:

- `[INCERTO]` — Nao ha informacao suficiente para validar este ponto
- `[NAO VERIFICADO]` — Codebase nao foi consultado para esta afirmacao

Contar e reportar no final da revisao quantos marcadores foram usados.

---

## Formato de Saida

Toda revisao deve seguir este template:

```markdown
## Revisao: [nome do plano/arquivo]

**Status:** Aprovado | Aprovado com ressalvas | Requer correcoes

### 1. Consistencia Interna
- [OK ou problemas encontrados]

### 2. Alinhamento com Codebase
- [verificacoes feitas e resultados]

### 3. Impacto Sistemico
- [componentes afetados, efeitos colaterais]

### 4. Riscos
- [riscos identificados com severidade: baixo/medio/alto]

### 5. Lacunas
- [itens faltantes ou ambiguos]

### 6. Conflitos
- [conflitos com outros planos/tarefas, ou "nenhum identificado"]

### 7. Otimizacoes
- [sugestoes de melhoria]

### 8. Plano Refinado
- [correcoes aplicadas ou "Plano aprovado sem alteracoes"]

---
**Itens marcados [INCERTO]:** N
**Itens marcados [NAO VERIFICADO]:** N
```

---

## Anti-padroes

- ❌ Aprovar plano sem consultar o codebase real
- ❌ Revisar multiplos planos simultaneamente (confunde contexto)
- ❌ Inventar nomes de arquivos/funcoes sem verificar
- ❌ Auto-aplicar correcoes sem aprovacao do usuario
- ❌ Pular passos "porque parece simples"
- ❌ Reescrever plano inteiro quando apenas pequenas correcoes sao necessarias
- ❌ Adicionar funcionalidades nao mencionadas no plano original

---

## Comando de Reutilizacao

Sempre que o usuario disser `revisao` ou `revisao de sessao`:
1. Aplicar automaticamente este protocolo
2. Considerar que um novo plano foi fornecido (ou solicitar qual plano revisar)
3. NAO redefinir o protocolo
4. NAO mudar o formato de saida
5. Tratar cada execucao como independente (nao depender de memoria anterior)

---

## Referencia

- Backlog: `docs/plans/BACKLOG_IMPLEMENTACAO.md`
- Regras do projeto: `CLAUDE.md`
- ADRs: `docs/architecture/ADR-*.md`
- Padroes arquiteturais: `docs/ai/memory/ARCHITECTURE_LEARNINGS.md`
- Erros comuns: `docs/ai/memory/COMMON_MISTAKES.md`
- Roadmap: `docs/ROADMAP_SESSAO_ATUAL.md`
- Tarefas admin: `docs/admin-requests.json`

---

*FENIX AI System — Protocolo de Revisao | Criado: 25/03/2026*
