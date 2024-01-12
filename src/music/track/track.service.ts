import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

import { IMusic } from 'src/repository/schemas/music.schema';
import { IHearts } from 'src/repository/schemas/hearts.schema';

import { APIError } from 'src/common/dto/APIError.dto';

import { musicDetailDto } from './dto/musicDetailResponse.dto';

@Injectable()
export class TrackService {
  private readonly logger = new Logger(TrackService.name);

  constructor(
    @Inject('MUSIC_MODEL')
    private readonly musicModel: Model<IMusic>,
    @Inject('HEARTS_MODEL')
    private readonly heartsModel: Model<IHearts>,
  ) {}

  async getTrackDetail(id: string): Promise<musicDetailDto> {
    // TODO: 유저 정보를 받아서 해당 유저가 좋아요를 눌렀는지 확인하는 로직 추가

    const musicResponse = await this.musicModel
      .findOne({ id })
      .select('-_id -__v -artist');

    if (!musicResponse) {
      throw new APIError(HttpStatus.NOT_FOUND, '요청한 곡을 찾을 수 없습니다.');
    }

    const heartsResponse = await this.heartsModel
      .find()
      .where('music')
      .equals(id);

    return {
      ...JSON.parse(JSON.stringify(musicResponse)),

      hearts: heartsResponse.length,

      // TODO: 유저 정보를 받아서 해당 유저가 좋아요를 눌렀는지 확인하는 로직 추가
      isHearted: null,
    };
  }

  async getAllTrack(): Promise<musicDetailDto[]> {
    const musicResponse = await this.musicModel
      .find()
      .sort({ uploadDate: -1 })
      .select('-_id -__v -artist');

    const heartsResponse = await this.heartsModel.find();

    return musicResponse.map((music) => {
      const hearts = heartsResponse.filter((heart) => heart.music === music.id);

      return {
        ...JSON.parse(JSON.stringify(music)),

        hearts: hearts.length,

        // TODO: 유저 정보를 받아서 해당 유저가 좋아요를 눌렀는지 확인하는 로직 추가
        isHearted: null,
      };
    });
  }
}
