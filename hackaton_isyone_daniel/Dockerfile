# =============================================================
# ESTÁGIO 1: Build da Aplicação (Installer)
# =============================================================
FROM node:20-alpine AS installer
WORKDIR /app

# Copia os arquivos de dependências primeiro para aproveitar o cache do Docker
COPY package*.json ./
RUN npm ci

# Copia o restante do código fonte e builda o Next.js
COPY . .
RUN npm run build

# =============================================================
# ESTÁGIO 2: Ambiente de Execução Otimizado (Runner)
# =============================================================
FROM node:20-alpine AS runner
WORKDIR /app

# 🚨 CRÍTICO PARA OS SEUS SCRIPTS BASH:
# Instala as ferramentas de sistema que seus scripts usam (como procps para o ps/top e curl/bash)
RUN apk add --no-cache bash curl procps

ENV NODE_ENV=production

# Copia apenas os artefatos de produção do estágio anterior (deixa a imagem levíssima)
COPY --from=installer /app/package*.json ./
COPY --from=installer /app/.next ./.next
COPY --from=installer /app/public ./public
COPY --from=installer /app/node_modules ./node_modules

# Cria a pasta interna onde o Docker Compose vai espelhar seus scripts do host
RUN mkdir -p /app/scripts

EXPOSE 3000

CMD ["npm", "start"]