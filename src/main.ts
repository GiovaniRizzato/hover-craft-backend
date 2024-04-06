import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hover Craft: video streaming')
    .setDescription("It's a MP4 video storage and streaming service")
    .setVersion('1.0')
    .setContact(
      'Giovani Rizzato',
      'https://github.com/GiovaniRizzato',
      'giovanirizzato@gmail.com',
    )
    .setLicense(
      'GNU General Public License v3.0',
      'https://github.com/GiovaniRizzato/hover-craft-backend/blob/main/LICENSE',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
