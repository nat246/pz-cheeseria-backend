import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // For validation using @ decorators from class-validators
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('PZ Cheeseria API')
    .setDescription('The PZ Cheeseria API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
