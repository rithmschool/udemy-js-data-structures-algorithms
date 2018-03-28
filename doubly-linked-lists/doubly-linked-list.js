function Node(val) {
  this.val = val;
  this.prev = null;
  this.next = null;
}

function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

// Initialization code(click to edit)
DoublyLinkedList.prototype.push = function(val) {
  var node = new Node(val);
  if (this.head === null) {
    this.head = node;
    this.tail = this.head;
    this.length++;
  } else {
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
    this.length++;
  }
  return this;
}

DoublyLinkedList.prototype.remove = function(index) {
  if (index < 0 || index >= this.length) {
    return undefined;
  }

  var tmp;
  if (index === 0) {
    tmp = this.head;
    if (this.length === 1) {
      this.tail = null;
      this.head = null;
      this.length = 0;
      return tmp;
    }

    this.head = this.head.next;
    if (this.head !== null) {
      this.head.prev = null;
    }
    this.length--;
    return tmp;
  }

  if (index === this.length - 1) {
    tmp = this.tail;
    this.tail = this.tail.prev;
    if (this.tail !== null) {
      this.tail.next = null;
    }
    this.length--;
    return tmp;
  }

  var prev = this.__get(index-1);
  tmp = prev.next;
  prev.next = prev.next.next;
  if (prev.next !== null) {
    prev.next.prev = prev;
  }
  this.length--;
  return tmp;
}

DoublyLinkedList.prototype.reverse = function(){
  var current = this.head;
  var tail = this.tail;
  var temp;
  while(current){
    temp = current.next;
    current.next = current.prev;
    current.prev = temp;
    if(!temp){
      this.tail = this.head
      this.head = current
    }
    current = temp;
  }
  return this;
}


DoublyLinkedList.prototype.__insert = function(index, val) {
  if (index < 0 || index > this.length) {
    return false;
  }

  var node = new Node(val);
  if (index === 0) {
    if (this.head === null) {
      this.head = node;
      this.tail = this.head;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
    return true;
  }

  var prev = this.__get(index - 1);

  if (prev === null) {
    return false;
  }

  node.prev = prev;
  node.next = prev.next;
  if (this.tail === prev) {
    this.tail = node;
  }
  prev.next = node;
  this.length++;
  return true;
}

DoublyLinkedList.prototype.__get = function(index) {
  if (index < 0 || index >= this.length) {
    return null;
  }

  var el = null;
  var count;

  if (index <= Math.floor(this.length/2)) {
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

 DoublyLinkedList.prototype.__insert = function(idx, val) {
  if(idx < 0 || idx >= this.length) return false;
  let count =
  let current;
  let newNode = new Node(val);
  let middle = Math.floor(this.length/2)
  
  if(idx < middle) {
    current = this.head;
    if(count === idx) {
      newNode.prev = current.prev;
      newNode.next = current;
      current.prev = newNode;
      this.length++;
      return true;
    } else {
      current = current.next;
      count++;
    }
  } else {
    count = this.length - 1;
    current = this.tail;
    if(count === idx) {
      newNode.prev = current.prev;
      newNode.next = current;
      current.prev = newNode;
      this.length++;
      return true;
    } else {
      current = current.next;
      count--;
    }
  }
  return false;
} 