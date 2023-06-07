import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from '../../../common/dto/responsePagination.dto';
import { CreateMessageDto } from './createMessage.dto';

export class GetMessageListDto {
  @ApiProperty()
  pagination: PaginationResponseDto;

  @ApiProperty({ type: [CreateMessageDto] })
  messages: CreateMessageDto[];
}
