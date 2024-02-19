import { IArtist } from 'src/common/repository/schemas/artist.schema';

export class artistDto implements IArtist {
  /**
   * 아티스트 고유 ID (보통 영문명 소문자)
   * @example 'viichan'
   */
  id: string;

  /**
   * 아티스트 한글명
   * @example '비찬'
   */
  name: string;

  /**
   * 아티스트 영문명
   * @example 'VIichan'
   */
  engName: string;

  /**
   * 아티스트 약칭
   * @example '비찬'
   */
  shortName: string;

  /**
   * 아티스트 소속 그룹 고유 ID
   * @example 'isedol'
   */
  group: string;

  /**
   * 아티스트 대표 색상
   * @example '85AC20'
   */
  color: string;

  /**
   * 아티스트 트위치 ID
   * @example 'viichan6'
   */
  twitch?: string;

  /**
   * 아티스트 아프리카 ID (NEW)
   * @example 'viichan6'
   */
  afreecatv?: string;

  /**
   * 아티스트 유튜브 ID
   * @example 'viichan116'
   */
  youtube?: string;

  /**
   * 아티스트 인스타그램 ID
   * @example 'viichan6'
   */
  instagram?: string;
}
