import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('user')
@ApiBearerAuth()
@ApiTags('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  @Get()
  findAll() {
    return true;
  }
}
