# Estágio 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas o essencial para instalar dependências (melhora cache)
COPY package*.json ./

RUN npm install

# Copia o restante dos arquivos e faz o build
COPY . .
RUN npm run build

# Estágio 2: Execução (Imagem leve)
FROM node:20-alpine

WORKDIR /app

# Copia apenas as dependências de produção e o código compilado
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Define variáveis de ambiente padrão para produção
ENV NODE_ENV=production

# O comando de início depende do seu script no package.json
CMD ["node", "dist/main.js"]
