import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
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
      .expect(200)
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
      .expect(200)
      .expect({
        "id": 1,
        "title": "Private fotage (Street)",
        "duration": "5 sec",
        "isListed": false
      });
  });
});
