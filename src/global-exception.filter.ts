import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import APIError from './common/dto/APIError.dto';
import APIException from './common/dto/APIException.dto';

import { Response } from 'express';

// HttpException, APIException ...
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object | APIError = '내부 서버 오류가 발생했습니다.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (exception instanceof APIException) {
      status = exception.status;
      message = exception.APIError;
    }

    if (message instanceof APIError) {
      response.status(status).json({
        code: HttpStatus[message.status],
        status: message.status,
        message: message.message,
        data: message.data,
      });
      return;
    }

    response.status(status).json({
      code: HttpStatus[status],
      status: status,
      message: message['message'] || message['error'] || message,
    });
  }
}
