FROM node:12

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4002

CMD ["yarn","dev"]