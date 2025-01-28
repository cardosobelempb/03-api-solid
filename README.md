## App

GymPass style app.

## start

- mkdir 03-api-solid
- 03-api-solid
- npm init -y

## Dependencies

- npm install fastify -S
- npm install dotenv -S
- npm install zod -S
- npm install bcryptjs -S
- npm install dayjs -S
- npm install @fastify/cookie

## Authentication

- npm i @fastify/jwt -S
- npm i @fastify/cookie -S

## Dev Dependencies

- npm i typescript -D
- npm i tsx -D
- npm i tsup -D
- npm i @types/node -D
- npm install @types/bcryptjs -D
- npm i eslint @rocketseat/eslint-config -D
- npm i tsconfig-paths -D
- npm i vite-tsconfig-paths -D
- npm i tsconfig-paths -D
- npm i npm-run-all -D

## comado Typescript

- npx tsc --init

## Database prisma

- npm i prisma -D
- npx prisma init
- npm i @prisma/client -S
- npx prisma generate
- npx prisma migrate dev

## Database

- npm install knex -S
- npm install sqlite3 -S

## Test

- npm i vitest -D
- npm i vite-tsconfig-paths -D
- npm i supertest -D
- npm i @types/supertest -D
- npm i @vitest/ui -D
- npm i unplugin-swc -D

## scripts

- "test": "vitest run"
- "test:watch": "vitest"
- "build": "tsup src --out-dir build",
- "start:dev": "tsx watch src/server.ts",
- "start": "node build/server.js",
- "lint": "eslint src --ext .ts --fix"

## comado git

- git init
- git add .
- git commit -m "initial commit"
- gh repo create
- gh repo view -w
- rm -f .git/index
- git reset

## buils

### build command

- npm install && npm run knex -- migrate:latest && npm run build

### start command

- node build/server.js

## RFs (Requesitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-in;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar um academia;

- ​​The IT Crowd
- Mr Robot

## RNs (Regras de negócio)

- [x] o usuário não deve poder cadastrar com um e-mail duplicado;
- [x] o usuário não deve poder fazer 2 check-in no mesmp dia;
- [x] o usuário não deve poder fazer check-in se não estiver perto (100m) da academia;
- [x] o check-in só pode ser validado até 20 minutos após criado;
- [] o check-in só pode ser validado por adminitradores;
- [] o academia só pode ser cadastrar por adminitradores;

## RNFs (Requesitos não funcionais)

- [x] a senha do usuário precisa estar criptografada;
- [x] os dados da aplicação precisa estar persistidos em um banco Postgress SQL;
- [x] todas listas de dados deve estar paginados com 20 itens por páginas;
- [] o usuário deve ser indentificado por um JWT (Json Web Token);
