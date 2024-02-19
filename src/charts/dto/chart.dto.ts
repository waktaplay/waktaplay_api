import { musicDetailDto } from 'src/songs/dto/music.dto';

export class chartDto {
  chart: ChartData[];

  /**
   * 차트 업데이트 날짜
   * @example 2024-01-15T01:00:05.000Z
   */
  updatedAt: string;
}

export type ChartType = 'daily' | 'weekly' | 'realtime' | 'total';

class ChartData extends musicDetailDto {
  rank: {
    /**
     * 현재 조회수 값
     * @example 1
     */
    current: number;

    /**
     * 조회수 증감량
     * @example NEW
     */
    increase: number | string;
  };
}

export default chartDto;
