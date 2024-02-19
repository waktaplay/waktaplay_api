import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';

import { IMusic } from 'src/common/repository/schemas/music.schema';
import { IHearts } from 'src/common/repository/schemas/hearts.schema';
import { IPlaylist } from 'src/common/repository/schemas/playlist.schema';

import { toggleHeartRequestDto } from './dto/toggleHeartRequest.dto';
import { CreatePlaylistRequestDto } from './dto/createPlaylistRequest.dto';
import { UpdatePlaylistRequestDto } from './dto/updatePlaylistRequest.dto';
import { APIException } from 'src/common/dto/APIException.dto';
import ModifyPlaylistSongsRequestDto from './dto/modifyPlaylistSongsRequest.dto';

@Injectable()
export class MypageService {
  private readonly logger = new Logger(MypageService.name);

  constructor(
    @Inject('MUSIC_MODEL')
    private readonly musicModel: Model<IMusic>,
    @Inject('HEARTS_MODEL')
    private readonly heartsModel: Model<IHearts>,
    @Inject('PLAYLIST_MODEL')
    private readonly playlistModel: Model<IPlaylist>,
  ) {}

  //#region 좋아요 관리
  async getHearts(
    type: 'songs' | 'artists',
    userId: string,
    query: { page: number; size: number },
  ): Promise<IHearts[]> {
    return await this.heartsModel
      .find({
        user: userId,
        music: {
          $exists: type === 'songs',
        },
        artist: {
          $exists: type === 'artists',
        },
      })
      .skip(query.size * (query.page - 1))
      .limit(query.size)
      .sort({ date: -1 })
      .select('-_id -__v');
  }

  async checkHearted(
    id: string,
    type: 'songs' | 'artists',
    userId: string,
  ): Promise<IHearts> {
    return await this.heartsModel.findOne({
      user: userId,
      music: type === 'songs' ? id : undefined,
      artist: type === 'artists' ? id : undefined,
    });
  }

  async toggleHeart(
    userId: string,
    body: toggleHeartRequestDto,
  ): Promise<boolean> {
    const { artist, song } = body;

    const hearted = await this.checkHearted(
      song || artist,
      song ? 'songs' : 'artists',
      userId,
    );

    if (hearted) {
      await this.heartsModel.deleteOne({
        user: userId,
        music: song || undefined,
        artist: artist || undefined,
      });
    } else {
      await this.heartsModel.create({
        user: userId,
        music: song || undefined,
        artist: artist || undefined,
      });
    }

    return true;
  }
  //#endregion

  //#region 플레이리스트 관리
  async getPlaylists(
    userId: string,
    query: { page: number; size: number },
  ): Promise<IPlaylist[]> {
    return await this.playlistModel
      .find({ user: userId })
      .skip(query.size * (query.page - 1))
      .limit(query.size)
      .sort({ date: -1 })
      .select('-_id -__v');
  }

  async getSpecificPlaylist(id: string, userId: string) {
    const playlist = await this.playlistModel
      .findOne({ id })
      .select('-_id -__v -data');

    if (!playlist) {
      throw new APIException(404, '존재하지 않는 플레이리스트입니다.');
    }

    if (
      (!userId && !playlist.sharing) ||
      (playlist.author !== userId && !playlist.sharing)
    ) {
      throw new APIException(
        403,
        '해당 플레이리스트를 조회할 권한이 없습니다.',
      );
    }

    return playlist;
  }

  async getPlaylistSongs(id: string, userId: string): Promise<IMusic[]> {
    const playlist = await this.playlistModel.findOne({ id }).select('data');

    if (!playlist) {
      throw new APIException(404, '존재하지 않는 플레이리스트입니다.');
    }

    if (
      (!userId && !playlist.sharing) ||
      (playlist.author !== userId && !playlist.sharing)
    ) {
      throw new APIException(
        403,
        '해당 플레이리스트를 조회할 권한이 없습니다.',
      );
    }

    const songs = await this.musicModel.find({ id: { $in: playlist.data } });
    return songs;
  }

  async createPlaylist(
    userId: string,
    body: CreatePlaylistRequestDto,
  ): Promise<IPlaylist> {
    const id = randomUUID();
    const { title, description, songs } = body;

    await this.playlistModel.create({
      id: id,
      title: title,
      description: description,
      data: songs,
      author: userId,
      date: new Date(),
      sharing: false,
    });

    return await this.getSpecificPlaylist(id, userId);
  }

  async updatePlaylist(
    userId: string,
    id: string,
    body: UpdatePlaylistRequestDto,
  ): Promise<IPlaylist> {
    const playlist = await this.playlistModel.findOne({ id, author: userId });

    if (!playlist) {
      throw new APIException(404, '존재하지 않는 플레이리스트입니다.');
    }

    await this.playlistModel.updateOne(
      { id },
      {
        title: body.title || undefined,
        description: body.description || undefined,
        data: body.songs || undefined,
        sharing: body.sharing || undefined,
      },
    );

    return await this.getSpecificPlaylist(id, userId);
  }

  async modifyPlaylistSongs(
    userId: string,
    id: string,
    body: ModifyPlaylistSongsRequestDto,
  ) {
    const playlist = await this.playlistModel.findOne({ id, author: userId });
    const { add, remove } = body;

    if (!playlist) {
      throw new APIException(404, '존재하지 않는 플레이리스트입니다.');
    }

    const newSongs = playlist.data
      .filter((song) => !remove.includes(song))
      .push(...add);

    await this.playlistModel.updateOne({ id }, { data: newSongs });

    return await this.getPlaylistSongs(id, userId);
  }

  async deletePlaylist(userId: string, id: string): Promise<boolean> {
    const playlist = await this.playlistModel.findOne({ id, author: userId });

    if (!playlist) {
      throw new APIException(404, '존재하지 않는 플레이리스트입니다.');
    }

    await this.playlistModel.deleteOne({ id });

    return true;
  }

  //#endregion
}
