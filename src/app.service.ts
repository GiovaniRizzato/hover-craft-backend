import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { VideoSummary } from './app.model';

//Start the application with the "videoList.json" as a base, once started, it's going to use "videoDB" as a list of all videos
const data = fs.readFileSync('assets/videoList.json', 'utf8');
const videoDB: VideoSummary[] = JSON.parse(data);

@Injectable()
export class AppService {
  findAll (): VideoSummary[] {
    return videoDB;
  }

  findOne (id: number): VideoSummary {
    const video = videoDB.find(video => video.id == id)
    if (video) {
      return video;
    }
    else {
      throw new Error("Invalid ID");
    }
  }

  isVideoListed (id: number): boolean {
    return this.findOne(id).isListed
  }
}