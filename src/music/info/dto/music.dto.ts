import { IMusic } from 'src/repository/schemas/music.schema';

export class musicDto implements IMusic {
  /**
   * 음원 (Youtube) 고유 ID
   * @example rDFUl2mHIW4
   */
  id: string;

  /**
   * 음원 타입 (0: 일반 음원, 2: 콘서트 등 특수 영상, 3: 삭제된 영상)
   * @default 0
   * @example 0
   */
  type: 0 | 2 | 3;

  /**
   * 음원 제목
   * @example 이세계아이돌 - KIDDING
   */
  title: string;

  videos: {
    /**
     * 음원 (Youtube) URL
     * @example https://youtu.be/rDFUl2mHIW4
     */
    video: string;

    /**
     * 음원 MV (Youtube) URL
     * @example https://youtu.be/rDFUl2mHIW4
     */
    musicVideo: string;

    /**
     * 음원 아트트랙 (Youtube) URL
     * @example https://youtu.be/93mZo1XTH5I
     */
    artTrack?: string;

    timeData: {
      /**
       * 음원 시작 시간 (초)
       * @default 0
       * @example 0
       */
      start: number;

      /**
       * 음원 종료 시간 (초)
       * @example 209
       */
      end?: number;
    };
  };

  /**
   * 음원 장르
   * @example 'K-POP'
   */
  genre?: string;

  /**
   * 음원 검색 키워드
   * @example '키딩,키링'
   */
  keyword?: string;

  /**
   * 아티스트 별 음원 여부
   */
  artist: any;

  /**
   * 업로드 날짜
   * @example 2023-08-17T15:00:00.000Z
   */
  uploadDate: Date;
}
