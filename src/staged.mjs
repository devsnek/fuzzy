import { randomNumber } from './util';
import { boolean } from './19';

// https://github.com/tc39/proposal-bigint
export function bigint() { // eslint-disable-line import/prefer-default-export
  let len = randomNumber(1, 64);
  let str = `${boolean() ? '-' : ''}`;
  while (len > 0) {
    len -= 1;
    str += randomNumber(0, 9);
  }
  return BigInt(str);
}
