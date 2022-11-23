import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '123',
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'The uniq author ID',
    example: '123',
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'Date of publication',
    example: '2022-11-22T06:36:19.615Z'
  })
  @Expose()
  public date: Date;

  @ApiProperty({
    description: 'The uniq post ID',
    example: '123',
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'some text',
  })
  @Expose()
  public text: string;
}
