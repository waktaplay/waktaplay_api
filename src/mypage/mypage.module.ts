import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { RepositoryModule } from 'src/common/repository/repository.module';
import { musicProviders } from 'src/common/repository/models/music.providers';
import { heartsProviders } from 'src/common/repository/models/hearts.providers';
import { playlistProviders } from 'src/common/repository/models/playlist.providers';

import { AuthGuard } from 'src/auth/auth.guard';
import { AnonymousGuard } from 'src/auth/anonymous.guard';

import { MypageController } from './mypage.controller';
import { MypageService } from './mypage.service';

@Module({
  imports: [HttpModule, RepositoryModule, JwtModule],
  controllers: [MypageController],
  providers: [
    AuthGuard,
    AnonymousGuard,
    MypageService,
    ...musicProviders,
    ...heartsProviders,
    ...playlistProviders,
  ],
  exports: [MypageService],
})
export class MypageModule {}
