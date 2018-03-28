// O(n) space + O(n) time

function findPair(arr, n) {
  var s = new Set(arr.map(e => Math.abs(e - n)));
  if (n === 0 && s.size === arr.length) return false;
  for (let i = 0; i < arr.length; i++) {
    if (s.has(arr[i])) return true;
  }
  return false;
}

// O(1) space + O(n log n) time

function findPair(arr, num) {
  arr.sort((a, b) => a - b);
  let i = 0;
  let j = 1;
  while (i < arr.length && j < arr.length) {
    if (i !== j && Math.abs(arr[j] - arr[i]) === Math.abs(num)) {
      return true;
    } else if (arr[j] - arr[i] < num) {
      j++;
    } else {
      i++;
    }
  }
  return false;
}
