import { boolean, object } from './index';

// 26.2 Proxy
export function proxy(options = {}, steps = 0) {
  return new Proxy(object(options, steps + 1), {
    has() {
      return boolean();
    },
    set: () => boolean(),
  });
}
