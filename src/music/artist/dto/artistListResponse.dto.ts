import { APIResponseDto } from 'src/common/dto/APIResponse.dto';
import { artistDto } from './artist.dto';

export class artistListResponseDto extends APIResponseDto {
  data: artistDto[];
}

export default artistListResponseDto;
