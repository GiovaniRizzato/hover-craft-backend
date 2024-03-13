import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be able to retrive all videos informations', () => {
    return request(app.getHttpServer())
      .get('/videos')
      .expect(HttpStatus.OK)
      .expect([
        {
          "id": 0,
          "title": "Planet earth",
          "duration": "30 sec",
          "isListed": true
        },
        {
          "id": 1,
          "title": "Private fotage (Street)",
          "duration": "5 sec",
          "isListed": false
        }
    ]);
  });

  it('should be able to retrive a specifc video informations', () => {
    return request(app.getHttpServer())
      .get('/videos/1')
      .expect(HttpStatus.OK)
      .expect({
        "id": 1,
        "title": "Private fotage (Street)",
        "duration": "5 sec",
        "isListed": false
      });
  });

  describe('should be change a specifc video informations', () => {
    beforeEach(() => {
      return request(app.getHttpServer())
        .put('/videos/1')
        .send({
          title: "Private fotage (Street)",
          duration: "5 sec",
          isListed: true
        }).set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.OK)
        .expect({
          "id": 1,
          "title": "Private fotage (Street)",
          "duration": "5 sec",
          "isListed": true
        });
    });

    it('should show the change in that video informations in the video information endpoint', () => {
      return request(app.getHttpServer())
        .get('/videos/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HttpStatus.OK)
        .expect({
          "id": 1,
          "title": "Private fotage (Street)",
          "duration": "5 sec",
          "isListed": true
        });
    });

  });

  
});
