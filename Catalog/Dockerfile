FROM node:20-slim


RUN apt-get update && apt-get install -y openssl

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install


COPY . .


RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
