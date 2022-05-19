# install all dependencies for builder
FROM node:alpine as dependencies
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile

# install all production dependencies for runner
FROM node:alpine as dependencies-prod
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production
COPY . .

# build js files
FROM node:alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

# Runs js files without dev dependencies
FROM node:alpine as runner
WORKDIR /app

ENV NODE_ENV=production
ENV DB_NAME=chatAppDb

COPY package*.json ./
COPY --from=dependencies-prod /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 4002

CMD ["yarn","start:production"]