# Etapa 1: Construção
FROM node:18 AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos essenciais para instalação das dependências
COPY package.json yarn.lock ./

# Instalar dependências sem modificar o yarn.lock
RUN yarn install

# Copiar o restante do projeto
COPY . .

# Construir o projeto Angular para produção
RUN yarn build

# Expor a porta 80
EXPOSE 80

# Iniciar a aplicação
CMD ["yarn", "run", "start"]
