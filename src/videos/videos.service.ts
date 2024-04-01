import { Injectable } from '@nestjs/common';
import { Video, VideoCreateDTO } from './videos.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {
    
  }

  async findById(id: string): Promise<Video> {
    return this.videoModel.findById(id).exec();
  }

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  async create(videoCreate: VideoCreateDTO, file: Express.Multer.File): Promise<Video> {
    const createdCat = new this.videoModel(videoCreate);
    return createdCat.save();
  }

  async edit(videoEdited: Video): Promise<Video> {
    return this.videoModel.findByIdAndUpdate(videoEdited);
  }
}
