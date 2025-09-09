@echo off
echo Iniciando servidor PWA do SOL...
echo.
echo Acesse: http://localhost:8080
echo Para testar PWA: use Chrome e va em DevTools > Application > Manifest
echo.
cd /d "%~dp0dist"
python -m http.server 8080
pause
