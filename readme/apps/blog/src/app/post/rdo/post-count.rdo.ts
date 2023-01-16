import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PostsCountRdo {
  @ApiProperty({
    description: 'User posts count',
    example: '123',
  })
  @Expose()
  public postsCount: number;

  @ApiProperty({
    description: 'Id of the author of the posts',
    example: '3282',
  })
  @Expose()
  public authorId: string;
}
