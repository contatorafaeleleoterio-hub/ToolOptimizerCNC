---
name: session-planner
description: Divide planos de execucao em sessoes otimizadas para contexto 200K tokens (Pro). Use apos aprovar qualquer plano de implementacao.
user-invocable: true
allowed-tools: Read, Glob, Grep
---

# Session Planner — Protocolo de Divisao em Sessoes

Divide planos de implementacao em sessoes otimizadas para o limite de contexto do Claude Code Desktop (plano Pro, 200K tokens).

---

## Quando Usar

- Apos o usuario aprovar qualquer plano de implementacao
- Quando o usuario disser "dividir em sessoes" ou "protocolo de sessoes"
- Automaticamente sugerido ao final de planos com >5 acoes

---

## Limites Calibrados (Pro 200K)

| Recurso | Consumo Estimado |
|---------|-----------------|
| Sistema (CLAUDE.md, tools, MCP) | ~40K tokens |
| Tokens disponiveis por sessao | ~160K tokens |
| **Target seguro (60%)** | **~96K tokens uteis** |
| Leitura + edicao de arquivo | ~2-5K tokens por acao |
| Subagent (Explore/Plan) | ~10-30K tokens cada |
| Build/test execution | ~3-8K tokens |

**Regra pratica:** ~8-12 acoes significativas por sessao

---

## Regras de Divisao

1. **Auto-contida:** Cada sessao pode ser executada com `/clear` antes — nao depende de contexto da sessao anterior alem dos arquivos salvos
2. **Maximo 8-12 acoes** por sessao (leituras + edicoes + builds)
3. **Pesquisa separada de implementacao** — sessoes de exploracao nao devem editar codigo
4. **Iniciar com contexto limpo:** `/compact [foco da sessao]` ou sessao fresca
5. **Verificacao obrigatoria** ao final de cada sessao
6. **Subagents pesados** (>2 subagents) reduzem para 5-6 acoes
7. **Checkpoint intermediario** (commit parcial) a cada 3 sessoes
8. **Nunca misturar** criacao de arquivos novos com refatoracao de existentes na mesma sessao

---

## Formato de Saida

Ao receber um plano aprovado, gerar o seguinte formato:

```markdown
# Protocolo de Sessoes — [Nome do Plano]

**Total:** N sessoes | ~X acoes totais
**Estimativa de contexto por sessao:** ~80-96K tokens

---

### Sessao 1 de N: [Titulo descritivo]
**Foco:** [Uma frase sobre o objetivo]
**Estimativa:** ~X acoes | ~YK tokens
**Pre-requisitos:** Nenhum (primeira sessao)

**Acoes:**
- [ ] Acao 1 — descricao clara
- [ ] Acao 2 — descricao clara
- [ ] ...

**Verificacao:**
- [ ] Como confirmar que esta sessao foi concluida com sucesso

**Comando de inicio da proxima sessao:**
```
/compact Sessao 2: [titulo]. Contexto: [resumo do que foi feito na sessao 1]
```

---

### Sessao 2 de N: [Titulo]
**Foco:** ...
**Pre-requisitos:** Sessao 1 concluida (verificar: [criterio])
...
```

---

## Classificacao de Acoes

| Tipo de Acao | Peso | Exemplo |
|-------------|------|---------|
| Leitura de arquivo | 1 | Ler componente para entender estrutura |
| Edicao simples | 2 | Alterar 1-3 linhas em arquivo existente |
| Criacao de arquivo | 3 | Escrever arquivo novo completo |
| Edicao complexa | 3 | Refatorar funcao, alterar multiplas secoes |
| Subagent simples | 4 | Explore para buscar padrao |
| Build/test | 3 | npm run build, npm test |
| Subagent complexo | 6 | Plan agent com analise profunda |

**Limite por sessao:** Soma dos pesos <= 24 pontos

---

## Heuristicas de Agrupamento

1. **Arquivos relacionados juntos** — se 3 arquivos mudam pelo mesmo motivo, mesma sessao
2. **Dependencias primeiro** — criar tipos/interfaces antes de componentes que os usam
3. **Testes junto com codigo** — se criar funcao, testar na mesma sessao
4. **Docs no final** — atualizacao de documentacao sempre na ultima sessao
5. **Uma feature por sessao** — nao misturar features independentes

---

## Protocolo de Transicao Entre Sessoes

Ao final de cada sessao:

1. **Verificar entregaveis** — todos os itens da sessao concluidos?
2. **Salvar estado** — commit parcial se aplicavel (a cada 3 sessoes ou em pontos criticos)
3. **Gerar comando de inicio** — prompt de `/compact` com contexto para a proxima sessao
4. **Reportar ao usuario:**
   ```
   Sessao X de N concluida.
   Entregaveis: [lista]
   Proxima sessao: [titulo]
   Comando: /compact [contexto]
   ```

---

## Exemplo Real

Para um plano com 15 acoes e 2 subagents:

- Peso total: ~38 pontos
- Dividido em: 2 sessoes (19 pontos cada)
- Sessao 1: Subagents + criacao de arquivos (peso 19)
- Sessao 2: Edicoes + build + docs (peso 19)

---

*Calibrado para: Claude Code Desktop, Plano Pro (200K tokens)*
*Intervencao otima: 60% do contexto (~96K tokens uteis)*
*Atualizado: 2026-03-26*
