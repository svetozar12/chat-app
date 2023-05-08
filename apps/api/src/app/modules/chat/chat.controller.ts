import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Chat } from '@chat-app/api/db';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@ApiTags('chat')
@ApiBearerAuth()
@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [CreateChatDto],
    description: 'fetch list of chats',
  })
  findAll(@Query('userId') userId: string): Promise<Chat[]> {
    return this.chatService.findAll(userId);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateChatDto,
    description: 'fetch single chat by id',
  })
  findOne(
    @Param('id') id: string,
    @Query('userId') userId: string
  ): Promise<Chat> {
    return this.chatService.findOne(id, userId);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateChatDto,
    description: 'create chat',
  })
  create(@Body() createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatService.create(createChatDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateChatDto,
    description: 'create chat',
  })
  update(
    @Param('id') id: string,
    @Body() updateChatDto: UpdateChatDto
  ): Promise<Chat> {
    return this.chatService.update(id, updateChatDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateChatDto,
    description: 'create chat',
  })
  remove(
    @Param('id') id: string,
    @Query('userId') userId: string
  ): Promise<Chat> {
    return this.chatService.delete(id, userId);
  }
}
