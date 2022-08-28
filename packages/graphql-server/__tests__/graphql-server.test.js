'use strict';

const graphqlServer = require('..');
const assert = require('assert').strict;

assert.strictEqual(graphqlServer(), 'Hello from graphqlServer');
console.info("graphqlServer tests passed");
