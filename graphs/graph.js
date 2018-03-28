function WeightedGraph() {
  Graph.apply(this, arguments);
}

WeightedGraph.prototype = Object.create(Graph.prototype);
WeightedGraph.prototype.constructor = WeightedGraph;

WeightedGraph.prototype.addEdge = function(vertex1, vertex2, weight) {
  this.adjacencyList[vertex1].push({ node: vertex2, weight });
  this.adjacencyList[vertex2].push({ node: vertex1, weight });
};

WeightedGraph.prototype.Dijkstra = function(start, finish) {
  const nodes = new PriorityQueue();
  const distances = {};
  const previous = {};
  let smallest;
  let path = [];

  // build up distances
  for (let vertex in this.adjacencyList) {
    if (vertex === start) {
      // start is first in the queue with a distance of 0
      distances[vertex] = 0;
      nodes.enqueue(vertex, 0);
    } else {
      // everyone else go to the bottom with infinity priority
      distances[vertex] = Infinity;
      nodes.enqueue(vertex, Infinity);
    }
    // initialize each previous at null
    previous[vertex] = null;
  }

  // as long as there is something in the fringe
  while (nodes.values.length) {
    // take out the first value in the Q
    smallest = nodes.dequeue().val;

    // all done?
    if (smallest === finish) {
      // build up the array of previously visited nodes
      while (previous[smallest]) {
        path.push(smallest);
        smallest = previous[smallest];
      }
      break;
    }

    if (smallest || distances[smallest] !== Infinity) {
      for (let neighbor in this.adjacencyList[smallest]) {
        // go through each node in the adjacency list
        let nextNode = this.adjacencyList[smallest][neighbor];

        // calculate current distance and the weight
        let candidate = distances[smallest] + nextNode.weight;

        let nextNeighbor = nextNode.node;

        // if the distance is less than what is currently stored?
        if (candidate < distances[nextNeighbor]) {
          // update with new lower distance
          distances[nextNeighbor] = candidate;
          // update previous to be new value
          previous[nextNeighbor] = smallest;
          // enqueue the future node with its new priority
          nodes.enqueue(nextNeighbor, candidate);
        }
      }
    }
  }
  return path.concat(smallest).reverse();
};

// Graph Stuff

function Graph() {
  this.adjacencyList = {};
}

Graph.prototype.numEdges = function() {
  let total = 0;

  Object.values(this.adjacencyList).forEach(list => {
    total += list.length;
  });

  // note that we've double-counted up til now since we've looked at
  // the adjacencyList for every node.
  return total / 2;
};

Graph.prototype.addVertex = function(vertex) {
  this.adjacencyList[vertex] = [];
};

Graph.prototype.addEdge = function(vertex1, vertex2) {
  this.adjacencyList[vertex1].push(vertex2);
  this.adjacencyList[vertex2].push(vertex1);
};

Graph.prototype.removeVertex = function(vertex) {
  while (this.adjacencyList[vertex].length) {
    const adjacentVertex = this.adjacencyList[vertex].pop();
    this.removeEdge(adjacentVertex, vertex);
  }
  delete this.adjacencyList[vertex];
};

Graph.prototype.removeEdge = function(vertex1, vertex2) {
  this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
    v => v !== vertex2
  );
  this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
    v => v !== vertex1
  );
};

// Priority Queue stuff

function PriorityQueue() {
  this.values = [];
}

function Node(val, priority) {
  this.val = val;
  this.priority = priority;
}

PriorityQueue.prototype.enqueue = function(val, priority) {
  const newNode = new Node(val, priority);
  this.values.push(newNode);
  this.bubbleUp();
};

PriorityQueue.prototype.dequeue = function() {
  const max = this.values[0];
  const end = this.values.pop();
  if (this.values.length > 0) {
    this.values[0] = end;
    this.sinkDown();
  }
  return max;
};

PriorityQueue.prototype.bubbleUp = function(idx = this.values.length - 1) {
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
};

PriorityQueue.prototype.sinkDown = function(idx = 0) {
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
};
