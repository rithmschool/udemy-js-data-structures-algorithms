class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  push(val) {
    var node = new Node(val);

    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      var tmp = this.first;
      this.first = node;
      this.first.next = tmp;
    }

    return ++this.size;
  }

  pop() {
    if (!this.first) return null;

    var temp = this.first;

    if (this.first == this.last) {
      this.last = null;
    }

    this.first = this.first.next;
    this.size--;
    return temp.value;
  }

  peek() {
    return this.first.value;
  }
}
