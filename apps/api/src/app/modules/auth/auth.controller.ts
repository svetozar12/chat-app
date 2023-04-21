import { Controller, Request, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from '../../decorator/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Request() req, @Body() _: LoginDto) {
    return req.user;
  }

  @Public()
  @Post('signup')
  async signup(@Body() body: LoginDto) {
    const { password, ...user } = body;
    return this.authService.signUp(user, password);
  }
}
