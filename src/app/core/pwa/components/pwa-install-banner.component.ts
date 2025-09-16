import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PwaManagerService, PwaManagerState } from '../services/pwa-manager.service';
import { PwaInstallEvent } from '../models/pwa-config.interface';

@Component({
  selector: 'app-pwa-install-banner',
  template: `
    <div 
      *ngIf="(state$ | async)?.install.canInstall && showBanner" 
      class="pwa-install-banner"
      [class.pwa-banner-visible]="showBanner">
      
      <div class="pwa-banner-content">
        <div class="pwa-banner-icon">
          <i class="fa fa-download" aria-hidden="true"></i>
        </div>
        
        <div class="pwa-banner-text">
          <h4>{{ 'PWA.INSTALL_TITLE' | translate }}</h4>
          <p>{{ 'PWA.INSTALL_MESSAGE' | translate }}</p>
        </div>
        
        <div class="pwa-banner-actions">
          <button 
            type="button" 
            class="btn btn-primary btn-sm"
            (click)="installApp()"
            [disabled]="isInstalling">
            <i class="fa fa-plus" *ngIf="!isInstalling"></i>
            <i class="fa fa-spinner fa-spin" *ngIf="isInstalling"></i>
            {{ (isInstalling ? 'PWA.INSTALLING' : 'PWA.INSTALL') | translate }}
          </button>
          
          <button 
            type="button" 
            class="btn btn-outline-secondary btn-sm"
            (click)="dismissBanner()">
            {{ 'PWA.DISMISS' | translate }}
          </button>
        </div>
      </div>
      
      <button 
        type="button" 
        class="pwa-banner-close"
        (click)="dismissBanner()"
        aria-label="Close">
        <i class="fa fa-times"></i>
      </button>
    </div>
  `,
  styles: [`
    .pwa-install-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #1976d2, #1565c0);
      color: white;
      padding: 16px;
      box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(100%);
      transition: transform 0.3s ease-in-out;
      z-index: 1000;
    }

    .pwa-banner-visible {
      transform: translateY(0);
    }

    .pwa-banner-content {
      display: flex;
      align-items: center;
      gap: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .pwa-banner-icon {
      font-size: 24px;
      opacity: 0.9;
    }

    .pwa-banner-text {
      flex: 1;
    }

    .pwa-banner-text h4 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .pwa-banner-text p {
      margin: 0;
      font-size: 14px;
      opacity: 0.9;
    }

    .pwa-banner-actions {
      display: flex;
      gap: 8px;
    }

    .pwa-banner-close {
      position: absolute;
      top: 8px;
      right: 8px;
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .pwa-banner-close:hover {
      opacity: 1;
    }

    @media (max-width: 768px) {
      .pwa-banner-content {
        flex-direction: column;
        text-align: center;
        gap: 12px;
      }

      .pwa-banner-text h4 {
        font-size: 14px;
      }

      .pwa-banner-text p {
        font-size: 12px;
      }

      .pwa-banner-actions {
        justify-content: center;
      }
    }
  `]
})
export class PwaInstallBannerComponent implements OnInit, OnDestroy {
  public state$: Observable<PwaManagerState>;
  public showBanner = false;
  public isInstalling = false;
  
  private destroy$ = new Subject<void>();
  private dismissedKey = 'pwa-banner-dismissed';

  constructor(private pwaManager: PwaManagerService) {
    this.state$ = this.pwaManager.state$;
  }

  ngOnInit(): void {
    // Check if banner was previously dismissed
    const dismissed = localStorage.getItem(this.dismissedKey);
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      
      // Show again after 7 days
      if (daysSinceDismissed < 7) {
        return;
      }
    }

    // Listen for install state changes
    this.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        if (state.install.canInstall && !state.install.isInstalled) {
          setTimeout(() => {
            this.showBanner = true;
          }, 2000); // Show after 2 seconds
        } else {
          this.showBanner = false;
        }
      });

    // Listen for install events
    this.pwaManager.installEvents$
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event.type === 'appinstalled') {
          this.showBanner = false;
          this.isInstalling = false;
        } else if (event.type === 'error') {
          this.isInstalling = false;
          console.error('PWA Install Error:', event.data);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async installApp(): Promise<void> {
    this.isInstalling = true;
    
    try {
      const result = await this.pwaManager.installApp();
      
      if (result?.outcome === 'accepted') {
        this.showBanner = false;
      }
    } catch (error) {
      console.error('PWA Installation failed:', error);
    } finally {
      this.isInstalling = false;
    }
  }

  public dismissBanner(): void {
    this.showBanner = false;
    localStorage.setItem(this.dismissedKey, new Date().toISOString());
  }
}
