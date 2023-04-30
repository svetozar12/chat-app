import { Module } from '@nestjs/common';

import { UsersModule } from '../../user/user.module';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { GithubOauthController } from './github.controller';
import { GithubOauthStrategy } from './github.strategy';

@Module({
  imports: [JwtAuthModule, UsersModule],
  controllers: [GithubOauthController],
  providers: [GithubOauthStrategy],
})
export class GithubOauthModule {}
