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
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: linear-gradient(135deg, var(--color-first), var(--color-fourth));
      color: var(--color-white);
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0px 8px 16px rgba(33, 91, 133, 0.3);
      transform: translateY(calc(100% + 40px));
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-width: 500px;
      margin: 0 auto;
    }

    .pwa-banner-visible {
      transform: translateY(0);
    }

    .pwa-banner-content {
      display: flex;
      align-items: center;
      gap: 16px;
      position: relative;
    }

    .pwa-banner-icon {
      font-size: 28px;
      opacity: 0.95;
      color: var(--color-third);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      flex-shrink: 0;
    }

    .pwa-banner-text {
      flex: 1;
      min-width: 0;
    }

    .pwa-banner-text h4 {
      margin: 0 0 6px 0;
      font-size: 18px;
      font-weight: 600;
      font-family: 'Poppins', sans-serif;
      color: var(--color-white);
      line-height: 1.3;
    }

    .pwa-banner-text p {
      margin: 0;
      font-size: 14px;
      opacity: 0.9;
      font-family: 'Poppins', sans-serif;
      color: var(--color-white);
      line-height: 1.4;
    }

    .pwa-banner-actions {
      display: flex;
      gap: 10px;
      flex-shrink: 0;
    }

    .pwa-banner-actions .btn {
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 13px;
      padding: 8px 16px;
      border-radius: 6px;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: auto;
    }

    .pwa-banner-actions .btn-primary {
      background: var(--color-white);
      color: var(--color-first);
      box-shadow: 0 2px 8px rgba(255, 255, 255, 0.2);
    }

    .pwa-banner-actions .btn-primary:hover {
      background: var(--color-third);
      color: var(--color-first);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
    }

    .pwa-banner-actions .btn-outline-secondary {
      background: transparent;
      color: var(--color-white);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .pwa-banner-actions .btn-outline-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-1px);
    }

    .pwa-banner-close {
      position: absolute;
      top: -8px;
      right: -8px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: var(--color-white);
      font-size: 16px;
      cursor: pointer;
      opacity: 0.8;
      transition: all 0.3s ease;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
    }

    .pwa-banner-close:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      .pwa-install-banner {
        bottom: 10px;
        left: 10px;
        right: 10px;
        padding: 16px;
        border-radius: 10px;
      }

      .pwa-banner-content {
        flex-direction: column;
        text-align: center;
        gap: 14px;
      }

      .pwa-banner-icon {
        width: 40px;
        height: 40px;
        font-size: 24px;
      }

      .pwa-banner-text h4 {
        font-size: 16px;
      }

      .pwa-banner-text p {
        font-size: 13px;
      }

      .pwa-banner-actions {
        justify-content: center;
        gap: 8px;
      }

      .pwa-banner-actions .btn {
        font-size: 12px;
        padding: 7px 14px;
      }

      .pwa-banner-close {
        top: -6px;
        right: -6px;
        width: 24px;
        height: 24px;
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      .pwa-banner-actions {
        flex-direction: column;
        width: 100%;
      }

      .pwa-banner-actions .btn {
        width: 100%;
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
