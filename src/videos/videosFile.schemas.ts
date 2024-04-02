import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<VideoFile>;

@Schema()
export class VideoFile {

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;
  @Prop({ required: true })
  length: number;
  @Prop({ required: true })
  chunkSize: number;
  @Prop()
  uploadDate: Date;
  @Prop({ required: true })
  filename: string;
  @Prop({ required: true })
  md5: string;
  @Prop({ required: true })
  contentType: string;
}

export const VideoSchema = SchemaFactory.createForClass(VideoFile);
