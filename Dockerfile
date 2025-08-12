# Si este es un servidor Node independiente
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .

EXPOSE 3000

CMD ["node", "server/server.js"]
