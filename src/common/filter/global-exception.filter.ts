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

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object | APIException =
      '내부 서버 오류가 발생했습니다.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (exception instanceof APIException) {
      status = exception.status;
      message = exception;
    }

    if (message instanceof APIException) {
      response.status(status).send({
        code: HttpStatus[message.status],
        status: message.status,
        message: message.message,
        data: message.data,
      });
      return;
    }

    response.status(status).send({
      code: HttpStatus[status],
      status: status,
      message: message['message'] || message['error'] || message,
    });
  }
}
