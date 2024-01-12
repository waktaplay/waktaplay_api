import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';

import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';

import { LyricsController } from './lyrics/lyrics.controller';
import { LyricsService } from './lyrics/lyrics.service';

import { RepositoryModule } from 'src/repository/repository.module';

import { musicProviders } from 'src/repository/models/music.providers';
import { artistProviders } from 'src/repository/models/artist.providers';
import { heartsProviders } from 'src/repository/models/hearts.providers';

@Module({
  imports: [HttpModule, RepositoryModule],
  controllers: [ArtistController, TrackController, LyricsController],
  providers: [
    ArtistService,
    TrackService,
    ...musicProviders,
    ...artistProviders,
    ...heartsProviders,
    LyricsService,
  ],
})
export class MusicModule {}
