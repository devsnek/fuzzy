import { array } from './index';

export default function fuzzFunction(fn, options = {}) {
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
