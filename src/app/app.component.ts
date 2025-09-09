import { Component, OnInit } from '@angular/core';
import { PwaInstallService } from './pwa-install.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sol-app-frontend';
  showInstallButton = false;

  constructor(private pwaInstallService: PwaInstallService) {}

  ngOnInit() {
    // Check if PWA can be installed
    setTimeout(() => {
      this.showInstallButton = this.pwaInstallService.canInstall();
    }, 1000);

    // Listen for install prompt events
    window.addEventListener('beforeinstallprompt', () => {
      this.showInstallButton = true;
    });

    // Listen for custom pwa-installable event
    window.addEventListener('pwa-installable', () => {
      this.showInstallButton = true;
    });

    // Force check after page load
    setTimeout(() => {
      if ((window as any).deferredPrompt) {
        this.showInstallButton = true;
      }
    }, 3000);
  }

  async installPwa() {
    await this.pwaInstallService.install();
    this.showInstallButton = false;
  }
}
