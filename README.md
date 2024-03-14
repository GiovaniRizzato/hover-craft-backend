# Hover Craft

Welcome to the repository for Hover Creaft: Video Streaming! This project is a backend implementation for a standalone and lightwight video streaming, where you can upload, check the status and watch streaming of videos in MP4 format.

This solution comes with two videos already uploaded as a sample, one of which is marked as "Not Listed", which means that, you can't watch the streaming of that video, but you can still see it the list.

## Tecnologies used :hammer_and_wrench:

[![Typescript](https://img.shields.io/badge/typescript-%2300273f.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Nodejs](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/about)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://docs.nestjs.com/)
[![Jest](https://img.shields.io/badge/jest-%23C21325.svg?style=for-the-badge&logo=jest&logoColor=white&)](https://jestjs.io/)
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

## List of endpoints and Models :clipboard:

| Method  |         URL           |             Request Body             |           Response Body         | Description |
| ------- | --------------------- | ------------------------------------ |-------------------------------- | ----------- |
| `GET`   | `/video`              |                                      | Array of [Info DTO](#info-dto)  | Retrieve all videos informations.|
| `GET`   | `/video/{id}`         |                                      | [Info DTO](#info-dto)           | Retrieve all video informations with {id}.|
| `PUT`   | `/video/{id}`         | [New info DTO](#new-info-dto)        | [Info DTO](#info-dto)           | Update informations for video with {id}.|
| `POST`  | `/video`              | [New info DTO](#new-info-dto) + File | [Info DTO](#info-dto)           | Upload new video.|
| `GET`   | `/video/stream/{id}`  |                                      |                                 | Request the video streaming with {id}.|

#### New info DTO
  ```typescript
  {
    title: string,
    duration: string,
    isListed: boolean
  }
  ```

#### Info DTO
  ```typescript
  {
    id: number,
    title: string,
    duration: string,
    isListed: boolean
  }
  ```
