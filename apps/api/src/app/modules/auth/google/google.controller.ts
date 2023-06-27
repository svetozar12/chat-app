import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { GoogleOauthGuard } from './google.guard';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../decorator/public.decorator';
import { TOKEN, USER_ID } from '@chat-app/shared/common-constants';
import { IUser } from '@chat-app/api/v1/user';
import { API_ENVS } from '../../../utils/env';

const { WEB_URL } = API_ENVS;
@ApiTags('auth')
@Controller('auth/google')
export class GoogleOauthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  @ApiExcludeEndpoint()
  @Public()
  async googleAuth() {
    // With `@UseGuards(GoogleOauthGuard)` we are using an AuthGuard that @nestjs/passport
    // automatically provisioned for us when we extended the passport-google strategy.
    // The Guard initiates the passport-google flow.
  }

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  @ApiExcludeEndpoint()
  async googleAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = req.user as IUser;
    const { accessToken } = this.jwtAuthService.login(user);
    res.cookie(TOKEN, accessToken, {
      domain:
        process.env.NODE_ENV === 'development'
          ? 'localhost'
          : 'gospodinovs.com',
      // expires in 60 days
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
    });
    res.cookie(USER_ID, user.id, {
      domain:
        process.env.NODE_ENV === 'development'
          ? 'localhost'
          : 'gospodinovs.com',
      // expires in 60 days
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
    });
    return res.redirect(WEB_URL);
  }
}
