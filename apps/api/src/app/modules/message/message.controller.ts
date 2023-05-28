import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Message } from '@chat-app/api/db';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('message')
@Controller('message')
@ApiBearerAuth()
@UseInterceptors(CacheInterceptor)
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [CreateMessageDto],
    description: 'fetch list of messages',
  })
  findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateMessageDto,
    description: 'create message',
  })
  createMessage(@Body() body: CreateMessageDto): Promise<Message> {
    return this.messageService.createMessage(body);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateMessageDto,
    description: 'update message',
  })
  updateMessage(
    @Body() body: CreateMessageDto,
    @Param('id') id: string
  ): Promise<Message> {
    return this.messageService.updateMessage(id, body);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateMessageDto,
    description: 'delete message',
  })
  deleteMessage(
    @Param('id') id: string,
    @Body('userId') userId: string
  ): Promise<Message> {
    return this.messageService.DeleteMessage(id, userId);
  }
}
