import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { PostAnnouncementLengthRange, PostTextLengthRange, PostTitleLengthRange } from '../post.constant';

export class CreatePostTextDto {
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
    description: 'Post announcement',
    example: 'some text',
  })
  @IsString()
  @MinLength(PostAnnouncementLengthRange.MIN, { message: `announcement field min length: ${PostAnnouncementLengthRange.MIN}` })
  @MaxLength(PostAnnouncementLengthRange.MAX, { message: `announcement field max length: ${PostAnnouncementLengthRange.MAX}` })
  @Expose()
  public announcement: string;

  @ApiProperty({
    description: 'Post text',
    example: 'some text',
  })
  @IsString()
  @MinLength(PostTextLengthRange.MIN, { message: `postText field min length: ${PostTextLengthRange.MIN}` })
  @MaxLength(PostTextLengthRange.MAX, { message: `postText field max length: ${PostTextLengthRange.MAX}` })
  @Expose()
  public postText: string;

  @ApiProperty({
    description: 'Post tags',
    example: ''
  })
  @Expose()
  public tags?: string[];
}
