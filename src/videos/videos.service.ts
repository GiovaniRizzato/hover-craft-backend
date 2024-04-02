import { Injectable, StreamableFile } from '@nestjs/common';
import { VideoInfo, VideoInfoCreateDTO } from './videosInfo.schemas';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, mongo } from 'mongoose';
import { Readable } from 'stream';


@Injectable()
export class VideosService {
  private readonly bucket: mongo.GridFSBucket;
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(VideoInfo.name) private videoModel: Model<VideoInfo>
  ) {
    this.bucket = new mongo.GridFSBucket(this.connection.db, {bucketName: 'video_files'})
  }

  async streamById(id: string): Promise<StreamableFile> {
    return new StreamableFile(this.bucket.openDownloadStreamByName(`${id}.mp4`));
  }

  async findById(id: string): Promise<VideoInfo> {
    return this.videoModel.findById(id).exec();
  }

  async findAll(): Promise<VideoInfo[]> {
    return this.videoModel.find().exec();
  }

  async create(videoCreate: VideoInfoCreateDTO, file: Express.Multer.File): Promise<VideoInfo> {
    const newVideoEntry = new this.videoModel(videoCreate);
    newVideoEntry.id = new mongo.ObjectId();
    Readable.from(file.buffer).pipe(this.bucket.openUploadStream(`${newVideoEntry.id}.mp4`));
    return newVideoEntry.save();
  }

  async edit(videoEdited: VideoInfo): Promise<VideoInfo> {
    return this.videoModel.findByIdAndUpdate(videoEdited);
  }
}
