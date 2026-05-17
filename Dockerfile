# Estágio 1: Build (Ambiente de compilação)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de configuração de dependências
COPY package*.json ./

# Instala todas as dependências (incluindo tsoa e typescript)
RUN npm install

# Copia o restante do código fonte e configurações (tsoa.json, tsconfig.json, etc)
COPY . .

# Gera as rotas e o swagger.json via tsoa
# Importante: isso deve ocorrer ANTES do tsc para que o routes.ts seja compilado
RUN npx tsoa spec-and-routes

# Compila o TypeScript para JavaScript (para a pasta /build conforme seu tsconfig)
RUN npx tsc

# Estágio 2: Produção (Imagem final reduzida)
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/build ./build


COPY --from=builder /app/src/routes/swagger.json ./build/routes/swagger.json

EXPOSE 3000

# Inicia a aplicação
CMD ["node", "build/main.js"]