# Hover Craft

Welcome to the repository for Hover Creaft: Video Streaming! This project is a backend implementation for a standalone and lightwight video streaming, where you can upload, check the status and watch streaming of videos.


Since this solution is intended as portfolio, it uses In-Memory MongDB database to not require any extra installation other than the [Node.js](https://nodejs.org/about), however, all the MongoDB connection is setup in the [AppModule](src\app.module.ts), and if changed to a connection the rest of the transactions would still follow the new setup.

## Tecnologies used :hammer_and_wrench:

#### Frameworks:
[![Typescript](https://img.shields.io/badge/typescript-%2300273f.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Nodejs](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/about)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://docs.nestjs.com/)

#### Databases:
[![MongoDB](https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/mongoose-%23F04D35.svg?style=for-the-badge&logo=mongoosedotws&logoColor=white)](https://mongoosejs.com/)

#### Testing:
[![Jest](https://img.shields.io/badge/jest-%23C21325.svg?style=for-the-badge&logo=jest&logoColor=white&)](https://jestjs.io/)
[![Swagger](https://img.shields.io/badge/swagger-%2385EA2D.svg?style=for-the-badge&logo=swagger&logoColor=black&)](https://swagger.io/)
[![Postman](https://img.shields.io/badge/postman-%23FF6C37.svg?style=for-the-badge&logo=postman&logoColor=white&)](https://www.postman.com/)

## Using this solution :rocket:

To use this solution, follow the instructions:

1. Clone the repository:

  ```bash
  git clone https://github.com/GiovaniRizzato/streaming-backend
  ```
2. Download the dependencies:

  ```bash
  npm install
  ```
3. Run the aplication:

  ```bash
  npm run start
  ```
4. Access the endpoints with http://localhost:3000/, by default

#### Accessing Swagger documentation:

The solution has a Swagger using the http://localhost:3000/api/ endpoint and the steps of [Using this solution](#using-this-solution-rocket) section.

## List of endpoints and Models :clipboard:

| Method  |         URL           |             Request Body             |           Response Body         | Description |
| ------- | --------------------- | ------------------------------------ |-------------------------------- | ----------- |
| `GET`   | `/video`              |                                      | Array of [Info DTO](#video-info-dto)  | Retrieve informations from all listed videos.|
| `GET`   | `/video/{id}`         |                                      | [Info DTO](#video-info-dto)           | Retrieve all video informations with {id}.|
| `PUT`   | `/video/{id}`         | [New info DTO](#new-video-info-dto)        | [Info DTO](#video-info-dto)           | Update informations for video with {id}.|
| `POST`  | `/video`              | [New info DTO](#new-video-info-dto) + File | [Info DTO](#video-info-dto)           | Upload new video.|
| `GET`   | `/video/stream/{id}`  |                                      |                                 | Request the video streaming with {id}. It'll throw an error if the video is not available|

#### New video info DTO
  ```typescript
  {
    title: string,
    isStreamAvalible: boolean,
    isListed: boolean
  }
  ```

#### Video info DTO
  ```typescript
  {
    id: number,
    title: string,
    isStreamAvalible: boolean,
    isListed: boolean
  }
  ```
