import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiResponse } from '@nestjs/swagger';
import { MessageDto } from './dto/message.dto';
import { Message } from '@prisma/client';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [MessageDto],
    description: 'fetch list of messages',
  })
  findAll(user_id: string): Promise<Message[]> {
    return this.messageService.findAll(user_id);
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
    @Body('id') id: string
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
    @Body('id') id: string,
    @Body('user_id') user_id
  ): Promise<Message> {
    return this.messageService.DeleteMessage(id, user_id);
  }
}
