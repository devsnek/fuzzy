export function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomNumber(min, max) {
  if (!max)
    return Math.round(Math.random() * min) + 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function excludeElements(excluded, array) {
  const dup = [];
  for (const item of array) {
    if (excluded.includes(item))
      continue;
    dup.push(item);
  }
  return dup;
}
