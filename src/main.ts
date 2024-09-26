import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestjsRedoxModule } from 'nestjs-redox';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { version } from '../package.json';

import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  //#region -- OpenAPI Spec 설정
  if (process.env.ENABLE_SWAGGER != '0') {
    const config = new DocumentBuilder()
      .setTitle('WAKTAPLAY API')
      .setDescription('WAKTAPLAY 서비스를 위한 백엔드 RestAPI 입니다.')
      .setVersion(version)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    await SwaggerModule.setup('docs', app, document);
    await NestjsRedoxModule.setup('redoc', app, document);
  }
  //#endregion

  //#region -- CORS 설정
  if (process.env.GLOBAL_CORS == '1') {
    app.enableCors({
      origin: '*',
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: [],
      // credentials: true,
    });
  }
  //#endregion

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  if (process.env.NODE_ENV === 'development') {
    await app.listen(4000);
  } else {
    await app.listen(4000, '0.0.0.0');
  }
}

bootstrap();
