import { HttpStatus } from '@nestjs/common';
import APIError from './APIError.dto';

export default class APIException {
  constructor(status: HttpStatus, message: string, data?: any) {
    this._APIError = new APIError(status, message, data);
    this._status = status;
  }

  /**
   * 에러 ENUM (ENUM Type)
   * @example HttpStatus.INTERNAL_SERVER_ERROR
   */
  private _status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

  private _APIError: APIError;

  public get status() {
    return this._status;
  }

  public get APIError() {
    return this._APIError;
  }
}
