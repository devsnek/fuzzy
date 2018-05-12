import { _random, boolean } from './index';

// 25.2 GeneratorFunction
export function generatorFunction() {
  // eslint-disable-next-line no-empty-function
  return Object.getPrototypeOf(function* g() {}).constructor;
}

// 25.3 Generator
export function* generator(options = {}, steps = 0) {
  yield _random(steps, options); steps += 1;
  yield _random(steps, options); steps += 1;
  yield _random(steps, options); steps += 1;
  return _random(steps, options);
}

// 25.4 Promise Objects
export function promise(options = {}, steps = 0) {
  return Promise[boolean() ? 'resolve' : 'reject'](_random(steps + 1, options));
}

// 25.5 AsyncFunction
export function asyncFunction() {
  // eslint-disable-next-line no-empty-function
  return Object.getPrototypeOf(async () => {}).constructor;
}
