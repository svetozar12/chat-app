FROM node
WORKDIR /app

# db envs
ENV API_URL "http://localhost:4002"
ENV DEBUG false

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY . .
RUN yarn
RUN yarn build

EXPOSE 4003

CMD [ 'yarn','start' ]