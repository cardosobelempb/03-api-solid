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
- npm install @fastify/cookie
- npm i pg

## Dev Dependencies

- npm i typescript -D
- npm i tsx -D
- npm i tsup -D
- npm i @types/node -D
- npm install @types/bcryptjs -D
- npm i eslint @rocketseat/eslint-config -D

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
- npm i supertest -D
- npm i --save-dev @types/supertest

## comado knex

- npm run knex -- -h
- npm run knex -- migrate:make create-transactions
- npm run knex -- migrate:make add-session-id-to-transactions
- npm run knex -- migrate:latest
- npm run knex -- migrate:rollback

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

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-in realizados pelo usuário logado;
- [] Deve ser possível o usuário obter seu histórico de check-in;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar um academia;

- ​​The IT Crowd
- Mr Robot

## RNs (Regras de negócio)

- [] o usuário não deve poder cadastrar com um e-mail duplicado;
- [] o usuário não deve poder fazer 2 check-in no mesmp dia;
- [] o usuário não deve poder fazer check-in se não estiver perto (100m) da academia;
- [] o check-in só pode ser validado até 20 minutos após criado;
- [] o check-in só pode ser validado por adminitradores;
- [] o academia só pode ser cadastrar por adminitradores;

## RNFs (Requesitos não funcionais)

- [] a senha do usuário precisa estar criptografada;
- [] os dados da aplicação precisa estar persistidos em um banco Postgress SQL;
- [] todas listas de dados deve estar paginados com 20 itens por páginas;
- [] o usuário deve ser indentificado por um JWT (Json Web Token);
