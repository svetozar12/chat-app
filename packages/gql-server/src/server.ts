import './config/preinit';
import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';
import logger from './utils/logger';

async function main() {
  try {
    const yoga = createYoga({
      schema,
      cors: {
        origin: '*',
      },
    });
    const server = createServer(yoga);
    server.listen(4003, () => {
      logger('info', 'Server is running on http://localhost:4003/graphql');
    });
  } catch (error) {
    logger('error', error, ['server failed to start']);
    return false;
  }
}

main();
