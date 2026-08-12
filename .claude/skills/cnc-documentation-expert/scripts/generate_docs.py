#!/usr/bin/env python3
"""
Gerador de Documentação - Sistema Mestre CNC

Gera documentação em markdown a partir de templates.

Uso:
  python3 generate_docs.py [tipo] [nome] [--output dir]
  
Tipos disponíveis:
  - function: Documentação de função de cálculo
  - component: Documentação de componente React
  - spec: Especificação técnica de feature
  - module: README de módulo

Exemplos:
  python3 generate_docs.py function calcularVelocidadeCorte
  python3 generate_docs.py component MaterialSelector
  python3 generate_docs.py spec HistoricoCalculos
"""

import sys
import os
from pathlib import Path
from datetime import datetime
from typing import Literal

DocType = Literal['function', 'component', 'spec', 'module']


def get_current_date() -> str:
    """Retorna data atual no formato DD/MM/AAAA"""
    return datetime.now().strftime("%d/%m/%Y")


def get_next_quarter_date() -> str:
    """Retorna data do próximo trimestre"""
    today = datetime.now()
    month = today.month + 3
    year = today.year
    if month > 12:
        month -= 12
        year += 1
    return f"{today.day:02d}/{month:02d}/{year}"


TEMPLATES = {
    'function': '''# {function_name} - Documentação Técnica

## Visão Geral

**Objetivo:** Calcular [COMPLETAR: descrição breve]

**Localização:** `lib/calculations/{filename}.ts`

## Fórmula

```
[COMPLETAR: Equação matemática]
```

**Onde:**
- `variavel1` = [COMPLETAR: Descrição] (unidade)
- `variavel2` = [COMPLETAR: Descrição] (unidade)
- `resultado` = [COMPLETAR: Descrição] (unidade)

## Fonte Técnica

**Fonte primária:** [COMPLETAR: Fabricante/Norma, Ano, Página]

**Norma aplicável:** [COMPLETAR: ISO/ANSI/DIN ou "N/A"]

**Validação:**
- [ ] Testado com valores de catálogo
- [ ] Comparado com calculadora comercial
- Data de validação: {current_date}

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

[COMPLETAR: Descrição de cenários aplicáveis]

### Quando NÃO Usar

[COMPLETAR: Limitações e casos não aplicáveis]

## Validações Implementadas

### Validação de Entrada

1. **Valores positivos:** [COMPLETAR]
2. **Ranges:** [COMPLETAR]
3. **Tipos:** TypeScript valida em compile-time

### Validação de Saída

1. **Limites de segurança:** [COMPLETAR]
2. **Sanity checks:** [COMPLETAR]
3. **Integração:** cnc-parameters-validator

## Tratamento de Erros

### Erros Lançados

| Erro | Condição | Mensagem |
|------|----------|----------|
| ValidationError | [COMPLETAR] | "[COMPLETAR]" |

### Avisos (Warnings)

| Aviso | Condição | Ação |
|-------|----------|------|
| console.warn | [COMPLETAR] | [COMPLETAR] |

## Exemplos de Uso

### Exemplo 1: Uso Básico

```typescript
import {{ {function_name} }} from '@/lib/calculations/{filename}';

const resultado = {function_name}(10, 6366);
console.log(resultado); // [COMPLETAR: valor esperado]
```

### Exemplo 2: Com Validação

```typescript
try {{
  const resultado = {function_name}(diametro, rpm);
  // Usar resultado
}} catch (error) {{
  if (error instanceof ValidationError) {{
    console.error(error.message);
  }}
}}
```

## Testes

### Casos de Teste Cobertos

- [ ] Valores positivos normais
- [ ] Valores no limite
- [ ] Valores negativos (erro esperado)
- [ ] Valores zero (erro esperado)

### Valores Conhecidos (Validação)

| Entrada | Esperado | Obtido | Status |
|---------|----------|--------|--------|
| [COMPLETAR] | [COMPLETAR] | [COMPLETAR] | ⏳ |

## Dependências

### Funções Chamadas

- [COMPLETAR: Lista de funções usadas]

### Constantes Utilizadas

- [COMPLETAR: Constantes de constants/]

## Histórico de Mudanças

| Data | Versão | Mudança | Autor |
|------|--------|---------|-------|
| {current_date} | 1.0.0 | Criação inicial | Rafael Mestre |

## Notas Técnicas

[COMPLETAR: Informações adicionais relevantes]

## Referências

1. [COMPLETAR: Fonte 1]
2. [COMPLETAR: Fonte 2]

---

**Última Atualização:** {current_date}
**Próxima Revisão:** {next_review} (trimestral)
''',

    'component': '''# {component_name} - Documentação

## Visão Geral

**Tipo:** [COMPLETAR: Form | Display | Layout | UI]

**Objetivo:** [COMPLETAR: Descrição breve do propósito]

**Localização:** `components/[categoria]/{component_name}/`

## Interface (Props)

```typescript
interface {component_name}Props {{
  // Props obrigatórias
  prop1: string;              // [COMPLETAR: Descrição]
  onAction: (data: T) => void; // [COMPLETAR: Quando dispara]
  
  // Props opcionais
  className?: string;         // Classes CSS customizadas
  disabled?: boolean;         // Desabilitar componente (default: false)
}}
```

## Estado Interno

| Estado | Tipo | Inicial | Descrição |
|--------|------|---------|-----------|
| [COMPLETAR] | string | '' | [COMPLETAR] |

## Comportamento

### Fluxo Principal

1. [COMPLETAR: Passo 1]
2. [COMPLETAR: Passo 2]
3. [COMPLETAR: Passo 3]

### Validação

**Validação local:**
- [COMPLETAR: Validações no componente]

**Validação externa:**
- [COMPLETAR: Validações no pai]

## Eventos

| Evento | Quando Dispara | Dados Enviados |
|--------|----------------|----------------|
| onAction | [COMPLETAR] | [COMPLETAR] |

## Estilos

**Classes Tailwind principais:**
```
[COMPLETAR: Classes principais]
```

**Responsivo:**
- Mobile: [COMPLETAR]
- Desktop: [COMPLETAR]

## Dependências

### Componentes Importados

- [COMPLETAR: Lista de componentes]

### Hooks Utilizados

- `useState` - [COMPLETAR: Para que]
- `useCallback` - [COMPLETAR: Para que]

## Exemplos de Uso

### Exemplo 1: Uso Básico

```typescript
import {{ {component_name} }} from '@/components/[categoria]/{component_name}';

function ParentComponent() {{
  const handleAction = (data) => {{
    console.log('Dados:', data);
  }};
  
  return (
    <{component_name}
      prop1="valor"
      onAction={{handleAction}}
    />
  );
}}
```

## Acessibilidade

- [ ] Labels associados a inputs via `htmlFor`
- [ ] ARIA attributes implementados
- [ ] Navegação por teclado funcional
- [ ] Mensagens de erro anunciadas

## Testes

### Cenários Testados

- [ ] Renderização inicial
- [ ] Interação com inputs
- [ ] Submit com dados válidos
- [ ] Estado disabled

## Melhorias Futuras

- [ ] [COMPLETAR: Melhoria 1]
- [ ] [COMPLETAR: Melhoria 2]

## Histórico

| Data | Versão | Mudança |
|------|--------|---------|
| {current_date} | 1.0.0 | Criação |

---

**Última Atualização:** {current_date}
''',

    'spec': '''# Feature: {feature_name}

## Resumo Executivo

**Status:** Planejamento

**Prioridade:** [COMPLETAR: Alta | Média | Baixa]

**Objetivo:** [COMPLETAR: Descrição em 1-2 frases]

**Stakeholder:** Rafael Mestre

## Contexto

### Problema

[COMPLETAR: Descrição do problema]

### Motivação

[COMPLETAR: Por que esta feature é importante]

### Benefícios

- [COMPLETAR: Benefício 1]
- [COMPLETAR: Benefício 2]

## Requisitos Funcionais

### RF01: [Nome do Requisito]

**Descrição:** [COMPLETAR: O que deve fazer]

**Critérios de Aceitação:**
- [ ] [COMPLETAR: Critério 1]
- [ ] [COMPLETAR: Critério 2]

**Prioridade:** [COMPLETAR: Must Have | Should Have | Nice to Have]

## Requisitos Não-Funcionais

### Performance

- [COMPLETAR: Requisitos de performance]

### Compatibilidade

- Navegadores: Chrome, Firefox, Safari (últimas 2 versões)
- Dispositivos: Desktop, Tablet, Mobile

## Arquitetura

### Componentes Necessários

| Componente | Tipo | Localização | Descrição |
|------------|------|-------------|-----------|
| [COMPLETAR] | [COMPLETAR] | [COMPLETAR] | [COMPLETAR] |

### Fluxo de Dados

```
[COMPLETAR: Fluxo de dados]
```

### Estado

**Estado local:**
- [COMPLETAR: Lista]

**Estado global:**
- [COMPLETAR: Lista]

## Implementação

### Arquivos a Criar

1. [COMPLETAR: Arquivo 1]
2. [COMPLETAR: Arquivo 2]

### Ordem de Implementação

1. [COMPLETAR: Passo 1]
2. [COMPLETAR: Passo 2]

## Testes

### Casos de Teste

| ID | Descrição | Entrada | Esperado |
|----|-----------|---------|----------|
| T01 | [COMPLETAR] | [COMPLETAR] | [COMPLETAR] |

## Documentação

### Documentos a Criar

- [ ] Documentação da função
- [ ] Documentação do componente
- [ ] Atualizar README.md

## Timeline

| Fase | Duração Estimada | Status |
|------|------------------|--------|
| Design | [COMPLETAR] | ⏳ |
| Implementação | [COMPLETAR] | ⏳ |
| Testes | [COMPLETAR] | ⏳ |
| Documentação | [COMPLETAR] | ⏳ |

## Critérios de Conclusão

- [ ] Todos os requisitos implementados
- [ ] Testes passando
- [ ] Documentação completa
- [ ] Aprovação do Rafael

---

**Criado em:** {current_date}
**Autor:** Claude com Rafael Mestre
''',

    'module': '''# {module_name}

[COMPLETAR: Breve descrição do propósito do módulo]

## Uso

### Importação

```typescript
import {{ funcao1, funcao2 }} from '@/lib/{module_name_lower}';
```

### Exemplo Básico

```typescript
const resultado = funcao1(param1, param2);
console.log(resultado);
```

## API

### funcao1(param1, param2)

[COMPLETAR: Descrição da função]

**Parâmetros:**
- `param1` (type): [COMPLETAR: Descrição]
- `param2` (type): [COMPLETAR: Descrição]

**Retorna:** (type) [COMPLETAR: Descrição]

**Exemplo:**
```typescript
const x = funcao1(10, "teste");
```

## Estrutura

```
{module_name_lower}/
├── index.ts          # Exports públicos
├── funcao1.ts        # Implementação
├── types.ts          # Types do módulo
└── __tests__/        # Testes
```

## Dependências

- [COMPLETAR: Lista de dependências ou "Nenhuma"]

## Testes

```bash
npm test
```

## Licença

Proprietário - Rafael Mestre

---

**Última Atualização:** {current_date}
'''
}


def generate_doc(
    doc_type: DocType,
    name: str,
    output_dir: str = '.'
) -> str:
    """
    Gera documentação a partir de template
    
    Args:
        doc_type: Tipo de documentação (function, component, spec, module)
        name: Nome do elemento a documentar
        output_dir: Diretório de saída
        
    Returns:
        Caminho do arquivo gerado
    """
    
    # Obter template
    template = TEMPLATES.get(doc_type)
    if not template:
        raise ValueError(f"Tipo de documentação inválido: {doc_type}")
    
    # Preparar variáveis
    current_date = get_current_date()
    next_review = get_next_quarter_date()
    
    # Nome do arquivo
    if doc_type == 'function':
        filename = name
        function_name = name
    elif doc_type == 'component':
        filename = name
        component_name = name
    elif doc_type == 'spec':
        filename = name
        feature_name = name
    else:  # module
        filename = name
        module_name = name
        module_name_lower = name.lower()
    
    # Substituir placeholders
    doc_content = template.format(
        current_date=current_date,
        next_review=next_review,
        filename=filename,
        function_name=locals().get('function_name', ''),
        component_name=locals().get('component_name', ''),
        feature_name=locals().get('feature_name', ''),
        module_name=locals().get('module_name', ''),
        module_name_lower=locals().get('module_name_lower', '')
    )
    
    # Criar diretório se não existir
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Nome do arquivo de saída
    if doc_type == 'spec':
        output_file = output_path / f"SPEC_{name}.md"
    else:
        output_file = output_path / f"{name}_docs.md"
    
    # Escrever arquivo
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(doc_content)
    
    print(f"✅ Documentação criada: {output_file}")
    print(f"\n📝 Próximos passos:")
    print(f"   1. Abrir {output_file.name}")
    print(f"   2. Completar seções marcadas com [COMPLETAR]")
    print(f"   3. Adicionar exemplos específicos")
    print(f"   4. Validar fontes técnicas")
    
    return str(output_file)


def print_usage():
    """Imprime instruções de uso"""
    print(__doc__)


def main():
    """Função principal CLI"""
    if len(sys.argv) < 3:
        print_usage()
        sys.exit(1)
    
    doc_type = sys.argv[1]
    name = sys.argv[2]
    
    # Verificar flags
    output_dir = '.'
    for i, arg in enumerate(sys.argv[3:], 3):
        if arg == '--output' and i + 1 < len(sys.argv):
            output_dir = sys.argv[i + 1]
    
    try:
        generate_doc(doc_type, name, output_dir)  # type: ignore
    except Exception as e:
        print(f"❌ Erro: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
