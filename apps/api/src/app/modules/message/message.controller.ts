import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageDto } from './dto/message.dto';
import { Message } from '@chat-app/api/db';

@ApiTags('message')
@ApiBearerAuth()
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [MessageDto],
    description: 'fetch list of messages',
  })
  findAll(@Query('userId') userId: string): Promise<Message[]> {
    return this.messageService.findAll(userId);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: MessageDto,
    description: 'create message',
  })
  createMessage(@Body() body: MessageDto): Promise<Message> {
    return this.messageService.createMessage(body);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: MessageDto,
    description: 'update message',
  })
  updateMessage(
    @Body() body: MessageDto,
    @Param('id') id: string
  ): Promise<Message> {
    return this.messageService.updateMessage(id, body);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: MessageDto,
    description: 'delete message',
  })
  deleteMessage(
    @Param('id') id: string,
    @Body('userId') userId: string
  ): Promise<Message> {
    return this.messageService.DeleteMessage(id, userId);
  }
}
