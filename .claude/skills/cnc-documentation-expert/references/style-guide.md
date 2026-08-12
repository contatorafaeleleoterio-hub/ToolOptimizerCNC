# Guia de Estilo - Documentação Sistema Mestre CNC

## Princípios Gerais

### 1. Clareza Sobre Concisão

**Rafael não é dev full-time** - documentação deve:
- Explicar o "porquê", não só o "como"
- Incluir exemplos práticos
- Ser didática sem ser condescendente
- Usar terminologia técnica correta mas acessível

### 2. Documentação Viva

- Atualizar junto com código
- Incluir data de última atualização
- Marcar TODOs e partes incompletas
- Revisar trimestralmente

### 3. Português Técnico

- Termos técnicos em português quando possível
- Termos em inglês quando universalmente aceitos
- Siglas sempre explicadas na primeira ocorrência

## Estrutura de Documentos

### Hierarquia de Títulos

```markdown
# Título Principal (H1) - Apenas um por documento

## Seções Principais (H2)

### Subseções (H3)

#### Detalhes (H4) - Usar com moderação
```

### Ordem Padrão

1. **Visão Geral** - O que é, objetivo
2. **Requisitos/Pré-requisitos** - O que precisa antes
3. **Uso/Implementação** - Como usar
4. **Exemplos** - Casos práticos
5. **Referências** - Fontes técnicas
6. **Notas/Observações** - Informações adicionais

## Formatação

### Código

**Inline code:**
```markdown
Use `código` para nomes de variáveis, funções, arquivos.
```

**Blocos de código:**
````markdown
```typescript
// Sempre especificar linguagem
function exemplo() {
  return "código formatado";
}
```
````

**Destacar diferenças:**
```markdown
❌ ERRADO
```typescript
const resultado: any = calcular();
```

✅ CORRETO
```typescript
const resultado: number = calcular();
```
```

### Listas

**Lista ordenada (passos sequenciais):**
```markdown
1. Primeiro passo
2. Segundo passo
3. Terceiro passo
```

**Lista não-ordenada (itens independentes):**
```markdown
- Item A
- Item B
- Item C
```

**Checklist (tarefas):**
```markdown
- [ ] Tarefa pendente
- [x] Tarefa concluída
```

### Tabelas

**Formato padrão:**
```markdown
| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Valor A  | Valor B  | Valor C  |
| Valor D  | Valor E  | Valor F  |
```

**Alinhamento:**
```markdown
| Esquerda | Centro | Direita |
|:---------|:------:|--------:|
| A        | B      | C       |
```

### Ênfases

```markdown
**Negrito** - Para termos importantes, alertas
*Itálico* - Para ênfase suave, termos estrangeiros
`código` - Para elementos técnicos
> Citação - Para notas, avisos
```

### Links

```markdown
[Texto do link](URL) - Links externos
[Seção](#titulo-secao) - Links internos
```

## Terminologia

### Termos em Português

| Prefira | Evite |
|---------|-------|
| Velocidade de corte | Cutting speed |
| Avanço por dente | Feed per tooth |
| Profundidade axial | Axial depth |
| Fresamento | Milling |
| Torneamento | Turning |

### Termos em Inglês (OK usar)

- **Frontend/Backend** - Amplamente aceitos
- **Deploy** - Universalmente usado
- **Build** - Padrão da indústria
- **Hooks** (React) - Nome técnico específico
- **Props** (React) - Terminologia oficial

### Siglas

**Primeira menção:**
```markdown
Centro de Usinagem (CNC - Computer Numerical Control)
High-Speed Machining (HSM)
TypeScript (TS)
```

**Menções subsequentes:**
```markdown
CNC, HSM, TS
```

## Comentários em Código

### JSDoc para Funções

```typescript
/**
 * Calcula velocidade de corte
 * 
 * Fórmula: Vc = (π × D × n) / 1000
 * Fonte: Sandvik Coromant Handbook 2023, p.142
 * 
 * @param diametro - Diâmetro da ferramenta (mm)
 * @param rpm - Rotação (RPM)
 * @returns Velocidade de corte (m/min)
 * 
 * @throws {ValidationError} Se parâmetros negativos ou zero
 * @validado 09/01/2025
 * 
 * @example
 * const vc = calcularVelocidadeCorte(10, 6366);
 * // vc = 200 m/min
 */
```

### Comentários Inline

```typescript
// ✅ BOM - Explica o porquê
// Fator de correção para engajamento radial < 30%
// Fonte: Walter Tools Technical Guide 2023, p.78
if (engajamentoRadial < 0.3) {
  fz *= 1.3;
}

// ❌ RUIM - Óbvio, redundante
// Incrementa contador
contador++;

// ✅ BOM - Marca trabalho futuro
// TODO(Rafael): Adicionar suporte para materiais exóticos
// FIXME: Bug quando diâmetro < 1mm
```

### Comentários de Seção

```typescript
// ===================================
// VALIDAÇÃO DE ENTRADAS
// ===================================

if (diametro <= 0) {
  throw new ValidationError("Diâmetro inválido");
}

// ===================================
// CÁLCULO PRINCIPAL
// ===================================

const vc = (Math.PI * diametro * rpm) / 1000;
```

## Exemplos

### Sempre Incluir Exemplos

**Mínimo 1 exemplo por:**
- Função pública
- Componente React
- Hook customizado
- Padrão de uso

### Estrutura de Exemplo

```markdown
### Exemplo [N]: [Descrição do Caso]

**Contexto:** [Quando/Por que usar este exemplo]

**Código:**
```typescript
// Código do exemplo
```

**Resultado esperado:**
```
Output ou comportamento esperado
```

**Notas:** [Observações importantes sobre o exemplo]
```

### Tipos de Exemplos

1. **Exemplo Básico** - Uso mais simples possível
2. **Exemplo Completo** - Uso realista com validação
3. **Exemplo Avançado** - Caso complexo (opcional)

## Alertas e Avisos

### Caixas de Destaque

```markdown
> **⚠️ ATENÇÃO:** Informação importante que previne erros
> 
> Detalhes do alerta

> **💡 DICA:** Sugestão útil para melhorar uso
> 
> Detalhes da dica

> **📋 NOTA:** Informação adicional relevante
> 
> Detalhes da nota

> **🔴 CRÍTICO:** Risco de quebra, falha ou perda de dados
> 
> Detalhes do problema crítico
```

### Quando Usar Cada Tipo

- **⚠️ ATENÇÃO:** Prevenir erros comuns, limitações importantes
- **💡 DICA:** Otimizações, boas práticas, atalhos
- **📋 NOTA:** Contexto adicional, informações complementares
- **🔴 CRÍTICO:** Segurança, perda de dados, quebras

## Fórmulas Matemáticas

### Fórmulas Inline

```markdown
A velocidade de corte é calculada por `Vc = (π × D × n) / 1000`
```

### Fórmulas em Blocos

```markdown
## Fórmula

\`\`\`
Vc = (π × D × n) / 1000
\`\`\`

**Onde:**
- `Vc` = Velocidade de corte (m/min)
- `D` = Diâmetro da ferramenta (mm)
- `n` = Rotação (RPM)
```

### Sempre Incluir

1. A fórmula em formato legível
2. Definição de cada variável com unidade
3. Fonte técnica da fórmula
4. Exemplo numérico

## Fontes e Referências

### Citação de Fontes

```markdown
**Fonte:** Sandvik Coromant Handbook 2023, p.142

**Norma:** ISO 3685 - Tool-life testing

**Referências:**
1. Machining Data Handbook, 28th Edition, p.234-236
2. Kennametal Milling Catalog 2024, Section 2.3
3. ISO 14649-11:2004 - Machining data
```

### Formato de Referências

```markdown
[Fabricante/Organização] [Título do Documento], [Ano], [Páginas]

Exemplos:
- Sandvik Coromant Technical Handbook, 2023, p.142-145
- ISO 3685:1993 - Tool-life testing with single-point turning tools
- Machinery's Handbook, 31st Edition, 2020, p.1087-1090
```

## Versionamento

### Histórico de Mudanças

```markdown
## Histórico de Mudanças

| Data | Versão | Mudança | Autor |
|------|--------|---------|-------|
| 09/01/2025 | 1.0.0 | Criação inicial | Rafael Mestre |
| 15/01/2025 | 1.1.0 | Adicionada validação X | Rafael Mestre |
| 20/01/2025 | 1.1.1 | Correção bug Y | Rafael Mestre |
```

### Versionamento Semântico

- **Major (1.0.0):** Mudanças que quebram compatibilidade
- **Minor (0.1.0):** Novas funcionalidades compatíveis
- **Patch (0.0.1):** Correções de bugs, typos

## Metadados

### Cabeçalho de Documento

```markdown
# [Título do Documento]

**Status:** [Rascunho | Em Revisão | Aprovado | Obsoleto]

**Versão:** 1.0.0

**Autor:** Rafael Mestre

**Criado em:** 09/01/2025

**Última Atualização:** 09/01/2025

**Próxima Revisão:** 09/04/2025 (trimestral)

---

[Conteúdo do documento]
```

## Documentação de API

### Função

```markdown
### `nomeFuncao(param1, param2)`

Descrição breve do que a função faz.

**Parâmetros:**
- `param1` (number): Descrição do parâmetro 1
- `param2` (string, opcional): Descrição do parâmetro 2 (default: "valor")

**Retorna:** (number) Descrição do retorno

**Lança:**
- `ValidationError`: Quando param1 é negativo
- `TypeError`: Quando param2 não é string

**Exemplo:**
\`\`\`typescript
const resultado = nomeFuncao(10, "teste");
console.log(resultado); // 42
\`\`\`

**Ver também:**
- [outraFuncao()](#outrafuncao) - Função relacionada
```

### Componente React

```markdown
### `<NomeComponente>`

Descrição do componente.

**Props:**

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| prop1 | string | - | Obrigatória. Descrição |
| prop2 | number | 0 | Opcional. Descrição |
| onAction | (data: T) => void | - | Callback disparado quando... |

**Exemplo:**
\`\`\`tsx
<NomeComponente
  prop1="valor"
  prop2={42}
  onAction={(data) => console.log(data)}
/>
\`\`\`
```

## README de Projeto

### Estrutura Padrão

```markdown
# Nome do Projeto

[Badge de status, se aplicável]

Descrição breve e clara do projeto (1-2 frases).

## Características

- Feature 1
- Feature 2
- Feature 3

## Instalação

\`\`\`bash
npm install
\`\`\`

## Uso

Exemplo básico de como usar.

## Documentação

Link para documentação completa.

## Desenvolvimento

### Setup

\`\`\`bash
npm install
npm run dev
\`\`\`

### Estrutura

Breve explicação da estrutura de pastas.

### Scripts

- `npm run dev` - Desenvolvimento
- `npm run build` - Build de produção
- `npm test` - Executar testes

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS

## Licença

Proprietário - Rafael Mestre

## Contato

[Informações de contato se relevante]
```

## Checklist de Qualidade

Antes de finalizar documentação:

- [ ] Título claro e descritivo
- [ ] Visão geral presente
- [ ] Pelo menos 1 exemplo prático
- [ ] Fontes técnicas citadas (se aplicável)
- [ ] Código formatado corretamente
- [ ] Tabelas alinhadas
- [ ] Links funcionando
- [ ] Sem typos ou erros gramaticais
- [ ] Data de última atualização
- [ ] Linguagem clara e acessível

## Ferramentas

### Validação de Markdown

- Usar linter de Markdown (markdownlint)
- Verificar links quebrados
- Validar formatação de tabelas

### Formatação

- Editor com preview de Markdown
- Prettier para formatação automática
- Spell checker para português técnico

---

**Última Atualização:** 09/01/2025 - Rafael Mestre
