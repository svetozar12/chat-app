import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth('Auth')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserDto],
    description: 'fetch user by id',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto,
    description: 'update user',
  })
  update(@Param('id') id: string, @Body() body: UserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto,
    description: 'delete user',
  })
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
