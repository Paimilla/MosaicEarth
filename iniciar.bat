@echo off
setlocal

:: Localizar la carpeta que contiene package.json
if exist "%~dp0package.json" (
    cd /d "%~dp0"
) else if exist "%~dp0Hackaton Nasa\package.json" (
    cd /d "%~dp0Hackaton Nasa"
) else if exist "C:\Users\carol\Downloads\Hackaton Nasa\Hackaton Nasa\package.json" (
    cd /d "C:\Users\carol\Downloads\Hackaton Nasa\Hackaton Nasa"
)

:: Asegurar Node.js y npm en el PATH
set "PATH=C:\Program Files\nodejs;%LOCALAPPDATA%\Programs\nodejs;%APPDATA%\npm;%PATH%"

echo =====================================================================
echo    MOSAIC - Cartografia de Analogos Planetarios (NASA Space Apps)
echo =====================================================================
echo.
echo [*] Carpeta del proyecto: %CD%

if not exist "package.json" (
    echo [ERROR] No se encontro package.json en esta carpeta.
    echo Asegurate de que iniciar.bat este junto a los archivos del proyecto.
    pause
    exit /b 1
)

echo [OK] package.json encontrado.
echo [*] Abriendo la aplicacion en tu navegador: http://localhost:3000
start http://localhost:3000

echo [*] Levantando servidor Next.js en vivo...
echo (Presiona Ctrl+C en cualquier momento para detener el servidor)
echo.

call "C:\Program Files\nodejs\npm.cmd" run dev

pause
