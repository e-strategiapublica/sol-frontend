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
    // Listen for beforeinstallprompt
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

  private updateInstallState(newState: Partial<InstallPromptState>): void {
    const currentState = this.installStateSubject.value;
    this.installStateSubject.next({ ...currentState, ...newState });
  }

  private emitEvent(event: PwaInstallEvent): void {
    this.installEventsSubject.next(event);
  }
}
