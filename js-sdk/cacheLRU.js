/**
 * Design an class LRU, which
 *  - takes cache size as input
 *  - Exposes two methods - getFromCache and SetInCache
 *  - Acts as Least Recently Used Cache
 */

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;

    this.next = null;
    this.previous = null;
  }
}

class CacheLRU {
  #cacheSize;
  #cacheMap;
  #headNode;
  #tailNode;

  constructor(size = 4) {
    this.#cacheSize = size;
    this.#cacheMap = new Map();

    this.#headNode = new Node(null, null);
    this.#tailNode = new Node(null, null);

    this.#headNode.next = this.#tailNode;
    this.#tailNode.previous = this.#headNode;
  }

  #addToFront(node) {
    node.next = this.#headNode.next;
    this.#headNode.next.previous = node;

    this.#headNode.next = node;
    node.previous = this.#headNode;
  }

  #removeNode(node) {
    node.previous.next = node.next;
    node.next.previous = node.previous;
  }

  #moveToFront(node) {
    this.#removeNode(node);
    this.#addToFront(node);
  }

  getFromCache(key) {
    if (this.#cacheMap.has(key)) {
      const node = this.#cacheMap.get(key);
      this.#moveToFront(node);
      return node.value;
    }
    return "not found";
  }

  setInCache(key, value) {
    if (!this.#cacheMap.has(key)) {
      if (this.#cacheMap.size === this.#cacheSize) {
        const lastNode = this.#tailNode.previous;
        this.#removeNode(lastNode);
        this.#cacheMap.delete(lastNode.key);
      }

      const newNode = new Node(key, value);
      this.#cacheMap.set(key, newNode);
      this.#addToFront(newNode);
    }
  }
}

const cache = new CacheLRU(2);
cache.setInCache(1, "1");
cache.setInCache(2, "2");
cache.setInCache(3, "3");
console.log("value of 1 after limit cross", cache.getFromCache(1));
cache.setInCache(4, "4");
console.log(cache.getFromCache(4));
