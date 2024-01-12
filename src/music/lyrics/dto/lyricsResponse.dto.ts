import { APIResponseDto } from 'src/common/dto/APIResponse.dto';
import { LyricsDto } from './lyrics.dto';

export class lyricsResponseDto extends APIResponseDto {
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

  data: LyricsDto[];
}

export default lyricsResponseDto;
