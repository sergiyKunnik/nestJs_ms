import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

const logger = new Logger('Main');

const options = {
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: 3011,
  },
};
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, options);
  app.listen(() => {
    logger.log('Microservice order-comments is listening localhost:3011');
  });
}
bootstrap();
