import { Response } from 'express';
import {
  Controller,
  Get,
  Param,
  Res,
  Header,
  Put,
  Body,
  Post,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from './videos.service';
import { VideoInfoCreateDTO } from './videosInfo.schemas';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('stream/:id')
  @Header('Content-Type', 'video/mp4')
  getStreamVideo(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string) {
    return this.videosService.streamById(id);
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
  createVideo(@Param('id') id: string, @Body() videoSummary: VideoInfoCreateDTO) {
    return this.videosService.edit({id, ...videoSummary});
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(
    @Body() videoSummary: VideoInfoCreateDTO,
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
