import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PostState, PostType } from '@readme/shared-types';

export class PostRdo {
  @ApiProperty({
    description: 'The uniq post ID',
    example: '123',
  })
  @Expose({ name: 'id' })
  public id: number;

  @ApiProperty({
    description: 'Id of the author of the post',
    example: '3282',
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'Date of publication',
    example: '2022-11-22T06:36:19.615Z'
  })
  @Expose()
  public datePublication: Date;

  @ApiProperty({
    description: 'Date of creation',
    example: '2022-11-22T06:36:19.615Z'
  })
  @Expose()
  public dateCreation: Date;

  @ApiProperty({
    description: 'State of post',
    example: 'draft'
  })
  @Expose()
  public state: PostState;

  @ApiProperty({
    description: 'Is this repost',
    example: 'false'
  })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
    description: 'Type of post',
    example: 'video'
  })
  @Expose()
  public type: PostType;

  @ApiProperty({
    description: 'Post tags',
    example: ''
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Post title',
    example: 'Title',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Video URL',
    example: 'https://site.com/video-1',
  })
  @Expose()
  public urlVideo: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'some text',
  })
  @Expose()
  public announcement: string;

  @ApiProperty({
    description: 'Post text',
    example: 'some text',
  })
  @Expose()
  public postText: string;

  @ApiProperty({
    description: 'Quote text',
    example: 'I came like Water, and like Wind I go.',
  })
  @Expose()
  public quoteText: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Omar Khayyam',
  })
  @Expose()
  public quoteAuthor: string;

  @ApiProperty({
    description: '',
    example: '',
  })
  @Expose()
  public photo: string;

  @ApiProperty({
    description: 'Link',
    example: 'https://some-site.com',
  })
  @Expose()
  public link: string;

  @ApiProperty({
    description: 'Post description',
    example: 'Description text',
  })
  @Expose()
  public description?: string;

  @ApiProperty({
    description: 'Likes',
    example: '["gds45fds", "fjnxc7da"]'
  })
  @Expose()
  public likeUserIds: string[];
}
