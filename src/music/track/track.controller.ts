import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { TrackService } from './track.service';
import { musicDetailResponseDto } from './dto/musicDetailResponse.dto';
import allTrackResponseDto from './dto/allTrackResponse.dto';

@ApiTags('Music - Track Information')
@Controller('music/track')
export class TrackController {
  private readonly logger = new Logger(TrackController.name);

  constructor(private readonly trackService: TrackService) {}

  @Get('all')
  @ApiOperation({
    summary: '전체 곡 리스트 조회',
    description: '왁타플레이에 등록된 전체 곡 리스트를 조회합니다.',
  })
  @ApiOkResponse({
    description: '전체 곡 정보',
    type: allTrackResponseDto,
  })
  async getAllTrack(): Promise<allTrackResponseDto> {
    try {
      return {
        code: 'OPERATION_COMPLETE',
        status: HttpStatus.OK,
        data: await this.trackService.getAllTrack(),
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
    summary: '곡 정보 확인',
    description: '왁타플레이에 등록된 특정 곡 정보를 확인합니다.',
  })
  @ApiOkResponse({
    description: '곡 상세 정보',
    type: musicDetailResponseDto,
  })
  async getTrackDetail(
    @Param('id') id: string,
  ): Promise<musicDetailResponseDto> {
    try {
      return {
        code: 'OPERATION_COMPLETE',
        status: HttpStatus.OK,
        data: await this.trackService.getTrackDetail(id),
      };
    } catch (e) {
      throw new HttpException(
        e,
        HttpStatus[(e.code as string) || 'INTERNAL_SERVER_ERROR'],
      );
    }
  }
}
