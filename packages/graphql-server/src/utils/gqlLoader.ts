const { readFileSync } = require('fs');

/**
 * @param dir should be relative to the util function and not the file that its invoked*/
const gqlLoader = (dir: string): string => {
  return readFileSync(require.resolve(dir)).toString('utf-8');
};

export default gqlLoader;
