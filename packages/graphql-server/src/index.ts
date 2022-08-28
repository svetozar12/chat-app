import * as mutation from './mutations';
import * as queries from './queries';

export * from './generated/graphql';

const root = { ...mutation, ...queries };

export default root;
