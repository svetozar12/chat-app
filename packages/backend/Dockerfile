FROM node:alpine AS builder

WORKDIR /app
COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4002

CMD ["yarn","dev"]