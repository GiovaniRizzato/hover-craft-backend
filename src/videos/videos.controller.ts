import {
  Controller,
  Get,
  Param,
  Res,
  HttpStatus,
  Header,
  Put,
  Body,
  Post,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { statSync, createReadStream } from 'fs';
import { Headers } from '@nestjs/common';
import { Response } from 'express';
import { Video, VideoCreateDTO } from './videos.schemas';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('stream/:id')
  @Header('Content-Type', 'video/mp4')
  getStreamVideo(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string): StreamableFile {
    const file = createReadStream(`assets/videos/${id}.mp4`);
    return new StreamableFile(file);
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findById(id);
  }

  @Put(':id')
  createVideo(@Param('id') id: string, @Body() videoSummary: VideoCreateDTO) {
    return this.videosService.edit({id, ...videoSummary});
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(
    @Body() videoSummary: VideoCreateDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          //1024 = 1Kb, 1024 * 1Kb = 1Mb
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: 'video/mp4' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.videosService.create(videoSummary, file);
  }
}
