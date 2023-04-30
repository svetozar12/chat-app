import { Init } from '../utils';

describe('Test', () => {
  beforeAll(async () => {
    await Init();
  });
  require('./message');
});
