# QA App (Postgres edition)

Stack: frontend (Vite React) + backend (Express + pg) + postgres (Docker)

Levantar:
1. Borrar volúmenes antiguos (importante para reinicialización):
   ```
   docker-compose down -v
   ```
2. Reconstruir e iniciar:
   ```
   docker-compose build --no-cache
   docker-compose up --force-recreate
   ```

Frontend: http://localhost:5173  
Backend API: http://localhost:3001/api
