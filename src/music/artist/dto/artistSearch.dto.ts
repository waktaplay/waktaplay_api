import { artistDto } from './artist.dto';
import { musicDto } from 'src/music/info/dto/music.dto';

export class artistSearchDto {
  artist: artistDto;
  music: {
    page: number;
    count: number;
    hasNext: boolean;
    data: musicDto[];
  };
}

export default artistSearchDto;
