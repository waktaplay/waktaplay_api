import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ChartsService } from './charts.service';
import { chartDto } from './dto/chart.dto';

@ApiTags('Music - Chart Data')
@Controller('music/charts')
export class ChartsController {
  private readonly logger = new Logger(ChartsController.name);

  constructor(private readonly chartsService: ChartsService) {}

  @Get('realtime')
  @ApiOperation({
    summary: '실시간 차트 확인',
    description: '왁타플레이 실시간 차트(1시간 간격)을 확인합니다.',
  })
  async getRealtimeChart(): Promise<chartDto> {
    return await this.chartsService.getChart('realtime');
  }

  @Get('daily')
  @ApiOperation({
    summary: '일간 차트 확인',
    description: '왁타플레이 일간 차트를 확인합니다.',
  })
  async getDailyChart(): Promise<chartDto> {
    return await this.chartsService.getChart('daily');
  }

  @Get('weekly')
  @ApiOperation({
    summary: '주간 차트 확인',
    description: '왁타플레이 주간 차트를 확인합니다.',
  })
  async getWeeklyChart(): Promise<chartDto> {
    return await this.chartsService.getChart('weekly');
  }

  @Get('total')
  @ApiOperation({
    summary: '누적 차트 확인',
    description: '왁타플레이 누적 차트를 확인합니다.',
  })
  async getTotalChart(): Promise<chartDto> {
    return await this.chartsService.getChart('total');
  }
}
