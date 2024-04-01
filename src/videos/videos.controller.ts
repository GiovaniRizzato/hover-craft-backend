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
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { statSync, createReadStream } from 'fs';
import { Headers } from '@nestjs/common';
import { Response } from 'express';
import { Video, VideoCreate } from './videos.schemas';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('videos')
export class VideosController {
  constructor(private readonly appService: VideosService) {}

  @Get('stream/:id')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async getStreamVideo(
    @Param('id') idString: string,
    @Headers() headers,
    @Res() res: Response,
  ) {
    const id = Number.parseInt(idString);
    const videoPath = `assets/videos/${id}.mp4`;
    const { size } = statSync(videoPath);
    const videoRange = headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
      const chunksize = end - start + 1;
      const readStreamfile = createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': chunksize,
      };
      res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
      readStreamfile.pipe(res);
    } else {
      const head = {
        'Content-Length': size,
      };
      res.writeHead(HttpStatus.OK, head); //200
      createReadStream(videoPath).pipe(res);
    }
  }

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findById(+id);
  }

  @Put(':id')
  createVideo(@Param('id') id: string, @Body() videoSummary: VideoCreate) {
    return this.appService.edit({id: +id, ...videoSummary});
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(
    @Body() videoSummary: VideoCreate,
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
    //return this.appService.createFile(videoSummary, file);
  }
}
