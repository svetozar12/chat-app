import { Module } from '@nestjs/common';

import { UsersModule } from '../../user/user.module';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { GoogleOauthController } from './google.controller';
import { GoogleOauthStrategy } from './google.strategy';

@Module({
  imports: [JwtAuthModule, UsersModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}
