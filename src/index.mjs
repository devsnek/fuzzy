import { randomElement, excludeElements } from './util.mjs';

import { undefined as fuzzyUndefined, null as fuzzyNull } from './6.mjs';
import { object, function as fuzzyFunction, boolean, symbol, error } from './19.mjs';
import { number, date } from './20.mjs';
import { string, regexp } from './21.mjs';
import { array, typedArray } from './22.mjs';
import { map, set, weakMap, weakSet } from './23.mjs';
import { arrayBuffer, json } from './24.mjs';
import { generatorFunction, generator, promise, asyncFunction } from './25.mjs';
import { proxy } from './26.mjs';
import { bigint } from './staged.mjs';

export const MAX_STEPS = 10;

const methods = [
  fuzzyUndefined, fuzzyNull,
  object, fuzzyFunction, boolean, symbol, error,
  number, date,
  string, regexp,
  array, typedArray,
  map, set, weakMap, weakSet,
  arrayBuffer, json,
  generatorFunction, generator, promise, asyncFunction,
  proxy,
  bigint,
];

export {
  fuzzyUndefined as undefined, fuzzyNull as null,
  object, fuzzyFunction as function, boolean, symbol, error,
  number, date,
  string, regexp,
  array, typedArray,
  map, set, weakMap, weakSet,
  arrayBuffer, json,
  generatorFunction, generator, promise, asyncFunction,
  proxy,
  bigint,
};

export { default as fuzzFunction } from './fuzzFunction.mjs';

export function _random(steps, options = {}) {
  steps += 1;
  if (steps >= MAX_STEPS) {
    return boolean() ? string() : number();
  }

  if (options.values && options.values.length > 0 && Math.random() < 0.15) {
    return randomElement(options.values);
  }
  options.values = [];

  if (options.exclude) {
    options.included = excludeElements(options.exclude, methods);
    delete options.exclude;
  }

  const value = randomElement(options.included || methods)(options, steps);
  options.values.push(value);

  return value;
}

/**
 * do the fuzz
 * @param {Object} [options] options
 * @param {Array} [exclude] Array of types to exclude such as `map` or `string`
 * @param {number} [minLength] min length of iterables or min number of keys on maps
 * @param {number} [maxLength] max length of iterables or max number of keys on maps
 * @returns {*}
 */
export default function random(options = {}) {
  return _random(0, options);
}
