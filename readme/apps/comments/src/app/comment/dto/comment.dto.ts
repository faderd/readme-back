import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({
    description: 'Id of the commented post',
    example: '4364534'
  })
  public postId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Some text'
  })
  public text: string;
}
