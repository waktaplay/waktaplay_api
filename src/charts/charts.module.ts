import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { SongsModule } from 'src/songs/songs.module';
import { RepositoryModule } from 'src/common/repository/repository.module';
import { statisticsProviders } from 'src/common/repository/models/statistics.providers';

import { ChartsController } from './charts.controller';
import { ChartsService } from './charts.service';

@Module({
  imports: [SongsModule, HttpModule, RepositoryModule],
  controllers: [ChartsController],
  providers: [ChartsService, ...statisticsProviders],
  exports: [ChartsService],
})
export class ChartsModule {}
