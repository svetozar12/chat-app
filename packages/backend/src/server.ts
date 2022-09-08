import './config/beforeStart';
import './connection/wsConnection';
import express from 'express';
import cors from 'cors';
import handleError from './middlewares/error-handler.middleware';
import initRoutes from './routes';

// config
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
// routes init
initRoutes(app);
app.use(handleError);
export { app };
