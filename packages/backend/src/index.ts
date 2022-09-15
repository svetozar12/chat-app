import { app } from './server';
const port = process.env.PORT || 4002;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, (): void => {
    console.log(`listening on http://localhost:${port}`);
  });
}
