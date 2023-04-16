import './init';
import { API_PREFIX, app } from './init';

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}${API_PREFIX}`);
});
server.on('error', console.error);
