import { randomNumber, randomElement } from './util';
import { _random } from './index';

// 22.1 Array
export function array(options = {}, steps = 0) {
  const length = randomNumber(options.minLength || 0, options.maxLength || 10);
  const arr = new Array(length);
  for (let i = 0; i < length; i += 1) {
    arr[i] = _random(steps + 1, options);
  }
  return arr;
}

// 22.2 TypedArray
const typedArrays = [
  Int8Array, Uint8Array, Uint8ClampedArray,
  Int16Array, Uint16Array,
  Int32Array, Uint32Array,
  Float32Array, Float64Array,
];
export function typedArray(options = {}) {
  const length = randomNumber(options.minLength || 0, options.maxLength || 10);
  const arr = new (randomElement(typedArrays))(length);
  for (let i = 0; i < length; i += 1) {
    arr[i] = randomNumber(0, 128);
  }
  return arr;
}
