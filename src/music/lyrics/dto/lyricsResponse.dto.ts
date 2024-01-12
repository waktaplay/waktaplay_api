import { APIResponseDto } from 'src/common/dto/APIResponse.dto';
import { lyricsDto } from './lyrics.dto';

export class lyricsResponseDto extends APIResponseDto {
  data: lyricsDto[];
}

export default lyricsResponseDto;
