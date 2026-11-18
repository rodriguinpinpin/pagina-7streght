@echo off
cd /d "%~dp0"
where code >nul 2>nul
if errorlevel 1 (
  echo Abre Visual Studio Code y elige Archivo - Abrir carpeta.
  pause
) else (
  call code "%~dp07-strength-center.code-workspace"
)
