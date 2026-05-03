/* eslint-disable @typescript-eslint/no-floating-promises */
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: false,
      exceptionFactory: (errors) => {
        if (errors.length != 0) {
          throw new BadRequestException({
            message: 'Validation failed!',
            success: false,
          });
        }
      },
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('PDS')
    .setDescription('PDS API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT!);
}
bootstrap();
