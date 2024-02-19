import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { RepositoryModule } from 'src/common/repository/repository.module';
import { musicProviders } from 'src/common/repository/models/music.providers';
import { artistProviders } from 'src/common/repository/models/artist.providers';

import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [HttpModule, RepositoryModule],
  controllers: [ArtistController],
  providers: [ArtistService, ...musicProviders, ...artistProviders],
  exports: [ArtistService],
})
export class ArtistModule {}
