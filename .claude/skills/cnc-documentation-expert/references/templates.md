# Templates de Documentação - Sistema Mestre CNC

Este arquivo contém templates reutilizáveis para documentação do Sistema Mestre CNC.

## Template: Documentação de Função de Cálculo

```markdown
# [Nome da Função] - Documentação Técnica

## Visão Geral

**Objetivo:** [Descrição em uma linha do que a função faz]

**Localização:** `lib/calculations/[arquivo].ts`

## Fórmula

\`\`\`
[Equação matemática]
\`\`\`

**Onde:**
- `variavel1` = Descrição (unidade)
- `variavel2` = Descrição (unidade)
- `resultado` = Descrição (unidade)

## Fonte Técnica

**Fonte primária:** [Fabricante/Norma], [Ano], [Página]

**Norma aplicável:** [ISO/ANSI/DIN se existir]

**Validação:**
- Testado com valores de catálogo [Fabricante]
- Comparado com calculadora comercial [Nome]
- Data de validação: [DD/MM/AAAA]

## Parâmetros

### Entrada

| Parâmetro | Tipo | Unidade | Range Válido | Obrigatório |
|-----------|------|---------|--------------|-------------|
| param1 | number | mm | > 0 | Sim |
| param2 | number | RPM | 100-40000 | Sim |

### Saída

| Retorno | Tipo | Unidade | Range Esperado |
|---------|------|---------|----------------|
| resultado | number | m/min | 10-1500 |

## Casos de Uso

### Quando Usar

[Descrição de cenários onde esta função é aplicável]

Exemplos:
- Cálculo de RPM para fresamento
- Verificação de velocidade de corte
- Planejamento de operação

### Quando NÃO Usar

[Limitações e casos onde função não se aplica]

Exemplos:
- Não usar para tornos (use função específica)
- Não usar com materiais não catalogados

## Validações Implementadas

### Validação de Entrada

1. **Valores positivos:** Todos os parâmetros devem ser > 0
2. **Ranges:** Verifica se dentro de limites de máquina
3. **Tipos:** TypeScript valida tipos em compile-time

### Validação de Saída

1. **Limites de segurança:** Alerta se fora de range típico
2. **Sanity checks:** Compara com valores esperados
3. **Integração:** cnc-parameters-validator valida resultado

## Tratamento de Erros

### Erros Lançados

| Erro | Condição | Mensagem |
|------|----------|----------|
| ValidationError | param1 ≤ 0 | "Diâmetro deve ser positivo" |
| ValidationError | param2 ≤ 0 | "RPM deve ser positivo" |

### Avisos (Warnings)

| Aviso | Condição | Ação |
|-------|----------|------|
| console.warn | resultado > limite | Alertar usuário |

## Exemplos de Uso

### Exemplo 1: Uso Básico

\`\`\`typescript
import { calcularFuncao } from '@/lib/calculations/funcao';

const resultado = calcularFuncao(10, 6366);
console.log(resultado); // 200
\`\`\`

### Exemplo 2: Com Validação

\`\`\`typescript
import { calcularFuncao } from '@/lib/calculations/funcao';
import { validarResultado } from '@/lib/validations';

try {
  const resultado = calcularFuncao(diametro, rpm);
  const validacao = validarResultado(resultado, material);
  
  if (!validacao.valido) {
    console.warn(validacao.alertas);
  }
  
  return resultado;
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(error.message);
  }
}
\`\`\`

### Exemplo 3: Em Componente React

\`\`\`typescript
function Calculator() {
  const handleCalcular = () => {
    const vc = calcularFuncao(diameter, rpm);
    setResult(vc);
  };
  
  return <button onClick={handleCalcular}>Calcular</button>;
}
\`\`\`

## Testes

### Casos de Teste Cobertos

1. **Valores positivos normais:** ✓
2. **Valores no limite:** ✓
3. **Valores negativos:** ✓ (erro esperado)
4. **Valores zero:** ✓ (erro esperado)

### Valores Conhecidos (Validação)

| Entrada | Esperado | Obtido | Status |
|---------|----------|--------|--------|
| (10, 6366) | 200 | 200.0 | ✓ |
| (12, 5000) | 188.5 | 188.5 | ✓ |

## Dependências

### Funções Chamadas

- `validarParametros()` - Validação de entrada
- `formatarResultado()` - Formatação de saída (opcional)

### Constantes Utilizadas

- `LIMITES_MAQUINA` - De `constants/machines.ts`
- `MATERIAL_PROPERTIES` - De `constants/materials.ts`

## Histórico de Mudanças

| Data | Versão | Mudança | Autor |
|------|--------|---------|-------|
| 09/01/2025 | 1.0.0 | Criação inicial | Rafael Mestre |

## Notas Técnicas

[Informações adicionais relevantes]

- Fórmula baseada em ISO 3685
- Valores conservadores para máquinas convencionais
- Considerar fator de correção para HSM

## Referências

1. [Fabricante] Handbook, [Ano], p.[Página]
2. [Norma] - [Título completo]
3. [Outro documento técnico relevante]

---

**Última Atualização:** [DD/MM/AAAA]
**Próxima Revisão:** [DD/MM/AAAA] (trimestral)
```

## Template: Documentação de Componente React

```markdown
# [NomeComponente] - Documentação

## Visão Geral

**Tipo:** [Form | Display | Layout | UI]

**Objetivo:** [Descrição breve do propósito]

**Localização:** `components/[categoria]/[NomeComponente]/`

## Interface (Props)

\`\`\`typescript
interface NomeComponenteProps {
  // Props obrigatórias
  prop1: string;              // Descrição da prop1
  prop2: number;              // Descrição da prop2
  onAction: (data: T) => void; // Callback quando ação ocorre
  
  // Props opcionais
  prop3?: boolean;            // Descrição (default: false)
  className?: string;         // Classes CSS customizadas
  disabled?: boolean;         // Desabilitar componente (default: false)
}
\`\`\`

## Estado Interno

| Estado | Tipo | Inicial | Descrição |
|--------|------|---------|-----------|
| campo1 | string | '' | Input de texto |
| campo2 | number | 0 | Input numérico |
| erro | string\|null | null | Mensagem de erro |

## Comportamento

### Fluxo Principal

1. Usuário interage com inputs
2. Estado atualiza via `onChange`
3. Validação local (se aplicável)
4. Submit chama `onAction` callback
5. Pai recebe dados e processa

### Validação

**Validação local (antes de submit):**
- Campo1 não pode ser vazio
- Campo2 deve ser positivo

**Validação externa (no pai):**
- Valores dentro de limites de segurança
- Compatibilidade com material selecionado

## Eventos

| Evento | Quando Dispara | Dados Enviados |
|--------|----------------|----------------|
| onAction | Submit do form | { campo1, campo2 } |
| onChange (interno) | Input muda | Novo valor |

## Estilos

**Classes Tailwind principais:**
```
form: space-y-4
inputs: w-full rounded-md border p-2
button: px-4 py-2 bg-blue-600 text-white rounded
```

**Responsivo:**
- Mobile: inputs full-width
- Desktop: max-width limitado

## Dependências

### Componentes Importados

- `Input` - De `@/components/ui/Input`
- `Button` - De `@/components/ui/Button`
- `Alert` - De `@/components/ui/Alert`

### Hooks Utilizados

- `useState` - Estado local
- `useCallback` - Memoização de handlers
- `useCalculosStore` - Estado global (se aplicável)

## Exemplos de Uso

### Exemplo 1: Uso Básico

\`\`\`typescript
import { NomeComponente } from '@/components/categoria/NomeComponente';

function ParentComponent() {
  const handleSubmit = (data) => {
    console.log('Dados:', data);
  };
  
  return (
    <NomeComponente
      prop1="valor"
      prop2={123}
      onAction={handleSubmit}
    />
  );
}
\`\`\`

### Exemplo 2: Com Estado Global

\`\`\`typescript
import { useCalculosStore } from '@/store/calculosStore';

function ParentComponent() {
  const { adicionarCalculo } = useCalculosStore();
  
  const handleSubmit = (data) => {
    const resultado = calcular(data);
    adicionarCalculo(resultado);
  };
  
  return <NomeComponente onAction={handleSubmit} />;
}
\`\`\`

### Exemplo 3: Customizado

\`\`\`typescript
<NomeComponente
  prop1="custom"
  prop2={999}
  prop3={true}
  className="custom-classes"
  disabled={isLoading}
  onAction={handleSubmit}
/>
\`\`\`

## Acessibilidade

- ✓ Labels associados a inputs via `htmlFor`
- ✓ ARIA attributes onde necessário
- ✓ Navegação por teclado funcional
- ✓ Mensagens de erro anunciadas

## Testes

### Cenários Testados

1. Renderização inicial
2. Interação com inputs
3. Validação de campos
4. Submit com dados válidos
5. Submit com dados inválidos
6. Estado disabled

## Melhorias Futuras

- [ ] Adicionar debounce nos inputs
- [ ] Suporte a validação assíncrona
- [ ] Internacionalização (i18n)

## Histórico

| Data | Versão | Mudança |
|------|--------|---------|
| 09/01/2025 | 1.0.0 | Criação |

---

**Última Atualização:** [DD/MM/AAAA]
```

## Template: Spec Técnica de Feature

```markdown
# Feature: [Nome da Feature]

## Resumo Executivo

**Status:** [Planejamento | Em Desenvolvimento | Concluído]

**Prioridade:** [Alta | Média | Baixa]

**Objetivo:** [Descrição em 1-2 frases do que a feature faz]

**Stakeholder:** Rafael Mestre

## Contexto

### Problema

[Descrição do problema que esta feature resolve]

### Motivação

[Por que esta feature é importante]

### Benefícios

- Benefício 1
- Benefício 2
- Benefício 3

## Requisitos Funcionais

### RF01: [Nome do Requisito]

**Descrição:** [O que deve fazer]

**Critérios de Aceitação:**
- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

**Prioridade:** [Must Have | Should Have | Nice to Have]

### RF02: [Outro Requisito]

[...]

## Requisitos Não-Funcionais

### Performance

- Cálculos devem executar em < 100ms
- Interface deve responder em < 50ms

### Compatibilidade

- Navegadores: Chrome, Firefox, Safari (últimas 2 versões)
- Dispositivos: Desktop, Tablet, Mobile

### Segurança

- Validação de todos os inputs
- Sanitização de dados exibidos

## Arquitetura

### Componentes Necessários

| Componente | Tipo | Localização | Descrição |
|------------|------|-------------|-----------|
| FeatureForm | Form | components/forms/ | Entrada de dados |
| FeatureDisplay | Display | components/display/ | Exibição resultados |
| calcularFeature | Function | lib/calculations/ | Lógica de cálculo |

### Fluxo de Dados

\`\`\`
User Input → FeatureForm 
          → Validation 
          → calcularFeature() 
          → Store (Zustand) 
          → FeatureDisplay
\`\`\`

### Estado

**Estado local:**
- Inputs do formulário

**Estado global:**
- Resultado do cálculo
- Histórico (se aplicável)

## Design de Interface

### Wireframe

[Descrição textual ou link para design]

### Elementos UI

- Input de [Campo]
- Select de [Opções]
- Button de [Ação]
- Display de [Resultado]

## Implementação

### Arquivos a Criar

1. `components/forms/FeatureForm/FeatureForm.tsx`
2. `components/display/FeatureDisplay/FeatureDisplay.tsx`
3. `lib/calculations/feature.ts`
4. `types/feature.types.ts`
5. `lib/validations/featureValidator.ts`

### Dependências

**Novas:**
- Nenhuma (ou lista de packages)

**Existentes:**
- React, TypeScript, Tailwind
- Zustand (estado)
- cnc-parameters-validator (validação)

### Ordem de Implementação

1. Definir types (types/feature.types.ts)
2. Implementar cálculo (lib/calculations/feature.ts)
3. Implementar validação (lib/validations/)
4. Criar componente de input (FeatureForm)
5. Criar componente de output (FeatureDisplay)
6. Integrar com store (se necessário)
7. Testar fluxo completo

## Testes

### Casos de Teste

| ID | Descrição | Entrada | Esperado |
|----|-----------|---------|----------|
| T01 | Cálculo básico | {a: 10, b: 5} | 15 |
| T02 | Validação erro | {a: -1, b: 5} | ValidationError |
| T03 | Limite superior | {a: 9999, b: 1} | Alerta |

### Validação de Integração

- [ ] FeatureForm → calcularFeature → FeatureDisplay
- [ ] Validação de erros exibida corretamente
- [ ] Estado persiste no Zustand

## Documentação

### Documentos a Criar

- [ ] Documentação da função de cálculo
- [ ] Documentação do componente FeatureForm
- [ ] Documentação do componente FeatureDisplay
- [ ] Atualizar README.md do projeto

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Fórmula incorreta | Baixa | Alto | Validar com cnc-parameters-validator |
| Performance ruim | Média | Médio | Usar useMemo para cálculos |

## Timeline

| Fase | Duração Estimada | Status |
|------|------------------|--------|
| Design | 1 dia | ⏳ |
| Implementação | 2-3 dias | ⏳ |
| Testes | 1 dia | ⏳ |
| Documentação | 1 dia | ⏳ |

**Total:** ~5 dias

## Critérios de Conclusão

- [ ] Todos os requisitos funcionais implementados
- [ ] Testes passando
- [ ] Documentação completa
- [ ] Code review aprovado
- [ ] Deploy em ambiente de teste
- [ ] Aprovação do Rafael

## Notas Adicionais

[Qualquer informação adicional relevante]

---

**Criado em:** [DD/MM/AAAA]
**Última Atualização:** [DD/MM/AAAA]
**Autor:** Claude com Rafael Mestre
```

## Template: README de Módulo

```markdown
# [Nome do Módulo]

[Breve descrição do propósito do módulo]

## Instalação

\`\`\`bash
npm install
\`\`\`

## Uso

### Importação

\`\`\`typescript
import { funcao1, funcao2 } from '@/lib/[modulo]';
\`\`\`

### Exemplo Básico

\`\`\`typescript
const resultado = funcao1(param1, param2);
console.log(resultado);
\`\`\`

## API

### funcao1(param1, param2)

Descrição da função.

**Parâmetros:**
- `param1` (number): Descrição
- `param2` (string): Descrição

**Retorna:** (number) Descrição do retorno

**Exemplo:**
\`\`\`typescript
const x = funcao1(10, "teste");
\`\`\`

## Estrutura

\`\`\`
modulo/
├── index.ts          # Exports públicos
├── funcao1.ts        # Implementação
├── funcao2.ts
├── types.ts          # Types do módulo
└── __tests__/        # Testes
\`\`\`

## Dependências

- Nenhuma (ou lista)

## Testes

\`\`\`bash
npm test
\`\`\`

## Contribuindo

[Instruções para contribuir, se aplicável]

## Licença

Proprietário - Rafael Mestre
```

---

**Última Atualização:** 09/01/2025 - Rafael Mestre
