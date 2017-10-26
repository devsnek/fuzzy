/* eslint-disable no-console */

import { error, fuzzFunction } from '../src';

fuzzFunction(console.log, { exclude: [error] });

process.on('unhandledRejection', () => {}); // eslint-disable-line no-empty-function
