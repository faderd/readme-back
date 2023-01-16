import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

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
  @IsArray()
  @Expose()
  public tags?: string[];
}
