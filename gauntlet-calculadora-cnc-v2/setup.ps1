# Script de Setup da Sandbox Gauntlet v2 (Windows PowerShell)
# Executar a partir do diretório: gauntlet-calculadora-cnc-v2

$ErrorActionPreference = "Stop"

Write-Host "=== Setup da Sandbox: gauntlet-calculadora-cnc-v2 ===" -ForegroundColor Cyan

# 1. Cria a estrutura de diretórios
$dirs = @("research", "criteria", "tests", "mockup", "state", "reports", "scripts")
foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
        Write-Host "[OK] Criado diretório: $dir" -ForegroundColor Green
    }
}

# 2. Gera README.md com metadata
$readmeContent = @"
# Gauntlet Loop v2 — Calculadora CNC Multi-Ferramenta (Sandbox)

> **Data de criação:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")  
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
"@

Set-Content -Path "README.md" -Value $readmeContent -Encoding UTF8
Write-Host "[OK] Gerado README.md" -ForegroundColor Green

# 3. Executa npm init -y se package.json não existir
if (-not (Test-Path "package.json")) {
    npm init -y | Out-Null
    Write-Host "[OK] Inicializado package.json na sandbox" -ForegroundColor Green
}

# 4. Instala @playwright/test como devDependency se necessário
Write-Host "[INFO] Instalando @playwright/test..." -ForegroundColor Yellow
npm i -D @playwright/test | Out-Null

# 5. Instala navegadores do Playwright (chromium)
Write-Host "[INFO] Instalando navegador Chromium para Playwright..." -ForegroundColor Yellow
npx playwright install chromium | Out-Null

# 6. Gera playwright.config.ts
$playwrightConfig = @"
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
"@

Set-Content -Path "playwright.config.ts" -Value $playwrightConfig -Encoding UTF8
Write-Host "[OK] Gerado playwright.config.ts" -ForegroundColor Green

# 7. Gera .gitignore local
$gitignoreContent = @"
node_modules/
test-results/
playwright-report/
.cache/
"@

Set-Content -Path ".gitignore" -Value $gitignoreContent -Encoding UTF8
Write-Host "[OK] Gerado .gitignore local" -ForegroundColor Green

# 8. Valida git status na raiz do repositório
Write-Host "[INFO] Verificando isolamento da sandbox no git..." -ForegroundColor Yellow
Push-Location ..
$gitStatus = git status --porcelain
Pop-Location

Write-Host "=== Status de isolamento do Git ===" -ForegroundColor Cyan
$dirtyOutside = $gitStatus | Where-Object { $_ -notmatch "gauntlet-calculadora-cnc-v2" -and $_ -notmatch "docs/plans" }
if ($dirtyOutside) {
    Write-Host "[ALERTA] Arquivos fora da sandbox foram modificados!" -ForegroundColor Red
    $dirtyOutside | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
} else {
    Write-Host "[OK] Sandbox 100% isolada. Nenhuma alteração indevida fora da sandbox." -ForegroundColor Green
}

Write-Host "=== Setup concluído com sucesso! ===" -ForegroundColor Green
