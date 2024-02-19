import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlaylistRequestDto {
  /**
   * 플레이리스트 제목
   */
  title: string;

  /**
   * 플레이리스트 설명
   */
  @ApiPropertyOptional()
  description?: string;

  /**
   * 플레이리스트에 담을 음악 목록
   */
  songs: string[];
}

export default CreatePlaylistRequestDto;
