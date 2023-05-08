import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../../../decorator/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler()
    );
    console.log(isPublic, 'ivane');

    if (isPublic) {
      return true;
    }
    return false;
  }
}
