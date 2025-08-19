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

RUN addgroup -g 1001 app && adduser -D -u 1001 -G app app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN chown -R app:app /app
USER app

EXPOSE 3000

CMD sh -c "npx prisma migrate deploy && node dist/main"
