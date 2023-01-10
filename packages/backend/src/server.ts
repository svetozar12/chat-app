import './config';
import express from 'express';
import cors from 'cors';
import handleError from './middlewares/error-handler.middleware';
import route from './routes';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
// routes init
app.use(morgan('dev'));

app.use(route);
app.use(handleError);

export { app };
