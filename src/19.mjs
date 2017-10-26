import { randomElement, randomNumber } from './util';
import { _random, string } from './index';

// 19.1 Object
export function object(options = {}, steps) {
  const length = randomNumber(options.maxLength || 10);
  const obj = options.base || {};

  while (Object.getOwnPropertyNames(obj).length < length) {
    const name = string();

    if (!(name in object)) {
      const base = {
        enumerable: boolean(),
        configurable: boolean(),
      };
      if (boolean()) {
        base.get = function get() {}; // eslint-disable-line no-empty-function
        base.set = function set() {}; // eslint-disable-line no-empty-function
      } else {
        base.value = _random(steps + 1, options);
        base.writeable = boolean();
      }
      Object.defineProperty(obj, name, base);
    }
  }

  return obj;
}

// 19.2 Function
export function makeFunction() {
  // eslint-disable-next-line no-empty-function
  return function anonymous() {};
}

// 19.3 Boolean
export function boolean() {
  return Math.random() > 0.5;
}

// 19.4 Symbol
export function symbol() {
  return Symbol(string());
}

// 19.5 Error
const errors = [Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError];
export function error() {
  return new (randomElement(errors))(string());
}
