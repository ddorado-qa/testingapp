# Backend: Node (Debian) - fiable para compilar dependencias nativas si hiciera falta
FROM node:20-bullseye

WORKDIR /app

# Copiamos package.json antes para cachear npm install
COPY package*.json ./

# Instalamos dependencias
RUN npm install --no-audit --no-fund

# Protegemos node_modules dentro del contenedor para evitar ser pisado por volumen del host
VOLUME [ "/app/node_modules" ]

# Copiamos el resto del código
COPY . .

EXPOSE 3001

CMD ["npm", "start"]
