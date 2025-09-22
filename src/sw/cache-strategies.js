// Cache Strategy Classes for SOL PWA
class CacheStrategy {
  constructor(name, pattern, maxAge = 86400000, maxEntries = 100) {
    this.name = name;
    this.pattern = pattern;
    this.maxAge = maxAge;
    this.maxEntries = maxEntries;
  }

  matches(request) {
    if (typeof this.pattern === 'string') {
      return request.url.includes(this.pattern);
    }
    if (this.pattern instanceof RegExp) {
      return this.pattern.test(request.url);
    }
    return false;
  }

  async execute(request, cache) {
    throw new Error('Strategy execute method must be implemented');
  }
}

class CacheFirstStrategy extends CacheStrategy {
  async execute(request, cache) {
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      console.warn('Network failed, no cache available:', error);
      throw error;
    }
  }
}

class NetworkFirstStrategy extends CacheStrategy {
  async execute(request, cache) {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      console.warn('Network failed, trying cache:', error);
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  }
}

class StaleWhileRevalidateStrategy extends CacheStrategy {
  async execute(request, cache) {
    const cachedResponse = await cache.match(request);
    
    // Always try to fetch from network in background
    const networkPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => {
      // Ignore network errors for background update
    });

    // Return cached version immediately if available
    if (cachedResponse) {
      return cachedResponse;
    }

    // If no cache, wait for network
    return networkPromise;
  }
}

class NetworkOnlyStrategy extends CacheStrategy {
  async execute(request, cache) {
    return fetch(request);
  }
}

class CacheOnlyStrategy extends CacheStrategy {
  async execute(request, cache) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw new Error('No cached response available');
  }
}

// Strategy Factory
class StrategyFactory {
  static create(config) {
    switch (config.strategy) {
      case 'cache-first':
        return new CacheFirstStrategy(config.name, config.pattern, config.maxAge, config.maxEntries);
      case 'network-first':
        return new NetworkFirstStrategy(config.name, config.pattern, config.maxAge, config.maxEntries);
      case 'stale-while-revalidate':
        return new StaleWhileRevalidateStrategy(config.name, config.pattern, config.maxAge, config.maxEntries);
      case 'network-only':
        return new NetworkOnlyStrategy(config.name, config.pattern, config.maxAge, config.maxEntries);
      case 'cache-only':
        return new CacheOnlyStrategy(config.name, config.pattern, config.maxAge, config.maxEntries);
      default:
        return new CacheFirstStrategy(config.name, config.pattern, config.maxAge, config.maxEntries);
    }
  }
}

// Export for use in service worker
self.CacheStrategy = CacheStrategy;
self.StrategyFactory = StrategyFactory;
