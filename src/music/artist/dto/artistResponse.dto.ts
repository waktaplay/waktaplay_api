import { APIResponseDto } from 'src/common/dto/APIResponse.dto';
import { artistSearchDto } from './artistSearch.dto';

export class artistResponseDto extends APIResponseDto {
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

  data: artistSearchDto;
}

export default artistResponseDto;
