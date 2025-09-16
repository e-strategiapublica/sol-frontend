<p align="center" >
    <img  src="https://e-strategiapublica.com/wp-content/uploads/2021/02/logo-blanco.png" alt="e-strategiapublica" width="300"/>
</p>

# Sol App Frontend

Projeto desenvolvido com [Angular CLI](https://github.com/angular/angular-cli) na versão **15.1.3**.

---

## 🌱 Variáveis de Ambiente do Projeto

Este projeto utiliza variáveis de ambiente para configuração de diversos comportamentos, inclusive a posição inicial do mapa do dashboard.

### `MAP_INITIAL_COORDS`
- **Descrição:** Define a posição inicial do mapa exibido no dashboard.
- **Formato:** `lat:<valor>,lng:<valor>,zoom:<valor>`
- **Exemplo:**
  ```env
  MAP_INITIAL_COORDS=lat:-23.5505,lng:-46.6333,zoom:12
  ```
- **Detalhes:**
  - Cada cliente pode customizar este valor em seu próprio `.env`.
  - O valor é lido durante o build do Docker e injetado automaticamente no arquivo `environment.prod.ts` do Angular.
  - Valores inválidos ou ausentes são substituídos por padrões seguros durante o build (`lat=-23.5505`, `lng=-46.6333`, `zoom=12`).
  - Não depende do backend; a configuração é fixa por build/deploy.

Se novas variáveis de ambiente forem adicionadas ao projeto, documente-as nesta seção.

---

## 🔒 Segurança e Criptografia

A partir da versão atual, toda a criptografia simétrica baseada em `crypto-js` foi removida do frontend. A comunicação entre frontend e backend ocorre em texto puro/JSON, protegida exclusivamente pelo protocolo HTTPS.

O uso de `crypto-js` permanece **apenas** para operações de hash SHA256 (ex: geração de IDs), nunca para criptografia de tráfego.

---

## 📱 PWA (Progressive Web App)

O SOL foi refatorado para implementar uma arquitetura PWA completa com funcionalidades offline, instalação nativa e cache inteligente.

### Funcionalidades PWA Implementadas

- ✅ **Service Worker Modular**: Estratégias de cache configuráveis
- ✅ **Instalação Nativa**: Suporte Android, iOS e Desktop  
- ✅ **Funcionamento Offline**: Cache inteligente de recursos
- ✅ **Banner de Instalação**: UI responsiva e multilíngue
- ✅ **Arquitetura Reativa**: Serviços baseados em RxJS
- ✅ **Configuração JSON**: Service Worker configurável via arquivo

### Testando PWA em Desenvolvimento

Para testar funcionalidades PWA completas, é **altamente recomendado** usar ngrok para expor a aplicação via HTTPS:

```bash
# 1. Iniciar servidor de desenvolvimento
ng serve

# 2. Em outro terminal, expor via ngrok
ngrok http http://localhost:4200/

# 3. Acessar URL do ngrok (ex: https://abc123.ngrok.io)
```

**Por que usar ngrok?**
- PWA requer HTTPS para funcionar completamente
- Permite testar instalação em dispositivos móveis reais
- Simula ambiente de produção mais fielmente
- Habilita todas as funcionalidades do Service Worker

### Documentação PWA

A documentação completa da arquitetura PWA está disponível em:
- `docs/README_PWA.md` - Visão geral e guia de início
- `docs/PWA_ARCHITECTURE.md` - Arquitetura técnica detalhada
- `docs/SERVICE_WORKER_CONFIG_GUIDE.md` - Configuração do Service Worker
- `docs/PWA_COMPONENTS_SERVICES_API.md` - API de componentes e serviços

---

## 🚀 Iniciando o Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento, utilize o comando abaixo:

```bash
ng serve
```

O aplicativo estará disponível em [http://localhost:4200](http://localhost:4200).

### Para Testes PWA (Recomendado)

```bash
# Terminal 1: Servidor Angular
ng serve

# Terminal 2: Exposição HTTPS via ngrok
ngrok http http://localhost:4200/
```

Acesse a URL fornecida pelo ngrok para testar funcionalidades PWA completas.

---

## 🛠️ Gerando Componentes e Outros Artefatos

Use o comando abaixo para gerar novos componentes:

```bash
ng generate component nome-do-componente
```

Também é possível gerar diretivas, pipes, services, classes, guards, interfaces, enums e módulos:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module nome
```

---

## 📁 Build do Projeto

Para realizar o build do projeto, execute:

```bash
ng build
```

Os arquivos serão gerados no diretório `dist/`.

---

## 🌐 Rodando a Aplicação com Docker

### Passo 1: Criar os Arquivos Necessários

**Dockerfile:**

```Dockerfile
FROM node:16

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
```

**docker-compose.yml:**

```yaml
version: '3'
services:
  frontend:
    build: .
    ports:
      - "4200:4200"
    volumes:
      - .:/app
    networks:
      - sol-network

networks:
  sol-network:
    driver: bridge
```

### Passo 2: Construir e Iniciar os Containers

Na raiz do projeto, execute:

```bash
docker-compose up --build
```

A aplicação estará disponível em [http://localhost:4200](http://localhost:4200).

### Passo 3: Parar os Containers

Para parar a aplicação, execute:

```bash
docker-compose down
```

> ⚠️ Certifique-se de ter o **Docker** e o **Docker Compose** instalados na sua máquina.

---

## 📊 Testes

### Testes Unitários

Para executar testes unitários com o [Karma](https://karma-runner.github.io), utilize:

```bash
ng test
```

### Testes End-to-End

Para executar testes end-to-end:

```bash
ng e2e
```

É necessário adicionar um pacote que implemente as funcionalidades de testes end-to-end antes de usar este comando.

---

## 🌐 Internacionalização (i18n)

### Arquivos de Tradução

Os arquivos de tradução estão localizados no diretório `src/assets/i18n` na branch `feature/add-change-language`. Os idiomas disponíveis são:

- `en.json` (Inglês)
- `es.json` (Espanhol)
- `fr.json` (Francês)
- `pt.json` (Português)

### Como Adicionar um Novo Idioma

1. Crie um novo arquivo JSON no diretório `src/assets/i18n`.
2. Copie o conteúdo de um arquivo existente (ex: `en.json`).
3. Traduza as chaves para o idioma desejado.

Os arquivos JSON são usados para traduzir o conteúdo do diretório `src/app` para os respectivos idiomas.

---

## 🔧 Ajuda Adicional

Para mais informações sobre o Angular CLI:

```bash
ng help
```

Ou acesse a [documentação oficial do Angular CLI](https://angular.io/cli).

---

**Desenvolvido por e-strategiapublica** 🚀

---

**Licença:** Este projeto está licenciado sob os termos da licença AGPL-3.0.