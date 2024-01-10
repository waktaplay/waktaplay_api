import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ArtistService } from './artist.service';
import { artistResponseDto } from './dto/artistResponse.dto';
import { artistListResponseDto } from './dto/artistListResponse.dto';

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
  @ApiOkResponse({
    description: '아티스트 리스트',
    type: artistListResponseDto,
  })
  async getArtistList(): Promise<artistListResponseDto> {
    try {
      return {
        code: 'OPERATION_COMPLETE',
        status: HttpStatus.OK,
        data: await this.artistService.getArtistList(),
      };
    } catch (e) {
      throw new HttpException(
        e,
        HttpStatus[(e.code as string) || 'INTERNAL_SERVER_ERROR'],
      );
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '아티스트 정보 확인',
    description: '선택한 왁타플레이 아티스트 정보를 확인합니다.',
  })
  @ApiOkResponse({
    description: '아티스트 정보',
    type: artistResponseDto,
  })
  async getOneArtist(
    @Param('id') id: string,
    @Query('page') page: string = '1',
    @Query('size') size: string = '20',
  ): Promise<artistResponseDto> {
    try {
      return {
        code: 'OPERATION_COMPLETE',
        status: HttpStatus.OK,
        data: await this.artistService.getOneArtist(
          id,
          parseInt(page, 10),
          parseInt(size, 10),
        ),
      };
    } catch (e) {
      throw new HttpException(
        e,
        HttpStatus[(e.code as string) || 'INTERNAL_SERVER_ERROR'],
      );
    }
  }
}
