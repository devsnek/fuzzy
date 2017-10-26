import { boolean, object } from './index';

// 26.2 Proxy
const must = ['prototype', 'toString'];
export function proxy(options = {}, steps = 0) {
  return new Proxy(object(options, steps + 1), {
    has(target, prop) {
      if (must.includes(prop)) return true;
      return boolean();
    },
    set: () => boolean(),
  });
}
