import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
@ApiBearerAuth()
@ApiTags('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UsersService) {}
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateUserDto,
    description: 'get user by id',
  })
  find(@Param('id') id: string) {
    return this.userService.find(id);
  }
}
