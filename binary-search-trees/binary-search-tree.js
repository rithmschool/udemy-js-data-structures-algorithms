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
  insert(value) {
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
  remove(val) {
    var target = this.root;
    var parent;

    while (target.value !== val) {
      parent = target;
      if (val < target.value) {
        target = target.left;
      } else {
        target = target.right;
      }
    }

    //    IF TARGET IS NOT THE ROOT
    if (target !== this.root) {
      if (target.left === null && target.right === null) {
        if (parent.left === target) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (target.left !== null && target.right !== null) {
        let rightParent = target;
        let right = target.right;
        if (right.left === null) {
          right.left = target.left;
          if (parent.left === target) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === target) {
            parent.left.value = right.value;
          } else {
            parent.right.value = right.value;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parent.left === target) {
          if (target.right === null) {
            parent.left = target.left;
          } else {
            parent.left = target.right;
          }
        } else {
          if (target.right === null) {
            parent.right = target.left;
          } else {
            parent.right = target.right;
          }
        }
      }
    }
    return target;
  }
}
