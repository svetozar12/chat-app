import { Chat } from '@chat-app/api/db';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateChatDto implements Chat {
  @ApiProperty({ type: 'string', required: false, readOnly: true })
  _id: Types.ObjectId;
  @ApiProperty()
  @IsEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  members: string[];

  @ApiProperty()
  @IsString()
  @IsEmpty()
  userId: string;
}
