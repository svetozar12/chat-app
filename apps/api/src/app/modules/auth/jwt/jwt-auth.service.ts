import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, IUser } from '@chat-app/api/shared';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user: IUser) {
    const { id, displayName, photos } = user;
    const payload: JwtPayload = {
      sub: id,
      displayName,
      photo: photos?.[0]?.value,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  verify(token: string): boolean {
    return !!this.jwtService.verify(token);
  }
}
