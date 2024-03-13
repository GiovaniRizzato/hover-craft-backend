# Raspberry Award Tracking System

Bem-vindo ao repositório do projeto Raspberry Award Tracking System! Este projeto consiste em solução em Angular desenvolvida para visualização de estaticas dos *Raspberry Award*

## Tecnologias Utilizadas :hammer_and_wrench:

[![Typescript](https://img.shields.io/badge/typescript-%2300273f.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Nodejs](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/about)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://docs.nestjs.com/)
[![Jest](https://img.shields.io/badge/jest-%23C21325.svg?style=for-the-badge&logo=jest&logoColor=white&)](https://jestjs.io/)

## Utilizando a solução :rocket:

Para utilizar a solução, siga os passos abaixo:

1. Clone este repositório para o seu computador:

    ```bash
    git clone https://github.com/GiovaniRizzato/streaming-backend
    ```
2. Baixe as dependencias da solução:

    ```bash
    npm install
    ```
3. Rode a aplicação:

    ```bash
    npm run start
    ```
4. Acesse os endpoints em http://localhost:3000/

## Lista de endpoints and Models :clipboard:
  * GET /video
  * GET /video/{id}
  * PUT /video/{id}
  * POST /video
  * GET /video/stream/{id}

  ```json
  {
    "id": number,
    "title": string,
    "duration": string,
    "isListed": boolean
  }
  ```

  ```json
  {
    "title": string,
    "duration": string,
    "isListed": boolean
  }
    ```