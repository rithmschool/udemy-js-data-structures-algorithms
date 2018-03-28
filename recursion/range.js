function recursiveRange(x) {
  if (x === 0) return 0;
  return x + recursiveRange(x - 1);
}
