import { randomElement, randomNumber } from './util.mjs';
import { boolean } from './index.mjs';

// 20.1 Number
export function number() {
  return randomElement([
    () => (boolean() ? -1 : 1) * Math.random() * Number.MAX_VALUE,
    () => Number.MAX_VALUE,
    () => NaN,
    () => -Infinity,
    () => Infinity,
  ])();
}

// 20.3 Date
export function date() {
  return new Date(randomNumber(-864e13, 864e13));
}
