import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Message } from '@prisma/client';

export class MessageDto implements Message {
  id: string;
  @IsNotEmpty()
  @ApiProperty()
  chatId: string;

  @IsNotEmpty()
  @ApiProperty()
  userId: string;

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
