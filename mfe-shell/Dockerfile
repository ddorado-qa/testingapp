# Imagen base ligera con Node 20
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto del shell
EXPOSE 5173

# Arrancamos Vite en modo desarrollo accesible desde fuera
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
