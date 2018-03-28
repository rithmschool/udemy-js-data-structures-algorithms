function Node(val) {
  this.val = val;
  this.next = null;
}

function SinglyLinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

SinglyLinkedList.prototype.push = function(val) {
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
};

SinglyLinkedList.prototype.get = function(index) {
  if (index >= this.length || index < 0) {
    return null;
  }

  cur = this.head;
  var count = 0;
  for (var cur = this.head; cur !== null && count != index; cur = cur.next) {
    count++;
  }

  return cur;
};

SinglyLinkedList.prototype.insert = function(index, val) {
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
};

SinglyLinkedList.prototype.reverse = function() {
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
};

SinglyLinkedList.prototype.remove = function(index) {
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
};

SinglyLinkedList.prototype.pop = function() {
  return this.remove(this.length - 1);
};
