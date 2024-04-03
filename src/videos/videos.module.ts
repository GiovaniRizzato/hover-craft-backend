import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { VideoInfo, VideoInfoSchema } from './videosInfo.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VideoInfo.name, schema: VideoInfoSchema }]),
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule { }