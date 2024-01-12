import { APIResponseDto } from 'src/common/dto/APIResponse.dto';
import { artistSearchDto } from './artistSearch.dto';

export class artistResponseDto extends APIResponseDto {
  data: artistSearchDto;
}

export default artistResponseDto;
