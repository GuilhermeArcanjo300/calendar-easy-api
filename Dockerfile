# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate
RUN npm run build

# Etapa final
FROM node:18-alpine

WORKDIR /app

# Crie um usuário com permissões
RUN addgroup -g 1001 app && adduser -D -u 1001 -G app app

# Copie arquivos do builder
COPY --from=builder /app /app

RUN chown -R app:app /app
USER app

# Expõe a porta usada pelo NestJS
EXPOSE 3000

# Executa as migrações e inicia a API
CMD sh -c "npx prisma migrate deploy && node dist/main"
