import { APIResponseDto } from 'src/common/dto/APIResponse.dto';
import { musicDetailDto } from './musicDetailResponse.dto';

export class allTrackResponseDto extends APIResponseDto {
  data: musicDetailDto[];
}

export default allTrackResponseDto;
