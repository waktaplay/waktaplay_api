import { CreatePlaylistRequestDto } from './createPlaylistRequest.dto';

export class UpdatePlaylistRequestDto extends CreatePlaylistRequestDto {
  /**
   * 공유 (공개) 여부
   */
  sharing?: boolean = false;
}

export default UpdatePlaylistRequestDto;
