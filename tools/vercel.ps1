# Ejecuta la herramienta oficial de Vercel con el Node disponible en este equipo.
# Uso:  powershell -ExecutionPolicy Bypass -File .\tools\vercel.ps1 login
#       powershell -ExecutionPolicy Bypass -File .\tools\vercel.ps1 deploy --prod --yes
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
if ($pnpm) {
    & $node $pnpm dlx --allow-build=esbuild vercel@65.16.0 @args
} else {
    & npx --yes vercel@65.16.0 @args
}
exit $LASTEXITCODE
