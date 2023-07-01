import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QuerySearchDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, default: '' })
  text?: string = '';
}
