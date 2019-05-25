import { randomNumber } from './util.mjs';
import { object } from './index.mjs';

// 24.1 ArrayBuffer
export function arrayBuffer(options = {}) {
  const length = randomNumber(options.minLength || 0, options.maxLength || 10);
  return new ArrayBuffer(length);
}

// 24.5 JSON
export function json(options = {}, steps = 0) {
  return JSON.stringify(object(options, steps + 1), (key, value) => {
    if (typeof value === 'bigint') { // eslint-disable-line valid-typeof
      return 0;
    }
    return value;
  });
}
