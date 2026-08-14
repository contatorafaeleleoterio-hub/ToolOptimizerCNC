# Validacao de ciclo do refactor visual - Gauntlet v2
# Uso: .\scripts\validate-cycle-refactor.ps1 -CycleNumber 1
#
# Roda a verificacao objetiva ANTES do Juiz. Qualquer falha aqui derruba o
# ciclo sem gastar agente: e mais barato e nao tem vies.
#
# Diferente da versao anterior, este script FALHA (exit 1) em vez de so
# imprimir aviso. Validador que so imprime nao valida nada.
#
# Codigos de saida: 0 = liberado para o Juiz | 1 = reprovado | 2 = alvos pendentes
#
# NOTA: arquivo em ASCII puro de proposito. O Windows PowerShell 5.1 le .ps1
# como ANSI quando nao ha BOM, e acento vira erro de sintaxe.

param (
    [Parameter(Mandatory=$true)]
    [int]$CycleNumber
)

$ErrorActionPreference = "Continue"
$falhas = @()

Write-Host "=== Validacao de Refatoracao (Ciclo $CycleNumber) - Gauntlet v2 ===" -ForegroundColor Cyan

# 1. Integridade: regiao DADOS do mockup + tests/ + criteria/ + scripts/ + research/
Write-Host "[1/5] Conferindo integridade (motor, testes, criterios, scripts)..." -ForegroundColor Yellow
node scripts/freeze.mjs
if ($LASTEXITCODE -ne 0) { $falhas += "Integridade violada: arquivo congelado foi alterado" }

# 2. Suite Playwright (reporter do config: list + json)
Write-Host "[2/5] Executando suite Playwright..." -ForegroundColor Yellow
npx playwright test
$playwrightExit = $LASTEXITCODE

# 3. Contagem exata por grupo + nenhum cenario desligado
Write-Host "[3/5] Conferindo contagem por grupo..." -ForegroundColor Yellow
node scripts/check-suites.mjs
if ($LASTEXITCODE -ne 0) { $falhas += "Suite reprovada: regressao, contagem divergente ou cenario desligado" }

# 4. Fronteira da sandbox
Write-Host "[4/5] Conferindo fronteira da sandbox..." -ForegroundColor Yellow
Push-Location ..
$gitStatus = git status --porcelain
Pop-Location

$permitido = "gauntlet-calculadora-cnc-v2|docs/plans|docs/design|docs/ROADMAP_SESSAO_ATUAL"
$foraDaSandbox = $gitStatus | Where-Object { $_ -notmatch $permitido }

if ($foraDaSandbox) {
    Write-Host "Arquivos alterados fora da fronteira:" -ForegroundColor Red
    $foraDaSandbox | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
    $falhas += "Fronteira da sandbox violada"
}

# 5. Snapshot do ciclo (rollback para o melhor ciclo depende disto)
Write-Host "[5/5] Gravando snapshot do ciclo..." -ForegroundColor Yellow
$mockupPath = "mockup/index.html"
if (Test-Path $mockupPath) {
    $snapshotDir = "state/snapshots"
    if (-not (Test-Path $snapshotDir)) { New-Item -ItemType Directory -Path $snapshotDir | Out-Null }
    $snapshotPath = "$snapshotDir/index-refactor-ciclo-$CycleNumber.html"
    Copy-Item -Path $mockupPath -Destination $snapshotPath -Force
    Write-Host "  snapshot: $snapshotPath" -ForegroundColor Green
} else {
    $falhas += "mockup/index.html nao encontrado"
}

# Resumo
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " RESUMO - CICLO $CycleNumber" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

if ($falhas.Count -gt 0) {
    Write-Host "CICLO REPROVADO na verificacao objetiva:" -ForegroundColor Red
    $falhas | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host "O Juiz NAO deve ser acionado." -ForegroundColor Red
    exit 1
}

if ($playwrightExit -ne 0) {
    Write-Host "Verificacao objetiva OK. Alvos do refactor ainda pendentes." -ForegroundColor Yellow
    Write-Host "O Juiz NAO deve ser acionado." -ForegroundColor Yellow
    exit 2
}

Write-Host "Verificacao objetiva 100% verde. Liberado para o Juiz cego." -ForegroundColor Green
exit 0
