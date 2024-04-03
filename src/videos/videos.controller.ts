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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from './videos.service';
import { VideoInfo, VideoInfoCreateDTO } from './videosInfo.schemas';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Videos")
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('stream/:id')
  @Header('Content-Disposition', 'application/octet-stream')
  @ApiOperation({
    summary: 'Stream the video with "id"',
    description: '**NOT WORKING WITH SWAGGER!**\n\nGet streaming of the video with "id".'
  })
  async getStreamVideo(@Res({passthrough: true}) response: Response, @Param('id') id: string) {
    const videoInfo = await this.videosService.findById(id);
    if (videoInfo.isStreamAvalible){
      response.header('Content-Type', videoInfo.mimetype);
      return this.videosService.streamById(videoInfo.fileName);
    } else {
      throw new HttpException('Video is not avalible', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  @ApiOperation({
    summary: 'List all listed videos infos',
  })
  @ApiOkResponse({
    type: VideoInfo,
    isArray: true
  })
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get video info with "id"',
  })
  @ApiOkResponse({
    type: VideoInfo
  })
  findOne(@Param('id') id: string) {
    return this.videosService.findById(id);
  } 

  @Put(':id')
  @ApiOperation({
    summary: 'Edit the video info with "id"',
  })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: VideoInfo
  })
  @ApiBody({ type: VideoInfoCreateDTO })
  createVideo(@Param('id') id: string, @Body() videoInfo: VideoInfoCreateDTO) {
    return this.videosService.edit(id, videoInfo);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Upload new video',
  })
  @ApiOkResponse({
    type: VideoInfo
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        isStreamAvalible: { type: 'boolean' },
        isListed: { type: 'boolean' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(
    @Body() videoInfo: VideoInfoCreateDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          //1024 = 1Kb, 1024 * 1Kb = 1Mb
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 25 }),
          new FileTypeValidator({ fileType: 'video/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.videosService.create(videoInfo, file);
  }
}
