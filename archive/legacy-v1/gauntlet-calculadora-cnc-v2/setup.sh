#!/usr/bin/env bash
# Script de Setup da Sandbox Gauntlet v2 (Bash)
# Executar a partir do diretório: gauntlet-calculadora-cnc-v2

set -e

echo "=== Setup da Sandbox: gauntlet-calculadora-cnc-v2 ==="

# 1. Cria a estrutura de diretórios
mkdir -p research criteria tests mockup state reports scripts
echo "[OK] Diretórios criados: research, criteria, tests, mockup, state, reports, scripts"

# 2. Gera README.md com metadata
cat << 'EOF' > README.md
# Gauntlet Loop v2 — Calculadora CNC Multi-Ferramenta (Sandbox)

> **Data de criação:** $(date +"%Y-%m-%d %H:%M:%S")  
> **Item do backlog:** 17  
> **Plano de execução:** [PLAN_GAUNTLET_V2_EXECUCAO.md](../../docs/plans/PLAN_GAUNTLET_V2_EXECUCAO.md)  
> **Instância:** [PLAN_GAUNTLET_CALCULADORA_CNC_V2.md](../../docs/plans/PLAN_GAUNTLET_CALCULADORA_CNC_V2.md)  

## Estrutura da Sandbox

- `research/`: Contrato de construção e regras de HMI industrial
- `criteria/`: Tokens de design e matriz do Juiz (congelados em E1)
- `tests/`: Cenários automatizados Playwright e contrato de data-testid
- `mockup/`: Artefato do Construtor (`index.html`)
- `state/`: Histórico de ciclos, vereditos e snapshots de rollback
- `reports/`: Relatório final da rodada (`FINAL_REPORT.md`)
- `scripts/`: Automações de validação de ciclo
EOF
echo "[OK] Gerado README.md"

# 3. Executa npm init -y se package.json não existir
if [ ! -f "package.json" ]; then
    npm init -y > /dev/null
    echo "[OK] Inicializado package.json na sandbox"
fi

# 4. Instala @playwright/test como devDependency
echo "[INFO] Instalando @playwright/test..."
npm i -D @playwright/test > /dev/null

# 5. Instala navegadores do Playwright (chromium)
echo "[INFO] Instalando navegador Chromium para Playwright..."
npx playwright install chromium > /dev/null

# 6. Gera playwright.config.ts
cat << 'EOF' > playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: 'reports/test-results.json' }]
  ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});
EOF
echo "[OK] Gerado playwright.config.ts"

# 7. Gera .gitignore local
cat << 'EOF' > .gitignore
node_modules/
test-results/
playwright-report/
.cache/
EOF
echo "[OK] Gerado .gitignore local"

# 8. Valida git status na raiz
echo "[INFO] Verificando isolamento da sandbox no git..."
cd ..
GIT_OUT=$(git status --porcelain | grep -v "gauntlet-calculadora-cnc-v2" | grep -v "docs/plans" || true)
cd gauntlet-calculadora-cnc-v2

if [ -n "$GIT_OUT" ]; then
    echo "[ALERTA] Arquivos fora da sandbox foram modificados:"
    echo "$GIT_OUT"
else
    echo "[OK] Sandbox 100% isolada. Nenhuma alteração indevida fora da sandbox."
fi

echo "=== Setup concluído com sucesso! ==="
