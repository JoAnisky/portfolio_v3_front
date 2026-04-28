FROM node:20-alpine AS base
WORKDIR /var/www/html

RUN apk add --no-cache bash curl git

# --- Stage DEV ---
FROM base AS dev
ENV NODE_ENV=development

RUN mkdir -p /var/www/html/node_modules .nuxt && \
    chown -R node:node /var/www/html

USER node

CMD bash -c "npm install && npx nuxt dev --host 0.0.0.0"

# --- Stage BUILD ---
FROM base AS build

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npx nuxt prepare && npm run build

# --- Stage PROD ---
FROM base AS prod
ENV NODE_ENV=production

USER node

COPY --from=build --chown=node:node /var/www/html/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]