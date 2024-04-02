import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<VideoInfo>;

@Schema()
export class VideoInfo {

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;
  @Prop({ required: true, unique: true })
  title: string;
  @Prop({ required: true })
  isAvalible: boolean;
}

export const VideoInfoSchema = SchemaFactory.createForClass(VideoInfo);

export class VideoInfoCreateDTO {
  title: string;
  isAvalible: boolean;
}
