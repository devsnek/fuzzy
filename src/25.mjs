import { _random, boolean } from './index';

// 25.2 GeneratorFunction
export function generatorFunction() {
  return generator;
}

// 25.3 Generator
export function* generator(options = {}, steps = 0) {
  yield _random(steps, options); steps++;
  yield _random(steps, options); steps++;
  yield _random(steps, options); steps++;
  return _random(steps, options);
}

// 25.4 Promise Objects
export function promise(options = {}, steps = 0) {
  return Promise[boolean() ? 'resolve' : 'reject'](_random(steps + 1, options));
}

// 25.5 AsyncFunction Objects
export function asyncFunction() {
  return async function af() {}; // eslint-disable-line no-empty-function
}
