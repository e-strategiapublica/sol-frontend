import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, merge } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { InstallPromptState, PwaInstallEvent } from '../models/pwa-config.interface';

@Injectable({
  providedIn: 'root'
})
export class PwaInstallService {
  private readonly installStateSubject = new BehaviorSubject<InstallPromptState>({
    canInstall: false,
    isInstalled: false,
    deferredPrompt: null
  });

  private readonly installEventsSubject = new BehaviorSubject<PwaInstallEvent | null>(null);

  public readonly installState$: Observable<InstallPromptState> = this.installStateSubject.asObservable();
  public readonly installEvents$: Observable<PwaInstallEvent> = this.installEventsSubject.asObservable()
    .pipe(filter(event => event !== null)) as Observable<PwaInstallEvent>;

  constructor() {
    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    // Listen for beforeinstallprompt (Chrome, Edge)
    fromEvent(window, 'beforeinstallprompt')
      .pipe(
        tap((event: Event) => {
          event.preventDefault();
          this.updateInstallState({
            canInstall: true,
            isInstalled: false,
            deferredPrompt: event
          });
          this.emitEvent({ type: 'beforeinstallprompt', data: event });
        })
      )
      .subscribe();

    // Listen for appinstalled
    fromEvent(window, 'appinstalled')
      .pipe(
        tap(() => {
          this.updateInstallState({
            canInstall: false,
            isInstalled: true,
            deferredPrompt: null
          });
          this.emitEvent({ type: 'appinstalled' });
        })
      )
      .subscribe();

    // Listen for custom pwa-installable event
    fromEvent(window, 'pwa-installable')
      .pipe(
        tap(() => {
          const currentState = this.installStateSubject.value;
          if (!currentState.canInstall) {
            this.updateInstallState({
              ...currentState,
              canInstall: true
            });
          }
        })
      )
      .subscribe();

    // Firefox/Safari fallback - check after page load
    this.checkFirefoxInstallability();
  }

  public get canInstall(): boolean {
    return this.installStateSubject.value.canInstall;
  }

  public get isInstalled(): boolean {
    return this.installStateSubject.value.isInstalled;
  }

  public async install(): Promise<{ outcome: string } | null> {
    const currentState = this.installStateSubject.value;
    const promptEvent = currentState.deferredPrompt || (window as any).deferredPrompt;
    
    if (!promptEvent) {
      // Check if it's Firefox and show instructions
      if (this.isFirefox()) {
        this.showFirefoxInstallInstructions();
        return { outcome: 'accepted' }; // Return success to hide banner
      }
      
      this.emitEvent({ 
        type: 'error', 
        data: { message: 'No install prompt available' } 
      });
      return null;
    }

    try {
      // Show the install prompt
      await promptEvent.prompt();

      // Wait for the user to respond to the prompt
      const result = await promptEvent.userChoice;
      
      // Clear the deferredPrompt
      this.updateInstallState({
        canInstall: false,
        isInstalled: result.outcome === 'accepted',
        deferredPrompt: null
      });

      (window as any).deferredPrompt = null;
      
      return result;
    } catch (error) {
      this.emitEvent({ 
        type: 'error', 
        data: { message: 'Error during installation', error } 
      });
      return null;
    }
  }

  public checkInstallability(): void {
    // Force check for deferred prompt
    setTimeout(() => {
      if ((window as any).deferredPrompt && !this.canInstall) {
        this.updateInstallState({
          canInstall: true,
          isInstalled: false,
          deferredPrompt: (window as any).deferredPrompt
        });
      }
    }, 1000);
  }

  private checkFirefoxInstallability(): void {
    // Wait for page to fully load
    setTimeout(() => {
      if (this.isFirefox() && !this.canInstall && !this.isInstalled) {
        // Simplified check for Firefox - just check basic requirements
        const hasServiceWorker = 'serviceWorker' in navigator;
        const hasManifest = !!document.querySelector('link[rel="manifest"]');
        const isSecure = location.protocol === 'https:' || 
                        location.hostname === 'localhost' || 
                        location.hostname === '127.0.0.1' ||
                        location.hostname.includes('192.168.') || // Local network
                        location.hostname.includes('10.0.') ||    // Local network
                        location.hostname.endsWith('.local');     // mDNS
        
        if (hasServiceWorker && hasManifest && isSecure) {
          this.updateInstallState({
            canInstall: true,
            isInstalled: false,
            deferredPrompt: null
          });
          this.emitEvent({ 
            type: 'beforeinstallprompt', 
            data: { browser: 'firefox' } 
          });
        }
      }
    }, 3000); // Wait 3 seconds for everything to load
  }

  private isFirefox(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    // Check for Firefox desktop and mobile (including Fenix/Firefox for Android)
    return userAgent.includes('firefox') || 
           userAgent.includes('fxios') || // Firefox iOS
           (userAgent.includes('mobile') && userAgent.includes('gecko')); // Firefox Android
  }

  private isPwaReady(): boolean {
    // Check if Service Worker is registered
    const hasServiceWorker = 'serviceWorker' in navigator;
    
    // Check if manifest is present
    const manifestLink = document.querySelector('link[rel="manifest"]');
    const hasManifest = !!manifestLink;
    
    // Check if running on HTTPS or localhost
    const isSecure = location.protocol === 'https:' || 
                    location.hostname === 'localhost' || 
                    location.hostname === '127.0.0.1';
    
    // Check if not already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone === true;
    
    return hasServiceWorker && hasManifest && isSecure && !isStandalone;
  }

  private updateInstallState(newState: Partial<InstallPromptState>): void {
    const currentState = this.installStateSubject.value;
    this.installStateSubject.next({ ...currentState, ...newState });
  }

  private emitEvent(event: PwaInstallEvent): void {
    this.installEventsSubject.next(event);
  }

  private showFirefoxInstallInstructions(): void {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone');
    
    let message;
    if (isMobile) {
      message = `Para instalar o SOL no Firefox Mobile:

1. Toque no menu (⋮) no canto superior direito
2. Toque em "Instalar" ou "Adicionar à tela inicial"
3. Confirme a instalação`;
    } else {
      message = `Para instalar o SOL no Firefox:

1. Clique no ícone de menu (☰) no canto superior direito
2. Procure por "Instalar" ou "Adicionar à tela inicial"
3. Confirme a instalação`;
    }

    alert(message);
  }

}
