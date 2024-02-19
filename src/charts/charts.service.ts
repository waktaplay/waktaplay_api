import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

import chartDto, { ChartType } from './dto/chart.dto';

import { SerializeJson } from 'src/common/util/serializeJson';
import { SongsService } from 'src/songs/songs.service';

import { IStatistics } from 'src/common/repository/schemas/statistics.schema';
import { IStatisticsUpdatedAt } from 'src/common/repository/schemas/statisticsUpdatedAt.schema';

@Injectable()
export class ChartsService {
  private readonly logger = new Logger(ChartsService.name);

  constructor(
    @Inject('STATISTICS_MODEL')
    private readonly statisticsModel: Model<IStatistics>,
    @Inject('STATISTICS_UPDATEDAT_MODEL')
    private readonly statisticsUpdatedAtModel: Model<IStatisticsUpdatedAt>,
    private readonly trackService: SongsService,
  ) {}

  async getChart(type: ChartType = 'realtime'): Promise<chartDto> {
    try {
      const musicData = await this.trackService.getTracksMany(100);
      const chartData = SerializeJson.serialize<IStatistics[]>(
        await this.statisticsModel.find(),
      );
      const updatedAt = SerializeJson.serialize<IStatisticsUpdatedAt>(
        await this.statisticsUpdatedAtModel.findOne(),
      );

      return {
        chart: musicData
          .map((music) => {
            const chart = chartData.find((data) => data.id === music.id);

            return {
              ...music,
              rank: chart?.[type] || { current: 0, increase: 'NEW' },
            };
          })
          .sort((a, b) => {
            if (a.rank.increase === 'NEW') return 1;
            else if (b.rank.increase === 'NEW') return -1;
            else if (a.rank.current > b.rank.current) return 1;
            else if (a.rank.current < b.rank.current) return -1;
            else return 0;
          }),
        updatedAt: new Date(updatedAt[type]).toISOString(),
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
