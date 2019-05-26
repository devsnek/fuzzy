/* eslint-disable no-console */

import { error, fuzzFunction } from '../src/index.mjs';

fuzzFunction(console.log, { exclude: [error] });

process.on('unhandledRejection', (e) => {
  // console.error(e);
  // process.exit(1);
});
