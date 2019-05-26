'use strict';

/* eslint-disable no-use-before-define */

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min, max) {
  if (!max) {
    return Math.round(Math.random() * min) + 1;
  }
  return Math.floor(Math.random() * (max - (min + 1))) + min;
}

function fuzzyUndefined() {
  return undefined;
}

function fuzzyNull() {
  return null;
}

function boolean() {
  return Math.random() > 0.5;
}

function number() {
  return randomElement([
    () => (boolean() ? -1 : 1) * Math.random() * Number.MAX_VALUE,
    () => Number.MAX_VALUE,
    () => NaN,
    () => -Infinity,
    () => Infinity,
  ])();
}

const CODEPOINTS = Array.from({ length: 0x10FFFF }, (_, i) => i);
const CODEPOINTS_LEGAL = CODEPOINTS
  .filter((v) => {
    if (v >= 0xD800 && v <= 0xDFFF) {
      return false;
    }
    if (v >= 0xF000 && v <= 0xFFFF) {
      return false;
    }
    return true;
  });
const calculateCodepointWeight = (cp) => {
  if (cp <= 0xFFFF) {
    return 40;
  }
  return 1;
};
const CODEPOINTS_MAX_WEIGHT = CODEPOINTS.reduce((ac, cp) => ac + calculateCodepointWeight(cp), 0);
const CODEPOINTS_LEGAL_MAX_WEIGHT = CODEPOINTS
  .reduce((ac, cp) => ac + calculateCodepointWeight(cp), 0);

function string(options = {}) {
  const charCodes = [];
  const length = randomNumber(options.minLength || 0, options.maxLength || 10);
  for (let i = 0; i < length; i += 1) {
    const r = randomNumber(options.illegalUnicode
      ? CODEPOINTS_MAX_WEIGHT
      : CODEPOINTS_LEGAL_MAX_WEIGHT);
    let s = 0;
    for (const cp of options.illegalUnicode ? CODEPOINTS : CODEPOINTS_LEGAL) {
      s += calculateCodepointWeight(cp);
      if (r <= s) {
        charCodes.push(cp);
        break;
      }
    }
  }

  return String.fromCodePoint.apply(null, charCodes);
}

function symbol(options = {}) {
  return Symbol(boolean() ? undefined : string(options));
}

function regexp() {
  return new RegExp(
    '((a)|(ab))((c)|(bc))',
    (boolean() ? 'g' : '')
    + (boolean() ? 'i' : '')
    + (boolean() ? 'm' : ''),
  );
}

const HasOwnProperty = Object.prototype.hasOwnProperty;
function object(options = {}, steps = 0) {
  const length = steps > options.maxSteps
    ? 0
    : randomNumber(options.minLength || 0, options.maxLength || 10);
  const obj = options.base || {};

  while (Object.getOwnPropertyNames(obj).length < length) {
    const name = string({ ...options, minLength: 1 });
    if (HasOwnProperty.call(obj, name)) {
      continue; // eslint-disable-line no-continue
    }

    const base = {
      enumerable: boolean(),
      configurable: boolean(),
    };
    if (options.accessors && boolean()) {
      if (boolean()) {
        base.get = fuzzyFunction();
      }
      if (boolean()) {
        base.set = () => 0;
      } // eslint-disable-line no-empty-function
    } else {
      base.value = irandom(steps + 1, options);
      base.writeable = boolean();
    }
    Object.defineProperty(obj, name, base);
  }

  return obj;
}

function fuzzyFunction(options = {}, steps = 0) {
  if (boolean()) {
    return () => irandom(steps, options);
  }
  const x = (0, function () { // eslint-disable-line func-names
    return irandom(steps, options);
  });
  if (boolean()) {
    Object.defineProperty(x, 'name', {
      value: string(options),
    });
  }
  return x;
}

function array(options = {}, steps = 0) {
  const length = steps > options.maxSteps
    ? 0
    : randomNumber(options.minLength || 0, options.maxLength || 10);
  const arr = new Array(length);
  for (let i = 0; i < length; i += 1) {
    arr[i] = irandom(steps, options);
  }
  return arr;
}

const TYPED_ARRAYS = [
  Int8Array, Uint8Array, Uint8ClampedArray,
  Int16Array, Uint16Array,
  Int32Array, Uint32Array,
  Float32Array, Float64Array,
];
function typedArray(options = {}) {
  const length = randomNumber(options.minLength || 0, options.maxLength || 10);
  const arr = new (randomElement(TYPED_ARRAYS))(length);
  for (let i = 0; i < length; i += 1) {
    arr[i] = randomNumber(0, 128);
  }
  return arr;
}

const ERRORS = [Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError];
function error() {
  return new (randomElement(ERRORS))(string());
}

function map(options = {}, steps = 0) {
  const length = steps > options.maxSteps
    ? 0
    : randomNumber(options.minLength || 0, options.maxLength || 5);
  const m = new Map();
  for (let i = 0; i < length; i += 1) {
    m.set(irandom(steps, options), irandom(steps + 1, options));
  }
  return m;
}

function set(options = {}, steps = 0) {
  const length = steps > options.maxSteps
    ? 0
    : randomNumber(options.minLength || 0, options.maxLength || 10);
  const s = new Set();
  for (let i = 0; i < length; i += 1) {
    s.add(irandom(steps, options));
  }
  return s;
}

function weakMap(options = {}, steps = 0) {
  const length = steps > options.maxSteps
    ? 0
    : randomNumber(options.minLength || 0, options.maxLength || 5);
  const m = new WeakMap();
  for (let i = 0; i < length; i += 1) {
    m.set(object(options, steps + 1), irandom(steps, options));
  }
  return m;
}

function weakSet(options = {}, steps = 0) {
  const length = steps > options.maxSteps
    ? 0
    : randomNumber(options.minLength || 0, options.maxLength || 10);
  const s = new WeakSet();
  for (let i = 0; i < length; i += 1) {
    s.add(object(options, steps + 1));
  }
  return s;
}

function date() {
  return new Date(randomNumber(-864e13, 864e13));
}

function arrayBuffer(options = {}) {
  const length = randomNumber(options.minLength || 0, options.maxLength || 10);
  return new ArrayBuffer(length);
}

function json(options = {}, steps = 0) {
  return JSON.stringify(object(options, steps + 1), (key, value) => {
    if (typeof value === 'bigint') { // eslint-disable-line valid-typeof
      return 0;
    }
    return value;
  });
}

function promise(options = {}, steps = 0) {
  return Promise[boolean() ? 'resolve' : 'reject'](irandom(steps, options));
}

function proxy(options = {}, steps = 0) {
  return new Proxy(object(options, steps + 1), {
    has() {
      return boolean();
    },
    set: () => boolean(),
  });
}

function bigint() { // eslint-disable-line import/prefer-default-export
  let len = randomNumber(1, 64);
  let str = `${boolean() ? '-' : ''}`;
  while (len > 0) {
    len -= 1;
    str += randomNumber(0, 9);
  }
  return BigInt(str);
}

const METHODS = [
  fuzzyUndefined, fuzzyNull, object, fuzzyFunction,
  boolean, symbol, error, number, date,
  string, regexp, array, typedArray,
  map, set, weakMap, weakSet, arrayBuffer,
  json, promise, proxy, bigint,
];

function irandom(steps, options = {}) {
  if (!options.maxSteps) {
    options.maxSteps = 10;
  }

  if (options.values && options.values.length > 0 && Math.random() < 0.15) {
    return randomElement(options.values);
  }
  options.values = [];

  if (options.exclude) {
    options.included = METHODS.filter((m) => !options.exclude.includes(m));
    delete options.exclude;
  }

  const value = randomElement(options.included || METHODS)(options, steps + 1);
  options.values.push(value);

  return value;
}

function fuzzFunction(fn, options = {}) {
  const errors = [];
  for (let i = 0; i < (options.maxLength || 5); i += 1) {
    const args = array(options);
    try {
      const ret = fn(...args);
      if (!options.returnTypes) {
        continue; // eslint-disable-line no-continue
      }
      const t = typeof ret;
      if (!options.returnTypes.some((T) => t === T || ret instanceof T)) {
        errors.push([args, new Error('did not return one of the specified return types')]);
      }
    } catch (err) {
      if (!options.canError) {
        errors.push([args, err]);
      }
    }
  }
  return errors;
}

function random(options = {}) {
  return irandom(0, options);
}

module.exports = random;

Object.assign(module.exports, {
  random,
  fuzzFunction,

  undefined: fuzzyUndefined,
  null: fuzzyNull,
  object,
  function: fuzzyFunction,
  boolean,
  symbol,
  error,
  number,
  date,
  string,
  regexp,
  array,
  typedArray,
  map,
  set,
  weakMap,
  weakSet,
  arrayBuffer,
  json,
  promise,
  proxy,
  bigint,
});
