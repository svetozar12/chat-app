import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthService } from './jwt-auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class JwtAuthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get('verify')
  @ApiResponse({
    status: HttpStatus.OK,
    type: Boolean,
    description: 'verify token',
  })
  verify(@Req() req: Request): boolean {
    const bearer = req.headers.authorization;
    const [, token] = bearer.split(' ');
    return this.jwtAuthService.verify(token);
  }
}
