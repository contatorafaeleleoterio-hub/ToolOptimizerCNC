# Script de Validação por Ciclo do Gauntlet v2 (Windows PowerShell)
# Uso: .\scripts\validate-cycle.ps1 -CycleNumber 1

param (
    [Parameter(Mandatory=$true)]
    [int]$CycleNumber
)

$ErrorActionPreference = "Continue"

Write-Host "=== Validação do Ciclo $CycleNumber — Gauntlet Loop v2 ===" -ForegroundColor Cyan

# 1. Executa npx playwright test e captura resultado
Write-Host "[INFO] Executando testes automatizados do Playwright..." -ForegroundColor Yellow
$playwrightOutput = npx playwright test 2>&1 | Out-String
$playwrightExitCode = $LASTEXITCODE

Write-Host $playwrightOutput

if ($playwrightExitCode -eq 0) {
    Write-Host "[PASS] Suíte Playwright executada com sucesso!" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Suíte Playwright reportou falhas nos testes!" -ForegroundColor Red
}

# 2. Verifica git status na raiz do repositório para garantir isolamento
Write-Host "[INFO] Verificando integridade da sandbox via Git..." -ForegroundColor Yellow
Push-Location ..
$gitStatus = git status --porcelain
Pop-Location

$dirtyOutside = $gitStatus | Where-Object { $_ -notmatch "gauntlet-calculadora-cnc-v2" -and $_ -notmatch "docs/plans" }

if ($dirtyOutside) {
    Write-Host "[ERRO CRÍTICO] Fronteira da sandbox violada! Arquivos fora da sandbox foram alterados:" -ForegroundColor Red
    $dirtyOutside | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
} else {
    Write-Host "[OK] Fronteiras da sandbox confirmadas intactas." -ForegroundColor Green
}

# 3. Copia mockup/index.html para state/snapshot-cycle-N.html se o arquivo existir
$mockupPath = "mockup/index.html"
if (Test-Path $mockupPath) {
    $snapshotPath = "state/snapshot-cycle-$CycleNumber.html"
    Copy-Item -Path $mockupPath -Destination $snapshotPath -Force
    Write-Host "[OK] Snapshot gerado: $snapshotPath" -ForegroundColor Green
} else {
    Write-Host "[AVISO] Artefato $mockupPath ainda não foi gerado pelo Builder." -ForegroundColor Yellow
}

# 4. Imprime resumo final do ciclo
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " RESUMO DO CICLO $CycleNumber" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Status dos Testes: $(if ($playwrightExitCode -eq 0) { 'PASS' } else { 'FAIL' })" -ForegroundColor $(if ($playwrightExitCode -eq 0) { 'Green' } else { 'Red' })
Write-Host "Isolamento da Sandbox: $(if ($dirtyOutside) { 'VIOLADO' } else { 'OK' })" -ForegroundColor $(if ($dirtyOutside) { 'Red' } else { 'Green' })
if (Test-Path $mockupPath) {
    $fileSize = (Get-Item $mockupPath).Length
    Write-Host "Tamanho do mockup index.html: $fileSize bytes" -ForegroundColor White
}
Write-Host "==========================================" -ForegroundColor Cyan
