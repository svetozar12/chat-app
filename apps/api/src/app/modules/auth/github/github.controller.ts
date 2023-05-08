import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { IUser } from '@chat-app/api/shared';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { GithubOauthGuard } from './github.guard';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../decorator/public.decorator';

@ApiTags('auth')
@Controller('auth/github')
export class GithubOauthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  @ApiExcludeEndpoint()
  @Public()
  async githubAuth() {
    // With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
    // automatically provisioned for us when we extended the passport-github strategy.
    // The Guard initiates the passport-github flow.
  }

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  @ApiExcludeEndpoint()
  async githubAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = req.user as IUser;
    const { accessToken } = this.jwtAuthService.login(user);
    res.cookie('jwt', accessToken, {
      // expires in 60 days
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
    });
    res.redirect('http://localhost:4200');
    return { access_token: accessToken };
  }
}
