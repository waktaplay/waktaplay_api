import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { version } from '../package.json';
import { GlobalExceptionFilter } from './global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.ENABLE_SWAGGER !== '0') {
    const config = new DocumentBuilder()
      .setTitle('WAKTAPLAY Music API')
      .setDescription('WAKTAPLAY Music 서비스를 위한 백엔드 RestAPI 입니다.')
      .setVersion(version)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  if (process.env.GLOBAL_CORS === '1') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: [],
      credentials: true,
    });
  }

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(4000);
}

bootstrap();
