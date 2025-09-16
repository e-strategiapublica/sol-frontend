// Enhanced Service Worker for SOL PWA
importScripts('/sw/cache-strategies.js');

class ServiceWorkerManager {
  constructor() {
    this.config = null;
    this.strategies = [];
    this.cacheName = 'sol-pwa-v13';
    this.enableLogging = true;
  }

  async init() {
    await this.loadConfig();
    this.setupStrategies();
    this.setupEventListeners();
    this.log('Service Worker Manager initialized');
  }

  async loadConfig() {
    try {
      const response = await fetch('/assets/pwa/sw-config.json');
      this.config = await response.json();
      this.cacheName = `${this.config.cacheName}-${this.config.version}`;
      this.enableLogging = this.config.enableLogging;
      this.log('Configuration loaded successfully');
    } catch (error) {
      this.log('Failed to load config, using defaults', error);
      this.config = this.getDefaultConfig();
    }
  }

  setupStrategies() {
    if (!this.config?.cacheStrategies) return;

    this.strategies = this.config.cacheStrategies.map(strategyConfig => {
      const pattern = typeof strategyConfig.pattern === 'string' 
        ? new RegExp(strategyConfig.pattern) 
        : strategyConfig.pattern;
      
      return self.StrategyFactory.create({
        ...strategyConfig,
        pattern
      });
    });

    this.log(`Loaded ${this.strategies.length} cache strategies`);
  }

  setupEventListeners() {
    self.addEventListener('install', (event) => {
      this.log('Installing Service Worker');
      self.skipWaiting();
      event.waitUntil(this.handleInstall());
    });

    self.addEventListener('activate', (event) => {
      this.log('Activating Service Worker');
      self.clients.claim();
      event.waitUntil(this.handleActivate());
    });

    self.addEventListener('fetch', (event) => {
      event.respondWith(this.handleFetch(event.request));
    });

    self.addEventListener('message', (event) => {
      this.handleMessage(event);
    });
  }

  async handleInstall() {
    try {
      const cache = await caches.open(this.cacheName);
      const urlsToCache = this.config?.urlsToCache || [];
      
      await cache.addAll(urlsToCache);
      this.log(`Cached ${urlsToCache.length} resources`);
      
      this.postMessage({ type: 'SW_CACHED', count: urlsToCache.length });
    } catch (error) {
      this.log('Install failed', error);
      this.postMessage({ type: 'SW_ERROR', error: error.message });
    }
  }

  async handleActivate() {
    try {
      const cacheNames = await caches.keys();
      const deletePromises = cacheNames
        .filter(name => name !== this.cacheName)
        .map(name => {
          this.log(`Deleting old cache: ${name}`);
          return caches.delete(name);
        });

      await Promise.all(deletePromises);
      this.log('Old caches cleaned up');
      this.postMessage({ type: 'SW_ACTIVATED' });
    } catch (error) {
      this.log('Activation failed', error);
      this.postMessage({ type: 'SW_ERROR', error: error.message });
    }
  }

  async handleFetch(request) {
    // Skip non-GET requests
    if (request.method !== 'GET') {
      return fetch(request);
    }

    // Skip chrome-extension and other non-http requests
    if (!request.url.startsWith('http')) {
      return fetch(request);
    }

    try {
      const cache = await caches.open(this.cacheName);
      const strategy = this.findStrategy(request);

      if (strategy) {
        this.log(`Using strategy: ${strategy.name} for ${request.url}`);
        return await strategy.execute(request, cache);
      }

      // Default fallback strategy
      return await this.defaultFetch(request, cache);
    } catch (error) {
      this.log('Fetch failed', error);
      return new Response('Offline', { 
        status: 503, 
        statusText: 'Service Unavailable' 
      });
    }
  }

  findStrategy(request) {
    return this.strategies.find(strategy => strategy.matches(request));
  }

  async defaultFetch(request, cache) {
    // Try network first, fallback to cache
    try {
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  }

  handleMessage(event) {
    const { type, data } = event.data || {};

    switch (type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        this.log('Skip waiting requested');
        break;
      case 'GET_VERSION':
        event.ports[0]?.postMessage({ 
          type: 'VERSION_RESPONSE', 
          version: this.config?.version || 'unknown' 
        });
        break;
      default:
        this.log('Unknown message type:', type);
    }
  }

  postMessage(message) {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage(message);
      });
    });
  }

  log(message, ...args) {
    if (this.enableLogging) {
      console.log(`[SOL PWA SW] ${message}`, ...args);
    }
  }

  getDefaultConfig() {
    return {
      cacheName: 'sol-pwa',
      version: 'v13',
      urlsToCache: [
        '/',
        '/index.html',
        '/manifest.webmanifest',
        '/favicon.ico'
      ],
      cacheStrategies: [
        {
          name: 'static-assets',
          pattern: '\\.(js|css|png|jpg|jpeg|svg|ico|woff|woff2)$',
          strategy: 'cache-first',
          maxAge: 86400000,
          maxEntries: 100
        }
      ],
      enableLogging: true
    };
  }
}

// Initialize Service Worker Manager
const swManager = new ServiceWorkerManager();
swManager.init();
