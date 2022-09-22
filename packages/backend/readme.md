# @chat-app/backend

REST-API for @chat/app

# How to run the api

## Prerequisites

`install lerna globally: npm i -g lerna`\
`install docker and run it`

## Development mode

`1. yarn`\
`2. lerna run build --scope=@chat-app/backend`\
`3. yarn lerna run dev --scope=@chat-app/backend`

## Folder structure

1. local_db_compose - used to build docker images of the dbs for local development
2. src
   1.__test__(all tests are created here and runned from here)
   2.common(often used pieces of codes like types,constants etc...)
   3.config(config files like dbs setup and env setup)
   4.custom_typings(express specific typings)
   5.middlewares(functions that run before the route)
   6.models(mongo models)
   7.routes(here we create controllers(the route structure) and services(the route logic))
   8.services(here we put web apps that are too small to be independant service)
   8.utils(reusable functions)
