import { Injectable } from '@nestjs/common';
import { Video, VideoCreate } from './videos.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async findById(id: number): Promise<Video> {
    return this.videoModel.findById(id).exec();
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  async create(videoCreate: VideoCreate): Promise<Video> {
    const createdCat = new this.videoModel(videoCreate);
    return createdCat.save();
  }

  async edit(videoEdited: Video): Promise<Video> {
    return this.videoModel.findByIdAndUpdate(videoEdited);
  }
}
