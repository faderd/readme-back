import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Smith',
  })
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty',
  })
  public password: string;
}
