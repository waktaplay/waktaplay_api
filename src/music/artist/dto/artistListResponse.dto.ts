import { APIResponseDto } from 'src/common/dto/APIResponse.dto';
import { artistDto } from './artist.dto';

export class artistListResponseDto extends APIResponseDto {
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

  data: artistDto[];
}

export default artistListResponseDto;
