import { randomNumber } from './util.mjs';
import { boolean } from './index.mjs';

// 21.1 String
export function string(options = {}) {
  const charCodes = [];
  const length = randomNumber(options.minLength || 0, options.maxLength || 10);
  for (let i = 0; i < length; i += 1) {
    charCodes.push(randomNumber(65536));
  }

  return String.fromCharCode.apply(null, charCodes);
}

// 21.2 RegExp
export function regexp() {
  return new RegExp(
    '((a)|(ab))((c)|(bc))',
    (boolean() ? 'g' : '')
    + (boolean() ? 'i' : '')
    + (boolean() ? 'm' : ''),
  );
}
