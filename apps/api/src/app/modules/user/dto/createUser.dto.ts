import { IUser } from '@chat-app/api/shared';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements IUser {
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
}

class PhotosDto {
  @ApiProperty()
  value: string;
}
