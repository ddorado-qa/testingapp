FROM node:18-alpine

WORKDIR /app

COPY ./server ./server
COPY ./public ./public
COPY ./data ./data

RUN npm install express fs

EXPOSE 3000
CMD ["node", "server/server.js"]
