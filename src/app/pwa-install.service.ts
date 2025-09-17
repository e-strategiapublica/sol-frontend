import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PwaInstallService {
  private deferredPrompt: any;

  constructor() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      this.deferredPrompt = e;
      console.log('PWA: beforeinstallprompt event fired');
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA: App was installed');
      this.deferredPrompt = null;
    });
  }

  canInstall(): boolean {
    return !!this.deferredPrompt;
  }

  async install(): Promise<void> {
    // Try to use the stored prompt first
    let promptEvent = this.deferredPrompt || (window as any).deferredPrompt;
    
    if (!promptEvent) {
      console.log('PWA: No install prompt available');
      return;
    }

    try {
      // Show the install prompt
      promptEvent.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await promptEvent.userChoice;
      
      console.log(`PWA: User response to the install prompt: ${outcome}`);
      
      // Clear the deferredPrompt
      this.deferredPrompt = null;
      (window as any).deferredPrompt = null;
    } catch (error) {
      console.error('PWA: Error during installation:', error);
    }
  }
}
