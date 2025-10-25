// Simple in-memory cache for performance optimization
class Cache {
  constructor() {
    this.cache = new Map();
    this.ttl = new Map(); // Time to live for each key
  }

  // Set cache with TTL (time to live in seconds)
  set(key, value, ttlSeconds = 30) {
    this.cache.set(key, value);
    this.ttl.set(key, Date.now() + (ttlSeconds * 1000));
  }

  // Get from cache
  get(key) {
    // Check if expired
    const expiryTime = this.ttl.get(key);
    if (expiryTime && Date.now() > expiryTime) {
      this.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  // Check if key exists and is not expired
  has(key) {
    const expiryTime = this.ttl.get(key);
    if (expiryTime && Date.now() > expiryTime) {
      this.delete(key);
      return false;
    }
    return this.cache.has(key);
  }

  // Delete from cache
  delete(key) {
    this.cache.delete(key);
    this.ttl.delete(key);
  }

  // Clear all cache
  clear() {
    this.cache.clear();
    this.ttl.clear();
  }

  // Get cache size
  size() {
    return this.cache.size;
  }

  // Clean expired entries
  cleanExpired() {
    const now = Date.now();
    for (const [key, expiryTime] of this.ttl.entries()) {
      if (now > expiryTime) {
        this.delete(key);
      }
    }
  }
}

// Create singleton instance
const cache = new Cache();

// Clean expired entries every minute
setInterval(() => {
  cache.cleanExpired();
}, 60000);

module.exports = cache;
