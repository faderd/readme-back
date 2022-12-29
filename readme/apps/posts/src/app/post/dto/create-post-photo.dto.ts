import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreatePostPhotoDto {
  @ApiProperty({
    description: '',
    example: '',
  })
  @Expose()
  public photo: string;

  @ApiProperty({
    description: 'Post tags',
    example: ''
  })
  @Expose()
  public tags?: string[];
}
