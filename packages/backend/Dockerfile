FROM node:12

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

ENV PORT=4001

EXPOSE 4001

CMD ["yarn","dev"]