export class toggleHeartRequestDto {
  /**
   * (아티스트 좋아요) 아티스트 ID
   */
  artist?: string;

  /**
   * (곡 좋아요) 곡 ID
   */
  song?: string;
}

export default toggleHeartRequestDto;
