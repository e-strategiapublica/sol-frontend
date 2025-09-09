import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SOL PWA: Service Worker registered successfully:', registration.scope);
        
        // Force update check
        registration.update();
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          console.log('SOL PWA: New service worker found');
        });
      })
      .catch((error) => {
        console.log('SOL PWA: Service Worker registration failed:', error);
      });
  });
  
  // Listen for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('SOL PWA: beforeinstallprompt event fired');
    e.preventDefault();
    
    // Store the event for later use
    (window as any).deferredPrompt = e;
    
    // Dispatch custom event to notify Angular
    window.dispatchEvent(new CustomEvent('pwa-installable'));
    
    // Force show install banner for ngrok domains
    if (window.location.hostname.includes('ngrok')) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('pwa-installable'));
      }, 2000);
    }
  });
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
