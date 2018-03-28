function merge(arr1, arr2, comparator) {
  if (typeof comparator !== "function") {
    comparator = (a, b) => a - b;
  }

  var results = [];
  var i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (comparator(arr2[j], arr1[i]) > 0) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }
  return results;
}

function mergeSort(arr, comparator) {
  if (typeof comparator !== "function") {
    comparator = (a, b) => a - b;
  }
  if (arr.length <= 1) return arr;
  var mid = Math.floor(arr.length / 2);
  var left = mergeSort(arr.slice(0, mid), comparator);
  var right = mergeSort(arr.slice(mid), comparator);
  return merge(left, right, comparator);
}
