import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Body,
  HttpStatus,
  Query,
  UseGuards,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from 'src/auth/auth.guard';
import { AnonymousGuard } from 'src/auth/anonymous.guard';
import { MypageService } from './mypage.service';

import { toggleHeartRequestDto } from './dto/toggleHeartRequest.dto';
import { CreatePlaylistRequestDto } from './dto/createPlaylistRequest.dto';
import { UpdatePlaylistRequestDto } from './dto/updatePlaylistRequest.dto';
import { ModifyPlaylistSongsRequestDto } from './dto/modifyPlaylistSongsRequest.dto';
import { APIException } from 'src/common/dto/APIException.dto';

@ApiTags('Music - Mypage')
@ApiBearerAuth()
@Controller('mypage')
export class MypageController {
  private readonly logger = new Logger(MypageController.name);

  constructor(private readonly mypageService: MypageService) {}

  //#region 좋아요 관리
  @UseGuards(AuthGuard)
  @Get('hearts/songs')
  @ApiOperation({
    summary: '좋아요 누른 곡 확인',
    description: '사용자가 좋아요를 누른 곡을 확인합니다.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
  })
  async getSongHearts(
    @Req() req,
    @Query('page') page: string = '1',
    @Query('size') size: string = '20',
  ) {
    return await this.mypageService.getHearts('songs', req.user.id, {
      page: parseInt(page, 10),
      size: parseInt(size, 10),
    });
  }

  @UseGuards(AuthGuard)
  @Get('hearts/artists')
  @ApiOperation({
    summary: '좋아요 누른 아티스트 확인',
    description: '사용자가 좋아요를 누른 아티스트를 확인합니다.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
  })
  async getArtistHearts(
    @Req() req,
    @Query('page') page: string = '1',
    @Query('size') size: string = '20',
  ) {
    return await this.mypageService.getHearts('artists', req.user.id, {
      page: parseInt(page, 10),
      size: parseInt(size, 10),
    });
  }

  @UseGuards(AuthGuard)
  @Get('hearts/songs/:id')
  @ApiOperation({
    summary: '곡 좋아요 여부 확인',
    description: '사용자가 특정 곡에 좋아요를 눌렀는지 확인합니다.',
  })
  async checkHeartedSong(@Req() req, @Param('id') id: string) {
    return await this.mypageService.checkHearted(id, 'songs', req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('hearts/artists/:id')
  @ApiOperation({
    summary: '아티스트 좋아요 여부 확인',
    description: '사용자가 특정 아티스트에 좋아요를 눌렀는지 확인합니다.',
  })
  async checkHeartedArtist(@Req() req, @Param('id') id: string) {
    return await this.mypageService.checkHearted(id, 'artists', req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('hearts')
  @ApiOperation({
    summary: '좋아요 누르기/삭제하기',
    description:
      '사용자가 특정 곡/아티스트에 좋아요를 누르거나 삭제합니다. (토글)',
  })
  async toggleHeart(@Req() req, @Body() body: toggleHeartRequestDto) {
    if (!body.artist && !body.song) {
      throw new APIException(
        HttpStatus.BAD_REQUEST,
        '아티스트 아이디 또는 곡 아이디는 필수입니다.',
      );
    }

    if (body.artist && body.song) {
      throw new APIException(
        HttpStatus.BAD_REQUEST,
        '아티스트 아이디와 곡 아이디 중 하나만 입력해주세요.',
      );
    }

    return await this.mypageService.toggleHeart(req.user.id, body);
  }
  //#endregion

  //#region 플레이리스트 관리
  @UseGuards(AuthGuard)
  @Get('playlist')
  @ApiOperation({
    summary: '플레이리스트 조회',
    description: '사용자가 생성한 플레이리스트를 확인합니다.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
  })
  async getPlaylists(
    @Req() req,
    @Query('page') page: string = '1',
    @Query('size') size: string = '20',
  ) {
    return await this.mypageService.getPlaylists(req.user.id, {
      page: parseInt(page, 10),
      size: parseInt(size, 10),
    });
  }

  @UseGuards(AuthGuard)
  @Post('playlist')
  @ApiOperation({
    summary: '플레이리스트 생성',
    description: '사용자가 플레이리스트를 생성합니다.',
  })
  async createPlaylist(@Req() req, @Body() body: CreatePlaylistRequestDto) {
    return await this.mypageService.createPlaylist(req.user.id, body);
  }

  @UseGuards(AnonymousGuard)
  @Get('playlist/:id')
  @ApiOperation({
    summary: '플레이리스트 메타데이터 조회',
    description: '특정 플레이리스트의 메타데이터를 조회합니다.',
  })
  async getSpecificPlaylist(@Req() req, @Param('id') id: string) {
    return await this.mypageService.getSpecificPlaylist(id, req.user.id);
  }

  @UseGuards(AnonymousGuard)
  @Get('playlist/:id/songs')
  @ApiOperation({
    summary: '플레이리스트 곡 조회',
    description: '특정 플레이리스트에 저장된 곡 리스트를 조회합니다.',
  })
  async getPlaylistSongs(@Req() req, @Param('id') id: string) {
    return await this.mypageService.getPlaylistSongs(id, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch('playlist/:id')
  @ApiOperation({
    summary: '플레이리스트 수정',
    description: '사용자가 플레이리스트를 수정합니다.',
  })
  async updatePlaylist(
    @Req() req,
    @Param('id') id: string,
    @Body() body: UpdatePlaylistRequestDto,
  ) {
    return await this.mypageService.updatePlaylist(req.user.id, id, body);
  }

  @UseGuards(AuthGuard)
  @Patch('playlist/:id/songs')
  @ApiOperation({
    summary: '플레이리스트 곡 추가/삭제',
    description: '사용자가 플레이리스트에 저장된 곡을 추가/삭제합니다.',
  })
  async modifyPlaylistSongs(
    @Req() req,
    @Param('id') id: string,
    @Body() body: ModifyPlaylistSongsRequestDto,
  ) {
    return await this.mypageService.modifyPlaylistSongs(req.user.id, id, body);
  }

  @UseGuards(AuthGuard)
  @Delete('playlist/:id')
  @ApiOperation({
    summary: '플레이리스트 삭제',
    description: '사용자가 플레이리스트를 삭제합니다.',
  })
  async deletePlaylist(@Req() req, @Param('id') id: string) {
    return await this.mypageService.deletePlaylist(req.user.id, id);
  }
  //#endregion
}
