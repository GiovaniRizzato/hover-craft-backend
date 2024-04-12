import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

//store the location of the memory server to stop at automated testing
let mongodb: MongoMemoryServer;
export const closeMongoConnection = async () => {
  if (mongodb) await mongodb.stop();
};

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        mongodb = await MongoMemoryServer.create();
        return { uri: mongodb.getUri() };
      },
    }),
    VideosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
