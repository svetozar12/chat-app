import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Max, Min } from 'class-validator';

export class PaginationResponseDto {
  @ApiProperty({ required: true })
  page: number;

  @ApiProperty({ required: true })
  limit: number;

  @ApiProperty({ required: true })
  total: number;
}
