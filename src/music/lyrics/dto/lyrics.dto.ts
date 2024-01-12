export class LyricsDto {
  /**
   * 시작점
   * @example 0
   */
  start?: number;

  /**
   * 종료점
   * @example 5
   */
  end?: number;

  /**
   * 가사 (줄바꿈 split)
   */
  subtitle: string[];

  /**
   * 가사 인덱스 (순서)
   * @example 0
   */
  index: number;
}

export default LyricsDto;
