# Documentação de Componentes e Serviços PWA - SOL

## Índice
- [Serviços PWA](#serviços-pwa)
- [Componentes PWA](#componentes-pwa)
- [Interfaces e Modelos](#interfaces-e-modelos)
- [Exemplos de Uso](#exemplos-de-uso)

---

## Serviços PWA

### PwaManagerService

**Localização:** `src/app/core/pwa/services/pwa-manager.service.ts`

Serviço principal que orquestra todos os outros serviços PWA.

#### API Pública

```typescript
class PwaManagerService {
  // Observables
  state$: Observable<PwaState>
  installEvents$: Observable<PwaInstallEvent>
  
  // Métodos
  initialize(): Promise<void>
  getState(): PwaState
  canInstall(): boolean
  install(): Promise<boolean>
}
```

#### Propriedades

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `state$` | `Observable<PwaState>` | Observable do estado global PWA |
| `installEvents$` | `Observable<PwaInstallEvent>` | Observable de eventos de instalação |

#### Métodos

##### `initialize(): Promise<void>`
Inicializa todos os serviços PWA.

```typescript
async ngOnInit() {
  await this.pwaManager.initialize();
}
```

##### `getState(): PwaState`
Retorna o estado atual do PWA.

```typescript
const currentState = this.pwaManager.getState();
console.log('PWA instalado:', currentState.isInstalled);
```

##### `canInstall(): boolean`
Verifica se o PWA pode ser instalado.

```typescript
if (this.pwaManager.canInstall()) {
  // Mostrar botão de instalação
}
```

##### `install(): Promise<boolean>`
Executa o processo de instalação do PWA.

```typescript
const installed = await this.pwaManager.install();
if (installed) {
  console.log('PWA instalado com sucesso!');
}
```

---

### ServiceWorkerService

**Localização:** `src/app/core/pwa/services/service-worker.service.ts`

Gerencia o ciclo de vida do Service Worker.

#### API Pública

```typescript
class ServiceWorkerService {
  // Observables
  state$: Observable<ServiceWorkerState>
  
  // Métodos
  register(): Promise<ServiceWorkerRegistration | null>
  update(): Promise<boolean>
  isRegistered(): boolean
  isInstalled(): boolean
  isControlling(): boolean
  hasUpdate(): boolean
  skipWaiting(): void
}
```

#### Estados Monitorados

```typescript
interface ServiceWorkerState {
  isRegistered: boolean;    // SW registrado
  isInstalled: boolean;     // SW instalado
  isControlling: boolean;   // SW controlando a página
  hasUpdate: boolean;       // Atualização disponível
  registration: ServiceWorkerRegistration | null;
}
```

#### Métodos

##### `register(): Promise<ServiceWorkerRegistration | null>`
Registra o Service Worker.

```typescript
const registration = await this.swService.register();
if (registration) {
  console.log('Service Worker registrado');
}
```

##### `update(): Promise<boolean>`
Força verificação de atualizações.

```typescript
const hasUpdate = await this.swService.update();
if (hasUpdate) {
  // Notificar usuário sobre atualização
}
```

##### `skipWaiting(): void`
Força ativação imediata de nova versão.

```typescript
this.swService.skipWaiting();
```

#### Exemplo de Uso Completo

```typescript
export class MyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private swService: ServiceWorkerService) {}

  ngOnInit() {
    // Monitorar estado do Service Worker
    this.swService.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        if (state.hasUpdate) {
          this.showUpdateNotification();
        }
      });
  }

  async updateApp() {
    this.swService.skipWaiting();
    window.location.reload();
  }
}
```

---

### PwaInstallService

**Localização:** `src/app/core/pwa/services/pwa-install.service.ts`

Gerencia prompts de instalação PWA.

#### API Pública

```typescript
class PwaInstallService {
  // Observables
  installPrompt$: Observable<BeforeInstallPromptEvent | null>
  canInstall$: Observable<boolean>
  installEvents$: Observable<PwaInstallEvent>
  
  // Métodos
  initialize(): void
  canInstall(): boolean
  install(): Promise<boolean>
  getPlatform(): PwaPlatform
}
```

#### Eventos de Instalação

```typescript
interface PwaInstallEvent {
  type: 'prompt-available' | 'installed' | 'dismissed' | 'error';
  platform: PwaPlatform;
  timestamp: Date;
  data?: any;
}
```

#### Plataformas Suportadas

```typescript
type PwaPlatform = 'android' | 'ios' | 'desktop' | 'unknown';
```

#### Métodos

##### `initialize(): void`
Inicializa detecção de eventos de instalação.

```typescript
ngOnInit() {
  this.installService.initialize();
}
```

##### `canInstall(): boolean`
Verifica se instalação está disponível.

```typescript
get showInstallButton(): boolean {
  return this.installService.canInstall();
}
```

##### `install(): Promise<boolean>`
Executa instalação do PWA.

```typescript
async installPwa() {
  const success = await this.installService.install();
  if (success) {
    this.hideInstallButton();
  }
}
```

##### `getPlatform(): PwaPlatform`
Detecta plataforma atual.

```typescript
const platform = this.installService.getPlatform();
switch (platform) {
  case 'ios':
    this.showIosInstructions();
    break;
  case 'android':
    this.showAndroidPrompt();
    break;
}
```

#### Exemplo de Uso Completo

```typescript
export class InstallComponent implements OnInit {
  canInstall$ = this.installService.canInstall$;
  platform = this.installService.getPlatform();

  constructor(private installService: PwaInstallService) {}

  ngOnInit() {
    this.installService.initialize();
    
    // Monitorar eventos de instalação
    this.installService.installEvents$
      .subscribe(event => {
        switch (event.type) {
          case 'prompt-available':
            this.showInstallButton = true;
            break;
          case 'installed':
            this.onInstallSuccess();
            break;
        }
      });
  }

  async install() {
    const success = await this.installService.install();
    if (!success && this.platform === 'ios') {
      this.showIosInstructions();
    }
  }
}
```

---

## Componentes PWA

### PwaInstallBannerComponent

**Localização:** `src/app/core/pwa/components/pwa-install-banner.component.ts`

Componente UI para banner de instalação PWA.

#### Seletor
```html
<app-pwa-install-banner></app-pwa-install-banner>
```

#### Propriedades de Entrada

```typescript
@Input() showCloseButton: boolean = true;
@Input() customMessage?: string;
@Input() autoHide: boolean = true;
@Input() hideDelay: number = 10000; // 10 segundos
```

#### Eventos de Saída

```typescript
@Output() installClicked = new EventEmitter<void>();
@Output() dismissed = new EventEmitter<void>();
@Output() closed = new EventEmitter<void>();
```

#### Template Básico

```html
<div class="pwa-install-banner" 
     *ngIf="showBanner$ | async"
     [class.ios-platform]="platform === 'ios'">
  
  <div class="banner-content">
    <div class="banner-icon">📱</div>
    <div class="banner-text">
      <h4>{{ 'PWA.INSTALL_TITLE' | translate }}</h4>
      <p>{{ customMessage || ('PWA.INSTALL_MESSAGE' | translate) }}</p>
    </div>
  </div>

  <div class="banner-actions">
    <button class="install-btn" 
            (click)="install()"
            [disabled]="installing">
      {{ 'PWA.INSTALL_BUTTON' | translate }}
    </button>
    
    <button class="close-btn" 
            *ngIf="showCloseButton"
            (click)="dismiss()">
      ✕
    </button>
  </div>
</div>
```

#### Uso Personalizado

```html
<!-- Uso básico -->
<app-pwa-install-banner></app-pwa-install-banner>

<!-- Uso personalizado -->
<app-pwa-install-banner
  [showCloseButton]="false"
  [autoHide]="false"
  customMessage="Instale o SOL para acesso offline!"
  (installClicked)="onInstallClicked()"
  (dismissed)="onBannerDismissed()">
</app-pwa-install-banner>
```

#### Estilos CSS

```scss
.pwa-install-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #1976d2, #1565c0);
  color: white;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);

  &.ios-platform {
    background: linear-gradient(135deg, #007aff, #0056cc);
  }

  .banner-content {
    display: flex;
    align-items: center;
    gap: 12px;

    .banner-icon {
      font-size: 24px;
    }

    .banner-text {
      h4 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      p {
        margin: 4px 0 0 0;
        font-size: 14px;
        opacity: 0.9;
      }
    }
  }

  .banner-actions {
    display: flex;
    gap: 8px;

    .install-btn {
      background: white;
      color: #1976d2;
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.05);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    .close-btn {
      background: transparent;
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
      padding: 6px 10px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}

// Responsivo
@media (max-width: 768px) {
  .pwa-install-banner {
    flex-direction: column;
    gap: 12px;
    text-align: center;

    .banner-actions {
      justify-content: center;
    }
  }
}
```

---

## Interfaces e Modelos

### PwaConfig Interface

**Localização:** `src/app/core/pwa/models/pwa-config.interface.ts`

```typescript
export interface PwaConfig {
  cacheName: string;
  version: string;
  enableLogging: boolean;
  urlsToCache: string[];
  cacheStrategies: CacheStrategyConfig[];
}

export interface CacheStrategyConfig {
  name: string;
  pattern: string | RegExp;
  strategy: CacheStrategyType;
  maxAge?: number;
  maxEntries?: number;
}

export type CacheStrategyType = 
  | 'cache-first'
  | 'network-first' 
  | 'stale-while-revalidate'
  | 'network-only'
  | 'cache-only';

export interface PwaState {
  isSupported: boolean;
  isInstalled: boolean;
  canInstall: boolean;
  serviceWorker: ServiceWorkerState;
  lastUpdated: Date;
}

export interface ServiceWorkerState {
  isRegistered: boolean;
  isInstalled: boolean;
  isControlling: boolean;
  hasUpdate: boolean;
  registration: ServiceWorkerRegistration | null;
}

export interface PwaInstallEvent {
  type: 'prompt-available' | 'installed' | 'dismissed' | 'error';
  platform: PwaPlatform;
  timestamp: Date;
  data?: any;
}

export type PwaPlatform = 'android' | 'ios' | 'desktop' | 'unknown';

export interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
```

---

## Exemplos de Uso

### Integração Completa no App Component

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PwaManagerService } from './core/pwa/services/pwa-manager.service';

@Component({
  selector: 'app-root',
  template: `
    <ngx-spinner></ngx-spinner>
    <app-pwa-install-banner></app-pwa-install-banner>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private pwaManager: PwaManagerService) {}

  async ngOnInit() {
    try {
      await this.pwaManager.initialize();
      
      // Monitorar estado PWA
      this.pwaManager.state$
        .pipe(takeUntil(this.destroy$))
        .subscribe(state => {
          console.log('PWA State:', state);
        });

      // Monitorar eventos de instalação
      this.pwaManager.installEvents$
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          this.handleInstallEvent(event);
        });

    } catch (error) {
      console.error('Falha ao inicializar PWA:', error);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleInstallEvent(event: PwaInstallEvent) {
    switch (event.type) {
      case 'installed':
        this.showSuccessMessage('PWA instalado com sucesso!');
        break;
      case 'error':
        this.showErrorMessage('Erro na instalação do PWA');
        break;
    }
  }
}
```

### Componente de Configurações PWA

```typescript
@Component({
  selector: 'app-pwa-settings',
  template: `
    <div class="pwa-settings">
      <h3>Configurações PWA</h3>
      
      <div class="setting-item">
        <label>Status do Service Worker:</label>
        <span [class]="swState.isControlling ? 'active' : 'inactive'">
          {{ swState.isControlling ? 'Ativo' : 'Inativo' }}
        </span>
      </div>

      <div class="setting-item" *ngIf="swState.hasUpdate">
        <label>Atualização disponível:</label>
        <button (click)="updateApp()">Atualizar Agora</button>
      </div>

      <div class="setting-item">
        <label>PWA Instalado:</label>
        <span>{{ pwaState.isInstalled ? 'Sim' : 'Não' }}</span>
      </div>

      <div class="setting-item" *ngIf="!pwaState.isInstalled && pwaState.canInstall">
        <button (click)="installPwa()">Instalar PWA</button>
      </div>
    </div>
  `
})
export class PwaSettingsComponent implements OnInit {
  pwaState: PwaState;
  swState: ServiceWorkerState;

  constructor(
    private pwaManager: PwaManagerService,
    private swService: ServiceWorkerService
  ) {}

  ngOnInit() {
    this.pwaState = this.pwaManager.getState();
    
    this.swService.state$.subscribe(state => {
      this.swState = state;
    });
  }

  async installPwa() {
    const success = await this.pwaManager.install();
    if (success) {
      this.pwaState = this.pwaManager.getState();
    }
  }

  updateApp() {
    this.swService.skipWaiting();
    setTimeout(() => window.location.reload(), 1000);
  }
}
```

### Service de Notificações PWA

```typescript
@Injectable({
  providedIn: 'root'
})
export class PwaNotificationService {
  constructor(
    private pwaManager: PwaManagerService,
    private toastr: ToastrService
  ) {
    this.setupNotifications();
  }

  private setupNotifications() {
    this.pwaManager.installEvents$.subscribe(event => {
      switch (event.type) {
        case 'prompt-available':
          this.toastr.info(
            'Clique no banner para instalar o app',
            'PWA Disponível'
          );
          break;
          
        case 'installed':
          this.toastr.success(
            'Aplicativo instalado com sucesso!',
            'PWA Instalado'
          );
          break;
          
        case 'dismissed':
          this.toastr.warning(
            'Você pode instalar depois nas configurações',
            'Instalação Cancelada'
          );
          break;
      }
    });
  }
}
```

Esta documentação fornece uma referência completa para todos os componentes e serviços PWA implementados no sistema SOL.
