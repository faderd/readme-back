import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { PostDescriptionMaxLength } from '../post.constant';

export class CreatePostLinkDto {
  @ApiProperty({
    description: 'Link',
    example: 'https://some-site.com',
  })
  @IsUrl()
  @Expose()
  public link: string;

  @ApiProperty({
    description: 'Post description',
    example: 'Description text',
  })
  @IsOptional()
  @IsString()
  @MaxLength(PostDescriptionMaxLength, { message: `description field max length: ${PostDescriptionMaxLength}` })
  @Expose()
  public description?: string;

  @ApiProperty({
    description: 'Post tags',
    example: ''
  })
  @Expose()
  public tags?: string[];
}
