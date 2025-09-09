@echo off
echo Iniciando servidor PWA do SOL com Node.js...
echo.
echo Acesse: http://localhost:3000
echo Para testar PWA: use Chrome e va em DevTools > Application > Manifest
echo.
cd /d "%~dp0"
cmd /c "npx http-server dist -p 3000 -o --proxy http://localhost:3000?"
pause
