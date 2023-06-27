import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto {
  @ApiProperty({ required: true })
  page: number;

  @ApiProperty({ required: true })
  limit: number;

  @ApiProperty({ required: true })
  total: number;
}
