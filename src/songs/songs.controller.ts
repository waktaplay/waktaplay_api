import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SongsService } from './songs.service';
import { musicDetailDto } from './dto/music.dto';

@ApiTags('Music - Track Information')
@Controller('songs')
export class SongsController {
  private readonly logger = new Logger(SongsController.name);

  constructor(private readonly songsService: SongsService) {}

  @Get('new')
  @ApiOperation({
    summary: '신곡 리스트 조회',
    description: '왁타플레이에 등록된 신곡 업데이트 리스트를 조회합니다.',
  })
  async getNewTrack(): Promise<musicDetailDto[]> {
    return await this.songsService.getTracksMany(30);
  }

  @Get('all')
  @ApiOperation({
    summary: '전체 곡 리스트 조회 (밥풀뮤)',
    description: '왁타플레이에 등록된 전체 곡 리스트를 조회합니다.',
  })
  async getAllTrack(): Promise<musicDetailDto[]> {
    return await this.songsService.getTracksMany();
  }

  @Get(':id')
  @ApiOperation({
    summary: '곡 정보 확인',
    description: '왁타플레이에 등록된 특정 곡 정보를 확인합니다.',
  })
  async getTrackDetail(@Param('id') id: string): Promise<musicDetailDto> {
    return await this.songsService.getTrackDetail(id);
  }
}
