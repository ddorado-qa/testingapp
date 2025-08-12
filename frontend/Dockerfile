# Frontend: Vite + React
FROM node:20-alpine

WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

RUN npm install --no-audit --no-fund

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
