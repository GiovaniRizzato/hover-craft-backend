import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: number;
  @Prop({ required: true, unique: true })
  title: string;
  @Prop()
  duration: string;
  @Prop({ required: true })
  isAvalible: boolean;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

export class VideoCreate {
  title: string;
  duration: string;
  isAvalible: boolean;
}
