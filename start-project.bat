@echo off

echo Iniciando Backend...
cd backend
start cmd /k npm run dev

cd ..

echo Iniciando Frontend...
cd frontend
start cmd /k npm start

echo Projeto iniciado!
pause
