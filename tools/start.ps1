param([switch]$OpenBrowser, [switch]$Build)
$ErrorActionPreference = 'Stop'
$projectFolder = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectFolder
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodeExecutable = if ($nodeCommand) { $nodeCommand.Source } else { $null }
if (-not $nodeExecutable) {
    $runtimePackages = Get-AppxPackage -Name 'OpenAI.CodexPrimaryRuntime*' -ErrorAction SilentlyContinue
    foreach ($runtimePackage in $runtimePackages) {
        $candidate = Join-Path $runtimePackage.InstallLocation 'dependencies\node\bin\node.exe'
        if (Test-Path -LiteralPath $candidate) { $nodeExecutable = $candidate; break }
    }
}
if (-not $nodeExecutable) {
    Write-Host 'Instala Node.js LTS desde https://nodejs.org y vuelve a abrir este archivo.'
    exit 1
}
$serverArguments = @((Join-Path $PSScriptRoot 'dev-server.cjs'))
if ($OpenBrowser) { $serverArguments += '--open' }
if ($Build) { $serverArguments += '--build' }
& $nodeExecutable @serverArguments
exit $LASTEXITCODE
