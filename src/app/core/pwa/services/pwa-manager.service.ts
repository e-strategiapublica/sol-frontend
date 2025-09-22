import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceWorkerService } from './service-worker.service';
import { PwaInstallService } from './pwa-install.service';
import { ServiceWorkerState, InstallPromptState, PwaInstallEvent } from '../models/pwa-config.interface';

export interface PwaManagerState {
  serviceWorker: ServiceWorkerState;
  install: InstallPromptState;
  isReady: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PwaManagerService {
  public readonly state$: Observable<PwaManagerState>;
  public readonly installEvents$: Observable<PwaInstallEvent>;

  constructor(
    private serviceWorkerService: ServiceWorkerService,
    private pwaInstallService: PwaInstallService
  ) {
    this.state$ = combineLatest([
      this.serviceWorkerService.swState$,
      this.pwaInstallService.installState$
    ]).pipe(
      map(([swState, installState]) => ({
        serviceWorker: swState,
        install: installState,
        isReady: swState.isSupported && swState.isRegistered
      }))
    );

    this.installEvents$ = this.pwaInstallService.installEvents$;
  }

  public async initialize(): Promise<void> {
    console.log('SOL PWA: Initializing PWA Manager...');
    
    // Register service worker
    await this.serviceWorkerService.register('/sw.js');
    
    // Check install availability
    this.pwaInstallService.checkInstallability();
    
    console.log('SOL PWA: PWA Manager initialized successfully');
  }

  public async installApp(): Promise<{ outcome: string } | null> {
    return await this.pwaInstallService.install();
  }

  public async updateApp(): Promise<void> {
    await this.serviceWorkerService.update();
  }

  public async skipWaiting(): Promise<void> {
    await this.serviceWorkerService.skipWaiting();
  }

  public get canInstall(): boolean {
    return this.pwaInstallService.canInstall;
  }

  public get isInstalled(): boolean {
    return this.pwaInstallService.isInstalled;
  }

  public get isServiceWorkerReady(): boolean {
    return this.serviceWorkerService.isRegistered;
  }

  public get isSupported(): boolean {
    return this.serviceWorkerService.isSupported;
  }
}
