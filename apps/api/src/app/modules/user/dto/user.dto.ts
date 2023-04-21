import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@chat-app/api/db';
import { Types } from 'mongoose';

export class UserDto implements User {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false })
  _id: Types.ObjectId;
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  password: string;
}

export type UserWithoutPassword = Omit<User, 'password'>;
