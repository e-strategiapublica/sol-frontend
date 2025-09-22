import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, interval } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { ServiceWorkerState, PwaConfig } from '../models/pwa-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {
  private readonly swStateSubject = new BehaviorSubject<ServiceWorkerState>({
    isSupported: 'serviceWorker' in navigator,
    isRegistered: false,
    isControlling: false,
    hasUpdate: false
  });

  public readonly swState$: Observable<ServiceWorkerState> = this.swStateSubject.asObservable();
  private registration: ServiceWorkerRegistration | null = null;

  constructor() {
    if (this.isSupported) {
      this.initializeServiceWorker();
    }
  }

  public get isSupported(): boolean {
    return this.swStateSubject.value.isSupported;
  }

  public get isRegistered(): boolean {
    return this.swStateSubject.value.isRegistered;
  }

  public get isControlling(): boolean {
    return this.swStateSubject.value.isControlling;
  }

  public async register(scriptUrl: string = '/sw.js'): Promise<ServiceWorkerRegistration | null> {
    if (!this.isSupported) {
      console.warn('Service Worker not supported');
      return null;
    }

    try {
      this.registration = await navigator.serviceWorker.register(scriptUrl);
      
      this.updateState({
        isRegistered: true,
        isControlling: !!navigator.serviceWorker.controller
      });

      this.setupEventListeners();
      this.checkForUpdates();

      console.log('SOL PWA: Service Worker registered successfully:', this.registration.scope);
      return this.registration;
    } catch (error) {
      console.error('SOL PWA: Service Worker registration failed:', error);
      return null;
    }
  }

  public async unregister(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      const result = await this.registration.unregister();
      if (result) {
        this.updateState({
          isRegistered: false,
          isControlling: false,
          hasUpdate: false
        });
        this.registration = null;
      }
      return result;
    } catch (error) {
      console.error('SOL PWA: Service Worker unregistration failed:', error);
      return false;
    }
  }

  public async update(): Promise<void> {
    if (!this.registration) {
      return;
    }

    try {
      await this.registration.update();
      console.log('SOL PWA: Service Worker update check completed');
    } catch (error) {
      console.error('SOL PWA: Service Worker update failed:', error);
    }
  }

  public async skipWaiting(): Promise<void> {
    if (!this.registration?.waiting) {
      return;
    }

    // Send message to waiting service worker to skip waiting
    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }

  public async getConfig(): Promise<PwaConfig | null> {
    try {
      const response = await fetch('/assets/pwa/sw-config.json');
      return await response.json();
    } catch (error) {
      console.error('SOL PWA: Failed to load SW config:', error);
      return null;
    }
  }

  private initializeServiceWorker(): void {
    // Check if already controlling
    if (navigator.serviceWorker.controller) {
      this.updateState({ isControlling: true });
    }

    // Listen for controller changes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      this.updateState({ isControlling: true });
      console.log('SOL PWA: Service Worker controller changed');
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
      this.handleServiceWorkerMessage(event.data);
    });
  }

  private setupEventListeners(): void {
    if (!navigator.serviceWorker) return;

    // Listen for updates
    this.registration.addEventListener('updatefound', () => {
      console.log('SOL PWA: Service Worker update found');
      this.updateState({ hasUpdate: true });

      const newWorker = this.registration!.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('SOL PWA: New service worker installed, ready to activate');
          }
        });
      }
    });

    // Listen for messages from service worker
    fromEvent(navigator.serviceWorker, 'message')
      .pipe(
        map((event: any) => event.data),
        filter(data => data && data.type)
      )
      .subscribe((data) => {
        this.handleServiceWorkerMessage(data);
      });
  }

  private handleServiceWorkerMessage(data: any): void {
    switch (data.type) {
      case 'SW_ACTIVATED':
        console.log('SOL PWA: Service Worker activated');
        this.updateState({ hasUpdate: false });
        break;
      case 'SW_CACHED':
        console.log('SOL PWA: Resources cached successfully');
        break;
      case 'SW_ERROR':
        console.error('SOL PWA: Service Worker error:', data.error);
        break;
      default:
        console.log('SOL PWA: Unknown message from SW:', data);
    }
  }

  private checkForUpdates(): void {
    // Check for updates every minute
    interval(60000)
      .pipe(
        switchMap(() => this.update()),
        catchError((error): any[] => {
          console.error('SOL PWA: Update check failed:', error);
          return [];
        })
      )
      .subscribe();
  }

  private updateState(newState: Partial<ServiceWorkerState>): void {
    const currentState = this.swStateSubject.value;
    this.swStateSubject.next({ ...currentState, ...newState });
  }
}
