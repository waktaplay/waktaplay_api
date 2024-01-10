import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { version } from '../package.json';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  if (process.env.ENABLE_SWAGGER !== '0') {
    const config = new DocumentBuilder()
      .setTitle('WAKTAPLAY Music API')
      .setDescription('WAKTAPLAY Music 서비스를 위한 백엔드 RestAPI 입니다.')
      .setVersion(version)
      // .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  if (process.env.GLOBAL_CORS === '1') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: [],
      // credentials: true,
    });
  }

  app.useGlobalFilters(new GlobalExceptionFilter());

  if (process.env.NODE_ENV === 'development') {
    await app.listen(4000);
  } else {
    await app.listen(4000, '0.0.0.0');
  }
}

bootstrap();
