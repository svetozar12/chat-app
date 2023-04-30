import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from './modules/auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiOAuth2 } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
