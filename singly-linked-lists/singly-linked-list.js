class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    var newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;

    return this;
  }

  shift() {
    return this.remove(0);
  }

  unshift(val) {
    if (this.head === null) {
      this.head = new Node(val);
      this.tail = this.head;
    } else {
      var newNode = new Node(val);
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index >= this.length || index < 0) {
      return null;
    }

    cur = this.head;
    var count = 0;
    for (var cur = this.head; cur !== null && count != index; cur = cur.next) {
      count++;
    }

    return cur;
  }

  insert(index, val) {
    var tmp;
    if (index < 0 || index > this.length) {
      return false;
    }

    if (index === this.length) {
      return !!this.push(val);
    }

    if (index === 0) {
      tmp = null;
      if (this.head !== null) {
        tmp = this.head;
      }

      this.head = new Node(val);
      this.head.next = tmp;
      this.length++;
      return true;
    }

    var prev = this.get(index - 1);

    if (prev === null) {
      return false;
    }

    tmp = prev.next;
    prev.next = new Node(val);
    prev.next.next = tmp;
    this.length++;
    return true;
  }

  reverse() {
    var node = this.head;
    this.head = this.tail;
    this.tail = node;
    var next;
    var prev = null;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      return;
    }

    var tmp;
    if (index === 0) {
      tmp = this.head;
      this.head = this.head.next;
      this.length--;
      return tmp;
    }

    var prev = this.get(index - 1);
    tmp = prev.next;
    prev.next = prev.next.next;
    this.length--;
    return tmp;
  }

  pop() {
    return this.remove(this.length - 1);
  }
}
