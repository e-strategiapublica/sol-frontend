# Sol App Frontend

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 15.1.3.

## Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
Run ` ng serve `.

## Code scaffolding

Run `ng generate component component-name` para gerar um novo componente. Voce pode usar tabém `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` para buildar o projeto. Os arquivos de build serão geramdos no diretorio `dist/`.

## Running unit tests

Run `ng test` para executar testes unitarios via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to Execute os testes end-to-end por meio de uma plataforma de sua escolha. Para usar este comando, você precisa primeiro adicionar um pacote que implemente as capacidades de testes end-to-end.

## Further help

Para obter mais ajuda sobre o Angular CLI, use ng help ou acesse a página de Visão Geral e Referência de Comandos do Angular CLI.

## Rodando a aplicação com Docker

Para rodar a aplicação usando Docker, siga os passos abaixo:

1. **Crie o arquivo `Dockerfile` e o `docker-compose.yml`** (caso ainda não existam). Aqui está um exemplo de cada:

   **Dockerfile:**
   ```Dockerfile
   # Use a imagem oficial do Node.js
   FROM node:16

   # Crie e defina o diretório de trabalho
   WORKDIR /app

   # Copie os arquivos do projeto para o container
   COPY . .

   # Instale as dependências
   RUN npm install

   # Exponha a porta em que a aplicação irá rodar
   EXPOSE 4200

   # Comando para iniciar a aplicação
   CMD ["npm", "start"]


docker-compose.yml:

yaml
Copy code
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
Construa e inicie os containers do Docker:

Execute o seguinte comando na raiz do projeto:

```bash
$ docker-compose up --build
Isso construirá a imagem Docker e iniciará a aplicação.

Acesse a aplicação:

Após a execução bem-sucedida, a aplicação estará disponível em http://localhost:4200.

Parar os containers:

Para parar os containers, execute:

```bash
$ docker-compose down
Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina antes de executar esses comandos.

# Internationalization

## Translation files

Os arquivos estão localizados na branch feature/add-change-language, no diretório src/assets/i118n.

Haverá 4 arquivos com idiomas diferentes:

- `en.json` (English)
- `es.json` (Spanish)
- `fr.json` (French)
- `pt.json` (Portuguese)

Como adicionar um novo idioma
Crie um novo arquivo JSON no formato correspondente no diretório src/assets/i118n.
Copie um dos arquivos existentes (por exemplo, en.json).
Traduza as chaves para o idioma desejado.


Os arquivos JSON são usados para traduzir os arquivos do diretório src/app para seus respectivos idiomas.

Para adicionar um novo idioma, crie um arquivo no mesmo formato e no mesmo diretório dos outros, copie um dos arquivos existentes e traduza para o idioma desejado.