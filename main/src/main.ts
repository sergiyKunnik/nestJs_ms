import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerBaseConfig, SwaggerDocument } from '@nestjs/swagger';
import { ValidationPipe, INestApplication } from '@nestjs/common';

async function bootstrap(): Promise<void> {

  const app: INestApplication = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const options: SwaggerBaseConfig = new DocumentBuilder()
  .setTitle('Api documentation')
  .addBearerAuth('Authorization', 'header', 'apiKey')
  .setVersion('1.0')
  .build();
  const document: SwaggerDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('explorer', app, document);

  await app.listen('3000', 'localhost', () => {
    // tslint:disable-next-line: no-console
    console.log(`Server is running http://localhost:3000/`);
     // tslint:disable-next-line: no-console
    console.log(`Swagger is running http://localhost:3000/explorer`);
  });
}
bootstrap();
