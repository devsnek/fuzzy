import { boolean, object } from './index.mjs';

// 26.2 Proxy
export function proxy(options = {}, steps = 0) { // eslint-disable-line import/prefer-default-export
  return new Proxy(object(options, steps + 1), {
    has() {
      return boolean();
    },
    set: () => boolean(),
  });
}
