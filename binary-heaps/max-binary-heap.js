class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(element) {
    this.values.push(element);
    this.bubbleUp(this.values.length - 1);
  }

  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown(0);
    }
    return max;
  }

  bubbleUp(idx) {
    // Fetch the element that has to be moved.
    const element = this.values[idx];
    // When at 0, an element can not go up any further.
    while (idx > 0) {
      // Compute the parent element's index, and fetch it.
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      // If the parent has a greater score, things are in order and we are done.
      if (element <= parent) {
        break;
      }
      // Otherwise, swap the parent with the current element and continue.
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  sinkDown(idx) {
    // Look up the target element and its score.
    const length = this.values.length;
    const element = this.values[idx];

    while (true) {
      // Compute the indices of the child elements.
      let rightChildIdx = 2 * idx + 2;
      let leftChildIdx = 2 * idx + 1;
      let leftChild, rightChild;
      // This is used to store the new position of the element, if any.
      let swap = null;
      // If the left child exists (is inside the array)...
      if (leftChildIdx < length) {
        // Look it up and compute its score.
        leftChild = this.values[leftChildIdx];
        // If the score is less than our element's, we need to swap.
        if (leftChild > element) {
          swap = leftChildIdx;
        }
      }
      // Do the same checks for the right child.
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        // right child can become the swap index if it is greater than
        //   the current element OR if it is greater than
        //     the the to-be-swapped left child
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }

      // No need to swap further, we are done.
      if (swap === null) {
        break;
      }

      // Otherwise, swap and continue.
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

function maxHeapify(input) {
  for (let i = Math.floor(input.length / 2); i >= 0; i--) {
    innerHeapify(input, i);
  }
  return input;
}

function innerHeapify(input, idx) {
  const left = 2 * idx + 1;
  const right = 2 * idx + 2;
  let largest = idx;

  if (left < input.length && input[left] > input[largest]) {
    largest = left;
  }

  if (right < input.length && input[right] > input[largest]) {
    largest = right;
  }

  if (largest !== idx) {
    [input[idx], input[largest]] = [input[largest], input[idx]];
    innerHeapify(input, largest);
  }
}
