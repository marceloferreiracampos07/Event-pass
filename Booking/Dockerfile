FROM node:20-slim

RUN apt-get update && apt-get install -y openssl

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN ./node_modules/.bin/prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
