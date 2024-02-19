import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { RepositoryModule } from 'src/common/repository/repository.module';
import { musicProviders } from 'src/common/repository/models/music.providers';
import { heartsProviders } from 'src/common/repository/models/hearts.providers';

import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  imports: [HttpModule, RepositoryModule],
  controllers: [SongsController],
  providers: [SongsService, ...musicProviders, ...heartsProviders],
  exports: [SongsService],
})
export class SongsModule {}
