# Backend: Node (Debian) - buena para dependencias nativas
FROM node:20-bullseye

WORKDIR /app
# Instalamos cliente de PostgreSQL para tener pg_isready
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Copiamos package.json antes para aprovechar cache de Docker
COPY package*.json ./

# Instalamos dependencias sin auditoría ni prompts
RUN npm install --no-audit --no-fund

# Protegemos node_modules para que no se sobreescriba con bind mount
VOLUME [ "/app/node_modules" ]

# Copiamos el resto del código
COPY . .

EXPOSE 3001

# Comando por defecto
CMD ["npm", "start"]
