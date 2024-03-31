import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import APIException from '../dto/APIException.dto';

import { FastifyReply } from 'fastify';

// HttpException, APIException ...
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: FastifyReply<any> = ctx.getResponse<FastifyReply>();

    const responseAt: string = new Date().toISOString();

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object | APIException =
      '내부 서버 오류가 발생했습니다.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    if (exception instanceof APIException) {
      response.status(exception.status).send({
        code: HttpStatus[exception.status],
        status: exception.status,

        data: exception.data,
        message: exception.message,
        responseAt: responseAt,
      });
      return;
    }

    response.status(status).send({
      code: HttpStatus[status],
      status: status,

      message: message['message'] || message['error'] || message,
      responseAt: responseAt,
    });
  }
}
