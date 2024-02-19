export class APIResponseDto {
  /**
   * 상태 코드 (ENUM)
   * @example 'OPERATION_COMPLETE'
   */
  code: string;

  /**
   * HTTP 상태 코드
   * @example 200
   */
  status: number;

  data?: any;

  /**
   * 요청 실행 당시 서버 시간 (ISO 8601)
   * @example '2021-08-01T00:00:00.000Z'
   */
  responseAt: string;
}

export default APIResponseDto;
