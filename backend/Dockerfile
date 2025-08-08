# Usamos imagen compatible con sqlite3 y node-gyp
FROM node:20-bullseye

# Instala dependencias necesarias para compilar binarios nativos
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Copiamos los archivos de dependencias primero
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Creamos el volumen para node_modules para persistencia interna
VOLUME [ "/app/node_modules" ]

# Copiamos el resto del código
COPY . .

EXPOSE 3001
CMD ["npm", "start"]