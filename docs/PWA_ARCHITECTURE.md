# Arquitetura PWA - Sistema SOL

## Visão Geral

O Sistema Online de Licitação (SOL) foi refatorado para implementar uma arquitetura PWA (Progressive Web App) modular e escalável. Esta documentação descreve a estrutura, componentes e fluxos da nova implementação.

## Estrutura de Arquivos

```
src/
├── app/
│   └── core/
│       └── pwa/
│           ├── components/
│           │   └── pwa-install-banner.component.ts
│           ├── models/
│           │   └── pwa-config.interface.ts
│           ├── services/
│           │   ├── pwa-manager.service.ts
│           │   ├── service-worker.service.ts
│           │   └── pwa-install.service.ts
│           └── pwa.module.ts
├── assets/
│   └── pwa/
│       └── sw-config.json
└── sw/
    ├── cache-strategies.js
    └── sw-main.js
```

## Componentes Principais

### 1. PwaManagerService
**Localização:** `src/app/core/pwa/services/pwa-manager.service.ts`

Orquestrador central que coordena todos os serviços PWA.

**Responsabilidades:**
- Inicialização de todos os serviços PWA
- Gerenciamento de estado global da aplicação PWA
- Coordenação entre Service Worker, Install Service e componentes UI
- Exposição de observables para monitoramento de estado

**Principais Métodos:**
```typescript
initialize(): Promise<void>
state$: Observable<PwaState>
installEvents$: Observable<PwaInstallEvent>
```

### 2. ServiceWorkerService
**Localização:** `src/app/core/pwa/services/service-worker.service.ts`

Gerencia o ciclo de vida do Service Worker com programação reativa.

**Responsabilidades:**
- Registro e controle do Service Worker
- Detecção de atualizações disponíveis
- Comunicação bidirecional com o Service Worker
- Monitoramento de estados (instalado, controlando, atualizações)

**Estados Monitorados:**
- `isRegistered`: Service Worker registrado
- `isInstalled`: Service Worker instalado
- `isControlling`: Service Worker controlando a página
- `hasUpdate`: Atualização disponível

### 3. PwaInstallService
**Localização:** `src/app/core/pwa/services/pwa-install.service.ts`

Gerencia prompts de instalação PWA de forma reativa.

**Responsabilidades:**
- Captura do evento `beforeinstallprompt`
- Detecção de capacidade de instalação
- Execução do processo de instalação
- Monitoramento de eventos de instalação

**Principais Funcionalidades:**
- Detecção automática de plataforma (Android, iOS, Desktop)
- Suporte a instalação manual para iOS
- Eventos reativos para mudanças de estado

### 4. PwaInstallBannerComponent
**Localização:** `src/app/core/pwa/components/pwa-install-banner.component.ts`

Componente UI reutilizável para exibir banner de instalação.

**Características:**
- Exibição condicional baseada em estado de instalação
- Suporte a internacionalização (i18n)
- Design responsivo para diferentes dispositivos
- Integração com PwaInstallService

## Service Worker Modular

### Arquitetura de Classes
O Service Worker foi refatorado usando classes para melhor organização:

```javascript
// Estratégias de Cache
class CacheStrategy
class CacheFirstStrategy extends CacheStrategy
class NetworkFirstStrategy extends CacheStrategy
class StaleWhileRevalidateStrategy extends CacheStrategy

// Gerenciador Principal
class ServiceWorkerManager
```

### Estratégias de Cache Disponíveis

1. **Cache First**: Prioriza cache, fallback para rede
2. **Network First**: Prioriza rede, fallback para cache
3. **Stale While Revalidate**: Serve cache imediatamente, atualiza em background
4. **Network Only**: Sempre busca da rede
5. **Cache Only**: Sempre serve do cache

### Configuração Dinâmica
O Service Worker carrega configurações de `sw-config.json`:

```json
{
  "cacheName": "sol-pwa",
  "version": "v13",
  "cacheStrategies": [
    {
      "name": "static-assets",
      "pattern": "\\.(js|css|png|jpg|jpeg|svg|ico|woff|woff2)$",
      "strategy": "cache-first",
      "maxAge": 86400000,
      "maxEntries": 100
    }
  ]
}
```

## Fluxo de Inicialização

```mermaid
graph TD
    A[App Component] --> B[PwaManagerService.initialize()]
    B --> C[ServiceWorkerService.register()]
    B --> D[PwaInstallService.initialize()]
    C --> E[Service Worker Registration]
    D --> F[Install Prompt Detection]
    E --> G[Cache Strategies Setup]
    F --> H[UI Banner Display]
```

## Estados e Observables

### PwaState Interface
```typescript
interface PwaState {
  isSupported: boolean;
  isInstalled: boolean;
  canInstall: boolean;
  serviceWorker: ServiceWorkerState;
  lastUpdated: Date;
}
```

### Fluxo de Dados Reativo
- Todos os serviços expõem observables RxJS
- Estado centralizado no PwaManagerService
- Componentes se inscrevem em mudanças de estado
- Atualizações automáticas da UI baseadas em estado

## Integração com Angular

### Module Structure
```typescript
@NgModule({
  declarations: [PwaInstallBannerComponent],
  imports: [CommonModule, TranslateModule],
  providers: [
    PwaManagerService,
    ServiceWorkerService,
    PwaInstallService
  ],
  exports: [PwaInstallBannerComponent]
})
export class PwaModule { }
```

### Uso no App Component
```typescript
export class AppComponent implements OnInit, OnDestroy {
  constructor(private pwaManager: PwaManagerService) {}

  async ngOnInit() {
    await this.pwaManager.initialize();
    
    this.pwaManager.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        // Reagir a mudanças de estado PWA
      });
  }
}
```

## Tratamento de Erros

### Estratégia de Error Handling
- Try-catch em todos os métodos async
- Logging estruturado com prefixo "SOL PWA:"
- Fallbacks graceful para funcionalidades não suportadas
- Observables de erro para componentes reagirem

### Compatibilidade
- Detecção de suporte a Service Worker
- Fallbacks para navegadores não compatíveis
- Tratamento específico para iOS Safari
- Suporte a diferentes versões do Chrome/Firefox

## Performance e Otimizações

### Cache Management
- Limpeza automática de caches antigos
- Controle de tamanho máximo de cache
- Estratégias otimizadas por tipo de recurso
- Background sync para atualizações

### Bundle Size
- Lazy loading do PWA module
- Tree shaking de funcionalidades não utilizadas
- Compressão de Service Worker
- Otimização de imports

## Monitoramento e Debug

### Logging
- Logs estruturados com níveis de severidade
- Controle de logging via configuração
- Informações de performance e timing
- Debug de estados de Service Worker

### DevTools Integration
- Suporte a Chrome DevTools
- Visualização de cache no Application tab
- Network throttling para testes offline
- Service Worker lifecycle debugging

## Próximos Passos

1. **Testes Automatizados**: Implementar testes unitários e e2e
2. **Push Notifications**: Adicionar suporte a notificações push
3. **Background Sync**: Implementar sincronização em background
4. **Analytics**: Adicionar métricas de uso PWA
5. **A2HS Metrics**: Monitorar taxa de instalação

## Referências

- [PWA Best Practices](https://web.dev/pwa/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Angular PWA Guide](https://angular.io/guide/service-worker-intro)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
