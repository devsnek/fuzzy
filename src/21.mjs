import { randomNumber } from './util';
import { boolean } from './index';

// 21.1 String
export function string(options = {}) {
  const charCodes = [];
  for (let i = 0; i < (options.maxLength || 10); i++) {
    charCodes.push(randomNumber(65536));
  }
  return String.fromCharCode.apply(null, charCodes);
}

// 21.2 RegExp
export function regexp() {
  return new RegExp('((a)|(ab))((c)|(bc))',
    (boolean() ? 'g' : '') +
    (boolean() ? 'i' : '') +
    (boolean() ? 'm' : ''));
}
