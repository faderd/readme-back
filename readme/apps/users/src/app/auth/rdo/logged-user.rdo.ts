import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '123',
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'f8qmxn459sdjxn56',
  })
  @Expose()
  public accessToken: string;
}
