import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { FastifyRequest } from 'fastify';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AnonymousGuard extends AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return await super.canActivate(context);
    } catch {
      const request = context.switchToHttp().getRequest<FastifyRequest>();
      request['user'] = {
        provider: undefined,
        id: undefined,
        displayName: undefined,
        email: undefined,
        avatar: undefined,
      };

      return true;
    }
  }
}
