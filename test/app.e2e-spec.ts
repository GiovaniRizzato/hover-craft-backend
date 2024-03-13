import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import * as path from 'path';
import * as fs from 'fs';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be able to retrive all videos informations', () => {
    return request(app.getHttpServer())
      .get('/videos')
      .expect(HttpStatus.OK)
      .expect([
        {
          id: 0,
          title: 'Planet earth',
          duration: '30 sec',
          isListed: true,
        },
        {
          id: 1,
          title: 'Private fotage (Street)',
          duration: '5 sec',
          isListed: false,
        },
      ]);
  });

  it('should be able to retrive a specifc video informations', () => {
    return request(app.getHttpServer())
      .get('/videos/1')
      .expect(HttpStatus.OK)
      .expect({
        id: 1,
        title: 'Private fotage (Street)',
        duration: '5 sec',
        isListed: false,
      });
  });

  describe('should be able to change a specifc video informations', () => {
    beforeEach(() => {
      return request(app.getHttpServer())
        .put('/videos/1')
        .send({
          title: 'Private fotage (Street) - changed',
          duration: '4 + 1 sec',
          isListed: true,
        })
        .expect('Content-Type', /json/)
        .expect(HttpStatus.OK)
        .expect({
          id: 1,
          title: 'Private fotage (Street) - changed',
          duration: '4 + 1 sec',
          isListed: true,
        });
    });

    it('should show the change in that video informations in the video information endpoint', () => {
      return request(app.getHttpServer())
        .get('/videos/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.OK)
        .expect({
          id: 1,
          title: 'Private fotage (Street)',
          duration: '5 sec',
          isListed: true,
        });
    });
  });

  describe('should be able to upload a new video', () => {
    beforeEach(() => {
      return request(app.getHttpServer())
        .post('/videos')
        .set('Content-Type', 'multipart/form-data')
        .attach('file', path.resolve(__dirname, 'files', '3.mp4'))
        .field('title', 'Garden')
        .field('duration', '30 sec')
        .field('isListed', true)
        .expect(HttpStatus.CREATED)
        .expect({
          id: 2,
          title: 'Garden',
          duration: '30 sec',
          isListed: 'true',
        });
    });

    it('should the new video info', () => {
      return request(app.getHttpServer())
        .get('/videos/2')
        .expect(HttpStatus.OK)
        .expect({
          id: 2,
          title: 'Garden',
          duration: '30 sec',
          isListed: 'true',
        });
    });
  });

  test('should be able to stream the video', () => {
    const video = fs.readFileSync('test/files/0.mp4')
    return request(app.getHttpServer())
      .get('/videos/stream/0')
      .expect(HttpStatus.OK)
      .expect(video);
  });
});
