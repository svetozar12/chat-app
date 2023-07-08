import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../../utils/mongo';

export class CreateUserDto {
  @ApiProperty()
  _id: string;

  @ApiProperty({ type: 'string' })
  provider: 'github';

  @ApiProperty()
  providerId: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty({ type: () => [PhotosDto] })
  photos: { value: string }[];

  @ApiProperty({
    enum: Status,
    default: Status.OFFLINE,
    required: false,
  })
  status?: Status;
}

class PhotosDto {
  @ApiProperty()
  value: string;
}
