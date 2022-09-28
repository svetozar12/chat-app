FROM node
WORKDIR /app

# db envs
ENV MONGO_URL 'mongodb://mongo:ynwyR2YHHAgehQPxg4Io@containers-us-west-31.railway.app:7522'
ENV REDIS_URL "redis://default:SGJEALjGWTtWX446q8KA@containers-us-west-67.railway.app:5837"
# jwt envs
ENV JWT_SECRET '0hSP2wXFxDX6WMr8+LpneU7q88saYAvtDpYHIjoRaOmwdCr65oQGcCNdlMagy492oeLhpTb4qDtmQ1tlyjqiyw=='
ENV JWT_REFRESH_SECRET 'YN0JvJ6GpVC412eHkrD+slZ2TthMOCuMi37jfiCMSFvNG1h1E4047bH0KNwA//yROgpyA4sfWkipLS5+khN+YQ=='
ENV AVATAR_URL "https://avatars.dicebear.com/api"
# development envs
ENV DEBUG false
# generic envs
ENV PORT 4002
ENV WS_PORT 4000
ENV CLIENT_URL 'http://localhost:3000'


# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY . .
RUN yarn
RUN yarn build

EXPOSE 4001

CMD [ 'yarn','start' ]