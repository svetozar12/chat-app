import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Message } from '@chat-app/api/db';
import { Types } from 'mongoose';

export class MessageDto implements Message {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false })
  _id: Types.ObjectId;
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  chatId: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  userId: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  seenBy: string[];

  @IsNotEmpty()
  @ApiProperty()
  sender: string;

  @IsString()
  @ApiProperty()
  message: string;
}
