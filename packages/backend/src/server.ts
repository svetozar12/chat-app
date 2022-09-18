import './config';
import express from 'express';
import cors from 'cors';
import handleError from './middlewares/error-handler.middleware';
import initRoutes from './routes';
import RequestLogger from './middlewares/RequestLogger';
import logger from './utils/logger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
// routes init
app.use(RequestLogger);
initRoutes(app);
app.use(handleError);

export { app };
