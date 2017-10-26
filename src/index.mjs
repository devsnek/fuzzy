import { randomElement, excludeElements } from './util';

import { object, makeFunction, boolean, symbol, error } from './19';
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

export default function random(options = {}) {
  let steps = 0;
  return _random(steps, options);
}

export { default as fuzzFunction } from './fuzzFunction';

export function _random(steps, options = {}) {
  if (steps++ >= MAX_STEPS) return string();

  if (options.values && Math.random() < 0.25) return randomElement(options.values);
  else options.values = [];

  if (options.exclude) {
    options.included = excludeElements(options.exclude, methods);
    delete options.exclude;
  }

  const value = randomElement(options.included || methods)(options, steps);
  options.values.push(value);

  return value;
}
