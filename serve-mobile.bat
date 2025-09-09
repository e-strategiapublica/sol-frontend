@echo off
echo ===========================================
echo   SOL PWA - Servidor para Teste Mobile
echo ===========================================
echo.
echo 1. Iniciando servidor local...
start /B cmd /c "npx http-server dist -p 3000"
timeout /t 3 >nul

echo 2. Criando tunel publico...
echo.
echo Aguarde... Gerando URL publica para seu celular
echo.
npx ngrok http 3000

echo.
echo Use a URL gerada no seu smartphone para testar o PWA
pause
