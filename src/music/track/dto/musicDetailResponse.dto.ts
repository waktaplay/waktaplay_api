import { APIResponseDto } from 'src/common/dto/APIResponse.dto';
import { musicDto } from './music.dto';

export class musicDetailResponseDto extends APIResponseDto {
  data: musicDetailDto;
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

export default musicDetailResponseDto;
