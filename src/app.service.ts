import { Injectable } from '@nestjs/common';
const allVideos = [
  {
    id: 1,
    name: "tom-and-jerry",
    duration: '3 mins',
    title: 'Tom & Jerry'
  },
];
@Injectable()
export class AppService {
  findAll() {
    return allVideos
  }

  findOne(id: number) {
    const video = allVideos.find(video => video.id == id)
    if (video) {
      return video
    }
    else {
      return `There is no video with id ${id}`
    }
  }
}