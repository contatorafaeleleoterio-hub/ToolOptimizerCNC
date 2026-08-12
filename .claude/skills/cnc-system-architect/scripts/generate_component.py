#!/usr/bin/env python3
"""
Gerador de Templates de Componentes React/TypeScript
Para Sistema Mestre CNC

Uso:
  python3 generate_component.py ComponentName [--type form|display|layout]
  
Exemplos:
  python3 generate_component.py MaterialSelector --type form
  python3 generate_component.py ResultsPanel --type display
"""

import sys
import os
from pathlib import Path
from typing import Literal

ComponentType = Literal['form', 'display', 'layout', 'ui']

TEMPLATES = {
    'form': '''import {{ useState, useCallback, FormEvent }} from 'react';

interface {component_name}Props {{
  onSubmit: (data: {component_name}Data) => void;
  initialData?: Partial<{component_name}Data>;
  disabled?: boolean;
}}

interface {component_name}Data {{
  // TODO: Definir campos do formulário
  campo1: string;
  campo2: number;
}}

export function {component_name}({{
  onSubmit,
  initialData,
  disabled = false
}}: {component_name}Props) {{
  // State para cada campo
  const [campo1, setCampo1] = useState(initialData?.campo1 ?? '');
  const [campo2, setCampo2] = useState(initialData?.campo2 ?? 0);
  
  // Handler de submit
  const handleSubmit = useCallback((e: FormEvent) => {{
    e.preventDefault();
    
    // Validação básica
    if (!campo1) {{
      console.warn('Campo1 é obrigatório');
      return;
    }}
    
    // Chamar callback
    onSubmit({{
      campo1,
      campo2
    }});
  }}, [campo1, campo2, onSubmit]);
  
  return (
    <form onSubmit={{handleSubmit}} className="space-y-4">
      <div>
        <label htmlFor="campo1" className="block text-sm font-medium">
          Campo 1
        </label>
        <input
          id="campo1"
          type="text"
          value={{campo1}}
          onChange={{(e) => setCampo1(e.target.value)}}
          disabled={{disabled}}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>
      
      <div>
        <label htmlFor="campo2" className="block text-sm font-medium">
          Campo 2
        </label>
        <input
          id="campo2"
          type="number"
          value={{campo2}}
          onChange={{(e) => setCampo2(Number(e.target.value))}}
          disabled={{disabled}}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>
      
      <button
        type="submit"
        disabled={{disabled}}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Enviar
      </button>
    </form>
  );
}}
''',
    
    'display': '''import {{ useMemo }} from 'react';

interface {component_name}Props {{
  data: {component_name}Data;
  onAction?: () => void;
}}

interface {component_name}Data {{
  // TODO: Definir estrutura dos dados
  titulo: string;
  valor: number;
}}

export function {component_name}({{
  data,
  onAction
}}: {component_name}Props) {{
  // Cálculos/transformações derivadas
  const valorFormatado = useMemo(() => {{
    return data.valor.toFixed(2);
  }}, [data.valor]);
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">
        {{data.titulo}}
      </h3>
      
      <div className="text-2xl font-bold text-blue-600">
        {{valorFormatado}}
      </div>
      
      {{onAction && (
        <button
          onClick={{onAction}}
          className="mt-4 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          Ação
        </button>
      )}}
    </div>
  );
}}
''',
    
    'layout': '''import {{ ReactNode }} from 'react';

interface {component_name}Props {{
  children: ReactNode;
  className?: string;
}}

export function {component_name}({{
  children,
  className = ''
}}: {component_name}Props) {{
  return (
    <div className={{`{component_name_lower} ${{className}}`}}>
      {{children}}
    </div>
  );
}}
''',
    
    'ui': '''import {{ ButtonHTMLAttributes, forwardRef }} from 'react';

interface {component_name}Props extends ButtonHTMLAttributes<HTMLButtonElement> {{
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}}

export const {component_name} = forwardRef<HTMLButtonElement, {component_name}Props>(
  ({{ variant = 'primary', size = 'md', className = '', children, ...props }}, ref) => {{
    const baseClasses = 'rounded font-medium transition-colors';
    
    const variantClasses = {{
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      danger: 'bg-red-600 text-white hover:bg-red-700'
    }};
    
    const sizeClasses = {{
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    }};
    
    return (
      <button
        ref={{ref}}
        className={{`${{baseClasses}} ${{variantClasses[variant]}} ${{sizeClasses[size]}} ${{className}}`}}
        {{...props}}
      >
        {{children}}
      </button>
    );
  }}
);

{component_name}.displayName = '{component_name}';
'''
}

TEST_TEMPLATE = '''import {{ describe, it, expect }} from 'vitest';
import {{ render, screen }} from '@testing-library/react';
import {{ {component_name} }} from '../{component_name}';

describe('{component_name}', () => {{
  it('renderiza corretamente', () => {{
    render(<{component_name} />);
    // TODO: Adicionar assertions
  }});
}});
'''


def generate_component(
    component_name: str,
    component_type: ComponentType = 'display',
    output_dir: str = '.'
):
    """
    Gera arquivos de template para um componente React/TypeScript
    
    Args:
        component_name: Nome do componente (PascalCase)
        component_type: Tipo de template (form, display, layout, ui)
        output_dir: Diretório de saída
    """
    
    # Validar nome do componente
    if not component_name[0].isupper():
        raise ValueError("Nome do componente deve estar em PascalCase (primeira letra maiúscula)")
    
    # Obter template
    template = TEMPLATES.get(component_type)
    if not template:
        raise ValueError(f"Tipo de componente inválido: {component_type}")
    
    # Preparar variáveis
    component_name_lower = component_name[0].lower() + component_name[1:]
    
    # Substituir placeholders
    component_code = template.format(
        component_name=component_name,
        component_name_lower=component_name_lower
    )
    
    test_code = TEST_TEMPLATE.format(
        component_name=component_name
    )
    
    # Criar diretórios se não existirem
    component_dir = Path(output_dir) / component_name
    test_dir = component_dir / '__tests__'
    
    component_dir.mkdir(parents=True, exist_ok=True)
    test_dir.mkdir(parents=True, exist_ok=True)
    
    # Escrever arquivos
    component_file = component_dir / f"{component_name}.tsx"
    test_file = test_dir / f"{component_name}.test.tsx"
    index_file = component_dir / "index.ts"
    
    # Componente principal
    with open(component_file, 'w', encoding='utf-8') as f:
        f.write(component_code)
    
    # Teste
    with open(test_file, 'w', encoding='utf-8') as f:
        f.write(test_code)
    
    # Index (re-export)
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(f"export {{ {component_name} }} from './{component_name}';\n")
        f.write(f"export type {{ {component_name}Props, {component_name}Data }} from './{component_name}';\n")
    
    print(f"✅ Componente criado: {component_dir}")
    print(f"   - {component_file.name}")
    print(f"   - {index_file.name}")
    print(f"   - {test_dir.name}/{test_file.name}")
    
    return str(component_dir)


def print_usage():
    """Imprime instruções de uso"""
    print(__doc__)


def main():
    """Função principal CLI"""
    if len(sys.argv) < 2:
        print_usage()
        sys.exit(1)
    
    component_name = sys.argv[1]
    
    # Verificar flags
    component_type: ComponentType = 'display'  # default
    output_dir = '.'
    
    for i, arg in enumerate(sys.argv[2:], 2):
        if arg == '--type' and i + 1 < len(sys.argv):
            component_type = sys.argv[i + 1]  # type: ignore
        elif arg == '--output' and i + 1 < len(sys.argv):
            output_dir = sys.argv[i + 1]
    
    try:
        generate_component(component_name, component_type, output_dir)
    except Exception as e:
        print(f"❌ Erro: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
