/* eslint-disable no-console */

import { error, fuzzFunction } from '../src';

fuzzFunction(console.log, { exclude: [error] });

process.on('unhandledRejection', (e) => {
  console.error(e);
  process.exit(1);
});
