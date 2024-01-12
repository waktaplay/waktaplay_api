import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LyricsService } from './lyrics.service';
import { lyricsResponseDto } from './dto/lyricsResponse.dto';

@ApiTags('Music - Get Lyrics')
@Controller('music/lyrics')
export class LyricsController {
  private readonly logger = new Logger(LyricsController.name);

  constructor(private readonly lyricsService: LyricsService) {}

  @Get(':id')
  @ApiOperation({
    summary: '곡 가사 파일 조회',
    description: '왁타플레이에 등록된 곡의 가사를 조회합니다.',
  })
  @ApiOkResponse({
    description: '곡 가사 데이터 (JSON)',
    type: lyricsResponseDto,
  })
  async getLyricsJson(@Param('id') id: string): Promise<lyricsResponseDto> {
    try {
      return {
        code: 'OPERATION_COMPLETE',
        status: HttpStatus.OK,
        data: await this.lyricsService.getLyricsFile(id),
      };
    } catch (e) {
      throw new HttpException(
        e,
        HttpStatus[(e.code as string) || 'INTERNAL_SERVER_ERROR'],
      );
    }
  }
}
