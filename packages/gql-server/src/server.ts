import './config/preinit';
import { createServer } from '@graphql-yoga/node';
import { schema } from './schema';
import logger from './utils/logger';
// types

async function main() {
  try {
    const server = createServer({
      schema,
      port: parseInt(process.env.PORT as string) || 4003,
      async context({ request, query }) {
        logger('warn', 'GRAPHQL-SERVER-REQUEST-LOG');
        logger('info', request.url, [query]);
      },
      cors: {
        origin: '*',
      },
    });

    await server.start();
  } catch (error) {
    logger('error', error, ['server failed to start']);
    return false;
  }
}

main();
