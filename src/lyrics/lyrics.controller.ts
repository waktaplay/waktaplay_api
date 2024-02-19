import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { LyricsService } from './lyrics.service';
import { lyricsDto } from './dto/lyrics.dto';

@ApiTags('Music - Get Lyrics')
@Controller('lyrics')
export class LyricsController {
  private readonly logger = new Logger(LyricsController.name);

  constructor(private readonly lyricsService: LyricsService) {}

  @Get(':id')
  @ApiOperation({
    summary: '곡 가사 파일 조회',
    description: '왁타플레이에 등록된 곡의 가사를 조회합니다.',
  })
  async getLyricsJson(@Param('id') id: string): Promise<lyricsDto[]> {
    return await this.lyricsService.getLyricsFile(id);
  }
}
