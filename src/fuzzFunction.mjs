import { array } from './index';

export default function fuzzFunction(fn, options = {}) {
  const errors = [];
  for (let i = 0; i < (options.maxLength || 5); i++) {
    const args = array(options);
    try {
      const ret = fn(...args);
      if (options.returnTypes) {
        for (const type of options.returnTypes) {
          if (
            (typeof type === 'string' && typeof ret !== type) ||
            !(ret instanceof type)
          ) {
            errors.push(`arguments ${args} did not return one of the specified return types`);
          }
        }
      }
    } catch (err) {
      if (!options.canError) errors.push(`arguments ${args} threw error ${err}`);
    }
  }
  return errors;
}
