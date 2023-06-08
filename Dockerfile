FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install

EXPOSE 3000 3001