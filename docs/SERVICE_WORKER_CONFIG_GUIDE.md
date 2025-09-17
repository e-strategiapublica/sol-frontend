# Guia de Configuração do Service Worker - SOL PWA

## Visão Geral

O Service Worker do SOL PWA utiliza um sistema de configuração baseado em JSON que permite personalizar estratégias de cache, recursos a serem cacheados e comportamentos específicos sem necessidade de alterar código.

## Arquivo de Configuração

**Localização:** `src/assets/pwa/sw-config.json`

### Estrutura Básica

```json
{
  "cacheName": "sol-pwa",
  "version": "v13",
  "enableLogging": true,
  "urlsToCache": [
    "/",
    "/index.html",
    "/manifest.webmanifest",
    "/favicon.ico"
  ],
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

## Propriedades de Configuração

### Configurações Globais

| Propriedade | Tipo | Descrição | Padrão |
|-------------|------|-----------|---------|
| `cacheName` | string | Nome base do cache | "sol-pwa" |
| `version` | string | Versão do cache (força invalidação) | "v13" |
| `enableLogging` | boolean | Habilita logs detalhados | true |

### URLs para Cache Inicial

```json
"urlsToCache": [
  "/",                    // Página principal
  "/index.html",          // HTML principal
  "/manifest.webmanifest", // Manifest PWA
  "/favicon.ico",         // Ícone
  "/assets/icons/icon-192x192.png"
]
```

**Dicas:**
- Inclua apenas recursos essenciais para funcionamento offline
- Evite URLs dinâmicas ou com parâmetros
- Teste se todos os recursos estão acessíveis

## Estratégias de Cache

### Configuração de Estratégia

```json
{
  "name": "nome-da-estrategia",
  "pattern": "regex-ou-string",
  "strategy": "tipo-da-estrategia",
  "maxAge": 86400000,
  "maxEntries": 100
}
```

### Propriedades da Estratégia

| Propriedade | Tipo | Descrição | Obrigatório |
|-------------|------|-----------|-------------|
| `name` | string | Nome identificador da estratégia | ✅ |
| `pattern` | string/regex | Padrão para matching de URLs | ✅ |
| `strategy` | string | Tipo de estratégia de cache | ✅ |
| `maxAge` | number | Tempo máximo em cache (ms) | ❌ |
| `maxEntries` | number | Número máximo de entradas | ❌ |

### Tipos de Estratégia Disponíveis

#### 1. Cache First (`cache-first`)
**Uso:** Recursos estáticos que raramente mudam

```json
{
  "name": "static-assets",
  "pattern": "\\.(js|css|png|jpg|jpeg|svg|ico|woff|woff2)$",
  "strategy": "cache-first",
  "maxAge": 86400000,
  "maxEntries": 100
}
```

**Comportamento:**
1. Verifica cache primeiro
2. Se encontrado, retorna do cache
3. Se não encontrado, busca da rede
4. Armazena resposta no cache

#### 2. Network First (`network-first`)
**Uso:** Dados dinâmicos com fallback offline

```json
{
  "name": "api-calls",
  "pattern": "/api/",
  "strategy": "network-first",
  "maxAge": 300000,
  "maxEntries": 50
}
```

**Comportamento:**
1. Tenta buscar da rede primeiro
2. Se sucesso, atualiza cache e retorna
3. Se falha, retorna do cache
4. Se não há cache, retorna erro

#### 3. Stale While Revalidate (`stale-while-revalidate`)
**Uso:** Recursos que precisam ser atuais mas podem ter fallback

```json
{
  "name": "dynamic-content",
  "pattern": "/content/",
  "strategy": "stale-while-revalidate",
  "maxAge": 3600000,
  "maxEntries": 30
}
```

**Comportamento:**
1. Retorna do cache imediatamente (se disponível)
2. Busca da rede em background
3. Atualiza cache com nova resposta
4. Próxima requisição usa versão atualizada

#### 4. Network Only (`network-only`)
**Uso:** Dados sensíveis que nunca devem ser cacheados

```json
{
  "name": "sensitive-data",
  "pattern": "/api/auth/",
  "strategy": "network-only"
}
```

#### 5. Cache Only (`cache-only`)
**Uso:** Recursos que devem vir apenas do cache

```json
{
  "name": "offline-fallback",
  "pattern": "/offline.html",
  "strategy": "cache-only"
}
```

## Padrões de URL (Patterns)

### String Simples
```json
"pattern": "/api/"
```
Corresponde a URLs que contêm "/api/"

### Expressão Regular
```json
"pattern": "\\.(js|css|png|jpg|jpeg|svg|ico|woff|woff2)$"
```
Corresponde a arquivos com extensões específicas

### Exemplos de Padrões Úteis

```json
// Arquivos estáticos
"pattern": "\\.(js|css|png|jpg|jpeg|svg|ico|woff|woff2|ttf|eot)$"

// APIs específicas
"pattern": "/api/public/"

// Páginas HTML
"pattern": "\\.html$"

// Imagens
"pattern": "\\.(png|jpg|jpeg|gif|webp|svg)$"

// Fontes
"pattern": "\\.(woff|woff2|ttf|eot)$"

// CDN externo
"pattern": "https://cdn.example.com/"
```

## Configurações Recomendadas

### Para Aplicação SOL

```json
{
  "cacheName": "sol-pwa",
  "version": "v13",
  "enableLogging": true,
  "urlsToCache": [
    "/",
    "/index.html",
    "/manifest.webmanifest",
    "/favicon.ico",
    "/assets/icons/icon-192x192.png",
    "/assets/icons/icon-512x512.png"
  ],
  "cacheStrategies": [
    {
      "name": "static-assets",
      "pattern": "\\.(js|css|png|jpg|jpeg|svg|ico|woff|woff2)$",
      "strategy": "cache-first",
      "maxAge": 86400000,
      "maxEntries": 100
    },
    {
      "name": "api-data",
      "pattern": "/api/",
      "strategy": "network-first",
      "maxAge": 300000,
      "maxEntries": 50
    },
    {
      "name": "html-pages",
      "pattern": "\\.html$",
      "strategy": "stale-while-revalidate",
      "maxAge": 3600000,
      "maxEntries": 20
    },
    {
      "name": "auth-endpoints",
      "pattern": "/api/auth/",
      "strategy": "network-only"
    }
  ]
}
```

## Tempos de Cache Recomendados

| Tipo de Recurso | Tempo (ms) | Tempo (legível) |
|------------------|------------|-----------------|
| Assets estáticos | 86400000 | 24 horas |
| APIs dinâmicas | 300000 | 5 minutos |
| Páginas HTML | 3600000 | 1 hora |
| Imagens | 604800000 | 7 dias |
| Fontes | 2592000000 | 30 dias |

## Debugging e Monitoramento

### Habilitando Logs Detalhados
```json
{
  "enableLogging": true
}
```

### Verificando Cache no DevTools
1. Abra Chrome DevTools (F12)
2. Vá para aba "Application"
3. Seção "Storage" → "Cache Storage"
4. Verifique entradas do cache "sol-pwa-v13"

### Logs do Service Worker
No console do navegador, procure por logs com prefixo:
```
[SOL PWA SW] Configuration loaded successfully
[SOL PWA SW] Using strategy: static-assets for /assets/main.js
```

## Atualizando Configurações

### Forçar Nova Versão
Para invalidar cache existente, altere a versão:
```json
{
  "version": "v14"  // Incrementar versão
}
```

### Deploy de Novas Configurações
1. Altere `sw-config.json`
2. Incremente versão se necessário
3. Deploy da aplicação
4. Service Worker detectará mudanças automaticamente

## Troubleshooting

### Problemas Comuns

**Cache não está funcionando:**
- Verifique se o padrão está correto
- Confirme se `maxEntries` não foi excedido
- Verifique logs no console

**Recursos não sendo cacheados:**
- Confirme se URL corresponde ao padrão
- Verifique se resposta HTTP é válida (status 200)
- Confirme se `maxAge` não expirou

**Service Worker não atualiza:**
- Force refresh (Ctrl+Shift+R)
- Limpe cache manualmente no DevTools
- Verifique se versão foi incrementada

### Comandos de Debug

```javascript
// No console do navegador
navigator.serviceWorker.getRegistration().then(reg => {
  console.log('SW Registration:', reg);
});

// Verificar caches
caches.keys().then(names => {
  console.log('Cache names:', names);
});
```

## Melhores Práticas

1. **Versionamento:** Sempre incremente versão ao alterar estratégias
2. **Padrões Específicos:** Use padrões mais específicos primeiro
3. **Tamanho do Cache:** Monitore `maxEntries` para evitar uso excessivo de storage
4. **Testes:** Teste offline após mudanças de configuração
5. **Logs:** Mantenha logging habilitado em desenvolvimento
6. **Performance:** Use `cache-first` para recursos estáticos
7. **Dados Sensíveis:** Use `network-only` para autenticação
