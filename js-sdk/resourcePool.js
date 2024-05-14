/**
 * Create a resource pool class, that helps in sharing common resources
 *
 *  The Resource/Object Pool design pattern is a useful way to manage a pool of reusable objects,
 *  resources, or connections that can be shared among multiple consumers to avoid the overhead of
 *  repeatedly creating and destroying objects. This pattern helps improve performance and resource management,
 *  especially when the creation of objects is expensive or slow.
 */

class Connection {
  constructor() {
    this.createdAt = Data.now();
  }

  hasExpired() {
    if (Date.now() - this.createdAt > 5000) {
      return true;
    }
    return false;
  }
}

class ConnectionFactory {
  createConnection() {
    // Create a new connection
    return new Connection();
  }
}

class ResourcePool {
  constructor(factory, maxSize) {
    this.factory = factory;
    this.pool = [];
    this.maxSize = maxSize;
  }

  borrowResource() {
    if (this.pool.length > 0) {
      const resource = this.pool.pop();
      if (!resource.hasExpired()) {
        return resource;
      }
    }
    return this.factory.createConnection();
  }

  releaseResource(resource) {
    if (!resource.hasExpired() && this.pool.length < this.maxSize) {
      this.pool.push(resource);
    }
  }
}
