export class ModifyPlaylistSongsRequestDto {
  /**
   * 플레이리스트에 담을 음악 목록
   */
  add: string[];

  /**
   * 플레이리스트에서 제거할 음악 목록
   */
  remove: string[];
}

export default ModifyPlaylistSongsRequestDto;
