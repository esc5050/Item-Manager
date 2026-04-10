@echo off

echo Iniciando instalacao...

echo Instalando dependencias do backend...
cd backend
call npm install

echo Voltando...
cd ..

echo Instalando dependencias do frontend...
cd frontend
call npm install

cd ..

echo Iniciando servidores...

echo Iniciando backend...
cd backend
start cmd /k npm run dev

cd ..

echo Iniciando frontend...
cd frontend
start cmd /k npm start

cd ..

echo Projeto iniciado com sucesso!

pause
