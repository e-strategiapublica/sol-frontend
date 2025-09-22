# PWA - Sistema Online de Licitação (SOL)

## 📱 Visão Geral

O Sistema Online de Licitação foi refatorado para implementar uma arquitetura PWA (Progressive Web App) completa, oferecendo funcionalidade offline, instalação nativa e performance otimizada.

## 📚 Documentação Disponível

### 1. [Arquitetura PWA](./PWA_ARCHITECTURE.md)
Documentação técnica completa da arquitetura PWA implementada:
- Estrutura de arquivos e organização
- Componentes principais e responsabilidades
- Fluxo de inicialização e estados
- Service Worker modular com estratégias de cache
- Integração com Angular e RxJS

### 2. [Guia de Configuração do Service Worker](./SERVICE_WORKER_CONFIG_GUIDE.md)
Manual detalhado para configuração do Service Worker:
- Arquivo de configuração JSON
- Estratégias de cache disponíveis
- Padrões de URL e matching
- Configurações recomendadas
- Troubleshooting e debugging

### 3. [API de Componentes e Serviços](./PWA_COMPONENTS_SERVICES_API.md)
Referência completa da API dos serviços e componentes PWA:
- PwaManagerService - Orquestrador central
- ServiceWorkerService - Gerenciamento do SW
- PwaInstallService - Prompts de instalação
- PwaInstallBannerComponent - UI de instalação
- Interfaces TypeScript e exemplos de uso

## 🚀 Início Rápido

### Instalação e Configuração

1. **Verificar Dependências**
   ```bash
   npm install
   ```

2. **Configurar Service Worker**
   - Editar `src/assets/pwa/sw-config.json`
   - Ajustar estratégias de cache conforme necessário

3. **Build para Produção**
   ```bash
   ng build --prod
   ```

4. **Servir com HTTPS**
   ```bash
   # PWA requer HTTPS em produção
   ng serve --ssl
   ```

### Uso Básico

```typescript
// app.component.ts
import { PwaManagerService } from './core/pwa/services/pwa-manager.service';

export class AppComponent implements OnInit {
  constructor(private pwaManager: PwaManagerService) {}

  async ngOnInit() {
    await this.pwaManager.initialize();
  }
}
```

```html
<!-- app.component.html -->
<app-pwa-install-banner></app-pwa-install-banner>
<router-outlet></router-outlet>
```

## 🏗️ Arquitetura

### Estrutura de Pastas
```
src/
├── app/core/pwa/           # Módulo PWA
│   ├── components/         # Componentes UI
│   ├── services/          # Serviços PWA
│   ├── models/            # Interfaces TypeScript
│   └── pwa.module.ts      # Módulo principal
├── assets/pwa/            # Configurações PWA
└── sw/                    # Service Worker modular
```

### Serviços Principais

- **PwaManagerService**: Orquestrador central
- **ServiceWorkerService**: Gerenciamento do Service Worker
- **PwaInstallService**: Prompts de instalação

### Estratégias de Cache

- **Cache First**: Assets estáticos
- **Network First**: APIs dinâmicas
- **Stale While Revalidate**: Conteúdo híbrido
- **Network Only**: Dados sensíveis
- **Cache Only**: Recursos offline

## 📱 Funcionalidades PWA

### ✅ Implementado

- 🔄 **Service Worker Modular**: Estratégias de cache configuráveis
- 📱 **Instalação Nativa**: Suporte Android, iOS e Desktop
- 🌐 **Funcionamento Offline**: Cache inteligente de recursos
- 🔔 **Notificações**: Sistema de eventos reativos
- ⚡ **Performance**: Carregamento otimizado
- 🛡️ **Type Safety**: Interfaces TypeScript completas
- 🎨 **UI Responsiva**: Banner de instalação adaptativo
- 🌍 **Internacionalização**: Suporte a múltiplos idiomas

### 🔄 Próximas Funcionalidades

- 📬 **Push Notifications**: Notificações push
- 🔄 **Background Sync**: Sincronização em background
- 📊 **Analytics**: Métricas de uso PWA
- 🧪 **Testes Automatizados**: Testes unitários e e2e

## 🔧 Configuração

### Manifest PWA
```json
{
  "name": "Sistema Online de Licitação",
  "short_name": "SOL",
  "theme_color": "#1976d2",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/",
  "icons": [...]
}
```

### Service Worker Config
```json
{
  "cacheName": "sol-pwa",
  "version": "v13",
  "cacheStrategies": [
    {
      "name": "static-assets",
      "pattern": "\\.(js|css|png|jpg|jpeg|svg|ico)$",
      "strategy": "cache-first"
    }
  ]
}
```

## 🧪 Testes

### Testar PWA Localmente

1. **Build de Produção**
   ```bash
   ng build --prod
   ```

2. **Servir com HTTPS**
   ```bash
   npx http-server dist/ --ssl -p 4200
   ```

3. **Verificar no Chrome DevTools**
   - Application → Service Workers
   - Application → Cache Storage
   - Lighthouse → PWA Audit

### Testar Instalação

- **Android**: Chrome → Menu → "Instalar app"
- **iOS**: Safari → Compartilhar → "Adicionar à Tela Inicial"
- **Desktop**: Chrome → Barra de endereço → Ícone de instalação

## 🐛 Troubleshooting

### Problemas Comuns

**Service Worker não registra:**
```javascript
// Verificar no console
navigator.serviceWorker.getRegistration()
  .then(reg => console.log('SW:', reg));
```

**Cache não funciona:**
- Verificar padrões de URL no `sw-config.json`
- Confirmar HTTPS em produção
- Limpar cache no DevTools

**Instalação não aparece:**
- Verificar manifest.json
- Confirmar critérios PWA no Lighthouse
- Testar em dispositivo real

### Logs de Debug

```javascript
// Habilitar logs detalhados
localStorage.setItem('pwa-debug', 'true');

// Verificar caches
caches.keys().then(names => console.log('Caches:', names));
```

## 📈 Performance

### Métricas PWA

- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 4s
- **Time to Interactive**: < 5s
- **Cache Hit Rate**: > 80%

### Otimizações Implementadas

- Lazy loading de módulos PWA
- Compressão de Service Worker
- Cache estratégico por tipo de recurso
- Preload de recursos críticos

## 🔒 Segurança

### Considerações de Segurança

- HTTPS obrigatório em produção
- Validação de origem do Service Worker
- Cache apenas de recursos confiáveis
- Sanitização de dados em cache

## 📞 Suporte

### Compatibilidade

| Navegador | Versão Mínima | Suporte |
|-----------|---------------|---------|
| Chrome | 67+ | ✅ Completo |
| Firefox | 60+ | ✅ Completo |
| Safari | 11.1+ | ⚠️ Parcial |
| Edge | 79+ | ✅ Completo |

### Contato

Para dúvidas sobre a implementação PWA:
- Consulte a documentação técnica
- Verifique logs no console do navegador
- Teste em diferentes dispositivos e navegadores

---

**Versão da Documentação:** 1.0  
**Última Atualização:** 16/09/2025  
**Versão PWA:** v13
