FROM node:18.12.1-alpine as deps
WORKDIR /app
COPY dist/apps/web ./
RUN yarn install

FROM node:18.12.1-alpine
RUN apk --no-cache add nodejs

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/.next ./.next

ENV PORT 4002
EXPOSE 4002

CMD ["yarn","start"]
