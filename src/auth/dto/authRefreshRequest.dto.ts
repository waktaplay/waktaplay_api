export class authRefreshRequestDto {
  /**
   * SpaceWak OAuth2에서 발급된 refresh token
   * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDQ1NjcwNTg1OTcyMDAzMDQwNzYiLCJpYXQiOjE3MDY4OTE1NzksImV4cCI6MTcwOTQ4MzU3OX0.j0fhOuROu2sNzUhiXeoimC6HR3Rf0d7pjZueGeVFXwI
   */
  refresh_token: string;
}

export default authRefreshRequestDto;
