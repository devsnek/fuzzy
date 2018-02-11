import { randomElement, excludeElements } from './util';

import { object, function as makeFunction, boolean, symbol, error } from './19';
import { number, date } from './20';
import { string, regexp } from './21';
import { array, typedArray } from './22';
import { map, set, weakMap, weakSet } from './23';
import { arrayBuffer, json } from './24';
import { generatorFunction, generator, promise, asyncFunction } from './25';
import { proxy } from './26';

export const MAX_STEPS = 10;

const methods = [
  object, makeFunction, boolean, symbol, error,
  number, date,
  string, regexp,
  array, typedArray,
  map, set, weakMap, weakSet,
  arrayBuffer, json,
  generatorFunction, generator, promise, asyncFunction,
  proxy,
];

export {
  object, makeFunction as function, boolean, symbol, error,
  number, date,
  string, regexp,
  array, typedArray,
  map, set, weakMap, weakSet,
  arrayBuffer, json,
  generatorFunction, generator, promise, asyncFunction,
  proxy,
};

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

export { default as fuzzFunction } from './fuzzFunction';

export function _random(steps, options = {}) {
  if (steps++ >= MAX_STEPS)
    return string();

  if (options.values && Math.random() < 0.25)
    return randomElement(options.values);
  else
    options.values = [];

  if (options.exclude) {
    options.included = excludeElements(options.exclude, methods);
    delete options.exclude;
  }

  const value = randomElement(options.included || methods)(options, steps);
  options.values.push(value);

  return value;
}
