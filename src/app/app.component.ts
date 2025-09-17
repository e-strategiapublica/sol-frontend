import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PwaManagerService } from './core/pwa/services/pwa-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sol-app-frontend';
  private destroy$ = new Subject<void>();

  constructor(private pwaManager: PwaManagerService) {}

  ngOnInit(): void {
    // Initialize PWA services
    this.initializePwa();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async initializePwa(): Promise<void> {
    try {
      await this.pwaManager.initialize();
      console.log('SOL PWA: Manager initialized successfully');
      
      // Subscribe to PWA state changes
      this.pwaManager.state$
        .pipe(takeUntil(this.destroy$))
        .subscribe(state => {
          console.log('SOL PWA: State updated', state);
        });

      // Subscribe to install events
      this.pwaManager.installEvents$
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          console.log('SOL PWA: Install event', event);
        });

    } catch (error) {
      console.error('SOL PWA: Failed to initialize PWA manager', error);
    }
  }
}
