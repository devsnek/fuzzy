import { randomNumber } from './util';
import { _random, object } from './index';

// 23.1 Map
export function map(options = {}, steps = 0) {
  const length = randomNumber(options.minLength || 0, options.maxLength || 5);
  const m = new Map();
  for (let i = 0; i < length; i++)
    m.set(_random(steps + 1, options), _random(steps, options));
  return m;
}

// 23.2 Set
export function set(options = {}, steps = 0) {
  const length = randomNumber(options.minLength || 0, options.maxLength || 10);
  const s = new Set();
  for (let i = 0; i < length; i++)
    s.add(_random(steps + 1, options));
  return s;
}

// 23.3 WeakMap
export function weakMap(options = {}, steps = 0) {
  const length = randomNumber(options.minLength || 0, options.maxLength || 5);
  const m = new WeakMap();
  for (let i = 0; i < length; i++)
    m.set(object(options, steps + 1), _random(steps + 1, options));
  return m;
}

// 23.4 WeakSet
export function weakSet(options = {}, steps = 0) {
  const length = randomNumber(options.minLength || 0, options.maxLength || 10);
  const s = new WeakSet();
  for (let i = 0; i < length; i++)
    s.add(object(options, steps + 1));
  return s;
}
