import { array } from './index';

export default function fuzzFunction(fn, options = {}) {
  const args = array(options);
  fn(...args);
}
