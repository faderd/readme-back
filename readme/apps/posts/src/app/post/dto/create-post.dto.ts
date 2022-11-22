import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@readme/shared-types';

export class CreatePostDto {
  @ApiProperty({
    description: 'Type of post',
    example: 'video'
  })
  public type: PostType;

  @ApiProperty({
    description: 'Post tags',
    example: ''
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Post title',
    example: 'Title',
  })
  public title: string;

  @ApiProperty({
    description: 'Video URL',
    example: 'https://site.com/video-1',
  })
  public urlVideo: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'some text',
  })
  public announcement: string;

  @ApiProperty({
    description: 'Post text',
    example: 'some text',
  })
  public postText: string;

  @ApiProperty({
    description: 'Quote text',
    example: 'I came like Water, and like Wind I go.',
  })
  public quoteText: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Omar Khayyam',
  })
  public quoteAuthor: string;

  @ApiProperty({
    description: '',
    example: '',
  })
  public photo: string;

  @ApiProperty({
    description: 'Link',
    example: 'https://some-site.com',
  })
  public link: string;

  @ApiProperty({
    description: 'Post description',
    example: 'Description text',
  })
  public description?: string;
}
