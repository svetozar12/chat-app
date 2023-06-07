FROM node:18.12.1-alpine as deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production

# Production image
FROM alpine:3.17.0 AS runtime
RUN apk --no-cache add nodejs
ENV NODE_ENV production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY dist/apps/api .

EXPOSE 8082

CMD ["node", "main.js"]