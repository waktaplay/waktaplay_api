import { HttpStatus } from '@nestjs/common';

export class APIException {
  constructor(status: HttpStatus, message: string, data?: any) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  /**
   * 에러 ENUM (ENUM Type)
   * @example HttpStatus.INTERNAL_SERVER_ERROR
   */
  public status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

  /**
   * 에러 메시지
   * @example '내부 서버 오류가 발생했습니다.'
   */
  public message: string = '내부 서버 오류가 발생했습니다.';

  public data?: any;
}

export default APIException;
