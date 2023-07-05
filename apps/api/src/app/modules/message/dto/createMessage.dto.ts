import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Message } from '../../../utils/mongo';

export class CreateMessageDto implements Message {
  @ApiProperty({ type: 'string', required: false })
  @IsMongoId()
  _id: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  createdAt: string;
}
