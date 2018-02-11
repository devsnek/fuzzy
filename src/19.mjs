import { randomElement, randomNumber } from './util';
import { _random, string } from './index';

// 19.1 Object
export function object(options = {}, steps) {
  const length = randomNumber(options.minLength || 0, options.maxLength || 10);
  const obj = options.base || {};

  while (Object.getOwnPropertyNames(obj).length < length) {
    const name = string(Object.assign({ minLength: 1 }, options));
    if (name in object)
      continue;

    const base = {
      enumerable: boolean(),
      configurable: boolean(),
    };
    if (boolean()) {
      if (boolean())
        base.get = () => _random(steps + 1, options);
      if (boolean())
        base.set = function set() {}; // eslint-disable-line no-empty-function
    } else {
      base.value = _random(steps + 1, options);
      base.writeable = boolean();
    }
    Object.defineProperty(obj, name, base);
  }

  return obj;
}

// 19.2 Function
function makeFunction() {
  // eslint-disable-next-line no-empty-function
  return function anonymous() {};
}
export { makeFunction as function };

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
