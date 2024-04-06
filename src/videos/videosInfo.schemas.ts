import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type VideoDocument = HydratedDocument<VideoInfo>;

@Schema()
export class VideoInfo {
    @Prop({ type: SchemaTypes.ObjectId, ref: VideoInfo.name })
    @ApiProperty({
      name: '_id',
      type: 'string',
      description: 'Identification for the video',
    })
      id?: Types.ObjectId;

    @Prop({ required: true, unique: true })
      fileName: string;

    @Prop({ required: true })
      mimetype: string;

    @Prop({ required: true })
    @ApiProperty({ description: 'Title for the video' })
      title: string;

    @Prop({ required: true })
    @ApiProperty({ description: 'Is the video avalible for streaming' })
      isStreamAvalible: boolean;

    @Prop({ required: true })
    @ApiProperty({
      description: 'Is the video showing in the list of all videos',
    })
      isListed: boolean;
}

export const VideoInfoSchema = SchemaFactory.createForClass(VideoInfo);

export class VideoInfoCreateDTO {
    @ApiProperty({ description: 'Title for the video' })
      title: string;

    @ApiProperty({ description: 'Is the video avalible for streaming' })
      isStreamAvalible: boolean;

    @ApiProperty({
      description: 'Is the video showing in the list of all videos',
    })
      isListed: boolean;
}
