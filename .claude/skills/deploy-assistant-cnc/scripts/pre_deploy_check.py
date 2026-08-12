#!/usr/bin/env python3
"""
Pre-Deploy Checker - Sistema Mestre CNC

Verifica se o projeto está pronto para deploy no Vercel.

Uso:
  python3 pre_deploy_check.py [--path /caminho/projeto]
  
Exemplo:
  python3 pre_deploy_check.py --path ../sistema-mestre-cnc
"""

import sys
import os
import json
import subprocess
from pathlib import Path
from typing import Dict, List, Tuple


class Color:
    """Cores ANSI para terminal"""
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    END = '\033[0m'


class PreDeployChecker:
    """Verifica se projeto está pronto para deploy"""
    
    def __init__(self, project_path: str = '.'):
        self.project_path = Path(project_path).resolve()
        self.issues: List[str] = []
        self.warnings: List[str] = []
        self.passed: List[str] = []
        
    def print_header(self, text: str):
        """Imprime cabeçalho"""
        print(f"\n{Color.BOLD}{Color.BLUE}{'=' * 60}{Color.END}")
        print(f"{Color.BOLD}{Color.BLUE}{text}{Color.END}")
        print(f"{Color.BOLD}{Color.BLUE}{'=' * 60}{Color.END}\n")
    
    def print_check(self, name: str, passed: bool, message: str = ""):
        """Imprime resultado de verificação"""
        if passed:
            icon = f"{Color.GREEN}✓{Color.END}"
            self.passed.append(name)
        else:
            icon = f"{Color.RED}✗{Color.END}"
            self.issues.append(name)
        
        print(f"{icon} {name}")
        if message:
            print(f"  {message}")
    
    def print_warning(self, name: str, message: str):
        """Imprime aviso"""
        icon = f"{Color.YELLOW}⚠{Color.END}"
        self.warnings.append(name)
        print(f"{icon} {name}")
        print(f"  {message}")
    
    def check_file_exists(self, filename: str) -> bool:
        """Verifica se arquivo existe"""
        return (self.project_path / filename).exists()
    
    def check_package_json(self) -> Tuple[bool, str]:
        """Verifica package.json"""
        pkg_path = self.project_path / 'package.json'
        
        if not pkg_path.exists():
            return False, "Arquivo package.json não encontrado"
        
        try:
            with open(pkg_path, 'r') as f:
                pkg = json.load(f)
            
            # Verificar scripts essenciais
            scripts = pkg.get('scripts', {})
            required_scripts = ['build', 'dev']
            missing_scripts = [s for s in required_scripts if s not in scripts]
            
            if missing_scripts:
                return False, f"Scripts faltando: {', '.join(missing_scripts)}"
            
            # Verificar se build usa TypeScript
            build_cmd = scripts.get('build', '')
            if 'tsc' not in build_cmd:
                return False, "Build não compila TypeScript (falta 'tsc')"
            
            return True, f"Scripts: {', '.join(scripts.keys())}"
            
        except json.JSONDecodeError:
            return False, "package.json inválido (JSON malformado)"
        except Exception as e:
            return False, f"Erro ao ler package.json: {str(e)}"
    
    def check_typescript_config(self) -> Tuple[bool, str]:
        """Verifica tsconfig.json"""
        ts_path = self.project_path / 'tsconfig.json'
        
        if not ts_path.exists():
            return False, "tsconfig.json não encontrado"
        
        try:
            with open(ts_path, 'r') as f:
                # Verificar apenas se é JSON válido
                json.load(f)
            return True, "TypeScript configurado"
        except json.JSONDecodeError:
            return False, "tsconfig.json inválido"
    
    def check_gitignore(self) -> Tuple[bool, str]:
        """Verifica .gitignore"""
        gitignore_path = self.project_path / '.gitignore'
        
        if not gitignore_path.exists():
            return False, ".gitignore não encontrado"
        
        with open(gitignore_path, 'r') as f:
            content = f.read()
        
        required = ['node_modules', 'dist', '.env']
        missing = [item for item in required if item not in content]
        
        if missing:
            return False, f"Faltam entradas: {', '.join(missing)}"
        
        return True, "Entradas essenciais presentes"
    
    def check_env_example(self) -> Tuple[bool, str]:
        """Verifica .env.example"""
        env_example = self.project_path / '.env.example'
        
        if not env_example.exists():
            return False, ".env.example não encontrado (recomendado)"
        
        return True, ".env.example presente"
    
    def check_vite_config(self) -> Tuple[bool, str]:
        """Verifica vite.config.ts"""
        vite_configs = [
            self.project_path / 'vite.config.ts',
            self.project_path / 'vite.config.js'
        ]
        
        for config in vite_configs:
            if config.exists():
                return True, f"Vite configurado ({config.name})"
        
        return False, "vite.config.ts não encontrado"
    
    def check_build_local(self) -> Tuple[bool, str]:
        """Tenta fazer build local"""
        try:
            result = subprocess.run(
                ['npm', 'run', 'build'],
                cwd=self.project_path,
                capture_output=True,
                text=True,
                timeout=120  # 2 minutos
            )
            
            if result.returncode == 0:
                return True, "Build completou com sucesso"
            else:
                error_msg = result.stderr[:200] if result.stderr else "Erro desconhecido"
                return False, f"Build falhou: {error_msg}"
                
        except subprocess.TimeoutExpired:
            return False, "Build timeout (>2 minutos)"
        except FileNotFoundError:
            return False, "npm não encontrado (instale Node.js)"
        except Exception as e:
            return False, f"Erro ao executar build: {str(e)}"
    
    def check_typescript_compile(self) -> Tuple[bool, str]:
        """Verifica compilação TypeScript"""
        try:
            result = subprocess.run(
                ['npx', 'tsc', '--noEmit'],
                cwd=self.project_path,
                capture_output=True,
                text=True,
                timeout=60
            )
            
            if result.returncode == 0:
                return True, "TypeScript sem erros"
            else:
                # Contar erros
                errors = result.stdout.count('error TS')
                return False, f"TypeScript com {errors} erro(s)"
                
        except subprocess.TimeoutExpired:
            return False, "TypeScript timeout"
        except Exception as e:
            return False, f"Erro ao verificar TypeScript: {str(e)}"
    
    def check_dist_folder(self) -> Tuple[bool, str]:
        """Verifica se pasta dist foi gerada"""
        dist_path = self.project_path / 'dist'
        
        if not dist_path.exists():
            return False, "Pasta dist/ não encontrada (execute npm run build)"
        
        # Verificar se tem arquivos
        files = list(dist_path.rglob('*'))
        if not files:
            return False, "Pasta dist/ vazia"
        
        # Verificar index.html
        index_html = dist_path / 'index.html'
        if not index_html.exists():
            return False, "index.html não encontrado em dist/"
        
        return True, f"dist/ com {len(files)} arquivo(s)"
    
    def run_all_checks(self):
        """Executa todas as verificações"""
        
        self.print_header("Pre-Deploy Checker - Sistema Mestre CNC")
        print(f"Verificando: {self.project_path}\n")
        
        # 1. Arquivos de Configuração
        self.print_header("1. Arquivos de Configuração")
        
        passed, msg = self.check_package_json()
        self.print_check("package.json", passed, msg)
        
        passed, msg = self.check_typescript_config()
        self.print_check("tsconfig.json", passed, msg)
        
        passed, msg = self.check_vite_config()
        self.print_check("vite.config.ts", passed, msg)
        
        passed, msg = self.check_gitignore()
        self.print_check(".gitignore", passed, msg)
        
        # .env.example é recomendado mas não obrigatório
        if self.check_file_exists('.env.example'):
            self.print_check(".env.example", True, "Template presente")
        else:
            self.print_warning(
                ".env.example",
                "Recomendado criar template de variáveis de ambiente"
            )
        
        # 2. Build e Compilação
        self.print_header("2. Build e Compilação")
        
        print("Verificando TypeScript...")
        passed, msg = self.check_typescript_compile()
        self.print_check("TypeScript", passed, msg)
        
        print("\nExecutando build (pode demorar)...")
        passed, msg = self.check_build_local()
        self.print_check("Build local", passed, msg)
        
        if passed:
            passed, msg = self.check_dist_folder()
            self.print_check("Output dist/", passed, msg)
        
        # 3. Estrutura de Diretórios
        self.print_header("3. Estrutura de Diretórios")
        
        required_dirs = ['src', 'public']
        for dir_name in required_dirs:
            exists = self.check_file_exists(dir_name)
            self.print_check(
                f"{dir_name}/",
                exists,
                "Presente" if exists else "Ausente"
            )
        
        # 4. Relatório Final
        self.print_header("Relatório Final")
        
        total = len(self.passed) + len(self.issues) + len(self.warnings)
        
        print(f"{Color.GREEN}✓ Passou: {len(self.passed)}{Color.END}")
        print(f"{Color.RED}✗ Falhou: {len(self.issues)}{Color.END}")
        print(f"{Color.YELLOW}⚠ Avisos: {len(self.warnings)}{Color.END}")
        print(f"\nTotal de verificações: {total}")
        
        # Veredito
        print(f"\n{Color.BOLD}VEREDITO:{Color.END} ", end="")
        if len(self.issues) == 0:
            print(f"{Color.GREEN}✓ PRONTO PARA DEPLOY{Color.END}")
            return True
        else:
            print(f"{Color.RED}✗ NÃO PRONTO - Corrija os problemas acima{Color.END}")
            return False


def print_usage():
    """Imprime instruções de uso"""
    print(__doc__)


def main():
    """Função principal"""
    
    # Parse argumentos
    project_path = '.'
    if len(sys.argv) > 1:
        if sys.argv[1] in ['-h', '--help']:
            print_usage()
            sys.exit(0)
        elif sys.argv[1] == '--path' and len(sys.argv) > 2:
            project_path = sys.argv[2]
    
    # Executar verificações
    checker = PreDeployChecker(project_path)
    
    try:
        ready = checker.run_all_checks()
        sys.exit(0 if ready else 1)
    except KeyboardInterrupt:
        print(f"\n\n{Color.YELLOW}Verificação cancelada pelo usuário{Color.END}")
        sys.exit(130)
    except Exception as e:
        print(f"\n{Color.RED}Erro fatal: {str(e)}{Color.END}")
        sys.exit(1)


if __name__ == '__main__':
    main()
