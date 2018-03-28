class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  pop() {
    if (this.length === 0) {
      return undefined;
    }

    let popNode = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = popNode.prev;
      popNode.prev.next = null;
      popNode.prev = null;
    }

    this.length--;
    return popNode;
  }

  unshift(element) {
    let unshiftNode = new Node(element);

    if (this.length === 0) {
      this.head = unshiftNode;
      this.tail = unshiftNode;
    } else {
      let oldHead = this.head;
      oldHead.prev = unshiftNode;
      unshiftNode.next = oldHead;
      this.head = unshiftNode;
    }
    this.length++;
    return this;
  }

  shift() {
    if (this.length === 0) {
      return undefined;
    }

    let shiftNode = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = shiftNode.next;
      shiftNode.next.prev = null;
      shiftNode.next = null;
    }

    this.length--;
    return shiftNode;
  }

  set(index, val) {
    var cur = this.get(index);
    if (cur !== null) {
      cur.val = val;
      return true;
    }

    return false;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }

    var el = null;
    var count;

    if (index <= Math.floor(this.length / 2)) {
      count = 0;
      for (el = this.head; el !== null && count != index; el = el.next) {
        count++;
      }
    } else {
      count = this.length - 1;
      for (el = this.tail; el !== null && count != index; el = el.prev) {
        count--;
      }
    }

    return el;
  }

  push(element) {
    let pushNode = new Node(element);

    if (this.length === 0) {
      this.head = pushNode;
      this.tail = pushNode;
    } else {
      let oldTail = this.tail;
      oldTail.next = pushNode;
      pushNode.prev = oldTail;
      this.tail = pushNode;
    }
    this.length++;
    return this;
  }

  insert(ind, value) {
    var current = this.head;
    var newNode = new Node(value);
    if (ind >= this.length) {
      return false;
    }
    for (let i = 0; i < this.length; i++) {
      if (i === ind - 1) {
        newNode.next = current.next;
        current.next = newNode;
        newNode.prev = current;
        newNode.next.prev = newNode;
        this.length++;
        return true;
      }
      current = current.next;
    }
  }

  remove(ind) {
    var current = this.head;
    if (ind >= this.length) {
      return;
    }
    for (let i = 0; i < this.length; i++) {
      if (i === ind) {
        current.prev.next = current.next;
        current.next.prev = current.prev;
        this.length--;
        return current;
      }
      current = current.next;
    }
  }

  reverse() {
    var prev = null;
    var cur = this.head;
    var next = cur.next;
    for (let i = 0; i < this.length; i++) {
      cur.next = prev;
      cur.prev = next;
      prev = cur;
      cur = next;
      if (next) next = next.next;
    }
    let tail = this.tail;
    this.tail = this.head;
    this.head = tail;

    return this;
  }
}
