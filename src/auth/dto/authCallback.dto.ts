export class authCallbackDto {
  /**
   * Access Token
   * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDQ1NjcwNTg1OTcyMDAzMDQwNzYiLCJlbWFpbCI6ImttczAyMTlrbXNAZ21haWwuY29tIiwicHJvdmlkZXIiOiJnb29nbGUiLCJlbmNEYXRhIjoiOWQzNzA4NmNlNDJlMjJkOTgwYjE1OGZlNWI5NzFiMmMxYzFiMjA1YmRhY2IxODEyNzZhZmEwZDY1YmMxMDU5NyIsImlhdCI6MTcwNjg5MTU3OX0.kufYCcO-kZELot9QM4kyD8imjOeGdXnJfC9mAHRqNws
   */
  access_token: string;

  /**
   * Refresh Token
   * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDQ1NjcwNTg1OTcyMDAzMDQwNzYiLCJpYXQiOjE3MDY4OTE1NzksImV4cCI6MTcwOTQ4MzU3OX0.j0fhOuROu2sNzUhiXeoimC6HR3Rf0d7pjZueGeVFXwI
   */
  refresh_token: string;

  /**
   * Access Token의 만료 시간
   * @example 3600
   */
  expires_in: number;

  /**
   * Access Token의 타입
   * @example 'Bearer'
   */
  token_type: string;
}

export default authCallbackDto;
