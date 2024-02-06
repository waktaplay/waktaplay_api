import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ArtistService } from './artist.service';

import { artistDto } from './dto/artist.dto';
import { artistSearchDto } from './dto/artistSearch.dto';

@ApiTags('Music - Artist Information')
@Controller('music/artist')
export class ArtistController {
  private readonly logger = new Logger(ArtistController.name);

  constructor(private readonly artistService: ArtistService) {}

  @Get('')
  @ApiOperation({
    summary: '아티스트 리스트 확인',
    description: '왁타플레이에 등록된 아티스트 리스트를 확인합니다.',
  })
  async getArtistList(): Promise<artistDto[]> {
    return await this.artistService.getArtistList();
  }

  @Get(':id')
  @ApiOperation({
    summary: '아티스트 정보 확인',
    description: '선택한 왁타플레이 아티스트 정보를 확인합니다.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'music값 페이지 번호',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    description: '한 페이지에 보여질 music값 개수',
  })
  async getOneArtist(
    @Param('id') id: string,
    @Query('page') page: string = '1',
    @Query('size') size: string = '20',
  ): Promise<artistSearchDto> {
    return await this.artistService.getOneArtist(
      id,
      parseInt(page, 10),
      parseInt(size, 10),
    );
  }
}
