'use strict';

/* eslint-disable no-console */

const { error, fuzzFunction } = require('.');

fuzzFunction(console.log, { exclude: [error] });

process.on('unhandledRejection', () => {
  // console.error(e);
  // process.exit(1);
});
