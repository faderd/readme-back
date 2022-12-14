import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '123',
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'User registration date',
    example: '2022-10-10',
  })
  @Expose()
  public dateRegistration: string;

  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Smith',
  })
  @Expose()
  public lastname: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/img/userpic.jpg',
  })
  @Expose()
  public avatar: string;
}
