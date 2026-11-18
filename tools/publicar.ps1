# Publica la página en Vercel (producción): compila el JSX y sube todo.
# Uso:  powershell -ExecutionPolicy Bypass -File .\tools\publicar.ps1
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)
$node = (Get-Command node -ErrorAction SilentlyContinue).Source
$pnpm = $null
if (-not $node) {
    $pkg = Get-AppxPackage -Name 'OpenAI.CodexPrimaryRuntime*' -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($pkg) {
        $node = Join-Path $pkg.InstallLocation 'dependencies\node\bin\node.exe'
        $pnpm = Join-Path $pkg.InstallLocation 'dependencies\node\node_modules\pnpm\bin\pnpm.cjs'
    }
}
if (-not $node) { Write-Host 'Instala Node.js LTS desde https://nodejs.org y vuelve a intentarlo.'; exit 1 }
$env:PATH = (Split-Path -Parent $node) + ';' + $env:PATH
& $node (Join-Path $PSScriptRoot 'dev-server.cjs') '--build'
if ($pnpm) {
    & $node $pnpm 'dlx' '--allow-build=esbuild' 'vercel@65.16.0' 'deploy' '--prod' '--yes'
} else {
    & npx '--yes' 'vercel@65.16.0' 'deploy' '--prod' '--yes'
}
exit $LASTEXITCODE
