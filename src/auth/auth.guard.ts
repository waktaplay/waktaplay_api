import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';

import { FastifyRequest } from 'fastify';

import APIException from 'src/common/dto/APIException.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new APIException(HttpStatus.UNAUTHORIZED, '로그인이 필요합니다.');
    }

    try {
      const parsedToken = await this.jwtService.verifyAsync<{
        sub: string;
        provider: string;
        profile: {
          provider: string;
          id: string;
          displayName: string;
          email: string;
          avatar: string;
        };
        iat: number;
        exp: number;
      }>(token, {
        secret: process.env.JWT_SECRET,
      });

      const iat = new Date().getTime() / 1000;
      if (parsedToken && parsedToken.iat > iat && parsedToken.exp < iat) {
        request['user'] = parsedToken.profile;
      } else {
        throw new APIException(
          HttpStatus.UNAUTHORIZED,
          '로그인 토큰이 만료되었거나 올바르지 않은 접근입니다.',
        );
      }
    } catch (e) {
      throw new APIException(
        HttpStatus.UNAUTHORIZED,
        '로그인 토큰이 만료되었거나 올바르지 않은 접근입니다.',
      );
    }

    return true;
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    this.logger.debug(`Extracted Type => ${type}, Token => ${token}`);
    return type === 'Bearer' ? token : undefined;
  }
}
