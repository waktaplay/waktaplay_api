import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';

import { InfoController } from './info/info.controller';
import { InfoService } from './info/info.service';

import { RepositoryModule } from 'src/repository/repository.module';

import { artistProviders } from 'src/repository/models/artist.providers';
import { musicProviders } from 'src/repository/models/music.providers';

@Module({
  imports: [HttpModule, RepositoryModule],
  controllers: [ArtistController, InfoController],
  providers: [
    ArtistService,
    InfoService,
    ...artistProviders,
    ...musicProviders,
  ],
})
export class MusicModule {}
