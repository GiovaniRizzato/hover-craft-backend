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

  async streamById(fileName: string): Promise<StreamableFile> {
    return new StreamableFile(this.bucket.openDownloadStreamByName(fileName));
  }

  async findById(id: string): Promise<VideoInfo> {
    return this.videoModel.findById(id).exec();
  }

  async findAll(): Promise<VideoInfo[]> {
    return this.videoModel.find({isListed: true}).exec();
  }

  async create(videoCreate: VideoInfoCreateDTO, file: Express.Multer.File): Promise<VideoInfo> {
    const nextId = new mongo.ObjectId();
    const splitedFileName = file.originalname.split('.');
    const newVideoEntry = await (new this.videoModel({
      _id: nextId,
      fileName: `${nextId}.${splitedFileName[splitedFileName.length - 1]}`,
      title: videoCreate.title,
      mimetype: file.mimetype,
      isStreamAvalible: videoCreate.isStreamAvalible,
      isListed: videoCreate.isListed,
    } as VideoInfo).save());
    console.log(newVideoEntry.fileName);
    Readable.from(file.buffer).pipe(this.bucket.openUploadStream(newVideoEntry.fileName));
    return newVideoEntry;
  }

  async edit(id: string, videoInfoCreateDTO: VideoInfoCreateDTO): Promise<VideoInfo> {
    const videoInfo = await this.videoModel.findById(id).exec();
    return this.videoModel.findByIdAndUpdate(videoInfo._id, videoInfoCreateDTO, {new: true});
  }
}
