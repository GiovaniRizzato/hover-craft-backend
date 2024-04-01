import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;
  @Prop({ required: true, unique: true })
  title: string;
  @Prop({ required: true })
  isAvalible: boolean;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

export class VideoCreateDTO {
  title: string;
  duration: string;
  isAvalible: boolean;
}
