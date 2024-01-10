import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

import { IArtist } from 'src/repository/schemas/artist.schema';
import { IMusic } from 'src/repository/schemas/music.schema';

import { artistDto } from './dto/artist.dto';
import { artistSearchDto } from './dto/artistSearch.dto';

@Injectable()
export class ArtistService {
  private readonly logger = new Logger(ArtistService.name);

  constructor(
    @Inject('ARTIST_MODEL')
    private readonly artistModel: Model<IArtist>,
    @Inject('MUSIC_MODEL')
    private readonly musicModel: Model<IMusic>,
  ) {}

  async getArtistList(): Promise<artistDto[]> {
    try {
      return this.artistModel.find().select('-_id -__v');
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async getOneArtist(
    id: string,
    page: number = 1,
    size: number = 20,
  ): Promise<artistSearchDto> {
    try {
      const searchQuery = {};
      searchQuery[`artist.${id}`] = true;

      switch (id) {
        case 'isedol':
          searchQuery['artist.ine'] = true;
          searchQuery['artist.jingburger'] = true;
          searchQuery['artist.lilpa'] = true;
          searchQuery['artist.jururu'] = true;
          searchQuery['artist.gosegu'] = true;
          searchQuery['artist.viichan'] = true;
          break;
        case 'gomem':
          searchQuery['artist.chunyang'] = true;
          searchQuery['artist.chunshik'] = true;
          searchQuery['artist.kwonmin'] = true;
          searchQuery['artist.kimchimandu'] = true;
          searchQuery['artist.nosferatuhodd'] = true;
          searchQuery['artist.dandapbug'] = true;
          searchQuery['artist.dopamine'] = true;
          searchQuery['artist.dokkhye'] = true;
          searchQuery['artist.roentgenium'] = true;
          searchQuery['artist.haku'] = true;
          searchQuery['artist.bujungingan'] = true;
          searchQuery['artist.secretto'] = true;
          searchQuery['artist.businesskim'] = true;
          searchQuery['artist.friedshrimp'] = true;
          searchQuery['artist.sophia'] = true;
          searchQuery['artist.wakphago'] = true;
          searchQuery['artist.leedeoksoo'] = true;
          searchQuery['artist.carnarjungtur'] = true;
          searchQuery['artist.callycarly'] = true;
          searchQuery['artist.pungsin'] = true;
          searchQuery['artist.freeter'] = true;
          searchQuery['artist.rusuk'] = true;
          searchQuery['artist.hikiking'] = true;
          break;
        case 'gomem-academy':
          searchQuery['artist.ninnin'] = true;
          searchQuery['artist.ballantine'] = true;
          searchQuery['artist.bulgom'] = true;
          searchQuery['artist.jentu'] = true;
          searchQuery['artist.soosemi'] = true;
          searchQuery['artist.sirianrain'] = true;
          searchQuery['artist.amadeuschoi'] = true;
          searchQuery['artist.jinhe'] = true;
          searchQuery['artist.gilbert'] = true;
          searchQuery['artist.sullivan'] = true;
          break;
      }

      const countResult = await this.musicModel.countDocuments(searchQuery);

      const musicSearchResult = await this.musicModel.find(searchQuery, null, {
        skip: size * (page - 1),
        limit: size,
        sort: {
          uploadDate: 1,
        },
      });

      return {
        artist: await this.artistModel
          .findOne()
          .where('id')
          .equals(id)
          .select('-_id -__v'),
        music: {
          page: page,
          count: countResult,
          hasNext: countResult > size * page,
          data: musicSearchResult.filter(
            (ele, pos) => musicSearchResult.indexOf(ele) == pos,
          ),
        },
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
