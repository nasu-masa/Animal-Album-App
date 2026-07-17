FROM node:22-alpine AS dependencies

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./

RUN npm ci

FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY frontend/ ./

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_REGISTRATION_ENABLED
ARG NEXT_PUBLIC_MEDIA_UPLOAD_ENABLED
ARG NEXT_PUBLIC_MEDIA_DELETE_ENABLED

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_REGISTRATION_ENABLED=${NEXT_PUBLIC_REGISTRATION_ENABLED}
ENV NEXT_PUBLIC_MEDIA_UPLOAD_ENABLED=${NEXT_PUBLIC_MEDIA_UPLOAD_ENABLED}
ENV NEXT_PUBLIC_MEDIA_DELETE_ENABLED=${NEXT_PUBLIC_MEDIA_DELETE_ENABLED}

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

USER node

EXPOSE 3000

CMD ["node", "server.js"]
