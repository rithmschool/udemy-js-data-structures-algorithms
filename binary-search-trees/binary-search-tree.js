class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insertIteratively(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return this;
    } else {
      var current = this.root;
      while (true) {
        if (value < current.value) {
          if (current.left === null) {
            current.left = new Node(value);
            return this;
          } else {
            current = current.left;
          }
        } else if (value > current.value) {
          if (current.right === null) {
            current.right = new Node(value);
            return this;
          } else {
            current = current.right;
          }
        }
      }
    }
  }
  find(value) {
    var start = this.root,
      found = false;

    if (value === start.value) {
      return start;
    }

    while (start && !found) {
      if (value < start.value) {
        start = start.left;
      } else if (value > start.value) {
        start = start.right;
      } else {
        found = true;
      }
    }
    if (!found) return undefined;
    return start;
  }
  breadthFirstSearch() {
    var node = this.root,
      queue = [],
      data = [];
    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.value);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return data;
  }
  DFSPreOrder() {
    var data = [];
    var current = this.root;
    function traverse(node) {
      data.push(node.value);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    }
    traverse(current);
    return data;
  }
  DFSInOrder() {
    var data = [];
    var current = this.root;
    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    }
    traverse(current);
    return data;
  }
  DFSPostOrder() {
    var data = [];
    var current = this.root;
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value);
    }
    traverse(current);
    return data;
  }
  __countChildren(node) {
    var count = 0;
    if (node.left !== null) count++;
    if (node.right !== null) count++;
    return count;
  }
  remove(value) {
    let parent;
    let side;
    //curr is the node to remove
    const curr = findCurr(this.root);
    if (curr === null) return null;
    if (curr === this.root) {
      this.root = null;
    } else if (!curr.right && !curr.left) {
      parent[side] = null;
    } else if (curr.right && curr.left) {
      removeWhenTwoChildren();
    } else {
      removeWhenOneChild;
    }
    return curr;

    function findCurr(node) {
      if (node === null) return null;
      if (node.right.value === value) {
        parent = node;
        side = "right";
        return node.right;
      }
      if (node.left.value === value) {
        parent = node;
        side = "left";
        return node.left;
      }
      if (value > node.value) return findCurr(node.right);
      else return findCurr(node.left);
    }
    function removeWhenOneChild() {
      if (curr.right && !curr.left) {
        parent[side] = curr.right;
        curr.right = null;
      }
      if (curr.left && !curr.right) {
        parent[side] = curr.left;
        curr.left = null;
      }
    }
    function removeWhenTwoChildren() {
      let toRight = curr.right;
      //toRight doesn't have a left
      if (!toRight.left) {
        parent[side] = toRight;
        toRight.left = curr.left;
      } else {
        //toRight has a left
        let successorParent = toRight;
        let successorChild = toRight.left;
        while (successorChild.left) {
          successorParent = successorChild;
          successorChild = successorChild.left;
        }
        successorParent.left = successorChild.right;
        parent[side] = successorChild;
        successorChild.left = curr.left;
        successorChild.right = toRight;
      }
      curr.right = null;
      curr.left = null;
    }
  }
}
