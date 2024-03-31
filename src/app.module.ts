import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { RepositoryModule } from './common/repository/repository.module';

import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { ArtistModule } from './artist/artist.module';
import { ChartsModule } from './charts/charts.module';
import { LyricsModule } from './lyrics/lyrics.module';
import { MypageModule } from './mypage/mypage.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),
    AuthModule,
    ClientModule,
    ArtistModule,
    ChartsModule,
    LyricsModule,
    MypageModule,
    SongsModule,
    RepositoryModule,
    AppModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
