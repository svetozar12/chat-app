import { IsNotEmpty, IsString } from 'class-validator';
import { Message } from '@chat-app/api/db';
import { ApiProperty } from '@nestjs/swagger';

export class MessageDto implements Message {
  @IsNotEmpty()
  @ApiProperty()
  chat_id: string;

  @IsNotEmpty()
  @ApiProperty()
  user_id: string;

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
