import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as path from 'path';
import * as fs from 'fs';
import { connections } from 'mongoose';
import { AppModule, closeMongoConnection } from './../src/app.module';


describe('AppController', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    for (const connection of connections) {
      await connection.close();
    }
    await closeMongoConnection();
    await app.close();
    await module.close();
  });

  it('should the new video info', () => {
    request(app.getHttpServer())
      .get('/videos')
      .expect(HttpStatus.OK)
      .expect([]);
  });

  describe('should be able to upload a new video', () => {
    let id: string;
    beforeEach(async () => {
      const response = await request(app.getHttpServer())
        .post('/videos')
        .set('Content-Type', 'multipart/form-data')
        .attach('file', path.resolve(__dirname, 'files', '0.mp4'))
        .field('title', 'Planetary')
        .field('isStreamAvalible', 'true')
        .field('isListed', 'true')
        .expect(HttpStatus.CREATED);
      const body = response.body;
      id = body._id;
      expect(body).toEqual(expect.objectContaining({
        mimetype: "video/mp4",
        title: "Planetary",
        isStreamAvalible: true,
        isListed: true,
      }));
    });

    it('should be included listed', async () => {
      const response = await request(app.getHttpServer())
        .get('/videos')
        .expect(HttpStatus.OK);
      const body = response.body;
      expect(body).toContainEqual(expect.objectContaining({
        mimetype: "video/mp4",
        title: "Planetary",
        isStreamAvalible: true,
        isListed: true,
      }));
    });

    it('should be able to view the info by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/videos/${id}`)
        .expect(HttpStatus.OK);
      const body = response.body;
      expect(body).toEqual(expect.objectContaining({
        _id: id,
        mimetype: "video/mp4",
        title: "Planetary",
        isStreamAvalible: true,
        isListed: true,
      }));
    });

    it('should be able to watch the video', async () => {
      const video = fs.readFileSync('test/files/0.mp4');
      await request(app.getHttpServer())
        .get(`/videos/watch/${id}`)
        .expect(HttpStatus.OK)
        .expect(video);
    });

    describe('should be able to edit the video information', () => {
      beforeEach(async () => {
        const response = await request(app.getHttpServer())
          .put(`/videos/${id}`)
          .send({
            title: 'Planetary 2',
            isStreamAvalible: false,
            isListed: false,
          })
          .expect(HttpStatus.OK);
        const body = response.body;
        expect(body).toEqual(expect.objectContaining({
          _id: id,
          mimetype: "video/mp4",
          title: "Planetary 2",
          isStreamAvalible: false,
          isListed: false,
        }));
      });

      it('should NOT included listed after changing it to unlisted video', async () => {
        request(app.getHttpServer())
          .get('/videos')
          .expect(HttpStatus.OK)
          .expect([]);
      });

      it('should be still able to view the info by id, even when not watchable or listed', async () => {
        const response = await request(app.getHttpServer())
          .get(`/videos/${id}`)
          .expect(HttpStatus.OK);
        const body = response.body;
        expect(body).toEqual(expect.objectContaining({
          _id: id,
          mimetype: "video/mp4",
          title: "Planetary 2",
          isStreamAvalible: false,
          isListed: false,
        }));
      });

      it('should NOT be able to watch the video after changing it', () => {
        request(app.getHttpServer())
          .get(`/videos/watch/${id}`)
          .expect(HttpStatus.FORBIDDEN);
      });
    });
  });
});
