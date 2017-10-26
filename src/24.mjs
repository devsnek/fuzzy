import { randomNumber } from './util';
import { object } from './index';

// 24.1 ArrayBuffer
export function arrayBuffer(options = {}) {
  const length = randomNumber(options.maxLength || 10);
  return new ArrayBuffer(length);
}

// 24.5 JSON
export function json(options = {}, steps = 0) {
  return JSON.stringify(object(options, steps + 1));
}
