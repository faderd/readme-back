import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { PostTitleLengthRange } from '../post.constant';

export class CreatePostVideoDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Title',
  })
  @IsString()
  @MinLength(PostTitleLengthRange.MIN, { message: `title field min length: ${PostTitleLengthRange.MIN}` })
  @MaxLength(PostTitleLengthRange.MAX, { message: `title field max length: ${PostTitleLengthRange.MAX}` })
  @Expose()
  public title!: string;

  @ApiProperty({
    description: 'Video URL',
    example: 'https://site.com/video-1',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  public urlVideo!: string;

  @ApiProperty({
    description: 'Post tags',
    example: ''
  })
  @IsArray()
  @IsOptional()
  @Expose()
  public tags?: string[];
}
