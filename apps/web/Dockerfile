FROM node:12-alpine
WORKDIR /app
COPY ./apps/web/.next ./.next
COPY package.json ./package.json
RUN yarn
CMD yarn next start -p $PORT