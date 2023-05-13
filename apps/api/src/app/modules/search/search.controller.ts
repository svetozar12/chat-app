import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@ApiTags('search')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('chat')
  searchChat(@Query('searchText') searchText: string) {
    return this.searchService.searchChat(searchText);
  }
}
