export class UpdateResponseDto {
  /**
   * 업데이트 필요 여부
   * @example true
   */
  needUpdate: boolean;

  /**
   * 업데이트 OS 정보
   * @example ios
   */
  os: string;

  /**
   * 업데이트 URL
   * @example https://play.google.com/store/apps/details?id=com.waktaplay.mobile
   */
  updateUrl?: string;

  /**
   * 업데이트 버전
   * @example "1.0.0"
   */
  version: string;

  /**
   * 이벤트 특별 로고 URL
   * @example https://cdn.waktaplay.com/lottie/2024/christmas.json
   */
  specialLogo?: string;
}

export default UpdateResponseDto;
