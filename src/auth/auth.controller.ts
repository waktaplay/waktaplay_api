import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { authCallbackDto } from './dto/authCallback.dto';
import { authCallbackRequestDto } from './dto/authCallbackRequest.dto';
import { authRefreshRequestDto } from './dto/authRefreshRequest.dto';

@ApiTags('Common - Authentication API')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('callback')
  @ApiOperation({
    summary: 'Access Token 발급',
    description: 'SpaceWak OAuth2를 통한 Access Token 발급 요청',
  })
  async callback(
    @Body() body: authCallbackRequestDto,
  ): Promise<authCallbackDto> {
    try {
      return await this.authService.callback(body.code);
    } catch (e) {
      throw new HttpException(
        e,
        HttpStatus[(e.code as string) || 'INTERNAL_SERVER_ERROR'],
      );
    }
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Access Token 갱신',
    description: 'SpaceWak OAuth2를 통한 Access Token 갱신 요청',
  })
  async refresh(@Body() body: authRefreshRequestDto): Promise<authCallbackDto> {
    try {
      return await this.authService.refreshToken(body.refresh_token);
    } catch (e) {
      throw new HttpException(
        e,
        HttpStatus[(e.code as string) || 'INTERNAL_SERVER_ERROR'],
      );
    }
  }
}
