import { HttpStatus } from '@nestjs/common';

export class APIError {
  constructor(status: HttpStatus, message: string, data?: any) {
    this._status = status;
    this._message = message;
    this._data = data;
  }

  /**
   * 에러 ENUM (ENUM Type)
   * @example HttpStatus.INTERNAL_SERVER_ERROR
   */
  private _status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

  /**
   * 에러 메시지
   * @example '내부 서버 오류가 발생했습니다.'
   */
  private _message: string = '내부 서버 오류가 발생했습니다.';

  private _data?: any;

  public get status() {
    return this._status;
  }

  public get message() {
    return this._message;
  }

  public get data() {
    return this._data;
  }
}

export default APIError;
