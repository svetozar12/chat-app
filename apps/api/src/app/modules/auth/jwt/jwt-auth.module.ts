import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { JwtAuthController } from './jwt-auth.controller';
import { API_ENVS } from '../../../utils/env';

const { JWT_SECRET } = API_ENVS;

@Module({
  imports: [JwtModule.register({ secret: JWT_SECRET })],
  providers: [JwtAuthService, JwtAuthStrategy],
  controllers: [JwtAuthController],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
