import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

import { IMusic } from 'src/common/repository/schemas/music.schema';
import { IHearts } from 'src/common/repository/schemas/hearts.schema';

import { APIException } from 'src/common/dto/APIException.dto';

import { musicDetailDto } from './dto/music.dto';
import { SerializeJson } from 'src/common/util/serializeJson';

@Injectable()
export class SongsService {
  private readonly logger = new Logger(SongsService.name);

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
      throw new APIException(
        HttpStatus.NOT_FOUND,
        '요청한 곡을 찾을 수 없습니다.',
      );
    }

    const heartsResponse = await this.heartsModel
      .find()
      .where('music')
      .equals(id);

    // artTrack이 0이나 빈 문자열로 날라오는 경우 대비
    musicResponse.videos.artTrack =
      musicResponse.videos.artTrack === '0' ||
      musicResponse.videos.artTrack === ''
        ? null
        : musicResponse.videos.artTrack;

    // 장르, 키워드가 빈 문자열로 날라오는 경우 대비
    musicResponse.genres = musicResponse.genres.filter((g) => g !== '');
    musicResponse.keywords = musicResponse.keywords.filter((k) => k !== '');

    return {
      ...SerializeJson.serialize<IMusic>(musicResponse),

      hearts: heartsResponse.length,

      // TODO: 유저 정보를 받아서 해당 유저가 좋아요를 눌렀는지 확인하는 로직 추가
      isHearted: null,
    };
  }

  async getTracksMany(limit: number = -1): Promise<musicDetailDto[]> {
    const musicResponse = await this.musicModel
      .find()
      .sort({ uploadDate: -1 })
      .select('-_id -__v -artist')
      .limit(limit);

    const heartsResponse = await this.heartsModel.find();

    return musicResponse.map((music) => {
      const hearts = heartsResponse.filter((heart) => heart.music === music.id);

      return {
        ...SerializeJson.serialize<IMusic>(music),

        hearts: hearts.length,

        // TODO: 유저 정보를 받아서 해당 유저가 좋아요를 눌렀는지 확인하는 로직 추가
        isHearted: null,
      };
    });
  }
}
