import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class CreatePostPhotoDto {
  @ApiProperty({
    description: 'Post tags',
    example: ''
  })
  @IsArray()
  @IsOptional()
  @Expose()
  public tags?: string[];
}
