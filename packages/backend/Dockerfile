FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build


FROM node:alpine
WORKDIR /app
COPY package*.json ./

ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist

EXPOSE 4002

CMD ["yarn","start:production"]