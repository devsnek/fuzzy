// https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
function fuzzyUndefined() {
  return undefined;
}

// https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
function fuzzyNull() {
  return null;
}

export {
  fuzzyUndefined as undefined,
  fuzzyNull as null,
};
