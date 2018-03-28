function countUniqueValues(arr) {
  // O(n) space
  // return new Set(arr).size;
  // O(1) space
  if (arr.length === 0) return 0;
  var i = 0;
  for (var j = 1; j < arr.length; j++) {
    if (arr[j] !== arr[i]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}
