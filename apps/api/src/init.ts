import express from 'express';
import { routes } from './routes';
import { ConnectMongo } from '@chat-app/api/db';
import SwaggerMongoose from './config/swagger';
import { API_ENVS } from '@chat-app/api/env';
import swaggerUi from 'swagger-ui-express';
export const API_PREFIX = '/v1/';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
const { MONGO_URL } = API_ENVS;

const app = express();
const options: Options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    components: {
      schemas: SwaggerMongoose,
    },
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['**/routes/**/*.route.ts', '**/routes/**/*.yml'],
};

const openapiSpecification = swaggerJsdoc(options);
console.log(openapiSpecification);
// db connections
ConnectMongo(MONGO_URL);
// routes
app.use(API_PREFIX, routes);
app.use(
  `${API_PREFIX}swagger`,
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification)
);

export { app };
