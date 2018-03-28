class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  dequeue() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return max;
  }

  bubbleUp(idx = this.values.length - 1) {
    // Fetch the element that has to be moved.
    const element = this.values[idx];
    // When at 0, an element can not go up any further.
    while (idx > 0) {
      // Compute the parent element's index, and fetch it.
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      // If the parent has a lesser score, things are in order and we are done.
      if (element.priority >= parent.priority) {
        break;
      }
      // Otherwise, swap the parent with the current element and continue.
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  sinkDown(idx = 0) {
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
        // If the score is greater than our element's, we need to swap.
        if (leftChild.priority <= element.priority) {
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
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
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

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}
