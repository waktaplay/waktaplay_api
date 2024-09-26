import { IMusic } from 'src/common/repository/schemas/music.schema';

// Artist => 불필요한 정보로 반환하지 않음
export class musicDto implements Omit<IMusic, 'artist'> {
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
   * @example ["K-POP"]
   */
  genres?: string[];

  /**
   * 음원 검색 키워드
   * @example ["키딩", "키링"]
   */
  keywords?: string[];

  /**
   * 업로드 날짜
   * @example 2023-08-17T15:00:00.000Z
   */
  uploadDate: Date;
}

export class musicDetailDto extends musicDto {
  /**
   * 좋아요 수
   * @example 10
   */
  hearts: number;

  /**
   * 좋아요 여부
   * @example true
   */
  isHearted?: boolean;
}

export interface IMusicChart extends musicDetailDto {
  rank: {
    /**
     * 현재 조회수 값
     * @example 1
     */
    views: number;

    /**
     * 조회수 증감량
     * @example -1
     */
    rank: number;
  };
}

export default musicDto;
