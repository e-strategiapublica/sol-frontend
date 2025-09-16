export interface PwaConfig {
  cacheName: string;
  version: string;
  urlsToCache: string[];
  cacheStrategies: CacheStrategy[];
  updateCheckInterval?: number;
  enableLogging?: boolean;
}

export interface CacheStrategy {
  name: string;
  pattern: RegExp | string;
  strategy: 'cache-first' | 'network-first' | 'stale-while-revalidate' | 'network-only' | 'cache-only';
  maxAge?: number;
  maxEntries?: number;
}

export interface PwaInstallEvent {
  type: 'beforeinstallprompt' | 'appinstalled' | 'error';
  data?: any;
}

export interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isControlling: boolean;
  hasUpdate: boolean;
}

export interface InstallPromptState {
  canInstall: boolean;
  isInstalled: boolean;
  deferredPrompt: any;
}
