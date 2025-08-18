# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

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

RUN npm install -g prisma

RUN chown -R app:app /app
USER app

CMD ["npx", "prisma", "migrate", "deploy", "&&", "node", "dist/main"]
