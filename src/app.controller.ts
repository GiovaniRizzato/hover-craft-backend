
import { Controller, Get, Param, Res, HttpStatus, Header, Put, Body, Post, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { statSync, createReadStream } from 'fs';
import { Headers } from '@nestjs/common';
import { Response } from 'express';
import { CreateEditVideo } from './app.model';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('video')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('stream/:id')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async getStreamVideo(@Param('id') idString: string, @Headers() headers, @Res() res: Response) {
    const id = Number.parseInt(idString);
    if (this.appService.isVideoListed(id)){
      const videoPath = `${AppService.getVideoFolderPath()}/${id}.mp4`;
      const { size } = statSync(videoPath);
      const videoRange = headers.range;
      if (videoRange) {
        const parts = videoRange.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
        const chunksize = (end - start) + 1;
        const readStreamfile = createReadStream(videoPath, {start, end});
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
        res.writeHead(HttpStatus.OK, head);//200
        createReadStream(videoPath).pipe(res);
      }
    } else {
      res.writeHead(HttpStatus.UNAUTHORIZED);//401
      res.send();
    }
  }

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(+id);
  }

  @Put(':id')
  createVideo(@Param('id') id: string, @Body() videoSummary: CreateEditVideo) {
    return this.appService.editOne(+id, videoSummary);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(
    @Body() videoSummary: CreateEditVideo,
    @UploadedFile (new ParseFilePipe({validators: [
          //1024 = 1Kb, 1024 * 1Kb = 1Mb
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: 'video/mp4' }),
        ]
      })
    ) file: Express.Multer.File
  ) {
    return this.appService.createFile(videoSummary, file);
  }
}