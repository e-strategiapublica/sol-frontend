# Configuração da Posição Inicial do Mapa via Variável de Ambiente

## Objetivo
Permitir que a posição inicial do mapa do dashboard (latitude, longitude e zoom) seja definida por variável de ambiente no momento do deploy, sem depender do backend.

---

## 1. Definindo a variável no .env

Exemplo de entrada no arquivo `.env`:

```
MAP_INITIAL_COORDS=lat:-23.5505,lng:-46.6333,zoom:12
```

Cada cliente pode definir sua própria posição inicial alterando este valor.

---

## 2. Como funciona a injeção no build

- O arquivo `entrypoint.sh` lê a variável `MAP_INITIAL_COORDS` durante o build do Docker.
- O script faz o parsing dos valores e gera dinamicamente o arquivo `src/environments/environment.prod.ts` com os valores informados.
- O build do Angular (`yarn build`) usa esse arquivo para definir a posição inicial do mapa.
- Não há dependência do backend para essa configuração.

---

## 3. Como alterar a posição inicial do mapa

1. Edite o `.env` do cliente e defina a variável `MAP_INITIAL_COORDS` com os valores desejados.
2. Faça o build do container conforme o fluxo padrão (o script cuidará da injeção automaticamente).

---

## 4. Ajustes no código
- O componente do mapa (`associacao-map.component.ts`) utiliza `environment.mapInitialCoords` para definir a posição inicial.
- O arquivo `environment.prod.ts` é sobrescrito automaticamente no build.

---

## 5. Observações
- O build de produção já está configurado para usar `environment.prod.ts` (`angular.json`).
- O valor da posição inicial é fixo por build/deploy, mas pode ser alterado facilmente para cada cliente.

---

## 6. Exemplo de uso

```env
MAP_INITIAL_COORDS=lat:-22.9068,lng:-43.1729,zoom:10
```

---

## 7. Referências
- Script: `entrypoint.sh`
- Exemplo de env: `.env.example`
- Código: `src/environments/environment.prod.ts`, `src/app/project/associacao-map/associacao-map.component.ts`
