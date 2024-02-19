import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';

import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

import { authCallbackDto } from './dto/authCallback.dto';
import { APIException } from 'src/common/dto/APIException.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly httpService: HttpService) {}

  async callback(code: string): Promise<authCallbackDto> {
    const params = new URLSearchParams({
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.AUTH_ENDPOINT + '/auth/callback',
    });

    return await this.getToken(params);
  }

  async refreshToken(refreshToken: string): Promise<authCallbackDto> {
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    return await this.getToken(params);
  }

  async getToken(params: URLSearchParams): Promise<authCallbackDto> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<authCallbackDto>(
          'https://auth.spacewak.net/oauth2/token',
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${Buffer.from(
                `${process.env.SPACEWAK_CLIENT_ID}:${process.env.SPACEWAK_CLIENT_SECRET}`,
              ).toString('base64')}`,
            },
          },
        )
        .pipe(
          catchError((err: AxiosError) => {
            throw new APIException(
              err.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
              `(Remote) ${(err.response.data as APIException)?.message}` ||
                '내부 서버 오류가 발생했습니다.',
            );
          }),
        ),
    );

    return data;
  }
}
