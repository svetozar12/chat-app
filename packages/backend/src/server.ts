import './config';
import express from 'express';
import cors from 'cors';
import handleError from './middlewares/error-handler.middleware';
import RequestLogger from './middlewares/RequestLogger';
import route from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
// routes init
app.use(RequestLogger);
app.use(route);
app.use(handleError);

export { app };
