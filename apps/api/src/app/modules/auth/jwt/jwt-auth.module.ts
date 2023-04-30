import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { API_ENVS } from '@chat-app/api/env';
import { JwtAuthStrategy } from './jwt-auth.strategy';

const { JWT_SECRET } = API_ENVS;

@Module({
  imports: [JwtModule.register({ secret: JWT_SECRET })],
  providers: [JwtAuthService, JwtAuthStrategy],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
