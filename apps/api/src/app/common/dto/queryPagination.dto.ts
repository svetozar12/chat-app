import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @Min(1)
  @IsOptional()
  @ApiProperty({ required: false, default: 1 })
  page?: number = 1;

  @Min(1)
  @Max(50)
  @IsOptional()
  @ApiProperty({ required: false, default: 10 })
  limit?: number = 10;
}
