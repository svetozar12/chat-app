import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { QuerySearchDto } from '../../common/dto/querySearch.dto copy';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('search')
@ApiTags('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get('user')
  @ApiResponse({
    status: HttpStatus.OK,
    type: QuerySearchDto,
    description: 'search user',
  })
  searchUser(@Query() query: QuerySearchDto) {
    return this.searchService.searchUser(query.text);
  }
}
